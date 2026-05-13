// frontend/src/hooks/useBilling.js

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import toast from 'react-hot-toast';

// Get all plans (VPS + WordPress)
export const useBillingPlans = () =>
  useQuery({
    queryKey: ['billing', 'plans'],
    queryFn: () => api.get('/billing/plans').then(r => r.data?.data || []),
    staleTime: 1000 * 60 * 10,
  });

// Get user subscriptions (both VPS and WordPress)
export const useSubscription = () =>
  useQuery({
    queryKey: ['billing', 'subscriptions'],
    queryFn: () => api.get('/billing/subscriptions').then(r => r.data?.data || []),
    staleTime: 0,
  });

// Get payment history (both VPS and WordPress)
export const usePaymentsHistory = () =>
  useQuery({
    queryKey: ['billing', 'payments'],
    queryFn: () => api.get('/billing/payment-history').then(r => r.data?.data || []),
    staleTime: 0,
  });

// Get invoices
export const useInvoices = () =>
  useQuery({
    queryKey: ['billing', 'invoices'],
    queryFn: () => api.get('/billing/invoices').then(r => r.data?.data || []),
    staleTime: 0,
  });

// Get single invoice
export const useInvoice = (id) =>
  useQuery({
    queryKey: ['billing', 'invoice', id],
    queryFn: () => api.get(`/billing/invoices/${id}`).then(r => r.data?.data),
    enabled: !!id,
  });

// CREATE ORDER - Supports both VPS and WordPress
export const useCreateOrder = () =>
  useMutation({
    mutationFn: (data) => {
      // WordPress order (PlanModal)
      if (data.planId && data.duration) {
        return api.post('/billing/create-order', {
          planId: data.planId,
          duration: data.duration,
        }).then(r => r.data?.data);
      }
      
      // VPS order (ConfigurationModal)
      if (data.planType === 'vps') {
        return api.post('/billing/create-order', {
          planId: data.planId,
          planType: 'vps',
          period: data.tenureMonths === 1 ? 'monthly' : 'yearly',
          tenureMonths: data.tenureMonths,
          os: data.os,
          hostname: data.hostname,
          rootPassword: data.rootPassword,
          userEmail: data.userEmail
        }).then(r => r.data?.data);
      }
      
      // WordPress order (alternative)
      return api.post('/billing/create-order', {
        planType: 'wordpress',
        period: data.period || 'monthly',
        duration: data.duration
      }).then(r => r.data?.data);
    },
    onError: (error) => {
      console.error('Order error:', error);
      toast.error(error.response?.data?.message || 'Failed to create order');
    }
  });

// VERIFY PAYMENT - Supports both VPS and WordPress
export const useVerifyPayment = () =>
  useMutation({
    mutationFn: ({ razorpay_order_id, razorpay_payment_id, razorpay_signature, instanceId, planType }) =>
      api.post('/billing/verify-payment', {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        instanceId,
        planType
      }).then(r => r.data?.data),
    onSuccess: (data) => {
      toast.success('Payment verified successfully! Service activated.');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Payment verification failed');
    },
  });
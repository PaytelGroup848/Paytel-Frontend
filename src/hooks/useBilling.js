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

  export const useRenewalDetails = (subscriptionId) =>
  useQuery({
    queryKey: ['billing', 'renewal', subscriptionId],
    queryFn: () => api.get(`/billing/subscriptions/${subscriptionId}/renewal-details`)
      .then(r => r.data?.data),
    enabled: !!subscriptionId,
    staleTime: 0,
  });

export const useCreateRenewalOrder = () =>
  useMutation({
    mutationFn: ({ subscriptionId, tenureMonths, selectedPeriod }) =>
      api
        .post(`/billing/subscriptions/${subscriptionId}/renew`, {
          tenureMonths,
          selectedPeriod,
        })
        .then((r) => r.data?.data),
    onError: (error) => {
      console.error("Renewal order error:", error);
      toast.error(
        error.response?.data?.message || "Failed to create renewal order",
      );
    },
  });

  // ✅ NEW: Verify renewal payment
export const useVerifyRenewalPayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      subscriptionId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      tenureMonths,
    }) =>
      api
        .post(`/billing/subscriptions/${subscriptionId}/verify-renewal`, {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
          tenureMonths,
        })
        .then((r) => r.data?.data),
    onSuccess: async (data) => {
      toast.success("Renewal successful! Your subscription has been extended.");
      await queryClient.invalidateQueries({
        queryKey: ["billing", "subscriptions"],
      });
      await queryClient.refetchQueries({
        queryKey: ["billing", "subscriptions"],
      });
    },
    onError: (error) => {
      console.error("Renewal verification error:", error);
      toast.error(
        error.response?.data?.message || "Renewal verification failed",
      );
    },
  });
};


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

// Get dashboard data
export const useDashboardData = () =>
  useQuery({
    queryKey: ['billing', 'dashboard'],
    queryFn: () => api.get('/billing/dashboard').then(r => r.data?.data),
    staleTime: 1000 * 30, // 30 seconds
  });

// CREATE ORDER - Supports both VPS and WordPress, plus renewals
export const useCreateOrder = () =>
  useMutation({
    mutationFn: (data) => {
      // Renewal order (RenewModal)
      if (data.subscriptionId) {
        return api.post('/billing/create-order', {
          subscriptionId: data.subscriptionId,
          tenureMonths: data.tenureMonths,
          planId: data.planId,
          planType: data.planType
        }).then(r => r.data?.data);
      }
      
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
export const useVerifyPayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ razorpay_order_id, razorpay_payment_id, razorpay_signature, instanceId, planType }) =>
      api.post('/billing/verify-payment', {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        instanceId,
        planType
      }).then(r => r.data?.data),
    onSuccess: async (data) => {
      toast.success('Payment verified successfully! Service activated.');
      // Invalidate and refetch immediately to ensure dashboard doesn't redirect
      await queryClient.invalidateQueries({ queryKey: ['billing', 'subscriptions'] });
      await queryClient.refetchQueries({ queryKey: ['billing', 'subscriptions'] });
      queryClient.invalidateQueries({ queryKey: ['billing', 'payments'] });
      queryClient.invalidateQueries({ queryKey: ['billing', 'invoices'] });
    },
    onError: (error) => {
      console.error('Verification error:', error);
      toast.error(error.response?.data?.message || 'Payment verification failed');
    }
  });
};

// ADMIN: Get all upcoming renewals with filters and pagination
export const useAdminRenewals = (params = {}) =>
  useQuery({
    queryKey: ['admin', 'renewals', params],
    queryFn: () =>
      api
        .get('/billing/admin/renewals', {
          params: {
            page: params.page || 1,
            pageSize: params.pageSize || 10,
            daysRange: params.daysRange || 365,
            ...(params.service && { service: params.service }),
            ...(params.search && { search: params.search }),
          },
        })
        .then((r) => ({
          items: r.data?.data || [],
          meta: r.data?.meta || {
            page: params.page || 1,
            totalPages: 1,
            total: r.data?.data?.length || 0,
          },
        })),
    staleTime: 0,
  });




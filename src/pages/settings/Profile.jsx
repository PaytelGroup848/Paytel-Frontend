import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Save, MapPin, Mail, Phone, Check, AlertCircle } from 'lucide-react';

import Avatar from '../../components/ui/Avatar';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import SkeletonCard from '../../components/ui/skeletons/SkeletonCard';

import { useProfile, useUpdateProfile } from '../../hooks/useProfile';

export default function Profile() {
  const profile = useProfile();
  const update = useUpdateProfile();
  const [hasChanges, setHasChanges] = useState(false);

  const initial = useMemo(
    () => ({
      firstName: profile.data?.firstName || '',
      lastName: profile.data?.lastName || '',
      phone: profile.data?.phone || '',
      address: {
        line1: profile.data?.address?.line1 || '',
        line2: profile.data?.address?.line2 || '',
        city: profile.data?.address?.city || '',
        state: profile.data?.address?.state || '',
        postalCode: profile.data?.address?.postalCode || '',
        country: profile.data?.address?.country || '',
      },
    }),
    [profile.data]
  );

  const [form, setForm] = useState(initial);
  
  useEffect(() => {
    setForm(initial);
    setHasChanges(false);
  }, [initial]);

  useEffect(() => {
    const changed = JSON.stringify(form) !== JSON.stringify(initial);
    setHasChanges(changed);
  }, [form, initial]);

  if (profile.isLoading) return <SkeletonCard height={260} />;

  const onSave = async () => {
    try {
      await update.mutateAsync(form);
      toast.success('Profile updated successfully');
      setHasChanges(false);
    } catch (_) {
      // toast handled in hook
    }
  };

  const onDiscard = () => {
    setForm(initial);
    setHasChanges(false);
  };

  const fullName = `${form.firstName} ${form.lastName}`.trim() || 'User';
  const userEmail = profile?.data?.email || '';

  const updateField = (field, value) => {
    setForm((s) => ({ ...s, [field]: value }));
  };

  const updateAddress = (field, value) => {
    setForm((s) => ({ ...s, address: { ...s.address, [field]: value } }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/20 to-indigo-50/20">
      {/* Header Bar with Save Actions */}
      <AnimatePresence>
        {hasChanges && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-lg"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-50">
                    <AlertCircle size={20} className="text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Unsaved Changes</p>
                    <p className="text-xs text-slate-500">You have unsaved modifications</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={onDiscard}
                    disabled={update.isPending}
                    className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-50"
                  >
                    Discard
                  </button>
                  <button
                    onClick={onSave}
                    disabled={update.isPending}
                    className="group relative px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-60 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative flex items-center gap-2">
                      {update.isPending ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Check size={16} />
                      )}
                      {update.isPending ? 'Saving...' : 'Save Changes'}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Profile Overview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mb-8 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-600 opacity-[0.03]" />
          <div className="relative bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Avatar with Status */}
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 rounded-full opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500" />
                
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="mb-3">
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
                    {fullName}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3">                    
                  </div>
                </div>
                
                {/* Contact Quick Info */}
                <div className="flex flex-wrap gap-4 text-sm">
                  {userEmail && (
                    <div className="flex items-center gap-2 text-slate-600">
                      <div className="p-1.5 rounded-md bg-slate-100">
                        <Mail size={14} className="text-slate-500" />
                      </div>
                      <span className="font-medium">{userEmail}</span>
                    </div>
                  )}
                  {form.phone && (
                    <div className="flex items-center gap-2 text-slate-600">
                      <div className="p-1.5 rounded-md bg-slate-100">
                        <Phone size={14} className="text-slate-500" />
                      </div>
                      <span className="font-medium">{form.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form Sections Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
          {/* Personal Information Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="xl:col-span-1"
          >
            <div className="bg-white border border-slate-200/60 rounded-2xl shadow-sm overflow-hidden h-full">
              {/* Section Header */}
              <div className="relative px-6 py-5 border-b border-slate-100 bg-gradient-to-br from-slate-50/50 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-violet-100">
                    <User size={18} className="text-purple-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Personal Details</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Basic information</p>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    First Name
                  </label>
                  <Input
                    name="firstName"
                    value={form.firstName}
                    onChange={(e) => updateField('firstName', e.target.value)}
                    placeholder="Enter first name"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Last Name
                  </label>
                  <Input
                    name="lastName"
                    value={form.lastName}
                    onChange={(e) => updateField('lastName', e.target.value)}
                    placeholder="Enter last name"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <Input
                    name="phone"
                    value={form.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Address Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="xl:col-span-2"
          >
            <div className="bg-white border border-slate-200/60 rounded-2xl shadow-sm overflow-hidden h-full">
              {/* Section Header */}
              <div className="relative px-6 py-5 border-b border-slate-100 bg-gradient-to-br from-slate-50/50 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-violet-100">
                    <MapPin size={18} className="text-purple-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Address Information</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Location and mailing details</p>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Address Line 1 */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Street Address
                    </label>
                    <Input
                      name="line1"
                      value={form.address.line1}
                      onChange={(e) => updateAddress('line1', e.target.value)}
                      placeholder="House/Building number and street name"
                      className="w-full"
                    />
                  </div>

                  {/* Address Line 2 */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Address Line 2 <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <Input
                      name="line2"
                      value={form.address.line2}
                      onChange={(e) => updateAddress('line2', e.target.value)}
                      placeholder="Apartment, suite, unit, floor, etc."
                      className="w-full"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      City
                    </label>
                    <Input
                      name="city"
                      value={form.address.city}
                      onChange={(e) => updateAddress('city', e.target.value)}
                      placeholder="New Delhi"
                      className="w-full"
                    />
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      State / Province
                    </label>
                    <Input
                      name="state"
                      value={form.address.state}
                      onChange={(e) => updateAddress('state', e.target.value)}
                      placeholder="Delhi"
                      className="w-full"
                    />
                  </div>

                  {/* Postal Code */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Postal Code
                    </label>
                    <Input
                      name="postalCode"
                      value={form.address.postalCode}
                      onChange={(e) => updateAddress('postalCode', e.target.value)}
                      placeholder="110020"
                      className="w-full"
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Country
                    </label>
                    <Input
                      name="country"
                      value={form.address.country}
                      onChange={(e) => updateAddress('country', e.target.value)}
                      placeholder="India"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Action Bar - Desktop */}
        {!hasChanges && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="hidden sm:flex items-center justify-between mt-8 p-6 bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-2xl"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-100 to-violet-100">
                <Check size={20} className="text-purple-700" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">All changes saved</p>
                <p className="text-xs text-slate-500">Your profile is up to date</p>
              </div>
            </div>
            <div className="text-xs text-slate-400">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </motion.div>
        )}
      </div>

      {/* Mobile Fixed Action Button */}
      {hasChanges && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="sm:hidden fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent backdrop-blur-sm pointer-events-none z-40"
        >
          <div className="flex gap-3 pointer-events-auto">
            <button
              onClick={onDiscard}
              disabled={update.isPending}
              className="flex-1 py-3.5 text-sm font-semibold text-slate-700 bg-white border-2 border-slate-200 hover:border-slate-300 rounded-xl transition-colors disabled:opacity-50"
            >
              Discard
            </button>
            <button
              onClick={onSave}
              disabled={update.isPending}
              className="group relative flex-[2] py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-semibold rounded-xl hover:shadow-xl hover:shadow-purple-500/30 transition-all disabled:opacity-60 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center justify-center gap-2">
                {update.isPending ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Save size={16} />
                )}
                {update.isPending ? 'Saving...' : 'Save Changes'}
              </div>
            </button>
          </div>
        </motion.div>
      )}

      {/* Mobile Spacing */}
      <div className="sm:hidden h-24" />
    </div>
  );
}
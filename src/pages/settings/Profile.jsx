import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import Avatar from '../../components/ui/Avatar';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import SkeletonCard from '../../components/ui/skeletons/SkeletonCard';

import { useProfile, useUpdateProfile } from '../../hooks/useProfile';

export default function Profile() {
  const profile = useProfile();
  const update = useUpdateProfile();

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

  useEffect(() => setForm(initial), [initial]);

  if (profile.isLoading) return <SkeletonCard height={260} />;

  const onSave = async () => {
    try {
      await update.mutateAsync(form);
      toast.success('Profile updated');
    } catch (_) {
      // toast handled in hook
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-center gap-4">
          <Avatar name={`${form.firstName} ${form.lastName}`.trim() || 'User'} size="lg" />
          <div>
            <div className="text-lg font-semibold">Profile</div>
            <div className="text-sm text-textMuted">Update your personal details.</div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First name"
            name="firstName"
            value={form.firstName}
            onChange={(e) => setForm((s) => ({ ...s, firstName: e.target.value }))}
          />
          <Input
            label="Last name"
            name="lastName"
            value={form.lastName}
            onChange={(e) => setForm((s) => ({ ...s, lastName: e.target.value }))}
          />
          <Input
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
          />
          <div />
          <Input
            label="Address line 1"
            name="line1"
            value={form.address.line1}
            onChange={(e) => setForm((s) => ({ ...s, address: { ...s.address, line1: e.target.value } }))}
          />
          <Input
            label="Address line 2"
            name="line2"
            value={form.address.line2}
            onChange={(e) => setForm((s) => ({ ...s, address: { ...s.address, line2: e.target.value } }))}
          />
          <Input
            label="City"
            name="city"
            value={form.address.city}
            onChange={(e) => setForm((s) => ({ ...s, address: { ...s.address, city: e.target.value } }))}
          />
          <Input
            label="State"
            name="state"
            value={form.address.state}
            onChange={(e) => setForm((s) => ({ ...s, address: { ...s.address, state: e.target.value } }))}
          />
          <Input
            label="Postal code"
            name="postalCode"
            value={form.address.postalCode}
            onChange={(e) => setForm((s) => ({ ...s, address: { ...s.address, postalCode: e.target.value } }))}
          />
          <Input
            label="Country"
            name="country"
            value={form.address.country}
            onChange={(e) => setForm((s) => ({ ...s, address: { ...s.address, country: e.target.value } }))}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={onSave} loading={update.isPending}>
            Save changes
          </Button>
        </div>
      </Card>
    </div>
  );
}


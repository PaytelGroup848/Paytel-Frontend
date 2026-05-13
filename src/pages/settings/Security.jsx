import { useMemo, useState } from 'react';

import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import SkeletonList from '../../components/ui/skeletons/SkeletonList';

import { useDeleteSession, useSessions, useUpdatePassword } from '../../hooks/useProfile';

export default function Security() {
  const updatePassword = useUpdatePassword();
  const sessions = useSessions();
  const deleteSession = useDeleteSession();

  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});

  const rows = useMemo(() => (Array.isArray(sessions.data) ? sessions.data : []), [sessions.data]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!form.currentPassword) next.currentPassword = 'Required';
    if (!form.newPassword || form.newPassword.length < 8) next.newPassword = 'Min 8 characters';
    if (form.confirmPassword !== form.newPassword) next.confirmPassword = 'Passwords must match';
    setErrors(next);
    if (Object.keys(next).length) return;

    try {
      await updatePassword.mutateAsync({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword,
      });
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (_) {
      // toast handled in hook
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="text-lg font-semibold">Change password</div>
        <form onSubmit={onSubmit} className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Current password"
            name="currentPassword"
            type="password"
            value={form.currentPassword}
            onChange={(e) => setForm((s) => ({ ...s, currentPassword: e.target.value }))}
            error={errors.currentPassword}
          />
          <Input
            label="New password"
            name="newPassword"
            type="password"
            value={form.newPassword}
            onChange={(e) => setForm((s) => ({ ...s, newPassword: e.target.value }))}
            error={errors.newPassword}
          />
          <Input
            label="Confirm"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={(e) => setForm((s) => ({ ...s, confirmPassword: e.target.value }))}
            error={errors.confirmPassword}
          />
          <div className="md:col-span-3 flex justify-end">
            <Button type="submit" loading={updatePassword.isPending}>
              Update password
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}


import React, { useState } from 'react';
import {
  useAdminUsers,
  useCreateAdminUser,
  useTerminateUser,
  useUnterminateUser,
  useDeleteAdminUser,
} from '../../hooks/useAdminUsers';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import Spinner from '../../components/ui/Spinner';
import {
  Trash2,
  Power,
  UserPlus,
  Search,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';

export default function UserManagement() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const params = {
    page,
    search,
    ...(filter === 'verified' && { isVerified: 'true' }),
    ...(filter === 'unverified' && { isVerified: 'false' }),
    ...(filter === 'terminated' && { isTerminated: 'true' }),
  };

  const { data, isLoading } = useAdminUsers(params);
  const terminateMutation = useTerminateUser();
  const unterminateMutation = useUnterminateUser();
  const deleteMutation = useDeleteAdminUser();

  const handleTerminate = (id) => {
    if (window.confirm('Are you sure you want to terminate this user?')) {
      terminateMutation.mutate(id);
    }
  };

  const handleUnterminate = (id) => {
    unterminateMutation.mutate(id);
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        'Are you sure you want to permanently delete this user? This action cannot be undone.'
      )
    ) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-textPrimary">User Management</h1>
          <p className="text-textMuted text-sm">Manage all users across the platform</p>
        </div>
        <Button
          onClick={() => setCreateModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2"
        >
          <UserPlus className="w-5 h-5" />
          Create User
        </Button>
      </div>

      <Card className="p-4 bg-white/5 border-white/10">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-textMuted" />
            <Input
              placeholder="Search by name or email..."
              className="pl-10"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <div className="flex gap-1 bg-black/20 p-1 rounded-lg self-start">
            {['all', 'verified', 'unverified', 'terminated'].map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  setPage(1);
                }}
                className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-all ${
                  filter === f
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                    : 'text-textMuted hover:text-textPrimary hover:bg-white/5'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-white/10 text-textMuted text-sm">
              <tr>
                <th className="pb-3 font-medium px-4">Name</th>
                <th className="pb-3 font-medium px-4">Email</th>
                <th className="pb-3 font-medium px-4 text-center">Verified</th>
                <th className="pb-3 font-medium px-4 text-center">Status</th>
                <th className="pb-3 font-medium px-4">Created</th>
                <th className="pb-3 font-medium px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center">
                    <Spinner className="w-8 h-8 mx-auto" />
                  </td>
                </tr>
              ) : data?.items?.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-textMuted">
                    <div className="flex flex-col items-center gap-2">
                      <AlertCircle className="w-8 h-8 opacity-20" />
                      <p>No users found matching your criteria.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                data?.items.map((user) => (
                  <tr key={user.id} className="text-sm hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-medium text-textPrimary">{user.name}</div>
                      <div className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">
                        {user.role}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-textMuted">{user.email}</td>
                    <td className="py-4 px-4 text-center">
                      {user.isEmailVerified ? (
                        <Badge variant="success">Yes</Badge>
                      ) : (
                        <Badge variant="warning">No</Badge>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {user.isTerminated ? (
                        <Badge variant="danger">Terminated</Badge>
                      ) : !user.isEmailVerified ? (
                        <Badge variant="warning">Unverified</Badge>
                      ) : (
                        <Badge variant="success">Active</Badge>
                      )}
                    </td>
                    <td className="py-4 px-4 text-textMuted">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        {user.isTerminated ? (
                          <button
                            onClick={() => handleUnterminate(user.id)}
                            className="p-2 text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-colors"
                            title="Unterminate User"
                          >
                            <Power className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleTerminate(user.id)}
                            className="p-2 text-rose-400 hover:bg-rose-400/10 rounded-lg transition-colors"
                            title="Terminate User"
                          >
                            <Power className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors disabled:opacity-20"
                          title="Delete User"
                          disabled={user.role === 'superadmin'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {data?.meta?.totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-6 border-t border-white/10 gap-4">
            <div className="text-sm text-textMuted">
              Showing <span className="text-textPrimary">{(page - 1) * 20 + 1}</span> to{' '}
              <span className="text-textPrimary">
                {Math.min(page * 20, data.meta.total)}
              </span>{' '}
              of <span className="text-textPrimary">{data.meta.total}</span> users
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(data.meta.totalPages, p + 1))}
                disabled={page === data.meta.totalPages}
                className="flex items-center gap-1"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>

      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
    </div>
  );
}

function CreateUserModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'user',
  });
  const [errors, setErrors] = useState({});

  const createMutation = useCreateAdminUser();

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+$/i.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Min 8 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      createMutation.mutate(formData, {
        onSuccess: () => {
          setFormData({
            name: '',
            email: '',
            phone: '',
            password: '',
            role: 'user',
          });
          onClose();
        },
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Verified User">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-textMuted mb-1">Full Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter full name"
              error={errors.name}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-textMuted mb-1">Email Address</label>
            <Input
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter email address"
              error={errors.email}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-textMuted mb-1">Phone Number</label>
            <Input
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Enter phone number"
              error={errors.phone}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-textMuted mb-1">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-textPrimary focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none"
            >
              <option value="user" className="bg-[#1a1a1a] text-textPrimary">User</option>
              <option value="admin" className="bg-[#1a1a1a] text-textPrimary">Admin</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-textMuted mb-1">Password</label>
          <Input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Enter password (min 8 characters)"
            error={errors.password}
          />
        </div>

        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 text-sm text-indigo-400 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>
            User will be created as <strong>verified</strong> immediately. No OTP or email
            verification will be required for this account.
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-white/5 mt-6">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[120px]"
            isLoading={createMutation.isPending}
          >
            Create User
          </Button>
        </div>
      </form>
    </Modal>
  );
}

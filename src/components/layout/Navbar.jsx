import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, LogOut, User as UserIcon } from 'lucide-react';

import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import { useAuthStore } from '../../store/authStore';
import { useLogout } from '../../hooks/useAuth';

export default function Navbar() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const logout = useLogout();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const onLogout = () => {
    setOpen(false);
    logout.mutate(undefined, {
      onSettled: () => navigate('/login'),
    });
  };

  return (
    <div className="sticky top-0 z-40 bg-dark/80 backdrop-blur border-b border-white/10">
      <div className="px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-lg font-bold tracking-tight">
            <span className="text-primary">Cloud</span>Data
          </div>
        </div>

        <div className="relative" ref={menuRef}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setOpen((v) => !v)}
            className="gap-2"
          >
            <Avatar name={user?.name || user?.email || 'User'} size="sm" src={user?.avatar} />
            <span className="hidden sm:inline text-sm text-textPrimary max-w-[160px] truncate">
              {user?.name || user?.email || 'Account'}
            </span>
            <ChevronDown size={16} className="text-textMuted" />
          </Button>

          {open ? (
            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-white/10 bg-surface shadow-lg overflow-hidden">
              <button
                onClick={() => {
                  setOpen(false);
                  navigate('/settings');
                }}
                className="w-full px-4 py-3 text-sm text-left text-textPrimary hover:bg-white/5 flex items-center gap-2"
              >
                <UserIcon size={16} className="text-textMuted" />
                Profile
              </button>
              <button
                onClick={onLogout}
                className="w-full px-4 py-3 text-sm text-left text-danger hover:bg-white/5 flex items-center gap-2"
              >
                <LogOut size={16} className="text-danger" />
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}


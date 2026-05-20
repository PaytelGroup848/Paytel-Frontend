import React, { useState } from 'react';
import { X, Mail, User, Lock, Loader2, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCreateMailbox } from '../../hooks/useEmailHosting';
import toast from 'react-hot-toast';

export default function CreateMailboxModal({ isOpen, onClose, orderId, domain }) {
  const [localPart, setLocalPart] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const createMailboxMutation = useCreateMailbox(orderId);

  const validatePassword = (pass) => {
    const hasMinLength = pass.length >= 8;
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasLowerCase = /[a-z]/.test(pass);
    const hasNumber = /\d/.test(pass);
    const hasSpecialChar = /[@$!%*?&]/.test(pass);
    
    if (!hasMinLength) return 'Password must be at least 8 characters';
    if (!hasUpperCase) return 'Password must contain at least one uppercase letter';
    if (!hasLowerCase) return 'Password must contain at least one lowercase letter';
    if (!hasNumber) return 'Password must contain at least one number';
    if (!hasSpecialChar) return 'Password must contain at least one special character (@$!%*?&)';
    
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate password before submission
    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      toast.error(passwordValidationError, { style: { zIndex: 20000 } });
      setPasswordError(passwordValidationError);
      return;
    }
    
    setPasswordError('');
      
    // Validate
    if (!localPart.trim()) {
      toast.error('Please enter an email address', { style: { zIndex: 20000 } });
      return;
    }
    
    if (!password) {
      toast.error('Please enter a password', { style: { zIndex: 20000 } });
      return;
    }
    
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters', { style: { zIndex: 20000 } });
      return;
    }
    
    // Email format validation
    const emailRegex = /^[a-zA-Z0-9._-]+$/;
    if (!emailRegex.test(localPart)) {
      toast.error('Use only letters, numbers, dots, underscores, and hyphens', { style: { zIndex: 20000 } });
      return;
    }
    
    try {
      await createMailboxMutation.mutateAsync({
        local_part: localPart,
        name: name || localPart,
        password
      });
      
      toast.success(`Mailbox ${localPart}@${domain} created successfully!`, { style: { zIndex: 20000 } });
      onClose();
      
      // Reset form
      setLocalPart('');
      setName('');
      setPassword('');
      setShowPassword(false);
    } catch (err) {
      
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
          style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            background: 'rgba(15,23,42,0.6)',
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 16,
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              background: '#FFFFFF',
              borderRadius: 24,
              width: '100%', maxWidth: 480,
              overflow: 'hidden',
              boxShadow: '0 40px 100px rgba(0,0,0,0.25)',
            }}
          >
            <div style={{
              padding: '24px 32px',
              borderBottom: '1px solid #F1F5F9',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0F172A' }}>Create Mailbox</h2>
              <button 
                onClick={onClose} 
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#4F46E5'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#64748B'}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      style={{
                        width: '100%',
                        padding: '12px 16px 12px 44px',
                        borderRadius: 12,
                        border: '1.5px solid #E2E8F0',
                        fontSize: 14,
                        color: '#1E293B',
                        outline: 'none',
                        transition: 'all 0.2s',
                        paddingRight: '120px'
                      }}
                      type="text"
                      placeholder="john.doe"
                      value={localPart}
                      onChange={(e) => setLocalPart(e.target.value.toLowerCase())}
                      required
                      onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
                      onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
                    />
                    <span style={{ position: 'absolute', right: 16, color: '#64748B', fontWeight: 600, fontSize: 14 }}>
                      @{domain}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Display Name
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                  <input
                    style={{
                      width: '100%',
                      padding: '12px 16px 12px 44px',
                      borderRadius: 12,
                      border: '1.5px solid #E2E8F0',
                      fontSize: 14,
                      color: '#1E293B',
                      outline: 'none',
                      transition: 'all 0.2s',
                    }}
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
                    onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', zIndex: 1 }} />
                  <input
                    style={{
                      width: '100%',
                      padding: '12px 50px 12px 44px',
                      borderRadius: 12,
                      border: `1.5px solid ${passwordError ? '#EF4444' : '#E2E8F0'}`,
                      fontSize: 14,
                      color: '#1E293B',
                      outline: 'none',
                      transition: 'all 0.2s',
                    }}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Minimum 8 characters"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError('');
                    }}
                    required
                    onFocus={(e) => e.target.style.borderColor = passwordError ? '#EF4444' : '#4F46E5'}
                    onBlur={(e) => e.target.style.borderColor = passwordError ? '#EF4444' : '#E2E8F0'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: 14,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#94A3B8',
                      display: 'flex',
                      alignItems: 'center',
                      padding: 4,
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#4F46E5'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {passwordError && (
                  <p style={{ fontSize: 12, color: '#EF4444', marginTop: 4 }}>
                    {passwordError}
                  </p>
                )}
                <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>
                  Password must be at least 8 characters and include uppercase, lowercase, number, and special character (@$!%*?&)
                </p>
              </div>

              <motion.button
                type="submit"
                disabled={createMailboxMutation.isPending}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  marginTop: 10,
                  width: '100%',
                  padding: '14px',
                  borderRadius: 14,
                  border: 'none',
                  background: 'linear-gradient(135deg, #4F46E5 0%, #3e38ad 100%)',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: createMailboxMutation.isPending ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  boxShadow: '0 10px 25px rgba(79, 70, 229, 0.3)',
                  opacity: createMailboxMutation.isPending ? 0.7 : 1
                }}
              >
                {createMailboxMutation.isPending ? (
                  <>
                    <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                    Creating...
                  </>
                ) : (
                  'Create Mailbox'
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Add this CSS to your global styles or component
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);
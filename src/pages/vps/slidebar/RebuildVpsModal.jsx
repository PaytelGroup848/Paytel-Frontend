import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, AlertTriangle, Check, ArrowRight, ArrowLeft, 
  Eye, EyeOff, Shield, Server, RefreshCcw, CheckCircle2 
} from 'lucide-react';

import toast from 'react-hot-toast';
import { FaUbuntu } from "react-icons/fa";
import { SiAlmalinux } from "react-icons/si";
import { FcDebian } from "react-icons/fc";
import { FaCentos } from "react-icons/fa";


const OS_OPTIONS = [
  { name: 'Ubuntu 22.04', template: 'ubuntu-22.04-x86_64', icon: <FaUbuntu className='text-orange-600'/>, osid: 1199 },
  { name: 'Ubuntu 24.04 LTS', template: 'ubuntu-24.04-x86_64', icon: <FaUbuntu className='text-orange-600'/>, tag: 'LTS', osid: 1196 },
    { name: 'AlmaLinux 9', template: 'almalinux-9.7-x86_64', icon: <SiAlmalinux className='text-blue-600' />, osid: 1202 },
      { name: 'AlmaLinux 10', template: 'almalinux-10.1-x86_64	', icon: <SiAlmalinux className='text-blue-600' />, osid: 1205 },
        { name: 'Debian 11 Bullseye', template: 'debian-11-x86_64', icon: <FcDebian/>, osid: 983 },
  { name: 'Debian 12 Bookworm', template: 'debian-12-x86_64', icon: <FcDebian/>, tag: 'Stable', osid: 1057 },
  { name: 'CentOS Stream 8', template: 'centos-8.10-x86_64', icon: <FaCentos className='text-purple-600'/> , osid: 1166 },
    { name: 'CentOS Stream 10', template: 'centos-10.0-x86_64', icon: <FaCentos className='text-purple-600'/> , osid: 1181 },
];

const StepIndicator = ({ currentStep, steps }) => (
  <div className="flex items-center justify-between mb-8">
    {steps.map((step, index) => (
      <div key={index} className="flex-1 flex items-center">
        <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all ${
          currentStep > index + 1 
            ? 'border-green-500 bg-green-500 text-white' 
            : currentStep === index + 1 
              ? 'border-indigo-600 bg-indigo-600 text-white' 
              : 'border-slate-300 bg-white text-slate-400'
        }`}>
          {currentStep > index + 1 ? <Check size={14} /> : index + 1}
        </div>
        {index < steps.length - 1 && (
          <div className={`flex-1 h-0.5 mx-2 ${
            currentStep > index + 1 ? 'bg-green-500' : 'bg-slate-200'
          }`} />
        )}
      </div>
    ))}
  </div>
);

const Step1Warning = ({ onNext, hostname, onClose }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
        <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
          <AlertTriangle size={24} className="text-amber-600" />
        </div>
        <div>
          <h4 className="font-bold text-amber-800 text-sm">Destructive Action</h4>
          <p className="text-xs text-amber-600 mt-0.5">This will permanently delete all data</p>
        </div>
      </div>

      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <p className="text-sm text-slate-600">
          You will delete all current VPS data and install a new operating system on <strong className="text-slate-900">{hostname}</strong>
        </p>
      </div>

      <div className="space-y-3">
        <div className="bg-red-50 rounded-xl p-3 flex gap-2 border border-red-100">
          <AlertTriangle size={14} className="text-red-500 shrink-0 mt-0.5" />
          <p className="text-xs text-red-700">
            This will also delete any saved VPS snapshots and backups.
          </p>
        </div>
        
        <label className="flex items-start gap-3 cursor-pointer">
          <input 
            type="checkbox" 
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="text-sm text-slate-600">
            I recognize that all my files will be deleted and cannot be restored
          </span>
        </label>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:bg-slate-100 transition-all">
          Cancel
        </button>
        <button 
          onClick={onNext}
          disabled={!isChecked}
          className="px-6 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          Next <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

const Step2ChooseOS = ({ selectedOS, onSelectOS, onNext, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredOS = OS_OPTIONS.filter(os =>
    os.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="relative">
        <input
          type="text"
          placeholder="Search operating system..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[350px] overflow-y-auto">
        {filteredOS.map((os) => (
          <button
            key={os.template}
            onClick={() => onSelectOS(os)}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              selectedOS?.template === os.template
                ? 'border-indigo-500 bg-indigo-50/60 shadow-md'
                : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{os.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-slate-800 text-sm">{os.name}</p>
                  {os.tag && (
                    <span className="text-[9px] font-black bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">
                      {os.tag}
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">{os.template}</p>
              </div>
              {selectedOS?.template === os.template && (
                <CheckCircle2 size={18} className="text-indigo-600" />
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-between gap-3 pt-4">
        <button onClick={onBack} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:bg-slate-100 transition-all flex items-center gap-2">
          <ArrowLeft size={14} /> Back
        </button>
        <button 
          onClick={onNext}
          disabled={!selectedOS}
          className="px-6 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          Next <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

const Step3SetPassword = ({ newPassword, setNewPassword, onNext, onBack }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[$@#&!]/)) strength++;
    setPasswordStrength(strength);
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
    checkPasswordStrength(e.target.value);
  };

  const getStrengthText = () => {
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength <= 3) return 'Fair';
    if (passwordStrength <= 4) return 'Good';
    return 'Strong';
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    if (passwordStrength <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
        <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
          <Shield size={20} className="text-indigo-600" />
        </div>
        <div>
          <p className="font-bold text-slate-800 text-sm">Create new root password</p>
          <p className="text-xs text-slate-500 mt-0.5">
            Setting a strong and secure root password ensures the protection of your VPS
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">New Root Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={handlePasswordChange}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 pr-10"
            placeholder="Enter new root password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {newPassword && (
          <div className="mt-2">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full ${getStrengthColor()}`} style={{ width: `${(passwordStrength / 5) * 100}%` }} />
              </div>
              <span className="text-xs font-medium">{getStrengthText()}</span>
            </div>
            <ul className="text-[10px] text-slate-400 mt-2 space-y-0.5">
              <li className={newPassword.length >= 8 ? 'text-green-600' : ''}>✓ Minimum 8 characters</li>
              <li className={newPassword.match(/[A-Z]/) ? 'text-green-600' : ''}>✓ At least one uppercase letter</li>
              <li className={newPassword.match(/[0-9]/) ? 'text-green-600' : ''}>✓ At least one number</li>
            </ul>
          </div>
        )}
      </div>

      <div className="flex justify-between gap-3 pt-4">
        <button onClick={onBack} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:bg-slate-100 transition-all flex items-center gap-2">
          <ArrowLeft size={14} /> Back
        </button>
        <button 
          onClick={onNext}
          disabled={!newPassword || passwordStrength < 3}
          className="px-6 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          Next <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

const Step4ConfirmPassword = ({ confirmPassword, setConfirmPassword, onConfirm, onBack, loading, newPassword }) => (
  <div className="space-y-6">
    <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
      <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
        <AlertTriangle size={20} className="text-amber-600" />
      </div>
      <div>
        <p className="font-bold text-slate-800 text-sm">Confirm your password</p>
        <p className="text-xs text-slate-500 mt-0.5">
          Please re-enter the password to confirm
        </p>
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">Retype New Password</label>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Re-enter new root password"
      />
      {confirmPassword && newPassword !== confirmPassword && (
        <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
      )}
    </div>

    <div className="flex justify-between gap-3 pt-4">
      <button onClick={onBack} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:bg-slate-100 transition-all flex items-center gap-2">
        <ArrowLeft size={14} /> Back
      </button>
      <button 
        onClick={onConfirm}
        disabled={loading || !confirmPassword || newPassword !== confirmPassword}
        className="px-6 py-2.5 rounded-xl text-sm font-bold bg-red-600 text-white hover:bg-red-700 shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {loading ? <RefreshCcw className="animate-spin" size={14} /> : <Server size={14} />}
        Reinstall Virtual Server
      </button>
    </div>
  </div>
);

const Step5Loading = ({ selectedOS, progress }) => (
  <div className="text-center space-y-6 py-8">
    <div className="relative w-24 h-24 mx-auto">
      <div className="w-24 h-24 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Server size={32} className="text-indigo-600" />
      </div>
    </div>
    <div>
      <h4 className="text-lg font-black text-slate-800">Reinstalling {selectedOS?.name}</h4>
      <p className="text-sm text-slate-500 mt-1">This may take a few minutes...</p>
    </div>
    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
      <div className="bg-indigo-600 h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
    </div>
    <p className="text-xs text-slate-400">{progress}% completed</p>
  </div>
);

const Step6Success = ({ selectedOS, hostname, onClose }) => (
  <div className="text-center space-y-6 py-8">
    <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center">
      <CheckCircle2 size={40} className="text-green-600" />
    </div>
    <div>
      <h4 className="text-xl font-black text-slate-800">Rebuild Complete!</h4>
      <p className="text-sm text-slate-500 mt-1">
        {selectedOS?.name} has been successfully installed on <strong>{hostname}</strong>
      </p>
    </div>
    <button
      onClick={onClose}
      className="px-6 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-all"
    >
      Done
    </button>
  </div>
);

export default function RebuildVpsModal({ isOpen, onClose, instance, onRebuildComplete, type }) {
  const [step, setStep] = useState(1);
  const [selectedOS, setSelectedOS] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [progress, setProgress] = useState(0);
  const [isRebuilding, setIsRebuilding] = useState(false);

  const osType = instance?.planId?.type
 {console.log("this is my type", osType)}

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleConfirmRebuild = async () => {
  // Debug: Log what we have
  console.log('Instance object:', instance);
  console.log('Instance id:', instance?.id);
  console.log('Instance _id:', instance?._id);
  
  // Use id field (which exists) instead of _id
  const instanceId = instance?.id || instance?._id;
  
  if (!instance || !instanceId) {
    toast.error('Instance information is missing. Please refresh the page and try again.');
    console.error('Instance is missing or has no id:', instance);
    return;
  }
  
  if (!selectedOS || !newPassword || !confirmPassword) {
    toast.error('Please complete all steps');
    return;
  }
  
  setIsRebuilding(true);
  setStep(5);
  
  // Simulate progress
  const interval = setInterval(() => {
    setProgress(prev => {
      if (prev >= 90) {
        return prev;
      }
      return prev + 10;
    });
  }, 500);
  
  try {
    const rebuildData = {
      id: instanceId,  // Use the correct ID
      osId: selectedOS.osid,
      newPassword: newPassword,
      confirmPassword: confirmPassword
    };
    
    console.log('Rebuilding VPS with data:', rebuildData);
    
    await rebuildVps.mutateAsync(rebuildData);
    
    clearInterval(interval);
    setProgress(100);
    
    setTimeout(() => {
      setStep(6);
      if (onRebuildComplete) onRebuildComplete();
    }, 500);
    
  } catch (error) {
    clearInterval(interval);
    console.error('Rebuild failed:', error);
    toast.error('Rebuild failed: ' + (error.response?.data?.message || error.message));
    setIsRebuilding(false);
    setStep(4);
  }
};

  const handleClose = () => {
    setStep(1);
    setSelectedOS(null);
    setNewPassword('');
    setConfirmPassword('');
    setProgress(0);
    setIsRebuilding(false);
    onClose();
  };

  if (!instance) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-slate-800/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-white rounded-3xl max-w-2xl w-full relative z-10 shadow-2xl border border-slate-200 overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-red-50/80 to-white">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-red-100 rounded-xl">
                  <RefreshCcw className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Rebuild Operating System</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{instance?.hostname}</p>
                </div>
              </div>
              <button onClick={handleClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="p-6">
              {step <= 4 && (
                <StepIndicator 
                  currentStep={step} 
                  steps={['Warning', 'Choose OS', 'Set Password', 'Confirm']} 
                />
              )}

              {step === 1 && (
                <Step1Warning 
                  onNext={handleNext}
                  hostname={instance?.hostname} 
                  onClose={handleClose}
                />
              )}
              {step === 2 && (
                <Step2ChooseOS 
                  selectedOS={selectedOS}
                  onSelectOS={setSelectedOS}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}
              {step === 3 && (
                <Step3SetPassword 
                  newPassword={newPassword}
                  setNewPassword={setNewPassword}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}
              {step === 4 && (
                <Step4ConfirmPassword 
                  confirmPassword={confirmPassword}
                  setConfirmPassword={setConfirmPassword}
                  onConfirm={handleConfirmRebuild}
                  onBack={handleBack}
                  loading={isRebuilding}
                  newPassword={newPassword}
                />
              )}
              {step === 5 && (
                <Step5Loading selectedOS={selectedOS} progress={progress} />
              )}
              {step === 6 && (
                <Step6Success 
                  selectedOS={selectedOS} 
                  hostname={instance?.hostname} 
                  onClose={handleClose}
                />
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
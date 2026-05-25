// src/pages/vps/VpsSettings.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings as SettingsIcon,
  Globe,
  Key,
  Lock,
  Server,
  Cpu,
  HardDrive,
  Activity,
  Plus,
  Trash2,
  Copy,
  CheckCircle,
  AlertCircle,
  Save,
  X,
  CreditCard,
  EyeOff,
  Eye,
  ArrowRight
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useVpsInstance, useChangeRootPassword } from '../../../hooks/useVps';
import toast from "react-hot-toast";


// ------------------- MOCK DATA & HELPERS -------------------
const mockIPInfo = {
  ipv4: "195.35.21.221",
  ipv6: "2a03:2880:2130:cf07:face:b00c:0:1",
  device: "KVM Virtual Server",
  location: "Mumbai, India",
  isp: "CloudData Networks",
  ptrRecord: "server.cloudeata.com",
};

// Simulated API calls (replace with real axios/fetch)
const changeRootPassword = async (newPassword) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // Validate password strength etc.
  if (newPassword.length < 8) throw new Error("Password must be at least 8 characters");
  return { success: true };
};

const setPTRRecord = async (ptrValue) => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  if (!ptrValue) throw new Error("PTR record cannot be empty");
  return { success: true, ptr: ptrValue };
};

const deletePTRRecord = async () => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { success: true };
};

const createSSHKey = async (keyName, publicKey) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (!publicKey.startsWith("ssh-rsa") && !publicKey.startsWith("ssh-ed25519"))
    throw new Error("Invalid SSH public key format");
  return { success: true, fingerprint: "SHA256:abc123..." };
};

// ------------------- MAIN COMPONENT -------------------
export default function VpsSettings() {
  const [activeTab, setActiveTab] = useState("settings"); // "settings", "ip", "ssh"
 const { id } = useParams();
  const { data: instance, isLoading: isInstanceLoading } = useVpsInstance(id);
      console.log("THIS IS MY INSTANCE", instance)

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header with logo */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-6">
        <div className="p-3 bg-indigo-100 rounded-2xl">
          <SettingsIcon className="w-8 h-8 text-indigo-600" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800">Server Settings</h1>
          <p className="text-slate-500 text-sm mt-1">Manage root password, IP configuration, and SSH keys</p>
        </div>
      </div>

      {/* Toggle Buttons */}
      <div className="flex flex-wrap gap-3 border-b border-slate-200 pb-4">
        <TabButton
          active={activeTab === "settings"}
          onClick={() => setActiveTab("settings")}
          icon={<SettingsIcon size={18} />}
          label="Settings"
        />
        <TabButton
          active={activeTab === "ip"}
          onClick={() => setActiveTab("ip")}
          icon={<Globe size={18} />}
          label="IP Address"
        />
        {/* <TabButton
          active={activeTab === "ssh"}
          onClick={() => setActiveTab("ssh")}
          icon={<Key size={18} />}
          label="SSH Keys"
        /> */}
      </div>

      {/* Dynamic Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="mt-6"
        >
          {activeTab === "settings" && <SettingsSection />}
          {activeTab === "ip" && <IPSection />}
          {activeTab === "ssh" && <SSHSection />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ------------------- TAB BUTTON -------------------
const TabButton = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all
      ${
        active
          ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
          : "bg-white text-slate-600 hover:bg-indigo-50 border border-slate-200"
      }
    `}
  >
    {icon}
    {label}
  </button>
);

// ------------------- SETTINGS SECTION -------------------
const SettingsSection = () => {

    const [step, setStep] = useState(1); // 1: Current Password, 2: New Password, 3: Confirm Password
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ type: "", text: "" });
//  const [showPasswordForm, setShowPasswordForm] = useState(false);
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showCurrentPassword, setShowCurrentPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
  const navigate = useNavigate()

  const { id } = useParams();
  const { data: instance } = useVpsInstance(id);
  const changePassword = useChangeRootPassword();

  // VPS Config state (example)
  const [vpsConfig, setVpsConfig] = useState({
    cpuCores: 4,
    ramGB: 8,
    diskGB: 100,
  });
  const [tempConfig, setTempConfig] = useState(vpsConfig);


  const handleCurrentPasswordSubmit = (e) => {
    e.preventDefault();
    if (!currentPassword) {
      toast.error("Please enter current password");
      return;
    }
    setStep(2);
  };


 const handleNewPasswordSubmit = (e) => {
    e.preventDefault();
    
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    
    setStep(3);
  };

  const handleConfirmPasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    setIsLoading(true);
    try {
      await changePassword.mutateAsync({
        id: id,
        currentPassword: currentPassword,
        newPassword: newPassword,
      });
      
      // Reset form
      setStep(1);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Password changed successfully!");
      
    } catch (err) {
      console.error("Password change error:", err);
      toast.error(err.response?.data?.message || "Failed to change password");
    } finally {
      setIsLoading(false);
    }
  };


   const handleReset = () => {
    setStep(1);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[$@#&!]/)) strength++;
    
    if (strength <= 2) return { text: "Weak", color: "text-red-500" };
    if (strength <= 3) return { text: "Fair", color: "text-yellow-500" };
    if (strength <= 4) return { text: "Good", color: "text-blue-500" };
    return { text: "Strong", color: "text-green-500" };
  };

   const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    
    if (!newPassword.match(/[A-Z]/)) {
      toast.error("Password must contain at least one uppercase letter");
      return;
    }
    
    if (!newPassword.match(/[0-9]/)) {
      toast.error("Password must contain at least one number");
      return;
    }
    
    try {
      await changePassword.mutateAsync({
        id: id,
        currentPassword: currentPassword,
        newPassword: newPassword,
      });
      
      setShowPasswordForm(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error("Password change error:", err);
    }
  };




  return (
    <div className="space-y-6">
      {/* Change Root Password Card */}
        <Card>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-amber-100 rounded-xl">
            <Lock className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Root Password</h3>
            <p className="text-sm text-slate-500">Change the administrator password for your VPS</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                step >= s 
                  ? 'border-indigo-600 bg-indigo-600 text-white' 
                  : 'border-slate-300 bg-white text-slate-400'
              }`}>
                {step > s ? <CheckCircle size={16} /> : s}
              </div>
              {s < 3 && (
                <div className={`flex-1 h-0.5 mx-2 ${
                  step > s ? 'bg-indigo-600' : 'bg-slate-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Current Password */}
        {step === 1 && (
          <form onSubmit={handleCurrentPasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your current root password"
                  autoFocus
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full px-5 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
            >
              Continue <ArrowRight size={16} />
            </button>
          </form>
        )}

        {/* Step 2: New Password */}
        {step === 2 && (
          <form onSubmit={handleNewPasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter new root password"
                  autoFocus
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {newPassword && (
                <p className={`text-xs mt-1 ${getPasswordStrength(newPassword).color}`}>
                  Password strength: {getPasswordStrength(newPassword).text}
                </p>
              )}
              <p className="text-xs text-slate-400 mt-1">
                Minimum 6 characters
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 px-5 py-2 border border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 px-5 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
              >
                Continue <ArrowRight size={16} />
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Confirm Password */}
        {step === 3 && (
          <form onSubmit={handleConfirmPasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Re-enter new root password"
                  autoFocus
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {confirmPassword && newPassword !== confirmPassword && (
                <p className="text-xs text-red-500 mt-1">
                  Passwords do not match
                </p>
              )}
            </div>
            
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 px-5 py-2 border border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading || newPassword !== confirmPassword}
                className="flex-1 px-5 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Update Password
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </Card>

      {/* VPS Configuration Card */}
      <Card>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-xl">
              <Server className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">VPS Configuration</h3>
              <p className="text-sm text-slate-500">Upgrade or downgrade your resources</p>
            </div>
          </div>
          <button
              onClick={() => {
                navigate("/vps")
              }}
              className="px-4 py-2 text-sm font-semibold text-indigo-600 border border-indigo-200 rounded-xl hover:bg-indigo-50 transition"
            >
              Change Configuration
            </button>
        </div>

      
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
            <ConfigStat icon={<Cpu size={18} />} label="vCPU Cores" value={`${instance?.planId?.vcpu || 1}`} />
            <ConfigStat icon={<Activity size={18} />} label="RAM" value={`${instance?.planId?.ram}`} />
            <ConfigStat icon={<HardDrive size={18} />} label="Disk" value={`${instance?.planId?.storage}`} />
            <ConfigStat icon={<CreditCard  size={18} />} label="Current plan" value={`${instance?.planId?.name}`} />
          </div>
     
     
      </Card>
    </div>
  );
};

// ------------------- IP ADDRESS SECTION -------------------
const IPSection = () => {
  const [ptrValue, setPtrValue] = useState(mockIPInfo.ptrRecord);
  const [isEditingPtr, setIsEditingPtr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

    const { id } = useParams();
  const { data: instance, isLoading: isInstanceLoading } = useVpsInstance(id);

  const lastThree = instance?.ip ? instance.ip.split('.').pop() : '';

  const handleSetPTR = async () => {
    if (!ptrValue.trim()) {
      setMessage({ type: "error", text: "PTR record cannot be empty" });
      return;
    }
    setLoading(true);
    try {
      await setPTRRecord(ptrValue);
      setMessage({ type: "success", text: "PTR record updated successfully" });
      setIsEditingPtr(false);
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }
  };

  const handleDeletePTR = async () => {
    if (!confirm("Are you sure you want to delete the PTR record?")) return;
    setLoading(true);
    try {
      await deletePTRRecord();
      setPtrValue("");
      setMessage({ type: "success", text: "PTR record deleted" });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* IP Information Card */}
      <Card>
        <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
          <Globe size={20} /> IP Address Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoRow label="IPv4" value={`210.56.147.${lastThree}`} copyable />
          {/* <InfoRow label="IPv6" value={mockIPInfo.ipv6} copyable /> */}
          <InfoRow label="Device" value={instance?.os} />
          <InfoRow label="Location" value={instance?.location} />
          <InfoRow label="ISP" value={"Jio"} />
        </div>
      </Card>

      {/* PTR Record Card */}
      {/* <Card>
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <h3 className="font-bold text-slate-800">PTR Record (Reverse DNS)</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditingPtr(true)}
              className="px-3 py-1.5 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100"
            >
              Set PTR Record
            </button>
            <button
              onClick={handleDeletePTR}
              disabled={!ptrValue || loading}
              className="px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 disabled:opacity-40"
            >
              Delete PTR Record
            </button>
          </div>
        </div>

        {isEditingPtr ? (
          <div className="mt-3 space-y-3">
            <input
              type="text"
              value={ptrValue}
              onChange={(e) => setPtrValue(e.target.value)}
              placeholder="Enter PTR record (e.g., server.yourdomain.com)"
              className="w-full px-4 py-2 border border-slate-300 rounded-xl"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSetPTR}
                disabled={loading}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold"
              >
                {loading ? "Saving..." : "Save PTR Record"}
              </button>
              <button
                onClick={() => setIsEditingPtr(false)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 p-3 rounded-xl">
            <p className="text-sm text-slate-600">
              Current PTR: <span className="font-mono font-semibold">{ptrValue || "Not set"}</span>
            </p>
          </div>
        )}
      </Card> */}

      {message.text && (
        <div className={`flex items-center gap-2 p-3 rounded-xl ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {message.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          {message.text}
        </div>
      )}
    </div>
  );
};

// ------------------- SSH KEY SECTION -------------------
const SSHSection = () => {
  const [keys, setKeys] = useState([
    { id: 1, name: "Work Laptop", fingerprint: "SHA256:abc123...", publicKey: "ssh-rsa AAAAB3..." },
    { id: 2, name: "Home Desktop", fingerprint: "SHA256:def456...", publicKey: "ssh-rsa AAAAC3..." },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [keyName, setKeyName] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleCreateKey = async (e) => {
    e.preventDefault();
    if (!keyName.trim() || !publicKey.trim()) {
      setMessage({ type: "error", text: "Both name and public key are required" });
      return;
    }
    setLoading(true);
    try {
      const result = await createSSHKey(keyName, publicKey);
      const newKey = {
        id: Date.now(),
        name: keyName,
        fingerprint: result.fingerprint,
        publicKey: publicKey.slice(0, 30) + "...",
      };
      setKeys([...keys, newKey]);
      setMessage({ type: "success", text: "SSH key added successfully" });
      setShowForm(false);
      setKeyName("");
      setPublicKey("");
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }
  };

  const handleDeleteKey = (id) => {
    if (confirm("Remove this SSH key?")) {
      setKeys(keys.filter((k) => k.id !== id));
      setMessage({ type: "success", text: "SSH key removed" });
      setTimeout(() => setMessage({ type: "", text: "" }), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <h3 className="font-bold text-slate-800 text-xl">SSH Keys</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
        >
          <Plus size={18} /> Add SSH Key
        </button>
      </div>

      {showForm && (
        <Card>
          <form onSubmit={handleCreateKey} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Key Name (e.g., My Laptop)</label>
              <input
                type="text"
                value={keyName}
                onChange={(e) => setKeyName(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-slate-300 rounded-xl"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Public Key</label>
              <textarea
                value={publicKey}
                onChange={(e) => setPublicKey(e.target.value)}
                rows={3}
                className="mt-1 w-full px-4 py-2 border border-slate-300 rounded-xl font-mono text-sm"
                placeholder="ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQ..."
                required
              />
              <p className="text-xs text-slate-400 mt-1">Paste your public key (starts with ssh-rsa, ssh-ed25519, etc.)</p>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold disabled:opacity-50"
              >
                {loading ? "Adding..." : "Add Key"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {keys.map((key) => (
          <Card key={key.id}>
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-slate-800">{key.name}</h4>
                <p className="text-xs text-slate-500 font-mono mt-1">{key.fingerprint}</p>
                <p className="text-xs text-slate-400 mt-2">{key.publicKey}</p>
              </div>
              <button
                onClick={() => handleDeleteKey(key.id)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </Card>
        ))}
      </div>

      {keys.length === 0 && !showForm && (
        <div className="text-center py-10 text-slate-400">No SSH keys added. Click "Add SSH Key" to get started.</div>
      )}

      {message.text && (
        <div className={`flex items-center gap-2 p-3 rounded-xl ${message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {message.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          {message.text}
        </div>
      )}
    </div>
  );
};

// ------------------- REUSABLE COMPONENTS -------------------
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm p-5 ${className}`}>{children}</div>
);

const InfoRow = ({ label, value, copyable = false }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="flex justify-between items-center border-b border-slate-100 pb-2">
      <span className="text-sm text-slate-500">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm font-mono font-medium text-slate-700">{value}</span>
        {copyable && (
          <button onClick={handleCopy} className="text-slate-400 hover:text-indigo-600">
            {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
          </button>
        )}
      </div>
    </div>
  );
};

const ConfigStat = ({ icon, label, value }) => (
  <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl">
    {icon}
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="font-bold text-slate-800">{value}</p>
    </div>
  </div>
);
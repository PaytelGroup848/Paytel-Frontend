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
  X
} from "lucide-react";

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
        <TabButton
          active={activeTab === "ssh"}
          onClick={() => setActiveTab("ssh")}
          icon={<Key size={18} />}
          label="SSH Keys"
        />
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
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showConfigForm, setShowConfigForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // VPS Config state (example)
  const [vpsConfig, setVpsConfig] = useState({
    cpuCores: 4,
    ramGB: 8,
    diskGB: 100,
  });
  const [tempConfig, setTempConfig] = useState(vpsConfig);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      return;
    }
    setLoading(true);
    try {
      await changeRootPassword(newPassword);
      setMessage({ type: "success", text: "Root password changed successfully!" });
      setShowPasswordForm(false);
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }
  };

  const handleConfigSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call to upgrade/downgrade VPS
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setVpsConfig(tempConfig);
    setMessage({ type: "success", text: "VPS configuration updated! (demo)" });
    setShowConfigForm(false);
    setLoading(false);
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Change Root Password Card */}
      <Card>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-xl">
              <Lock className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">Root Password</h3>
              <p className="text-sm text-slate-500">Change the administrator password for your VPS</p>
            </div>
          </div>
          {!showPasswordForm ? (
            <button
              onClick={() => setShowPasswordForm(true)}
              className="px-4 py-2 text-sm font-semibold text-indigo-600 border border-indigo-200 rounded-xl hover:bg-indigo-50 transition"
            >
              Change Password
            </button>
          ) : (
            <button
              onClick={() => setShowPasswordForm(false)}
              className="text-sm text-slate-400 hover:text-slate-600"
            >
              Cancel
            </button>
          )}
        </div>

        {showPasswordForm && (
          <form onSubmit={handlePasswordSubmit} className="mt-4 pt-4 border-t border-slate-100 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500"
                required
                minLength={8}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? "Updating..." : "Update Password"}
              <Save size={16} />
            </button>
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
          {!showConfigForm ? (
            <button
              onClick={() => {
                setTempConfig(vpsConfig);
                setShowConfigForm(true);
              }}
              className="px-4 py-2 text-sm font-semibold text-indigo-600 border border-indigo-200 rounded-xl hover:bg-indigo-50 transition"
            >
              Change Configuration
            </button>
          ) : (
            <button onClick={() => setShowConfigForm(false)} className="text-sm text-slate-400">
              Cancel
            </button>
          )}
        </div>

        {!showConfigForm ? (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <ConfigStat icon={<Cpu size={18} />} label="vCPU Cores" value={vpsConfig.cpuCores} />
            <ConfigStat icon={<Activity size={18} />} label="RAM" value={`${vpsConfig.ramGB} GB`} />
            <ConfigStat icon={<HardDrive size={18} />} label="Disk" value={`${vpsConfig.diskGB} GB NVMe`} />
          </div>
        ) : (
          <form onSubmit={handleConfigSubmit} className="mt-4 pt-4 border-t border-slate-100 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">vCPU Cores</label>
                <select
                  value={tempConfig.cpuCores}
                  onChange={(e) => setTempConfig({ ...tempConfig, cpuCores: parseInt(e.target.value) })}
                  className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-xl"
                >
                  <option value={2}>2 cores</option>
                  <option value={4}>4 cores</option>
                  <option value={8}>8 cores</option>
                  <option value={16}>16 cores</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">RAM</label>
                <select
                  value={tempConfig.ramGB}
                  onChange={(e) => setTempConfig({ ...tempConfig, ramGB: parseInt(e.target.value) })}
                  className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-xl"
                >
                  <option value={4}>4 GB</option>
                  <option value={8}>8 GB</option>
                  <option value={16}>16 GB</option>
                  <option value={32}>32 GB</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Disk Space</label>
                <select
                  value={tempConfig.diskGB}
                  onChange={(e) => setTempConfig({ ...tempConfig, diskGB: parseInt(e.target.value) })}
                  className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-xl"
                >
                  <option value={50}>50 GB</option>
                  <option value={100}>100 GB</option>
                  <option value={200}>200 GB</option>
                  <option value={500}>500 GB</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "Applying..." : "Apply Changes"}
            </button>
          </form>
        )}
      </Card>

      {/* Global message */}
      {message.text && (
        <div
          className={`flex items-center gap-2 p-3 rounded-xl ${
            message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          {message.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          {message.text}
        </div>
      )}
    </div>
  );
};

// ------------------- IP ADDRESS SECTION -------------------
const IPSection = () => {
  const [ptrValue, setPtrValue] = useState(mockIPInfo.ptrRecord);
  const [isEditingPtr, setIsEditingPtr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

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
          <InfoRow label="IPv4" value={mockIPInfo.ipv4} copyable />
          <InfoRow label="IPv6" value={mockIPInfo.ipv6} copyable />
          <InfoRow label="Device" value={mockIPInfo.device} />
          <InfoRow label="Location" value={mockIPInfo.location} />
          <InfoRow label="ISP" value={mockIPInfo.isp} />
        </div>
      </Card>

      {/* PTR Record Card */}
      <Card>
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
      </Card>

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
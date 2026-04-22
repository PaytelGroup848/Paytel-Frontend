import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Edit2, Trash2, Shield, CheckCircle, X, Calendar, Activity,
  Server, Save, Users, Eye, ChevronRight, List, AlertTriangle,
  Search, ToggleLeft, ToggleRight, Trash
} from 'lucide-react';

// Helper for unique IDs
const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Date.now() + '-' + Math.random().toString(36).substr(2, 9);
};

// Initial mock data
const initialFirewalls = [
  {
    id: 1,
    name: 'web-server',
    status: 'Active',
    createdAt: '2024-07-30',
    updatedAt: '2024-12-06',
    rules: [
      { id: 101, protocol: 'TCP', port: '22', source: '0.0.0.0/0', action: 'ALLOW', description: 'SSH access' },
      { id: 102, protocol: 'TCP', port: '80,443', source: '0.0.0.0/0', action: 'ALLOW', description: 'HTTP/HTTPS' },
    ]
  },
  {
    id: 2,
    name: 'database',
    status: 'Active',
    createdAt: '2024-12-06',
    updatedAt: '2024-12-06',
    rules: [
      { id: 201, protocol: 'TCP', port: '3306', source: '10.0.0.0/8', action: 'ALLOW', description: 'MySQL internal' }
    ]
  }
];

// ------------------- MODAL COMPONENTS -------------------
const ModalBackdrop = ({ children, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    onClick={onClose}
  >
    {children}
  </motion.div>
);

const ModalContent = ({ children, title, icon, onClose, maxWidth = "max-w-md" }) => (
  <motion.div
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.95, opacity: 0 }}
    className={`bg-white rounded-2xl shadow-2xl w-full ${maxWidth} max-h-[90vh] overflow-y-auto`}
    onClick={e => e.stopPropagation()}
  >
    <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
      <h2 className="text-xl font-bold flex items-center gap-2">{icon} {title}</h2>
      <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
    </div>
    <div className="p-6">{children}</div>
  </motion.div>
);

const TeamModal = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <ModalBackdrop onClose={onClose}>
        <ModalContent title="Team Access" icon={<Users size={24} className="text-indigo-600" />} onClose={onClose}>
          <p className="text-slate-600 mb-4">Manage team members who can configure firewalls.</p>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
              <div><p className="font-medium">admin@cloudedata.com</p><p className="text-xs text-slate-400">Owner</p></div>
              <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">Full access</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
              <div><p className="font-medium">devops@cloudedata.com</p><p className="text-xs text-slate-400">Can edit rules</p></div>
              <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">Editor</span>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <input type="email" placeholder="Enter email address" className="flex-1 px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500" />
            <button className="px-5 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700">Invite</button>
          </div>
        </ModalContent>
      </ModalBackdrop>
    )}
  </AnimatePresence>
);

const RulesModal = ({ firewall, onClose, onUpdateRule, onDeleteRule, onAddRule }) => {
  if (!firewall) return null;
  return (
    <AnimatePresence>
      <ModalBackdrop onClose={onClose}>
        <ModalContent title={`Rules for ${firewall.name}`} icon={<Shield size={20} className="text-indigo-600" />} onClose={onClose} maxWidth="max-w-4xl">
          <button
            onClick={onAddRule}
            className="mb-5 flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            <Plus size={16} /> Add Rule
          </button>
          <div className="space-y-3">
            {firewall.rules.map(rule => (
              <div key={rule.id} className="border border-slate-200 rounded-xl p-4 hover:shadow-sm transition">
                <div className="flex justify-between items-start">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap gap-2">
                      <select
                        value={rule.protocol}
                        onChange={e => onUpdateRule(rule.id, 'protocol', e.target.value)}
                        className="text-xs border border-slate-200 rounded-lg px-2 py-1 bg-white"
                      >
                        <option>TCP</option><option>UDP</option><option>ICMP</option>
                      </select>
                      <input
                        type="text"
                        value={rule.port}
                        onChange={e => onUpdateRule(rule.id, 'port', e.target.value)}
                        placeholder="Port"
                        className="text-xs border border-slate-200 rounded-lg px-2 py-1 w-24"
                      />
                      <input
                        type="text"
                        value={rule.source}
                        onChange={e => onUpdateRule(rule.id, 'source', e.target.value)}
                        placeholder="Source (CIDR)"
                        className="text-xs border border-slate-200 rounded-lg px-2 py-1 w-36"
                      />
                      <select
                        value={rule.action}
                        onChange={e => onUpdateRule(rule.id, 'action', e.target.value)}
                        className="text-xs border border-slate-200 rounded-lg px-2 py-1"
                      >
                        <option value="ALLOW">Allow</option><option value="DENY">Deny</option>
                      </select>
                      <input
                        type="text"
                        value={rule.description || ''}
                        onChange={e => onUpdateRule(rule.id, 'description', e.target.value)}
                        placeholder="Description"
                        className="text-xs border border-slate-200 rounded-lg px-2 py-1 flex-1"
                      />
                    </div>
                  </div>
                  <button onClick={() => onDeleteRule(rule.id)} className="text-slate-400 hover:text-red-600 p-1 ml-2">
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {firewall.rules.length === 0 && (
            <div className="text-center py-8 text-slate-400">
              <Shield size={48} className="mx-auto mb-2 opacity-40" />
              No rules added yet.
            </div>
          )}
        </ModalContent>
      </ModalBackdrop>
    </AnimatePresence>
  );
};

const FirewallFormModal = ({ isOpen, onClose, editingFirewall, initialForm, onSave }) => {
  const [form, setForm] = useState(initialForm);

  // Reset form only when modal opens (not on every prop change)
  useEffect(() => {
    if (isOpen) {
      setForm(initialForm);
    }
  }, [isOpen, initialForm]);

  const addRuleToForm = () => {
    setForm(prev => ({
      ...prev,
      rules: [...prev.rules, { id: generateId(), protocol: 'TCP', port: '', source: '', action: 'ALLOW', description: '' }]
    }));
  };

  const updateRuleInForm = (ruleId, field, value) => {
    setForm(prev => ({
      ...prev,
      rules: prev.rules.map(rule => rule.id === ruleId ? { ...rule, [field]: value } : rule)
    }));
  };

  const removeRuleFromForm = (ruleId) => {
    setForm(prev => ({
      ...prev,
      rules: prev.rules.filter(rule => rule.id !== ruleId)
    }));
  };

  const handleSave = () => {
    if (!form.name.trim()) return;
    onSave(form);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalBackdrop onClose={onClose}>
          <ModalContent
            title={editingFirewall ? 'Edit Firewall' : 'Create New Firewall'}
            icon={<Shield size={20} className="text-indigo-600" />}
            onClose={onClose}
            maxWidth="max-w-3xl"
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Firewall Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g., web-server, database"
                    className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, status: true })}
                      className={`px-4 py-2 rounded-xl font-semibold transition ${form.status ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}
                    >
                      Active
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, status: false })}
                      className={`px-4 py-2 rounded-xl font-semibold transition ${!form.status ? 'bg-slate-600 text-white' : 'bg-slate-100 text-slate-600'}`}
                    >
                      Inactive
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-sm font-medium text-slate-700">Firewall Rules</label>
                  <button type="button" onClick={addRuleToForm} className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700 font-semibold">
                    <Plus size={14} /> Add Rule
                  </button>
                </div>
                <div className="space-y-3">
                  {form.rules.map((rule, idx) => (
                    <div key={rule.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-slate-400">Rule {idx + 1}</span>
                        <button onClick={() => removeRuleFromForm(rule.id)} className="text-slate-400 hover:text-red-600">
                          <Trash size={14} />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <select
                          value={rule.protocol}
                          onChange={e => updateRuleInForm(rule.id, 'protocol', e.target.value)}
                          className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
                        >
                          <option>TCP</option><option>UDP</option><option>ICMP</option>
                        </select>
                        <input
                          type="text"
                          placeholder="Port (e.g., 80, 443, 3000-4000)"
                          value={rule.port}
                          onChange={e => updateRuleInForm(rule.id, 'port', e.target.value)}
                          className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Source IP/CIDR (e.g., 0.0.0.0/0)"
                          value={rule.source}
                          onChange={e => updateRuleInForm(rule.id, 'source', e.target.value)}
                          className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
                        />
                        <select
                          value={rule.action}
                          onChange={e => updateRuleInForm(rule.id, 'action', e.target.value)}
                          className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
                        >
                          <option value="ALLOW">Allow</option><option value="DENY">Deny</option>
                        </select>
                        <input
                          type="text"
                          placeholder="Description (optional)"
                          value={rule.description}
                          onChange={e => updateRuleInForm(rule.id, 'description', e.target.value)}
                          className="px-3 py-2 border border-slate-300 rounded-lg text-sm sm:col-span-2"
                        />
                      </div>
                    </div>
                  ))}
                  {form.rules.length === 0 && (
                    <p className="text-center text-slate-400 text-sm py-4">No rules added. Click "Add Rule" to create one.</p>
                  )}
                </div>
              </div>

              <button
                onClick={handleSave}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition flex items-center justify-center gap-2"
              >
                <Save size={18} /> {editingFirewall ? 'Update Firewall' : 'Create Firewall'}
              </button>
            </div>
          </ModalContent>
        </ModalBackdrop>
      )}
    </AnimatePresence>
  );
};

// ------------------- MAIN COMPONENT -------------------
const FirewallManager = () => {
  const [firewalls, setFirewalls] = useState(initialFirewalls);
  const [fwModalOpen, setFwModalOpen] = useState(false);
  const [editingFw, setEditingFw] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [selectedFirewall, setSelectedFirewall] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Memoize initial form to avoid unnecessary resets
  const initialForm = useMemo(() => ({
    name: editingFw ? editingFw.name : '',
    status: editingFw ? editingFw.status === 'Active' : true,
    rules: editingFw ? editingFw.rules.map(r => ({ ...r })) : [{ id: generateId(), protocol: 'TCP', port: '', source: '', action: 'ALLOW', description: '' }]
  }), [editingFw]);

  const openAddFirewall = () => {
    setEditingFw(null);
    setFwModalOpen(true);
  };

  const openEditFirewall = (fw) => {
    setEditingFw(fw);
    setFwModalOpen(true);
  };

  const saveFirewall = (formData) => {
    const today = new Date().toISOString().split('T')[0];
    const statusText = formData.status ? 'Active' : 'Inactive';
    const cleanedRules = formData.rules.filter(r => r.port && r.source);

    if (editingFw) {
      setFirewalls(prev =>
        prev.map(fw =>
          fw.id === editingFw.id
            ? { ...fw, name: formData.name, status: statusText, rules: cleanedRules, updatedAt: today }
            : fw
        )
      );
    } else {
      setFirewalls(prev => [
        ...prev,
        {
          id: generateId(),
          name: formData.name,
          status: statusText,
          createdAt: today,
          updatedAt: today,
          rules: cleanedRules
        }
      ]);
    }
    setFwModalOpen(false);
  };

  const toggleFirewallStatus = (fwId, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    setFirewalls(prev =>
      prev.map(fw =>
        fw.id === fwId ? { ...fw, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] } : fw
      )
    );
  };

  const confirmDeleteFirewall = (fw) => setDeleteConfirm(fw);
  const deleteFirewall = () => {
    setFirewalls(prev => prev.filter(fw => fw.id !== deleteConfirm.id));
    setDeleteConfirm(null);
  };

  // Rules management callbacks
  const updateRuleInFirewall = (ruleId, field, value) => {
    setFirewalls(prev =>
      prev.map(fw =>
        fw.id === selectedFirewall.id
          ? {
              ...fw,
              rules: fw.rules.map(rule => rule.id === ruleId ? { ...rule, [field]: value } : rule),
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : fw
      )
    );
  };

  const deleteRuleFromFirewall = (ruleId) => {
    setFirewalls(prev =>
      prev.map(fw =>
        fw.id === selectedFirewall.id
          ? {
              ...fw,
              rules: fw.rules.filter(rule => rule.id !== ruleId),
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : fw
      )
    );
  };

  const addRuleToFirewall = () => {
    const newRule = {
      id: generateId(),
      protocol: 'TCP',
      port: '',
      source: '',
      action: 'ALLOW',
      description: ''
    };
    setFirewalls(prev =>
      prev.map(fw =>
        fw.id === selectedFirewall.id
          ? {
              ...fw,
              rules: [...fw.rules, newRule],
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : fw
      )
    );
  };

  const filteredFirewalls = firewalls.filter(fw =>
    fw.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 flex items-center gap-3">
              <Shield className="text-indigo-600" size={32} />
              Firewall Configuration
            </h1>
            <p className="text-slate-500 mt-1">Manage security groups, inbound rules, and team access</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setTeamModalOpen(true)} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-indigo-200 text-indigo-600 hover:bg-indigo-50 font-bold rounded-xl transition shadow-sm">
              <Users size={18} /> Team
            </button>
            <button onClick={openAddFirewall} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition shadow-lg shadow-indigo-200 active:scale-95">
              <Plus size={18} /> Add Firewall
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><Server size={24} /></div>
            <div><p className="text-xs font-bold text-slate-400 uppercase">Total Firewalls</p><p className="text-2xl font-extrabold text-slate-800">{firewalls.length}</p></div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><Activity size={24} /></div>
            <div><p className="text-xs font-bold text-slate-400 uppercase">Active</p><p className="text-2xl font-extrabold text-slate-800">{firewalls.filter(f => f.status === 'Active').length}</p></div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center gap-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><List size={24} /></div>
            <div><p className="text-xs font-bold text-slate-400 uppercase">Total Rules</p><p className="text-2xl font-extrabold text-slate-800">{firewalls.reduce((sum, f) => sum + f.rules.length, 0)}</p></div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search firewalls..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Firewall Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFirewalls.map((fw) => (
            <motion.div
              key={fw.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl shadow-md">
                      <Shield size={20} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">{fw.name}</h3>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => openEditFirewall(fw)} className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg transition">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => confirmDeleteFirewall(fw)} className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 mt-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Status</span>
                    <button
                      onClick={() => toggleFirewallStatus(fw.id, fw.status)}
                      className={`flex items-center gap-2 px-2 py-1 rounded-full text-xs font-bold transition ${
                        fw.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {fw.status === 'Active' ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                      {fw.status}
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Rules</span>
                    <span className="font-semibold text-slate-700">{fw.rules.length} rules</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <Calendar size={12} className="text-slate-400" />
                    <span className="text-slate-500">Created: {fw.createdAt}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedFirewall(fw)}
                  className="mt-5 w-full flex items-center justify-center gap-2 py-2.5 bg-slate-50 hover:bg-indigo-50 text-indigo-600 font-semibold rounded-xl transition"
                >
                  <Eye size={16} /> Manage Rules <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredFirewalls.length === 0 && (
          <div className="text-center py-20">
            <Shield className="mx-auto text-slate-300" size={48} />
            <h3 className="mt-4 text-lg font-semibold text-slate-700">No firewalls found</h3>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {deleteConfirm && (
            <ModalBackdrop onClose={() => setDeleteConfirm(null)}>
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6" onClick={e => e.stopPropagation()}>
                <div className="flex items-center gap-3 text-red-600 mb-4">
                  <AlertTriangle size={24} />
                  <h3 className="text-xl font-bold">Delete Firewall</h3>
                </div>
                <p className="text-slate-600 mb-6">
                  Are you sure you want to delete <strong>{deleteConfirm.name}</strong>? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button onClick={() => setDeleteConfirm(null)} className="flex-1 px-4 py-2 border border-slate-200 rounded-xl font-medium">Cancel</button>
                  <button onClick={deleteFirewall} className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium">Delete</button>
                </div>
              </div>
            </ModalBackdrop>
          )}
        </AnimatePresence>

        {/* Modals */}
        <TeamModal isOpen={teamModalOpen} onClose={() => setTeamModalOpen(false)} />
        <RulesModal
          firewall={selectedFirewall}
          onClose={() => setSelectedFirewall(null)}
          onUpdateRule={updateRuleInFirewall}
          onDeleteRule={deleteRuleFromFirewall}
          onAddRule={addRuleToFirewall}
        />
        <FirewallFormModal
          isOpen={fwModalOpen}
          onClose={() => setFwModalOpen(false)}
          editingFirewall={editingFw}
          initialForm={initialForm}
          onSave={saveFirewall}
        />
      </div>
    </div>
  );
};

export default FirewallManager;
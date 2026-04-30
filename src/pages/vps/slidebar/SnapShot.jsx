import { useState } from 'react';
import { 
  FaCameraRetro, FaShieldAlt, FaCrown, FaCheckCircle, FaTimes, 
  FaArrowUp, FaClock, FaDatabase, FaRegCalendarAlt, FaMapMarkerAlt, 
  FaHdd, FaUbuntu, FaHourglassHalf, FaSyncAlt, FaUndoAlt, 
  FaCamera, FaPlusCircle, FaTrashAlt, FaStopwatch, FaRegCalendarPlus,
  FaRegCalendarTimes, FaLock, FaTimesCircle
} from 'react-icons/fa';
import { FaCircleInfo } from "react-icons/fa6";

// Helper: format current date as "YYYY-MM-DD HH:MM"
const getCurrentFormattedDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

// expiration = today + 20 days (YYYY-MM-DD)
const getExpirationPlusDays = (days = 20) => {
  const expDate = new Date();
  expDate.setDate(expDate.getDate() + days);
  const year = expDate.getFullYear();
  const month = String(expDate.getMonth() + 1).padStart(2, '0');
  const day = String(expDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// unique id generator
const generateId = () => `snap_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;

function SnapShot() {
  // ---------- State ----------
  const [snapshots, setSnapshots] = useState([
    {
      id: 'snap_001',
      createdDate: '2026-04-25 17:25',
      expirationDate: '2026-05-15',
      restoreTime: '30m',
    },
  ]);
  const [upgradeCardVisible, setUpgradeCardVisible] = useState(true);

  // ---------- Snapshot actions ----------
  const addSnapshot = () => {
    const newSnapshot = {
      id: generateId(),
      createdDate: getCurrentFormattedDate(),
      expirationDate: getExpirationPlusDays(20),
      restoreTime: '30m',
    };
    setSnapshots(prev => [...prev, newSnapshot]);
    showToast('New snapshot created', '#10b981');
  };

  const deleteSnapshot = (id) => {
    if (window.confirm('Delete this snapshot permanently? This action cannot be undone.')) {
      setSnapshots(prev => prev.filter(s => s.id !== id));
      showToast('Snapshot removed', '#ef4444');
    }
  };

  const restoreSnapshot = (snapshot) => {
    alert(` RESTORE INITIATED\n\nSnapshot from ${snapshot.createdDate} is being restored.\nEstimated time: ${snapshot.restoreTime}\nYour data will be rolled back to this exact point.`);
  };

  // ---------- Upgrade card ----------
  const handleUpgrade = () => {
    alert(" UPGRADE TO DAILY BACKUPS\n\nAutomated daily backups will be enabled immediately.\n• Daily retention: 30 days\n• Priority support\n• ₹269.00/month will be charged to your payment method.");
    showToast('Upgrade requested! Daily protection activated.', '#8b5cf6');
  };

  const closeUpgradeCard = () => {
    setUpgradeCardVisible(false);
    showToast('Upgrade offer dismissed', '#6c757d');
  };

  // ---------- Toast helper (non‑intrusive) ----------
  const showToast = (message, bgColor) => {
    const toast = document.createElement('div');
    toast.innerText = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '24px';
    toast.style.right = '24px';
    toast.style.backgroundColor = bgColor;
    toast.style.color = 'white';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '40px';
    toast.style.fontSize = '14px';
    toast.style.fontWeight = '500';
    toast.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
    toast.style.zIndex = '9999';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    toast.style.gap = '8px';
    toast.innerHTML = `<span style="margin-right: 6px;">🔔</span> ${message}`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-[#f0f2f8] font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* Header */}
        <div className="flex flex-wrap justify-between items-end mb-8 border-b border-gray-200/80 pb-5">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-800 flex items-center gap-3">
              <FaCameraRetro className="text-indigo-500 text-3xl" />
              Snapshots & Backups
            </h1>
            <p className="text-slate-500 mt-1 text-sm">Point-in-time recovery & automated data protection</p>
          </div>
          <div className="mt-3 md:mt-0">
            <span className="bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-slate-600 border border-slate-200 shadow-sm">
              <FaShieldAlt className="inline text-emerald-600 mr-1" /> Active protection
            </span>
          </div>
        </div>

        {/* Two column: Upgrade card + Auto-backups card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          
          {/* Upgrade Card (daily backups) - conditionally rendered */}
          {upgradeCardVisible && (
            <div className="bg-white rounded-2xl shadow-md border border-indigo-100 overflow-hidden transition-all hover:shadow-lg">
              <div className="p-5 pb-3 flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <FaCrown className="text-amber-500 text-xl" />
                    <h2 className="text-xl font-bold text-slate-800">Upgrade to automated daily backups</h2>
                  </div>
                  <div className="mt-3 space-y-1.5 text-slate-600">
                    <p className="flex items-center gap-2 text-sm"><FaCheckCircle className="text-emerald-500" /> Data protected every day</p>
                    <p className="flex items-center gap-2 text-sm"><FaCheckCircle className="text-emerald-500" /> Backups run automatically</p>
                    <p className="flex items-center gap-2 text-sm"><FaCheckCircle className="text-emerald-500" /> Hassle-free data restoration</p>
                  </div>
                </div>
                <button onClick={closeUpgradeCard} className="text-gray-400 hover:text-gray-700 bg-gray-50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-200">
                  <FaTimes />
                </button>
              </div>
              <div className="px-5 pb-5 pt-2 border-t border-gray-100 mt-2 flex justify-between items-center">
                <div>
                  <span className="text-2xl font-extrabold text-slate-800">₹ 269.00</span>
                  <span className="text-sm text-slate-500"> /mo</span>
                  <div className="text-xs text-slate-400 mt-0.5">+ taxes, billed monthly</div>
                </div>
                <button onClick={handleUpgrade} className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-md shadow-indigo-200 flex items-center gap-2 transition-all active:scale-95">
                  <FaArrowUp /> Upgrade
                </button>
              </div>
            </div>
          )}

          {/* Auto-backups (Weekly) Card */}
          <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden hover:shadow-lg transition-all">
            <div className="bg-slate-50 px-5 py-3 border-b border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FaClock className="text-sky-600" />
                <h2 className="font-bold text-slate-700">Auto-backups <span className="bg-sky-100 text-sky-700 text-xs px-2 py-0.5 rounded-full ml-2">Weekly</span></h2>
              </div>
              <FaDatabase className="text-slate-400 text-sm" />
            </div>
            <div className="p-5 space-y-3">
              <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                <div className="text-slate-500 flex items-center gap-1"><FaRegCalendarAlt className="text-slate-400" /> Created date</div>
                <div className="font-mono text-slate-700">2026-04-24 12:48</div>
                <div className="text-slate-500 flex items-center gap-1"><FaMapMarkerAlt className="text-slate-400" /> Location</div>
                <div className="font-medium text-slate-700">Malaysia (KUL)</div>
                <div className="text-slate-500 flex items-center gap-1"><FaHdd className="text-slate-400" /> Size</div>
                <div className="font-medium text-slate-700">2.73 GB</div>
                <div className="text-slate-500 flex items-center gap-1"><FaUbuntu className="text-slate-400" /> System details</div>
                <div className="font-medium text-slate-700">Ubuntu 22.04 LTS</div>
                <div className="text-slate-500 flex items-center gap-1"><FaHourglassHalf className="text-slate-400" /> Time to restore</div>
                <div className="font-semibold text-emerald-700">30 min (est.)</div>
              </div>
              <div className="pt-2 border-t border-dashed border-slate-200 mt-1 text-right">
                <span className="text-xs text-slate-400"><FaSyncAlt className="inline mr-1" /> Last successful: Apr 24, 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Restore Info Section (from second image) */}
        <div className="mb-8 bg-gradient-to-r from-white to-indigo-50/40 rounded-2xl p-5 border border-indigo-100 shadow-sm">
          <div className="flex items-start gap-3 flex-wrap">
            <div className="bg-indigo-100 p-2 rounded-xl">
              <FaUndoAlt className="text-indigo-700 text-xl" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2">
                Restore <span className="text-sm font-normal text-slate-500 bg-white px-2 py-0.5 rounded-full shadow-sm">secure recovery</span>
              </h3>
              <p className="text-slate-600 mt-1 text-base">
                We store backups separately from your main server for better security. Older backups are replaced automatically.
              </p>
            </div>
          </div>
        </div>

        {/* Snapshot Library header + New Snapshot button */}
        <div className="flex flex-wrap justify-between items-center mb-5">
          <div className="flex items-center gap-2">
            <FaCamera className="text-indigo-600 text-xl" />
            <h2 className="text-2xl font-bold text-slate-800">Snapshot library</h2>
            <span className="bg-slate-200 text-slate-700 text-xs font-semibold px-2.5 py-0.5 rounded-full ml-2">
              {snapshots.length} {snapshots.length === 1 ? 'snapshot' : 'snapshots'}
            </span>
          </div>
          <button onClick={addSnapshot} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl shadow-md flex items-center gap-2 text-sm font-semibold transition-all active:scale-95">
            <FaPlusCircle /> New snapshot
          </button>
        </div>

        {/* Dynamic Snapshots Grid */}
        {snapshots.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300 mt-5">
            <FaCamera className="text-4xl text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No snapshots available. Click "New snapshot" to create a recovery point.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
            {snapshots.map((snap) => (
              <div key={snap.id} className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden transition-all hover:shadow-lg">
                <div className="p-5 pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <FaCamera className="text-indigo-400 text-lg" />
                      <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                        {snap.id.slice(-8)}
                      </span>
                    </div>
                    <button onClick={() => deleteSnapshot(snap.id)} className="text-slate-400 hover:text-red-500 transition-all bg-slate-50 rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-50" title="Delete snapshot">
                      <FaTrashAlt className="text-xs" />
                    </button>
                  </div>
                  <div className="mt-4 space-y-2.5">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                      <span className="text-xs font-medium text-slate-500 flex items-center gap-1"><FaRegCalendarPlus /> Created date</span>
                      <span className="text-sm font-semibold text-slate-700">{snap.createdDate}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                      <span className="text-xs font-medium text-slate-500 flex items-center gap-1"><FaRegCalendarTimes /> Expiration date</span>
                      <span className="text-sm font-medium text-amber-700">{snap.expirationDate}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-slate-500 flex items-center gap-1"><FaStopwatch /> Time to restore</span>
                      <span className="text-sm font-mono font-semibold text-emerald-700">{snap.restoreTime}</span>
                    </div>
                  </div>
                </div>
                <div className="px-5 pb-5 pt-2 mt-1">
                  <button onClick={() => restoreSnapshot(snap)} className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold py-2.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2 border border-indigo-200">
                    <FaUndoAlt /> Restore
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-xs text-slate-400 border-t border-slate-200 pt-6">
          <FaLock className="inline mr-1" /> Encrypted snapshots • Immutable backups • 30-day retention policy
        </div>
      </div>
    </div>
  );
}

export default SnapShot;
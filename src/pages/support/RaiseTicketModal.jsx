// src/components/RaiseTicketModal.jsx
import React, { useState } from 'react';
import { generateTicketId } from './dummyTickets';

const RaiseTicketModal = ({ isOpen, onClose, onRaiseTicket }) => {
  const [formData, setFormData] = useState({
    name: "", email: "", department: "General Enquiry", priority: "Medium", message: "", file: null
  });
  const [fileName, setFileName] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, file }));
    setFileName(file ? file.name : "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert("Please fill name, email and message");
      return;
    }
    if (!formData.email.includes("@")) {
      alert("Enter a valid email");
      return;
    }
    const newTicket = {
      id: generateTicketId(),
      name: formData.name,
      email: formData.email,
      department: formData.department,
      priority: formData.priority,
      message: formData.message,
      status: "Open",
      createdAt: new Date().toISOString(),
      attachment: fileName ? { name: fileName } : null,
      replies: []
    };
    onRaiseTicket(newTicket);
    setFormData({ name: "", email: "", department: "General Enquiry", priority: "Medium", message: "", file: null });
    setFileName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-2xl font-bold text-gray-800"><i className="fas fa-plus-circle text-indigo-500 mr-2"></i>Raise New Ticket</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><i className="fas fa-times text-xl"></i></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400" placeholder="user@example.com" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Department</label>
              <select name="department" value={formData.department} onChange={handleChange} className="w-full border rounded-lg px-4 py-2 bg-white">
                <option>General Enquiry</option><option>Technical</option><option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Priority</label>
              <select name="priority" value={formData.priority} onChange={handleChange} className="w-full border rounded-lg px-4 py-2 bg-white">
                <option>Low</option><option>Medium</option><option>High</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Message *</label>
            <textarea name="message" rows="3" value={formData.message} onChange={handleChange} className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400" placeholder="Describe your issue..."></textarea>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Attachment (optional)</label>
            <input type="file" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-700" />
            {fileName && <p className="text-xs text-green-600 mt-1"><i className="fas fa-paperclip mr-1"></i>{fileName}</p>}
          </div>
          <div className="flex justify-end gap-3 pt-3">
            <button type="button" onClick={onClose} className="px-5 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
            <button type="submit" className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md">Submit Ticket</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RaiseTicketModal;
// components/superadmin/InvoiceDetailModal.jsx
import React from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Eye, Printer } from "lucide-react";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Modal from "./Modal";
import { downloadInvoicePdf } from "../../hooks/useInvoices";

const formatIndianCurrency = (amount) => {
  const num = parseFloat(amount);
  if (isNaN(num)) return "";
  return num.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const statusVariants = {
  paid: "success",
  unpaid: "danger",
  expire_soon: "warning",
  renew: "info",
};

const InvoiceDetailModal = ({ invoice, isOpen, onClose }) => {
  if (!invoice) return null;

  const handleDownload = () => {
    downloadInvoicePdf(invoice.id, invoice.invoiceNumber);
  };

  // Extract client info from invoice data
  const clientName = invoice.clientName || invoice.userId?.name || "N/A";
  const clientEmail = invoice.clientEmail || invoice.userId?.email || "N/A";
  const clientPhone = invoice.clientPhone || invoice.userId?.phone || "N/A";

  // Calculate amounts (converting from paisa to rupees)
  const amount = invoice.amount || invoice.totalAmount || 0;
  const taxAmount = invoice.taxAmount || 0;
  const totalAmount = invoice.totalAmount || amount + taxAmount;
  const subtotal = invoice.taxableValue || amount;

  // Get service details
  const serviceName = invoice.serviceName || invoice.identifier || "Service";
  const serviceModel = invoice.serviceModel || "";

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-0 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative bg-white w-full max-w-4xl h-full sm:h-auto sm:max-h-[90vh] sm:rounded-3xl shadow-2xl overflow-y-auto z-10"
          >
            {/* Header Bar */}
            <div className="sticky top-0 z-20 bg-white border-b border-gray-200 px-4 sm:px-8 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/Cloudedata.svg"
                  alt="Cloudedata"
                  className="h-10 w-auto sm:h-14"
                />
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                    Invoice Details
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500">
                    #{invoice.invoiceNumber}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={statusVariants[invoice.status] || "default"}>
                  {invoice.status?.replace("_", " ").toUpperCase() || "N/A"}
                </Badge>
                <button
                  onClick={handleDownload}
                  className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                  title="Download PDF"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Invoice Content */}
            <div className="p-4 sm:p-8 space-y-6">
              {/* Company & Invoice Info */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                  <div className="text-2xl font-black text-indigo-600">
                    CloudeData
                  </div>
                  <div className="text-sm text-gray-500">
                    Premium Hosting Infrastructure
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">INVOICE</div>
                  <div className="text-xl font-bold text-gray-900">
                    #{invoice.invoiceNumber}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {new Date(invoice.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>

              <hr className="border-gray-200" />

              {/* Client & Payment Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
                      Billed To
                    </div>
                    <div className="text-gray-900 font-semibold">
                      {clientName}
                    </div>
                    <div className="text-sm text-gray-600">{clientEmail}</div>
                    <div className="text-sm text-gray-600">{clientPhone}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
                      Payment Method
                    </div>
                    <div className="text-sm text-gray-800 capitalize">
                      {invoice.paymentMethod?.replace("_", " ") || "N/A"}
                    </div>
                    {invoice.paymentId && (
                      <div className="text-xs text-gray-500 mt-1">
                        Payment ID: {invoice.paymentId}
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-4 sm:text-right">
                  <div>
                    <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
                      Invoice Date
                    </div>
                    <div className="text-sm text-gray-800">
                      {new Date(invoice.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                  {invoice.paidAt && (
                    <div>
                      <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
                        Paid On
                      </div>
                      <div className="text-sm text-gray-800">
                        {new Date(invoice.paidAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Service Details */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                <div className="flex flex-col sm:flex-row justify-between">
                  <div>
                    <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                      Service Details
                    </div>
                    <div className="text-lg font-semibold text-gray-900 mt-1">
                      {serviceName}
                    </div>
                    {serviceModel && (
                      <div className="text-sm text-gray-600">
                        Model: {serviceModel}
                      </div>
                    )}
                    {invoice.billingPeriod && (
                      <div className="text-sm text-gray-600">
                        Billing Period:{" "}
                        {invoice.billingPeriod.charAt(0).toUpperCase() +
                          invoice.billingPeriod.slice(1)}
                      </div>
                    )}
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                      Amount
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mt-1">
                      ₹{formatIndianCurrency(totalAmount / 100)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50 border border-gray-200">
                    <tr>
                      <th className="py-3 px-4 text-xs font-bold text-gray-600 uppercase tracking-wider">
                        #
                      </th>
                      <th className="py-3 px-4 text-xs font-bold text-gray-600 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="py-3 px-4 text-xs font-bold text-gray-600 uppercase tracking-wider text-right">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="border-x border-b border-gray-200">
                    {invoice.items && invoice.items.length > 0 ? (
                      invoice.items.map((item, index) => (
                        <tr key={index} className="border-t border-gray-100">
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {index + 1}
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-sm text-gray-900">
                              {item.description || serviceName}
                            </div>
                            {item.details && (
                              <div className="text-xs text-gray-500 mt-1">
                                {item.details}
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-900 font-mono text-right">
                            ₹{formatIndianCurrency(item.amount / 100 || 0)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="3"
                          className="py-4 text-center text-gray-500"
                        >
                          No items available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="flex justify-end">
                <div className="w-full sm:w-80 space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-mono">
                      ₹{formatIndianCurrency(subtotal / 100)}
                    </span>
                  </div>
                  {taxAmount > 0 && (
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>
                        Tax ({invoice.taxRate || 18}% {invoice.taxType || "GST"}
                        )
                      </span>
                      <span className="font-mono">
                        ₹{formatIndianCurrency(taxAmount / 100)}
                      </span>
                    </div>
                  )}
                  <hr className="border-gray-200" />
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-indigo-600 font-mono">
                      ₹{formatIndianCurrency(totalAmount / 100)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center pt-4 border-t border-gray-200">
                <div className="text-xs text-gray-500 italic">
                  This is a computer-generated invoice. No signature required.
                </div>
                {invoice.currency && (
                  <div className="text-xs text-gray-400 mt-1">
                    Currency: {invoice.currency}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default InvoiceDetailModal;

import React from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';

/* ============================================================
   Helper – format Indian Rupees
   ============================================================ */
const formatIndianCurrency = (amount) => {
  const num = parseFloat(amount);
  if (isNaN(num)) return '';
  return num.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

/* ============================================================
   Final Tax Invoice Modal – 100% dynamic & matching the layout
   ============================================================ */
const InvoiceDetailModal = ({ invoiceData, onClose }) => {
  if (!invoiceData) return null;

  const {
    companyName,
    addressLine1,
    addressLine2,
    cityPincode,
    gstin,
    stateName,
    stateCode,
    cin,
    email,
    website,
    pan,
    buyerName,
    buyerAddress,
    buyerGstin,
    buyerStateName,
    buyerStateCode,
    buyerContactPerson,
    buyerContact,
    buyerEmail,
    invoiceNo,
    date,
    referenceNo,
    items = [],
    taxType,            // 'CGST+SGST' or 'IGST'
    taxRate,
    taxableValue,
    taxAmount,
    totalAmount,
    amountInWords,
    taxAmountInWords,
    bankAccountHolder,
    bankName,
    bankAccountNumber,
    bankBranch,
    bankIFSC,
    declarationTerms = [],
    governmentLaw,
    jurisdiction,
  } = invoiceData;

  // Build items rows for the modal view
  const buildItemsRows = () => {
    return items.map((item, idx) => {
      const sl = item.slNo || idx + 1;
      const desc = item.description || '';
      const sub = item.subDetails || [];
      const hsn = item.hsnSac || '';
      const qty = item.qty || 0;
      const unit = item.unit || '';
      const rateEx = item.rateExclusive || item.rate || 0;
      const rateIn = item.rateInclusive || 0;
      const amt = item.amount || 0;

      return (
        <tr key={idx}>
          <td className="border border-black p-1 text-center">{sl}</td>
          <td className="border border-black p-1">
            <div className="font-semibold">{desc}</div>
            {sub.length > 0 && sub.map((line, i) => (
              <div key={i} style={{ fontSize: '10px', marginTop: '2px' }}>{line}</div>
            ))}
          </td>
          <td className="border border-black p-1 text-center">{hsn}</td>
          <td className="border border-black p-1 text-center">{qty} {unit}</td>
          <td className="border border-black p-1 text-right">{formatIndianCurrency(rateEx)}</td>
          <td className="border border-black p-1 text-right">{rateIn ? formatIndianCurrency(rateIn) : ''}</td>
          <td className="border border-black p-1 text-right">{formatIndianCurrency(amt)}</td>
        </tr>
      );
    });
  };

  // Build the same invoice HTML for download (identical to the modal content)
  const buildInvoiceHTML = () => {
    const fmt = formatIndianCurrency;
    const itemsHTML = items.map((item, idx) => {
      const sl = item.slNo || idx + 1;
      const desc = item.description || '';
      const sub = (item.subDetails || []).map(line => `<div style="font-size:10px; margin-top:2px;">${line}</div>`).join('');
      const hsn = item.hsnSac || '';
      const qty = item.qty || 0;
      const unit = item.unit || '';
      const rateEx = item.rateExclusive || item.rate || 0;
      const rateIn = item.rateInclusive ? fmt(item.rateInclusive) : '';
      const amt = item.amount || 0;
      return `<tr>
        <td class="text-center">${sl}</td>
        <td><strong>${desc}</strong>${sub}</td>
        <td class="text-center">${hsn}</td>
        <td class="text-center">${qty} ${unit}</td>
        <td class="text-right">${fmt(rateEx)}</td>
        <td class="text-right">${rateIn}</td>
        <td class="text-right">${fmt(amt)}</td>
      </tr>`;
    }).join('');

    return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Tax Invoice ${invoiceNo || ''}</title>
<style>
  body { font-family: Arial, sans-serif; margin: 20px; font-size: 11px; color: #000; background: #fff; }
  table { width: 100%; border-collapse: collapse; }
  td, th { border: 1px solid black; padding: 4px; }
  .text-right { text-align: right; } .text-center { text-align: center; } .font-bold { font-weight: bold; }
  .mt-2 { margin-top: 8px; } .mt-4 { margin-top: 16px; } .header-table td { border: none; }
</style>
</head>
<body>
  <h2 style="text-align:center; margin-bottom: 10px;">Tax Invoice</h2>
  <!-- Company & Invoice details -->
  <table class="header-table">
    <tr>
      <td style="width:60%">
        <strong>${companyName || ''}</strong>${companyName ? '<br/>' : ''}
        ${addressLine1 ? addressLine1 + (addressLine2 ? ', ' + addressLine2 : '') : ''}${addressLine1 ? '<br/>' : ''}
        ${cityPincode ? cityPincode + '<br/>' : ''}
        ${gstin ? 'GSTIN: ' + gstin + '<br/>' : ''}
        ${(stateName || stateCode) ? `State Name : ${stateName || ''}${stateCode ? ', Code : ' + stateCode : ''}<br/>` : ''}
        ${cin ? 'CIN: ' + cin + '<br/>' : ''}
        ${email ? 'E-Mail : ' + email + '<br/>' : ''}
        ${website || ''}
      </td>
      <td style="width:40%" class="text-right">
        ${invoiceNo ? `<strong>Invoice No.</strong> ${invoiceNo}<br/>` : ''}
        ${date ? `<strong>Dated:</strong> ${date}<br/>` : ''}
        ${referenceNo ? `<strong>Reference No:</strong> ${referenceNo}<br/>` : ''}
      </td>
    </tr>
  </table>
  <!-- Buyer Details -->
  <table class="header-table mt-2">
    <tr>
      <td style="width:50%">
        <strong>Buyer (Bill to)</strong><br/>
        ${buyerName ? '<strong>' + buyerName + '</strong><br/>' : ''}
        ${buyerAddress ? buyerAddress + '<br/>' : ''}
        ${buyerGstin ? 'GSTIN/UIN : ' + buyerGstin + '<br/>' : ''}
        ${(buyerStateName || buyerStateCode) ? `State Name : ${buyerStateName || ''}${buyerStateCode ? ', Code : ' + buyerStateCode : ''}<br/>` : ''}
        ${buyerContactPerson ? 'Contact person : ' + buyerContactPerson + '<br/>' : ''}
        ${buyerContact ? 'Contact : ' + buyerContact + '<br/>' : ''}
        ${buyerEmail ? 'E-Mail : ' + buyerEmail + '<br/>' : ''}
      </td>
    </tr>
  </table>
  <!-- Items Table -->
  <table class="mt-2">
    <thead>
      <tr class="bg-gray">
        <th class="text-center" style="width:6%">Sl No</th>
        <th style="width:32%">Description of Services</th>
        <th class="text-center" style="width:12%">HSN/SAC</th>
        <th class="text-center" style="width:10%">Quantity</th>
        <th class="text-right" style="width:16%">Rate (Ind. of Tax)</th>
        <th class="text-right" style="width:12%">Rate per</th>
        <th class="text-right" style="width:12%">Amount</th>
      </tr>
    </thead>
    <tbody>${itemsHTML}</tbody>
  </table>
  <!-- Tax Type -->
  <table class="mt-2">
    <tr>
      <td><strong>${taxType || ''}${taxRate ? ' Output-'+taxRate+'%' : ''}${stateName ? ' ('+stateName+')' : ''}</strong></td>
    </tr>
  </table>
  <!-- Amount in Words -->
  <div class="mt-2">
    <strong>Amount Chargable (in words)</strong><br/>
    <strong>${amountInWords || ''}</strong>
  </div>
  <!-- Tax Summary Table -->
  <table class="mt-2">
    <tr>
      <td class="font-bold">HSN/SAC</td>
      <td class="font-bold">Taxable Value</td>
      <td class="font-bold">GST Value</td>
      <td class="font-bold">Total Amount</td>
    </tr>
    <tr>
      <td>${items.map(i => i.hsnSac).join(', ')}</td>
      <td class="text-right">${fmt(taxableValue)}</td>
      <td class="text-right">${fmt(taxAmount)}</td>
      <td class="text-right">${fmt(totalAmount)}</td>
    </tr>
  </table>
  <!-- Tax Amount in Words -->
  <div class="mt-2">
    <strong>Tax Amount (in words) : ${taxAmountInWords || ''}</strong>
  </div>
  <!-- PAN -->
  <div class="mt-2">
    <strong>Company's PAN</strong> : ${pan || ''}
  </div>
  <!-- Declaration & Terms -->
  <div class="mt-4">
    <strong>Declaration</strong><br/>
    <strong>Terms & Conditions:</strong><br/>
    ${declarationTerms.map(t => `${t}<br/>`).join('')}
    <p>${governmentLaw || ''}</p>
  </div>
  <!-- Bank Details -->
  <div class="mt-4">
    <strong>Company's Bank Details</strong><br/>
    <table class="header-table">
      <tr><td>Account Holder</td><td>: ${bankAccountHolder || ''}</td></tr>
      <tr><td>Bank Name</td><td>: ${bankName || ''}</td></tr>
      <tr><td>Account Number</td><td>: ${bankAccountNumber || ''}</td></tr>
      <tr><td>Branch & IFSC Code</td><td>: ${bankBranch || ''} & ${bankIFSC || ''}</td></tr>
    </table>
  </div>
  <!-- Signature -->
  <div class="mt-4 text-right">
    <strong>for ${companyName || ''}</strong><br/><br/><br/>
    <p><strong>Authorised Signatory</strong></p>
  </div>
  <!-- Footer -->
  <div class="mt-4" style="text-align:center;">
    <strong>SUBJECT TO ${jurisdiction || ''} JURISDICTION</strong><br/>
    <p>This is a Computer Generated Invoice</p>
  </div>
</body>
</html>`;
  };

  const handleDownloadPDF = () => {
    const html = buildInvoiceHTML();
    const w = window.open('', '_blank');
    if (w) {
      w.document.write(html);
      w.document.close();
      w.print();   // user can save as PDF from the print dialog
    } else {
      // if pop-up blocked, alert the user
      toast.error('Pop-up blocked! Please allow pop-ups for this site to download the invoice.');
    }
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-white/70 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto z-10"
        >
          {/* Toolbar */}
          <div className="flex items-center justify-between px-8 pt-6 pb-4 print:hidden">
            <h2 className="text-2xl font-bold text-slate-800">Tax Invoice</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadPDF}
                className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-xl flex items-center gap-2 hover:bg-indigo-700 transition text-sm"
              >
                <Download size={16} /> Download PDF
              </button>
              <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition">
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Invoice body – exactly as in the picture */}
          <div className="px-6 py-4" style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px' }}>
            <h2 className="text-center font-bold mb-2" style={{ fontSize: '16px' }}>Tax Invoice</h2>

            {/* Company & Invoice details */}
            <div className="flex justify-between">
              <div style={{ width: '60%' }}>
                {companyName && <div className="font-bold" style={{ fontSize: '12px' }}>{companyName}</div>}
                {(addressLine1 || addressLine2) && <div>{addressLine1}{addressLine2 ? ', ' + addressLine2 : ''}</div>}
                {cityPincode && <div>{cityPincode}</div>}
                {gstin && <div>GSTIN: {gstin}</div>}
                {(stateName || stateCode) && <div>State Name : {stateName}{stateCode ? ', Code : ' + stateCode : ''}</div>}
                {cin && <div>CIN: {cin}</div>}
                {email && <div>E-Mail : {email}</div>}
                {website && <div>{website}</div>}
              </div>
              <div style={{ width: '35%', textAlign: 'right' }}>
                {invoiceNo && <div><span className="font-semibold">Invoice No.</span> {invoiceNo}</div>}
                {date && <div><span className="font-semibold">Dated:</span> {date}</div>}
                {referenceNo && <div><span className="font-semibold">Reference No:</span> {referenceNo}</div>}
              </div>
            </div>

            {/* Buyer */}
            <div className="mt-3 border border-black p-2">
              <div className="font-bold">Buyer (Bill to)</div>
              {buyerName && <div className="font-bold">{buyerName}</div>}
              {buyerAddress && <div>{buyerAddress}</div>}
              {buyerGstin && <div>GSTIN/UIN : {buyerGstin}</div>}
              {(buyerStateName || buyerStateCode) && <div>State Name : {buyerStateName}{buyerStateCode ? ', Code : ' + buyerStateCode : ''}</div>}
              {buyerContactPerson && <div>Contact person : {buyerContactPerson}</div>}
              {buyerContact && <div>Contact : {buyerContact}</div>}
              {buyerEmail && <div>E-Mail : {buyerEmail}</div>}
            </div>

            {/* Items Table */}
            <table className="w-full border border-black border-collapse mt-3" style={{ fontSize: '11px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f3f4f6' }}>
                  <th className="border border-black p-1 text-center" style={{ width: '6%' }}>Sl No</th>
                  <th className="border border-black p-1" style={{ width: '32%' }}>Description of Services</th>
                  <th className="border border-black p-1 text-center" style={{ width: '12%' }}>HSN/SAC</th>
                  <th className="border border-black p-1 text-center" style={{ width: '10%' }}>Quantity</th>
                  <th className="border border-black p-1 text-right" style={{ width: '16%' }}>Rate (Ind. of Tax)</th>
                  <th className="border border-black p-1 text-right" style={{ width: '12%' }}>Rate per</th>
                  <th className="border border-black p-1 text-right" style={{ width: '12%' }}>Amount</th>
                </tr>
              </thead>
              <tbody>{buildItemsRows()}</tbody>
            </table>

            {/* Tax type indicator */}
            <div className="mt-2">
              <span className="font-bold">
                {taxType && taxRate && stateName
                  ? `${taxType} Output-${taxRate}% (${stateName})`
                  : taxType ? taxType : ''}
              </span>
            </div>

            {/* Amount in words */}
            <div className="mt-3">
              <div className="font-bold">Amount Chargable (in words)</div>
              <div className="font-bold">{amountInWords}</div>
            </div>

            {/* Tax summary table */}
            <table className="w-full border border-black border-collapse mt-3">
              <thead>
                <tr style={{ backgroundColor: '#f3f4f6' }}>
                  <th className="border border-black p-1">HSN/SAC</th>
                  <th className="border border-black p-1 text-right">Taxable Value</th>
                  <th className="border border-black p-1 text-right">GST Value</th>
                  <th className="border border-black p-1 text-right">Total Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-1">{items.map(i => i.hsnSac).join(', ')}</td>
                  <td className="border border-black p-1 text-right">{formatIndianCurrency(taxableValue)}</td>
                  <td className="border border-black p-1 text-right">{formatIndianCurrency(taxAmount)}</td>
                  <td className="border border-black p-1 text-right">{formatIndianCurrency(totalAmount)}</td>
                </tr>
              </tbody>
            </table>

            {/* Tax amount in words */}
            <div className="mt-2">
              <strong>Tax Amount (in words) : {taxAmountInWords}</strong>
            </div>

            {/* PAN */}
            <div className="mt-2">
              <strong>Company's PAN</strong> : {pan}
            </div>

            {/* Declaration & Terms */}
            <div className="mt-4">
              <div className="font-bold">Declaration</div>
              <div className="mt-1">
                <strong>Terms & Conditions:</strong>
                <ul className="list-disc pl-5">
                  {declarationTerms.map((term, idx) => (
                    <li key={idx} className="text-sm">{term}</li>
                  ))}
                </ul>
              </div>
              {governmentLaw && <div className="mt-2">{governmentLaw}</div>}
            </div>

            {/* Bank details */}
            <div className="mt-4">
              <div className="font-bold">Company's Bank Details</div>
              <table style={{ width: '100%', fontSize: '11px' }}>
                <tbody>
                  {bankAccountHolder && <tr><td style={{ width: '40%' }}>Account Holder's Name</td><td>: {bankAccountHolder}</td></tr>}
                  {bankName && <tr><td>Bank Name</td><td>: {bankName}</td></tr>}
                  {bankAccountNumber && <tr><td>Account Number</td><td>: {bankAccountNumber}</td></tr>}
                  {(bankBranch || bankIFSC) && <tr><td>Branch & IFSC Code</td><td>: {bankBranch} {bankIFSC ? '& ' + bankIFSC : ''}</td></tr>}
                  {!bankAccountHolder && !bankName && !bankAccountNumber && !bankBranch && !bankIFSC && (
                    <tr><td colSpan={2}>—</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Signature */}
            <div className="mt-4 flex justify-end">
              <div style={{ textAlign: 'right' }}>
                {companyName && <div className="font-bold">for {companyName}</div>}
                <div style={{ marginTop: '30px' }}></div>
                <div className="font-bold">Authorised Signatory</div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 text-center" style={{ borderTop: '1px solid black', paddingTop: '10px' }}>
              {jurisdiction && <div className="font-bold">SUBJECT TO {jurisdiction} JURISDICTION</div>}
              <div>This is a Computer Generated Invoice</div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

export default InvoiceDetailModal;
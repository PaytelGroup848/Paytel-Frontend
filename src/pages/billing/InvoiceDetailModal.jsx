import React from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF from './InvoicePDF';
import { currencyToWords } from '../../utils/currencyToWords';
import { useMe } from '../../hooks/useAuth';
import { useProfile } from '../../hooks/useProfile';

const formatIndianCurrency = (amount) => {
  const num = parseFloat(amount);
  if (isNaN(num)) return '';
  return num.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};


const InvoiceDetailModal = ({ invoiceData, onClose }) => {
    const LOGO_URL = '/FullCloudedatalogosvg.svg';
    const userEmail = useMe()?.data?.email
        const profile = useProfile()?.data;
    const userName = profile?.firstName;
    const userPhone = profile?.phone;

  if (!invoiceData) return null;

  const {
    // Company header (matching your PDF)
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
    invoiceNo,
    date,
    deliveryNote,       // new field from PDF
    modeOfPayment,      // new field from PDF
    referenceNo,
    otherReferences,    // new field from PDF
    // Buyer
    buyerName,
    buyerAddress,
    buyerGstin,
    buyerStateName,
    buyerStateCode,
    buyerContactPerson,
    buyerContact,
    buyerEmail,
    // Items
    items = [],
    // Tax
    taxType,            // 'CGST+SGST' or 'IGST'
    taxRate,
    taxableValue,
    taxAmount,
    totalAmount,
    amountInWords,
    taxAmountInWords,
    // Bank
    bankAccountHolder,
    bankName,
    bankAccountNumber,
    bankBranch,
    bankIFSC,
    // Legal
    declarationTerms = [],
    governmentLaw,
    jurisdiction,
  } = invoiceData;

  /* ---------- Build Items Rows ---------- */
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
            {/* {sub.length > 0 && sub.map((line, i) => (
              <div key={i} style={{ fontSize: '10px', marginTop: '2px' }}>{line}</div>
            ))} */}
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

  /* ---------- Build Header Table (exactly like your PDF) ---------- */
  const HeaderTable = () => (
    <table className="w-full border-collapse text-[11px]" style={{ fontFamily: 'Arial, sans-serif' }}>
      <tbody>
        {/* Row 1 */}
        <tr>
          <td colSpan={2} className="font-bold" style={{ fontSize: '12px' }}>
            {companyName}
          </td>
          <td colSpan={2} className="font-bold">Invoice No.</td>
          <td colSpan={2} className="font-bold">Dated</td>
        </tr>
        {/* Row 2 */}
        <tr>
          <td colSpan={2}>{addressLine1}</td>
          <td colSpan={2}>{invoiceNo}</td>
          <td colSpan={2}>{date}</td>
        </tr>
        {/* Row 3 */}
        <tr>
          <td colSpan={2}>{addressLine2}</td>
          <td colSpan={2}>Delivery Note</td>
          <td colSpan={2}>Mode/Terms of Payment</td>
        </tr>
        {/* Row 4 */}
        <tr>
          <td colSpan={2}>{cityPincode}</td>
          <td colSpan={2}>Reference No. &amp; Date.</td>
          <td colSpan={2}>Other References</td>
        </tr>
        {/* Row 5 – actual values for delivery note, mode, ref no, other ref */}
        <tr>
          <td colSpan={2}></td>
          <td colSpan={2}>{deliveryNote || ''}</td>
          <td colSpan={2}>{modeOfPayment || ''}</td>
        </tr>
        <tr>
          <td colSpan={2}></td>
          <td colSpan={2}>{referenceNo || ''}</td>
          <td colSpan={2}>{otherReferences || ''}</td>
        </tr>
        {/* Row 6+ – GSTIN, State, CIN, Email, Website */}
        <tr>
          <td colSpan={2}>GSTIN/UIN: {gstin}</td>
          <td colSpan={2}></td>
          <td colSpan={2}></td>
        </tr>
        <tr>
          <td colSpan={2}>State Name: {stateName}{stateCode ? `, Code: ${stateCode}` : ''}</td>
          <td colSpan={2}></td>
          <td colSpan={2}></td>
        </tr>
        <tr>
          <td colSpan={2}>CIN: {cin}</td>
          <td colSpan={2}></td>
          <td colSpan={2}></td>
        </tr>
        <tr>
          <td colSpan={2}>E-Mail: {email}</td>
          <td colSpan={2}></td>
          <td colSpan={2}></td>
        </tr>
        <tr>
          <td colSpan={2}>{website}</td>
          <td colSpan={2}></td>
          <td colSpan={2}></td>
        </tr>
      </tbody>
    </table>
  );


  /* ---------- Render ---------- */
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

            <img src={LOGO_URL} className='h-20 w-40'/>
            
            <div className="flex items-center gap-2">
             <PDFDownloadLink
  document={<InvoicePDF 
    invoiceData={invoiceData} 
    userEmail={userEmail}
    userName={userName}
    userPhone={userPhone}
  />}
  fileName={`${invoiceNo}.pdf`}
  className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-xl flex items-center gap-2 hover:bg-indigo-700 transition text-sm"
>
  {({ loading }) => (
    <>
      <Download size={16} />
      {loading ? 'Generating PDF...' : 'Download PDF'}
    </>
  )}
</PDFDownloadLink>
              <button onClick={onClose} className="p-2 cursor-pointer rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition">
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Invoice Content – exactly matching the PDF layout */}
          <div id="invoice-print-area" className="px-6 py-4" style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px' }}>
            <h2 className="text-center font-bold mb-2" style={{ fontSize: '16px' }}>Tax Invoice</h2>

            {/* HEADER – the exact PayTel table */}
            <HeaderTable />

            {/* Buyer */}
            <div className="mt-3 border border-black p-2">
              <div className="font-bold">Buyer (Bill to)</div>
              {userName && <div className="font-bold">{userName}</div>}
              {/* {buyerAddress && <div>{buyerAddress}</div>}
              {buyerGstin && <div>GSTIN/UIN : {buyerGstin}</div>}
              {(buyerStateName || buyerStateCode) && <div>State Name : {buyerStateName}{buyerStateCode ? ', Code : ' + buyerStateCode : ''}</div>}
              {buyerContactPerson && <div>Contact person : {buyerContactPerson}</div>} */}
              {userPhone && <div>Contact : {userPhone}</div>}
              {userEmail && <div>E-Mail : {userEmail}</div>}
            </div>

            

            {/* Items Table */}
            <table className="w-full border border-black border-collapse mt-3" style={{ fontSize: '11px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f3f4f6' }}>
                  <th className="border border-black p-1 text-center" style={{ width: '6%' }}>Sl No</th>
                  <th className="border border-black p-1" style={{ width: '32%' }}>Description of Services</th>
                  <th className="border border-black p-1 text-center" style={{ width: '12%' }}>HSN/SAC</th>
                  <th className="border border-black p-1 text-center" style={{ width: '10%' }}>Quantity</th>
                  <th className="border border-black p-1 text-right" style={{ width: '12%' }}>Rate per</th>
                  <th className="border border-black p-1 text-right" style={{ width: '16%' }}>Rate (Ind. of Tax)</th>
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
              <div className="font-bold">{currencyToWords(amountInWords)}</div>
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
              <strong>Tax Amount (in words) : {currencyToWords(taxAmountInWords)}</strong>
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
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
  const userEmail = useMe()?.data?.email;
  const profile = useProfile()?.data;
  const userName = profile?.firstName;
  const userPhone = profile?.phone;

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
    invoiceNo,
    date,
    deliveryNote,
    modeOfPayment,
    referenceNo,
    otherReferences,
    buyerName,
    buyerAddress,
    buyerGstin,
    buyerStateName,
    buyerStateCode,
    buyerContactPerson,
    buyerContact,
    buyerEmail,
    items = [],
    taxType,
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

  /* ---------- Build Items Rows ---------- */
  const buildItemsRows = () => {
    return items.map((item, idx) => {
      const sl = item.slNo || idx + 1;
      const desc = item.description || '';
      const hsn = item.hsnSac || '';
      const qty = item.qty || 0;
      const unit = item.unit || '';
      const rateEx = item.rateExclusive || item.rate || 0;
      const rateIn = item.rateInclusive || 0;
      const amt = item.amount || 0;

      return (
        <tr key={idx}>
          <td className="border border-black p-1 text-center text-[10px] sm:text-[11px]">{sl}</td>
          <td className="border border-black p-1 text-[10px] sm:text-[11px]">
            <div className="font-semibold">{desc}</div>
          </td>
          <td className="border border-black p-1 text-center text-[10px] sm:text-[11px]">{hsn}</td>
          <td className="border border-black p-1 text-center text-[10px] sm:text-[11px]">{qty} {unit}</td>
          <td className="border border-black p-1 text-right text-[10px] sm:text-[11px]">{rateEx ? formatIndianCurrency(rateEx) : ''}</td>
          <td className="border border-black p-1 text-right text-[10px] sm:text-[11px]">{rateIn ? formatIndianCurrency(rateIn) : ''}</td>
          <td className="border border-black p-1 text-right text-[10px] sm:text-[11px]">{formatIndianCurrency(amt)}</td>
        </tr>
      );
    });
  };

  /* ---------- Header Table (responsive) ---------- */
  const HeaderTable = () => (
    <table className="w-full border-collapse text-[9px] sm:text-[11px]" style={{ fontFamily: 'Arial, sans-serif' }}>
      <tbody>
        <tr>
          <td colSpan={2} className="font-bold text-[10px] sm:text-[12px]">{companyName}</td>
          <td colSpan={2} className="font-bold">Invoice No.</td>
          <td colSpan={2} className="font-bold">Dated</td>
        </tr>
        <tr>
          <td colSpan={2}>{addressLine1}</td>
          <td colSpan={2}>{invoiceNo}</td>
          <td colSpan={2}>{date}</td>
        </tr>
        <tr>
          <td colSpan={2}>{addressLine2}</td>
          <td colSpan={2}>Delivery Note</td>
          <td colSpan={2}>Mode/Terms of Payment</td>
        </tr>
        <tr>
          <td colSpan={2}>{cityPincode}</td>
          <td colSpan={2}>Reference No. &amp; Date.</td>
          <td colSpan={2}>Other References</td>
        </tr>
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

  return ReactDOM.createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-0 sm:p-4">
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
          className="relative bg-white w-full h-full sm:h-auto sm:max-h-[90vh] sm:rounded-3xl shadow-2xl overflow-y-auto z-10"
        >
          {/* Toolbar */}
          <div className="flex items-center justify-between px-4 sm:px-8 pt-4 sm:pt-6 pb-4 print:hidden">
            <img src="/Cloudedata.svg" className="h-12 w-auto sm:h-20 sm:w-40" />
            <div className="flex items-center gap-2">
              <PDFDownloadLink
                document={<InvoicePDF invoiceData={invoiceData} userEmail={userEmail} userName={userName} userPhone={userPhone} />}
                fileName={`${invoiceNo}.pdf`}
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-indigo-600 text-white font-semibold rounded-xl flex items-center gap-1 sm:gap-2 hover:bg-indigo-700 transition text-xs sm:text-sm"
              >
                {({ loading }) => (
                  <>
                    <Download size={14} className="sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">{loading ? 'Generating...' : 'Download PDF'}</span>
                    <span className="sm:hidden"> Download PDF</span>
                  </>
                )}
              </PDFDownloadLink>
              <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition">
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Invoice Content – responsive */}
          <div id="invoice-print-area" className="px-4 sm:px-6 py-4" style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px' }}>
            <h2 className="text-center font-bold mb-2 text-sm sm:text-base">Tax Invoice</h2>

            <HeaderTable />

            {/* Buyer */}
            <div className="mt-3 border border-black p-2 text-[10px] sm:text-[11px]">
              <div className="font-bold">Buyer (Bill to)</div>
              {userName && <div className="font-bold">{userName}</div>}
              {userPhone && <div>Contact : {userPhone}</div>}
              {userEmail && <div>E-Mail : {userEmail}</div>}
            </div>

            {/* Items Table – scrollable on mobile */}
            <div className="overflow-x-auto mt-3">
              <table className="w-full border border-black border-collapse min-w-[600px] text-[10px] sm:text-[11px]">
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
            </div>

            {/* Tax type indicator */}
            <div className="mt-2 text-[10px] sm:text-[11px]">
              <span className="font-bold">
                {taxType && taxRate && stateName
                  ? `${taxType} Output-${taxRate}% (${stateName})`
                  : taxType ? taxType : ''}
              </span>
            </div>

            {/* Amount in words */}
            <div className="mt-3 text-[10px] sm:text-[11px]">
              <div className="font-bold">Amount Chargable (in words)</div>
              <div className="font-bold">{currencyToWords(amountInWords)}</div>
            </div>

            {/* Tax summary table – scrollable */}
            <div className="overflow-x-auto mt-3">
              <table className="w-full border border-black border-collapse min-w-[300px] text-[10px] sm:text-[11px]">
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
            </div>

            {/* Tax amount in words */}
            <div className="mt-2 text-[10px] sm:text-[11px]">
              <strong>Tax Amount (in words) : {currencyToWords(taxAmountInWords)}</strong>
            </div>

            {/* PAN */}
            <div className="mt-2 text-[10px] sm:text-[11px]">
              <strong>Company's PAN</strong> : {pan}
            </div>

            {/* Declaration & Terms */}
            <div className="mt-4 text-[10px] sm:text-[11px]">
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
            <div className="mt-4 text-[10px] sm:text-[11px]">
              <div className="font-bold">Company's Bank Details</div>
              <table className="w-full">
                <tbody>
                  {bankAccountHolder && <tr><td style={{ width: '40%' }}>Account Holder's Name</td><td>: {bankAccountHolder}</td></tr>}
                  {bankName && <tr><td>Bank Name</td><td>: {bankName}</td></tr>}
                  {bankAccountNumber && <tr><td>Account Number</td><td>: {bankAccountNumber}</td></tr>}
                  {(bankBranch || bankIFSC) && <tr><td>Branch & IFSC Code</td><td>: {bankBranch} {bankIFSC ? '& ' + bankIFSC : ''}</td></tr>}
                </tbody>
              </table>
            </div>

            {/* Signature */}
            <div className="mt-4 flex justify-end text-[10px] sm:text-[11px]">
              <div style={{ textAlign: 'right' }}>
                {companyName && <div className="font-bold">for {companyName}</div>}
                <div style={{ marginTop: '30px' }}></div>
                <div className="font-bold">Authorised Signatory</div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 text-center text-[10px] sm:text-[11px]" style={{ borderTop: '1px solid black', paddingTop: '10px' }}>
              {jurisdiction && <div className="font-bold">SUBJECT TO {jurisdiction} JURISDICTION</div>}
              <div>This is a System Generated Invoice</div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

export default InvoiceDetailModal;
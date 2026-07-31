import React from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "../billing/InvoicePDF";
import { currencyToWords } from "../../utils/currencyToWords";

const formatIndianCurrency = (amount) => {
  const num = parseFloat(amount);
  if (isNaN(num)) return "";
  return num.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const COMPANY_INFO = {
  companyName: "PayTel Financial Technologies Pvt. Ltd.(Delhi)",
  addressLine1: "A-212, 1st Floor, Phase-3",
  addressLine2: "Okhla Industrial Area",
  cityPincode: "New Delhi-110020",
  gstin: "07AALCP3083C1Z",
  stateName: "Delhi",
  stateCode: "07",
  cin: "U74999DL2020PTC367460",
  email: "customercare@cloudedata.com",
  website: "www.cloudedata.com",
  pan: "AAGCA9464A",
};

const BANK_INFO = {
  bankAccountHolder: "PAYTEL FINANCIAL TECHNOLOGIES PVT. LTD.",
  bankName: "Yes Bank Ltd.",
  bankAccountNumber: "029861900004141",
  bankBranch: "Okhla Industrial Estate-3",
  bankIFSC: "YESB0000298",
};

const DECLARATION_TERMS = [
  "All services are as per the agreed terms & conditions between the parties.",
  "This is a system generated invoice and does not require a physical signature.",
  "Support Other Than Cloud Services will not be Provided.",
  "For Software related query, Kindly Contact to the respected Software Company only.",
];

const buildFormattedInvoiceData = (invoice) => {
  if (!invoice) return null;

  // ---- 1. Normalize invoice number ----
  const invoiceNumber = invoice.invoiceNumber || invoice.invoiceNo;

  // ---- 2. Normalize money fields (both are stored in paise) ----
  const subtotalPaise = invoice.amount ?? invoice.subtotal ?? 0;
  const taxPaise = invoice.taxAmount ?? invoice.gst ?? 0;
  const totalPaise = invoice.totalAmount ?? invoice.total ?? 0;
  const taxableValuePaise = invoice.taxableValue ?? subtotalPaise;

  const amount = subtotalPaise / 100;
  const taxAmount = taxPaise / 100;
  const totalAmount = totalPaise / 100;
  const taxableValue = taxableValuePaise / 100;

  const rawItems =
    invoice.items && invoice.items.length > 0
      ? invoice.items
      : [
          {
            slNo: 1,
            description:
              invoice.serviceName ||
              invoice?.service ||
              (invoice.service ? invoice.service.toUpperCase() : "Service"),
            hsnSac: invoice.hsnSac || "998315",
            qty: 1,
            unit: "No.",
            rate: subtotalPaise,
            rateInclusive: totalPaise,
            amount: subtotalPaise,
          },
        ];

  const convertedItems = rawItems.map((item) => {
    return {
      slNo: item.slNo,
      description: item.description,
      hsnSac: item.hsnSac || "998315",
      qty: item.qty ?? 1,
      unit: item.unit || "No.",
      rateExclusive: item.rate ? item.rate / 100 : 0,
      rate: item.rate ? item.rate / 100 : 0,
      rateInclusive: item.rateInclusive ? item.rateInclusive / 100 : 0,
      amount: item.amount ? item.amount / 100 : 0,
    };
  });
  // ---- 4. Client info (both schemas already store this directly,
  // but auto invoices can fall back to a populated userId object) ----
  const clientName =
    invoice.clientName ||
    (invoice.userId && typeof invoice.userId === "object"
      ? `${invoice.userId.firstName || invoice.userId.name || ""} ${
          invoice.userId.lastName || ""
        }`.trim() || invoice.userId.email?.split("@")[0]
      : "N/A");
  const clientEmail =
    invoice.clientEmail ||
    (invoice.userId && typeof invoice.userId === "object"
      ? invoice.userId.email
      : "N/A") ||
    "N/A";
  const clientPhone =
    invoice.clientPhone ||
    (invoice.userId && typeof invoice.userId === "object"
      ? invoice.userId.phone || invoice.userId.mobile
      : "") ||
    "";

  // ---- 5. Date ----
  const invDate =
    invoice.createdAt || invoice.paidAt || new Date().toISOString();
  const formattedDate = new Date(invDate).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return {
    ...COMPANY_INFO,
    invoiceNo: invoiceNumber,
    date: formattedDate,
    deliveryNote: "",
    modeOfPayment: invoice.paymentMethod
      ? invoice.paymentMethod.charAt(0).toUpperCase() +
        invoice.paymentMethod.slice(1).replace("_", " ")
      : "Card",
    referenceNo: invoice.razorpayPaymentId || invoice.paymentId || "",
    otherReferences: invoice.razorpayOrderId || "",
    buyerName: clientName,
    buyerAddress: "",
    buyerGstin: "",
    buyerStateName: "",
    buyerStateCode: "",
    buyerContactPerson: clientName,
    buyerContact: clientPhone,
    buyerEmail: clientEmail,
    items: convertedItems,
    taxType: invoice.taxType || "CGST+SGST",
    taxRate: invoice.taxRate || 18,
    taxableValue,
    taxAmount,
    totalAmount,
    amountInWords: totalAmount,
    taxAmountInWords: taxAmount,
    ...BANK_INFO,
    declarationTerms: DECLARATION_TERMS,
    governmentLaw:
      "This invoice is governed by and construed in accordance with the laws of India.",
    jurisdiction: "DELHI",
    _clientName: clientName,
    _clientEmail: clientEmail,
    _clientPhone: clientPhone,
  };
};

const InvoiceDetailModal = ({ invoice, isOpen, onClose }) => {
  const LOGO_URL = "/Cloudedata.svg";

  if (!invoice || !isOpen) return null;

  const invoiceData = buildFormattedInvoiceData(invoice);

  const userEmail = invoiceData._clientEmail;
  const userName = invoiceData._clientName;
  const userPhone = invoiceData._clientPhone;

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
    invoiceNo,
    date,
    deliveryNote,
    modeOfPayment,
    referenceNo,
    otherReferences,
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

  const buildItemsRows = () => {
    return items.map((item, idx) => {
      const sl = item?.slNo || idx + 1;
      const desc = item?.description || item?.service;
      const hsn = item?.hsnSac || "";
      const qty = item?.qty || 0;
      const unit = item?.unit || "";
      const rateEx =
        item?.rateExclusive || item?.rate || item?.subtotal / 100 || 0;
      const rateIn = item.rateInclusive || item?.total / 100 || 0;
      const amt = item.amount || item?.subtotal / 100 || 0;

      return (
        <tr key={idx}>
          <td className="border border-black p-1 text-center text-[10px] sm:text-[11px]">
            {sl}
          </td>
          <td className="border border-black p-1 text-[10px] sm:text-[11px]">
            <div className="font-semibold">{desc}</div>
          </td>
          <td className="border border-black p-1 text-center text-[10px] sm:text-[11px]">
            {hsn}
          </td>
          <td className="border border-black p-1 text-center text-[10px] sm:text-[11px]">
            {qty} {unit}
          </td>
          <td className="border border-black p-1 text-right text-[10px] sm:text-[11px]">
            {rateEx ? formatIndianCurrency(rateEx) : ""}
          </td>
          <td className="border border-black p-1 text-right text-[10px] sm:text-[11px]">
            {rateIn ? formatIndianCurrency(rateIn) : ""}
          </td>
          <td className="border border-black p-1 text-right text-[10px] sm:text-[11px]">
            {formatIndianCurrency(amt)}
          </td>
        </tr>
      );
    });
  };

  const HeaderTable = () => (
    <table
      className="w-full border-collapse text-[9px] sm:text-[11px]"
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      <tbody>
        <tr>
          <td colSpan={2} className="font-bold text-[10px] sm:text-[12px]">
            {companyName}
          </td>
          <td colSpan={2} className="font-bold">
            Invoice No.
          </td>
          <td colSpan={2} className="font-bold">
            Dated
          </td>
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
          <td colSpan={2}>{deliveryNote || ""}</td>
          <td colSpan={2}>{modeOfPayment || ""}</td>
        </tr>
        <tr>
          <td colSpan={2}></td>
          <td colSpan={2}>{referenceNo || ""}</td>
          <td colSpan={2}>{otherReferences || ""}</td>
        </tr>
        <tr>
          <td colSpan={2}>GSTIN/UIN: {gstin}</td>
          <td colSpan={2}></td>
          <td colSpan={2}></td>
        </tr>
        <tr>
          <td colSpan={2}>
            State Name: {stateName}
            {stateCode ? `, Code: ${stateCode}` : ""}
          </td>
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
      {isOpen && (
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
            <div className="flex items-center justify-between px-4 sm:px-8 pt-4 sm:pt-6 pb-4 print:hidden">
              <img
                src="/Cloudedata.svg"
                className="h-12 w-auto sm:h-20 sm:w-40"
              />
              <div className="flex items-center gap-2">
                <PDFDownloadLink
                  document={
                    <InvoicePDF
                      invoiceData={invoiceData}
                      userEmail={userEmail}
                      userName={userName}
                      userPhone={userPhone}
                    />
                  }
                  fileName={`${invoiceNo}.pdf`}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-indigo-600 text-white font-semibold rounded-xl flex items-center gap-1 sm:gap-2 hover:bg-indigo-700 transition text-xs sm:text-sm"
                >
                  {({ loading }) => (
                    <>
                      <Download size={14} className="sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">
                        {loading ? "Generating..." : "Download PDF"}
                      </span>
                      <span className="sm:hidden"> Download PDF</span>
                    </>
                  )}
                </PDFDownloadLink>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div
              id="invoice-print-area"
              className="px-4 sm:px-6 py-4"
              style={{ fontFamily: "Arial, sans-serif", fontSize: "11px" }}
            >
              <h2 className="text-center font-bold mb-2 text-sm sm:text-base">
                Tax Invoice
              </h2>

              <HeaderTable />

              <div className="mt-3 border border-black p-2 text-[10px] sm:text-[11px]">
                <div className="font-bold">Buyer (Bill to)</div>
                {userName && <div className="font-bold">{userName}</div>}
                {userPhone && <div>Contact : {userPhone}</div>}
                {userEmail && <div>E-Mail : {userEmail}</div>}
              </div>

              <div className="overflow-x-auto mt-3">
                <table className="w-full border border-black border-collapse min-w-[600px] text-[10px] sm:text-[11px]">
                  <thead>
                    <tr style={{ backgroundColor: "#f3f4f6" }}>
                      <th
                        className="border border-black p-1 text-center"
                        style={{ width: "6%" }}
                      >
                        Sl No
                      </th>
                      <th
                        className="border border-black p-1"
                        style={{ width: "32%" }}
                      >
                        Description of Services
                      </th>
                      <th
                        className="border border-black p-1 text-center"
                        style={{ width: "12%" }}
                      >
                        HSN/SAC
                      </th>
                      <th
                        className="border border-black p-1 text-center"
                        style={{ width: "10%" }}
                      >
                        Quantity
                      </th>
                      <th
                        className="border border-black p-1 text-right"
                        style={{ width: "12%" }}
                      >
                        Rate per
                      </th>
                      <th
                        className="border border-black p-1 text-right"
                        style={{ width: "16%" }}
                      >
                        Rate (Ind. of Tax)
                      </th>
                      <th
                        className="border border-black p-1 text-right"
                        style={{ width: "12%" }}
                      >
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>{buildItemsRows()}</tbody>
                </table>
              </div>

              <div className="mt-2 text-[10px] sm:text-[11px]">
                <span className="font-bold">
                  {taxType && taxRate && stateName
                    ? `${taxType} Output-${taxRate}% (${stateName})`
                    : taxType
                      ? taxType
                      : ""}
                </span>
              </div>

              <div className="mt-3 text-[10px] sm:text-[11px]">
                <div className="font-bold">Amount Chargable (in words)</div>
                <div className="font-bold">
                  {currencyToWords(amountInWords)}
                </div>
              </div>

              <div className="overflow-x-auto mt-3">
                <table className="w-full border border-black border-collapse min-w-[300px] text-[10px] sm:text-[11px]">
                  <thead>
                    <tr style={{ backgroundColor: "#f3f4f6" }}>
                      <th className="border border-black p-1">HSN/SAC</th>
                      <th className="border border-black p-1 text-right">
                        Taxable Value
                      </th>
                      <th className="border border-black p-1 text-right">
                        GST Value
                      </th>
                      <th className="border border-black p-1 text-right">
                        Total Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-black p-1">
                        {items.map((i) => i.hsnSac).join(", ")}
                      </td>
                      <td className="border border-black p-1 text-right">
                        {formatIndianCurrency(taxableValue)}
                      </td>
                      <td className="border border-black p-1 text-right">
                        {formatIndianCurrency(taxAmount)}
                      </td>
                      <td className="border border-black p-1 text-right">
                        {formatIndianCurrency(totalAmount)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-2 text-[10px] sm:text-[11px]">
                <strong>
                  Tax Amount (in words) : {currencyToWords(taxAmountInWords)}
                </strong>
              </div>

              <div className="mt-4 text-[10px] sm:text-[11px]">
                <div className="font-bold">Declaration</div>
                <div className="mt-1">
                  <strong>Terms & Conditions:</strong>
                  <ul className="list-disc pl-5">
                    {declarationTerms.map((term, idx) => (
                      <li key={idx} className="text-sm">
                        {term}
                      </li>
                    ))}
                  </ul>
                </div>
                {governmentLaw && <div className="mt-2">{governmentLaw}</div>}
              </div>

              <div className="mt-4 text-[10px] sm:text-[11px]">
                <div className="font-bold">Company's Bank Details</div>
                <table className="w-full">
                  <tbody>
                    {bankAccountHolder && (
                      <tr>
                        <td style={{ width: "40%" }}>Account Holder's Name</td>
                        <td>: {bankAccountHolder}</td>
                      </tr>
                    )}
                    {bankName && (
                      <tr>
                        <td>Bank Name</td>
                        <td>: {bankName}</td>
                      </tr>
                    )}
                    {bankAccountNumber && (
                      <tr>
                        <td>Account Number</td>
                        <td>: {bankAccountNumber}</td>
                      </tr>
                    )}
                    {(bankBranch || bankIFSC) && (
                      <tr>
                        <td>Branch & IFSC Code</td>
                        <td>
                          : {bankBranch} {bankIFSC ? "& " + bankIFSC : ""}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex justify-end text-[10px] sm:text-[11px]">
                <div style={{ textAlign: "right" }}>
                  {companyName && (
                    <div className="font-bold"> {companyName}</div>
                  )}
                </div>
              </div>

              <div
                className="mt-6 text-center text-[10px] sm:text-[11px]"
                style={{
                  borderTop: "1px solid black",
                  paddingTop: "10px",
                }}
              >
                {jurisdiction && (
                  <div className="font-bold">
                    SUBJECT TO {jurisdiction} JURISDICTION
                  </div>
                )}
                <div>This is a System Generated Invoice</div>
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

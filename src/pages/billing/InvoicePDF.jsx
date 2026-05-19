import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';
import { ToWords } from 'to-words';
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

const BORDER_COLOR = '#000';

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10,
    fontFamily: 'Helvetica',
    color: '#000',
  },

  title: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  /* ── Header: NO borders at all ── */
  headerWrapper: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  headerLeft: {
    width: '40%',
    paddingRight: 8,
  },
  headerRight: {
    width: '60%',
  },
  headerRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  headerLabel: {
    width: '50%',
    fontWeight: 'bold',
    fontSize: 10,
  },
  headerValue: {
    width: '50%',
    fontSize: 10,
  },
  companyName: {
    fontWeight: 'bold',
    fontSize: 11,
    marginBottom: 3,
  },
  headerText: {
    fontSize: 9,
    marginBottom: 2,
  },

  /* ── Shared table styles (items / summary only) ── */
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderStyle: 'solid',
  },

  row: {
    flexDirection: 'row',
  },

  cell: {
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: BORDER_COLOR,
    padding: 4,
  },

  bold: {
    fontWeight: 'bold',
  },

  center: {
    textAlign: 'center',
  },

  right: {
    textAlign: 'right',
  },

  mt10: {
    marginTop: 10,
  },
mt20:{
marginTop: 20,
},
mt30:{
marginTop: 30,
},
  buyerBox: {
    // borderWidth: 1,
    // borderColor: BORDER_COLOR,
    padding: 6,
    marginTop: 10,
  },

  footer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: BORDER_COLOR,
    paddingTop: 8,
    textAlign: 'center',
  },

  signatureBox: {
    marginTop: 15,
    alignItems: 'flex-end',
  },

  termsList: {
    marginLeft: 10,
    marginTop: 4,
  },

  logo: {
    width: 100,
    height: 40,
    objectFit: 'contain',
    marginBottom: 5,
  },
});

const InvoicePDF = ({ invoiceData, userEmail, userName, userPhone }) => {
  if (!invoiceData) return null;

  const LOGO_URL = '/Cloudedata.svg';

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

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* Logo */}
        <Image src={LOGO_URL} style={styles.logo} />

        {/* Title */}
        <Text style={styles.title}>Tax Invoice</Text>

        {/* ──────────── HEADER – CLEAN, NO BORDERS ──────────── */}
        <View style={styles.headerWrapper}>

          {/* LEFT: Company details – plain text */}
          <View style={styles.headerLeft}>
            <Text style={styles.companyName}>{companyName}</Text>
            {addressLine1 && <Text style={styles.headerText}>{addressLine1}</Text>}
            {addressLine2 && <Text style={styles.headerText}>{addressLine2}</Text>}
            {cityPincode  && <Text style={styles.headerText}>{cityPincode}</Text>}
            {gstin        && <Text style={styles.headerText}>GSTIN/UIN: {gstin}</Text>}
            {(stateName || stateCode) && (
              <Text style={styles.headerText}>
                State Name: {stateName}{stateCode ? `, Code: ${stateCode}` : ''}
              </Text>
            )}
            {cin     && <Text style={styles.headerText}>CIN: {cin}</Text>}
            {email   && <Text style={styles.headerText}>E-Mail: {email}</Text>}
            {website && <Text style={styles.headerText}>{website}</Text>}
          </View>

          {/* RIGHT: Invoice meta – label / value pairs, no border */}
          <View style={styles.headerRight}>

            <View style={styles.headerRow}>
              <Text style={styles.headerLabel}>Invoice No.</Text>
              <Text style={styles.headerLabel}>Dated</Text>
            </View>
            <View style={[styles.headerRow, { marginBottom: 6 }]}>
              <Text style={styles.headerValue}>{invoiceNo}</Text>
              <Text style={styles.headerValue}>{date}</Text>
            </View>

            {/* <View style={styles.headerRow}>
              <Text style={styles.headerLabel}>Delivery Note</Text>
              <Text style={styles.headerLabel}>Mode/Terms of Payment</Text>
            </View> */}
            <View style={[styles.headerRow, { marginBottom: 6 }]}>
              <Text style={styles.headerValue}>{deliveryNote || ''}</Text>
              <Text style={styles.headerValue}>{modeOfPayment || ''}</Text>
            </View>

            {/* <View style={styles.headerRow}>
              <Text style={styles.headerLabel}>Reference No. & Date.</Text>
              <Text style={styles.headerLabel}>Other References</Text>
            </View> */}
            <View style={styles.headerRow}>
              <Text style={styles.headerValue}>{referenceNo || ''}</Text>
              <Text style={styles.headerValue}>{otherReferences || ''}</Text>
            </View>

          </View>
        </View>
        {/* ────────────────────────────────────────────────────── */}

        {/* BUYER */}
        <View style={styles.buyerBox}>
          <Text style={styles.bold}>Buyer (Bill to)</Text>
          {userName  && <Text style={styles.bold}>{userName}</Text>}
          {userPhone && <Text>Contact : {userPhone}</Text>}
          {userEmail && <Text>E-Mail : {userEmail}</Text>}
        </View>

        {/* ITEMS TABLE */}
        <View style={[styles.table, styles.mt20]}>

          {/* Header row */}
          <View style={[styles.row, { backgroundColor: '#f3f4f6' }]}>
            {[
              ['6%',  'Sl No'],
              ['32%', 'Description of Services'],
              ['12%', 'HSN/SAC'],
              ['10%', 'Quantity'],
              ['12%', 'Rate per'],
              ['16%', 'Rate (Ind. of Tax)'],
              ['12%', 'Amount'],
            ].map(([width, label], i) => (
              <View
                key={i}
                style={[styles.cell, { width, borderRightWidth: i === 6 ? 0 : 1 }]}
              >
                <Text style={i !== 1 ? styles.center : styles.bold}>{label}</Text>
              </View>
            ))}
          </View>

          {/* Data rows */}
          {items.map((item, idx) => {
            const sl     = item.slNo || idx + 1;
            const desc   = item.description || '';
            const hsn    = item.hsnSac || '';
            const qty    = item.qty || 0;
            const unit   = item.unit || '';
            const rateEx = item.rateExclusive || item.rate || 0;
            const rateIn = item.rateInclusive || 0;
            const amt    = item.amount || 0;

            return (
              <View style={styles.row} key={idx}>
                <View style={[styles.cell, { width: '6%' }]}>
                  <Text style={styles.center}>{sl}</Text>
                </View>
                <View style={[styles.cell, { width: '32%' }]}>
                  <Text style={styles.bold}>{desc}</Text>
                </View>
                <View style={[styles.cell, { width: '12%' }]}>
                  <Text style={styles.center}>{hsn}</Text>
                </View>
                <View style={[styles.cell, { width: '10%' }]}>
                  <Text style={styles.center}>{qty} {unit}</Text>
                </View>
                <View style={[styles.cell, { width: '12%' }]}>
                  <Text style={styles.right}>{formatIndianCurrency(rateEx)}</Text>
                </View>
                <View style={[styles.cell, { width: '16%' }]}>
                  <Text style={styles.right}>{rateIn ? formatIndianCurrency(rateIn) : ''}</Text>
                </View>
                <View style={[styles.cell, { width: '12%', borderRightWidth: 0 }]}>
                  <Text style={styles.right}>{formatIndianCurrency(amt)}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* TAX TYPE */}
        <View style={styles.mt10}>
          <Text style={styles.bold}>
            {taxType && taxRate && stateName
              ? `${taxType} Output-${taxRate}% (${stateName})`
              : taxType || ''}
          </Text>
        </View>

        {/* AMOUNT IN WORDS */}
        <View style={styles.mt10}>
          <Text style={styles.bold}>Amount Chargable (in words)</Text>
          <Text style={styles.bold}>{currencyToWords(amountInWords)}</Text>
        </View>

        {/* SUMMARY TABLE */}
        <View style={[styles.table, styles.mt20]}>
          <View style={[styles.row, { backgroundColor: '#f3f4f6' }]}>
            {[
              ['25%', 'HSN/SAC'],
              ['25%', 'Taxable Value'],
              ['25%', 'GST Value'],
              ['25%', 'Total Amount'],
            ].map(([width, label], i) => (
              <View
                key={i}
                style={[styles.cell, { width, borderRightWidth: i === 3 ? 0 : 1 }]}
              >
                <Text style={styles.center}>{label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.row}>
            <View style={[styles.cell, { width: '25%' }]}>
              <Text>{items.map(i => i.hsnSac).join(', ')}</Text>
            </View>
            <View style={[styles.cell, { width: '25%' }]}>
              <Text style={styles.right}>{formatIndianCurrency(taxableValue)}</Text>
            </View>
            <View style={[styles.cell, { width: '25%' }]}>
              <Text style={styles.right}>{formatIndianCurrency(taxAmount)}</Text>
            </View>
            <View style={[styles.cell, { width: '25%', borderRightWidth: 0 }]}>
              <Text style={styles.right}>{formatIndianCurrency(totalAmount)}</Text>
            </View>
          </View>
        </View>

        {/* TAX WORDS */}
        <View style={styles.mt10}>
          <Text style={styles.bold}>
            Tax Amount (in words) : {currencyToWords(taxAmountInWords)}
          </Text>
        </View>

        {/* PAN */}
        <View style={styles.mt20}>
          <Text>
            <Text style={styles.bold}>Company's PAN : </Text>
            {pan}
          </Text>
        </View>

        {/* DECLARATION */}
        <View style={styles.mt10}>
          <Text style={styles.bold}>Declaration</Text>
          <Text style={[styles.bold, { marginTop: 4 }]}>Terms & Conditions:</Text>
          <View style={styles.termsList}>
            {declarationTerms.map((term, idx) => (
              <Text key={idx}>• {term}</Text>
            ))}
          </View>
          {governmentLaw && (
            <Text style={{ marginTop: 6 }}>{governmentLaw}</Text>
          )}
        </View>

        {/* BANK DETAILS */}
        <View style={styles.mt20}>
          <Text style={styles.bold}>Company's Bank Details</Text>
          {bankAccountHolder && <Text>Account Holder's Name : {bankAccountHolder}</Text>}
          {bankName          && <Text>Bank Name : {bankName}</Text>}
          {bankAccountNumber && <Text>Account Number : {bankAccountNumber}</Text>}
          {(bankBranch || bankIFSC) && (
            <Text>Branch & IFSC Code : {bankBranch} {bankIFSC}</Text>
          )}
        </View>

        {/* SIGNATURE */}
        <View style={styles.signatureBox}>
          <Text style={styles.bold}>{companyName}</Text>
          <View style={{ height: 35 }} />
          <Text style={styles.bold}>Authorised Signatory</Text>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          {jurisdiction && (
            <Text style={styles.bold}>SUBJECT TO {jurisdiction} JURISDICTION</Text>
          )}
          <Text>This is a System Generated Invoice</Text>
        </View>

      </Page>
    </Document>
  );
};

export default InvoicePDF;
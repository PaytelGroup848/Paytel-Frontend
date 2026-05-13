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
    marginBottom: 5,
  },

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

  buyerBox: {
    borderWidth: 1,
    borderColor: BORDER_COLOR,
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
    marginTop: 20,
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

    //  const userEmail = useMe()?.data?.email
    //         const profile = useProfile()?.data;
    //     const userName = profile?.firstName;
    //     const userPhone = profile?.phone;
  if (!invoiceData) return null;

  const LOGO_URL = '/FullCloudedatalogosvg.svg';

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

        {/* HEADER TABLE */}
        <View style={styles.table}>
          
          {/* Row 1 */}
          <View style={styles.row}>
            <View style={[styles.cell, { width: '34%' }]}>
              <Text style={styles.bold}>{companyName}</Text>
            </View>

            <View style={[styles.cell, { width: '33%' }]}>
              <Text style={styles.bold}>Invoice No.</Text>
            </View>

            <View style={[styles.cell, { width: '33%', borderRightWidth: 0 }]}>
              <Text style={styles.bold}>Dated</Text>
            </View>
          </View>

          {/* Row 2 */}
          <View style={styles.row}>
            <View style={[styles.cell, { width: '34%' }]}>
              <Text>{addressLine1}</Text>
            </View>

            <View style={[styles.cell, { width: '33%' }]}>
              <Text>{invoiceNo}</Text>
            </View>

            <View style={[styles.cell, { width: '33%', borderRightWidth: 0 }]}>
              <Text>{date}</Text>
            </View>
          </View>

          {/* Row 3 */}
          <View style={styles.row}>
            <View style={[styles.cell, { width: '34%' }]}>
              <Text>{addressLine2}</Text>
            </View>

            <View style={[styles.cell, { width: '33%' }]}>
              <Text>Delivery Note</Text>
            </View>

            <View style={[styles.cell, { width: '33%', borderRightWidth: 0 }]}>
              <Text>Mode/Terms of Payment</Text>
            </View>
          </View>

          {/* Row 4 */}
          <View style={styles.row}>
            <View style={[styles.cell, { width: '34%' }]}>
              <Text>{cityPincode}</Text>
            </View>

            <View style={[styles.cell, { width: '33%' }]}>
              <Text>{deliveryNote}</Text>
            </View>

            <View style={[styles.cell, { width: '33%', borderRightWidth: 0 }]}>
              <Text>{modeOfPayment}</Text>
            </View>
          </View>

          {/* Row 5 */}
          <View style={styles.row}>
            <View style={[styles.cell, { width: '34%' }]}>
              <Text>GSTIN/UIN: {gstin}</Text>
            </View>

            <View style={[styles.cell, { width: '33%' }]}>
              <Text>{referenceNo}</Text>
            </View>

            <View style={[styles.cell, { width: '33%', borderRightWidth: 0 }]}>
              <Text>{otherReferences}</Text>
            </View>
          </View>

          {/* Row 6 */}
          <View style={styles.row}>
            <View style={[styles.cell, { width: '34%' }]}>
              <Text>
                State Name: {stateName}, Code: {stateCode}
              </Text>
            </View>

            <View style={[styles.cell, { width: '33%' }]} />

            <View style={[styles.cell, { width: '33%', borderRightWidth: 0 }]} />
          </View>

          {/* Row 7 */}
          <View style={styles.row}>
            <View style={[styles.cell, { width: '34%' }]}>
              <Text>CIN: {cin}</Text>
            </View>

            <View style={[styles.cell, { width: '33%' }]} />

            <View style={[styles.cell, { width: '33%', borderRightWidth: 0 }]} />
          </View>

          {/* Row 8 */}
          <View style={styles.row}>
            <View style={[styles.cell, { width: '34%' }]}>
              <Text>E-Mail: {email}</Text>
            </View>

            <View style={[styles.cell, { width: '33%' }]} />

            <View style={[styles.cell, { width: '33%', borderRightWidth: 0 }]} />
          </View>

          {/* Row 9 */}
          <View style={styles.row}>
            <View style={[styles.cell, { width: '34%', borderBottomWidth: 0 }]}>
              <Text>{website}</Text>
            </View>

            <View style={[styles.cell, { width: '33%', borderBottomWidth: 0 }]} />

            <View style={[styles.cell, { width: '33%', borderRightWidth: 0, borderBottomWidth: 0 }]} />
          </View>
        </View>

        {/* BUYER */}
        <View style={styles.buyerBox}>
          <Text style={styles.bold}>Buyer (Bill to)</Text>

          {userName && (
            <Text style={styles.bold}>{userName}</Text>
          )}

          {/* {buyerAddress && <Text>{buyerAddress}</Text>}

          {buyerGstin && (
            <Text>GSTIN/UIN : {buyerGstin}</Text>
          )}

          {(buyerStateName || buyerStateCode) && (
            <Text>
              State Name : {buyerStateName}, Code : {buyerStateCode}
            </Text>
          )}

          {buyerContactPerson && (
            <Text>
              Contact person : {buyerContactPerson}
            </Text>
          )} */}

          {userPhone && (
            <Text>Contact : {userPhone}</Text>
          )}

          {userEmail && (
            <Text>E-Mail : {userEmail}</Text>
          )}
        </View>

        {/* ITEMS TABLE */}
        <View style={[styles.table, styles.mt10]}>
          
          {/* Header */}
          <View style={[styles.row, { backgroundColor: '#f3f4f6' }]}>
            {[
              ['6%', 'Sl No'],
              ['32%', 'Description of Services'],
              ['12%', 'HSN/SAC'],
              ['10%', 'Quantity'],
              ['16%', 'Rate (Ind. of Tax)'],
              ['12%', 'Rate per'],
              ['12%', 'Amount'],
            ].map(([width, label], i) => (
              <View
                key={i}
                style={[
                  styles.cell,
                  {
                    width,
                    borderRightWidth: i === 6 ? 0 : 1,
                  },
                ]}
              >
                <Text style={i !== 1 ? styles.center : styles.bold}>
                  {label}
                </Text>
              </View>
            ))}
          </View>

          {/* Rows */}
          {items.map((item, idx) => (
            <View style={styles.row} key={idx}>
              
              <View style={[styles.cell, { width: '6%' }]}>
                <Text style={styles.center}>
                  {item.slNo || idx + 1}
                </Text>
              </View>

              <View style={[styles.cell, { width: '32%' }]}>
                <Text style={styles.bold}>
                  {item.description}
                </Text>

                {/* {item.subDetails?.map((sub, i) => (
                  <Text
                    key={i}
                    style={{ fontSize: 8, marginTop: 2 }}
                  >
                    {sub}
                  </Text>
                ))} */}
              </View>

              <View style={[styles.cell, { width: '12%' }]}>
                <Text style={styles.center}>
                  {item.hsnSac}
                </Text>
              </View>

              <View style={[styles.cell, { width: '10%' }]}>
                <Text style={styles.center}>
                  {item.qty} {item.unit}
                </Text>
              </View>

              <View style={[styles.cell, { width: '16%' }]}>
                <Text style={styles.right}>
                  {formatIndianCurrency(
                    item.rateInclusive || item.rateInclusive
                  )}
                </Text>
              </View>

              <View style={[styles.cell, { width: '12%' }]}>
                <Text style={styles.right}>
                  {item.rateExclusive
                    ? formatIndianCurrency(item.rate)
                    : ''}
                </Text>
              </View>

              <View
                style={[
                  styles.cell,
                  { width: '12%', borderRightWidth: 0 },
                ]}
              >
                <Text style={styles.right}>
                  {formatIndianCurrency(item.amount)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* TAX TYPE */}
        <View style={styles.mt10}>
          <Text style={styles.bold}>
            {taxType && taxRate && stateName
              ? `${taxType} Output-${taxRate}% (${stateName})`
              : taxType || ''}
          </Text>
        </View>

        {/* AMOUNT WORDS */}
        <View style={styles.mt10}>
          <Text style={styles.bold}>
            Amount Chargable (in words)
          </Text>

          <Text style={styles.bold}>
            {/* currencyToWords(totalAmount) */}
            {currencyToWords(amountInWords)}
          </Text>
        </View>

        {/* SUMMARY TABLE */}
        <View style={[styles.table, styles.mt10]}>
          
          <View style={[styles.row, { backgroundColor: '#f3f4f6' }]}>
            {[
              ['25%', 'HSN/SAC'],
              ['25%', 'Taxable Value'],
              ['25%', 'GST Value'],
              ['25%', 'Total Amount'],
            ].map(([width, label], i) => (
              <View
                key={i}
                style={[
                  styles.cell,
                  {
                    width,
                    borderRightWidth: i === 3 ? 0 : 1,
                  },
                ]}
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
              <Text style={styles.right}>
                {formatIndianCurrency(taxableValue)}
              </Text>
            </View>

            <View style={[styles.cell, { width: '25%' }]}>
              <Text style={styles.right}>
                {formatIndianCurrency(taxAmount)}
              </Text>
            </View>

            <View
              style={[
                styles.cell,
                { width: '25%', borderRightWidth: 0 },
              ]}
            >
              <Text style={styles.right}>
                
                {formatIndianCurrency(totalAmount)}
              </Text>
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
        <View style={styles.mt10}>
          <Text>
            <Text style={styles.bold}>Company's PAN : </Text>
            {pan}
          </Text>
        </View>

        {/* DECLARATION */}
        <View style={styles.mt10}>
          <Text style={styles.bold}>Declaration</Text>

          <Text style={[styles.bold, { marginTop: 4 }]}>
            Terms & Conditions:
          </Text>

          <View style={styles.termsList}>
            {declarationTerms.map((term, idx) => (
              <Text key={idx}>
                • {term}
              </Text>
            ))}
          </View>

          {governmentLaw && (
            <Text style={{ marginTop: 6 }}>
              {governmentLaw}
            </Text>
          )}
        </View>

        {/* BANK DETAILS */}
        <View style={styles.mt10}>
          <Text style={styles.bold}>
            Company's Bank Details
          </Text>

          {bankAccountHolder && (
            <Text>
              Account Holder's Name : {bankAccountHolder}
            </Text>
          )}

          {bankName && (
            <Text>
              Bank Name : {bankName}
            </Text>
          )}

          {bankAccountNumber && (
            <Text>
              Account Number : {bankAccountNumber}
            </Text>
          )}

          {(bankBranch || bankIFSC) && (
            <Text>
              Branch & IFSC Code : {bankBranch} {bankIFSC}
            </Text>
          )}
        </View>

        {/* SIGNATURE */}
        <View style={styles.signatureBox}>
          <Text style={styles.bold}>
            {companyName}
          </Text>

          <View style={{ height: 35 }} />

          <Text style={styles.bold}>
            Authorised Signatory
          </Text>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          {jurisdiction && (
            <Text style={styles.bold}>
              SUBJECT TO {jurisdiction} JURISDICTION
            </Text>
          )}

          <Text>
            This is a Computer Generated Invoice
          </Text>
        </View>

      </Page>
    </Document>
  );
};

export default InvoicePDF;
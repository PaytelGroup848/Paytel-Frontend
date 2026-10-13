import { ToWords } from 'to-words';

const toWords = new ToWords({
  localeCode: 'en-IN',
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
  },
});

export const currencyToWords = (amount) => {
  const cleanAmount = Number(
    String(amount)
      .replace(/INR/gi, '')
      .replace(/,/g, '')
      .replace(/Only/gi, '')
      .trim()
  );

  if (isNaN(cleanAmount)) return '';

  return toWords.convert(cleanAmount);
};
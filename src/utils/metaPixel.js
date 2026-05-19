// Meta Pixel tracking utilities

// Initialize Meta Pixel (already in index.html, but we'll add helper functions)
export const metaPixel = {
  // Track PageView
  pageView: () => {
    if (typeof fbq !== 'undefined') {
      fbq('track', 'PageView');
      console.log(' Meta Pixel: PageView tracked');
    }
  },

  // Track InitiateCheckout
  initiateCheckout: () => {
    if (typeof fbq !== 'undefined') {
      fbq('track', 'InitiateCheckout');
      console.log('Meta Pixel: InitiateCheckout tracked');
    }
  },

  // Track Purchase
  purchase: (value, currency = 'INR') => {
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Purchase', {
        value: parseFloat(value),
        currency: currency
      });
      console.log(` Meta Pixel: Purchase tracked - ₹${value} ${currency}`);
    }
  },

  // Track custom event for plan selection
  addToCart: (planName, price) => {
    if (typeof fbq !== 'undefined') {
      fbq('track', 'AddToCart', {
        content_name: planName,
        content_category: 'VPS Plan',
        value: parseFloat(price),
        currency: 'INR'
      });
      console.log(` Meta Pixel: AddToCart tracked - ${planName}`);
    }
  }
};
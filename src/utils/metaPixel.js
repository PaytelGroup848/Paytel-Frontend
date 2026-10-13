// Meta Pixel tracking utilities

// Initialize Meta Pixel (already in index.html, but we'll add helper functions)
export const metaPixel = {
  // Track PageView
  pageView: () => {
    if (typeof fbq !== 'undefined') {
      fbq('track', 'PageView');
    
    }
  },

  // Track InitiateCheckout
  initiateCheckout: () => {
    if (typeof fbq !== 'undefined') {
      fbq('track', 'InitiateCheckout');
    
    }
  },

  // Track Purchase
  purchase: (value, currency = 'INR') => {
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Purchase', {
        value: parseFloat(value),
        currency: currency
      });
     
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
     
    }
  }
};
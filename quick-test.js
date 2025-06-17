// Quick FRED API Test - Run this in browser console
console.log('🧪 Testing updated FRED proxy...');

// Clear all cache versions
['specialty_one_market_rates', 'specialty_one_market_rates_v2', 'specialty_one_market_rates_v3']
  .forEach(key => {
    localStorage.removeItem(key);
    console.log(`🗑️ Cleared ${key}`);
  });

// Force reload the page to trigger fresh fetch
console.log('🔄 Refreshing page to test updated Edge Function...');
setTimeout(() => {
  window.location.reload();
}, 1000);

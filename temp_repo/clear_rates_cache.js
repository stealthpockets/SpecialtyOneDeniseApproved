// Clear FRED rates cache script
console.log('Clearing FRED rates cache...');

// Clear both old and new cache keys
const cacheKeys = ['specialty_one_market_rates', 'specialty_one_market_rates_v2', 'specialty_one_market_rates_v3'];

if (typeof localStorage !== 'undefined') {
  cacheKeys.forEach(key => {
    localStorage.removeItem(key);
    console.log(`✅ Cleared cache: ${key}`);
  });
  console.log('🔄 All FRED rates cache cleared. Refresh the page to fetch fresh data.');
} else {
  console.log('ℹ️ This script should be run in the browser console');
  console.log('Copy and paste this in your browser console:');
  console.log(`localStorage.removeItem("specialty_one_market_rates"); localStorage.removeItem("specialty_one_market_rates_v2"); localStorage.removeItem("specialty_one_market_rates_v3"); console.log("Cache cleared!");`);
}

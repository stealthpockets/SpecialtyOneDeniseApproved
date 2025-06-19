// FRED API Test Script
// This script tests individual FRED API calls to diagnose the 400 errors

const FRED_API_KEY = process.env.FRED_API_KEY; // You'll need to set this
const PROBLEMATIC_SERIES = ['DPRIME', 'DGS10', 'DGS5', 'DCPN3M', 'DGS3'];
const WORKING_SERIES = ['SOFR', 'MORTGAGE30US', 'SOFR30DAYAVG', 'SOFR90DAYAVG'];

async function testFREDSeries(seriesId) {
    const currentDate = new Date().toISOString().split("T")[0];
    const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}&api_key=${FRED_API_KEY}&file_type=json&realtime_end=${currentDate}&limit=5&sort_order=desc`;
    
    console.log(`\n🔍 Testing ${seriesId}:`);
    console.log(`URL: ${url.replace(FRED_API_KEY, 'REDACTED')}`);
    
    try {
        const response = await fetch(url);
        console.log(`Status: ${response.status} ${response.statusText}`);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.log(`❌ Error Response: ${errorText}`);
            return { series: seriesId, status: response.status, error: errorText };
        }
        
        const data = await response.json();
        const validObservations = data.observations?.filter(obs => obs.value !== '.') || [];
        console.log(`✅ Success: ${validObservations.length} valid observations`);
        
        if (validObservations.length > 0) {
            console.log(`Latest: ${validObservations[0].date} = ${validObservations[0].value}`);
        }
        
        return { series: seriesId, status: response.status, data: data };
    } catch (error) {
        console.log(`❌ Network Error: ${error.message}`);
        return { series: seriesId, error: error.message };
    }
}

async function runTests() {
    if (!FRED_API_KEY) {
        console.log('❌ FRED_API_KEY environment variable not set');
        console.log('To test manually, replace FRED_API_KEY with your actual key in the URLs below:');
        
        PROBLEMATIC_SERIES.forEach(series => {
            const currentDate = new Date().toISOString().split("T")[0];
            const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${series}&api_key=YOUR_API_KEY&file_type=json&realtime_end=${currentDate}&limit=5&sort_order=desc`;
            console.log(`${series}: ${url}`);
        });
        return;
    }
    
    console.log('🧪 Testing FRED API calls...');
    console.log(`Using realtime_end: ${new Date().toISOString().split("T")[0]}`);
    
    console.log('\n📊 Testing Problematic Series:');
    for (const series of PROBLEMATIC_SERIES) {
        await testFREDSeries(series);
    }
    
    console.log('\n✅ Testing Working Series:');
    for (const series of WORKING_SERIES) {
        await testFREDSeries(series);
    }
    
    console.log('\n🔧 Potential Fixes:');
    console.log('1. Remove realtime_end parameter (some series may not support it)');
    console.log('2. Try different date ranges');
    console.log('3. Check if series IDs have changed');
    console.log('4. Verify FRED API key permissions');
}

// Browser-friendly version
if (typeof window !== 'undefined') {
    window.testFREDAPI = runTests;
    console.log('Run window.testFREDAPI() to start testing');
} else {
    runTests();
}

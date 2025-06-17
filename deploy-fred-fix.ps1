#!/usr/bin/env powershell
# FRED Rates Fix Deployment and Testing Script

Write-Host "🚀 Starting FRED Rates Fix Deployment" -ForegroundColor Green

# Step 1: Deploy the updated Edge Function
Write-Host "`n📡 Deploying updated Edge Function..." -ForegroundColor Yellow
try {
    Set-Location "c:\Users\andre\Code\SpecialtyOneFinal"
    supabase functions deploy fred-proxy
    Write-Host "✅ Edge Function deployed successfully" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to deploy Edge Function: $_" -ForegroundColor Red
    exit 1
}

# Step 2: Start the development server
Write-Host "`n🔧 Starting development server..." -ForegroundColor Yellow
Start-Process -FilePath "npm" -ArgumentList "run", "dev" -NoNewWindow -PassThru

# Wait a bit for the server to start
Start-Sleep -Seconds 5

Write-Host "`n📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Open your browser and navigate to http://localhost:5173" -ForegroundColor White
Write-Host "2. Open Browser DevTools (F12) and go to the Console tab" -ForegroundColor White
Write-Host "3. Run this command to clear the cache:" -ForegroundColor White
Write-Host "   localStorage.removeItem('specialty_one_market_rates'); localStorage.removeItem('specialty_one_market_rates_v2');" -ForegroundColor Yellow
Write-Host "4. Refresh the page to fetch fresh data" -ForegroundColor White
Write-Host "5. Check the TickerBox component for updated rates" -ForegroundColor White

Write-Host "`n🔍 What to Look For:" -ForegroundColor Cyan
Write-Host "• Treasury rates (10Y, 5Y, 3Y) should show actual percentages, not 'N/A'" -ForegroundColor White
Write-Host "• Prime Rate should be around 7.5%-8.5%" -ForegroundColor White
Write-Host "• SOFR should be around 4.28%" -ForegroundColor White
Write-Host "• Console logs should show '[useFREDRates] Processed...' messages" -ForegroundColor White

Write-Host "`n📊 Monitoring:" -ForegroundColor Cyan
Write-Host "• Check Supabase Dashboard > Edge Functions > fred-proxy for logs" -ForegroundColor White
Write-Host "• Look for '[fred-proxy] Fetching FRED API' and '[fred-proxy] Response' logs" -ForegroundColor White

Write-Host "`n✨ Deployment complete! Monitor the console and TickerBox for improvements." -ForegroundColor Green

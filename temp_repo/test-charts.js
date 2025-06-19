// Simple test file to verify chart integration works
// This creates mock chart data in localStorage for testing

const mockChartData = [
  {
    id: '1',
    chart_id: 'market-cap-rates-2024',
    title: 'Average Cap Rates by Property Type - 2024',
    type: 'bar',
    data: {
      labels: ['Manufactured Housing', 'RV Parks', 'Self Storage', 'Multifamily', 'Industrial'],
      datasets: [{
        label: 'Average Cap Rate (%)',
        data: [6.8, 7.2, 5.9, 5.5, 6.1],
        backgroundColor: ['#8B5A3C', '#2D3A59', '#6B8E5A', '#8B5A3C99', '#2D3A5999'],
        borderColor: ['#8B5A3C', '#2D3A59', '#6B8E5A', '#8B5A3C', '#2D3A59'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  },
  {
    id: '2',
    chart_id: 'transaction-volume-trend',
    title: 'Transaction Volume Trend - Last 12 Months',
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: 'Transaction Volume ($M)',
        data: [120, 135, 158, 142, 167, 189, 201, 185, 198, 224, 212, 195],
        borderColor: '#8B5A3C',
        backgroundColor: '#8B5A3C20',
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  }
];

// Store mock data in localStorage for testing
localStorage.setItem('mockChartData', JSON.stringify(mockChartData));

console.log('Mock chart data stored in localStorage for testing');
console.log('Charts available:', mockChartData.map(c => c.chart_id));

// Test content with chart placeholders
const testContent = `# Market Analysis Report Q4 2024

The manufactured housing community market continues to show strong fundamentals across key metrics.

## Cap Rate Analysis

[chart:market-cap-rates-2024]{Alternative text: Bar chart showing cap rates}

## Transaction Volume

[chart:transaction-volume-trend]{Alternative text: Line chart showing volumes}

## Summary

The data shows strong market performance across all sectors.`;

console.log('Test content with chart placeholders:');
console.log(testContent);

// Test script to add sample chart data and content with chart placeholders
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://your-project-id.supabase.co'; // Replace with your Supabase URL
const SUPABASE_ANON_KEY = 'your-anon-key'; // Replace with your anon key

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function addSampleChartData() {
  try {
    // First, let's check if chart_configs table exists
    const { data: tables, error: tablesError } = await supabase
      .from('chart_configs')
      .select('*')
      .limit(1);

    if (tablesError) {
      console.log('Chart configs table does not exist yet. Creating sample charts manually...');
      // Table doesn't exist, we'll need to create it manually
      return;
    }

    // Add sample chart configurations
    const sampleCharts = [
      {
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
              beginAtZero: true,
              ticks: {
                callback: 'function(value) { return value + "%"; }'
              }
            }
          }
        }
      },
      {
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
              beginAtZero: true,
              ticks: {
                callback: 'function(value) { return "$" + value + "M"; }'
              }
            }
          }
        }
      }
    ];

    for (const chart of sampleCharts) {
      const { data, error } = await supabase
        .from('chart_configs')
        .upsert(chart, { onConflict: 'chart_id' });

      if (error) {
        console.error('Error inserting chart:', chart.chart_id, error);
      } else {
        console.log('Successfully added chart:', chart.chart_id);
      }
    }

    // Add sample content with chart placeholders
    const sampleContent = `
# Market Analysis Report Q4 2024

The manufactured housing community market continues to show strong fundamentals across key metrics. Our analysis reveals several important trends that investors should consider.

## Cap Rate Analysis

The following chart shows how different property types are performing in terms of cap rates:

[chart:market-cap-rates-2024]{Alternative text: Bar chart showing cap rates by property type}

As we can see from the data, manufactured housing communities continue to offer attractive returns compared to traditional multifamily investments, with an average cap rate of 6.8%.

## Transaction Volume Trends

Market activity has remained robust throughout the year, as illustrated below:

[chart:transaction-volume-trend]{Alternative text: Line chart showing transaction volumes over 12 months}

The transaction volume data indicates healthy market liquidity, with total volumes exceeding $2.1 billion in transactions across all property types.

## Key Takeaways

1. **Manufactured Housing**: Continues to outperform traditional asset classes
2. **RV Parks**: Showing strong seasonal performance
3. **Self Storage**: Maintaining stable returns despite increased supply

For detailed analysis and investment opportunities, download our complete market report.
`;

    // Update a sample insight with chart content
    const { data: insights, error: insightsError } = await supabase
      .from('insights')
      .select('*')
      .limit(1);

    if (insights && insights.length > 0) {
      const { error: updateError } = await supabase
        .from('insights')
        .update({
          content: sampleContent,
          pdf_url: 'https://res.cloudinary.com/your-cloud/raw/upload/v1/reports/sample-market-report.pdf'
        })
        .eq('id', insights[0].id);

      if (updateError) {
        console.error('Error updating insight with chart content:', updateError);
      } else {
        console.log('Successfully updated insight with chart content');
      }
    }

    console.log('Sample data setup complete!');
  } catch (error) {
    console.error('Error setting up sample data:', error);
  }
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  addSampleChartData();
}

export { addSampleChartData };

// Test component to verify chart integration
import React from 'react';
import { SimpleChartProcessor } from '../lib/simpleChartProcessor';
import { useCharts } from '../hooks/useCharts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import PDFDownload from '../components/PDFDownload';

const testContent = `# Market Analysis Test

This is a test of our chart integration system.

## Cap Rate Analysis

The following chart shows cap rates by property type:

[chart:market-cap-rates-2024]{Alternative text: Bar chart showing cap rates by property type}

As we can see from the data, manufactured housing communities offer competitive returns.

## Transaction Volume

Market activity throughout the year:

[chart:transaction-volume-trend]{Alternative text: Line chart showing transaction volumes}

The data shows healthy market activity across all quarters.

## Summary

This demonstrates our chart integration working properly with markdown content.`;

const ChartTest: React.FC = () => {
  const { charts, loading: chartsLoading } = useCharts();
  
  if (chartsLoading) {
    return <div className="p-8">Loading charts...</div>;
  }

  const chartProcessor = new SimpleChartProcessor(charts);
  const result = chartProcessor.processContent(testContent);

  return (
    <div className="min-h-screen bg-sand p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Chart Integration Test</h1>
        
        <div className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Available Charts:</h2>
          <ul className="list-disc pl-6">
            {charts.map(chart => (
              <li key={chart.id}>{chart.chart_id} - {chart.title}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Test Content:</h2>
          
          {result.hasCharts ? (
            <div className="markdown-content">
              {(() => {
                const segments = chartProcessor.splitContentWithCharts(result.content, result.chartComponents);
                
                return segments.map((segment: any) => {
                  if (segment.type === 'chart') {
                    return <div key={segment.key}>{segment.component}</div>;
                  } else {
                    return (
                      <ReactMarkdown 
                        key={segment.key}
                        remarkPlugins={[remarkGfm]}
                      >
                        {segment.content}
                      </ReactMarkdown>
                    );
                  }
                });
              })()}
            </div>
          ) : (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {testContent}
            </ReactMarkdown>
          )}
        </div>

        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">PDF Download Test:</h2>
          <PDFDownload
            pdfUrl="https://res.cloudinary.com/demo/raw/upload/sample.pdf"
            title="Sample Market Report"
            description="Test PDF download functionality"
          />
        </div>
      </div>
    </div>
  );
};

export default ChartTest;

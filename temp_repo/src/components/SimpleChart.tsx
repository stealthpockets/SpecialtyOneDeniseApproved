import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ChartConfig {
  id: string;
  chart_id: string;
  title: string;
  type: 'line' | 'bar' | 'pie' | 'doughnut' | 'area';
  data: any;
  options: any;
}

interface SimpleChartProps {
  chartId: string;
  chartConfig?: ChartConfig;
  fallbackContent?: string;
  className?: string;
}

const SimpleChart: React.FC<SimpleChartProps> = ({ 
  chartId, 
  chartConfig, 
  fallbackContent,
  className = ""
}) => {
  const chartRef = useRef<any>(null);

  // Handle chart type mapping
  const getChartType = (type: string) => {
    switch (type) {
      case 'area':
        return 'line';
      default:
        return type;
    }
  };

  // Process options to handle function strings
  const processOptions = (options: any) => {
    const processedOptions = JSON.parse(JSON.stringify(options));
    
    // Handle tooltip callbacks
    if (processedOptions.plugins?.tooltip?.callbacks) {
      const callbacks = processedOptions.plugins.tooltip.callbacks;
      Object.keys(callbacks).forEach(key => {
        if (typeof callbacks[key] === 'string' && callbacks[key].startsWith('function')) {
          try {
            // Convert function strings to actual functions
            callbacks[key] = new Function('return ' + callbacks[key])();
          } catch (e) {
            console.warn(`Failed to parse callback function for ${key}:`, e);
            delete callbacks[key];
          }
        }
      });
    }

    // Handle scale tick callbacks
    if (processedOptions.scales) {
      Object.keys(processedOptions.scales).forEach(scaleKey => {
        const scale = processedOptions.scales[scaleKey];
        if (scale.ticks?.callback && typeof scale.ticks.callback === 'string') {
          try {
            scale.ticks.callback = new Function('return ' + scale.ticks.callback)();
          } catch (e) {
            console.warn(`Failed to parse tick callback for ${scaleKey}:`, e);
            delete scale.ticks.callback;
          }
        }
      });
    }

    return processedOptions;
  };

  if (!chartConfig) {
    return (
      <div className={`bg-gray-50 border border-gray-200 rounded-lg p-6 my-6 ${className}`}>
        <div className="text-center text-gray-600">
          <div className="text-sm font-medium mb-2">Chart Placeholder</div>
          <div className="text-xs text-gray-500">Chart ID: {chartId}</div>
          {fallbackContent && (
            <div className="mt-3 text-sm text-gray-700">{fallbackContent}</div>
          )}
        </div>
      </div>
    );
  }

  const chartType = getChartType(chartConfig.type);
  const chartData = chartConfig.data;
  const chartOptions = processOptions(chartConfig.options);

  // Ensure responsive default options
  const finalOptions = {
    responsive: true,
    maintainAspectRatio: false,
    ...chartOptions
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 md:p-6 my-6 ${className}`}>
      {/* Chart Title */}
      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 text-center">
        {chartConfig.title}
      </h3>
      
      {/* Chart Container */}
      <div className="relative h-64 md:h-80 lg:h-96">
        <Chart
          ref={chartRef}
          type={chartType as any}
          data={chartData}
          options={finalOptions}
        />
      </div>
      
      {/* Chart Source/Attribution */}
      <div className="mt-3 text-xs text-gray-500 text-center">
        Source: Specialty One Market Analysis
      </div>
    </div>
  );
};

export default SimpleChart;

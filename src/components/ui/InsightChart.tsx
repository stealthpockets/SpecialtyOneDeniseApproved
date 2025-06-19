import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    borderWidth?: number;
    fill?: boolean;
  }[];
}

interface InsightChartProps {
  type: 'line' | 'bar' | 'doughnut';
  data: ChartData;
  title?: string;
  height?: number;
  className?: string;
}

export const InsightChart: React.FC<InsightChartProps> = ({
  type,
  data,
  title,
  height = 300,
  className = ''
}) => {
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            family: "'Inter', sans-serif",
            size: 12,
          },
          color: '#374151', // gray-700
          padding: 20,
        },
      },      title: {
        display: !!title,
        text: title,
        font: {
          family: "'Inter', sans-serif",
          size: 16,
          weight: 'bold' as const,
        },
        color: '#111827', // gray-900
        padding: 20,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#111827',
        bodyColor: '#374151',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        boxPadding: 6,
      },
    },
  };

  const lineOptions = {
    ...commonOptions,
    scales: {
      x: {
        grid: {
          color: '#F3F4F6',
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: '#F3F4F6',
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 11,
          },
        },
      },
    },
  };

  const barOptions = {
    ...commonOptions,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: '#F3F4F6',
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 11,
          },
        },
      },
    },
  };

  const doughnutOptions = {
    ...commonOptions,
    cutout: '60%',
  };

  const renderChart = () => {
    switch (type) {
      case 'line':
        return <Line data={data} options={lineOptions} />;
      case 'bar':
        return <Bar data={data} options={barOptions} />;
      case 'doughnut':
        return <Doughnut data={data} options={doughnutOptions} />;
      default:
        return null;
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 ${className}`}>
      <div style={{ height: `${height}px` }}>
        {renderChart()}
      </div>
    </div>
  );
};

// Predefined chart themes for consistency
export const chartThemes = {
  primary: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)', // plum with opacity
    borderColor: '#8B5CF6', // plum
    borderWidth: 2,
  },
  secondary: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)', // emerald with opacity
    borderColor: '#10B981', // emerald
    borderWidth: 2,
  },
  accent: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)', // amber with opacity
    borderColor: '#F59E0B', // amber
    borderWidth: 2,
  },
  multiColor: [
    'rgba(139, 92, 246, 0.8)', // plum
    'rgba(16, 185, 129, 0.8)', // emerald
    'rgba(245, 158, 11, 0.8)', // amber
    'rgba(239, 68, 68, 0.8)',  // red
    'rgba(59, 130, 246, 0.8)', // blue
    'rgba(168, 85, 247, 0.8)', // purple
  ],
};

// Sample data generators for testing
export const sampleChartData = {
  marketTrends: {
    labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024'],
    datasets: [
      {
        label: 'Cap Rates (%)',
        data: [4.2, 4.5, 4.8, 5.1, 5.3],
        ...chartThemes.primary,
        fill: false,
      },
      {
        label: 'Occupancy (%)',
        data: [92, 90, 88, 85, 87],
        ...chartThemes.secondary,
        fill: false,
      },
    ],
  },
  propertyDistribution: {
    labels: ['Manufactured Housing', 'RV Parks', 'Self-Storage'],
    datasets: [
      {
        label: 'Transaction Volume ($M)',
        data: [304, 250, 721],
        backgroundColor: chartThemes.multiColor.slice(0, 3),
        borderWidth: 0,
      },
    ],
  },
};

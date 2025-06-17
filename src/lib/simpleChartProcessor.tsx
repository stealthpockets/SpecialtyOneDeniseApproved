import React, { ReactNode } from 'react';
import SimpleChart from '../components/SimpleChart';

interface ChartConfig {
  id: string;
  chart_id: string;
  title: string;
  type: 'line' | 'bar' | 'pie' | 'doughnut' | 'area';
  data: any;
  options: any;
}

interface ProcessorResult {
  hasCharts: boolean;
  content: string;
  chartComponents: ReactNode[];
}

/**
 * Processes markdown content to identify chart placeholders and replace them with chart components
 * Preserves all non-chart content for ReactMarkdown rendering
 */
export class SimpleChartProcessor {
  private chartConfigs: Map<string, ChartConfig> = new Map();

  constructor(chartConfigs: ChartConfig[] = []) {
    chartConfigs.forEach(config => {
      this.chartConfigs.set(config.chart_id, config);
    });
  }

  /**
   * Process markdown content and return both cleaned content and chart components
   */
  processContent(markdownContent: string): ProcessorResult {
    const chartPlaceholderRegex = /\[chart:([a-zA-Z0-9-_]+)\](?:\{([^}]*)\})?/g;
    const charts: ReactNode[] = [];
    let hasCharts = false;
    let processedContent = markdownContent;

    // Find all chart placeholders
    let match;
    while ((match = chartPlaceholderRegex.exec(markdownContent)) !== null) {
      hasCharts = true;
      const chartId = match[1];
      const fallbackContent = match[2] || undefined;
      
      const chartConfig = this.chartConfigs.get(chartId);
      
      // Create chart component
      const chartComponent = React.createElement(SimpleChart, {
        key: `chart-${chartId}-${charts.length}`,
        chartId,
        chartConfig,
        fallbackContent,
        className: "chart-component"
      });
      
      charts.push(chartComponent);
      
      // Replace placeholder with a unique marker that we can identify later
      const marker = `__CHART_MARKER_${charts.length - 1}__`;
      processedContent = processedContent.replace(match[0], marker);
    }

    return {
      hasCharts,
      content: processedContent,
      chartComponents: charts
    };
  }

  /**
   * Split content into segments around chart markers for React rendering
   */
  splitContentWithCharts(processedContent: string, chartComponents: ReactNode[]): ReactNode[] {
    const markerRegex = /__CHART_MARKER_(\d+)__/g;
    const segments: ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = markerRegex.exec(processedContent)) !== null) {
      const chartIndex = parseInt(match[1], 10);
      
      // Add text content before the chart
      if (match.index > lastIndex) {
        const textContent = processedContent.substring(lastIndex, match.index);
        if (textContent.trim()) {
          segments.push({
            type: 'markdown',
            content: textContent,
            key: `text-${segments.length}`
          });
        }
      }
      
      // Add the chart component
      if (chartComponents[chartIndex]) {
        segments.push({
          type: 'chart',
          component: chartComponents[chartIndex],
          key: `chart-${chartIndex}`
        });
      }
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text content
    if (lastIndex < processedContent.length) {
      const textContent = processedContent.substring(lastIndex);
      if (textContent.trim()) {
        segments.push({
          type: 'markdown',
          content: textContent,
          key: `text-${segments.length}`
        });
      }
    }

    return segments;
  }

  /**
   * Extract chart placeholders from content for preview/editing purposes
   */
  extractChartPlaceholders(markdownContent: string): Array<{chartId: string, fallbackContent?: string}> {
    const chartPlaceholderRegex = /\[chart:([a-zA-Z0-9-_]+)\](?:\{([^}]*)\})?/g;
    const placeholders: Array<{chartId: string, fallbackContent?: string}> = [];
    
    let match;
    while ((match = chartPlaceholderRegex.exec(markdownContent)) !== null) {
      placeholders.push({
        chartId: match[1],
        fallbackContent: match[2] || undefined
      });
    }
    
    return placeholders;
  }

  /**
   * Add a chart configuration to the processor
   */
  addChartConfig(config: ChartConfig): void {
    this.chartConfigs.set(config.chart_id, config);
  }

  /**
   * Get all available chart IDs
   */
  getAvailableChartIds(): string[] {
    return Array.from(this.chartConfigs.keys());
  }
}

// Export a default instance for convenience
export const defaultChartProcessor = new SimpleChartProcessor();

// Export types for external use
export type { ChartConfig, ProcessorResult };

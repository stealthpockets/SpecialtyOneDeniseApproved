/**
 * Performance Monitoring Utilities
 * Tracks Web Vitals and performance metrics
 */

// Web Vitals interface (since we can't import the library yet)
interface WebVital {
  name: string;
  value: number;
  id: string;
  rating: 'good' | 'needs-improvement' | 'poor';
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private vitals: WebVital[] = [];
  private loggedImages = new Set<string>(); // Track which images we've logged to reduce noise
  
  private constructor() {}
  
  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }
  
  /**
   * Track Web Vitals manually until we install the library
   */
  trackVital(vital: WebVital) {
    this.vitals.push(vital);
    
    // Only log performance issues and important metrics in development
    if (import.meta.env.DEV) {
      // Only log if it's a poor performance or first time for this image
      if (vital.rating === 'poor' || !vital.name.includes('image_load') || !this.loggedImages.has(vital.name)) {
        console.log(`[Performance] ${vital.name}: ${vital.value}ms (${vital.rating})`);
        if (vital.name.includes('image_load')) {
          this.loggedImages.add(vital.name);
        }
      }
    }
    
    // In production, you could send to analytics
    if (import.meta.env.PROD) {
      this.sendToAnalytics(vital);
    }
  }
  
  /**
   * Track custom performance metrics
   */
  trackCustomMetric(name: string, value: number) {
    const metric = {
      name,
      value,
      id: this.generateId(),
      rating: this.getRating(name, value) as 'good' | 'needs-improvement' | 'poor'
    };

    this.trackVital(metric);
  }
  
  /**
   * Measure component render time
   */
  measureComponentRender<T>(
    componentName: string,
    renderFunction: () => T
  ): T {
    const startTime = performance.now();
    const result = renderFunction();
    const endTime = performance.now();
    
    this.trackCustomMetric(`${componentName}_render`, endTime - startTime);
    return result;
  }
  
  /**
   * Track page load performance
   */
  trackPageLoad(pageName: string) {
    // Use Navigation Timing API
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        // Track specific metrics
        this.trackCustomMetric(`${pageName}_dns_lookup`, navigation.domainLookupEnd - navigation.domainLookupStart);
        this.trackCustomMetric(`${pageName}_connect_time`, navigation.connectEnd - navigation.connectStart);
        this.trackCustomMetric(`${pageName}_ttfb`, navigation.responseStart - navigation.requestStart);
        this.trackCustomMetric(`${pageName}_dom_load`, navigation.domContentLoadedEventEnd - navigation.startTime);
        this.trackCustomMetric(`${pageName}_full_load`, navigation.loadEventEnd - navigation.startTime);
      }
    }
  }
  
  /**
   * Track image loading performance
   */
  trackImageLoad(imageSrc: string, loadTime: number) {
    this.trackCustomMetric(`image_load_${this.getImageName(imageSrc)}`, loadTime);
  }
  
  /**
   * Track API call performance
   */
  async trackApiCall<T>(
    apiName: string,
    apiCall: () => Promise<T>
  ): Promise<T> {
    const startTime = performance.now();
    try {
      const result = await apiCall();
      const endTime = performance.now();
      this.trackCustomMetric(`api_${apiName}`, endTime - startTime);
      return result;
    } catch (error) {
      const endTime = performance.now();
      this.trackCustomMetric(`api_${apiName}_error`, endTime - startTime);
      throw error;
    }
  }
  
  /**
   * Get performance summary
   */
  getPerformanceSummary() {
    return {
      vitals: this.vitals,
      summary: {
        total_metrics: this.vitals.length,
        good_metrics: this.vitals.filter(v => v.rating === 'good').length,
        needs_improvement: this.vitals.filter(v => v.rating === 'needs-improvement').length,
        poor_metrics: this.vitals.filter(v => v.rating === 'poor').length
      }
    };
  }
  
  private sendToAnalytics(vital: WebVital) {
    // Placeholder for analytics integration
    // Could integrate with Google Analytics, DataDog, etc.
    console.log('Sending to analytics:', vital);
  }
  
  private getRating(name: string, value: number): string {
    // Simple rating system - could be more sophisticated
    const thresholds: Record<string, { good: number; needsImprovement: number }> = {
      'image_load': { good: 1000, needsImprovement: 3000 },
      'api': { good: 1000, needsImprovement: 3000 },
      'render': { good: 16, needsImprovement: 50 }, // 60fps = 16ms frame budget
      'page_load': { good: 2000, needsImprovement: 4000 }
    };
    
    const threshold = Object.keys(thresholds).find(key => name.includes(key)) || 'default';
    const config = thresholds[threshold] || { good: 1000, needsImprovement: 3000 };
    
    if (value <= config.good) return 'good';
    if (value <= config.needsImprovement) return 'needs-improvement';
    return 'poor';
  }
  
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
  
  private getImageName(src: string): string {
    return src.split('/').pop()?.split('.')[0] || 'unknown';
  }
}

// Export singleton instance
export const performanceMonitor = PerformanceMonitor.getInstance();

// React hook for component performance tracking
export const usePerformanceTracking = (componentName: string) => {
  const trackRender = <T>(renderFunction: () => T): T => {
    return performanceMonitor.measureComponentRender(componentName, renderFunction);
  };
  
  const trackApiCall = async <T>(apiName: string, apiCall: () => Promise<T>): Promise<T> => {
    return performanceMonitor.trackApiCall(apiName, apiCall);
  };
  
  return { trackRender, trackApiCall };
};

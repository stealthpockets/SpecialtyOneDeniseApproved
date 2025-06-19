import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Error boundary specifically for image loading errors
 * Prevents the entire app from crashing when images fail to load
 */
export class ImageErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error for debugging in development
    if (import.meta.env.DEV) {
      console.error('Image Error Boundary caught an error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Return fallback UI or a simple placeholder
      return this.props.fallback || (
        <div className="flex items-center justify-center w-full h-48 bg-gray-100 rounded">
          <div className="text-center">
            <svg 
              className="mx-auto h-12 w-12 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            <p className="mt-2 text-sm text-gray-500">Image unavailable</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Higher-order component to wrap any component with image error boundary
 */
export const withImageErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) => {
  return (props: P) => (
    <ImageErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ImageErrorBoundary>
  );
};

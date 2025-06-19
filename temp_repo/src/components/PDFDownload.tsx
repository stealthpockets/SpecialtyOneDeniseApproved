import React from 'react';
import { Download, FileText, ExternalLink } from 'lucide-react';

interface PDFDownloadProps {
  pdfUrl: string;
  title?: string;
  description?: string;
  fileSize?: string;
  className?: string;
  variant?: 'button' | 'card' | 'inline';
}

const PDFDownload: React.FC<PDFDownloadProps> = ({
  pdfUrl,
  title = "Download PDF Report",
  description,
  fileSize,
  className = "",
  variant = 'card'
}) => {
  const handleDownload = () => {
    // Track download event (could be enhanced with analytics)
    console.log('PDF download initiated:', pdfUrl);
    
    // Open PDF in new tab (browser will handle download)
    window.open(pdfUrl, '_blank');
  };

  if (variant === 'button') {
    return (
      <button
        onClick={handleDownload}
        className={`inline-flex items-center gap-2 bg-plum hover:bg-plum/90 text-white px-4 py-2 rounded-lg font-medium transition-colors ${className}`}
      >
        <Download size={18} />
        {title}
      </button>
    );
  }

  if (variant === 'inline') {
    return (
      <a
        href={pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 text-plum hover:text-plum/80 font-medium transition-colors ${className}`}
      >
        <FileText size={16} />
        {title}
        <ExternalLink size={14} />
      </a>
    );
  }

  // Default card variant
  return (
    <div className={`bg-gradient-to-br from-plum/5 to-sage/5 border border-plum/20 rounded-lg p-4 md:p-6 my-6 ${className}`}>
      <div className="flex items-start gap-4">
        {/* PDF Icon */}
        <div className="flex-shrink-0 w-12 h-12 bg-plum/10 rounded-lg flex items-center justify-center">
          <FileText size={24} className="text-plum" />
        </div>
        
        {/* Content */}
        <div className="flex-grow">
          <h3 className="font-semibold text-gray-900 mb-1">
            {title}
          </h3>
          
          {description && (
            <p className="text-sm text-gray-600 mb-3">
              {description}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <FileText size={12} />
                PDF Format
              </span>
              {fileSize && (
                <span>
                  {fileSize}
                </span>
              )}
            </div>
            
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 bg-plum hover:bg-plum/90 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
            >
              <Download size={16} />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFDownload;

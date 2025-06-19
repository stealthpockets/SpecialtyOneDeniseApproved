import React from 'react';
import { Download } from 'lucide-react';

interface PDFDownloadProps {
  pdfUrl: string;
  title?: string;
  className?: string;
}

export const PDFDownload: React.FC<PDFDownloadProps> = ({ 
  pdfUrl, 
  title = "Download PDF",
  className = ""
}) => {
  const handleDownload = () => {
    // Open PDF in new tab for download
    window.open(pdfUrl, '_blank');
  };

  return (
    <div className={`border border-gray-200 rounded-lg p-6 bg-white ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Download Full Report
          </h3>
          <p className="text-gray-600 text-sm">
            Get the complete analysis as a PDF document
          </p>
        </div>
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-plum to-amethyst text-white font-medium rounded-lg hover:from-amethyst hover:to-plum transition-all duration-200 transform hover:scale-105"
          aria-label={title}
        >
          <Download size={20} />
          Download PDF
        </button>
      </div>
    </div>
  );
};

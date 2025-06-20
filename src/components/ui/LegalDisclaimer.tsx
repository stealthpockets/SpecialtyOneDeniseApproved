import React from 'react';

/**
 * LegalDisclaimer - A reusable, aesthetic disclaimer component for Specialty One.
 *
 * Usage:
 * - Place at the bottom of article, case study, 1031, or other informational pages.
 * - For the footer, use <LegalDisclaimer compact /> for a minimal, site-wide version.
 *
 * Props:
 * - className: Additional classes for custom styling.
 * - compact: If true, renders a minimal, single-line version (for footer use).
 */
export const LegalDisclaimer: React.FC<{ className?: string; compact?: boolean }> = ({ className = '', compact = false }) => {
  if (compact) {
    return (
      <div
        className={`w-full text-xs text-gray-400 text-center py-2 px-2 bg-transparent ${className}`}
        role="note"
        aria-label="Legal Disclaimer"
      >
        Disclaimer: Not legal, tax, or investment advice. Consult a qualified professional. Specialty One disclaims liability for actions taken based on this content.
      </div>
    );
  }

  return (
    <div
      className={`mt-12 mb-12 pb-8 pt-6 px-6 border border-gray-200 rounded-lg shadow-sm bg-white/80 text-sm text-gray-700 max-w-3xl mx-auto ${className}`}
      role="note"
      aria-label="Legal Disclaimer"
    >
      <p className="font-semibold text-gray-800 mb-1 text-center">Disclaimer</p>
      <p className="leading-relaxed">
        Tax law, accounting, and commercial real estate regulations are highly complex and subject to change. Specialty One provides this information to help investors and property owners better understand these topics, but it is not a substitute for professional advice. Our goal is to make complex subjects accessible and actionable, but every situation is unique—please consult a qualified CPA, attorney, or advisor before making investment or tax decisions. Specialty One disclaims any liability for actions taken based on this content.
      </p>
    </div>
  );
};

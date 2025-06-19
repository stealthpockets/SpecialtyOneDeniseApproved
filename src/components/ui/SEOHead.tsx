import { Helmet } from '@dr.pogodin/react-helmet';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  articleMeta?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
}

export const SEOHead = ({
  title = "Specialty One Investment Brokerage | Commercial Real Estate Experts",
  description = "Specialized commercial real estate brokerage for manufactured housing, RV parks, and self-storage properties. $1B+ in transactions. Expert advisory services.",
  keywords = "commercial real estate, manufactured housing, RV parks, self storage, investment brokerage, 1031 exchange, CRE advisory",
  image = "/assets/property-types/manufactured-housing-community-investment.webp",
  url,
  type = 'website',
  articleMeta
}: SEOHeadProps) => {
  const siteTitle = "Specialty One Investment Brokerage";
    // Ultra-safe string conversion helper that handles all edge cases
  const safeString = (value: any): string => {
    if (value === null || value === undefined) return "";
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return String(value);
    if (typeof value === 'boolean') return String(value);
    if (typeof value === 'symbol') return "";
    if (Array.isArray(value)) {
      return value.map(item => safeString(item)).filter(Boolean).join(', ');
    }
    if (typeof value === 'object') {
      try {
        return JSON.stringify(value);
      } catch {
        return "";
      }
    }
    // For any other type, try String() but catch errors
    try {
      return String(value);
    } catch {
      return "";
    }
  };

  // Deep sanitize an object to remove all Symbol values
  const sanitizeObject = (obj: any): any => {
    if (obj === null || obj === undefined) return {};
    if (typeof obj !== 'object') return safeString(obj);
    if (Array.isArray(obj)) return obj.map(item => sanitizeObject(item));
    
    const sanitized: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (typeof value === 'symbol') continue; // Skip Symbol values entirely
        sanitized[key] = sanitizeObject(value);
      }
    }
    return sanitized;
  };
  
  // Ensure all values are safely converted to strings
  const cleanTitle = safeString(title).includes(siteTitle) ? safeString(title) : `${safeString(title)} | ${siteTitle}`;
  const cleanDescription = safeString(description);
  const cleanKeywords = safeString(keywords);
  const currentUrl = safeString(url) || (typeof window !== 'undefined' ? window.location.href : '');
  const imageUrl = safeString(image).startsWith('http') ? safeString(image) : `https://specialtyone.com${safeString(image)}`;

  // Safely handle articleMeta with deep sanitization
  const cleanArticleMeta = sanitizeObject(articleMeta) || {};

  // Safely handle structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Specialty One Investment Brokerage",
    "url": "https://specialtyone.com",
    "logo": "https://specialtyone.com/assets/logos/specialty-one-logo.png",
    "description": "Specialized commercial real estate brokerage for manufactured housing, RV parks, and self-storage properties.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Phoenix",
      "addressRegion": "AZ",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-602-697-8868",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://www.linkedin.com/company/specialty-one",
      "https://www.facebook.com/specialtyone",
      "https://www.instagram.com/specialtyone",
      "https://x.com/MHRVDrew",
      "https://www.youtube.com/@SpecialtyOneCRE"
    ]
  };
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{cleanTitle}</title>
      <meta name="description" content={cleanDescription} />
      <meta name="keywords" content={cleanKeywords} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={cleanTitle} />
      <meta property="og:description" content={cleanDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteTitle} />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={cleanTitle} />
      <meta name="twitter:description" content={cleanDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:site" content="@MHRVDrew" />
      <meta name="twitter:creator" content="@MHRVDrew" />        {/* Article-specific meta tags */}
      {type === 'article' && cleanArticleMeta && (
        <>
          {cleanArticleMeta.publishedTime && (
            <meta property="article:published_time" content={safeString(cleanArticleMeta.publishedTime)} />
          )}
          {cleanArticleMeta.modifiedTime && (
            <meta property="article:modified_time" content={safeString(cleanArticleMeta.modifiedTime)} />
          )}
          {cleanArticleMeta.author && (
            <meta property="article:author" content={safeString(cleanArticleMeta.author)} />
          )}
          {cleanArticleMeta.section && (
            <meta property="article:section" content={safeString(cleanArticleMeta.section)} />
          )}
          {cleanArticleMeta.tags && cleanArticleMeta.tags.map((tag: any, index: number) => (
            <meta key={index} property="article:tag" content={safeString(tag)} />
          ))}
        </>
      )}
      
      {/* Additional SEO Tags */}
      <meta name="author" content="Specialty One Investment Brokerage" />
      <meta name="language" content="en-US" />
      <meta name="geo.region" content="US-AZ" />
      <meta name="geo.placename" content="Phoenix, Arizona" />
      
      {/* Canonical URL */}
      {currentUrl && <link rel="canonical" href={currentUrl} />}
      
      {/* Structured Data - Organization */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

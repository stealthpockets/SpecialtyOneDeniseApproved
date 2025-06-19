-- Add pdf_url column to insights table for PDF download functionality
ALTER TABLE insights ADD COLUMN pdf_url TEXT;

-- Add comment to document the purpose
COMMENT ON COLUMN insights.pdf_url IS 'URL to downloadable PDF version of the insight article';

-- Create index for better performance if needed
CREATE INDEX IF NOT EXISTS idx_insights_pdf_url ON insights(pdf_url) WHERE pdf_url IS NOT NULL;

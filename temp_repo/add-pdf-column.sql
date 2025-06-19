-- Add pdf_url column to insights table
-- Run this SQL in your Supabase SQL Editor (Dashboard > SQL Editor)

ALTER TABLE insights ADD COLUMN IF NOT EXISTS pdf_url TEXT;

-- Optional: Add some sample PDF URLs for testing
-- UPDATE insights SET pdf_url = 'https://example.com/sample.pdf' WHERE slug = 'institutional-capital-manufactured-housing-2025';
-- UPDATE insights SET pdf_url = 'https://example.com/sample2.pdf' WHERE slug = 'mh-lot-rents-2025-update';

-- Verify the column was added
SELECT id, title, pdf_url FROM insights LIMIT 3;

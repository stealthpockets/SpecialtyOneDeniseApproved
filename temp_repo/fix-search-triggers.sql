-- Fix for Market Reports and Insights Search Vector Triggers
-- This script resolves the "record 'new' has no field 'person'" error

-- Step 1: Remove incorrect triggers from market_reports
DROP TRIGGER IF EXISTS trg_mr_tsv ON market_reports;
DROP TRIGGER IF EXISTS trg_mr_upd ON market_reports;
DROP TRIGGER IF EXISTS tsv_market_reports_trigger ON market_reports;

-- Step 2: Create correct search vector function for market_reports
CREATE OR REPLACE FUNCTION update_market_reports_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := to_tsvector('english',
    coalesce(NEW.title, '') || ' ' ||
    coalesce(NEW.summary, '') || ' ' ||
    coalesce(NEW.content, '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 3: Create correct trigger for market_reports
CREATE TRIGGER tsv_market_reports_trigger
BEFORE INSERT OR UPDATE ON market_reports
FOR EACH ROW
EXECUTE FUNCTION update_market_reports_search_vector();

-- Step 4: Fix insights table if it has the same issue
DROP TRIGGER IF EXISTS trg_insights_tsv ON insights;
DROP TRIGGER IF EXISTS tsv_insights_trigger ON insights;

-- Step 5: Create correct search vector function for insights
CREATE OR REPLACE FUNCTION update_insights_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := to_tsvector('english',
    coalesce(NEW.title, '') || ' ' ||
    coalesce(NEW.summary, '') || ' ' ||
    coalesce(NEW.content, '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 6: Create correct trigger for insights
CREATE TRIGGER tsv_insights_trigger
BEFORE INSERT OR UPDATE ON insights
FOR EACH ROW
EXECUTE FUNCTION update_insights_search_vector();

-- Note: We DO NOT drop tsv_content() because it's still used by testimonials table

-- Add search_vector column to testimonials if missing
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name='testimonials' AND column_name='search_vector'
  ) THEN
    ALTER TABLE testimonials ADD COLUMN search_vector tsvector;
  END IF;
END $$;

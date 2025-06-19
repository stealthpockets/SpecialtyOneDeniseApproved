-- Ensure status_type enum exists before altering testimonials
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'status_type') THEN
    CREATE TYPE status_type AS ENUM ('draft','scheduled','published','archived');
  END IF;
END $$;
-- Fix testimonials table schema for content backend migration
DO $$
BEGIN
  -- Add status column if missing
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name='testimonials' AND column_name='status'
  ) THEN
    ALTER TABLE testimonials ADD COLUMN status status_type NOT NULL DEFAULT 'draft';
  END IF;
  -- Add published_at column if missing
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name='testimonials' AND column_name='published_at'
  ) THEN
    ALTER TABLE testimonials ADD COLUMN published_at timestamptz;
  END IF;
  -- Add deleted_at column if missing
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name='testimonials' AND column_name='deleted_at'
  ) THEN
    ALTER TABLE testimonials ADD COLUMN deleted_at timestamptz;
  END IF;
END $$;

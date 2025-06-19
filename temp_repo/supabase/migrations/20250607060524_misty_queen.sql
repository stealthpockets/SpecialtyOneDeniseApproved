-- Case Studies table for Supabase
CREATE TABLE case_studies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  location TEXT NOT NULL,
  property_type TEXT NOT NULL CHECK (property_type IN ('Manufactured Housing', 'RV Park', 'Self-Storage', 'Multi-Asset')),
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('completed', 'in-progress', 'confidential')),
  
  -- Property Details
  site_count INTEGER,
  square_footage INTEGER,
  sale_price TEXT,
  cap_rate TEXT,
  time_to_sale TEXT,
  
  -- Content
  challenge TEXT NOT NULL,
  solution TEXT NOT NULL,
  results JSONB NOT NULL, -- Array of strings
  
  -- Rich Content
  hero_image TEXT NOT NULL,
  additional_images JSONB, -- Array of image URLs
  
  -- Detailed Story
  introduction TEXT,
  detailed_challenge TEXT,
  approach TEXT,
  outcome TEXT,
  
  -- Testimonial
  testimonial JSONB, -- Object with quote, author, title, company
  
  -- Agent/Team
  agent TEXT NOT NULL,
  agent_image TEXT,
  
  -- SEO & Meta
  meta_description TEXT,
  tags JSONB, -- Array of strings
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- Enable Row Level Security
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;

-- Policy for public read access to published case studies
CREATE POLICY "Public can read published case studies"
  ON case_studies
  FOR SELECT
  TO public
  USING (published_at IS NOT NULL);

-- Policy for authenticated users to manage case studies
CREATE POLICY "Authenticated users can manage case studies"
  ON case_studies
  FOR ALL
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX idx_case_studies_slug ON case_studies(slug);
CREATE INDEX idx_case_studies_property_type ON case_studies(property_type);
CREATE INDEX idx_case_studies_status ON case_studies(status);
CREATE INDEX idx_case_studies_published_at ON case_studies(published_at DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_case_studies_updated_at
  BEFORE UPDATE ON case_studies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO case_studies (
  slug,
  title,
  subtitle,
  location,
  property_type,
  site_count,
  time_to_sale,
  challenge,
  solution,
  results,
  hero_image,
  introduction,
  detailed_challenge,
  approach,
  outcome,
  testimonial,
  agent,
  meta_description,
  tags,
  published_at
) VALUES (
  'caravan-oasis',
  'Caravan Oasis',
  'Complex Utilities, Clean Close',
  'Yuma, AZ',
  'RV Park',
  550,
  '45 Days',
  'Mixed waste issues and high operating costs threatened the sale.',
  'Resolved ADEQ concerns and found a buyer who saw the potential.',
  '["$20,000+ annual cost savings", "Resolved complex waste management", "Clean close despite challenges"]',
  '/dist/assets/success-stories/caravan-oasis.webp',
  'Caravan Oasis, a 550-site RV park (with planned expansion to 750 sites) in Yuma, Arizona, was a hidden gem with untapped potential. Its prime location drew RV travelers seeking warm weather, but a tangle of operational issues threatened to derail its sale.',
  'Mixed wastewater systems—combining older septic tanks with a newer treatment plant—created regulatory headaches, including Arizona Department of Environmental Quality (ADEQ) scrutiny over a misplaced test well. Add to that excessive septic pumping costs of over $20,000 annually and a large-scale solar installation with questionable returns, and buyers were hesitant, fearing hidden risks.',
  'Russ Warner and Andrew Warner thrive on complex deals. They started by diving deep into the issues, working with environmental consultants and engineers to map out the wastewater systems and clarify ADEQ requirements. They discovered that the annual septic pumping was unnecessary, as it disrupted natural waste breakdown—a finding they validated with ADEQ contacts.',
  'Their strategy paid off. The sale closed successfully, with the buyer implementing changes that slashed annual operating costs by over $20,000. This boosted the property''s net operating income (NOI) and long-term value, proving Russ and Andrew''s ability to turn complex challenges into profitable outcomes.',
  '{"quote": "Russ and Andrew were instrumental in overcoming the hurdles we faced with Caravan Oasis. Their expertise and dedication led to a successful sale and significant cost savings. They found a buyer who not only saw the potential but enhanced the property''s value.", "author": "Anonymous Client"}',
  'Russ Warner and Andrew Warner',
  'How Specialty One solved complex ADEQ and septic issues to close Caravan Oasis RV Park at full price.',
  '["RV Park", "ADEQ", "Environmental", "Complex Deal"]',
  NOW()
);
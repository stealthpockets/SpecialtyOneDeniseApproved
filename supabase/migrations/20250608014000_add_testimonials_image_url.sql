-- Add image_url column to existing testimonials table
ALTER TABLE testimonials ADD COLUMN image_url TEXT;

-- Update existing testimonials with specific image URLs from hardcoded data
-- These match the current testimonials in the React component

-- The Weech Family / The Palms testimonial
UPDATE testimonials 
SET image_url = '/dist/assets/success-stories/the-palms.webp'
WHERE person LIKE '%Weech%' OR property_name LIKE '%Palms%';

-- George Bunting / Caravan Oasis testimonial  
UPDATE testimonials 
SET image_url = '/dist/assets/success-stories/caravan-oasis.webp'
WHERE person LIKE '%Bunting%' OR property_name LIKE '%Caravan%';

-- George Han / Three Pillar (Multiple Properties) testimonial
UPDATE testimonials 
SET image_url = '/dist/assets/property-types/manufactured-housing-community-investment.webp'
WHERE person LIKE '%George Han%' OR person LIKE '%Three Pillar%';

-- Pericles Wyatt / Desert Trails testimonial
UPDATE testimonials 
SET image_url = '/dist/assets/success-stories/desert-trails.webp'
WHERE person LIKE '%Wyatt%' OR property_name LIKE '%Desert Trails%';

-- Create new placement_type for homepage carousel
-- Update existing testimonials to use for carousel display
UPDATE testimonials 
SET placement_type = 'Homepage - Carousel'
WHERE placement_type IN ('Uncategorized', 'Homepage - General Company/Service Testimonial')
  AND is_strongest = true;

-- Set display order for carousel testimonials
UPDATE testimonials 
SET placement_type = 'Homepage - Carousel'
WHERE person IN ('Weech Family', 'George Bunting', 'George Han', 'Pericles Wyatt');

COMMENT ON COLUMN testimonials.image_url IS 'Specific image URL for testimonial. If NULL, fallback logic will be used based on property_type';

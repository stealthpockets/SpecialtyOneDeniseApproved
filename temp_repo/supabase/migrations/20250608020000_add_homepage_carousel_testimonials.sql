-- Add sample testimonials for Homepage carousel
INSERT INTO testimonials (
  person,
  property_name,
  property_type,
  testimonial_text,
  placement_type,
  is_strongest,
  can_be_displayed_if_other_from_same_person,
  is_active,
  image_url
) VALUES 
(
  'Former Owner',
  'American Self Storage & Mail',
  'Self-Storage',
  'Denise knew exactly how to position our facility to attract serious buyers. She didn''t just find a buyer—she found the right one. Her market knowledge and connections made all the difference in getting us top dollar.',
  'Homepage - Carousel',
  true,
  true,
  true,
  null
),
(
  'Investment Partners',
  'Desert Retreat RV Resort',
  'RV Parks',
  'When COVID hit, we thought our deal was dead. Andrew and his team pivoted quickly, found new financing options, and kept everything on track. Their expertise in RV parks was exactly what we needed.',
  'Homepage - Carousel',
  false,
  true,
  true,
  null
),
(
  'Family Trust',
  'Sunset Acres Mobile Home Community',
  'Manufactured Housing',
  'We had been trying to sell for two years with no success. Within 90 days of listing with Specialty One, we had multiple offers above asking price. Their understanding of the manufactured housing market is unmatched.',
  'Homepage - Carousel',
  false,
  true,
  true,
  null
),
(
  'Private Equity Group',
  'SecureStore Portfolio',
  'Self-Storage',
  'Managing a multi-facility exit strategy requires precision and expertise. Specialty One delivered both, coordinating the sale of 12 properties across 4 states simultaneously. Flawless execution.',
  'Homepage - Carousel',
  false,
  true,
  true,
  null
);

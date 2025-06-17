-- Add sample insights data for testing the filter functionality
-- First, ensure we have authors to reference

-- Insert a sample author if it doesn't exist
INSERT INTO authors (id, name, email) VALUES 
('550e8400-e29b-41d4-a716-446655440001', 'Andrew Smith', 'andrew@specialtyone.com')
ON CONFLICT (id) DO NOTHING;

-- Get property type IDs for reference
-- We know from the previous migration that we have: Manufactured Housing, RV Parks, Self-Storage, Multi-Asset

-- Insert sample insights with different property types
INSERT INTO insights (
  id,
  slug,
  locale,
  title,
  summary,
  content,
  property_type_id,
  author_id,
  status,
  published_at,
  created_at,
  updated_at,
  is_premium,
  views,
  reading_time,
  image_url
) VALUES 
-- Manufactured Housing insight
(
  '550e8400-e29b-41d4-a716-446655440010',
  'mh-lot-rent-optimization-2025',
  'en',
  'Manufactured Housing Lot Rent Optimization Strategies for 2025',
  'Discover proven strategies to maximize lot rent revenue while maintaining occupancy rates in today''s competitive manufactured housing market.',
  '# Manufactured Housing Lot Rent Optimization

This comprehensive guide covers the latest strategies for optimizing lot rents in manufactured housing communities...

## Key Strategies
- Market analysis techniques
- Gradual increase implementations
- Tenant retention programs

## Expected Results
Communities implementing these strategies typically see 8-12% revenue increases within 12 months.',
  (SELECT id FROM property_types WHERE name = 'Manufactured Housing' LIMIT 1),
  '550e8400-e29b-41d4-a716-446655440001',
  'published',
  '2025-06-10 10:00:00-07',
  '2025-06-10 10:00:00-07',
  '2025-06-10 10:00:00-07',
  false,
  245,
  8,
  '/assets/insights/mh-lot-rents-2025-update.webp'
),
-- RV Parks insight
(
  '550e8400-e29b-41d4-a716-446655440011',
  'rv-park-seasonal-revenue-maximization',
  'en',
  'RV Park Seasonal Revenue Maximization',
  'Learn how to optimize revenue streams across peak and off-season periods with dynamic pricing and amenity packages.',
  '# RV Park Seasonal Revenue Strategies

Master the art of seasonal revenue optimization in the RV park industry...

## Peak Season Strategies
- Dynamic pricing models
- Premium site allocations
- Enhanced amenity packages

## Off-Season Revenue
- Long-term guest programs
- Maintenance scheduling
- Alternative revenue streams',
  (SELECT id FROM property_types WHERE name = 'RV Parks' LIMIT 1),
  '550e8400-e29b-41d4-a716-446655440001',
  'published',
  '2025-06-08 14:30:00-07',
  '2025-06-08 14:30:00-07',
  '2025-06-08 14:30:00-07',
  true,
  156,
  12,
  '/assets/property-types/rv-park-investment.webp'
),
-- Self-Storage insight
(
  '550e8400-e29b-41d4-a716-446655440012',
  'self-storage-digital-marketing-roi',
  'en',
  'Self-Storage Digital Marketing ROI: What Actually Works',
  'Cut through the marketing noise with data-driven insights on which digital channels deliver the highest ROI for self-storage facilities.',
  '# Self-Storage Digital Marketing ROI

Analysis of 50+ self-storage facilities reveals which marketing channels actually drive profitability...

## Top Performing Channels
1. Google Ads (Local)
2. SEO-optimized websites
3. Social media retargeting

## ROI Metrics
- Average customer acquisition cost
- Lifetime value calculations
- Channel attribution models',
  (SELECT id FROM property_types WHERE name = 'Self-Storage' LIMIT 1),
  '550e8400-e29b-41d4-a716-446655440001',
  'published',
  '2025-06-05 09:15:00-07',
  '2025-06-05 09:15:00-07',
  '2025-06-05 09:15:00-07',
  false,
  89,
  6,
  '/assets/property-types/self-storage-facility-investment.webp'
),
-- Multi-Asset insight
(
  '550e8400-e29b-41d4-a716-446655440013',
  'multi-asset-portfolio-diversification',
  'en',
  'Multi-Asset Portfolio Diversification in Alternative Commercial Real Estate',
  'Strategic approaches to building a resilient portfolio across manufactured housing, RV parks, and self-storage assets.',
  '# Multi-Asset Portfolio Strategy

Building resilient portfolios across alternative commercial real estate asset classes...

## Diversification Benefits
- Market cycle protection
- Cash flow stability
- Risk mitigation strategies

## Implementation Framework
- Asset allocation models
- Geographic diversification
- Operational synergies',
  (SELECT id FROM property_types WHERE name = 'Multi-Asset' LIMIT 1),
  '550e8400-e29b-41d4-a716-446655440001',
  'published',
  '2025-06-12 11:45:00-07',
  '2025-06-12 11:45:00-07',
  '2025-06-12 11:45:00-07',
  true,
  312,
  15,
  '/assets/property-types/manufactured-housing-community-investment.webp'
),
-- Another Manufactured Housing insight
(
  '550e8400-e29b-41d4-a716-446655440014',
  'mh-due-diligence-checklist-2025',
  'en',
  'The Complete MH Community Due Diligence Checklist',
  'Essential due diligence steps for manufactured housing community acquisitions, including hidden risks and opportunity identification.',
  '# MH Community Due Diligence

Comprehensive checklist for evaluating manufactured housing community acquisitions...

## Financial Analysis
- Rent roll verification
- Operating expense audits
- Capital expenditure planning

## Physical Inspection
- Infrastructure assessment
- Home condition surveys
- Environmental considerations

## Legal Review
- Zoning compliance
- Tenant lease analysis
- Regulatory requirements',
  (SELECT id FROM property_types WHERE name = 'Manufactured Housing' LIMIT 1),
  '550e8400-e29b-41d4-a716-446655440001',
  'published',
  '2025-06-15 16:20:00-07',
  '2025-06-15 16:20:00-07',
  '2025-06-15 16:20:00-07',
  false,
  67,
  10,
  '/assets/insights/wickenburg-mobile-home-park-market-report-2025.webp'
)
ON CONFLICT (id) DO NOTHING;

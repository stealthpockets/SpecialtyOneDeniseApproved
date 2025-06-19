-- Update insight image URLs to use Cloudinary instead of local asset paths
-- This fixes the 404 errors for insight images that are being loaded from /assets/insights/

UPDATE insights 
SET image_url = 'https://res.cloudinary.com/specialtyone/image/upload/specialty-one/insights/1031-exchange-tax-strategies-2025.webp'
WHERE image_url = '/assets/insights/1031-exchange-tax-strategies-2025.webp';

UPDATE insights 
SET image_url = 'https://res.cloudinary.com/specialtyone/image/upload/specialty-one/insights/mh-lot-rents-2025-update.webp'
WHERE image_url = '/assets/insights/mh-lot-rents-2025-update.webp';

UPDATE insights 
SET image_url = 'https://res.cloudinary.com/specialtyone/image/upload/specialty-one/insights/bullhead-city-rv-mh-market-report-2025.webp'
WHERE image_url = '/assets/insights/bullhead-city-rv-mh-market-report-2025.webp';

UPDATE insights 
SET image_url = 'https://res.cloudinary.com/specialtyone/image/upload/specialty-one/insights/wickenburg-mobile-home-park-market-report-2025.webp'
WHERE image_url = '/assets/insights/wickenburg-mobile-home-park-market-report-2025.webp';

UPDATE insights 
SET image_url = 'https://res.cloudinary.com/specialtyone/image/upload/specialty-one/insights/institutional-capital-manufactured-housing-2025.webp'
WHERE image_url = '/assets/insights/institutional-capital-manufactured-housing-2025.webp';

UPDATE insights 
SET image_url = 'https://res.cloudinary.com/specialtyone/image/upload/specialty-one/insights/2025-manufactured-housing-regulatory-outlook.webp'
WHERE image_url = '/assets/insights/2025-manufactured-housing-regulatory-outlook.webp';

-- Verify the updates
SELECT id, title, image_url 
FROM insights 
WHERE image_url LIKE '%cloudinary%' 
ORDER BY title;

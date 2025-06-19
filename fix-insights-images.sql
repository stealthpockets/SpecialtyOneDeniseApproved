-- Update image_url fields in the insights table with correct Cloudinary URLs
UPDATE insights
SET image_url = CASE
    WHEN image_url LIKE '%2025-manufactured-housing-regulatory-outlook%' THEN 'https://res.cloudinary.com/du4bjp4am/image/upload/v1750362071/2025-manufactured-housing-regulatory-outlook_u9t83b.webp'
    WHEN image_url LIKE '%institutional-capital-manufactured-housing-2025%' THEN 'https://res.cloudinary.com/du4bjp4am/image/upload/v1750362069/institutional-capital-manufactured-housing-2025_sj58ou.webp'
    -- Add the correct URL for 1031-exchange-tax-strategies-2025_dqb9eb.webp once provided
    -- WHEN image_url LIKE '%1031-exchange-tax-strategies-2025%' THEN 'https://res.cloudinary.com/du4bjp4am/image/upload/v[VERSION]/[PATH]/1031-exchange-tax-strategies-2025_dqb9eb.webp'
    ELSE image_url
END
WHERE image_url IS NOT NULL
AND (image_url LIKE '%2025-manufactured-housing-regulatory-outlook%'
     OR image_url LIKE '%institutional-capital-manufactured-housing-2025%'
     -- OR image_url LIKE '%1031-exchange-tax-strategies-2025%'
    );

-- Note: This script is incomplete for '1031-exchange-tax-strategies-2025_dqb9eb.webp' and needs the correct Cloudinary URL to be added.

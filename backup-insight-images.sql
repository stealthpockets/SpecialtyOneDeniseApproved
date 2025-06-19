-- Backup all current insight image URLs before updating to Cloudinary
-- This creates a record of all original image paths that can be used to restore if needed

-- Query to see all current image URLs
SELECT id, title, image_url, created_at, updated_at
FROM insights 
WHERE image_url IS NOT NULL
ORDER BY id;

-- Export results to understand the current state
-- Run this query first and save the results before running fix-insights-images.sql

-- To restore original paths if needed, you can use these UPDATE statements:
-- (Replace the Cloudinary URLs with the original paths from the backup)

/*
Example restore commands (update with actual backup data):

UPDATE insights 
SET image_url = '/assets/insights/1031-exchange-tax-strategies-2025.webp'
WHERE id = [ACTUAL_ID];

UPDATE insights 
SET image_url = '/assets/insights/mh-lot-rents-2025-update.webp'
WHERE id = [ACTUAL_ID];

-- etc...
*/

-- Debug insights image URLs to see what's currently in the database
SELECT id, title, slug, image_url, published_at
FROM insights 
WHERE image_url IS NOT NULL
ORDER BY title;

-- Check for any NULL image URLs
SELECT COUNT(*) as null_image_count
FROM insights 
WHERE image_url IS NULL;

-- Check for specific image patterns
SELECT id, title, image_url
FROM insights 
WHERE image_url LIKE '%1031-exchange%';

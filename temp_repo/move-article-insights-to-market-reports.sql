-- Move Article from Insights to Market Reports
-- Moving: "Wickenburg Mobile Home Park Market Report: 2025 Rent Survey & Home Sales Analysis"

-- Step 1: First, let's see what articles are available in insights
-- Uncomment the line below to see all insights articles first:
-- SELECT id, title, slug, created_at FROM insights ORDER BY created_at DESC;

-- Step 2: Move the Wickenburg article
INSERT INTO market_reports (
    slug,
    locale,
    title,
    summary,
    content,
    property_type_id,
    category_id,
    author_id,
    status,
    published_at,
    is_premium,
    views,
    downloads,
    pages,
    reading_time,
    image_url
)
SELECT 
    slug,
    locale,
    title,
    summary,
    content,
    property_type_id,
    category_id,
    author_id,
    status,
    published_at,
    is_premium,
    views,
    downloads,
    pages,
    reading_time,
    image_url
FROM insights 
WHERE title = 'Wickenburg Mobile Home Park Market Report: 2025 Rent Survey & Home Sales Analysis';

-- Step 3: Verify the article was copied successfully
-- Uncomment the line below to verify:
-- SELECT title, slug FROM market_reports WHERE title = 'Wickenburg Mobile Home Park Market Report: 2025 Rent Survey & Home Sales Analysis';

-- Step 4: Remove the article from insights (only run after verifying step 3)
-- Uncomment the line below only after confirming the copy was successful:
-- DELETE FROM insights WHERE title = 'Wickenburg Mobile Home Park Market Report: 2025 Rent Survey & Home Sales Analysis';

-- Step 5: Verify removal (optional)
-- SELECT COUNT(*) as remaining_count FROM insights WHERE title = 'Wickenburg Mobile Home Park Market Report: 2025 Rent Survey & Home Sales Analysis';

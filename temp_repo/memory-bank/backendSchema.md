# Backend Schema Documentation - Specialty One Website

## Overview
Complete documentation of the Supabase backend schema for the Insights and Market Reports content management system, including all tables, relationships, and advanced features.

## Core Content Tables

### `insights` & `market_reports` (Identical Structure)

| Column Name      | Type                      | Description                                                                 |
|------------------|--------------------------|-----------------------------------------------------------------------------|
| id               | uuid (PK)                | Unique identifier for the article/report                                    |
| slug             | text                     | URL-friendly unique identifier (used for routing)                           |
| locale           | text (default 'en')      | Language/locale code                                                        |
| title            | text                     | Title of the article/report                                                 |
| summary          | text                     | Short summary or excerpt for previews                                       |
| content          | text                     | Full article/report content (Markdown or HTML)                              |
| property_type_id | int (FK)                 | Reference to `property_types` table (what asset type this is about)         |
| category_id      | int (FK)                 | Reference to `categories` table (thematic grouping)                         |
| author_id        | uuid (FK)                | Reference to `authors` table                                                |
| status           | status_type (enum)       | Workflow status: 'draft', 'scheduled', 'published', 'archived'              |
| published_at     | timestamptz              | When the article/report was published                                       |
| created_at       | timestamptz (default now)| When the record was created                                                 |
| updated_at       | timestamptz (default now)| When the record was last updated                                            |
| deleted_at       | timestamptz              | Soft-delete timestamp                                                       |
| is_premium       | boolean (default false)  | Whether the content is premium/gated                                        |
| views            | int (default 0)          | Number of times viewed                                                      |
| downloads        | int (default 0)          | Number of times downloaded (for reports)                                    |
| pages            | int                      | Number of pages (for reports, optional)                                     |
| reading_time     | int                      | Estimated reading time in minutes                                           |
| image_url        | text                     | URL to the main/featured image                                              |
| search_vector    | tsvector                 | Full-text search vector (for search functionality)                          |

**Unique Constraints:**
- `(slug, locale)` - allows for multi-language support

**Status Enum Values:**
- `'draft'` - Work in progress
- `'scheduled'` - Scheduled for future publication  
- `'published'` - Live and publicly accessible
- `'archived'` - No longer active but preserved

## Lookup & Reference Tables

### `property_types`
| Column Name | Type    | Description                        |
|-------------|---------|-----------------------------------|
| id          | serial  | Primary key                       |
| name        | text    | Property type name (e.g., "MHC")  |
| parent_id   | int     | Optional parent for hierarchies   |

**Purpose:** Categorize content by property type (Manufactured Housing, RV Parks, Self-Storage)

### `categories`  
| Column Name | Type    | Description                                    |
|-------------|---------|------------------------------------------------|
| id          | serial  | Primary key                                    |
| name        | text    | Category name (e.g., "Market Timing", "Due Diligence") |

**Purpose:** Thematic grouping of content for organization and filtering

### `tags`
| Column Name | Type    | Description                    |
|-------------|---------|--------------------------------|
| id          | serial  | Primary key                    |
| name        | text    | Tag name                       |
| slug        | text    | URL-friendly tag identifier    |

**Purpose:** Flexible tagging system for content discovery and SEO

### `roles`
| Column Name | Type    | Description                              |
|-------------|---------|------------------------------------------|
| id          | serial  | Primary key                              |
| name        | text    | Role name (e.g., "Editor", "Reviewer")  |

**Purpose:** Content workflow and permission management

### `authors`
| Column Name | Type    | Description                    |
|-------------|---------|--------------------------------|
| id          | uuid    | Primary key                    |
| name        | text    | Author's full name             |
| email       | text    | Author's email (unique)        |
| avatar_url  | text    | Profile picture URL            |

**Purpose:** Author information for bylines and content attribution

## Versioning System

### `insight_versions` & `market_report_versions`
| Column Name         | Type      | Description                                      |
|---------------------|-----------|--------------------------------------------------|
| id                  | uuid (PK) | Unique version ID                                |
| insight_id          | uuid (FK) | Reference to parent insight                      |
| market_report_id    | uuid (FK) | Reference to parent market report                |
| pdf_path            | text      | Path/URL to the PDF file                         |
| revision            | int       | Version number                                   |
| created_at          | timestamptz | When this version was created                   |

**Unique Constraints:**
- `(insight_id, revision)` or `(market_report_id, revision)`

**Purpose:** Track multiple versions/formats of content (e.g., PDF exports)

## Many-to-Many Relationships

### `content_tags`
| Column Name   | Type    | Description                                         |
|---------------|---------|-----------------------------------------------------|
| content_id    | uuid    | ID of the content (insight or market_report)        |
| tag_id        | int     | Reference to `tags(id)`                             |
| content_table | text    | Either `'insights'` or `'market_reports'`           |

**Primary Key:** `(content_id, tag_id, content_table)`

**Purpose:** Flexible tagging system supporting both content types

### `content_roles`
| Column Name   | Type    | Description                                         |
|---------------|---------|-----------------------------------------------------|
| content_id    | uuid    | ID of the content (insight or market_report)        |
| role_id       | int     | Reference to `roles(id)`                            |
| content_table | text    | Either `'insights'` or `'market_reports'`           |

**Primary Key:** `(content_id, role_id, content_table)`

**Purpose:** Associate roles with content for workflow management

## Analytics & Tracking

### `content_events`
| Column Name   | Type        | Description                                |
|---------------|-------------|--------------------------------------------|
| id            | bigserial   | Primary key                                |
| content_id    | uuid        | Reference to content                       |
| user_id       | uuid        | Optional user identifier                   |
| event         | text        | Event type: 'view' or 'download'          |
| utm_source    | text        | Marketing source tracking                  |
| utm_medium    | text        | Marketing medium tracking                  |
| utm_campaign  | text        | Marketing campaign tracking                |
| referrer      | text        | HTTP referrer                             |
| ip            | text        | Client IP address                         |
| ua            | text        | User agent string                         |
| created_at    | timestamptz | Event timestamp                           |

**Purpose:** Track content engagement and marketing attribution

## Database Features

### Triggers & Automation
- **Auto-update timestamps:** `updated_at` automatically maintained
- **Full-text search:** `search_vector` automatically generated from title, summary, and content
- **Scheduled publishing:** Cron jobs automatically publish scheduled content

### Row Level Security (RLS)
- **Public read access:** Published, non-deleted content only
- **Admin access:** Full CRUD for authenticated service roles
- **Content isolation:** Users see only appropriate content based on status

### Indexes for Performance
- **Publication indexes:** Optimized queries for published content by date
- **Search indexes:** GIN indexes on `search_vector` for full-text search
- **Composite indexes:** Multi-column indexes for common query patterns

## Usage Examples

### Basic Content Query
```sql
SELECT i.*, a.name as author_name
FROM insights i
LEFT JOIN authors a ON i.author_id = a.id
WHERE i.status = 'published' 
  AND i.deleted_at IS NULL
ORDER BY i.published_at DESC;
```

### Content with Tags
```sql
SELECT i.title, array_agg(t.name) as tags
FROM insights i
JOIN content_tags ct ON i.id = ct.content_id AND ct.content_table = 'insights'
JOIN tags t ON ct.tag_id = t.id
WHERE i.status = 'published'
GROUP BY i.id, i.title;
```

### Property Type Filtering
```sql
SELECT mr.*, pt.name as property_type
FROM market_reports mr
JOIN property_types pt ON mr.property_type_id = pt.id
WHERE pt.name = 'Manufactured Housing'
  AND mr.status = 'published';
```

### Premium Content Check
```sql
SELECT title, is_premium, 
  CASE WHEN is_premium THEN 'Premium Access Required' 
       ELSE 'Free Access' END as access_level
FROM market_reports 
WHERE status = 'published';
```

## Advanced Features Available

### Content Versioning
- Multiple PDF versions per article
- Revision tracking and history
- Version-specific download tracking

### Multi-language Support
- Locale-based content variants
- Unique slug per locale combination
- Localized SEO optimization

### Premium Content System
- Boolean flag for gated content
- Integration ready for payment systems
- Analytics tracking for premium views

### Advanced Analytics
- UTM parameter tracking
- Referrer analysis
- User behavior tracking
- Download statistics

### Search & Discovery
- Full-text search across all content
- Tag-based content discovery
- Category and property type filtering
- Related content suggestions

## Implementation Status

### ✅ Currently Implemented
- Basic content CRUD operations
- Author relationships
- Image URL support
- Status-based publishing
- Slug-based routing

### 🔄 Partially Implemented
- Basic querying (missing advanced filters)
- Single author per content (schema supports full author system)

### ❌ Not Yet Implemented
- Property type filtering
- Category system
- Tagging functionality
- Content versioning
- Premium content gates
- Analytics tracking
- Advanced search
- Multi-language support
- Role-based workflow

## Next Steps for Full Implementation

1. **Expand TypeScript interfaces** to include all schema fields
2. **Implement filtering hooks** for property types, categories, tags
3. **Add premium content handling** in frontend
4. **Create analytics tracking** system
5. **Build content management interface** for authors/editors
6. **Implement search functionality** using search vectors
7. **Add version management** for PDF downloads

# Insights & Market Reports System - Developer Handoff

## Current Implementation Status

### ✅ COMPLETED
1. **TickerBox Integration**: Successfully integrated into MarketReportsPage
2. **Data Fetching**: useInsights.ts and useMarketReports.ts hooks implemented
3. **List Pages**: InsightsPage.tsx and MarketReportsPage.tsx fully functional
4. **Database Schema**: Supabase tables with image_url columns added
5. **Card Components**: Article preview cards with proper styling

### ❌ MISSING (Critical for Full Functionality)
1. **ArticleDetail.tsx Component**: Main detail page for full articles
2. **Routing Setup**: Missing routes for `/insights/:slug` and `/market-reports/:slug`
3. **Dependencies**: Missing npm packages for markdown, SEO, and social sharing
4. **Interactive Features**: Social sharing, related articles, subscribe CTAs

## What Works Currently

Users can:
- ✅ View lists of insights and market reports
- ✅ See article previews with author, date, summary
- ✅ Filter and search articles
- ✅ View real-time market rates ticker on Market Reports page

Users CANNOT:
- ❌ Click on articles to read full content (links lead nowhere)
- ❌ Share articles on social media
- ❌ See related articles
- ❌ Access SEO-optimized article pages

## Implementation Roadmap

### Phase 1: Install Dependencies (15 minutes)

```bash
npm install react-markdown react-helmet react-share react-responsive
```

**Required packages:**
- `react-markdown`: Render markdown content
- `react-helmet`: Dynamic meta tags for SEO
- `react-share`: Social media sharing buttons
- `react-responsive`: Media query utilities

### Phase 2: Create ArticleDetail Component (2-3 hours)

**File**: `src/pages/ArticleDetail.tsx`

**Key Features Required:**
1. Dynamic content loading by slug
2. Author information display
3. SEO meta tags
4. Markdown content rendering
5. Back navigation links
6. Social sharing buttons
7. Related articles section

**Component Structure:**
```typescript
interface ArticleDetailProps {
  type: 'insights' | 'market_reports';
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ type }) => {
  // Implementation here
}
```

### Phase 3: Add Routing (30 minutes)

**File**: `src/App.tsx`

Add these routes:
```typescript
<Route path="/insights/:slug" element={<ArticleDetail type="insights" />} />
<Route path="/market-reports/:slug" element={<ArticleDetail type="market_reports" />} />
```

### Phase 4: Link List Pages to Detail Pages (30 minutes)

**Files**: `src/pages/InsightsPage.tsx`, `src/pages/MarketReportsPage.tsx`

Wrap article cards with Link components:
```typescript
import { Link } from 'react-router-dom';

<Link to={`/insights/${insight.slug}`}>
  <Card article={insight} />
</Link>
```

## Detailed Implementation Specs

### ArticleDetail.tsx - Complete Template

```typescript
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import ReactMarkdown from 'react-markdown';
import { Helmet } from 'react-helmet';
import { TwitterShareButton, LinkedinShareButton } from 'react-share';
import { ArrowLeft, Share, Calendar, Clock, User } from 'lucide-react';

interface ArticleDetailProps {
  type: 'insights' | 'market_reports';
}

interface Article {
  id: string;
  slug: string;
  title: string;
  content: string;
  summary: string;
  published_at: string;
  image_url?: string;
  reading_time?: number;
  authors: {
    name: string;
    avatar_url?: string;
  };
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ type }) => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;

      try {
        const { data, error } = await supabase
          .from(type)
          .select(`
            id,
            slug,
            title,
            content,
            summary,
            published_at,
            image_url,
            reading_time,
            authors (
              name,
              avatar_url
            )
          `)
          .eq('slug', slug)
          .eq('status', 'published')
          .single();

        if (error) {
          setError('Article not found');
          return;
        }

        setArticle(data);
        fetchRelatedArticles(data.id);
      } catch (err) {
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug, type]);

  const fetchRelatedArticles = async (currentId: string) => {
    // Implementation for related articles based on tags
    // This requires the content_tags table from the schema
    try {
      const { data } = await supabase
        .from(type)
        .select(`
          id,
          slug,
          title,
          summary,
          image_url,
          authors (name)
        `)
        .neq('id', currentId)
        .eq('status', 'published')
        .limit(3);

      setRelatedArticles(data || []);
    } catch (err) {
      console.error('Failed to fetch related articles:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-sand flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-sand flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <Link to={`/${type}`} className="text-plum hover:underline">
            Back to {type === 'insights' ? 'Insights' : 'Market Reports'}
          </Link>
        </div>
      </div>
    );
  }

  const shareUrl = window.location.href;
  const pageTitle = type === 'insights' ? 'Insights' : 'Market Reports';

  return (
    <>
      <Helmet>
        <title>{article.title} - Specialty One</title>
        <meta name="description" content={article.summary} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.summary} />
        {article.image_url && <meta property="og:image" content={article.image_url} />}
        <meta property="og:url" content={shareUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="min-h-screen bg-sand">
        <div className="container-custom py-16">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link 
              to={`/${type}`}
              className="inline-flex items-center gap-2 text-plum hover:text-amethyst transition-colors"
            >
              <ArrowLeft size={20} />
              Back to {pageTitle}
            </Link>
          </div>

          {/* Article Content */}
          <article className="max-w-4xl mx-auto">
            {/* Header */}
            <header className="mb-8">
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 text-gradient">
                {article.title}
              </h1>
              
              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>{article.authors.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{new Date(article.published_at).toLocaleDateString()}</span>
                </div>
                {article.reading_time && (
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{article.reading_time} min read</span>
                  </div>
                )}
              </div>

              {/* Featured Image */}
              {article.image_url && (
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full h-96 object-cover rounded-lg mb-8"
                  loading="lazy"
                />
              )}
            </header>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none mb-12">
              <ReactMarkdown>{article.content}</ReactMarkdown>
            </div>

            {/* Social Sharing */}
            <div className="border-t border-gray-200 pt-8 mb-12">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Share this article</h3>
                  <div className="flex gap-4">
                    <TwitterShareButton url={shareUrl} title={article.title}>
                      <button className="button-secondary">Share on Twitter</button>
                    </TwitterShareButton>
                    <LinkedinShareButton url={shareUrl} title={article.title}>
                      <button className="button-secondary">Share on LinkedIn</button>
                    </LinkedinShareButton>
                  </div>
                </div>
                <Link to="/newsletter" className="button-gradient">
                  Subscribe for More
                </Link>
              </div>
            </div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <section className="border-t border-gray-200 pt-12">
                <h2 className="font-display text-2xl font-bold mb-8">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedArticles.map((related) => (
                    <Link 
                      key={related.id} 
                      to={`/${type}/${related.slug}`}
                      className="block hover:transform hover:scale-105 transition-transform"
                    >
                      <div className="card">
                        {related.image_url && (
                          <img
                            src={related.image_url}
                            alt={related.title}
                            className="w-full h-48 object-cover"
                            loading="lazy"
                          />
                        )}
                        <div className="p-6">
                          <h3 className="font-display text-xl font-bold mb-2">
                            {related.title}
                          </h3>
                          <p className="text-gray-600 mb-4">{related.summary}</p>
                          <p className="text-plum font-semibold">{related.authors.name}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>
        </div>
      </div>
    </>
  );
};

export default ArticleDetail;
```

### Routing Integration

**In `src/App.tsx`, add these routes:**

```typescript
// Add to imports
import ArticleDetail from './pages/ArticleDetail';

// Add to Routes component
<Route 
  path="/insights/:slug" 
  element={<ArticleDetail type="insights" />} 
/>
<Route 
  path="/market-reports/:slug" 
  element={<ArticleDetail type="market_reports" />} 
/>
```

### List Page Link Integration

**In both `InsightsPage.tsx` and `MarketReportsPage.tsx`:**

```typescript
// Wrap Card components with Link
import { Link } from 'react-router-dom';

// In the map function:
{insights.map((insight) => (
  <Link key={insight.id} to={`/insights/${insight.slug}`}>
    <Card article={insight} />
  </Link>
))}
```

## Database Requirements

**Ensure these tables exist in Supabase:**

1. **insights table**: ✅ Already exists
2. **market_reports table**: ✅ Already exists  
3. **authors table**: ✅ Already exists
4. **content_tags table**: For related articles functionality
5. **tags table**: For related articles functionality

**Required columns (verify these exist):**
- `image_url` in both content tables ✅ Already added
- `slug` for URL routing ✅ Should exist
- `status` for published/draft filtering ✅ Should exist
- `content` for full markdown content ✅ Should exist

## Testing Checklist

### Functionality Tests
- [ ] Install all dependencies successfully
- [ ] Create ArticleDetail component
- [ ] Add routing to App.tsx
- [ ] Link list pages to detail pages
- [ ] Test article loading by slug
- [ ] Verify SEO meta tags appear
- [ ] Test social sharing buttons
- [ ] Verify related articles display
- [ ] Test responsive design on mobile

### User Experience Tests
- [ ] Navigation flows work smoothly
- [ ] Back buttons work correctly
- [ ] Loading states display properly
- [ ] Error states handle gracefully
- [ ] Images load with proper fallbacks
- [ ] Scroll position resets on navigation

### SEO Tests
- [ ] Meta titles appear correctly
- [ ] Meta descriptions are populated
- [ ] Open Graph tags work for social sharing
- [ ] Structured data is valid
- [ ] URLs are clean and readable

## Error Handling

**Common issues to watch for:**
1. **Missing slugs**: Handle URL with missing or invalid slugs
2. **Unpublished articles**: Filter by status = 'published'
3. **Missing authors**: Handle articles without author relationships
4. **Missing images**: Provide fallback images
5. **Markdown errors**: Handle malformed markdown content

## Performance Considerations

1. **Lazy loading**: Implement for images and content
2. **Caching**: Consider implementing for article data
3. **Code splitting**: Route-level splitting for ArticleDetail
4. **Image optimization**: Ensure images are properly sized
5. **Bundle size**: Monitor impact of new dependencies

## Security Notes

1. **Content sanitization**: ReactMarkdown handles this automatically
2. **XSS protection**: Ensure user-generated content is sanitized
3. **SQL injection**: Supabase client handles this automatically
4. **Content validation**: Validate article data before rendering

## Next Steps After Implementation

1. **Content creation**: Add real articles to test the system
2. **SEO optimization**: Implement structured data markup
3. **Analytics**: Add tracking for article views and engagement
4. **Search functionality**: Consider adding full-text search
5. **Comments system**: Consider adding article comments
6. **Newsletter integration**: Connect subscribe CTAs to email service

## Support & Documentation

- **Supabase Docs**: https://supabase.com/docs
- **React Router Docs**: https://reactrouter.com/
- **ReactMarkdown Docs**: https://github.com/remarkjs/react-markdown
- **React Helmet Docs**: https://github.com/nfl/react-helmet
- **React Share Docs**: https://github.com/nygardk/react-share

## Estimated Time to Complete

- **Phase 1 (Dependencies)**: 15 minutes
- **Phase 2 (ArticleDetail)**: 2-3 hours
- **Phase 3 (Routing)**: 30 minutes  
- **Phase 4 (Linking)**: 30 minutes
- **Testing & Polish**: 1-2 hours

**Total Estimated Time**: 4-6 hours for complete implementation

---

**Status**: Ready for implementation. All prerequisites are in place, and the roadmap is clear and detailed.

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Helmet } from 'react-helmet';
import { TwitterShareButton, LinkedinShareButton } from 'react-share';
import { ArrowLeft, Calendar, Clock, User, ChevronRight, ArrowUp } from 'lucide-react';
import { useCharts } from '../hooks/useCharts';
import { SimpleChartProcessor } from '../lib/simpleChartProcessor';
import PDFDownload from '../components/PDFDownload';
import '../styles/markdown-content.css';

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
  pdf_url?: string;
  reading_time?: number;
  authors: {
    name: string;
    avatar_url?: string;
  } | null;
}

interface RelatedArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  image_url?: string;
  authors: {
    name: string;
  } | null;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ type }) => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<RelatedArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Chart integration
  const { charts, loading: chartsLoading } = useCharts();
  const [chartProcessor, setChartProcessor] = useState<SimpleChartProcessor | null>(null);

  // Initialize chart processor when charts are loaded
  useEffect(() => {
    if (!chartsLoading && charts.length > 0) {
      setChartProcessor(new SimpleChartProcessor(charts));
    }
  }, [charts, chartsLoading]);

  // Handle scroll to show/hide back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;

      try {        const { data, error } = await supabase
          .from(type)
          .select(`
            id,
            slug,
            title,
            content,
            summary,
            published_at,
            image_url,
            ${type === 'insights' ? 'pdf_url,' : ''}
            reading_time,
            author_id
          `)
          .eq('slug', slug)
          .eq('status', 'published')
          .single();if (error) {
          setError('Article not found');
          return;
        }

        // Fetch author separately if author_id exists
        let authors = null;
        if (data.author_id) {
          const { data: authorData } = await supabase
            .from('authors')
            .select('name, avatar_url')
            .eq('id', data.author_id)
            .single();
          
          if (authorData) {
            authors = { name: authorData.name, avatar_url: authorData.avatar_url };
          }
        }        const transformedData: Article = {
          ...data,
          pdf_url: data.pdf_url || undefined, // Handle optional pdf_url
          authors
        };

        setArticle(transformedData);
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
    try {
      // Enhanced related articles: try tag-based matching first
      const { data: tags } = await supabase
        .from('content_tags')
        .select('tag_id')
        .eq('content_id', currentId)
        .eq('content_table', type);

      let relatedData: RelatedArticle[] = [];

      if (tags && tags.length > 0) {
        // Get articles with shared tags
        const tagIds = tags.map(tag => tag.tag_id);
        const { data: relatedIds } = await supabase
          .from('content_tags')
          .select('content_id')
          .in('tag_id', tagIds)
          .neq('content_id', currentId)
          .eq('content_table', type);

        if (relatedIds && relatedIds.length > 0) {
          const relatedArticleIds = relatedIds.map(item => item.content_id);
          const { data: related } = await supabase
            .from(type)
            .select(`
              id,
              slug,
              title,
              summary,
              image_url,
              authors (name)
            `)
            .in('id', relatedArticleIds)
            .eq('status', 'published')
            .limit(3);

          // Transform related articles data to handle authors properly
          relatedData = (related || []).map((item: any) => ({
            ...item,
            authors: Array.isArray(item.authors) && item.authors.length > 0 ? item.authors[0] : item.authors
          }));
        }
      }

      // Fallback: if no tag-based related articles, get other recent articles
      if (relatedData.length === 0) {
        const { data: fallbackData } = await supabase
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
          .order('published_at', { ascending: false })
          .limit(3);

        // Transform fallback articles data to handle authors properly
        relatedData = (fallbackData || []).map((item: any) => ({
          ...item,
          authors: Array.isArray(item.authors) && item.authors.length > 0 ? item.authors[0] : item.authors
        }));
      }

      setRelatedArticles(relatedData);
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
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>          <Link to={`/${typeUrl}`} className="text-plum hover:underline">
            Back to {type === 'insights' ? 'Insights' : 'Market Reports'}
          </Link>
        </div>
      </div>
    );
  }
  const shareUrl = window.location.href;
  const pageTitle = type === 'insights' ? 'Insights' : 'Market Reports';
  const typeUrl = type === 'insights' ? 'insights' : 'market-reports';
  
  // Default fallback image
  const defaultImage = '/assets/property-types/manufactured-housing-community-investment.webp';
  const articleImage = article.image_url || defaultImage;

  return (
    <>
      <Helmet>
        <title>{article.title} - Specialty One</title>
        <meta name="description" content={article.summary} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.summary} />
        <meta property="og:image" content={articleImage} />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="min-h-screen bg-sand">
        {/* Professional Breadcrumb Navigation */}
        <nav className="bg-navy border-b border-gray-700">
          <div className="container-custom px-4 sm:px-6 lg:px-8 py-3 md:py-4">            <div className="flex items-center text-xs sm:text-sm text-gray-300">
              <Link to="/" className="hover:text-sage transition-colors">
                Home
              </Link>
              <ChevronRight size={16} className="mx-2 text-gray-500" />
              <Link to={`/${typeUrl}`} className="hover:text-sage transition-colors">
                {pageTitle}
              </Link>
              <ChevronRight size={16} className="mx-2 text-gray-500" />
              <span className="text-white font-medium truncate">
                {article.title}
              </span>
            </div>
            
            {/* Integrated Back Navigation */}
            <Link 
              to={`/${typeUrl}`}
              className="inline-flex items-center gap-2 mt-2 md:mt-3 text-sage hover:text-white transition-colors font-medium text-sm md:text-base"
            >
              <ArrowLeft size={16} className="md:hidden" />
              <ArrowLeft size={18} className="hidden md:block" />
              Back to {pageTitle}
            </Link>
          </div>
        </nav>

        {/* Main Content Grid */}
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8 py-4 md:py-8 lg:py-16">
            
            {/* Article Content - Main Column */}
            <article className="lg:col-span-8 xl:col-span-9 order-first">
              {/* Article Header */}
              <header className="mb-6 md:mb-8 lg:mb-12">                {/* Article Title */}
                <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 lg:mb-8 text-gray-900" style={{ lineHeight: '1.4' }}>
                  {article.title}
                </h1>
                
                {/* Article Summary */}
                <div className="text-base md:text-lg lg:text-xl text-gray-700 mb-6 md:mb-8 leading-relaxed max-w-3xl">
                  {article.summary}
                </div>
                
                {/* Article Meta */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 text-sm md:text-base text-gray-600 mb-6 md:mb-8 pb-4 md:pb-6 lg:pb-8 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <User size={16} className="sm:hidden text-plum" />
                    <User size={18} className="hidden sm:block text-plum" />
                    <span className="font-medium">{article.authors?.name || 'Specialty One Team'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="sm:hidden text-plum" />
                    <Calendar size={18} className="hidden sm:block text-plum" />
                    <span>{new Date(article.published_at).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: window.innerWidth < 640 ? 'short' : 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  {article.reading_time && (
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="sm:hidden text-plum" />
                      <Clock size={18} className="hidden sm:block text-plum" />
                      <span>{article.reading_time} min read</span>
                    </div>
                  )}
                </div>

                {/* Featured Image */}
                <div className="relative mb-6 md:mb-8 lg:mb-12">
                  <img
                    src={articleImage}
                    alt={article.title}
                    className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-lg md:rounded-xl shadow-lg"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== defaultImage) {
                        target.src = defaultImage;
                      }
                    }}
                  />
                </div>
              </header>              {/* Professional Article Content with Enhanced Styling and Chart Integration */}
              <div className="markdown-content mb-8 md:mb-12 lg:mb-16">
                {chartProcessor ? (
                  (() => {
                    const result = chartProcessor.processContent(article.content.replace(/\\n/g, '\n'));
                    
                    if (!result.hasCharts) {
                      // No charts, use regular ReactMarkdown
                      return (
                        <ReactMarkdown 
                          remarkPlugins={[remarkGfm]}
                          components={{
                            table: ({ children, ...props }) => (
                              <div className="table-wrapper">
                                <table {...props}>{children}</table>
                              </div>
                            ),
                          }}
                        >
                          {article.content.replace(/\\n/g, '\n')}
                        </ReactMarkdown>
                      );
                    }

                    // Process content with charts
                    const segments = chartProcessor.splitContentWithCharts(result.content, result.chartComponents);
                    
                    return (
                      <>
                        {segments.map((segment: any) => {
                          if (segment.type === 'chart') {
                            return <div key={segment.key}>{segment.component}</div>;
                          } else {
                            return (
                              <ReactMarkdown 
                                key={segment.key}
                                remarkPlugins={[remarkGfm]}
                                components={{
                                  table: ({ children, ...props }) => (
                                    <div className="table-wrapper">
                                      <table {...props}>{children}</table>
                                    </div>
                                  ),
                                }}
                              >
                                {segment.content}
                              </ReactMarkdown>
                            );
                          }
                        })}
                      </>
                    );
                  })()
                ) : (
                  // Fallback while charts are loading
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      table: ({ children, ...props }) => (
                        <div className="table-wrapper">
                          <table {...props}>{children}</table>
                        </div>
                      ),
                    }}
                  >
                    {article.content.replace(/\\n/g, '\n')}
                  </ReactMarkdown>
                )}
              </div>

              {/* PDF Download Section */}
              {article.pdf_url && (
                <PDFDownload
                  pdfUrl={article.pdf_url}
                  title={`Download ${article.title} - Full Report`}
                  description="Get the complete analysis in PDF format for offline reading and sharing."
                  className="mb-8 md:mb-12 lg:mb-16"
                />
              )}

              {/* Professional CTA Section */}
              <div className="bg-gradient-to-br from-plum/5 to-amethyst/5 rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-10 mb-8 md:mb-12 lg:mb-16 border border-plum/10">
                <div className="text-center max-w-2xl mx-auto">
                  <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
                    Ready to Explore Investment Opportunities?
                  </h3>
                  <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8 leading-relaxed">
                    Get expert insights and access to our exclusive network of pre-market opportunities in manufactured housing, RV parks, and self-storage.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                    <Link 
                      to="/contact" 
                      className="px-6 sm:px-8 py-3 md:py-4 min-h-[44px] bg-gradient-to-r from-plum to-amethyst text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 text-center flex items-center justify-center"
                    >
                      Schedule Consultation
                    </Link>
                    <Link 
                      to="/exclusive-buyer-network" 
                      className="px-6 sm:px-8 py-3 md:py-4 min-h-[44px] border-2 border-plum text-plum font-semibold rounded-lg hover:bg-plum hover:text-white transition-all duration-300 text-center flex items-center justify-center"
                    >
                      Join Buyer Network
                    </Link>
                  </div>
                </div>
              </div>

              {/* Social Sharing */}
              <div className="border-t border-gray-200 pt-6 md:pt-8 mb-8 md:mb-12">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
                  <div className="w-full md:w-auto">
                    <h3 className="font-display text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Share this article</h3>
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4">                      <TwitterShareButton url={shareUrl} title={article.title}>
                        <div className="px-4 sm:px-6 py-3 min-h-[44px] border-2 border-gray-300 text-gray-700 hover:border-plum hover:text-plum transition-all duration-200 rounded-lg font-medium text-sm md:text-base w-full sm:w-auto text-center cursor-pointer">
                          Share on Twitter
                        </div>
                      </TwitterShareButton>
                      <LinkedinShareButton url={shareUrl} title={article.title}>
                        <div className="px-4 sm:px-6 py-3 min-h-[44px] border-2 border-gray-300 text-gray-700 hover:border-plum hover:text-plum transition-all duration-200 rounded-lg font-medium text-sm md:text-base w-full sm:w-auto text-center cursor-pointer">
                          Share on LinkedIn
                        </div>
                      </LinkedinShareButton>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar - Secondary Column */}
            <aside className="lg:col-span-4 xl:col-span-3 order-last lg:order-none">
              <div className="lg:sticky lg:top-[5.5rem] space-y-4 md:space-y-6 lg:space-y-8">
                
                {/* Quick Navigation */}
                <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
                  <h3 className="font-display text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">Quick Navigation</h3>
                  <div className="space-y-2 md:space-y-3">                    <Link 
                      to={`/${typeUrl}`}
                      className="flex items-center gap-2 text-gray-600 hover:text-plum transition-colors text-sm md:text-base min-h-[44px] md:min-h-auto py-2 md:py-0"
                    >
                      <ArrowLeft size={16} />
                      Back to {pageTitle}
                    </Link>
                    <button 
                      onClick={scrollToTop}
                      className="flex items-center gap-2 text-gray-600 hover:text-plum transition-colors w-full text-left text-sm md:text-base min-h-[44px] md:min-h-auto py-2 md:py-0"
                    >
                      <ArrowUp size={16} />
                      Back to Top
                    </button>
                  </div>
                </div>

                {/* Article Info */}
                <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
                  <h3 className="font-display text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">Article Details</h3>
                  <div className="space-y-2 md:space-y-3 text-xs md:text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Published:</span>
                      <span className="font-medium text-gray-900">
                        {new Date(article.published_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reading Time:</span>
                      <span className="font-medium text-gray-900">
                        {article.reading_time || 5} minutes
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Author:</span>
                      <span className="font-medium text-gray-900">
                        {article.authors?.name || 'Specialty One Team'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contact CTA */}
                <div className="bg-gradient-to-br from-plum to-amethyst rounded-lg md:rounded-xl p-4 md:p-6 text-white">
                  <h3 className="font-display text-base md:text-lg font-bold mb-2 md:mb-3">Need Expert Guidance?</h3>
                  <p className="text-plum-100 mb-3 md:mb-4 text-xs md:text-sm leading-relaxed">
                    Get personalized insights for your specific investment goals.
                  </p>                  <Link 
                    to="/contact"
                    className="w-full text-center py-3 min-h-[44px] bg-white text-plum font-semibold rounded-lg hover:bg-gray-50 transition-colors text-sm md:text-base flex items-center justify-center"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <section className="border-t border-gray-200 pt-8 md:pt-12 lg:pt-16 pb-8 md:pb-12 lg:pb-16">
              <div className="max-w-6xl mx-auto">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mb-6 md:mb-8 lg:mb-12 text-center">
                  Related Articles
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                  {relatedArticles.map((related) => (                    <Link 
                      key={related.id} 
                      to={`/${typeUrl}/${related.slug}`}
                      className="block group"
                    >
                      <article className="bg-white rounded-lg md:rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 group-hover:border-plum/20">
                        <div className="relative h-40 sm:h-48 overflow-hidden">
                          <img
                            src={related.image_url || defaultImage}
                            alt={related.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              if (target.src !== defaultImage) {
                                target.src = defaultImage;
                              }
                            }}
                          />
                        </div>
                        <div className="p-4 md:p-6">
                          <h3 className="font-display text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 line-clamp-2 group-hover:text-plum transition-colors">
                            {related.title}
                          </h3>
                          <p className="text-gray-600 mb-3 md:mb-4 line-clamp-3 leading-relaxed text-sm md:text-base">
                            {related.summary}
                          </p>
                          <div className="flex items-center justify-between">
                            <p className="text-xs md:text-sm text-plum font-semibold">
                              {related.authors?.name || 'Specialty One Team'}
                            </p>
                            <span className="text-plum font-medium text-xs md:text-sm group-hover:underline">
                              Read Article →
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Floating Back to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 p-3 md:p-4 bg-plum text-white rounded-full shadow-lg hover:bg-amethyst transition-all duration-300 hover:scale-110 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Back to top"
          >
            <ArrowUp size={18} className="md:hidden" />
            <ArrowUp size={20} className="hidden md:block" />
          </button>
        )}
      </div>
    </>
  );
};

export default ArticleDetail;

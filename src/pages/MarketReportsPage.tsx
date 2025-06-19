import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Calendar, FileText, Search } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { CloudinaryImage } from '../components/ui/CloudinaryImage';
import { MarketReport, ContentFilters } from '../types/MarketReport';
import { PropertyTypeFilter } from '../components/ui/PropertyTypeFilter';
import { PropertyTypeBadge } from '../components/ui/PropertyTypeBadge';
import { TickerBox } from '../components/home/TickerBox';
import { useMarketReports } from '../hooks/useMarketReports';

const upcomingReports = [
  {
    title: "2025 Investment Forecast",
    type: "Annual",
    expectedDate: "January 2025",
    description: "Comprehensive outlook for all asset classes including interest rate scenarios and regulatory impacts."
  },
  {
    title: "Arizona RV Park Census",
    type: "Special",
    expectedDate: "February 2025",
    description: "Complete inventory and analysis of RV parks across Arizona with occupancy and rate data."
  },
  {
    title: "Q1 2025 Market Update",
    type: "Quarterly",
    expectedDate: "April 2025",
    description: "First quarter performance across all markets with spring selling season analysis."
  }
];

const MarketReportsPage = () => {
  const [filters, setFilters] = useState<ContentFilters>({});
  const [searchTerm, setSearchTerm] = useState<string>('');

  const { marketReports, loading, error } = useMarketReports(filters);

  const filteredReports = marketReports.filter((report: MarketReport) => {
    const matchesSearch = searchTerm === '' || 
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (report.summary && report.summary.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesSearch;
  });  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-sand via-cloud to-sand">
      {/* Hero Section - keeping original gradient */}
      <section className="pt-32 pb-20 bg-gradient-hero text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center text-sand">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Market Intelligence That Drives
              <span className="block">Investment Decisions</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Comprehensive market research and analysis for Manufactured Housing, RV Parks, and Self-Storage investments across the Southwest.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Button 
                to="/newsletter" 
                variant="primary"
                size="lg"
                icon={<Download size={20} />}
                iconPosition="right"
              >
                Subscribe for Reports
              </Button>
            </div>
            <p className="text-sm lg:text-base mt-4 opacity-75 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              Get quarterly reports and market updates delivered to your inbox.
            </p>
          </div>
        </div>
      </section>      {/* Market Rate Ticker */}
      <TickerBox />      {/* Market Reports Grid */}
      <section className="py-24 bg-gradient-to-br from-sand via-cloud to-sand">
        <div className="container-custom">
          {/* Filters */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 mb-16 shadow-luxury border border-white/30">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-charcoal/60" size={20} />
                <input
                  type="text"
                  placeholder="Search reports..."
                  className="w-full pl-12 pr-4 py-3 bg-white/90 border border-white/40 rounded-xl text-charcoal placeholder-charcoal/60 focus:outline-none focus:ring-2 focus:ring-plum/30 focus:border-plum/50 backdrop-blur-sm transition-all duration-300 font-medium"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Property Type Filter */}
              <PropertyTypeFilter
                selectedFilter={filters}
                onFilterChange={setFilters}
                className="flex-shrink-0"
              />
            </div>
          </div>

          {loading && (
            <div className="text-center py-16">
              <p className="text-xl text-charcoal/60">Loading market reports...</p>
            </div>
          )}
          
          {error && (
            <div className="text-center py-16">
              <p className="text-xl text-red-500">Error loading reports: {error}</p>
            </div>
          )}          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredReports.map((report: any, index: number) => (
                <Link 
                  key={report.id || index}
                  to={`/market-reports/${report.slug}`}
                  className="block group"
                >
                  <Card className="overflow-hidden bg-white/80 backdrop-blur-lg border border-white/40 hover:bg-white/90 hover:shadow-luxury transition-all duration-500 h-full rounded-2xl">                    <div className="relative h-48">
                      <CloudinaryImage 
                        localPath={report.image_url || 'self-storage-facility-investment.webp'}
                        alt={report.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />                      <div className="absolute top-4 left-4">
                        <Badge 
                          color="primary"
                          variant="gradient"
                          className="shadow-md"
                        >
                          Report
                        </Badge>
                      </div>
                      {report.is_premium && (
                        <div className="absolute top-4 right-4">
                          <Badge color="warning" variant="gradient" className="shadow-md">
                            Premium
                          </Badge>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-8">
                      <div className="flex items-center gap-2 text-charcoal/60 mb-4">
                        <Calendar size={16} />
                        <span className="text-sm font-medium">{new Date(report.published_at).toLocaleDateString()}</span>
                        {report.reading_time && (
                          <>
                            <span>•</span>
                            <FileText size={16} />
                            <span className="text-sm font-medium">{report.reading_time} min read</span>
                          </>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-display font-bold mb-4 leading-tight text-charcoal group-hover:text-plum transition-colors">
                        {report.title}
                      </h3>                      <div className="flex items-center gap-2 mb-4">
                        <Badge color="secondary" variant="outline" className="border-plum/40 text-plum bg-white/60 backdrop-blur-sm">
                          Market Report
                        </Badge>
                        <PropertyTypeBadge 
                          propertyType={report.property_types}
                        />
                      </div>

                      <div className="text-charcoal/70 mb-6 prose prose-sm max-w-none line-clamp-3 font-medium">
                        <ReactMarkdown>{report.summary?.replace(/\\n/g, '\n') || ''}</ReactMarkdown>
                      </div>

                      <div className="flex items-center justify-between border-t border-charcoal/10 pt-4">
                        <div className="text-sm text-charcoal/60 font-medium">
                          By {report.authors?.name || 'Unknown Author'}
                        </div>
                        <div className="px-4 py-2 border border-plum text-plum rounded-lg text-sm font-semibold hover:bg-plum hover:text-white transition-all duration-300">
                          View Report
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {!loading && !error && filteredReports.length === 0 && (
            <div className="text-center py-16">
              <FileText size={60} className="text-charcoal/40 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-charcoal mb-4">
                No reports found
              </h3>
              <p className="text-charcoal/60 text-lg">
                Try adjusting your filters or search terms.
              </p>
            </div>
          )}
        </div>
      </section>      {/* Upcoming Reports */}
      <section className="py-24 bg-gradient-to-br from-cloud via-sand to-cloud">
        <div className="container-custom">
          <h2 className="heading-luxury text-charcoal text-4xl md:text-5xl font-bold mb-16 text-center leading-tight">
            Upcoming Reports
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingReports.map((report, index) => (
              <Card 
                key={index}
                className="bg-white/80 backdrop-blur-lg border border-white/40 hover:bg-white/90 hover:shadow-luxury transition-all duration-500 rounded-2xl"
              >
                <CardContent className="p-8">                  <Badge color="primary" variant="outline" className="mb-4 border-plum/40 text-plum bg-white/60 backdrop-blur-sm">
                    {report.type}
                  </Badge>
                  <h3 className="text-xl font-display font-bold mb-3 leading-tight text-charcoal">
                    {report.title}
                  </h3>
                  <div className="flex items-center gap-2 text-charcoal/70 mb-6">
                    <Calendar size={16} />
                    <span className="font-medium">Expected: {report.expectedDate}</span>
                  </div>
                  <p className="text-charcoal/80 leading-relaxed font-medium">
                    {report.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 bg-gradient-luxury-dark">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-luxury text-white text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Stay Ahead of Market Trends
            </h2>
            <p className="text-xl mb-12 text-white/90 leading-relaxed max-w-3xl mx-auto">
              Subscribe to receive our latest market reports, quarterly updates, and exclusive insights delivered directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button 
                to="/newsletter"
                variant="primary"
                size="lg"
                icon={<ArrowRight size={20} />}
                iconPosition="right"
                className="text-lg px-8 py-4"
              >
                Subscribe for Free Reports
              </Button>
              
              <Button 
                to="/contact"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 text-lg px-8 py-4"
              >
                Request Custom Research
              </Button>
            </div>
          </div>        </div>
      </section>
    </div>
  );
};

export default MarketReportsPage;

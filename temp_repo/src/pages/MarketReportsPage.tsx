import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Calendar, TrendingUp, BarChart3, FileText, Search } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { MarketReport, ContentFilters } from '../types/MarketReport';
import { PropertyTypeFilter } from '../components/ui/PropertyTypeFilter';
import { PropertyTypeBadge } from '../components/ui/PropertyTypeBadge';
import { TickerBox } from '../components/home/TickerBox';
import { useMarketReports } from '../hooks/useMarketReports';

const marketMetrics = [
  {
    title: "Average Cap Rates",
    data: [
      { asset: "Self-Storage", rate: "5.2%", trend: "down" },
      { asset: "MH Communities", rate: "4.8%", trend: "stable" },
      { asset: "RV Parks", rate: "5.5%", trend: "up" }
    ]
  },
  {
    title: "Transaction Volume (YTD)",
    data: [
      { asset: "Self-Storage", volume: "$721M", change: "-15%" },
      { asset: "MH Communities", volume: "$304M", change: "-22%" },
      { asset: "RV Parks", volume: "$156M", change: "-18%" }
    ]
  }
];

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
  });
  return (
    <div className="flex flex-col min-h-screen bg-luxury-dark">
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
      </section>

      {/* Market Metrics Dashboard */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <h2 className="heading-luxury text-luxury-dark text-4xl md:text-5xl font-bold mb-16 text-center leading-tight">
            Current Market Snapshot
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {marketMetrics.map((metric, index) => (
              <Card 
                key={index}
                className="bg-gradient-subtle backdrop-blur-sm border border-luxury-light/20 hover:bg-white/80 transition-all duration-300"
              >
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-luxury-dark">
                    <BarChart3 size={28} className="text-luxury-primary" />
                    {metric.title}
                  </h3>
                  <div className="space-y-4">
                    {metric.data.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between py-3 border-b border-luxury-light/20 last:border-b-0">
                        <span className="font-medium text-lg text-luxury-dark">{item.asset}</span>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-xl text-luxury-primary">
                            {'rate' in item ? item.rate : item.volume}
                          </span>
                          {('trend' in item && item.trend) && (
                            <TrendingUp 
                              size={20} 
                              className={`
                                ${item.trend === 'up' ? 'text-green-500 rotate-0' : ''}
                                ${item.trend === 'down' ? 'text-red-500 rotate-180' : ''}
                                ${item.trend === 'stable' ? 'text-gray-500 rotate-90' : ''}
                              `}
                            />
                          )}
                          {('change' in item && item.change) && (
                            <span className={`font-medium ${item.change.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>
                              {item.change}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Market Rate Ticker */}
      <TickerBox />      {/* Filter and Search */}
      <section className="py-8 bg-luxury-dark/95 backdrop-blur-sm sticky top-20 z-30 border-b border-white/10">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
              <input
                type="text"
                placeholder="Search reports..."
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-luxury-accent focus:border-transparent backdrop-blur-sm"
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
      </section>

      {/* Market Reports Grid */}
      <section className="py-24 bg-luxury-dark">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <h2 className="heading-luxury text-white text-4xl md:text-5xl font-bold leading-tight">
              Market Reports
            </h2>
            <div className="text-white/60 text-lg">
              {filteredReports.length} report{filteredReports.length !== 1 ? 's' : ''} found
            </div>
          </div>

          {loading && (
            <div className="text-center py-16">
              <p className="text-xl text-white/60">Loading market reports...</p>
            </div>
          )}
          
          {error && (
            <div className="text-center py-16">
              <p className="text-xl text-red-400">Error loading reports: {error}</p>
            </div>
          )}          
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredReports.map((report: any, index: number) => (
                <Link 
                  key={report.id || index}
                  to={`/market-reports/${report.slug}`}
                  className="block"
                >
                  <Card className="overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300 h-full">
                    <div className="relative h-48">
                      <img 
                        src={report.image_url || '/assets/property-types/self-storage-facility-investment.webp'}
                        alt={report.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge 
                          color="primary"
                          variant="gradient"
                        >
                          Report
                        </Badge>
                      </div>
                      {report.is_premium && (
                        <div className="absolute top-4 right-4">
                          <Badge color="warning" variant="gradient">
                            Premium
                          </Badge>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-8">
                      <div className="flex items-center gap-2 text-white/60 mb-4">
                        <Calendar size={16} />
                        <span className="text-sm">{new Date(report.published_at).toLocaleDateString()}</span>
                        {report.reading_time && (
                          <>
                            <span>•</span>
                            <FileText size={16} />
                            <span className="text-sm">{report.reading_time} min read</span>
                          </>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-bold mb-4 leading-tight text-white">
                        {report.title}
                      </h3>

                      <div className="flex items-center gap-2 mb-4">
                        <Badge color="secondary" variant="outline" className="border-white/40 text-white">
                          Market Report
                        </Badge>
                        <PropertyTypeBadge 
                          propertyType={report.property_types}
                        />
                      </div>

                      <div className="text-white/80 mb-6 prose prose-sm max-w-none line-clamp-3">
                        <ReactMarkdown>{report.summary?.replace(/\\n/g, '\n') || ''}</ReactMarkdown>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-white/60">
                          By {report.authors?.name || 'Unknown Author'}
                        </div>
                        <div className="px-4 py-2 border border-luxury-accent text-luxury-accent rounded-lg text-sm font-medium hover:bg-luxury-accent hover:text-white transition-colors">
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
              <FileText size={60} className="text-white/40 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">
                No reports found
              </h3>
              <p className="text-white/60 text-lg">
                Try adjusting your filters or search terms.
              </p>
            </div>
          )}
        </div>
      </section>      {/* Upcoming Reports */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <h2 className="heading-luxury text-luxury-dark text-4xl md:text-5xl font-bold mb-16 text-center leading-tight">
            Upcoming Reports
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingReports.map((report, index) => (
              <Card 
                key={index}
                className="bg-gradient-subtle backdrop-blur-sm border border-luxury-light/20 hover:bg-white/80 transition-all duration-300"
              >
                <CardContent className="p-8">
                  <Badge color="primary" variant="outline" className="mb-4">
                    {report.type}
                  </Badge>
                  <h3 className="text-xl font-bold mb-3 leading-tight text-luxury-dark">
                    {report.title}
                  </h3>
                  <div className="flex items-center gap-2 text-luxury-dark/70 mb-6">
                    <Calendar size={16} />
                    <span>Expected: {report.expectedDate}</span>
                  </div>
                  <p className="text-luxury-dark/80 leading-relaxed">
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
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-24 bg-luxury-dark">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <Button 
              to="/insights"
              variant="outline"
              className="text-center py-8 border-white/60 text-white hover:bg-white/20 hover:border-white text-lg"
            >
              📊 Market Insights
            </Button>
            <Button 
              to="/manufactured-housing"
              variant="outline"
              className="text-center py-8 border-white/60 text-white hover:bg-white/20 hover:border-white text-lg"
            >
              🏘 Manufactured Housing
            </Button>
            <Button 
              to="/rv-parks"
              variant="outline"
              className="text-center py-8 border-white/60 text-white hover:bg-white/20 hover:border-white text-lg"
            >
              🚐 RV Parks
            </Button>
            <Button 
              to="/self-storage"
              variant="outline"
              className="text-center py-8 border-white/60 text-white hover:bg-white/20 hover:border-white text-lg"
            >
              📦 Self-Storage
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MarketReportsPage;

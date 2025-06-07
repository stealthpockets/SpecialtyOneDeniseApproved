import React, { useState } from 'react';
import { ArrowRight, Download, Calendar, TrendingUp, BarChart3, FileText, Filter, Search } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

interface MarketReport {
  title: string;
  type: 'Quarterly' | 'Annual' | 'Special' | 'Market Update';
  propertyType: 'Manufactured Housing' | 'RV Parks' | 'Self-Storage' | 'Multi-Asset';
  date: string;
  quarter?: string;
  year: number;
  description: string;
  keyInsights: string[];
  downloadUrl?: string;
  isPremium?: boolean;
  image: string;
  pages?: number;
}

const marketReports: MarketReport[] = [
  {
    title: "Arizona Self-Storage Market Report",
    type: "Quarterly",
    propertyType: "Self-Storage",
    date: "Q4 2024",
    quarter: "Q4",
    year: 2024,
    description: "Comprehensive analysis of Arizona's self-storage market including cap rates, occupancy trends, and new supply pipeline.",
    keyInsights: [
      "Average cap rates compressed to 5.2% in Phoenix MSA",
      "Climate-controlled units commanding 40% rent premiums",
      "New supply pipeline down 15% from 2023 levels"
    ],
    image: "/dist/assets/property-types/self-storage-facility-investment.webp",
    pages: 24,
    isPremium: false
  },
  {
    title: "Manufactured Housing Investment Outlook",
    type: "Annual",
    propertyType: "Manufactured Housing",
    date: "2024",
    year: 2024,
    description: "Annual outlook covering regulatory changes, financing trends, and investment opportunities in the manufactured housing sector.",
    keyInsights: [
      "Institutional ownership increased 23% year-over-year",
      "Average community size trending larger (150+ sites)",
      "Rent control legislation impacting 3 key markets"
    ],
    image: "/dist/assets/property-types/manufactured-housing-community-investment.webp",
    pages: 36,
    isPremium: true
  },
  {
    title: "RV Park & Outdoor Hospitality Trends",
    type: "Special",
    propertyType: "RV Parks",
    date: "November 2024",
    year: 2024,
    description: "Special report on the evolving RV park landscape, including glamping integration and seasonal vs. long-term strategies.",
    keyInsights: [
      "Glamping revenue averaging $180/night vs $45 for standard sites",
      "Long-term sites (6+ months) showing 95%+ occupancy",
      "Solar installations ROI improving to 7-9 years"
    ],
    image: "/dist/assets/property-types/rv-park-investment-opportunity.webp",
    pages: 18,
    isPremium: false
  },
  {
    title: "Southwest Alternative Assets Overview",
    type: "Quarterly",
    propertyType: "Multi-Asset",
    date: "Q3 2024",
    quarter: "Q3",
    year: 2024,
    description: "Cross-asset analysis of MH, RV, and storage performance across Arizona, Nevada, and New Mexico markets.",
    keyInsights: [
      "Storage leading performance with 6.8% average returns",
      "MH communities showing strongest rent growth at 4.2%",
      "RV parks benefiting from remote work trends"
    ],
    image: "/dist/assets/property-types/manufactured-housing-community-investment.webp",
    pages: 28,
    isPremium: true
  },
  {
    title: "Interest Rate Impact Analysis",
    type: "Market Update",
    propertyType: "Multi-Asset",
    date: "October 2024",
    year: 2024,
    description: "Analysis of how rising interest rates are affecting transaction volume and pricing across our target asset classes.",
    keyInsights: [
      "Transaction volume down 35% but pricing holding steady",
      "Cash buyers increasing market share to 45%",
      "1031 exchanges driving 60% of MH transactions"
    ],
    image: "/dist/assets/property-types/self-storage-facility-investment.webp",
    pages: 12,
    isPremium: false
  },
  {
    title: "Climate-Controlled Storage Deep Dive",
    type: "Special",
    propertyType: "Self-Storage",
    date: "September 2024",
    year: 2024,
    description: "Detailed analysis of climate-controlled storage demand, pricing strategies, and conversion opportunities.",
    keyInsights: [
      "Climate-controlled units achieve 92% average occupancy",
      "Conversion costs averaging $15-20 per sq ft",
      "Premium pricing sustainable at 35-50% above standard"
    ],
    image: "/dist/assets/property-types/self-storage-facility-investment.webp",
    pages: 22,
    isPremium: true
  }
];

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
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>('All');
  const [selectedReportType, setSelectedReportType] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const propertyTypes = ['All', 'Manufactured Housing', 'RV Parks', 'Self-Storage', 'Multi-Asset'];
  const reportTypes = ['All', 'Quarterly', 'Annual', 'Special', 'Market Update'];

  const filteredReports = marketReports.filter(report => {
    const matchesPropertyType = selectedPropertyType === 'All' || report.propertyType === selectedPropertyType;
    const matchesReportType = selectedReportType === 'All' || report.type === selectedReportType;
    const matchesSearch = searchTerm === '' || 
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesPropertyType && matchesReportType && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
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
                className="bg-white text-plum hover:bg-cloud"
                size="lg"
                icon={<Download size={20} />}
                iconPosition="right"
              >
                Subscribe for Reports
              </Button>
            </div>
            <p className="text-sm mt-4 opacity-75 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              Get quarterly reports and market updates delivered to your inbox.
            </p>
          </div>
        </div>
      </section>

      {/* Market Metrics Dashboard */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
            Current Market Snapshot
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {marketMetrics.map((metric, index) => (
              <Card 
                key={index}
                className="animate-fade-in"
                style={{ animationDelay: `${0.2 * index}s` }}
              >
                <CardContent className="p-6">
                  <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                    <BarChart3 size={24} className="text-plum" />
                    {metric.title}
                  </h3>
                  <div className="space-y-3">
                    {metric.data.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="font-medium">{item.asset}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-lg">
                            {'rate' in item ? item.rate : item.volume}
                          </span>
                          {('trend' in item && item.trend) && (
                            <TrendingUp 
                              size={16} 
                              className={`
                                ${item.trend === 'up' ? 'text-green-500 rotate-0' : ''}
                                ${item.trend === 'down' ? 'text-red-500 rotate-180' : ''}
                                ${item.trend === 'stable' ? 'text-gray-500 rotate-90' : ''}
                              `}
                            />
                          )}
                          {('change' in item && item.change) && (
                            <span className={`text-sm ${item.change.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>
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

      {/* Filter and Search */}
      <section className="py-8 bg-cloud sticky top-20 z-30 border-b border-gray-200">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search reports..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <select 
                  className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-4 pr-10 text-gray-700 cursor-pointer hover:border-plum focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                  value={selectedPropertyType}
                  onChange={(e) => setSelectedPropertyType(e.target.value)}
                >
                  {propertyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>

              <div className="relative">
                <select 
                  className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-4 pr-10 text-gray-700 cursor-pointer hover:border-plum focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                  value={selectedReportType}
                  onChange={(e) => setSelectedReportType(e.target.value)}
                >
                  {reportTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Reports Grid */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Market Reports
            </h2>
            <div className="text-gray-600">
              {filteredReports.length} report{filteredReports.length !== 1 ? 's' : ''} found
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredReports.map((report, index) => (
              <Card 
                key={index}
                className="overflow-hidden animate-fade-in"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="relative h-48">
                  <img 
                    src={report.image}
                    alt={report.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge 
                      color={report.type === 'Annual' ? 'primary' : report.type === 'Special' ? 'secondary' : 'success'} 
                      variant="gradient"
                    >
                      {report.type}
                    </Badge>
                  </div>
                  {report.isPremium && (
                    <div className="absolute top-4 right-4">
                      <Badge color="warning" variant="gradient">
                        Premium
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <Calendar size={16} />
                    <span>{report.date}</span>
                    {report.pages && (
                      <>
                        <span>•</span>
                        <FileText size={16} />
                        <span>{report.pages} pages</span>
                      </>
                    )}
                  </div>

                  <h3 className="font-display text-xl font-bold mb-3">
                    {report.title}
                  </h3>

                  <Badge color="secondary" variant="outline" className="mb-3">
                    {report.propertyType}
                  </Badge>

                  <p className="text-gray-600 mb-4">
                    {report.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-medium mb-2">Key Insights:</h4>
                    <ul className="space-y-1">
                      {report.keyInsights.slice(0, 2).map((insight, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="text-sage mt-1">•</span>
                          <span>{insight}</span>
                        </li>
                      ))}
                      {report.keyInsights.length > 2 && (
                        <li className="text-sm text-gray-500 italic">
                          +{report.keyInsights.length - 2} more insights
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="primary"
                      size="sm"
                      className="flex-1"
                      icon={<Download size={16} />}
                      iconPosition="right"
                    >
                      {report.isPremium ? 'Request Access' : 'Download'}
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                    >
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredReports.length === 0 && (
            <div className="text-center py-12">
              <FileText size={48} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">
                No reports found
              </h3>
              <p className="text-gray-500">
                Try adjusting your filters or search terms.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Upcoming Reports */}
      <section className="py-16 bg-cloud">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
            Upcoming Reports
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingReports.map((report, index) => (
              <Card 
                key={index}
                className="animate-fade-in"
                style={{ animationDelay: `${0.2 * index}s` }}
              >
                <CardContent className="p-6">
                  <Badge color="primary" variant="outline" className="mb-3">
                    {report.type}
                  </Badge>
                  <h3 className="font-display text-xl font-bold mb-2">
                    {report.title}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <Calendar size={16} />
                    <span>Expected: {report.expectedDate}</span>
                  </div>
                  <p className="text-gray-600">
                    {report.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-br from-obsidian to-amethyst text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Stay Ahead of Market Trends
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Subscribe to receive our latest market reports, quarterly updates, and exclusive insights delivered directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                to="/newsletter"
                variant="primary"
                size="lg"
                className="bg-white text-plum hover:bg-cloud"
                icon={<ArrowRight size={20} />}
                iconPosition="right"
              >
                Subscribe for Free Reports
              </Button>
              
              <Button 
                to="/contact"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                Request Custom Research
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Button 
              to="/insights"
              variant="outline"
              className="text-center py-6"
            >
              📊 Market Insights
            </Button>
            <Button 
              to="/manufactured-housing"
              variant="outline"
              className="text-center py-6"
            >
              🏘 Manufactured Housing
            </Button>
            <Button 
              to="/rv-parks"
              variant="outline"
              className="text-center py-6"
            >
              🚐 RV Parks
            </Button>
            <Button 
              to="/self-storage"
              variant="outline"
              className="text-center py-6"
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
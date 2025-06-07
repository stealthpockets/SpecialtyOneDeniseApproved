import React, { useState } from 'react';
import { Lock, Shield, Eye, Users, CheckCircle, ArrowRight, Building2, TrendingUp, Clock, Star } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

const networkBenefits = [
  {
    icon: <Lock size={32} className="text-white" />,
    title: 'Off-Market Access',
    description: 'See deals 30-60 days before they hit LoopNet or public markets. Many never go public at all.',
    details: ['NDA-protected listings', 'Seller-direct opportunities', 'Pocket listings from our network']
  },
  {
    icon: <Shield size={32} className="text-white" />,
    title: 'Pre-Qualified Opportunities',
    description: 'Every deal is underwritten and vetted before it reaches your inbox. No time wasters.',
    details: ['Financial verification completed', 'Title and zoning cleared', 'Operational issues identified']
  },
  {
    icon: <Users size={32} className="text-white" />,
    title: 'Curated Buyer Pool',
    description: 'Join a select group of serious investors, family offices, and institutional buyers.',
    details: ['Vetted financial capacity', 'Proven track record required', 'Long-term relationship focus']
  },
  {
    icon: <Eye size={32} className="text-white" />,
    title: 'Market Intelligence',
    description: 'Get insights on pricing trends, buyer behavior, and market timing before making moves.',
    details: ['Quarterly market reports', 'Deal flow analytics', 'Pricing guidance']
  }
];

const recentDeals = [
  {
    title: 'Desert Oasis MHC',
    location: 'Phoenix, AZ',
    type: 'Manufactured Housing',
    size: '124 Sites',
    status: 'Sold Off-Market',
    timeToSale: '18 Days',
    description: 'Premium community with expansion potential. Sold to network buyer before public marketing.',
    image: '/dist/assets/property-types/manufactured-housing-community-investment.webp'
  },
  {
    title: 'Confidential Storage Facility',
    location: 'Scottsdale, AZ',
    type: 'Self-Storage',
    size: '85,000 SF',
    status: 'Sold Off-Market',
    timeToSale: '12 Days',
    description: 'Climate-controlled facility with below-market rents. Institutional buyer acquisition.',
    image: '/dist/assets/property-types/self-storage-facility-investment.webp'
  },
  {
    title: 'Mountain View RV Resort',
    location: 'Tucson, AZ',
    type: 'RV Park',
    size: '200 Sites',
    status: 'Sold Off-Market',
    timeToSale: '25 Days',
    description: 'Seasonal resort with glamping expansion. Family office acquisition.',
    image: '/dist/assets/property-types/rv-park-investment-opportunity.webp'
  }
];

const buyerTypes = [
  {
    icon: '🏢',
    title: 'Institutional Investors',
    description: 'REITs, pension funds, and institutional capital seeking scale and stability.',
    criteria: ['$10M+ transaction capacity', 'Portfolio approach', 'Long-term hold strategy']
  },
  {
    icon: '👨‍👩‍👧‍👦',
    title: 'Family Offices',
    description: 'High-net-worth families building generational wealth through real estate.',
    criteria: ['$5M+ individual deals', 'Multi-generational planning', 'Tax-efficient structures']
  },
  {
    icon: '🔄',
    title: '1031 Exchange Buyers',
    description: 'Investors seeking like-kind exchanges with tight timelines and specific requirements.',
    criteria: ['Qualified intermediary ready', '180-day timeline', 'Replacement property criteria']
  },
  {
    icon: '⚡',
    title: 'Value-Add Operators',
    description: 'Experienced operators looking for properties with operational upside potential.',
    criteria: ['Operational expertise', 'Capital improvement ready', 'Market knowledge']
  }
];

const applicationRequirements = [
  {
    icon: <Building2 size={24} className="text-plum" />,
    title: 'Investment Experience',
    description: 'Demonstrated experience in commercial real estate or our target asset classes.'
  },
  {
    icon: <TrendingUp size={24} className="text-plum" />,
    title: 'Financial Capacity',
    description: 'Verified ability to close transactions in your stated investment range.'
  },
  {
    icon: <Clock size={24} className="text-plum" />,
    title: 'Decision Timeline',
    description: 'Ability to evaluate and make decisions on opportunities within 48-72 hours.'
  },
  {
    icon: <Star size={24} className="text-plum" />,
    title: 'Professional References',
    description: 'References from previous brokers, lenders, or transaction partners.'
  }
];

const testimonials = [
  {
    quote: "The off-market deal flow from Specialty One has been exceptional. We've acquired three properties through their network that never would have been available publicly.",
    author: "Michael Chen",
    title: "Principal",
    company: "Desert Capital Partners",
    dealCount: "3 acquisitions"
  },
  {
    quote: "Their buyer network gave us first access to exactly the type of storage facility we were seeking. The deal was clean, the process was professional.",
    author: "Sarah Rodriguez",
    title: "Investment Director",
    company: "Southwest Storage Fund",
    dealCount: "2 acquisitions"
  },
  {
    quote: "As a 1031 buyer, timing is everything. Specialty One's network provided multiple qualified options within our exchange timeline.",
    author: "David Kim",
    title: "Managing Partner",
    company: "Phoenix Real Estate Group",
    dealCount: "1 exchange completed"
  }
];

const ExclusiveBuyerNetworkPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    title: '',
    investmentRange: '',
    propertyTypes: [] as string[],
    markets: '',
    timeline: '',
    experience: '',
    references: '',
    additionalInfo: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      propertyTypes: prev.propertyTypes.includes(value)
        ? prev.propertyTypes.filter(type => type !== value)
        : [...prev.propertyTypes, value]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Application submitted:', formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col min-h-screen">
        <section className="pt-32 pb-20 bg-gradient-hero text-white flex-grow flex items-center">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} className="text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Application Received
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Thank you for your interest in our Exclusive Buyer Network. 
                We'll review your application and respond within 48 hours.
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
                <h3 className="font-bold text-lg mb-2">What Happens Next?</h3>
                <div className="text-left space-y-2">
                  <p>✓ Application review within 48 hours</p>
                  <p>✓ Reference verification (if applicable)</p>
                  <p>✓ Welcome packet with current opportunities</p>
                  <p>✓ Direct access to our deal flow</p>
                </div>
              </div>
              <Button 
                to="/"
                variant="primary"
                className="bg-white text-plum hover:bg-cloud"
                size="lg"
              >
                Return Home
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-hero text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center text-sand">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              The Best Deals Never Hit
              <span className="block">the Open Market</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Join our exclusive network of serious buyers and get first access to 
              off-market opportunities in Manufactured Housing, RV Parks, and Self-Storage.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="font-bold text-2xl">$1B+</div>
                  <div className="text-sm opacity-90">Network Transaction Volume</div>
                </div>
                <div>
                  <div className="font-bold text-2xl">48hrs</div>
                  <div className="text-sm opacity-90">Average Response Time</div>
                </div>
                <div>
                  <div className="font-bold text-2xl">85%</div>
                  <div className="text-sm opacity-90">Off-Market Deal Flow</div>
                </div>
              </div>
            </div>
            <Button 
              href="#application"
              variant="primary"
              className="bg-white text-plum hover:bg-cloud"
              size="lg"
            >
              Apply for Access
            </Button>
            <p className="text-sm mt-4 opacity-75 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              Invitation only. Serious buyers with proven track records.
            </p>
          </div>
        </div>
      </section>

      {/* Network Benefits */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
            Why Join Our Network?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {networkBenefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex gap-6 animate-fade-in"
                style={{ animationDelay: `${0.2 * index}s` }}
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-plum to-amethyst flex items-center justify-center">
                    {benefit.icon}
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {benefit.description}
                  </p>
                  <ul className="space-y-1">
                    {benefit.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-600">
                        <CheckCircle size={16} className="text-sage mt-1 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Off-Market Deals */}
      <section className="py-16 bg-cloud">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
            Recent Off-Market Successes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentDeals.map((deal, index) => (
              <Card 
                key={index}
                className="overflow-hidden animate-fade-in"
                style={{ animationDelay: `${0.2 * index}s` }}
              >
                <div className="relative h-48">
                  <img 
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge color="success" variant="gradient">
                      {deal.status}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge color="primary" variant="gradient">
                      {deal.timeToSale}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="font-display text-xl font-bold mb-2">
                    {deal.title}
                  </h3>
                  <div className="flex items-center gap-4 text-gray-600 mb-3">
                    <span>{deal.location}</span>
                    <span>•</span>
                    <span>{deal.size}</span>
                  </div>
                  <Badge color="secondary" variant="outline" className="mb-3">
                    {deal.type}
                  </Badge>
                  <p className="text-gray-600">
                    {deal.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              These deals were available exclusively to our network members.
            </p>
            <Button 
              href="#application"
              variant="primary"
            >
              Join to See Current Opportunities
            </Button>
          </div>
        </div>
      </section>

      {/* Buyer Types */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
            Who We Work With
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {buyerTypes.map((type, index) => (
              <Card 
                key={index}
                className="text-center py-8 animate-fade-in"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <CardContent>
                  <div className="text-4xl mb-4">
                    {type.icon}
                  </div>
                  <h3 className="font-bold mb-3">
                    {type.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {type.description}
                  </p>
                  <div className="space-y-1">
                    {type.criteria.map((criterion, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle size={14} className="text-sage mt-1 flex-shrink-0" />
                        <span>{criterion}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-cloud">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
            What Network Members Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg p-8 animate-fade-in"
                style={{ animationDelay: `${0.2 * index}s` }}
              >
                <div className="text-5xl text-plum opacity-20 mb-4">"</div>
                <blockquote className="text-lg font-medium mb-6">
                  {testimonial.quote}
                </blockquote>
                <div>
                  <p className="font-bold">
                    {testimonial.author}
                  </p>
                  <p className="text-gray-600">
                    {testimonial.title}, {testimonial.company}
                  </p>
                  <p className="text-sm text-plum font-medium mt-1">
                    {testimonial.dealCount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Requirements */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
            Application Requirements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {applicationRequirements.map((requirement, index) => (
              <div 
                key={index}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="w-16 h-16 rounded-full bg-cloud flex items-center justify-center mx-auto mb-4">
                  {requirement.icon}
                </div>
                <h3 className="font-bold mb-3">
                  {requirement.title}
                </h3>
                <p className="text-gray-600">
                  {requirement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application" className="py-16 bg-cloud">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Apply for Network Access
              </h2>
              <p className="text-lg text-gray-700">
                Complete the application below. We review all submissions within 48 hours.
              </p>
            </div>

            <Card>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="font-bold text-xl mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div>
                    <h3 className="font-bold text-xl mb-4">Professional Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                          Company/Organization *
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          required
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                          Title/Position *
                        </label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          required
                          value={formData.title}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Investment Criteria */}
                  <div>
                    <h3 className="font-bold text-xl mb-4">Investment Criteria</h3>
                    
                    <div className="mb-4">
                      <label htmlFor="investmentRange" className="block text-sm font-medium text-gray-700 mb-2">
                        Investment Range *
                      </label>
                      <select
                        id="investmentRange"
                        name="investmentRange"
                        required
                        value={formData.investmentRange}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                      >
                        <option value="">Select Investment Range</option>
                        <option value="1-5M">$1M - $5M</option>
                        <option value="5-10M">$5M - $10M</option>
                        <option value="10-25M">$10M - $25M</option>
                        <option value="25M+">$25M+</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Property Types of Interest * (Select all that apply)
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {['Manufactured Housing', 'RV Parks', 'Self-Storage'].map((type) => (
                          <label key={type} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.propertyTypes.includes(type)}
                              onChange={() => handleCheckboxChange(type)}
                              className="mr-2"
                            />
                            {type}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="markets" className="block text-sm font-medium text-gray-700 mb-2">
                          Target Markets
                        </label>
                        <input
                          type="text"
                          id="markets"
                          name="markets"
                          value={formData.markets}
                          onChange={handleInputChange}
                          placeholder="e.g., Arizona, Nevada, Southwest"
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
                          Investment Timeline *
                        </label>
                        <select
                          id="timeline"
                          name="timeline"
                          required
                          value={formData.timeline}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                        >
                          <option value="">Select Timeline</option>
                          <option value="immediate">Immediate (0-3 months)</option>
                          <option value="short-term">Short-term (3-6 months)</option>
                          <option value="medium-term">Medium-term (6-12 months)</option>
                          <option value="long-term">Long-term (12+ months)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Experience and References */}
                  <div>
                    <h3 className="font-bold text-xl mb-4">Experience & References</h3>
                    
                    <div className="mb-4">
                      <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                        Investment Experience *
                      </label>
                      <textarea
                        id="experience"
                        name="experience"
                        required
                        rows={4}
                        value={formData.experience}
                        onChange={handleInputChange}
                        placeholder="Describe your commercial real estate investment experience, including property types, transaction volume, and years of experience..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="references" className="block text-sm font-medium text-gray-700 mb-2">
                        Professional References
                      </label>
                      <textarea
                        id="references"
                        name="references"
                        rows={3}
                        value={formData.references}
                        onChange={handleInputChange}
                        placeholder="Please provide contact information for 2-3 professional references (brokers, lenders, attorneys, etc.)..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Information
                      </label>
                      <textarea
                        id="additionalInfo"
                        name="additionalInfo"
                        rows={3}
                        value={formData.additionalInfo}
                        onChange={handleInputChange}
                        placeholder="Any additional information that would help us understand your investment goals and requirements..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <div className="bg-cloud rounded-lg p-4 mb-6">
                      <h4 className="font-medium mb-2">Application Review Process</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Applications are reviewed within 48 hours</li>
                        <li>• We may contact your references as part of our verification process</li>
                        <li>• Approved members receive immediate access to current opportunities</li>
                        <li>• Network membership is complimentary for qualified buyers</li>
                      </ul>
                    </div>

                    <Button 
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      icon={<ArrowRight size={20} />}
                      iconPosition="right"
                    >
                      Submit Application
                    </Button>

                    <p className="text-sm text-gray-600 text-center mt-4">
                      By submitting this application, you agree to our confidentiality terms and 
                      understand that network membership is subject to approval.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-br from-obsidian to-amethyst text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Questions About Network Membership?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Speak directly with our team about network benefits, current opportunities, 
              and the application process.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                href="tel:602-730-9967"
                variant="primary"
                size="lg"
                className="bg-white text-plum hover:bg-cloud"
              >
                Call: 602-730-9967
              </Button>
              
              <Button 
                to="/contact"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExclusiveBuyerNetworkPage;
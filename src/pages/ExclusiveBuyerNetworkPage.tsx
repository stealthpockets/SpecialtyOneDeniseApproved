import React, { useState, useMemo, useEffect } from 'react'; // Added useMemo
import { Lock, Shield, Eye, Users, CheckCircle, ArrowRight, Building2, TrendingUp, Clock, Star, MapPin, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { SEOHead } from '../components/ui/SEOHead';
import { CloudinaryImage } from '../components/ui/CloudinaryImage';
import { useCaseStudies } from '../hooks/useCaseStudies';
import { CaseStudy } from '../types/caseStudy';
import { FormValidator, RateLimiter, SecurityEnforcer, ValidationError } from '../utils/formValidation';
import { submitBuyerApplication, type BuyerApplicationData } from '../lib/formService';

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
    quote: "Andrew Warner at Specialty One has been instrumental in helping me find the right properties for my portfolio. His expertise in identifying off-market and private sale opportunities that other brokers often miss has been invaluable. These exclusive deals have given me a significant advantage, allowing me to secure properties without the competition of a public listing. Andrew’s precision in presenting accurate information and his ability to facilitate seamless transactions ensure that every deal is handled efficiently and professionally. If you’re looking for a broker who can bring you exceptional deals and unique opportunities, I highly recommend Andrew Warner. Joining the Exclusive Buyer Network is a smart move for any buyer seeking an edge in the market.",
    author: "George Han",
    company: "Three Pillar Communities",
    // property: "Multiple Off-Market Acquisitions", // Optional: You can add a property or outcome if desired
    // outcome: "Significant Portfolio Growth" // Optional
  }
];

const faqs = [
  {
    question: "What is the Exclusive Buyer Network?",
    answer: "The Exclusive Buyer Network is a private community for serious real estate investors. Members gain access to off-market deals, pre-qualified opportunities, and exclusive market insights."
  },
  {
    question: "How do I qualify for the network?",
    answer: "Qualification is based on your investment experience, financial capacity, and alignment with our target buyer profiles. We review applications on a case-by-case basis."
  },
  {
    question: "What types of properties are available through the network?",
    answer: "We specialize in off-market opportunities in Manufactured Housing, RV Parks, and Self-Storage. Properties range from value-add opportunities to stabilized assets."
  },
  {
    question: "How do I apply?",
    answer: "Click the 'Apply for Access' button on our website, complete the application form, and submit. We will review your application and respond within 48 hours."
  }
];

const ExclusiveBuyerNetworkPage = () => {  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
    title: '',
    investment_range: '',
    property_types: [] as string[],
    markets: '',
    timeline: '',
    experience: '',
    references: '',
    additional_info: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [submitError, setSubmitError] = useState<string>('');

  // Enforce HTTPS on component mount
  useEffect(() => {
    SecurityEnforcer.enforceHTTPS();
  }, []);

  // Memoize the filters object to prevent re-renders in useCaseStudies
  const recentDealsFilters = useMemo(() => ({ isConfidential: true }), []); 
  // The empty dependency array [] means recentDealsFilters is created once

  const { caseStudies: recentDeals, loading: recentDealsLoading, error: recentDealsError } = useCaseStudies(recentDealsFilters);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Clear validation errors for this field
    setValidationErrors(prev => prev.filter(error => error.field !== name));
    setSubmitError('');
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleCheckboxChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      property_types: prev.property_types.includes(value)
        ? prev.property_types.filter(type => type !== value)
        : [...prev.property_types, value]
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setValidationErrors([]);
    setSubmitError('');

    try {
      // Check rate limiting
      const rateLimitCheck = RateLimiter.canSubmit();
      if (!rateLimitCheck.allowed) {
        setSubmitError(rateLimitCheck.message || 'Too many submissions');
        return;
      }      // Validate form data - create extended validation for buyer network
      const validation = FormValidator.validateContactForm({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        message: formData.additional_info || 'Buyer network application'
      });

      // Additional validation for buyer-specific fields
      if (!formData.title.trim()) {
        validation.errors.push({ field: 'title', message: 'Title/Position is required' });
        validation.isValid = false;
      }

      if (!formData.investment_range) {
        validation.errors.push({ field: 'investment_range', message: 'Investment range is required' });
        validation.isValid = false;
      }

      if (!validation.isValid) {
        setValidationErrors(validation.errors);
        setSubmitError('Please correct the errors below');
        return;
      }

      // Check if we're in a secure context
      if (!SecurityEnforcer.isSecureContext()) {
        setSubmitError('This form requires a secure connection. Please ensure you\'re using HTTPS.');
        return;
      }

      // Submit to Supabase
      const buyerData: BuyerApplicationData = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        title: formData.title,
        investment_range: formData.investment_range,
        property_types: formData.property_types,
        markets: formData.markets,
        timeline: formData.timeline,
        experience: formData.experience,
        references: formData.references,
        additional_info: formData.additional_info
      };

      await submitBuyerApplication(buyerData);
      
      // Record submission for rate limiting
      RateLimiter.recordSubmission();
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError('An error occurred while submitting the application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldError = (fieldName: string): string | undefined => {
    return validationErrors.find(error => error.field === fieldName)?.message;
  };
  if (isSubmitted) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-sand via-cloud to-sand">
        <section className="pt-32 pb-20 bg-gradient-hero text-white flex-grow flex items-center relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-modern-hero opacity-80"></div>
          <div className="container-custom relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center mx-auto mb-8 shadow-luxury">
                <CheckCircle size={48} className="text-white" />
              </div>
              <h1 className="heading-luxury font-display text-4xl md:text-5xl font-bold mb-8 leading-tight">
                Application Received
              </h1>
              <p className="text-xl md:text-2xl mb-12 opacity-90 leading-relaxed font-medium">
                Thank you for your interest in our Exclusive Buyer Network. 
                We'll review your application and respond within 48 hours.
              </p>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-12 border border-white/20 shadow-luxury">
                <h3 className="font-bold text-xl mb-6 text-gradient-luxury">What Happens Next?</h3>
                <div className="text-left space-y-4">
                  <p className="flex items-center gap-3 font-medium"><CheckCircle size={20} className="text-green-300" /> Application review within 48 hours</p>
                  <p className="flex items-center gap-3 font-medium"><CheckCircle size={20} className="text-green-300" /> Reference verification (if applicable)</p>
                  <p className="flex items-center gap-3 font-medium"><CheckCircle size={20} className="text-green-300" /> Welcome packet with current opportunities</p>
                  <p className="flex items-center gap-3 font-medium"><CheckCircle size={20} className="text-green-300" /> Direct access to our deal flow</p>
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
        </section>      </div>
    );
  }
  return (
    <>
      <SEOHead
        title="Exclusive Buyer Network | Off-Market CRE Deals | Specialty One"
        description="Join our exclusive buyer network for first access to off-market manufactured housing, RV park, and self-storage opportunities. Pre-qualified deals, no public competition."
        keywords="off-market commercial real estate, exclusive buyer network, manufactured housing deals, RV park opportunities, self storage investments, private CRE listings"
        url="https://specialtyone.com/exclusive-buyers"
        image="/assets/property-types/manufactured-housing-community-investment.webp"
      />
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-sand via-cloud to-sand">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-modern-hero opacity-80"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center text-sand">
            <h1 className="heading-luxury font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-8 animate-fade-in leading-tight">
              The Best Deals Never Hit
              <span className="block text-gradient-luxury">the Open Market</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 opacity-90 animate-fade-in leading-relaxed font-medium" style={{ animationDelay: "0.2s" }}>
              Join our exclusive network of serious buyers and get first access to 
              off-market opportunities in Manufactured Housing, RV Parks, and Self-Storage.
            </p>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-12 border border-white/20 animate-fade-in shadow-luxury" style={{ animationDelay: "0.3s" }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="space-y-2">
                  <div className="font-bold text-3xl md:text-4xl text-gradient-luxury">$1B+</div>
                  <div className="text-sm lg:text-base opacity-90 font-medium">Network Transaction Volume</div>
                </div>
                <div className="space-y-2">
                  <div className="font-bold text-3xl md:text-4xl text-gradient-luxury">48hrs</div>
                  <div className="text-sm lg:text-base opacity-90 font-medium">Average Response Time</div>
                </div>
                <div className="space-y-2">
                  <div className="font-bold text-3xl md:text-4xl text-gradient-luxury">85%</div>
                  <div className="text-sm lg:text-base opacity-90 font-medium">Off-Market Deal Flow</div>
                </div>
              </div>
            </div>
            <Button 
              href="#application"
              variant="primary"
              size="lg"
              className="mb-6"
            >
              Apply for Access
            </Button>
            <p className="text-sm opacity-75 animate-fade-in font-medium" style={{ animationDelay: "0.4s" }}>
              Invitation only. Serious buyers with proven track records.
            </p>
          </div>
        </div>
      </section>      {/* Network Benefits */}
      <section className="py-24 bg-gradient-to-br from-sand via-cloud to-sand">
        <div className="container-custom">
          <h2 className="heading-luxury text-charcoal text-4xl md:text-5xl font-bold mb-16 text-center leading-tight">
            Why Join Our Network?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {networkBenefits.map((benefit, index) => (
              <Card 
                key={index}
                className="bg-white/80 backdrop-blur-lg border border-white/40 hover:bg-white/90 hover:shadow-luxury transition-all duration-500 rounded-2xl animate-fade-in"
                style={{ animationDelay: `${0.2 * index}s` }}
              >
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-plum to-amethyst flex items-center justify-center shadow-lg">
                      {benefit.icon}
                    </div>
                    <div className="flex-grow space-y-4">
                      <h3 className="text-2xl font-display font-bold text-charcoal">{benefit.title}</h3>
                      <p className="text-charcoal/80 leading-relaxed font-medium">{benefit.description}</p>
                      <ul className="space-y-3">
                        {benefit.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center space-x-3 text-charcoal/70">
                            <CheckCircle size={16} className="text-plum flex-shrink-0" />
                            <span className="font-medium">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>      {/* Recent Off-Market Deals */}
      <section className="py-24 bg-gradient-to-br from-cloud via-sand to-cloud">
        <div className="container-custom">
          <h2 className="heading-luxury text-charcoal text-4xl md:text-5xl font-bold mb-16 text-center leading-tight">
            Recent Off-Market Successes
          </h2>
          {recentDealsLoading && (
            <div className="text-center py-16">
              <p className="text-charcoal/60 text-lg">Loading recent deals...</p>
            </div>
          )}
          {recentDealsError && (
            <div className="text-center py-16">
              <p className="text-red-500 text-lg">Error loading deals: {recentDealsError}</p>
            </div>
          )}
          {!recentDealsLoading && !recentDealsError && recentDeals && recentDeals.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentDeals.map((deal: CaseStudy, index: number) => (
                <Card 
                  key={deal.id}
                  className="overflow-hidden bg-white/80 backdrop-blur-lg border border-white/40 hover:bg-white/90 hover:shadow-luxury transition-all duration-500 rounded-2xl animate-fade-in flex flex-col"
                  style={{ animationDelay: `${0.2 * index}s` }}
                >                  <div className="relative h-48">
                    <CloudinaryImage 
                      localPath={deal.heroImage || 'default-property.webp'}
                      alt={deal.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge color="primary" variant="gradient" className="shadow-md">
                        {deal.propertyType}
                      </Badge>
                    </div>
                     {/* Display "Sold Off-Market" and TimeToSale if available */}
                    <div className="absolute top-4 left-4 flex flex-col space-y-2">
                        <Badge color="success" variant="gradient" className="shadow-md">
                            Sold Off-Market
                        </Badge>
                        {deal.timeToSale && (
                            <Badge color="secondary" variant="gradient" className="shadow-md">
                                {deal.timeToSale}
                            </Badge>
                        )}
                    </div>
                  </div>
                  
                  <CardContent className="p-8 flex flex-col flex-grow">                    <div className="flex items-center gap-2 text-charcoal/60 mb-4">
                      <MapPin size={16} />
                      <span className="font-medium">{deal.location}</span>
                    </div>
                    
                    <h3 className="text-xl font-display font-bold mb-4 text-charcoal">
                      {deal.title}
                    </h3>
                    
                    <div className="mb-6 flex-grow">
                      {deal.challenge && (
                        <p className="text-charcoal/70 mb-3 leading-relaxed">
                          <strong className="text-charcoal">Challenge:</strong> {deal.challenge}
                        </p>
                      )}
                      {deal.solution && (
                        <p className="text-charcoal/70 mb-3 leading-relaxed">
                          <strong className="text-charcoal">Solution:</strong> {deal.solution}
                        </p>
                      )}
                       {!deal.challenge && !deal.solution && deal.subtitle && (
                        <p className="text-charcoal/70 leading-relaxed">
                          {deal.subtitle}
                        </p>
                      )}
                    </div>
                    
                    {/* Removed agent and full story button, can be added back if needed */}
                    {/* Example of how to add agent if needed in the future: 
                    {deal.agent && (
                      <div className="flex items-center gap-2 mt-auto pt-4 border-t border-gray-100">
                        <Building2 size={16} className="text-plum" />
                        <span className="text-gray-600 text-sm">{deal.agent}</span>
                      </div>
                    )}
                    */}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}          {!recentDealsLoading && !recentDealsError && (!recentDeals || recentDeals.length === 0) && (
            <div className="text-center py-16">
              <p className="text-charcoal/60 text-lg">No confidential off-market deals to display at this time.</p>
            </div>
          )}
          <div className="text-center mt-12">
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 border border-white/30 max-w-2xl mx-auto">
              <p className="text-charcoal/80 mb-6 text-lg font-medium">
                These deals were available exclusively to our network members.
              </p>
              <Button 
                href="#application"
                variant="primary"
                size="lg"
              >
                Join to See Current Opportunities
              </Button>
            </div>
          </div>
        </div>
      </section>      {/* Buyer Types */}
      <section className="py-24 bg-gradient-to-br from-sand via-cloud to-sand">
        <div className="container-custom">
          <h2 className="heading-luxury text-charcoal text-4xl md:text-5xl font-bold mb-16 text-center leading-tight">
            Who We Work With
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {buyerTypes.map((type, index) => (
              <Card 
                key={index}
                className="bg-white/80 backdrop-blur-lg border border-white/40 hover:bg-white/90 hover:shadow-luxury transition-all duration-500 rounded-2xl text-center py-8 animate-fade-in"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <CardContent className="p-8">
                  <div className="text-4xl mb-6">
                    {type.icon}
                  </div>
                  <h3 className="text-xl font-display font-bold mb-4 text-charcoal">
                    {type.title}
                  </h3>
                  <p className="text-charcoal/70 mb-6 leading-relaxed font-medium">
                    {type.description}
                  </p>
                  <div className="space-y-3">
                    {type.criteria.map((criterion, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-charcoal/70">
                        <CheckCircle size={16} className="text-plum flex-shrink-0" />
                        <span className="font-medium">{criterion}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-br from-cloud via-sand to-cloud">
        <div className="container-custom">
          <h2 className="heading-luxury text-charcoal text-4xl md:text-5xl font-bold mb-16 text-center leading-tight">
            What Network Members Say
          </h2>
          <div className="grid grid-cols-1 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className="bg-white/80 backdrop-blur-lg border border-white/40 hover:bg-white/90 hover:shadow-luxury transition-all duration-500 rounded-2xl text-center animate-fade-in max-w-4xl mx-auto"
                style={{ animationDelay: `${0.2 * index}s` }}
              >
                <CardContent className="p-12">
                  <div className="text-5xl text-plum/20 mb-6">"</div>
                  <blockquote className="text-xl font-medium mb-8 text-charcoal leading-relaxed italic">
                    {testimonial.quote}
                  </blockquote>
                  <div className="space-y-2">
                    <p className="font-bold text-lg text-charcoal">
                      {testimonial.author}
                    </p>
                    <p className="text-charcoal/70 font-medium">
                      {testimonial.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>      {/* Application Requirements */}
      <section className="py-24 bg-gradient-to-br from-sand via-cloud to-sand">
        <div className="container-custom">
          <h2 className="heading-luxury text-charcoal text-4xl md:text-5xl font-bold mb-16 text-center leading-tight">
            Application Requirements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {applicationRequirements.map((requirement, index) => (
              <Card 
                key={index}
                className="bg-white/80 backdrop-blur-lg border border-white/40 hover:bg-white/90 hover:shadow-luxury transition-all duration-500 rounded-2xl text-center animate-fade-in"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cloud to-sand flex items-center justify-center mx-auto mb-6 shadow-lg">
                    {requirement.icon}
                  </div>
                  <h3 className="text-xl font-display font-bold mb-4 text-charcoal">
                    {requirement.title}
                  </h3>
                  <p className="text-charcoal/70 leading-relaxed font-medium">
                    {requirement.description}
                  </p>
                </CardContent>
              </Card>
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
            </div>            <Card>
              <CardContent className="p-8">
                {/* Error Display */}
                {submitError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center">
                    <AlertCircle size={20} className="mr-3 flex-shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="font-bold text-xl mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">                      <div>
                        <label htmlFor="firstName" className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
                          First Name *
                        </label>                        <input
                          type="text"
                          id="firstName"
                          name="first_name"
                          required
                          maxLength={100}
                          value={formData.first_name}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent ${
                            getFieldError('first_name') ? 'border-red-300' : 'border-gray-300'
                          }`}
                        />
                        {getFieldError('first_name') && (
                          <p className="mt-1 text-red-600 text-sm">{getFieldError('first_name')}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>                        <input
                          type="text"
                          id="lastName"
                          name="last_name"
                          required
                          maxLength={100}
                          value={formData.last_name}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent ${
                            getFieldError('last_name') ? 'border-red-300' : 'border-gray-300'
                          }`}
                        />
                        {getFieldError('last_name') && (
                          <p className="mt-1 text-red-600 text-sm">{getFieldError('last_name')}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
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
                    <div>                        <label htmlFor="phone" className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
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
                        <label htmlFor="company" className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
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
                        <label htmlFor="title" className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
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
                      <label htmlFor="investmentRange" className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
                        Investment Range *
                      </label>
                      <select
                        id="investmentRange"
                        name="investment_range"
                        required
                        value={formData.investment_range}
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
                      <label className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
                        Property Types of Interest * (Select all that apply)
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {['Manufactured Housing', 'RV Parks', 'Self-Storage'].map((type) => (
                          <label key={type} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.property_types.includes(type)}
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
                        <label htmlFor="markets" className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
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
                        <label htmlFor="timeline" className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
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
                      <label htmlFor="experience" className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
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
                      <label htmlFor="references" className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
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
                      <label htmlFor="additionalInfo" className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
                        Additional Information
                      </label>
                      <textarea
                        id="additionalInfo"
                        name="additional_info"
                        rows={3}
                        value={formData.additional_info}
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
                      onClick={() => handleSubmit({} as React.FormEvent)}
                      variant="primary"
                      size="lg"
                      className="w-full"
                      icon={<ArrowRight size={20} />}
                      iconPosition="right"
                    >
                      Submit Application
                    </Button>

                    <p className="text-sm lg:text-base text-gray-600 text-center mt-4">
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
                className="text-white"
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
              </Button>            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default ExclusiveBuyerNetworkPage;

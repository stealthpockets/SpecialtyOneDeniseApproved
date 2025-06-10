import React, { useState } from 'react';
import { Shield, Eye, Users, Target, CheckCircle, ArrowRight, Building2, Clock, Award, Lock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

const sellerBenefits = [
  {
    icon: <Shield size={32} className="text-white" />,
    title: 'Complete Confidentiality',
    description: 'Your sale remains private until you decide otherwise. No public marketing unless you approve it.',
    details: ['NDA-protected process', 'Vetted buyer access only', 'No market noise or speculation']
  },
  {
    icon: <Users size={32} className="text-white" />,
    title: 'Pre-Qualified Buyers Only',
    description: 'Every buyer is financially verified and has a proven track record before seeing your property.',
    details: ['Financial capacity confirmed', 'Track record verified', 'Serious intent validated']
  },
  {
    icon: <Target size={32} className="text-white" />,
    title: 'Strategic Positioning',
    description: 'We position your property to the right buyers at the right time for maximum value.',
    details: ['Market timing optimization', 'Buyer-specific presentations', 'Value maximization strategy']
  },
  {
    icon: <Eye size={32} className="text-white" />,
    title: 'Controlled Exposure',
    description: 'You control every step of the process. Nothing happens without your explicit approval.',
    details: ['Seller-controlled timeline', 'Approved buyer list', 'Staged information release']
  }
];

const confidentialSales = [
  {
    title: 'Premium MH Community',
    location: 'Central Arizona',
    type: 'Manufactured Housing',
    size: '150+ Sites',
    outcome: 'Sold Above Market',
    timeframe: '45 Days',
    description: 'Family legacy property sold discreetly to institutional buyer without public exposure.',
    challenge: 'Required complete confidentiality due to family dynamics and employee concerns.',
    solution: 'Structured private sale process with vetted institutional buyers only.'
  },
  {
    title: 'Confidential Storage Portfolio',
    location: 'Phoenix MSA',
    type: 'Self-Storage',
    size: '3 Facilities',
    outcome: 'Portfolio Premium',
    timeframe: '60 Days',
    description: 'Multi-facility sale to strategic buyer seeking market consolidation.',
    challenge: 'Owner needed to maintain operations while exploring exit options.',
    solution: 'Quiet marketing to strategic buyers with operational expertise.'
  },
  {
    title: 'Luxury RV Resort',
    location: 'Scottsdale Area',
    type: 'RV Park',
    size: '200 Sites',
    outcome: 'Record Price/Site',
    timeframe: '30 Days',
    description: 'High-end resort sold to family office seeking trophy asset.',
    challenge: 'Maintaining guest experience during sale process.',
    solution: 'Discreet due diligence process with minimal operational disruption.'
  }
];

const sellerTypes = [
  {
    icon: '👨‍👩‍👧‍👦',
    title: 'Family Owners',
    description: 'Multi-generational properties requiring sensitive handling and legacy preservation.',
    concerns: ['Family dynamics', 'Employee retention', 'Community impact', 'Tax optimization']
  },
  {
    icon: '🏢',
    title: 'Institutional Sellers',
    description: 'Funds and REITs requiring strategic, confidential disposition of assets.',
    concerns: ['Market timing', 'Portfolio impact', 'Investor relations', 'Strategic positioning']
  },
  {
    icon: '⚖️',
    title: 'Estate & Trust Sales',
    description: 'Fiduciary sales requiring careful handling and maximum value realization.',
    concerns: ['Beneficiary interests', 'Timeline constraints', 'Value maximization', 'Legal compliance']
  },
  {
    icon: '🔄',
    title: '1031 Exchange Sellers',
    description: 'Time-sensitive sales requiring coordination with replacement property acquisition.',
    concerns: ['Timeline management', 'Qualified buyers', 'Exchange compliance', 'Backup options']
  }
];

const processSteps = [
  {
    step: 1,
    title: 'Confidential Consultation',
    description: 'Private meeting to understand your goals, timeline, and confidentiality requirements.',
    duration: '1-2 hours'
  },
  {
    step: 2,
    title: 'Strategic Positioning',
    description: 'Develop positioning strategy, identify target buyers, and create confidential marketing materials.',
    duration: '1-2 weeks'
  },
  {
    step: 3,
    title: 'Buyer Qualification',
    description: 'Vet and qualify potential buyers before any property information is shared.',
    duration: 'Ongoing'
  },
  {
    step: 4,
    title: 'Controlled Exposure',
    description: 'Present opportunity to qualified buyers with your approval at each stage.',
    duration: '2-4 weeks'
  },
  {
    step: 5,
    title: 'Negotiation & Close',
    description: 'Manage negotiations and closing process with complete transparency to you.',
    duration: '4-8 weeks'
  }
];

const testimonials = [
  {
    quote: "They handled our family property sale with incredible discretion. Our employees never knew we were considering a sale until we decided to move forward.",
    author: "Anonymous Family Owner",
    property: "Multi-Generational MH Community",
    outcome: "Confidential sale completed"
  },
  {
    quote: "The private sale process allowed us to explore our options without market speculation or operational disruption. Exactly what we needed.",
    author: "Anonymous Institutional Seller",
    property: "Storage Portfolio",
    outcome: "Strategic disposition"
  },
  {
    quote: "They found the right buyer who understood our vision and paid accordingly. The entire process was handled with complete professionalism.",
    author: "Anonymous Estate Representative",
    property: "Premium RV Resort",
    outcome: "Estate settlement"
  }
];

const guarantees = [
  {
    icon: <Lock size={24} className="text-plum" />,
    title: 'Confidentiality Guarantee',
    description: 'Your property information is never shared without explicit written consent.'
  },
  {
    icon: <Users size={24} className="text-plum" />,
    title: 'Qualified Buyers Only',
    description: 'Every buyer is pre-qualified financially and operationally before property access.'
  },
  {
    icon: <Clock size={24} className="text-plum" />,
    title: 'Your Timeline',
    description: 'We work on your schedule with no pressure to move faster than you\'re comfortable.'
  },
  {
    icon: <Award size={24} className="text-plum" />,
    title: 'Value Maximization',
    description: 'Our process is designed to achieve the highest possible value for your property.'
  }
];

const ExclusiveSellerNetworkPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    propertyType: '',
    propertyLocation: '',
    ownershipType: '',
    timeline: '',
    confidentialityLevel: '',
    currentSituation: '',
    goals: '',
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Confidential inquiry submitted:', formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col min-h-screen bg-sand">
        <section className="pt-32 pb-20 bg-gradient-hero text-white flex-grow flex items-center">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} className="text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Confidential Inquiry Received
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Thank you for your confidential inquiry. We'll contact you within 24 hours 
                to discuss your situation and how we can help.
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
                <h3 className="font-bold text-lg mb-2">What Happens Next?</h3>
                <div className="text-left space-y-2">
                  <p>✓ Confidential review of your inquiry</p>
                  <p>✓ Initial consultation within 24 hours</p>
                  <p>✓ Preliminary strategy discussion</p>
                  <p>✓ No obligation assessment</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  to="/"
                  variant="primary"
                  className="bg-white text-plum hover:bg-cloud"
                  size="lg"
                >
                  Return Home
                </Button>
                <Button 
                  href="tel:602-730-9967"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  size="lg"
                >
                  Call for Urgent Matters
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-sand">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-hero text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center text-sand">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Sell Quietly. Sell Smart.
              <span className="block">Sell Successfully.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              For property owners who value discretion, our exclusive seller network 
              provides confidential sales processes that protect your interests and maximize value.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="font-bold text-2xl">100%</div>                  <div className="text-sm lg:text-base opacity-90">Confidentiality Maintained</div>
                </div>
                <div>
                  <div className="font-bold text-2xl">$1B+</div>
                  <div className="text-sm lg:text-base opacity-90">Confidential Sales Volume</div>
                </div>
                <div>
                  <div className="font-bold text-2xl">Zero</div>
                  <div className="text-sm lg:text-base opacity-90">Information Leaks</div>
                </div>
              </div>
            </div>
            <Button 
              href="#consultation"
              variant="primary"
              size="lg"
            >
              Request Confidential Consultation
            </Button>
            <p className="text-sm mt-4 opacity-75 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              Completely confidential. No obligation. No public exposure.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Confidential Sales */}
      <section className="py-16 bg-sand">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Why Sell Confidentially?
            </h2>
            <p className="text-lg text-gray-700">
              Not every property sale should be public. Sometimes discretion is not just preferred—it's essential.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sellerBenefits.map((benefit, index) => (
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

      {/* Confidential Sales Success Stories */}
      <section className="py-16 bg-cloud">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
            Recent Confidential Sales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {confidentialSales.map((sale, index) => (
              <Card 
                key={index}
                className="animate-fade-in"
                style={{ animationDelay: `${0.2 * index}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge color="success" variant="gradient">
                      {sale.outcome}
                    </Badge>
                    <Badge color="primary" variant="outline">
                      {sale.timeframe}
                    </Badge>
                  </div>
                  
                  <h3 className="font-display text-xl font-bold mb-2">
                    {sale.title}
                  </h3>
                  
                  <div className="space-y-2 mb-4 text-gray-600">
                    <div className="flex justify-between">
                      <span>Location:</span>
                      <span>{sale.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span>{sale.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Size:</span>
                      <span>{sale.size}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    {sale.description}
                  </p>
                  
                  <div className="border-t border-gray-200 pt-4">                    <h4 className="font-medium mb-2">Challenge:</h4>
                    <p className="text-sm lg:text-base text-gray-600 mb-3">{sale.challenge}</p>
                    
                    <h4 className="font-medium mb-2">Solution:</h4>
                    <p className="text-sm lg:text-base text-gray-600">{sale.solution}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              All sales completed without public exposure or market speculation.
            </p>
            <Button 
              href="#consultation"
              variant="primary"
            >
              Discuss Your Confidential Sale
            </Button>
          </div>
        </div>
      </section>

      {/* Seller Types */}
      <section className="py-16 bg-sand">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
            Who Benefits from Confidential Sales?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sellerTypes.map((type, index) => (
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
                    <h4 className="font-medium text-sm">Common Concerns:</h4>
                    {type.concerns.map((concern, idx) => (                      <div key={idx} className="text-xs lg:text-sm text-gray-500">
                        • {concern}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-16 bg-cloud">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
            Our Confidential Sales Process
          </h2>
          <div className="relative">
            {/* Process Line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-plum to-sage transform -translate-x-1/2 z-0"></div>
            
            <div className="space-y-16 lg:space-y-0">
              {processSteps.map((step, index) => (
                <div 
                  key={index} 
                  className={`
                    flex flex-col lg:flex-row items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}
                    relative animate-fade-in
                  `}
                  style={{ animationDelay: `${0.2 * index}s` }}
                >
                  {/* Step Circle */}
                  <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 z-10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-plum to-amethyst flex items-center justify-center text-white font-bold text-xl">
                      {step.step}
                    </div>
                  </div>
                  
                  {/* Step Content */}
                  <div className={`
                    lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}
                  `}>
                    <div className="mb-4 lg:hidden">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-plum to-amethyst flex items-center justify-center text-white font-bold text-xl mx-auto">
                        {step.step}
                      </div>
                    </div>
                    
                    <h3 className="font-display text-xl font-bold mb-3 text-center lg:text-inherit">
                      {step.title}
                    </h3>
                    <p className="text-gray-700 mb-2 text-center lg:text-inherit">
                      {step.description}
                    </p>
                    <p className="text-sm text-plum font-medium text-center lg:text-inherit">
                      Duration: {step.duration}
                    </p>
                  </div>
                  
                  {/* Spacer */}
                  <div className="hidden lg:block lg:w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-sand">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
            What Sellers Say About Our Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-cloud rounded-lg p-8 animate-fade-in"
                style={{ animationDelay: `${0.2 * index}s` }}
              >
                <div className="text-5xl text-plum opacity-20 mb-4">"</div>
                <blockquote className="text-lg font-medium mb-6">
                  {testimonial.quote}
                </blockquote>
                <div>
                  <p className="font-bold">
                    {testimonial.author}
                  </p>                  <p className="text-gray-600 text-sm lg:text-base">
                    {testimonial.property}
                  </p>
                  <p className="text-plum text-sm lg:text-base font-medium mt-1">
                    {testimonial.outcome}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-16 bg-cloud">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
            Our Commitments to You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {guarantees.map((guarantee, index) => (
              <div 
                key={index}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4 shadow-md">
                  {guarantee.icon}
                </div>
                <h3 className="font-bold mb-3">
                  {guarantee.title}
                </h3>
                <p className="text-gray-600">
                  {guarantee.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Confidential Consultation Form */}
      <section id="consultation" className="py-16 bg-sand">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Request Confidential Consultation
              </h2>
              <p className="text-lg text-gray-700">
                All information shared is strictly confidential. No obligation. No public exposure.
              </p>
            </div>

            <Card>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="font-bold text-xl mb-4">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>                        <label htmlFor="firstName" className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
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
                      <div>                        <label htmlFor="lastName" className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>                      <label htmlFor="email" className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
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
                    <div>                      <label htmlFor="phone" className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
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

                  {/* Property Information */}
                  <div>
                    <h3 className="font-bold text-xl mb-4">Property Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>                        <label htmlFor="propertyType" className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
                          Property Type *
                        </label>
                        <select
                          id="propertyType"
                          name="propertyType"
                          required
                          value={formData.propertyType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                        >
                          <option value="">Select Property Type</option>
                          <option value="manufactured-housing">Manufactured Housing Community</option>
                          <option value="rv-park">RV Park / Resort</option>
                          <option value="self-storage">Self-Storage Facility</option>
                          <option value="portfolio">Portfolio / Multiple Properties</option>
                        </select>
                      </div>
                      <div>                        <label htmlFor="propertyLocation" className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
                          Property Location *
                        </label>
                        <input
                          type="text"
                          id="propertyLocation"
                          name="propertyLocation"
                          required
                          value={formData.propertyLocation}
                          onChange={handleInputChange}
                          placeholder="City, State"
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Ownership and Timeline */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>                      <label htmlFor="ownershipType" className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
                        Ownership Type *
                      </label>
                      <select
                        id="ownershipType"
                        name="ownershipType"
                        required
                        value={formData.ownershipType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                      >
                        <option value="">Select Ownership Type</option>
                        <option value="individual">Individual/Family</option>
                        <option value="partnership">Partnership</option>
                        <option value="corporation">Corporation</option>
                        <option value="trust">Trust/Estate</option>
                        <option value="fund">Fund/Institutional</option>
                      </select>
                    </div>
                    <div>                      <label htmlFor="timeline" className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
                        Sale Timeline *
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
                        <option value="exploring">Just exploring options</option>
                      </select>
                    </div>
                  </div>

                  {/* Confidentiality Level */}
                  <div>                    <label htmlFor="confidentialityLevel" className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
                      Confidentiality Requirements *
                    </label>
                    <select
                      id="confidentialityLevel"
                      name="confidentialityLevel"
                      required
                      value={formData.confidentialityLevel}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                    >
                      <option value="">Select Confidentiality Level</option>
                      <option value="maximum">Maximum - No public exposure at all</option>
                      <option value="high">High - Very limited, vetted exposure only</option>
                      <option value="moderate">Moderate - Some controlled marketing acceptable</option>
                      <option value="standard">Standard - Normal marketing with some discretion</option>
                    </select>
                  </div>

                  {/* Current Situation */}
                  <div>                    <label htmlFor="currentSituation" className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
                      Current Situation *
                    </label>
                    <textarea
                      id="currentSituation"
                      name="currentSituation"
                      required
                      rows={4}
                      value={formData.currentSituation}
                      onChange={handleInputChange}
                      placeholder="Please describe your current situation and why you're considering a sale..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                    />
                  </div>

                  {/* Goals */}
                  <div>                    <label htmlFor="goals" className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
                      Sale Goals & Objectives
                    </label>
                    <textarea
                      id="goals"
                      name="goals"
                      rows={3}
                      value={formData.goals}
                      onChange={handleInputChange}
                      placeholder="What are your primary goals for this sale? (e.g., maximize value, quick sale, tax optimization, etc.)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                    />
                  </div>

                  {/* Additional Information */}
                  <div>                    <label htmlFor="additionalInfo" className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
                      Additional Information
                    </label>
                    <textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      rows={3}
                      value={formData.additionalInfo}
                      onChange={handleInputChange}
                      placeholder="Any additional information that would help us understand your situation and requirements..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                    />
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <div className="bg-cloud rounded-lg p-4 mb-6">
                      <h4 className="font-medium mb-2">Confidentiality Commitment</h4>                      <ul className="text-sm lg:text-base text-gray-600 space-y-1">
                        <li>• All information shared is strictly confidential</li>
                        <li>• No property details will be shared without your explicit consent</li>
                        <li>• Initial consultation is completely obligation-free</li>
                        <li>• We will contact you within 24 hours to schedule a private discussion</li>
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
                      Submit Confidential Inquiry
                    </Button>                    <p className="text-sm lg:text-base text-gray-600 text-center mt-4">
                      By submitting this form, you acknowledge that all information will be kept strictly confidential 
                      and used solely for the purpose of providing you with a consultation.
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
              Prefer to Discuss by Phone?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              For immediate confidential consultation or urgent matters, 
              speak directly with our principals.
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
                Send Secure Message
              </Button>
            </div>            <p className="text-sm lg:text-base mt-4 opacity-75">
              All conversations are confidential and protected by broker-client privilege.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExclusiveSellerNetworkPage;

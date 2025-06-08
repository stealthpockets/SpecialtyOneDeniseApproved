import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Building2, Send, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

const teamMembers = [
  {
    name: "Andrew Warner, CCIM",
    title: "President | Manufactured Housing & RV",
    phone: "602-708-7305",
    email: "andrew@specialtyone.com",
    specialties: ["Manufactured Housing Communities", "RV Parks & Outdoor Hospitality", "1031 Exchange Strategy"],
    image: "/dist/assets/Leadership/andrew-headshot-image.webp",
    bio: "Andrew leads our MH and RV practice with deep expertise in complex transactions. His track record includes $304M+ in closings with a 100% success rate on exclusive listings."
  },
  {
    name: "Denise Nuñez",
    title: "President | Storage Group",
    phone: "602-697-8868",
    email: "denise@specialtyone.com",
    specialties: ["Self-Storage Facilities", "Climate-Controlled Operations", "Value-Add Positioning"],
    image: "/dist/assets/Leadership/denise-nunez-self-storage.webp",
    bio: "Denise brings 25+ years of self-storage expertise to every transaction. She's led $721M+ in storage deals and understands the operational nuances that drive value."
  }
];

const contactReasons = [
  {
    icon: '🏘',
    title: 'Selling Your Property',
    description: 'Get a confidential valuation and exit strategy consultation',
    cta: 'Request Valuation'
  },
  {
    icon: '🔍',
    title: 'Looking to Buy',
    description: 'Access our exclusive off-market listings and buyer network',
    cta: 'Join Buyer Network'
  },
  {
    icon: '🔁',
    title: '1031 Exchange Planning',
    description: 'Strategic tax-deferred exchange consultation and execution',
    cta: 'Plan Exchange'
  },
  {
    icon: '📊',
    title: 'Market Intelligence',
    description: 'Custom research and market analysis for your investment decisions',
    cta: 'Request Research'
  }
];

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    propertyType: '',
    inquiryType: '',
    message: '',
    preferredContact: 'email'
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
    // Handle form submission here
    console.log('Form submitted:', formData);
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
                Thank You for Reaching Out
              </h1>
              <p className="text-xl mb-8 opacity-90">
                We've received your message and will respond within 24 hours. 
                For urgent matters, please call us directly.
              </p>
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
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  size="lg"
                >
                  Send Another Message
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
              Let's Talk About Your
              <span className="block">Next Move</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Whether you're buying, selling, or planning a 1031 exchange, 
              our team brings the expertise to get it done right.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <p className="text-lg">
                📞 <strong>Urgent?</strong> Call us directly: <a href="tel:602-730-9967" className="underline hover:text-sage">602-730-9967</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Reasons */}
      <section className="py-16 bg-sand">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
            How Can We Help You?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactReasons.map((reason, index) => (
              <Card 
                key={index}
                className="text-center py-8 animate-fade-in"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <CardContent>
                  <div className="text-4xl mb-4">
                    {reason.icon}
                  </div>
                  <h3 className="font-bold mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {reason.description}
                  </p>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    {reason.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Form and Info */}
      <section className="py-16 bg-cloud">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="font-display text-3xl font-bold mb-8">
                Send Us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">
                      Property Type of Interest
                    </label>
                    <select
                      id="propertyType"
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                    >
                      <option value="">Select Property Type</option>
                      <option value="manufactured-housing">Manufactured Housing</option>
                      <option value="rv-parks">RV Parks</option>
                      <option value="self-storage">Self-Storage</option>
                      <option value="multiple">Multiple Asset Classes</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-2">
                      Inquiry Type
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                    >
                      <option value="">Select Inquiry Type</option>
                      <option value="selling">Selling a Property</option>
                      <option value="buying">Looking to Buy</option>
                      <option value="1031-exchange">1031 Exchange</option>
                      <option value="valuation">Property Valuation</option>
                      <option value="market-research">Market Research</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your property, investment goals, timeline, or any specific questions you have..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Contact Method
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="email"
                        checked={formData.preferredContact === 'email'}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      Email
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="phone"
                        checked={formData.preferredContact === 'phone'}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      Phone
                    </label>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-plum to-amethyst text-white font-medium rounded-md hover:from-amethyst hover:to-plum transition-all duration-200 flex items-center justify-center gap-2"
                >
                  Send Message
                  <Send size={20} />
                </button>

                <p className="text-sm text-gray-600 text-center">
                  We typically respond within 24 hours. For urgent matters, please call us directly.
                </p>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="font-display text-3xl font-bold mb-8">
                Contact Information
              </h2>

              {/* Office Info */}
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-4">Main Office</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin size={20} className="text-plum mt-1" />
                      <div>
                        <p className="font-medium">Specialty One</p>
                        <p className="text-gray-600">Phoenix, Arizona</p>
                        <p className="text-gray-600">Serving the Southwest</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={20} className="text-plum" />
                      <a href="tel:602-730-9967" className="text-plum hover:text-amethyst font-medium">
                        602-730-9967
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail size={20} className="text-plum" />
                      <a href="mailto:info@specialtyone.com" className="text-plum hover:text-amethyst font-medium">
                        info@specialtyone.com
                      </a>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock size={20} className="text-plum mt-1" />
                      <div>
                        <p className="font-medium">Business Hours</p>
                        <p className="text-gray-600">Monday - Friday: 8:00 AM - 6:00 PM MST</p>
                        <p className="text-gray-600">Saturday: By Appointment</p>
                        <p className="text-gray-600">Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="space-y-4">
                <h3 className="font-bold text-xl">Quick Actions</h3>
                <div className="grid grid-cols-1 gap-3">
                  <Button 
                    to="/exclusive-buyers"
                    variant="outline"
                    className="justify-start"
                  >
                    🔒 Join Exclusive Buyer Network
                  </Button>
                  <Button 
                    to="/newsletter"
                    variant="outline"
                    className="justify-start"
                  >
                    📧 Subscribe to Market Updates
                  </Button>
                  <Button 
                    to="/market-reports"
                    variant="outline"
                    className="justify-start"
                  >
                    📊 Download Market Reports
                  </Button>
                  <Button 
                    to="/success-stories"
                    variant="outline"
                    className="justify-start"
                  >
                    📖 View Success Stories
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16 bg-sand">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
            Meet Your Specialists
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card 
                key={index}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${0.2 * index}s` }}
              >
                <CardContent className="p-6">
                  <div className="relative mb-6">
                    <img 
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover"
                    />
                  </div>
                  
                  <h3 className="font-display text-xl font-bold mb-2">
                    {member.name}
                  </h3>
                  <p className="text-plum font-medium mb-4">
                    {member.title}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    <a 
                      href={`tel:${member.phone}`}
                      className="flex items-center justify-center gap-2 text-gray-600 hover:text-plum transition-colors"
                    >
                      <Phone size={16} />
                      {member.phone}
                    </a>
                    <a 
                      href={`mailto:${member.email}`}
                      className="flex items-center justify-center gap-2 text-gray-600 hover:text-plum transition-colors"
                    >
                      <Mail size={16} />
                      {member.email}
                    </a>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-medium mb-2">Specialties:</h4>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {member.specialties.map((specialty, idx) => (
                        <span 
                          key={idx}
                          className="text-xs bg-cloud text-gray-700 px-2 py-1 rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    href={`mailto:${member.email}`}
                    variant="primary"
                    size="sm"
                    className="w-full"
                  >
                    Contact {member.name.split(' ')[0]}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-gradient-to-br from-obsidian to-amethyst text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Need Immediate Assistance?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              For urgent matters, time-sensitive deals, or after-hours emergencies, 
              call our main line and we'll connect you with the right specialist.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                href="tel:602-730-9967"
                variant="primary"
                size="lg"
                className="bg-white text-plum hover:bg-cloud"
                icon={<Phone size={20} />}
                iconPosition="left"
              >
                Call Now: 602-730-9967
              </Button>
            </div>
            <p className="text-sm mt-4 opacity-75">
              Available Monday - Friday, 8:00 AM - 6:00 PM MST
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;

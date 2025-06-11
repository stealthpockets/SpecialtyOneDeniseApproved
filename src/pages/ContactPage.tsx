import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

const teamMembers = [
	{
		name: 'Andrew Warner, CCIM',
		title: 'President | Manufactured Housing & RV',
		phone: '602-730-9967',
		email: 'andrew@specialtyone.com',
		specialties: [
			'Manufactured Housing Communities',
			'RV Parks & Outdoor Hospitality',
			'1031 Exchange Strategy',
		],
		image: '/dist/assets/Leadership/andrew-headshot-image.webp',
		bio: 'Andrew leads our MH and RV practice with deep expertise in complex transactions. His track record includes $304M+ in closings with a 100% success rate on exclusive listings.',
	},
	{
		name: 'Denise Nuñez',
		title: 'President | Storage Group',
		phone: '602-697-8868',
		email: 'denise@specialtyone.com',
		specialties: ['Self-Storage Facilities', 'Climate-Controlled Operations', 'Value-Add Positioning'],
		image: '/dist/assets/Leadership/denise-nunez-self-storage.webp',
		bio: "Denise brings 25+ years of self-storage expertise to every transaction. She's led $721M+ in storage deals and understands the operational nuances that drive value.",
	},
];

const contactReasons = [
	{
		icon: '🏘',
		title: 'Selling Your Property',
		description: 'Get a confidential valuation and exit strategy consultation',
		cta: 'Request Valuation',
	},
	{
		icon: '🔍',
		title: 'Looking to Buy',
		description: 'Access our exclusive off-market listings and buyer network',
		cta: 'Join Buyer Network',
	},
	{
		icon: '🔁',
		title: '1031 Exchange Planning',
		description: 'Strategic tax-deferred exchange consultation and execution',
		cta: 'Plan Exchange',
	},
	{
		icon: '📊',
		title: 'Market Intelligence',
		description: 'Custom research and market analysis for your investment decisions',
		cta: 'Request Research',
	},
];

const faqs = [
	{
		q: 'What types of properties do you specialize in?',
		a: 'We specialize in Manufactured Housing Communities, RV Parks & Resorts, and Self-Storage facilities. Our deep focus in these niches allows us to provide unparalleled market insight and execution.',
	},
	{
		q: 'How do you determine the value of my property?',
		a: 'Our valuation process combines rigorous financial analysis, current market comparables, proprietary buyer data, and an understanding of potential operational upside. We provide a realistic, data-driven assessment, not just an aspirational number.',
	},
	{
		q: 'What is your process for selling a property?',
		a: 'We utilize the Specialty One Close Framework™, a system that starts with strategic asset assessment and buyer underwriting before we even list. This proactive approach minimizes surprises and maximizes closing certainty. We manage every step from initial analysis to successful close.',
	},
	{
		q: 'Do you work with buyers as well?',
		a: 'Yes, we maintain an exclusive network of qualified buyers. If you\'re looking to acquire properties in our specialty niches, we can provide access to on-market and off-market opportunities that fit your criteria.',
	},
	{
		q: 'Can you help with 1031 Exchanges?',
		a: 'Absolutely. We offer strategic 1031 Exchange consultation and execution, helping clients identify suitable replacement properties and navigate the complexities of tax-deferred exchanges within the required timelines.',
	},
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
		preferredContact: 'email',
	});

	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
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
								<br />
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
						<p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
							Whether you're buying, selling, or planning a 1031 exchange,
							<br className="hidden sm:block" />
							our team brings the expertise to get it done right.
						</p>
						<div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
							<p className="text-lg">
								📞 <strong>Urgent?</strong> Call us directly:{' '}
								<a href="tel:602-730-9967" className="underline hover:text-sage">
									602-730-9967
								</a>
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
									<div className="text-4xl mb-4">{reason.icon}</div>
									<h3 className="font-bold mb-3">{reason.title}</h3>
									<p className="text-gray-600 mb-4">{reason.description}</p>
									<Button variant="outline" size="sm" className="w-full">
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
							<h2 className="font-display text-3xl font-bold mb-8">Send Us a Message</h2>

							<form onSubmit={handleSubmit} className="space-y-6">
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div>
										<label
											htmlFor="firstName"
											className="block text-sm lg:text-base font-medium text-gray-700 mb-2"
										>
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
										<label
											htmlFor="lastName"
											className="block text-sm lg:text-base font-medium text-gray-700 mb-2"
										>
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
										<label
											htmlFor="email"
											className="block text-sm lg:text-base font-medium text-gray-700 mb-2"
										>
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
										<label
											htmlFor="phone"
											className="block text-sm lg:text-base font-medium text-gray-700 mb-2"
										>
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
									<label
										htmlFor="company"
										className="block text-sm lg:text-base font-medium text-gray-700 mb-2"
									>
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
										<label
											htmlFor="propertyType"
											className="block text-sm lg:text-base font-medium text-gray-700 mb-2"
										>
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
											<option value="other">Other</option>
										</select>
									</div>
									<div>
										<label
											htmlFor="inquiryType"
											className="block text-sm lg:text-base font-medium text-gray-700 mb-2"
										>
											Reason for Inquiry *
										</label>
										<select
											id="inquiryType"
											name="inquiryType"
											required
											value={formData.inquiryType}
											onChange={handleInputChange}
											className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
										>
											<option value="">Select Reason</option>
											<option value="selling">Selling a Property</option>
											<option value="buying">Buying a Property</option>
											<option value="1031-exchange">1031 Exchange</option>
											<option value="market-info">Market Information</option>
											<option value="general">General Inquiry</option>
										</select>
									</div>
								</div>

								<div>
									<label
										htmlFor="message"
										className="block text-sm lg:text-base font-medium text-gray-700 mb-2"
									>
										Message *
									</label>
									<textarea
										id="message"
										name="message"
										rows={4}
										required
										value={formData.message}
										onChange={handleInputChange}
										className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-plum focus:border-transparent"
										placeholder="Tell us more about your needs..."
									></textarea>
								</div>

								<div>
									<label className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
										Preferred Contact Method
									</label>
									<div className="flex items-center space-x-4">
										<label htmlFor="contact-email" className="flex items-center">
											<input
												type="radio"
												id="contact-email"
												name="preferredContact"
												value="email"
												checked={formData.preferredContact === 'email'}
												onChange={handleInputChange}
												className="focus:ring-plum h-4 w-4 text-plum border-gray-300"
											/>
											<span className="ml-2 text-gray-700">Email</span>
										</label>
										<label htmlFor="contact-phone" className="flex items-center">
											<input
												type="radio"
												id="contact-phone"
												name="preferredContact"
												value="phone"
												checked={formData.preferredContact === 'phone'}
												onChange={handleInputChange}
												className="focus:ring-plum h-4 w-4 text-plum border-gray-300"
											/>
											<span className="ml-2 text-gray-700">Phone</span>
										</label>
									</div>
								</div>

								<div>
									<Button
										variant="primary"
										size="lg"
										className="w-full flex items-center justify-center"
									>
										Send Message <Send size={20} className="ml-2" />
									</Button>
								</div>
								<p className="text-xs text-gray-500 text-center">
									We respect your privacy. Your information will not be shared.
								</p>
							</form>
						</div>

						{/* Contact Info */}
						<div className="bg-white p-8 rounded-lg shadow-lg">
							<h2 className="font-display text-3xl font-bold mb-8">Contact Information</h2>
							<div className="space-y-6">
								<div className="flex items-start">
									<MapPin size={24} className="text-plum mr-4 mt-1" />
									<div>
										<h3 className="font-semibold text-lg">Our Office</h3>
										<p className="text-gray-600">Specialty One Group</p>
										<p className="text-gray-600">7033 E Greenway Pkwy, Suite 750</p>
										<p className="text-gray-600">Scottsdale, AZ 85254</p>
									</div>
								</div>
								<div className="flex items-start">
									<Phone size={24} className="text-plum mr-4 mt-1" />
									<div>
										<h3 className="font-semibold text-lg">Call Us</h3>
										<a href="tel:602-730-9967" className="text-gray-600 hover:text-plum">
											(602) 730-9967
										</a>
									</div>
								</div>
								<div className="flex items-start">
									<Mail size={24} className="text-plum mr-4 mt-1" />
									<div>
										<h3 className="font-semibold text-lg">Email Us</h3>
										<a href="mailto:info@specialtyone.com" className="text-gray-600 hover:text-plum">
											info@specialtyone.com
										</a>
									</div>
								</div>
								<div className="flex items-start">
									<Clock size={24} className="text-plum mr-4 mt-1" />
									<div>
										<h3 className="font-semibold text-lg">Business Hours</h3>
										<p className="text-gray-600">Monday - Friday: 9 AM - 5 PM (MST)</p>
										<p className="text-gray-600">Weekends: By Appointment</p>
									</div>
								</div>
							</div>

							<div className="mt-8 pt-8 border-t border-gray-200">
								<h3 className="font-semibold text-lg mb-4">Connect with our Leadership:</h3>
								{teamMembers.map((member) => (
									<div key={member.name} className="mb-4 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0 last:mb-0">
										<p className="font-medium text-charcoal">{member.name}</p>
										<p className="text-sm text-gray-500">{member.title.split(' | ')[1]}</p>
										<div className="flex items-center space-x-4 mt-1">
											<a href={`tel:${member.phone}`} className="text-sm text-plum hover:underline flex items-center">
												<Phone size={14} className="mr-1.5" /> {member.phone}
											</a>
											<a href={`mailto:${member.email}`} className="text-sm text-plum hover:underline flex items-center">
												<Mail size={14} className="mr-1.5" /> Email
											</a>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>


			{/* Team Member Section - reusing from AboutPage structure */}
			<section className="py-16 bg-sand">
				<div className="container-custom">
					<h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center text-charcoal">
						Meet Our Leadership
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
						{teamMembers.map((member, index) => (
							<Card
								key={index}
								className="group flex flex-col sm:flex-row items-center bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
							>
								<div className="sm:w-2/5 h-80 sm:h-auto">
									<img
										src={member.image}
										alt={member.name}
										className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
										loading="lazy" // Added loading="lazy"
									/>
								</div>
								<CardContent className="p-6 sm:w-3/5">
									<h3 className="font-display text-2xl font-bold text-plum mb-1">{member.name}</h3>
									<p className="text-sm font-medium text-charcoal mb-3">{member.title}</p>
									<p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.bio.substring(0, 120)}...</p>
									<div className="space-y-1 mb-4">
										{member.specialties.slice(0, 2).map((spec) => (
											<span
												key={spec}
												className="inline-block bg-sage/20 text-sage text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
											>
												{spec}
											</span>
										))}
									</div>
									<Button
										variant="outline"
										size="sm"
										className="w-full"
										icon={<ArrowRight size={16} />}
										iconPosition="right"
									>
										Learn More
									</Button>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>


			{/* FAQ Section */}
			<section className="py-16 bg-cloud">
				<div className="container-custom">
					<h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center text-charcoal">
						Frequently Asked Questions
					</h2>
					<div className="max-w-3xl mx-auto">
						{faqs.map((faq, index) => (
							<details
								key={index}
								className="group bg-white p-6 rounded-lg shadow mb-4 transition-all duration-300 open:shadow-xl open:bg-opacity-90"
							>
								<summary className="font-semibold text-lg text-charcoal cursor-pointer flex justify-between items-center list-none">
									{faq.q}
									<span className="text-plum transform transition-transform duration-300 group-open:rotate-45">
										<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M10 3V17M3 10H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
										</svg>
									</span>
								</summary>
								<p className="text-gray-600 mt-3 pt-3 border-t border-gray-200">{faq.a}</p>
							</details>
						))}
					</div>
				</div>
			</section>
		</div>
	);
};

export default ContactPage;

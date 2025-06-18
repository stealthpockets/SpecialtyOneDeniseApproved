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
		<div className="flex flex-col min-h-screen bg-luxury-dark">
			{/* Hero Section */}
			<section className="relative pt-40 pb-32 overflow-hidden">
				<div className="absolute inset-0 bg-gradient-luxury-dark opacity-95"></div>
				<div className="container-custom relative z-10">
					<div className="max-w-4xl mx-auto text-center">
						<h1 className="heading-luxury text-white text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight leading-[0.9]">
							Let's Talk About Your
							<span className="block text-luxury-light">Next Move</span>
						</h1>
						<p className="text-xl md:text-2xl mb-12 text-white/90 leading-relaxed max-w-3xl mx-auto">
							Whether you're buying, selling, or planning a 1031 exchange,
							<br className="hidden sm:block" />
							our team brings the expertise to get it done right.
						</p>
						<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20">
							<p className="text-lg text-white/90">
								📞 <strong className="text-white">Urgent?</strong> Call us directly:{' '}
								<a href="tel:602-730-9967" className="text-luxury-accent hover:text-luxury-light underline">
									602-730-9967
								</a>
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Contact Reasons */}
			<section className="py-24 bg-white">
				<div className="container-custom">
					<h2 className="heading-luxury text-luxury-dark text-4xl md:text-5xl font-bold mb-16 text-center leading-tight">
						How Can We Help You?
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{contactReasons.map((reason, index) => (
							<Card
								key={index}
								className="text-center py-12 px-8 bg-gradient-subtle backdrop-blur-sm border border-luxury-light/20 hover:bg-white/80 transition-all duration-300"
							>
								<CardContent>
									<div className="text-6xl mb-6">{reason.icon}</div>
									<h3 className="text-xl font-bold mb-4 text-luxury-dark">{reason.title}</h3>
									<p className="text-luxury-dark/70 mb-6 leading-relaxed">{reason.description}</p>
									<Button variant="outline" size="lg" className="w-full">
										{reason.cta}
									</Button>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Main Contact Form and Info */}
			<section className="py-24 bg-luxury-dark">
				<div className="container-custom">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
						{/* Contact Form */}
						<div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-12">
							<h2 className="heading-luxury text-white text-3xl md:text-4xl font-bold mb-8">Send Us a Message</h2>

							<form onSubmit={handleSubmit} className="space-y-6">
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
									<div>
										<label
											htmlFor="firstName"
											className="block text-white/90 font-medium mb-3"
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
											className="w-full px-4 py-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-luxury-accent focus:border-transparent backdrop-blur-sm"
										/>
									</div>
									<div>
										<label
											htmlFor="lastName"
											className="block text-white/90 font-medium mb-3"
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
											className="w-full px-4 py-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-luxury-accent focus:border-transparent backdrop-blur-sm"
										/>
									</div>
								</div>

								<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
									<div>
										<label
											htmlFor="email"
											className="block text-white/90 font-medium mb-3"
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
											className="w-full px-4 py-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-luxury-accent focus:border-transparent backdrop-blur-sm"
										/>
									</div>
									<div>
										<label
											htmlFor="phone"
											className="block text-white/90 font-medium mb-3"
										>
											Phone Number
										</label>
										<input
											type="tel"
											id="phone"
											name="phone"
											value={formData.phone}
											onChange={handleInputChange}
											className="w-full px-4 py-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-luxury-accent focus:border-transparent backdrop-blur-sm"
										/>
									</div>
								</div>

								<div>
									<label
										htmlFor="company"
										className="block text-white/90 font-medium mb-3"
									>
										Company/Organization
									</label>
									<input
										type="text"
										id="company"
										name="company"
										value={formData.company}
										onChange={handleInputChange}
										className="w-full px-4 py-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-luxury-accent focus:border-transparent backdrop-blur-sm"
									/>
								</div>

								<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
									<div>
										<label
											htmlFor="propertyType"
											className="block text-white/90 font-medium mb-3"
										>
											Property Type of Interest
										</label>
										<select
											id="propertyType"
											name="propertyType"
											value={formData.propertyType}
											onChange={handleInputChange}
											className="w-full px-4 py-4 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-luxury-accent focus:border-transparent backdrop-blur-sm"
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
											className="block text-white/90 font-medium mb-3"
										>
											Reason for Inquiry *
										</label>
										<select
											id="inquiryType"
											name="inquiryType"
											required
											value={formData.inquiryType}
											onChange={handleInputChange}
											className="w-full px-4 py-4 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-luxury-accent focus:border-transparent backdrop-blur-sm"
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
										className="block text-white/90 font-medium mb-3"
									>
										Message *
									</label>
									<textarea
										id="message"
										name="message"
										rows={6}
										required
										value={formData.message}
										onChange={handleInputChange}
										className="w-full px-4 py-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-luxury-accent focus:border-transparent backdrop-blur-sm resize-none"
										placeholder="Tell us more about your needs..."
									></textarea>
								</div>

								<div>
									<label className="block text-white/90 font-medium mb-4">
										Preferred Contact Method
									</label>
									<div className="flex items-center space-x-6">
										<label htmlFor="contact-email" className="flex items-center cursor-pointer">
											<input
												type="radio"
												id="contact-email"
												name="preferredContact"
												value="email"
												checked={formData.preferredContact === 'email'}
												onChange={handleInputChange}
												className="focus:ring-luxury-accent h-5 w-5 text-luxury-accent border-white/30 bg-white/10"
											/>
											<span className="ml-3 text-white/90">Email</span>
										</label>
										<label htmlFor="contact-phone" className="flex items-center cursor-pointer">
											<input
												type="radio"
												id="contact-phone"
												name="preferredContact"
												value="phone"
												checked={formData.preferredContact === 'phone'}
												onChange={handleInputChange}
												className="focus:ring-luxury-accent h-5 w-5 text-luxury-accent border-white/30 bg-white/10"
											/>
											<span className="ml-3 text-white/90">Phone</span>
										</label>
									</div>
								</div>

								<div className="mt-8">
									<Button
										variant="primary"
										size="lg"
										className="w-full flex items-center justify-center text-lg py-4"
									>
										Send Message <Send size={20} className="ml-2" />
									</Button>
								</div>
								<p className="text-sm text-white/60 text-center mt-4">
									We respect your privacy. Your information will not be shared.
								</p>
							</form>
						</div>

						{/* Contact Info */}
						<div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-12">
							<h2 className="heading-luxury text-white text-3xl md:text-4xl font-bold mb-10">Contact Information</h2>
							<div className="space-y-8">
								<div className="flex items-start">
									<MapPin size={28} className="text-luxury-accent mr-6 mt-1" />
									<div>
										<h3 className="font-bold text-xl text-white mb-2">Our Office</h3>
										<p className="text-white/80">Specialty One Group</p>
										<p className="text-white/80">7033 E Greenway Pkwy, Suite 750</p>
										<p className="text-white/80">Scottsdale, AZ 85254</p>
									</div>
								</div>
								<div className="flex items-start">
									<Phone size={28} className="text-luxury-accent mr-6 mt-1" />
									<div>
										<h3 className="font-bold text-xl text-white mb-2">Call Us</h3>
										<a href="tel:602-730-9967" className="text-white/80 hover:text-luxury-accent text-lg transition-colors">
											(602) 730-9967
										</a>
									</div>
								</div>
								<div className="flex items-start">
									<Mail size={28} className="text-luxury-accent mr-6 mt-1" />
									<div>
										<h3 className="font-bold text-xl text-white mb-2">Email Us</h3>
										<a href="mailto:info@specialtyone.com" className="text-white/80 hover:text-luxury-accent text-lg transition-colors">
											info@specialtyone.com
										</a>
									</div>
								</div>
								<div className="flex items-start">
									<Clock size={28} className="text-luxury-accent mr-6 mt-1" />
									<div>
										<h3 className="font-bold text-xl text-white mb-2">Business Hours</h3>
										<p className="text-white/80">Monday - Friday: 9 AM - 5 PM (MST)</p>
										<p className="text-white/80">Weekends: By Appointment</p>
									</div>
								</div>
							</div>

							<div className="mt-12 pt-8 border-t border-white/20">
								<h3 className="font-bold text-xl text-white mb-6">Connect with our Leadership:</h3>
								{teamMembers.map((member) => (
									<div key={member.name} className="mb-6 pb-6 border-b border-white/10 last:border-b-0 last:pb-0 last:mb-0">
										<p className="font-bold text-white text-lg">{member.name}</p>
										<p className="text-white/70 mb-3">{member.title.split(' | ')[1]}</p>
										<div className="flex flex-col sm:flex-row sm:items-center gap-3">
											<a href={`tel:${member.phone}`} className="text-luxury-accent hover:text-luxury-light transition-colors flex items-center">
												<Phone size={16} className="mr-2" /> {member.phone}
											</a>
											<a href={`mailto:${member.email}`} className="text-luxury-accent hover:text-luxury-light transition-colors flex items-center">
												<Mail size={16} className="mr-2" /> Email
											</a>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>


			{/* Team Member Section */}
			<section className="py-24 bg-white">
				<div className="container-custom">
					<h2 className="heading-luxury text-luxury-dark text-4xl md:text-5xl font-bold mb-16 text-center leading-tight">
						Meet Our Leadership
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
						{teamMembers.map((member, index) => (
							<Card
								key={index}
								className="group flex flex-col sm:flex-row items-center bg-gradient-subtle backdrop-blur-sm border border-luxury-light/20 rounded-3xl overflow-hidden transition-all duration-300 hover:bg-white/80"
							>
								<div className="sm:w-2/5 h-80 sm:h-auto">
									<img
										src={member.image}
										alt={member.name}
										className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
										loading="lazy"
									/>
								</div>
								<CardContent className="p-8 sm:w-3/5">
									<h3 className="heading-luxury text-2xl font-bold text-luxury-primary mb-2">{member.name}</h3>
									<p className="text-luxury-dark/70 font-medium mb-4">{member.title}</p>
									<p className="text-luxury-dark/80 mb-6 leading-relaxed">{member.bio.substring(0, 120)}...</p>
									<div className="space-y-2 mb-6">
										{member.specialties.slice(0, 2).map((spec) => (
											<span
												key={spec}
												className="inline-block bg-luxury-primary/20 text-luxury-primary text-xs font-semibold mr-2 px-3 py-1 rounded-full"
											>
												{spec}
											</span>
										))}
									</div>
									<Button
										variant="outline"
										size="lg"
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
			<section className="py-24 bg-luxury-dark">
				<div className="container-custom">
					<h2 className="heading-luxury text-white text-4xl md:text-5xl font-bold mb-16 text-center leading-tight">
						Frequently Asked Questions
					</h2>
					<div className="max-w-4xl mx-auto">
						{faqs.map((faq, index) => (
							<details
								key={index}
								className="group bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl mb-6 transition-all duration-300 open:bg-white/15"
							>
								<summary className="font-bold text-xl text-white cursor-pointer flex justify-between items-center list-none">
									{faq.q}
									<span className="text-luxury-accent transform transition-transform duration-300 group-open:rotate-45">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
										</svg>
									</span>
								</summary>
								<p className="text-white/80 mt-6 pt-6 border-t border-white/20 leading-relaxed text-lg">{faq.a}</p>
							</details>
						))}
					</div>
				</div>
			</section>
		</div>
	);
};

export default ContactPage;

import { ArrowRight, Award, Users, Target, Shield } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { ProfileImage } from '../components/ui/CloudinaryImage';

const teamMembers = [
	{
		name: 'Andrew Warner, CCIM',
		title: 'President | Manufactured Housing & RV',
		image: '/dist/assets/Leadership/andrew-headshot-image.webp',
		bio: 'Andrew leads our MH and RV practice with deep expertise in complex transactions. His track record includes $304M+ in closings with a 100% success rate on exclusive listings.',
		specialties: [
			'Manufactured Housing Communities',
			'RV Parks & Outdoor Hospitality',
			'1031 Exchange Strategy',
			'Complex Deal Structuring',
		],
		credentials: [
			'CCIM (Certified Commercial Investment Member)',
			'Licensed Real Estate Broker',
			'15+ Years CRE Experience',
		],
		email: 'andrew@specialtyone.com',
		phone: '602-730-9967',
	},
	{
		name: 'Denise Nuñez',
		title: 'President | Storage Group',
		image: '/dist/assets/Leadership/denise-nunez-self-storage.webp',
		bio: "Denise brings 25+ years of self-storage expertise to every transaction. She's led $721M+ in storage deals and understands the operational nuances that drive value.",
		specialties: [
			'Self-Storage Facilities',
			'Climate-Controlled Operations',
			'Value-Add Positioning',
			'Institutional Sales',
		],
		credentials: [
			'25+ Years Storage Industry Experience',
			'Licensed Real Estate Broker',
			'Former Storage Operator',
		],
		email: 'denise@specialtyone.com',
		phone: '602-697-8868',
	},
];

const companyValues = [
	{
		icon: <Target size={32} className="text-white" />,
		title: 'Results Over Marketing',
		description:
			'We don\'t chase headlines or awards. We close deals. Our success is measured by client outcomes, not marketing metrics.',
	},
	{
		icon: <Shield size={32} className="text-white" />,
		title: 'Confidentiality First',
		description:
			'Your business stays private until you decide otherwise. We protect seller confidentiality and buyer relationships with equal rigor.',
	},
	{
		icon: <Users size={32} className="text-white" />,
		title: 'Senior-Level Attention',
		description:
			'No handoffs to junior staff. Every client works directly with our principals who have skin in the game and decades of experience.',
	},
	{
		icon: <Award size={32} className="text-white" />,
		title: 'Specialized Expertise',
		description:
			'We focus exclusively on MH, RV, and Storage because specialization delivers superior results for our clients.',
	},
];

const milestones = [
	{
		year: '2024',
		title: 'Foundation',
		description:
			'Andrew Warner and Denise Nuñez establish Specialty One with decades of combined expertise',
	},
	{
		year: '2024',
		title: 'Specialized Focus',
		description:
			'Launched with exclusive focus on manufactured housing, RV parks, and self-storage',
	},
	{
		year: '2024',
		title: 'Proven Team',
		description:
			'Combined team experience of $1B+ in transactions across specialized asset classes',
	},
	{
		year: '2025',
		title: 'Rapid Growth',
		description:
			'Expanding our exclusive buyer and seller networks while maintaining boutique service quality',
	},
];

const stats = [
	{
		value: '$1B+',
		label: 'Total Transaction Volume',
	},
	{
		value: '100%',
		label: 'Success on Exclusive MH & RV Listings',
	},
	{
		value: '200+',
		label: 'Storage Facilities Sold',
	},
	{
		value: '25+',
		label: 'Years Combined Experience',
	},
];

const AboutPage = () => {
	return (
		<div className="flex flex-col min-h-screen bg-luxury-dark">
			{/* Hero Section */}
			<section className="relative pt-40 pb-32 overflow-hidden">
				<div className="absolute inset-0 bg-gradient-luxury-dark opacity-95"></div>
				<div className="container-custom relative z-10">
					<div className="max-w-4xl mx-auto text-center">
						<h1 className="heading-luxury text-white text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight leading-[0.9]">
							We Don't Sell Everything.
							<span className="block text-luxury-light">We Sell What We Know.</span>
						</h1>
						<p className="text-xl md:text-2xl mb-12 text-white/90 leading-relaxed max-w-3xl mx-auto">
							Manufactured Housing. RV Parks. Self-Storage.
							<br />
							Three asset classes. Deep expertise. Proven results.
						</p>
						<div className="flex flex-col sm:flex-row justify-center gap-6">
							<Button
								to="/contact"
								variant="primary"
								size="lg"
								className="text-lg px-8 py-4"
							>
								Work With Our Team
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* Company Story */}
			<section className="py-24 bg-white">
				<div className="container-custom">
					<div className="max-w-4xl mx-auto">
						<h2 className="heading-luxury text-luxury-dark text-4xl md:text-5xl font-bold mb-16 text-center leading-tight">
							Built on the Belief That Specialization Wins
						</h2>
						<div className="prose prose-lg max-w-none">
							<p className="text-xl mb-8 text-luxury-dark/80 leading-relaxed">
								Most commercial real estate brokers try to be everything to everyone.
								We took the opposite approach—focusing exclusively on three asset classes
								that require specialized knowledge, operational understanding, and buyer relationships
								that can't be built overnight.
							</p>
							<p className="text-xl mb-8 text-luxury-dark/80 leading-relaxed">
								Since our founding, we've closed over $1 billion in transactions across manufactured housing,
								RV parks, and self-storage. We've never failed to close an exclusive listing in the MH or RV space.
								Our storage group, led by 25-year industry veteran Denise Nuñez, has sold over 200 facilities.
							</p>
							<p className="text-xl mb-8 text-luxury-dark/80 leading-relaxed">
								We don't chase market trends or expand into new asset classes for the sake of growth.
								We stay focused on what we know, continuously deepening our expertise and relationships
								to deliver superior results for our clients.
							</p>
							<p className="text-xl font-medium text-luxury-primary leading-relaxed">
								The result? Clean closings, qualified buyers, and outcomes that exceed expectations—even in challenging markets.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Stats */}
			<section className="py-24 bg-luxury-dark">
				<div className="container-custom">
					<h2 className="heading-luxury text-white text-4xl md:text-5xl font-bold mb-16 text-center leading-tight">
						The Numbers Tell the Story
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
						{stats.map((stat, index) => (
							<Card
								key={index}
								className="text-center py-12 px-8 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300"
							>
								<CardContent>
									<div className="heading-luxury text-5xl md:text-6xl font-bold text-luxury-accent mb-4">
										{stat.value}
									</div>
									<div className="text-white/80 text-lg font-medium">
										{stat.label}
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Team Section */}
			<section className="py-24 bg-white">
				<div className="container-custom">
					<h2 className="heading-luxury text-luxury-dark text-4xl md:text-5xl font-bold mb-16 text-center leading-tight">
						Leadership
					</h2>
					<div className="space-y-24">
						{teamMembers.map((member, index) => (
							<div
								key={index}
								className={`
                  flex flex-col lg:flex-row items-center gap-12
                  ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}
                `}
							>
								<div className="lg:w-1/3">
									<div className="relative">
										<ProfileImage
											localPath={member.image}
											alt={member.name}
											className="w-full max-w-sm mx-auto rounded-2xl shadow-lg border-4 border-luxury-light/20"
											size="large"
										/>
									</div>
								</div>

								<div className="lg:w-2/3">
									<h3 className="heading-luxury text-3xl font-bold mb-3 text-luxury-dark">
										{member.name}
									</h3>
									<p className="text-xl text-luxury-primary font-medium mb-6">
										{member.title}
									</p>
									<p className="text-luxury-dark/80 mb-8 text-lg leading-relaxed">
										{member.bio}
									</p>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
										<div>
											<h4 className="font-bold mb-4 text-luxury-dark text-lg">Specialties</h4>
											<ul className="space-y-2">
												{member.specialties.map((specialty, idx) => (
													<li key={idx} className="flex items-start gap-3">
														<span className="text-luxury-accent text-xl">•</span>
														<span className="text-luxury-dark/70">{specialty}</span>
													</li>
												))}
											</ul>
										</div>

										<div>
											<h4 className="font-bold mb-4 text-luxury-dark text-lg">Credentials</h4>
											<ul className="space-y-2">
												{member.credentials.map((credential, idx) => (
													<li key={idx} className="flex items-start gap-3">
														<span className="text-luxury-accent text-xl">•</span>
														<span className="text-luxury-dark/70">{credential}</span>
													</li>
												))}
											</ul>
										</div>
									</div>

									<div className="flex flex-col sm:flex-row gap-6">
										<a
											href={`mailto:${member.email}`}
											className="text-luxury-primary hover:text-luxury-accent font-medium text-lg transition-colors"
										>
											📧 {member.email}
										</a>
										<a
											href={`tel:${member.phone}`}
											className="text-luxury-primary hover:text-luxury-accent font-medium text-lg transition-colors"
										>
											📞 {member.phone}
										</a>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Company Values */}
			<section className="py-24 bg-luxury-dark">
				<div className="container-custom">
					<h2 className="heading-luxury text-white text-4xl md:text-5xl font-bold mb-16 text-center leading-tight">
						How We Operate
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
						{companyValues.map((value, index) => (
							<div
								key={index}
								className="flex gap-8 p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300"
							>
								<div className="flex-shrink-0">
									<div className="w-20 h-20 rounded-full bg-gradient-to-br from-luxury-accent to-luxury-primary flex items-center justify-center">
										{value.icon}
									</div>
								</div>
								<div>
									<h3 className="text-2xl font-bold mb-4 text-white">
										{value.title}
									</h3>
									<p className="text-white/80 text-lg leading-relaxed">
										{value.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Timeline */}
			<section className="py-24 bg-white">
				<div className="container-custom">
					<h2 className="heading-luxury text-luxury-dark text-4xl md:text-5xl font-bold mb-16 text-center leading-tight">
						Our Journey
					</h2>
					<div className="relative">
						{/* Timeline Line */}
						<div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-luxury-primary to-luxury-accent transform -translate-x-1/2"></div>

						<div className="space-y-16">
							{milestones.map((milestone, index) => (
								<div
									key={index}
									className={`
                    flex flex-col lg:flex-row items-center gap-12
                    ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}
                  `}
								>
									{/* Year Circle */}
									<div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2">
										<div className="w-20 h-20 rounded-full bg-gradient-to-br from-luxury-primary to-luxury-accent flex items-center justify-center text-white font-bold text-xl">
											{milestone.year}
										</div>
									</div>

									{/* Content */}
									<div className={`lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}`}>
										<div className="lg:hidden mb-6">
											<div className="w-20 h-20 rounded-full bg-gradient-to-br from-luxury-primary to-luxury-accent flex items-center justify-center text-white font-bold text-xl mx-auto">
												{milestone.year}
											</div>
										</div>

										<h3 className="text-2xl font-bold mb-4 text-center lg:text-inherit text-luxury-dark">
											{milestone.title}
										</h3>
										<p className="text-luxury-dark/70 text-center lg:text-inherit text-lg leading-relaxed">
											{milestone.description}
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

			{/* CTA Section */}
			<section className="py-24 bg-gradient-luxury-dark">
				<div className="container-custom">
					<div className="max-w-4xl mx-auto text-center">
						<h2 className="heading-luxury text-white text-4xl md:text-5xl font-bold mb-8 leading-tight">
							Ready to Work With Specialists?
						</h2>
						<p className="text-xl mb-12 text-white/90 leading-relaxed max-w-3xl mx-auto">
							Whether you're buying, selling, or planning a 1031 exchange,
							our team brings the expertise and relationships to get it done right.
						</p>
						<div className="flex flex-col sm:flex-row justify-center gap-6">
							<Button
								to="/contact"
								variant="primary"
								size="lg"
								icon={<ArrowRight size={20} />}
								iconPosition="right"
								className="text-lg px-8 py-4"
							>
								Start the Conversation
							</Button>

							<Button
								to="/advantage"
								variant="outline"
								size="lg"
								className="border-white text-white hover:bg-white/10 text-lg px-8 py-4"
							>
								See How We Work
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
						<Button
							to="/success-stories"
							variant="outline"
							className="text-center py-8 border-white/60 text-white hover:bg-white/20 hover:border-white text-lg"
						>
							📖 Success Stories
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
};

export default AboutPage;

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
		<div className="flex flex-col min-h-screen bg-sand">
			{/* Hero Section */}
			<section className="pt-32 pb-20 bg-gradient-hero text-white">
				<div className="container-custom">
					<div className="max-w-3xl mx-auto text-center text-sand">
						<h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
							We Don't Sell Everything.
							<span className="block">We Sell What We Know.</span>
						</h1>
						<p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
							Manufactured Housing. RV Parks. Self-Storage.
							<br />
							Three asset classes. Deep expertise. Proven results.
						</p>
						<div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
							<Button
								to="/contact"
								variant="primary"
								size="lg"
							>
								Work With Our Team
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* Company Story */}
			<section className="py-16 bg-sand">
				<div className="container-custom">
					<div className="max-w-4xl mx-auto">
						<h2 className="font-display text-3xl md:text-4xl font-bold mb-8 text-center">
							Built on the Belief That Specialization Wins
						</h2>
						<div className="prose prose-lg max-w-none">
							<p className="text-lg mb-6">
								Most commercial real estate brokers try to be everything to everyone.
								We took the opposite approach—focusing exclusively on three asset classes
								that require specialized knowledge, operational understanding, and buyer relationships
								that can't be built overnight.
							</p>
							<p className="text-lg mb-6">
								Since our founding, we've closed over $1 billion in transactions across manufactured housing,
								RV parks, and self-storage. We've never failed to close an exclusive listing in the MH or RV space.
								Our storage group, led by 25-year industry veteran Denise Nuñez, has sold over 200 facilities.
							</p>
							<p className="text-lg mb-6">
								We don't chase market trends or expand into new asset classes for the sake of growth.
								We stay focused on what we know, continuously deepening our expertise and relationships
								to deliver superior results for our clients.
							</p>
							<p className="text-lg font-medium text-plum">
								The result? Clean closings, qualified buyers, and outcomes that exceed expectations—even in challenging markets.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Stats */}
			<section className="py-16 bg-cloud">
				<div className="container-custom">
					<h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
						The Numbers Tell the Story
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{stats.map((stat, index) => (
							<Card
								key={index}
								className="text-center py-8 animate-fade-in"
								style={{ animationDelay: `${0.1 * index}s` }}
							>
								<CardContent>
									<div className="font-display text-4xl font-bold text-plum mb-2">
										{stat.value}
									</div>
									<div className="text-gray-700">
										{stat.label}
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Team Section */}
			<section className="py-16 bg-sand">
				<div className="container-custom">
					<h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
						Leadership
					</h2>
					<div className="space-y-16">
						{teamMembers.map((member, index) => (
							<div
								key={index}
								className={`
                  flex flex-col lg:flex-row items-center gap-8
                  ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}
                  animate-fade-in
                `}
								style={{ animationDelay: `${0.2 * index}s` }}
							>
								<div className="lg:w-1/3">
									<div className="relative">
										<ProfileImage
											localPath={member.image}
											alt={member.name}
											className="w-full max-w-sm mx-auto rounded-lg shadow-lg"
											size="large"
										/>
									</div>
								</div>

								<div className="lg:w-2/3">
									<h3 className="font-display text-2xl font-bold mb-2">
										{member.name}
									</h3>
									<p className="text-lg text-plum font-medium mb-4">
										{member.title}
									</p>
									<p className="text-gray-700 mb-6">
										{member.bio}
									</p>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
										<div>
											<h4 className="font-bold mb-3">Specialties</h4>
											<ul className="space-y-1">
												{member.specialties.map((specialty, idx) => (
													<li key={idx} className="flex items-start gap-2">
														<span className="text-sage">•</span>
														<span className="text-gray-600">{specialty}</span>
													</li>
												))}
											</ul>
										</div>

										<div>
											<h4 className="font-bold mb-3">Credentials</h4>
											<ul className="space-y-1">
												{member.credentials.map((credential, idx) => (
													<li key={idx} className="flex items-start gap-2">
														<span className="text-sage">•</span>
														<span className="text-gray-600">{credential}</span>
													</li>
												))}
											</ul>
										</div>
									</div>

									<div className="flex flex-col sm:flex-row gap-4">
										<a
											href={`mailto:${member.email}`}
											className="text-plum hover:text-amethyst font-medium"
										>
											📧 {member.email}
										</a>
										<a
											href={`tel:${member.phone}`}
											className="text-plum hover:text-amethyst font-medium"
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
			<section className="py-16 bg-cloud">
				<div className="container-custom">
					<h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
						How We Operate
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{companyValues.map((value, index) => (
							<div
								key={index}
								className="flex gap-6 animate-fade-in"
								style={{ animationDelay: `${0.2 * index}s` }}
							>
								<div className="flex-shrink-0">
									<div className="w-16 h-16 rounded-full bg-gradient-to-br from-plum to-amethyst flex items-center justify-center">
										{value.icon}
									</div>
								</div>
								<div>
									<h3 className="font-display text-xl font-bold mb-3">
										{value.title}
									</h3>
									<p className="text-gray-700">
										{value.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Timeline */}
			<section className="py-16 bg-sand">
				<div className="container-custom">
					<h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
						Our Journey
					</h2>
					<div className="relative">
						{/* Timeline Line */}
						<div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-plum to-sage transform -translate-x-1/2"></div>

						<div className="space-y-12">
							{milestones.map((milestone, index) => (
								<div
									key={index}
									className={`
                    flex flex-col lg:flex-row items-center gap-8
                    ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}
                    animate-fade-in
                  `}
									style={{ animationDelay: `${0.2 * index}s` }}
								>
									{/* Year Circle */}
									<div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2">
										<div className="w-16 h-16 rounded-full bg-gradient-to-br from-plum to-amethyst flex items-center justify-center text-white font-bold">
											{milestone.year}
										</div>
									</div>

									{/* Content */}
									<div className={`lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}`}>
										<div className="lg:hidden mb-4">
											<div className="w-16 h-16 rounded-full bg-gradient-to-br from-plum to-amethyst flex items-center justify-center text-white font-bold mx-auto">
												{milestone.year}
											</div>
										</div>

										<h3 className="font-display text-xl font-bold mb-3 text-center lg:text-inherit">
											{milestone.title}
										</h3>
										<p className="text-gray-700 text-center lg:text-inherit">
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
			<section className="py-16 bg-gradient-to-br from-obsidian to-amethyst text-white">
				<div className="container-custom">
					<div className="max-w-3xl mx-auto text-center">
						<h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
							Ready to Work With Specialists?
						</h2>
						<p className="text-lg mb-8 opacity-90">
							Whether you're buying, selling, or planning a 1031 exchange,
							our team brings the expertise and relationships to get it done right.
						</p>
						<div className="flex flex-col sm:flex-row justify-center gap-4">
							<Button
								to="/contact"
								variant="primary"
								size="lg"
								icon={<ArrowRight size={20} />}
								iconPosition="right"
							>
								Start the Conversation
							</Button>

							<Button
								to="/advantage"
								variant="outline"
								size="lg"
								className="border-white text-white hover:bg-white/10"
							>
								See How We Work
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* Related Links */}
			<section className="py-16 bg-sand">
				<div className="container-custom">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
						<Button
							to="/success-stories"
							variant="outline"
							className="text-center py-6"
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

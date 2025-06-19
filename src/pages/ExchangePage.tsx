import { ArrowRight, MapPin, Building, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ProfileImage, CloudinaryImage } from '../components/ui/CloudinaryImage';
import { InsightsByCategorySimple } from '../components/insights/InsightsByCategorySimple';
import { SEOHead } from '../components/ui/SEOHead';

const strategies = [
	{
		title: '1031 Exchange',
		icon: '🔁',
		heading: 'Keep your equity compounding.',
		description:
			'We structure tax-deferred sales that let you roll profits into new real estate—on your timeline, with the right buyer, and the right replacement asset. Strategy, timing, and execution—handled.',
	},
	{
		title: 'Delaware Statutory Trusts (DSTs)',
		icon: '🏢',
		heading: 'Passive income. Tax deferral. No management.',
		description:
			'Exit active ownership and step into fractional interest in institutional-quality real estate. DSTs provide income, diversification, and total hands-off management.',
	},
	{
		title: '721 UPREIT Transactions',
		icon: '📈',
		heading: 'Convert property into liquidity.',
		description:
			'Defer taxes by contributing your property into a REIT operating partnership. Gain exposure to a larger portfolio and receive partnership units with long-term liquidity and estate planning benefits.',
	},
];

const qualifications = [
	{
		title: 'Capital Gains Deferral',
		description: 'Are selling appreciated property and want to defer capital gains while maintaining investment growth potential.',
	},
	{
		title: 'Tax-Efficient Passive Income',
		description: 'Want passive income without losing tax efficiency through strategic reinvestment structures.',
	},
	{
		title: 'Strategic Exchange Timing',
		description: 'Need to time a 1031 exchange without scrambling, with proper planning and qualified intermediary coordination.',
	},
	{
		title: 'Liquidity Through DST or UPREIT',
		description: 'Are ready to unlock liquidity via Delaware Statutory Trust or UPREIT transactions while maintaining tax advantages.',
	},
];

const caseStudies = [
	{
		title: 'Desert Trails RV Park',
		location: 'Tucson, AZ',
		propertyType: 'RV Park',
		challenge: 'Zoning issues and COVID uncertainty created market concerns',
		solution: 'Strategic positioning and expert negotiation to overcome obstacles',
		result: 'Closed at full asking price despite market challenges',
		heroImage: '/assets/success-stories/desert-trails.webp',
		link: '/success-stories/desert-trails',
	},
	{
		title: 'American Self Storage',
		location: 'Chandler, AZ',
		propertyType: 'Self-Storage',
		challenge: 'Complex property with mail center component needed specialized buyer',
		solution: 'Identified strategic buyer who valued expansion potential',
		result: 'Premium sale price with expansion upside recognized',
		heroImage: '/assets/success-stories/american-ss-mail.webp',
		link: '/success-stories/american-self-storage',
	},
	{
		title: 'The Palms MHC',
		location: 'Apache Junction, AZ',
		propertyType: 'Manufactured Housing',
		challenge: '88-site community in competitive market needed standout marketing',
		solution: 'Generated massive buyer interest through targeted outreach',
		result: '80+ offers received, sub-3% cap rate achieved',
		heroImage: '/assets/success-stories/the-palms.webp',
		link: '/success-stories/the-palms',
	},
];

const ExchangePage = () => {
	return (
		<>
			<SEOHead
				title="1031 Exchange Services | Tax-Deferred CRE Transactions"
				description="Expert 1031 exchange services for manufactured housing, RV parks, and self-storage properties. Defer capital gains taxes while growing your commercial real estate portfolio."
				keywords="1031 exchange, like-kind exchange, tax deferred exchange, commercial real estate, capital gains deferral, investment property exchange, qualified intermediary"
				url="https://specialtyone.com/1031-exchange"
			/>
			<div className="flex flex-col min-h-screen bg-sand">
			{/* Hero Section */}
			<section className="pt-40 pb-28 bg-gradient-hero text-white">
				<div className="container-custom">
					<div className="max-w-3xl mx-auto text-center text-sand">
						<h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-12 animate-fade-in">
							Sell Smart. Defer Taxes.
							<span className="block">Keep Growing.</span>
						</h1>
						<p
							className="text-xl md:text-2xl mb-12 md:mb-16 opacity-90 animate-fade-in"
							style={{ animationDelay: '0.2s' }}
						>
							When you sell a property, capital gains don't have to become dead
							weight. We help MH, RV Park, and Self-Storage owners reinvest
							intelligently—minimizing taxes and maximizing control.
						</p>
						<div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>							<Button
								href="https://form.typeform.com/to/oX1bWHD5"
								variant="primary"
								size="lg"
								target="_blank"
								rel="noopener noreferrer"
							>
								Navigate Your 1031 Exchange
							</Button>
						</div>
						<p
							className="text-sm mt-4 opacity-75 animate-fade-in"
							style={{ animationDelay: '0.4s' }}
						>
							Get clarity on your options before you sell.
						</p>
					</div>
				</div>
			</section>

			{/* Strategies Section */}
			<section className="py-20 md:py-28 bg-sand">
				<div className="container-custom">
					<h2 className="font-display text-3xl md:text-4xl font-bold mb-16 md:mb-20 text-center">
						Solutions That <span className="text-gradient">Keep Your Capital Working</span>
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
						{strategies.map((strategy, index) => (
							<Card
								key={index}
								className="animate-fade-in"
								style={{ animationDelay: `${0.2 * index}s` }}
							>
								<CardContent className="p-8">
									<div className="text-4xl mb-4">{strategy.icon}</div>
									<h3 className="font-display text-xl font-bold mb-3">
										{strategy.title}
									</h3>
									<p className="text-lg font-medium text-plum mb-4">
										{strategy.heading}
									</p>
									<p className="text-gray-600">
										{strategy.description}
									</p>
								</CardContent>
							</Card>
						))}
					</div>

				</div>
			</section>

			{/* Who This Is For */}
			<section className="relative py-20 md:py-28 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
				{/* Cloud Background Elements */}
				<div className="absolute inset-0">
					<div className="absolute top-10 left-10 w-32 h-32 bg-white/30 rounded-full blur-xl"></div>
					<div className="absolute top-20 right-20 w-24 h-24 bg-white/20 rounded-full blur-lg"></div>
					<div className="absolute bottom-20 left-20 w-40 h-40 bg-white/25 rounded-full blur-2xl"></div>
					<div className="absolute bottom-10 right-10 w-28 h-28 bg-white/15 rounded-full blur-xl"></div>
					<div className="absolute top-1/2 left-1/3 w-36 h-36 bg-white/20 rounded-full blur-2xl"></div>
					<div className="absolute top-1/3 right-1/4 w-20 h-20 bg-white/25 rounded-full blur-lg"></div>
				</div>
				
				<div className="relative z-10 container-custom">
					<div className="max-w-4xl mx-auto">
						<h2 className="font-display text-3xl md:text-4xl font-bold mb-12 md:mb-16 text-center">
							Designed <span className="text-gradient">for Owners Who:</span>
						</h2>
						<div className="space-y-6">
							{qualifications.map((item, index) => (
								<div
									key={index}
									className="bg-white/80 backdrop-blur-sm rounded-xl p-8 hover:shadow-2xl transition-all duration-300 animate-fade-in border border-white/20 hover:bg-white/90"
									style={{ animationDelay: `${0.1 * (index + 1)}s` }}
								>
									<div className="flex items-start gap-6">
										<CheckCircle size={24} className="text-sage mt-1 flex-shrink-0" />
										<div>
											<h3 className="font-display text-xl font-bold text-plum mb-4">
												{item.title}
											</h3>
											<p className="text-lg text-gray-700 leading-relaxed">
												{item.description}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Legislative Updates Insights Section */}
			<section className="py-20 md:py-28 bg-sand">
				<div className="container-custom">
					<div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
						<h2 className="font-display text-3xl md:text-4xl font-bold mb-8 md:mb-12">
							Tax Laws Evolve. Buyer Demand Moves. <span className="text-gradient">Stay Ahead.</span>
						</h2>
					</div>
					<InsightsByCategorySimple 
						categoryId={5}
						maxCount={3}
						className="mb-16 md:mb-20"
					/>

				</div>
			</section>

			{/* Case Studies */}
			<section className="py-20 md:py-28 bg-gradient-to-br from-sand to-white">
				<div className="container-custom">
					<div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
						<h2 className="font-display text-3xl md:text-4xl font-bold mb-6 md:mb-8">
							Real Owners. Real Outcomes. <span className="text-gradient">Clean Exits.</span>
						</h2>
						<p className="text-lg text-gray-700">
							Not every seller needs a 1031. But every seller needs certainty.
							Here are recent examples of owners who exited smart, on their terms.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
						{caseStudies.map((study, index) => (
							<Card 
								key={index}
								className="overflow-hidden hover:shadow-2xl transition-all duration-500 group border-0 bg-white animate-fade-in"
								style={{ animationDelay: `${0.2 * index}s` }}
							>
								<div className="relative h-64 overflow-hidden">
									<CloudinaryImage 
										localPath={study.heroImage}
										alt={study.title}
										className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
									<div className="absolute top-4 left-4">
										<Badge 
											color="primary" 
											variant="gradient"
											className="text-white font-medium"
										>
											{study.propertyType}
										</Badge>
									</div>
									<div className="absolute bottom-4 left-4 right-4">
										<div className="flex items-center gap-2 text-white/90 text-sm">
											<MapPin size={14} />
											<span>{study.location}</span>
										</div>
									</div>
								</div>
								
								<CardContent className="p-8">
									<h3 className="font-display text-xl font-bold mb-4 text-gray-900 group-hover:text-plum transition-colors">
										{study.title}
									</h3>
									
									<div className="space-y-4 mb-6">
										<div>
											<p className="text-gray-700 text-sm font-medium mb-1">Challenge:</p>
											<p className="text-gray-600 text-sm">{study.challenge}</p>
										</div>
										<div>
											<p className="text-gray-700 text-sm font-medium mb-1">Solution:</p>
											<p className="text-gray-600 text-sm">{study.solution}</p>
										</div>
										<div>
											<p className="text-gray-700 text-sm font-medium mb-1">Result:</p>
											<div className="flex items-start gap-2">
												<span className="text-sage font-bold text-sm">✓</span>
												<span className="text-gray-600 text-sm">{study.result}</span>
											</div>
										</div>
									</div>
									
									<div className="flex items-center justify-between pt-6 border-t border-gray-100">
										<div className="flex items-center gap-2">
											<Building size={16} className="text-plum" />
											<span className="text-gray-600 text-sm font-medium">1031 Exchange</span>
										</div>
										
										<Button
											to={study.link}
											variant="outline"
											className="group-hover:translate-x-1 transition-all duration-300"
										>
											See Case Study
										</Button>
									</div>
								</CardContent>
							</Card>
						))}
					</div>

					<div className="text-center mt-12 md:mt-16">
						<Button
							to="/success-stories"
							variant="primary"
							icon={<ArrowRight size={20} />}
							iconPosition="right"
						>
							View All Success Stories
						</Button>
					</div>
				</div>
			</section>

			{/* Commitment Section */}
			<section className="relative py-20 md:py-28">
				<div className="absolute inset-0 bg-gradient-luxury-dark opacity-95"></div>
				<div className="relative z-10 container-custom">
					<div className="max-w-4xl mx-auto text-center">
						<h2 className="font-display text-3xl md:text-5xl font-bold mb-12 md:mb-16 text-white leading-tight md:leading-tight">
							You Bring the Asset.<br className="block" />
							<span className="text-luxury-light">We'll Bring the Strategy.</span>
						</h2>
						<div className="space-y-8 md:space-y-10 text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
							<p>
								We don't flood inboxes. We don't overpromise. We work deal-by-deal
								with owners who want clean, tax-aware exits—backed by experience,
								market knowledge, and execution.
							</p>
							<p>
								At The Specialty One, we're not in the business of wasting anyone's time—especially yours. If you're sitting on a mobile home park, RV park, self-storage facility, or RV storage property with real value, you deserve more than bulk emails and empty promises.
							</p>
							<p>
								We bring Wall Street-grade strategy to Main Street assets—off-market guidance, transactional clarity, and razor-sharp pricing insight. Every move we make is backed by deep transactional data, buyer activity analysis, and an understanding of how to engineer clean exits without triggering avoidable tax pain.
							</p>
							<p className="text-xl md:text-2xl font-semibold mt-12 md:mt-16">
								<span className="text-luxury-light">If you're thinking of selling—or just want to understand your options—start with a real conversation.</span>
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Team CTA - Cloud Style */}
			<section className="relative py-20 md:py-28 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
				{/* Cloud Background Elements */}
				<div className="absolute inset-0">
					<div className="absolute top-10 left-10 w-32 h-32 bg-white/30 rounded-full blur-xl"></div>
					<div className="absolute top-20 right-20 w-24 h-24 bg-white/20 rounded-full blur-lg"></div>
					<div className="absolute bottom-20 left-20 w-40 h-40 bg-white/25 rounded-full blur-2xl"></div>
					<div className="absolute bottom-10 right-10 w-28 h-28 bg-white/15 rounded-full blur-xl"></div>
				</div>
				
				<div className="relative z-10 container-custom">
					<div className="text-center mb-16 md:mb-20">
						<h2 className="font-display text-3xl md:text-4xl font-bold mb-6 md:mb-8">
							Let's Build <span className="text-gradient">Your Exit Plan</span>
						</h2>
						<p className="text-lg text-gray-600">
							Free consultation. No obligation.
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
						{/* Andrew Warner */}
						<div className="bg-white/80 backdrop-blur-sm rounded-2xl p-10 md:p-12 text-center shadow-2xl border border-white/20 hover:bg-white/90 transition-all duration-300">
							<ProfileImage
								localPath="/assets/Leadership/andrew-headshot-image.webp"
								alt="Andrew Warner"
								className="w-32 h-32 rounded-full mx-auto object-cover mb-8 shadow-lg"
								size="small"
							/>
							<h3 className="font-display text-2xl font-bold mb-3">
								Andrew Warner, CCIM
							</h3>
							<p className="text-gray-600 mb-3">
								President | Warner MHRV Group
							</p>
							<p className="text-gray-600 mb-6">
								Specialist – MH / RV Exchanges
							</p>
							<div className="flex flex-col items-center gap-3 mb-8">
								<a
									href="mailto:andrew@specialtyone.com"
									className="text-plum hover:text-amethyst transition-colors"
								>
									andrew@specialtyone.com
								</a>
								<a
									href="tel:602-730-9967"
									className="text-plum hover:text-amethyst transition-colors"
								>
									602-730-9967
								</a>
							</div>
							<Button
								to="/contact?expert=andrew"
								variant="primary"
							>
								Request Strategy Session
							</Button>
						</div>

						{/* Denise Nuñez */}
						<div className="bg-white/80 backdrop-blur-sm rounded-2xl p-10 md:p-12 text-center shadow-2xl border border-white/20 hover:bg-white/90 transition-all duration-300">
							<ProfileImage
								localPath="/assets/Leadership/denise-nunez-self-storage.webp"
								alt="Denise Nuñez"
								className="w-32 h-32 rounded-full mx-auto object-cover mb-8 shadow-lg"
								size="small"
							/>
							<h3 className="font-display text-2xl font-bold mb-3">
								Denise Nuñez
							</h3>
							<p className="text-gray-600 mb-3">
								President | Nunez Storage Group
							</p>
							<p className="text-gray-600 mb-6">
								Specialist – Self-Storage / DST & UPREIT
							</p>
							<div className="flex flex-col items-center gap-3 mb-8">
								<a
									href="mailto:denise@specialtyone.com"
									className="text-plum hover:text-amethyst transition-colors"
								>
									denise@specialtyone.com
								</a>
								<a
									href="tel:602-697-8868"
									className="text-plum hover:text-amethyst transition-colors"
								>
									602-697-8868
								</a>
							</div>
							<Button
								to="/contact?expert=denise"
								variant="primary"
							>
								Request Strategy Session
							</Button>
						</div>
					</div>
				</div>
			</section>
			</div>
		</>
	);
};

export default ExchangePage;

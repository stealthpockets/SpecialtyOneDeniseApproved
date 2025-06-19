import { ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

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
	'Are selling appreciated property and want to defer capital gains',
	'Want passive income without losing tax efficiency',
	'Need to time a 1031 exchange without scrambling',
	'Are ready to unlock liquidity via DST or UPREIT',
];

const caseStudies = [
	{
		title: 'Desert Trails RV Park',
		location: 'Tucson, AZ',
		description: 'Zoning issues. COVID uncertainty. Closed at full price.',
		link: '/success/desert-trails',
	},
	{
		title: 'American Self Storage',
		location: 'Chandler, AZ',
		description: 'Mail center + expansion upside. Strategically placed.',
		link: '/success/american-self-storage',
	},
	{
		title: 'The Palms MHC',
		location: 'Apache Junction, AZ',
		description: '88 sites. 80+ offers. Sub-3% cap.',
		link: '/success/the-palms',
	},
];

const ExchangePage = () => {
	return (
		<div className="flex flex-col min-h-screen bg-sand">
			{/* Hero Section */}
			<section className="pt-32 pb-20 bg-gradient-hero text-white">
				<div className="container-custom">
					<div className="max-w-3xl mx-auto text-center text-sand">
						<h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
							Sell Smart. Defer Taxes.
							<span className="block">Keep Growing.</span>
						</h1>
						<p
							className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in"
							style={{ animationDelay: '0.2s' }}
						>
							When you sell a property, capital gains don't have to become dead
							weight. We help MH, RV Park, and Self-Storage owners reinvest
							intelligently—minimizing taxes and maximizing control.
						</p>
						<div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
							<Button
								to="/contact"
								variant="primary"
								size="lg"
							>
								Talk to a Tax Strategy Expert
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
			<section className="py-16 bg-sand">
				<div className="container-custom">
					<h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
						Solutions That Keep Your Capital Working
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
					<div className="text-center mt-8">
						<Button
							to="/contact"
							variant="primary"
							size="lg"
						>
							Request a Custom Exit Briefing
						</Button>
					</div>
				</div>
			</section>

			{/* Who This Is For */}
			<section className="py-16 bg-sand">
				<div className="container-custom">
					<div className="max-w-3xl mx-auto text-center">
						<h2 className="font-display text-3xl md:text-4xl font-bold mb-8">
							This Strategy Page Is for You If You:
						</h2>
						<div className="space-y-4 text-lg mb-8">
							{qualifications.map((item, index) => (
								<p key={index}>✅ {item}</p>
							))}
						</div>
						<Button
							to="/contact"
							variant="primary"
							size="lg"
						>
							Speak With a Strategist
						</Button>
						<p className="text-sm lg:text-base mt-4 text-gray-600">
							Confidential. No pressure. Just strategy.
						</p>
					</div>
				</div>
			</section>

			{/* Market Intel Section */}
			<section className="py-16 bg-sand">
				<div className="container-custom">
					<div className="max-w-3xl mx-auto text-center">
						<h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
							Tax Laws Evolve. Buyer Demand Moves. Stay Ahead.
						</h2>
						<Button
							to="/newsletter"
							variant="primary"
							size="lg"
							icon={<ArrowRight size={20} />}
							iconPosition="right"
						>
							Sign Up for Investor Intel
						</Button>
						<p className="text-sm lg:text-base mt-4 text-gray-600">
							Monthly insights on 1031 timing, DST demand, and strategic exit
							windows.
						</p>
					</div>
				</div>
			</section>

			{/* Case Studies */}
			<section className="py-16 bg-sand">
				<div className="container-custom">
					<div className="max-w-3xl mx-auto text-center mb-12">
						<h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
							Real Owners. Real Outcomes. Clean Exits.
						</h2>
						<p className="text-lg text-gray-700">
							Not every seller needs a 1031. But every seller needs certainty.
							Here are recent examples of owners who exited smart, on their terms.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{caseStudies.map((study, index) => (
							<Card
								key={index}
								className="animate-fade-in"
								style={{ animationDelay: `${0.2 * index}s` }}
							>
								<CardContent className="p-6">
									<h3 className="font-display text-xl font-bold mb-2">
										{study.title}
									</h3>
									<p className="text-gray-600 mb-4">
										{study.location}
									</p>
									<p className="mb-4">
										{study.description}
									</p>
									<Button
										to={study.link}
										variant="outline"
									>
										See Case Study
									</Button>
								</CardContent>
							</Card>
						))}
					</div>

					<div className="text-center mt-8">
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
			<section className="py-16 bg-sand">
				<div className="container-custom">
					<div className="max-w-3xl mx-auto text-center">
						<h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
							You Bring the Asset. We'll Bring the Strategy.
						</h2>
						<p className="text-lg mb-8">
							We don't flood inboxes. We don't overpromise. We work deal-by-deal
							with owners who want clean, tax-aware exits—backed by experience,
							market knowledge, and execution.
						</p>
						<Button
							to="/contact"
							variant="primary"
							size="lg"
						>
							Let's Build Your Exit Plan
						</Button>
					</div>
				</div>
			</section>

			{/* Team CTA */}
			<section className="py-16 bg-sand">
				<div className="container-custom">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{/* Andrew Warner */}
						<div className="bg-white rounded-lg p-8 text-center">
							<img
								src="/assets/Leadership/andrew-headshot-image.webp"
								alt="Andrew Warner"
								className="w-32 h-32 rounded-full mx-auto object-cover mb-6"
							/>
							<h3 className="font-display text-2xl font-bold mb-2">
								Andrew Warner, CCIM
							</h3>
							<p className="text-gray-600 mb-2">
								President | Warner MHRV Group
							</p>
							<p className="text-gray-600 mb-4">
								Specialist – MH / RV Exchanges
							</p>
							<div className="flex flex-col items-center gap-2 mb-6">
								<a
									href="mailto:andrew@specialtyone.com"
									className="text-plum hover:text-amethyst"
								>
									andrew@specialtyone.com
								</a>
								<a
									href="tel:602-730-9967"
									className="text-plum hover:text-amethyst"
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
						<div className="bg-white rounded-lg p-8 text-center">
							<img
								src="/assets/Leadership/denise-nunez-self-storage.webp"
								alt="Denise Nuñez"
								className="w-32 h-32 rounded-full mx-auto object-cover mb-6"
							/>
							<h3 className="font-display text-2xl font-bold mb-2">
								Denise Nuñez
							</h3>
							<p className="text-gray-600 mb-2">
								President | Nunez Storage Group
							</p>
							<p className="text-gray-600 mb-4">
								Specialist – Self-Storage / DST & UPREIT
							</p>
							<div className="flex flex-col items-center gap-2 mb-6">
								<a
									href="mailto:denise@specialtyone.com"
									className="text-plum hover:text-amethyst"
								>
									denise@specialtyone.com
								</a>
								<a
									href="tel:602-697-8868"
									className="text-plum hover:text-amethyst"
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

			{/* Related Links */}
			<section className="py-16 bg-sand">
				<div className="container-custom">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
						<Button
							to="/1031-exchange"
							variant="outline"
							className="text-center py-6"
						>
							🔁 1031 Exchange Overview
						</Button>
						<Button
							to="/success-stories"
							variant="outline"
							className="text-center py-6"
						>
							📚 Client Success Stories
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
};

export default ExchangePage;

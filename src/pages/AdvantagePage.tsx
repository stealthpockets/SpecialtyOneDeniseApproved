import { ClipboardCheck, Users, LineChart, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { ProfileImage } from '../components/ui/CloudinaryImage';
import { SEOHead } from '../components/ui/SEOHead';

const frameworkSteps = [
	{
		number: 1,
		title: 'Strategic Asset Assessment',
		description:
			'We analyze your financials, timing, tax goals, operational upside, and potential friction points—before they become problems.',
		icon: <ClipboardCheck size={32} className="text-white" />,
	},
	{
		number: 2,
		title: 'Buyer Underwriting & Positioning',
		description:
			'We know who retrades, who closes, and who pays full price. We shape the deal for the buyer most likely to follow through.',
		icon: <Users size={32} className="text-white" />,
	},
	{
		number: 3,
		title: 'Controlled Exposure',
		description:
			'We engineer the market around the deal—quiet when needed, competitive when valuable. No blasts unless they serve strategy.',
		icon: <LineChart size={32} className="text-white" />,
	},
	{
		number: 4,
		title: 'Negotiation & Close Management',
		description:
			'From contract structure to close, we clear hurdles before they cost leverage. No guesswork. No legal chaos. Just execution.',
		icon: <CheckCircle size={32} className="text-white" />,
	},
];

const preventionPoints = [
	{
		icon: '🚫',
		problem: 'Escrow Blowups',
		solution: 'Solved pre-listing',
	},
	{
		icon: '🔁',
		problem: 'Retrades',
		solution: 'Filtered by buyer behavior tracking',
	},
	{
		icon: '🧱',
		problem: 'Zoning/Septic',
		solution: 'Flagged + cleared early',
	},
	{
		icon: '💸',
		problem: 'Price Gaps',
		solution: 'Set with confidence based on real data',
	},
	{
		icon: '🧍‍♂️',
		problem: 'Bad Buyers',
		solution: 'Screened out before LOI',
	},
];

const stats = [
	{ value: '$1B+', label: 'Closed' },
	{
		value: '80+',
		label: 'Offers on a Single Listing',
		isClickable: true,
		linkTo: '/success-stories/the-palms',
	},
	{ value: '200+', label: 'Self-Storage Facilities Sold' },
	{ value: '100%', label: 'of RV Park Listings Sold' },
	{
		value: '3',
		label: 'Escrows Rescued That Would\'ve Died Elsewhere',
	},
];

const testimonials = [
	{
		quote:
			"They didn't just market our property. They controlled every variable—and got us more than we expected.",
		author: 'James & Phillip Weech',
		property: 'The Palms',
	},
	{
		quote: 'They solved zoning, restructured our debt, and still closed at full ask.',
		author: 'George Bunting',
		property: 'Caravan Oasis',
	},
	{
		quote: 'They knew who the buyer would be before the listing even launched.',
		author: 'Pericles Wyatt',
		property: 'Desert Trails RV Park',
	},
];

const executionPoints = [
	{
		icon: '🔒',
		title: 'Senior-level control on every deal',
		description: 'No handoffs',
	},
	{
		icon: '📉',
		title: 'Buyer behavior database',
		description: 'We know who retrades',
	},
	{
		icon: '📄',
		title: 'Custom OMs + pricing logic',
		description: 'Based on asset profile',
	},
	{
		icon: '💡',
		title: 'Underwriting that filters',
		description: 'Unserious buyers out',
	},
	{
		icon: '🧠',
		title: 'Strategy first',
		description: 'Not marketing fluff',
	},
	{
		icon: '📬',
		title: 'Quiet deal capability',
		description: 'NDA-gated access',
	},
	{
		icon: '📆',
		title: 'Weekly updates',
		description: 'Professional handling',
	},
];

const AdvantagePage = () => {
	return (
		<>
			<SEOHead
				title="The Specialty One Advantage | Strategic CRE Process & Expertise"
				description="Discover the Specialty One advantage in commercial real estate. Our strategic approach to manufactured housing, RV parks, and self-storage transactions delivers results."
				keywords="commercial real estate advantage, CRE strategy, specialized brokerage process, deal engineering, transaction management, specialty properties expertise"
				url="https://specialtyone.com/advantage"
			/>
			<div className="flex flex-col min-h-screen bg-luxury-dark">
			{/* Hero Section */}
			<section className="relative pt-40 pb-32 overflow-hidden">
				<div className="absolute inset-0 bg-gradient-luxury-dark opacity-95"></div>
				<div className="container-custom relative z-10">
					<div className="max-w-4xl mx-auto text-center">
						<h1 className="heading-luxury text-white text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight leading-[0.9]">
							Most Brokers List.
							<span className="block text-luxury-light">We Engineer Outcomes.</span>
						</h1>
						<p className="text-xl md:text-2xl mb-12 text-white/90 leading-relaxed max-w-3xl mx-auto">
							Most brokers follow a script. We built the Specialty One Close Framework™—a proven system that's delivered over $1B in transactions across MH, RV, and Storage.
						</p>
						<div className="flex flex-col sm:flex-row justify-center gap-6">							<Button
								href="https://form.typeform.com/to/NKQAZkUv"
								target="_blank"
								rel="noopener noreferrer"
								variant="primary"
								size="lg"
								className="text-lg px-8 py-4"
							>
								Start Planning Your Exit
							</Button>
						</div>
						<p className="text-sm mt-6 text-white/75">
							One form. Confidential walkthrough. No obligation.
						</p>
					</div>
				</div>
			</section>

			{/* Why This Page Exists */}
			<section className="py-24 bg-white/5 backdrop-blur-sm">
				<div className="container-custom">
					<div className="max-w-4xl mx-auto text-center">
						<h2 className="heading-luxury text-white text-4xl md:text-5xl font-bold mb-8 leading-tight">
							Because Spray-and-Pray Marketing is Not a Strategy.
						</h2>
						<div className="space-y-6 text-xl text-white/90 leading-relaxed">
							<p>
								Every seller wants top dollar. But not if it means wasted time, failed escrows, or unvetted buyers.
							</p>
							<p>
								Our process starts before we list—and doesn't end until the wire clears.
							</p>
							<p className="text-luxury-accent font-medium">
								We've used it to sell every exclusive MH and RV listing we've ever taken.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Framework Steps */}
			<section className="py-16 bg-sand">
				<div className="container-custom">
					<div className="text-center mb-12">
						<h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
							The Specialty One Close Framework™
						</h2>
						<p className="text-lg text-gray-700">
							Built for Certainty. Proven by $1B+ in Transactions.
						</p>
					</div>

					<div className="relative">
						{/* Progress Line */}
						<div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-plum to-sage transform -translate-x-1/2 z-0"></div>

						{/* Framework Steps */}
						<div className="space-y-16 lg:space-y-0">
							{frameworkSteps.map((step, index) => (
								<div
									key={index}
									className={`
                    flex flex-col lg:flex-row items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}
                    relative animate-fade-in
                  `}
									style={{ animationDelay: `${0.2 * index}s` }}
								>
									{/* Number Circle */}
									<div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 z-10">
										<div className="w-12 h-12 rounded-full bg-gradient-to-br from-plum to-amethyst flex items-center justify-center text-white font-bold text-xl">
											{step.number}
										</div>
									</div>

									{/* Step Content */}
									<div className={`
                    lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}
                  `}>
										<div className="mb-4 lg:hidden">
											<div className="w-12 h-12 rounded-full bg-gradient-to-br from-plum to-amethyst flex items-center justify-center text-white font-bold text-xl mx-auto">
												{step.number}
											</div>
										</div>

										<div className="mb-6 lg:hidden flex justify-center">
											<div className="w-16 h-16 rounded-full bg-gradient-to-br from-plum to-amethyst flex items-center justify-center">
												{step.icon}
											</div>
										</div>

										<h3 className="font-display text-xl font-bold mb-3 text-center lg:text-inherit">
											{step.title}
										</h3>
										<p className="text-gray-700 text-center lg:text-inherit">
											{step.description}
										</p>
									</div>

									{/* Icon Circle */}
									<div className={`hidden lg:flex lg:w-2/12 justify-center items-center`}>
										<div className="w-16 h-16 rounded-full bg-gradient-to-br from-plum to-amethyst flex items-center justify-center">
											{step.icon}
										</div>
									</div>

									{/* Spacer */}
									<div className="hidden lg:block lg:w-5/12"></div>
								</div>
							))}
						</div>
					</div>

					<div className="text-center mt-12">
						<Button
							to="/contact"
							variant="primary"
							size="lg"
						>
							Request a Walkthrough of This Framework
						</Button>
					</div>
				</div>
			</section>

			{/* Prevention Points */}
			<section className="py-16 bg-sand">
				<div className="container-custom">
					<h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
						Where Most Deals Die—And How We Prevent It
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
						{preventionPoints.map((point, index) => (
							<Card
								key={index}
								className="text-center py-8 animate-fade-in"
								style={{ animationDelay: `${0.1 * index}s` }}
							>
								<CardContent>
									<div className="text-4xl mb-4">
										{point.icon}
									</div>
									<div className="font-bold mb-2">
										{point.problem}
									</div>
									<div className="text-gray-600">
										{point.solution}
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Stats */}
			<section className="py-16 bg-sand">
				<div className="container-custom">
					<h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
						You Don't Keep Closing $1B+ in Deals by Accident
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
						{stats.map((stat, index) => (
							<div key={index}>
								{stat.isClickable ? (
									<Link to={stat.linkTo}>
										<Card
											className="text-center py-12 px-6 bg-gradient-subtle backdrop-blur-sm border border-luxury-light/20 hover:bg-white/80 transition-all duration-300 cursor-pointer hover:shadow-card-hover hover:scale-105"
										>
											<CardContent className="text-center flex flex-col items-center justify-center">
												<div className="heading-luxury text-3xl md:text-4xl font-bold text-luxury-primary mb-4 text-center w-full whitespace-nowrap">
													{stat.value}
												</div>
												<div className="text-luxury-dark/80 text-lg font-medium text-center w-full mb-2">
													{stat.label}
												</div>
												<div className="text-xs lg:text-sm text-plum font-medium">
													Click to view case study →
												</div>
											</CardContent>
										</Card>
									</Link>
								) : (
									<Card
										className="text-center py-12 px-6 bg-gradient-subtle backdrop-blur-sm border border-luxury-light/20 hover:bg-white/80 transition-all duration-300"
									>
										<CardContent className="text-center flex flex-col items-center justify-center">
											<div className="heading-luxury text-3xl md:text-4xl font-bold text-luxury-primary mb-4 text-center w-full whitespace-nowrap">
												{stat.value}
											</div>
											<div className="text-luxury-dark/80 text-lg font-medium text-center w-full">
												{stat.label}
											</div>
										</CardContent>
									</Card>
								)}
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Testimonials */}
			<section className="py-16 bg-sand">
				<div className="container-custom">
					<h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
						We Don't "Manage Listings." We Close Them.
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
									</p>
									<p className="text-gray-600">
										{testimonial.property}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Execution Points */}
			<section className="py-16 bg-sand">
				<div className="container-custom">
					<h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
						These Aren't Features. They're the Difference Between Chaos and Closing.
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{executionPoints.map((point, index) => (
							<Card
								key={index}
								className="text-center py-8 animate-fade-in"
								style={{ animationDelay: `${0.1 * index}s` }}
							>
								<CardContent>
									<div className="text-4xl mb-4">
										{point.icon}
									</div>
									<div className="font-bold mb-2">
										{point.title}
									</div>
									<div className="text-gray-600">
										{point.description}
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Who It's For */}
			<section className="py-16 bg-sand">
				<div className="container-custom">
					<div className="max-w-3xl mx-auto text-center">
						<h2 className="font-display text-3xl md:text-4xl font-bold mb-8">
							This Process Was Built for Sellers Who Can't Afford Guesswork
						</h2>
						<div className="space-y-4 text-lg mb-8">
							<p>✅ Need certainty due to family, partners, or estate planning</p>
							<p>✅ Don't want retrades or legal back-and-forth</p>
							<p>✅ Have a clean asset and want an equally clean close</p>
							<p>✅ Value strategy over spray-and-pray marketing</p>
						</div>
						<Button
							to="/contact"
							variant="primary"
							size="lg"
						>
							Talk With Andrew or Denise
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
							<ProfileImage
								localPath="/assets/Leadership/andrew-headshot-image.webp"
								alt="Andrew Warner"
								className="w-32 h-32 rounded-full mx-auto object-cover mb-6"
								size="small"
							/>
							<h3 className="font-display text-2xl font-bold mb-2">
								Andrew Warner, CCIM
							</h3>
							<p className="text-gray-600 mb-4">
								MH / RV Specialist
							</p>
							<div className="flex flex-col items-center gap-2 mb-6">
								<a href="mailto:andrew@specialtyone.com" className="text-plum hover:text-amethyst">
									andrew@specialtyone.com
								</a>
								<a href="tel:602-730-9967" className="text-plum hover:text-amethyst">
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
							<ProfileImage
								localPath="/assets/Leadership/denise-nunez-self-storage.webp"
								alt="Denise Nuñez"
								className="w-32 h-32 rounded-full mx-auto object-cover mb-6"
								size="small"
							/>
							<h3 className="font-display text-2xl font-bold mb-2">
								Denise Nuñez
							</h3>
							<p className="text-gray-600 mb-4">
								Self-Storage Specialist
							</p>
							<div className="flex flex-col items-center gap-2 mb-6">
								<a href="mailto:denise@specialtyone.com" className="text-plum hover:text-amethyst">
									denise@specialtyone.com
								</a>
								<a href="tel:602-697-8868" className="text-plum hover:text-amethyst">
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

export default AdvantagePage;

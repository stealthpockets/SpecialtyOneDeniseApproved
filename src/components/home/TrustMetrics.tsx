import { Card, CardContent } from '../ui/Card';
import { Link } from 'react-router-dom';

const metrics = [
	{
		value: '$304M+',
		label: 'in MHC & RV Park Transactions',
		subtext: 'Andrew Warner',
	},
	{
		value: '$721M+',
		label: 'in Self-Storage Transactions',
		subtext: 'Denise Nuñez',
	},
	{
		value: '50+',
		label: 'Years Combined Experience',
		subtext: 'Team expertise',
	},
	{
		value: '80+',
		label: 'Offers on a Single Listing',
		subtext: 'The Palms',
		isClickable: true,
		linkTo: '/success-stories/the-palms',
	},
];

export const TrustMetrics = () => {
	return (
		<section className="section-padding bg-sand luxury-gradient-overlay">
			<div className="container-custom relative z-10">
				<div className="text-center mb-16">
					<h2 className="heading-lg mb-6 max-w-4xl mx-auto">
						<span className="text-gradient">$1B+ Closed.</span> Clean Closings. No
						Guesswork.
					</h2>
					<p className="text-body-lg text-gray-700 max-w-3xl mx-auto">
						We deliver results across niche CRE asset classes—without the fluff.
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
					{metrics.map((metric, index) => {
						const cardContent = (
							<Card
								className={`text-center py-12 px-6 bg-gradient-subtle backdrop-blur-sm border border-luxury-light/20 hover:bg-white/80 transition-all duration-300 ${
									metric.isClickable
										? 'cursor-pointer hover:shadow-card-hover hover:scale-105'
										: ''
								}`}
							>
								<CardContent className="text-center flex flex-col items-center justify-center">
									<div className="heading-luxury text-3xl md:text-4xl lg:text-5xl font-bold text-luxury-primary mb-4 text-center w-full whitespace-nowrap">
										{metric.value}
									</div>
									<div className="text-luxury-dark/80 text-lg font-medium text-center w-full mb-2">
										{metric.label}
									</div>
									<div className="text-luxury-dark/60 text-sm font-medium text-center w-full">
										{metric.subtext}
									</div>
									{metric.isClickable && (
										<div className="mt-3 text-sm text-luxury-primary font-medium">
											Click to view case study →
										</div>
									)}
								</CardContent>
							</Card>
						);

						return metric.isClickable ? (
							<Link key={index} to={metric.linkTo!}>
								{cardContent}
							</Link>
						) : (
							<div key={index}>{cardContent}</div>
						);
					})}
				</div>

				<p className="text-center text-sm lg:text-base text-gray-500 mt-8">
					Self-storage closings led by Denise Nuñez, President of the Storage
					Group.
				</p>
			</div>
		</section>
	);
};

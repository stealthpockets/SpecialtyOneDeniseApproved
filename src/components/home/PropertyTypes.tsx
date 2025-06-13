import { Link } from 'react-router-dom';
import { PropertyImage } from '../ui/CloudinaryImage';

const propertyTypes = [
	{
		title: 'Manufactured Housing',
		description: '$304M+ closed. No listings left behind.',
		path: '/manufactured-housing',
		image: '/dist/assets/property-types/manufactured-housing-community-investment.webp',
	},
	{
		title: 'RV Parks & Outdoor Hospitality',
		description: 'Seasonal or year-round, we optimize outcome.',
		path: '/rv-parks',
		image: '/dist/assets/property-types/rv-park-investment-opportunity.webp',
	},
	{
		title: 'Self-Storage',
		description: '$721M+ sold. Led by our 25-year storage expert.',
		path: '/self-storage',
		image: '/dist/assets/property-types/self-storage-facility-investment.webp',
	},
];

export const PropertyTypes = () => {
	return (
		<section className="py-16 bg-sand">
			<div className="container-custom">
				<div className="text-center mb-12">
					<h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
						More Than a Niche. It&apos;s Our{' '}
						<span className="text-gradient">Advantage</span>.
					</h2>
					<p className="text-lg text-gray-700 max-w-3xl mx-auto">
						We focus exclusively on asset classes that require specialized
						knowledge, delivering superior results for our clients.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{propertyTypes.map((type, index) => (
						<Link
							to={type.path}
							key={index}
							className="group block animate-fade-in rounded-lg shadow-card overflow-hidden transition-all duration-300 hover:shadow-card-hover bg-white"
							style={{ animationDelay: `${0.2 * index}s` }}
						>
							<div className="flex flex-col h-full">
								{/* Image with Gradient Overlay */}
								<div className="relative h-64 overflow-hidden">
									<PropertyImage
										localPath={type.image}
										alt={type.title}
										className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
									/>
									{/* Darker, more subtle overlay for better text contrast */}
									<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

									{/* Content Overlay */}
									<div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
										<h3 className="font-display text-xl font-bold mb-2">
											{type.title}
										</h3>
										<p className="text-sm opacity-90">
											{type.description}
										</p>
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
};

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
		<section className="section-padding bg-sand relative overflow-hidden">
			{/* Enhanced subtle purple gradient overlay */}
			<div className="absolute inset-0 bg-gradient-to-br from-transparent via-plum/8 to-amethyst/12 opacity-70"></div>
			
			<div className="container-custom relative z-10">
				<div className="text-center mb-16">
					<h2 className="heading-lg mb-6 max-w-4xl mx-auto">
						More Than a Niche. It&apos;s Our{' '}
						<span className="text-gradient">Advantage</span>.
					</h2>
					<p className="text-body-lg text-gray-700 max-w-3xl mx-auto">
						We focus exclusively on asset classes that require specialized
						knowledge, delivering superior results for our clients.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-10">
					{propertyTypes.map((type, index) => (
						<Link
							to={type.path}
							key={index}
							className="group block animate-fade-in rounded-lg shadow-card overflow-hidden transition-all duration-300 hover:shadow-card-hover card-luxury-white"
							style={{ animationDelay: `${0.2 * index}s` }}
						>
							<div className="flex flex-col h-full">
								{/* Image with Enhanced Gradient Overlay */}
								<div className="relative h-72 overflow-hidden">
									<PropertyImage
										localPath={type.image}
										alt={type.title}
										className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
									/>
									{/* Enhanced sophisticated gradient overlay */}
									<div className="absolute inset-0 bg-gradient-to-t from-obsidian/95 via-deep-purple/40 to-transparent"></div>

									{/* Enhanced Content Overlay */}
									<div className="absolute inset-0 content-padding flex flex-col justify-end text-white">
										<h3 className="heading-sm mb-3 text-white">
											{type.title}
										</h3>
										<p className="text-caption opacity-90 leading-relaxed">
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

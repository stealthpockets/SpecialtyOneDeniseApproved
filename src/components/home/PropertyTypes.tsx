import React from 'react';
import { Building, Warehouse, Car } from 'lucide-react';
import { Button } from '../ui/Button';

const propertyTypes = [
  {
    icon: <Building size={40} />,
    title: 'Manufactured Housing',
    description: '$304M+ closed. No listings left behind.',
    path: '/manufactured-housing',
    buttonText: 'Explore Manufactured',
    image: '/dist/assets/property-types/manufactured-housing-community-investment.webp'
  },
  {
    icon: <Car size={40} />,
    title: 'RV Parks & Outdoor Hospitality',
    description: 'Seasonal or year-round, we optimize outcome.',
    path: '/rv-parks',
    buttonText: 'Explore RV',
    image: '/dist/assets/property-types/rv-park-investment-opportunity.webp'
  },
  {
    icon: <Warehouse size={40} />,
    title: 'Self-Storage',
    description: '$721M+ sold. Led by our 25-year storage expert.',
    path: '/self-storage',
    buttonText: 'Explore Self-Storage',
    image: '/dist/assets/property-types/self-storage-facility-investment.webp'
  }
];

export const PropertyTypes = () => {
  return (
    <section className="py-16 bg-sand">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            More Than a Niche. It's Our <span className="text-gradient">Advantage</span>.
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            We focus exclusively on asset classes that require specialized knowledge, 
            delivering superior results for our clients.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {propertyTypes.map((type, index) => (
            <div 
              key={index} 
              className="animate-fade-in"
              style={{ animationDelay: `${0.2 * index}s` }}
            >
              <div className="flex flex-col h-full rounded-lg shadow-card overflow-hidden transition-all duration-300 hover:shadow-card-hover bg-white">
                {/* Image with Gradient Overlay */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={type.image}
                    alt={type.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  {/* Purple/Obsidian/Plum Gradient Overlay at 60% opacity */}
                  <div className="absolute inset-0 bg-gradient-to-br from-plum via-amethyst to-obsidian opacity-60"></div>
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    <div className="mb-4">
                      {type.icon}
                    </div>
                    <h3 className="font-display text-xl font-bold mb-2">
                      {type.title}
                    </h3>
                    <p className="opacity-90 mb-4">
                      {type.description}
                    </p>
                  </div>
                </div>
                
                {/* Button Section */}
                <div className="p-6 bg-white flex-grow flex flex-col justify-end">
                  <Button 
                    to={type.path} 
                    variant="primary"
                    className="w-full justify-center"
                  >
                    {type.buttonText}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
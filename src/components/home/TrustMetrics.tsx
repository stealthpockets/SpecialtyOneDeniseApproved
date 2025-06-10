import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { Link } from 'react-router-dom';

const metrics = [
  {
    value: '$304M+',
    label: 'in MH & RV Closings',
    subtext: 'Andrew Warner'
  },
  {
    value: '$721M+',
    label: 'in Self-Storage Transactions',
    subtext: 'Denise Nuñez'
  },
  {
    value: '50+',
    label: 'Years Combined Experience',
    subtext: 'Team expertise'
  },
  {
    value: '80+',
    label: 'Offers on a Single Listing',
    subtext: 'The Palms',
    isClickable: true,
    linkTo: '/success/the-palms'
  }
];

export const TrustMetrics = () => {
  return (
    <section className="py-16 bg-sand">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">$1B+ Closed.</span> Clean Closings. No Guesswork.
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            We deliver results across niche CRE asset classes—without the fluff.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => {
            const CardWrapper = metric.isClickable ? Link : 'div';
            const cardProps = metric.isClickable ? { to: metric.linkTo } : {};
            
            return (
              <CardWrapper key={index} {...cardProps}>
                <Card 
                  className={`text-center py-8 animate-fade-in bg-cloud ${
                    metric.isClickable ? 'cursor-pointer hover:shadow-card-hover transition-all duration-300 hover:scale-105' : ''
                  }`}
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <CardContent>
                    <div className="font-display text-4xl font-bold text-plum mb-2">
                      {metric.value}
                    </div>
                    <div className="text-lg font-medium mb-1">
                      {metric.label}
                    </div>
                    <div className="text-sm lg:text-base text-gray-500">
                      {metric.subtext}
                    </div>
                    {metric.isClickable && (
                      <div className="mt-2 text-xs lg:text-sm text-plum font-medium">
                        Click to view case study →
                      </div>
                    )}
                  </CardContent>
                </Card>
              </CardWrapper>
            );
          })}
        </div>
        
        <p className="text-center text-sm lg:text-base text-gray-500 mt-8">
          Self-storage closings led by Denise Nuñez, President of the Storage Group.
        </p>
      </div>
    </section>
  );
};
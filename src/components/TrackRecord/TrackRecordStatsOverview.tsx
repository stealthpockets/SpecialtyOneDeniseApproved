import React from 'react';
import { DollarSign, MapPin, Building, Home } from 'lucide-react';
import { transactions } from '../../data/transactions';

const TrackRecordStatsOverview: React.FC = () => {
  // Calculate stats from transactions
  const totalTransactions = transactions.length;
  const uniqueStates = new Set(transactions.map(t => t.address.split(', ').pop())).size;
  const propertyTypes = new Set(transactions.map(t => t.classification)).size;
  
  // Calculate total portfolio value from transactions with sale prices
  const totalValue = transactions
    .filter(t => t.sale_price)
    .reduce((sum, t) => sum + (t.sale_price || 0), 0);
  const portfolioValueInMillions = Math.round(totalValue / 1000000);
  const stats = [
    {
      icon: Building,
      label: 'Total Transactions',
      value: totalTransactions.toString(),
      subtext: 'Closed Deals'
    },
    {
      icon: MapPin,
      label: 'States Covered',
      value: uniqueStates.toString(),
      subtext: 'Nationwide Reach'
    },
    {
      icon: DollarSign,
      label: 'Portfolio Value',
      value: `$${portfolioValueInMillions}M+`,
      subtext: 'Transaction Volume'
    },
    {
      icon: Home,
      label: 'Property Types',
      value: propertyTypes.toString(),
      subtext: 'Specialized Focus'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div 
            key={index}
            className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-luxury-accent rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl font-bold text-white mb-2 heading-luxury">
              {stat.value}
            </div>
            <div className="text-lg font-semibold text-luxury-light mb-1">
              {stat.label}
            </div>
            <div className="text-sm text-white/70">
              {stat.subtext}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TrackRecordStatsOverview;

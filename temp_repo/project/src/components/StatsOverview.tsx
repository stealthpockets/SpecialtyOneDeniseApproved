import React from 'react';
import { DollarSign, MapPin, Building, Calendar } from 'lucide-react';
import { transactions } from '../data/transactions';

const StatsOverview: React.FC = () => {
  const totalValue = transactions
    .filter(t => t.sale_price)
    .reduce((sum, t) => sum + (t.sale_price || 0), 0);
  
  const totalUnits = transactions
    .filter(t => t.units)
    .reduce((sum, t) => sum + (t.units || 0), 0);
  
  const uniqueStates = new Set(
    transactions.map(t => t.address.split(', ')[1])
  ).size;
  
  const currentYear = new Date().getFullYear();
  const recentTransactions = transactions.filter(t => 
    t.date_sold && new Date(t.date_sold).getFullYear() >= currentYear - 1
  ).length;

  const stats = [
    {
      label: 'Total Transaction Value',
      value: `$${(totalValue / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      color: 'text-plum',
      bgColor: 'bg-gradient-to-br from-plum/10 to-amethyst/10',
      borderColor: 'border-plum/20'
    },
    {
      label: 'Properties Sold',
      value: transactions.length.toString(),
      icon: Building,
      color: 'text-evergreen',
      bgColor: 'bg-gradient-to-br from-evergreen/10 to-sage/10',
      borderColor: 'border-evergreen/20'
    },
    {
      label: 'States Covered',
      value: uniqueStates.toString(),
      icon: MapPin,
      color: 'text-amethyst',
      bgColor: 'bg-gradient-to-br from-amethyst/10 to-plum/10',
      borderColor: 'border-amethyst/20'
    },
    {
      label: 'Total Units',
      value: totalUnits.toLocaleString(),
      icon: Calendar,
      color: 'text-sage',
      bgColor: 'bg-gradient-to-br from-sage/10 to-evergreen/10',
      borderColor: 'border-sage/20'
    }
  ];

  return (
    <div className="shadow-card p-8 mb-8 fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-obsidian mb-3">
          Portfolio Overview
        </h2>
        <p className="text-lg text-evergreen font-medium">
          We Sell What Generalist Brokers Don't Understand
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-plum to-amethyst mx-auto mt-4 rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className={`text-center p-6 rounded-xl border-2 ${stat.bgColor} ${stat.borderColor} hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 slide-up`}
            style={{ animationDelay: `${0.2 * index}s` }}
          >
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-4 bg-white shadow-md`}>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            <div className="text-3xl font-display font-bold text-obsidian mb-2">
              {stat.value}
            </div>
            <div className="text-sm font-medium text-evergreen">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-evergreen/80 font-medium">
          Specializing in Manufactured Housing, RV Parks, and Self-Storage Properties
        </p>
      </div>
    </div>
  );
};

export default StatsOverview;
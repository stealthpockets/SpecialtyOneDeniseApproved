import React from 'react';
import { Building2, TrendingUp, Award } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 relative overflow-hidden">
      {/* Background gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-plum/5 to-amethyst/5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-brand-gradient rounded-xl shadow-lg">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-obsidian">
                Track Record
              </h1>
              <p className="text-sm text-plum font-medium">
                Specialty One Investment Brokerage
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2 text-sm text-evergreen">
              <Award className="w-5 h-5 text-plum" />
              <span className="font-semibold">$1B+ Transactions</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-evergreen">
              <TrendingUp className="w-5 h-5 text-plum" />
              <span className="font-semibold">52 Completed Deals</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
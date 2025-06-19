import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="text-obsidian hover:text-plum transition-colors duration-200 font-medium text-base lg:text-lg tracking-wide"
  >
    {children}
  </Link>
);

const DropdownLink = ({ 
  title, 
  items 
}: { 
  title: string; 
  items: { name: string; path: string }[] 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative group">      <button
        className="flex items-center text-obsidian hover:text-plum transition-colors duration-200 font-medium text-base lg:text-lg tracking-wide"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <ChevronDown className="ml-1 w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
      </button>
      
      <div
        className={`absolute left-0 mt-3 w-56 rounded-lg shadow-xl card-luxury-white border border-white/20 transition-all duration-300 z-[100] ${
          isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0'
        }`}
      >
        <div className="py-2">
          {items.map((item) => (            <Link
              key={item.path}
              to={item.path}
              className="block px-4 py-3 text-base text-obsidian hover:bg-plum/10 hover:text-plum transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const propertyTypes = [
    { name: 'Manufactured Housing', path: '/manufactured-housing' },
    { name: 'RV Parks', path: '/rv-parks' },
    { name: 'Self-Storage', path: '/self-storage' }
  ];
    const resources = [
    { name: 'Insights', path: '/insights' },
    { name: 'Market Reports', path: '/market-reports' },
    { name: 'Success Stories', path: '/success-stories' },
    { name: 'Track Record', path: '/track-record' }
  ];
    return (    <header
      className={`fixed top-0 left-0 right-0 z-[110] transition-all duration-500 ${
        scrolled 
          ? 'bg-sand/95 backdrop-blur-md shadow-lg border-b border-white/20 py-3' 
          : 'bg-sand py-5'
      }`}
    >      <div className="container-custom">        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center py-2">
            <Logo className="transition-all duration-300 hover:scale-105" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            <DropdownLink title="Property Types" items={propertyTypes} />
            <NavLink to="/advantage">The Advantage</NavLink>
            <NavLink to="/1031-exchange">1031 Exchange</NavLink>
            <DropdownLink title="Resources" items={resources} />
            <NavLink to="/about">About</NavLink>
            
            <Link to="/contact" className="button-gradient ml-6 px-6 py-3">
              Contact Us
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-obsidian focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
        {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden card-luxury-white border-t border-white/20 animate-fade-in">
          <div className="container-custom py-6 space-y-6">
            <div className="py-3 border-b border-gray-100">
              <button
                className="flex items-center justify-between w-full text-left py-2"
                onClick={() => {}}
              >
                <span className="font-medium text-lg">Property Types</span>
                <ChevronDown className="w-4 h-4" />
              </button>              <div className="pl-4 py-3 space-y-3">
                {propertyTypes.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block py-1 text-base text-obsidian hover:text-plum transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
              <Link
              to="/advantage"
              className="block py-3 border-b border-gray-100 text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              The Advantage
            </Link>
              <Link
              to="/1031-exchange"
              className="block py-3 border-b border-gray-100 text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              1031 Exchange
            </Link>
            
            <div className="py-3 border-b border-gray-100">
              <button
                className="flex items-center justify-between w-full text-left py-2"
                onClick={() => {}}
              >
                <span className="font-medium text-lg">Resources</span>
                <ChevronDown className="w-4 h-4" />
              </button>              <div className="pl-4 py-3 space-y-3">
                {resources.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block py-1 text-base text-obsidian hover:text-plum transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
              <Link
              to="/about"
              className="block py-3 border-b border-gray-100 text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            
            <Link
              to="/contact"
              className="button-gradient block text-center mt-6 px-6 py-3"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

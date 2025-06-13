import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="text-obsidian hover:text-plum transition-colors duration-200 font-medium text-base lg:text-lg"
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
    <div className="relative group">
      <button
        className="flex items-center text-obsidian hover:text-plum transition-colors duration-200 font-medium text-base lg:text-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <ChevronDown className="ml-1 w-4 h-4" />
      </button>
      
      <div
        className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 z-[100] ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'
        }`}
      >
        <div className="py-1">
          {items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block px-4 py-2 text-sm lg:text-base text-obsidian hover:bg-plum hover:text-white"
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
    { name: 'Success Stories', path: '/success-stories' }
  ];
  
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[110] transition-all duration-300 ${
        scrolled ? 'bg-sand shadow-md py-3' : 'bg-sand py-5'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Logo className="h-10 w-auto" />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <DropdownLink title="Property Types" items={propertyTypes} />
            <NavLink to="/advantage">The Advantage</NavLink>
            <NavLink to="/1031-exchange">1031 Exchange</NavLink>
            <DropdownLink title="Resources" items={resources} />
            <NavLink to="/about">About</NavLink>
            
            <Link to="/contact" className="button-gradient ml-4">
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
        <div className="lg:hidden bg-white border-t border-gray-200 animate-fade-in">
          <div className="container-custom py-4 space-y-4">
            <div className="py-2 border-b border-gray-100">
              <button
                className="flex items-center justify-between w-full text-left py-2"
                onClick={() => {}}
              >
                <span className="font-medium">Property Types</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="pl-4 py-2 space-y-2">
                {propertyTypes.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block py-1 text-sm lg:text-base text-obsidian hover:text-plum"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <Link
              to="/advantage"
              className="block py-2 border-b border-gray-100 text-sm lg:text-base"
              onClick={() => setIsMenuOpen(false)}
            >
              The Advantage
            </Link>

            <Link
              to="/1031-exchange"
              className="block py-2 border-b border-gray-100 text-sm lg:text-base"
              onClick={() => setIsMenuOpen(false)}
            >
              1031 Exchange
            </Link>
            
            <div className="py-2 border-b border-gray-100">
              <button
                className="flex items-center justify-between w-full text-left py-2"
                onClick={() => {}}
              >
                <span className="font-medium">Resources</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="pl-4 py-2 space-y-2">
                {resources.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block py-1 text-sm lg:text-base text-obsidian hover:text-plum"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <Link
              to="/about"
              className="block py-2 border-b border-gray-100 text-sm lg:text-base"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            
            <Link
              to="/contact"
              className="button-gradient block text-center mt-4"
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

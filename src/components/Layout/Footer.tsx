import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Linkedin, Facebook, Instagram, ChevronRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-obsidian text-white">
      <div className="container-custom pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Company Info */}
          <div className="space-y-4">
            <img 
              src="/dist/assets/logo/logo-horizontal-blackbackground.svg" 
              alt="Specialty One" 
              className="h-10 w-auto"
            />
            <p className="text-gray-300 mt-4">
              We specialize in Manufactured Housing, RV Parks, and Self-Storage investments with over $1B in closed transactions.
            </p>
            <div className="flex space-x-4 pt-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Property Types */}
          <div>
            <h3 className="text-lg font-bold mb-4">Property Types</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/manufactured-housing" className="text-gray-300 hover:text-white transition-colors flex items-center text-sm lg:text-base">
                  <ChevronRight size={16} className="mr-1" />
                  Manufactured Housing
                </Link>
              </li>
              <li>
                <Link to="/rv-parks" className="text-gray-300 hover:text-white transition-colors flex items-center text-sm lg:text-base">
                  <ChevronRight size={16} className="mr-1" />
                  RV Parks
                </Link>
              </li>
              <li>
                <Link to="/self-storage" className="text-gray-300 hover:text-white transition-colors flex items-center text-sm lg:text-base">
                  <ChevronRight size={16} className="mr-1" />
                  Self-Storage
                </Link>
              </li>
            </ul>
            
            <h3 className="text-lg font-bold mt-6 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/insights" className="text-gray-300 hover:text-white transition-colors flex items-center text-sm lg:text-base">
                  <ChevronRight size={16} className="mr-1" />
                  Insights
                </Link>
              </li>
              <li>
                <Link to="/success-stories" className="text-gray-300 hover:text-white transition-colors flex items-center text-sm lg:text-base">
                  <ChevronRight size={16} className="mr-1" />
                  Success Stories
                </Link>
              </li>
              <li>
                <Link to="/market-reports" className="text-gray-300 hover:text-white transition-colors flex items-center text-sm lg:text-base">
                  <ChevronRight size={16} className="mr-1" />
                  Market Reports
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/advantage" className="text-gray-300 hover:text-white transition-colors flex items-center text-sm lg:text-base">
                  <ChevronRight size={16} className="mr-1" />
                  The Advantage
                </Link>
              </li>
              <li>
                <Link to="/1031-exchange" className="text-gray-300 hover:text-white transition-colors flex items-center text-sm lg:text-base">
                  <ChevronRight size={16} className="mr-1" />
                  1031 Exchange
                </Link>
              </li>
              <li>
                <Link to="/exclusive-buyers" className="text-gray-300 hover:text-white transition-colors flex items-center text-sm lg:text-base">
                  <ChevronRight size={16} className="mr-1" />
                  Exclusive Buyer Network
                </Link>
              </li>
              <li>
                <Link to="/exclusive-sellers" className="text-gray-300 hover:text-white transition-colors flex items-center text-sm lg:text-base">
                  <ChevronRight size={16} className="mr-1" />
                  Exclusive Seller Network
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors flex items-center text-sm lg:text-base">
                  <ChevronRight size={16} className="mr-1" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors flex items-center text-sm lg:text-base">
                  <ChevronRight size={16} className="mr-1" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter and Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe for market insights, exclusive listings, and expert advice.
            </p>
            <form className="mb-6">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="px-4 py-2 w-full rounded-l-md focus:outline-none text-obsidian"
                />
                <button 
                  type="submit"
                  className="bg-plum hover:bg-amethyst transition-colors duration-200 px-4 py-2 rounded-r-md"
                >
                  Subscribe
                </button>
              </div>
            </form>
            
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300">
                <Phone size={16} className="mr-2" />
                <span>602-730-9967</span>
              </li>
              <li className="flex items-center text-gray-300">
                <Mail size={16} className="mr-2" />
                <a href="mailto:info@specialtyone.com" className="hover:text-white transition-colors">
                  info@specialtyone.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-gray-800 my-8" />
        
        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm lg:text-base">
            &copy; {new Date().getFullYear()} Specialty One. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 text-sm lg:text-base hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 text-sm lg:text-base hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

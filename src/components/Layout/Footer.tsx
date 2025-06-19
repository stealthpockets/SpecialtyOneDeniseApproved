import { Link } from 'react-router-dom';
import { Phone, Mail, Linkedin, Facebook, Instagram, ChevronRight, Twitter, Youtube } from 'lucide-react';
import { CloudinaryImage } from '../ui/CloudinaryImage'; // Import CloudinaryImage

export const Footer = () => {
  return (
    <footer className="bg-obsidian text-white">
      <div className="container-custom pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Company Info */}
          <div className="space-y-4">
            <CloudinaryImage
              localPath="/assets/logo/logo-horizontal-blackbackground.svg"
              alt="Specialty One"
              className="h-10 w-auto"
              loading="lazy"
            />
            <p className="text-gray-300 mt-4">
              We specialize in Manufactured Housing, RV Parks, and Self-Storage investments with over $1B in closed transactions.
            </p>
            <div className="flex space-x-4 pt-4">
              <a href="https://www.linkedin.com/company/specialty-one" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://www.facebook.com/specialtyone" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/specialtyone" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://x.com/MHRVDrew" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://www.youtube.com/@SpecialtyOneCRE" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Property Types */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Property Types</h5>
            <ul className="space-y-2">
              <li><Link to="/manufactured-housing" className="text-gray-300 hover:text-white transition-colors flex items-center">Manufactured Housing <ChevronRight size={16} className="ml-1" /></Link></li>
              <li><Link to="/rv-parks" className="text-gray-300 hover:text-white transition-colors flex items-center">RV Parks & Resorts <ChevronRight size={16} className="ml-1" /></Link></li>
              <li><Link to="/self-storage" className="text-gray-300 hover:text-white transition-colors flex items-center">Self-Storage <ChevronRight size={16} className="ml-1" /></Link></li>
            </ul>
          </div>
          
          {/* Quick Links/Get Started */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Get Started</h5>
            <ul className="space-y-2">
              <li><a href="https://form.typeform.com/to/B0GIZ1ht" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors flex items-center">Find Your Next Property <ChevronRight size={16} className="ml-1" /></a></li>
              <li><a href="https://form.typeform.com/to/I3hYeHFX" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors flex items-center">Value Your Property <ChevronRight size={16} className="ml-1" /></a></li>
              <li><a href="https://form.typeform.com/to/oX1bWHD5" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors flex items-center">1031 Exchange Solutions <ChevronRight size={16} className="ml-1" /></a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Contact Us</h5>
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
              <li><Link to="/exclusive-buyers" className="text-gray-300 hover:text-white transition-colors flex items-center">Exclusive Buyer Network <ChevronRight size={16} className="ml-1" /></Link></li>
              <li><Link to="/exclusive-sellers" className="text-gray-300 hover:text-white transition-colors flex items-center">Exclusive Seller Network <ChevronRight size={16} className="ml-1" /></Link></li>
            </ul>
          </div>
        </div>
        
        <hr className="border-gray-800 my-8" />
        
        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Specialty One. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/sitemap" className="text-gray-400 text-sm hover:text-white transition-colors">
              Site Map
            </Link>
            <Link to="/privacy" className="text-gray-400 text-sm hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 text-sm hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

        {/* License Information */}
        <div className="mt-6 pt-6 border-t border-gray-800 text-center md:text-left">
          <p className="text-xs text-gray-500">
            Andrew Warner | AZ License: BR647184000
          </p>
          <p className="text-xs text-gray-500">
            Warner Brokerage LLC (dba Specialty One) | AZ Entity License: LC716235000
          </p>
          <p className="text-xs text-gray-500">
            Specialty One | Tempe, AZ 85283
          </p>
        </div>
      </div>
    </footer>
  );
};

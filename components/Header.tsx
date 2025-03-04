import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import SolanaLogo from './SolanaLogo';
import { APP_LINKS, SECTION_IDS } from '../constants/links';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Features", path: `/#${SECTION_IDS.features}` },
    { name: "Builder", path: `/#${SECTION_IDS.builder}` },
    { name: "Solana", path: `/#${SECTION_IDS.solana}` },
    { name: "Docs", path: APP_LINKS.docs },
    { name: "Pricing", path: APP_LINKS.pricing },
    { name: "Community", path: APP_LINKS.community }
  ];

  const isActive = (path: string) => {
    if (path.startsWith('/#')) {
      return location.pathname === '/' && location.hash === path.substring(1);
    }
    return location.pathname === path;
  };

  return (
    <header className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-red-900/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <SolanaLogo className="h-8 w-8 text-red-500" />
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">SolCrackAI</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link, index) => (
              <Link 
                key={index}
                to={link.path}
                className={`${
                  isActive(link.path) 
                    ? 'text-red-500' 
                    : 'text-gray-300 hover:text-red-500'
                } transition-colors`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          <div className="hidden md:block">
            <Link 
              to={APP_LINKS.launch}
              className="bg-gradient-to-r from-red-600 to-red-800 px-6 py-2 rounded-full font-medium hover:from-red-700 hover:to-red-900 transition-all shadow-lg shadow-red-900/20 text-center"
            >
              Launch App
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 space-y-3">
            {navLinks.map((link, index) => (
              <Link 
                key={index}
                to={link.path}
                className={`block py-2 ${
                  isActive(link.path) 
                    ? 'text-red-500' 
                    : 'text-gray-300 hover:text-red-500'
                } transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to={APP_LINKS.launch}
              className="block w-full bg-gradient-to-r from-red-600 to-red-800 px-6 py-2 rounded-full font-medium hover:from-red-700 hover:to-red-900 transition-all shadow-lg shadow-red-900/20 mt-2 text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Launch App
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
import React from 'react';
import { Link } from 'react-router-dom';
import { Github } from 'lucide-react';
import SolanaLogo from './SolanaLogo';
import { 
  SOCIAL_LINKS, 
  DOC_LINKS, 
  COMMUNITY_LINKS, 
  COMPANY_LINKS, 
  APP_LINKS, 
  SECTION_IDS 
} from '../constants/links';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-red-900/30 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <SolanaLogo className="h-8 w-8 text-red-500" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">SolCrackAI</span>
            </div>
            <p className="text-gray-400 mb-4">
              Building the future of AI agents on the Solana blockchain. Create, deploy, and monetize intelligent agents with ease.
            </p>
            <div className="flex space-x-4">
              <a href={SOCIAL_LINKS.twitter} className="text-gray-400 hover:text-red-500 transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"/>
                </svg>
              </a>
              <a href={SOCIAL_LINKS.github} className="text-gray-400 hover:text-red-500 transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><Link to={`/#${SECTION_IDS.features}`} className="text-gray-400 hover:text-red-500 transition-colors">Features</Link></li>
              <li><Link to={`/#${SECTION_IDS.builder}`} className="text-gray-400 hover:text-red-500 transition-colors">Builder</Link></li>
              <li><Link to={`/#${SECTION_IDS.solana}`} className="text-gray-400 hover:text-red-500 transition-colors">Solana Integration</Link></li>
              <li><Link to={APP_LINKS.pricing} className="text-gray-400 hover:text-red-500 transition-colors">Pricing</Link></li>
              <li><Link to={APP_LINKS.docs} className="text-gray-400 hover:text-red-500 transition-colors">Documentation</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href={DOC_LINKS.tutorials} className="text-gray-400 hover:text-red-500 transition-colors">Blog</a></li>
              <li><a href={DOC_LINKS.tutorials} className="text-gray-400 hover:text-red-500 transition-colors">Tutorials</a></li>
              <li><Link to={DOC_LINKS.apiReference} className="text-gray-400 hover:text-red-500 transition-colors">API Reference</Link></li>
              <li><Link to={APP_LINKS.community} className="text-gray-400 hover:text-red-500 transition-colors">Community</Link></li>
              <li><a href={DOC_LINKS.changelog} className="text-gray-400 hover:text-red-500 transition-colors">Changelog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href={COMPANY_LINKS.about} className="text-gray-400 hover:text-red-500 transition-colors">About Us</a></li>
              <li><a href={COMPANY_LINKS.careers} className="text-gray-400 hover:text-red-500 transition-colors">Careers</a></li>
              <li><a href={COMPANY_LINKS.contact} className="text-gray-400 hover:text-red-500 transition-colors">Contact</a></li>
              <li><a href={COMPANY_LINKS.privacy} className="text-gray-400 hover:text-red-500 transition-colors">Privacy Policy</a></li>
              <li><a href={COMPANY_LINKS.terms} className="text-gray-400 hover:text-red-500 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; 2025 SolCrackAI. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href={COMPANY_LINKS.privacy} className="text-gray-500 hover:text-red-500 transition-colors text-sm">Privacy Policy</a>
            <a href={COMPANY_LINKS.terms} className="text-gray-500 hover:text-red-500 transition-colors text-sm">Terms of Service</a>
            <a href={COMPANY_LINKS.cookies} className="text-gray-500 hover:text-red-500 transition-colors text-sm">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
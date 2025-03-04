import React, { useEffect, useRef } from 'react';
import { Calendar, Github, Users } from 'lucide-react';
import SolanaLogo from './SolanaLogo';
import { SOCIAL_LINKS, COMMUNITY_LINKS, SECTION_IDS } from '../constants/links';

const Community = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
    };

    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    // Animation for background
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid pattern
      ctx.strokeStyle = 'rgba(255, 0, 0, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 50;
      
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);

  const communityChannels = [
    {
      name: "X (Twitter)",
      description: "Follow us on X for the latest updates, announcements, and community discussions.",
      icon: <svg className="h-6 w-6 text-red-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"/>
      </svg>,
      link: SOCIAL_LINKS.twitter
    },
    {
      name: "GitHub",
      description: "Contribute to our open-source projects and help improve SolCrackAI.",
      icon: <Github className="h-6 w-6 text-red-500" />,
      link: SOCIAL_LINKS.github
    },
  ];

  const upcomingEvents = [
    {
      name: "SolCrackAI Hackathon",
      date: "June 15-17, 2025",
      description: "Build innovative AI agents on Solana and compete for prizes.",
      location: "Virtual",
      link: COMMUNITY_LINKS.events
    },
    {
      name: "AI on Solana Webinar",
      date: "May 22, 2025",
      description: "Learn about the latest developments in AI on the Solana blockchain.",
      location: "Online",
      link: COMMUNITY_LINKS.events
    },
    {
      name: "Community Meetup",
      date: "July 5, 2025",
      description: "Meet other SolCrackAI developers and share your experiences.",
      location: "San Francisco, CA",
      link: COMMUNITY_LINKS.events
    }
  ];

  const showcaseProjects = [
    {
      name: "DeFi Advisor",
      creator: "CryptoWhiz",
      description: "An AI agent that provides personalized DeFi investment advice based on your risk profile.",
      image: "https://placehold.co/300x200/1f2937/FFFFFF?text=DeFi+Advisor",
      link: COMMUNITY_LINKS.showcase
    },
    {
      name: "NFT Rarity Analyzer",
      creator: "PixelMaster",
      description: "An agent that analyzes NFT collections and identifies rare traits and potential value.",
      image: "https://placehold.co/300x200/1f2937/FFFFFF?text=NFT+Analyzer",
      link: COMMUNITY_LINKS.showcase
    },
    {
      name: "Solana Transaction Monitor",
      creator: "BlockExplorer",
      description: "Real-time monitoring of Solana transactions with AI-powered anomaly detection.",
      image: "https://placehold.co/300x200/1f2937/FFFFFF?text=Transaction+Monitor",
      link: COMMUNITY_LINKS.showcase
    }
  ];

  return (
    <section id={SECTION_IDS.contribute} className="pt-32 pb-20 relative min-h-screen">
      {/* Canvas Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0"
        style={{ width: '100%', height: '100%' }}
      />
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-red-800/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Join Our <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Community</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Connect with other developers, share your projects, and learn from the community.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {communityChannels.map((channel, index) => (
            <div key={index} className="bg-gray-900/50 backdrop-blur-sm border border-red-900/20 rounded-xl p-6 hover:border-red-500/30 transition-all hover:bg-gray-900/70">
              <div className="bg-red-900/20 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                {channel.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{channel.name}</h3>
              <p className="text-gray-400 mb-4">{channel.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{channel.members}</span>
                <a href={channel.link} className="text-red-500 hover:text-red-400 font-medium">Join Now</a>
              </div>
            </div>
          ))}
        </div>
        
        <div id={SECTION_IDS.events} className="bg-gray-900/50 backdrop-blur-sm border border-red-900/20 rounded-2xl p-8 mb-16">
          <div className="flex items-center mb-6">
            <Calendar className="h-6 w-6 text-red-500 mr-3" />
            <h2 className="text-2xl font-bold">Upcoming Events</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="bg-black/40 rounded-xl p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold">{event.name}</h3>
                  <span className="bg-red-900/30 text-red-400 text-xs px-2 py-1 rounded">
                    {event.location}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-3">{event.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{event.date}</span>
                  <a href={event.link} className="text-red-500 hover:text-red-400 text-sm font-medium">
                    Learn More
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-6">
            <a href={COMMUNITY_LINKS.events} className="text-red-500 hover:text-red-400 font-medium">
              View All Events
            </a>
          </div>
        </div>
        
        <div id={SECTION_IDS.showcase} className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Community Showcase</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Check out these amazing projects built by our community members using SolCrackAI.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {showcaseProjects.map((project, index) => (
              <div key={index} className="bg-gray-900/50 backdrop-blur-sm border border-red-900/20 rounded-xl overflow-hidden hover:border-red-500/30 transition-all hover:bg-gray-900/70">
                <img src={project.image} alt={project.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{project.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">by {project.creator}</p>
                  <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                  <a href={project.link} className="text-red-500 hover:text-red-400 font-medium">
                    View Project
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <a href={COMMUNITY_LINKS.showcase} className="bg-gradient-to-r from-red-600 to-red-800 px-6 py-3 rounded-lg font-medium hover:from-red-700 hover:to-red-900 transition-all inline-block">
              Submit Your Project
            </a>
          </div>
        </div>
        
        <div className="bg-gray-900/50 backdrop-blur-sm border border-red-900/20 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Get Involved</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              There are many ways to contribute to the SolCrackAI ecosystem.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black/40 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">Contribute to Open Source</h3>
              <p className="text-gray-400 mb-4">
                Help improve SolCrackAI by contributing to our open-source repositories. 
                We welcome contributions of all kinds, from code to documentation.
              </p>
              <a href={SOCIAL_LINKS.github} className="text-red-500 hover:text-red-400 font-medium">
                View GitHub Repositories
              </a>
            </div>
            
            <div className="bg-black/40 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">Become an Ambassador</h3>
              <p className="text-gray-400 mb-4">
                Join our ambassador program to help spread the word about SolCrackAI. 
                Ambassadors get exclusive benefits and early access to new features.
              </p>
              <a href={COMMUNITY_LINKS.ambassadors} className="text-red-500 hover:text-red-400 font-medium">
                Apply to the Ambassador Program
              </a>
            </div>
            
            <div className="bg-black/40 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">Create Tutorials</h3>
              <p className="text-gray-400 mb-4">
                Share your knowledge by creating tutorials and guides for SolCrackAI. 
                We'll feature the best content on our official channels.
              </p>
              <a href={COMMUNITY_LINKS.contribute} className="text-red-500 hover:text-red-400 font-medium">
                Submit a Tutorial
              </a>
            </div>
            
            <div className="bg-black/40 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">Join the DAO</h3>
              <p className="text-gray-400 mb-4">
                Participate in governance decisions through our DAO. 
                Help shape the future of SolCrackAI by voting on proposals.
              </p>
              <a href={COMMUNITY_LINKS.contribute} className="text-red-500 hover:text-red-400 font-medium">
                Learn About the DAO
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
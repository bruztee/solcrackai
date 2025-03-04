import React, { useState, useEffect } from 'react';
import { Bot, Loader2, Lock, Rocket, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

const LaunchApp = () => {
  const [loading, setLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState(1);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    const loadingSteps = [
      { step: 1, time: 1500 },
      { step: 2, time: 2000 },
      { step: 3, time: 1800 },
      { step: 4, time: 1000 },
    ];
    
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex < loadingSteps.length - 1) {
        currentIndex++;
        setLoadingStep(loadingSteps[currentIndex].step);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    }, loadingSteps[currentIndex].time);
    
    return () => clearInterval(interval);
  }, []);

  const getLoadingMessage = () => {
    switch (loadingStep) {
      case 1:
        return "Connecting to Solana network...";
      case 2:
        return "Loading AI modules...";
      case 3:
        return "Initializing agent builder...";
      case 4:
        return "Almost ready...";
      default:
        return "Loading...";
    }
  };

  if (loading) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md w-full">
          <Loader2 className="h-16 w-16 text-red-500 animate-spin mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-2">Launching SolCrackAI</h2>
          <p className="text-gray-400 mb-8">{getLoadingMessage()}</p>
          
          <div className="space-y-4">
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-red-500 to-red-700 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${loadingStep * 25}%` }}
              ></div>
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              <div className={`h-1 rounded-full ${loadingStep >= 1 ? 'bg-red-500' : 'bg-gray-700'}`}></div>
              <div className={`h-1 rounded-full ${loadingStep >= 2 ? 'bg-red-500' : 'bg-gray-700'}`}></div>
              <div className={`h-1 rounded-full ${loadingStep >= 3 ? 'bg-red-500' : 'bg-gray-700'}`}></div>
              <div className={`h-1 rounded-full ${loadingStep >= 4 ? 'bg-red-500' : 'bg-gray-700'}`}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md w-full">
          <div className="bg-red-900/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="h-10 w-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Connection Error</h2>
          <p className="text-gray-400 mb-6">
            We couldn't establish a secure connection to the Solana network. Please try again later.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-red-600 to-red-800 px-6 py-3 rounded-lg font-medium hover:from-red-700 hover:to-red-900 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-red-900/20 rounded-2xl p-8 mb-8">
            <div className="flex items-center mb-6">
              <div className="bg-red-900/20 rounded-lg w-12 h-12 flex items-center justify-center mr-4">
                <Rocket className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">SolCrackAI Platform</h2>
                <p className="text-gray-400">Early Access Version</p>
              </div>
            </div>
            
            <div className="bg-black/40 rounded-xl p-6 border border-gray-800 mb-6">
              <h3 className="text-xl font-semibold mb-4">Development Status</h3>
              <p className="text-gray-400 mb-4">
                The SolCrackAI platform is currently in early development. Many features are still being implemented and refined.
              </p>
              
              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">AI Agent Builder</span>
                    <span className="font-medium">65%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-gradient-to-r from-red-500 to-red-700 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Solana Integration</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-gradient-to-r from-red-500 to-red-700 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">User Interface</span>
                    <span className="font-medium">82%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-gradient-to-r from-red-500 to-red-700 h-2 rounded-full" style={{ width: '82%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Documentation</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-gradient-to-r from-red-500 to-red-700 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-red-900/20 rounded-lg">
                <Lock className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                <p className="text-sm text-gray-300">
                  Full access to the platform requires an invitation code. Join our waitlist to receive early access.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black/40 rounded-xl p-5 border border-gray-800">
                <h3 className="text-lg font-semibold mb-3">Join Waitlist</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Sign up to be notified when we open access to more users.
                </p>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="bg-gray-800/70 border border-gray-700 rounded-l-lg px-4 py-2 flex-1 focus:outline-none focus:border-red-500/50"
                  />
                  <button className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 rounded-r-lg px-4 py-2">
                    Join
                  </button>
                </div>
              </div>
              
              <div className="bg-black/40 rounded-xl p-5 border border-gray-800">
                <h3 className="text-lg font-semibold mb-3">Have an Invite?</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Enter your invitation code to get full access.
                </p>
                <div className="flex">
                  <input 
                    type="text" 
                    placeholder="Invitation code" 
                    className="bg-gray-800/70 border border-gray-700 rounded-l-lg px-4 py-2 flex-1 focus:outline-none focus:border-red-500/50"
                  />
                  <button className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 rounded-r-lg px-4 py-2">
                    Verify
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Link to="/demo" className="inline-flex items-center text-red-500 hover:text-red-400 font-medium">
              <Bot className="h-5 w-5 mr-2" />
              Try the interactive demo instead
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LaunchApp;
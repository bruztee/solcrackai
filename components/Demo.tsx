import React, { useState, useEffect } from 'react';
import { Bot, Loader2, MessageSquare, Puzzle, Rocket, Zap } from 'lucide-react';

const Demo = () => {
  const [loading, setLoading] = useState(true);
  const [activeDemo, setActiveDemo] = useState('chat');
  const [messages, setMessages] = useState<{role: string, content: string}[]>([
    { role: 'system', content: 'Welcome to the SolCrackAI demo. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loadingResponse, setLoadingResponse] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    const newMessages = [
      ...messages,
      { role: 'user', content: input }
    ];
    
    setMessages(newMessages);
    setInput('');
    setLoadingResponse(true);
    
    // Simulate AI response
    setTimeout(() => {
      let response = '';
      
      if (input.toLowerCase().includes('solana') || input.toLowerCase().includes('crypto')) {
        response = "I can help you interact with the Solana blockchain. Would you like to check token prices, create a transaction, or deploy an AI agent to the network?";
      } else if (input.toLowerCase().includes('ai') || input.toLowerCase().includes('agent')) {
        response = "SolCrackAI lets you build custom AI agents that can interact with the Solana blockchain. You can create agents for trading, monitoring, or automating various tasks.";
      } else {
        response = "I'm a demo of SolCrackAI's capabilities. I can help with Solana blockchain interactions and AI agent creation. What specific aspect would you like to explore?";
      }
      
      setMessages([...newMessages, { role: 'system', content: response }]);
      setLoadingResponse(false);
    }, 1500);
  };

  if (loading) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-red-500 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold">Loading SolCrackAI Demo...</h2>
          <p className="text-gray-400 mt-2">Connecting to Solana network</p>
        </div>
      </div>
    );
  }

  return (
    <section className="pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            SolCrackAI <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Interactive Demo</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Experience the power of AI agents on the Solana blockchain. This demo showcases
            some of our platform's capabilities.
          </p>
        </div>
        
        <div className="bg-gray-900/50 backdrop-blur-sm border border-red-900/20 rounded-2xl p-6 md:p-8 max-w-5xl mx-auto">
          <div className="flex border-b border-gray-800 mb-6 overflow-x-auto">
            <button 
              className={`px-4 py-3 font-medium whitespace-nowrap flex items-center ${activeDemo === 'chat' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setActiveDemo('chat')}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              AI Chat
            </button>
            <button 
              className={`px-4 py-3 font-medium whitespace-nowrap flex items-center ${activeDemo === 'builder' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setActiveDemo('builder')}
            >
              <Puzzle className="h-4 w-4 mr-2" />
              Agent Builder
            </button>
            <button 
              className={`px-4 py-3 font-medium whitespace-nowrap flex items-center ${activeDemo === 'solana' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setActiveDemo('solana')}
            >
              <Zap className="h-4 w-4 mr-2" />
              Solana Integration
            </button>
          </div>
          
          {activeDemo === 'chat' && (
            <div className="bg-black/40 rounded-xl p-4 border border-gray-800 min-h-[400px] flex flex-col">
              <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === 'user' 
                          ? 'bg-red-900/30 text-white' 
                          : 'bg-gray-800/70 text-gray-200'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {loadingResponse && (
                  <div className="flex justify-start">
                    <div className="bg-gray-800/70 rounded-lg p-3 text-gray-200 flex items-center">
                      <Loader2 className="h-4 w-4 text-red-500 animate-spin mr-2" />
                      SolCrackAI is thinking...
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about SolCrackAI or Solana integration..."
                  className="bg-gray-800/70 border border-gray-700 rounded-l-lg px-4 py-3 flex-1 focus:outline-none focus:border-red-500/50"
                />
                <button 
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 rounded-r-lg px-4 py-3 flex items-center"
                >
                  <span className="mr-2">Send</span>
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.20308 1.04312C1.00481 0.954998 0.772341 1.0048 0.627577 1.16641C0.482813 1.32802 0.458794 1.56455 0.568117 1.75196L3.92115 7.50002L0.568117 13.2481C0.458794 13.4355 0.482813 13.672 0.627577 13.8336C0.772341 13.9952 1.00481 14.045 1.20308 13.9569L14.7031 7.95693C14.8836 7.87668 15 7.69762 15 7.50002C15 7.30243 14.8836 7.12337 14.7031 7.04312L1.20308 1.04312ZM4.84553 7.10002L2.21234 2.586L13.2689 7.50002L2.21234 12.414L4.84552 7.90002H9C9.22092 7.90002 9.4 7.72094 9.4 7.50002C9.4 7.27911 9.22092 7.10002 9 7.10002H4.84553Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
                </button>
              </div>
            </div>
          )}
          
          {activeDemo === 'builder' && (
            <div className="bg-black/40 rounded-xl p-6 border border-gray-800 min-h-[400px] flex flex-col items-center justify-center text-center">
              <div className="bg-red-900/20 rounded-full w-20 h-20 flex items-center justify-center mb-6">
                <Puzzle className="h-10 w-10 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Agent Builder Demo</h3>
              <p className="text-gray-400 mb-6 max-w-md">
                The visual agent builder is currently under development. 
                Check back soon to create your own AI agents on Solana.
              </p>
              <div className="bg-gray-800/50 rounded-lg p-4 w-full max-w-md">
                <div className="flex items-center mb-4">
                  <div className="h-3 w-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-400">Development Progress: 65%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
                  <div className="bg-gradient-to-r from-red-500 to-red-700 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <p className="text-sm text-gray-500">
                  Currently implementing: Module connection logic and Solana program integration
                </p>
              </div>
            </div>
          )}
          
          {activeDemo === 'solana' && (
            <div className="bg-black/40 rounded-xl p-6 border border-gray-800 min-h-[400px] flex flex-col items-center justify-center text-center">
              <div className="bg-red-900/20 rounded-full w-20 h-20 flex items-center justify-center mb-6">
                <Zap className="h-10 w-10 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Solana Integration</h3>
              <p className="text-gray-400 mb-6 max-w-md">
                The Solana blockchain integration features are being finalized.
                Soon you'll be able to deploy AI agents directly to the Solana network.
              </p>
              <div className="bg-gray-800/50 rounded-lg p-4 w-full max-w-md">
                <div className="flex items-center mb-4">
                  <div className="h-3 w-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-400">Integration Progress: 78%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
                  <div className="bg-gradient-to-r from-red-500 to-red-700 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
                <p className="text-sm text-gray-500">
                  Currently implementing: Token payment system and on-chain agent verification
                </p>
              </div>
            </div>
          )}
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              This is a limited demo. Full functionality will be available in the official release.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;
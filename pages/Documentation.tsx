import React, { useState, useEffect, useRef } from 'react';
import { Book, Code, FileText, Search, Terminal, Zap } from 'lucide-react';
import SolanaLogo from '../components/SolanaLogo';

const Documentation = () => {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');
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

  const sections = [
    { id: 'getting-started', name: 'Getting Started', icon: <Book className="h-5 w-5" /> },
    { id: 'builder', name: 'Agent Builder', icon: <Code className="h-5 w-5" /> },
    { id: 'solana', name: 'Solana Integration', icon: <SolanaLogo className="h-5 w-5" /> },
    { id: 'api', name: 'API Reference', icon: <Terminal className="h-5 w-5" /> },
    { id: 'examples', name: 'Examples', icon: <FileText className="h-5 w-5" /> },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'getting-started':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Getting Started with SolCrackAI</h2>
            <p className="text-gray-400 mb-6">
              Welcome to SolCrackAI, the platform for building and deploying AI agents on the Solana blockchain.
              This guide will help you get started with creating your first AI agent.
            </p>
            
            <div className="space-y-6">
              <div className="bg-black/40 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold mb-3">1. Create an Account</h3>
                <p className="text-gray-400 mb-4">
                  To get started with SolCrackAI, you'll need to create an account. This will give you access to all the features of the platform.
                </p>
                <div className="bg-red-900/20 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Zap className="h-5 w-5 text-red-500 mr-2" />
                    <span className="font-medium">Quick Tip</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    You can sign up using your email or connect your Solana wallet directly for a seamless experience.
                  </p>
                </div>
              </div>
              
              <div className="bg-black/40 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold mb-3">2. Explore the Builder</h3>
                <p className="text-gray-400 mb-4">
                  The Agent Builder is the core of SolCrackAI. It allows you to create AI agents by connecting different modules together.
                </p>
                <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                  <pre className="text-sm text-gray-300 overflow-x-auto">
{`// Example agent configuration
{
  "name": "MyFirstAgent",
  "modules": [
    {
      "type": "nlp",
      "config": { "model": "gpt-4" }
    },
    {
      "type": "solana",
      "config": { "network": "devnet" }
    }
  ]
}`}
                  </pre>
                </div>
                <p className="text-gray-400">
                  You can create this configuration visually using our drag-and-drop interface or directly in code view.
                </p>
              </div>
              
              <div className="bg-black/40 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold mb-3">3. Deploy Your Agent</h3>
                <p className="text-gray-400 mb-4">
                  Once you've built your agent, you can deploy it to the Solana blockchain with a single click.
                </p>
                <div className="flex space-x-4 mb-4">
                  <div className="bg-gray-800/50 rounded-lg p-4 flex-1">
                    <h4 className="font-medium mb-2">Testnet Deployment</h4>
                    <p className="text-sm text-gray-400">
                      Deploy to Solana testnet for free to test your agent before going live.
                    </p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4 flex-1">
                    <h4 className="font-medium mb-2">Mainnet Deployment</h4>
                    <p className="text-sm text-gray-400">
                      Deploy to Solana mainnet when you're ready to go live with your agent.
                    </p>
                  </div>
                </div>
                <p className="text-gray-400">
                  Deployment costs are minimal thanks to Solana's low transaction fees.
                </p>
              </div>
            </div>
          </div>
        );
      
      case 'builder':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Agent Builder Documentation</h2>
            <p className="text-gray-400 mb-6">
              The Agent Builder is a visual interface for creating AI agents. You can drag and drop modules to create
              complex agent behaviors without writing any code.
            </p>
            
            <div className="space-y-6">
              <div className="bg-black/40 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold mb-3">Available Modules</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <div className="bg-red-900/30 rounded-md w-8 h-8 flex items-center justify-center mr-3">
                        <Code className="h-5 w-5 text-red-500" />
                      </div>
                      <h4 className="font-medium">Natural Language</h4>
                    </div>
                    <p className="text-sm text-gray-400">
                      Process and generate human language using advanced AI models.
                    </p>
                  </div>
                  
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <div className="bg-red-900/30 rounded-md w-8 h-8 flex items-center justify-center mr-3">
                        <SolanaLogo className="h-5 w-5 text-red-500" />
                      </div>
                      <h4 className="font-medium">Solana Integration</h4>
                    </div>
                    <p className="text-sm text-gray-400">
                      Connect to Solana blockchain for transactions and data storage.
                    </p>
                  </div>
                  
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <div className="bg-red-900/30 rounded-md w-8 h-8 flex items-center justify-center mr-3">
                        <Terminal className="h-5 w-5 text-red-500" />
                      </div>
                      <h4 className="font-medium">Decision Logic</h4>
                    </div>
                    <p className="text-sm text-gray-400">
                      Create complex decision trees and logical operations.
                    </p>
                  </div>
                  
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <div className="bg-red-900/30 rounded-md w-8 h-8 flex items-center justify-center mr-3">
                        <FileText className="h-5 w-5 text-red-500" />
                      </div>
                      <h4 className="font-medium">Data Processing</h4>
                    </div>
                    <p className="text-sm text-gray-400">
                      Process and transform data from various sources.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/40 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold mb-3">Building an Agent</h3>
                <p className="text-gray-400 mb-4">
                  Follow these steps to build your first agent:
                </p>
                <ol className="space-y-4">
                  <li className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="bg-red-900/30 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                        <span className="text-sm font-medium">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Start with a Core</h4>
                        <p className="text-sm text-gray-400">
                          Every agent starts with a core module that defines its basic properties.
                        </p>
                      </div>
                    </div>
                  </li>
                  
                  <li className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="bg-red-900/30 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                        <span className="text-sm font-medium">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Add Modules</h4>
                        <p className="text-sm text-gray-400">
                          Drag modules from the sidebar and connect them to the core.
                        </p>
                      </div>
                    </div>
                  </li>
                  
                  <li className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="bg-red-900/30 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                        <span className="text-sm font-medium">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Configure Modules</h4>
                        <p className="text-sm text-gray-400">
                          Click on each module to configure its settings.
                        </p>
                      </div>
                    </div>
                  </li>
                  
                  <li className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="bg-red-900/30 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                        <span className="text-sm font-medium">4</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Test Your Agent</h4>
                        <p className="text-sm text-gray-400">
                          Use the preview tab to test your agent before deployment.
                        </p>
                      </div>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        );
      
      case 'solana':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Solana Integration</h2>
            <p className="text-gray-400 mb-6">
              SolCrackAI is built on the Solana blockchain, providing high-speed, low-cost operations for your AI agents.
            </p>
            
            <div className="space-y-6">
              <div className="bg-black/40 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold mb-3">Connecting to Solana</h3>
                <p className="text-gray-400 mb-4">
                  Your AI agents can interact with the Solana blockchain in various ways:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Reading Data</h4>
                    <p className="text-sm text-gray-400">
                      Query account data, token balances, and program state.
                    </p>
                    <div className="bg-black/40 rounded-lg p-3 mt-3">
                      <pre className="text-xs text-gray-300 overflow-x-auto">
{`// Example: Reading SOL balance
const balance = await connection.getBalance(publicKey);`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Writing Data</h4>
                    <p className="text-sm text-gray-400">
                      Create transactions, update program state, and transfer tokens.
                    </p>
                    <div className="bg-black/40 rounded-lg p-3 mt-3">
                      <pre className="text-xs text-gray-300 overflow-x-auto">
{`// Example: Sending SOL
const tx = new Transaction().add(
  SystemProgram.transfer({
    fromPubkey: sender,
    toPubkey: recipient,
    lamports: amount
  })
);`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/40 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold mb-3">Solana Programs</h3>
                <p className="text-gray-400 mb-4">
                  SolCrackAI deploys custom Solana programs to manage your AI agents on-chain.
                </p>
                <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                  <h4 className="font-medium mb-2">Agent Registry Program</h4>
                  <p className="text-sm text-gray-400">
                    This program manages the registry of all AI agents deployed on the network.
                    It handles agent creation, updates, and permissions.
                  </p>
                  <div className="bg-black/40 rounded-lg p-3 mt-3">
                    <pre className="text-xs text-gray-300 overflow-x-auto">
{`// Program ID
const REGISTRY_PROGRAM_ID = "Sol1CrackA1aGent5bU1LderPLatf0Rm";`}
                    </pre>
                  </div>
                </div>
                
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Token Payment Program</h4>
                  <p className="text-sm text-gray-400">
                    This program handles token payments for using AI agents, allowing creators to monetize their agents.
                  </p>
                  <div className="bg-black/40 rounded-lg p-3 mt-3">
                    <pre className="text-xs text-gray-300 overflow-x-auto">
{`// Example: Setting up payment
const paymentSetup = {
  tokenMint: "7KVex...",
  feeAmount: 0.001,
  recipient: ownerPublicKey
};`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'api':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">API Reference</h2>
            <p className="text-gray-400 mb-6">
              SolCrackAI provides a comprehensive API for interacting with the platform programmatically.
            </p>
            
            <div className="space-y-6">
              <div className="bg-black/40 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold mb-3">Authentication</h3>
                <p className="text-gray-400 mb-4">
                  All API requests require authentication using an API key or JWT token.
                </p>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-medium mb-2">API Key Authentication</h4>
                  <p className="text-sm text-gray-400 mb-3">
                    Include your API key in the request headers:
                  </p>
                  <pre className="text-sm text-gray-300 bg-black/40 p-3 rounded-lg overflow-x-auto">
{`// Example request with API key
fetch('https://api.solcrack.ai/v1/agents', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})`}
                  </pre>
                </div>
              </div>
              
              <div className="bg-black/40 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold mb-3">Endpoints</h3>
                <div className="space-y-4">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <span className="bg-green-500 text-black px-2 py-1 rounded text-xs font-medium mr-2">GET</span>
                      <code className="text-gray-300">/v1/agents</code>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">
                      List all agents owned by the authenticated user.
                    </p>
                    <div className="bg-black/40 p-3 rounded-lg">
                      <pre className="text-xs text-gray-300 overflow-x-auto">
{`// Response
{
  "agents": [
    {
      "id": "agent_123",
      "name": "My First Agent",
      "created_at": "2025-01-15T12:00:00Z",
      "status": "active"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 10
}`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <span className="bg-blue-500 text-black px-2 py-1 rounded text-xs font-medium mr-2">POST</span>
                      <code className="text-gray-300">/v1/agents</code>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">
                      Create a new agent.
                    </p>
                    <div className="bg-black/40 p-3 rounded-lg">
                      <pre className="text-xs text-gray-300 overflow-x-auto">
{`// Request
{
  "name": "New Agent",
  "description": "My awesome AI agent",
  "modules": [
    {
      "type": "nlp",
      "config": { "model": "gpt-4" }
    }
  ]
}`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-medium mr-2">PUT</span>
                      <code className="text-gray-300">/v1/agents/:id</code>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">
                      Update an existing agent.
                    </p>
                  </div>
                  
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <span className="bg-red-500 text-black px-2 py-1 rounded text-xs font-medium mr-2">DELETE</span>
                      <code className="text-gray-300">/v1/agents/:id</code>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">
                      Delete an agent.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'examples':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Example Projects</h2>
            <p className="text-gray-400 mb-6">
              Explore these example projects to learn how to build different types of AI agents with SolCrackAI.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black/40 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold mb-3">Token Price Monitor</h3>
                <p className="text-gray-400 mb-4">
                  An agent that monitors token prices and sends alerts when certain conditions are met.
                </p>
                <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                  <h4 className="font-medium mb-2">Features</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Real-time price monitoring</li>
                    <li>• Custom alert conditions</li>
                    <li>• Notification via webhook</li>
                  </ul>
                </div>
                <button className="bg-gradient-to-r from-red-600 to-red-800 px-4 py-2 rounded-lg font-medium hover:from-red-700 hover:to-red-900 transition-all w-full">
                  View Example
                </button>
              </div>
              
              <div className="bg-black/40 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold mb-3">NFT Trading Assistant</h3>
                <p className="text-gray-400 mb-4">
                  An agent that helps users find and trade NFTs on Solana marketplaces.
                </p>
                <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                  <h4 className="font-medium mb-2">Features</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• NFT collection analysis</li>
                    <li>• Price prediction</li>
                    <li>• Automated bidding</li>
                  </ul>
                </div>
                <button className="bg-gradient-to-r from-red-600 to-red-800 px-4 py-2 rounded-lg font-medium hover:from-red-700 hover:to-red-900 transition-all w-full">
                  View Example
                </button>
              </div>
              
              <div className="bg-black/40 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold mb-3">DeFi Yield Optimizer</h3>
                <p className="text-gray-400 mb-4">
                  An agent that automatically moves funds between DeFi protocols to maximize yield.
                </p>
                <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                  <h4 className="font-medium mb-2">Features</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Yield comparison across protocols</li>
                    <li>• Risk assessment</li>
                    <li>• Automated fund movement</li>
                  </ul>
                </div>
                <button className="bg-gradient-to-r from-red-600 to-red-800 px-4 py-2 rounded-lg font-medium hover:from-red-700 hover:to-red-900 transition-all w-full">
                  View Example
                </button>
              </div>
              
              <div className="bg-black/40 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold mb-3">AI Chatbot with Blockchain Access</h3>
                <p className="text-gray-400 mb-4">
                  A conversational agent that can answer questions about blockchain data.
                </p>
                <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                  <h4 className="font-medium mb-2">Features</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Natural language understanding</li>
                    <li>• On-chain data querying</li>
                    <li>• Transaction explanation</li>
                  </ul>
                </div>
                <button className="bg-gradient-to-r from-red-600 to-red-800 px-4 py-2 rounded-lg font-medium hover:from-red-700 hover:to-red-900 transition-all w-full">
                  View Example
                </button>
              </div>
            </div>
          </div>
        );
      
      default:
        return <div>Select a section from the sidebar to view documentation.</div>;
    }
  };

  return (
    <section className="pt-32 pb-20 relative min-h-screen">
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
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            SolCrackAI <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Documentation</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive guides and references to help you build powerful AI agents on Solana.
          </p>
          
          <div className="max-w-2xl mx-auto mt-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:border-red-500/50 text-gray-300"
              />
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-red-900/20 rounded-xl p-4 h-fit">
            <h2 className="text-lg font-semibold mb-4">Documentation</h2>
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center ${
                    activeSection === section.id
                      ? 'bg-red-900/30 text-white'
                      : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-300'
                  }`}
                >
                  <span className="mr-2">{section.icon}</span>
                  {section.name}
                </button>
              ))}
            </nav>
            
            <div className="mt-6 pt-6 border-t border-gray-800">
              <h3 className="text-sm font-medium text-gray-400 mb-3">Resources</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-red-500 transition-colors text-sm">
                  GitHub Repository
                </a>
                <a href="#" className="block text-gray-400 hover:text-red-500 transition-colors text-sm">
                  Community Forum
                </a>
                <a href="#" className="block text-gray-400 hover:text-red-500 transition-colors text-sm">
                  Video Tutorials
                </a>
                <a href="#" className="block text-gray-400 hover:text-red-500 transition-colors text-sm">
                  Changelog
                </a>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-3 bg-gray-900/50 backdrop-blur-sm border border-red-900/20 rounded-xl p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Documentation;
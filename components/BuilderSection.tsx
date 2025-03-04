import React, { useState, useEffect, useRef } from 'react';
import { Bot, BrainCircuit, Code, Database, MessageSquare, Puzzle, Rocket } from 'lucide-react';

const BuilderSection = () => {
  const [activeTab, setActiveTab] = useState('visual');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [draggingModule, setDraggingModule] = useState<string | null>(null);
  const [droppedModules, setDroppedModules] = useState<{id: string, name: string, icon: JSX.Element}[]>([
    {id: 'nlp', name: 'Natural Language', icon: <MessageSquare className="h-5 w-5 text-red-500" />},
    {id: 'solana', name: 'Solana Integration', icon: <Puzzle className="h-5 w-5 text-red-500" />}
  ]);
  
  const modules = [
    { id: 'nlp', name: 'Natural Language', icon: <MessageSquare className="h-5 w-5" /> },
    { id: 'vision', name: 'Computer Vision', icon: <BrainCircuit className="h-5 w-5" /> },
    { id: 'data', name: 'Data Processing', icon: <Database className="h-5 w-5" /> },
    { id: 'logic', name: 'Decision Logic', icon: <Code className="h-5 w-5" /> },
    { id: 'solana', name: 'Solana Integration', icon: <Puzzle className="h-5 w-5" /> },
  ];

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

    // 3D Neural Network Visualization
    class Neuron {
      x: number;
      y: number;
      z: number;
      size: number;
      connections: Neuron[];
      layer: number;
      pulseTime: number;
      pulseSpeed: number;
      pulseState: number;
      color: string;

      constructor(x: number, y: number, z: number, layer: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.size = Math.random() * 3 + 2;
        this.connections = [];
        this.layer = layer;
        this.pulseTime = Math.random() * 100;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulseState = 0; // 0: inactive, 1: pulsing
        // Ensure hue is within valid range (0-360)
        const hue = Math.random() * 30 + 350;
        this.color = `hsl(${hue % 360}, 100%, 50%)`;
      }

      update(time: number) {
        this.pulseTime += this.pulseSpeed;
        
        // Randomly start pulsing
        if (this.pulseState === 0 && Math.random() < 0.001) {
          this.pulseState = 1;
        }
        
        // Reset pulse after it completes
        if (this.pulseState === 1 && this.pulseTime > 100) {
          this.pulseState = 0;
          this.pulseTime = 0;
        }
      }

      draw(ctx: CanvasRenderingContext2D, cameraZ: number) {
        // Calculate perspective
        const perspective = 400 / (400 + this.z - cameraZ);
        const screenX = this.x * perspective + canvas.width / 2;
        const screenY = this.y * perspective + canvas.height / 2;
        const screenSize = this.size * perspective;
        
        // Draw neuron
        ctx.fillStyle = this.color;
        ctx.globalAlpha = perspective * 0.5;
        ctx.beginPath();
        ctx.arc(screenX, screenY, screenSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw glow
        if (this.pulseState === 1) {
          const gradient = ctx.createRadialGradient(
            screenX, screenY, 0,
            screenX, screenY, screenSize * 3
          );
          // Fix: Use rgba() format instead of appending alpha to hsl()
          gradient.addColorStop(0, this.color.replace('hsl', 'hsla').replace(')', ', 0.5)'));
          gradient.addColorStop(1, 'transparent');
          
          ctx.fillStyle = gradient;
          ctx.globalAlpha = Math.sin(this.pulseTime) * 0.5;
          ctx.beginPath();
          ctx.arc(screenX, screenY, screenSize * 3, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.globalAlpha = 1;
      }

      drawConnections(ctx: CanvasRenderingContext2D, cameraZ: number, time: number) {
        const perspective1 = 400 / (400 + this.z - cameraZ);
        const screenX1 = this.x * perspective1 + canvas.width / 2;
        const screenY1 = this.y * perspective1 + canvas.height / 2;
        
        this.connections.forEach(neuron => {
          const perspective2 = 400 / (400 + neuron.z - cameraZ);
          const screenX2 = neuron.x * perspective2 + canvas.width / 2;
          const screenY2 = neuron.y * perspective2 + canvas.height / 2;
          
          // Calculate pulse position along the connection
          let pulsePosition = 0;
          let pulseVisible = false;
          let pulseAlpha = 0;
          
          if (this.pulseState === 1) {
            pulsePosition = (this.pulseTime % 100) / 100;
            pulseVisible = pulsePosition < 1;
            pulseAlpha = Math.sin(pulsePosition * Math.PI) * 0.8;
          }
          
          // Draw connection line
          ctx.strokeStyle = 'rgba(200, 0, 0, 0.1)';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(screenX1, screenY1);
          ctx.lineTo(screenX2, screenY2);
          ctx.stroke();
          
          // Draw pulse traveling along connection
          if (pulseVisible) {
            const pulseX = screenX1 + (screenX2 - screenX1) * pulsePosition;
            const pulseY = screenY1 + (screenY2 - screenY1) * pulsePosition;
            
            ctx.fillStyle = this.color;
            ctx.globalAlpha = pulseAlpha;
            ctx.beginPath();
            ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
          }
        });
      }
    }

    // Create neural network
    const createNeuralNetwork = () => {
      const neurons: Neuron[] = [];
      const layers = 5;
      const neuronsPerLayer = 15;
      const layerDistance = 100;
      
      // Create neurons in layers
      for (let layer = 0; layer < layers; layer++) {
        for (let i = 0; i < neuronsPerLayer; i++) {
          const angle = (i / neuronsPerLayer) * Math.PI * 2;
          const radius = 100;
          
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const z = layer * layerDistance - (layers * layerDistance) / 2;
          
          neurons.push(new Neuron(x, y, z, layer));
        }
      }
      
      // Connect neurons between adjacent layers
      for (let i = 0; i < neurons.length; i++) {
        const neuron = neurons[i];
        
        // Connect to neurons in the next layer
        if (neuron.layer < layers - 1) {
          const nextLayerNeurons = neurons.filter(n => n.layer === neuron.layer + 1);
          
          // Connect to 2-3 random neurons in the next layer
          const connectionsCount = Math.floor(Math.random() * 2) + 2;
          for (let j = 0; j < connectionsCount; j++) {
            const randomIndex = Math.floor(Math.random() * nextLayerNeurons.length);
            neuron.connections.push(nextLayerNeurons[randomIndex]);
          }
        }
      }
      
      return neurons;
    };

    const neurons = createNeuralNetwork();
    let cameraZ = 0;
    let cameraRotation = 0;
    let animationFrameId: number;

    // Animation loop
    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update camera position
      cameraRotation += 0.001;
      cameraZ = Math.sin(time / 5000) * 50;
      
      // Update and draw neurons
      neurons.forEach(neuron => {
        neuron.update(time / 10);
      });
      
      // Draw connections first (behind neurons)
      neurons.forEach(neuron => {
        neuron.drawConnections(ctx, cameraZ, time / 10);
      });
      
      // Then draw neurons
      neurons.forEach(neuron => {
        neuron.draw(ctx, cameraZ);
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleDragStart = (moduleId: string) => {
    setDraggingModule(moduleId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggingModule) {
      const moduleToAdd = modules.find(m => m.id === draggingModule);
      if (moduleToAdd && !droppedModules.some(m => m.id === draggingModule)) {
        setDroppedModules([...droppedModules, {
          id: moduleToAdd.id,
          name: moduleToAdd.name,
          icon: React.cloneElement(moduleToAdd.icon, { className: "h-5 w-5 text-red-500" })
        }]);
      }
      setDraggingModule(null);
    }
  };

  const handleRemoveModule = (moduleId: string) => {
    setDroppedModules(droppedModules.filter(m => m.id !== moduleId));
  };

  return (
    <section id="builder" className="py-20 relative">
      {/* Canvas Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0"
        style={{ width: '100%', height: '100%' }}
      />
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/5 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Intuitive <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Agent Builder</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Build sophisticated AI agents with our drag-and-drop interface.
            No coding required - just connect modules and deploy to Solana.
          </p>
        </div>
        
        <div className="bg-gray-900/50 backdrop-blur-sm border border-red-900/20 rounded-2xl p-6 md:p-8 max-w-5xl mx-auto">
          <div className="flex border-b border-gray-800 mb-6">
            <button 
              className={`px-4 py-3 font-medium ${activeTab === 'visual' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setActiveTab('visual')}
            >
              Visual Builder
            </button>
            <button 
              className={`px-4 py-3 font-medium ${activeTab === 'code' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setActiveTab('code')}
            >
              Code View
            </button>
            <button 
              className={`px-4 py-3 font-medium ${activeTab === 'preview' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setActiveTab('preview')}
            >
              Preview
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Modules Panel */}
            <div className="bg-black/40 rounded-xl p-4 border border-gray-800">
              <h3 className="text-lg font-medium mb-4">Modules</h3>
              <div className="space-y-3">
                {modules.map(module => (
                  <div 
                    key={module.id}
                    className="bg-gray-800/50 hover:bg-gray-800 rounded-lg p-3 cursor-pointer transition-colors flex items-center"
                    draggable
                    onDragStart={() => handleDragStart(module.id)}
                  >
                    <div className="bg-red-900/30 rounded-md w-8 h-8 flex items-center justify-center mr-3">
                      {module.icon}
                    </div>
                    <span>{module.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Builder Canvas */}
            <div 
              className="md:col-span-3 bg-black/40 rounded-xl p-4 border border-gray-800 relative min-h-[400px]"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {activeTab === 'visual' && (
                <div className="h-full flex flex-col items-center justify-center">
                  <div className="relative">
                    {/* Agent Core */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-900/30 border border-red-500/30 rounded-full w-20 h-20 flex items-center justify-center">
                      <Bot className="h-8 w-8 text-red-500" />
                    </div>
                    
                    {/* Connected Modules */}
                    <div className="bg-gray-800/70 border border-gray-700 rounded-xl p-6 pt-14 w-[300px]">
                      <div className="text-center mb-4 text-sm text-gray-400">
                        {droppedModules.length === 0 
                          ? "Drag modules here to build your agent" 
                          : "Drag more modules or remove existing ones"}
                      </div>
                      
                      <div className="space-y-3">
                        {droppedModules.map((module, index) => (
                          <div 
                            key={index} 
                            className="bg-gray-800 rounded-lg p-3 border border-red-900/30 flex items-center justify-between"
                          >
                            <div className="flex items-center">
                              <div className="bg-red-900/30 rounded-md w-8 h-8 flex items-center justify-center mr-3">
                                {module.icon}
                              </div>
                              <span>{module.name}</span>
                            </div>
                            <button 
                              className="text-gray-500 hover:text-red-500"
                              onClick={() => handleRemoveModule(module.id)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 flex justify-center">
                        <button className="bg-gradient-to-r from-red-600 to-red-800 px-4 py-2 rounded-lg font-medium hover:from-red-700 hover:to-red-900 transition-all flex items-center">
                          <Rocket className="h-4 w-4 mr-2" />
                          Deploy to Solana
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'code' && (
                <div className="font-mono text-sm text-gray-300 bg-black/60 p-4 rounded-lg h-full">
                  <pre className="whitespace-pre-wrap">
{`// SolanaAI Agent Configuration
{
  "name": "CustomAgent",
  "version": "1.0.0",
  "modules": [
${droppedModules.map(module => `    {
      "type": "${module.id}",
      "config": ${module.id === 'nlp' 
        ? '{\n        "model": "gpt-4",\n        "temperature": 0.7\n      }' 
        : module.id === 'solana' 
        ? '{\n        "network": "mainnet",\n        "wallet": "${WALLET_ADDRESS}",\n        "permissions": ["read", "transact"]\n      }'
        : module.id === 'vision'
        ? '{\n        "model": "vision-transformer",\n        "features": ["object-detection", "image-classification"]\n      }'
        : module.id === 'data'
        ? '{\n        "sources": ["api", "database"],\n        "transformations": ["filter", "aggregate"]\n      }'
        : '{\n        "rules": ["if-then", "switch-case"],\n        "complexity": "medium"\n      }'
      }
    }`).join(',\n')}
  ],
  "solana": {
    "programId": "Ag4L9x...",
    "tokenMint": "7KVex...",
    "fee": 0.001
  }
}`}
                  </pre>
                </div>
              )}
              
              {activeTab === 'preview' && (
                <div className="h-full flex flex-col items-center justify-center">
                  <div className="bg-black/60 rounded-lg p-6 max-w-md w-full">
                    <div className="flex items-center mb-4">
                      <Bot className="h-6 w-6 text-red-500 mr-2" />
                      <h3 className="font-medium">AI Agent Preview</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-gray-800/50 rounded-lg p-3 text-gray-300">
                        How can I check my Solana token balance?
                      </div>
                      <div className="bg-red-900/20 rounded-lg p-3 text-gray-200">
                        I can help you check your Solana token balance. Please connect your wallet or provide your public address, and I'll retrieve your current balance from the Solana blockchain.
                      </div>
                    </div>
                    <div className="mt-4 flex">
                      <input 
                        type=" text" 
                        placeholder="Ask your AI agent..." 
                        className="bg-gray-800/70 border border-gray-700 rounded-l-lg px-4 py-2 flex-1 focus:outline-none focus:border-red-500/50"
                      />
                      <button className="bg-red-600 hover:bg-red-700 rounded-r-lg px-4 py-2">
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuilderSection;
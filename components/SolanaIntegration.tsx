import React, { useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle, Coins, Cpu, Shield } from 'lucide-react';
import SolanaLogo from './SolanaLogo';

const SolanaIntegration = () => {
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

    // 3D Blockchain Visualization
    class Block {
      x: number;
      y: number;
      z: number;
      size: number;
      color: string;
      rotationX: number;
      rotationY: number;
      rotationZ: number;
      speedX: number;
      speedY: number;
      speedZ: number;
      connections: Block[];
      pulseTime: number;
      pulseState: number;
      data: string[];

      constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.size = Math.random() * 20 + 30;
        this.color = `hsl(${Math.random() * 30 + 350}, 100%, 50%)`;
        this.rotationX = Math.random() * Math.PI * 2;
        this.rotationY = Math.random() * Math.PI * 2;
        this.rotationZ = Math.random() * Math.PI * 2;
        this.speedX = (Math.random() * 0.01 - 0.005) * 0.5;
        this.speedY = (Math.random() * 0.01 - 0.005) * 0.5;
        this.speedZ = (Math.random() * 0.01 - 0.005) * 0.5;
        this.connections = [];
        this.pulseTime = Math.random() * 100;
        this.pulseState = 0;
        
        // Generate random transaction data
        this.data = [];
        const dataLength = Math.floor(Math.random() * 3) + 2;
        for (let i = 0; i < dataLength; i++) {
          this.data.push(this.generateRandomHash());
        }
      }

      generateRandomHash() {
        const chars = '0123456789abcdef';
        let hash = '';
        for (let i = 0; i < 8; i++) {
          hash += chars[Math.floor(Math.random() * chars.length)];
        }
        return hash;
      }

      update() {
        this.rotationX += this.speedX;
        this.rotationY += this.speedY;
        this.rotationZ += this.speedZ;
        
        this.pulseTime += 0.05;
        
        // Randomly start pulsing
        if (this.pulseState === 0 && Math.random() < 0.001) {
          this.pulseState = 1;
        }
        
        // Reset pulse after it completes
        if (this.pulseState === 1 && this.pulseTime > 100) {
          this.pulseState = 0;
          this.pulseTime = 0;
          
          // Propagate pulse to connected blocks
          this.connections.forEach(block => {
            if (block.pulseState === 0 && Math.random() < 0.7) {
              block.pulseState = 1;
            }
          });
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotationZ);
        
        // Draw block
        const blockOpacity = this.pulseState === 1 ? 
          0.3 + Math.sin(this.pulseTime * 0.1) * 0.2 : 0.3;
        
        ctx.fillStyle = this.color;
        ctx.globalAlpha = blockOpacity;
        ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
        
        // Draw block outline
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1;
        ctx.globalAlpha = blockOpacity + 0.2;
        ctx.strokeRect(-this.size/2, -this.size/2, this.size, this.size);
        
        // Draw data inside block
        ctx.globalAlpha = blockOpacity + 0.3;
        ctx.fillStyle = '#fff';
        ctx.font = '8px monospace';
        ctx.textAlign = 'center';
        
        this.data.forEach((data, index) => {
          const y = -this.size/3 + index * 12;
          ctx.fillText(data, 0, y);
        });
        
        ctx.restore();
      }

      drawConnections(ctx: CanvasRenderingContext2D) {
        this.connections.forEach(block => {
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
          ctx.strokeStyle = 'rgba(200, 0, 0, 0.2)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(block.x, block.y);
          ctx.stroke();
          
          // Draw pulse traveling along connection
          if (pulseVisible) {
            const pulseX = this.x + (block.x - this.x) * pulsePosition;
            const pulseY = this.y + (block.y - this.y) * pulsePosition;
            
            ctx.fillStyle = this.color;
            ctx.globalAlpha = pulseAlpha;
            ctx.beginPath();
            ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
          }
        });
      }
    }

    // Create blockchain
    const createBlockchain = () => {
      const blocks: Block[] = [];
      const blockCount = 15;
      
      // Create blocks in a chain-like structure
      for (let i = 0; i < blockCount; i++) {
        const angle = (i / blockCount) * Math.PI * 2;
        const radius = 200;
        
        const x = Math.cos(angle) * radius + canvas.width / 2;
        const y = Math.sin(angle) * radius + canvas.height / 2;
        const z = 0;
        
        blocks.push(new Block(x, y, z));
      }
      
      // Connect blocks in sequence (blockchain)
      for (let i = 0; i < blocks.length; i++) {
        const nextIndex = (i + 1) % blocks.length;
        blocks[i].connections.push(blocks[nextIndex]);
        
        // Add some random cross-connections for visual interest
        if (Math.random() < 0.3) {
          const randomIndex = Math.floor(Math.random() * blocks.length);
          if (randomIndex !== i && randomIndex !== nextIndex) {
            blocks[i].connections.push(blocks[randomIndex]);
          }
        }
      }
      
      return blocks;
    };

    const blocks = createBlockchain();
    let animationFrameId: number;

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections first (behind blocks)
      blocks.forEach(block => {
        block.drawConnections(ctx);
      });
      
      // Update and draw blocks
      blocks.forEach(block => {
        block.update();
        block.draw(ctx);
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const benefits = [
    {
      icon: <SolanaLogo className="h-5 w-5 text-red-500" />,
      title: "High-Speed Transactions",
      description: "Process up to 65,000 TPS with sub-second finality for real-time AI agent operations."
    },
    {
      icon: <Shield className="h-5 w-5 text-red-500" />,
      title: "Secure & Decentralized",
      description: "Deploy your AI agents on a secure, censorship-resistant blockchain network."
    },
    {
      icon: <Coins className="h-5 w-5 text-red-500" />,
      title: "Token Economics",
      description: "Monetize your AI agents with SOL and SPL tokens for seamless payments."
    },
    {
      icon: <Cpu className="h-5 w-5 text-red-500" />,
      title: "Low-Cost Execution",
      description: "Run your AI agents with minimal transaction fees compared to other blockchains."
    }
  ];

  return (
    <section id="solana" className="py-20 relative">
      {/* Canvas Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0"
        style={{ width: '100%', height: '100%' }}
      />
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(200,0,0,0.05),transparent_50%)]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center mb-6">
              <SolanaLogo className="text-red-500 mr-3" size={32} />
              <h2 className="text-3xl md:text-4xl font-bold">
                Powered by <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Solana Blockchain</span>
              </h2>
            </div>
            
            <p className="text-xl text-gray-400 mb-8">
              Our platform leverages Solana's high-performance blockchain to provide 
              a secure, scalable foundation for your AI agents. Benefit from lightning-fast 
              transactions and low fees while maintaining complete ownership of your creations.
            </p>
            
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex">
                  <div className="mr-4 mt-1">
                    <CheckCircle className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{benefit.title}</h3>
                    <p className="text-gray-400">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="flex items-center text-red-500 hover:text-red-400 font-medium">
              Learn more about Solana integration
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur-sm border border-red-900/20 rounded-2xl p-6 md:p-8">
            <div className="bg-black/40 rounded-xl p-6 mb-6">
              <div className="flex items-center mb-4">
                <SolanaLogo className="text-red-500 mr-2" size={24} />
                <h3 className="text-xl font-semibold">Solana Token Metrics</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Current SOL Price</span>
                    <span className="font-medium">$142.87</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-gradient-to-r from-red-500 to-red-700 h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Network TPS</span>
                    <span className="font-medium">4,219</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-gradient-to-r from-red-500 to-red-700 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Active Validators</span>
                    <span className="font-medium">1,785</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-gradient-to-r from-red-500 to-red-700 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/40 rounded-xl p-5">
                <div className="flex items-center mb-3">
                  {benefits[0].icon}
                  <h4 className="ml-2 font-medium">{benefits[0].title}</h4>
                </div>
                <p className="text-sm text-gray-400">{benefits[0].description}</p>
              </div>
              
              <div className="bg-black/40 rounded-xl p-5">
                <div className="flex items-center mb-3">
                  {benefits[1].icon}
                  <h4 className="ml-2 font-medium">{benefits[1].title}</h4>
                </div>
                <p className="text-sm text-gray-400">{benefits[1].description}</p>
              </div>
              
              <div className="bg-black/40 rounded-xl p-5">
                <div className="flex items-center mb-3">
                  {benefits[2].icon}
                  <h4 className="ml-2 font-medium">{benefits[2].title}</h4>
                </div>
                <p className="text-sm text-gray-400">{benefits[2].description}</p>
              </div>
              
              <div className="bg-black/40 rounded-xl p-5">
                <div className="flex items-center mb-3">
                  {benefits[3].icon}
                  <h4 className="ml-2 font-medium">{benefits[3].title}</h4>
                </div>
                <p className="text-sm text-gray-400">{benefits[3].description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolanaIntegration;
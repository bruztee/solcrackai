import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bot, Cpu, Zap } from 'lucide-react';
import SolanaLogo from './SolanaLogo';

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCopied, setIsCopied] = useState(false);
  const contractAddress = "EpqzCz38FFb1tezCBownCsyBC9drCCRqfudJoH9opump";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    // Bot particles
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      type: string;
      opacity: number;
      rotationSpeed: number;
      rotation: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 15 + 5;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `hsl(${Math.random() * 30 + 350}, 100%, 50%)`;
        this.type = Math.random() > 0.7 ? 'bot' : 'circle';
        this.opacity = Math.random() * 0.5 + 0.2;
        this.rotationSpeed = Math.random() * 0.02 - 0.01;
        this.rotation = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY;
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        if (this.type === 'bot') {
          // Draw bot icon
          ctx.fillStyle = this.color;
          ctx.beginPath();
          // Bot head
          ctx.roundRect(-this.size/2, -this.size/2, this.size, this.size, this.size/5);
          ctx.fill();
          
          // Bot eyes
          ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
          ctx.beginPath();
          ctx.arc(-this.size/4, -this.size/6, this.size/8, 0, Math.PI * 2);
          ctx.arc(this.size/4, -this.size/6, this.size/8, 0, Math.PI * 2);
          ctx.fill();
          
          // Bot antenna
          ctx.strokeStyle = this.color;
          ctx.lineWidth = this.size/10;
          ctx.beginPath();
          ctx.moveTo(0, -this.size/2);
          ctx.lineTo(0, -this.size);
          ctx.stroke();
          
          // Bot mouth
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
          ctx.beginPath();
          ctx.moveTo(-this.size/4, this.size/6);
          ctx.lineTo(this.size/4, this.size/6);
          ctx.stroke();
        } else {
          // Draw circle with glow
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
          gradient.addColorStop(0, this.color);
          gradient.addColorStop(1, 'transparent');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.restore();
      }
    }

    // Create particles
    const particlesArray: Particle[] = [];
    const numberOfParticles = Math.min(50, Math.floor(window.innerWidth / 30));
    
    for (let i = 0; i < numberOfParticles; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      particlesArray.push(new Particle(x, y));
    }

    // Create connections between particles
    const connectParticles = () => {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 200) {
            const opacity = 1 - distance / 200;
            ctx.strokeStyle = `rgba(200, 0, 0, ${opacity * 0.2})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };

    // 3D cube effect
    class Cube {
      x: number;
      y: number;
      z: number;
      size: number;
      rotationX: number;
      rotationY: number;
      rotationZ: number;
      speedX: number;
      speedY: number;
      speedZ: number;
      color: string;
      opacity: number;

      constructor() {
        this.x = canvas.width / 2 + (Math.random() * canvas.width / 2 - canvas.width / 4);
        this.y = canvas.height / 2 + (Math.random() * canvas.height / 2 - canvas.height / 4);
        this.z = 0;
        this.size = Math.random() * 100 + 50;
        this.rotationX = Math.random() * Math.PI * 2;
        this.rotationY = Math.random() * Math.PI * 2;
        this.rotationZ = Math.random() * Math.PI * 2;
        this.speedX = Math.random() * 0.01 - 0.005;
        this.speedY = Math.random() * 0.01 - 0.005;
        this.speedZ = Math.random() * 0.01 - 0.005;
        this.color = `hsl(${Math.random() * 30 + 350}, 100%, 50%)`;
        this.opacity = Math.random() * 0.2 + 0.1;
      }

      update() {
        this.rotationX += this.speedX;
        this.rotationY += this.speedY;
        this.rotationZ += this.speedZ;
      }

      draw() {
        const vertices = [
          // Front face
          { x: -1, y: -1, z: 1 },
          { x: 1, y: -1, z: 1 },
          { x: 1, y: 1, z: 1 },
          { x: -1, y: 1, z: 1 },
          // Back face
          { x: -1, y: -1, z: -1 },
          { x: 1, y: -1, z: -1 },
          { x: 1, y: 1, z: -1 },
          { x: -1, y: 1, z: -1 }
        ];

        const edges = [
          // Front face
          [0, 1], [1, 2], [2, 3], [3, 0],
          // Back face
          [4, 5], [5, 6], [6, 7], [7, 4],
          // Connecting edges
          [0, 4], [1, 5], [2, 6], [3, 7]
        ];

        // Apply rotations
        const rotatedVertices = vertices.map(vertex => {
          // Rotate around X axis
          let y1 = vertex.y * Math.cos(this.rotationX) - vertex.z * Math.sin(this.rotationX);
          let z1 = vertex.y * Math.sin(this.rotationX) + vertex.z * Math.cos(this.rotationX);

          // Rotate around Y axis
          let x2 = vertex.x * Math.cos(this.rotationY) + z1 * Math.sin(this.rotationY);
          let z2 = -vertex.x * Math.sin(this.rotationY) + z1 * Math.cos(this.rotationY);

          // Rotate around Z axis
          let x3 = x2 * Math.cos(this.rotationZ) - y1 * Math.sin(this.rotationZ);
          let y3 = x2 * Math.sin(this.rotationZ) + y1 * Math.cos(this.rotationZ);

          return {
            x: x3 * this.size + this.x,
            y: y3 * this.size + this.y,
            z: z2
          };
        });

        // Draw edges
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = this.opacity;

        edges.forEach(edge => {
          const v1 = rotatedVertices[edge[0]];
          const v2 = rotatedVertices[edge[1]];
          
          ctx.beginPath();
          ctx.moveTo(v1.x, v1.y);
          ctx.lineTo(v2.x, v2.y);
          ctx.stroke();
        });

        // Reset global alpha
        ctx.globalAlpha = 1;
      }
    }

    // Create cubes
    const cubesArray: Cube[] = [];
    const numberOfCubes = 5;
    
    for (let i = 0; i < numberOfCubes; i++) {
      cubesArray.push(new Cube());
    }

    // Animation loop
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

      // Update and draw cubes
      cubesArray.forEach(cube => {
        cube.update();
        cube.draw();
      });
      
      // Update and draw particles
      particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Connect particles
      connectParticles();
      
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);

  return (
    <section className="pt-32 pb-20 relative overflow-hidden">
      {/* Canvas Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Additional background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-red-800/10 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(200,0,0,0.05),transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-red-900/20 rounded-full mb-6 backdrop-blur-sm">
            <SolanaLogo className="text-red-500 mr-2" size={16} />
            <span className="text-sm font-medium text-red-400">Powered by Solana Blockchain</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Build Advanced <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">AI Agents</span> on Solana
          </h1>
          
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Create, deploy, and monetize powerful AI agents with our modular building blocks. 
            Leverage the speed and security of Solana blockchain for next-generation AI solutions.
          </p>
          
          {/* Contract Address */}
          <div className="bg-black/30 backdrop-blur-sm border border-red-900/30 rounded-lg p-3 mb-8 inline-flex items-center">
            <div className="mr-3 bg-red-900/20 p-2 rounded-md">
              <SolanaLogo className="text-red-500" size={20} />
            </div>
            <div className="text-left">
              <div className="text-sm text-red-400 font-medium">Contract Address (CA)</div>
              <div className="flex items-center">
                <code className="text-gray-300 font-mono text-sm mr-2">{contractAddress}</code>
                <button 
                  onClick={copyToClipboard}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  {isCopied ? (
                    <span className="text-green-500 text-xs">Copied!</span>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link 
              to="/launch" 
              className="bg-gradient-to-r from-red-600 to-red-800 px-8 py-3 rounded-full font-medium hover:from-red-700 hover:to-red-900 transition-all shadow-lg shadow-red-900/20 text-lg"
            >
              Start Building
            </Link>
            <Link 
              to="/demo" 
              className="bg-white/5 border border-red-900/30 px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-all text-lg"
            >
              Explore Demos
            </Link>
          </div>
          
          <div className="flex justify-center items-center space-x-8 text-gray-500">
            <div className="flex items-center">
              <Cpu className="h-5 w-5 text-red-500 mr-2" />
              <span>High Performance</span>
            </div>
            <div className="flex items-center">
              <Bot className="h-5 w-5 text-red-500 mr-2" />
              <span>Modular Design</span>
            </div>
            <div className="flex items-center">
              <SolanaLogo className="text-red-500 mr-2" size={20} />
              <span>Solana Powered</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
import React, { useEffect, useRef } from 'react';
import { Bot, Code, Cpu, Layers, Shield, Sparkles } from 'lucide-react';
import SolanaLogo from './SolanaLogo';

const Features = () => {
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

    // 3D floating icons
    class FloatingIcon {
      x: number;
      y: number;
      z: number;
      size: number;
      type: string;
      rotationSpeed: number;
      rotation: number;
      floatSpeed: number;
      floatOffset: number;
      color: string;
      opacity: number;

      constructor(x: number, y: number, type: string) {
        this.x = x;
        this.y = y;
        this.z = Math.random() * 200 - 100;
        this.size = Math.random() * 20 + 10;
        this.type = type;
        this.rotationSpeed = Math.random() * 0.02 - 0.01;
        this.rotation = Math.random() * Math.PI * 2;
        this.floatSpeed = Math.random() * 0.02 + 0.01;
        this.floatOffset = Math.random() * Math.PI * 2;
        // Ensure hue is within valid range (0-360)
        const hue = Math.random() * 30 + 350;
        this.color = `hsl(${hue % 360}, 100%, 50%)`;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update(time: number) {
        this.rotation += this.rotationSpeed;
        this.y += Math.sin(time * this.floatSpeed + this.floatOffset) * 0.5;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        // Draw icon based on type
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;

        switch(this.type) {
          case 'bot':
            // Bot icon
            ctx.beginPath();
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
            ctx.beginPath();
            ctx.moveTo(0, -this.size/2);
            ctx.lineTo(0, -this.size);
            ctx.stroke();
            break;
            
          case 'code':
            // Code brackets
            ctx.beginPath();
            ctx.moveTo(-this.size/2, -this.size/3);
            ctx.lineTo(-this.size/1.5, 0);
            ctx.lineTo(-this.size/2, this.size/3);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(this.size/2, -this.size/3);
            ctx.lineTo(this.size/1.5, 0);
            ctx.lineTo(this.size/2, this.size/3);
            ctx.stroke();
            break;
            
          case 'solana':
            // Solana logo - exact shape from the image
            const barHeight = this.size / 5;
            const barWidth = this.size;
            
            // Top bar
            ctx.beginPath();
            ctx.moveTo(-barWidth/2, -this.size/3);
            ctx.lineTo(barWidth/2, -this.size/3);
            ctx.lineTo(barWidth/3, -this.size/3 + barHeight);
            ctx.lineTo(-barWidth/2 - barWidth/6, -this.size/3 + barHeight);
            ctx.closePath();
            ctx.fill();
            
            // Middle bar
            ctx.beginPath();
            ctx.moveTo(-barWidth/2 - barWidth/6, 0);
            ctx.lineTo(barWidth/3, 0);
            ctx.lineTo(barWidth/2, barHeight);
            ctx.lineTo(-barWidth/3, barHeight);
            ctx.closePath();
            ctx.fill();
            
            // Bottom bar
            ctx.beginPath();
            ctx.moveTo(-barWidth/3, this.size/3);
            ctx.lineTo(barWidth/2, this.size/3);
            ctx.lineTo(barWidth/3, this.size/3 + barHeight);
            ctx.lineTo(-barWidth/2 - barWidth/6, this.size/3 + barHeight);
            ctx.closePath();
            ctx.fill();
            break;
            
          case 'shield':
            // Shield
            ctx.beginPath();
            ctx.moveTo(0, -this.size/2);
            ctx.lineTo(this.size/2, -this.size/4);
            ctx.lineTo(this.size/2, this.size/4);
            ctx.lineTo(0, this.size/2);
            ctx.lineTo(-this.size/2, this.size/4);
            ctx.lineTo(-this.size/2, -this.size/4);
            ctx.closePath();
            ctx.fill();
            break;
            
          case 'sparkles':
            // Sparkle
            for (let i = 0; i < 4; i++) {
              const angle = (Math.PI / 2) * i;
              ctx.beginPath();
              ctx.moveTo(0, 0);
              ctx.lineTo(Math.cos(angle) * this.size/2, Math.sin(angle) * this.size/2);
              ctx.stroke();
            }
            
            for (let i = 0; i < 4; i++) {
              const angle = (Math.PI / 2) * i + Math.PI/4;
              ctx.beginPath();
              ctx.moveTo(0, 0);
              ctx.lineTo(Math.cos(angle) * this.size/3, Math.sin(angle) * this.size/3);
              ctx.stroke();
            }
            break;
            
          case 'cpu':
            // CPU
            ctx.beginPath();
            ctx.roundRect(-this.size/2, -this.size/2, this.size, this.size, this.size/10);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.roundRect(-this.size/4, -this.size/4, this.size/2, this.size/2, this.size/20);
            ctx.fill();
            break;
            
          case 'layers':
            // Layers
            for (let i = 0; i < 3; i++) {
              ctx.beginPath();
              ctx.roundRect(-this.size/2, -this.size/2 + i * this.size/4, this.size, this.size/5, this.size/20);
              ctx.fill();
            }
            break;
            
          default:
            // Default circle
            ctx.beginPath();
            ctx.arc(0, 0, this.size/2, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.restore();
      }
    }

    // Create floating icons
    const iconTypes = ['bot', 'code', 'solana', 'shield', 'sparkles', 'cpu', 'layers'];
    const floatingIcons: FloatingIcon[] = [];
    const numberOfIcons = 30;
    
    for (let i = 0; i < numberOfIcons; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const type = iconTypes[Math.floor(Math.random() * iconTypes.length)];
      floatingIcons.push(new FloatingIcon(x, y, type));
    }

    // Animation loop
    let animationFrameId: number;
    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw floating icons
      floatingIcons.forEach(icon => {
        icon.update(time / 1000);
        icon.draw();
      });
      
      // Draw connections between nearby icons
      for (let a = 0; a < floatingIcons.length; a++) {
        for (let b = a + 1; b < floatingIcons.length; b++) {
          const dx = floatingIcons[a].x - floatingIcons[b].x;
          const dy = floatingIcons[a].y - floatingIcons[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const opacity = 1 - distance / 150;
            ctx.strokeStyle = `rgba(200, 0, 0, ${opacity * 0.15})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(floatingIcons[a].x, floatingIcons[a].y);
            ctx.lineTo(floatingIcons[b].x, floatingIcons[b].y);
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const features = [
    {
      icon: <Layers className="h-6 w-6 text-red-500" />,
      title: "Modular Components",
      description: "Drag-and-drop AI modules to build custom agents without coding. Mix and match capabilities for your specific use case."
    },
    {
      icon: <Bot className="h-6 w-6 text-red-500" />,
      title: "Advanced AI Models",
      description: "Access state-of-the-art AI models optimized for the Solana blockchain with low-latency inference."
    },
    {
      icon: <SolanaLogo className="h-6 w-6 text-red-500" />,
      title: "Solana Integration",
      description: "Seamlessly connect to Solana's high-speed blockchain for transactions, data storage, and token management."
    },
    {
      icon: <Code className="h-6 w-6 text-red-500" />,
      title: "Custom Logic",
      description: "Implement custom business logic and decision trees with our visual programming interface."
    },
    {
      icon: <Shield className="h-6 w-6 text-red-500" />,
      title: "Secure Execution",
      description: "Run your AI agents in a secure, decentralized environment with cryptographic verification."
    },
    {
      icon: <Sparkles className="h-6 w-6 text-red-500" />,
      title: "Token Rewards",
      description: "Monetize your AI agents with Solana token integration and automated payment systems."
    }
  ];

  return (
    <section id="features" className="py-20 relative">
      {/* Canvas Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0"
        style={{ width: '100%', height: '100%' }}
      />
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features for <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">AI Builders</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our platform combines cutting-edge AI technology with Solana's blockchain capabilities
            to create a powerful ecosystem for next-generation agent development.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gray-900/50 backdrop-blur-sm border border-red-900/20 rounded-xl p-6 hover:border-red-500/30 transition-all hover:bg-gray-900/70 hover:transform hover:scale-105 duration-300"
            >
              <div className="bg-red-900/20 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
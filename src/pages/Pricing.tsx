import React, { useEffect, useRef } from 'react';
import { Check, HelpCircle, Zap } from 'lucide-react';
import SolanaLogo from '../components/SolanaLogo';

const Pricing = () => {
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

  const plans = [
    {
      name: "Basic",
      price: "1M $SOLCRACK",
      description: "For hobbyists and learners",
      features: [
        "1 AI agent",
        "Basic modules",
        "Testnet deployment only",
        "Community support",
        "1,000 API calls/month"
      ],
      limitations: [
        "No mainnet deployment",
        "No custom modules",
        "No monetization"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: "10M $SOLCRACK",
      description: "For developers and creators",
      features: [
        "10 AI agents",
        "All modules included",
        "Mainnet deployment",
        "Priority support",
        "50,000 API calls/month",
        "Custom module development",
        "Agent monetization",
        "Analytics dashboard"
      ],
      limitations: [],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "100M+ $SOLCRACK",
      description: "For businesses and organizations",
      features: [
        "Unlimited AI agents",
        "All modules included",
        "Mainnet deployment",
        "Dedicated support",
        "Unlimited API calls",
        "Custom module development",
        "Agent monetization",
        "Advanced analytics",
        "SLA guarantees",
        "Custom integrations",
        "On-boarding assistance"
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const faqs = [
    {
      question: "How does the pricing work?",
      answer: "Our pricing is based on holding $SOLCRACK tokens. You need to hold a minimum amount of tokens to access different tiers of features. The more tokens you hold, the more features and resources you can access."
    },
    {
      question: "Can I upgrade or downgrade my plan?",
      answer: "Yes, you can upgrade or downgrade your plan at any time by adjusting the amount of $SOLCRACK tokens you hold. When upgrading, you'll get immediate access to the new features."
    },
    {
      question: "What happens if I exceed my API call limit?",
      answer: "If you exceed your monthly API call limit, you'll need to hold additional $SOLCRACK tokens or pay a small fee for each additional API call. We'll notify you when you're approaching your limit."
    },
    {
      question: "Where can I get $SOLCRACK tokens?",
      answer: "You can acquire $SOLCRACK tokens on major Solana DEXes like Jupiter, Raydium, and Orca. We also offer direct token purchases through our platform for Enterprise customers."
    },
    {
      question: "What payment methods do you accept?",
      answer: "For direct token purchases, we accept SOL and USDC on Solana. For Enterprise plans, we also offer invoice-based payments."
    }
  ];

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
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Token-Based <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Access Model</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Access our platform by holding $SOLCRACK tokens. The more tokens you hold, the more features you unlock.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-gray-900/50 backdrop-blur-sm border rounded-2xl p-6 relative ${
                plan.popular 
                  ? 'border-red-500/30 shadow-lg shadow-red-900/20' 
                  : 'border-red-900/20'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-600 to-red-800 px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                <div className="flex items-center justify-center mb-2">
                  <SolanaLogo className="h-5 w-5 text-red-500 mr-2" />
                  <span className="text-2xl font-bold">{plan.price}</span>
                </div>
                <p className="text-gray-400">{plan.description}</p>
              </div>
              
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
                
                {plan.limitations.length > 0 && (
                  <>
                    <div className="border-t border-gray-800 my-4"></div>
                    <p className="text-sm text-gray-500 font-medium">Limitations:</p>
                    {plan.limitations.map((limitation, i) => (
                      <div key={i} className="flex items-start">
                        <span className="text-gray-500 mr-2">•</span>
                        <span className="text-gray-500">{limitation}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>
              
              <button className={`w-full py-3 rounded-lg font-medium ${
                plan.popular 
                  ? 'bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900' 
                  : 'bg-white/5 border border-red-900/30 hover:bg-white/10'
              } transition-all`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
        
        <div className="bg-gray-900/50 backdrop-blur-sm border border-red-900/20 rounded-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Enterprise Features</h2>
            <p className="text-gray-400">
              Customized solutions for organizations with advanced needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black/40 rounded-xl p-5">
              <div className="bg-red-900/20 rounded-lg w-10 h-10 flex items-center justify-center mb-4">
                <SolanaLogo className="h-5 w-5 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Custom Solana Programs</h3>
              <p className="text-gray-400 text-sm">
                We'll develop custom Solana programs tailored to your specific business requirements.
              </p>
            </div>
            
            <div className="bg-black/40 rounded-xl p-5">
              <div className="bg-red-900/20 rounded-lg w-10 h-10 flex items-center justify-center mb-4">
                <Zap className="h-5 w-5 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Dedicated Infrastructure</h3>
              <p className="text-gray-400 text-sm">
                Get dedicated servers and infrastructure for maximum performance and reliability.
              </p>
            </div>
            
            <div className="bg-black/40 rounded-xl p-5">
              <div className="bg-red-900/20 rounded-lg w-10 h-10 flex items-center justify-center mb-4">
                <HelpCircle className="h-5 w-5 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-400 text-sm">
                Round-the-clock support from our team of experts to ensure your agents are always running smoothly.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-900/50 backdrop-blur-sm border border-red-900/20 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
            <p className="text-gray-400">
              Have questions about our token-based access model? Find answers to common questions below.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-black/40 rounded-xl p-5">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-400 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-400 mb-4">
              Still have questions? Contact our team for more information.
            </p>
            <button className="bg-gradient-to-r from-red-600 to-red-800 px-6 py-3 rounded-lg font-medium hover:from-red-700 hover:to-red-900 transition-all">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
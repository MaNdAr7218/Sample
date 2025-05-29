
import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from '@/components/ThemeToggle';
import { ArrowRight, BookOpen, LogIn, UserPlus } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showAnimatedText, setShowAnimatedText] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Handle navigation based on auth state
  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/signup');
    }
  };

  // Animated text effect
  useEffect(() => {
    setTimeout(() => {
      setShowAnimatedText(true);
    }, 500);
  }, []);

  // 3D animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to be full width
    const handleResize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Particle system
    const particles: {
      x: number;
      y: number;
      size: number;
      color: string;
      vx: number;
      vy: number;
    }[] = [];

    // Colors for particles
    const colors = [
      '#9b87f5', // story-purple
      '#7E69AB', // story-darkpurple
      '#E5DEFF', // story-softpurple
      '#FDE1D3', // story-softpeach
    ];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = 0.7;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Canvas background */}
      <canvas 
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
      ></canvas>
      
      {/* Header */}
      <header className="relative z-10 border-b border-border/20 backdrop-blur-md bg-background/80">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-story-purple" />
            <span className="font-bold text-xl">StoryWeaver</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex gap-2">
              {!user ? (
                <>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => navigate('/login')}
                  >
                    <LogIn className="h-4 w-4 mr-1" />
                    Log in
                  </Button>
                  <Button 
                    className="bg-story-purple hover:bg-story-darkpurple"
                    size="sm"
                    onClick={() => navigate('/signup')}
                  >
                    <UserPlus className="h-4 w-4 mr-1" />
                    Sign up
                  </Button>
                </>
              ) : (
                <Button 
                  className="bg-story-purple hover:bg-story-darkpurple"
                  size="sm"
                  onClick={() => navigate('/dashboard')}
                >
                  Dashboard
                </Button>
              )}
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>
      
      {/* Hero section */}
      <section className="relative z-10 flex-1 flex items-center justify-center py-12 px-4">
        <div className="container max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div 
            className={`space-y-6 transition-all duration-1000 ${
              showAnimatedText ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Transform 
              <span className="bg-gradient-to-r from-story-purple to-story-darkpurple dark:from-story-softpurple dark:to-story-purple inline-block text-transparent bg-clip-text">
                {' '}keywords{' '}
              </span>
              into enchanting stories
            </h1>
            
            <p className="text-lg text-muted-foreground">
              StoryWeaver uses advanced AI to turn your ideas into captivating narratives.
              Create, save, and share your stories with just a few clicks.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-story-purple hover:bg-story-darkpurple text-white px-8 py-6 text-lg"
                onClick={handleGetStarted}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                className="px-8 py-6 text-lg"
                onClick={() => navigate(user ? '/dashboard' : '/login')}
              >
                {user ? 'Go to Dashboard' : 'Log In'}
              </Button>
            </div>
          </div>
          
          {/* 3D Card Effect */}
          <div 
            className={`relative transition-all duration-1000 delay-300 ${
              showAnimatedText ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="perspective-card">
              <div className="story-card-3d">
                <div className="glass rounded-xl overflow-hidden shadow-xl border border-white/20 dark:border-white/10 animate-float">
                  <div className="p-6 space-y-4 backdrop-blur-lg">
                    <h3 className="text-xl font-bold">The Dragon's Quest</h3>
                    <p className="text-sm text-muted-foreground line-clamp-4">
                      Once upon a time, in a land far away, a young dragon discovered 
                      an ancient map leading to a treasure that could change the fate of 
                      dragonkind forever...
                    </p>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-story-purple/10 text-story-purple rounded-full text-xs">dragon</span>
                      <span className="px-2 py-1 bg-story-purple/10 text-story-purple rounded-full text-xs">adventure</span>
                      <span className="px-2 py-1 bg-story-purple/10 text-story-purple rounded-full text-xs">treasure</span>
                    </div>
                  </div>
                </div>
                
                <div className="glass rounded-xl overflow-hidden shadow-xl border border-white/20 dark:border-white/10 animate-float-slow absolute -bottom-10 -right-10 w-3/4">
                  <div className="p-6 space-y-4 backdrop-blur-lg">
                    <h3 className="text-xl font-bold">Cosmic Journey</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      The astronaut gazed at the distant stars, knowing that 
                      somewhere out there, an answer awaited...
                    </p>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-story-purple/10 text-story-purple rounded-full text-xs">space</span>
                      <span className="px-2 py-1 bg-story-purple/10 text-story-purple rounded-full text-xs">astronaut</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features section */}
      <section className="relative z-10 py-16 px-4 bg-muted/50">
        <div className="container max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Features that inspire creativity</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              StoryWeaver provides everything you need to transform your ideas into captivating stories
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Stories",
                description: "Transform simple keywords into detailed, creative narratives using our advanced AI engine"
              },
              {
                title: "Save & Organize",
                description: "Keep track of all your generated stories and organize them by favorites"
              },
              {
                title: "Continue Stories",
                description: "Extend your favorite stories with AI assistance to build complex narratives"
              }
            ].map((feature, i) => (
              <div 
                key={i} 
                className="glass rounded-xl p-6 backdrop-blur-md border border-white/20 dark:border-white/10 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="h-12 w-12 rounded-full bg-story-purple/10 flex items-center justify-center mb-4">
                  <span className="text-lg font-bold text-story-purple">{i + 1}</span>
                </div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to action */}
      <section className="relative z-10 py-16 px-4 bg-gradient-to-br from-story-purple/10 via-story-softpurple/10 to-story-softpeach/10">
        <div className="container max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to weave your story?</h2>
          <p className="text-muted-foreground">
            Join StoryWeaver today and start creating enchanting stories with just a few keywords
          </p>
          <Button 
            className="bg-story-purple hover:bg-story-darkpurple text-white px-8 py-6 text-lg"
            onClick={handleGetStarted}
          >
            Start Creating For Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="relative z-10 py-8 px-4 border-t border-border/20 backdrop-blur-md bg-background/80">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-story-purple" />
            <span className="font-medium">StoryWeaver</span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} StoryWeaver. All rights reserved.
          </div>
        </div>
      </footer>
      
      {/* CSS for 3D effects */}
      <style>
        {`
        .perspective-card {
          perspective: 1000px;
        }
        .story-card-3d {
          transform-style: preserve-3d;
          transform: rotateY(-5deg) rotateX(5deg);
        }
        `}
      </style>
    </div>
  );
};

export default HomePage;

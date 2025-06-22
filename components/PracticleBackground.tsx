'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full window size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      const numberOfParticles = Math.min(100, window.innerWidth * window.innerHeight / 15000);
      particlesRef.current = [];

      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 3 + 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const speedX = Math.random() * 0.5 - 0.25;
        const speedY = Math.random() * 0.5 - 0.25;
        
        // Use theme-aware colors
        const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        let color;
        if (isDarkMode) {
          // Lighter colors for dark mode
          const hue = Math.random() * 60 + 190; // Blues, purples
          const lightness = Math.random() * 30 + 60; // Brighter
          color = `hsla(${hue}, 70%, ${lightness}%, 0.5)`;
        } else {
          // Darker colors for light mode
          const hue = Math.random() * 60 + 190; // Blues, purples
          const lightness = Math.random() * 30 + 30; // Darker
          color = `hsla(${hue}, 70%, ${lightness}%, 0.3)`;
        }

        particlesRef.current.push({
          x,
          y,
          size,
          speedX,
          speedY,
          color
        });
      }
    };

    const connectParticles = () => {
      for (let a = 0; a < particlesRef.current.length; a++) {
        for (let b = a; b < particlesRef.current.length; b++) {
          const dx = particlesRef.current[a].x - particlesRef.current[b].x;
          const dy = particlesRef.current[a].y - particlesRef.current[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          const maxDistance = 150; // Maximum distance for drawing connection
          
          if (distance < maxDistance) {
            // Opacity based on distance
            const opacity = 1 - distance / maxDistance;
            
            const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            const strokeColor = isDarkMode 
              ? `rgba(100, 150, 230, ${opacity * 0.2})` 
              : `rgba(70, 100, 170, ${opacity * 0.1})`;
            
            ctx.beginPath();
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = 1;
            ctx.moveTo(particlesRef.current[a].x, particlesRef.current[a].y);
            ctx.lineTo(particlesRef.current[b].x, particlesRef.current[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update particles
      particlesRef.current.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX = -particle.speedX;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY = -particle.speedY;
        }
        
        // Mouse interaction
        if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
          const dx = particle.x - mouseRef.current.x;
          const dy = particle.y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          const maxDistance = 100; // Mouse influence radius
          
          if (distance < maxDistance) {
            const pushFactor = 0.4;
            const pushX = (dx / distance) * pushFactor;
            const pushY = (dy / distance) * pushFactor;
            
            particle.x += pushX;
            particle.y += pushY;
          }
        }
      });
      
      // Draw connections
      connectParticles();
      
      // Loop animation
      animationFrameRef.current = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: null, y: null };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    handleResize();
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-50"
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;
import React, { useState, useEffect } from 'react';

// Enhanced Water Background Component with performance toggle
const WaterBackground = () => {
  // State to track performance mode (true = lite mode, false = full effects)
  const [liteMode, setLiteMode] = useState(false);
  
  // Check if device is likely a mobile/low-power device on initial render
  useEffect(() => {
    // Simple detection for mobile devices
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    // Set lite mode by default on mobile
    if (isMobile) {
      setLiteMode(true);
    }
  }, []);

  return (
    <>
      {/* Performance Toggle Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setLiteMode(!liteMode)}
          className="px-3 py-2 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs font-medium 
            hover:bg-black/50 transition-all duration-300 flex items-center shadow-lg border border-white/10"
        >
          <span className={`inline-block w-3 h-3 rounded-full mr-2 ${liteMode ? 'bg-amber-400' : 'bg-cyan-400'}`}></span>
          {liteMode ? 'Performance Mode' : 'Full Effects'}
        </button>
      </div>

      {/* Background Container */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Base background - darker for both modes to ensure content contrast */}
        <div className={`absolute inset-0 transition-colors duration-500 ${
          liteMode 
            ? 'bg-gradient-to-br from-blue-900/90 via-indigo-900/95 to-purple-900/90' 
            : 'bg-gradient-to-br from-cyan-900/80 via-blue-900/70 to-indigo-900/80'
        }`}>
          {/* Additional gradient layer for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-cyan-500/10" />
        </div>

        {/* Smoky cloud effect - present in both modes but simpler in lite mode */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(liteMode ? 2 : 4)].map((_, index) => (
            <div
              key={`cloud-${index}`}
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                backgroundSize: `${200 + index * 100}px ${200 + index * 100}px`,
                animation: liteMode 
                  ? `smokyCloudsSlow ${80 + index * 40}s linear infinite` 
                  : `smokyClouds ${60 + index * 30}s linear infinite`,
                animationDelay: `-${index * 10}s`,
                transform: `translateZ(${index * 5}px) scale(${1 + index * 0.2})`,
                opacity: liteMode ? 0.07 - index * 0.01 : 0.1 - index * 0.015,
              }}
            />
          ))}
        </div>

        {/* Enhanced water effect - reduced in lite mode */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-blue-600/5">
          {/* Dot pattern - fewer in lite mode */}
          {[...Array(liteMode ? 1 : 4)].map((_, index) => (
            <div
              key={index}
              className="absolute inset-0"
              style={{
                animation: liteMode 
                  ? `water ${60 + index * 20}s linear infinite` // Slower in lite mode
                  : `water ${25 + index * 7}s linear infinite, levitate ${8 + index * 2}s ease-in-out infinite alternate`,
                animationDelay: `${-index * 5}s`,
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23FFFFFF' fill-opacity='${liteMode ? 0.15 : 0.3 - index * 0.05}' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                opacity: liteMode ? 0.35 : 0.95 - index * 0.15,
                transform: liteMode ? 'translateZ(0)' : `translateZ(${index * 10}px)`,
              }}
            />
          ))}
        </div>

        {/* Occasional glossy shine effect - present in both modes */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -inset-full"
            style={{
              background: `linear-gradient(
                45deg,
                transparent 0%,
                rgba(255, 255, 255, 0.03) 30%,
                rgba(255, 255, 255, ${liteMode ? '0.08' : '0.15'}) 45%,
                rgba(255, 255, 255, ${liteMode ? '0.03' : '0.07'}) 60%,
                transparent 100%
              )`,
              animation: `glossyShine ${liteMode ? '12s' : '8s'} linear infinite`,
              animationDelay: '-2s',
              width: '200%',
              height: '200%',
              willChange: 'transform', // Optimization for animation
            }}
          />
        </div>

        {/* Light ray emitting dots - reduced in lite mode, but still present */}
        {[...Array(liteMode ? 10 : 25)].map((_, index) => (
          <div
            key={`ray-${index}`}
            className="absolute rounded-full bg-cyan-300/40 blur-sm"
            style={{
              width: Math.random() * 6 + 3 + 'px',
              height: Math.random() * 6 + 3 + 'px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: liteMode 
                ? `simplePulse ${10 + Math.random() * 10}s ease-in-out infinite` // Simpler animation
                : `lightRay ${15 + Math.random() * 10}s linear infinite, levitate ${6 + Math.random() * 4}s ease-in-out infinite alternate`,
              animationDelay: `-${Math.random() * 10}s`,
              opacity: liteMode ? Math.random() * 0.3 + 0.15 : Math.random() * 0.5 + 0.3,
              boxShadow: liteMode 
                ? `0 0 ${Math.random() * 8 + 5}px ${Math.random() * 3 + 2}px rgba(34, 211, 238, 0.25)`
                : `0 0 ${Math.random() * 15 + 10}px ${Math.random() * 5 + 5}px rgba(34, 211, 238, 0.3)`,
            }}
          />
        ))}
        
        {/* Add occasional glowing lines that sweep across (subtle in lite mode) */}
        {[...Array(liteMode ? 1 : 3)].map((_, index) => (
          <div
            key={`glow-line-${index}`}
            className="absolute overflow-hidden"
            style={{
              top: `${15 + index * 30}%`,
              left: '-10%',
              width: '120%',
              height: '1px',
              background: `linear-gradient(
                90deg, 
                transparent 0%, 
                rgba(125, 211, 252, 0.1) 15%, 
                rgba(125, 211, 252, ${liteMode ? '0.2' : '0.4'}) 50%, 
                rgba(125, 211, 252, 0.1) 85%, 
                transparent 100%
              )`,
              boxShadow: `0 0 ${liteMode ? '8' : '15'}px ${liteMode ? '3' : '8'}px rgba(125, 211, 252, ${liteMode ? '0.3' : '0.5'})`,
              animation: `glowLineSweep ${liteMode ? '20' : '15'}s ease-in-out infinite`,
              animationDelay: `${index * 5}s`,
              opacity: liteMode ? 0.4 : 0.7,
              transform: 'rotate(5deg)',
            }}
          />
        ))}

        {/* Subtle vignette effect for both modes - helps with text contrast */}
        <div className="absolute inset-0 bg-radial-vignette opacity-70"></div>

        {/* CSS for animations */}
        <style>{`
          @keyframes water {
            0% { background-position: 0% 0%; }
            100% { background-position: 100% 100%; }
          }
          
          @keyframes simplePulse {
            0%, 100% { opacity: 0.1; box-shadow: 0 0 5px 2px rgba(34, 211, 238, 0.2); }
            50% { opacity: 0.4; box-shadow: 0 0 10px 4px rgba(34, 211, 238, 0.3); }
          }
          
          @keyframes smokyClouds {
            0% { transform: translate(0%, 0%) scale(1); }
            25% { transform: translate(-5%, 2%) scale(1.05); }
            50% { transform: translate(-2%, -3%) scale(1.1); }
            75% { transform: translate(4%, -1%) scale(1.05); }
            100% { transform: translate(0%, 0%) scale(1); }
          }
          
          @keyframes smokyCloudsSlow {
            0% { transform: translate(0%, 0%); }
            50% { transform: translate(-3%, 2%); }
            100% { transform: translate(0%, 0%); }
          }
          
          @keyframes glowLineSweep {
            0%, 100% { transform: translateX(-110%) rotate(5deg); }
            50% { transform: translateX(110%) rotate(5deg); }
          }
          
          @keyframes glossyShine {
            0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
            50% { transform: translate(50%, 50%) rotate(25deg); }
          }
          
          @keyframes shimmer {
            0% { transform: translateX(-100%) translateY(-100%); }
            100% { transform: translateX(100%) translateY(100%); }
          }
          
          @keyframes levitate {
            0% { transform: translateY(0) translateZ(0); }
            100% { transform: translateY(-20px) translateZ(20px); }
          }
          
          @keyframes lightRay {
            0% { 
              transform: scale(1) rotate(0deg);
              box-shadow: 0 0 10px 5px rgba(34, 211, 238, 0.3);
            }
            50% { 
              transform: scale(1.5) rotate(180deg);
              box-shadow: 0 0 20px 10px rgba(34, 211, 238, 0.4);
            }
            100% { 
              transform: scale(1) rotate(360deg);
              box-shadow: 0 0 10px 5px rgba(34, 211, 238, 0.3);
            }
          }
          
          .bg-radial-vignette {
            background: radial-gradient(
              ellipse at center,
              transparent 0%,
              transparent 50%,
              rgba(0, 0, 0, 0.4) 100%
            );
          }
        `}</style>
      </div>
    </>
  );
};

export default WaterBackground;
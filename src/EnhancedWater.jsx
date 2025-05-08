import React, { useState, useEffect } from 'react';

const EnhancedWater = () => {
  // State to track performance mode
  const [liteMode, setLiteMode] = useState(false);
  
  // Detect mobile devices on component mount
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      setLiteMode(true);
    }
  }, []);

  return (
    <>
      {/* Performance Toggle Button */}
      <div className="absolute bottom-4 right-4 z-50">
        <button
          onClick={() => setLiteMode(!liteMode)}
          className="px-3 py-2 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs font-medium 
            hover:bg-black/50 transition-all duration-300 flex items-center shadow-lg border border-white/10"
        >
          <span className={`inline-block w-3 h-3 rounded-full mr-2 ${liteMode ? 'bg-amber-400' : 'bg-cyan-400'}`}></span>
          {liteMode ? 'Performance Mode' : 'Full Effects'}
        </button>
      </div>

      <div className="relative h-64 w-full overflow-hidden">
        {/* Cosmic background gradient */}
        <div 
          className="absolute inset-0 transition-colors duration-500"
          style={{
            background: liteMode
              ? 'linear-gradient(to bottom, #0f172a, #1e3a8a, #312e81)'
              : 'linear-gradient(to bottom, #0f172a, #1e40af, #4338ca, #3b82f6)'
          }}
        />

        {/* Moon glow */}
        <div 
          className={`absolute ${liteMode ? 'opacity-60' : 'opacity-80'} transition-opacity duration-500`}
          style={{
            top: '-30%',
            right: '10%',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(148,163,184,0.6) 30%, rgba(148,163,184,0.1) 70%, transparent 100%)',
            boxShadow: liteMode 
              ? '0 0 40px 10px rgba(226,232,240,0.3)' 
              : '0 0 60px 20px rgba(226,232,240,0.5), 0 0 100px 40px rgba(226,232,240,0.2)',
          }}
        />

        {/* Star field - reduced in lite mode */}
        <div className="absolute inset-0">
          {[...Array(liteMode ? 20 : 50)].map((_, index) => (
            <div
              key={`star-${index}`}
              className={`absolute rounded-full bg-white ${liteMode ? '' : 'animate-twinkle'}`}
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 60}%`, // Keep stars in top portion
                opacity: Math.random() * 0.7 + 0.3,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 2 + 2}s`,
              }}
            />
          ))}
        </div>

        {/* Main rotating water layers - different colors, reduced in lite mode */}
        <div className="absolute inset-0">
          {[...Array(liteMode ? 2 : 4)].map((_, index) => (
            <div
              key={`water-${index}`}
              className={`absolute inset-0 ${
                liteMode 
                  ? 'animate-[waterSlow_15s_linear_infinite]' 
                  : 'animate-[water_8s_linear_infinite]'
              }`}
              style={{
                animationDelay: `${-index * (liteMode ? 4 : 2)}s`,
                bottom: `-${index * 3}%`,
                background: index === 0
                  ? `linear-gradient(
                      180deg,
                      transparent 0%,
                      rgba(79, 70, 229, 0.5) 75%,
                      rgba(79, 70, 229, 0.8) 100%
                    )`
                  : index === 1
                    ? `linear-gradient(
                        180deg,
                        transparent 0%,
                        rgba(59, 130, 246, 0.5) 75%,
                        rgba(59, 130, 246, 0.8) 100%
                      )`
                    : index === 2
                      ? `linear-gradient(
                          180deg,
                          transparent 0%,
                          rgba(14, 165, 233, 0.5) 75%,
                          rgba(14, 165, 233, 0.8) 100%
                        )`
                      : `linear-gradient(
                          180deg,
                          transparent 0%,
                          rgba(56, 189, 248, 0.5) 75%,
                          rgba(56, 189, 248, 0.8) 100%
                        )`,
                maskImage: `repeating-linear-gradient(
                  ${45 + index * 15}deg,
                  #000 0px,
                  #000 10px,
                  transparent 10px,
                  transparent 20px
                )`,
                opacity: liteMode ? 0.7 - index * 0.2 : 1 - index * 0.1,
              }}
            />
          ))}
        </div>

        {/* Rippling wave effect - subtle in lite mode */}
        {(!liteMode || (liteMode && Math.random() > 0.7)) && (
          <div className="absolute left-0 right-0 bottom-0 overflow-hidden">
            {[...Array(liteMode ? 2 : 3)].map((_, index) => (
              <div
                key={`wave-${index}`}
                className="absolute h-12 w-[200%] left-0"
                style={{
                  bottom: `${index * 8}px`,
                  background: `linear-gradient(
                    90deg, 
                    transparent 0%, 
                    rgba(255, 255, 255, ${0.1 - index * 0.02}) 50%, 
                    transparent 100%
                  )`,
                  borderRadius: '100%',
                  animation: liteMode 
                    ? `waveSlow ${15 + index * 5}s ease-in-out infinite` 
                    : `wave ${8 + index * 3}s ease-in-out infinite`,
                  animationDelay: `-${index * 2}s`,
                  transform: 'translateX(-25%)',
                  height: `${24 + index * 8}px`,
                }}
              />
            ))}
          </div>
        )}

        {/* Overlay for depth effect */}
        <div 
          className="absolute inset-0 bg-gradient-to-b transition-colors duration-500"
          style={{
            background: liteMode 
              ? 'linear-gradient(to bottom, transparent 50%, rgba(30, 58, 138, 0.2) 100%)' 
              : 'linear-gradient(to bottom, transparent 50%, rgba(37, 99, 235, 0.3) 100%)'
          }}
        />

        {/* Shimmering effect - reduced in lite mode */}
        <div className="absolute inset-0">
          {[...Array(liteMode ? 10 : 25)].map((_, index) => (
            <div
              key={`shimmer-${index}`}
              className={`absolute rounded-full blur-sm ${
                liteMode ? 'animate-[shimmerSlow_6s_linear_infinite]' : 'animate-[shimmer_4s_linear_infinite]'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${40 + Math.random() * 60}%`, // Keep shimmer in water portion
                animationDelay: `-${Math.random() * 4}s`,
                opacity: Math.random() * 0.5 + 0.3,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                background: index % 4 === 0 
                  ? 'rgba(255, 255, 255, 0.8)' 
                  : index % 4 === 1 
                    ? 'rgba(186, 230, 253, 0.8)' 
                    : index % 4 === 2 
                      ? 'rgba(147, 197, 253, 0.8)' 
                      : 'rgba(196, 181, 253, 0.8)',
                boxShadow: liteMode
                  ? `0 0 ${Math.random() * 3 + 2}px rgba(255, 255, 255, 0.6)`
                  : `0 0 ${Math.random() * 5 + 3}px rgba(255, 255, 255, 0.8)`,
              }}
            />
          ))}
        </div>

        {/* Celestial reflection on water - only in full mode */}
        {!liteMode && (
          <div className="absolute bottom-0 left-0 right-0 h-40 overflow-hidden">
            <div
              className="absolute w-full blur-sm"
              style={{
                top: '30%',
                height: '100%',
                background: 'radial-gradient(ellipse at 70% 0%, rgba(255,255,255,0.15) 0%, transparent 70%)',
                transform: 'scale(2, 0.5)',
                animation: 'reflectionPulse 10s ease-in-out infinite',
              }}
            />
          </div>
        )}

        {/* Low-opacity shooting stars - only in full mode */}
        {!liteMode && [...Array(2)].map((_, index) => (
          <div
            key={`shooting-star-${index}`}
            className="absolute h-px bg-white"
            style={{
              top: `${10 + Math.random() * 30}%`,
              left: '0%',
              width: `${30 + Math.random() * 50}px`,
              opacity: 0,
              transform: 'rotate(-30deg)',
              boxShadow: '0 0 8px 2px rgba(255, 255, 255, 0.7)',
              animation: `shootingStar ${15 + Math.random() * 10}s linear infinite`,
              animationDelay: `${index * 5 + Math.random() * 5}s`,
            }}
          />
        ))}

        {/* Occasional soft light rays - subtle in lite mode */}
        <div 
          className={`absolute inset-0 ${liteMode ? 'opacity-20' : 'opacity-40'}`}
          style={{
            background: 'radial-gradient(ellipse at 70% 0%, rgba(255,255,255,0.2) 0%, transparent 70%)',
          }}
        />

        {/* Vignette for better contrast with content */}
        <div className="absolute inset-0 bg-radial-vignette opacity-40"></div>

        {/* Custom animations */}
        <style jsx>{`
          @keyframes water {
            0% { transform: translateX(-10%) rotate(0deg); }
            100% { transform: translateX(10%) rotate(0.5deg); }
          }

          @keyframes waterSlow {
            0% { transform: translateX(-5%) rotate(0deg); }
            100% { transform: translateX(5%) rotate(0.25deg); }
          }

          @keyframes shimmer {
            0% { 
              transform: translateY(0%) scale(1); 
              opacity: 0.3;
            }
            50% { 
              transform: translateY(-150%) scale(1.5); 
              opacity: 0.7;
            }
            100% { 
              transform: translateY(-300%) scale(1); 
              opacity: 0;
            }
          }

          @keyframes shimmerSlow {
            0% { 
              transform: translateY(0%); 
              opacity: 0.2;
            }
            100% { 
              transform: translateY(-200%); 
              opacity: 0;
            }
          }

          @keyframes wave {
            0%, 100% { transform: translateX(-25%) scale(1, 1); }
            50% { transform: translateX(-35%) scale(1.2, 0.8); }
          }

          @keyframes waveSlow {
            0%, 100% { transform: translateX(-25%) scale(1, 1); }
            50% { transform: translateX(-30%) scale(1.1, 0.9); }
          }

          @keyframes reflectionPulse {
            0%, 100% { opacity: 0.15; transform: scale(2, 0.5) translateX(0%); }
            50% { opacity: 0.25; transform: scale(2.2, 0.45) translateX(2%); }
          }

          @keyframes shootingStar {
            0% { 
              transform: translateX(-100px) rotate(-30deg); 
              opacity: 0;
            }
            1% { 
              transform: translateX(0px) rotate(-30deg); 
              opacity: 0.7;
            }
            5% { 
              transform: translateX(200px) rotate(-30deg); 
              opacity: 0;
            }
            100% { 
              transform: translateX(200px) rotate(-30deg); 
              opacity: 0;
            }
          }

          @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.8; }
          }

          .bg-radial-vignette {
            background: radial-gradient(
              ellipse at center,
              transparent 0%,
              transparent 50%,
              rgba(0, 0, 0, 0.3) 100%
            );
          }
        `}</style>
      </div>
    </>
  );
};

export default EnhancedWater;
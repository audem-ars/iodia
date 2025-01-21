import React from 'react';

const EnhancedWater = () => {
  return (
    <div className="relative h-64 w-full overflow-hidden bg-blue-900">
      {/* Main rotating water layer */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="absolute inset-0 animate-[water_8s_linear_infinite]"
            style={{
              animationDelay: `${-index * 2}s`,
              background: `linear-gradient(
                180deg,
                transparent 0%,
                rgba(59, 130, 246, 0.5) 75%,
                rgba(59, 130, 246, 0.8) 100%
              )`,
              maskImage: `repeating-linear-gradient(
                45deg,
                #000 0px,
                #000 10px,
                transparent 10px,
                transparent 20px
              )`
            }}
          />
        ))}
      </div>

      {/* Overlay for depth effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-600/30" />

      {/* Shimmering effect */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, index) => (
          <div
            key={`shimmer-${index}`}
            className="absolute h-1 w-1 rounded-full bg-white/40 blur-sm animate-[water_4s_linear_infinite]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `-${Math.random() * 4}s`,
              opacity: Math.random() * 0.5 + 0.5
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default EnhancedWater;
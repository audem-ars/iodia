import React from 'react';
import CoreElementsCalculator from './CoreElementsCalculator';
import WaterBackground from './WaterBackground';
import { Link } from 'react-router-dom';

const YourNumberPage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-transparent">
      <WaterBackground />
      <div className="relative z-10 bg-transparent">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 
                bg-clip-text text-transparent bg-animate-gradient">Discover Your Numerology</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-6">
              Calculate and interpret your core numerology elements based on ancient principles
            </p>
            
            {/* Navigation buttons */}
            <div className="flex justify-center space-x-4 mb-8">
              <Link 
                to="/" 
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 
                  text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 
                  hover:scale-105 backdrop-blur-sm"
              >
                ← Home
              </Link>
              
              <Link 
                to="/compatibility" 
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 
                  text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 
                  hover:scale-105 backdrop-blur-sm"
              >
                Compatibility Analysis →
              </Link>
            </div>
          </div>
          
          <CoreElementsCalculator />
        </div>
      </div>
      
      {/* Animation styles */}
      <style>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .bg-animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default YourNumberPage;
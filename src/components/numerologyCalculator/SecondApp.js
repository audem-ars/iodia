// SecondApp.js
import React from 'react';
import { Link } from 'react-router-dom';
import NumerologyCalculator from '.';

const WaterBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/30 via-cyan-800/20 to-transparent">
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-cyan-500/5" />
    </div>

    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-blue-600/10">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="absolute inset-0"
          style={{
            animation: `water ${25 + index * 7}s linear infinite, levitate ${8 + index * 2}s ease-in-out infinite alternate`,
            animationDelay: `${-index * 5}s`,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5z' fill='%230EA5E9' fill-opacity='${0.3 - index * 0.05}' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            opacity: 0.95 - index * 0.15,
            transform: `translateZ(${index * 10}px)`,
          }}
        />
      ))}
    </div>

    <style jsx>{`
      @keyframes water {
        0% { background-position: 0% 0%; }
        100% { background-position: 100% 100%; }
      }
      
      @keyframes levitate {
        0% { transform: translateY(0) translateZ(0); }
        100% { transform: translateY(-20px) translateZ(20px); }
      }
    `}</style>
  </div>
);

const AnimatedTitle = () => (
  <div className="relative mb-6">
    <h1 className="font-['Audiowide'] text-8xl font-bold relative z-10 animate-pulse-slow">
      <span className="relative bg-gradient-to-r from-purple-900 via-purple-600 to-pink-500 
        bg-clip-text text-transparent bg-animate-fire drop-shadow-lg 
        hover:scale-105 transition-transform duration-300">
        Numerology
      </span>
    </h1>
    <style jsx>{`
      .bg-animate-fire {
        background-size: 200% 200%;
        animation: fireGradient 8s ease infinite;
      }

      @keyframes fireGradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      .animate-pulse-slow {
        animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }

      @keyframes pulse-slow {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.8; }
      }
    `}</style>
  </div>
);

const SecondApp = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-transparent">
      <WaterBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        <nav className="mb-8">
          <Link 
            to="/" 
            className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
          >
            ← Back to Main Page
          </Link>
        </nav>

        <div className="text-center mb-16">
          <AnimatedTitle />
          <p className="text-gray-600 max-w-2xl mx-auto text-lg mt-6 mb-12">
            Discover the numerological value of words and explore words by their numerical significance.
          </p>
        </div>

        <NumerologyCalculator />

        <footer className="text-center text-gray-500 text-sm border-t border-gray-200/20 pt-8 mt-16">
          <p>© 2025 Numerology Explorer. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default SecondApp;
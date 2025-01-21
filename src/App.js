import React, { useState } from 'react';
import CountrySelector from './components/CountrySelector';
import CarBrandSelector from './components/CarBrandSelector';
import StateSelector from './components/StateSelector';
import CitySelector from './components/CitySelector';
import ClothingBrandSelector from './components/ClothingBrandSelector';
import ElectricBrandSelector from './components/ElectricBrandSelector';
import ArtistSelector from './components/ArtistSelector'

// Animated Water Background Component
const WaterBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base water color */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-blue-600/10">
          {/* 3D Dot pattern with blue tones */}
          {[...Array(3)].map((_, index) => (
              <div
                  key={index}
                  className="absolute inset-0"
                  style={{
                      animation: `water ${20 + index * 5}s linear infinite`,
                      animationDelay: `${-index * 7}s`,
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%230EA5E9' fill-opacity='${0.2 - index * 0.05}' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                      opacity: 0.9 - index * 0.2,
                  }}
              />
          ))}
      </div>

      {/* Shimmering dots */}
      {[...Array(20)].map((_, index) => (
          <div
              key={`shimmer-${index}`}
              className="absolute rounded-full bg-blue-400/30 blur-sm"
              style={{
                  width: Math.random() * 4 + 2 + 'px',
                  height: Math.random() * 4 + 2 + 'px',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `water ${10 + Math.random() * 5}s linear infinite`,
                  animationDelay: `-${Math.random() * 5}s`,
                  opacity: Math.random() * 0.4 + 0.2
              }}
          />
      ))}

      {/* Light reflection overlay */}
      <div className="absolute inset-0">
          <div
              className="absolute inset-0"
              style={{
                  background: `linear-gradient(
                      45deg,
                      transparent 0%,
                      rgba(255, 255, 255, 0.05) 45%,
                      rgba(255, 255, 255, 0.1) 50%,
                      rgba(255, 255, 255, 0.05) 55%,
                      transparent 100%
                  )`,
                  animation: 'shimmer 10s linear infinite'
              }}
          />
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent"></div>
  </div>
);

// Zodiac signs data with their respective icons
const zodiacSigns = [
    { name: 'Rat', symbol: '🐀', color: 'from-gray-600 to-gray-400' },
    { name: 'Ox', symbol: '🐂', color: 'from-brown-600 to-brown-400' },
    { name: 'Tiger', symbol: '🐅', color: 'from-orange-600 to-orange-400' },
    { name: 'Rabbit', symbol: '🐇', color: 'from-pink-600 to-pink-400' },
    { name: 'Dragon', symbol: '🐉', color: 'from-red-600 to-red-400' },
    { name: 'Snake', symbol: '🐍', color: 'from-green-600 to-green-400' },
    { name: 'Horse', symbol: '🐎', color: 'from-amber-600 to-amber-400' },
    { name: 'Goat', symbol: '🐐', color: 'from-emerald-600 to-emerald-400' },
    { name: 'Monkey', symbol: '🐒', color: 'from-purple-600 to-purple-400' },
    { name: 'Rooster', symbol: '🐓', color: 'from-red-600 to-orange-400' },
    { name: 'Dog', symbol: '🐕', color: 'from-yellow-600 to-yellow-400' },
    { name: 'Pig', symbol: '🐖', color: 'from-pink-600 to-rose-400' }
];

// Zodiac Circle Component
const ZodiacCircle = () => (
    <div className="relative w-96 h-96 mx-auto mb-12">
        {zodiacSigns.map((sign, index) => {
            const angle = (index * 30 - 90) * (Math.PI / 180);
            const x = Math.cos(angle) * 150 + 192;
            const y = Math.sin(angle) * 150 + 192;

            return (
                <div
                    key={sign.name}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm 
            rounded-full w-20 h-20 flex items-center justify-center shadow-lg hover:scale-110 
            transition-all duration-300 cursor-pointer group hover:shadow-2xl"
                    style={{ left: x, top: y }}
                >
                    <div className="text-center">
                        <div className="text-3xl transform transition-transform duration-300 group-hover:scale-110">
                            {sign.symbol}
                        </div>
                        <div className="text-xs font-semibold opacity-0 group-hover:opacity-100 
              transition-opacity duration-300 absolute top-full left-1/2 transform -translate-x-1/2 
              whitespace-nowrap bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                            {sign.name}
                        </div>
                    </div>
                </div>
            );
        })}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 
      rounded-full transform scale-95 animate-pulse"></div>
    </div>
);


const CollapsibleCard = ({ title, description, icon, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl"
        >
            <div
                className="flex items-center justify-between px-6 py-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center">
                    <span className="mr-3 text-2xl">{icon}</span>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                        <p className="text-gray-500 text-sm">{description}</p>
                    </div>
                </div>
                <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
            {isOpen && (
                <div className="px-6 py-4 border-t border-gray-200">
                    {children}
                </div>
            )}
        </div>
    );
};


const App = () => {
    const selectors = [
        {
            title: 'Country Selector',
            description: 'Select a country from the dropdown.',
            icon: '🌍',
            component: <CountrySelector />,
        },
        {
            title: 'Car Brand Selector',
            description: 'Choose your favorite car brand.',
            icon: '🚗',
            component: <CarBrandSelector />,
        },
        {
            title: 'State Selector',
            description: 'Select a state from the list.',
            icon: '🗺️',
            component: <StateSelector />,
        },
        {
            title: 'City Selector',
            description: 'Find your city from the provided options.',
            icon: '🏙️',
            component: <CitySelector />,
        },
        {
            title: 'Clothing Brand Selector',
            description: 'Browse our clothing brand selection.',
            icon: '👕',
            component: <ClothingBrandSelector />,
        },
        {
            title: 'Electric Brand Selector',
            description: 'Explore different electric product brands.',
            icon: '⚡',
            component: <ElectricBrandSelector />,
        },
        {
            title: 'Artist Selector',
            description: 'Explore different musical artists and groups.',
            icon: '🎵',
            component: <ArtistSelector />,
        },
    ];

    return (
        <div className="min-h-screen relative overflow-hidden">
            <WaterBackground />
            <div className="relative z-10">
                <div className="container mx-auto px-4 py-12">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="font-['Audiowide'] text-8xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 
            bg-clip-text text-transparent drop-shadow-lg transform hover:scale-105 transition-transform duration-300">
                            Iodia
                        </h1>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-12">
                            Explore our comprehensive selection of filters for countries, cities, brands, and more.
                            Click on any card to expand and view its content.
                        </p>

                        {/* Zodiac Circle */}
                        <ZodiacCircle />
                    </div>

                    {/* Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {selectors.map((selector, index) => (
                            <div
                                key={index}
                                className={index === selectors.length - 1 ? "md:col-span-2 lg:col-span-3" : ""}
                            >
                                <CollapsibleCard
                                    title={selector.title}
                                    description={selector.description}
                                    icon={selector.icon}
                                >
                                    {selector.component}
                                </CollapsibleCard>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="mt-16 text-center text-gray-500 text-sm border-t border-gray-200 pt-8">
                        <p>© 2025 Iodia. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
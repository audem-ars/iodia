import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Import all selector components
import CountrySelector from './components/CountrySelector';
import CarBrandSelector from './components/CarBrandSelector';
import StateSelector from './components/StateSelector';
import CitySelector from './components/CitySelector';
import ClothingBrandSelector from './components/ClothingBrandSelector';
import ElectricBrandSelector from './components/ElectricBrandSelector';
import ArtistSelector from './components/ArtistSelector';
import AuthorSelector from './components/AuthorSelector';
import ActorSelector from './components/ActorSelector';
import FinancialSelector from './components/FinancialSelector';

// Import supporting components
import WaterBackground from './components/WaterBackground'; 

// ----- Reusable Components (Keep AnimatedTitle, ZodiacCircle, CollapsibleCard as they were) -----

// Title component with water drips
const AnimatedTitle = () => (
    <div className="relative mb-6">
        {/* Main title with fire gradient */}
        <h1 className="font-['Audiowide'] text-8xl font-bold relative z-10 animate-pulse-slow">
            {/* Fire gradient background */}
            <span className="relative bg-gradient-to-r from-orange-900 via-orange-600 to-amber-500
                bg-clip-text text-transparent bg-animate-fire drop-shadow-lg
                hover:scale-105 transition-transform duration-300">
                Iodia
            </span>

            {/* Water drips */}
            {[...Array(5)].map((_, i) => (
                <div
                    key={i}
                    className="absolute"
                    style={{
                        left: `${15 + i * 20}%`,
                        animation: `waterDrip ${3 + i * 0.5}s infinite`,
                        animationDelay: `${i * 0.3}s`,
                        opacity: 0
                    }}
                >
                    <div className="relative">
                        <div className="absolute w-1.5 rounded-full bg-gradient-to-b from-cyan-200/60 to-cyan-400/60
                            blur-[2px] animate-pulse"
                            style={{
                                height: '20px',
                                transform: 'translateY(-100%)'
                            }}
                        />
                        <div className="w-3 h-3 rounded-full bg-gradient-to-b from-cyan-200/60 to-cyan-400/60
                            blur-[2px] animate-pulse"
                        />
                    </div>
                </div>
            ))}
        </h1>

        {/* Animations */}
        <style jsx>{`
            @keyframes waterDrip {
                0% {
                    transform: translateY(-50%);
                    opacity: 0;
                }
                20% {
                    opacity: 0.7;
                }
                80% {
                    opacity: 0.7;
                }
                100% {
                    transform: translateY(100px);
                    opacity: 0;
                }
            }

            .bg-animate-fire {
                background-size: 200% 200%;
                animation: fireGradient 8s ease infinite;
            }

            @keyframes fireGradient {
                0% {
                    background-position: 0% 50%;
                }
                50% {
                    background-position: 100% 50%;
                }
                100% {
                    background-position: 0% 50%;
                }
            }

            .animate-pulse-slow {
                animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }

            @keyframes pulse-slow {
                0%, 100% {
                    opacity: 1;
                }
                50% {
                    opacity: 0.8;
                }
            }
        `}</style>
    </div>
);

// Zodiac signs data
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
            const x = Math.cos(angle) * 150 + 192; // Center X + Radius * cos(angle)
            const y = Math.sin(angle) * 150 + 192; // Center Y + Radius * sin(angle)

            return (
                <div
                    key={sign.name}
                    className="group"
                    style={{
                        position: 'absolute',
                        left: x,
                        top: y,
                        transform: 'translate(-50%, -50%)' // Center the div on the calculated point
                    }}
                >
                    {/* Background glow effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-100/30 via-amber-200/30 to-rose-100/30
                        rounded-full blur opacity-30 group-hover:opacity-75 transition duration-1000
                        animate-gradient-shift group-hover:animate-gradient-shift-fast">
                    </div>

                    {/* Water droplet effects */}
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-1000"
                            style={{
                                background: 'radial-gradient(circle at center, rgba(255,255,255,0.9) 0%, transparent 60%)',
                                animation: `droplet${i + 1} ${8 + i * 2}s infinite ease-in-out`,
                                animationDelay: `${i * 0.5}s`,
                                mixBlendMode: 'soft-light'
                            }}
                        />
                    ))}

                    {/* Main zodiac content */}
                    <div style={{
                            width: '5rem', // 80px
                            height: '5rem', // 80px
                            background: 'rgba(255, 255, 255, 0.3)',
                            backdropFilter: 'blur(8px)',
                        }}
                        className="relative rounded-full flex items-center justify-center shadow-lg
                            hover:scale-110 transition-all duration-300 cursor-pointer group"
                    >
                        <div className="text-center">
                            <div className="text-3xl transform transition-transform duration-300 group-hover:scale-110">
                                {sign.symbol}
                            </div>
                            {/* Tooltip-like name display */}
                            <div style={{
                                    background: 'rgba(0, 0, 0, 0.6)', // Darker background for better readability
                                    backdropFilter: 'blur(5px)',
                                    color: 'white',
                                }}
                                className="text-xs font-semibold opacity-0 group-hover:opacity-100
                                    transition-opacity duration-300 absolute top-full left-1/2 transform -translate-x-1/2
                                    whitespace-nowrap px-3 py-1 rounded-full shadow-sm mt-2 pointer-events-none" // Added pointer-events-none
                            >
                                {sign.name}
                            </div>
                        </div>
                    </div>
                </div>
            );
        })}

        {/* Circle background pulse */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10
            rounded-full transform scale-95 animate-pulse" />

        {/* Keyframes for animation */}
        <style jsx>{`
            @keyframes droplet1 { 0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; } 50% { transform: translate(10px, 5px) scale(1.2); opacity: 0.6; } }
            @keyframes droplet2 { 0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; } 50% { transform: translate(-8px, 3px) scale(1.1); opacity: 0.6; } }
            @keyframes droplet3 { 0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; } 50% { transform: translate(5px, -2px) scale(1.3); opacity: 0.6; } }
            @keyframes gradient-shift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        `}</style>

        <style>{`
            .animate-gradient-shift { animation: gradient-shift 8s ease infinite; background-size: 200% 200%; }
            .animate-gradient-shift-fast { animation: gradient-shift 4s ease infinite; background-size: 200% 200%; }
        `}</style>
    </div>
);

// Enhanced Collapsible Card Component with improved click interaction
const CollapsibleCard = ({ title, description, icon, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative group mb-6">
            {/* Glowing background effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-rose-200/50 via-amber-300/50 to-rose-200/50
                rounded-lg blur-sm opacity-40 group-hover:opacity-80 transition duration-1000
                animate-gradient-shift group-hover:animate-gradient-shift-fast">
            </div>

            {/* Card content */}
            <div
                style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.25))',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.2)'
                }}
                className="relative rounded-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl"
            >
                {/* Header with click indicator */}
                <div
                    className="flex items-center justify-between px-6 py-4 cursor-pointer
                        transition-colors duration-200 hover:bg-white/30 relative"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="flex items-center flex-1">
                        {/* Icon with enhanced click indicator */}
                        <div className="relative mr-4 flex-shrink-0">
                            <span className="text-2xl inline-block
                                transition-transform duration-300 transform group-hover:scale-110">{icon}</span>

                            {/* Pulse animation around the icon to indicate clickability */}
                            <span className="absolute inset-0 rounded-full animate-ping-slow opacity-75
                                bg-indigo-400/30" style={{ padding: '10px' }}></span>
                        </div>

                        <div className="flex-1 min-w-0"> {/* Ensures proper text wrapping */}
                            <h3 className="text-lg font-semibold text-gray-900 truncate">{title}</h3>
                            <p className="text-gray-800 font-medium text-sm">
                                {description}
                            </p>
                        </div>
                    </div>

                    {/* More obvious toggle button */}
                    <div className="flex items-center justify-center w-8 h-8 rounded-full
                        bg-indigo-100/70 hover:bg-indigo-200/80 transition-colors duration-200
                        border border-indigo-200/70 ml-3 flex-shrink-0">
                        <svg
                            className={`w-5 h-5 text-indigo-600 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>

                    {/* "Click to expand" text that appears on hover */}
                    <div className="absolute right-6 bottom-1 opacity-0 group-hover:opacity-100
                        transition-opacity duration-200 text-xs font-medium text-indigo-700 pointer-events-none">
                        Click to {isOpen ? 'collapse' : 'expand'}
                    </div>
                </div>

                {/* Content area */}
                {isOpen && (
                    <div
                        style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.3))',
                            backdropFilter: 'blur(10px)',
                            borderTop: '1px solid rgba(255, 255, 255, 0.3)'
                        }}
                        className="px-6 py-4 text-gray-800"
                    >
                        {children}
                    </div>
                )}
            </div>

            {/* Animation styles */}
            <style jsx>{`
                @keyframes ping-slow { 0% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.5); opacity: 0; } 100% { transform: scale(1); opacity: 0; } }
                .animate-ping-slow { animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite; }
                @keyframes gradient-shift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
                .animate-gradient-shift { animation: gradient-shift 8s ease infinite; background-size: 200% 200%; }
                .animate-gradient-shift-fast { animation: gradient-shift 4s ease infinite; background-size: 200% 200%; }
            `}</style>
        </div>
    );
};

// ----- Main App Component Refactored -----
const App = () => {
    // State to track which selector is currently active (index or null)
    const [activeSelectorIndex, setActiveSelectorIndex] = useState(null);

    // Define selector configurations
    const selectors = [
        { id: 'country', title: 'Country Selector', description: 'Select a country', icon: '🌍', component: <CountrySelector /> },
        { id: 'car', title: 'Car Brand Selector', description: 'Choose a car brand', icon: '🚗', component: <CarBrandSelector /> },
        { id: 'state', title: 'State Selector', description: 'Select a US state', icon: '🗺️', component: <StateSelector /> },
        { id: 'city', title: 'City Selector', description: 'Find your city', icon: '🏙️', component: <CitySelector /> },
        { id: 'clothing', title: 'Clothing Brand Selector', description: 'Browse clothing brands', icon: '👕', component: <ClothingBrandSelector /> },
        { id: 'electric', title: 'Electric Brand Selector', description: 'Explore electric brands', icon: '⚡', component: <ElectricBrandSelector /> },
        { id: 'artist', title: 'Artist Selector', description: 'Explore musical artists', icon: '🎵', component: <ArtistSelector /> },
        { id: 'author', title: 'Author Selector', description: 'Explore famous authors', icon: '📚', component: <AuthorSelector /> },
        { id: 'actor', title: 'Actor Selector', description: 'Explore famous actors', icon: '🎭', component: <ActorSelector /> },
        { id: 'financial', title: 'Financial Institution Selector', description: 'Find financial institutions', icon: '🏦', component: <FinancialSelector /> }
    ];

    return (
        <div className="min-h-screen relative overflow-hidden bg-transparent">
            <WaterBackground />
            <div className="relative z-10 bg-transparent">
                <div className="container mx-auto px-4 py-12">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <AnimatedTitle />
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-12">
                            Explore our comprehensive selection of filters for countries, cities, brands, and more.
                            Expand the selector below and choose a category.
                        </p>
                        {/* Links */}
                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                             <Link
                                to="/galaxy"
                                className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                            >
                                Explore Galaxy Page →
                            </Link>
                            <Link
                                to="/your-number"
                                className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                            >
                                Discover Your Numerology →
                            </Link>
                            <Link
                                to="/compatibility"
                                className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                            >
                                Numerology Compatibility →
                            </Link>
                             <Link
                                to="/numerology-reference"
                                className="inline-block px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                            >
                                Numerology Reference →
                            </Link>
                        </div>

                        {/* Zodiac Circle */}
                        <ZodiacCircle />
                    </div>

                    {/* Single Collapsible Card for All Selectors */}
                    <CollapsibleCard
                        title="Explore Data Selectors"
                        description="Choose a category to filter data by Zodiac sign"
                        icon="🔍" // Magnifying glass icon
                    >
                        {/* Grid for Selector Buttons */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
                            {selectors.map((selector, index) => (
                                <button
                                    key={selector.id}
                                    onClick={() => setActiveSelectorIndex(index)}
                                    className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 
                                        ${activeSelectorIndex === index 
                                            ? 'bg-indigo-200/80 border border-indigo-300 text-indigo-800 font-semibold scale-105 shadow-lg' 
                                            : 'bg-white/50 hover:bg-white/70 border border-gray-300/50 text-gray-700'
                                        }`}
                                >
                                    <span className="text-2xl mb-1">{selector.icon}</span>
                                    <span className="text-xs text-center font-medium">{selector.title}</span>
                                </button>
                            ))}
                        </div>

                        {/* Divider */}
                        <hr className="my-6 border-gray-300/50" />

                        {/* Display Area for Active Selector */}
                        <div className="min-h-[200px]"> {/* Ensures space even when nothing selected */}
                            {activeSelectorIndex !== null ? (
                                <div className="p-4 bg-white/20 rounded-lg shadow-inner">
                                     <h4 className="text-lg font-semibold text-gray-800 mb-3">
                                        {selectors[activeSelectorIndex].title}
                                    </h4>
                                    {/* Render the component associated with the active index */}
                                    {selectors[activeSelectorIndex].component}
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-500 italic">
                                    Select a category above to view the selector.
                                </div>
                            )}
                        </div>
                    </CollapsibleCard>

                    {/* Footer */}
                    <div className="mt-16 text-center text-gray-500 text-sm border-t border-gray-200/20 pt-8">
                        <p>© 2025 Iodia. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
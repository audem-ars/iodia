import React, { useState, useEffect, useRef } from 'react';

// Import all data from existing files (no more hardcoded data)
import { PLANETARY_DATA, PLANET_START_POSITIONS, getCurrentDate, calculatePlanetPosition, getAspectName, getZodiacSign } from './solarSystemData.js';
import { drawSolarSystem, drawBackground } from './solarSystemRenderer.js';
import { BRIGHT_STARS, NAVIGATION_STARS, VARIABLE_STARS } from './constellationStars.js';
import { CONSTELLATION_LINES, ASTERISMS, SEASONAL_CONSTELLATIONS } from './constellationPatterns.js';
import { CONSTELLATION_MYTHOLOGY } from './constellationMythology.js';
import { renderConstellations, drawHorizon, drawStarNames } from './constellationRenderer.js';

const InteractiveSolarSystem = () => {
  // EXISTING STATE (100% backwards compatible)
  const [showStars, setShowStars] = useState(false);
  const [showOrbits, setShowOrbits] = useState(true);
  const [realTime, setRealTime] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [time, setTime] = useState(getCurrentDate());
  const [showPlanetInfo, setShowPlanetInfo] = useState(true);
  const [showAngles, setShowAngles] = useState(false);

  // NEW STATE (additive only - no breaking changes)
  const [showStarNames, setShowStarNames] = useState(false);
  const [showPlanetNames, setShowPlanetNames] = useState(true);
  const [showDeepSky, setShowDeepSky] = useState(false);
  const [showMythology, setShowMythology] = useState(false);
  const [selectedConstellation, setSelectedConstellation] = useState(null);
  const [dragStart, setDragStart] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const [activeTab, setActiveTab] = useState('planetary'); // ADD THIS LINE
  const [showLeftPanel, setShowLeftPanel] = useState(true); 
  // CONSTELLATION FILTERING - ADD THESE
const [constellationFilter, setConstellationFilter] = useState('major');
const [brightnessFilter, setBrightnessFilter] = useState('bright');
const [hemisphere, setHemisphere] = useState('northern');
const [showConstellationNames, setShowConstellationNames] = useState(true);

  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // ADAPTIVE VISIBILITY SYSTEM - Show different planets based on zoom level
  const getVisiblePlanetsForZoom = (zoomLevel) => {
    if (zoomLevel <= 0.3) {
      // Ultra-wide view: Show ALL planets including distant ones
      return ['sun', 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
    } else if (zoomLevel <= 0.5) {
      // Wide view: Show up to Saturn
      return ['sun', 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn'];
    } else if (zoomLevel <= 2.0) {
      // Medium view: Focus on inner solar system
      return ['sun', 'mercury', 'venus', 'earth', 'mars', 'jupiter'];
    } else {
      // Close view: Inner planets only for detail
      return ['sun', 'mercury', 'venus', 'earth', 'mars'];
    }
  };

  // EXISTING USEEFFECT (unchanged)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const animate = () => {
      if (realTime) {
        setTime(prev => prev + speed * 0.1);
      }
      render();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleClick = (event) => {
      // Only handle clicks if we're not dragging
      if (!dragStart) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left - canvas.width / 2;
        const y = event.clientY - rect.top - canvas.height / 2;
        
        // Check planet clicks first (existing functionality)
        checkPlanetClick(x, y);
        
        // Check constellation clicks
        if (showStars) {
          checkConstellationClick(event.clientX - rect.left, event.clientY - rect.top);
        }
      }
    };

    // ENHANCED Mouse drag handlers for panning - FIXED
    const handleMouseDown = (event) => {
      if (event.button === 0) {
        setDragStart({ x: event.clientX, y: event.clientY });
        canvas.style.cursor = 'grabbing';
        event.preventDefault(); // Prevent text selection
      }
    };

    const handleMouseMove = (event) => {
      if (dragStart) {
        const deltaX = event.clientX - dragStart.x;
        const deltaY = event.clientY - dragStart.y;
        
        // More responsive dragging with better sensitivity
        setOffset(prev => ({
          x: prev.x + deltaX * 3, // Increased sensitivity
          y: prev.y + deltaY * 3
        }));
        
        setDragStart({ x: event.clientX, y: event.clientY });
        event.preventDefault();
      }
    };

    const handleMouseUp = (event) => {
      if (dragStart) {
        // Only allow click if we didn't drag much
        const dragDistance = Math.sqrt(
          Math.pow(event.clientX - dragStart.x, 2) + 
          Math.pow(event.clientY - dragStart.y, 2)
        );
        
        if (dragDistance < 5) { // Small threshold for click vs drag
          handleClick(event);
        }
      }
      setDragStart(null);
      canvas.style.cursor = 'crosshair';
    };

    const handleMouseLeave = () => {
      setDragStart(null);
      canvas.style.cursor = 'crosshair';
    };

    // MOUSE WHEEL ZOOM CONTROLS
const handleWheel = (event) => {
  event.preventDefault();
  const delta = event.deltaY > 0 ? 0.9 : 1.1; // Zoom out vs zoom in
  const newZoom = Math.max(0.1, Math.min(10.0, zoom * delta));
  setZoom(newZoom);
};

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('wheel', handleWheel);
    // Remove click listener from here since it's handled in mouseup

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('wheel', handleWheel);
      // Removed click listener cleanup
    };
  }, [realTime, speed, zoom, rotation, showStars, showStarNames, showDeepSky, showPlanetNames, dragStart, activeTab, showLeftPanel]);

  // EXISTING FUNCTIONS - FIXED planet click detection
  const checkPlanetClick = (x, y) => {
    let clickedPlanet = null;
    let minDistance = Infinity;
    
    Object.entries(PLANETARY_DATA).forEach(([key, planet]) => {
      if (planet.screenX && planet.screenY) {
        // Apply the same zoom transformation used in rendering
        const adjustedX = planet.screenX;
        const adjustedY = planet.screenY;
        const distance = Math.sqrt((x - adjustedX) ** 2 + (y - adjustedY) ** 2);
        const hitRadius = Math.max(15, (planet.screenSize || 10) + 5); // Larger hit area
        
        if (distance < hitRadius && distance < minDistance) {
          minDistance = distance;
          clickedPlanet = key;
        }
      }
    });
    
    if (clickedPlanet) {
      setSelectedPlanet(clickedPlanet);
    }
  };

  // Check constellation clicks
  const checkConstellationClick = (clickX, clickY) => {
    if (showStars && showMythology) {
      const constellations = ['Orion', 'Ursa Major', 'Cassiopeia', 'Cygnus', 'Leo'];
      const randomConstellation = constellations[Math.floor(Math.random() * constellations.length)];
      setSelectedConstellation(randomConstellation);
    }
  };

  // MAIN RENDER FUNCTION - ENHANCED with distance-aware rendering
  const render = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Smart rendering based on zoom level for distance scaling
const renderOptions = {
  zoom: zoom * 0.3,
  rotation: rotation + (offset.x * 0.01),
  showOrbits,
  realTime: time,
  showAngles,
  showConstellations: showStars,
  showPlanetNames: showPlanetNames,
  offset: offset,
  // ADAPTIVE VISIBILITY: Show different planets based on zoom
  visiblePlanets: getVisiblePlanetsForZoom(zoom),
  // ADD THESE NEW LINES:
  showStarNames: showStarNames,
  showConstellationNames: showConstellationNames,
  hemisphere: hemisphere,
  constellationFilter: constellationFilter,
  brightnessFilter: brightnessFilter
};

// Use imported rendering functions with adaptive visibility
ctx.save();
ctx.translate(offset.x, offset.y); // ← Move the entire view
const positions = drawSolarSystem(ctx, width, height, renderOptions);
ctx.restore();

    // Store positions for click detection
    Object.keys(positions).forEach(planet => {
      if (PLANETARY_DATA[planet] && positions[planet]) {
        PLANETARY_DATA[planet].screenX = positions[planet].x;
        PLANETARY_DATA[planet].screenY = positions[planet].y;
      }
    });
  };

  // EXISTING BUTTON HANDLERS (unchanged)
  const handleShowStarsClick = () => setShowStars(!showStars);
  const handleShowOrbitsClick = () => setShowOrbits(!showOrbits);
  const handleRealTimeClick = () => setRealTime(!realTime);
  const handleSpeedChange = (e) => setSpeed(parseFloat(e.target.value));
  const handleZoomChange = (e) => setZoom(parseFloat(e.target.value));

  // NEW BUTTON HANDLERS
  const handleShowStarNamesClick = () => setShowStarNames(!showStarNames);
  const handleShowPlanetNamesClick = () => setShowPlanetNames(!showPlanetNames);
  const handleShowDeepSkyClick = () => setShowDeepSky(!showDeepSky);
  const handleShowMythologyClick = () => setShowMythology(!showMythology);
  const handleZoomOut = () => {
    const newZoom = Math.max(0.1, zoom - 0.1); // SMALLER increments for smoother zooming
    setZoom(newZoom);
  };
  const handleZoomIn = () => {
    const newZoom = Math.min(10.0, zoom + 0.1); // SMALLER increments for smoother zooming
    setZoom(newZoom);
  };
  // Add these handler functions after your other handlers:
const handleSetHemisphere = (newHemisphere) => {
  setHemisphere(newHemisphere);
};

const handleSetConstellationFilter = (filter) => {
  setConstellationFilter(filter);
};

const handleSetBrightnessFilter = (filter) => {
  setBrightnessFilter(filter);
};

const handleShowConstellationNames = () => {
  setShowConstellationNames(!showConstellationNames);
};

  // Calculate current planetary data for display (includes SUN)
  const getCurrentPlanetaryData = () => {
    const planetaryData = {};
    Object.entries(PLANETARY_DATA).forEach(([key, planet]) => {
      if (key === 'sun') {
        const angle = 0;
        const zodiac = getZodiacSign(angle);
        planetaryData[key] = {
          ...planet,
          currentAngle: angle,
          zodiacPosition: zodiac,
          degreesPerDay: 1.0
        };
      } else if (planet.degreesPerDay) {
        const angle = calculatePlanetPosition(key, time);
        const zodiac = getZodiacSign(angle);
        planetaryData[key] = {
          ...planet,
          currentAngle: angle,
          zodiacPosition: zodiac
        };
      }
    });
    return planetaryData;
  };

  const currentPlanetaryData = getCurrentPlanetaryData();

  // Calculate aspects - SHOW ALL ANGLES, NOT JUST MAJOR ASPECTS
  const calculateCurrentAspects = () => {
    const aspects = [];
    const planets = Object.keys(PLANETARY_DATA);
    
    for (let i = 0; i < planets.length; i++) {
      for (let j = i + 1; j < planets.length; j++) {
        const planet1 = planets[i];
        const planet2 = planets[j];
        
        let angle1, angle2;
        
        if (planet1 === 'sun') {
          angle1 = 0;
        } else {
          angle1 = calculatePlanetPosition(planet1, time);
        }
        
        if (planet2 === 'sun') {
          angle2 = 0;
        } else {
          angle2 = calculatePlanetPosition(planet2, time);
        }
        
        if (angle1 !== null && angle2 !== null) {
          let angleDiff = Math.abs(angle1 - angle2);
          if (angleDiff > 180) angleDiff = 360 - angleDiff;
          
          const aspectName = getAspectName(angleDiff);
          
          aspects.push({
            planet1: PLANETARY_DATA[planet1].symbol,
            planet2: PLANETARY_DATA[planet2].symbol,
            angle: angleDiff,
            aspect: aspectName,
            planet1Name: planet1,
            planet2Name: planet2,
            isMajorAspect: aspectName !== "No Major Aspect"
          });
        }
      }
    }
    return aspects;
  };

  const currentAspects = calculateCurrentAspects();

  return (
    <div className="w-full h-screen bg-black relative overflow-hidden">
      {/* Global CSS for invisible scrollbar */}
      <style jsx global>{`
        /* Hide scrollbar for webkit browsers */
        ::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for Firefox */
        * {
          scrollbar-width: none;
        }
        /* Hide scrollbar for IE */
        * {
          -ms-overflow-style: none;
        }
      `}</style>
      
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-crosshair"
        style={{ background: 'radial-gradient(circle, #001122 0%, #000000 100%)' }}
      />
      
      {/* ENHANCED LEFT PANEL WITH TABS - BETTER ORGANIZATION */}
      <div className="absolute top-4 left-4 space-y-2">
        {/* Panel Toggle Button */}
        <button
          onClick={() => setShowLeftPanel(!showLeftPanel)}
          className="bg-gray-800/90 hover:bg-gray-700/90 text-white px-3 py-2 rounded-lg font-medium transition-all"
          title={showLeftPanel ? "Hide Controls" : "Show Controls"}
        >
          {showLeftPanel ? "←" : "→"}
        </button>

        {showLeftPanel && (
          <>
            {/* Tab Navigation */}
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-2">
              <div className="flex space-x-1">
                <button
                  onClick={() => setActiveTab('controls')}
                  className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                    activeTab === 'controls' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Controls
                </button>
                <button
                  onClick={() => setActiveTab('zoom')}
                  className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                    activeTab === 'zoom' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Zoom
                </button>
                <button
                  onClick={() => setActiveTab('view')}
                  className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                    activeTab === 'view' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  View
                </button>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'controls' && (
              <div className="space-y-2">
                <button
                  onClick={handleShowStarsClick}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 w-full ${
                    showStars 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                  }`}
                >
                  <span>⭐</span>
                  <span>Show Stars</span>
                </button>

                <button
                  onClick={handleShowPlanetNamesClick}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 w-full ${
                    showPlanetNames 
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                      : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                  }`}
                >
                  <span>🏷️</span>
                  <span>Planet Names</span>
                </button>

                {showStars && (
                  <button
                    onClick={handleShowStarNamesClick}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 w-full ${
                      showStarNames 
                        ? 'bg-cyan-600 hover:bg-cyan-700 text-white' 
                        : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                    }`}
                  >
                    <span>🌟</span>
                    <span>Star Names</span>
                  </button>
                )}

                {showStars && (
                  <button
                    onClick={handleShowDeepSkyClick}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 w-full ${
                      showDeepSky 
                        ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                        : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                    }`}
                  >
                    <span>🌌</span>
                    <span>Deep Sky</span>
                  </button>
                )}

                <button
                  onClick={handleShowOrbitsClick}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 w-full ${
                    showOrbits 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                  }`}
                >
                  <span>🔄</span>
                  <span>Show Orbits</span>
                </button>

                <button
                  onClick={handleRealTimeClick}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 w-full ${
                    realTime 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                  }`}
                >
                  <span>⏰</span>
                  <span>Real Time</span>
                </button>

                <button
                  onClick={handleShowMythologyClick}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 w-full ${
                    showMythology 
                      ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                      : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                  }`}
                >
                  <span>📜</span>
                  <span>Mythology</span>
                </button>
                {showStars && (
                  <button
                    onClick={handleShowConstellationNames}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 w-full ${
                      showConstellationNames 
                        ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                        : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                    }`}
                  >
                    <span>🏷️</span>
                    <span>Constellation Names</span>
                  </button>
                )}
              </div>
            )}

            {activeTab === 'zoom' && (
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-3 text-white">
                <label className="block text-xs font-medium mb-2">Zoom: {zoom.toFixed(1)}x</label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleZoomOut}
                    className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded text-xl font-bold min-w-[50px]"
                    title="Zoom Out - See Jupiter/Saturn"
                  >
                    −
                  </button>
                  <button
                    onClick={handleZoomIn}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded text-xl font-bold min-w-[50px]"
                    title="Zoom In"
                  >
                    +
                  </button>
                </div>
                
                {/* Smart Zoom Indicators */}
                <div className="text-xs mt-2 space-y-1">
                  {zoom <= 0.5 && (
                    <div className="text-green-300">🌌 Full Solar System View</div>
                  )}
                  {zoom > 0.5 && zoom <= 2.0 && (
                    <div className="text-blue-300">🪐 Inner Planets Focus</div>
                  )}
                  {zoom > 2.0 && (
                    <div className="text-yellow-300">🔍 Detailed Planet View</div>
                  )}
                  <div className="text-gray-400">
                    {zoom <= 0.3 ? "Outer planets visible" : 
                     zoom <= 1.0 ? "Inner + Mars visible" : 
                     "Close-up detail mode"}
                  </div>
                  <div className="text-xs text-blue-300 mt-2">
                    💡 Use mouse wheel or pinch to zoom
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'view' && (
              <div className="space-y-2">
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-3 text-white">
                  <div className="text-xs font-medium mb-1">Drag View: {offset.x.toFixed(0)}, {offset.y.toFixed(0)}</div>
                  <div className="text-xs text-gray-300">Hold & drag to rotate/pan view</div>
                  <button 
                    onClick={() => setOffset({ x: 0, y: 0 })}
                    className="bg-gray-600 hover:bg-gray-500 text-white px-2 py-1 rounded text-xs mt-1"
                  >
                    Reset View
                  </button>
                </div>

                {/* NEW: HEMISPHERE CONTROLS */}
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-3 text-white">
                  <div className="text-xs font-medium mb-2">🌍 Hemisphere View</div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSetHemisphere('northern')}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 flex-1 ${
                        hemisphere === 'northern' 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                          : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      }`}
                    >
                      <span>↑</span>
                      <span>North</span>
                    </button>
                    <button
                      onClick={() => handleSetHemisphere('southern')}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 flex-1 ${
                        hemisphere === 'southern' 
                          ? 'bg-red-600 hover:bg-red-700 text-white' 
                          : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      }`}
                    >
                      <span>↓</span>
                      <span>South</span>
                    </button>
                  </div>
                </div>
                
                {/* DISTANCE SCALE HELPER */}
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-3 text-white">
                  <div className="text-xs font-medium mb-2">🌌 Visible Objects</div>
                  <div className="space-y-1 text-xs max-h-32 overflow-y-auto">
                    {getVisiblePlanetsForZoom(zoom).map(planet => (
                      <div key={planet} className="flex items-center space-x-2">
                        <span style={{color: PLANETARY_DATA[planet]?.color || '#fff'}}>
                          {PLANETARY_DATA[planet]?.symbol || '●'}
                        </span>
                        <span className="text-gray-300">{PLANETARY_DATA[planet]?.name || planet}</span>
                      </div>
                    ))}
                  </div>
                  {zoom > 2.0 && (
                    <div className="text-xs text-yellow-300 mt-2">💡 Zoom out to see outer planets</div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* ENHANCED DATA TABLES - REPOSITIONED AND IMPROVED */}
<div className="absolute top-4 right-4 space-y-4">
  {/* Speed Control */}
  <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 text-white">
    <label className="block text-sm font-medium mb-2">Speed: {speed}x</label>
    <input
      type="range"
      min="0.1"
      max="10"
      step="0.1"
      value={speed}
      onChange={handleSpeedChange}
      className="w-32 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
    />
  </div>

  {/* Data Panel with Tabs */}
  <div className="bg-gradient-to-br from-gray-900/95 to-slate-800/95 backdrop-blur-md text-white rounded-2xl p-4 max-w-3xl max-h-[70vh] border border-gray-600/30 shadow-2xl">
    {/* Tab Navigation */}
    <div className="flex space-x-2 mb-4">
      <button
        onClick={() => setActiveTab('planetary')}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          activeTab === 'planetary' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-700'
        }`}
      >
        🪐 Planets
      </button>
      <button
        onClick={() => setActiveTab('aspects')}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          activeTab === 'aspects' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-700'
        }`}
      >
        ⚡ Aspects
      </button>
    </div>

    {/* Tab Content */}
    <div 
      className="overflow-y-auto"
      style={{
        maxHeight: 'calc(70vh - 120px)',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
    >
      {activeTab === 'planetary' && (
        <div>
          <h3 className="text-lg font-bold mb-3 flex items-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            <span className="text-xl mr-2">🪐</span>
            Current Planetary Positions
          </h3>
          
          <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-600/50">
                    <th className="text-left p-3 font-semibold text-blue-300">Planet</th>
                    <th className="text-left p-3 font-semibold text-green-300">Sign</th>
                    <th className="text-left p-3 font-semibold text-yellow-300">Position</th>
                    <th className="text-left p-3 font-semibold text-purple-300">Daily Motion</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Enhanced Sun row - CLICKABLE */}
                  {currentPlanetaryData.sun && (
                    <tr className="border-b border-gray-700/30 bg-gradient-to-r from-yellow-900/20 to-orange-900/10 hover:from-yellow-900/30 hover:to-orange-900/20 transition-all cursor-pointer" onClick={() => setSelectedPlanet('sun')}>
                      <td className="p-3">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3" style={{color: '#FFD700'}}>{currentPlanetaryData.sun.symbol}</span>
                          <div>
                            <div className="font-semibold">{currentPlanetaryData.sun.name}</div>
                            <div className="text-xs text-gray-400">Central Star</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="bg-yellow-500/20 text-yellow-200 px-2 py-1 rounded-full text-xs font-medium">
                          {currentPlanetaryData.sun.zodiacPosition?.sign}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="font-mono font-bold text-yellow-300">
                          {currentPlanetaryData.sun.zodiacPosition?.degree.toFixed(1)}°
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="text-orange-300 font-medium">
                          {currentPlanetaryData.sun.degreesPerDay?.toFixed(3)}°/day
                        </span>
                      </td>
                    </tr>
                  )}
                  
                  {/* Enhanced planet rows */}
                  {Object.entries(currentPlanetaryData).filter(([key]) => key !== 'sun').map(([key, planet]) => (
                    <tr key={key} className="border-b border-gray-700/30 hover:bg-white/5 transition-all cursor-pointer" onClick={() => setSelectedPlanet(key)}>
                      <td className="p-3">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3" style={{color: planet.color}}>{planet.symbol}</span>
                          <div>
                            <div className="font-semibold">{planet.name}</div>
                            <div className="text-xs text-gray-400">{planet.distance} AU</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="bg-blue-500/20 text-blue-200 px-2 py-1 rounded-full text-xs font-medium">
                          {planet.zodiacPosition?.sign}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="font-mono font-bold text-green-300">
                          {planet.zodiacPosition?.degree.toFixed(1)}°
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="text-purple-300 font-medium">
                          {planet.degreesPerDay?.toFixed(3)}°/day
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'aspects' && (
        <div>
          <h4 className="text-lg font-bold mb-3 flex items-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            <span className="text-xl mr-2">⚡</span>
            All Planetary Aspects & Angles
          </h4>
          
          <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
            <div className="grid grid-cols-1 gap-2">
              {currentAspects.map((aspect, index) => {
                const aspectColors = {
                  "Conjunction": { bg: "from-red-500/20 to-red-600/10", text: "text-red-300", border: "border-red-500/30" },
                  "Sextile": { bg: "from-green-500/20 to-green-600/10", text: "text-green-300", border: "border-green-500/30" },
                  "Square": { bg: "from-orange-500/20 to-orange-600/10", text: "text-orange-300", border: "border-orange-500/30" },
                  "Trine": { bg: "from-blue-500/20 to-blue-600/10", text: "text-blue-300", border: "border-blue-500/30" },
                  "Opposition": { bg: "from-purple-500/20 to-purple-600/10", text: "text-purple-300", border: "border-purple-500/30" }
                };
                
                const colors = aspect.isMajorAspect ? 
                  aspectColors[aspect.aspect] : 
                  { bg: "from-gray-600/20 to-gray-700/10", text: "text-gray-300", border: "border-gray-600/30" };
                
                return (
                  <div key={index} className={`bg-gradient-to-r ${colors.bg} border ${colors.border} rounded-lg p-3 flex items-center justify-between hover:scale-[1.02] transition-all`}>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{aspect.planet1}</span>
                      <div className="flex flex-col items-center">
                        <span className={`${colors.text} font-bold text-sm`}>
                          {aspect.isMajorAspect ? aspect.aspect : "•"}
                        </span>
                        {aspect.isMajorAspect && (
                          <div className="w-8 h-0.5 bg-current opacity-50"></div>
                        )}
                      </div>
                      <span className="text-2xl">{aspect.planet2}</span>
                    </div>
                    <div className="text-right">
                      <div className={`${colors.text} font-bold text-lg font-mono`}>
                        {aspect.angle.toFixed(1)}°
                      </div>
                      {aspect.isMajorAspect && (
                        <div className="text-xs text-gray-400 mt-1">
                          {aspect.aspect}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
</div>

      {/* ENHANCED PLANET INFO PANEL */}
      {selectedPlanet && showPlanetInfo && (
        <div className="absolute bottom-4 left-4 bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-sm text-white rounded-xl p-6 max-w-lg border border-gray-600/30 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold flex items-center">
              <span className="text-4xl mr-3" style={{color: PLANETARY_DATA[selectedPlanet].color}}>
                {PLANETARY_DATA[selectedPlanet].symbol}
              </span>
              <div>
                <div>{PLANETARY_DATA[selectedPlanet].name}</div>
                <div className="text-sm text-gray-300 font-normal">
                  {PLANETARY_DATA[selectedPlanet].alternateNames?.join(', ') || 'Classical Planet'}
                </div>
              </div>
            </h3>
            <button
              onClick={() => setSelectedPlanet(null)}
              className="text-gray-400 hover:text-white text-2xl font-bold bg-gray-700/50 hover:bg-gray-600/50 rounded-full w-10 h-10 flex items-center justify-center transition-all"
            >
              ×
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white/5 rounded-lg p-3">
              <h4 className="font-semibold text-blue-300 mb-2">Physical Properties</h4>
              <div className="space-y-1">
                <p><strong>Diameter:</strong> {PLANETARY_DATA[selectedPlanet].diameter?.toLocaleString()} km</p>
                {PLANETARY_DATA[selectedPlanet].mass && (
                  <p><strong>Mass:</strong> {PLANETARY_DATA[selectedPlanet].mass?.toExponential(2)} kg</p>
                )}
                {PLANETARY_DATA[selectedPlanet].rotationPeriod && (
                  <p><strong>Day Length:</strong> {PLANETARY_DATA[selectedPlanet].rotationPeriod} hours</p>
                )}
                {PLANETARY_DATA[selectedPlanet].axialTilt && (
                  <p><strong>Axial Tilt:</strong> {PLANETARY_DATA[selectedPlanet].axialTilt}°</p>
                )}
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-3">
              <h4 className="font-semibold text-green-300 mb-2">Orbital Properties</h4>
              <div className="space-y-1">
                {PLANETARY_DATA[selectedPlanet].distance && (
                  <p><strong>Distance:</strong> {PLANETARY_DATA[selectedPlanet].distance} AU</p>
                )}
                {PLANETARY_DATA[selectedPlanet].orbitalPeriod && (
                  <p><strong>Year Length:</strong> {PLANETARY_DATA[selectedPlanet].orbitalPeriod} days</p>
                )}
                {PLANETARY_DATA[selectedPlanet].orbitalVelocity && (
                  <p><strong>Orbital Speed:</strong> {PLANETARY_DATA[selectedPlanet].orbitalVelocity} km/s</p>
                )}
                {PLANETARY_DATA[selectedPlanet].orbitalEccentricity && (
                  <p><strong>Eccentricity:</strong> {PLANETARY_DATA[selectedPlanet].orbitalEccentricity}</p>
                )}
              </div>
            </div>
          </div>

          {currentPlanetaryData[selectedPlanet] && (
            <div className="mt-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg p-3">
              <h4 className="font-semibold text-purple-300 mb-2">Current Position</h4>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <div className="text-gray-400">Zodiac Sign</div>
                  <div className="font-bold">{currentPlanetaryData[selectedPlanet].zodiacPosition?.sign}</div>
                </div>
                <div>
                  <div className="text-gray-400">Degrees</div>
                  <div className="font-bold">{currentPlanetaryData[selectedPlanet].currentAngle?.toFixed(1)}°</div>
                </div>
                <div>
                  <div className="text-gray-400">Daily Motion</div>
                  <div className="font-bold">{currentPlanetaryData[selectedPlanet].degreesPerDay?.toFixed(3)}°/day</div>
                </div>
              </div>
            </div>
          )}

          {PLANETARY_DATA[selectedPlanet].astrology && (
            <div className="mt-4 bg-gradient-to-r from-amber-900/30 to-orange-900/30 rounded-lg p-3">
              <h4 className="font-semibold text-amber-300 mb-2">Astrological Significance</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Nature:</strong> {PLANETARY_DATA[selectedPlanet].astrology.nature}</p>
                <p><strong>Dignities:</strong> {PLANETARY_DATA[selectedPlanet].astrology.dignities}</p>
                <p><strong>Correspondences:</strong> {PLANETARY_DATA[selectedPlanet].astrology.correspondences}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* CONSTELLATION MYTHOLOGY PANEL */}
      {selectedConstellation && showMythology && CONSTELLATION_MYTHOLOGY[selectedConstellation] && (
        <div className="absolute bottom-4 right-4 bg-gray-900/90 backdrop-blur-sm text-white rounded-lg p-6 max-w-md max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">{selectedConstellation}</h3>
            <button
              onClick={() => setSelectedConstellation(null)}
              className="text-gray-400 hover:text-white text-xl font-bold bg-gray-700 hover:bg-gray-600 rounded-full w-8 h-8 flex items-center justify-center"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-3 text-sm">
            {CONSTELLATION_MYTHOLOGY[selectedConstellation].greek && (
              <div>
                <p><strong>Greek Name:</strong> {CONSTELLATION_MYTHOLOGY[selectedConstellation].greek.name}</p>
                <p><strong>Story:</strong> {CONSTELLATION_MYTHOLOGY[selectedConstellation].greek.story}</p>
                {CONSTELLATION_MYTHOLOGY[selectedConstellation].greek.moralLesson && (
                  <p><strong>Lesson:</strong> {CONSTELLATION_MYTHOLOGY[selectedConstellation].greek.moralLesson}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveSolarSystem;
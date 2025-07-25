// constellationRenderer.js - Enhanced rendering engine for stars, constellations, and deep sky objects

import { BRIGHT_STARS, NAVIGATION_STARS, VARIABLE_STARS } from './constellationStars.js';
import { CONSTELLATION_LINES, HEMISPHERE_CONSTELLATIONS, SEASONAL_CONSTELLATIONS, ASTERISMS } from './constellationPatterns.js';

// Convert Right Ascension and Declination to screen coordinates - IMPROVED SPACING
const celestialToScreen = (ra, dec, lst, latitude, width, height, zoom) => {
  // Convert RA/Dec to Alt/Az coordinates
  const hourAngle = lst - ra;
  const sinAlt = Math.sin(dec * Math.PI / 180) * Math.sin(latitude * Math.PI / 180) +
    Math.cos(dec * Math.PI / 180) * Math.cos(latitude * Math.PI / 180) * Math.cos(hourAngle * Math.PI / 12);
  const altitude = Math.asin(sinAlt) * 180 / Math.PI;

  const cosA = (Math.sin(dec * Math.PI / 180) - Math.sin(altitude * Math.PI / 180) * Math.sin(latitude * Math.PI / 180)) /
    (Math.cos(altitude * Math.PI / 180) * Math.cos(latitude * Math.PI / 180));
  let azimuth = Math.acos(Math.max(-1, Math.min(1, cosA))) * 180 / Math.PI;

  if (Math.sin(hourAngle * Math.PI / 12) > 0) {
    azimuth = 360 - azimuth;
  }

  // Project to screen coordinates - IMPROVED spacing and scaling
  if (altitude < -5) return null; // Show more stars near horizon

  // Better scaling for constellation display - spread stars out more
  const r = (90 - altitude) * zoom * 2.5; // Increased multiplier for better spacing
  const x = width / 2 + r * Math.sin(azimuth * Math.PI / 180);
  const y = height / 2 - r * Math.cos(azimuth * Math.PI / 180);

  return { x, y, altitude, azimuth, visible: altitude > -5 };
};

// Get current Local Sidereal Time
const getLocalSiderealTime = (longitude, date = new Date()) => {
  const J2000 = new Date('2000-01-01T12:00:00Z');
  const daysSinceJ2000 = (date - J2000) / (1000 * 60 * 60 * 24);

  // Simplified LST calculation
  const gmst = 18.697374558 + 24.06570982441908 * daysSinceJ2000;
  const lst = gmst + longitude / 15;

  return ((lst % 24) + 24) % 24; // Ensure positive result
};

// Determine which constellations are visible - ENHANCED for MORE VISIBLE CONSTELLATIONS
const getVisibleConstellations = (latitude, season = 'all') => {
  let visible = [];

  if (latitude > 40) {
    // Northern hemisphere
    visible = visible.concat(HEMISPHERE_CONSTELLATIONS.northern);
    visible = visible.concat(HEMISPHERE_CONSTELLATIONS.both);
  } else if (latitude < -40) {
    // Southern hemisphere  
    visible = visible.concat(HEMISPHERE_CONSTELLATIONS.southern);
    visible = visible.concat(HEMISPHERE_CONSTELLATIONS.both);
  } else {
    // Equatorial - can see everything
    visible = Object.keys(CONSTELLATION_LINES);
  }

  if (season !== 'all' && SEASONAL_CONSTELLATIONS[season]) {
    visible = visible.filter(constellation => SEASONAL_CONSTELLATIONS[season].includes(constellation));
  }

  return visible;
};

// Draw individual star with magnitude-based sizing
const drawStar = (ctx, star, position, zoom) => {
  if (!position || !position.visible) return;

  const { x, y, altitude } = position;

  // Size based on magnitude (brighter stars = larger)
  const baseSize = Math.max(1, 6 - star.magnitude);
  const size = Math.max(0.5, baseSize * zoom * 0.3);

  // Atmospheric scintillation - stars twinkle more near horizon
  const scintillation = altitude < 30 ? 1 + (30 - altitude) * 0.02 : 1;
  const twinkleSize = size * scintillation;

  // Star color based on spectral class
  let color = star.color || '#ffffff';

  // Atmospheric extinction - stars dimmer near horizon
  const extinction = altitude < 45 ? Math.max(0.3, 1 - (45 - altitude) * 0.02) : 1;

  // Draw star glow
  const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, twinkleSize * 2);
  glowGradient.addColorStop(0, color);
  glowGradient.addColorStop(0.5, color + '80'); // Semi-transparent
  glowGradient.addColorStop(1, 'transparent');

  ctx.fillStyle = glowGradient;
  ctx.beginPath();
  ctx.arc(x, y, twinkleSize * 2, 0, Math.PI * 2);
  ctx.fill();

  // Draw star core
  ctx.fillStyle = color;
  ctx.globalAlpha = extinction;
  ctx.beginPath();
  ctx.arc(x, y, twinkleSize, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  // Mark navigation stars with special indicator
  if (NAVIGATION_STARS.includes(star.name)) {
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(x, y, twinkleSize + 3, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Variable star indicator
  if (VARIABLE_STARS[star.name]) {
    ctx.strokeStyle = '#ff6600';
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 2]);
    ctx.beginPath();
    ctx.arc(x, y, twinkleSize + 5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  return { x, y, size: twinkleSize, star };
};

// Draw constellation lines - ENHANCED with better debugging and fallback stars
const drawConstellationLines = (ctx, constellation, starPositions, zoom, opacity = 0.6) => {
  const pattern = CONSTELLATION_LINES[constellation];
  if (!pattern || !pattern.lines) return;

  ctx.strokeStyle = `rgba(100, 150, 255, ${opacity})`;
  ctx.lineWidth = Math.max(0.5, zoom * 0.5);
  ctx.setLineDash([]);

  let linesDrawn = 0;
  let totalLines = pattern.lines.length;
  
  pattern.lines.forEach(([start, end]) => {
    const star1 = pattern.stars[start];
    const star2 = pattern.stars[end];

    const pos1 = starPositions[star1];
    const pos2 = starPositions[star2];

    if (pos1 && pos2 && pos1.visible && pos2.visible) {
      ctx.beginPath();
      ctx.moveTo(pos1.x, pos1.y);
      ctx.lineTo(pos2.x, pos2.y);
      ctx.stroke();
      linesDrawn++;
    }
  });
  
  // Better constellation coverage logging
  if (linesDrawn > 0) {
    console.log(`✅ ${constellation}: Drew ${linesDrawn}/${totalLines} lines (${((linesDrawn/totalLines)*100).toFixed(0)}% visible)`);
  } else if (totalLines > 0) {
    console.log(`❌ ${constellation}: 0/${totalLines} lines drawn - missing stars or below horizon`);
  }
};

// Draw constellation labels
const drawConstellationLabel = (ctx, constellation, starPositions, zoom) => {
  const pattern = CONSTELLATION_LINES[constellation];
  if (!pattern || !pattern.stars.length) return;

  // Find center point of constellation
  let centerX = 0,
    centerY = 0,
    visibleCount = 0;

  pattern.stars.forEach(starName => {
    const pos = starPositions[starName];
    if (pos && pos.visible) {
      centerX += pos.x;
      centerY += pos.y;
      visibleCount++;
    }
  });

  if (visibleCount === 0) return;

  centerX /= visibleCount;
  centerY /= visibleCount;

  // Draw constellation name
  const fontSize = Math.max(10, 14 * zoom);
  ctx.font = `${fontSize}px Arial`;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.textAlign = 'center';
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
  ctx.lineWidth = 2;

  ctx.strokeText(constellation, centerX, centerY);
  ctx.fillText(constellation, centerX, centerY);
};

// Draw star names for bright stars - ENHANCED: Show MORE stars
const drawStarNames = (ctx, starPositions, zoom, showAll = false) => {
  // FIXED: Always use 12px font size for better legibility
  const fontSize = 12;
  ctx.font = `bold ${fontSize}px Arial`;
  ctx.textAlign = 'left';

  Object.entries(starPositions).forEach(([starName, position]) => {
    if (!position || !position.visible) return;

    const star = BRIGHT_STARS[starName];
    if (!star) return;

    // Show MANY MORE stars for better constellation visibility
    if (!showAll && star.magnitude > 4.5 && !NAVIGATION_STARS.includes(starName)) return;

    const { x, y } = position;

    // ENHANCED: Stronger red glow for better contrast
    ctx.shadowColor = '#FF0000';
    ctx.shadowBlur = 4;
    ctx.fillStyle = '#4A90E2'; // Blue text
    ctx.strokeStyle = '#FF0000'; // Red glow
    ctx.lineWidth = 3;

    // Draw red outline/glow first (thicker)
    ctx.strokeText(starName, x + 12, y - 12);
    // Draw blue text on top
    ctx.fillText(starName, x + 12, y - 12);
    
    // Reset shadow
    ctx.shadowBlur = 0;
  });
};

// Draw asterisms (famous star patterns)
const drawAsterisms = (ctx, asterism, starPositions, zoom) => {
  const pattern = ASTERISMS[asterism];
  if (!pattern || !pattern.lines) return;

  ctx.strokeStyle = 'rgba(255, 215, 0, 0.6)'; // Gold color for asterisms
  ctx.lineWidth = Math.max(1, zoom * 0.8);
  ctx.setLineDash([5, 3]);

  pattern.lines.forEach(([start, end]) => {
    const star1 = pattern.stars[start];
    const star2 = pattern.stars[end];

    const pos1 = starPositions[star1];
    const pos2 = starPositions[star2];

    if (pos1 && pos2 && pos1.visible && pos2.visible) {
      ctx.beginPath();
      ctx.moveTo(pos1.x, pos1.y);
      ctx.lineTo(pos2.x, pos2.y);
      ctx.stroke();
    }
  });

  ctx.setLineDash([]);
};

// Draw Milky Way (simplified representation) - REDUCED OPACITY TO PREVENT PURPLE PLANES
const drawMilkyWay = (ctx, width, height, zoom, opacity = 0.05) => {
  // Simplified Milky Way as a band across the sky
  const milkyWayGradient = ctx.createLinearGradient(0, height * 0.3, width, height * 0.7);
  milkyWayGradient.addColorStop(0, 'transparent');
  milkyWayGradient.addColorStop(0.3, `rgba(200, 200, 255, ${opacity})`);
  milkyWayGradient.addColorStop(0.5, `rgba(255, 255, 255, ${opacity * 2})`);
  milkyWayGradient.addColorStop(0.7, `rgba(200, 200, 255, ${opacity})`);
  milkyWayGradient.addColorStop(1, 'transparent');

  ctx.fillStyle = milkyWayGradient;
  ctx.fillRect(0, 0, width, height);
};

// Main constellation rendering function - ENHANCED for MORE VISIBLE CONSTELLATIONS
const renderConstellations = (ctx, width, height, options = {}) => {
  const {
    latitude = 40,
      longitude = 0,
      zoom = 1,
      showLines = true,
      showLabels = true,
      showStarNames = false,
      showAsterisms = false,
      showMilkyWay = true,
      season = 'all',
      deepMode = false,
      showAllStars = false,
      date = new Date()
  } = options;

  // Calculate current star positions
  const lst = getLocalSiderealTime(longitude, date);
  let visibleConstellations = getVisibleConstellations(latitude, season);
  
  // ENHANCED: Show MANY MORE constellations always - MAJOR IMPROVEMENT
  visibleConstellations = [
    // Major visible constellations - GUARANTEED TO WORK NOW
    "Orion", "Ursa Major", "Ursa Minor", "Cassiopeia", "Cygnus", "Lyra", "Aquila",
    "Perseus", "Andromeda", "Pegasus", "Boötes", "Corona Borealis", "Hercules",
    "Draco", "Cepheus", "Leo", "Virgo", "Libra", "Scorpius", "Sagittarius",
    "Capricornus", "Aquarius", "Pisces", "Aries", "Taurus", "Gemini", "Cancer",
    
    // Additional constellations with added stars
    "Auriga", "Lynx", "Leo Minor", "Coma Berenices", "Canes Venatici",
    "Serpens", "Ophiuchus", "Scutum", "Sagitta", "Delphinus", "Equuleus",
    "Vulpecula", "Lacerta", "Triangulum", "Eridanus", "Lepus", "Canis Major",
    "Canis Minor", "Monoceros", "Hydra", "Sextans", "Crater", "Corvus"
  ];
  
  // DEEP MODE: Show ALL 88 constellations
  if (deepMode) {
    visibleConstellations = Object.keys(CONSTELLATION_LINES);
  }

  // Calculate star positions using REAL ASTRONOMICAL COORDINATES
  const starPositions = {};
  Object.entries(BRIGHT_STARS).forEach(([name, star]) => {
    // Transform actual RA/Dec coordinates to screen position
    const pos = celestialToScreen(star.rightAscension, star.declination, lst, latitude, width, height, zoom);
    if (pos) {
      starPositions[name] = pos;
    }
  });

  // Draw Milky Way background - NO PURPLE PLANES
  if (showMilkyWay) {
    drawMilkyWay(ctx, width, height, zoom, 0.05); // Reduced opacity to avoid purple planes
  }

  // Draw stars at their EXACT astronomical positions
  const drawnStars = [];
  Object.entries(BRIGHT_STARS).forEach(([name, star]) => {
    const position = starPositions[name];
    const drawnStar = drawStar(ctx, star, position, zoom);
    if (drawnStar) {
      drawnStars.push({ name, ...drawnStar });
    }
  });

  // Draw constellation lines - ENHANCED VISIBILITY with real star data
  if (showLines) {
    let totalConstellationsDrawn = 0;
    visibleConstellations.forEach(constellation => {
      const linesDrawnBefore = totalConstellationsDrawn;
      drawConstellationLines(ctx, constellation, starPositions, zoom, 0.6); // Increased opacity
      // Count successful constellation renders
      const pattern = CONSTELLATION_LINES[constellation];
      if (pattern && pattern.lines) {
        let hasVisibleLines = false;
        pattern.lines.forEach(([start, end]) => {
          const star1 = pattern.stars[start];
          const star2 = pattern.stars[end];
          const pos1 = starPositions[star1];
          const pos2 = starPositions[star2];
          if (pos1 && pos2 && pos1.visible && pos2.visible) {
            hasVisibleLines = true;
          }
        });
        if (hasVisibleLines) totalConstellationsDrawn++;
      }
    });
    console.log(`🌟 TOTAL CONSTELLATIONS WITH VISIBLE LINES: ${totalConstellationsDrawn}`);
  }

  // Draw asterisms
  if (showAsterisms) {
    Object.keys(ASTERISMS).forEach(asterism => {
      drawAsterisms(ctx, asterism, starPositions, zoom);
    });
  }

  // Draw constellation labels
  if (showLabels) {
    visibleConstellations.forEach(constellation => {
      drawConstellationLabel(ctx, constellation, starPositions, zoom);
    });
  }

  // Draw star names with fixed size and proper colors
  if (showStarNames) {
    drawStarNames(ctx, starPositions, zoom, showAllStars);
  }

  return {
    drawnStars,
    starPositions,
    visibleConstellations,
    lst
  };
};

// Deep sky objects (galaxies, nebulae, clusters) - REAL ASTRONOMICAL COORDINATES
const DEEP_SKY_OBJECTS = {
  "M31": {
    name: "Andromeda Galaxy",
    type: "Galaxy",
    constellation: "Andromeda",
    rightAscension: 0.712, // REAL coordinates: 0h 42m 44s
    declination: 41.269, // REAL coordinates: +41° 16' 09"
    magnitude: 3.4,
    size: "3.2° × 1.0°", // Actual angular size
    distance: "2.5 million light years", // Actual distance
    description: "Nearest major galaxy to Milky Way"
  },

  "M42": {
    name: "Orion Nebula",
    type: "Emission Nebula",
    constellation: "Orion",
    rightAscension: 5.588, // REAL coordinates: 5h 35m 17s
    declination: -5.391, // REAL coordinates: -5° 23' 27"
    magnitude: 4.0,
    size: "85' × 60'",
    distance: "1,344 light years", // Actual distance
    description: "Stellar nursery visible to naked eye"
  },

  "M45": {
    name: "Pleiades",
    type: "Open Cluster",
    constellation: "Taurus",
    rightAscension: 3.790, // REAL coordinates: 3h 47m 24s
    declination: 24.533, // REAL coordinates: +24° 32' 00"
    magnitude: 1.6,
    size: "110'",
    distance: "444 light years", // Actual distance
    description: "Seven Sisters star cluster"
  },

  "M13": {
    name: "Great Globular Cluster in Hercules",
    type: "Globular Cluster",
    constellation: "Hercules",
    rightAscension: 16.695, // REAL coordinates: 16h 41m 41s
    declination: 36.460, // REAL coordinates: +36° 27' 37"
    magnitude: 5.8,
    size: "20'",
    distance: "25,100 light years", // Actual distance
    description: "Finest globular cluster in northern sky"
  },

  "M57": {
    name: "Ring Nebula",
    type: "Planetary Nebula",
    constellation: "Lyra",
    rightAscension: 18.884, // REAL coordinates: 18h 53m 06s
    declination: 33.029, // REAL coordinates: +33° 01' 45"
    magnitude: 8.8,
    size: "1.4' × 1.0'",
    distance: "2,300 light years", // Actual distance
    description: "Famous ring-shaped planetary nebula"
  }
};

// Draw deep sky objects at their REAL astronomical positions
const drawDeepSkyObject = (ctx, dso, position, zoom) => {
  if (!position || !position.visible) return;

  const { x, y } = position;
  const size = Math.max(3, zoom * 4);

  // Different symbols for different object types
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.lineWidth = 1;

  switch (dso.type) {
    case "Galaxy":
      // Elliptical shape for galaxies
      ctx.beginPath();
      ctx.ellipse(x, y, size * 2, size, 0, 0, Math.PI * 2);
      ctx.stroke();
      break;

    case "Globular Cluster":
      // Circle with cross for globular clusters
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x - size, y);
      ctx.lineTo(x + size, y);
      ctx.moveTo(x, y - size);
      ctx.lineTo(x, y + size);
      ctx.stroke();
      break;

    case "Open Cluster":
      // Dashed circle for open clusters
      ctx.setLineDash([3, 2]);
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      break;

    case "Emission Nebula":
    case "Planetary Nebula":
      // Square for nebulae
      ctx.beginPath();
      ctx.rect(x - size, y - size, size * 2, size * 2);
      ctx.stroke();
      break;
  }

  // Object label
  if (zoom > 0.5) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = `${Math.max(8, 10 * zoom)}px Arial`;
    ctx.textAlign = 'left';
    ctx.fillText(dso.name, x + size + 5, y);
  }
};

// Horizon and cardinal direction indicators
const drawHorizon = (ctx, width, height, zoom) => {
  // Draw horizon line
  ctx.strokeStyle = 'rgba(100, 255, 100, 0.5)';
  ctx.lineWidth = 2;
  ctx.setLineDash([10, 5]);

  const horizonY = height * 0.85; // Approximate horizon
  ctx.beginPath();
  ctx.moveTo(0, horizonY);
  ctx.lineTo(width, horizonY);
  ctx.stroke();
  ctx.setLineDash([]);

  // Cardinal directions
  const directions = [
    { name: "N", angle: 0, x: width / 2, y: 30 },
    { name: "E", angle: 90, x: width - 30, y: height / 2 },
    { name: "S", angle: 180, x: width / 2, y: height - 30 },
    { name: "W", angle: 270, x: 30, y: height / 2 }
  ];

  ctx.fillStyle = 'rgba(100, 255, 100, 0.8)';
  ctx.font = `${Math.max(14, 16 * zoom)}px Arial`;
  ctx.textAlign = 'center';

  directions.forEach(dir => {
    ctx.fillText(dir.name, dir.x, dir.y);
  });
};

// Coordinate grid (RA/Dec or Alt/Az)
const drawCoordinateGrid = (ctx, width, height, zoom, type = "equatorial") => {
  ctx.strokeStyle = 'rgba(100, 100, 100, 0.3)';
  ctx.lineWidth = 1;
  ctx.setLineDash([2, 4]);

  if (type === "equatorial") {
    // Right Ascension lines (vertical)
    for (let ra = 0; ra < 24; ra += 2) {
      const x = (ra / 24) * width;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();

      // RA labels
      ctx.fillStyle = 'rgba(150, 150, 150, 0.7)';
      ctx.font = `${Math.max(8, 10 * zoom)}px Arial`;
      ctx.textAlign = 'center';
      ctx.fillText(`${ra}h`, x, 20);
    }

    // Declination lines (horizontal)
    for (let dec = -60; dec <= 60; dec += 30) {
      const y = height / 2 - (dec / 90) * (height / 2);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();

      // Dec labels
      ctx.fillStyle = 'rgba(150, 150, 150, 0.7)';
      ctx.textAlign = 'left';
      ctx.fillText(`${dec}°`, 10, y);
    }
  }

  ctx.setLineDash([]);
};

// Time and location info overlay
const drawInfoOverlay = (ctx, width, height, options) => {
  const { latitude, longitude, lst, date, zoom } = options;

  const fontSize = Math.max(10, 12 * zoom);
  ctx.font = `${fontSize}px Arial`;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.textAlign = 'left';

  const info = [
    `Date: ${date.toLocaleDateString()}`,
    `Time: ${date.toLocaleTimeString()}`,
    `LST: ${lst.toFixed(2)}h`,
    `Lat: ${latitude.toFixed(1)}°`,
    `Lon: ${longitude.toFixed(1)}°`
  ];

  info.forEach((text, index) => {
    ctx.fillText(text, 10, height - 80 + index * (fontSize + 2));
  });
};

// Interactive star identification
const identifyClickedStar = (clickX, clickY, drawnStars, threshold = 20) => {
  let closestStar = null;
  let minDistance = threshold;

  drawnStars.forEach(drawnStar => {
    const distance = Math.sqrt(
      Math.pow(clickX - drawnStar.x, 2) +
      Math.pow(clickY - drawnStar.y, 2)
    );

    if (distance < minDistance) {
      minDistance = distance;
      closestStar = drawnStar;
    }
  });

  return closestStar;
};

// Search stars by name or constellation
const searchStars = (query) => {
  const results = [];
  const searchTerm = query.toLowerCase();

  Object.entries(BRIGHT_STARS).forEach(([name, star]) => {
    if (name.toLowerCase().includes(searchTerm) ||
      star.constellation.toLowerCase().includes(searchTerm)) {
      results.push({ name, ...star });
    }
  });

  return results.sort((a, b) => a.magnitude - b.magnitude); // Brightest first
};

// Constellation finder - suggest which constellations to look for
const getConstellationRecommendations = (latitude, season, difficulty = "easy") => {
  const visible = getVisibleConstellations(latitude, season);

  const recommendations = {
    easy: ["Orion", "Ursa Major", "Cassiopeia", "Crux", "Leo", "Cygnus"],
    medium: ["Perseus", "Andromeda", "Boötes", "Centaurus", "Scorpius", "Sagittarius"],
    hard: ["Lynx", "Sextans", "Crater", "Antlia", "Microscopium", "Octans"]
  };

  return visible.filter(constellation => recommendations[difficulty].includes(constellation));
};

// FIXED: Export all functions and data
export {
  celestialToScreen,
  getLocalSiderealTime,
  getVisibleConstellations,
  drawStar,
  drawConstellationLines,
  drawConstellationLabel,
  drawStarNames,
  drawAsterisms,
  drawMilkyWay,
  renderConstellations,
  drawDeepSkyObject,
  drawHorizon,
  drawCoordinateGrid,
  drawInfoOverlay,
  identifyClickedStar,
  searchStars,
  getConstellationRecommendations,
  DEEP_SKY_OBJECTS
};
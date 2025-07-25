// solarSystemRenderer.js - MASSIVE DOME with rotation effect + full coverage

import { PLANETARY_DATA, PLANET_START_POSITIONS } from './solarSystemData.js';
import { BRIGHT_STARS, NAVIGATION_STARS, VARIABLE_STARS, calculateStarSize } from './constellationStars.js';
import { CONSTELLATION_LINES } from './constellationPatterns.js';

// MASSIVE DOME: Full 3D dome rotation + massive spread everywhere
const convertRADecToMassiveDome = (star, width, height, hemisphere, offset, dragRotation, zoom = 1) => {
  const { rightAscension, declination, magnitude } = star;
  
  if (rightAscension === undefined || declination === undefined) return null;
  
  // Convert RA/Dec to 3D spherical coordinates
  const raRadians = (rightAscension / 24) * 2 * Math.PI; // 0-2π
  const decRadians = (declination * Math.PI) / 180; // -π/2 to π/2
  
  // Apply drag rotation - DOME ROTATION EFFECT
  const rotatedRA = raRadians + (dragRotation.x * 0.003); // Smooth dome rotation
  const rotatedDec = Math.max(-Math.PI/2, Math.min(Math.PI/2, decRadians + (dragRotation.y * 0.003)));
  
  // MASSIVE DOME RADIUS - scales with zoom for full coverage
  const baseDomeRadius = Math.max(width, height) * 1.5; // Massive base size
  const domeRadius = baseDomeRadius * zoom; // Scales with zoom like planets
  
  // 3D DOME PROJECTION - converts sphere to screen coordinates
  // This creates the rotating dome effect you loved!
  const x3d = domeRadius * Math.cos(rotatedDec) * Math.cos(rotatedRA);
  const y3d = domeRadius * Math.cos(rotatedDec) * Math.sin(rotatedRA);
  const z3d = domeRadius * Math.sin(rotatedDec);
  
  // Project 3D dome to 2D screen - PRESERVES DOME ROTATION
  const screenX = width/2 + x3d;
  const screenY = height/2 + z3d; // Use Z for vertical (dome effect)
  
  // Apply hemisphere filter - DIFFERENT STARS for N/S
  let visible = true;
  if (hemisphere === 'northern' && declination < -30) {
    visible = false; // Hide deep southern stars
  } else if (hemisphere === 'southern' && declination > 30) {
    visible = false; // Hide deep northern stars
  }
  
  // EVEN MORE MASSIVE viewing area - stars distributed WAY beyond screen
  const massiveMargin = domeRadius * 3; // Increased range!
  
  return {
    x: screenX,
    y: screenY,
    magnitude: magnitude,
    visible: visible && screenX > -massiveMargin && screenX < width + massiveMargin && 
             screenY > -massiveMargin && screenY < height + massiveMargin
  };
};

// Draw star on massive rotating dome
const drawMassiveDomeStar = (ctx, star, position) => {
  if (!position || !position.visible) return null;
  
  const { x, y, magnitude } = position;
  
  // Calculate star size based on apparent magnitude
  const starSize = calculateStarSize(magnitude, 1);
  
  if (!starSize || starSize <= 0) return null;
  
  try {
    // Draw star glow
    const glowSize = starSize * 2;
    const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, glowSize);
    glowGradient.addColorStop(0, star.color || '#ffffff');
    glowGradient.addColorStop(0.5, (star.color || '#ffffff') + '80');
    glowGradient.addColorStop(1, 'transparent');
    
    ctx.fillStyle = glowGradient;
    ctx.beginPath();
    ctx.arc(x, y, glowSize, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw star core
    ctx.fillStyle = star.color || '#ffffff';
    ctx.beginPath();
    ctx.arc(x, y, starSize, 0, Math.PI * 2);
    ctx.fill();
    
    // Mark navigation stars
    if (NAVIGATION_STARS.includes(star.name)) {
      ctx.strokeStyle = '#00ff00';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(x, y, starSize + 2, 0, Math.PI * 2);
      ctx.stroke();
    }
    
    // Variable star indicator
    if (VARIABLE_STARS[star.name]) {
      ctx.strokeStyle = '#ff6600';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.arc(x, y, starSize + 3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    
    return { x, y, size: starSize, star };
    
  } catch (error) {
    console.warn(`Error drawing star ${star.name}:`, error);
    return null;
  }
};

// Draw constellation lines on massive dome
const drawMassiveDomeConstellationLines = (ctx, starPositions) => {
  ctx.strokeStyle = `rgba(100, 150, 255, 0.4)`;
  ctx.lineWidth = 1;
  ctx.setLineDash([]);
  
  let totalLinesDrawn = 0;
  
  Object.entries(CONSTELLATION_LINES).forEach(([constellation, pattern]) => {
    if (!pattern || !pattern.lines) return;
    
    pattern.lines.forEach(([start, end]) => {
      const star1 = pattern.stars[start];
      const star2 = pattern.stars[end];
      
      const pos1 = starPositions[star1];
      const pos2 = starPositions[star2];
      
      if (pos1 && pos2 && pos1.visible && pos2.visible) {
        // Check if line would be too long (dome wrapping)
        const distance = Math.sqrt(Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2));
        if (distance < 800) { // Only draw if stars are reasonably close on dome
          ctx.beginPath();
          ctx.moveTo(pos1.x, pos1.y);
          ctx.lineTo(pos2.x, pos2.y);
          ctx.stroke();
          totalLinesDrawn++;
        }
      }
    });
  });
  
  console.log(`🌟 Drew ${totalLinesDrawn} constellation lines on massive dome`);
};

// Draw constellation names on massive dome
const drawMassiveDomeConstellationNames = (ctx, starPositions) => {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.font = '14px Arial';
  ctx.textAlign = 'center';
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
  ctx.lineWidth = 2;

  Object.entries(CONSTELLATION_LINES).forEach(([constellation, pattern]) => {
    if (!pattern || !pattern.stars.length) return;

    // Find center point of constellation on dome
    let centerX = 0, centerY = 0, visibleCount = 0;

    pattern.stars.forEach(starName => {
      const pos = starPositions[starName];
      if (pos && pos.visible) {
        centerX += pos.x;
        centerY += pos.y;
        visibleCount++;
      }
    });

    if (visibleCount >= 2) { // Need at least 2 stars visible
      centerX /= visibleCount;
      centerY /= visibleCount;
      
      // Only draw names that are reasonably on screen
      if (centerX > -300 && centerX < ctx.canvas.width + 300 && 
          centerY > -300 && centerY < ctx.canvas.height + 300) {
        ctx.strokeText(constellation, centerX, centerY);
        ctx.fillText(constellation, centerX, centerY);
      }
    }
  });
};

// Draw star names on massive dome
const drawMassiveDomeStarNames = (ctx, starPositions) => {
  const fontSize = 12;
  ctx.font = `bold ${fontSize}px Arial`;
  ctx.textAlign = 'left';
  
  Object.entries(starPositions).forEach(([starName, position]) => {
    const star = BRIGHT_STARS[starName];
    if (!star || star.magnitude > 3.0 || !position.visible) return; // Only bright stars
    
    const { x, y } = position;
    
    // Only draw names that are reasonably on screen
    if (x > -200 && x < ctx.canvas.width + 200 && y > -200 && y < ctx.canvas.height + 200) {
      // Blue text with red glow
      ctx.shadowColor = '#FF0000';
      ctx.shadowBlur = 3;
      ctx.fillStyle = '#4A90E2';
      ctx.strokeStyle = '#FF0000';
      ctx.lineWidth = 3;
      
      ctx.strokeText(starName, x + 8, y - 8);
      ctx.fillText(starName, x + 8, y - 8);
      
      ctx.shadowBlur = 0;
    }
  });
};

// Get stars for specific hemisphere - REAL ASTRONOMICAL FILTERING
const getStarsForHemisphere = (hemisphere) => {
  const filtered = {};
  
  Object.entries(BRIGHT_STARS).forEach(([name, star]) => {
    if (hemisphere === 'northern') {
      // Northern hemisphere: primarily northern stars but include some southern ones near horizon
      if (star.declination > -30) {
        filtered[name] = star;
      }
    } else if (hemisphere === 'southern') {
      // Southern hemisphere: primarily southern stars but include some northern ones near horizon
      if (star.declination < 30) {
        filtered[name] = star;
      }
    } else {
      // Both hemispheres
      filtered[name] = star;
    }
  });
  
  return filtered;
};

// EXISTING PLANET FUNCTIONS - UNCHANGED
export const drawOrbits = (ctx, hemisphere) => {
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 1;
  
  const flipMultiplier = hemisphere === 'southern' ? -1 : 1;
  
  Object.entries(PLANETARY_DATA).forEach(([key, planet]) => {
    if (key !== 'sun' && planet.distance) {
      const radius = planet.distance * 0.5;
      ctx.save();
      
      ctx.scale(flipMultiplier, flipMultiplier);
      
      const inclinationRad = (planet.orbitalInclination * Math.PI) / 180;
      ctx.scale(1, Math.cos(inclinationRad));
      ctx.rotate(inclinationRad * 0.3);
      
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  });
};

export const drawSun = (ctx, hemisphere) => {
  const sunData = PLANETARY_DATA.sun;
  const flipMultiplier = hemisphere === 'southern' ? -1 : 1;
  
  ctx.save();
  ctx.scale(flipMultiplier, flipMultiplier);
  
  const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 18);
  glowGradient.addColorStop(0, sunData.glowColor);
  glowGradient.addColorStop(0.8, sunData.color);
  glowGradient.addColorStop(1, 'rgba(255, 165, 0, 0)');
  
  ctx.fillStyle = glowGradient;
  ctx.beginPath();
  ctx.arc(0, 0, 18, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.fillStyle = sunData.color;
  ctx.beginPath();
  ctx.arc(0, 0, 12, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2;
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 16px Arial';
  ctx.textAlign = 'center';
  ctx.strokeText(sunData.symbol, 0, 5);
  ctx.fillText(sunData.symbol, 0, 5);
  
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 1;
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 10px Arial';
  ctx.strokeText('Sun', 0, 35);
  ctx.fillText('Sun', 0, 35);
  
  ctx.restore();
};

export const drawPlanet = (ctx, planet, key, days, zoom, showPlanetNames = true, hemisphere = 'northern') => {
  if (!planet.distance) return;

  const startPos = PLANET_START_POSITIONS[key] || 0;
  const totalAngle = startPos + (days * planet.degreesPerDay);
  const angle = (totalAngle * Math.PI) / 180;
  const orbitRadius = planet.distance * 0.5;
  
  const flipMultiplier = hemisphere === 'southern' ? -1 : 1;
  const inclinationRad = (planet.orbitalInclination * Math.PI) / 180;
  
  const x = orbitRadius * Math.cos(angle) * flipMultiplier;
  const y = orbitRadius * Math.sin(angle) * Math.cos(inclinationRad) * flipMultiplier;
  const z = orbitRadius * Math.sin(angle) * Math.sin(inclinationRad) * flipMultiplier;

  const perspective = 1 + (z / orbitRadius) * 0.5;
  const displayX = x * perspective;
  const displayY = y * perspective;

  ctx.save();
  ctx.translate(displayX, displayY);

  const baseSize = Math.max(6, planet.diameter * 0.0001);
  const zoomAdjustedSize = baseSize * (2 / zoom);
  const size = Math.max(4, Math.min(zoomAdjustedSize, 20));
  
  const planetGradient = ctx.createRadialGradient(-size * 0.3, -size * 0.3, 0, 0, 0, size);
  planetGradient.addColorStop(0, lightenColor(planet.color, 0.3));
  planetGradient.addColorStop(0.7, planet.color);
  planetGradient.addColorStop(1, darkenColor(planet.color, 0.3));
  
  ctx.fillStyle = planetGradient;
  ctx.beginPath();
  ctx.arc(0, 0, size, 0, Math.PI * 2);
  ctx.fill();

  if (planet.rings) {
    ctx.save();
    ctx.rotate(inclinationRad * 0.5);
    
    const ringBands = [
      { radius: size * 1.8, width: 2, opacity: 0.9 },
      { radius: size * 2.2, width: 1.5, opacity: 0.7 },
      { radius: size * 2.6, width: 1, opacity: 0.5 }
    ];
    
    ringBands.forEach(band => {
      ctx.strokeStyle = `rgba(255, 255, 255, ${band.opacity})`;
      ctx.lineWidth = Math.max(0.5, band.width / zoom);
      ctx.beginPath();
      ctx.ellipse(0, 0, band.radius, band.radius * 0.3, 0, 0, Math.PI * 2);
      ctx.stroke();
    });
    
    ctx.restore();
  }

  const textSize = Math.max(10, 14 / zoom);
  const nameSize = Math.max(8, 10 / zoom);
  const textOffset = size + 18;

  ctx.save();
  ctx.shadowColor = '#ffffff';
  ctx.shadowBlur = 8;
  ctx.fillStyle = '#000000';
  ctx.font = `bold ${textSize}px Arial`;
  ctx.textAlign = 'center';
  ctx.fillText(planet.symbol, 0, size / 3);
  ctx.restore();

  if (showPlanetNames) {
    ctx.save();
    ctx.shadowColor = '#ffffff';
    ctx.shadowBlur = 4;
    ctx.fillStyle = '#000000';
    ctx.font = `${nameSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillText(planet.name, 0, textOffset);
    ctx.restore();
  }

  ctx.restore();

  planet.screenX = displayX;
  planet.screenY = displayY;
  planet.screenSize = size;
  planet.currentAngle = totalAngle % 360;

  return { x: displayX, y: displayY, angle: planet.currentAngle };
};

function lightenColor(color, amount) {
  const rgb = hexToRgb(color);
  return `rgb(${Math.min(255, rgb.r + amount * 255)}, ${Math.min(255, rgb.g + amount * 255)}, ${Math.min(255, rgb.b + amount * 255)})`;
}

function darkenColor(color, amount) {
  const rgb = hexToRgb(color);
  return `rgb(${Math.max(0, rgb.r - amount * 255)}, ${Math.max(0, rgb.g - amount * 255)}, ${Math.max(0, rgb.b - amount * 255)})`;
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 255, g: 255, b: 255 };
}

export const drawBackground = (ctx, width, height) => {
  // Pure transparent background - let the canvas show through
  ctx.clearRect(0, 0, width, height);
};

// MAIN FUNCTION: Massive rotating dome with full coverage
export const drawSolarSystem = (ctx, width, height, { 
  zoom, rotation, showOrbits, realTime, showAngles, showConstellations, 
  showStarNames = false, showPlanetNames = true, showConstellationNames = true,
  hemisphere = 'northern', constellationFilter = 'major', brightnessFilter = 'bright',
  offset = { x: 0, y: 0 }, visiblePlanets = []
}) => {
  drawBackground(ctx, width, height);
  
  // STEP 1: Draw massive rotating dome (stars) - DOME EFFECT + FULL COVERAGE + BOUNDARIES
  const starPositions = {};
  if (showConstellations) {
    console.log(`🌟 Drawing massive rotating dome for ${hemisphere} hemisphere with ${Object.keys(BRIGHT_STARS).length} stars...`);
    const estimatedTotal = 105;
    
    const visibleStars = getStarsForHemisphere(hemisphere);
    const dragRotation = { x: offset.x, y: offset.y }; // Convert drag to dome rotation
    
    Object.entries(visibleStars).forEach(([name, star]) => {
      try {
        // Massive dome with rotation effect + zoom scaling
        const position = convertRADecToMassiveDome(star, width, height, hemisphere, offset, dragRotation, zoom);
        if (position && position.visible) {
          const drawnStar = drawMassiveDomeStar(ctx, star, position);
          if (drawnStar) {
            starPositions[name] = position;
          }
        }
      } catch (error) {
        console.warn(`Failed to draw star ${name}:`, error);
      }
    });
    
    console.log(`🌟 Drew ${Object.keys(starPositions).length} stars on massive dome (${estimatedTotal}+ total) at zoom ${zoom.toFixed(2)}x`);
    
    // Draw constellation lines
    drawMassiveDomeConstellationLines(ctx, starPositions);
    
    // Draw constellation names
    if (showConstellationNames) {
      drawMassiveDomeConstellationNames(ctx, starPositions);
    }
    
    // Draw star names
    if (showStarNames) {
      drawMassiveDomeStarNames(ctx, starPositions);
    }
  }
  
  // STEP 2: Draw solar system (planets) - SAME ZOOM SYSTEM
  ctx.save();
  ctx.translate(width / 2, height / 2); 
  ctx.scale(zoom, zoom); // Same zoom as massive dome!
  ctx.rotate(rotation * Math.PI / 180);

  // Draw orbits
  if (showOrbits) {
    drawOrbits(ctx, hemisphere);
  }

  // Draw sun
  drawSun(ctx, hemisphere);

  // Draw planets
  const positions = { sun: { x: 0, y: 0, angle: 0 } };
  Object.entries(PLANETARY_DATA).forEach(([key, planet]) => {
    if (key !== 'sun') {
      const pos = drawPlanet(ctx, planet, key, realTime, zoom, showPlanetNames, hemisphere);
      if (pos) positions[key] = pos;
    }
  });

  ctx.restore();
  
  return positions;
};
// constellationMain.js - Main integration file for constellation system

import { BRIGHT_STARS, NAVIGATION_STARS, VARIABLE_STARS, MULTIPLE_STARS } from './constellationStars.js';
import { CONSTELLATION_LINES, HEMISPHERE_CONSTELLATIONS, SEASONAL_CONSTELLATIONS, ASTERISMS } from './constellationPatterns.js';
import { CONSTELLATION_MYTHOLOGY, CULTURAL_ASTRONOMY, MODERN_ASTRONOMY } from './constellationMythology.js';
import { 
  renderConstellations, 
  drawHorizon, 
  drawCoordinateGrid, 
  drawInfoOverlay,
  identifyClickedStar,
  searchStars,
  getConstellationRecommendations,
  DEEP_SKY_OBJECTS
} from './constellationRenderer.js';

// Main constellation system class
export class ConstellationSystem {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    
    // Default configuration
    this.config = {
      latitude: 40.7, // New York latitude as default
      longitude: -74.0, // New York longitude as default
      zoom: 1.0,
      showConstellationLines: true,
      showConstellationLabels: true,
      showStarNames: false,
      showAsterisms: false,
      showDeepSky: false,
      showMilkyWay: true,
      showHorizon: false,
      showGrid: false,
      showInfoOverlay: true,
      season: 'all',
      difficulty: 'easy',
      realTime: true,
      date: new Date(),
      ...options
    };
    
    this.drawnStars = [];
    this.starPositions = {};
    this.visibleConstellations = [];
    this.selectedStar = null;
    this.selectedConstellation = null;
    
    this.setupEventListeners();
  }
  
  // Update observer location
  setLocation(latitude, longitude) {
    this.config.latitude = latitude;
    this.config.longitude = longitude;
    this.render();
  }
  
  // Update observation time
  setTime(date) {
    this.config.date = date;
    this.config.realTime = false;
    this.render();
  }
  
  // Toggle real-time mode
  setRealTime(enabled) {
    this.config.realTime = enabled;
    if (enabled) {
      this.config.date = new Date();
    }
    this.render();
  }
  
  // Update zoom level
  setZoom(zoom) {
    this.config.zoom = Math.max(0.1, Math.min(5.0, zoom));
    this.render();
  }
  
  // Toggle display options
  toggleOption(option) {
    if (option in this.config) {
      this.config[option] = !this.config[option];
      this.render();
    }
  }
  
  // Set season filter
  setSeason(season) {
    this.config.season = season;
    this.render();
  }
  
  // Set difficulty level
  setDifficulty(difficulty) {
    this.config.difficulty = difficulty;
    this.render();
  }
  
  // Main render function
  render() {
    if (this.config.realTime) {
      this.config.date = new Date();
    }
    
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Dark sky background
    const gradient = this.ctx.createRadialGradient(
      this.canvas.width / 2, this.canvas.height / 2, 0,
      this.canvas.width / 2, this.canvas.height / 2, 
      Math.max(this.canvas.width, this.canvas.height)
    );
    gradient.addColorStop(0, '#001122');
    gradient.addColorStop(0.5, '#000811');
    gradient.addColorStop(1, '#000000');
    
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Render constellations
    const result = renderConstellations(this.ctx, this.canvas.width, this.canvas.height, {
      latitude: this.config.latitude,
      longitude: this.config.longitude,
      zoom: this.config.zoom,
      showLines: this.config.showConstellationLines,
      showLabels: this.config.showConstellationLabels,
      showStarNames: this.config.showStarNames,
      showAsterisms: this.config.showAsterisms,
      showMilkyWay: this.config.showMilkyWay,
      season: this.config.season,
      date: this.config.date
    });
    
    this.drawnStars = result.drawnStars;
    this.starPositions = result.starPositions;
    this.visibleConstellations = result.visibleConstellations;
    
    // Draw deep sky objects
    if (this.config.showDeepSky) {
      this.renderDeepSkyObjects();
    }
    
    // Draw horizon
    if (this.config.showHorizon) {
      drawHorizon(this.ctx, this.canvas.width, this.canvas.height, this.config.zoom);
    }
    
    // Draw coordinate grid
    if (this.config.showGrid) {
      drawCoordinateGrid(this.ctx, this.canvas.width, this.canvas.height, this.config.zoom);
    }
    
    // Draw info overlay
    if (this.config.showInfoOverlay) {
      drawInfoOverlay(this.ctx, this.canvas.width, this.canvas.height, {
        latitude: this.config.latitude,
        longitude: this.config.longitude,
        lst: result.lst,
        date: this.config.date,
        zoom: this.config.zoom
      });
    }
    
    // Highlight selected objects
    this.drawSelections();
  }
  
  // Render deep sky objects
  renderDeepSkyObjects() {
    Object.entries(DEEP_SKY_OBJECTS).forEach(([id, dso]) => {
      // Calculate position (simplified - would need proper coordinate transformation)
      const x = (dso.rightAscension / 24) * this.canvas.width;
      const y = this.canvas.height / 2 - (dso.declination / 90) * (this.canvas.height / 2);
      
      if (x >= 0 && x <= this.canvas.width && y >= 0 && y <= this.canvas.height) {
        drawDeepSkyObject(this.ctx, dso, { x, y, visible: true }, this.config.zoom);
      }
    });
  }
  
  // Draw selection highlights
  drawSelections() {
    // Highlight selected star
    if (this.selectedStar) {
      const { x, y, size } = this.selectedStar;
      this.ctx.strokeStyle = '#ffff00';
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.arc(x, y, size + 5, 0, Math.PI * 2);
      this.ctx.stroke();
    }
    
    // Highlight selected constellation
    if (this.selectedConstellation) {
      // Draw constellation with enhanced visibility
      const pattern = CONSTELLATION_LINES[this.selectedConstellation];
      if (pattern && pattern.lines) {
        this.ctx.strokeStyle = 'rgba(255, 255, 0, 0.8)';
        this.ctx.lineWidth = 3;
        
        pattern.lines.forEach(([start, end]) => {
          const star1 = pattern.stars[start];
          const star2 = pattern.stars[end];
          
          const pos1 = this.starPositions[star1];
          const pos2 = this.starPositions[star2];
          
          if (pos1 && pos2 && pos1.visible && pos2.visible) {
            this.ctx.beginPath();
            this.ctx.moveTo(pos1.x, pos1.y);
            this.ctx.lineTo(pos2.x, pos2.y);
            this.ctx.stroke();
          }
        });
      }
    }
  }
  
  // Event handlers
  setupEventListeners() {
    this.canvas.addEventListener('click', (event) => {
      this.handleClick(event);
    });
    
    this.canvas.addEventListener('wheel', (event) => {
      this.handleZoom(event);
    });
    
    // Auto-update in real-time mode
    setInterval(() => {
      if (this.config.realTime) {
        this.render();
      }
    }, 60000); // Update every minute
  }
  
  // Handle mouse clicks
  handleClick(event) {
    const rect = this.canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    
    // Try to identify clicked star
    const star = identifyClickedStar(clickX, clickY, this.drawnStars);
    
    if (star) {
      this.selectedStar = star;
      this.selectedConstellation = null;
      this.render();
      this.showStarInfo(star);
    } else {
      // Check if clicked on constellation
      this.checkConstellationClick(clickX, clickY);
    }
  }
  
  // Check if click is on a constellation
  checkConstellationClick(clickX, clickY) {
    // Simple proximity check to constellation centers
    this.visibleConstellations.forEach(constellation => {
      const pattern = CONSTELLATION_LINES[constellation];
      if (!pattern || !pattern.stars.length) return;
      
      // Calculate constellation center
      let centerX = 0, centerY = 0, count = 0;
      pattern.stars.forEach(starName => {
        const pos = this.starPositions[starName];
        if (pos && pos.visible) {
          centerX += pos.x;
          centerY += pos.y;
          count++;
        }
      });
      
      if (count > 0) {
        centerX /= count;
        centerY /= count;
        
        const distance = Math.sqrt(
          Math.pow(clickX - centerX, 2) + 
          Math.pow(clickY - centerY, 2)
        );
        
        if (distance < 50) { // 50px threshold
          this.selectedConstellation = constellation;
          this.selectedStar = null;
          this.render();
          this.showConstellationInfo(constellation);
        }
      }
    });
  }
  
  // Handle zoom
  handleZoom(event) {
    event.preventDefault();
    const delta = event.deltaY > 0 ? 0.9 : 1.1;
    this.setZoom(this.config.zoom * delta);
  }
  
  // Show star information
  showStarInfo(star) {
    const starData = BRIGHT_STARS[star.name];
    if (!starData) return;
    
    const info = {
      name: star.name,
      constellation: starData.constellation,
      magnitude: starData.magnitude,
      spectralClass: starData.spectralClass,
      rightAscension: `${starData.rightAscension.toFixed(2)}h`,
      declination: `${starData.declination.toFixed(2)}°`,
      isVariable: VARIABLE_STARS[star.name] ? true : false,
      isNavigation: NAVIGATION_STARS.includes(star.name),
      isMultiple: MULTIPLE_STARS[star.name] ? true : false
    };
    
    // Trigger custom event with star info
    this.canvas.dispatchEvent(new CustomEvent('starSelected', { detail: info }));
  }
  
  // Show constellation information
  showConstellationInfo(constellation) {
    const mythology = CONSTELLATION_MYTHOLOGY[constellation];
    const pattern = CONSTELLATION_LINES[constellation];
    
    const info = {
      name: constellation,
      stars: pattern ? pattern.stars : [],
      visibility: pattern ? pattern.visibility : 'unknown',
      season: pattern ? pattern.season : 'unknown',
      mythology: mythology || null,
      brightStars: pattern ? pattern.stars.filter(star => 
        BRIGHT_STARS[star] && BRIGHT_STARS[star].magnitude < 3.0
      ) : []
    };
    
    // Trigger custom event with constellation info
    this.canvas.dispatchEvent(new CustomEvent('constellationSelected', { detail: info }));
  }
  
  // Search functionality
  search(query) {
    return searchStars(query);
  }
  
  // Get constellation recommendations
  getRecommendations() {
    return getConstellationRecommendations(
      this.config.latitude, 
      this.config.season, 
      this.config.difficulty
    );
  }
  
  // Export current view as image
  exportImage() {
    return this.canvas.toDataURL('image/png');
  }
  
  // Get current configuration
  getConfig() {
    return { ...this.config };
  }
  
  // Reset to default configuration
  reset() {
    this.config = {
      latitude: 40.7,
      longitude: -74.0,
      zoom: 1.0,
      showConstellationLines: true,
      showConstellationLabels: true,
      showStarNames: false,
      showAsterisms: false,
      showDeepSky: false,
      showMilkyWay: true,
      showHorizon: false,
      showGrid: false,
      showInfoOverlay: true,
      season: 'all',
      difficulty: 'easy',
      realTime: true,
      date: new Date()
    };
    
    this.selectedStar = null;
    this.selectedConstellation = null;
    this.render();
  }
}

// Utility functions for integration
export const ConstellationUtils = {
  // Get user's geolocation
  async getUserLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          reject(error);
        }
      );
    });
  },
  
  // Convert coordinates between systems
  convertCoordinates(ra, dec, type = 'equatorial') {
    // Simplified coordinate conversion
    if (type === 'galactic') {
      // Convert to galactic coordinates (simplified)
      return { l: ra * 15, b: dec };
    }
    return { ra, dec };
  },
  
  // Calculate distance between two celestial objects
  angularDistance(ra1, dec1, ra2, dec2) {
    const dRA = (ra2 - ra1) * Math.PI / 12;
    const dDec = (dec2 - dec1) * Math.PI / 180;
    
    const a = Math.sin(dDec / 2) * Math.sin(dDec / 2) +
              Math.cos(dec1 * Math.PI / 180) * Math.cos(dec2 * Math.PI / 180) *
              Math.sin(dRA / 2) * Math.sin(dRA / 2);
    
    return 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 180 / Math.PI;
  },
  
  // Get current season based on date and hemisphere
  getCurrentSeason(date = new Date(), hemisphere = 'northern') {
    const month = date.getMonth();
    
    if (hemisphere === 'northern') {
      if (month >= 2 && month <= 4) return 'spring';
      if (month >= 5 && month <= 7) return 'summer';
      if (month >= 8 && month <= 10) return 'autumn';
      return 'winter';
    } else {
      if (month >= 2 && month <= 4) return 'autumn';
      if (month >= 5 && month <= 7) return 'winter';
      if (month >= 8 && month <= 10) return 'spring';
      return 'summer';
    }
  }
};

// Export everything
export {
  BRIGHT_STARS,
  CONSTELLATION_LINES,
  CONSTELLATION_MYTHOLOGY,
  DEEP_SKY_OBJECTS,
  ASTERISMS,
  HEMISPHERE_CONSTELLATIONS,
  SEASONAL_CONSTELLATIONS
};
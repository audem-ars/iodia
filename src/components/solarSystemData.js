// solarSystemData.js - All planetary data and calculations - ENHANCED

// Complete planetary data with REAL orbital periods and speeds
export const PLANETARY_DATA = {
  sun: {
    name: "Sun",
    symbol: "☉",
    diameter: 1392700,
    mass: 1.989e30,
    color: "#FFA500",
    glowColor: "#FFD700",
    rotationPeriod: 609.12,
    axialTilt: 7.25,
    type: "star",
    astrology: {
      nature: "Hot, Dry, Masculine, Diurnal Planet",
      dignities: "Leo (house), Aries (exaltation)",
      correspondences: "Gold, Heart, Nobility, Kings"
    }
  },
  mercury: {
    name: "Mercury",
    symbol: "☿",
    diameter: 4879,
    mass: 0.330e24,
    color: "#8C7853",
    distance: 80.0, // INCREASED from 57.9 to move it away from Sun
    orbitalPeriod: 88.0,
    rotationPeriod: 1407.6,
    orbitalVelocity: 47.4,
    orbitalInclination: 7.0,
    orbitalEccentricity: 0.206,
    axialTilt: 0.034,
    degreesPerDay: 360 / 88.0,
    astrology: {
      nature: "Cold and Dry, neither Masculine nor Feminine",
      dignities: "Gemini & Virgo (houses), Virgo 15° (exaltation)",
      correspondences: "Quicksilver, Brain, Merchants, Communication"
    }
  },
  venus: {
    name: "Venus",
    symbol: "♀",
    diameter: 12104,
    mass: 4.87e24,
    color: "#FFC649",
    distance: 108.2,
    orbitalPeriod: 224.7,
    rotationPeriod: -5832.5,
    orbitalVelocity: 35.0,
    orbitalInclination: 3.4,
    orbitalEccentricity: 0.007,
    axialTilt: 177.4,
    degreesPerDay: 360 / 224.7,
    astrology: {
      nature: "Cold and Moist, Feminine, Nocturnal",
      dignities: "Taurus & Libra (houses), Pisces 27° (exaltation)",
      correspondences: "Copper, Love, Artists, Beauty"
    }
  },
  earth: {
    name: "Earth",
    symbol: "♁",
    diameter: 12756,
    mass: 5.97e24,
    color: "#4A90E2",
    distance: 149.6,
    orbitalPeriod: 365.25,
    rotationPeriod: 23.9,
    orbitalVelocity: 29.8,
    orbitalInclination: 0.0,
    orbitalEccentricity: 0.017,
    axialTilt: 23.4,
    degreesPerDay: 360 / 365.25,
    astrology: {
      nature: "Reference plane for all calculations",
      dignities: "N/A (not used in traditional astrology)",
      correspondences: "Physical realm, Material plane"
    }
  },
  mars: {
    name: "Mars",
    symbol: "♂",
    diameter: 6792,
    mass: 0.642e24,
    color: "#CD5C5C",
    distance: 228.0,
    orbitalPeriod: 687.0,
    rotationPeriod: 24.6,
    orbitalVelocity: 24.1,
    orbitalInclination: 1.8,
    orbitalEccentricity: 0.094,
    axialTilt: 25.2,
    degreesPerDay: 360 / 687.0,
    astrology: {
      nature: "Hot and Dry, Masculine, Nocturnal",
      dignities: "Aries & Scorpio (houses), Capricorn 28° (exaltation)",
      correspondences: "Iron, Blood, Warriors, Conflict"
    }
  },
  jupiter: {
    name: "Jupiter",
    symbol: "♃",
    diameter: 142984,
    mass: 1898e24,
    color: "#D8CA9D",
    distance: 778.5,
    orbitalPeriod: 4331,
    rotationPeriod: 9.9,
    orbitalVelocity: 13.1,
    orbitalInclination: 1.3,
    orbitalEccentricity: 0.049,
    axialTilt: 3.1,
    degreesPerDay: 360 / 4331,
    astrology: {
      nature: "Hot and Moist, Masculine, Diurnal",
      dignities: "Sagittarius & Pisces (houses), Cancer (exaltation)",
      correspondences: "Tin, Liver, Priests, Expansion"
    }
  },
  saturn: {
    name: "Saturn",
    symbol: "♄",
    diameter: 120536,
    mass: 568e24,
    color: "#FAD5A5",
    distance: 1432.0,
    orbitalPeriod: 10747,
    rotationPeriod: 10.7,
    orbitalVelocity: 9.7,
    orbitalInclination: 2.5,
    orbitalEccentricity: 0.052,
    axialTilt: 26.7,
    rings: true,
    degreesPerDay: 360 / 10747,
    astrology: {
      nature: "Cold and Dry, Masculine, Diurnal",
      dignities: "Capricorn & Aquarius (houses), Libra (exaltation)",
      correspondences: "Lead, Spleen, Elders, Limitation"
    }
  },
  
  // NEWLY ADDED: Uranus & Neptune with real astronomical data
  uranus: {
    name: "Uranus",
    symbol: "♅",
    diameter: 51118,
    mass: 86.8e24,
    color: "#4FD0E3",
    distance: 2872.0, // Real distance in AU
    orbitalPeriod: 30687, // 84 Earth years
    rotationPeriod: -17.2, // Retrograde rotation
    orbitalVelocity: 6.8,
    orbitalInclination: 0.8,
    orbitalEccentricity: 0.046,
    axialTilt: 97.8, // Extreme tilt - rotates on its side!
    degreesPerDay: 360 / 30687,
    astrology: {
      nature: "Cold and Dry, Masculine, Revolutionary",
      dignities: "Aquarius (modern rulership)",
      correspondences: "Innovation, Rebellion, Sudden Change"
    }
  },
  
  neptune: {
    name: "Neptune", 
    symbol: "♆",
    diameter: 49528,
    mass: 102e24,
    color: "#4B70DD",
    distance: 4495.0, // Real distance in AU
    orbitalPeriod: 60190, // 165 Earth years
    rotationPeriod: 16.1,
    orbitalVelocity: 5.4,
    orbitalInclination: 1.8,
    orbitalEccentricity: 0.009,
    axialTilt: 28.3,
    degreesPerDay: 360 / 60190,
    astrology: {
      nature: "Cold and Moist, Feminine, Mystical",
      dignities: "Pisces (modern rulership)",
      correspondences: "Illusion, Dreams, Spirituality"
    }
  }
};

// Define starting positions for planets (where they were on J2000 epoch)
export const PLANET_START_POSITIONS = {
  mercury: 253.2, // degrees
  venus: 181.9,
  earth: 100.5,
  mars: 355.4,
  jupiter: 34.4,
  saturn: 46.4,
  uranus: 316.4, // Real J2000 position
  neptune: 304.3  // Real J2000 position
};

// Get current real-time planetary positions with proper starting positions
export function getCurrentDate() {
  const now = new Date();
  const epoch = new Date('2000-01-01T12:00:00Z');
  const daysSinceEpoch = (now - epoch) / (1000 * 60 * 60 * 24);
  return daysSinceEpoch;
}

// Get astrological aspect name
export const getAspectName = (degrees) => {
  if (degrees < 8) return "Conjunction";
  if (degrees >= 52 && degrees <= 68) return "Sextile";
  if (degrees >= 82 && degrees <= 98) return "Square";
  if (degrees >= 112 && degrees <= 128) return "Trine";
  if (degrees >= 172 && degrees <= 188) return "Opposition";
  return "No Major Aspect";
};

// Calculate planetary position for a given time
export const calculatePlanetPosition = (planetKey, days) => {
  const planet = PLANETARY_DATA[planetKey];
  if (!planet || !planet.degreesPerDay) return null;
  
  const startPos = PLANET_START_POSITIONS[planetKey] || 0;
  const totalAngle = startPos + (days * planet.degreesPerDay);
  return totalAngle % 360;
};

// Calculate aspect between two planets
export const calculateAspect = (planet1Key, planet2Key, days) => {
  const angle1 = calculatePlanetPosition(planet1Key, days);
  const angle2 = calculatePlanetPosition(planet2Key, days);
  
  if (angle1 === null || angle2 === null) return null;
  
  let angleDiff = Math.abs(angle1 - angle2);
  if (angleDiff > 180) angleDiff = 360 - angleDiff;
  
  return {
    angle: angleDiff,
    aspect: getAspectName(angleDiff),
    planet1: planet1Key,
    planet2: planet2Key,
    planet1Angle: angle1,
    planet2Angle: angle2
  };
};

// Get zodiac sign for degrees
export const getZodiacSign = (degrees) => {
  const zodiacSigns = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  const signIndex = Math.floor(degrees / 30);
  const degreeInSign = degrees % 30;
  return {
    sign: zodiacSigns[signIndex],
    degree: degreeInSign,
    formatted: `${zodiacSigns[signIndex]} ${degreeInSign.toFixed(1)}°`
  };
};
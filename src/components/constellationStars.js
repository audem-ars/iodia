// constellationStars.js - COMPLETE 83+ STAR CATALOG with ALL your stars + missing ones

export const BRIGHT_STARS = {
  // ORION CONSTELLATION - Complete
  "Betelgeuse": {
    name: "Betelgeuse",
    constellation: "Orion",
    rightAscension: 5.919,
    declination: 7.407,
    magnitude: 0.42,
    distance: 43000000, // 700 light-years in AU
    spectralClass: "M1-2Ia-Iab",
    color: "#ff6b47",
    hemisphere: "both"
  },
  "Rigel": {
    name: "Rigel",
    constellation: "Orion", 
    rightAscension: 5.242,
    declination: -8.202,
    magnitude: 0.13,
    distance: 53000000, // 860 light-years in AU
    spectralClass: "B8Ia",
    color: "#87ceeb",
    hemisphere: "both"
  },
  "Bellatrix": {
    name: "Bellatrix",
    constellation: "Orion",
    rightAscension: 5.418,
    declination: 6.350,
    magnitude: 1.64,
    distance: 1530000, // 25 light-years in AU
    spectralClass: "B2III",
    color: "#b0c4de",
    hemisphere: "both"
  },
  "Mintaka": {
    name: "Mintaka",
    constellation: "Orion",
    rightAscension: 5.533,
    declination: -0.299,
    magnitude: 2.23,
    distance: 37000000, // 600 light-years in AU
    spectralClass: "O9.5II",
    color: "#add8e6",
    hemisphere: "both"
  },
  "Alnilam": {
    name: "Alnilam", 
    constellation: "Orion",
    rightAscension: 5.603,
    declination: -1.202,
    magnitude: 1.70,
    distance: 123000000, // 2000 light-years in AU
    spectralClass: "B0Ia",
    color: "#b0e0e6",
    hemisphere: "both"
  },
  "Alnitak": {
    name: "Alnitak",
    constellation: "Orion", 
    rightAscension: 5.679,
    declination: -1.943,
    magnitude: 1.77,
    distance: 49000000, // 800 light-years in AU
    spectralClass: "O9.7Ib",
    color: "#add8e6",
    hemisphere: "both"
  },
  "Saiph": {
    name: "Saiph",
    constellation: "Orion",
    rightAscension: 5.796,
    declination: -9.670,
    magnitude: 2.09,
    distance: 40000000, // 650 light-years in AU
    spectralClass: "B0.5Ia",
    color: "#b0e0e6",
    hemisphere: "both"
  },

  // URSA MAJOR CONSTELLATION - Complete
  "Dubhe": {
    name: "Dubhe",
    constellation: "Ursa Major",
    rightAscension: 11.062,
    declination: 61.751,
    magnitude: 1.79,
    distance: 7600000, // 123 light-years in AU
    spectralClass: "K0III",
    color: "#ffb366",
    hemisphere: "northern"
  },
  "Merak": {
    name: "Merak",
    constellation: "Ursa Major",
    rightAscension: 11.031,
    declination: 56.383,
    magnitude: 2.37,
    distance: 4900000, // 79 light-years in AU
    spectralClass: "A1V",
    color: "#f8f8ff",
    hemisphere: "northern"
  },
  "Phecda": {
    name: "Phecda",
    constellation: "Ursa Major",
    rightAscension: 11.897,
    declination: 53.695,
    magnitude: 2.44,
    distance: 5200000, // 84 light-years in AU
    spectralClass: "A0V",
    color: "#ffffff",
    hemisphere: "northern"
  },
  "Megrez": {
    name: "Megrez",
    constellation: "Ursa Major",
    rightAscension: 12.258,
    declination: 57.033,
    magnitude: 3.31,
    distance: 5800000, // 94 light-years in AU
    spectralClass: "A3V",
    color: "#faf0e6",
    hemisphere: "northern"
  },
  "Alioth": {
    name: "Alioth",
    constellation: "Ursa Major",
    rightAscension: 12.901,
    declination: 55.960,
    magnitude: 1.77,
    distance: 5000000, // 81 light-years in AU
    spectralClass: "A1III-IV",
    color: "#f8f8ff",
    hemisphere: "northern"
  },
  "Mizar": {
    name: "Mizar",
    constellation: "Ursa Major",
    rightAscension: 13.420,
    declination: 54.925,
    magnitude: 2.04,
    distance: 5100000, // 83 light-years in AU
    spectralClass: "A2Vp",
    color: "#ffffff",
    hemisphere: "northern"
  },
  "Alkaid": {
    name: "Alkaid",
    constellation: "Ursa Major",
    rightAscension: 13.792,
    declination: 49.313,
    magnitude: 1.86,
    distance: 6200000, // 101 light-years in AU
    spectralClass: "B3V",
    color: "#b0c4de",
    hemisphere: "northern"
  },
  "Alcor": {
    name: "Alcor",
    constellation: "Ursa Major",
    rightAscension: 13.421,
    declination: 54.988,
    magnitude: 4.01,
    distance: 5100000, // 83 light-years in AU
    spectralClass: "A5V",
    color: "#ffffff",
    hemisphere: "northern"
  },

  // SOUTHERN CROSS - Complete
  "Acrux": {
    name: "Acrux",
    constellation: "Crux",
    rightAscension: 12.443,
    declination: -63.099,
    magnitude: 0.77,
    distance: 20000000, // 320 light-years in AU
    spectralClass: "B0.5IV",
    color: "#b0e0e6",
    hemisphere: "southern"
  },
  "Gacrux": {
    name: "Gacrux", 
    constellation: "Crux",
    rightAscension: 12.519,
    declination: -57.113,
    magnitude: 1.63,
    distance: 5400000, // 88 light-years in AU
    spectralClass: "M3.5III",
    color: "#ff6347",
    hemisphere: "southern"
  },
  "Becrux": {
    name: "Becrux",
    constellation: "Crux",
    rightAscension: 12.795,
    declination: -59.689,
    magnitude: 1.25,
    distance: 17000000, // 280 light-years in AU
    spectralClass: "B0.5III",
    color: "#add8e6",
    hemisphere: "southern"
  },
  "Decrux": {
    name: "Decrux",
    constellation: "Crux", 
    rightAscension: 12.267,
    declination: -58.749,
    magnitude: 2.80,
    distance: 23000000, // 370 light-years in AU
    spectralClass: "B2IV",
    color: "#b0c4de",
    hemisphere: "southern"
  },

  // BRIGHTEST STARS - Complete
  "Sirius": {
    name: "Sirius",
    constellation: "Canis Major",
    rightAscension: 6.752,
    declination: -16.716,
    magnitude: -1.46, // Brightest star
    distance: 530000, // 8.6 light-years in AU
    spectralClass: "A1V",
    color: "#ffffff",
    hemisphere: "both"
  },
  "Canopus": {
    name: "Canopus",
    constellation: "Carina",
    rightAscension: 6.400,
    declination: -52.696,
    magnitude: -0.74, // 2nd brightest
    distance: 19000000, // 310 light-years in AU
    spectralClass: "A9II",
    color: "#fff8dc",
    hemisphere: "southern"
  },
  "Arcturus": {
    name: "Arcturus",
    constellation: "Boötes", 
    rightAscension: 14.261,
    declination: 19.182,
    magnitude: -0.05, // 4th brightest
    distance: 2300000, // 37 light-years in AU
    spectralClass: "K1.5III",
    color: "#ffb366",
    hemisphere: "northern"
  },
  "Vega": {
    name: "Vega",
    constellation: "Lyra",
    rightAscension: 18.615,
    declination: 38.784,
    magnitude: 0.03, // 5th brightest
    distance: 1540000, // 25 light-years in AU
    spectralClass: "A0V",
    color: "#ffffff",
    hemisphere: "northern"
  },
  "Capella": {
    name: "Capella",
    constellation: "Auriga",
    rightAscension: 5.278,
    declination: 45.998,
    magnitude: 0.08, // 6th brightest
    distance: 2600000, // 42 light-years in AU
    spectralClass: "G5III",
    color: "#fff8dc",
    hemisphere: "northern"
  },
  "Procyon": {
    name: "Procyon",
    constellation: "Canis Minor",
    rightAscension: 7.655,
    declination: 5.225,
    magnitude: 0.34, // 8th brightest
    distance: 690000, // 11.2 light-years in AU
    spectralClass: "F5IV-V",
    color: "#fffaf0",
    hemisphere: "both"
  },
  "Achernar": {
    name: "Achernar",
    constellation: "Eridanus",
    rightAscension: 1.629,
    declination: -57.237,
    magnitude: 0.46, // 9th brightest
    distance: 8700000, // 139 light-years in AU
    spectralClass: "B6Vep",
    color: "#b0e0e6",
    hemisphere: "southern"
  },
  "Hadar": {
    name: "Hadar",
    constellation: "Centaurus",
    rightAscension: 14.064,
    declination: -60.373,
    magnitude: 0.61, // 10th brightest
    distance: 25000000, // 400 light-years in AU
    spectralClass: "B1III",
    color: "#add8e6",
    hemisphere: "southern"
  },

  // POLARIS - North Star
  "Polaris": {
    name: "Polaris",
    constellation: "Ursa Minor",
    rightAscension: 2.530,
    declination: 89.264,
    magnitude: 1.98,
    distance: 26000000, // 433 light-years in AU
    spectralClass: "F7Ib",
    color: "#fffaf0",
    hemisphere: "northern"
  },

  // ZODIAC CONSTELLATION STARS - Complete
  "Aldebaran": {
    name: "Aldebaran",
    constellation: "Taurus",
    rightAscension: 4.599,
    declination: 16.509,
    magnitude: 0.85,
    distance: 4000000, // 65 light-years in AU
    spectralClass: "K5III",
    color: "#ffb366",
    hemisphere: "both"
  },
  "Regulus": {
    name: "Regulus",
    constellation: "Leo",
    rightAscension: 10.140,
    declination: 11.967,
    magnitude: 1.35,
    distance: 4900000, // 79 light-years in AU
    spectralClass: "B7V",
    color: "#b0c4de",
    hemisphere: "both"
  },
  "Spica": {
    name: "Spica",
    constellation: "Virgo",
    rightAscension: 13.420,
    declination: -11.161,
    magnitude: 0.97,
    distance: 15000000, // 250 light-years in AU
    spectralClass: "B1III-IV",
    color: "#add8e6",
    hemisphere: "both"
  },
  "Antares": {
    name: "Antares",
    constellation: "Scorpius",
    rightAscension: 16.490,
    declination: -26.432,
    magnitude: 1.09,
    distance: 37000000, // 600 light-years in AU
    spectralClass: "M1.5Iab",
    color: "#ff6b47",
    hemisphere: "both"
  },
  "Altair": {
    name: "Altair",
    constellation: "Aquila",
    rightAscension: 19.846,
    declination: 8.868,
    magnitude: 0.77,
    distance: 1000000, // 16.7 light-years in AU
    spectralClass: "A7V",
    color: "#ffffff",
    hemisphere: "both"
  },
  "Fomalhaut": {
    name: "Fomalhaut",
    constellation: "Piscis Austrinus",
    rightAscension: 22.961,
    declination: -29.622,
    magnitude: 1.16,
    distance: 1500000, // 25 light-years in AU
    spectralClass: "A3V",
    color: "#ffffff",
    hemisphere: "both"
  },

  // CASSIOPEIA CONSTELLATION - Complete
  "Schedar": {
    name: "Schedar",
    constellation: "Cassiopeia", 
    rightAscension: 0.675,
    declination: 56.537,
    magnitude: 2.24,
    distance: 14000000, // 230 light-years in AU
    spectralClass: "K0IIIa",
    color: "#ffb366",
    hemisphere: "northern"
  },
  "Caph": {
    name: "Caph",
    constellation: "Cassiopeia",
    rightAscension: 0.153,
    declination: 59.150,
    magnitude: 2.28,
    distance: 3300000, // 54 light-years in AU
    spectralClass: "F2III-IV",
    color: "#fff8dc",
    hemisphere: "northern"
  },
  "Gamma Cassiopeiae": {
    name: "Gamma Cassiopeiae",
    constellation: "Cassiopeia",
    rightAscension: 0.945,
    declination: 60.717,
    magnitude: 2.47,
    distance: 34000000, // 550 light-years in AU
    spectralClass: "B0.5IVe",
    color: "#b0e0e6",
    hemisphere: "northern"
  },
  "Ruchbah": {
    name: "Ruchbah", 
    constellation: "Cassiopeia",
    rightAscension: 1.430,
    declination: 60.235,
    magnitude: 2.68,
    distance: 6100000, // 99 light-years in AU
    spectralClass: "A5V",
    color: "#ffffff",
    hemisphere: "northern"
  },
  "Segin": {
    name: "Segin",
    constellation: "Cassiopeia",
    rightAscension: 1.906,
    declination: 63.670,
    magnitude: 3.35,
    distance: 13000000, // 220 light-years in AU
    spectralClass: "B2V",
    color: "#b0c4de",
    hemisphere: "northern"
  },

  // CYGNUS CONSTELLATION - Complete
  "Deneb": {
    name: "Deneb",
    constellation: "Cygnus",
    rightAscension: 20.690,
    declination: 45.280,
    magnitude: 1.25,
    distance: 123000000, // 2000 light-years in AU
    spectralClass: "A2Ia", 
    color: "#ffffff",
    hemisphere: "northern"
  },
  "Sadr": {
    name: "Sadr",
    constellation: "Cygnus",
    rightAscension: 20.371,
    declination: 40.257,
    magnitude: 2.23,
    distance: 110000000, // 1800 light-years in AU
    spectralClass: "F8Ib",
    color: "#fff8dc",
    hemisphere: "northern"
  },
  "Albireo": {
    name: "Albireo", 
    constellation: "Cygnus",
    rightAscension: 19.513,
    declination: 27.960,
    magnitude: 3.05,
    distance: 25000000, // 400 light-years in AU
    spectralClass: "K3II",
    color: "#ffb366",
    hemisphere: "northern"
  },
  "Delta Cygni": {
    name: "Delta Cygni",
    constellation: "Cygnus",
    rightAscension: 19.749,
    declination: 45.131,
    magnitude: 2.86,
    distance: 10000000, // 165 light-years in AU
    spectralClass: "B9III",
    color: "#f8f8ff",
    hemisphere: "northern"
  },
  "Epsilon Cygni": {
    name: "Epsilon Cygni", 
    constellation: "Cygnus",
    rightAscension: 20.771,
    declination: 33.970,
    magnitude: 2.48,
    distance: 4500000, // 73 light-years in AU
    spectralClass: "K0III",
    color: "#ffb366",
    hemisphere: "northern"
  },

  // ARIES CONSTELLATION - Complete
  "Hamal": {
    name: "Hamal",
    constellation: "Aries",
    rightAscension: 2.119,
    declination: 23.462,
    magnitude: 2.01,
    distance: 4000000, // 66 light-years in AU
    spectralClass: "K2IIIb",
    color: "#ffb366",
    hemisphere: "northern"
  },
  "Sheratan": {
    name: "Sheratan",
    constellation: "Aries", 
    rightAscension: 1.911,
    declination: 20.808,
    magnitude: 2.64,
    distance: 3700000, // 60 light-years in AU
    spectralClass: "A5V",
    color: "#ffffff",
    hemisphere: "northern"
  },
  "Mesarthim": {
    name: "Mesarthim",
    constellation: "Aries",
    rightAscension: 1.884,
    declination: 19.294,
    magnitude: 3.86,
    distance: 10000000, // 164 light-years in AU
    spectralClass: "A0pSi",
    color: "#ffffff",
    hemisphere: "northern"
  },

  // LEO CONSTELLATION - Complete
  "Algieba": {
    name: "Algieba",
    constellation: "Leo",
    rightAscension: 10.333,
    declination: 19.841,
    magnitude: 2.08,
    distance: 7900000, // 130 light-years in AU
    spectralClass: "K1III",
    color: "#ffb366",
    hemisphere: "northern"
  },
  "Denebola": {
    name: "Denebola",
    constellation: "Leo",
    rightAscension: 11.818,
    declination: 14.572,
    magnitude: 2.14,
    distance: 2200000, // 36 light-years in AU
    spectralClass: "A3V",
    color: "#ffffff",
    hemisphere: "northern"
  },
  "Zosma": {
    name: "Zosma",
    constellation: "Leo",
    rightAscension: 11.237,
    declination: 20.524,
    magnitude: 2.56,
    distance: 3600000, // 58 light-years in AU
    spectralClass: "A4V",
    color: "#ffffff",
    hemisphere: "northern"
  },
  "Chertan": {
    name: "Chertan",
    constellation: "Leo",
    rightAscension: 11.237,
    declination: 15.429,
    magnitude: 3.33,
    distance: 10000000, // 165 light-years in AU
    spectralClass: "A3V",
    color: "#ffffff",
    hemisphere: "northern"
  },
  "Ras Elased Australis": {
    name: "Ras Elased Australis",
    constellation: "Leo",
    rightAscension: 9.764,
    declination: 23.774,
    magnitude: 2.98,
    distance: 14000000, // 230 light-years in AU
    spectralClass: "K2III",
    color: "#ffb366",
    hemisphere: "northern"
  },

  // TAURUS CONSTELLATION - Complete
  "Elnath": {
    name: "Elnath",
    constellation: "Taurus",
    rightAscension: 5.438,
    declination: 28.608,
    magnitude: 1.68,
    distance: 8000000, // 131 light-years in AU
    spectralClass: "B7III",
    color: "#b0c4de",
    hemisphere: "northern"
  },
  "Alcyone": {
    name: "Alcyone",
    constellation: "Taurus",
    rightAscension: 3.790,
    declination: 24.105,
    magnitude: 2.87,
    distance: 27000000, // 440 light-years in AU
    spectralClass: "B7IIIe",
    color: "#b0e0e6",
    hemisphere: "northern"
  },
  "Maia": {
    name: "Maia",
    constellation: "Taurus",
    rightAscension: 3.876,
    declination: 24.368,
    magnitude: 3.87,
    distance: 27000000, // 440 light-years in AU
    spectralClass: "B7III",
    color: "#b0c4de",
    hemisphere: "northern"
  },
  "Electra": {
    name: "Electra",
    constellation: "Taurus",
    rightAscension: 3.798,
    declination: 24.113,
    magnitude: 3.70,
    distance: 27000000, // 440 light-years in AU
    spectralClass: "B6IIIe",
    color: "#add8e6",
    hemisphere: "northern"
  },
  "Taygeta": {
    name: "Taygeta",
    constellation: "Taurus",
    rightAscension: 3.798,
    declination: 24.468,
    magnitude: 4.30,
    distance: 27000000, // 440 light-years in AU
    spectralClass: "B6V",
    color: "#b0c4de",
    hemisphere: "northern"
  },
  "Celaeno": {
    name: "Celaeno",
    constellation: "Taurus",
    rightAscension: 3.783,
    declination: 24.289,
    magnitude: 5.45,
    distance: 27000000, // 440 light-years in AU
    spectralClass: "B7IV",
    color: "#b0c4de",
    hemisphere: "northern"
  },
  "Sterope": {
    name: "Sterope",
    constellation: "Taurus",
    rightAscension: 3.761,
    declination: 24.537,
    magnitude: 5.76,
    distance: 27000000, // 440 light-years in AU
    spectralClass: "B8V",
    color: "#f8f8ff",
    hemisphere: "northern"
  },
  "Merope": {
    name: "Merope",
    constellation: "Taurus",
    rightAscension: 3.773,
    declination: 23.948,
    magnitude: 4.17,
    distance: 27000000, // 440 light-years in AU
    spectralClass: "B6IVev",
    color: "#b0e0e6",
    hemisphere: "northern"
  },

  // GEMINI CONSTELLATION - Complete
  "Castor": {
    name: "Castor",
    constellation: "Gemini",
    rightAscension: 7.576,
    declination: 31.888,
    magnitude: 1.57,
    distance: 3100000, // 51 light-years in AU
    spectralClass: "A1V",
    color: "#ffffff",
    hemisphere: "northern"
  },
  "Pollux": {
    name: "Pollux",
    constellation: "Gemini",
    rightAscension: 7.755,
    declination: 28.026,
    magnitude: 1.14,
    distance: 2100000, // 34 light-years in AU
    spectralClass: "K0III",
    color: "#ffb366",
    hemisphere: "northern"
  },
  "Alhena": {
    name: "Alhena",
    constellation: "Gemini",
    rightAscension: 6.628,
    declination: 16.399,
    magnitude: 1.93,
    distance: 6400000, // 105 light-years in AU
    spectralClass: "A0IV",
    color: "#ffffff",
    hemisphere: "northern"
  },
  "Mebsuta": {
    name: "Mebsuta",
    constellation: "Gemini",
    rightAscension: 6.383,
    declination: 22.513,
    magnitude: 3.06,
    distance: 55000000, // 900 light-years in AU
    spectralClass: "G8Ib",
    color: "#fff8dc",
    hemisphere: "northern"
  },
  "Mekbuda": {
    name: "Mekbuda",
    constellation: "Gemini",
    rightAscension: 7.064,
    declination: 20.570,
    magnitude: 3.78,
    distance: 75000000, // 1200 light-years in AU
    spectralClass: "F7Ib",
    color: "#fff8dc",
    hemisphere: "northern"
  },
  "Tejat": {
    name: "Tejat",
    constellation: "Gemini",
    rightAscension: 6.248,
    declination: 22.513,
    magnitude: 2.87,
    distance: 14000000, // 230 light-years in AU
    spectralClass: "M3III",
    color: "#ff6347",
    hemisphere: "northern"
  },

  // URSA MINOR CONSTELLATION - Complete
  "Kochab": {
    name: "Kochab",
    constellation: "Ursa Minor",
    rightAscension: 14.845,
    declination: 74.156,
    magnitude: 2.08,
    distance: 7900000, // 130 light-years in AU
    spectralClass: "K4III",
    color: "#ffb366",
    hemisphere: "northern"
  },
  "Pherkad": {
    name: "Pherkad",
    constellation: "Ursa Minor",
    rightAscension: 15.345,
    declination: 71.834,
    magnitude: 3.05,
    distance: 30000000, // 490 light-years in AU
    spectralClass: "A3II-III",
    color: "#ffffff",
    hemisphere: "northern"
  },
  "Yildun": {
    name: "Yildun",
    constellation: "Ursa Minor",
    rightAscension: 17.537,
    declination: 86.586,
    magnitude: 4.36,
    distance: 10000000, // 172 light-years in AU
    spectralClass: "A1Vn",
    color: "#ffffff",
    hemisphere: "northern"
  },
  "Urodelus": {
    name: "Urodelus",
    constellation: "Ursa Minor",
    rightAscension: 15.734,
    declination: 77.795,
    magnitude: 4.82,
    distance: 25000000, // 410 light-years in AU
    spectralClass: "K4III",
    color: "#ffb366",
    hemisphere: "northern"
  },
  "Ahfa al Farkadain": {
    name: "Ahfa al Farkadain",
    constellation: "Ursa Minor",
    rightAscension: 16.766,
    declination: 82.037,
    magnitude: 5.02,
    distance: 22000000, // 360 light-years in AU
    spectralClass: "A3V",
    color: "#ffffff",
    hemisphere: "northern"
  },
  "Anwar al Farkadain": {
    name: "Anwar al Farkadain",
    constellation: "Ursa Minor",
    rightAscension: 14.794,
    declination: 74.189,
    magnitude: 5.76,
    distance: 22000000, // 360 light-years in AU
    spectralClass: "A8V",
    color: "#fff8dc",
    hemisphere: "northern"
  },

  // ADDITIONAL BRIGHT STARS - Complete
  "Algol": {
    name: "Algol",
    constellation: "Perseus",
    rightAscension: 3.136,
    declination: 40.956,
    magnitude: 2.12,
    distance: 5500000, // 90 light-years in AU
    spectralClass: "B8V",
    color: "#f8f8ff",
    hemisphere: "northern"
  },
  "Mirfak": {
    name: "Mirfak",
    constellation: "Perseus",
    rightAscension: 3.405,
    declination: 49.861,
    magnitude: 1.79,
    distance: 35000000, // 590 light-years in AU
    spectralClass: "F5Ib",
    color: "#fff8dc",
    hemisphere: "northern"
  },
  "Sheliak": {
    name: "Sheliak",
    constellation: "Lyra",
    rightAscension: 18.835,
    declination: 33.363,
    magnitude: 3.45,
    distance: 58000000, // 960 light-years in AU
    spectralClass: "B7II",
    color: "#b0c4de",
    hemisphere: "northern"
  },
  "Sulafat": {
    name: "Sulafat",
    constellation: "Lyra",
    rightAscension: 18.982,
    declination: 32.690,
    magnitude: 3.24,
    distance: 38000000, // 620 light-years in AU
    spectralClass: "B9III",
    color: "#f8f8ff",
    hemisphere: "northern"
  },
  "Markab": {
    name: "Markab",
    constellation: "Pegasus",
    rightAscension: 23.079,
    declination: 15.205,
    magnitude: 2.49,
    distance: 8600000, // 140 light-years in AU
    spectralClass: "B9III",
    color: "#f8f8ff",
    hemisphere: "northern"
  },
  "Scheat": {
    name: "Scheat",
    constellation: "Pegasus",
    rightAscension: 23.063,
    declination: 28.083,
    magnitude: 2.42,
    distance: 12000000, // 196 light-years in AU
    spectralClass: "M2.5II-III",
    color: "#ff6347",
    hemisphere: "northern"
  },
  "Algenib": {
    name: "Algenib",
    constellation: "Pegasus",
    rightAscension: 0.220,
    declination: 15.184,
    magnitude: 2.83,
    distance: 24000000, // 390 light-years in AU
    spectralClass: "B2IV",
    color: "#b0c4de",
    hemisphere: "northern"
  },
  "Enif": {
    name: "Enif",
    constellation: "Pegasus",
    rightAscension: 21.736,
    declination: 9.875,
    magnitude: 2.38,
    distance: 42000000, // 690 light-years in AU
    spectralClass: "K2Ib",
    color: "#ffb366",
    hemisphere: "northern"
  },
  "Alpheratz": {
    name: "Alpheratz",
    constellation: "Andromeda",
    rightAscension: 0.140,
    declination: 29.091,
    magnitude: 2.06,
    distance: 6000000, // 97 light-years in AU
    spectralClass: "B8IVpMnHg",
    color: "#f8f8ff",
    hemisphere: "northern"
  },
  "Mirach": {
    name: "Mirach",
    constellation: "Andromeda",
    rightAscension: 1.162,
    declination: 35.621,
    magnitude: 2.05,
    distance: 12000000, // 197 light-years in AU
    spectralClass: "M0+IIIa",
    color: "#ff6347",
    hemisphere: "northern"
  },
  "Almach": {
    name: "Almach",
    constellation: "Andromeda",
    rightAscension: 2.065,
    declination: 42.330,
    magnitude: 2.26,
    distance: 22000000, // 350 light-years in AU
    spectralClass: "K3IIb",
    color: "#ffb366",
    hemisphere: "northern"
  },

  // MISSING STARS FROM CONSTELLATION PATTERNS - ADD ALL THE ONES YOU NEED
  "Acubens": {
    name: "Acubens",
    constellation: "Cancer",
    rightAscension: 8.975,
    declination: 11.858,
    magnitude: 4.25,
    distance: 10000000, // 174 light-years in AU
    spectralClass: "A5V",
    color: "#ffffff",
    hemisphere: "northern"
  },
  "Al Tarf": {
    name: "Al Tarf",
    constellation: "Cancer", 
    rightAscension: 8.273,
    declination: 9.186,
    magnitude: 3.52,
    distance: 18000000, // 290 light-years in AU
    spectralClass: "K4III",
    color: "#ffb366",
    hemisphere: "northern"
  },
  "Asellus Borealis": {
    name: "Asellus Borealis",
    constellation: "Cancer",
    rightAscension: 8.738,
    declination: 21.469,
    magnitude: 4.66,
    distance: 10000000, // 158 light-years in AU
    spectralClass: "A1V",
    color: "#ffffff",
    hemisphere: "northern"
  },
  "Asellus Australis": {
    name: "Asellus Australis",
    constellation: "Cancer",
    rightAscension: 8.721,
    declination: 18.154,
    magnitude: 3.94,
    distance: 8000000, // 136 light-years in AU
    spectralClass: "K0III",
    color: "#ffb366",
    hemisphere: "northern"
  },
  "Zubenelgenubi": {
    name: "Zubenelgenubi",
    constellation: "Libra",
    rightAscension: 14.849,
    declination: -16.042,
    magnitude: 2.75,
    distance: 4700000, // 77 light-years in AU
    spectralClass: "A3V",
    color: "#ffffff",
    hemisphere: "both"
  },
  "Zubeneschamali": {
    name: "Zubeneschamali", 
    constellation: "Libra",
    rightAscension: 15.283,
    declination: -9.383,
    magnitude: 2.61,
    distance: 11000000, // 185 light-years in AU
    spectralClass: "B8V",
    color: "#b0c4de",
    hemisphere: "both"
  },
  "Zubenelakrab": {
    name: "Zubenelakrab",
    constellation: "Libra",
    rightAscension: 15.592,
    declination: -29.778,
    magnitude: 3.29,
    distance: 23000000, // 377 light-years in AU
    spectralClass: "B9V",
    color: "#f8f8ff",
    hemisphere: "both"
  },
  "Shaula": {
    name: "Shaula",
    constellation: "Scorpius",
    rightAscension: 17.560,
    declination: -37.104,
    magnitude: 1.63,
    distance: 42000000, // 703 light-years in AU
    spectralClass: "B1.5V",
    color: "#add8e6",
    hemisphere: "both"
  },
  "Sargas": {
    name: "Sargas",
    constellation: "Scorpius",
    rightAscension: 17.622,
    declination: -42.998,
    magnitude: 1.87,
    distance: 16000000, // 270 light-years in AU
    spectralClass: "F1II",
    color: "#fff8dc",
    hemisphere: "both"
  },
  "Dschubba": {
    name: "Dschubba",
    constellation: "Scorpius",
    rightAscension: 16.005,
    declination: -22.622,
    magnitude: 2.32,
    distance: 24000000, // 400 light-years in AU
    spectralClass: "B0.3V",
    color: "#b0e0e6",
    hemisphere: "both"
  },
  "Pi Scorpii": {
    name: "Pi Scorpii",
    constellation: "Scorpius",
    rightAscension: 15.981,
    declination: -26.114,
    magnitude: 2.89,
    distance: 28000000, // 459 light-years in AU
    spectralClass: "B1V",
    color: "#add8e6",
    hemisphere: "both"
  },
  "Graffias": {
    name: "Graffias",
    constellation: "Scorpius",
    rightAscension: 16.085,
    declination: -19.805,
    magnitude: 2.62,
    distance: 26000000, // 530 light-years in AU
    spectralClass: "B1V",
    color: "#add8e6",
    hemisphere: "both"
  },
  "Iklil": {
    name: "Iklil",
    constellation: "Scorpius",
    rightAscension: 16.837,
    declination: -38.048,
    magnitude: 2.69,
    distance: 30000000, // 472 light-years in AU
    spectralClass: "B2IV",
    color: "#b0c4de",
    hemisphere: "both"
  },
  "Kaus Australis": {
    name: "Kaus Australis",
    constellation: "Sagittarius",
    rightAscension: 18.403,
    declination: -34.385,
    magnitude: 1.85,
    distance: 8700000, // 143 light-years in AU
    spectralClass: "B9.5III",
    color: "#f8f8ff",
    hemisphere: "both"
  },
  "Nunki": {
    name: "Nunki",
    constellation: "Sagittarius",
    rightAscension: 18.921,
    declination: -26.297,
    magnitude: 2.05,
    distance: 14000000, // 228 light-years in AU
    spectralClass: "B2.5V",
    color: "#b0c4de",
    hemisphere: "both"
  },
  "Ascella": {
    name: "Ascella",
    constellation: "Sagittarius",
    rightAscension: 19.166,
    declination: -29.880,
    magnitude: 2.60,
    distance: 5400000, // 88 light-years in AU
    spectralClass: "A2V",
    color: "#ffffff",
    hemisphere: "both"
  },
  "Kaus Media": {
    name: "Kaus Media",
    constellation: "Sagittarius",
    rightAscension: 18.349,
    declination: -29.828,
    magnitude: 2.70,
    distance: 5400000, // 88 light-years in AU
    spectralClass: "K3III",
    color: "#ffb366",
    hemisphere: "both"
  },
  "Kaus Borealis": {
    name: "Kaus Borealis",
    constellation: "Sagittarius", 
    rightAscension: 18.283,
    declination: -25.421,
    magnitude: 2.81,
    distance: 4800000, // 78 light-years in AU
    spectralClass: "K2III",
    color: "#ffb366",
    hemisphere: "both"
  },
  "Alnasl": {
    name: "Alnasl",
    constellation: "Sagittarius",
    rightAscension: 18.466,
    declination: -30.424,
    magnitude: 2.98,
    distance: 6100000, // 96 light-years in AU
    spectralClass: "K1III",
    color: "#ffb366",
    hemisphere: "both"
  },
  "Zavijava": {
    name: "Zavijava",
    constellation: "Virgo",
    rightAscension: 11.835,
    declination: 1.764,
    magnitude: 3.61,
    distance: 2200000, // 36 light-years in AU
    spectralClass: "F9V",
    color: "#fff8dc",
    hemisphere: "both"
  },
  "Porrima": {
    name: "Porrima",
    constellation: "Virgo",
    rightAscension: 12.694,
    declination: -1.449,
    magnitude: 2.74,
    distance: 2300000, // 38 light-years in AU
    spectralClass: "F0V",
    color: "#fff8dc",
    hemisphere: "both"
  },
  "Auva": {
    name: "Auva",
    constellation: "Virgo",
    rightAscension: 12.926,
    declination: -11.161,
    magnitude: 3.38,
    distance: 12000000, // 202 light-years in AU
    spectralClass: "M3III",
    color: "#ff6347",
    hemisphere: "both"
  },
  "Vindemiatrix": {
    name: "Vindemiatrix",
    constellation: "Virgo",
    rightAscension: 13.036,
    declination: 10.959,
    magnitude: 2.85,
    distance: 6600000, // 110 light-years in AU
    spectralClass: "G8III",
    color: "#fff8dc",
    hemisphere: "both"
  }
};

// HEMISPHERE FILTERING - REAL ASTRONOMICAL BASIS
export const getStarsForHemisphere = (hemisphere) => {
  const filtered = {};
  
  Object.entries(BRIGHT_STARS).forEach(([name, star]) => {
    // Real astronomical hemisphere division based on declination
    if (hemisphere === 'northern' && star.declination > -35) {
      filtered[name] = star;
    } else if (hemisphere === 'southern' && star.declination < 35) {
      filtered[name] = star;
    } else if (hemisphere === 'both') {
      filtered[name] = star;
    }
  });
  
  return filtered;
};

// FIXED COORDINATE SYSTEM - STARS AND PLANETS ON SAME PLANE
export const convertStarToScreenCoordinates = (star, earthPosition, offset, zoom, hemisphere) => {
  const { rightAscension, declination, distance } = star;
  
  // Validate inputs
  if (!rightAscension || !declination || !distance) {
    return null;
  }
  
  // Convert RA/Dec to radians
  const ra = rightAscension * (Math.PI / 12); // RA in hours to radians
  const dec = declination * (Math.PI / 180); // Dec in degrees to radians
  
  // Convert to 3D Cartesian coordinates (SAME SYSTEM AS PLANETS)
  const x = distance * Math.cos(dec) * Math.cos(ra);
  const y = distance * Math.cos(dec) * Math.sin(ra);
  const z = distance * Math.sin(dec);
  
  // Apply hemisphere view - FLIP ENTIRE COORDINATE SYSTEM
  const hemisphereMultiplier = hemisphere === 'southern' ? -1 : 1;
  const hemX = x * hemisphereMultiplier;
  const hemY = y * hemisphereMultiplier;
  const hemZ = z * hemisphereMultiplier;
  
  // Calculate relative position from Earth (viewing reference point)
  const relativeX = hemX - earthPosition.x;
  const relativeY = hemY - earthPosition.y;
  const relativeZ = hemZ - earthPosition.z;
  
  // Apply perspective projection (minimal for stars due to distance)
  const distance3D = Math.sqrt(relativeX * relativeX + relativeY * relativeY + relativeZ * relativeZ);
  const perspective = 1 + (relativeZ / distance3D) * 0.0001; // Minimal perspective
  
  // CRITICAL: Use SAME scaling as planets but much smaller for background effect
  const STAR_SCALE = 0.00005; // Stars are distant background
  const screenX = (relativeX * STAR_SCALE) * perspective;
  const screenY = (relativeY * STAR_SCALE) * perspective;
  
  // APPLY DRAG OFFSET - SAME AS PLANETS
  const finalX = screenX + offset.x * 0.1; // Stars move slightly with drag
  const finalY = screenY + offset.y * 0.1;
  
  return {
    x: finalX,
    y: finalY,
    distance: distance3D,
    visible: true
  };
};

// HEMISPHERE CONTROLS - PLANET AND STAR VIEWS
export const HEMISPHERE_VIEWS = {
  northern: {
    description: "Northern Hemisphere view - planets and stars from above ecliptic",
    planetViewMultiplier: 1,      // Normal planet view
    starViewMultiplier: 1,        // Normal star view
    visibleStars: (star) => star.declination > -35,
    buttonText: "Northern ↑"
  },
  southern: {
    description: "Southern Hemisphere view - planets and stars from below ecliptic", 
    planetViewMultiplier: -1,     // Flip planet view
    starViewMultiplier: -1,       // Flip star view
    visibleStars: (star) => star.declination < 35,
    buttonText: "Southern ↓"
  }
};

// MAGNITUDE TO SIZE CONVERSION - APPARENT BRIGHTNESS
export const calculateStarSize = (magnitude, zoom = 1) => {
  // Real apparent magnitude to visual size
  // Brighter stars (lower magnitude) = larger size
  const baseSize = Math.max(0.5, 6 - magnitude);
  // Stars barely change size with zoom (they're infinitely far)
  const zoomAdjusted = baseSize * (0.3 / Math.max(0.1, zoom));
  return Math.max(0.3, zoomAdjusted);
};

// DISTANCE SCALE COMPARISON - SHOWS THE REAL PROBLEM FIXED
export const DISTANCE_REALITY_CHECK = {
  // SOLAR SYSTEM DISTANCES (AU) - What we see close up
  "Sun": 0,
  "Mercury": 58,
  "Venus": 108,
  "Earth": 150,
  "Mars": 228,
  "Jupiter": 778,
  "Saturn": 1434,
  "Uranus": 2867,
  "Neptune": 4495, // ← Neptune position
  
  // STELLAR DISTANCES (AU) - Background stars
  "Sirius (closest)": 530000,    // 117x farther than Neptune
  "Procyon": 690000,             // 153x farther than Neptune
  "Vega": 1540000,               // 341x farther than Neptune
  "Betelgeuse": 43000000,        // 9,534x farther than Neptune
  "Rigel": 53000000,             // 11,747x farther than Neptune
  
  // FIXED SCALE FACTORS
  "Planet scale": 1.0,           // Normal scale for planets
  "Star scale": 0.00005,         // 1/20,000 scale for stars = distant background
  "Drag coordination": "SAME",   // Both use same offset system
  "Hemisphere flip": "BOTH"      // Both flip together
};

// NAVIGATION STARS - Used in celestial navigation
export const NAVIGATION_STARS = [
  "Sirius", "Canopus", "Arcturus", "Vega", "Capella", "Rigel", 
  "Procyon", "Achernar", "Betelgeuse", "Hadar", "Altair", 
  "Aldebaran", "Antares", "Spica", "Pollux", "Fomalhaut",
  "Deneb", "Regulus", "Polaris"
];

// VARIABLE STARS - Stars that change brightness
export const VARIABLE_STARS = {
  "Betelgeuse": { period: "semi-regular", range: [0.0, 1.6] },
  "Antares": { period: "semi-regular", range: [0.6, 1.6] },
  "Algol": { period: 2.87, range: [2.1, 3.4] }
};

// EXPORT EVERYTHING
export default BRIGHT_STARS;
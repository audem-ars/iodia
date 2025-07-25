// constellationPatterns.js - Star-to-star line connections for all 88 IAU constellations

// Line patterns show which stars connect to form constellation shapes
// Array indices refer to star positions in each constellation's star list

export const CONSTELLATION_LINES = {
  // ZODIAC CONSTELLATIONS (12) - Visible worldwide throughout the year
  "Aries": {
    stars: ["Hamal", "Sheratan", "Mesarthim"],
    lines: [[0, 1], [1, 2]], // Simple line from Hamal to Sheratan to Mesarthim
    visibility: "both", // Northern and Southern hemispheres
    season: "autumn"
  },
  
  "Taurus": {
    stars: ["Aldebaran", "Elnath", "Alcyone", "Maia", "Electra", "Taygeta", "Celaeno", "Sterope", "Merope"],
    lines: [[0, 1], [0, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8]], // V-shape with Pleiades
    visibility: "both",
    season: "winter"
  },
  
  "Gemini": {
    stars: ["Castor", "Pollux", "Alhena", "Mebsuta", "Mekbuda", "Tejat"],
    lines: [[0, 1], [0, 2], [1, 3], [2, 4], [4, 5]], // Twin figures
    visibility: "both", 
    season: "winter"
  },
  
  "Cancer": {
    stars: ["Acubens", "Al Tarf", "Asellus Borealis", "Asellus Australis"],
    lines: [[0, 1], [2, 3]], // Y-shape with the two donkeys
    visibility: "both",
    season: "spring"
  },
  
  "Leo": {
    stars: ["Regulus", "Algieba", "Zosma", "Chertan", "Denebola", "Ras Elased Australis"],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [0, 5]], // Lion shape with mane
    visibility: "both",
    season: "spring"
  },
  
  "Virgo": {
    stars: ["Spica", "Zavijava", "Porrima", "Auva", "Vindemiatrix"],
    lines: [[0, 1], [1, 2], [2, 3], [1, 4]], // Y-shape with Spica at bottom
    visibility: "both",
    season: "spring"
  },
  
  "Libra": {
    stars: ["Zubenelgenubi", "Zubeneschamali", "Zubenelakrab"],
    lines: [[0, 1], [1, 2]], // Balance scales
    visibility: "both",
    season: "summer"
  },
  
  "Scorpius": {
    stars: ["Antares", "Shaula", "Sargas", "Dschubba", "Pi Scorpii", "Graffias", "Iklil"],
    lines: [[0, 1], [1, 2], [0, 3], [3, 4], [4, 5], [5, 6]], // Scorpion with curved tail
    visibility: "both",
    season: "summer"
  },
  
  "Sagittarius": {
    stars: ["Kaus Australis", "Nunki", "Ascella", "Kaus Media", "Kaus Borealis", "Alnasl"],
    lines: [[0, 1], [1, 2], [0, 3], [3, 4], [4, 5]], // Archer's bow
    visibility: "both",
    season: "summer"
  },
  
  "Capricornus": {
    stars: ["Deneb Algedi", "Dabih", "Nash", "Giedi"],
    lines: [[0, 1], [1, 2], [2, 3]], // Sea-goat shape
    visibility: "both",
    season: "autumn"
  },
  
  "Aquarius": {
    stars: ["Sadalsuud", "Sadalmelik", "Skat", "Sadachbia"],
    lines: [[0, 1], [1, 2], [2, 3]], // Water bearer
    visibility: "both", 
    season: "autumn"
  },
  
  "Pisces": {
    stars: ["Alrescha", "Fumalsamakah", "Revati", "Torcular"],
    lines: [[0, 1], [0, 2], [2, 3]], // Two fish connected
    visibility: "both",
    season: "autumn"
  },

  // NORTHERN HEMISPHERE CONSTELLATIONS
  "Ursa Major": {
    stars: ["Dubhe", "Merak", "Phecda", "Megrez", "Alioth", "Mizar", "Alkaid"],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [3, 0]], // Big Dipper
    visibility: "northern",
    season: "spring"
  },
  
  "Ursa Minor": {
    stars: ["Polaris", "Kochab", "Pherkad", "Yildun", "Urodelus", "Ahfa al Farkadain", "Anwar al Farkadain"],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0]], // Little Dipper
    visibility: "northern",
    season: "year-round"
  },
  
  "Cassiopeia": {
    stars: ["Schedar", "Caph", "Gamma Cassiopeiae", "Ruchbah", "Segin"],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4]], // W-shape
    visibility: "northern",
    season: "autumn"
  },
  
  "Cepheus": {
    stars: ["Alderamin", "Alfirk", "Alrai", "Delta Cephei", "Mu Cephei"],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]], // House shape
    visibility: "northern",
    season: "autumn"
  },
  
  "Draco": {
    stars: ["Thuban", "Rastaban", "Eltanin", "Altais", "Aldhibah", "Edasich", "Arrakis"],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]], // Winding dragon
    visibility: "northern",
    season: "summer"
  },
  
  "Cygnus": {
    stars: ["Deneb", "Sadr", "Albireo", "Delta Cygni", "Epsilon Cygni"],
    lines: [[0, 1], [1, 2], [1, 3], [1, 4]], // Northern Cross
    visibility: "northern",
    season: "summer"
  },
  
  "Lyra": {
    stars: ["Vega", "Sheliak", "Sulafat", "Delta Lyrae"],
    lines: [[0, 1], [1, 2], [2, 3], [3, 0]], // Small harp
    visibility: "northern",
    season: "summer"
  },
  
  "Aquila": {
    stars: ["Altair", "Tarazed", "Okab", "Alshain"],
    lines: [[0, 1], [0, 2], [0, 3]], // Eagle with spread wings
    visibility: "both",
    season: "summer"
  },
  
  "Orion": {
    stars: ["Betelgeuse", "Rigel", "Bellatrix", "Mintaka", "Alnilam", "Alnitak", "Saiph"],
    lines: [[0, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 1], [1, 0], [0, 4], [2, 6]], // Hunter figure
    visibility: "both",
    season: "winter"
  },

  // SOUTHERN HEMISPHERE CONSTELLATIONS
  "Crux": {
    stars: ["Acrux", "Gacrux", "Becrux", "Decrux"],
    lines: [[0, 1], [2, 3]], // Southern Cross
    visibility: "southern",
    season: "year-round"
  },
  
  "Centaurus": {
    stars: ["Rigil Kent", "Hadar", "Menkent", "Alnair", "Ma Wei"],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4]], // Centaur figure
    visibility: "southern", 
    season: "spring"
  },
  
  "Carina": {
    stars: ["Canopus", "Miaplacidus", "Avior", "Aspidiske"],
    lines: [[0, 1], [1, 2], [2, 3]], // Ship's keel
    visibility: "southern",
    season: "winter"
  },
  
  "Vela": {
    stars: ["Regor", "Alsuhail", "Markeb", "Koo She"],
    lines: [[0, 1], [1, 2], [2, 3]], // Ship's sails
    visibility: "southern",
    season: "winter"
  },
  
  "Puppis": {
    stars: ["Naos", "Rho Puppis", "Xi Puppis", "Pi Puppis"],
    lines: [[0, 1], [1, 2], [2, 3]], // Ship's stern
    visibility: "southern",
    season: "winter"
  },
  
  "Canis Major": {
    stars: ["Sirius", "Adhara", "Wezen", "Mirzam", "Aludra"],
    lines: [[0, 1], [0, 2], [0, 3], [1, 4]], // Great Dog
    visibility: "both",
    season: "winter"
  },
  
  "Canis Minor": {
    stars: ["Procyon", "Gomeisa"],
    lines: [[0, 1]], // Little Dog
    visibility: "both",
    season: "winter"
  },

  // ADDITIONAL NORTHERN CONSTELLATIONS
  "Perseus": {
    stars: ["Mirfak", "Algol", "Atik", "Miram"],
    lines: [[0, 1], [0, 2], [0, 3]], // Perseus holding Medusa's head
    visibility: "northern",
    season: "autumn"
  },
  
  "Andromeda": {
    stars: ["Alpheratz", "Mirach", "Almach", "Sadiradra"],
    lines: [[0, 1], [1, 2], [2, 3]], // Chained princess
    visibility: "northern",
    season: "autumn"
  },
  
  "Pegasus": {
    stars: ["Markab", "Scheat", "Algenib", "Enif"],
    lines: [[0, 1], [1, 2], [2, 3], [3, 0]], // Great Square of Pegasus
    visibility: "northern",
    season: "autumn"
  },
  
  "Boötes": {
    stars: ["Arcturus", "Nekkar", "Seginus", "Izar"],
    lines: [[0, 1], [1, 2], [2, 3]], // Herdsman
    visibility: "northern",
    season: "spring"
  },
  
  "Corona Borealis": {
    stars: ["Alphecca", "Nusakan", "Theta CrB", "Beta CrB"],
    lines: [[0, 1], [1, 2], [2, 3]], // Northern Crown
    visibility: "northern",
    season: "summer"
  },
  
  "Hercules": {
    stars: ["Kornephoros", "Zeta Her", "Pi Her", "Eta Her", "Delta Her"],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4]], // Kneeling hero
    visibility: "northern",
    season: "summer"
  },
  
  "Ophiuchus": {
    stars: ["Rasalhague", "Cebalrai", "Yed Prior", "Yed Posterior"],
    lines: [[0, 1], [1, 2], [2, 3]], // Serpent bearer
    visibility: "both",
    season: "summer"
  },

  // ADDITIONAL SOUTHERN CONSTELLATIONS  
  "Eridanus": {
    stars: ["Achernar", "Cursa", "Zaurak", "Rana", "Azha"],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4]], // River
    visibility: "both",
    season: "winter"
  },
  
  "Hydra": {
    stars: ["Alphard", "Gamma Hya", "Zeta Hya", "Nu Hya", "Pi Hya"],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4]], // Water serpent - longest constellation
    visibility: "both",
    season: "spring"
  },
  
  "Corvus": {
    stars: ["Gienah", "Kraz", "Algorab", "Minkar"],
    lines: [[0, 1], [1, 2], [2, 3], [3, 0]], // Crow/Raven quadrilateral
    visibility: "both",
    season: "spring"
  },
  
  "Crater": {
    stars: ["Alkes", "Delta Crt", "Gamma Crt", "Zeta Crt"],
    lines: [[0, 1], [1, 2], [2, 3]], // Cup
    visibility: "both",
    season: "spring"
  },
  
  "Lupus": {
    stars: ["Men", "Ke Kwan", "Pi Lup", "Delta Lup"],
    lines: [[0, 1], [1, 2], [2, 3]], // Wolf
    visibility: "southern",
    season: "summer"
  },
  
  "Ara": {
    stars: ["Choo", "Beta Ara", "Gamma Ara", "Delta Ara"],
    lines: [[0, 1], [1, 2], [2, 3]], // Altar
    visibility: "southern",
    season: "summer"
  },
  
  "Corona Australis": {
    stars: ["Alfecca Meridiana", "Beta CrA", "Gamma CrA", "Delta CrA"],
    lines: [[0, 1], [1, 2], [2, 3]], // Southern Crown
    visibility: "southern",
    season: "summer"
  },
  
  "Piscis Austrinus": {
    stars: ["Fomalhaut", "Epsilon PsA", "Delta PsA", "Beta PsA"],
    lines: [[0, 1], [1, 2], [2, 3]], // Southern Fish
    visibility: "both",
    season: "autumn"
  },
  
  "Grus": {
    stars: ["Alnair", "Beta Gru", "Gamma Gru", "Delta Gru"],
    lines: [[0, 1], [1, 2], [2, 3]], // Crane
    visibility: "southern",
    season: "autumn"
  },
  
  "Phoenix": {
    stars: ["Ankaa", "Beta Phe", "Gamma Phe", "Delta Phe"],
    lines: [[0, 1], [1, 2], [2, 3]], // Phoenix
    visibility: "southern",
    season: "autumn"
  },
  
  "Tucana": {
    stars: ["Alpha Tuc", "Gamma Tuc", "Zeta Tuc", "Beta Tuc"],
    lines: [[0, 1], [1, 2], [2, 3]], // Toucan
    visibility: "southern",
    season: "autumn"
  },
  
  "Indus": {
    stars: ["The Persian", "Beta Ind", "Delta Ind", "Theta Ind"],
    lines: [[0, 1], [1, 2], [2, 3]], // Indian
    visibility: "southern",
    season: "autumn"
  },
  
  "Pavo": {
    stars: ["Peacock", "Beta Pav", "Delta Pav", "Eta Pav"],
    lines: [[0, 1], [1, 2], [2, 3]], // Peacock
    visibility: "southern",
    season: "summer"
  },
  
  "Apus": {
    stars: ["Alpha Aps", "Beta Aps", "Gamma Aps", "Delta Aps"],
    lines: [[0, 1], [1, 2], [2, 3]], // Bird of Paradise
    visibility: "southern",
    season: "summer"
  },
  
  "Triangulum Australe": {
    stars: ["Atria", "Beta TrA", "Gamma TrA"],
    lines: [[0, 1], [1, 2], [2, 0]], // Southern Triangle
    visibility: "southern",
    season: "summer"
  },
  
  "Musca": {
    stars: ["Alpha Mus", "Beta Mus", "Delta Mus", "Gamma Mus"],
    lines: [[0, 1], [1, 2], [2, 3]], // Fly
    visibility: "southern",
    season: "spring"
  },
  
  "Chamaeleon": {
    stars: ["Alpha Cha", "Beta Cha", "Gamma Cha", "Delta Cha"],
    lines: [[0, 1], [1, 2], [2, 3]], // Chameleon
    visibility: "southern",
    season: "spring"
  },
  
  "Volans": {
    stars: ["Alpha Vol", "Beta Vol", "Gamma Vol", "Delta Vol"],
    lines: [[0, 1], [1, 2], [2, 3]], // Flying Fish
    visibility: "southern",
    season: "winter"
  },
  
  "Dorado": {
    stars: ["Alpha Dor", "Beta Dor", "Gamma Dor", "Delta Dor"],
    lines: [[0, 1], [1, 2], [2, 3]], // Dolphinfish
    visibility: "southern",
    season: "winter"
  },
  
  "Pictor": {
    stars: ["Alpha Pic", "Beta Pic", "Gamma Pic", "Delta Pic"],
    lines: [[0, 1], [1, 2], [2, 3]], // Painter's Easel
    visibility: "southern",
    season: "winter"
  },
  
  "Columba": {
    stars: ["Phact", "Wazn", "Gamma Col", "Delta Col"],
    lines: [[0, 1], [1, 2], [2, 3]], // Dove
    visibility: "both",
    season: "winter"
  },
  
  "Lepus": {
    stars: ["Arneb", "Nihal", "Gamma Lep", "Delta Lep"],
    lines: [[0, 1], [1, 2], [2, 3]], // Hare
    visibility: "both",
    season: "winter"
  },
  
  "Monoceros": {
    stars: ["Alpha Mon", "Beta Mon", "Gamma Mon", "Delta Mon"],
    lines: [[0, 1], [1, 2], [2, 3]], // Unicorn
    visibility: "both",
    season: "winter"
  },

  // REMAINING NORTHERN CONSTELLATIONS
  "Auriga": {
    stars: ["Capella", "Menkalinan", "Mahasim", "Almaaz", "Haedus"],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]], // Charioteer pentagon
    visibility: "northern",
    season: "winter"
  },
  
  "Lynx": {
    stars: ["Alpha Lyn", "Beta Lyn", "Gamma Lyn", "Delta Lyn"],
    lines: [[0, 1], [1, 2], [2, 3]], // Lynx
    visibility: "northern",
    season: "winter"
  },
  
  "Cancer": {
    stars: ["Acubens", "Al Tarf", "Asellus Borealis", "Asellus Australis"],
    lines: [[0, 1], [2, 3]], // Crab with the two donkeys
    visibility: "both",
    season: "spring"
  },
  
  "Leo Minor": {
    stars: ["Praecipua", "Beta LMi", "Gamma LMi"],
    lines: [[0, 1], [1, 2]], // Little Lion
    visibility: "northern",
    season: "spring"
  },
  
  "Coma Berenices": {
    stars: ["Diadem", "Beta Com", "Gamma Com"],
    lines: [[0, 1], [1, 2]], // Berenice's Hair
    visibility: "northern",
    season: "spring"
  },
  
  "Canes Venatici": {
    stars: ["Cor Caroli", "Chara"],
    lines: [[0, 1]], // Hunting Dogs
    visibility: "northern",
    season: "spring"
  },
  
  "Serpens": {
    stars: ["Unukalhai", "Eta Ser", "Mu Ser", "Xi Ser"],
    lines: [[0, 1], [1, 2], [2, 3]], // Serpent (split by Ophiuchus)
    visibility: "both",
    season: "summer"
  },
  
  "Scutum": {
    stars: ["Alpha Sct", "Beta Sct", "Gamma Sct", "Delta Sct"],
    lines: [[0, 1], [1, 2], [2, 3]], // Shield
    visibility: "both",
    season: "summer"
  },
  
  "Sagitta": {
    stars: ["Sham", "Beta Sge", "Gamma Sge", "Delta Sge"],
    lines: [[0, 1], [1, 2], [2, 3]], // Arrow
    visibility: "northern",
    season: "summer"
  },
  
  "Delphinus": {
    stars: ["Sualocin", "Rotanev", "Gamma Del", "Delta Del"],
    lines: [[0, 1], [1, 2], [2, 3], [3, 0]], // Dolphin
    visibility: "northern",
    season: "summer"
  },
  
  "Equuleus": {
    stars: ["Kitalpha", "Beta Equ", "Gamma Equ"],
    lines: [[0, 1], [1, 2]], // Little Horse
    visibility: "northern",
    season: "autumn"
  },
  
  "Vulpecula": {
    stars: ["Anser", "Alpha Vul", "Beta Vul"],
    lines: [[0, 1], [1, 2]], // Fox
    visibility: "northern",
    season: "summer"
  },
  
  "Lacerta": {
    stars: ["Alpha Lac", "Beta Lac", "Gamma Lac", "Delta Lac"],
    lines: [[0, 1], [1, 2], [2, 3]], // Lizard
    visibility: "northern",
    season: "autumn"
  },
  
  "Triangulum": {
    stars: ["Mothallah", "Beta Tri", "Gamma Tri"],
    lines: [[0, 1], [1, 2], [2, 0]], // Triangle
    visibility: "northern",
    season: "autumn"
  },
  
  "Aries": {
    stars: ["Hamal", "Sheratan", "Mesarthim"],
    lines: [[0, 1], [1, 2]], // Ram
    visibility: "northern",
    season: "autumn"
  },

  // SMALL SOUTHERN CONSTELLATIONS
  "Octans": {
    stars: ["Nu Oct", "Beta Oct", "Delta Oct"],
    lines: [[0, 1], [1, 2]], // Octant (contains South Celestial Pole)
    visibility: "southern",
    season: "year-round"
  },
  
  "Mensa": {
    stars: ["Alpha Men", "Beta Men", "Gamma Men"],
    lines: [[0, 1], [1, 2]], // Table Mountain
    visibility: "southern",
    season: "winter"
  },
  
  "Reticulum": {
    stars: ["Alpha Ret", "Beta Ret", "Delta Ret", "Epsilon Ret"],
    lines: [[0, 1], [1, 2], [2, 3], [3, 0]], // Net
    visibility: "southern",
    season: "winter"
  },
  
  "Horologium": {
    stars: ["Alpha Hor", "Beta Hor", "Delta Hor"],
    lines: [[0, 1], [1, 2]], // Clock
    visibility: "southern",
    season: "winter"
  },
  
  "Caelum": {
    stars: ["Alpha Cae", "Beta Cae", "Gamma Cae"],
    lines: [[0, 1], [1, 2]], // Chisel
    visibility: "southern",
    season: "winter"
  },
  
  "Fornax": {
    stars: ["Alpha For", "Beta For", "Nu For"],
    lines: [[0, 1], [1, 2]], // Furnace
    visibility: "southern",
    season: "autumn"
  },
  
  "Sculptor": {
    stars: ["Alpha Scl", "Beta Scl", "Gamma Scl"],
    lines: [[0, 1], [1, 2]], // Sculptor
    visibility: "southern",
    season: "autumn"
  },
  
  "Microscopium": {
    stars: ["Gamma Mic", "Epsilon Mic", "Theta Mic"],
    lines: [[0, 1], [1, 2]], // Microscope
    visibility: "southern",
    season: "autumn"
  },
  
  "Telescopium": {
    stars: ["Alpha Tel", "Zeta Tel", "Epsilon Tel"],
    lines: [[0, 1], [1, 2]], // Telescope
    visibility: "southern",
    season: "summer"
  },
  
  "Norma": {
    stars: ["Gamma Nor", "Delta Nor", "Epsilon Nor"],
    lines: [[0, 1], [1, 2]], // Square (rule)
    visibility: "southern",
    season: "summer"
  },
  
  "Circinus": {
    stars: ["Alpha Cir", "Beta Cir", "Gamma Cir"],
    lines: [[0, 1], [1, 2]], // Compass
    visibility: "southern",
    season: "summer"
  },
  
  "Antlia": {
    stars: ["Alpha Ant", "Epsilon Ant", "Iota Ant"],
    lines: [[0, 1], [1, 2]], // Air Pump
    visibility: "southern",
    season: "spring"
  },
  
  "Pyxis": {
    stars: ["Alpha Pyx", "Beta Pyx", "Gamma Pyx"],
    lines: [[0, 1], [1, 2]], // Compass (mariner's)
    visibility: "southern",
    season: "winter"
  },
  
  "Sextans": {
    stars: ["Alpha Sex", "Beta Sex", "Gamma Sex"],
    lines: [[0, 1], [1, 2]], // Sextant
    visibility: "both",
    season: "spring"
  }
};

// Constellation groupings by visibility
export const HEMISPHERE_CONSTELLATIONS = {
  northern: [
    "Ursa Major", "Ursa Minor", "Cassiopeia", "Cepheus", "Draco", "Cygnus", 
    "Lyra", "Perseus", "Andromeda", "Pegasus", "Boötes", "Corona Borealis",
    "Hercules", "Auriga", "Lynx", "Leo Minor", "Coma Berenices", "Canes Venatici",
    "Sagitta", "Delphinus", "Equuleus", "Vulpecula", "Lacerta", "Triangulum"
  ],
  southern: [
    "Crux", "Centaurus", "Carina", "Vela", "Puppis", "Eridanus", "Lupus",
    "Ara", "Corona Australis", "Grus", "Phoenix", "Tucana", "Indus", "Pavo",
    "Apus", "Triangulum Australe", "Musca", "Chamaeleon", "Volans", "Dorado",
    "Pictor", "Octans", "Mensa", "Reticulum", "Horologium", "Caelum", "Fornax",
    "Sculptor", "Microscopium", "Telescopium", "Norma", "Circinus", "Antlia", "Pyxis"
  ],
  both: [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpius",
    "Sagittarius", "Capricornus", "Aquarius", "Pisces", "Orion", "Aquila",
    "Canis Major", "Canis Minor", "Ophiuchus", "Serpens", "Hydra", "Corvus",
    "Crater", "Piscis Austrinus", "Columba", "Lepus", "Monoceros", "Scutum", "Sextans"
  ]
};

// Seasonal visibility (Northern Hemisphere perspective)
export const SEASONAL_CONSTELLATIONS = {
  spring: ["Leo", "Virgo", "Boötes", "Ursa Major", "Hydra", "Corvus", "Crater", "Coma Berenices", "Canes Venatici", "Leo Minor", "Sextans", "Antlia", "Centaurus", "Musca", "Chamaeleon"],
  summer: ["Cygnus", "Lyra", "Aquila", "Scorpius", "Sagittarius", "Hercules", "Corona Borealis", "Ophiuchus", "Serpens", "Draco", "Scutum", "Sagitta", "Delphinus", "Vulpecula", "Lupus", "Ara", "Corona Australis", "Pavo", "Apus", "Triangulum Australe", "Telescopium", "Norma", "Circinus"],
  autumn: ["Pegasus", "Andromeda", "Perseus", "Cassiopeia", "Cepheus", "Capricornus", "Aquarius", "Pisces", "Piscis Austrinus", "Grus", "Phoenix", "Tucana", "Indus", "Equuleus", "Lacerta", "Triangulum", "Aries", "Fornax", "Sculptor", "Microscopium"],
  winter: ["Orion", "Taurus", "Gemini", "Auriga", "Canis Major", "Canis Minor", "Eridanus", "Columba", "Lepus", "Monoceros", "Lynx", "Carina", "Vela", "Puppis", "Volans", "Dorado", "Pictor", "Mensa", "Reticulum", "Horologium", "Caelum", "Pyxis"]
};

// Famous asterisms (star patterns within or across constellations)
export const ASTERISMS = {
  "Big Dipper": {
    constellation: "Ursa Major",
    stars: ["Dubhe", "Merak", "Phecda", "Megrez", "Alioth", "Mizar", "Alkaid"],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]]
  },
  "Little Dipper": {
    constellation: "Ursa Minor", 
    stars: ["Polaris", "Kochab", "Pherkad", "Yildun", "Urodelus", "Ahfa al Farkadain", "Anwar al Farkadain"],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]]
  },
  "Summer Triangle": {
    constellations: ["Lyra", "Cygnus", "Aquila"],
    stars: ["Vega", "Deneb", "Altair"],
    lines: [[0, 1], [1, 2], [2, 0]]
  },
  "Winter Triangle": {
    constellations: ["Orion", "Canis Major", "Canis Minor"],
    stars: ["Betelgeuse", "Sirius", "Procyon"],
    lines: [[0, 1], [1, 2], [2, 0]]
  },
  "Great Square of Pegasus": {
    constellations: ["Pegasus", "Andromeda"],
    stars: ["Markab", "Scheat", "Algenib", "Alpheratz"],
    lines: [[0, 1], [1, 2], [2, 3], [3, 0]]
  },
  "Belt of Orion": {
    constellation: "Orion",
    stars: ["Mintaka", "Alnilam", "Alnitak"],
    lines: [[0, 1], [1, 2]]
  },
  "Sword of Orion": {
    constellation: "Orion",
    stars: ["42 Orionis", "Theta Orionis", "Iota Orionis"],
    lines: [[0, 1], [1, 2]]
  },
  "Northern Cross": {
    constellation: "Cygnus",
    stars: ["Deneb", "Sadr", "Albireo", "Delta Cygni", "Epsilon Cygni"],
    lines: [[0, 1], [1, 2], [1, 3], [1, 4]]
  },
  "Southern Cross": {
    constellation: "Crux",
    stars: ["Acrux", "Gacrux", "Becrux", "Decrux"],
    lines: [[0, 1], [2, 3]]
  },
  "False Cross": {
    constellations: ["Carina", "Vela"],
    stars: ["Avior", "Aspidiske", "Markeb", "Alsuhail"],
    lines: [[0, 1], [2, 3]]
  },
  "Diamond Cross": {
    constellation: "Carina",
    stars: ["Canopus", "Miaplacidus", "Avior", "Aspidiske"],
    lines: [[0, 1], [1, 2], [2, 3], [3, 0]]
  },
  "Teapot": {
    constellation: "Sagittarius",
    stars: ["Kaus Australis", "Nunki", "Ascella", "Kaus Media", "Kaus Borealis", "Alnasl", "Rukbat", "Arkab"],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0], [3, 6]]
  }
};

export default CONSTELLATION_LINES;
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Eye, Globe, Zap, Heart, Brain, Star } from 'lucide-react';

// Planetary data extracted from the documents with motion/rotation data
const PLANETARY_DATA = {
  saturn: {
    name: "Saturn",
    symbol: "♄",
    alternateNames: ["Chronor", "Phoenon", "Falcifer"],
    color: "Pale, Wan or Leaden, Ashy",
    motion: {
      zodiacCycle: "29 years, 157 days",
      middleMotion: "2 minutes and 1 second",
      diurnalMotion: "3-6 minutes (seldom more)",
      retrograde: "140 days",
      stationaryBefore: "5 days before retrogradation",
      stationaryAfter: "5 days before direction"
    },
    latitude: {
      north: "2 degrees 48 minutes",
      south: "2 degrees 49 minutes"
    },
    houses: {
      nightHouse: "Capricorn",
      dayHouse: "Aquarius",
      exaltation: "Libra",
      fall: "Aries",
      rejoicing: "Aquarius"
    },
    triplicity: "Airy Triplicity by day (Gemini, Libra, Aquarius)",
    terms: {
      aries: [27, 28, 29, 30],
      taurus: [23, 24, 25, 26],
      gemini: [22, 23, 24, 25],
      cancer: [28, 29, 30],
      leo: [1, 2, 3, 4, 5, 6],
      virgo: [19, 20, 21, 22, 23, 24],
      libra: [1, 2, 3, 4, 5, 6],
      scorpio: [28, 29, 30],
      sagittarius: [9, 10, 11, 12, 13, 14],
      capricorn: [26, 27, 28, 29, 30],
      aquarius: [1, 2, 3, 4, 5, 6],
      pisces: [27, 28, 29, 30]
    },
    faces: {
      taurus: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
      leo: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      libra: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      sagittarius: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
      pisces: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    nature: "Diurnal Planet, Cold and Dry, Melancholic, Earthly, Masculine, Greater Infortune",
    wellDignified: "Profound in imagination, severe in acts, reserved in words, patient in labor, grave in disputing, studious in obtaining goods, austere in actions",
    illDignified: "Envious, covetous, jealous, mistrustful, timorous, sordid, dissembling, sluggish, suspicious, stubborn, contemner of women, malicious, murmuring",
    corporature: "Middle stature, pale/muddy complexion, little black eyes looking downward, broad forehead, black/sad hair, great ears, thick lips and nose, thin beard, broad shoulders",
    orientalEffect: "More short stature but decent and well composed",
    occidentalEffect: "More black and lean, fewer hairs",
    qualityOfMen: "Husbandmen, Clowns, Beggars, Day-laborers, Old-men, Fathers, Grandfathers, Monks, Jesuits, Sectarists",
    professions: "Curriers, Night-farmers, Miners, Tinners, Potters, Broom-men, Plumbers, Brick-makers, Malsters, Chimney-sweepers, Sextons, Bearers of dead corps, Scavengers, Hostlers, Colliers, Carters, Gardeners, Ditchers, Chandlers, Dyers of black cloth, Herdsmen, Shepherds, Cow-keepers",
    sicknesses: "Right ear impediments, teeth problems, quartan agues, leprosy, rheums, consumptions, black jaundice, palsies, trembling, vain fears, fantasies, dropsy, gout, apoplexies, hemorrhoids, ruptures",
    savours: "Sour, Bitter, Sharp",
    bodyRulership: "Spleen",
    herbs: "Bearsfoot, Starwort, Wolf-bane, Hemlock, Fern, Hellebore, Henbane, Ceterach, Clotbur, Parsnip, Dragon, Pulse, Vervain, Mandrake, Poppy, Moss, Nightshade, Bythwind, Angelida, Sage, Box, Spinach, Shepherd's Purse, Cumin, Fumitory",
    trees: "Tamarisk, Savine, Sene, Capers, Rue, Polypody, Willow, Yew-tree, Cypress, Hemp, Pine-tree",
    beasts: "Ass, Cat, Hare, Mouse, Mole, Elephant, Bear, Dog, Wolf, Basilisk, Crocodile, Scorpion, Toad, Serpent, Adder, Hog, creeping creatures",
    birds: "Eel, Tortoise, Shell-fishes, Bat, Crow, Lapwing, Owl, Gnat, Crane, Peacock, Grasshopper, Thrush, Blackbird, Ostrich, Cuckoo",
    places: "Deserts, Woods, obscure valleys, caves, dens, holes, mountains, burial places, church-yards, ruinous buildings, coal-mines, sinks, dirty places, wells",
    minerals: "Lead, Lead-stone, dross of all metals, dust and rubbish",
    stones: "Sapphire, Lapis Lazuli, black ugly stones, sad ashy or black colored stones",
    weather: "Cloudy, dark, obscure air, cold and hurtful, thick black clouds",
    winds: "Eastern winds",
    orb: "9 degrees before and after aspects",
    generation: "First and eighth month after conception",
    years: {
      greatest: 465,
      greater: 57,
      mean: "43.5",
      least: 30
    },
    countries: "Bavaria, Saxony, Stiria, Romandisle, Ravenna, Constantia, Ingoldstad",
    angel: "Cassiel (alias Captiel)",
    friends: ["Jupiter", "Sun", "Mercury"],
    enemies: ["Mars", "Venus"],
    dayOfWeek: "Saturday"
  },
  jupiter: {
    name: "Jupiter",
    symbol: "♃",
    alternateNames: ["Zeus", "Phaeton"],
    color: "Bright, clear, Azure",
    motion: {
      zodiacCycle: "12 years",
      middleMotion: "4 minutes 59 seconds",
      diurnalMotion: "8-14 minutes (hardly any more)",
      retrograde: "120 days",
      stationaryBefore: "5 days before retrogradation",
      stationaryAfter: "4 days before direction"
    },
    latitude: {
      north: "1 degree 38 minutes",
      south: "1 degree 40 minutes"
    },
    houses: {
      dayHouse: "Sagittarius",
      nightHouse: "Pisces",
      detriment: "Gemini and Virgo",
      exaltation: "Cancer",
      fall: "Capricorn"
    },
    triplicity: "Fiery Triplicity by night (Aries, Leo, Sagittarius)",
    terms: {
      aries: [1, 2, 3, 4, 5, 6],
      taurus: [16, 17, 18, 19, 20, 21, 22],
      gemini: [8, 9, 10, 11, 12, 13, 14],
      cancer: [7, 8, 9, 10, 11, 12, 13],
      leo: [20, 21, 22, 23, 24, 25],
      virgo: [14, 15, 16, 17, 18],
      libra: [12, 13, 14, 15, 16, 17, 18, 19],
      scorpio: [7, 8, 9, 10, 11, 12, 13, 14],
      sagittarius: [1, 2, 3, 4, 5, 6, 7, 8],
      capricorn: [13, 14, 15, 16, 17, 18, 19],
      aquarius: [21, 22, 23, 24, 25],
      pisces: [9, 10, 11, 12, 13, 14]
    },
    faces: {
      gemini: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      leo: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      libra: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
      capricorn: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      pisces: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    },
    nature: "Diurnal, Masculine Planet, Temperately Hot and Moist, Airy, Sanguine, Greater Fortune, author of Temperance, Modesty, Sobriety, Justice",
    wellDignified: "Magnanimous, faithful, bashful, aspiring honorably, lover of fair dealing, beneficial to all men, glorious, honorable, religious, sweet conversation, indulgent to wife and children, reverent to aged men, reliever of poor, charitable, godly, liberal, just, wise, prudent, thankful, virtuous",
    illDignified: "Wastes patrimony, suffers cozenage, hypocritically religious, tenacious in false religious tenets, ignorant, careless, undelightful to friends, gross dull capacity, schismatical, abasing himself unnecessarily",
    corporature: "Upright straight tall stature, brown ruddy lovely complexion, oval/long full fleshy face, high forehead, large gray eyes, soft auburn brown hair, much beard, large deep belly, strong proportioned thighs and legs, long feet, sober grave speech",
    orientalEffect: "Clearer skin, honey color between white and red, sanguine ruddy color, great eyes, more fleshy body, usually mole or scar in right foot",
    occidentalEffect: "Pure lovely complexion, shorter stature, light brown or dark flaxen hair, smooth, bald about temple or forehead",
    qualityOfMen: "Judges, Senators, Counselors, Ecclesiastical men, Bishops, Priests, Ministers, Cardinals, Chancellors, Doctors of Civil Law, young Scholars, Students, Lawyers, Clothiers, Woolen-Drapers",
    sicknesses: "Pleurisy, liver infirmities, left ear problems, apoplexy, lung inflammation, heart palpitations and trembling, cramps, back-bone pain, vein and rib diseases, blood corruption, squinzies, windiness, blood putrefaction, fevers from blood abundance",
    savours: "Sweet or well-scented odors, no extreme or offensive smell",
    colors: "Sea-green or Blue, Purple, Ash-color, mixed Yellow and Green",
    herbs: "Cloves, Mace, Nutmeg, Gilly-flower, Strawberry, Balsam, Betony, Centory, Flax, Ars-smart, Fumitory, Lung-wort, Pimpernel, Walwort, Orange, Rhubarb, Self-heal, Borage, Bugloss, Wheat, Willow-herb, Through-leaf, Violets, Liverwort, Basil, Pomegranates, Peony, Liquorice, Mint, Mastix, Daisy, Saffron",
    trees: "Cherry-tree, Birch-tree, Mulberry-tree, Coral-tree, Oak, Barbaries, Olive, Gooseberries, Almond-tree, Ivy, Manna, Mace, Vine, Fig-tree, Ash, Pear-tree, Hazel, Beech-tree, Pine, Raisins",
    beasts: "Sheep, Heart or Stag, Doe, Ox, Elephant, Dragon, Tiger, Unicorn, mild and gentle beasts beneficial to mankind",
    birds: "Stork, Snipe, Lark, Eagle, Stock-dove, Partridge, Bees, Pheasant, Peacock, Hen",
    fishes: "Dolphin, Whale, Serpent, Sheath-fish or River Whale",
    places: "Altars of churches, public conventions, synods, convocations, neat sweet places, wardrobes, courts of justice, oratories",
    minerals: "Tin",
    stones: "Amethyst, Sapphire, Smaragd or Emerald, Hyacinth, Topaz, Crystal, Bezoar, Marble, Free-stone",
    weather: "Serene, pleasant and healthful North Winds, allays ill weather of malignant planets",
    winds: "North Wind tending to East",
    orb: "9 degrees before and after aspects",
    generation: "Second and tenth month",
    bodyRulership: "Liver",
    elementRulership: "Air",
    years: {
      greatest: 428,
      greater: 79,
      mean: 45,
      least: 12
    },
    age: "Men of middle age, full judgment and discretion",
    climate: "Second Climate",
    countries: "Babylon, Persia, Hungary, Spain, Cologne",
    number: 3,
    angel: "Zadkiel",
    friends: "All planets except Mars",
    enemies: ["Mars"],
    dayOfWeek: "Thursday"
  },
  mars: {
    name: "Mars",
    symbol: "♂",
    alternateNames: ["Mavors", "Aris", "Pyrois", "Gradivus"],
    color: "Shining, fiery, sparkling",
    motion: {
      zodiacCycle: "1 year 321 days",
      middleMotion: "31 minutes 27 seconds",
      diurnalMotion: "32-44 minutes per day (seldom more)",
      retrograde: "80 days",
      stationaryBefore: "2 days before direction",
      stationaryAfter: "1 day"
    },
    latitude: {
      north: "4 degrees 31 minutes",
      south: "6 degrees 47 minutes"
    },
    houses: {
      dayHouse: "Aries",
      nightHouse: "Scorpio",
      exaltation: "28 degrees Capricorn",
      fall: "28 degrees Cancer",
      detriment: "Libra and Taurus"
    },
    triplicity: "Watery Triplicity (Cancer, Scorpio, Pisces)",
    terms: {
      aries: [22, 23, 24, 25, 26],
      taurus: [27, 28, 29, 30],
      gemini: [26, 27, 28, 29, 30],
      cancer: [1, 2, 3, 4, 5, 6],
      leo: [26, 27, 28, 29, 30],
      virgo: [25, 26, 27, 28, 29, 30],
      libra: [25, 26, 27, 28, 29, 30],
      scorpio: [1, 2, 3, 4, 5, 6],
      sagittarius: [26, 27, 28, 29, 30],
      capricorn: [20, 21, 22, 23, 24, 25],
      aquarius: [26, 27, 28, 29, 30],
      pisces: [21, 22, 23, 24, 25, 26]
    },
    faces: {
      aries: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      gemini: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      leo: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
      scorpio: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      capricorn: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      pisces: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
    },
    nature: "Masculine, Nocturnal Planet, hot and dry, choleric and fiery, Lesser Infortune, author of Quarrels, Strifes, Contentions",
    wellDignified: "Invincible in feats of war and courage, scorning to be exceeded, subject to no reason, bold, confident, immovable, contentious, challenging all honor, valiant, lover of war, hazarding to all perils, willingly obeys nobody, large reporter of own acts, fights all things for victory, prudent in own affairs",
    illDignified: "Prattler without modesty or honesty, lover of slaughter and quarrels, murder, thievery, promoter of sedition, frays and commotions, highway thief, wavering as wind, traitor, turbulent spirit, perjurer, obscene, rash, inhumane, fearing neither God nor caring for man, unthankful, treacherous, oppressor, ravenous, cheater, furious, violent",
    corporature: "Middle stature, strong body, big bones, rather lean than fat, brown ruddy or flaxen complexion, curling hair, sharp hazel piercing eyes, bold confident countenance, active and fearless",
    orientalEffect: "Valiant men, some white mixed with redness, decent tallness, hairy body",
    occidentalEffect: "Very ruddy complexion, mean stature, little head, smooth hairless body, yellow stiff hair, natural humors more dry",
    qualityOfMen: "Princes ruling by tyranny, Tyrants, Usurpers, new Conquerors",
    professions: "Generals, Colonels, Captains, Soldiers with command, all soldiers, Physicians, Apothecaries, Surgeons, Alchemists, Gunners, Butchers, Marshals, Sergeants, Bailiffs, Hangmen, Thieves, Smiths, Bakers, Armorers, Watch-makers, Botchers, Tailors, Cutlers, Barbers, Dyers, Cooks, Carpenters, Gamesters, Bear-wards, Tanners, Carriers",
    sicknesses: "Gall problems, left ear issues, tertian fevers, pestilent burning fevers, migraines, carbuncles, plague and plague-sores, burnings, ring-worms, blisters, phrenzies, mad sudden head distempers, yellow jaundice, bloody flux, fistulas, wounds and diseases in genitals, kidney and bladder stones, scars or small pox in face, iron-inflicted hurts, shingles, diseases from excess choler",
    colors: "Red, yellow, fiery and shining like saffron",
    savours: "Bitter, sharp, burn the tongue",
    bodyRulership: "Choler",
    herbs: "Nettle, all thistles, Rest-harrow, Devil's-milk, white and red Brambles, Lingwort, Onion, Scammony, Garlic, Mustard-seed, Pepper, Ginger, Leeks, Ditander, Horehound, Hemlock, red Sanders, Tamarinds, herbs attracting choler, Radish, Castoreum, Asarum, Carduus Benedictus, Cantharides",
    trees: "All prickly trees - Thorn, Chestnut",
    beasts: "Panther, Tiger, Mastiff, Vulture, Fox, warlike ravenous bold creatures, Castor, Horse, Mule, Ostrich, Goat, Wolf, Leopard, wild Ass, Gnats, Flies, Lapwing, Cockatrice, Griffon, Bear",
    birds: "Hawk, Vulture, Kite or Glead, all ravenous fowl, Raven, Cormorant, Owl, Eagle, Crow, Pie",
    fishes: "Pike, Shark, Barbel, Fork-fish, all stinking worms, Scorpions",
    places: "Smiths' shops, Furnaces, Slaughter-houses, places where bricks or charcoal burned, Chimneys, Forges",
    minerals: "Iron, Antimony, Arsenic, Brimstone, Ocher",
    stones: "Adamant, Loadstone, Blood-stone, Jasper, many-colored Amethyst, Touch-stone, red Lead or Vermillion",
    weather: "Red clouds, Thunder, Lightning, Fiery impressions, pestilent airs after dryness and fair weather",
    winds: "Western winds",
    orb: "7 degrees before and after aspects",
    generation: "Flourishing youth, 41 to 56 years",
    years: {
      greatest: 264,
      greater: 66,
      mean: 40,
      least: 15
    },
    countries: "Saromatia, Lombardy, Batavia, Ferraria, Gothland, third Climate",
    angel: "Samael",
    friends: ["Venus"],
    enemies: "All other planets",
    dayOfWeek: "Tuesday"
  },
  sun: {
    name: "Sun",
    symbol: "☉",
    alternateNames: ["Sol", "Titan", "Ilioa", "Phebus", "Apollo", "Pean", "Osiris", "Diespiter"],
    color: "Bright, golden, visible to all",
    motion: {
      zodiacCycle: "1 year (365 days and certain hours)",
      middleMotion: "59 minutes 8 seconds",
      diurnalMotion: "57 minutes 16 seconds to 61 minutes 6 seconds",
      retrograde: "Never retrograde, always direct",
      latitude: "Always moves in Ecliptic, void of latitude"
    },
    houses: {
      house: "Leo",
      detriment: "Aquarius",
      exaltation: "19 degrees Aries",
      fall: "19 degrees Libra"
    },
    triplicity: "Fiery Triplicity by day (Aries, Leo, Sagittarius)",
    terms: "No terms assigned (some claim Northern Signs as terms but without reason)",
    faces: {
      aries: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      gemini: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
      virgo: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      scorpio: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      capricorn: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
    },
    nature: "Hot, Dry, more temperate than Mars, Masculine, Diurnal Planet, equivalent to a Fortune when well dignified",
    wellDignified: "Very faithful, keeping promises with punctuality, itching desire to rule and sway, prudent with incomparable judgment, great majesty and stateliness, industrious to acquire honor and patrimony, willingly departing with it again, speaks deliberately but not many words with great confidence, full of thought, secret, trusty, affable, tractable, humane to all, loving sumptuousness and magnificence, honorable, no sordid thoughts",
    illDignified: "Arrogant and proud, disdaining all men, cracking of pedigree, purblind in sight and judgment, restless, troublesome, domineering, mere vapor, expensive, foolish, no gravity in words or soberness in actions, spendthrift, wasting patrimony, hanging after other men's charity, thinks all men bound to him because gentleman born",
    corporature: "Good large strong corporature, yellow saffron complexion, round large forehead, goggle eyes or large sharp piercing, strong well-composed body, not so beautiful as lovely, full of health, yellowish hair therefore quickly bald, much beard hair, high ruddy complexion, fleshy bodies, bountiful honest sincere well-minded, great large heart, high-minded, healthful constitution, humane yet spirited, not loquacious",
    orientalEffect: "Oriental in figure or oriental quarter",
    occidentalEffect: "Occidental when seen above earth after he is set",
    qualityOfMen: "Kings, Princes, Emperors, Dukes, Marquesses, Earls, Barons, Lieutenants, Deputy-Lieutenants, Magistrates, Gentlemen generally, Courtiers, desirers of honor and preferment, Justices of Peace, Mayors, High-Sheriffs, High-Constables, great Huntsmen, Stewards of noble houses, principal Magistrates, even petty Constables where no greater officer, Goldsmiths, Brasiers, Pewterers, Coppersmiths, Minters of Money",
    sicknesses: "Pimples in face, palpitation or trembling, brain or heart diseases, tympanies, eye infirmities, cramps, sudden swoonings, mouth diseases, stinking breaths, catarrh, rotten fevers",
    bodyRulership: "Heart, Brain, right Eye (men), vital Spirit; left Eye (women)",
    colors: "Yellow, color of Gold, Scarlet or clear Red, some say Purple",
    savours: "Mixture of sour and sweet together, or aromatic flavor, little bitter and stiptical but comforting and little sharp",
    herbs: "Plants smelling pleasantly, good flavor, yellow or reddish flowers, majestical growth, love open sunshine places, strengthen heart, comfort vitals, clear eyesight, resist poison, dissolve witchery: Saffron, Laurel, Pomecitron, Vine, Enula Campana, Saint John's-wort, Amber, Musk, Ginger, Herb grace, Balm, Marigold, Rosemary, Rosafolis, Cinnamon, Celandine, Eye-bright, Peony, Barley, Cinquefoil, Spikenard, Lignum Aloes, Arsenic",
    trees: "Ash-tree, Palm, Laurel-tree, Myrrh-tree, Frankincense, Cane-tree or Planet, Cedar, Heliotrope, Orange and Lemon-tree",
    beasts: "Lion, Horse, Ram, Crocodile, Bull, Goat, Night-worms or Glow-worms",
    birds: "Eagle, Cock, Phoenix, Nightingale, Peacock, Swan, Buzzard, Goshawk",
    fishes: "Sea-Calf or Sea-Fox, Crabfish, Starfish",
    places: "Houses, Courts of Princes, Palaces, Theaters, magnificent structures being clear and decent, Halls, Dining-Rooms",
    elementRulership: "Fire and clear shining flames",
    minerals: "Gold",
    stones: "Hyacinth, Chrysolite, Adamant, Carbuncle, Etites stone found in Eagles' nests, Pantaure, Ruby",
    weather: "According to season: spring gentle moistening showers, summer heat (extreme with Mars), autumn mists, winter small rain",
    winds: "East part of world and eastern winds",
    orb: "15 degrees before and after aspects",
    generation: "Youth or when one is strongest, fourth month",
    years: {
      greatest: 1460,
      greater: 120,
      mean: 69,
      least: 19
    },
    age: "Youth or strongest period",
    countries: "Italy, Sicily, Bohemia, fourth Climate, Phoenicia, Chaldea",
    angel: "Michael",
    friends: "All planets except Saturn",
    enemies: ["Saturn"],
    dayOfWeek: "Sunday"
  },
  venus: {
    name: "Venus",
    symbol: "♀",
    alternateNames: ["Cytherea", "Aphrodite", "Phosphoros", "Vesperugo", "Ericina", "Evening Star", "Hesperus", "Morning Star", "Lucifer"],
    color: "Bright shining",
    motion: {
      middleMotion: "59 minutes 8 seconds",
      diurnalMotion: "62-82 minutes per day (never exceeding 82)",
      retrograde: "42 days",
      stationaryBefore: "2 days before retrogradation",
      stationaryAfter: "2 days before direction"
    },
    latitude: {
      north: "9 degrees 2 minutes (greatest)",
      south: "9 degrees 2 minutes (greatest)",
      noteFebruary1643: "8 degrees 36 minutes North latitude"
    },
    houses: {
      houses: "Taurus and Libra",
      exaltation: "27 degrees Pisces",
      detriment: "Aries and Scorpio",
      fall: "27 degrees Virgo"
    },
    triplicity: "Earthly Triplicity by day (Taurus, Virgo, Capricorn)",
    terms: {
      aries: [7, 8, 9, 10, 11, 12, 13, 14],
      taurus: [1, 2, 3, 4, 5, 6, 7, 8],
      gemini: [15, 16, 17, 18, 19, 20],
      cancer: [21, 22, 23, 24, 25, 26, 27],
      leo: [14, 15, 16, 17, 18, 19],
      virgo: [8, 9, 10, 11, 12, 13],
      libra: [7, 8, 9, 10, 11],
      scorpio: [15, 16, 17, 18, 19, 20, 21],
      sagittarius: [9, 10, 11, 12, 13, 14],
      capricorn: [1, 2, 3, 4, 5, 6],
      aquarius: [13, 14, 15, 16, 17, 18, 19, 20],
      pisces: [1, 2, 3, 4, 5, 6, 7, 8]
    },
    faces: {
      aries: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
      cancer: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      virgo: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      scorpio: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
      pisces: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    nature: "Feminine Planet, temperately Cold and Moist, Nocturnal, Lesser Fortune, author of Mirth and Jollity",
    elementRulership: "Air and Water",
    bodyRulership: "Phlegm with Blood, Spirit, and Genital seed",
    wellDignified: "Quiet man, not given to law/quarrel/wrangling, not vicious, pleasant, neat and spruce, loving mirth in words and actions, cleanly in apparel, rather drinking much than gluttonous, prone to venery, oft entangled in love-matters, zealous in affections, musical, delighting in baths and honest merry meetings/masques/stage-plays, easy of belief, not given to labor or pains, company-keeper, cheerful, nothing mistrustful, right virtuous, oft had in jealousy yet no cause",
    illDignified: "Riotous, expensive, wholly given to looseness and lewd companies of women, nothing regarding reputation, coveting unlawful beds, incestuous, adulterer, fanatical, skip-jack, no faith/repute/credit, spending means in ale-houses/taverns among scandalous loose people, mean lazy companion, nothing careful of life things or religious matters, mere atheist and natural man",
    corporature: "Fair but not tall stature, white complexion tending to little darkness (making more lovely), very fair lovely eyes and little black, round face not large, fair hair smooth and plenty (usually light brown), lovely mouth and cherry lips, pretty fleshy face, rolling wandering eye, very delightful lovely exceeding well-shaped body, desirous of trimming and making neat/complete in clothes and body, love dimple in cheeks, steadfast eye full of amorous enticements",
    orientalEffect: "Body inclines to tallness, upright straightness in person, not corpulent or very tall but neatly composed - right Venerian person is pretty, complete, handsome",
    occidentalEffect: "More short stature yet very decent and comely in shape and form, well-liked of all",
    qualityOfMen: "Musicians, Gamesters, Silk-men, Mercers, Linen-Drapers, Painters, Jewelers, Players, Lapidaries, Embroiderers, Women-tailors, Wives, Mothers, Virgins, Choristers, Fiddlers, Pipers (with Moon: Singers), Perfumers, Semilers, Picture-drawers, Gravers, Upholsters, Limners, Glovers, all who sell commodities adorning women in body (clothes) or face (complexion-waters)",
    sicknesses: "Diseases in Matrix and generation members, reins, belly, back, navel and those parts, Gonorrhea or running of reins, French or Spanish Pox, diseases from inordinate lust, Priapism, impotency in generation, Hernias, Diabetes or pissing disease",
    colors: "White or milky sky-color mixed with brown or little green",
    savours: "Pleasant and toothsome, usually moist and sweet or very delectable, unctuous and aromatic smells inciting to wantonness",
    herbs: "Myrtle always green, herbs with sweet flavor/pleasant smell/white flower/gentle humor/smooth unjagged leaves: White and yellow Lily, Lily of Valley/Water, Satyrion or Cuckoo-pintle, Maiden-hair, Violet, white and yellow Daffodil",
    trees: "Sweet Apples, white Rose, Fig, white Sycamore, wild Ash, Turpentine-tree, Olive, Sweet Oranges, Mugwort, Ladies-mantle, Sanicle-Balm, Vervain, Walnuts, Almonds, Millet, Valerian, Thyme, Amber, Ladanum, Civet or Musk, Coriander, French Wheat, Peaches, Apricots, Plums, Raisins",
    beasts: "Hart, Panther, small cattle, Coney, Calf, Goat",
    birds: "Stock-dove, Wagtail, Sparrow, Hen, Nightingale, Thrush, Pelican, Partridge, Ficedula (little bird feeding on grapes), Wren, Eagles, Swan, Swallow, Ousel or Black Bird, Pie",
    fishes: "Dolphin",
    places: "Gardens, Fountains, Bride-chambers, fair lodgings, Beds, Hangings, Dancing-Schools, Wardrobes",
    minerals: "Copper (especially Corinthian and White), Brass, all Laten-ware",
    stones: "Cornelian, sky-colored Sapphire, white and red Coral, Margalite, Alabaster, Lapis Lazuli (expels melancholy), Beryl, Chrysolite",
    weather: "Governs South-wind (hot and moist), in air temperament rules Etesia, foretells summer serenity/clear weather, winter rain or snow",
    winds: "South-wind",
    orb: "7 degrees before and after aspects",
    generation: "First month",
    years: {
      greatest: 151,
      greater: 82,
      mean: 45,
      least: 8
    },
    age: "Youth from 14 to 28",
    countries: "Arabia, Austria, Campania, Vienna, Polonia the greater, Turin, Parthia, Media, Cyprus, sixth climate",
    angel: "Anael",
    friends: "All planets except Saturn",
    enemies: ["Saturn"],
    dayOfWeek: "Friday"
  },
  mercury: {
    name: "Mercury",
    symbol: "☿",
    alternateNames: ["Hermes", "Stilbon", "Cyllenius", "Archas"],
    color: "Dusky silver",
    motion: {
      middleMotion: "59 minutes 8 seconds",
      diurnalMotion: "66-100 minutes per day (up to 1 degree 40 minutes, never more)",
      maxDistanceFromSun: "27 degrees",
      retrograde: "24 days",
      stationary: "1 day"
    },
    latitude: {
      south: "3 degrees 35 minutes (greatest)",
      north: "3 degrees 33 minutes (greatest)"
    },
    houses: {
      houses: "Gemini and Virgo",
      exaltation: "15 degrees Virgo",
      detriment: "Sagittarius and Pisces",
      fall: "Pisces"
    },
    triplicity: "Airy Triplicity by night (Gemini, Libra, Aquarius)",
    terms: {
      aries: [15, 16, 17, 18, 19, 20, 21],
      taurus: [9, 10, 11, 12, 13, 14, 15],
      gemini: [1, 2, 3, 4, 5, 6, 7],
      cancer: [14, 15, 16, 17, 18, 19, 20],
      leo: [7, 8, 9, 10, 11, 12, 13],
      virgo: [1, 2, 3, 4, 5, 6, 7],
      libra: [20, 21, 22, 23, 24],
      scorpio: [22, 23, 24, 25, 26, 27],
      sagittarius: [15, 16, 17, 18, 19, 20],
      capricorn: [7, 8, 9, 10, 11, 12],
      aquarius: [7, 8, 9, 10, 11, 12],
      pisces: [15, 16, 17, 18, 19, 20]
    },
    faces: {
      taurus: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      cancer: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      virgo: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
      sagittarius: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      aquarius: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    },
    nature: "Neither Masculine nor Feminine (takes nature of conjoined planet), cold and dry (therefore melancholic), with good planets is good, with evil planets ill",
    elementRulership: "Water",
    bodyRulership: "Mixed humors, animal spirit",
    characteristics: "Author of subtlety, tricks, devices, perjury",
    wellDignified: "Subtle and politic brain, excellent intellect and cogitation, excellent disputant or logician, arguing with learning and discretion, much eloquence in speech, searcher of all mysteries and learning, sharp and witty, learning almost anything without teacher, ambitious of being exquisite in every science, naturally desirous of travel and seeing foreign parts, unwearied fancy, curious in occult knowledge, able to produce wonders by own genius, given to divination and secret knowledge, if merchant excels in trade and invention of new ways to obtain wealth",
    illDignified: "Troublesome wit, kind of phrenetic man, tongue and pen against every man, wholly bent to spoil estate and time in prating and trying nice conclusions to no purpose, great liar, boaster, prattler, busybody, false, tale-carrier, given to wicked arts like necromancy and ungodly knowledge, easy of belief, ass or very idiot, constant in no place or opinion, cheating and thieving everywhere, news-monger, pretending all knowledge but guilty of no true or solid learning, trifler, mere frantic fellow, if divine then mere verbal fellow frothy of no judgment, easily perverted, constant in nothing but idle words and bragging",
    corporature: "High stature and straight thin spare body, high forehead and somewhat narrow long face, long nose, fair eyes neither perfectly black or gray, thin lips and nose, little hair on chin but much on head (sad brown inclining to blackness), long arms/fingers/hands, complexion like olive or chestnut color",
    orientalEffect: "Honey color or well sun-burnt, not very high stature but well-jointed, small eyes, not much hair, well-composed according to body height but defect in complexion (swarthy brown) and tongue (all for own ends)",
    occidentalEffect: "Tawny visage, lank body, small slender limbs, hollow eyes sparkling and red or fiery, whole frame inclining to dryness",
    qualityOfMen: "All literate men, Philosophers, Mathematicians, Astrologers, Merchants, Secretaries, Scriveners, Diviners, Sculptors, Poets, Orators, Advocates, School-masters, Stationers, Printers, Exchangers of Money, Attorneys, Emperors, Ambassadors, Commissioners, Clerks, Artificers, Accountants, Solicitors, sometimes Thieves, prattling muddy Ministers, busy Sectaries (unlearned), Grammarians, Tailors, Carriers, Messengers, Foot-men, Usurers",
    sicknesses: "All vertigoes, lethargies or giddiness in head, madness, lightness or any brain disease, ptisick, all stammering and tongue imperfection, vain and fond imaginations, all memory defects, hoarseness, dry coughs, too much spittle abundance, all snaffling and snuffling in head or nose, hand and feet gout, dumbness, tongue-evil, all evils in fancy and intellectual parts",
    colors: "Mixed and new colors, gray mixed with sky-color (like stock-dove neck), linsey-woolsey colors or many colors mixed in one",
    savours: "Hodgepodge of all things together so no one can give true name, usually such as quicken spirits, are subtle and penetrate, in manner insensible",
    herbs: "Herbs known by various flower color, love sandy barren places, bear seed in husks or cobs, smell rarely or subtly, have principal relation to tongue/brain/lungs/memory, dispel wind, comfort animal spirits, open obstructions: Beans, three-leaved grass, Walnut and Walnut-tree, Filbert-tree and Nut, Elder-tree, Adders-tongue, Dragon-wort, Two-penny grass, Lung-wort, Aniseeds, Cubebs, Marjoram, herbs for Muses and Divination (Vervain, Reed), drugs (Treacle, Hiera, Diambra)",
    beasts: "Hyena, Ape, Fox, Squirrel, Weasel, Spider, Greyhound, Hermaphrodite (partaker of both sexes), all cunning creatures",
    birds: "Linnet, Parrot, Popinjay, Swallow, Pie, Beetle, Pismires, Locusts, Bees, Serpent, Crane",
    fishes: "Fork-fish, Mullet",
    places: "Tradesmen's shops, Markets, Fairs, Schools, Common Halls, Bowling-Alleys, Ordinaries, Tennis-Courts",
    minerals: "Quicksilver",
    stones: "Milestone, Marchasite or fire-stone, Achates, Topaz, Vitriol, all stones of diverse colors",
    weather: "Windy, stormy and violent, boisterous weather, stirs up wind which planet signifies to which he applies, sometimes rain, other times hail/lightning/thunder/tempests, in hot countries earthquakes (observed from sign and season)",
    winds: "Variable depending on applying planet",
    orb: "7 degrees before and after aspects",
    generation: "Sixth month",
    years: {
      greatest: 450,
      greater: 76,
      mean: 48,
      least: 20
    },
    countries: "Greece, Flanders, Egypt, Paris",
    angel: "Raphael",
    friends: ["Jupiter", "Venus", "Saturn"],
    enemies: "All other planets",
    dayOfWeek: "Wednesday"
  },
  moon: {
    name: "Moon",
    symbol: "☽",
    alternateNames: ["Lucina", "Cynthia", "Diana", "Phoebe", "Latona", "Noctiluca", "Proserpina"],
    color: "Vulgarly known (silver/white)",
    motion: {
      zodiacCycle: "27 days, 7 hours, 43 minutes",
      middleMotion: "13 degrees 10 minutes 36 seconds",
      diurnalMotion: "Never exceeding 15 degrees 2 minutes in 24 hours",
      retrograde: "Never retrograde, always direct",
      equivalentRetrograde: "When moving less than 13 degrees 10 minutes per day"
    },
    latitude: {
      north: "5 degrees 17 minutes (greatest)",
      south: "5 degrees 12 minutes (greatest)"
    },
    houses: {
      house: "Cancer",
      detriment: "Capricorn",
      exaltation: "3 degrees Taurus",
      fall: "3 degrees Scorpio"
    },
    triplicity: "Earthly Triplicity by night (Taurus, Virgo, Capricorn)",
    terms: "Sun and Moon have no Terms assigned",
    faces: {
      taurus: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      cancer: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
      libra: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      sagittarius: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      aquarius: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
    },
    nature: "Feminine, Nocturnal Planet, Cold, Moist and Phlegmatic",
    wellDignified: "Composed manners, soft tender creature, lover of honest and ingenuous sciences, searcher and delighter in novelties, naturally propense to flit and shift habitation, unsteadfast, wholly caring for present times, timorous, prodigal, easily frightened, however loving peace and living free from life's cares, if mechanic learns many occupations and frequently tampering with many trade ways",
    illDignified: "Mere vagabond, idle person, hating labor, drunkard, sot, one of no spirit or forecast, delighting to live beggarly and carelessly, content in no condition of life either good or ill",
    corporature: "Fair stature, whitely colored, round face, gray eyes and little louring, much hair on head/face/other parts, usually one eye little larger than other, short hands and fleshy, whole body inclining to be fleshy/plump/corpulent/phlegmatic",
    impedimentEffects: "If impedited by Sun: blemish in or near eye (near eye if in succedant houses, in sight if in angles with fixed nebulous stars)",
    qualityOfMen: "Queens, Countesses, Ladies, all manner of women, also common people, Travelers, Pilgrims, Sailors, Fish-mongers, Brewers, Tapsters, Vintners, Letter-carriers, Coach-men, Huntsmen, Messengers (some say Pope's Legates), Mariners, Millers, Ale-wives, Maltsters, Drunkards, Oyster-wives, Fisher-women, Charwomen, Tripe-women, generally women carrying commodities in streets, also Midwives, Nurses, Hackney-men, Water-men, Water-bearers",
    sicknesses: "Apoplexy, Palsy, Colic, Belly-ache, disease in left side, Stones, Bladder and generation member problems, Menses and Liver issues in women, Dropsies, Fluxes of belly, all cold rheumatic diseases, cold stomach, gout in wrists and feet, Sciatica, Colic, Worms in children and men, Rheums or hurts in eyes (left of men, right of women), Surfeits, rotten coughs, Convulsion fits, Falling sickness, King's-evil, Apostems, small Pox and Measles",
    colors: "White or pale yellowish white, pale green, or little of silver-color",
    savours: "Fresh or without any flavor, such as in herbs before ripe, or such as moisten brain",
    herbs: "Herbs with soft thick juicy leaves, waterish or little sweetish taste, love to grow in watery places, grow quickly into juicy magnitude: Colwort, Cabbage, Melon, Gourd, Pumpkin, Onion, Mandrake, Poppy, Lettuce, Rape, Linden-tree, Mushrooms, Endive, all trees or herbs with round/shady/great spreading leaves and little fruitful",
    beasts: "All beasts living in water: Frogs, Otter, Snails, Weasel, Coney, all Sea Fowls, Cuckoo, Geese and Duck, Night-Owl",
    fishes: "Oyster and Cockle, all She-fish, Crab and Lobster, Tortoise, Eels",
    places: "Fields, Fountains, Baths, Havens of sea, Highways and desert places, Port Towns, Rivers, Fish-ponds, standing Pools, Boggy places, Common-shores, little Brooks, Springs",
    minerals: "Silver",
    stones: "Selenite, all soft stones, Crystals",
    weather: "With Saturn: cold air; with Jupiter: serene; with Mars: winds red clouds; with Sun: according to season; with Venus and Mercury: showers and winds",
    winds: "Delights toward North, when strongest planet in scheme stirs up wind according to nature of planet she next applies unto",
    orb: "12 degrees before and after aspects",
    generation: "Seventh month",
    years: {
      greatest: 321,
      greater: 108,
      mean: 66,
      least: 25
    },
    countries: "Holland, Zealand, Denmark, Nuremberg, Flanders",
    angel: "Gabriel",
    dayOfWeek: "Monday"
  }
};

// LUNAR NODES DATA
const LUNAR_NODES = {
  northNode: {
    name: "North Node (Caput Draconis)",
    symbol: "☊",
    alternateNames: ["Head of the Dragon", "Caput Draconis"],
    nature: "Masculine, of the nature of Jupiter and Venus, Fortune of himself",
    description: "Being in conjunction with good planets he is good, and in conjunction with evil planets they account him evil",
    effect: "Equivalent to either of the Fortunes, when joined with evil planets lessens their malevolent signification, when joined with good increases the good promised by them"
  },
  southNode: {
    name: "South Node (Cauda Draconis)",
    symbol: "☋",
    alternateNames: ["Tail of the Dragon", "Cauda Draconis"],
    nature: "Feminine by Nature, clean contrary to the Head",
    description: "Evil when joined with good Planets, and good when in conjunction with the malignant Planets",
    effect: "When joined with evil planets their malice or evil intended is doubled and trebled or extremely augmented, when with Fortunes who were significators causes many rubs, disturbances, wrangling, great controversy that business often given over for desperate"
  }
};

// Angular motion data for 4D solar system
const PLANETARY_ANGULAR_DATA = {
  saturn: {
    orbitalPeriod: "29.46 Earth years",
    rotationPeriod: "10.66 hours",
    orbitalInclination: "2.485 degrees",
    axialTilt: "26.73 degrees",
    orbitalEccentricity: "0.0565",
    meanOrbitalVelocity: "9.68 km/s",
    astrologicalMotion: {
      dailyMotion: "0.033 degrees per day",
      retrogradeFrequency: "378 days",
      retrogradeDuration: "140 days",
      stationaryPeriods: "5 days each"
    }
  },
  jupiter: {
    orbitalPeriod: "11.86 Earth years",
    rotationPeriod: "9.93 hours",
    orbitalInclination: "1.304 degrees",
    axialTilt: "3.13 degrees",
    orbitalEccentricity: "0.0489",
    meanOrbitalVelocity: "13.07 km/s",
    astrologicalMotion: {
      dailyMotion: "0.083 degrees per day",
      retrogradeFrequency: "399 days",
      retrogradeDuration: "120 days",
      stationaryPeriods: "5 and 4 days"
    }
  },
  mars: {
    orbitalPeriod: "1.88 Earth years",
    rotationPeriod: "24.62 hours",
    orbitalInclination: "1.850 degrees",
    axialTilt: "25.19 degrees",
    orbitalEccentricity: "0.0934",
    meanOrbitalVelocity: "24.08 km/s",
    astrologicalMotion: {
      dailyMotion: "0.524 degrees per day",
      retrogradeFrequency: "780 days",
      retrogradeDuration: "80 days",
      stationaryPeriods: "2 and 1 days"
    }
  },
  earth: {
    orbitalPeriod: "365.25 days",
    rotationPeriod: "23.93 hours",
    orbitalInclination: "0 degrees (reference)",
    axialTilt: "23.44 degrees",
    orbitalEccentricity: "0.0167",
    meanOrbitalVelocity: "29.78 km/s",
    astrologicalMotion: {
      dailyMotion: "0.986 degrees per day",
      retrogradeFrequency: "Never",
      retrogradeDuration: "N/A",
      stationaryPeriods: "N/A"
    }
  },
  venus: {
    orbitalPeriod: "224.7 days",
    rotationPeriod: "243 days (retrograde)",
    orbitalInclination: "3.39 degrees",
    axialTilt: "177.36 degrees",
    orbitalEccentricity: "0.0067",
    meanOrbitalVelocity: "35.02 km/s",
    astrologicalMotion: {
      dailyMotion: "1.602 degrees per day",
      retrogradeFrequency: "584 days",
      retrogradeDuration: "42 days",
      stationaryPeriods: "2 days each"
    }
  },
  mercury: {
    orbitalPeriod: "88 days",
    rotationPeriod: "58.65 days",
    orbitalInclination: "7.00 degrees",
    axialTilt: "0.034 degrees",
    orbitalEccentricity: "0.2056",
    meanOrbitalVelocity: "47.36 km/s",
    astrologicalMotion: {
      dailyMotion: "4.092 degrees per day",
      retrogradeFrequency: "116 days",
      retrogradeDuration: "24 days",
      stationaryPeriods: "1 day each",
      maxElongation: "27 degrees from Sun"
    }
  },
  moon: {
    orbitalPeriod: "27.32 days",
    rotationPeriod: "27.32 days (tidally locked)",
    orbitalInclination: "5.14 degrees",
    axialTilt: "1.54 degrees",
    orbitalEccentricity: "0.0549",
    meanOrbitalVelocity: "1.02 km/s",
    astrologicalMotion: {
      dailyMotion: "13.176 degrees per day",
      retrogradeFrequency: "Never",
      retrogradeDuration: "N/A",
      maxLatitude: "5.25 degrees"
    }
  }
};

// Main Component
const PlanetaryNatureReference = () => {
  const [expandedPlanet, setExpandedPlanet] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const planetOrder = ['saturn', 'jupiter', 'mars', 'sun', 'venus', 'mercury', 'moon'];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Eye className="w-4 h-4" /> },
    { id: 'motion', label: 'Motion & Angles', icon: <Globe className="w-4 h-4" /> },
    { id: 'attributes', label: 'Attributes', icon: <Star className="w-4 h-4" /> },
    { id: 'influence', label: 'Influences', icon: <Zap className="w-4 h-4" /> },
    { id: 'correspondences', label: 'Correspondences', icon: <Heart className="w-4 h-4" /> },
    { id: 'dignities', label: 'Dignities', icon: <Brain className="w-4 h-4" /> }
  ];

  const planetColors = {
    saturn: 'from-gray-600 to-gray-800',
    jupiter: 'from-blue-500 to-blue-700',
    mars: 'from-red-500 to-red-700',
    sun: 'from-yellow-400 to-orange-500',
    venus: 'from-pink-400 to-rose-500',
    mercury: 'from-purple-400 to-indigo-500',
    moon: 'from-gray-300 to-blue-300'
  };

  const planetIcons = {
    saturn: '♄',
    jupiter: '♃',
    mars: '♂',
    sun: '☉',
    venus: '♀',
    mercury: '☿',
    moon: '☽'
  };

  const handlePlanetToggle = (planet) => {
    setExpandedPlanet(expandedPlanet === planet ? null : planet);
    setActiveTab('overview');
  };

  const renderTabContent = (planet, data) => {
    const angularData = PLANETARY_ANGULAR_DATA[planet];

    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/40 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="text-2xl mr-2">{planetIcons[planet]}</span>
                  Essential Nature
                </h3>
                <p className="text-gray-700 mb-2"><strong>Nature:</strong> {data.nature}</p>
                <p className="text-gray-700 mb-2"><strong>Color:</strong> {data.color}</p>
                {data.bodyRulership && (
                  <p className="text-gray-700"><strong>Body Rulership:</strong> {data.bodyRulership}</p>
                )}
              </div>
              <div className="bg-white/40 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Physical Characteristics</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{data.corporature}</p>
              </div>
            </div>
            
            <div className="bg-white/40 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">When Well Dignified</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{data.wellDignified}</p>
            </div>
            
            <div className="bg-white/40 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">When Ill Dignified</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{data.illDignified}</p>
            </div>
          </div>
        );

      case 'motion':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-100/50 to-purple-100/50 rounded-lg p-6 border border-blue-200/30">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-blue-600" />
                Orbital Mechanics & Angular Data
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {angularData && (
                  <>
                    <div className="bg-white/60 rounded-lg p-3">
                      <div className="text-sm text-gray-600">Orbital Period</div>
                      <div className="font-semibold text-gray-800">{angularData.orbitalPeriod}</div>
                    </div>
                    <div className="bg-white/60 rounded-lg p-3">
                      <div className="text-sm text-gray-600">Rotation Period</div>
                      <div className="font-semibold text-gray-800">{angularData.rotationPeriod}</div>
                    </div>
                    <div className="bg-white/60 rounded-lg p-3">
                      <div className="text-sm text-gray-600">Orbital Inclination</div>
                      <div className="font-semibold text-gray-800">{angularData.orbitalInclination}</div>
                    </div>
                    <div className="bg-white/60 rounded-lg p-3">
                      <div className="text-sm text-gray-600">Axial Tilt</div>
                      <div className="font-semibold text-gray-800">{angularData.axialTilt}</div>
                    </div>
                    <div className="bg-white/60 rounded-lg p-3">
                      <div className="text-sm text-gray-600">Orbital Eccentricity</div>
                      <div className="font-semibold text-gray-800">{angularData.orbitalEccentricity}</div>
                    </div>
                    <div className="bg-white/60 rounded-lg p-3">
                      <div className="text-sm text-gray-600">Mean Orbital Velocity</div>
                      <div className="font-semibold text-gray-800">{angularData.meanOrbitalVelocity}</div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-100/50 to-red-100/50 rounded-lg p-6 border border-orange-200/30">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-orange-600" />
                Astrological Motion Data
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/60 rounded-lg p-3">
                  <div className="text-sm text-gray-600">Middle Motion</div>
                  <div className="font-semibold text-gray-800">{data.motion?.middleMotion || 'N/A'}</div>
                </div>
                <div className="bg-white/60 rounded-lg p-3">
                  <div className="text-sm text-gray-600">Diurnal Motion</div>
                  <div className="font-semibold text-gray-800">{data.motion?.diurnalMotion || 'N/A'}</div>
                </div>
                <div className="bg-white/60 rounded-lg p-3">
                  <div className="text-sm text-gray-600">Retrograde Duration</div>
                  <div className="font-semibold text-gray-800">{data.motion?.retrograde || 'Never'}</div>
                </div>
                <div className="bg-white/60 rounded-lg p-3">
                  <div className="text-sm text-gray-600">Zodiac Cycle</div>
                  <div className="font-semibold text-gray-800">{data.motion?.zodiacCycle || 'N/A'}</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-100/50 to-teal-100/50 rounded-lg p-6 border border-green-200/30">
              <h3 className="font-semibold text-gray-800 mb-4">Latitude Boundaries</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.latitude?.north && (
                  <div className="bg-white/60 rounded-lg p-3">
                    <div className="text-sm text-gray-600">Greatest North Latitude</div>
                    <div className="font-semibold text-gray-800">{data.latitude.north}</div>
                  </div>
                )}
                {data.latitude?.south && (
                  <div className="bg-white/60 rounded-lg p-3">
                    <div className="text-sm text-gray-600">Greatest South Latitude</div>
                    <div className="font-semibold text-gray-800">{data.latitude.south}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'attributes':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/40 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Years of Influence</h3>
                <div className="space-y-2">
                  <p className="text-sm"><strong>Greatest:</strong> {data.years?.greatest}</p>
                  <p className="text-sm"><strong>Greater:</strong> {data.years?.greater}</p>
                  <p className="text-sm"><strong>Mean:</strong> {data.years?.mean}</p>
                  <p className="text-sm"><strong>Least:</strong> {data.years?.least}</p>
                </div>
              </div>
              <div className="bg-white/40 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Celestial Information</h3>
                <div className="space-y-2">
                  <p className="text-sm"><strong>Angel:</strong> {data.angel}</p>
                  <p className="text-sm"><strong>Day of Week:</strong> {data.dayOfWeek}</p>
                  <p className="text-sm"><strong>Orb:</strong> {data.orb}</p>
                  {data.number && <p className="text-sm"><strong>Number:</strong> {data.number}</p>}
                </div>
              </div>
            </div>

            <div className="bg-white/40 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Oriental vs Occidental Effects</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">When Oriental:</h4>
                  <p className="text-sm text-gray-600">{data.orientalEffect}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">When Occidental:</h4>
                  <p className="text-sm text-gray-600">{data.occidentalEffect}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'influence':
        return (
          <div className="space-y-6">
            <div className="bg-white/40 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Quality of Men & Professions</h3>
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Quality of Men:</h4>
                <p className="text-sm text-gray-600">{data.qualityOfMen}</p>
              </div>
              {data.professions && (
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Professions:</h4>
                  <p className="text-sm text-gray-600">{data.professions}</p>
                </div>
              )}
            </div>

            <div className="bg-white/40 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Health & Sicknesses</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{data.sicknesses}</p>
            </div>

            <div className="bg-white/40 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Weather & Winds</h3>
              <div className="space-y-2">
                <p className="text-sm"><strong>Weather:</strong> {data.weather}</p>
                <p className="text-sm"><strong>Winds:</strong> {data.winds}</p>
              </div>
            </div>
          </div>
        );

      case 'correspondences':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/40 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Colors & Savours</h3>
                <p className="text-sm mb-2"><strong>Colors:</strong> {data.colors || data.color}</p>
                <p className="text-sm"><strong>Savours:</strong> {data.savours}</p>
              </div>
              <div className="bg-white/40 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Minerals & Stones</h3>
                <p className="text-sm mb-2"><strong>Minerals:</strong> {data.minerals}</p>
                <p className="text-sm"><strong>Stones:</strong> {data.stones}</p>
              </div>
            </div>

            <div className="bg-white/40 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Herbs & Plants</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{data.herbs}</p>
            </div>

            <div className="bg-white/40 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Trees</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{data.trees}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/40 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Beasts</h3>
                <p className="text-sm text-gray-600">{data.beasts}</p>
              </div>
              <div className="bg-white/40 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Birds</h3>
                <p className="text-sm text-gray-600">{data.birds}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/40 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Fishes</h3>
                <p className="text-sm text-gray-600">{data.fishes}</p>
              </div>
              <div className="bg-white/40 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Places</h3>
                <p className="text-sm text-gray-600">{data.places}</p>
              </div>
            </div>

            <div className="bg-white/40 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Countries</h3>
              <p className="text-sm text-gray-600">{data.countries}</p>
            </div>
          </div>
        );

      case 'dignities':
        return (
          <div className="space-y-6">
            <div className="bg-white/40 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Houses & Essential Dignities</h3>
              <div className="space-y-2">
                {data.houses?.house && <p className="text-sm"><strong>House:</strong> {data.houses.house}</p>}
                {data.houses?.dayHouse && <p className="text-sm"><strong>Day House:</strong> {data.houses.dayHouse}</p>}
                {data.houses?.nightHouse && <p className="text-sm"><strong>Night House:</strong> {data.houses.nightHouse}</p>}
                {data.houses?.houses && <p className="text-sm"><strong>Houses:</strong> {data.houses.houses}</p>}
                {data.houses?.exaltation && <p className="text-sm"><strong>Exaltation:</strong> {data.houses.exaltation}</p>}
                {data.houses?.fall && <p className="text-sm"><strong>Fall:</strong> {data.houses.fall}</p>}
                {data.houses?.detriment && <p className="text-sm"><strong>Detriment:</strong> {data.houses.detriment}</p>}
                {data.houses?.rejoicing && <p className="text-sm"><strong>Rejoicing:</strong> {data.houses.rejoicing}</p>}
              </div>
            </div>

            <div className="bg-white/40 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Triplicity</h3>
              <p className="text-sm text-gray-600">{data.triplicity}</p>
            </div>

            {data.terms && Object.keys(data.terms).length > 0 && typeof data.terms !== 'string' && (
              <div className="bg-white/40 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Terms (Degrees by Sign)</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-xs">
                  {Object.entries(data.terms).map(([sign, degrees]) => (
                    <div key={sign} className="bg-white/60 rounded p-2">
                      <div className="font-medium capitalize">{sign}:</div>
                      <div className="text-gray-600">{degrees.join(', ')}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.faces && Object.keys(data.faces).length > 0 && (
              <div className="bg-white/40 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Faces/Decanates (Degrees by Sign)</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-xs">
                  {Object.entries(data.faces).map(([sign, degrees]) => (
                    <div key={sign} className="bg-white/60 rounded p-2">
                      <div className="font-medium capitalize">{sign}:</div>
                      <div className="text-gray-600">{degrees.join(', ')}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/40 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Planetary Friends</h3>
                <p className="text-sm text-gray-600">
                  {Array.isArray(data.friends) ? data.friends.join(', ') : data.friends}
                </p>
              </div>
              <div className="bg-white/40 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Planetary Enemies</h3>
                <p className="text-sm text-gray-600">
                  {Array.isArray(data.enemies) ? data.enemies.join(', ') : data.enemies}
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Select a tab to view content</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            The Nature of the Planets
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Complete astrological reference from William Lilly's "Christian Astrology" with precise angular data for 4D solar system visualization. Each planet contains motion cycles, dignities, correspondences, and orbital mechanics.
          </p>
        </div>

        {/* Lunar Nodes Section */}
        <div className="mb-12 bg-gradient-to-r from-purple-200/40 to-indigo-200/40 backdrop-blur-md rounded-xl p-6 border border-white/30">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">The Lunar Nodes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/40 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <span className="text-2xl mr-2">☊</span>
                {LUNAR_NODES.northNode.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2"><strong>Nature:</strong> {LUNAR_NODES.northNode.nature}</p>
              <p className="text-sm text-gray-600 mb-2">{LUNAR_NODES.northNode.description}</p>
              <p className="text-sm text-gray-600"><strong>Effect:</strong> {LUNAR_NODES.northNode.effect}</p>
            </div>
            <div className="bg-white/40 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <span className="text-2xl mr-2">☋</span>
                {LUNAR_NODES.southNode.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2"><strong>Nature:</strong> {LUNAR_NODES.southNode.nature}</p>
              <p className="text-sm text-gray-600 mb-2">{LUNAR_NODES.southNode.description}</p>
              <p className="text-sm text-gray-600"><strong>Effect:</strong> {LUNAR_NODES.southNode.effect}</p>
            </div>
          </div>
        </div>

        {/* Planets */}
        {planetOrder.map((planet) => {
          const data = PLANETARY_DATA[planet];
          const isExpanded = expandedPlanet === planet;
          
          return (
            <div key={planet} className="mb-8 bg-white/20 backdrop-blur-md rounded-xl shadow-xl border border-white/30 overflow-hidden">
              {/* Header */}
              <div 
                className={`bg-gradient-to-r ${planetColors[planet]} p-6 cursor-pointer transition-all duration-300 hover:shadow-lg`}
                onClick={() => handlePlanetToggle(planet)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl text-white font-bold">
                      {planetIcons[planet]}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{data.name}</h2>
                      <p className="text-white/80 text-sm">
                        {data.alternateNames?.join(', ') || 'Classical Planet'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-white">
                    <div className="text-right">
                      <div className="text-sm opacity-80">Orbital Period</div>
                      <div className="font-semibold">{PLANETARY_ANGULAR_DATA[planet]?.orbitalPeriod || data.motion?.zodiacCycle}</div>
                    </div>
                    {isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="p-6">
                  {/* Tab Navigation */}
                  <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200/30 pb-4">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                          activeTab === tab.id
                            ? `bg-gradient-to-r ${planetColors[planet]} text-white shadow-md`
                            : 'bg-white/30 text-gray-700 hover:bg-white/50'
                        }`}
                      >
                        {tab.icon}
                        <span className="text-sm font-medium">{tab.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <div className="min-h-[400px]">
                    {renderTabContent(planet, data)}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Footer Note */}
        <div className="text-center mt-12 p-6 bg-gradient-to-r from-amber-100/50 to-orange-100/50 rounded-lg border border-amber-200/30">
          <p className="text-gray-700 text-sm">
            <strong>Note:</strong> All angular data (orbital inclinations, axial tilts, rotation periods) are precisely calculated for the upcoming 4D interactive solar system visualization. 
            The astrological motion data includes retrograde cycles, stationary periods, and daily motion rates as recorded in classical texts.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Source: William Lilly's "Christian Astrology" (1647) combined with modern astronomical data for complete planetary mechanics.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlanetaryNatureReference;
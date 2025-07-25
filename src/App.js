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
import PlanetaryNatureReference from './components/PlanetaryNatureReference';
import InteractiveSolarSystem from './components/InteractiveSolarSystem';

// Import supporting components
import WaterBackground from './components/WaterBackground'; 

// Chinese Zodiac calculation and interpretations
const getChineseZodiac = () => {
  const currentYear = new Date().getFullYear();
  
  // Chinese zodiac 12-year cycle starting from 1924 (Year of the Rat)
  const zodiacAnimals = [
    'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 
    'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'
  ];
  
  // Calculate the zodiac index (1924 was Year of the Rat, index 0)
  const zodiacIndex = (currentYear - 1924) % 12;
  return zodiacAnimals[zodiacIndex];
};

const getChineseZodiacWisdom = (animal) => {
  const zodiacWisdom = {
    'Rat': {
      chinese: '鼠',
      traits: "Responsiveness, intuitiveness, insight",
      superpower: "Problem-solving abilities, quick mind, and outside-the-box thinking",
      description: "You don't always realize just how extraordinary your problem-solving abilities, quick mind, and outside-the-box thinking truly are. Your hidden superpower is the ability to tackle challenges with ease and grace.",
      love: "You bring your problem-solving superpowers into relationships, turning challenges into opportunities for connection. You have a sixth sense for when something's off and jump in with just the right solution.",
      work: "You absolutely thrive in fast-paced, high-pressure environments. Whether you're brainstorming brilliant ideas or troubleshooting last-minute problems, you're in your element when it's time to think on your feet.",
      legend: "Won the Great Race by strategically riding on the Ox's back and jumping off at the last moment to cross the finish line first."
    },
    'Ox': {
      chinese: '牛',
      traits: "Reliability, strength, determination",
      superpower: "Steady, dependable nature and ability to stay calm under pressure",
      description: "You take for granted just how valuable your steady, dependable nature is in this world of uncertainty. While others rush or flake, you are built for endurance, patience, and persistence.",
      love: "You bring your superpower of consistency and stability into relationships. You take promises seriously, respecting the sanctity of vows and always showing up for your loved ones.",
      work: "Your superpower shines in environments that demand long-term focus and dedication. You're the dependable glue that holds a team together.",
      legend: "Helped the Rat cross the river and came in second place, showing the generous and dependable nature of the Ox."
    },
    'Tiger': {
      chinese: '虎',
      traits: "Bravery, confidence, charisma",
      superpower: "Fearless courage to do what others won't dare",
      description: "You don't realize your superpower is your fearless courage to do what others won't dare. You're just doing you when you effortlessly tackle challenges that make most people hesitate.",
      love: "Your superpower is your fearless emotional vulnerability. You aren't shy when it comes to romance: When you know what you want, you go for it!",
      work: "You use your brave spirit to advocate for others and to push boundaries. You're the one charming a tough boss into change or convincing a difficult client to seal the deal.",
      legend: "Despite its speed, came 3rd because the force of the current had made it deviate from its trajectory, showing determination despite obstacles."
    },
    'Rabbit': {
      chinese: '兔',
      traits: "Elegance, kindness, responsibility",
      superpower: "Uncanny ability to bring peace and serenity to chaotic situations",
      description: "You don't realize how your uncanny ability to bring peace and serenity to even the most chaotic situations is a much-needed superpower! Your soothing vibe is like a massage after a tough day.",
      love: "Your relationship superpower is knowing exactly what your partner needs, often before they even say a word. You sense when your partner has had a rough day and go the extra mile to brighten their mood.",
      work: "Your superpower lies in your ability to make everyone on your team feel seen and heard. You understand the power of kind words and lift your co-workers up when they need it most.",
      legend: "Placed 4th by using agility to move with the help of stones and logs, possibly with secret help from the Dragon."
    },
    'Dragon': {
      chinese: '龙',
      traits: "Intelligence, power, success",
      superpower: "Ability to inspire others and manifest wildest dreams",
      description: "You're too busy chasing your dreams to realize how your ability to inspire others is truly a superpower! You effortlessly manifest even your wildest ideas and ambitions with a combination of innovation, confidence, and action.",
      love: "You're not just a romantic companion — you're a true partner who is ready to roll up your sleeves and help your significant other chase their dreams.",
      work: "At work, you often find yourself in the role of the boss who leads by example, champions innovation, and stands by your team through thick and thin.",
      legend: "Could fly but came 5th because it stopped to help villagers trapped in a fire, showing the Dragon's noble and helpful nature."
    },
    'Snake': {
      chinese: '蛇',
      traits: "Clairvoyance, intelligence, insight",
      superpower: "Uncanny ability to see through other people's motivations",
      description: "Your uncanny ability to see through other people's motivations is so innate, that you don't realize how special it is! You can read situations, pick up on hidden details, and catch things others miss.",
      love: "Your intuition serves as a superpower in relationships. You know what your partner needs even before they do! With you, there's no room for secrets — you see right through them.",
      work: "It's no surprise you excel in roles that require strategy and emotional intelligence. Whether you're negotiating deals, managing relationships, or making sales, your superpower lies in your ability to read people and situations effortlessly.",
      legend: "Placed 6th by hiding and surprising the Horse at the finish line, showing the Snake's strategic and clever nature."
    },
    'Horse': {
      chinese: '马',
      traits: "Energy, liveliness, dynamism",
      superpower: "Being the life of the party with boundless energy and charisma",
      description: "You're proof that being the life of the party can actually be a superpower! With boundless energy, effortless charisma, and a knack for storytelling, you light up every room you enter.",
      love: "You use your superpower in relationships to keep things fun, exciting, and full of laughter. There's never a dull moment with you, and every day feels like a new opportunity to fall in love all over again.",
      work: "Your unmatched ability to get along with people from all walks of life makes you a superhero at work! There's no one you can't charm, and your natural charisma makes you a master at winning people over.",
      legend: "Arrived at a gallop but was surprised by the Snake and placed 7th, showing the Horse's speed but also its honest, straightforward nature."
    },
    'Goat': {
      chinese: '羊',
      traits: "Calm, gentleness, creativity, perseverance",
      superpower: "Seeing life as a work of art and bringing beauty to ordinary world",
      description: "You see a life well lived as a work of art, with each day adding a new stroke to the canvas. This often unrealized superpower helps bring color, beauty, and perspective to an otherwise ordinary world.",
      love: "You instinctively aim for peace and harmony in your relationships. You don't just say 'I love you'— you show it in thoughtful, creative ways that make your partner feel cherished.",
      work: "Your superpower at work is your immense creativity which you often take for granted. You have an unmatched ability to convey emotion and make people feel connected.",
      legend: "Teamed up with Monkey and Rooster to cross on a raft and placed 8th, showing the Goat's collaborative and peaceful nature."
    },
    'Monkey': {
      chinese: '猴',
      traits: "Intelligence, curiosity, humor",
      superpower: "Remarkable ability to think on your feet and thrive in unpredictable situations",
      description: "You don't realize how your remarkable ability to think on your feet is actually a superpower! You literally thrive in unpredictable situations that leave others flustered.",
      love: "Your ability to find humor even in the toughest situations is your relationship superpower. You're a pro at turning an ordinary day into a spontaneous adventure.",
      work: "You shine in high-pressure environments that demand quick thinking and adaptability. This superpower allows you to excel in situations where others might crumble.",
      legend: "Worked with Goat and Rooster on a raft and placed 9th, showing the Monkey's cleverness and ability to work with others."
    },
    'Rooster': {
      chinese: '鸡',
      traits: "Observation, pride, optimism",
      superpower: "Impeccable attention to detail",
      description: "Your impeccable attention to detail is a superpower you take for granted! Others marvel at how effortlessly put-together you are — that's because your keen eye for detail allows you to easily spot imperfections and fix them before anyone notices!",
      love: "Your relationship superpower is your thoughtful attention to the little things — because those are the things that matter most! Your ability to anticipate your partner's needs makes them feel deeply cared for.",
      work: "At work, your superpower is your unmatched ability to bring organization and precision to any task. You thrive in roles where your knack for spotting errors and refining details can shine.",
      legend: "Collaborated with Goat and Monkey on a raft and placed 10th, showing the Rooster's team spirit and organizational skills."
    },
    'Dog': {
      chinese: '狗',
      traits: "Honesty, prudence, loyalty",
      superpower: "Unwavering loyalty and protective nature",
      description: "Your unwavering loyalty and protective nature — which come so naturally to you — are actually your superpower! You're known for your strong sense of justice and your knack for making people feel safe, valued, and heard.",
      love: "It's no surprise that your relationship superpower is your fierce loyalty. Once you make a promise, you stick to it through thick and thin. You're the ultimate ride-or-die partner.",
      work: "Your ability to lead and instill trust helps you excel in team settings at work. You're a natural mediator and can be counted on to create an environment where everyone feels supported and valued.",
      legend: "Placed 11th because it stopped to cool off in the river water, showing the Dog's honest and sometimes distracted nature."
    },
    'Pig': {
      chinese: '猪',
      traits: "Generosity, concentration, energy",
      superpower: "Incredible ability to put others at ease",
      description: "Your unrealized superpower is your incredible ability to put others at ease. Your accepting and nonjudgmental nature is a rare gift. People feel comfortable letting their guard down around you.",
      love: "Your relationship superpower is making your partner feel like the most cherished person on the planet. You're deeply affectionate and thoughtful, always looking for ways to prioritize their needs.",
      work: "At work, your superpower is the ability to build connections and create a positive environment. No stiff meetings or rigid vibes in your space — you make everyone feel welcome and appreciated!",
      legend: "Placed 12th because it got hungry, stopped to eat, then fell asleep before continuing the race, showing the Pig's love of life's pleasures and laid-back nature."
    }
  };
  
  return zodiacWisdom[animal] || {
    traits: "Special qualities",
    superpower: "Unique abilities",
    description: "A special place in the Chinese zodiac.",
    love: "Brings special qualities to relationships.",
    work: "Excels in unique ways at work."
  };
};

// Numerology calculation functions
const reduceToSingleDigit = (num) => {
  while (num > 9 && num !== 11 && num !== 22) {
    num = String(num).split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  }
  return num;
};

const calculateTodayNumerology = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const year = today.getFullYear();
  
  const yearReduced = reduceToSingleDigit(year);
  const mainSum = month + day + yearReduced;
  const finalReduction = reduceToSingleDigit(mainSum);
  
  return {
    month,
    day,
    year,
    yearReduced,
    mainSum,
    finalReduction,
    formatted: today.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  };
};

// Sepher Yetzirah Path Interpretations - ALL 32 PATHS OF WISDOM
const getSepherYetzirahWisdom = (number) => {
  const pathWisdom = {
    1: {
      path: "The First Path - The Admirable or Concealed Intelligence (The Highest Crown)",
      description: "The Light giving the power of comprehension of that First Principle which has no beginning, and it is the Primal Glory, for no created being can attain to its essence.",
      qualities: "LEADERSHIP, INDEPENDENCE, NEW BEGINNINGS",
      element: "Spirit of the Living God - The Holy Spirit is his Voice, his Spirit, and his Word",
      hebrewLetter: "ALEPH (א) - Air, spiritual mediator, the tongue of balance",
      bodyPart: "Head, chest (breathing air), spiritual center",
      planet: "Air/Spirit - rules over temperate climate and spiritual air",
      zodiac: "The Fool - pure potential and divine breath",
      meaning: "Today carries the energy of the Primal Glory. You are connected to the highest creative force through the sacred breath of Aleph. This is a day for initiating new ventures and expressing your individual will. Trust your inner divine spark and let the spiritual air flow through you."
    },
    2: {
      path: "The Second Path - The Illuminating Intelligence (The Crown of Creation)",
      description: "It is the Crown of Creation, the Splendor of the Unity, equaling it, and it is exalted above every head, and named by the Kabbalists the Second Glory.",
      qualities: "COOPERATION, PARTNERSHIP, BALANCE",
      element: "Air - From the Spirit he made Air and formed for speech twenty-two letters",
      hebrewLetter: "Twenty-two letters formed by voice, impressed on air",
      bodyPart: "Throat, voice, organs of speech",
      planet: "Mercury/Moon - rules communication and reflection",
      zodiac: "The path between crown emanations",
      meaning: "Today resonates with the Crown of Creation. Work in harmony with others through the power of speech and the twenty-two sacred letters. Your diplomatic nature and sensitivity to details will create magnificent results through proper communication."
    },
    3: {
      path: "The Third Path - The Sanctifying Intelligence",
      description: "The basis of foundation of Primordial Wisdom, which is called the Former of Faith, and its roots, Amen; and it is the parent of Faith, from which virtues doth Faith emanate.",
      qualities: "CREATIVE EXPRESSION, JOY, COMMUNICATION", 
      element: "MEM (מ) - Primeval Water, mute as water, Earth formed from water",
      hebrewLetter: "MEM - Mother letter of Water, cold in the year, belly/womb in mankind",
      bodyPart: "Belly, womb, fruit of the womb, digestive system",
      planet: "MOON - Luna, Monday influence, Water element - rules over cold season and fertility",
      zodiac: "Death/Transformation - water's power to dissolve and renew",
      meaning: "Today flows with Sanctifying Intelligence through the sacred waters of Mem. Express your creativity from the primordial depths. This is the foundation of faith - let your creative waters flow and nourish new life like the womb carries the fruit."
    },
    4: {
      path: "The Fourth Path - The Measuring, Cohesive, or Receptacular Intelligence",
      description: "So called because it contains all the holy powers, and from it emanate all the spiritual virtues with the most exalted essences: they emanate one from the other by the power of the primordial emanation.",
      qualities: "HARD WORK, ORGANIZATION, STABILITY",
      element: "SHIN (ש) - Fire, hissing as fire, heaven in universe, heat in year, head in mankind",
      hebrewLetter: "SHIN - Mother letter of Fire, hot beyond fourth degree, head of man and woman",
      bodyPart: "Head, brain, crown chakra, nervous system",
      planet: "Fire element - rules over heat, summer, and mental activity",
      zodiac: "Judgment - the fire of divine discrimination",
      meaning: "Today embodies the Measuring Intelligence through the sacred fire of Shin. Build solid foundations through disciplined mental effort. All spiritual virtues emanate from the fire in your head - use this divine flame to organize and structure your reality."
    },
    5: {
      path: "The Fifth Path - The Radical Intelligence", 
      description: "Because it is itself the essence equal to the Unity, uniting itself to the BINAH or Intelligence which emanates from the primordial depths of Wisdom or CHOCHMAH.",
      qualities: "FREEDOM, CHANGE, ADVENTURE",
      element: "Height and Depth - He looked above and sealed the height, He looked below and sealed the deep",
      hebrewLetter: "The three mothers combined in six directions with the great Name IHV",
      bodyPart: "Spine, central nervous system connecting heaven and earth",
      planet: "Jupiter - expansion and higher wisdom from Chochmah",
      zodiac: "The Hierophant - bridging heaven and earth through wisdom",
      meaning: "Today channels Radical Intelligence from the primordial depths of Chochmah. Embrace change and seek new experiences. You are connected to both the heights and depths - let this unity guide your adventures between the spiritual and material worlds."
    },
    6: {
      path: "The Sixth Path - The Intelligence of the Mediating Influence",
      description: "Because in it are multiplied the influxes of the emanations; for it causes that affluence to flow into all the reservoirs of the Blessings, with which these themselves are united.",
      qualities: "LOVE, RESPONSIBILITY, NURTURING",
      element: "East and West - He looked forward and sealed the East, He looked backward and sealed the West",
      hebrewLetter: "The directional sealings with permutations of the divine name",
      bodyPart: "Heart, circulatory system, arms reaching east and west",
      planet: "Venus - love and harmony flowing between opposites",
      zodiac: "The Lovers - uniting opposing forces through love",
      meaning: "Today flows with Mediating Intelligence between East and West. You are a channel for blessings to flow between opposing forces. Focus on love, family, and creating harmony by bridging differences and uniting what seems separate."
    },
    7: {
      path: "The Seventh Path - The Occult Intelligence",
      description: "Because it is the Refulgent Splendor of all the Intellectual virtues which are perceived by the eyes of intellect, and by the contemplation of faith.",
      qualities: "INTROSPECTION, ANALYSIS, SPIRITUAL GROWTH",
      element: "North and South - He looked right and sealed South, He looked left and sealed North", 
      hebrewLetter: "The directional sealings completing the cube of space",
      bodyPart: "Eyes, third eye, pineal gland, organs of spiritual perception",
      planet: "Neptune - mystical perception and spiritual vision",
      zodiac: "The Chariot - controlling opposing forces through will",
      meaning: "Today reveals Occult Intelligence through the axis of North and South. Seek wisdom through contemplation and inner reflection. The intellectual virtues shine through your spiritual eyes - see beyond the material into the hidden splendor."
    },
    8: {
      path: "The Eighth Path - The Absolute or Perfect Intelligence",
      description: "Because it is the means of the primordial, which has no root by which it can cleave, nor rest, except in the hidden places of GEDULAH (Magnificence), which emanate from its own proper essence.",
      qualities: "MATERIAL ACHIEVEMENT, BUSINESS SUCCESS, POWER",
      element: "The Throne of Honor with Auphanim, Seraphim, Holy Animals, and ministering Angels",
      hebrewLetter: "From Water He designed Fire and formed for himself a throne of honor",
      bodyPart: "Solar plexus, adrenal glands, organs of power and manifestation",
      planet: "Mars - the fire of achievement and material conquest",
      zodiac: "Strength - taming the material world through spiritual power",
      meaning: "Today embodies Perfect Intelligence from the hidden places of Magnificence. Focus on material accomplishment and business matters. You sit on the throne of honor with angelic assistance - use this divine fire to achieve worldly success through spiritual principles."
    },
    9: {
      path: "The Ninth Path - The Pure Intelligence",
      description: "So called because it purifies the Numerations, it proves and corrects the designing of their representation, and disposes their unity with which they are combined without diminution or division.",
      qualities: "COMPLETION, HUMANITARIANISM, WISDOM",
      element: "The Unity of All Numerations - Ten Sephiroth that are ineffable",
      hebrewLetter: "The perfection of the Decad - ten and not nine, ten and not eleven",
      bodyPart: "Crown chakra, nervous system, the complete human form",
      planet: "Saturn - the teacher of completion and karmic wisdom",
      zodiac: "The Hermit - the wise one who has mastered all numbers",
      meaning: "Today flows with Pure Intelligence that purifies all Numerations. Complete what you have begun and serve humanity. You can see the unity that connects all things without diminution or division - share this perfect wisdom with the world."
    },
    10: {
      path: "The Tenth Path - The Resplendent Intelligence", 
      description: "Because it is exalted above every head, and sits on the throne of BINAH (the Intelligence). It illuminates the splendor of all lights, and causes a supply of influence to emanate from the Prince of countenances.",
      qualities: "MANIFESTATION, MATERIAL WORLD, COMPLETION",
      element: "The Kingdom - Where the ten ineffable Sephiroth manifest in the material world",
      hebrewLetter: "The final emanation of the Decad into physical reality",
      bodyPart: "Feet, base chakra, connection to earth and material plane",
      planet: "Earth itself - the final manifestation of all celestial influences",
      zodiac: "The World - completion of the great work in matter",
      meaning: "Today shines with Resplendent Intelligence on the throne of Understanding. You illuminate the splendor of all lights in the material world. All divine influences flow through you into physical manifestation - you are the bridge between heaven and earth."
    },
    11: {
      path: "The Eleventh Path - The Scintillating Intelligence",
      description: "Because it is the essence of that curtain which is placed close to the order of the disposition, and this is a special dignity given to it that it may be able to stand before the Face of the Cause of Causes.",
      qualities: "SPIRITUAL ILLUMINATION, INTUITION, INSPIRATION",
      element: "BETH (ב) - Wisdom, Moon in Universe, first day of week, right eye of man",
      hebrewLetter: "BETH - Double letter, predominant in wisdom, life and death",
      bodyPart: "Right eye, brain hemispheres, organs of wisdom",
      planet: "MOON - Luna, first day (Sunday night), wisdom and reflection",
      zodiac: "The Magician - channeling divine will through material means",
      meaning: "Today scintillates with divine light through the Moon's wisdom in your right eye. You stand before the Cause of Causes with special dignity. Trust your lunar intuition and let the scintillating intelligence of Beth illuminate your magical workings."
    },
    22: {
      path: "The Twenty-second Path - The Faithful Intelligence",
      description: "And is so called because by it spiritual virtues are increased, and all dwellers on earth are nearly under its shadow.",
      qualities: "MASTER BUILDING, TURNING VISIONS INTO REALITY", 
      element: "TAU (ת) - Beauty, Jupiter in Universe, seventh day of week, mouth of man",
      hebrewLetter: "TAU - Double letter, predominant in beauty, beauty and deformity",
      bodyPart: "Mouth, organs of speech, throat chakra",
      planet: "JUPITER - Seventh day (Saturday), beauty and expansion",
      zodiac: "The Universe/World - the completion of the great work",
      meaning: "Today carries Faithful Intelligence through Jupiter's beauty in your mouth. You have the power to speak grand visions into concrete reality. All dwellers on earth benefit from the beautiful words and spiritual virtues you manifest through faithful speech."
    }
  };
  
  // Add the remaining paths 12-21 if needed for other calculations
  const additionalPaths = {
    12: { path: "The Twelfth Path - Intelligence of Transparency", element: "GIMEL (ג) - Health, Mars, second day, right ear", description: "CHAZCHAZIT - place whence issues the vision of seers in apparitions" },
    13: { path: "The Thirteenth Path - Uniting Intelligence", element: "DALETH (ד) - Fertility, Sun, third day, right nostril", description: "The essence of Glory, consummation of Truth of individual spiritual things" },
    14: { path: "The Fourteenth Path - Illuminating Intelligence", element: "KAPH (כ) - Life, Venus, fourth day, left eye", description: "CHASHMAL founder of concealed and fundamental ideas of holiness" },
    15: { path: "The Fifteenth Path - Constituting Intelligence", element: "PE (פ) - Power, Mercury, fifth day, left ear", description: "Constitutes substance of creation in pure darkness" },
    16: { path: "The Sixteenth Path - Triumphal Intelligence", element: "RESH (ר) - Peace, Saturn, sixth day, left nostril", description: "The pleasure of Glory, Paradise prepared for the Righteous" },
    17: { path: "The Seventeenth Path - Disposing Intelligence", element: "HE (ה) - Speech, Aries, Nisan, right foot", description: "Provides Faith to the Righteous, Foundation of Excellence" },
    18: { path: "The Eighteenth Path - House of Influence", element: "VAU (ו) - Mind, Taurus, Iyar, right kidney", description: "Greatness of abundance, influx of good things" },
    19: { path: "The Nineteenth Path - Intelligence of Activities", element: "ZAIN (ז) - Movement, Gemini, Sivan, left foot", description: "Intelligence of all activities of spiritual beings" },
    20: { path: "The Twentieth Path - Intelligence of Will", element: "HETH (ח) - Sight, Cancer, Tammuz, right hand", description: "Means of preparation of all created beings" },
    21: { path: "The Twenty-first Path - Intelligence of Conciliation", element: "TETH (ט) - Hearing, Leo, Ab, left kidney", description: "Receives divine influence flowing from benediction" }
  };
  
  return pathWisdom[number] || additionalPaths[number] || {
    path: "A Sacred Path of the Thirty-Two Paths of Wisdom",
    description: "One of the thirty-two paths by which JAH the Lord of Hosts engraved his name through Number, Writing, and Speech.",
    qualities: "DIVINE MYSTERY, SPIRITUAL GROWTH, SACRED GEOMETRY",
    element: "The ineffable emanations beyond the ten Sephiroth",
    hebrewLetter: "One of the twenty-two foundation letters of creation",
    bodyPart: "The complete human microcosm reflecting the macrocosm",
    planet: "The celestial influences in their divine harmony",
    zodiac: "The eternal dance of cosmic forces",
    meaning: "Today carries a special spiritual energy from the thirty-two paths of wisdom. You are connected to the sacred geometry through which the Divine creates all existence through Number, Writing, and Speech."
  };
};

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

            .animate-fire-glow {
                animation: fireGlow 3s ease-in-out infinite;
                filter: drop-shadow(0 0 6px rgba(255, 165, 0, 0.5)) drop-shadow(0 0 12px rgba(255, 69, 0, 0.3));
            }

            @keyframes fireGlow {
                0%, 100% {
                    filter: drop-shadow(0 0 6px rgba(255, 165, 0, 0.5)) drop-shadow(0 0 12px rgba(255, 69, 0, 0.3));
                    text-shadow: 0 0 8px rgba(255, 215, 0, 0.4), 0 0 16px rgba(255, 140, 0, 0.3), 0 0 24px rgba(139, 69, 19, 0.6);
                }
                50% {
                    filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 16px rgba(255, 140, 0, 0.4));
                    text-shadow: 0 0 12px rgba(255, 215, 0, 0.5), 0 0 20px rgba(255, 140, 0, 0.4), 0 0 28px rgba(139, 69, 19, 0.7);
                }
            }

            .animate-blue-glow {
                animation: darkRedGlow 2s ease-in-out infinite;
            }

            @keyframes darkRedGlow {
                0%, 100% {
                    text-shadow: 0 0 4px rgba(139, 69, 19, 0.6), 0 0 8px rgba(165, 42, 42, 0.4), 0 0 12px rgba(139, 0, 0, 0.3);
                }
                50% {
                    text-shadow: 0 0 6px rgba(139, 69, 19, 0.8), 0 0 12px rgba(165, 42, 42, 0.6), 0 0 16px rgba(139, 0, 0, 0.4);
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
                
                .animate-blue-glow {
                    animation: blueGlow 2s ease-in-out infinite;
                }

                @keyframes blueGlow {
                    0%, 100% {
                        text-shadow: 0 0 5px rgba(59, 130, 246, 0.5), 0 0 10px rgba(59, 130, 246, 0.3), 0 0 15px rgba(59, 130, 246, 0.2);
                    }
                    50% {
                        text-shadow: 0 0 8px rgba(59, 130, 246, 0.7), 0 0 15px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3);
                    }
                }
            `}</style>
        </div>
    );
};

// ----- Main App Component Refactored -----
const App = () => {
    // State to track which selector is currently active (index or null)
    const [activeSelectorIndex, setActiveSelectorIndex] = useState(null);
    
    // Calculate today's numerology and Chinese zodiac
    const todayEnergy = calculateTodayNumerology();
    const todayWisdom = getSepherYetzirahWisdom(todayEnergy.finalReduction);
    const chineseZodiac = getChineseZodiac();
    const zodiacWisdom = getChineseZodiacWisdom(chineseZodiac);

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
        { id: 'financial', title: 'Financial Institution Selector', description: 'Find financial institutions', icon: '🏦', component: <FinancialSelector /> },
        { id: 'planetary', title: 'Planetary Nature Reference', description: 'Explore Your Planetary Alignment', icon: '🏦', component: <PlanetaryNatureReference /> },
        { id: 'solar', title: 'Solar System', description: 'Explore Your Solar System', icon: '🏦', component: <InteractiveSolarSystem /> }

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
                        
                        {/* Today's Sacred Energy Section */}
                        <div className="bg-gradient-to-r from-purple-200/40 via-indigo-200/30 to-blue-200/40 backdrop-blur-md rounded-xl p-8 shadow-xl border-2 border-white/30 max-w-5xl mx-auto mb-12">
                            <div className="text-center mb-6">
                                <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text mb-2 relative
                                    drop-shadow-lg animate-fire-glow">
                                    ✨ Today's Sacred Energy ✨
                                </h2>
                                <p className="text-gray-700 font-medium">
                                    {todayEnergy.formatted}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {todayEnergy.month} + {todayEnergy.day} + {todayEnergy.yearReduced} = {todayEnergy.mainSum} → <span className="font-bold text-2xl text-purple-600">{todayEnergy.finalReduction}</span>
                                </p>
                                <p className="text-sm text-indigo-600 font-medium mt-1">
                                    🪐 Planetary Influence: {todayWisdom.planet}
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Left Side - Path Information */}
                                <div className="bg-white/40 rounded-lg p-6 shadow-md">
                                    <h3 className="text-xl font-bold text-purple-700 mb-3">
                                        🌟 {todayWisdom.path}
                                    </h3>
                                    <div className="space-y-3">
                                        <div>
                                            <h4 className="font-semibold text-indigo-700">Sacred Qualities:</h4>
                                            <p className="text-gray-700 text-sm font-medium">{todayWisdom.qualities}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-indigo-700">Elemental Association:</h4>
                                            <p className="text-gray-700 text-sm italic">{todayWisdom.element}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Right Side - Today's Meaning */}
                                <div className="bg-white/40 rounded-lg p-6 shadow-md">
                                    <h3 className="text-xl font-bold text-indigo-700 mb-3">
                                        🔮 Today's Spiritual Message
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed mb-4">
                                        {todayWisdom.meaning}
                                    </p>
                                    <div className="bg-gradient-to-r from-yellow-100/60 to-amber-100/60 rounded-lg p-3 border border-yellow-200/50">
                                        <p className="text-gray-800 text-sm italic">
                                            "{todayWisdom.description}"
                                        </p>
                                        <p className="text-right text-xs text-gray-600 mt-2">- Sepher Yetzirah</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Bottom CTA */}
                            <div className="text-center mt-6">
                                <Link
                                    to="/date-numerology"
                                    className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm font-medium"
                                >
                                    Explore Any Date's Sacred Wisdom →
                                </Link>
                                <Link
  to="/planetary-nature"
  className="inline-block px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm font-medium"
>
  🪐 Nature of the Planets →
</Link>
<Link
  to="/solar-system"
  className="inline-block px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm font-medium"
>
  Solar system →
</Link>
                            </div>
                        </div>
                        
                        {/* Chinese Zodiac Year Section */}
                        <div className="bg-gradient-to-r from-red-200/40 via-orange-200/30 to-yellow-200/40 backdrop-blur-md rounded-xl p-8 shadow-xl border-2 border-white/30 max-w-5xl mx-auto mb-12">
                            <div className="text-center mb-6">
                                <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text mb-2">
                                    🐉 Year of the {chineseZodiac} {zodiacWisdom.chinese} 🐉
                                </h2>
                                <p className="text-gray-700 font-medium">
                                    2025 Chinese Zodiac - {zodiacWisdom.traits}
                                </p>
                                <p className="text-sm text-orange-600 font-medium mt-1">
                                    🌟 Your Superpower: {zodiacWisdom.superpower}
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Left Side - Superpower & Description */}
                                <div className="bg-white/40 rounded-lg p-6 shadow-md">
                                    <h3 className="text-xl font-bold text-red-800 mb-3 animate-blue-glow">
                                        ✨ Your Hidden Superpower
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed mb-4">
                                        {zodiacWisdom.description}
                                    </p>
                                    <div className="bg-gradient-to-r from-orange-100/60 to-yellow-100/60 rounded-lg p-3 border border-orange-200/50">
                                        <h4 className="font-semibold text-orange-700 mb-1">🏮 Legend of the Great Race:</h4>
                                        <p className="text-gray-800 text-sm italic">
                                            {zodiacWisdom.legend}
                                        </p>
                                    </div>
                                </div>
                                
                                {/* Right Side - Love & Work Powers */}
                                <div className="bg-white/40 rounded-lg p-6 shadow-md">
                                    <h3 className="text-xl font-bold text-red-800 mb-3 animate-blue-glow">
                                        💫 How Your Superpower Manifests
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-semibold text-blue-600 mb-1">💖 In Love:</h4>
                                            <p className="text-gray-700 text-sm">{zodiacWisdom.love}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-blue-600 mb-1">💼 At Work:</h4>
                                            <p className="text-gray-700 text-sm">{zodiacWisdom.work}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Bottom CTA */}
                            <div className="text-center mt-6">
                                <p className="text-gray-600 text-sm mb-3">
                                    Discover more about your Chinese zodiac animal and how it influences your daily life!
                                </p>
                            </div>
                        </div>
                        
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
                            <Link
                                to="/date-numerology"
                                className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                            >
                                Daily Numerology →
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
import React, { useState, useEffect } from 'react';
import WaterBackground from './WaterBackground';

// Numerology calculation functions
const reduceToSingleDigit = (num) => {
  while (num > 9 && num !== 11 && num !== 22) {
    num = String(num).split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  }
  return num;
};

const calculateDateNumerology = (dateString) => {
  if (!dateString) return null;
  
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  
  // Calculate day number (reduced day for day interpretation)
  const dayNumber = reduceToSingleDigit(day);
  
  // Reduce year only
  const yearReduced = reduceToSingleDigit(year);
  
  // Check intermediate sums for master numbers FIRST
  const monthPlusDay = month + day;
  const dayPlusYear = day + yearReduced;
  const monthPlusYear = month + yearReduced;
  
  // Main calculation: month + day + year reduced
  const mainSum = month + day + yearReduced;
  
  // Final reduction - but preserve master numbers
  const finalReduction = reduceToSingleDigit(mainSum);
  
  // Check for special numbers
  const specialNumbers = [11, 22, 28, 29, 33, 13, 14, 16, 19, 44, 55];
  
  const masterNumbers = [];
  
  // Check pairs and their extensions
  if (specialNumbers.includes(monthPlusDay)) {
    masterNumbers.push({ 
      pair: `Month + Day`, 
      calculation: `${month} + ${day}`, 
      result: monthPlusDay,
      extension: null
    });
    
    // Add the third component
    const extended = monthPlusDay + yearReduced;
    if (specialNumbers.includes(extended)) {
      masterNumbers.push({
        pair: `+ Year`,
        calculation: `${monthPlusDay} + ${yearReduced}`,
        result: extended,
        extension: reduceToSingleDigit(extended)
      });
    }
  }
  
  if (specialNumbers.includes(dayPlusYear)) {
    masterNumbers.push({ 
      pair: `Day + Year`, 
      calculation: `${day} + ${yearReduced}`, 
      result: dayPlusYear,
      extension: null
    });
    
    // Add the third component
    const extended = dayPlusYear + month;
    if (specialNumbers.includes(extended)) {
      masterNumbers.push({
        pair: `+ Month`,
        calculation: `${dayPlusYear} + ${month}`,
        result: extended,
        extension: reduceToSingleDigit(extended)
      });
    }
  }
  
  if (specialNumbers.includes(monthPlusYear)) {
    masterNumbers.push({ 
      pair: `Month + Year`, 
      calculation: `${month} + ${yearReduced}`, 
      result: monthPlusYear,
      extension: null
    });
    
    // Add the third component
    const extended = monthPlusYear + day;
    if (specialNumbers.includes(extended)) {
      masterNumbers.push({
        pair: `+ Day`,
        calculation: `${monthPlusYear} + ${day}`,
        result: extended,
        extension: reduceToSingleDigit(extended)
      });
    }
  }
  
  const mainSpecial = specialNumbers.includes(mainSum);
  const finalSpecial = specialNumbers.includes(finalReduction);
  
  return {
    date: {
      month,
      day,
      year,
      formatted: date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    },
    calculations: {
      yearReduced,
      monthPlusDay,
      dayPlusYear, 
      monthPlusYear,
      mainSum,
      finalReduction,
      dayNumber
    },
    specialNumber: mainSpecial ? mainSum : null,
    finalMasterNumber: finalSpecial ? finalReduction : null,
    masterNumbers: masterNumbers || []
  };
};

// Planetary day interpretations
const getPlanetaryDay = (dateString) => {
  const date = new Date(dateString);
  const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  const planets = {
    0: 'Sun',     // Sunday
    1: 'Moon',    // Monday
    2: 'Mars',    // Tuesday
    3: 'Mercury', // Wednesday
    4: 'Jupiter', // Thursday
    5: 'Venus',   // Friday
    6: 'Saturn'   // Saturday
  };
  
  return planets[dayOfWeek];
};

const interpretPlanetaryDay = (planet) => {
  // Debug logging to see what planet we're getting
  console.log('interpretPlanetaryDay called with planet:', planet);
  
  const planetaryInfo = {
    'Saturn': {
      rulership: 'Saturday - Named after Saturn, Roman god of agriculture and time',
      gods: 'Roman: Saturn (god of agriculture) | Greek: Cronus (father of Zeus, god of time) | Hindu: Shani | Norse: Associated with restrictive forces',
      qualities: 'Extremely cold and dry. The greater malefic. Male. Diurnal. Jet-black, lead colour, pitch-dark.',
      personality: 'Fearful, timid, anxious, suspicious, miserly, melancholy, truth-telling, grave, trusty, unwilling to believe good of anyone.',
      activities: 'Exile and poverty, seeking solitariness, enslaving people by violence or treachery, fraud, weeping and wailing.',
      professions: 'Building, farming, grave-digging, selling iron/lead/bone/hair, fraudulent transactions.',
      body: 'Hair, nails, skin, bones, spleen, right ear, buttocks, knees. Represents old age.',
      diseases: 'Sickness, affliction, poverty, gout, disease of internal organs.',
      appearance: 'Ugly, tall, wizened, sour face, large head, eyebrows joined, small eyes, thick lips, awkward figure.',
      energy: 'A day of limitation, discipline, and hard work. Focus on building lasting foundations and accepting restrictions as stepping stones.'
    },
    'Sun': {
      rulership: 'Sunday - Named after the Sun (Sol in Norse mythology)',
      gods: 'Roman: Sol Invictus | Greek: Helios/Apollo | Hindu: Surya | Egyptian: Ra | Norse: Sol',
      qualities: 'Hot and dry, heat predominant. Male. Diurnal. Penetrating, pungent, shining reddish-yellow.',
      personality: 'Intelligent, patient, chaste but sensual, eager for knowledge and power, seeking good reputation, friendly, hot-tempered but quickly recovering.',
      activities: 'Longing for power and government, hankering after wealth, imposing will on others, reproving evil-doers.',
      professions: 'Receiving, giving and selling gold-brocades, noble actions.',
      body: 'Brains, nerves, stomach, right eye, head and chest, teeth, mouth. Represents full manhood.',
      diseases: 'Generally healthy, but can bring fever if afflicted.',
      appearance: 'Large head, white complexion inclining to yellow, long hair, yellow in eyes, large paunch.',
      energy: 'A day of leadership, self-expression, and personal power. Shine your light and take center stage.'
    },
    'Moon': {
      rulership: 'Monday - Named after the Moon (Mani in Norse mythology)',
      gods: 'Roman: Luna | Greek: Selene/Artemis | Hindu: Chandra | Egyptian: Isis (moon goddess) | Norse: Mani',
      qualities: 'Cold and moist, changeable. Beneficent and maleficent. Female. Nocturnal. Salt or insipid, blue and white.',
      personality: 'Simple, adaptable, good-hearted, forgetful, loquacious, timid, reveals secrets, cheerful, lover of women, anxious.',
      activities: 'Lying, calumniation, over-anxious for health, generous in distributing food, too uxorious, levity.',
      professions: 'Business matters, missions, agencies, accounting, medicine, geometry, selling food and silver.',
      body: 'Phlegm, skin, lungs, left eye, neck, breasts, stomach. Represents infancy to old age.',
      diseases: 'Diseases of many kinds, especially related to fluids and changeability.',
      appearance: 'Clear white complexion, erect gait, round face, long beard, eyebrows joined, good hair with locks.',
      energy: 'A day of intuition, emotions, and receptivity. Trust your feelings and go with the flow.'
    },
    'Mars': {
      rulership: 'Tuesday - Named after Tyr/Ti (Anglo-Saxon name for Mars, Norse god of war)',
      gods: 'Roman: Mars (god of war) | Greek: Ares (god of war) | Hindu: Mangala | Norse: Tyr (god of war and justice)',
      qualities: 'Extremely hot and dry. The lesser malefic. Male. Nocturnal. Bitter. Dark red.',
      personality: 'Confused opinions, ignorant, rash, evil conduct, licentious, bold, quarrelsome, unsteady, violent, shameless but quickly repentant.',
      activities: 'Marriage, travelling, litigation, business going to ruin, false testimony, lustful, bad companion, solitary, spiteful.',
      professions: 'Law-making, selling armour, blacksmiths, grooms, butchers, surgeons, brigandage, contention.',
      body: 'Fire and yellow bile, veins, liver, right nostril, pubes, gall-bladder. Represents youth.',
      diseases: 'Fever, violent ailments, accidents, cuts, burns.',
      appearance: 'Tall, large head, small eyes and ears, sharp grey eyes, good nose, thin lips, lank reddish hair, long fingers.',
      energy: 'A day of action, courage, and assertiveness. Take decisive action but avoid unnecessary conflicts.'
    },
    'Mercury': {
      rulership: 'Wednesday - Named after Odin/Woden (Anglo-Saxon name for Mercury, Norse god of wisdom)',
      gods: 'Roman: Mercury (messenger god) | Greek: Hermes (messenger, commerce, wisdom) | Hindu: Budha | Norse: Odin/Woden (wisdom, magic) | Egyptian: Thoth (wisdom, writing)',
      qualities: 'Moderately cold and dry. Beneficent. Male and diurnal by nature. Complex flavour, sky-blue mixed with darker colour.',
      personality: 'Sharp intelligence, affability, gentleness, elegance, farsightedness, changeable, deeply interested in business, keeps secrets.',
      activities: 'Teaching manners, theology, revelation, eloquent, good memory, ruining prospects by anxiety, fearful of enemies, frivolous.',
      professions: 'Merchants, calculators, astrologers, geometricians, philosophers, selling slaves/books/coins, barbers.',
      body: 'Black bile, arteries, gall-bladder, tongue, organs of speech. Represents childhood.',
      diseases: 'Nervous disorders, speech problems, mental anxiety.',
      appearance: 'Fine figure, brown complexion with greenish tinge, handsome, narrow forehead, thick ears, eyebrows joined, thin beard.',
      energy: 'A day of communication, learning, and mental agility. Perfect for study, writing, and networking.'
    },
    'Jupiter': {
      rulership: 'Thursday - Named after Thor (Norse god of thunder, associated with Jupiter)',
      gods: 'Roman: Jupiter (king of gods) | Greek: Zeus (king of gods, thunder) | Hindu: Brihaspati | Norse: Thor (thunder, strength)',
      qualities: 'Moderately warm and moist. The greater benefic. Male. Diurnal. Sweet, delicious. Dust-colour and white mixed with yellow.',
      personality: 'Good disposition, inspiring, intelligent, patient, high-minded, devout, chaste, truth-telling, learned, generous, noble.',
      activities: 'Friendliness, peacemaker, charitable, devoted to religion and good works, responsible, laughing, eloquent.',
      professions: 'Noble actions, good government, religion, interpretation of dreams, goldsmiths, banking, selling gold and silver.',
      body: 'Air and blood, arteries, heart, left ear, thighs, intestines, throat. Represents middle age.',
      diseases: 'Generally protective, but can bring sickness from excess or indulgence.',
      appearance: 'Fine figure, round face, thick prominent nose, large eyes, frank look, small beard, abundant curly reddish hair.',
      energy: 'A day of expansion, wisdom, and good fortune. Embrace opportunities for growth and higher learning.'
    },
    'Venus': {
      rulership: 'Friday - Named after Freya/Frigg (Norse goddess of love, associated with Venus)',
      gods: 'Roman: Venus (goddess of love, beauty) | Greek: Aphrodite (goddess of love, beauty, desire) | Hindu: Shukra | Norse: Freya/Frigg (love, beauty, fertility)',
      qualities: 'Moderately cold and moist. The lesser benefic. Female. Nocturnal. Fat and sweet flavour. Pure white tending to straw-colour.',
      personality: 'Good disposition, handsome face, good-natured, inclined to love and sensuality, friendliness, generosity, tenderness, pride, joy.',
      activities: 'Lazy, laughing, jesting, dancing, fond of wine and games, takes pleasure in everything, well-spoken, fond of ornaments.',
      professions: 'Works of beauty, commerce, dealing in pictures/colours, goldsmiths, tailoring, perfumes, pearls, composing songs, feasts.',
      body: 'Flesh, fat, spinal marrow, kidneys, left nostril, womb, genitals, hands. Represents youth and adolescence.',
      diseases: 'Generally pleasant, but can bring issues related to indulgence or reproductive health.',
      appearance: 'Fine round face, reddish-white complexion, double chin, fat cheeks, fine eyes, handsome neck, short fingers.',
      energy: 'A day of love, beauty, and pleasure. Focus on relationships, creativity, and enjoying life\'s finer things.'
    }
  };
  
  // ADD THIS FALLBACK - this is the fix!
  return planetaryInfo[planet] || {
    rulership: `${planet} Day - Classical planetary influence`,
    gods: `Classical planetary deity associated with ${planet}`,
    qualities: 'Traditional astrological qualities apply',
    personality: 'Planetary personality traits as per classical astrology',
    activities: 'Traditional planetary activities and influences',
    professions: 'Classical professions associated with this planet',
    body: 'Traditional body parts ruled by this planet',
    diseases: 'Classical health influences',
    appearance: 'Traditional physical characteristics',
    energy: `A day influenced by ${planet} energy and classical planetary attributes`
  };
};
const interpretMonthEnergy = (month) => {
  const monthInterpretations = {
    1: "JANUARY ENERGY: New beginnings, leadership, and independence. A month of fresh starts and pioneering ventures.",
    2: "FEBRUARY ENERGY: Cooperation, partnerships, and sensitivity. A month for working with others and building relationships.",
    3: "MARCH ENERGY: Creative expression, communication, and joy. A month for artistic endeavors and social expansion.",
    4: "APRIL ENERGY: Hard work, organization, and practical building. A month for establishing foundations and systems.",
    5: "MAY ENERGY: Freedom, change, and adventure. A month of variety, travel, and new experiences.",
    6: "JUNE ENERGY: Love, responsibility, and nurturing. A month focused on family, home, and caring for others.",
    7: "JULY ENERGY: Introspection, analysis, and spiritual growth. A month for study, meditation, and inner development.",
    8: "AUGUST ENERGY: Material achievement and business success. A month for financial goals and executive decisions.",
    9: "SEPTEMBER ENERGY: Completion, wisdom, and humanitarian service. A month for helping others and finishing projects.",
    10: "OCTOBER ENERGY: New cycles and enhanced leadership. A month combining fresh starts with mature wisdom.",
    11: "NOVEMBER ENERGY: Spiritual illumination and intuitive insights. A month of heightened psychic awareness and inspiration.",
    12: "DECEMBER ENERGY: Creative completion and joyful expression. A month for celebrating achievements and sharing joy."
  };
  return monthInterpretations[month] || "A month of unique energy and potential.";
};

const interpretYearEnergy = (year, yearReduced) => {
  const yearInterpretations = {
    1: "This is a 1 YEAR CYCLE: A time of new beginnings, independence, and leadership. Plant seeds for the future.",
    2: "This is a 2 YEAR CYCLE: A time of cooperation, partnership, and patient development. Build on last year's foundations.",
    3: "This is a 3 YEAR CYCLE: A time of creative expression, social expansion, and joyful communication. Share your talents.",
    4: "This is a 4 YEAR CYCLE: A time of hard work, organization, and building lasting structures. Focus on practical matters.",
    5: "This is a 5 YEAR CYCLE: A time of change, freedom, and adventure. Expect variety and new opportunities.",
    6: "This is a 6 YEAR CYCLE: A time of responsibility, love, and service. Focus on family, home, and community.",
    7: "This is a 7 YEAR CYCLE: A time of introspection, study, and spiritual development. Go within for wisdom.",
    8: "This is an 8 YEAR CYCLE: A time of material achievement, business success, and practical accomplishment.",
    9: "This is a 9 YEAR CYCLE: A time of completion, wisdom, and humanitarian service. End old cycles and give to others.",
    11: "This is an 11 YEAR CYCLE: A time of spiritual illumination, intuitive development, and inspiring others.",
    22: "This is a 22 YEAR CYCLE: A time of master building, turning visions into reality on a large scale."
  };
  return yearInterpretations[yearReduced] || "A year of unique spiritual significance.";
};

const interpretDayNumber = (number, actualDay = null) => {
  const interpretations = {
    1: "A day of new beginnings, leadership, and independence. Take initiative and start new projects. Express your individuality and originality. Perfect for pioneering ventures and taking charge of situations.",
    2: "A day for cooperation, partnerships, and sensitivity. Work with others and pay attention to details. Your diplomatic abilities shine today. Focus on harmony, patience, and working behind the scenes to facilitate group success.",
    3: "A day of creativity, expression, and joy of living. Express yourself freely through words, art, or social interaction. Your optimism and enthusiasm can inspire others. Perfect for creative projects and social gatherings.",
    4: "A day for hard work, organization, and building foundations. Focus on practical matters and be methodical. System and order are your tools for success. Accept limitations as stepping stones, not obstacles. This is about service, discipline, and creating lasting structures.",
    5: "A day of freedom, adventure, and constructive change. Embrace variety and be adaptable to new experiences. Use your versatility wisely - don't scatter your energies. Perfect for travel, new experiences, and breaking routine constructively.",
    6: "A day of responsibility, family, and nurturing. Take care of others and create harmony in your environment. Your ability to balance situations and show love makes you a natural healer today. Focus on home, family, and community service.",
    7: "A day for introspection, analysis, and spiritual growth. Seek wisdom and trust your intuition. This is a time for study, meditation, and connecting with deeper truths. You may feel 'different' today - embrace your unique perspective.",
    8: "A day of material achievement and business success. Focus on financial matters and executive decisions. Your organizational abilities and business acumen are heightened. Think big - this is a day for material accomplishment and power.",
    9: "A day of completion, humanitarianism, and giving. Help others and wrap up unfinished business. Your compassion and universal understanding can make a real difference. Focus on service and letting go of what no longer serves."
  };
  
  let baseInterpretation = interpretations[number] || "A day of unique energy and potential.";
  
  // Add special day information
  if (actualDay) {
    if (actualDay === 13) {
      baseInterpretation += "\n\n⚠️ KARMIC DAY 13: This is a karmic debt day that developed from avoiding work and shirking responsibility in past lives. Today requires extra hard work, discipline, and attention to detail. Avoid shortcuts - embrace the work fully. This day can bring significant accomplishment through honest effort, but challenges if you try to take the easy way out.\n\n✨ KARMIC POWER BOOST: For those who fully embrace the challenge and do the hard work required, this karmic day provides AMPLIFIED energy and exceptional potential for achievement. The universe rewards those who face their karmic debt head-on with extra strength, focus, and breakthrough opportunities in the areas of organization, system-building, and practical accomplishment.";
    } else if (actualDay === 14) {
      baseInterpretation += "\n\n⚠️ KARMIC DAY 14: This karmic debt comes from misusing freedom in past lives. Today requires constructive use of your freedom and learning from experience. Avoid overindulgence in physical pleasures. Focus on adaptability and growth through experience.\n\n✨ KARMIC POWER BOOST: Those who use their freedom constructively and learn from every experience gain enhanced versatility, wisdom, and the ability to adapt to any situation with grace and purpose.";
    } else if (actualDay === 16) {
      baseInterpretation += "\n\n⚠️ KARMIC DAY 16: This karmic debt developed from illicit love affairs that caused suffering in past lives. Today brings lessons about selfless love and spiritual awareness. Focus on service to others and letting go of ego-driven desires.\n\n✨ KARMIC POWER BOOST: Those who embrace selfless love and spiritual service receive profound spiritual insights, healing abilities, and the power to transform relationships through unconditional love.";
    } else if (actualDay === 19) {
      baseInterpretation += "\n\n⚠️ KARMIC DAY 19: This karmic debt comes from abuse of power and self-centered behavior in past lives. Today requires balancing independence with consideration for others. Avoid dominating or self-centered actions. True leadership means serving others.\n\n✨ KARMIC POWER BOOST: Those who learn to lead through service and balance independence with compassion gain extraordinary leadership abilities and the power to inspire and uplift others while achieving their own goals.";
    } else if (actualDay === 11 || actualDay === 29) {
      baseInterpretation += "\n\n✨ MASTER NUMBER DAY: This day carries elevated spiritual potential and heightened intuition. Pay attention to synchronicities and trust your inner guidance.";
    } else if (actualDay === 22) {
      baseInterpretation += "\n\n✨ MASTER BUILDER DAY: This day has the potential for turning visions into concrete reality. Think big and focus on projects that can benefit many people.";
    }
  }
  
  return baseInterpretation;
};

const interpretFullReduction = (number) => {
  const interpretations = {
    1: "This is ultimately a 1 day - a time for INDIVIDUATION, INDEPENDENCE, and ATTAINMENT. You must learn to stand on your own two feet and express leadership. This is about breaking free from dependence and pioneering new directions. Trust your instincts, take charge, and pursue your individual goals with courage.",
    2: "This is ultimately a 2 day - a time for RELATION and COOPERATION. The lesson today is about working harmoniously with others, being sensitive to their needs, and contributing to group success. Use diplomacy over force, pay attention to details, and find satisfaction in helping others achieve their goals.",
    3: "This is ultimately a 3 day - a time for EXPRESSION and JOY OF LIVING. Today is about creative self-expression, social connection, and sharing your joy with others. Whether through words, art, or simply your optimistic presence, you have the power to uplift and inspire. Embrace the lighter side of life.",
    4: "This is ultimately a 4 day - a time for accepting LIMITATION, creating ORDER, and being of SERVICE. Today requires hard work, discipline, and building practical foundations. Learn to work within limitations rather than fight them. Your systematic approach and attention to detail will create lasting value.",
    5: "This is ultimately a 5 day - a time for CONSTRUCTIVE FREEDOM. Life presents opportunities for change, adventure, and new experiences. Use your versatility and adaptability wisely. Don't scatter your energies - focus on experiences that will teach you and help you grow.",
    6: "This is ultimately a 6 day - a time for BALANCE, RESPONSIBILITY, and LOVE. You're called to take care of others, create harmony, and express unconditional love. Your home and family may need extra attention. Accept responsibilities gracefully and find joy in service to those you care about.",
    7: "This is ultimately a 7 day - a time for ANALYSIS and UNDERSTANDING. Withdraw from the outer world to develop your inner resources. Study, meditate, and seek wisdom. Trust your intuition and don't be concerned if you feel 'different' from others today. Spiritual insights await.",
    8: "This is ultimately an 8 day - a time for MATERIAL SATISFACTION and achievement. Focus on business matters, financial goals, and practical accomplishments. Your organizational and executive abilities are heightened. Think about power, status, and material success - but use them wisely.",
    9: "This is ultimately a 9 day - a time for SELFLESSNESS and HUMANITARIANISM. Give of yourself for the sheer pleasure of giving. Help others, complete unfinished business, and let go of what no longer serves. Your compassion and wisdom can make a profound difference in someone's life.",
    11: "This is ultimately an 11 day - a time for ILLUMINATION and spiritual inspiration. You're attuned to higher vibrations and psychic forces. Trust your intuition, inspire others by your example, and be ready to channel spiritual insights. This is a day of nervous tension but great potential for enlightenment.",
    22: "This is ultimately a 22 day - a time for MASTER BUILDING. You have the potential to turn idealistic visions into concrete reality. Think on a large scale and focus on projects that can benefit humanity. This is about combining spiritual awareness with practical achievement."
  };
  return interpretations[number] || "A day of unique spiritual significance.";
};

const interpretSpecialNumber = (number) => {
  const interpretations = {
    11: "Master Number 11: A day of heightened intuition, spiritual insight, and the potential to inspire others. Pay attention to synchronicities.",
    22: "Master Number 22: A day of master building potential. You can turn visions into reality through practical application.",
    28: "The Number 28 - The Day of Wealth! One of the most powerful numbers in numerology representing material abundance, financial success, and prosperity. This is an extremely auspicious day for business ventures, investments, and any money-related activities. The combination of 2 (cooperation) and 8 (achievement) creates the perfect formula for wealth creation through partnership and determination.",
    29: "The Number 29: A highly spiritual number combining the humanitarian 9 with the cooperative 2. This is a day for service, wisdom, and helping others.",
    33: "Master Number 33: The Master Teacher! A day of profound spiritual significance, compassion, and the ability to uplift humanity. This is a day for healing, teaching, and serving others with unconditional love.",
    44: "Master Number 44: The Master Healer! A day of practical healing, organizing for the greater good, and building systems that benefit many people.",
    55: "Master Number 55: A day of freedom, change, and progressive action. Major life changes and breakthroughs are possible.",
    13: "Karmic Number 13: A day requiring hard work and discipline. Avoid shortcuts and focus on honest effort.",
    14: "Karmic Number 14: A day to use freedom constructively. Avoid overindulgence and focus on learning from experience.",
    16: "Karmic Number 16: A day for spiritual growth and letting go of ego. Focus on selfless love and service.",
    19: "Karmic Number 19: A day to balance independence with consideration for others. Avoid being too self-centered."
  };
  return interpretations[number] || "A number of special significance in your numerological journey.";
};

// Main Date Numerology Calculator Component
const DateNumerologyCalculator = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [dateInput, setDateInput] = useState('');
  const [results, setResults] = useState(null);
  
  const handleDateInputSubmit = (e) => {
    e.preventDefault();
    if (dateInput) {
      // Try to parse the date input
      const dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
      const match = dateInput.match(dateRegex);
      if (match) {
        const [, month, day, year] = match;
        const dateString = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        setSelectedDate(dateString);
        setDateInput('');
      } else {
        alert('Please enter date in MM/DD/YYYY format');
      }
    }
  };
  
  useEffect(() => {
    if (selectedDate) {
      const calculation = calculateDateNumerology(selectedDate);
      setResults(calculation);
    }
  }, [selectedDate]);
  
  // Get today's date for default
  const today = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen relative overflow-hidden bg-transparent">
      <WaterBackground />
      
      <div className="relative z-10 bg-transparent">
        <div className="container mx-auto px-4 py-12">
          
          {/* Header */}
          <div className="text-center mb-16">
            <div className="relative mb-6">
              {/* Enhanced Title Section */}
              <div className="mb-8">
                <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600
                  bg-clip-text text-transparent bg-animate-gradient drop-shadow-lg">
                  ✨ Date Numerology ✨
                </h1>
                
                <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 max-w-3xl mx-auto border border-white/20 shadow-lg">
                  <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-4">
                    🔮 <span className="font-semibold">Discover the numerological significance of any date.</span> Each day carries its own energy and meaning.
                  </p>
                  <p className="text-cyan-600 font-medium text-base">
                    🌟 Use the date picker below to explore any date's numerology and planetary influences!
                  </p>
                </div>
              </div>
              
              {/* Enhanced Quick Day Overview */}
              {results && (
                <div className="bg-gradient-to-r from-indigo-200/40 via-purple-200/30 to-pink-200/40 backdrop-blur-md rounded-xl p-6 shadow-xl border-2 border-white/30 max-w-4xl mx-auto">
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                    
                    {/* Left Section - Day Info */}
                    <div className="text-center lg:text-left flex-1">
                      <div className="bg-white/40 rounded-lg p-4 shadow-md">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                          🗓️ {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' })} - {getPlanetaryDay(selectedDate)} Day
                        </h3>
                        <div className="space-y-1 text-sm">
                          <p className="text-gray-700">
                            <span className="font-semibold text-cyan-700">🔢 Numerology:</span> {results.calculations.finalReduction} Energy
                          </p>
                          <p className="text-gray-700">
                            <span className="font-semibold text-purple-700">🪐 Planet:</span> {getPlanetaryDay(selectedDate)}
                          </p>
                          <p className="text-gray-700">
                            <span className="font-semibold text-green-700">📅 Day Number:</span> {results.calculations.dayNumber}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Center Section - Planet Symbol */}
                    <div className="text-center">
                      <div className="bg-gradient-to-br from-yellow-200/50 to-orange-200/50 rounded-full p-6 shadow-lg border-2 border-yellow-300/50">
                        <div className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text mb-2">
                          {getPlanetaryDay(selectedDate)}
                        </div>
                        <p className="text-xs text-gray-600 font-medium max-w-xs">
                          🏛️ {interpretPlanetaryDay(getPlanetaryDay(selectedDate)).gods.split('|')[0].trim()}
                        </p>
                      </div>
                    </div>
                    
                    {/* Right Section - Energy Quote */}
                    <div className="text-center lg:text-right flex-1">
                      <div className="bg-white/40 rounded-lg p-4 shadow-md">
                        <h4 className="font-bold text-indigo-700 mb-2">✨ Today's Energy</h4>
                        <p className="text-gray-700 text-sm italic leading-relaxed">
                          "{interpretPlanetaryDay(getPlanetaryDay(selectedDate)).energy}"
                        </p>
                      </div>
                    </div>
                    
                  </div>
                  
                  {/* Bottom Special Numbers Highlight */}
                  {(results.specialNumber || (results.masterNumbers && results.masterNumbers.length > 0)) && (
                    <div className="mt-4 text-center">
                      <div className="bg-gradient-to-r from-yellow-200/60 to-amber-200/60 rounded-lg p-3 border border-yellow-300/50">
                        <p className="text-yellow-800 font-bold text-sm">
                          🌟 SPECIAL DAY DETECTED! 🌟 
                          {results.specialNumber && ` Main Number: ${results.specialNumber}`}
                          {results.masterNumbers && results.masterNumbers.length > 0 && ` • Master Combinations: ${results.masterNumbers.length}`}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Date Selector */}
          <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 shadow-lg mb-8 max-w-md mx-auto">
            <label className="block text-gray-700 font-medium mb-2">Select a Date</label>
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-lg mb-3"
            />
            
            <div className="text-center text-gray-600 mb-3">OR</div>
            
            <form onSubmit={handleDateInputSubmit} className="mb-3">
              <input 
                type="text" 
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
                placeholder="Type date: MM/DD/YYYY and press Enter"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-lg"
              />
            </form>
            
            <button 
              onClick={() => setSelectedDate(today)}
              className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-md hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Today's Energy
            </button>
          </div>

          {/* Results */}
          {results && (
            <div className="max-w-4xl mx-auto space-y-6">
              
              {/* Date Display */}
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 shadow-lg text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{results.date.formatted}</h2>
                <p className="text-gray-600">
                  {results.date.month}/{results.date.day}/{results.date.year}
                </p>
              </div>

              {/* Calculation Breakdown */}
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Numerological Breakdown</h3>
                
                {/* Step by step calculation */}
                <div className="space-y-4">
                  <div className="bg-white/30 p-4 rounded-md">
                    <h4 className="font-semibold text-lg mb-2">Step 1: Year Reduction</h4>
                    <p className="text-gray-700">
                      Year: {results.date.year} → {results.calculations.yearReduced}
                    </p>
                  </div>
                  
                  <div className="bg-white/30 p-4 rounded-md">
                    <h4 className="font-semibold text-lg mb-2">Step 2: Check Pair Combinations</h4>
                    <div className="space-y-2 text-gray-700">
                      <p>Month + Day: {results.date.month} + {results.date.day} = <span className="font-bold">{results.calculations.monthPlusDay}</span>
                        {[11, 22, 28, 29, 33, 13, 14, 16, 19, 44, 55].includes(results.calculations.monthPlusDay) && (
                          <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                            ✨ Special!
                          </span>
                        )}
                      </p>
                      <p>Day + Year: {results.date.day} + {results.calculations.yearReduced} = <span className="font-bold">{results.calculations.dayPlusYear}</span>
                        {[11, 22, 28, 29, 33, 13, 14, 16, 19, 44, 55].includes(results.calculations.dayPlusYear) && (
                          <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                            ✨ Special!
                          </span>
                        )}
                      </p>
                      <p>Month + Year: {results.date.month} + {results.calculations.yearReduced} = <span className="font-bold">{results.calculations.monthPlusYear}</span>
                        {[11, 22, 28, 29, 33, 13, 14, 16, 19, 44, 55].includes(results.calculations.monthPlusYear) && (
                          <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                            ✨ Special!
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white/30 p-4 rounded-md">
                    <h4 className="font-semibold text-lg mb-2">Step 3: Main Calculation</h4>
                    <p className="text-gray-700">
                      {results.date.month} + {results.date.day} + {results.calculations.yearReduced} = <span className="font-bold text-2xl">{results.calculations.mainSum}</span>
                      {results.specialNumber && (
                        <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                          ✨ Special Number!
                        </span>
                      )}
                    </p>
                  </div>
                  
                  <div className="bg-white/30 p-4 rounded-md">
                    <h4 className="font-semibold text-lg mb-2">Step 4: Final Reduction</h4>
                    <p className="text-gray-700">
                      {results.calculations.mainSum} → <span className="font-bold text-3xl text-blue-600">{results.calculations.finalReduction}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Results Grid - Month and Year on same level */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                
                {/* Month Energy */}
                <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 shadow-lg">
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold text-cyan-600 mb-2">{results.date.month}</div>
                    <h3 className="text-lg font-bold text-gray-800">Month Energy</h3>
                    <p className="text-gray-600">{new Date(2025, results.date.month - 1).toLocaleDateString('en-US', { month: 'long' })}</p>
                  </div>
                  <div className="bg-white/30 p-3 rounded-md">
                    <p className="text-gray-700 text-sm">{interpretMonthEnergy(results.date.month)}</p>
                  </div>
                </div>

                {/* Year Energy */}
                <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 shadow-lg">
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold text-orange-600 mb-2">{results.calculations.yearReduced}</div>
                    <h3 className="text-lg font-bold text-gray-800">Year Energy</h3>
                    <p className="text-gray-600">{results.date.year} → {results.calculations.yearReduced}</p>
                  </div>
                  <div className="bg-white/30 p-3 rounded-md">
                    <p className="text-gray-700 text-sm">{interpretYearEnergy(results.date.year, results.calculations.yearReduced)}</p>
                  </div>
                </div>
              </div>

              {/* Day Number - Full Width on its own level */}
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 shadow-lg">
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-green-600 mb-2">{results.calculations.dayNumber}</div>
                  <h3 className="text-lg font-bold text-gray-800">Day Number</h3>
                  <p className="text-gray-600">Based on the day ({results.date.day})</p>
                </div>
                <div className="bg-white/30 p-3 rounded-md">
                  <p className="text-gray-700 text-sm whitespace-pre-line">{interpretDayNumber(results.calculations.dayNumber, results.date.day)}</p>
                </div>
              </div>

              {/* Planetary Day Influence - Full Width */}
              <div className="bg-gradient-to-r from-indigo-200/40 to-purple-200/40 backdrop-blur-md rounded-lg p-6 shadow-lg border border-indigo-300/50">
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold text-indigo-600 mb-2">{getPlanetaryDay(selectedDate)}</div>
                  <h3 className="text-2xl font-bold text-gray-800">Planetary Day Influence</h3>
                  <p className="text-gray-600 mb-2">{interpretPlanetaryDay(getPlanetaryDay(selectedDate)).rulership}</p>
                  <div className="bg-white/30 p-3 rounded-md">
                    <h4 className="font-bold text-indigo-700 mb-1">🏛️ Divine Associations</h4>
                    <p className="text-gray-700 text-sm">{interpretPlanetaryDay(getPlanetaryDay(selectedDate)).gods}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-white/40 p-4 rounded-md">
                    <h4 className="font-bold text-indigo-700 mb-2">🌟 Day Energy & Qualities</h4>
                    <p className="text-gray-700 text-sm mb-2">{interpretPlanetaryDay(getPlanetaryDay(selectedDate)).energy}</p>
                    <p className="text-gray-700 text-xs">{interpretPlanetaryDay(getPlanetaryDay(selectedDate)).qualities}</p>
                  </div>
                  
                  <div className="bg-white/40 p-4 rounded-md">
                    <h4 className="font-bold text-indigo-700 mb-2">🧠 Personality Traits</h4>
                    <p className="text-gray-700 text-sm">{interpretPlanetaryDay(getPlanetaryDay(selectedDate)).personality}</p>
                  </div>
                  
                  <div className="bg-white/40 p-4 rounded-md">
                    <h4 className="font-bold text-indigo-700 mb-2">⚡ Activities & Behaviors</h4>
                    <p className="text-gray-700 text-sm">{interpretPlanetaryDay(getPlanetaryDay(selectedDate)).activities}</p>
                  </div>
                  
                  <div className="bg-white/40 p-4 rounded-md">
                    <h4 className="font-bold text-indigo-700 mb-2">💼 Professions & Work</h4>
                    <p className="text-gray-700 text-sm">{interpretPlanetaryDay(getPlanetaryDay(selectedDate)).professions}</p>
                  </div>
                  
                  <div className="bg-white/40 p-4 rounded-md">
                    <h4 className="font-bold text-indigo-700 mb-2">🫀 Body & Health</h4>
                    <p className="text-gray-700 text-sm">{interpretPlanetaryDay(getPlanetaryDay(selectedDate)).body}</p>
                    <p className="text-gray-700 text-xs mt-1"><strong>Health:</strong> {interpretPlanetaryDay(getPlanetaryDay(selectedDate)).diseases}</p>
                  </div>
                  
                  <div className="bg-white/40 p-4 rounded-md">
                    <h4 className="font-bold text-indigo-700 mb-2">👤 Physical Appearance</h4>
                    <p className="text-gray-700 text-sm">{interpretPlanetaryDay(getPlanetaryDay(selectedDate)).appearance}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 shadow-lg">
                <div className="text-center mb-4">
                  <div className="text-6xl font-bold text-blue-600 mb-2">{results.calculations.finalReduction}</div>
                  <h3 className="text-2xl font-bold text-gray-800">Overall Day Energy</h3>
                  <p className="text-gray-600">Full date reduction</p>
                </div>
                <div className="bg-white/30 p-4 rounded-md">
                  <p className="text-gray-700 whitespace-pre-line">{interpretFullReduction(results.calculations.finalReduction)}</p>
                </div>
              </div>

              {/* Master Number Pairs */}
              {results.masterNumbers && results.masterNumbers.length > 0 && (
                <div className="bg-gradient-to-r from-purple-200/40 to-pink-200/40 backdrop-blur-md rounded-lg p-6 shadow-lg border border-purple-300/50">
                  <div className="text-center mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">🌟 SPECIAL NUMBER COMBINATIONS DETECTED! 🌟</h3>
                    <p className="text-gray-600">Multiple powerful combinations in this date!</p>
                  </div>
                  <div className="space-y-3">
                    {results.masterNumbers.map((master, index) => (
                      <div key={index} className="bg-white/40 p-4 rounded-md border border-purple-200">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-lg">{master.pair}: {master.calculation} = </span>
                          <div className="text-right">
                            <span className="text-3xl font-bold text-purple-600">{master.result}</span>
                            {master.extension && (
                              <div className="text-lg font-bold text-indigo-600">→ {master.extension}</div>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm">{interpretSpecialNumber(master.result)}</p>
                        {master.extension && (
                          <p className="text-gray-700 text-sm mt-2 font-medium">
                            <span className="text-indigo-600">Final Reduction:</span> {interpretSpecialNumber(master.extension)}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Special Number Section */}
              {results.specialNumber && (
                <div className="bg-gradient-to-r from-yellow-200/30 to-orange-200/30 backdrop-blur-md rounded-lg p-6 shadow-lg border border-yellow-300/50">
                  <div className="text-center mb-4">
                    <div className="text-6xl font-bold text-yellow-600 mb-2">
                      {results.specialNumber}
                      {results.finalMasterNumber && results.finalMasterNumber !== results.specialNumber && (
                        <span className="text-4xl text-indigo-600 ml-4">→ {results.finalMasterNumber}</span>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">✨ Main Special Number ✨</h3>
                    {results.finalMasterNumber && results.finalMasterNumber !== results.specialNumber && (
                      <p className="text-indigo-700 font-medium">Reduces to Master Number {results.finalMasterNumber}!</p>
                    )}
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white/40 p-4 rounded-md">
                      <p className="text-gray-700 text-lg">{interpretSpecialNumber(results.specialNumber)}</p>
                    </div>
                    {results.finalMasterNumber && results.finalMasterNumber !== results.specialNumber && (
                      <div className="bg-indigo-50/60 p-4 rounded-md border border-indigo-200">
                        <h4 className="font-bold text-indigo-700 mb-2">Master Number {results.finalMasterNumber} Energy:</h4>
                        <p className="text-indigo-800">{interpretSpecialNumber(results.finalMasterNumber)}</p>
                      </div>
                    )}
                  </div>
                  </div>
              )}

              {/* Summary */}
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Today's Numerological Summary</h3>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    <span className="font-semibold">Day Energy:</span> This is a {results.calculations.dayNumber} day, bringing {interpretDayNumber(results.calculations.dayNumber, results.date.day).split('\n')[0].toLowerCase()}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Overall Theme:</span> The full date reduces to {results.calculations.finalReduction}, making this {interpretFullReduction(results.calculations.finalReduction).split('.')[0].toLowerCase()}.
                  </p>
                  {results.masterNumbers && results.masterNumbers.length > 0 && (
                    <p className="text-gray-700">
                      <span className="font-semibold">🌟 EXTRA POWER:</span> This date contains {results.masterNumbers.length} special number combination{results.masterNumbers.length > 1 ? 's' : ''}: {results.masterNumbers.map(m => m.result + (m.extension ? `→${m.extension}` : '')).join(', ')}!
                    </p>
                  )}
                  {results.specialNumber && (
                    <p className="text-gray-700">
                      <span className="font-semibold">Special Significance:</span> The main sum of {results.specialNumber}{results.finalMasterNumber && results.finalMasterNumber !== results.specialNumber ? ` → ${results.finalMasterNumber}` : ''} carries extra meaning in numerology!
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-16 text-center text-gray-500 text-sm border-t border-gray-200/20 pt-8">
            <p>© 2025 Date Numerology Calculator. Discover the energy of any day.</p>
          </div>
        </div>
      </div>
      
      {/* Animation styles */}
      <style>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .bg-animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default DateNumerologyCalculator;
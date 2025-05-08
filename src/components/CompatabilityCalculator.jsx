import React, { useState, useEffect } from 'react';
import { interpretLifePath, interpretExpression, interpretSoulUrge, interpretBirthday } 
  from './numerologyInterpretations';
import { reduceToSingleDigit, getLetterValue, formatNumber } 
  from './numerologyUtils';

const CompatibilityCalculator = () => {
  const [person1, setPerson1] = useState({
    name: '',
    birthdate: '',
    results: {
      lifePath: null,
      expression: null,
      soulUrge: null,
      birthday: null
    }
  });

  const [person2, setPerson2] = useState({
    name: '',
    birthdate: '',
    results: {
      lifePath: null,
      expression: null,
      soulUrge: null,
      birthday: null
    }
  });

  const [compatibilityResults, setCompatibilityResults] = useState({
    overall: null,
    lifePathCompat: null,
    expressionCompat: null,
    soulUrgeCompat: null,
    birthdayCompat: null,
    lifePathAndSoulUrgeCompat: null,
    lifePathAndExpressionCompat: null,
    strengthsAndChallenges: [],
    recommendation: ''
  });

  const [calculated, setCalculated] = useState(false);

  // CALCULATION FUNCTIONS (reused from CoreElementsCalculator)
  const calculateLifePath = (date) => {
    if (!date) return null;
    const parts = date.split('-');
    if (parts.length !== 3) return null;
    const year = parts[0]; const month = parts[1]; const day = parts[2];
    let monthValue;
    switch (parseInt(month)) {
      case 1: monthValue = 1; break; case 2: monthValue = 2; break;
      case 3: monthValue = 3; break; case 4: monthValue = 4; break;
      case 5: monthValue = 5; break; case 6: monthValue = 6; break;
      case 7: monthValue = 7; break; case 8: monthValue = 8; break;
      case 9: monthValue = 9; break; case 10: monthValue = 1; break;
      case 11: monthValue = 11; break; case 12: monthValue = 3; break;
      default: return null;
    }
    let dayValue = parseInt(day);
    if (dayValue > 9 && dayValue !== 11 && dayValue !== 22) {
      dayValue = reduceToSingleDigit(dayValue);
    }
    const yearDigits = year.split('').map(Number);
    const yearSum = yearDigits.reduce((a, b) => a + b, 0);
    const yearValue = reduceToSingleDigit(yearSum);
    let lifePath = monthValue + dayValue + yearValue;
    if (lifePath !== 11 && lifePath !== 22 && lifePath > 9) {
      lifePath = reduceToSingleDigit(lifePath);
    }
    return lifePath;
  };

  const calculateExpression = (fullName) => {
    if (!fullName) return null;
    const nameArray = fullName.toUpperCase().replace(/[^A-Z]/g, '').split('');
    const nameValue = nameArray.reduce((sum, letter) => sum + getLetterValue(letter), 0);
    if (nameValue === 11 || nameValue === 22) return nameValue;
    return reduceToSingleDigit(nameValue);
  };

  const calculateSoulUrge = (fullName) => {
    if (!fullName) return null;
    const nameArrayAlphaOnly = fullName.toUpperCase().replace(/[^A-Z]/g, '').split('');
    const vowels = ['A', 'E', 'I', 'O', 'U'];
    let vowelSum = 0;
    for (let i = 0; i < nameArrayAlphaOnly.length; i++) {
      const letter = nameArrayAlphaOnly[i];
      if (vowels.includes(letter)) {
        vowelSum += getLetterValue(letter);
      } else if (letter === 'Y') {
        const prevLetter = i > 0 ? nameArrayAlphaOnly[i-1] : null;
        if (!prevLetter || !vowels.includes(prevLetter)) {
          vowelSum += getLetterValue('Y');
        }
      }
    }
    if (vowelSum === 11 || vowelSum === 22) return vowelSum;
    return reduceToSingleDigit(vowelSum);
  };

  const calculateBirthday = (date) => {
    if (!date) return null;
    const parts = date.split('-');
    if (parts.length !== 3) return null;
    const day = parseInt(parts[2]);
    if (day === 11 || day === 22) return day;
    return reduceToSingleDigit(day);
  };

  // COMPATIBILITY ASSESSMENT FUNCTIONS
  const determineHarmony = (num1, num2) => {
    // Simplify master numbers for comparison
    const n1 = num1 === 11 ? 2 : (num1 === 22 ? 4 : num1);
    const n2 = num2 === 11 ? 2 : (num2 === 22 ? 4 : num2);
    
    // Harmonious combinations
    const harmonious = [
      '1-3', '1-4', '1-5', '1-7', '1-8', '1-9',
      '2-4', '2-6', '2-9', '2-11',
      '3-5', '3-6', '3-9',
      '4-6', '4-8', '4-9', '4-22',
      '5-7', '5-9',
      '6-8', '6-9', '6-11',
      '7-8', '7-9',
      '8-9', '8-22',
      '9-11', '9-22',
      '11-22'
    ];

    const checkPair = (val1, val2) => {
      const p1 = `${val1}-${val2}`;
      const p2 = `${val2}-${val1}`;
      return harmonious.includes(p1) || harmonious.includes(p2);
    };

    // Check for exact matches (usually less compatible unless master numbers)
    if (n1 === n2) {
      if (num1 === 11 || num1 === 22 || num2 === 11 || num2 === 22) {
        // Master numbers matching are powerful
        return { harmony: "Very Harmonious", score: 95 };
      }
      // Same numbers can create power struggles or overemphasis
      return { harmony: "Challenging", score: 45 };
    }
    
    // Check harmony with original or master numbers
    let isHarmonious = false;
    if ((num1 === 11 || num1 === 22 || num2 === 11 || num2 === 22)) {
      isHarmonious = checkPair(num1, num2);
      if (!isHarmonious) {
        if ((num1 === 11 || num1 === 22) && !(num2 === 11 || num2 === 22)) {
          isHarmonious = checkPair(num1, n2);
        } else if ((num2 === 11 || num2 === 22) && !(num1 === 11 || num1 === 22)) {
          isHarmonious = checkPair(n1, num2);
        }
      }
    }
    
    // Check with reduced values if still not harmonious
    if (!isHarmonious) {
      isHarmonious = checkPair(n1, n2);
    }
    
    // Special chemistry - numbers that are one apart have tension
    // but can create growth (1-2, 2-3, etc.)
    if (Math.abs(n1 - n2) === 1) {
      return { harmony: "Dynamic", score: 65 };
    }
    
    if (isHarmonious) {
      return { harmony: "Harmonious", score: 85 };
    } else {
      return { harmony: "Discordant", score: 30 };
    }
  };

  const calculateLifePathCompatibility = (lp1, lp2) => {
    const harmony = determineHarmony(lp1, lp2);
    
    let description = "";
    if (harmony.harmony === "Very Harmonious") {
      description = "Your Life Paths are powerfully aligned, creating a relationship with exceptional growth potential. You share similar major life lessons and directions.";
    } else if (harmony.harmony === "Harmonious") {
      description = "Your Life Paths complement each other well, supporting mutual growth and shared experiences. Your core life lessons enhance each other.";
    } else if (harmony.harmony === "Dynamic") {
      description = "Your Life Paths create a dynamic tension that can lead to growth. You challenge each other in ways that, while sometimes difficult, often lead to expansion.";
    } else if (harmony.harmony === "Challenging") {
      description = "Your identical Life Paths can create some friction as you're working through similar lessons simultaneously. Self-awareness helps avoid power struggles.";
    } else {
      description = "Your Life Paths represent different directions that may require conscious effort to align. With awareness, these differences can become complementary rather than conflicting.";
    }
    
    return { ...harmony, description };
  };

  const calculateExpressionCompatibility = (exp1, exp2) => {
    const harmony = determineHarmony(exp1, exp2);
    
    let description = "";
    if (harmony.harmony === "Very Harmonious") {
      description = "Your natural talents and abilities create an exceptional complementary dynamic, allowing you to accomplish much together with minimal conflict about methods.";
    } else if (harmony.harmony === "Harmonious") {
      description = "Your natural abilities complement each other well, creating a good working balance. You each bring different but compatible skills to the relationship.";
    } else if (harmony.harmony === "Dynamic") {
      description = "Your different approaches and talents create a productive tension that can lead to innovation. You each bring contrasting skills that can enhance your joint projects.";
    } else if (harmony.harmony === "Challenging") {
      description = "Your identical skill sets may lead to competing for the same role or recognition. With awareness, you can collaborate rather than compete.";
    } else {
      description = "Your approaches and natural abilities differ significantly. Mutual respect for different talents and methods is essential for a harmonious relationship.";
    }
    
    return { ...harmony, description };
  };

  const calculateSoulUrgeCompatibility = (su1, su2) => {
    const harmony = determineHarmony(su1, su2);
    
    let description = "";
    if (harmony.harmony === "Very Harmonious") {
      description = "Your inner desires and motivations are powerfully aligned, creating deep emotional understanding. You naturally understand what makes each other feel fulfilled.";
    } else if (harmony.harmony === "Harmonious") {
      description = "Your inner motivations complement each other well, creating mutual understanding. You're likely to support each other's deeper needs and desires.";
    } else if (harmony.harmony === "Dynamic") {
      description = "Your different desires create a dynamic balance that keeps the relationship interesting. Your motivations aren't identical but can create growth through contrast.";
    } else if (harmony.harmony === "Challenging") {
      description = "Your identical inner motivations may lead to competing for fulfillment in the same areas. Self-awareness helps avoid emotional competition.";
    } else {
      description = "Your inner desires differ significantly, which can lead to misunderstanding each other's motivations. Extra communication about your deeper needs is essential.";
    }
    
    return { ...harmony, description };
  };

  const calculateBirthdayCompatibility = (bd1, bd2) => {
    const harmony = determineHarmony(bd1, bd2);
    
    let description = "";
    if (harmony.harmony === "Very Harmonious") {
      description = "Your special talents create an exceptionally complementary dynamic, enhancing your ability to work together on specific tasks or projects.";
    } else if (harmony.harmony === "Harmonious") {
      description = "Your special talents complement each other well, creating a good balance of specific abilities that enhance your relationship.";
    } else if (harmony.harmony === "Dynamic") {
      description = "Your different specific talents create an interesting dynamic that can lead to learning from each other. Your contrasting gift areas can expand your joint capabilities.";
    } else if (harmony.harmony === "Challenging") {
      description = "Your identical specific talents may lead to overlapping in the same specialty areas. With awareness, you can develop different applications of similar gifts.";
    } else {
      description = "Your specific talents differ significantly. Appreciating each other's unique gifts is important for mutual respect and growth.";
    }
    
    return { ...harmony, description };
  };

  const calculateCrossCompatibility = (lp1, su2, lp2, su1) => {
    // Life Path to Soul Urge compatibility
    const lp1_su2 = determineHarmony(lp1, su2);
    const lp2_su1 = determineHarmony(lp2, su1);
    
    const avgScore = (lp1_su2.score + lp2_su1.score) / 2;
    
    let harmony;
    if (avgScore >= 85) harmony = "Very Harmonious";
    else if (avgScore >= 70) harmony = "Harmonious";
    else if (avgScore >= 55) harmony = "Dynamic";
    else if (avgScore >= 40) harmony = "Challenging";
    else harmony = "Discordant";
    
    let description = "";
    if (harmony === "Very Harmonious") {
      description = "Your life directions and inner desires create a beautiful cross-compatibility. Each of you naturally supports what the other person deeply needs and wants.";
    } else if (harmony === "Harmonious") {
      description = "Your life directions and inner desires generally support each other well. You're likely to understand and support each other's deeper needs and growth paths.";
    } else if (harmony === "Dynamic") {
      description = "Your life directions and inner desires create an interesting dynamic that challenges you to grow. This creates moderate tension with good potential for mutual evolution.";
    } else if (harmony === "Challenging") {
      description = "Your life directions and inner desires may sometimes conflict. Each of you may need to make conscious efforts to understand and support what truly matters to the other.";
    } else {
      description = "Your life directions and inner desires are quite different, which can lead to misunderstanding. Special attention to listening and supporting each other's true needs is essential.";
    }
    
    return { harmony, score: avgScore, description };
  };

  const calculateLifePathExpressionCompatibility = (lp1, exp2, lp2, exp1) => {
    // Life Path to Expression compatibility
    const lp1_exp2 = determineHarmony(lp1, exp2);
    const lp2_exp1 = determineHarmony(lp2, exp1);
    
    const avgScore = (lp1_exp2.score + lp2_exp1.score) / 2;
    
    let harmony;
    if (avgScore >= 85) harmony = "Very Harmonious";
    else if (avgScore >= 70) harmony = "Harmonious";
    else if (avgScore >= 55) harmony = "Dynamic";
    else if (avgScore >= 40) harmony = "Challenging";
    else harmony = "Discordant";
    
    let description = "";
    if (harmony === "Very Harmonious") {
      description = "Your natural talents align exceptionally well with each other's life paths. You each have abilities that support the other's core life direction and purpose.";
    } else if (harmony === "Harmonious") {
      description = "Your natural talents generally support each other's life paths well. Your abilities and skills often help each other accomplish your core life purposes.";
    } else if (harmony === "Dynamic") {
      description = "Your natural talents create an interesting dynamic with each other's life paths. While not perfectly aligned, the contrast creates good potential for growth and expansion.";
    } else if (harmony === "Challenging") {
      description = "Your natural talents may sometimes conflict with each other's life paths. You may need to consciously adapt your skills to support each other's core directions.";
    } else {
      description = "Your natural talents don't easily align with each other's life paths. Special effort is needed to understand how your abilities can support what's most important to each other.";
    }
    
    return { harmony, score: avgScore, description };
  };

  const assessOverallCompatibility = (results) => {
    // Calculate weighted average of all compatibility scores
    const weights = {
      lifePathCompat: 0.35,
      lifePathAndSoulUrgeCompat: 0.20,
      lifePathAndExpressionCompat: 0.20,
      expressionCompat: 0.10,
      soulUrgeCompat: 0.10,
      birthdayCompat: 0.05
    };
    
    const weightedScore = 
      (results.lifePathCompat.score * weights.lifePathCompat) +
      (results.lifePathAndSoulUrgeCompat.score * weights.lifePathAndSoulUrgeCompat) +
      (results.lifePathAndExpressionCompat.score * weights.lifePathAndExpressionCompat) +
      (results.expressionCompat.score * weights.expressionCompat) +
      (results.soulUrgeCompat.score * weights.soulUrgeCompat) +
      (results.birthdayCompat.score * weights.birthdayCompat);
    
    let compatibilityLevel;
    let description;
    
    if (weightedScore >= 80) {
      compatibilityLevel = "Excellent";
      description = "You have exceptional natural compatibility. Your core numbers create a harmonious blend that supports mutual growth and understanding. While no relationship is without challenges, yours has a strong foundation in compatible energies.";
    } else if (weightedScore >= 65) {
      compatibilityLevel = "Good";
      description = "You have good natural compatibility. Most of your core numbers work well together, creating a generally harmonious relationship with specific areas of natural alignment. Any challenging aspects can be overcome with awareness.";
    } else if (weightedScore >= 50) {
      compatibilityLevel = "Average";
      description = "You have moderate natural compatibility. Your relationship has both harmonious and challenging aspects, creating a balanced dynamic that requires some effort but can lead to substantial growth for both of you.";
    } else if (weightedScore >= 35) {
      compatibilityLevel = "Challenging";
      description = "Your natural compatibility has some challenges. Several of your core numbers create tension, requiring conscious effort and communication to create harmony. However, challenging connections often lead to the greatest growth.";
    } else {
      compatibilityLevel = "Difficult";
      description = "Your natural compatibility faces significant challenges. Many of your core numbers create friction, requiring substantial conscious effort to harmonize. This doesn't mean a successful relationship is impossible, but awareness and communication are essential.";
    }
    
    return { level: compatibilityLevel, score: Math.round(weightedScore), description };
  };

  const identifyStrengthsAndChallenges = (results) => {
    const strengths = [];
    const challenges = [];
    
    // Check each compatibility area and categorize as strength or challenge
    if (results.lifePathCompat.score >= 70) {
      strengths.push({
        area: "Life Path Compatibility",
        description: "Your core life directions naturally support each other, creating a strong foundation for your relationship."
      });
    } else if (results.lifePathCompat.score < 50) {
      challenges.push({
        area: "Life Path Compatibility",
        description: "Your different life directions may sometimes pull you in separate ways, requiring conscious alignment of goals."
      });
    }
    
    if (results.expressionCompat.score >= 70) {
      strengths.push({
        area: "Expression Compatibility",
        description: "Your natural talents and abilities work well together, allowing you to collaborate effectively."
      });
    } else if (results.expressionCompat.score < 50) {
      challenges.push({
        area: "Expression Compatibility",
        description: "Your different approaches and methods may sometimes clash, requiring respect for each other's unique styles."
      });
    }
    
    if (results.soulUrgeCompat.score >= 70) {
      strengths.push({
        area: "Soul Urge Compatibility",
        description: "Your inner desires and motivations align well, creating deep emotional understanding."
      });
    } else if (results.soulUrgeCompat.score < 50) {
      challenges.push({
        area: "Soul Urge Compatibility",
        description: "Your different inner needs and desires may sometimes be difficult to understand, requiring open emotional communication."
      });
    }
    
    if (results.lifePathAndSoulUrgeCompat.score >= 70) {
      strengths.push({
        area: "Life Path/Soul Urge Cross-Compatibility",
        description: "You naturally support each other's core needs and directions, creating mutual understanding and growth."
      });
    } else if (results.lifePathAndSoulUrgeCompat.score < 50) {
      challenges.push({
        area: "Life Path/Soul Urge Cross-Compatibility",
        description: "You may sometimes struggle to support each other's deeper needs and life directions simultaneously, requiring conscious effort."
      });
    }
    
    if (results.lifePathAndExpressionCompat.score >= 70) {
      strengths.push({
        area: "Life Path/Expression Cross-Compatibility",
        description: "Your natural abilities support each other's life paths, helping you both achieve your core purposes."
      });
    } else if (results.lifePathAndExpressionCompat.score < 50) {
      challenges.push({
        area: "Life Path/Expression Cross-Compatibility",
        description: "Your natural talents may not always support each other's core life directions, requiring adaptability."
      });
    }
    
    // Special compatibility patterns
    if (person1.results.lifePath === person2.results.lifePath) {
      if (person1.results.lifePath === 11 || person1.results.lifePath === 22) {
        strengths.push({
          area: "Master Number Alignment",
          description: "You both share the same master number Life Path, creating a powerful spiritual connection and mutual understanding of your challenging but rewarding paths."
        });
      } else {
        challenges.push({
          area: "Identical Life Paths",
          description: "Sharing the same Life Path can create both deep understanding and potential competition as you work through similar lessons simultaneously."
        });
      }
    }
    
    // Look for karmic pattern: Life Path of one person is the Expression of the other
    if (person1.results.lifePath === person2.results.expression || 
        person2.results.lifePath === person1.results.expression) {
      strengths.push({
        area: "Karmic Teacher Pattern",
        description: "One of you naturally expresses what the other is here to learn, creating a powerful growth-oriented relationship."
      });
    }
    
    // Check for soulmate pattern: Soul Urge numbers are complementary (sum to 10)
    if (
      (person1.results.soulUrge + person2.results.soulUrge === 10) ||
      (person1.results.soulUrge === 11 && person2.results.soulUrge === 8) ||
      (person2.results.soulUrge === 11 && person1.results.soulUrge === 8) ||
      (person1.results.soulUrge === 22 && person2.results.soulUrge === 6) ||
      (person2.results.soulUrge === 22 && person1.results.soulUrge === 6)
    ) {
      strengths.push({
        area: "Soul Complement Pattern",
        description: "Your Soul Urge numbers are complementary, creating a deep sense of completion and fulfillment in your connection."
      });
    }
    
    return [...strengths, ...challenges];
  };

  const generateRecommendation = (results) => {
    if (results.overall.score >= 80) {
      return "Your relationship has naturally high compatibility. Focus on appreciating your harmonious connection while still addressing the few challenging areas with open communication. This relationship has excellent potential for long-term harmony and growth.";
    } else if (results.overall.score >= 65) {
      return "Your relationship has good natural compatibility. Build on your strengths while working on the challenging aspects through conscious communication. With awareness and effort, this relationship can flourish and bring substantial fulfillment to both of you.";
    } else if (results.overall.score >= 50) {
      return "Your relationship has moderate compatibility with both harmonious and challenging aspects. Focus on your strengths while developing patience and communication strategies for your differences. This balanced dynamic offers good potential for mutual growth if both parties are committed.";
    } else if (results.overall.score >= 35) {
      return "Your relationship faces some natural compatibility challenges. Success requires conscious effort, excellent communication, and a commitment to understanding your differences. While challenging, this relationship can lead to significant personal growth and, with work, a deep and meaningful connection.";
    } else {
      return "Your relationship faces significant compatibility challenges. This requires exceptional communication, patience, and mutual respect to overcome the natural tensions. Consider whether you're both willing to put in the substantial effort needed. If you are, focus on appreciating your differences as opportunities for growth rather than obstacles.";
    }
  };

  // Calculate all numbers for both individuals
  const calculateIndividualNumbers = (person, setter) => {
    if (!person.name || !person.birthdate) return;

    const lifePathNum = calculateLifePath(person.birthdate);
    const expressionNum = calculateExpression(person.name);
    const soulUrgeNum = calculateSoulUrge(person.name);
    const birthdayNum = calculateBirthday(person.birthdate);

    setter(prev => ({
      ...prev,
      results: {
        lifePath: lifePathNum,
        expression: expressionNum,
        soulUrge: soulUrgeNum,
        birthday: birthdayNum
      }
    }));

    return {
      lifePath: lifePathNum,
      expression: expressionNum,
      soulUrge: soulUrgeNum,
      birthday: birthdayNum
    };
  };

  // Calculate compatibility between the two individuals
  const calculateCompatibility = () => {
    if (!person1.name || !person1.birthdate || !person2.name || !person2.birthdate) {
      alert("Please enter full information for both individuals.");
      return;
    }

    // Calculate individual results first
    const p1Results = calculateIndividualNumbers(person1, setPerson1);
    const p2Results = calculateIndividualNumbers(person2, setPerson2);

    // If results aren't ready yet, try again with current state
    const lifePathCompat = calculateLifePathCompatibility(
      person1.results.lifePath || p1Results.lifePath, 
      person2.results.lifePath || p2Results.lifePath
    );
    
    const expressionCompat = calculateExpressionCompatibility(
      person1.results.expression || p1Results.expression, 
      person2.results.expression || p2Results.expression
    );
    
    const soulUrgeCompat = calculateSoulUrgeCompatibility(
      person1.results.soulUrge || p1Results.soulUrge, 
      person2.results.soulUrge || p2Results.soulUrge
    );
    
    const birthdayCompat = calculateBirthdayCompatibility(
      person1.results.birthday || p1Results.birthday, 
      person2.results.birthday || p2Results.birthday
    );
    
    const lifePathAndSoulUrgeCompat = calculateCrossCompatibility(
      person1.results.lifePath || p1Results.lifePath,
      person2.results.soulUrge || p2Results.soulUrge,
      person2.results.lifePath || p2Results.lifePath,
      person1.results.soulUrge || p1Results.soulUrge
    );
    
    const lifePathAndExpressionCompat = calculateLifePathExpressionCompatibility(
      person1.results.lifePath || p1Results.lifePath,
      person2.results.expression || p2Results.expression,
      person2.results.lifePath || p2Results.lifePath,
      person1.results.expression || p1Results.expression
    );
    
    const compatResults = {
      lifePathCompat,
      expressionCompat,
      soulUrgeCompat,
      birthdayCompat,
      lifePathAndSoulUrgeCompat,
      lifePathAndExpressionCompat
    };
    
    const overall = assessOverallCompatibility(compatResults);
    const strengthsAndChallenges = identifyStrengthsAndChallenges({
      ...compatResults,
      overall
    });
    
    const recommendation = generateRecommendation({
      ...compatResults,
      overall,
      strengthsAndChallenges
    });
    
    setCompatibilityResults({
      ...compatResults,
      overall,
      strengthsAndChallenges,
      recommendation
    });
    
    setCalculated(true);
  };

  // Reset compatibility calculations and form inputs
  const resetForm = () => {
    setPerson1({
      name: '',
      birthdate: '',
      results: {
        lifePath: null,
        expression: null,
        soulUrge: null,
        birthday: null
      }
    });
    
    setPerson2({
      name: '',
      birthdate: '',
      results: {
        lifePath: null,
        expression: null,
        soulUrge: null,
        birthday: null
      }
    });
    
    setCompatibilityResults({
      overall: null,
      lifePathCompat: null,
      expressionCompat: null,
      soulUrgeCompat: null,
      birthdayCompat: null,
      lifePathAndSoulUrgeCompat: null,
      lifePathAndExpressionCompat: null,
      strengthsAndChallenges: [],
      recommendation: ''
    });
    
    setCalculated(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Numerology Compatibility Analysis</h2>
        <p className="text-gray-600">Discover how two people's numerology elements interact and influence their relationship.</p>
      </div>
      
      <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 shadow-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Person 1 */}
          <div className="p-4 border border-gray-200/40 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4 text-center">Person 1</h3>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Full Birth Name</label>
              <input 
                type="text" 
                value={person1.name} 
                onChange={(e) => setPerson1({...person1, name: e.target.value})} 
                placeholder="Enter full birth name" 
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500" 
              />
              <p className="text-sm text-gray-500 mt-1">Use the name given at birth</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Birthdate</label>
              <input 
                type="date" 
                value={person1.birthdate} 
                onChange={(e) => setPerson1({...person1, birthdate: e.target.value})} 
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500" 
              />
            </div>
            {calculated && (
              <div className="mt-4 p-3 bg-white/30 rounded-md">
                <h4 className="font-medium mb-2">Core Numbers:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Life Path: <span className="font-semibold">{formatNumber(person1.results.lifePath)}</span></div>
                  <div>Expression: <span className="font-semibold">{formatNumber(person1.results.expression)}</span></div>
                  <div>Soul Urge: <span className="font-semibold">{formatNumber(person1.results.soulUrge)}</span></div>
                  <div>Birthday: <span className="font-semibold">{formatNumber(person1.results.birthday)}</span></div>
                </div>
              </div>
            )}
          </div>
          
          {/* Person 2 */}
          <div className="p-4 border border-gray-200/40 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4 text-center">Person 2</h3>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Full Birth Name</label>
              <input 
                type="text" 
                value={person2.name} 
                onChange={(e) => setPerson2({...person2, name: e.target.value})} 
                placeholder="Enter full birth name" 
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500" 
              />
              <p className="text-sm text-gray-500 mt-1">Use the name given at birth</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Birthdate</label>
              <input 
                type="date" 
                value={person2.birthdate} 
                onChange={(e) => setPerson2({...person2, birthdate: e.target.value})} 
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500" 
              />
            </div>
            {calculated && (
              <div className="mt-4 p-3 bg-white/30 rounded-md">
                <h4 className="font-medium mb-2">Core Numbers:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Life Path: <span className="font-semibold">{formatNumber(person2.results.lifePath)}</span></div>
                  <div>Expression: <span className="font-semibold">{formatNumber(person2.results.expression)}</span></div>
                  <div>Soul Urge: <span className="font-semibold">{formatNumber(person2.results.soulUrge)}</span></div>
                  <div>Birthday: <span className="font-semibold">{formatNumber(person2.results.birthday)}</span></div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-center space-x-4">
          <button 
            onClick={calculateCompatibility} 
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Calculate Compatibility
          </button>
          
          {calculated && (
            <button 
              onClick={resetForm} 
              className="px-6 py-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Reset
            </button>
          )}
        </div>
      </div>
      
      {/* Compatibility Results */}
      {calculated && compatibilityResults.overall && (
        <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 shadow-lg mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Compatibility Analysis</h3>
            <div className="flex justify-center items-center mb-4">
              <div className="bg-gray-200 h-6 w-64 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    compatibilityResults.overall.score >= 80 ? 'bg-green-500' : 
                    compatibilityResults.overall.score >= 65 ? 'bg-teal-500' : 
                    compatibilityResults.overall.score >= 50 ? 'bg-yellow-500' : 
                    compatibilityResults.overall.score >= 35 ? 'bg-orange-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${compatibilityResults.overall.score}%` }}
                ></div>
              </div>
              <span className="ml-3 font-bold text-lg">{compatibilityResults.overall.score}%</span>
            </div>
            <p className="text-xl font-bold mb-2">
              {compatibilityResults.overall.level} Compatibility
            </p>
            <p className="text-gray-700">
              {compatibilityResults.overall.description}
            </p>
          </div>
          
          {/* Core Compatibility Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Life Path Compatibility */}
            <div className="bg-white/30 rounded-lg p-4 shadow">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-bold">Life Path Compatibility</h4>
                <span 
                  className={`px-2 py-1 rounded-full text-white text-sm font-medium ${
                    compatibilityResults.lifePathCompat.harmony === "Very Harmonious" ? "bg-green-500" :
                    compatibilityResults.lifePathCompat.harmony === "Harmonious" ? "bg-teal-500" :
                    compatibilityResults.lifePathCompat.harmony === "Dynamic" ? "bg-yellow-500" :
                    compatibilityResults.lifePathCompat.harmony === "Challenging" ? "bg-orange-500" : "bg-red-500"
                  }`}
                >
                  {compatibilityResults.lifePathCompat.harmony}
                </span>
              </div>
              <p className="text-gray-700 text-sm">
                {compatibilityResults.lifePathCompat.description}
              </p>
              <div className="mt-2 text-sm">
                <span className="font-medium">Life Paths:</span> {formatNumber(person1.results.lifePath)} & {formatNumber(person2.results.lifePath)}
              </div>
            </div>
            
            {/* Expression Compatibility */}
            <div className="bg-white/30 rounded-lg p-4 shadow">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-bold">Expression Compatibility</h4>
                <span 
                  className={`px-2 py-1 rounded-full text-white text-sm font-medium ${
                    compatibilityResults.expressionCompat.harmony === "Very Harmonious" ? "bg-green-500" :
                    compatibilityResults.expressionCompat.harmony === "Harmonious" ? "bg-teal-500" :
                    compatibilityResults.expressionCompat.harmony === "Dynamic" ? "bg-yellow-500" :
                    compatibilityResults.expressionCompat.harmony === "Challenging" ? "bg-orange-500" : "bg-red-500"
                  }`}
                >
                  {compatibilityResults.expressionCompat.harmony}
                </span>
              </div>
              <p className="text-gray-700 text-sm">
                {compatibilityResults.expressionCompat.description}
              </p>
              <div className="mt-2 text-sm">
                <span className="font-medium">Expression Numbers:</span> {formatNumber(person1.results.expression)} & {formatNumber(person2.results.expression)}
              </div>
            </div>
            
            {/* Soul Urge Compatibility */}
            <div className="bg-white/30 rounded-lg p-4 shadow">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-bold">Soul Urge Compatibility</h4>
                <span 
                  className={`px-2 py-1 rounded-full text-white text-sm font-medium ${
                    compatibilityResults.soulUrgeCompat.harmony === "Very Harmonious" ? "bg-green-500" :
                    compatibilityResults.soulUrgeCompat.harmony === "Harmonious" ? "bg-teal-500" :
                    compatibilityResults.soulUrgeCompat.harmony === "Dynamic" ? "bg-yellow-500" :
                    compatibilityResults.soulUrgeCompat.harmony === "Challenging" ? "bg-orange-500" : "bg-red-500"
                  }`}
                >
                  {compatibilityResults.soulUrgeCompat.harmony}
                </span>
              </div>
              <p className="text-gray-700 text-sm">
                {compatibilityResults.soulUrgeCompat.description}
              </p>
              <div className="mt-2 text-sm">
                <span className="font-medium">Soul Urge Numbers:</span> {formatNumber(person1.results.soulUrge)} & {formatNumber(person2.results.soulUrge)}
              </div>
            </div>
            
            {/* Life Path/Soul Urge Cross-Compatibility */}
            <div className="bg-white/30 rounded-lg p-4 shadow">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-bold">Life Path/Soul Urge Cross-Compatibility</h4>
                <span 
                  className={`px-2 py-1 rounded-full text-white text-sm font-medium ${
                    compatibilityResults.lifePathAndSoulUrgeCompat.harmony === "Very Harmonious" ? "bg-green-500" :
                    compatibilityResults.lifePathAndSoulUrgeCompat.harmony === "Harmonious" ? "bg-teal-500" :
                    compatibilityResults.lifePathAndSoulUrgeCompat.harmony === "Dynamic" ? "bg-yellow-500" :
                    compatibilityResults.lifePathAndSoulUrgeCompat.harmony === "Challenging" ? "bg-orange-500" : "bg-red-500"
                  }`}
                >
                  {compatibilityResults.lifePathAndSoulUrgeCompat.harmony}
                </span>
              </div>
              <p className="text-gray-700 text-sm">
                {compatibilityResults.lifePathAndSoulUrgeCompat.description}
              </p>
              <div className="mt-2 text-sm">
                <span className="font-medium">Cross Numbers:</span> LP {formatNumber(person1.results.lifePath)} & SU {formatNumber(person2.results.soulUrge)} | LP {formatNumber(person2.results.lifePath)} & SU {formatNumber(person1.results.soulUrge)}
              </div>
            </div>
          </div>
          
          {/* Strengths & Challenges */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Key Relationship Dynamics</h3>
            <div className="grid grid-cols-1 gap-4">
              {compatibilityResults.strengthsAndChallenges.map((item, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg ${
                    item.area.toLowerCase().includes('pattern') ||
                    !item.area.toLowerCase().includes('challenges') ? 
                    'bg-green-100/50' : 'bg-orange-100/50'
                  }`}
                >
                  <h4 className="font-bold text-gray-800 mb-1">{item.area}</h4>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Recommendation */}
          <div className="bg-white/40 rounded-lg p-5 shadow-md">
            <h3 className="text-xl font-bold mb-3">Relationship Recommendation</h3>
            <p className="text-gray-700">{compatibilityResults.recommendation}</p>
          </div>
        </div>
      )}
      
      {/* Explanation of Compatibility Analysis */}
      <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 shadow-lg mt-10 mb-10">
        <h3 className="text-2xl font-bold mb-4 text-center">Understanding Numerology Compatibility</h3>
        <p className="mb-4">Numerology compatibility analyzes how the core numbers of two individuals interact with each other, revealing natural harmonies and challenges.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-bold text-lg mb-2">Primary Compatibility Factors</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Life Path Compatibility:</strong> How well your core life lessons and journeys work together.</li>
              <li><strong>Expression Compatibility:</strong> How your natural abilities and talents interact.</li>
              <li><strong>Soul Urge Compatibility:</strong> How well your inner desires and motivations align.</li>
              <li><strong>Cross-Compatibility:</strong> How one person's Life Path interacts with the other's Soul Urge and Expression, revealing deeper dynamics.</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-2">Harmony Categories</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Very Harmonious:</strong> Excellent natural alignment creating smooth cooperation.</li>
              <li><strong>Harmonious:</strong> Good natural alignment with complementary energies.</li>
              <li><strong>Dynamic:</strong> Creative tension that can lead to growth through differences.</li>
              <li><strong>Challenging:</strong> Requires conscious effort to create harmony.</li>
              <li><strong>Discordant:</strong> Natural friction requires significant adaptation and communication.</li>
            </ul>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="font-bold text-lg mb-2">Special Compatibility Patterns</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Karmic Teacher Pattern:</strong> When one person's Life Path equals the other's Expression, creating a relationship where one naturally expresses what the other is here to learn.</li>
            <li><strong>Soul Complement Pattern:</strong> When Soul Urge numbers add up to 10 (e.g., 1 & 9, 2 & 8), creating a sense of completion and balance.</li>
            <li><strong>Master Number Alignment:</strong> When both share master numbers (11 or 22), creating a powerful spiritual connection.</li>
          </ul>
        </div>
        
        <p className="text-sm text-gray-600 mt-6">
          Remember: Numerology compatibility offers insights into natural dynamics, but the conscious choices you make in a relationship always matter more than innate patterns. Even challenging combinations can create beautiful relationships with awareness and effort.
        </p>
      </div>
    </div>
  );
};

export default CompatibilityCalculator;
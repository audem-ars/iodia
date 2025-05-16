import React, { useState, useEffect } from 'react';
import { interpretLifePath, interpretExpression, interpretSoulUrge, interpretBirthday } from './numerologyInterpretations';

// --- Utility Functions (moved to module scope) ---

// Format number display to show master numbers correctly
const formatNumber = (num) => {
  if (num === null || num === undefined) return "";
  if (num === 11) return "11/2";
  if (num === 22) return "22/4";
  return num;
};

// Reduce a number to a single digit unless it's 11 or 22
const reduceToSingleDigit = (num) => {
  if (num === null || num === undefined) return null;
  if (num <= 9) return num;
  if (num === 11 || num === 22) return num; // Master numbers
  
  const digits = num.toString().split('').map(Number);
  const sum = digits.reduce((a, b) => a + b, 0);
  
  // Recursively reduce if the sum is still greater than 9 and not a master number
  if (sum > 9 && sum !== 11 && sum !== 22) {
    return reduceToSingleDigit(sum);
  }
  
  return sum;
};

// Get numerology value for a letter
const getLetterValue = (letter) => {
  const letterValues = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
    J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
    S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
  };
  return letterValues[letter.toUpperCase()] || 0;
};

// --- Existing Helper Functions for Modifiers ---
const calculateOriginalNumber = (reducedNum, birthdate, name) => {
  // This function is intended to find the unreduced sum that led to reducedNum.
  // The provided version is simplified and primarily checks Life Path.
  // For a full implementation, it would need to re-calculate Expression, Soul Urge, etc., before their final reduction.
  
  if (birthdate) {
    const dateParts = birthdate.split('-');
    if (dateParts.length === 3) {
      const month = parseInt(dateParts[1]);
      const day = parseInt(dateParts[2]);
      const year = parseInt(dateParts[0]);
      
      // Calculate year sum digits
      const yearSumDigits = year.toString().split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
      
      // Calculate month value for Life Path
      let monthValueLP;
      switch (month) {
          case 1: monthValueLP = 1; break; case 2: monthValueLP = 2; break;
          case 3: monthValueLP = 3; break; case 4: monthValueLP = 4; break;
          case 5: monthValueLP = 5; break; case 6: monthValueLP = 6; break;
          case 7: monthValueLP = 7; break; case 8: monthValueLP = 8; break;
          case 9: monthValueLP = 9; break; case 10: monthValueLP = 1; break; // reduced
          case 11: monthValueLP = 11; break; // master
          case 12: monthValueLP = 3; break; // reduced
          default: monthValueLP = 0;
      }
      const dayValueLP = (day === 11 || day === 22) ? day : reduceToSingleDigit(day);
      const yearValueLP = reduceToSingleDigit(yearSumDigits);

      const lifePathSumBeforeFinalReduction = monthValueLP + dayValueLP + yearValueLP;
      
      let finalReducedLifePath = lifePathSumBeforeFinalReduction;
      if (finalReducedLifePath !== 11 && finalReducedLifePath !== 22 && finalReducedLifePath > 9) {
        finalReducedLifePath = reduceToSingleDigit(finalReducedLifePath);
      }

      if (finalReducedLifePath === reducedNum && [13, 14, 16, 19].includes(lifePathSumBeforeFinalReduction)) {
        return lifePathSumBeforeFinalReduction;
      }
    }
  }
  return reducedNum; 
};

const checkKarmicDebt = (currentResults, birthdate, name) => { // Changed 'results' to 'currentResults' for clarity
  const debts = [];
  if (!birthdate) return "None detected";

  const dateParts = birthdate.split('-');
  const monthRaw = parseInt(dateParts[1]);
  const dayRaw = parseInt(dateParts[2]);
  const yearRaw = parseInt(dateParts[0]);
  
  let monthValueLP;
  switch (monthRaw) {
      case 1: monthValueLP = 1; break; case 2: monthValueLP = 2; break;
      case 3: monthValueLP = 3; break; case 4: monthValueLP = 4; break;
      case 5: monthValueLP = 5; break; case 6: monthValueLP = 6; break;
      case 7: monthValueLP = 7; break; case 8: monthValueLP = 8; break;
      case 9: monthValueLP = 9; break; case 10: monthValueLP = 1; break; 
      case 11: monthValueLP = 11; break; 
      case 12: monthValueLP = 3; break; 
      default: monthValueLP = 0;
  }
  const dayValueLP = (dayRaw === 11 || dayRaw === 22) ? dayRaw : reduceToSingleDigit(dayRaw);
  const yearSumDigits = yearRaw.toString().split('').map(Number).reduce((a,b) => a + b, 0);
  const yearValueLP = reduceToSingleDigit(yearSumDigits);
  
  const lifePathSumTotal = monthValueLP + dayValueLP + yearValueLP;
  
  if ([13, 14, 16, 19].includes(lifePathSumTotal)) {
    let finalLPReduction = lifePathSumTotal;
    if (finalLPReduction !== 11 && finalLPReduction !== 22 && finalLPReduction > 9) {
        finalLPReduction = reduceToSingleDigit(finalLPReduction);
    }
    if (finalLPReduction === currentResults.lifePath) { // Use currentResults
        debts.push(`${lifePathSumTotal}/(${formatNumber(currentResults.lifePath)}) (Life Path)`);
    }
  }
  
  if ([13, 14, 16, 19].includes(dayRaw)) {
    let finalBirthdayReduction = dayRaw;
    if (finalBirthdayReduction !== 11 && finalBirthdayReduction !== 22 && finalBirthdayReduction > 9) {
        finalBirthdayReduction = reduceToSingleDigit(finalBirthdayReduction);
    }
    if (finalBirthdayReduction === currentResults.birthday) { // Use currentResults
        debts.push(`${dayRaw}/(${formatNumber(currentResults.birthday)}) (Birthday)`);
    }
  }
  
  // Placeholder for Expression and Soul Urge Karmic Debt (would require their unreduced sums)
  // For Expression:
  if (name && currentResults.expression !== null) {
    const expressionSumUnreduced = name.toUpperCase().replace(/[^A-Z]/g, '').split('').reduce((sum, letter) => sum + getLetterValue(letter), 0);
    if ([13, 14, 16, 19].includes(expressionSumUnreduced)) {
      let finalExpressionReduction = expressionSumUnreduced;
      if (finalExpressionReduction !== 11 && finalExpressionReduction !== 22 && finalExpressionReduction > 9) {
        finalExpressionReduction = reduceToSingleDigit(finalExpressionReduction);
      }
      if (finalExpressionReduction === currentResults.expression) {
        debts.push(`${expressionSumUnreduced}/(${formatNumber(currentResults.expression)}) (Expression)`);
      }
    }
  }

  // For Soul Urge:
  if (name && currentResults.soulUrge !== null) {
    const vowelsList = ['A', 'E', 'I', 'O', 'U'];
    const nameArrayAlphaOnly = name.toUpperCase().replace(/[^A-Z]/g, '').split('');
    let soulUrgeSumUnreduced = 0;
    for (let i = 0; i < nameArrayAlphaOnly.length; i++) {
        const letter = nameArrayAlphaOnly[i];
        if (vowelsList.includes(letter)) {
            soulUrgeSumUnreduced += getLetterValue(letter);
        } else if (letter === 'Y') {
            const prevLetter = i > 0 ? nameArrayAlphaOnly[i-1] : null;
            if (!prevLetter || !vowelsList.includes(prevLetter)) {
                 soulUrgeSumUnreduced += getLetterValue('Y');
            }
        }
    }
    if ([13, 14, 16, 19].includes(soulUrgeSumUnreduced)) {
      let finalSoulUrgeReduction = soulUrgeSumUnreduced;
      if (finalSoulUrgeReduction !== 11 && finalSoulUrgeReduction !== 22 && finalSoulUrgeReduction > 9) {
        finalSoulUrgeReduction = reduceToSingleDigit(finalSoulUrgeReduction);
      }
      if (finalSoulUrgeReduction === currentResults.soulUrge) {
        debts.push(`${soulUrgeSumUnreduced}/(${formatNumber(currentResults.soulUrge)}) (Soul Urge)`);
      }
    }
  }


  return debts.length > 0 ? debts.join(', ') : "None detected";
};

const calculateChallenge = (birthdate) => {
  if (!birthdate) return null;
  
  const parts = birthdate.split('-');
  const month = parseInt(parts[1]);
  const day = parseInt(parts[2]);
  const yearDigits = parts[0].split('').map(Number);
  const yearSum = yearDigits.reduce((a, b) => a + b, 0);
  
  const monthReduced = month === 11 || month === 22 ? month : (month > 9 ? reduceToSingleDigit(month) : month);
  const dayReduced = day === 11 || day === 22 ? day : (day > 9 ? reduceToSingleDigit(day) : day);
  const yearReduced = yearSum === 11 || yearSum === 22 ? yearSum : (yearSum > 9 ? reduceToSingleDigit(yearSum) : yearSum);
  
  const first = Math.abs(monthReduced - dayReduced);
  const second = Math.abs(dayReduced - yearReduced);
  
  return Math.abs(first - second);
};

const calculateIntensityTable = (name) => {
  if (!name) return Array(9).fill(0);
  
  const nameArray = name.toUpperCase().replace(/[^A-Z]/g, '').split('');
  const counts = Array(9).fill(0);
  
  nameArray.forEach(letter => {
    const value = getLetterValue(letter);
    if (value >= 1 && value <= 9) {
      counts[value-1]++;
    }
  });
  
  return counts;
};

const getAverageCount = (index) => {
  const averages = [3, 1, 2, 1, 4, 2, 1, 1, 3]; 
  return averages[index] || 0;
};

const calculateMaturityNumber = (lifePath, expression) => {
  if (lifePath === null || expression === null) return null;
  const sum = lifePath + expression;
  if (sum === 11 || sum === 22) return sum;
  return reduceToSingleDigit(sum);
};

// --- New Helper Calculation Functions ---
const calculateGrowthNumber = (name) => {
  if (!name) return null;
  const firstName = name.split(' ')[0];
  const firstNameSum = firstName.toUpperCase().split('').reduce((sum, letter) => {
    return sum + getLetterValue(letter);
  }, 0);
  if (firstNameSum === 11 || firstNameSum === 22) {
    return firstNameSum;
  }
  return reduceToSingleDigit(firstNameSum);
};

const calculateSecretSelf = (name) => {
  if (!name) return null;
  const nameArray = name.toUpperCase().replace(/[^A-Z]/g, '').split('');
  const vowels = ['A', 'E', 'I', 'O', 'U'];
  let consonantSum = 0;
  nameArray.forEach(letter => {
    if (!vowels.includes(letter)) {
      consonantSum += getLetterValue(letter);
    }
  });
  if (consonantSum === 11 || consonantSum === 22) {
    return consonantSum;
  }
  return reduceToSingleDigit(consonantSum);
};

const calculateLifePathSubElements = (birthdate) => {
  if (!birthdate) return [];
  const parts = birthdate.split('-'); // YYYY-MM-DD
  const month = parseInt(parts[1]);
  const day = parseInt(parts[2]);
  const year = parts[0];
  const yearDigits = year.split('').map(Number);
  const yearValue = reduceToSingleDigit(yearDigits.reduce((a, b) => a + b, 0)); // Reduce year sum
  
  // Reduce month and day as well, unless master numbers (though less common for month as sub-element)
  const reducedMonth = (month === 11 || month === 22) ? month : reduceToSingleDigit(month);
  const reducedDay = (day === 11 || day === 22) ? day : reduceToSingleDigit(day);

  return [reducedMonth, reducedDay, yearValue].map(n => (n === 11 || n === 22) ? n : reduceToSingleDigit(n));
};


const calculateExpressionSubElements = (name) => {
  if (!name) return [];
  const names = name.split(' ');
  let subElements = [];
  names.forEach(namePart => {
    if (namePart.length > 0) {
      const nameSum = namePart.toUpperCase().replace(/[^A-Z]/g, '').split('').reduce((sum, letter) => {
        return sum + getLetterValue(letter);
      }, 0);
      // Sub-elements are typically reduced unless master numbers
      subElements.push((nameSum === 11 || nameSum === 22) ? nameSum : reduceToSingleDigit(nameSum));
    }
  });
  return subElements;
};

const findFirstVowel = (name) => {
  if (!name) return '';
  const nameArray = name.toUpperCase().replace(/[^A-Z]/g, '').split('');
  const vowels = ['A', 'E', 'I', 'O', 'U'];
  for (let i = 0; i < nameArray.length; i++) {
    if (vowels.includes(nameArray[i])) {
      return nameArray[i];
    }
  }
  for (let i = 0; i < nameArray.length; i++) {
    if (nameArray[i] === 'Y') {
        // Y is vowel if not surrounded by vowels and not the first letter if followed by vowel
        const prevChar = i > 0 ? nameArray[i-1] : null;
        const nextChar = i < nameArray.length - 1 ? nameArray[i+1] : null;
        const isPrevVowel = prevChar && vowels.includes(prevChar);
        // const isNextVowel = nextChar && vowels.includes(nextChar);

        // Simpler rule often used: Y is a vowel if it's not preceded by a vowel.
        // Or more common: Y is a vowel if it creates a vowel sound.
        // Using: Y is vowel if it's not adjacent to another vowel (A,E,I,O,U)
        // Or if it's the only vowel sound. For simplicity, let's use a common one:
        // Y is a vowel if the letter before it (if any) is a consonant OR if Y is the first letter.
        if (i === 0 || (prevChar && !vowels.includes(prevChar))) {
             // And ensure it's not followed by a vowel making a diphthong where Y acts as consonant
            if (!(nextChar && vowels.includes(nextChar))) {
                 return 'Y';
            }
        }
    }
  }
  return '';
};

const calculateTemperament = (name) => {
  if (!name) return { physical: 0, mental: 0, emotional: 0, intuitive: 0 };
  const nameArray = name.toUpperCase().replace(/[^A-Z]/g, '').split('');
  
  // Using your provided lists for consistency:
  const physicalLetters = ['T', 'D', 'M', 'W'];
  const mentalLetters = ['E', 'S', 'N', 'O', 'R'];
  const emotionalLetters = ['A', 'G', 'H', 'J', 'L', 'P'];
  const intuitiveLetters = ['C', 'F', 'K', 'Q', 'U', 'V', 'Y']; // Note: Some letters might be missing from all categories in this definition.
  // Also, the book might have more comprehensive rules, e.g. for letters B, I, X, Z.
  // For now, using the provided lists.

  const counts = {
    physical: nameArray.filter(letter => physicalLetters.includes(letter)).length,
    mental: nameArray.filter(letter => mentalLetters.includes(letter)).length,
    emotional: nameArray.filter(letter => emotionalLetters.includes(letter)).length,
    intuitive: nameArray.filter(letter => intuitiveLetters.includes(letter)).length
  };
  return counts;
};

const getComponentStrength = (count, temperament) => {
  const totalLetters = temperament.physical + temperament.mental + temperament.emotional + temperament.intuitive;
  if (totalLetters === 0) return "N/A"; // Avoid division by zero if no categorized letters

  const largestCount = Math.max(
    temperament.physical, 
    temperament.mental, 
    temperament.emotional, 
    temperament.intuitive
  );

  if (count === 0 && largestCount > 0) return "Weak"; // Explicitly weak if zero and others are not
  if (count === largestCount && count > 0) return "Strongest"; // If it's one of the highest
  if (count >= largestCount * 0.6 && count > 0) return "Strong"; // If close to highest
  if (count < largestCount * 0.25 && count > 0) return "Weak"; // Significantly lower
  if (count > 0) return "Average"; // Default for present but not standout
  
  // Fallback if logic above doesn't catch all cases (e.g. all counts are 0)
  return "Average"; 
};

// Helper function to find the Prime Intensifier
const findPrimeIntensifier = (intensityTable) => {
  if (!intensityTable || intensityTable.every(count => count === 0)) return null;
  let maxCount = 0;
  let maxIndices = []; // Can be multiple prime intensifiers if counts are tied
  for (let i = 0; i < intensityTable.length; i++) {
    if (intensityTable[i] > maxCount) {
      maxCount = intensityTable[i];
      maxIndices = [i + 1]; // Store number (1-9)
    } else if (intensityTable[i] === maxCount && maxCount > 0) {
      maxIndices.push(i + 1);
    }
  }

  // Special case for 5: only a prime intensifier if 6 or more.
  // If 5 is among the max and its count < 6, remove it from consideration unless it's the *only* one.
  if (maxIndices.includes(5) && intensityTable[4] < 6) {
    if (maxIndices.length > 1) { // If 5 was tied with others
      maxIndices = maxIndices.filter(num => num !== 5);
    } else { // If 5 was the sole intensifier but count < 6
        // Find the next highest that is not 5.
        let nextMaxCount = 0;
        let nextMaxIndices = [];
        for (let i = 0; i < intensityTable.length; i++) {
            if (i === 4) continue; // Skip 5
            if (intensityTable[i] > nextMaxCount) {
                nextMaxCount = intensityTable[i];
                nextMaxIndices = [i+1];
            } else if (intensityTable[i] === nextMaxCount && nextMaxCount > 0) {
                nextMaxIndices.push(i+1);
            }
        }
        if (nextMaxIndices.length > 0) return nextMaxIndices.join(', '); // Return next highest(s)
        return null; // No other prime intensifier
    }
  }
  
  if (maxIndices.length === 0) return null;
  return maxIndices.join(', '); // Return all numbers that are prime intensifiers
};


// --- NEW FUNCTIONS FOR CORE SYNTHESIS, ASPECTS, ETC. ---

// Check for repeated numbers in core elements
const checkRepeatedCoreNumbers = (results) => {
  if (!results.lifePath || !results.expression || !results.soulUrge || !results.birthday) return [];
  
  const coreNumbers = [
    { name: 'Life Path', value: results.lifePath },
    { name: 'Expression', value: results.expression },
    { name: 'Soul Urge', value: results.soulUrge },
    { name: 'Birthday', value: results.birthday }
  ];
  
  const repeats = [];
  
  // Check each pair
  for (let i = 0; i < coreNumbers.length; i++) {
    for (let j = i + 1; j < coreNumbers.length; j++) {
      if (coreNumbers[i].value === coreNumbers[j].value) {
        // Check if this number is already in repeats for a different pair
        let existingRepeat = repeats.find(r => r.number === coreNumbers[i].value);
        if (existingRepeat) {
            if (!existingRepeat.elements.includes(coreNumbers[i].name)) {
                existingRepeat.elements.push(coreNumbers[i].name);
            }
            if (!existingRepeat.elements.includes(coreNumbers[j].name)) {
                existingRepeat.elements.push(coreNumbers[j].name);
            }
        } else {
            repeats.push({
              number: coreNumbers[i].value,
              elements: [coreNumbers[i].name, coreNumbers[j].name]
            });
        }
      }
    }
  }
  
  // Consolidate if a number appears in more than two elements
  const finalRepeats = [];
  const processedNumbers = new Set();
  repeats.forEach(repeat => {
    if(!processedNumbers.has(repeat.number)){
        const allOccurrences = coreNumbers.filter(cn => cn.value === repeat.number);
        if (allOccurrences.length > 1) {
            finalRepeats.push({
                number: repeat.number,
                elements: allOccurrences.map(o => o.name)
            });
        }
        processedNumbers.add(repeat.number);
    }
  });

  return finalRepeats;
};

// Determine harmony or discord between two numbers
const determineHarmony = (num1, num2) => {
  // Simplify master numbers for comparison
  const n1 = num1 === 11 ? 2 : (num1 === 22 ? 4 : num1);
  const n2 = num2 === 11 ? 2 : (num2 === 22 ? 4 : num2);
  
  // Harmonious combinations based on Chart 6
  const harmonious = [
    '1-3', '1-4', '1-5', '1-7', '1-8', '1-9',
    '2-4', '2-6', '2-9', '2-11', // Note: Chart 6 might refer to original master numbers
    '3-5', '3-6', '3-9',
    '4-6', '4-8', '4-9', '4-22', // Note: Chart 6 might refer to original master numbers
    '5-7', '5-9',
    '6-8', '6-9', '6-11', // Note: Chart 6 might refer to original master numbers
    '7-8', '7-9',
    '8-9', '8-22', // Note: Chart 6 might refer to original master numbers
    '9-11', '9-22', // Note: Chart 6 might refer to original master numbers
    '11-22' // Note: Chart 6 might refer to original master numbers
  ];

  // For checking against the harmonious array, we use the simplified n1, n2
  // But if Chart 6 means raw 11s and 22s, the logic should use num1, num2 there.
  // The provided harmonious array uses numbers like '2-11'. This implies we should check
  // against original num1/num2 IF they are master numbers, and reduced n1/n2 otherwise.
  // Let's re-evaluate the pairs based on the provided harmonious array
  
  // If original numbers are master, use them for pair construction with master numbers in `harmonious`
  // Otherwise, use reduced numbers.
  const checkPair = (val1, val2) => {
    const p1 = `${val1}-${val2}`;
    const p2 = `${val2}-${val1}`;
    return harmonious.includes(p1) || harmonious.includes(p2);
  };

  // Check for exact matches (same numbers are usually discordant)
  // Using n1 and n2 for this, as "same value" regardless of master status.
  if (n1 === n2) {
    return "Very Discordant"; 
  }
  
  // Check harmony. Priority: Original masters, then reduced.
  let isHarmonious = false;
  if ((num1 === 11 || num1 === 22 || num2 === 11 || num2 === 22)) {
      // At least one is a master number, check with original values against chart
      isHarmonious = checkPair(num1, num2);
      // If not found, and one is master and the other is not, also check master vs reduced of other
      if (!isHarmonious) {
        if ((num1 === 11 || num1 === 22) && !(num2 === 11 || num2 === 22)) {
            isHarmonious = checkPair(num1, n2);
        } else if ((num2 === 11 || num2 === 22) && !(num1 === 11 || num1 === 22)) {
            isHarmonious = checkPair(n1, num2);
        }
      }
  }
  // If still not harmonious or no masters involved, check with fully reduced values
  if (!isHarmonious) {
    isHarmonious = checkPair(n1, n2);
  }
  
  if (isHarmonious) {
    return "Harmonious";
  } else {
    // Specific discordant cases (based on typical numerology, Chart 6 might have more)
    // Numbers one apart are often discordant (e.g., 1-2, 2-3) unless specified as harmonious.
    // Squares (1-4, 2-8, 3-6, 4-1) are often discordant.
    // For now, let's stick to the provided list and default to "Discordant".
    return "Discordant";
  }
};


// Analyze aspects between core numbers
const analyzeAspects = (results) => {
  if (!results.lifePath || !results.expression || !results.soulUrge || !results.birthday) return [];
  
  const aspects = [
    { pair: 'Life Path/Expression', harmony: determineHarmony(results.lifePath, results.expression) },
    { pair: 'Life Path/Soul Urge', harmony: determineHarmony(results.lifePath, results.soulUrge) },
    { pair: 'Expression/Soul Urge', harmony: determineHarmony(results.expression, results.soulUrge) },
    { pair: 'Life Path/Birthday', harmony: determineHarmony(results.lifePath, results.birthday) }
  ];
  
  return aspects;
};


// Calculate core element effectiveness
const calculateEffectiveness = (results) => {
  if (!results.lifePath || !results.expression || !results.soulUrge) return [];
  
  // Calculate spaces between elements
  const getSpaces = (num1, num2) => {
    // Special handling for master numbers
    if ((num1 === 11 || num1 === 22) && (num2 === 11 || num2 === 22)) {
      // If both are master numbers, the book implies a direct comparison or a specific rule.
      // Example: 11 and 22. Reduced: 2 and 4. Spaces: 2.
      // The provided code divides by 11: Math.abs(num1 - num2) / 11;
      // For 11 and 22, this is Math.abs(11-22)/11 = 1. This suggests 1 space.
      // Let's assume the book's specific logic is captured by the formula.
      return Math.abs(num1 - num2) / 11;
    } else if (num1 === 11 || num1 === 22) {
      const reduced1 = num1 === 11 ? 2 : 4;
      const spacesBase = Math.abs(reduced1 - (num2 === 11 ? 2 : (num2 === 22 ? 4 : num2))); // reduce num2 if it's master for base diff
      // The "Add spaces for 9-11 and 11-22" implies specific interactions.
      // If num1 is 11 (reduces to 2), comparing to 9: Math.abs(2-9)=7. Add 1 -> 8 spaces?
      // This part `spaces + (num1 === 11 ? 1 : 2)` seems to be an adjustment factor.
      // Let's follow the formula as given: reduce the master, calculate diff with other, then add factor.
      const otherVal = (num2 === 11 || num2 === 22) ? (num2 === 11 ? 2:4) : num2; // reduce other if it's master too
      const spaces = Math.abs(reduced1 - otherVal);
      return spaces + (num1 === 11 ? 1 : 2); 
    } else if (num2 === 11 || num2 === 22) {
      const reduced2 = num2 === 11 ? 2 : 4;
      const otherVal = (num1 === 11 || num1 === 22) ? (num1 === 11 ? 2:4) : num1; // reduce other if it's master too
      const spaces = Math.abs(otherVal - reduced2);
      return spaces + (num2 === 11 ? 1 : 2); 
    } else {
      return Math.abs(num1 - num2);
    }
  };
  
  const lpExpSpaces = getSpaces(results.lifePath, results.expression);
  const lpSuSpaces = getSpaces(results.lifePath, results.soulUrge);
  const expSuSpaces = getSpaces(results.expression, results.soulUrge);
  
  return [
    { 
      pair: 'Life Path/Expression', 
      spaces: lpExpSpaces,
      effectiveness: determineEffectiveness(lpExpSpaces, results.lifePath > results.expression) 
    },
    { 
      pair: 'Life Path/Soul Urge', 
      spaces: lpSuSpaces,
      effectiveness: determineEffectiveness(lpSuSpaces, results.lifePath > results.soulUrge)
    },
    { 
      pair: 'Expression/Soul Urge', 
      spaces: expSuSpaces,
      effectiveness: determineEffectiveness(expSuSpaces, results.expression > results.soulUrge)
    }
  ];
};

// Determine the effectiveness based on spaces and relative position
const determineEffectiveness = (spaces, firstHigher) => {
  if (spaces <= 2) {
    return "Effective Balance";
  } else if (spaces <= 5) {
    return firstHigher ? "Opportunities outweigh abilities/motivations" : "Abilities/motivations outweigh opportunities";
  } else {
    return firstHigher ? "Substantially unbalanced (too many opportunities)" : "Substantially unbalanced (too many abilities/motivations)";
  }
};


// --- Interpretation Functions ---
const interpretChallenge = (number) => {
  if (number === null) return <p>Please enter your birthdate to calculate your Challenge number.</p>;
  switch (number) {
    case 0: return <p>Challenge 0: You face few obstacles in life. You'll need to develop willpower and determination on your own without external pressure. This can sometimes indicate a lack of defined challenges, requiring self-motivation to grow.</p>;
    case 1: return <p>Challenge 1: You must develop independence and overcome tendencies toward dependence or domination. Learn to assert your individuality constructively and stand on your own feet.</p>;
    case 2: return <p>Challenge 2: You need to overcome shyness, oversensitivity, and develop cooperation with others. Learn to express your feelings and be more diplomatic and patient in your interactions.</p>;
    case 3: return <p>Challenge 3: You must learn to express yourself confidently and overcome scattered energies or superficiality. Develop focus and discipline to channel your creativity productively.</p>;
    case 4: return <p>Challenge 4: You need to overcome feelings of limitation, being overly practical, or avoiding hard work. Learn to be more flexible and organized without becoming rigid.</p>;
    case 5: return <p>Challenge 5: You must learn to use freedom constructively and overcome tendencies toward excess, impatience, or irresponsibility. Develop stability while embracing beneficial change.</p>;
    case 6: return <p>Challenge 6: You need to overcome tendencies to be overly idealistic, critical, or meddling in others' affairs. Learn to balance responsibility with self-care and set healthy boundaries.</p>;
    case 7: return <p>Challenge 7: You must overcome tendencies toward isolation, skepticism, or aloofness. Learn to trust your intuition and share your wisdom without becoming withdrawn or overly critical.</p>;
    case 8: return <p>Challenge 8: You need to overcome challenges related to power, money, and authority. This could manifest as being too materialistic or, conversely, fearing success and financial responsibility. Learn to manage resources effectively and use power wisely.</p>;
    default: return <p>Challenge {number}: This represents specific obstacles you need to overcome in your early life. Work on developing the positive aspects of this number's energy and learn the lessons it presents.</p>;
  }
};

const interpretMaturityNumber = (number) => {
  if (number === null) return <p>Please enter your birthdate and name to calculate your Maturity Number.</p>;
  switch (number) {
    case 1: return <p>Maturity Number 1: In your mature years (after 35-40), you'll develop a greater sense of independence and leadership. You'll become more original, creative, and self-reliant, possibly initiating new ventures.</p>;
    case 2: return <p>Maturity Number 2: Your later years will bring greater sensitivity and diplomacy. You'll develop stronger cooperation skills, patience, and deeper, more harmonious relationships.</p>;
    case 3: return <p>Maturity Number 3: As you mature, you'll express greater joy and creativity. Your communication and social skills will flourish, and you may develop artistic talents or find more avenues for self-expression.</p>;
    case 4: return <p>Maturity Number 4: Your mature years focus on creating stability and order. You'll develop strong practical skills, discipline, and learn to build solid foundations for yourself and others.</p>;
    case 5: return <p>Maturity Number 5: After midlife, you'll embrace constructive freedom and change. You'll become more adaptable, adventurous, and enjoy variety and progressive experiences.</p>;
    case 6: return <p>Maturity Number 6: Your later years emphasize responsibility, harmony, and service. You'll develop greater nurturing abilities, focus on home and community, and create beauty around you.</p>;
    case 7: return <p>Maturity Number 7: After middle age, you'll focus on analysis, wisdom, and spiritual understanding. You'll develop greater introspection, seek knowledge, and find time for inner growth and contemplation.</p>;
    case 8: return <p>Maturity Number 8: Your mature years emphasize practical achievement, material success, and executive abilities. You'll develop financial acumen, organizational skills, and the capacity for significant accomplishments.</p>;
    case 9: return <p>Maturity Number 9: In later life, you'll expand your humanitarian nature. You'll develop greater compassion, tolerance, and a desire to give back to the world, often on a broader scale.</p>;
    case 11: return <p>Maturity Number 11/2: Your mature years bring spiritual illumination, intuition, and inspiration. You'll develop abilities to inspire and uplift others, often through teaching or artistic endeavors, while also utilizing diplomatic skills.</p>;
    case 22: return <p>Maturity Number 22/4: After midlife, you'll develop master builder potential. You'll combine visionary ideals with practical applications on a large scale, aiming for significant, lasting achievements that benefit humanity.</p>;
    default: return <p>Maturity Number {formatNumber(number)}: This represents a new direction or a refined focus that develops in mid-life (around age 35-45). It describes how your path widens and your underlying potential comes to the fore as you mature.</p>;
  }
};

const interpretGrowthNumber = (number) => {
  if (number === null) return <p>Please enter your full name to calculate your Growth Number.</p>;
  switch (number) {
    case 1: return <p>Growth Number 1: Your growth path involves developing independence and leadership. You grow when you create your own opportunities and take charge of your life.</p>;
    case 2: return <p>Growth Number 2: Your growth path involves developing cooperation and sensitivity. You grow through relationships and working harmoniously with others.</p>;
    case 3: return <p>Growth Number 3: Your growth path involves self-expression and creativity. You grow by communicating your ideas and developing artistic talents.</p>;
    case 4: return <p>Growth Number 4: Your growth path involves building stable foundations. You grow through organization, hard work, and completing practical tasks.</p>;
    case 5: return <p>Growth Number 5: Your growth path involves embracing freedom and change. You grow through new experiences, travel, and adaptability.</p>;
    case 6: return <p>Growth Number 6: Your growth path involves responsibility and harmony. You grow by nurturing others and creating beauty in your environment.</p>;
    case 7: return <p>Growth Number 7: Your growth path involves analysis and spiritual understanding. You grow through study, research, and seeking wisdom.</p>;
    case 8: return <p>Growth Number 8: Your growth path involves material achievement. You grow through business endeavors and developing executive abilities.</p>;
    case 9: return <p>Growth Number 9: Your growth path involves humanitarianism. You grow by giving to others without expectation of return.</p>;
    case 11: return <p>Growth Number 11: Your growth path involves spiritual enlightenment. You grow through intuition and inspiring others with your insights.</p>;
    case 22: return <p>Growth Number 22: Your growth path involves building structures of lasting value. You grow by transforming ideals into practical realities.</p>;
    default: return <p>Growth Number {formatNumber(number)}: This energy will help illuminate the essence of your experiences and expand your development.</p>;
  }
};

const interpretSecretSelf = (number) => {
  if (number === null) return <p>Please enter your full name to calculate your Secret Self.</p>;
  switch (number) {
    case 1: return <p>Secret Self 1: Deep inside, you cherish dreams of independence and leadership. You may fantasize about pioneering ventures or being recognized for your individual achievements.</p>;
    case 2: return <p>Secret Self 2: Deep inside, you cherish dreams of harmony and cooperation. You may fantasize about ideal partnerships or being the peacemaker in difficult situations.</p>;
    case 3: return <p>Secret Self 3: Deep inside, you cherish dreams of creative expression. You may fantasize about artistic success or bringing joy and optimism to others.</p>;
    case 4: return <p>Secret Self 4: Deep inside, you cherish dreams of creating order and stability. You may fantasize about building solid foundations or managing complex systems perfectly.</p>;
    case 5: return <p>Secret Self 5: Deep inside, you cherish dreams of freedom and adventure. You may fantasize about travel, excitement, and varied experiences.</p>;
    case 6: return <p>Secret Self 6: Deep inside, you cherish dreams of harmony and beauty. You may fantasize about the perfect home, family, and relationships.</p>;
    case 7: return <p>Secret Self 7: Deep inside, you cherish dreams of wisdom and deep understanding. You may fantasize about spiritual insights or being a scholar or mystic.</p>;
    case 8: return <p>Secret Self 8: Deep inside, you cherish dreams of material success. You may fantasize about wealth, power, and business achievement.</p>;
    case 9: return <p>Secret Self 9: Deep inside, you cherish dreams of humanitarian service. You may fantasize about making significant contributions to humanity.</p>;
    case 11: return <p>Secret Self 11: Deep inside, you cherish dreams of spiritual illumination. You may fantasize about having inspired insights and sharing them with others.</p>;
    case 22: return <p>Secret Self 22: Deep inside, you cherish dreams of building something significant. You may fantasize about creating structures or institutions that benefit many people.</p>;
    default: return <p>Secret Self {formatNumber(number)}: This represents a dream or fantasy you cherish, though you may make little effort to actually accomplish it.</p>;
  }
};

const interpretFirstLetter = (letter) => {
  if (!letter) return <p>Please enter your name to analyze your First Letter.</p>;
  const interpretations = {
    'A': <p>You approach experiences with leadership, originality, and independence. You tend to be self-starting and creative.</p>,
    'B': <p>You approach experiences cautiously and with sensitivity. You tend to be shy, retiring, and emotional, often preferring to observe before acting.</p>,
    'C': <p>You approach experiences with spontaneity and exuberance. You tend to be sociable, creative, and expressive, with an enjoyment of life.</p>,
    'D': <p>You approach experiences with practicality and steadiness. You tend to be methodical, persistent, and security-minded.</p>,
    'E': <p>You approach experiences with a spirit of adventure and flexibility. You adapt quickly to new situations and enjoy variety and change.</p>,
    'F': <p>You approach experiences with sensitivity and deep feeling. You tend to be intuitive, nurturing, and concerned about others.</p>,
    'G': <p>You approach experiences thoughtfully and analytically. You tend to be reflective and deliberate before making decisions.</p>,
    'H': <p>You approach experiences with awareness of the material world. Your approach is practical and materialistic, with good executive abilities.</p>,
    'I': <p>You approach experiences with deep emotions and sensitivity. You tend to be idealistic and humanitarian in your outlook.</p>,
    'J': <p>You approach experiences with aspiration and ambition. You aim high and work persistently toward your goals.</p>,
    'K': <p>You approach experiences with intuition and quick perception. You have unusual insights and often see what others miss.</p>,
    'L': <p>You approach experiences with reason and logic. You tend to analyze situations carefully and make deliberate judgments.</p>,
    'M': <p>You approach experiences with control and practicality. You are usually thorough, organized, and self-disciplined.</p>,
    'N': <p>You approach experiences with a questioning attitude. You tend to be intellectually curious and like to understand how things work.</p>,
    'O': <p>You approach experiences with practicality and responsibility. You tend to be balanced, self-contained, and dependable.</p>,
    'P': <p>You approach experiences with careful thought and analysis. You tend to be introspective and somewhat private about your inner life.</p>,
    'Q': <p>You approach experiences with intuition and spiritual awareness. You often see beyond surface appearances to deeper meanings.</p>,
    'R': <p>You approach experiences with mental energy and determination. You tend to be persistent and focused on your goals.</p>,
    'S': <p>You approach experiences with leadership and authority. You tend to be forceful, decisive, and willing to take charge.</p>,
    'T': <p>You approach experiences with assertiveness and practicality. You tend to be direct, straightforward, and action-oriented.</p>,
    'U': <p>You approach experiences with sensitivity and intuition. You often sense what others are feeling without being told.</p>,
    'V': <p>You approach experiences with inspiration and vision. You tend to see possibilities that others miss.</p>,
    'W': <p>You approach experiences with caution and limitation. You tend to be practical but sometimes miss opportunities due to hesitation.</p>,
    'X': <p>You approach experiences with artistic sensitivity and expressiveness. You tend to have strong creative abilities.</p>,
    'Y': <p>You approach experiences with uncertainty and vacillation. You often consider multiple perspectives before deciding.</p>,
    'Z': <p>You approach experiences with impulsiveness and creative originality. You tend to think outside conventional boundaries.</p>
  };
  return interpretations[letter] || <p>Your First Letter {letter} influences how you approach life experiences.</p>;
};

const interpretFirstVowel = (vowel) => {
  if (!vowel) return <p>Please enter your name to analyze your First Vowel.</p>;
  const interpretations = {
    'A': <p>Your inner approach emphasizes originality and creativity. You have leadership qualities and a desire to pioneer new paths. You tend to be self-reliant and innovative in addressing challenges.</p>,
    'E': <p>Your inner approach emphasizes freedom and adventure. You have a love of travel, variety, and change. You tend to be communicative, adaptable, and flexible in addressing challenges.</p>,
    'I': <p>Your inner approach emphasizes deep feelings and humanitarian concerns. You have sensitivity and idealism. You tend to be passionate, intuitive, and creative in addressing challenges.</p>,
    'O': <p>Your inner approach emphasizes responsibility and harmony. You have organizational abilities and practical talents. You tend to be conservative, dependable, and self-contained in addressing challenges.</p>,
    'U': <p>Your inner approach emphasizes intuition and sensitivity. You have receptivity to spiritual matters and unusual perceptions. You tend to be intuitive, idealistic, and somewhat indecisive in addressing challenges.</p>,
    'Y': <p>Your inner approach emphasizes analysis and introspection. You have unusual thinking patterns and intuitive abilities. You tend to be restless, vacillating, and thoughtful in addressing challenges.</p>
  };
  return interpretations[vowel] || <p>Your First Vowel {vowel} influences your inner motivation and response to experience.</p>;
};

const interpretTemperament = (temperament) => {
  if (!temperament || (temperament.physical === 0 && temperament.mental === 0 && temperament.emotional === 0 && temperament.intuitive === 0)) {
    return <p>Please enter your name to analyze your Temperament. Ensure letters are categorized for accurate results.</p>;
  }
  
  const largestCount = Math.max(
    temperament.physical, 
    temperament.mental, 
    temperament.emotional, 
    temperament.intuitive
  );
  
  let description = <p>Your temperament shows the following components:</p>;
  
  let physicalDesc = "";
  if (temperament.physical === largestCount && temperament.physical > 0) {
    physicalDesc = "Your strong Physical component (potentially strongest) indicates a practical, hands-on approach to life. You're concerned with material matters and prefer tangible results. You likely have good physical endurance and ability to concentrate.";
  } else if (temperament.physical >= largestCount * 0.6 && temperament.physical > 0) {
    physicalDesc = "Your strong Physical component indicates a practical, hands-on approach to life. You're concerned with material matters and prefer tangible results.";
  } else if (temperament.physical < largestCount * 0.25 || (temperament.physical === 0 && largestCount > 0)) {
    physicalDesc = "Your weak Physical component suggests material matters may not be of particular interest to you. You might avoid hard physical work or situations requiring prolonged concentration.";
  } else if (temperament.physical > 0) {
    physicalDesc = "Your average Physical component allows you to engage with material matters when needed, though it's not your primary focus.";
  } else {
     physicalDesc = "Physical component has no letters from your name based on the current categorization.";
  }
  
  let mentalDesc = "";
  if (temperament.mental === largestCount && temperament.mental > 0) {
    mentalDesc = "Your strong Mental component (potentially strongest) indicates an intellectual, logical approach to life. You're concerned with facts, reason, and leadership. You likely have good analytical skills.";
  } else if (temperament.mental >= largestCount * 0.6 && temperament.mental > 0) {
    mentalDesc = "Your strong Mental component indicates an intellectual, logical approach to life. You're concerned with facts, reason, and leadership.";
  } else if (temperament.mental < largestCount * 0.25 || (temperament.mental === 0 && largestCount > 0)) {
    mentalDesc = "Your weak Mental component suggests you may have little interest in purely mental matters. You might prefer emotional or intuitive approaches over logical reasoning.";
  } else if (temperament.mental > 0) {
    mentalDesc = "Your average Mental component allows you to use reason and logic when needed, though it's not your primary mode of operation.";
  } else {
    mentalDesc = "Mental component has no letters from your name based on the current categorization.";
  }
  
  let emotionalDesc = "";
  if (temperament.emotional === largestCount && temperament.emotional > 0) {
    emotionalDesc = "Your strong Emotional component (potentially strongest) indicates a feeling-oriented approach to life. You're sympathetic, sentimental, and imaginative. You likely express your feelings openly.";
  } else if (temperament.emotional >= largestCount * 0.6 && temperament.emotional > 0) {
    emotionalDesc = "Your strong Emotional component indicates a feeling-oriented approach to life. You're sympathetic, sentimental, and imaginative.";
  } else if (temperament.emotional < largestCount * 0.25 || (temperament.emotional === 0 && largestCount > 0)) {
    emotionalDesc = "Your weak Emotional component suggests feelings—your own or others'—may not be of particular interest to you. You might have difficulty accepting your emotional nature.";
  } else if (temperament.emotional > 0) {
    emotionalDesc = "Your average Emotional component allows you to express feelings appropriately, though they may not dominate your approach to life.";
  } else {
    emotionalDesc = "Emotional component has no letters from your name based on the current categorization.";
  }
  
  let intuitiveDesc = "";
  if (temperament.intuitive === largestCount && temperament.intuitive > 0) {
    intuitiveDesc = "Your strong Intuitive component (potentially strongest) indicates a spiritual, philosophical approach to life. You're concerned with wisdom and deeper meanings. You likely have good intuitive insights.";
  } else if (temperament.intuitive >= largestCount * 0.6 && temperament.intuitive > 0) {
    intuitiveDesc = "Your strong Intuitive component indicates a spiritual, philosophical approach to life. You're concerned with wisdom and deeper meanings.";
  } else if (temperament.intuitive < largestCount * 0.25 || (temperament.intuitive === 0 && largestCount > 0)) {
    intuitiveDesc = "Your weak Intuitive component suggests spiritual or metaphysical matters may not be of particular interest to you. You might distrust inner promptings.";
  } else if (temperament.intuitive > 0) {
    intuitiveDesc = "Your average Intuitive component allows you to access intuitive insights when needed, though they may not guide your primary decisions.";
  } else {
    intuitiveDesc = "Intuitive component has no letters from your name based on the current categorization.";
  }
  
  return (
    <>
      {description}
      <p className="mt-3">{physicalDesc}</p>
      <p className="mt-3">{mentalDesc}</p>
      <p className="mt-3">{emotionalDesc}</p>
      <p className="mt-3">{intuitiveDesc}</p>
      <p className="mt-3">Your temperament serves as a filter for how you express your core energies and can either enhance, limit, or stabilize your development.</p>
      <p className="mt-2 text-xs text-gray-500">Note: Temperament analysis depends heavily on the specific system used for letter categorization.</p>
    </>
  );
};


const CoreElementsCalculator = () => {
  const [birthdate, setBirthdate] = useState('');
  const [name, setName] = useState('');
  const [results, setResults] = useState({
    lifePath: null,
    expression: null,
    soulUrge: null,
    birthday: null,
    challenge: null,
    intensityTable: Array(9).fill(0),
    primeIntensifier: null,
    maturityNumber: null,
    karmicDebts: null, // Or "None detected" as initial
    growthNumber: null,
    secretSelf: null,
    lifePathSubElements: [],
    expressionSubElements: [],
    firstLetter: '',
    firstVowel: '',
    temperament: { physical: 0, mental: 0, emotional: 0, intuitive: 0 },
  });
  const [showInterpretation, setShowInterpretation] = useState(null);
  // Add this to your state variables at the top of the component
const [expandedSection, setExpandedSection] = useState(null);

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

  const calculateNumbers = () => {
    if (!birthdate || !name) {
        alert("Please enter both your full birth name and birthdate.");
        return;
    }
    
    const lifePathNum = calculateLifePath(birthdate);
    const expressionNum = calculateExpression(name);
    const soulUrgeNum = calculateSoulUrge(name);
    const birthdayNum = calculateBirthday(birthdate);
    
    // Additional calculations
    const challengeNum = calculateChallenge(birthdate);
    const intensityTable = calculateIntensityTable(name);
    const primeIntensifier = findPrimeIntensifier(intensityTable);
    const maturityNum = calculateMaturityNumber(lifePathNum, expressionNum);
    const growthNum = calculateGrowthNumber(name);
    const secretSelfNum = calculateSecretSelf(name);
    const subElementsLife = calculateLifePathSubElements(birthdate);
    const subElementsExp = calculateExpressionSubElements(name);
    const firstLetter = name ? name.charAt(0).toUpperCase() : '';
    const firstVowel = findFirstVowel(name);
    const temperamentValues = calculateTemperament(name);
    
    // For Karmic Debt, pass the newly calculated numbers
    const currentCalculationsForDebt = {
      lifePath: lifePathNum,
      expression: expressionNum,
      soulUrge: soulUrgeNum,
      birthday: birthdayNum
    };
    const karmicDebtsValue = checkKarmicDebt(currentCalculationsForDebt, birthdate, name);
    
    setResults({
      lifePath: lifePathNum,
      expression: expressionNum,
      soulUrge: soulUrgeNum,
      birthday: birthdayNum,
      challenge: challengeNum,
      intensityTable: intensityTable,
      primeIntensifier: primeIntensifier,
      maturityNumber: maturityNum,
      growthNumber: growthNum,
      secretSelf: secretSelfNum,
      lifePathSubElements: subElementsLife,
      expressionSubElements: subElementsExp,
      firstLetter: firstLetter,
      firstVowel: firstVowel,
      temperament: temperamentValues,
      karmicDebts: karmicDebtsValue
    });
  };

  const renderSumExplanation = (label, initialSum, finalResultNumeric) => {
    if (finalResultNumeric === null) return null;
    const isMaster = finalResultNumeric === 11 || finalResultNumeric === 22;
    const formattedFinalResult = formatNumber(finalResultNumeric);
    let explanation = "";
    if (initialSum !== finalResultNumeric || (isMaster && initialSum === finalResultNumeric) ) {
        explanation += ` → ${formattedFinalResult}`;
    }
    if (isMaster) {
        explanation += " (Master Number)";
    } else if (initialSum !== finalResultNumeric && !isMaster) {
        explanation += " (reduced)";
    } else if (!isMaster && initialSum === finalResultNumeric){
        explanation += " (final)";
    }
    return <p className="font-medium">{label}: {initialSum}{explanation}</p>;
  };

  const lifePathCalculationDetails = () => {
    if (!birthdate) return null;
    const parts = birthdate.split('-');
    if (parts.length !== 3) return null;
    const yearStr = parts[0]; const monthStr = parts[1]; const dayStr = parts[2];
    const rawMonth = parseInt(monthStr); const rawDay = parseInt(dayStr);
    let calculatedMonthValue;
    switch (rawMonth) {
        case 1: calculatedMonthValue = 1; break; case 2: calculatedMonthValue = 2; break;
        case 3: calculatedMonthValue = 3; break; case 4: calculatedMonthValue = 4; break;
        case 5: calculatedMonthValue = 5; break; case 6: calculatedMonthValue = 6; break;
        case 7: calculatedMonthValue = 7; break; case 8: calculatedMonthValue = 8; break;
        case 9: calculatedMonthValue = 9; break; case 10: calculatedMonthValue = 1; break;
        case 11: calculatedMonthValue = 11; break; case 12: calculatedMonthValue = 3; break;
        default: return null;
    }
    let calculatedDayValue = rawDay;
    if (rawDay > 9 && rawDay !== 11 && rawDay !== 22) {
        calculatedDayValue = reduceToSingleDigit(rawDay);
    }
    const yearDigits = yearStr.split('').map(Number);
    const rawYearSum = yearDigits.reduce((a,b) => a + b, 0);
    const calculatedYearValue = reduceToSingleDigit(rawYearSum);
    const sumOfReducedComponents = calculatedMonthValue + calculatedDayValue + calculatedYearValue;
    return (
      <>
        <p className="mb-2">Your birthdate: {birthdate}</p>
        <p className="mb-2">Month: {rawMonth} → reduces to {formatNumber(calculatedMonthValue)}</p>
        <p className="mb-2">Day: {rawDay} → reduces to {formatNumber(calculatedDayValue)}</p>
        <p className="mb-2">Year: {yearStr} ({yearStr.split('').join(' + ')}) = {rawYearSum} → reduces to {formatNumber(calculatedYearValue)}</p>
        <p className="mb-2">Sum of reduced components: {calculatedMonthValue} + {calculatedDayValue} + {calculatedYearValue} = {sumOfReducedComponents}</p>
        {renderSumExplanation("Life Path", sumOfReducedComponents, results.lifePath)}
      </>
    );
  };

  const expressionCalculationDetails = () => {
    if (!name) return null;
    const nameArray = name.toUpperCase().replace(/[^A-Z]/g, '').split('');
    const sumOfLetterValues = nameArray.reduce((sum, letter) => sum + getLetterValue(letter), 0);
    return (
      <>
        <p className="mb-2">Your full name: {name}</p>
        <p className="mb-2">Each letter has a numerical value:</p>
        <p className="mb-3">
          {name.toUpperCase().split('').map((letter, index) => (
            <span key={index} className="inline-block mx-1 my-1 px-2 py-1 bg-white/40 rounded-md">
              {letter}: {/[A-Z]/i.test(letter) ? getLetterValue(letter) : '-'}
            </span>
          ))}
        </p>
        {renderSumExplanation("Sum of all letters", sumOfLetterValues, results.expression)}
      </>
    );
  };

  const soulUrgeCalculationDetails = () => {
    if (!name) return null;
    const vowels = ['A', 'E', 'I', 'O', 'U'];
    const nameArrayAlphaOnly = name.toUpperCase().replace(/[^A-Z]/g, '').split('');
    let sumOfVowelValues = 0;
    for (let i = 0; i < nameArrayAlphaOnly.length; i++) {
        const letter = nameArrayAlphaOnly[i];
        if (vowels.includes(letter)) {
            sumOfVowelValues += getLetterValue(letter);
        } else if (letter === 'Y') {
            const prevLetter = i > 0 ? nameArrayAlphaOnly[i-1] : null;
            if (!prevLetter || !vowels.includes(prevLetter)) {
                 sumOfVowelValues += getLetterValue('Y');
            }
        }
    }
    return (
      <>
        <p className="mb-2">Your full name: {name}</p>
        <p className="mb-2">Only vowels (A, E, I, O, U and Y under certain conditions) are used:</p>
        <p className="mb-3">
          {name.toUpperCase().split('').map((char, charIndex) => {
            const currentLetterUpper = char.toUpperCase();
            let isConsideredVowel = false;
            let letterValToShow = '-';
            if (/[A-Z]/i.test(currentLetterUpper)) {
                if (vowels.includes(currentLetterUpper)) {
                    isConsideredVowel = true;
                } else if (currentLetterUpper === 'Y') {
                    // Determine if this specific 'Y' instance acts as a vowel
                    // Find this 'Y's position in the alpha-only name string
                    let alphaOnlyName = name.toUpperCase().replace(/[^A-Z]/g, '');
                    let yPositionInAlphaString = -1;
                    let currentAlphaIndexCounter = 0;
                    for (let nameIdx = 0; nameIdx < name.length; nameIdx++) {
                        if (name[nameIdx].toUpperCase().match(/[A-Z]/)) {
                            if (nameIdx === charIndex) { // This is the 'Y' we are checking
                                yPositionInAlphaString = currentAlphaIndexCounter;
                                break;
                            }
                            currentAlphaIndexCounter++;
                        }
                    }

                    if (yPositionInAlphaString !== -1) {
                        const prevActualAlphaChar = yPositionInAlphaString > 0 ? alphaOnlyName[yPositionInAlphaString-1] : null;
                        if (!prevActualAlphaChar || !vowels.includes(prevActualAlphaChar)) {
                             isConsideredVowel = true;
                        }
                    }
                }
                if (isConsideredVowel) {
                    letterValToShow = getLetterValue(currentLetterUpper);
                }
            }
            return (
              <span 
                key={charIndex} 
                className={`inline-block mx-1 my-1 px-2 py-1 rounded-md ${isConsideredVowel ? 'bg-purple-200/60 font-medium' : 'bg-white/40 opacity-50'}`}
              >
                {char}: {letterValToShow}
              </span>
            );
          })}
        </p>
        {renderSumExplanation("Sum of vowels", sumOfVowelValues, results.soulUrge)}
      </>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Your Core Numerology Elements</h2>
        <p className="text-gray-600">Discover the primary elements that make up your numerology chart.</p>
      </div>
      
      <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 shadow-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Your Full Birth Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full birth name" className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
            <p className="text-sm text-gray-500 mt-1">Use the name given at birth, including middle names</p>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Your Birthdate</label>
            <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
          </div>
        </div>
        <div className="text-center">
          <button onClick={calculateNumbers} className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            Calculate Your Numbers
          </button>
        </div>
      </div>
      
      {results.lifePath !== null && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Life Path Card */}
          <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 shadow-lg relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 transform scale-95 group-hover:scale-100 transition-transform duration-300"></div>
            <div className="relative">
              <h3 className="text-xl font-bold mb-2 text-gray-800">Life Path Number</h3>
              <div className="text-5xl font-bold mb-4 text-center py-3">{formatNumber(results.lifePath)}</div>
              <p className="text-gray-600 mb-4">Your Life Path Number represents the journey you're meant to take in this lifetime. It's the most important number in your chart.</p>
              <button onClick={() => setShowInterpretation(showInterpretation === 'lifePath' ? null : 'lifePath')} className="text-cyan-600 hover:text-cyan-800 font-medium flex items-center justify-center w-full">
                {showInterpretation === 'lifePath' ? 'Hide Interpretation' : 'Show Interpretation'}
                <svg className={`ml-1 w-4 h-4 transform transition-transform ${showInterpretation === 'lifePath' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              {showInterpretation === 'lifePath' && (<div className="mt-4 p-4 bg-white/30 backdrop-blur-sm rounded-md text-gray-700">{interpretLifePath(results.lifePath)}</div>)}
            </div>
          </div>
          
          {/* Expression Card */}
          <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 shadow-lg relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 transform scale-95 group-hover:scale-100 transition-transform duration-300"></div>
            <div className="relative">
              <h3 className="text-xl font-bold mb-2 text-gray-800">Expression Number</h3>
              <div className="text-5xl font-bold mb-4 text-center py-3">{formatNumber(results.expression)}</div>
              <p className="text-gray-600 mb-4">Your Expression Number reveals your natural abilities and talents. It represents the qualities you express to the world.</p>
              <button onClick={() => setShowInterpretation(showInterpretation === 'expression' ? null : 'expression')} className="text-amber-600 hover:text-amber-800 font-medium flex items-center justify-center w-full">
                {showInterpretation === 'expression' ? 'Hide Interpretation' : 'Show Interpretation'}
                <svg className={`ml-1 w-4 h-4 transform transition-transform ${showInterpretation === 'expression' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              {showInterpretation === 'expression' && (<div className="mt-4 p-4 bg-white/30 backdrop-blur-sm rounded-md text-gray-700">{interpretExpression(results.expression)}</div>)}
            </div>
          </div>
          
          {/* Soul Urge Card */}
          <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 shadow-lg relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 transform scale-95 group-hover:scale-100 transition-transform duration-300"></div>
            <div className="relative">
              <h3 className="text-xl font-bold mb-2 text-gray-800">Soul Urge Number</h3>
              <div className="text-5xl font-bold mb-4 text-center py-3">{formatNumber(results.soulUrge)}</div>
              <p className="text-gray-600 mb-4">Your Soul Urge Number represents your inner desires, motivations, and what your heart truly longs for.</p>
              <button onClick={() => setShowInterpretation(showInterpretation === 'soulUrge' ? null : 'soulUrge')} className="text-purple-600 hover:text-purple-800 font-medium flex items-center justify-center w-full">
                {showInterpretation === 'soulUrge' ? 'Hide Interpretation' : 'Show Interpretation'}
                <svg className={`ml-1 w-4 h-4 transform transition-transform ${showInterpretation === 'soulUrge' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              {showInterpretation === 'soulUrge' && (<div className="mt-4 p-4 bg-white/30 backdrop-blur-sm rounded-md text-gray-700">{interpretSoulUrge(results.soulUrge)}</div>)}
            </div>
          </div>
          
          {/* Birthday Card */}
          <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 shadow-lg relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-teal-500/10 transform scale-95 group-hover:scale-100 transition-transform duration-300"></div>
            <div className="relative">
              <h3 className="text-xl font-bold mb-2 text-gray-800">Birthday Number</h3>
              <div className="text-5xl font-bold mb-4 text-center py-3">{formatNumber(results.birthday)}</div>
              <p className="text-gray-600 mb-4">Your Birthday Number represents a special gift or talent you possess, a sub-focus on your Life Path.</p>
              <button onClick={() => setShowInterpretation(showInterpretation === 'birthday' ? null : 'birthday')} className="text-green-600 hover:text-green-800 font-medium flex items-center justify-center w-full">
                {showInterpretation === 'birthday' ? 'Hide Interpretation' : 'Show Interpretation'}
                <svg className={`ml-1 w-4 h-4 transform transition-transform ${showInterpretation === 'birthday' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              {showInterpretation === 'birthday' && (<div className="mt-4 p-4 bg-white/30 backdrop-blur-sm rounded-md text-gray-700">{interpretBirthday(results.birthday)}</div>)}
            </div>
          </div>
        </div>
      )}

      {/* MODIFIERS SECTION START */}
      {results.lifePath !== null && (
        <div className="bg-white/20 backdrop-blur-md rounded-lg p-8 shadow-lg mt-10">
          <h3 className="text-2xl font-bold mb-6 text-center">Modifier Elements</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Karmic Debt Card */}
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 shadow-lg relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-pink-500/10 transform scale-95 group-hover:scale-100 transition-transform duration-300"></div>
              <div className="relative">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Karmic Debt</h3>
                <p className="text-gray-600 mb-4">Karmic Debts (e.g., 13/4, 14/5, 16/7, 19/1) represent lessons from past misapplications of energy.</p>
                <div className="mb-4">
                  <div className="font-medium">Your Karmic Debts:</div>
                  <div className="mt-2 text-lg">
                    {results.karmicDebts || "Calculating..."}
                  </div>
                </div>
                <button onClick={() => setShowInterpretation(showInterpretation === 'karmicDebt' ? null : 'karmicDebt')} className="text-red-600 hover:text-red-800 font-medium flex items-center justify-center w-full">
                  {showInterpretation === 'karmicDebt' ? 'Hide Interpretation' : 'Show Interpretation'}
                  <svg className={`ml-1 w-4 h-4 transform transition-transform ${showInterpretation === 'karmicDebt' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {showInterpretation === 'karmicDebt' && (
                  <div className="mt-4 p-4 bg-white/30 backdrop-blur-sm rounded-md text-gray-700">
                    <p className="mb-3">Karmic Debts represent obstacles you must overcome. They are lessons requiring additional work in this lifetime.</p>
                    <p className="mb-3"><strong>13:</strong> Past laziness or selfishness. Lesson: Hard work, discipline, order.</p>
                    <p className="mb-3"><strong>14:</strong> Past abuse of freedom (e.g., indulgence, irresponsibility). Lesson: Moderation, commitment, adaptability.</p>
                    <p className="mb-3"><strong>16:</strong> Past illicit affairs or ego issues destroying relationships. Lesson: Humility, rebuilding trust, genuine connections.</p>
                    <p><strong>19:</strong> Past misuse of power or self-centeredness. Lesson: Independence with consideration for others, avoiding manipulation.</p>
                    <p className="mt-2 text-xs">Note: Karmic debt numbers appear before final reduction (e.g., a sum of 13 leading to a 4).</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Challenge Card */}
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 shadow-lg relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 transform scale-95 group-hover:scale-100 transition-transform duration-300"></div>
              <div className="relative">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Challenge Number</h3>
                <p className="text-gray-600 mb-4">The Challenge represents a specific weakness or obstacle to overcome, particularly in early life.</p>
                <div className="mb-4">
                  <div className="font-medium">Your Challenge Number:</div>
                  <div className="mt-2 text-3xl font-bold text-center py-2">
                    {results.challenge !== null ? results.challenge : "-"}
                  </div>
                </div>
                <button onClick={() => setShowInterpretation(showInterpretation === 'challenge' ? null : 'challenge')} className="text-orange-600 hover:text-orange-800 font-medium flex items-center justify-center w-full">
                  {showInterpretation === 'challenge' ? 'Hide Interpretation' : 'Show Interpretation'}
                  <svg className={`ml-1 w-4 h-4 transform transition-transform ${showInterpretation === 'challenge' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {showInterpretation === 'challenge' && (<div className="mt-4 p-4 bg-white/30 backdrop-blur-sm rounded-md text-gray-700">{interpretChallenge(results.challenge)}</div>)}
              </div>
            </div>
            
            {/* Intensity Table Card */}
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 shadow-lg relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 transform scale-95 group-hover:scale-100 transition-transform duration-300"></div>
              <div className="relative">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Intensity Table & Prime Intensifier</h3>
                <p className="text-gray-600 mb-4">Shows frequent numbers in your name (strengths) and areas for development. Prime Intensifier is the most dominant trait.</p>
                <div className="mb-2">
                  <div className="font-medium">Intensity Points (count of each number in name):</div>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {results.intensityTable.map((count, index) => (
                      <div key={index} className="text-center p-2 bg-white/10 rounded">
                        <div className={`font-bold text-lg ${count > getAverageCount(index) ? 'text-green-700' : count < getAverageCount(index) && count === 0 ? 'text-red-700' : count < getAverageCount(index) ? 'text-yellow-700' : 'text-gray-700'}`}>
                          {index+1}: {count}
                        </div>
                        <div className="text-xs text-gray-500">
                          {count > getAverageCount(index) ? 'Strong' : count === 0 ? 'Missing' : count < getAverageCount(index) ? 'Weak' : 'Average'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                 <div className="mb-4">
                  <div className="font-medium">Prime Intensifier:</div>
                  <div className="mt-1 text-lg text-center font-semibold">
                    {results.primeIntensifier !== null ? results.primeIntensifier : "N/A"}
                  </div>
                </div>
                <button onClick={() => setShowInterpretation(showInterpretation === 'intensity' ? null : 'intensity')} className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center w-full">
                  {showInterpretation === 'intensity' ? 'Hide Interpretation' : 'Show Interpretation'}
                  <svg className={`ml-1 w-4 h-4 transform transition-transform ${showInterpretation === 'intensity' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {showInterpretation === 'intensity' && (
                  <div className="mt-4 p-4 bg-white/30 backdrop-blur-sm rounded-md text-gray-700">
                    <p className="mb-3">Your Intensity Table shows how frequently each number's energy appears in your name.</p>
                    <p className="mb-2"><strong>Strong (Above Average):</strong> Indicates special strengths or prominent characteristics.</p>
                    <p className="mb-2"><strong>Weak (Below Average but Present):</strong> May indicate areas needing conscious development.</p>
                    <p className="mb-2"><strong>Missing (Zero Count):</strong> Signify traits or lessons to learn through experience.</p>
                    <p><strong>Prime Intensifier:</strong> The number(s) appearing most frequently indicates a dominant trait or driving force. Special rules apply, e.g., for number 5.</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Maturity Number Card */}
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 shadow-lg relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-violet-500/10 transform scale-95 group-hover:scale-100 transition-transform duration-300"></div>
              <div className="relative">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Maturity Number</h3>
                <p className="text-gray-600 mb-4">Represents a goal or direction emerging around mid-life (35-45), describing your later years' focus.</p>
                <div className="mb-4">
                  <div className="font-medium">Your Maturity Number:</div>
                  <div className="mt-2 text-3xl font-bold text-center py-2">
                    {results.maturityNumber !== null ? formatNumber(results.maturityNumber) : "-"}
                  </div>
                </div>
                <button onClick={() => setShowInterpretation(showInterpretation === 'maturity' ? null : 'maturity')} className="text-purple-600 hover:text-purple-800 font-medium flex items-center justify-center w-full">
                  {showInterpretation === 'maturity' ? 'Hide Interpretation' : 'Show Interpretation'}
                  <svg className={`ml-1 w-4 h-4 transform transition-transform ${showInterpretation === 'maturity' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {showInterpretation === 'maturity' && (<div className="mt-4 p-4 bg-white/30 backdrop-blur-sm rounded-md text-gray-700">{interpretMaturityNumber(results.maturityNumber)}</div>)}
              </div>
            </div>

            {/* Growth Number Card */}
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 shadow-lg relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-teal-500/10 transform scale-95 group-hover:scale-100 transition-transform duration-300"></div>
              <div className="relative">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Growth Number</h3>
                <p className="text-gray-600 mb-4">Derived from your first name, this energy illuminates experiences and helps expand development.</p>
                <div className="mb-4">
                  <div className="font-medium">Your Growth Number:</div>
                  <div className="mt-2 text-3xl font-bold text-center py-2">
                    {results.growthNumber !== null ? formatNumber(results.growthNumber) : "-"}
                  </div>
                </div>
                <button className="text-green-600 hover:text-green-800 font-medium flex items-center justify-center w-full" onClick={() => setShowInterpretation(showInterpretation === 'growth' ? null : 'growth')}>
                  {showInterpretation === 'growth' ? 'Hide Interpretation' : 'Show Interpretation'}
                  <svg className={`ml-1 w-4 h-4 transform transition-transform ${showInterpretation === 'growth' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {showInterpretation === 'growth' && (<div className="mt-4 p-4 bg-white/30 backdrop-blur-sm rounded-md text-gray-700">{interpretGrowthNumber(results.growthNumber)}</div>)}
              </div>
            </div>

            {/* Secret Self Card */}
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 shadow-lg relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-rose-500/10 transform scale-95 group-hover:scale-100 transition-transform duration-300"></div>
              <div className="relative">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Secret Self</h3>
                <p className="text-gray-600 mb-4">Derived from consonants, this represents inner dreams/desires, often unrelated to daily life.</p>
                <div className="mb-4">
                  <div className="font-medium">Your Secret Self Number:</div>
                  <div className="mt-2 text-3xl font-bold text-center py-2">
                    {results.secretSelf !== null ? formatNumber(results.secretSelf) : "-"}
                  </div>
                </div>
                <button className="text-pink-600 hover:text-pink-800 font-medium flex items-center justify-center w-full" onClick={() => setShowInterpretation(showInterpretation === 'secretSelf' ? null : 'secretSelf')}>
                  {showInterpretation === 'secretSelf' ? 'Hide Interpretation' : 'Show Interpretation'}
                  <svg className={`ml-1 w-4 h-4 transform transition-transform ${showInterpretation === 'secretSelf' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {showInterpretation === 'secretSelf' && (<div className="mt-4 p-4 bg-white/30 backdrop-blur-sm rounded-md text-gray-700">{interpretSecretSelf(results.secretSelf)}</div>)}
              </div>
            </div>

            {/* Sub-Elements Card */}
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 shadow-lg relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 transform scale-95 group-hover:scale-100 transition-transform duration-300"></div>
              <div className="relative">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Sub-Elements</h3>
                <p className="text-gray-600 mb-4">Numbers "behind" core numbers, providing additional influences (reduced components of date/name parts).</p>
                <div className="mb-4">
                  <div className="font-medium">Life Path Sub-Elements (Month, Day, Year - all reduced):</div>
                  <div className="mt-2 text-lg">
                    {results.lifePathSubElements.length > 0 ? results.lifePathSubElements.map(n => formatNumber(n)).join(', ') : "N/A"}
                  </div>
                  <div className="font-medium mt-3">Expression Sub-Elements (Each Name Part - reduced):</div>
                  <div className="mt-2 text-lg">
                    {results.expressionSubElements.length > 0 ? results.expressionSubElements.map(n => formatNumber(n)).join(', ') : "N/A"}
                  </div>
                </div>
                <button className="text-yellow-600 hover:text-yellow-800 font-medium flex items-center justify-center w-full" onClick={() => setShowInterpretation(showInterpretation === 'subElements' ? null : 'subElements')}>
                  {showInterpretation === 'subElements' ? 'Hide Interpretation' : 'Show Interpretation'}
                  <svg className={`ml-1 w-4 h-4 transform transition-transform ${showInterpretation === 'subElements' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {showInterpretation === 'subElements' && (
                  <div className="mt-4 p-4 bg-white/30 backdrop-blur-sm rounded-md text-gray-700">
                    <p className="mb-3">If a sub-element matches a core element, it may indicate early challenges expressing that energy positively.</p>
                    <p className="mb-3">If two sub-elements are the same, balancing those energies early in life might be difficult.</p>
                    <p>Sub-elements add subtle nuances to your core numbers.</p>
                  </div>
                )}
              </div>
            </div>

            {/* First Letter & First Vowel Card */}
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 shadow-lg relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 transform scale-95 group-hover:scale-100 transition-transform duration-300"></div>
              <div className="relative">
                <h3 className="text-xl font-bold mb-2 text-gray-800">First Letter & First Vowel</h3>
                <p className="text-gray-600 mb-4">Describe your natural approach to experiences and reactions.</p>
                <div className="mb-4 grid grid-cols-2 gap-6">
                  <div>
                    <div className="font-medium">First Letter:</div>
                    <div className="mt-2 text-3xl font-bold text-center py-2">{results.firstLetter || "-"}</div>
                  </div>
                  <div>
                    <div className="font-medium">First Vowel:</div>
                    <div className="mt-2 text-3xl font-bold text-center py-2">{results.firstVowel || "-"}</div>
                  </div>
                </div>
                <button className="text-teal-600 hover:text-teal-800 font-medium flex items-center justify-center w-full" onClick={() => setShowInterpretation(showInterpretation === 'firstLetterVowel' ? null : 'firstLetterVowel')}>
                  {showInterpretation === 'firstLetterVowel' ? 'Hide Interpretation' : 'Show Interpretation'}
                  <svg className={`ml-1 w-4 h-4 transform transition-transform ${showInterpretation === 'firstLetterVowel' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {showInterpretation === 'firstLetterVowel' && (
                  <div className="mt-4 p-4 bg-white/30 backdrop-blur-sm rounded-md text-gray-700">
                    <div className="mb-4">
                      <h4 className="font-bold">First Letter: {results.firstLetter}</h4>
                      {interpretFirstLetter(results.firstLetter)}
                    </div>
                    <div>
                      <h4 className="font-bold">First Vowel: {results.firstVowel}</h4>
                      {interpretFirstVowel(results.firstVowel)}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Temperament Card */}
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 shadow-lg relative group overflow-hidden md:col-span-2"> {/* Spanning 2 columns for better layout */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 transform scale-95 group-hover:scale-100 transition-transform duration-300"></div>
              <div className="relative">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Temperament</h3>
                <p className="text-gray-600 mb-4">Describes your basic viewpoint based on physical, mental, emotional, and intuitive components from name letters.</p>
                <div className="mb-4">
                  <div className="mt-2">
                    {results.temperament && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="text-center p-2 bg-white/10 rounded">
                          <div className="font-medium">Physical</div>
                          <div className="text-2xl font-bold">{results.temperament.physical}</div>
                          <div className="text-sm text-gray-500">{getComponentStrength(results.temperament.physical, results.temperament)}</div>
                        </div>
                        <div className="text-center p-2 bg-white/10 rounded">
                          <div className="font-medium">Mental</div>
                          <div className="text-2xl font-bold">{results.temperament.mental}</div>
                           <div className="text-sm text-gray-500">{getComponentStrength(results.temperament.mental, results.temperament)}</div>
                        </div>
                        <div className="text-center p-2 bg-white/10 rounded">
                          <div className="font-medium">Emotional</div>
                          <div className="text-2xl font-bold">{results.temperament.emotional}</div>
                           <div className="text-sm text-gray-500">{getComponentStrength(results.temperament.emotional, results.temperament)}</div>
                        </div>
                        <div className="text-center p-2 bg-white/10 rounded">
                          <div className="font-medium">Intuitive</div>
                          <div className="text-2xl font-bold">{results.temperament.intuitive}</div>
                           <div className="text-sm text-gray-500">{getComponentStrength(results.temperament.intuitive, results.temperament)}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <button className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center justify-center w-full" onClick={() => setShowInterpretation(showInterpretation === 'temperament' ? null : 'temperament')}>
                  {showInterpretation === 'temperament' ? 'Hide Interpretation' : 'Show Interpretation'}
                  <svg className={`ml-1 w-4 h-4 transform transition-transform ${showInterpretation === 'temperament' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {showInterpretation === 'temperament' && (<div className="mt-4 p-4 bg-white/30 backdrop-blur-sm rounded-md text-gray-700">{interpretTemperament(results.temperament)}</div>)}
              </div>
            </div>

          </div>
        </div>
      )}
      {/* MODIFIERS SECTION END */}

      {/* --- IMPROVED JSX CARDS WITH DIRECT SECTION OPENING --- */}
{results.lifePath !== null && (
<>
{/* Core Synthesis Analysis Card - IMPROVED VERSION WITH DIRECT OPENING */}
<div className="bg-white/20 backdrop-blur-md rounded-lg p-6 shadow-lg relative group overflow-hidden mt-8">
  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-red-500/10 transform scale-95 group-hover:scale-100 transition-transform duration-300"></div>
  <div className="relative">
    <h3 className="text-xl font-bold mb-4 text-gray-800">Core Synthesis Analysis</h3>
    <p className="text-gray-600 mb-6">This analysis examines how your core elements interact with each other, showing harmony, effectiveness, and special patterns that shape your development.</p>
    
    {/* Summary grid with direct section opening */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Repeated Numbers Summary - Opens Repeated Numbers Section Directly */}
      <div 
        className="bg-white/40 rounded-lg p-4 cursor-pointer hover:shadow-md transition-all"
        onClick={() => {
          // Set this section to be expanded and scroll to it
          setExpandedSection('repeatedNumbers');
          // Find and scroll to the repeated numbers section
          const repeatedNumbersSection = document.getElementById('repeatedNumbers-section');
          if (repeatedNumbersSection) {
            repeatedNumbersSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium text-base">Repeated Numbers</h4>
          <div className={`text-xs font-semibold px-2 py-0.5 rounded-full ${checkRepeatedCoreNumbers(results).length > 0 ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}>
            {checkRepeatedCoreNumbers(results).length > 0 ? `${checkRepeatedCoreNumbers(results).length} Found` : "Balanced"}
          </div>
        </div>
        <p className="text-sm text-gray-600">
          {checkRepeatedCoreNumbers(results).length > 0 
            ? `Number ${checkRepeatedCoreNumbers(results)[0].number} repeats in ${checkRepeatedCoreNumbers(results)[0].elements.join(' and ')}`
            : "No repeated numbers in your core elements"}
        </p>
      </div>
      
      {/* Core Aspects Summary - Opens Core Aspects Section Directly */}
      <div 
        className="bg-white/40 rounded-lg p-4 cursor-pointer hover:shadow-md transition-all"
        onClick={() => {
          // Set this section to be expanded and scroll to it
          setExpandedSection('coreAspects');
          // Find and scroll to the core aspects section
          const coreAspectsSection = document.getElementById('coreAspects-section');
          if (coreAspectsSection) {
            coreAspectsSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium text-base">Core Aspects</h4>
          <div className="flex space-x-1">
            <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full bg-green-100 text-green-800">{analyzeAspects(results).filter(a => a.harmony === "Harmonious").length}</span>
            <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-800">{analyzeAspects(results).filter(a => a.harmony === "Discordant").length}</span>
            <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full bg-red-100 text-red-800">{analyzeAspects(results).filter(a => a.harmony === "Very Discordant").length}</span>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          {analyzeAspects(results).filter(a => a.harmony === "Harmonious").length > analyzeAspects(results).filter(a => a.harmony !== "Harmonious").length
            ? "Mostly harmonious interactions"
            : analyzeAspects(results).filter(a => a.harmony === "Very Discordant").length > 1
              ? "Significant conflicts need attention"
              : "Mixed interactions need integration"}
        </p>
      </div>
      
      {/* Core Effectiveness Summary - Opens Core Effectiveness Section Directly */}
      <div 
        className="bg-white/40 rounded-lg p-4 cursor-pointer hover:shadow-md transition-all"
        onClick={() => {
          // Set this section to be expanded and scroll to it
          setExpandedSection('coreEffectiveness');
          // Find and scroll to the core effectiveness section
          const effectivenessSection = document.getElementById('coreEffectiveness-section');
          if (effectivenessSection) {
            effectivenessSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium text-base">Effectiveness</h4>
          <div className="flex space-x-1">
            <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full bg-green-100 text-green-800">{calculateEffectiveness(results).filter(e => e.effectiveness === "Effective Balance").length}</span>
            <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-800">{calculateEffectiveness(results).filter(e => e.effectiveness.includes("outweigh") && !e.effectiveness.includes("Substantially")).length}</span>
            <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full bg-red-100 text-red-800">{calculateEffectiveness(results).filter(e => e.effectiveness.includes("Substantially")).length}</span>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          {calculateEffectiveness(results).filter(e => e.effectiveness === "Effective Balance").length === 3
            ? "All core elements are well-balanced"
            : calculateEffectiveness(results).filter(e => e.effectiveness.includes("Substantially")).length > 0
              ? "Some significant imbalances present"
              : "Mix of balanced and moderate imbalance"}
        </p>
      </div>
      
      {/* Relative Power Summary - Opens Relative Power Section Directly */}
      <div 
        className="bg-white/40 rounded-lg p-4 cursor-pointer hover:shadow-md transition-all"
        onClick={() => {
          // Set this section to be expanded and scroll to it
          setExpandedSection('relativePower');
          // Find and scroll to the relative power section
          const relativePowerSection = document.getElementById('relativePower-section');
          if (relativePowerSection) {
            relativePowerSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium text-base">Relative Power</h4>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">Hierarchy</span>
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs">LP ({results.lifePath})</span>
            <div className="w-16 h-1.5 bg-gray-200 rounded-full">
              <div className="bg-indigo-500 h-1.5 rounded-full w-[50%]"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs">Exp ({results.expression})</span>
            <div className="w-16 h-1.5 bg-gray-200 rounded-full">
              <div className="bg-purple-500 h-1.5 rounded-full w-[30%]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Collapsible sections with IDs for direct scrolling */}
    
    {/* Repeated Numbers - Collapsible with ID */}
    <div id="repeatedNumbers-section" className="mb-6 border border-gray-200/30 rounded-lg overflow-hidden">
      <button 
        onClick={() => setExpandedSection(expandedSection === 'repeatedNumbers' ? null : 'repeatedNumbers')}
        className="w-full flex justify-between items-center p-4 bg-amber-50/50 hover:bg-amber-100/50 transition-colors"
      >
        <h4 className="font-medium text-lg">Repeated Numbers</h4>
        <svg
          className={`w-5 h-5 text-amber-700 transform transition-transform ${expandedSection === 'repeatedNumbers' ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {expandedSection === 'repeatedNumbers' && (
        <div className="p-4">
          {results.lifePath && checkRepeatedCoreNumbers(results).length > 0 ? (
            checkRepeatedCoreNumbers(results).map((repeat, index) => (
              <div key={index} className="mb-4 p-4 bg-yellow-50/50 rounded-md">
                <p className="font-medium">Number {repeat.number} appears in: {repeat.elements.join(' and ')}</p>
                
                <div className="mt-3">
                  <p className="mb-2"><strong>What this means:</strong> When the same number appears in multiple core positions, it creates a strong emphasis on this energy in your life. This doubled energy can manifest in two ways:</p>
                  
                  <ol className="list-decimal pl-5 space-y-2 mb-3">
                    <li>You may <strong>overuse</strong> this energy, making it a dominant but potentially unbalanced force in your life, especially in your early years.</li>
                    <li>Alternatively, you might <strong>avoid</strong> this energy entirely, creating a void in an area that should be important to your development.</li>
                  </ol>
                  
                  <p className="mb-2"><strong>Your challenge:</strong> With repeated {repeat.number} energy, you need to find balance in how you express this number's qualities.</p>
                  
                  {repeat.number === 1 && (
                    <p>Repeated 1 energy means you must balance independence and leadership without becoming dominating or self-centered. Alternatively, you may need to overcome timidity and learn to stand up for yourself.</p>
                  )}
                  {repeat.number === 2 && (
                    <p>Repeated 2 energy means you must balance sensitivity and cooperation without becoming overly dependent or indecisive. Work on being diplomatic while maintaining your own identity.</p>
                  )}
                  {repeat.number === 3 && (
                    <p>Repeated 3 energy means you must balance self-expression and creativity without scattering your energies or becoming superficial. Learn to focus your creative talents productively.</p>
                  )}
                  {repeat.number === 4 && (
                    <p>Repeated 4 energy means you must balance order and practicality without becoming rigid or stubborn. Work on building stable foundations while remaining flexible.</p>
                  )}
                  {repeat.number === 5 && (
                    <p>Repeated 5 energy means you must balance freedom and versatility without becoming restless or overindulgent. Learn to use your adaptability constructively without constant change.</p>
                  )}
                  {repeat.number === 6 && (
                    <p>Repeated 6 energy means you must balance responsibility and nurturing without becoming a doormat or interfering in others' affairs. Learn to care for others while maintaining healthy boundaries.</p>
                  )}
                  {repeat.number === 7 && (
                    <p>Repeated 7 energy means you must balance analysis and spiritual awareness without becoming isolated or overly critical. Learn to use your analytical mind while staying connected to others.</p>
                  )}
                  {repeat.number === 8 && (
                    <p>Repeated 8 energy means you must balance material achievement and executive ability without becoming power-hungry or materialistic. Learn to use your organizational skills for greater good.</p>
                  )}
                  {repeat.number === 9 && (
                    <p>Repeated 9 energy means you must balance humanitarian impulses and universal love without becoming impractical or overly emotional. Learn to give without depleting yourself.</p>
                  )}
                  {(repeat.number === 11 || repeat.number === 22) && (
                    <p>Repeated Master Number energy creates intense pressure and potential. You must learn to handle the nervous tension while developing your higher abilities. This is particularly challenging but potentially very rewarding.</p>
                  )}
                  
                  <p className="mt-3"><strong>Growth path:</strong> The most balanced approach is to express the qualities of {Math.min(10, repeat.number + repeat.number) % 9 || 9}, which combines these energies in a more harmonious way.</p>
                  
                  <div className="mt-4 p-3 bg-yellow-100/50 rounded-md">
                    <p className="font-medium">Focus on developing these qualities:</p>
                    {repeat.number === 1 && <p>Express the 2 energy of cooperation, diplomacy, and sensitivity to balance your strong independence.</p>}
                    {repeat.number === 2 && <p>Express the 4 energy of practicality, system, and order to balance your strong sensitivity.</p>}
                    {repeat.number === 3 && <p>Express the 6 energy of responsibility, balance, and nurturing to focus your creative energies.</p>}
                    {repeat.number === 4 && <p>Express the 8 energy of material achievement and executive ability to expand your practical nature.</p>}
                    {repeat.number === 5 && <p>Express the 1 energy of focused independence and leadership to direct your versatile energies.</p>}
                    {repeat.number === 6 && <p>Express the 3 energy of joyful self-expression and creativity to lighten your sense of responsibility.</p>}
                    {repeat.number === 7 && <p>Express the 5 energy of adaptability and constructive freedom to balance your analytical nature.</p>}
                    {repeat.number === 8 && <p>Express the 7 energy of spiritual awareness and intuition to balance your material focus.</p>}
                    {repeat.number === 9 && <p>Express the 9 energy of completion and selflessness with boundaries to avoid emotional depletion.</p>}
                    {repeat.number === 11 && <p>Express the 4 energy of practical application to ground your intuitive insights.</p>}
                    {repeat.number === 22 && <p>Express the 8 energy of executive ability to manifest your master builder potential.</p>}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 bg-green-50/50 rounded-md">
              <p><strong>No repeated numbers detected in your core elements.</strong></p>
              <p className="mt-2">This indicates a well-balanced profile with diverse energies available to you. You have a variety of different strengths to draw upon, though you may need to work at integrating these different aspects of yourself.</p>
            </div>
          )}
        </div>
      )}
    </div>
    
    {/* Aspects Analysis - Collapsible with ID */}
    <div id="coreAspects-section" className="mb-6 border border-gray-200/30 rounded-lg overflow-hidden">
      <button 
        onClick={() => setExpandedSection(expandedSection === 'coreAspects' ? null : 'coreAspects')}
        className="w-full flex justify-between items-center p-4 bg-blue-50/50 hover:bg-blue-100/50 transition-colors"
      >
        <h4 className="font-medium text-lg">Core Aspects (Harmony or Discord)</h4>
        <svg
          className={`w-5 h-5 text-blue-700 transform transition-transform ${expandedSection === 'coreAspects' ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {expandedSection === 'coreAspects' && (
        <div className="p-4">
          <p className="mb-3">Aspects reveal how your core elements interact with each other, showing whether they work together harmoniously or create internal conflicts you need to resolve.</p>
          
          <div className="mb-4 p-3 bg-blue-100/50 rounded-md">
            <p className="font-medium">How aspects are determined:</p>
            <p className="mt-1">Aspects are based on the natural compatibility between different numbers. For example:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Harmonious combinations</strong> include: 1-3, 1-5, 2-6, 3-6, 4-8, 6-9, 7-9</li>
              <li><strong>Discordant combinations</strong> include: 1-2, 1-6, 2-5, 3-4, 5-6, 7-8</li>
              <li><strong>Very discordant combinations</strong> include: Same number repeated (1-1, 2-2, etc.)</li>
            </ul>
            <p className="mt-2">Master numbers (11, 22) add their own complex dynamics, as they can be expressed at both their higher level or their reduced level (11→2, 22→4).</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {results.lifePath && analyzeAspects(results).map((aspect, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-md ${aspect.harmony === "Harmonious" ? "bg-green-50/50" : 
                  aspect.harmony === "Discordant" ? "bg-orange-50/50" : "bg-red-50/50"}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium">{aspect.pair}</p>
                  <p className={`text-sm font-bold px-2 py-1 rounded-full ${aspect.harmony === "Harmonious" ? "bg-green-100 text-green-800" : 
                    aspect.harmony === "Discordant" ? "bg-orange-100 text-orange-800" : "bg-red-100 text-red-800"}`}>
                    {aspect.harmony}
                  </p>
                </div>
                
                <div className="mb-2 text-sm bg-white/40 px-3 py-2 rounded-md">
                  <p className="font-medium">Numbers in this aspect:</p>
                  {aspect.pair === "Life Path/Expression" && (
                    <p>{results.lifePath} and {results.expression} {aspect.harmony === "Harmonious" ? "work well together" : aspect.harmony === "Discordant" ? "have some tension" : "strongly conflict"}</p>
                  )}
                  {aspect.pair === "Life Path/Soul Urge" && (
                    <p>{results.lifePath} and {results.soulUrge} {aspect.harmony === "Harmonious" ? "work well together" : aspect.harmony === "Discordant" ? "have some tension" : "strongly conflict"}</p>
                  )}
                  {aspect.pair === "Expression/Soul Urge" && (
                    <p>{results.expression} and {results.soulUrge} {aspect.harmony === "Harmonious" ? "work well together" : aspect.harmony === "Discordant" ? "have some tension" : "strongly conflict"}</p>
                  )}
                  {aspect.pair === "Life Path/Birthday" && (
                    <p>{results.lifePath} and {results.birthday} {aspect.harmony === "Harmonious" ? "work well together" : aspect.harmony === "Discordant" ? "have some tension" : "strongly conflict"}</p>
                  )}
                </div>
                
                {/* Aspect explanations - unchanged */}
                {/* ... content preserved from original ... */}
                
                {/* Life Path/Expression explanations */}
                {aspect.pair === "Life Path/Expression" && (
                  <div>
                    <p className="mb-2"><strong>What this means:</strong> This aspect shows how well your natural abilities (Expression) align with your life opportunities and lessons (Life Path).</p>
                    
                    {aspect.harmony === "Harmonious" && (
                      <p>Your natural talents and abilities work well with your life direction. You'll likely find it easier to use your skills to accomplish your life purpose. This creates a sense of being "in the flow" where your actions feel natural and purposeful.</p>
                    )}
                    
                    {aspect.harmony === "Discordant" && (
                      <p>There may be some tension between your natural abilities and your life direction. You may need to adapt your skills or approach to better align with your life purpose. This isn't necessarily negative—it can create the friction needed for growth and development.</p>
                    )}
                    
                    {aspect.harmony === "Very Discordant" && (
                      <p>There's significant conflict between your natural abilities and your life direction. This creates a challenging dynamic where you may feel your talents aren't being used appropriately, or that you lack the skills needed for your path. This requires conscious effort to integrate these energies.</p>
                    )}
                  </div>
                )}
                
                {/* Life Path/Soul Urge explanations */}
                {aspect.pair === "Life Path/Soul Urge" && (
                  <div>
                    <p className="mb-2"><strong>What this means:</strong> This aspect shows how well your inner desires and motivations (Soul Urge) align with your life opportunities and lessons (Life Path).</p>
                    
                    {aspect.harmony === "Harmonious" && (
                      <p>What you want deep inside aligns well with your life direction. This creates a sense of fulfillment as your inner motivations naturally support your life path. You'll likely feel a sense of purpose and satisfaction in pursuing your goals.</p>
                    )}
                    
                    {aspect.harmony === "Discordant" && (
                      <p>There may be some tension between what you want and your life direction. You might sometimes feel pulled between your deep desires and what your life seems to demand of you. Working to integrate these different needs will be important for your satisfaction.</p>
                    )}
                    
                    {aspect.harmony === "Very Discordant" && (
                      <p>There's significant conflict between your inner desires and your life direction. You may often feel like you're having to choose between what you truly want and what you should be doing. Finding ways to honor both aspects will be a central challenge in your life.</p>
                    )}
                  </div>
                )}
                
                {/* Expression/Soul Urge explanations */}
                {aspect.pair === "Expression/Soul Urge" && (
                  <div>
                    <p className="mb-2"><strong>What this means:</strong> This aspect shows how well your natural abilities (Expression) align with your inner desires and motivations (Soul Urge).</p>
                    
                    {aspect.harmony === "Harmonious" && (
                      <p>Your natural talents and abilities work well with your inner desires. You're likely motivated to use your skills and find satisfaction in expressing your talents. This creates a natural flow between what you're good at and what you want.</p>
                    )}
                    
                    {aspect.harmony === "Discordant" && (
                      <p>There may be some tension between your natural abilities and what you truly desire. You might have talents that don't fully align with your deeper motivations, creating a need to either adapt your skills or find new ways to satisfy your inner needs.</p>
                    )}
                    
                    {aspect.harmony === "Very Discordant" && (
                      <p>There's significant conflict between your natural abilities and your inner desires. You may feel skilled in areas that don't bring you satisfaction, or desire things that don't match your natural talents. This disconnect requires conscious integration.</p>
                    )}
                  </div>
                )}
                
                {/* Life Path/Birthday explanations */}
                {aspect.pair === "Life Path/Birthday" && (
                  <div>
                    <p className="mb-2"><strong>What this means:</strong> This aspect shows how well your sub-focus or special gift (Birthday) supports your main life lesson (Life Path).</p>
                    
                    {aspect.harmony === "Harmonious" && (
                      <p>Your special gift or talent naturally supports your life direction. Your Birthday energy enhances your Life Path, giving you additional resources to accomplish your main life lessons. This creates a supportive foundation for your development.</p>
                    )}
                    
                    {aspect.harmony === "Discordant" && (
                      <p>There may be some tension between your special gift and your life direction. Your Birthday energy might sometimes work against your Life Path, creating situations where your sub-focus needs to be carefully integrated with your main life lessons.</p>
                    )}
                    
                    {aspect.harmony === "Very Discordant" && (
                      <p>There's significant conflict between your special gift and your life direction. Your Birthday energy may often seem to pull you away from your Life Path, requiring conscious effort to use this sub-focus constructively in service of your main life lessons.</p>
                    )}
                  </div>
                )}
                
                <div className="mt-4 p-3 bg-white/30 rounded-md">
                  <p className="font-medium">Power Focus:</p>
                  
                  {aspect.harmony === "Harmonious" && (
                    <p>Leverage this natural alignment as a foundation. When other areas feel challenging, return to this harmonious connection to regain your balance. Build on this strength by exploring how these energies can work together even more powerfully.</p>
                  )}
                  
                  {aspect.harmony === "Discordant" && (
                    <p>Look for the complementary qualities in these energies rather than seeing them as opposing forces. For example, if your {aspect.pair.split('/')[0]} is {aspect.pair === "Life Path/Expression" ? results.lifePath : aspect.pair === "Life Path/Soul Urge" ? results.lifePath : aspect.pair === "Expression/Soul Urge" ? results.expression : results.lifePath} and your {aspect.pair.split('/')[1]} is {aspect.pair === "Life Path/Expression" ? results.expression : aspect.pair === "Life Path/Soul Urge" ? results.soulUrge : aspect.pair === "Expression/Soul Urge" ? results.soulUrge : results.birthday}, focus on how the strengths of each can support the other.</p>
                  )}
                  
                  {aspect.harmony === "Very Discordant" && (
                    <p>This significant conflict requires conscious attention. Focus on developing bridging energies that can connect these disparate aspects. For repeated numbers, work on expressing the {Math.min(10, (aspect.pair === "Life Path/Expression" ? results.lifePath : aspect.pair === "Life Path/Soul Urge" ? results.lifePath : aspect.pair === "Expression/Soul Urge" ? results.expression : results.lifePath) + (aspect.pair === "Life Path/Expression" ? results.expression : aspect.pair === "Life Path/Soul Urge" ? results.soulUrge : aspect.pair === "Expression/Soul Urge" ? results.soulUrge : results.birthday)) % 9 || 9} energy, which can help integrate these elements.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    
    {/* Effectiveness Analysis - Collapsible with ID */}
    <div id="coreEffectiveness-section" className="mb-6 border border-gray-200/30 rounded-lg overflow-hidden">
      <button 
        onClick={() => setExpandedSection(expandedSection === 'coreEffectiveness' ? null : 'coreEffectiveness')}
        className="w-full flex justify-between items-center p-4 bg-purple-50/50 hover:bg-purple-100/50 transition-colors"
      >
        <h4 className="font-medium text-lg">Core Effectiveness (Balance of Energies)</h4>
        <svg
          className={`w-5 h-5 text-purple-700 transform transition-transform ${expandedSection === 'coreEffectiveness' ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {expandedSection === 'coreEffectiveness' && (
        <div className="p-4">
          <p className="mb-3">Effectiveness measures whether your opportunities, abilities, and motivations are in proper balance. This shows if you have the right tools for your journey or if adjustments are needed.</p>
          
          <div className="mb-4 p-3 bg-purple-100/50 rounded-md">
            <p className="font-medium">How effectiveness is determined:</p>
            <p className="mt-1">Effectiveness is calculated by finding the "spaces" or distance between numbers:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>1-2 spaces:</strong> Effective balance (optimal)</li>
              <li><strong>3-5 spaces:</strong> Moderate imbalance (workable but requires attention)</li>
              <li><strong>6+ spaces:</strong> Substantial imbalance (significant challenge)</li>
            </ul>
            <p className="mt-2">Master numbers (11, 22) add special considerations to these calculations. The more balanced your energies, the more effectively you can express your potential.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.lifePath && calculateEffectiveness(results).map((effect, index) => (
              <div key={index} className="p-4 bg-purple-50/50 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium">{effect.pair}</p>
                  <p className="text-sm font-bold px-2 py-1 rounded-full bg-purple-100 text-purple-800">
                    Space: {effect.spaces}
                  </p>
                </div>
                
                <div className="mb-2 text-sm bg-white/40 px-3 py-2 rounded-md">
                  <p className="font-medium">Numbers in this comparison:</p>
                  {effect.pair === "Life Path/Expression" && (
                    <p>Life Path {results.lifePath} is {results.lifePath > results.expression ? "higher than" : results.lifePath < results.expression ? "lower than" : "equal to"} Expression {results.expression} by {effect.spaces} {effect.spaces === 1 ? "space" : "spaces"}</p>
                  )}
                  {effect.pair === "Life Path/Soul Urge" && (
                    <p>Life Path {results.lifePath} is {results.lifePath > results.soulUrge ? "higher than" : results.lifePath < results.soulUrge ? "lower than" : "equal to"} Soul Urge {results.soulUrge} by {effect.spaces} {effect.spaces === 1 ? "space" : "spaces"}</p>
                  )}
                  {effect.pair === "Expression/Soul Urge" && (
                    <p>Expression {results.expression} is {results.expression > results.soulUrge ? "higher than" : results.expression < results.soulUrge ? "lower than" : "equal to"} Soul Urge {results.soulUrge} by {effect.spaces} {effect.spaces === 1 ? "space" : "spaces"}</p>
                  )}
                </div>
                
                <p className="font-medium text-purple-800 mb-2">{effect.effectiveness}</p>
                
                {/* Life Path/Expression effectiveness */}
                {effect.pair === "Life Path/Expression" && (
                  <div>
                    <p className="mb-2"><strong>What this means:</strong> This measures whether your natural abilities (Expression) are sufficient for the opportunities and challenges of your life path.</p>
                    
                    {effect.effectiveness === "Effective Balance" && (
                      <p>You have an excellent balance between your life opportunities and your natural abilities. You're likely to have the right skills at the right times to take advantage of the experiences that come your way. This creates a sense of capability and satisfaction.</p>
                    )}
                    
                    {effect.effectiveness === "Opportunities outweigh abilities/motivations" && (
                      <p>You may find that life presents more opportunities than your natural abilities can easily handle. You'll need to stretch yourself and develop your talents to meet the experiences that come your way. This can lead to growth but may sometimes feel overwhelming.</p>
                    )}
                    
                    {effect.effectiveness === "Abilities/motivations outweigh opportunities" && (
                      <p>You likely have more natural abilities than your life path readily accommodates. You may need to actively create opportunities to use all your talents or risk feeling unfulfilled. You might feel that your skills aren't being fully utilized in your current circumstances.</p>
                    )}
                    
                    {effect.effectiveness.includes("Substantially unbalanced") && (
                      <p>There's a significant imbalance between your life opportunities and natural abilities. This creates a challenging dynamic that requires conscious adjustment. You may either feel constantly overwhelmed by opportunities beyond your skills, or frustrated by limited chances to use your considerable talents.</p>
                    )}
                  </div>
                )}
                
                {/* Life Path/Soul Urge effectiveness */}
                {effect.pair === "Life Path/Soul Urge" && (
                  <div>
                    <p className="mb-2"><strong>What this means:</strong> This measures whether your inner motivations (Soul Urge) are aligned with the opportunities and challenges of your life path.</p>
                    
                    {effect.effectiveness === "Effective Balance" && (
                      <p>You have an excellent balance between your life opportunities and your inner motivations. You're likely well-motivated to recognize and take advantage of the opportunities that come your way. This creates a natural flow between what you want and what life offers.</p>
                    )}
                    
                    {effect.effectiveness === "Opportunities outweigh abilities/motivations" && (
                      <p>You may find that life presents more opportunities than you feel motivated to pursue. You might recognize possibilities but not always feel the inner drive to take advantage of them. This can create a sense that you're not fully engaging with your potential.</p>
                    )}
                    
                    {effect.effectiveness === "Abilities/motivations outweigh opportunities" && (
                      <p>You likely have stronger inner motivations than your life path readily accommodates. You may feel deeply driven toward goals that seem difficult to achieve in your circumstances. This can create a sense of striving against limitations.</p>
                    )}
                    
                    {effect.effectiveness.includes("Substantially unbalanced") && (
                      <p>There's a significant imbalance between your life opportunities and inner motivations. This creates a challenging dynamic where you may either feel bombarded by opportunities you have little interest in, or deeply frustrated by limited chances to pursue what truly matters to you.</p>
                    )}
                  </div>
                )}
                
                {/* Expression/Soul Urge effectiveness */}
                {effect.pair === "Expression/Soul Urge" && (
                  <div>
                    <p className="mb-2"><strong>What this means:</strong> This measures whether your natural abilities (Expression) align with your inner motivations (Soul Urge).</p>
                    
                    {effect.effectiveness === "Effective Balance" && (
                      <p>You have an excellent balance between your natural abilities and inner motivations. You're likely motivated to use your talents and have the skills to pursue what matters to you. This creates a satisfying alignment between what you can do and what you want to do.</p>
                    )}
                    
                    {effect.effectiveness === "Opportunities outweigh abilities/motivations" && (
                      <p>Your natural abilities may sometimes exceed your inner motivations. You might have talents that you don't feel particularly driven to use. This can create a situation where you're good at things you don't necessarily enjoy or value deeply.</p>
                    )}
                    
                    {effect.effectiveness === "Abilities/motivations outweigh opportunities" && (
                      <p>Your inner motivations may sometimes exceed your natural abilities. You might feel strongly driven toward goals that don't align with your innate talents. This can create a situation where you want things you find difficult to achieve with your current skills.</p>
                    )}
                    
                    {effect.effectiveness.includes("Substantially unbalanced") && (
                      <p>There's a significant imbalance between your natural abilities and inner motivations. This creates a challenging dynamic where you may either have considerable talents in areas you care little about, or strong desires in directions where your natural abilities don't readily support you.</p>
                    )}
                  </div>
                )}
                
                <div className="mt-4 p-3 bg-white/30 rounded-md">
                  <p className="font-medium">Power Focus:</p>
                  
                  {effect.effectiveness === "Effective Balance" && (
                    <p>Your primary focus should be on maintaining and leveraging this natural balance. When you encounter challenges, return to this area of strength where your energies are naturally aligned. Look for opportunities to apply this balanced area to other parts of your life.</p>
                  )}
                  
                  {effect.effectiveness === "Opportunities outweigh abilities/motivations" && (
                    <p>Focus on developing your {effect.pair.split('/')[1]} energies to better match your {effect.pair.split('/')[0]} opportunities. Invest time in building your skills (Expression) or clarifying your motivations (Soul Urge) so you can take full advantage of the opportunities life presents.</p>
                  )}
                  
                  {effect.effectiveness === "Abilities/motivations outweigh opportunities" && (
                    <p>Focus on creating or seeking out environments that better accommodate your {effect.pair.split('/')[1]} energies. Look for ways to shape your circumstances to make better use of your natural talents (Expression) or to pursue your deeper motivations (Soul Urge).</p>
                  )}
                  
                  {effect.effectiveness.includes("Substantially unbalanced") && (
                    <p>This significant imbalance requires your focused attention. If your {effect.pair.split('/')[0]} substantially outweighs your {effect.pair.split('/')[1]}, invest heavily in developing the skills or motivations you need. If your {effect.pair.split('/')[1]} substantially outweighs your {effect.pair.split('/')[0]}, consider major changes to your environment to better match your inner resources.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    
    {/* Relative Power Visual - Collapsible with ID */}
    <div id="relativePower-section" className="mb-6 border border-gray-200/30 rounded-lg overflow-hidden">
      <button 
        onClick={() => setExpandedSection(expandedSection === 'relativePower' ? null : 'relativePower')}
        className="w-full flex justify-between items-center p-4 bg-indigo-50/50 hover:bg-indigo-100/50 transition-colors"
      >
        <h4 className="font-medium text-lg">Relative Power of Core Elements</h4>
        <svg
          className={`w-5 h-5 text-indigo-700 transform transition-transform ${expandedSection === 'relativePower' ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {expandedSection === 'relativePower' && (
        <div className="p-4">
          <p className="mb-3">This shows the influence each element has on your overall numerology profile. The Life Path always has the strongest influence (50%), followed by Expression (30%), Soul Urge (20%), and Birthday (10%).</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="min-w-32">Life Path ({results.lifePath})</span>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-indigo-500 h-4 rounded-full" style={{width: '50%'}}></div>
                </div>
                <span className="ml-2 min-w-12 text-right">50%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="min-w-32">Expression ({results.expression})</span>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-purple-500 h-4 rounded-full" style={{width: '30%'}}></div>
                </div>
                <span className="ml-2 min-w-12 text-right">30%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="min-w-32">Soul Urge ({results.soulUrge})</span>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-blue-500 h-4 rounded-full" style={{width: '20%'}}></div>
                </div>
                <span className="ml-2 min-w-12 text-right">20%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="min-w-32">Birthday ({results.birthday})</span>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-teal-500 h-4 rounded-full" style={{width: '10%'}}></div>
                </div>
                <span className="ml-2 min-w-12 text-right">10%</span>
              </div>
            </div>
            
            <div className="p-3 bg-indigo-100/50 rounded-md">
              <p className="font-medium">What this means for you:</p>
              <p className="mt-1">When core elements have different energies, the more powerful elements will have a stronger influence on your life:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Your Life Path number ({results.lifePath}) exerts the strongest influence on your development</li>
                <li>Your Expression ({results.expression}) provides abilities to support your Life Path</li>
                <li>Your Soul Urge ({results.soulUrge}) adds motivation and inner desires</li>
                <li>Your Birthday ({results.birthday}) contributes a special talent or sub-focus</li>
              </ul>
              <p className="mt-2">Remember: When harmonizing conflicting energies, it's usually most effective to adapt the less powerful elements to align with the more powerful ones.</p>
            </div>
          </div>
        </div>
      )}
    </div>
    
    {/* Overall Synthesis Summary - Collapsible with ID */}
    <div id="synthesisSummary-section" className="mb-6 border border-gray-200/30 rounded-lg overflow-hidden">
      <button 
        onClick={() => setExpandedSection(expandedSection === 'synthesisSummary' ? null : 'synthesisSummary')}
        className="w-full flex justify-between items-center p-4 bg-green-50/50 hover:bg-green-100/50 transition-colors"
      >
        <h4 className="font-medium text-lg">Your Core Synthesis Summary & Power Focus</h4>
        <svg
          className={`w-5 h-5 text-green-700 transform transition-transform ${expandedSection === 'synthesisSummary' ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {expandedSection === 'synthesisSummary' && (
        <div className="p-4">
          <p className="mb-3">Based on your profile, here's how your core elements work together and what to focus on for optimal growth:</p>
          
          {results.lifePath && (
            <div>
              {/* Primary Focus from Life Path */}
              <div className="mb-4 p-4 bg-green-100/50 rounded-md">
                <h5 className="font-bold text-lg mb-2">Primary Focus (Life Path {results.lifePath})</h5>
                
                {results.lifePath === 1 && (
                  <p>Your primary focus should be on developing independence, individuality, and leadership. Work on standing on your own and expressing your originality while finding constructive ways to lead others.</p>
                )}
                {results.lifePath === 2 && (
                  <p>Your primary focus should be on developing cooperation, diplomacy, and sensitivity to others. Work on partnerships and creating harmony while maintaining your own identity.</p>
                )}
                {results.lifePath === 3 && (
                  <p>Your primary focus should be on creative self-expression and sharing the joy of living. Work on developing your creative talents, particularly with words, while maintaining focus and direction.</p>
                )}
                {results.lifePath === 4 && (
                  <p>Your primary focus should be on building stable foundations through system, order, and service. Work on organizational skills and practical applications while remaining flexible enough to adapt.</p>
                )}
                {results.lifePath === 5 && (
                  <p>Your primary focus should be on constructive use of freedom and versatility. Work on adaptation to change and exploring diverse experiences while avoiding scattered energies.</p>
                )}
                {results.lifePath === 6 && (
                  <p>Your primary focus should be on responsibility, balance, and nurturing others. Work on creating harmony and beauty while maintaining healthy boundaries in relationships.</p>
                )}
                {results.lifePath === 7 && (
                  <p>Your primary focus should be on analysis, understanding, and wisdom. Work on developing both your intellect and intuition while maintaining connections with others.</p>
                )}
                {results.lifePath === 8 && (
                  <p>Your primary focus should be on material satisfaction and executive ability. Work on organization and management skills while ensuring your material goals serve higher purposes.</p>
                )}
                {results.lifePath === 9 && (
                  <p>Your primary focus should be on selflessness and humanitarian service. Work on giving to others without depleting yourself, while maintaining clear boundaries.</p>
                )}
                {results.lifePath === 11 && (
                  <p>Your primary focus should be on spiritual illumination and inspiring others. Work on developing intuition and sharing your insights, while also developing the practical skills of the 2 energy.</p>
                )}
                {results.lifePath === 22 && (
                  <p>Your primary focus should be on manifesting grand visions that benefit humanity. Work on combining ideals with practical skills to build lasting structures, while also developing the organizational abilities of the 4 energy.</p>
                )}
              </div>
              
              {/* Special Considerations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Repeated Numbers */}
                {checkRepeatedCoreNumbers(results).length > 0 && (
                  <div className="p-3 bg-yellow-50/50 rounded-md">
                    <h5 className="font-medium mb-1">Special Focus: Repeated {checkRepeatedCoreNumbers(results)[0].number} Energy</h5>
                    <p>Your repeated {checkRepeatedCoreNumbers(results)[0].number} energy in {checkRepeatedCoreNumbers(results)[0].elements.join(' and ')} requires special attention. Focus on developing the balancing energy of {Math.min(10, checkRepeatedCoreNumbers(results)[0].number + checkRepeatedCoreNumbers(results)[0].number) % 9 || 9} to create harmony in this area.</p>
                  </div>
                )}
                
                {/* Discordant Aspects */}
                {analyzeAspects(results).filter(a => a.harmony === "Discordant" || a.harmony === "Very Discordant").length > 2 && (
                  <div className="p-3 bg-orange-50/50 rounded-md">
                    <h5 className="font-medium mb-1">Integration Focus: Discordant Aspects</h5>
                    <p>You have several discordant aspects that need integration. Focus on finding complementary qualities between your {analyzeAspects(results).filter(a => a.harmony === "Discordant" || a.harmony === "Very Discordant")[0].pair.split('/')[0]} and {analyzeAspects(results).filter(a => a.harmony === "Discordant" || a.harmony === "Very Discordant")[0].pair.split('/')[1]} energies.</p>
                  </div>
                )}
                
                {/* Effectiveness Imbalances */}
                {calculateEffectiveness(results).filter(e => e.effectiveness.includes("Substantially unbalanced")).length > 0 && (
                  <div className="p-3 bg-purple-50/50 rounded-md">
                    <h5 className="font-medium mb-1">Balance Focus: Effectiveness Imbalances</h5>
                    <p>You have substantial imbalances between your {calculateEffectiveness(results).filter(e => e.effectiveness.includes("Substantially unbalanced"))[0].pair.split('/')[0]} and {calculateEffectiveness(results).filter(e => e.effectiveness.includes("Substantially unbalanced"))[0].pair.split('/')[1]}. Focus on {calculateEffectiveness(results).filter(e => e.effectiveness.includes("Substantially unbalanced"))[0].pair.split('/')[0] === "Life Path" ? "developing your abilities" : "creating opportunities"} to bring these energies into better alignment.</p>
                  </div>
                )}
                
                {/* Harmonious Strength */}
                {analyzeAspects(results).filter(a => a.harmony === "Harmonious").length > 0 && (
                  <div className="p-3 bg-green-50/50 rounded-md">
                    <h5 className="font-medium mb-1">Leverage Strength: Harmonious Aspects</h5>
                    <p>Your {analyzeAspects(results).filter(a => a.harmony === "Harmonious")[0].pair} shows natural harmony. Use this alignment as a foundation when working with more challenging areas of your chart.</p>
                  </div>
                )}
              </div>
              
              <div className="mt-6 p-4 bg-white/40 rounded-md">
                <h5 className="font-bold text-lg mb-2">Personal Growth Path</h5>
                <p>Your most effective growth path involves balancing these energies:</p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li><strong>Central focus:</strong> Your Life Path {results.lifePath} energy forms the foundation of your development</li>
                  
                  <li><strong>Supporting abilities:</strong> Develop your Expression {results.expression} talents to support your main path</li>
                  
                  <li><strong>Inner motivation:</strong> Honor your Soul Urge {results.soulUrge} desires while aligning them with your primary direction</li>
                  
                  <li><strong>Special gift:</strong> Use your Birthday {results.birthday} talents as a specialized tool for your journey</li>
                  
                  {checkRepeatedCoreNumbers(results).length > 0 && (
                    <li><strong>Balance repeated energy:</strong> Work on the {Math.min(10, checkRepeatedCoreNumbers(results)[0].number + checkRepeatedCoreNumbers(results)[0].number) % 9 || 9} energy to counterbalance your repeated {checkRepeatedCoreNumbers(results)[0].number}</li>
                  )}
                </ul>
                
                <p className="mt-4 font-medium">Remember: These dynamics are not fixed destiny but patterns you can work with consciously. The awareness of these patterns gives you the power to integrate, balance, and direct your energies more effectively.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  </div>
</div>

{/* Directing Modifiers Explanation Card */}
<div className="bg-white/20 backdrop-blur-md rounded-lg p-6 shadow-lg relative group overflow-hidden mt-6">
  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-purple-500/10 transform scale-95 group-hover:scale-100 transition-transform duration-300"></div>
  <div className="relative">
    <h3 className="text-xl font-bold mb-2 text-gray-800">Directing Modifiers</h3>
    <p className="text-gray-600 mb-4">These special modifiers (First Letter, First Vowel, and Temperament) direct how your other energies are expressed.</p>

    <div className="p-4 bg-white/30 backdrop-blur-sm rounded-md text-gray-700">
      <p className="mb-3">While other modifiers add or subtract energy from your core, Directing Modifiers determine how you use the energy you have.</p>
      
      <p className="mb-3">Your approach to experience, based on your First Letter and First Vowel, can:</p>
      <ul className="list-disc pl-5 mb-3">
        <li><strong>Limit</strong> your development by restricting your energy expression</li>
        <li><strong>Stabilize</strong> your development by providing balance</li>
        <li><strong>Enhance</strong> your development by amplifying positive energies</li>
      </ul>
      
      <p className="mb-3">Your Temperament acts as a filter for your energies:</p>
      <ul className="list-disc pl-5">
        <li><strong>Strong components</strong> allow those energies to be fully expressed</li>
        <li><strong>Weak components</strong> block or minimize those energies</li>
        <li><strong>Average components</strong> permit moderate expression of those energies</li>
      </ul>
    </div>
  </div>
</div>
        </>
      )}
      {/* --- IMPROVED JSX CARDS END HERE --- */}


      {/* Calculation Explanations Section */}
      {results.lifePath !== null && (
        <div className="bg-white/20 backdrop-blur-md rounded-lg p-8 shadow-lg mt-10">
          <h3 className="text-2xl font-bold mb-6 text-center">How Your Numbers Were Calculated</h3>
          <div className="mb-8"><h4 className="font-bold text-lg mb-3">Life Path Calculation</h4><div className="bg-white/30 p-4 rounded-md">{lifePathCalculationDetails()}</div><p className="mt-3 text-sm text-gray-600">The Life Path is from your birth date (month + day + year), with each part and the final sum reduced to a single digit or master number (11, 22).</p></div>
          <div className="mb-8"><h4 className="font-bold text-lg mb-3">Expression Calculation</h4><div className="bg-white/30 p-4 rounded-md">{expressionCalculationDetails()}</div><p className="mt-3 text-sm text-gray-600">The Expression is from all letters in your full birth name, summed and reduced.</p></div>
          <div className="mb-8"><h4 className="font-bold text-lg mb-3">Soul Urge Calculation</h4><div className="bg-white/30 p-4 rounded-md">{soulUrgeCalculationDetails()}</div><p className="mt-3 text-sm text-gray-600">The Soul Urge is from the vowels (A,E,I,O,U and sometimes Y) in your name, summed and reduced.</p></div>
          <div className="mb-2"><h4 className="font-bold text-lg mb-3">Birthday Calculation</h4><div className="bg-white/30 p-4 rounded-md"><p className="mb-2">Your birthdate: {birthdate}</p>{birthdate && (() => {const rawDay = parseInt(birthdate.split('-')[2]); return renderSumExplanation("Day of birth", rawDay, results.birthday);})()}</div><p className="mt-3 text-sm text-gray-600">The Birthday number is the day of your birth, reduced.</p></div>
        </div>
      )}

      <div className="bg-white/20 backdrop-blur-md rounded-lg p-8 shadow-lg mt-10 mb-10">
        <h3 className="text-2xl font-bold mb-4 text-center">Understanding Your Core Numbers</h3>
        <p className="mb-4">Your core numbers create a picture of your character, potential, and life journey:</p>
        <div className="mb-4"><h4 className="font-bold text-lg mb-2">Life Path (Most significant)</h4><p>Central lesson, opportunities available.</p></div>
        <div className="mb-4"><h4 className="font-bold text-lg mb-2">Expression (Talents & potential)</h4><p>Natural abilities visible to others.</p></div>
        <div className="mb-4"><h4 className="font-bold text-lg mb-2">Soul Urge (Inner motivation)</h4><p>Inner desires, heart's longing.</p></div>
        <div className="mb-4"><h4 className="font-bold text-lg mb-2">Birthday (Specific talent/influence)</h4><p>Sub-lesson, special gift influencing your path.</p></div>
      </div>
    </div>
  );
};

export default CoreElementsCalculator;
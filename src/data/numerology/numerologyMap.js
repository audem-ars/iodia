// src/data/numerology/numerologyMap.js

export const letterValues = {
  'a': 1, 'j': 1, 's': 1,
  'b': 2, 'k': 2, 't': 2,
  'c': 3, 'l': 3, 'u': 3,
  'd': 4, 'm': 4, 'v': 4,
  'e': 5, 'n': 5, 'w': 5,
  'f': 6, 'o': 6, 'x': 6,
  'g': 7, 'p': 7, 'y': 7,
  'h': 8, 'q': 8, 'z': 8,
  'i': 9, 'r': 9
};

export const calculateValue = (word, reduced = false) => {
  let sum = word.toLowerCase().split('')
    .reduce((acc, letter) => acc + (letterValues[letter] || 0), 0);
  return reduced ? reduceToSingleDigit(sum) : sum;
};

export const reduceToSingleDigit = (num) => {
  while (num > 9) {
    num = String(num).split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  }
  return num;
};

export const findWordsByValue = (targetValue, wordList, reduced = false) => {
  const results = wordList.filter(word => {
    const wordValue = calculateValue(word, reduced);
    console.log(`${word}: ${wordValue} (target: ${targetValue})`); // Debug log
    return wordValue === targetValue;
  });
  console.log(`Found ${results.length} matches`); // Debug log
  return results.sort();
};
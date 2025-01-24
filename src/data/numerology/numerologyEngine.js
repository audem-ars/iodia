// src/data/numerology/numerologyEngine.js

export class NumerologyEngine {
  calculateValue(word) {
    const total = word.toLowerCase().split('')
      .reduce((sum, letter) => sum + (letterValues[letter] || 0), 0);
    return total;
  }

  verifyWord(word, targetValue) {
    const value = this.calculateValue(word);
    console.log(`${word}: ${value}`); // For debugging
    return value === targetValue;
  }

  findWordsByValue(targetValue, dictionary) {
    return dictionary.filter(word => this.verifyWord(word, targetValue));
  }
}

// Testing function
export const testWord = (word) => {
  const engine = new NumerologyEngine();
  const value = engine.calculateValue(word);
  const breakdown = word.split('').map(letter => `${letter}(${letterValues[letter] || 0})`).join(' + ');
  console.log(`${word}: ${breakdown} = ${value}`);
  return value;
};
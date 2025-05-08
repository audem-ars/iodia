// Format number display to show master numbers correctly
export const formatNumber = (num) => {
    if (num === null || num === undefined) return "";
    if (num === 11) return "11/2";
    if (num === 22) return "22/4";
    return num;
  };
  
  // Reduce a number to a single digit unless it's 11 or 22
  export const reduceToSingleDigit = (num) => {
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
  export const getLetterValue = (letter) => {
    const letterValues = {
      A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
      J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
      S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
    };
    return letterValues[letter.toUpperCase()] || 0;
  };
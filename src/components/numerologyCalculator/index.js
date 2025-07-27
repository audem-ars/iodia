import React, { useState, useEffect } from 'react';
import { calculateValue, reduceToSingleDigit, findWordsByValue } from '../../data/numerology/numerologyMap';
import WaterBackground from '../WaterBackground'; // Import the WaterBackground component
import { words as aWords } from '../../data/dictionary/a';
import { words as bWords } from '../../data/dictionary/b';
import { words as cWords } from '../../data/dictionary/c';
import { words as dWords } from '../../data/dictionary/d';
import { words as eWords } from '../../data/dictionary/e';
import { words as fWords } from '../../data/dictionary/f';
import { words as gWords } from '../../data/dictionary/g';
import { words as hWords } from '../../data/dictionary/h';
import { words as iWords } from '../../data/dictionary/i';
import { words as jWords } from '../../data/dictionary/j';
import { words as kWords } from '../../data/dictionary/k';
import { words as lWords } from '../../data/dictionary/l';
import { words as mWords } from '../../data/dictionary/m';
import { words as nWords } from '../../data/dictionary/n';
import { words as oWords } from '../../data/dictionary/o';
import { words as pWords } from '../../data/dictionary/p';
import { words as qWords } from '../../data/dictionary/q';
import { words as rWords } from '../../data/dictionary/r';
import { words as sWords } from '../../data/dictionary/s';
import { words as tWords } from '../../data/dictionary/t';
import { words as uWords } from '../../data/dictionary/u';
import { words as vWords } from '../../data/dictionary/v';
import { words as wWords } from '../../data/dictionary/w';
import { words as xWords } from '../../data/dictionary/x';
import { words as yWords } from '../../data/dictionary/y';
import { words as zWords } from '../../data/dictionary/z';

const allWords = [
 ...aWords, ...bWords, ...cWords, ...dWords, ...eWords,
 ...fWords, ...gWords, ...hWords, ...iWords, ...jWords,
 ...kWords, ...lWords, ...mWords, ...nWords, ...oWords,
 ...pWords, ...qWords, ...rWords, ...sWords, ...tWords,
 ...uWords, ...vWords, ...wWords, ...xWords, ...yWords, ...zWords
];

const NumerologyCalculator = () => {
  const [word, setWord] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [isReduced, setIsReduced] = useState(false);
  const [results, setResults] = useState(null);
  const [valueSearchResults, setValueSearchResults] = useState([]);

  // Auto-scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Capital letter values (A=27, B=28, ..., Z=52)
  const getCapitalLetterValue = (letter) => {
    if (letter >= 'A' && letter <= 'Z') {
      return letter.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
    }
    return 0;
  };

  // Case-sensitive calculation with both full and reduced capital values
  const calculateCaseSensitiveValue = (text) => {
    return text.split('').reduce((sum, char) => {
      if (char >= 'A' && char <= 'Z') {
        return sum + getCapitalLetterValue(char);
      } else if (char >= 'a' && char <= 'z') {
        return sum + calculateValue(char);
      }
      return sum; // spaces and other chars = 0
    }, 0);
  };

  // Case-sensitive calculation using REDUCED capital values
  const calculateCaseSensitiveReducedCapitals = (text) => {
    return text.split('').reduce((sum, char) => {
      if (char >= 'A' && char <= 'Z') {
        const fullValue = getCapitalLetterValue(char);
        return sum + getFinalValue(fullValue); // Use reduced value for capitals
      } else if (char >= 'a' && char <= 'z') {
        return sum + calculateValue(char);
      }
      return sum; // spaces and other chars = 0
    }, 0);
  };

  // Helper function to detect master/repeated numbers
  const isMasterOrRepeatedNumber = (num) => {
    const str = num.toString();
    // Check if all digits are the same (11, 22, 33, 44, 55, 66, 77, 88, 99, 111, etc.)
    return str.length > 1 && str.split('').every(digit => digit === str[0]);
  };

  // Function to get final value respecting master numbers
  const getFinalValue = (value) => {
    let current = value;
    
    while (current > 9) {
      // Calculate reduction
      const digits = current.toString().split('').map(Number);
      const sum = digits.reduce((acc, digit) => acc + digit, 0);
      current = sum;
      
      // If we hit a master number during reduction, stop there
      if (isMasterOrRepeatedNumber(current)) {
        return current;
      }
    }
    
    return current;
  };

  // Enhanced reduction function that shows master numbers
  const getReductionSteps = (value) => {
    const steps = [];
    let current = value;
    
    while (current > 9) {
      // Calculate next reduction step
      const digits = current.toString().split('').map(Number);
      const sum = digits.reduce((acc, digit) => acc + digit, 0);
      
      if (sum !== current) {
        current = sum;
        // Check if this new sum is a master number
        if (isMasterOrRepeatedNumber(current)) {
          steps.push({ value: current, isMaster: true, isFinal: true });
          return steps; // Stop here, don't reduce master numbers further
        }
      } else {
        break;
      }
    }
    
    steps.push({ value: current, isMaster: false, isFinal: true });
    return steps;
  };

  const calculateWord = () => {
    if (!word) return;
    
    // Split input into individual words
    const words = word.trim().split(/\s+/);
    const isMultipleWords = words.length > 1;
    
    // Calculate individual word values if multiple words
    let individualWordResults = [];
    if (isMultipleWords) {
      individualWordResults = words.map(singleWord => {
        // Case-sensitive calculation
        const caseSensitiveValue = calculateCaseSensitiveValue(singleWord);
        const caseSensitiveFinal = getFinalValue(caseSensitiveValue);
        const caseSensitiveSteps = getReductionSteps(caseSensitiveValue);
        
        // Traditional calculation
        const traditionalValue = calculateValue(singleWord, false);
        const traditionalFinal = getFinalValue(traditionalValue);
        const traditionalSteps = getReductionSteps(traditionalValue);
        
        return {
          word: singleWord,
          caseSensitive: {
            completeValue: caseSensitiveValue,
            reducedValue: caseSensitiveFinal,
            reductionSteps: caseSensitiveSteps
          },
          traditional: {
            completeValue: traditionalValue,
            reducedValue: traditionalFinal,
            reductionSteps: traditionalSteps
          }
        };
      });
    }
    
    // Calculate total values for both systems
    const caseSensitiveCompleteValue = calculateCaseSensitiveValue(word);
    const caseSensitiveReducedValue = getFinalValue(caseSensitiveCompleteValue);
    const caseSensitiveReductionSteps = getReductionSteps(caseSensitiveCompleteValue);
    
    // ALSO calculate case-sensitive with reduced capitals
    const caseSensitiveReducedCapitalsValue = calculateCaseSensitiveReducedCapitals(word);
    const caseSensitiveReducedCapitalsFinal = getFinalValue(caseSensitiveReducedCapitalsValue);
    const caseSensitiveReducedCapitalsSteps = getReductionSteps(caseSensitiveReducedCapitalsValue);
    
    const traditionalCompleteValue = calculateValue(word, false);
    const traditionalReducedValue = getFinalValue(traditionalCompleteValue);
    const traditionalReductionSteps = getReductionSteps(traditionalCompleteValue);
    
    // Calculate letter breakdowns for both systems
    const caseSensitiveLetterBreakdown = word.split('').map(letter => ({
      letter,
      value: letter >= 'A' && letter <= 'Z' ? getCapitalLetterValue(letter) : 
             letter >= 'a' && letter <= 'z' ? calculateValue(letter) : 0
    }));
    
    // ALSO calculate breakdown with reduced capitals
    const caseSensitiveReducedCapitalsBreakdown = word.split('').map(letter => ({
      letter,
      value: letter >= 'A' && letter <= 'Z' ? getFinalValue(getCapitalLetterValue(letter)) : 
             letter >= 'a' && letter <= 'z' ? calculateValue(letter) : 0
    }));
    
    const traditionalLetterBreakdown = word.toLowerCase().split('').map(letter => ({
      letter,
      value: calculateValue(letter)
    }));
    
    // Calculate reduced value sums for multiple words
    let caseSensitiveReducedSum = null;
    let caseSensitiveReducedSumSteps = [];
    let traditionalReducedSum = null;
    let traditionalReducedSumSteps = [];
    
    if (isMultipleWords && individualWordResults.length > 0) {
      caseSensitiveReducedSum = individualWordResults.reduce((sum, wordResult) => sum + wordResult.caseSensitive.reducedValue, 0);
      caseSensitiveReducedSumSteps = getReductionSteps(caseSensitiveReducedSum);
      
      traditionalReducedSum = individualWordResults.reduce((sum, wordResult) => sum + wordResult.traditional.reducedValue, 0);
      traditionalReducedSumSteps = getReductionSteps(traditionalReducedSum);
    }
    
    setResults({
      word,
      caseSensitive: {
        letterBreakdown: caseSensitiveLetterBreakdown,
        completeValue: caseSensitiveCompleteValue,
        reducedValue: caseSensitiveReducedValue,
        totalReductionSteps: caseSensitiveReductionSteps,
        reducedValueSum: caseSensitiveReducedSum,
        reducedValueSumSteps: caseSensitiveReducedSumSteps,
        // Add the reduced capitals version
        reducedCapitals: {
          letterBreakdown: caseSensitiveReducedCapitalsBreakdown,
          completeValue: caseSensitiveReducedCapitalsValue,
          reducedValue: caseSensitiveReducedCapitalsFinal,
          totalReductionSteps: caseSensitiveReducedCapitalsSteps
        }
      },
      traditional: {
        letterBreakdown: traditionalLetterBreakdown,
        completeValue: traditionalCompleteValue,
        reducedValue: traditionalReducedValue,
        totalReductionSteps: traditionalReductionSteps,
        reducedValueSum: traditionalReducedSum,
        reducedValueSumSteps: traditionalReducedSumSteps
      },
      isMultipleWords,
      individualWords: individualWordResults
    });
  };

  const searchByValue = () => {
    const value = parseInt(searchValue);
    if (isNaN(value)) return;
    const matchingWords = findWordsByValue(value, allWords, isReduced);
    setValueSearchResults(matchingWords);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-transparent">
      {/* Add the WaterBackground component */}
      <WaterBackground />
      
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Completely invisible scrollbar styles */
          .transparent-scrollbar::-webkit-scrollbar {
            width: 0px;
            background: transparent;
          }
          .transparent-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .transparent-scrollbar::-webkit-scrollbar-thumb {
            background: transparent;
          }
          /* Firefox - completely hide scrollbar */
          .transparent-scrollbar {
            scrollbar-width: none;
          }
          /* For older Firefox versions */
          .transparent-scrollbar {
            -ms-overflow-style: none;
          }
          
          /* Fire red glow animation */
          .fire-glow {
            color: #ff4500;
            text-shadow: 
              0 0 5px #ff4500,
              0 0 10px #ff4500,
              0 0 15px #ff2200,
              0 0 20px #ff1100;
            animation: fireFlicker 2s ease-in-out infinite alternate;
          }
          
          /* White glow for traditional system */
          .white-glow {
            color: #ffffff;
            text-shadow: 
              0 0 5px #ffffff,
              0 0 10px #e0e0e0,
              0 0 15px #c0c0c0,
              0 0 20px #a0a0a0;
            animation: whiteFlicker 2s ease-in-out infinite alternate;
          }
          
          /* Gold glow for capital letters */
          .gold-glow {
            color: #ffd700;
            text-shadow: 
              0 0 5px #ffd700,
              0 0 10px #ffaa00,
              0 0 15px #ff8800,
              0 0 20px #ff6600;
            animation: goldFlicker 2.5s ease-in-out infinite alternate;
          }
          
          @keyframes fireFlicker {
            0% {
              text-shadow: 
                0 0 5px #ff4500,
                0 0 10px #ff4500,
                0 0 15px #ff2200,
                0 0 20px #ff1100;
            }
            100% {
              text-shadow: 
                0 0 8px #ff6500,
                0 0 15px #ff4500,
                0 0 20px #ff3300,
                0 0 25px #ff2200,
                0 0 30px #ff1100;
            }
          }
          
          @keyframes whiteFlicker {
            0% {
              text-shadow: 
                0 0 5px #ffffff,
                0 0 10px #e0e0e0,
                0 0 15px #c0c0c0,
                0 0 20px #a0a0a0;
            }
            100% {
              text-shadow: 
                0 0 8px #ffffff,
                0 0 15px #f0f0f0,
                0 0 20px #e0e0e0,
                0 0 25px #d0d0d0,
                0 0 30px #c0c0c0;
            }
          }
          
          @keyframes goldFlicker {
            0% {
              text-shadow: 
                0 0 5px #ffd700,
                0 0 10px #ffaa00,
                0 0 15px #ff8800,
                0 0 20px #ff6600;
            }
            100% {
              text-shadow: 
                0 0 8px #ffd700,
                0 0 15px #ffcc00,
                0 0 20px #ffaa00,
                0 0 25px #ff8800,
                0 0 30px #ff6600;
            }
          }
        `
      }} />
      
      <div className="relative z-10 bg-transparent">
        <div className="w-full max-w-4xl mx-auto p-6">
          <div className="mb-8">
            <div className="flex gap-4 mb-4">
              <input
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="Enter a word or phrase..."
                className="flex-1 p-2 rounded border border-cyan-200 bg-white/20 backdrop-blur-sm"
              />
              <button
                onClick={calculateWord}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded"
              >
                Calculate
              </button>
            </div>

            {results && (
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                <h3 className="text-xl mb-4 text-white fire-glow">Results for: {results.word}</h3>
                
                {/* Individual Words Section - Only show if multiple words */}
                {results.isMultipleWords && results.individualWords && results.individualWords.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-lg mb-3 text-white fire-glow">Individual Word Values:</h4>
                    
                    {/* Case-Sensitive Results */}
                    <div className="mb-4">
                      <h5 className="font-semibold text-white mb-2 gold-glow">📝 Case-Sensitive (A=27, B=28...)</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                        {results.individualWords.map((wordResult, index) => (
                          <div key={index} className="bg-white/10 rounded-lg p-3">
                            <div className="text-center">
                              <div className="font-semibold text-white gold-glow mb-2">{wordResult.word}</div>
                              <div className="text-sm text-cyan-200">
                                <div>Complete: {wordResult.caseSensitive?.completeValue || 0}</div>
                                {wordResult.caseSensitive?.reductionSteps && wordResult.caseSensitive.reductionSteps.length > 1 && (
                                  <div className="mt-1 text-xs">
                                    Reduction: {wordResult.caseSensitive.reductionSteps.map((step, stepIndex) => (
                                      <span key={stepIndex}>
                                        {step.isMaster ? (
                                          <span className="text-yellow-300 font-bold">{step.value}</span>
                                        ) : (
                                          <span className={step.isFinal ? "text-green-300 font-bold" : ""}>{step.value}</span>
                                        )}
                                        {stepIndex < wordResult.caseSensitive.reductionSteps.length - 1 && " → "}
                                      </span>
                                    ))}
                                  </div>
                                )}
                                <div>Final: {wordResult.caseSensitive?.reducedValue || 0}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Mathematical breakdown for case-sensitive */}
                      <div className="bg-white/5 rounded-lg p-3 mb-4">
                        <div className="text-center text-white">
                          <div className="mb-2 font-semibold">Complete Values:</div>
                          <div className="text-cyan-200">
                            {results.individualWords.map(w => w.caseSensitive?.completeValue || 0).join(' + ')} = {results.caseSensitive?.completeValue || 0}
                          </div>
                          <div className="mt-3 font-semibold">Reduced Values:</div>
                          <div className="text-cyan-200">
                            {results.individualWords.map(w => w.caseSensitive?.reducedValue || 0).join(' + ')} = {results.caseSensitive?.reducedValueSum || 0}
                            {results.caseSensitive?.reducedValueSumSteps && results.caseSensitive.reducedValueSumSteps.length > 1 && (
                              <div className="mt-1 text-sm">
                                Reduction: {results.caseSensitive.reducedValueSumSteps.map((step, stepIndex) => (
                                  <span key={stepIndex}>
                                    {step.isMaster ? (
                                      <span className="text-yellow-300 font-bold bg-yellow-900/30 px-1 rounded">
                                        {step.value} ✨
                                      </span>
                                    ) : (
                                      <span className={step.isFinal ? "text-green-300 font-bold" : ""}>{step.value}</span>
                                    )}
                                    {stepIndex < results.caseSensitive.reducedValueSumSteps.length - 1 && " → "}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Traditional Results */}
                    <div className="mb-4">
                      <h5 className="font-semibold text-white mb-2 white-glow">📚 Traditional (A=1, B=2...)</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                        {results.individualWords.map((wordResult, index) => (
                          <div key={index} className="bg-white/10 rounded-lg p-3">
                            <div className="text-center">
                              <div className="font-semibold text-white white-glow mb-2">{wordResult.word}</div>
                              <div className="text-sm text-cyan-200">
                                <div>Complete: {wordResult.traditional?.completeValue || 0}</div>
                                {wordResult.traditional?.reductionSteps && wordResult.traditional.reductionSteps.length > 1 && (
                                  <div className="mt-1 text-xs">
                                    Reduction: {wordResult.traditional.reductionSteps.map((step, stepIndex) => (
                                      <span key={stepIndex}>
                                        {step.isMaster ? (
                                          <span className="text-yellow-300 font-bold">{step.value}</span>
                                        ) : (
                                          <span className={step.isFinal ? "text-green-300 font-bold" : ""}>{step.value}</span>
                                        )}
                                        {stepIndex < wordResult.traditional.reductionSteps.length - 1 && " → "}
                                      </span>
                                    ))}
                                  </div>
                                )}
                                <div>Final: {wordResult.traditional?.reducedValue || 0}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Mathematical breakdown for traditional */}
                      <div className="bg-white/5 rounded-lg p-3">
                        <div className="text-center text-white">
                          <div className="mb-2 font-semibold">Complete Values:</div>
                          <div className="text-cyan-200">
                            {results.individualWords.map(w => w.traditional?.completeValue || 0).join(' + ')} = {results.traditional?.completeValue || 0}
                          </div>
                          <div className="mt-3 font-semibold">Reduced Values:</div>
                          <div className="text-cyan-200">
                            {results.individualWords.map(w => w.traditional?.reducedValue || 0).join(' + ')} = {results.traditional?.reducedValueSum || 0}
                            {results.traditional?.reducedValueSumSteps && results.traditional.reducedValueSumSteps.length > 1 && (
                              <div className="mt-1 text-sm">
                                Reduction: {results.traditional.reducedValueSumSteps.map((step, stepIndex) => (
                                  <span key={stepIndex}>
                                    {step.isMaster ? (
                                      <span className="text-yellow-300 font-bold bg-yellow-900/30 px-1 rounded">
                                        {step.value} ✨
                                      </span>
                                    ) : (
                                      <span className={step.isFinal ? "text-green-300 font-bold" : ""}>{step.value}</span>
                                    )}
                                    {stepIndex < results.traditional.reducedValueSumSteps.length - 1 && " → "}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Original Results Section - Now shows both systems */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Case-Sensitive System */}
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-3 gold-glow text-center">
                      📝 Case-Sensitive System
                    </h4>
                    
                    {/* Full Capital Values */}
                    <div className="mb-4">
                      <h5 className="text-sm font-semibold text-white gold-glow mb-2">Full Capital Values:</h5>
                      <div className="mb-3 text-sm text-cyan-200">
                        <div className="mb-1">
                          <span className="font-semibold text-white gold-glow">Addition:</span>
                        </div>
                        <div className="break-all">
                          {results.caseSensitive?.letterBreakdown && results.caseSensitive.letterBreakdown.map(({ letter, value }, index) => (
                            <span key={index}>
                              {letter === ' ' ? '0' : value}
                              {index < results.caseSensitive.letterBreakdown.length - 1 && ' + '}
                            </span>
                          ))} = {results.caseSensitive?.completeValue || 0}
                        </div>
                      </div>
                      
                      <div className="max-h-32 overflow-y-auto transparent-scrollbar mb-3">
                        {results.caseSensitive?.letterBreakdown && results.caseSensitive.letterBreakdown.map(({ letter, value }, index) => (
                          <div key={index} className="flex justify-between text-white text-sm">
                            <span className={letter >= 'A' && letter <= 'Z' ? 'gold-glow' : ''}>
                              {letter === ' ' ? 'SPACE' : letter}
                              {letter >= 'A' && letter <= 'Z' ? ' (cap)' : ''}
                            </span>
                            <span className={letter >= 'A' && letter <= 'Z' ? 'gold-glow' : ''}>{letter === ' ' ? '0' : value}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mb-2">
                        <span className="font-semibold text-white">Complete Value:</span> 
                        <span className="text-cyan-200 ml-2">{results.caseSensitive?.completeValue || 0}</span>
                      </div>
                      
                      {results.caseSensitive?.totalReductionSteps && results.caseSensitive.totalReductionSteps.length > 1 && (
                        <div className="mb-3">
                          <span className="font-semibold text-white">Reduction Steps:</span>
                          <div className="text-sm text-cyan-200 mt-1">
                            {results.caseSensitive.totalReductionSteps.map((step, stepIndex) => (
                              <span key={stepIndex}>
                                {step.isMaster ? (
                                  <span className="text-yellow-300 font-bold bg-yellow-900/30 px-1 rounded">
                                    {step.value} ✨
                                  </span>
                                ) : (
                                  <span className={step.isFinal ? "text-green-300 font-bold" : ""}>{step.value}</span>
                                )}
                                {stepIndex < results.caseSensitive.totalReductionSteps.length - 1 && " → "}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="mb-4">
                        <span className="font-semibold text-white">Final Value:</span> 
                        <span className="text-cyan-200 ml-2">{results.caseSensitive?.reducedValue || 0}</span>
                      </div>
                    </div>

                    {/* Reduced Capital Values */}
                    <div className="border-t border-white/20 pt-4">
                      <h5 className="text-sm font-semibold text-white gold-glow mb-2">With Reduced Capitals:</h5>
                      <div className="mb-3 text-sm text-cyan-200">
                        <div className="mb-1">
                          <span className="font-semibold text-white gold-glow">Addition:</span>
                        </div>
                        <div className="break-all">
                          {results.caseSensitive?.reducedCapitals?.letterBreakdown && results.caseSensitive.reducedCapitals.letterBreakdown.map(({ letter, value }, index) => (
                            <span key={index}>
                              {letter === ' ' ? '0' : value}
                              {index < results.caseSensitive.reducedCapitals.letterBreakdown.length - 1 && ' + '}
                            </span>
                          ))} = {results.caseSensitive?.reducedCapitals?.completeValue || 0}
                        </div>
                      </div>
                      
                      <div className="max-h-32 overflow-y-auto transparent-scrollbar mb-3">
                        {results.caseSensitive?.reducedCapitals?.letterBreakdown && results.caseSensitive.reducedCapitals.letterBreakdown.map(({ letter, value }, index) => (
                          <div key={index} className="flex justify-between text-white text-sm">
                            <span className={letter >= 'A' && letter <= 'Z' ? 'gold-glow' : ''}>
                              {letter === ' ' ? 'SPACE' : letter}
                              {letter >= 'A' && letter <= 'Z' ? ' (reduced)' : ''}
                            </span>
                            <span className={letter >= 'A' && letter <= 'Z' ? 'gold-glow' : ''}>{letter === ' ' ? '0' : value}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mb-2">
                        <span className="font-semibold text-white">Complete Value:</span> 
                        <span className="text-cyan-200 ml-2">{results.caseSensitive?.reducedCapitals?.completeValue || 0}</span>
                      </div>
                      
                      {results.caseSensitive?.reducedCapitals?.totalReductionSteps && results.caseSensitive.reducedCapitals.totalReductionSteps.length > 1 && (
                        <div className="mb-3">
                          <span className="font-semibold text-white">Reduction Steps:</span>
                          <div className="text-sm text-cyan-200 mt-1">
                            {results.caseSensitive.reducedCapitals.totalReductionSteps.map((step, stepIndex) => (
                              <span key={stepIndex}>
                                {step.isMaster ? (
                                  <span className="text-yellow-300 font-bold bg-yellow-900/30 px-1 rounded">
                                    {step.value} ✨
                                  </span>
                                ) : (
                                  <span className={step.isFinal ? "text-green-300 font-bold" : ""}>{step.value}</span>
                                )}
                                {stepIndex < results.caseSensitive.reducedCapitals.totalReductionSteps.length - 1 && " → "}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div>
                        <span className="font-semibold text-white">Final Value:</span> 
                        <span className="text-cyan-200 ml-2">{results.caseSensitive?.reducedCapitals?.reducedValue || 0}</span>
                      </div>
                    </div>
                  </div>

                  {/* Traditional System */}
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-3 white-glow text-center">
                      📚 Traditional System
                    </h4>
                    
                    <div className="mb-3 text-sm text-cyan-200">
                      <div className="mb-1">
                        <span className="font-semibold text-white white-glow">Addition:</span>
                      </div>
                      <div className="break-all">
                        {results.traditional?.letterBreakdown && results.traditional.letterBreakdown.map(({ letter, value }, index) => (
                          <span key={index}>
                            {letter === ' ' ? '0' : value}
                            {index < results.traditional.letterBreakdown.length - 1 && ' + '}
                          </span>
                        ))} = {results.traditional?.completeValue || 0}
                      </div>
                    </div>
                    
                    <div className="max-h-40 overflow-y-auto transparent-scrollbar mb-3">
                      {results.traditional?.letterBreakdown && results.traditional.letterBreakdown.map(({ letter, value }, index) => (
                        <div key={index} className="flex justify-between text-white text-sm">
                          <span>{letter === ' ' ? 'SPACE' : letter.toUpperCase()}</span>
                          <span>{letter === ' ' ? '0' : value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mb-2">
                      <span className="font-semibold text-white">Complete Value:</span> 
                      <span className="text-cyan-200 ml-2">{results.traditional?.completeValue || 0}</span>
                    </div>
                    
                    {results.traditional?.totalReductionSteps && results.traditional.totalReductionSteps.length > 1 && (
                      <div className="mb-3">
                        <span className="font-semibold text-white">Reduction Steps:</span>
                        <div className="text-sm text-cyan-200 mt-1">
                          {results.traditional.totalReductionSteps.map((step, stepIndex) => (
                            <span key={stepIndex}>
                              {step.isMaster ? (
                                <span className="text-yellow-300 font-bold bg-yellow-900/30 px-1 rounded">
                                  {step.value} ✨
                                </span>
                              ) : (
                                <span className={step.isFinal ? "text-green-300 font-bold" : ""}>{step.value}</span>
                              )}
                              {stepIndex < results.traditional.totalReductionSteps.length - 1 && " → "}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <span className="font-semibold text-white">Final Value:</span> 
                      <span className="text-cyan-200 ml-2">{results.traditional?.reducedValue || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="flex gap-4 mb-4">
              <input
                type="number"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Enter number..."
                className="flex-1 p-2 rounded border border-cyan-200 bg-white/20 backdrop-blur-sm"
              />
              <label className="flex items-center gap-2 text-white">
                <input
                  type="checkbox"
                  checked={isReduced}
                  onChange={(e) => setIsReduced(e.target.checked)}
                  className="rounded"
                />
                Search reduced values (1-9)
              </label>
              <button
                onClick={searchByValue}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded"
              >
                Find Words
              </button>
            </div>

            {valueSearchResults.length > 0 && (
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                <h3 className="text-xl mb-2 text-white">
                  Words with {isReduced ? 'reduced' : 'complete'} value {searchValue}:
                </h3>
                <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto transparent-scrollbar">
                  {valueSearchResults.map((word, index) => (
                    <div key={index} className="p-2 bg-white/5 rounded text-white">
                      {word}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumerologyCalculator;
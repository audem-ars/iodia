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

  // Helper function to detect master/repeated numbers
  const isMasterOrRepeatedNumber = (num) => {
    const str = num.toString();
    // Check if all digits are the same (11, 22, 33, 44, 55, 66, 77, 88, 99, 111, etc.)
    return str.length > 1 && str.split('').every(digit => digit === str[0]);
  };

  // Function to get final value respecting master numbers
  const getFinalValue = (value) => {
    // Master numbers stay as master numbers, don't reduce
    if (isMasterOrRepeatedNumber(value)) {
      return value;
    }
    return reduceToSingleDigit(value);
  };

  // Enhanced reduction function that shows master numbers
  const getReductionSteps = (value) => {
    const steps = [];
    let current = value;
    
    while (current > 9) {
      if (isMasterOrRepeatedNumber(current)) {
        steps.push({ value: current, isMaster: true, isFinal: true });
        return steps; // Stop here, don't reduce master numbers further
      }
      
      // Calculate next reduction step
      const digits = current.toString().split('').map(Number);
      const sum = digits.reduce((acc, digit) => acc + digit, 0);
      
      if (sum !== current) {
        current = sum;
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
        const completeValue = calculateValue(singleWord, false);
        const finalValue = getFinalValue(completeValue);
        const reductionSteps = getReductionSteps(completeValue);
        return {
          word: singleWord,
          completeValue,
          reducedValue: finalValue,
          reductionSteps
        };
      });
    }
    
    // Calculate total values (existing functionality)
    const completeValue = calculateValue(word, false);
    const reducedValue = getFinalValue(completeValue);
    const totalReductionSteps = getReductionSteps(completeValue);
    
    // Calculate the sum of reduced values and its reduction steps for multiple words
    let reducedValueSum = null;
    let reducedValueSumSteps = [];
    if (isMultipleWords && individualWordResults.length > 0) {
      reducedValueSum = individualWordResults.reduce((sum, wordResult) => sum + wordResult.reducedValue, 0);
      reducedValueSumSteps = getReductionSteps(reducedValueSum);
    }
    
    setResults({
      word,
      letterBreakdown: word.toLowerCase().split('').map(letter => ({
        letter,
        value: calculateValue(letter)
      })),
      completeValue,
      reducedValue,
      totalReductionSteps,
      isMultipleWords,
      individualWords: individualWordResults,
      reducedValueSum,
      reducedValueSumSteps
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                      {results.individualWords.map((wordResult, index) => (
                        <div key={index} className="bg-white/10 rounded-lg p-3">
                          <div className="text-center">
                            <div className="font-semibold text-white fire-glow mb-2">{wordResult.word}</div>
                            <div className="text-sm text-cyan-200">
                              <div>Complete: {wordResult.completeValue}</div>
                              {/* Show reduction steps for individual words */}
                              {wordResult.reductionSteps && wordResult.reductionSteps.length > 1 && (
                                <div className="mt-1 text-xs">
                                  Reduction: {wordResult.reductionSteps.map((step, stepIndex) => (
                                    <span key={stepIndex}>
                                      {step.isMaster ? (
                                        <span className="text-yellow-300 font-bold">{step.value}</span>
                                      ) : (
                                        <span className={step.isFinal ? "text-green-300 font-bold" : ""}>{step.value}</span>
                                      )}
                                      {stepIndex < wordResult.reductionSteps.length - 1 && " → "}
                                    </span>
                                  ))}
                                </div>
                              )}
                              <div>Final: {wordResult.reducedValue}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Mathematical breakdown for multiple words */}
                    <div className="bg-white/5 rounded-lg p-3 mb-4">
                      <div className="text-center text-white">
                        <div className="mb-2 font-semibold">Complete Values:</div>
                        <div className="text-cyan-200">
                          {results.individualWords.map(w => w.completeValue).join(' + ')} = {results.completeValue}
                        </div>
                        <div className="mt-3 font-semibold">Reduced Values:</div>
                        <div className="text-cyan-200">
                          {results.individualWords.map(w => w.reducedValue).join(' + ')} = {results.reducedValueSum}
                          {results.reducedValueSumSteps && results.reducedValueSumSteps.length > 1 && (
                            <div className="mt-1 text-sm">
                              Reduction: {results.reducedValueSumSteps.map((step, stepIndex) => (
                                <span key={stepIndex}>
                                  {step.isMaster ? (
                                    <span className="text-yellow-300 font-bold bg-yellow-900/30 px-1 rounded">
                                      {step.value} ✨
                                    </span>
                                  ) : (
                                    <span className={step.isFinal ? "text-green-300 font-bold" : ""}>{step.value}</span>
                                  )}
                                  {stepIndex < results.reducedValueSumSteps.length - 1 && " → "}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Original Results Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2 fire-glow">
                      {results.isMultipleWords ? 'Combined Letter Breakdown:' : 'Letter Breakdown:'}
                    </h4>
                    
                    {/* Show mathematical addition */}
                    <div className="mb-3 text-sm text-cyan-200">
                      <div className="mb-1">
                        <span className="font-semibold text-white fire-glow">Addition:</span>
                      </div>
                      <div className="break-all">
                        {results.letterBreakdown && results.letterBreakdown.map(({ letter, value }, index) => (
                          <span key={index}>
                            {letter === ' ' ? '0' : value}
                            {index < results.letterBreakdown.length - 1 && ' + '}
                          </span>
                        ))} = {results.completeValue}
                      </div>
                    </div>
                    
                    <div className="max-h-40 overflow-y-auto transparent-scrollbar">
                      {results.letterBreakdown && results.letterBreakdown.map(({ letter, value }, index) => (
                        <div key={index} className="flex justify-between text-white">
                          <span>{letter === ' ' ? 'SPACE' : letter.toUpperCase()}</span>
                          <span>{letter === ' ' ? '0' : value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="mb-2">
                      <span className="font-semibold text-white">
                        {results.isMultipleWords ? 'Total Complete Value:' : 'Complete Value:'}
                      </span> 
                      <span className="text-cyan-200 ml-2">{results.completeValue}</span>
                    </div>
                    
                    {/* Show reduction steps for total */}
                    {results.totalReductionSteps && results.totalReductionSteps.length > 1 && (
                      <div className="mb-3">
                        <span className="font-semibold text-white">Reduction Steps:</span>
                        <div className="text-sm text-cyan-200 mt-1">
                          {results.totalReductionSteps.map((step, stepIndex) => (
                            <span key={stepIndex}>
                              {step.isMaster ? (
                                <span className="text-yellow-300 font-bold bg-yellow-900/30 px-1 rounded">
                                  {step.value} ✨
                                </span>
                              ) : (
                                <span className={step.isFinal ? "text-green-300 font-bold" : ""}>{step.value}</span>
                              )}
                              {stepIndex < results.totalReductionSteps.length - 1 && " → "}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <span className="font-semibold text-white">
                        {results.isMultipleWords ? 'Total Reduced Value:' : 'Reduced Value:'}
                      </span> 
                      <span className="text-cyan-200 ml-2">{results.reducedValue}</span>
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
import React, { useState } from 'react';
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

  const calculateWord = () => {
    if (!word) return;
    const completeValue = calculateValue(word, false);
    const reducedValue = reduceToSingleDigit(completeValue);
    
    setResults({
      word,
      letterBreakdown: word.toLowerCase().split('').map(letter => ({
        letter,
        value: calculateValue(letter)
      })),
      completeValue,
      reducedValue
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
      
      <div className="relative z-10 bg-transparent">
        <div className="w-full max-w-4xl mx-auto p-6">
          <div className="mb-8">
            <div className="flex gap-4 mb-4">
              <input
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="Enter a word..."
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
                <h3 className="text-xl mb-2">Results for: {results.word}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold">Letter Breakdown:</h4>
                    {results.letterBreakdown.map(({ letter, value }, index) => (
                      <div key={index} className="flex justify-between">
                        <span>{letter.toUpperCase()}</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="mb-2">
                      <span className="font-semibold">Complete Value:</span> {results.completeValue}
                    </div>
                    <div>
                      <span className="font-semibold">Reduced Value:</span> {results.reducedValue}
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
                <div className="grid grid-cols-3 gap-2">
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
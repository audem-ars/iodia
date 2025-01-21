import React, { useState } from 'react';
import { Search } from 'lucide-react';

const StateSelector = () => {
  const [search, setSearch] = useState('');
  const [selectedZodiac, setSelectedZodiac] = useState('');

  // Zodiac calculation helper
  const getZodiacSign = (year) => {
    const zodiacSigns = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 
                        'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
    return zodiacSigns[(year - 4) % 12];
  };

  // US States admission dates
  const stateData = {
    'delaware': { year: 1787, note: 'First state to ratify the Constitution' },
    'pennsylvania': { year: 1787, note: 'Second state to ratify the Constitution' },
    'new jersey': { year: 1787, note: 'Third state to ratify the Constitution' },
    'georgia': { year: 1788, note: 'Fourth state to ratify the Constitution' },
    'connecticut': { year: 1788, note: 'Fifth state to ratify the Constitution' },
    'massachusetts': { year: 1788, note: 'Sixth state to ratify the Constitution' },
    'maryland': { year: 1788, note: 'Seventh state to ratify the Constitution' },
    'south carolina': { year: 1788, note: 'Eighth state to ratify the Constitution' },
    'new hampshire': { year: 1788, note: 'Ninth state to ratify the Constitution' },
    'virginia': { year: 1788, note: 'Tenth state to ratify the Constitution' },
    'new york': { year: 1788, note: 'Eleventh state to ratify the Constitution' },
    'north carolina': { year: 1789, note: 'Twelfth state to ratify the Constitution' },
    'rhode island': { year: 1790, note: 'Last of the original 13 states to ratify' },
    'vermont': { year: 1791, note: 'First state admitted after the original 13' },
    'kentucky': { year: 1792, note: 'First western state' },
    'tennessee': { year: 1796, note: 'First state carved from a territory' },
    'ohio': { year: 1803, note: 'First state from the Northwest Territory' },
    'louisiana': { year: 1812, note: 'First state from the Louisiana Purchase' },
    'indiana': { year: 1816, note: 'Second state from Northwest Territory' },
    'mississippi': { year: 1817, note: 'From Mississippi Territory' },
    'illinois': { year: 1818, note: 'Third state from Northwest Territory' },
    'alabama': { year: 1819, note: 'From Alabama Territory' },
    'maine': { year: 1820, note: 'Part of Massachusetts until 1820' },
    'missouri': { year: 1821, note: 'Part of the Missouri Compromise' },
    'arkansas': { year: 1836, note: 'From Arkansas Territory' },
    'michigan': { year: 1837, note: 'Fourth state from Northwest Territory' },
    'florida': { year: 1845, note: 'From Spanish territory' },
    'texas': { year: 1845, note: 'Previously an independent republic' },
    'iowa': { year: 1846, note: 'From Iowa Territory' },
    'wisconsin': { year: 1848, note: 'Last state from Northwest Territory' },
    'california': { year: 1850, note: 'Part of Mexican Cession' },
    'minnesota': { year: 1858, note: 'From Minnesota Territory' },
    'oregon': { year: 1859, note: 'From Oregon Territory' },
    'kansas': { year: 1861, note: 'From Kansas Territory' },
    'west virginia': { year: 1863, note: 'Separated from Virginia during Civil War' },
    'nevada': { year: 1864, note: 'During the Civil War' },
    'nebraska': { year: 1867, note: 'After the Civil War' },
    'colorado': { year: 1876, note: 'The Centennial State' },
    'north dakota': { year: 1889, note: 'Split from Dakota Territory' },
    'south dakota': { year: 1889, note: 'Split from Dakota Territory' },
    'montana': { year: 1889, note: 'From Montana Territory' },
    'washington': { year: 1889, note: 'From Washington Territory' },
    'idaho': { year: 1890, note: 'From Idaho Territory' },
    'wyoming': { year: 1890, note: 'From Wyoming Territory' },
    'utah': { year: 1896, note: 'From Utah Territory' },
    'oklahoma': { year: 1907, note: 'Combined Indian and Oklahoma Territories' },
    'new mexico': { year: 1912, note: 'From New Mexico Territory' },
    'arizona': { year: 1912, note: 'Last of continental states admitted' },
    'alaska': { year: 1959, note: 'First non-continental state' },
    'hawaii': { year: 1959, note: 'Most recent state admitted' }
  };

  // Get zodiac sign for each state
  const stateZodiacs = Object.entries(stateData).reduce((acc, [state, data]) => {
    const sign = getZodiacSign(Math.abs(data.year));
    if (!acc[sign]) acc[sign] = [];
    acc[sign].push(state);
    return acc;
  }, {});

  // All zodiac signs for the filter
  const zodiacSigns = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 
                      'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];

  // Filter states based on search and selected zodiac
  const getFilteredStates = () => {
    let filtered = Object.keys(stateData);
    
    if (search) {
      filtered = filtered.filter(state => 
        state.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (selectedZodiac) {
      filtered = stateZodiacs[selectedZodiac] || [];
    }
    
    return filtered;
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">
          us state zodiac finder
        </h2>
        
        {/* Zodiac Filter */}
        <div className="mb-4">
          <select
            value={selectedZodiac}
            onChange={(e) => setSelectedZodiac(e.target.value)}
            className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a zodiac sign...</option>
            {zodiacSigns.map(sign => (
              <option key={sign} value={sign}>{sign}</option>
            ))}
          </select>
        </div>

        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for a state..."
            className="w-full p-2 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>

        {/* Results Display */}
        <div className="mt-4">
          {getFilteredStates().map((state) => (
            <div key={state} className="p-2 border-b">
              <span className="capitalize">{state}</span>
              <span className="float-right text-gray-600">
                {getZodiacSign(stateData[state].year)}
                {' '}
                ({stateData[state].year})
                <span className="text-xs ml-2 text-gray-400">
                  {stateData[state].note}
                </span>
              </span>
            </div>
          ))}
        </div>

        {/* Selected Zodiac Info */}
        {selectedZodiac && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">
              {selectedZodiac} States: {(stateZodiacs[selectedZodiac] || []).length}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default StateSelector;
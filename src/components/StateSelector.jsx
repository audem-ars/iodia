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
    'delaware': { year: 1787, note: 'First' },
    'pennsylvania': { year: 1787, note: 'Second' },
    'new jersey': { year: 1787, note: 'Third' },
    'georgia': { year: 1788, note: 'Fourth' },
    'connecticut': { year: 1788, note: 'Fifth' },
    'massachusetts': { year: 1788, note: 'Sixth' },
    'maryland': { year: 1788, note: 'Seventh' },
    'south carolina': { year: 1788, note: 'Eighth' },
    'new hampshire': { year: 1788, note: 'Ninth' },
    'virginia': { year: 1788, note: 'Tenth' },
    'new york': { year: 1788, note: 'Eleventh' },
    'north carolina': { year: 1789, note: 'Twelfth' },
    'rhode island': { year: 1790, note: 'Thirteenth' }, // 13th State
    'vermont': { year: 1791, note: 'Fourteenth' }, // 14th State
    'kentucky': { year: 1792, note: 'Fifteenth' }, // 15th State
    'tennessee': { year: 1796, note: 'Sixteenth' }, // 16th State
    'ohio': { year: 1803, note: 'Seventeenth' }, // 17th State
    'louisiana': { year: 1812, note: 'Eighteenth' }, // 18th State
    'indiana': { year: 1816, note: 'Nineteenth' }, // 19th State
    'mississippi': { year: 1817, note: 'Twentieth' }, // 20th State
    'illinois': { year: 1818, note: 'Twenty-first' }, // 21st State
    'alabama': { year: 1819, note: 'Twenty-second' }, // 22nd State
    'maine': { year: 1820, note: 'Twenty-third' }, // 23rd State
    'missouri': { year: 1821, note: 'Twenty-fourth' }, // 24th State
    'arkansas': { year: 1836, note: 'Twenty-fifth' }, // 25th State
    'michigan': { year: 1837, note: 'Twenty-sixth' }, // 26th State
    'florida': { year: 1845, note: 'Twenty-seventh' }, // 27th State
    'texas': { year: 1845, note: 'Twenty-eighth' }, // 28th State
    'iowa': { year: 1846, note: 'Twenty-ninth' }, // 29th State
    'wisconsin': { year: 1848, note: 'Thirtieth' }, // 30th State
    'california': { year: 1850, note: 'Thirty-first' }, // 31st State
    'minnesota': { year: 1858, note: 'Thirty-second' }, // 32nd State
    'oregon': { year: 1859, note: 'Thirty-third' }, // 33rd State
    'kansas': { year: 1861, note: 'Thirty-fourth' }, // 34th State
    'west virginia': { year: 1863, note: 'Thirty-fifth' }, // 35th State
    'nevada': { year: 1864, note: 'Thirty-sixth' }, // 36th State
    'nebraska': { year: 1867, note: 'Thirty-seventh' }, // 37th State
    'colorado': { year: 1876, note: 'Thirty-eighth' }, // 38th State
    'north dakota': { year: 1889, note: 'Thirty-ninth' }, // 39th State
    'south dakota': { year: 1889, note: 'Fortieth' }, // 40th State
    'montana': { year: 1889, note: 'Forty-first' }, // 41st State
    'washington': { year: 1889, note: 'Forty-second' }, // 42nd State
    'idaho': { year: 1890, note: 'Forty-third' }, // 43rd State
    'wyoming': { year: 1890, note: 'Forty-fourth' }, // 44th State
    'utah': { year: 1896, note: 'Forty-fifth' }, // 45th State
    'oklahoma': { year: 1907, note: 'Forty-sixth' }, // 46th State
    'new mexico': { year: 1912, note: 'Forty-seventh' }, // 47th State
    'arizona': { year: 1912, note: 'Forty-eighth' }, // 48th State
    'alaska': { year: 1959, note: 'Forty-ninth' }, // 49th State
    'hawaii': { year: 1959, note: 'Fiftieth' } // 50th State
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
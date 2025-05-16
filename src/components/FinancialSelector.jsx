import React, { useState } from 'react';
import { Search } from 'lucide-react';

const FinancialSelector = () => {
  const [search, setSearch] = useState('');
  const [selectedZodiac, setSelectedZodiac] = useState('');
  const [sector, setSector] = useState('all');

  // Zodiac calculation helper
  const getZodiacSign = (year) => {
    const zodiacSigns = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
      'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
    return zodiacSigns[(year - 4) % 12];
  };

  // Combined and deduplicated financial institution data
  const institutionData = {
    // Public Financial Institutions
    'jpmorgan chase': { year: 1799, note: 'USA', type: 'public' },
    'bank of america': { year: 1904, note: 'USA', type: 'public' },
    'wells fargo': { year: 1852, note: 'USA', type: 'public' },
    'citigroup': { year: 1812, note: 'USA', type: 'public' },
    'goldman sachs': { year: 1869, note: 'USA', type: 'public' },
    'morgan stanley': { year: 1935, note: 'USA', type: 'public' },
    'blackrock': { year: 1988, note: 'USA', type: 'public' },
    'vanguard group': { year: 1975, note: 'USA', type: 'public' },
    'state street': { year: 1792, note: 'USA', type: 'public' },
    'fidelity investments': { year: 1946, note: 'USA', type: 'public' },
    'charles schwab': { year: 1971, note: 'USA', type: 'public' },
    'hsbc': { year: 1865, note: 'Hong Kong', type: 'public' },
    'barclays': { year: 1690, note: 'UK', type: 'public' },
    'ubs': { year: 1862, note: 'Switzerland', type: 'public' },
    'deutsche bank': { year: 1870, note: 'Germany', type: 'public' },
    'credit suisse': { year: 1856, note: 'Switzerland', type: 'public' },
    'bank of china': { year: 1912, note: 'China', type: 'public' },
    'industrial and commercial bank of china': { year: 1984, note: 'China', type: 'public' },
    'china construction bank': { year: 1954, note: 'China', type: 'public' },
    'agricultural bank of china': { year: 1951, note: 'China', type: 'public' },
    'mitsubishi ufj': { year: 1880, note: 'Japan', type: 'public' },
    'japan post bank': { year: 1875, note: 'Japan', type: 'public' },
    'sumitomo mitsui': { year: 1876, note: 'Japan', type: 'public' },
    'mizuho financial': { year: 1864, note: 'Japan', type: 'public' },
    'banco santander': { year: 1857, note: 'Spain', type: 'public' },
    'bnp paribas': { year: 1848, note: 'France', type: 'public' },
    'credit agricole': { year: 1894, note: 'France', type: 'public' },
    'societe generale': { year: 1864, note: 'France', type: 'public' },
    'unicredit': { year: 1473, note: 'Italy', type: 'public' },
    'intesa sanpaolo': { year: 1925, note: 'Italy', type: 'public' },
    'royal bank of canada': { year: 1864, note: 'Canada', type: 'public' },
    'td bank': { year: 1855, note: 'Canada', type: 'public' },
    'scotiabank': { year: 1832, note: 'Canada', type: 'public' },
    'bmo': { year: 1817, note: 'Canada', type: 'public' },
    'us bancorp': { year: 1863, note: 'USA', type: 'public' },
    'pnc financial': { year: 1852, note: 'USA', type: 'public' },
    'truist': { year: 1872, note: 'USA', type: 'public' },
    'commonwealth bank': { year: 1911, note: 'Australia', type: 'public' },
    'ing group': { year: 1991, note: 'Netherlands', type: 'public' },
    'standard chartered': { year: 1969, note: 'UK', type: 'public' },
    'apollo global management': { year: 1990, note: 'USA', type: 'public' },
    'kkr': { year: 1976, note: 'USA', type: 'public' },
    'carlyle group': { year: 1987, note: 'USA', type: 'public' },
    'bridgewater associates': { year: 1975, note: 'USA', type: 'public' },
    'wellington management': { year: 1928, note: 'USA', type: 'public' },
    'northern trust': { year: 1889, note: 'USA', type: 'public' },
    't rowe price': { year: 1937, note: 'USA', type: 'public' },
    'invesco': { year: 1935, note: 'USA', type: 'public' },
    'capital one': { year: 1988, note: 'USA', type: 'public' },
    'mastercard': { year: 1966, note: 'USA', type: 'public' },
    'visa': { year: 1958, note: 'USA', type: 'public' },
    'american express': { year: 1850, note: 'USA', type: 'public' },
    'discover financial': { year: 1985, note: 'USA', type: 'public' },
    'fifth third bank': { year: 1858, note: 'USA', type: 'public' },
    'citizens financial group': { year: 1828, note: 'USA', type: 'public' },
    'regions financial': { year: 1971, note: 'USA', type: 'public' },
    'keycorp': { year: 1825, note: 'USA', type: 'public' },
    'westpac': { year: 1817, note: 'Australia', type: 'public' },
    'national australia bank': { year: 1858, note: 'Australia', type: 'public' },
    'anz bank': { year: 1835, note: 'Australia', type: 'public' },
    'dbs bank': { year: 1968, note: 'Singapore', type: 'public' },
    'ocbc bank': { year: 1932, note: 'Singapore', type: 'public' },
    'united overseas bank': { year: 1935, note: 'Singapore', type: 'public' },
    'kb financial group': { year: 2001, note: 'South Korea', type: 'public' },
    'shinhan financial group': { year: 2001, note: 'South Korea', type: 'public' },
    'woori financial group': { year: 2001, note: 'South Korea', type: 'public' },
    'danske bank': { year: 1871, note: 'Denmark', type: 'public' },
    'dnb': { year: 1822, note: 'Norway', type: 'public' },
    'nordea': { year: 2000, note: 'Sweden', type: 'public' },
    'svenska handelsbanken': { year: 1871, note: 'Sweden', type: 'public' },
    'swedbank': { year: 1820, note: 'Sweden', type: 'public' },
    'banco bradesco': { year: 1943, note: 'Brazil', type: 'public' },
    'itau unibanco': { year: 1924, note: 'Brazil', type: 'public' },
    'ally financial': { year: 1919, note: 'USA', type: 'public' },
    'synchrony financial': { year: 1932, note: 'USA', type: 'public' },
    'american savings bank': { year: 1925, note: 'USA', type: 'public' },
    'comerica': { year: 1849, note: 'USA', type: 'public' },
    'huntington bancshares': { year: 1866, note: 'USA', type: 'public' },
    'first republic bank': { year: 1985, note: 'USA', type: 'public' },
    'zions bancorporation': { year: 1873, note: 'USA', type: 'public' },
    'svb financial group': { year: 1983, note: 'USA', type: 'public' },
    'mediobanca': { year: 1946, note: 'Italy', type: 'public' },
    'banco bpm': { year: 1867, note: 'Italy', type: 'public' },
    'banco sabadell': { year: 1881, note: 'Spain', type: 'public' },
    'bankinter': { year: 1965, note: 'Spain', type: 'public' },
    'caixabank': { year: 1904, note: 'Spain', type: 'public' },
    'raiffeisen bank': { year: 1927, note: 'Austria', type: 'public' },
    'erste group': { year: 1819, note: 'Austria', type: 'public' },
    'komercni banka': { year: 1990, note: 'Czech Republic', type: 'public' },
    'otp bank': { year: 1949, note: 'Hungary', type: 'public' },
    'pko bank polski': { year: 1919, note: 'Poland', type: 'public' },
    'bank pekao': { year: 1929, note: 'Poland', type: 'public' },
    'bank millennium': { year: 1989, note: 'Poland', type: 'public' },
    'sberbank': { year: 1841, note: 'Russia', type: 'public' },
    'vtb bank': { year: 1990, note: 'Russia', type: 'public' },
    'alpha bank': { year: 1879, note: 'Greece', type: 'public' },
    'piraeus bank': { year: 1916, note: 'Greece', type: 'public' },
    'national bank of greece': { year: 1841, note: 'Greece', type: 'public' },
    'akbank': { year: 1948, note: 'Turkey', type: 'public' },
    'yapi kredi': { year: 1944, note: 'Turkey', type: 'public' },
    'garanti bbva': { year: 1946, note: 'Turkey', type: 'public' },
    'bank central asia': { year: 1955, note: 'Indonesia', type: 'public' },
    'bank mandiri': { year: 1998, note: 'Indonesia', type: 'public' },

    // Private Financial Institutions
    'federal reserve system': { year: 1913, note: 'USA', type: 'private' },
    'world bank': { year: 1944, note: 'USA', type: 'private' },
    'international monetary fund': { year: 1944, note: 'USA', type: 'private' },
    'european central bank': { year: 1998, note: 'Germany', type: 'private' },
    'bank of england': { year: 1694, note: 'UK', type: 'private' },
    'bank of japan': { year: 1882, note: 'Japan', type: 'private' },
    'peoples bank of china': { year: 1948, note: 'China', type: 'private' },
    'bundesbank': { year: 1957, note: 'Germany', type: 'private' },
    'swiss national bank': { year: 1907, note: 'Switzerland', type: 'private' },
    'bank of canada': { year: 1934, note: 'Canada', type: 'private' },
    'reserve bank of india': { year: 1935, note: 'India', type: 'private' },
    'bank for international settlements': { year: 1930, note: 'Switzerland', type: 'private' },
    'asian development bank': { year: 1966, note: 'Philippines', type: 'private' },
    'african development bank': { year: 1964, note: 'Ivory Coast', type: 'private' },
    'european investment bank': { year: 1958, note: 'Luxembourg', type: 'private' },
    'islamic development bank': { year: 1975, note: 'Saudi Arabia', type: 'private' },
    'asian infrastructure investment bank': { year: 2016, note: 'China', type: 'private' },
    'new development bank': { year: 2014, note: 'China', type: 'private' },
    'bank of korea': { year: 1950, note: 'South Korea', type: 'private' },
    'reserve bank of australia': { year: 1960, note: 'Australia', type: 'private' },
    'banco de mexico': { year: 1925, note: 'Mexico', type: 'private' },
    'saudi central bank': { year: 1952, note: 'Saudi Arabia', type: 'private' },
    'central bank of brazil': { year: 1964, note: 'Brazil', type: 'private' },
    'bank of russia': { year: 1860, note: 'Russia', type: 'private' },
    'south african reserve bank': { year: 1921, note: 'South Africa', type: 'private' },
    'bank of israel': { year: 1954, note: 'Israel', type: 'private' },
    'monetary authority of singapore': { year: 1971, note: 'Singapore', type: 'private' },
    'bank indonesia': { year: 1953, note: 'Indonesia', type: 'private' },
    'bank of thailand': { year: 1942, note: 'Thailand', type: 'private' },
    'national bank of poland': { year: 1945, note: 'Poland', type: 'private' },
    'central bank of turkey': { year: 1931, note: 'Turkey', type: 'private' },
    'bank of greece': { year: 1927, note: 'Greece', type: 'private' },
    'national bank of romania': { year: 1880, note: 'Romania', type: 'private' },
    'czech national bank': { year: 1993, note: 'Czech Republic', type: 'private' },
    'central bank of malaysia': { year: 1959, note: 'Malaysia', type: 'private' },
    'bangko sentral ng pilipinas': { year: 1993, note: 'Philippines', type: 'private' },
    'state bank of pakistan': { year: 1948, note: 'Pakistan', type: 'private' },
    'national bank of kazakhstan': { year: 1993, note: 'Kazakhstan', type: 'private' },
    'central bank of nigeria': { year: 1958, note: 'Nigeria', type: 'private' },
    'central bank of kenya': { year: 1966, note: 'Kenya', type: 'private' },
    'bank of uganda': { year: 1966, note: 'Uganda', type: 'private' },
    'central bank of egypt': { year: 1961, note: 'Egypt', type: 'private' },
    'central bank of morocco': { year: 1959, note: 'Morocco', type: 'private' },
    'central bank of tunisia': { year: 1958, note: 'Tunisia', type: 'private' },
    'central bank of chile': { year: 1925, note: 'Chile', type: 'private' },
    'central bank of argentina': { year: 1935, note: 'Argentina', type: 'private' },
    'central bank of colombia': { year: 1923, note: 'Colombia', type: 'private' },
    'central bank of peru': { year: 1922, note: 'Peru', type: 'private' },
    'central bank of venezuela': { year: 1939, note: 'Venezuela', type: 'private' },
    'national bank of hungary': { year: 1924, note: 'Hungary', type: 'private' },
    'national bank of slovakia': { year: 1993, note: 'Slovakia', type: 'private' },
    'bank of latvia': { year: 1922, note: 'Latvia', type: 'private' },
    'bank of lithuania': { year: 1922, note: 'Lithuania', type: 'private' },
    'bank of estonia': { year: 1919, note: 'Estonia', type: 'private' },
    'national bank of moldova': { year: 1991, note: 'Moldova', type: 'private' },
    'national bank of georgia': { year: 1991, note: 'Georgia', type: 'private' },
    'central bank of armenia': { year: 1993, note: 'Armenia', type: 'private' },
    'central bank of azerbaijan': { year: 1992, note: 'Azerbaijan', type: 'private' },
    'national bank of cambodia': { year: 1954, note: 'Cambodia', type: 'private' },
    'state bank of vietnam': { year: 1951, note: 'Vietnam', type: 'private' },
    'central bank of myanmar': { year: 1948, note: 'Myanmar', type: 'private' },
    'bank of the lao pdr': { year: 1968, note: 'Laos', type: 'private' },
    'nepal rastra bank': { year: 1956, note: 'Nepal', type: 'private' },
    'bangladesh bank': { year: 1971, note: 'Bangladesh', type: 'private' },
    'central bank of sri lanka': { year: 1950, note: 'Sri Lanka', type: 'private' },
    'central bank of kuwait': { year: 1968, note: 'Kuwait', type: 'private' },
    'qatar central bank': { year: 1973, note: 'Qatar', type: 'private' },
    'central bank of bahrain': { year: 1973, note: 'Bahrain', type: 'private' },
    'central bank of oman': { year: 1974, note: 'Oman', type: 'private' },
    'central bank of jordan': { year: 1964, note: 'Jordan', type: 'private' },
    'central bank of lebanon': { year: 1963, note: 'Lebanon', type: 'private' },
    'central bank of yemen': { year: 1971, note: 'Yemen', type: 'private' },
    'central bank of libya': { year: 1956, note: 'Libya', type: 'private' },
    'bank of algeria': { year: 1962, note: 'Algeria', type: 'private' }
  };

  // Get zodiac sign for each institution
  const institutionZodiacs = Object.entries(institutionData).reduce((acc, [institution, data]) => {
    const sign = getZodiacSign(Math.abs(data.year));
    if (!acc[sign]) acc[sign] = [];
    acc[sign].push(institution);
    return acc;
  }, {});

  const zodiacSigns = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
    'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];

  const getFilteredInstitutions = () => {
    let filtered = Object.entries(institutionData);
    
    // Filter by sector
    if (sector !== 'all') {
      filtered = filtered.filter(([_, data]) => data.type === sector);
    }

    // Filter by search
    if (search) {
      filtered = filtered.filter(([institution, _]) =>
        institution.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by zodiac
    if (selectedZodiac) {
      filtered = filtered.filter(([institution, data]) =>
        getZodiacSign(data.year) === selectedZodiac
      );
    }

    return filtered.map(([institution, _]) => institution);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Financial Institution Zodiac Finder
        </h2>

        {/* Sector Filter */}
        <div className="mb-4">
          <select
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
          >
            <option value="all">All Sectors</option>
            <option value="public">Public Institutions</option>
            <option value="private">Private Institutions</option>
          </select>
        </div>

        {/* Zodiac Filter */}
        <div className="mb-4">
          <select
            value={selectedZodiac}
            onChange={(e) => setSelectedZodiac(e.target.value)}
            className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
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
            placeholder="Search for an institution..."
            className="w-full p-2 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>

        {/* Results Display */}
        <div className="mt-4">
          {getFilteredInstitutions().map((institution) => (
            <div key={institution} className="p-2 border-b border-gray-200 bg-white hover:bg-gray-50">
              <span className="capitalize text-gray-800">{institution}</span>
              <span className="float-right text-gray-600">
                {getZodiacSign(institutionData[institution].year)}
                {' '}
                ({institutionData[institution].year})
                <span className="text-xs ml-2 text-gray-400">
                  {institutionData[institution].note}
                </span>
              </span>
            </div>
          ))}
        </div>

        {/* Selected Zodiac Info */}
        {selectedZodiac && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2 text-gray-800">
              {selectedZodiac} Institutions: {(institutionZodiacs[selectedZodiac] || []).length}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialSelector;                   
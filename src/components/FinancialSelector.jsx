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
    'jpmorgan chase': { year: 1799, note: 'Founded in New York, USA', type: 'public' },
    'bank of america': { year: 1904, note: 'Founded in San Francisco, USA', type: 'public' },
    'wells fargo': { year: 1852, note: 'Founded in San Francisco, USA', type: 'public' },
    'citigroup': { year: 1812, note: 'Founded in New York, USA', type: 'public' },
    'goldman sachs': { year: 1869, note: 'Founded in New York, USA', type: 'public' },
    'morgan stanley': { year: 1935, note: 'Founded in New York, USA', type: 'public' },
    'blackrock': { year: 1988, note: 'Founded in New York, USA', type: 'public' },
    'vanguard group': { year: 1975, note: 'Founded in Malvern, USA', type: 'public' },
    'state street': { year: 1792, note: 'Founded in Boston, USA', type: 'public' },
    'fidelity investments': { year: 1946, note: 'Founded in Boston, USA', type: 'public' },
    'charles schwab': { year: 1971, note: 'Founded in San Francisco, USA', type: 'public' },
    'hsbc': { year: 1865, note: 'Founded in Hong Kong', type: 'public' },
    'barclays': { year: 1690, note: 'Founded in London, UK', type: 'public' },
    'ubs': { year: 1862, note: 'Founded in Basel, Switzerland', type: 'public' },
    'deutsche bank': { year: 1870, note: 'Founded in Berlin, Germany', type: 'public' },
    'credit suisse': { year: 1856, note: 'Founded in Zurich, Switzerland', type: 'public' },
    'bank of china': { year: 1912, note: 'Founded in Beijing, China', type: 'public' },
    'industrial and commercial bank of china': { year: 1984, note: 'Founded in Beijing, China', type: 'public' },
    'china construction bank': { year: 1954, note: 'Founded in Beijing, China', type: 'public' },
    'agricultural bank of china': { year: 1951, note: 'Founded in Beijing, China', type: 'public' },
    'mitsubishi ufj': { year: 1880, note: 'Founded in Tokyo, Japan', type: 'public' },
    'japan post bank': { year: 1875, note: 'Founded in Tokyo, Japan', type: 'public' },
    'sumitomo mitsui': { year: 1876, note: 'Founded in Tokyo, Japan', type: 'public' },
    'mizuho financial': { year: 1864, note: 'Founded in Tokyo, Japan', type: 'public' },
    'banco santander': { year: 1857, note: 'Founded in Santander, Spain', type: 'public' },
    'bnp paribas': { year: 1848, note: 'Founded in Paris, France', type: 'public' },
    'credit agricole': { year: 1894, note: 'Founded in Paris, France', type: 'public' },
    'societe generale': { year: 1864, note: 'Founded in Paris, France', type: 'public' },
    'unicredit': { year: 1473, note: 'Founded in Milan, Italy', type: 'public' },
    'intesa sanpaolo': { year: 1925, note: 'Founded in Turin, Italy', type: 'public' },
    'royal bank of canada': { year: 1864, note: 'Founded in Toronto, Canada', type: 'public' },
    'td bank': { year: 1855, note: 'Founded in Toronto, Canada', type: 'public' },
    'scotiabank': { year: 1832, note: 'Founded in Halifax, Canada', type: 'public' },
    'bmo': { year: 1817, note: 'Founded in Montreal, Canada', type: 'public' },
    'us bancorp': { year: 1863, note: 'Founded in Minneapolis, USA', type: 'public' },
    'pnc financial': { year: 1852, note: 'Founded in Pittsburgh, USA', type: 'public' },
    'truist': { year: 1872, note: 'Founded in Charlotte, USA', type: 'public' },
    'commonwealth bank': { year: 1911, note: 'Founded in Sydney, Australia', type: 'public' },
    'ing group': { year: 1991, note: 'Founded in Amsterdam, Netherlands', type: 'public' },
    'standard chartered': { year: 1969, note: 'Founded in London, UK', type: 'public' },
    'apollo global management': { year: 1990, note: 'Founded in New York, USA', type: 'public' },
    'kkr': { year: 1976, note: 'Founded in New York, USA', type: 'public' },
    'carlyle group': { year: 1987, note: 'Founded in Washington D.C., USA', type: 'public' },
    'bridgewater associates': { year: 1975, note: 'Founded in Westport, USA', type: 'public' },
    'wellington management': { year: 1928, note: 'Founded in Boston, USA', type: 'public' },
    'northern trust': { year: 1889, note: 'Founded in Chicago, USA', type: 'public' },
    't rowe price': { year: 1937, note: 'Founded in Baltimore, USA', type: 'public' },
    'invesco': { year: 1935, note: 'Founded in Atlanta, USA', type: 'public' },
    'capital one': { year: 1988, note: 'Founded in Richmond, USA', type: 'public' },
    'mastercard': { year: 1966, note: 'Founded in Purchase, USA', type: 'public' },
    'visa': { year: 1958, note: 'Founded in Foster City, USA', type: 'public' },
    'american express': { year: 1850, note: 'Founded in New York, USA', type: 'public' },
    'discover financial': { year: 1985, note: 'Founded in Riverwoods, USA', type: 'public' },
    'fifth third bank': { year: 1858, note: 'Founded in Cincinnati, USA', type: 'public' },
    'citizens financial group': { year: 1828, note: 'Founded in Providence, USA', type: 'public' },
    'regions financial': { year: 1971, note: 'Founded in Birmingham, USA', type: 'public' },
    'keycorp': { year: 1825, note: 'Founded in Cleveland, USA', type: 'public' },
    'westpac': { year: 1817, note: 'Founded in Sydney, Australia', type: 'public' },
    'national australia bank': { year: 1858, note: 'Founded in Melbourne, Australia', type: 'public' },
    'anz bank': { year: 1835, note: 'Founded in Melbourne, Australia', type: 'public' },
    'dbs bank': { year: 1968, note: 'Founded in Singapore', type: 'public' },
    'ocbc bank': { year: 1932, note: 'Founded in Singapore', type: 'public' },
    'united overseas bank': { year: 1935, note: 'Founded in Singapore', type: 'public' },
    'kb financial group': { year: 2001, note: 'Founded in Seoul, South Korea', type: 'public' },
    'shinhan financial group': { year: 2001, note: 'Founded in Seoul, South Korea', type: 'public' },
    'woori financial group': { year: 2001, note: 'Founded in Seoul, South Korea', type: 'public' },
    'danske bank': { year: 1871, note: 'Founded in Copenhagen, Denmark', type: 'public' },
    'dnb': { year: 1822, note: 'Founded in Oslo, Norway', type: 'public' },
    'nordea': { year: 2000, note: 'Founded in Stockholm, Sweden', type: 'public' },
    'svenska handelsbanken': { year: 1871, note: 'Founded in Stockholm, Sweden', type: 'public' },
    'swedbank': { year: 1820, note: 'Founded in Stockholm, Sweden', type: 'public' },
    'banco bradesco': { year: 1943, note: 'Founded in São Paulo, Brazil', type: 'public' },
    'itau unibanco': { year: 1924, note: 'Founded in São Paulo, Brazil', type: 'public' },
    'ally financial': { year: 1919, note: 'Founded in Detroit, USA', type: 'public' },
    'synchrony financial': { year: 1932, note: 'Founded in Stamford, USA', type: 'public' },
    'american savings bank': { year: 1925, note: 'Founded in Honolulu, USA', type: 'public' },
    'comerica': { year: 1849, note: 'Founded in Detroit, USA', type: 'public' },
    'huntington bancshares': { year: 1866, note: 'Founded in Columbus, USA', type: 'public' },
    'first republic bank': { year: 1985, note: 'Founded in San Francisco, USA', type: 'public' },
    'zions bancorporation': { year: 1873, note: 'Founded in Salt Lake City, USA', type: 'public' },
    'svb financial group': { year: 1983, note: 'Founded in Santa Clara, USA', type: 'public' },
    'mediobanca': { year: 1946, note: 'Founded in Milan, Italy', type: 'public' },
    'banco bpm': { year: 1867, note: 'Founded in Verona, Italy', type: 'public' },
    'banco sabadell': { year: 1881, note: 'Founded in Sabadell, Spain', type: 'public' },
    'bankinter': { year: 1965, note: 'Founded in Madrid, Spain', type: 'public' },
    'caixabank': { year: 1904, note: 'Founded in Barcelona, Spain', type: 'public' },
    'raiffeisen bank': { year: 1927, note: 'Founded in Vienna, Austria', type: 'public' },
    'erste group': { year: 1819, note: 'Founded in Vienna, Austria', type: 'public' },
    'komercni banka': { year: 1990, note: 'Founded in Prague, Czech Republic', type: 'public' },
    'otp bank': { year: 1949, note: 'Founded in Budapest, Hungary', type: 'public' },
    'pko bank polski': { year: 1919, note: 'Founded in Warsaw, Poland', type: 'public' },
    'bank pekao': { year: 1929, note: 'Founded in Warsaw, Poland', type: 'public' },
    'bank millennium': { year: 1989, note: 'Founded in Warsaw, Poland', type: 'public' },
    'sberbank': { year: 1841, note: 'Founded in Moscow, Russia', type: 'public' },
    'vtb bank': { year: 1990, note: 'Founded in Saint Petersburg, Russia', type: 'public' },
    'alpha bank': { year: 1879, note: 'Founded in Athens, Greece', type: 'public' },
    'piraeus bank': { year: 1916, note: 'Founded in Athens, Greece', type: 'public' },
    'national bank of greece': { year: 1841, note: 'Founded in Athens, Greece', type: 'public' },
    'akbank': { year: 1948, note: 'Founded in Istanbul, Turkey', type: 'public' },
    'yapi kredi': { year: 1944, note: 'Founded in Istanbul, Turkey', type: 'public' },
    'garanti bbva': { year: 1946, note: 'Founded in Istanbul, Turkey', type: 'public' },
    'bank central asia': { year: 1955, note: 'Founded in Jakarta, Indonesia', type: 'public' },
    'bank mandiri': { year: 1998, note: 'Founded in Jakarta, Indonesia', type: 'public' },

    // Private Financial Institutions
    'federal reserve system': { year: 1913, note: 'Founded in Washington D.C., USA', type: 'private' },
    'world bank': { year: 1944, note: 'Founded in Washington D.C., USA', type: 'private' },
    'international monetary fund': { year: 1944, note: 'Founded in Washington D.C., USA', type: 'private' },
    'european central bank': { year: 1998, note: 'Founded in Frankfurt, Germany', type: 'private' },
    'bank of england': { year: 1694, note: 'Founded in London, UK', type: 'private' },
    'bank of japan': { year: 1882, note: 'Founded in Tokyo, Japan', type: 'private' },
    'peoples bank of china': { year: 1948, note: 'Founded in Beijing, China', type: 'private' },
    'bundesbank': { year: 1957, note: 'Founded in Frankfurt, Germany', type: 'private' },
    'swiss national bank': { year: 1907, note: 'Founded in Berne, Switzerland', type: 'private' },
    'bank of canada': { year: 1934, note: 'Founded in Ottawa, Canada', type: 'private' },
    'reserve bank of india': { year: 1935, note: 'Founded in Mumbai, India', type: 'private' },
    'bank for international settlements': { year: 1930, note: 'Founded in Basel, Switzerland', type: 'private' },
    'asian development bank': { year: 1966, note: 'Founded in Manila, Philippines', type: 'private' },
    'african development bank': { year: 1964, note: 'Founded in Abidjan, Ivory Coast', type: 'private' },
    'european investment bank': { year: 1958, note: 'Founded in Luxembourg City, Luxembourg', type: 'private' },
    'islamic development bank': { year: 1975, note: 'Founded in Jeddah, Saudi Arabia', type: 'private' },
    'asian infrastructure investment bank': { year: 2016, note: 'Founded in Beijing, China', type: 'private' },
    'new development bank': { year: 2014, note: 'Founded in Shanghai, China', type: 'private' },
    'bank of korea': { year: 1950, note: 'Founded in Seoul, South Korea', type: 'private' },
    'reserve bank of australia': { year: 1960, note: 'Founded in Sydney, Australia', type: 'private' },
    'banco de mexico': { year: 1925, note: 'Founded in Mexico City, Mexico', type: 'private' },
    'saudi central bank': { year: 1952, note: 'Founded in Riyadh, Saudi Arabia', type: 'private' },
    'central bank of brazil': { year: 1964, note: 'Founded in Brasília, Brazil', type: 'private' },
    'bank of russia': { year: 1860, note: 'Founded in Moscow, Russia', type: 'private' },
    'south african reserve bank': { year: 1921, note: 'Founded in Pretoria, South Africa', type: 'private' },
    'bank of israel': { year: 1954, note: 'Founded in Jerusalem, Israel', type: 'private' },
    'monetary authority of singapore': { year: 1971, note: 'Founded in Singapore', type: 'private' },
    'bank indonesia': { year: 1953, note: 'Founded in Jakarta, Indonesia', type: 'private' },
    'bank of thailand': { year: 1942, note: 'Founded in Bangkok, Thailand', type: 'private' },
    'national bank of poland': { year: 1945, note: 'Founded in Warsaw, Poland', type: 'private' },
    'central bank of turkey': { year: 1931, note: 'Founded in Ankara, Turkey', type: 'private' },
    'bank of greece': { year: 1927, note: 'Founded in Athens, Greece', type: 'private' },
    'national bank of romania': { year: 1880, note: 'Founded in Bucharest, Romania', type: 'private' },
    'czech national bank': { year: 1993, note: 'Founded in Prague, Czech Republic', type: 'private' },
    'central bank of malaysia': { year: 1959, note: 'Founded in Kuala Lumpur, Malaysia', type: 'private' },
    'bangko sentral ng pilipinas': { year: 1993, note: 'Founded in Manila, Philippines', type: 'private' },
    'state bank of pakistan': { year: 1948, note: 'Founded in Karachi, Pakistan', type: 'private' },
    'national bank of kazakhstan': { year: 1993, note: 'Founded in Almaty, Kazakhstan', type: 'private' },
    'central bank of nigeria': { year: 1958, note: 'Founded in Abuja, Nigeria', type: 'private' },
    'central bank of kenya': { year: 1966, note: 'Founded in Nairobi, Kenya', type: 'private' },
    'bank of uganda': { year: 1966, note: 'Founded in Kampala, Uganda', type: 'private' },
    'central bank of egypt': { year: 1961, note: 'Founded in Cairo, Egypt', type: 'private' },
    'central bank of morocco': { year: 1959, note: 'Founded in Rabat, Morocco', type: 'private' },
    'central bank of tunisia': { year: 1958, note: 'Founded in Tunis, Tunisia', type: 'private' },
    'central bank of chile': { year: 1925, note: 'Founded in Santiago, Chile', type: 'private' },
    'central bank of argentina': { year: 1935, note: 'Founded in Buenos Aires, Argentina', type: 'private' },
    'central bank of colombia': { year: 1923, note: 'Founded in Bogotá, Colombia', type: 'private' },
    'central bank of peru': { year: 1922, note: 'Founded in Lima, Peru', type: 'private' },
    'central bank of venezuela': { year: 1939, note: 'Founded in Caracas, Venezuela', type: 'private' },
    'national bank of hungary': { year: 1924, note: 'Founded in Budapest, Hungary', type: 'private' },
    'national bank of slovakia': { year: 1993, note: 'Founded in Bratislava, Slovakia', type: 'private' },
    'bank of latvia': { year: 1922, note: 'Founded in Riga, Latvia', type: 'private' },
    'bank of lithuania': { year: 1922, note: 'Founded in Vilnius, Lithuania', type: 'private' },
    'bank of estonia': { year: 1919, note: 'Founded in Tallinn, Estonia', type: 'private' },
    'national bank of moldova': { year: 1991, note: 'Founded in Chisinau, Moldova', type: 'private' },
    'national bank of georgia': { year: 1991, note: 'Founded in Tbilisi, Georgia', type: 'private' },
    'central bank of armenia': { year: 1993, note: 'Founded in Yerevan, Armenia', type: 'private' },
    'central bank of azerbaijan': { year: 1992, note: 'Founded in Baku, Azerbaijan', type: 'private' },
    'national bank of cambodia': { year: 1954, note: 'Founded in Phnom Penh, Cambodia', type: 'private' },
    'state bank of vietnam': { year: 1951, note: 'Founded in Hanoi, Vietnam', type: 'private' },
    'central bank of myanmar': { year: 1948, note: 'Founded in Naypyidaw, Myanmar', type: 'private' },
    'bank of the lao pdr': { year: 1968, note: 'Founded in Vientiane, Laos', type: 'private' },
    'nepal rastra bank': { year: 1956, note: 'Founded in Kathmandu, Nepal', type: 'private' },
    'bangladesh bank': { year: 1971, note: 'Founded in Dhaka, Bangladesh', type: 'private' },
    'central bank of sri lanka': { year: 1950, note: 'Founded in Colombo, Sri Lanka', type: 'private' },
    'central bank of kuwait': { year: 1968, note: 'Founded in Kuwait City, Kuwait', type: 'private' },
    'qatar central bank': { year: 1973, note: 'Founded in Doha, Qatar', type: 'private' },
    'central bank of bahrain': { year: 1973, note: 'Founded in Manama, Bahrain', type: 'private' },
    'central bank of oman': { year: 1974, note: 'Founded in Muscat, Oman', type: 'private' },
    'central bank of jordan': { year: 1964, note: 'Founded in Amman, Jordan', type: 'private' },
    'central bank of lebanon': { year: 1963, note: 'Founded in Beirut, Lebanon', type: 'private' },
    'central bank of yemen': { year: 1971, note: 'Founded in Aden, Yemen', type: 'private' },
    'central bank of libya': { year: 1956, note: 'Founded in Tripoli, Libya', type: 'private' },
    'bank of algeria': { year: 1962, note: 'Founded in Algiers, Algeria', type: 'private' }
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
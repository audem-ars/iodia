import React, { useState } from 'react';
import { Search } from 'lucide-react';

const CountrySelector = () => {
  const [search, setSearch] = useState('');
  const [selectedZodiac, setSelectedZodiac] = useState('');

  // Zodiac calculation helper
  const getZodiacSign = (year) => {
    const zodiacSigns = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 
                        'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
    return zodiacSigns[(year - 4) % 12];
  };

  // Country founding dates (modern state establishment)
  const countryData = {
    'afghanistan': { year: 1919, note: 'Independence from UK' },
    'albania': { year: 1912, note: 'Independence from Ottoman Empire' },
    'algeria': { year: 1962, note: 'Independence from France' },
    'andorra': { year: 1993, note: 'Modern parliamentary democracy' },
    'angola': { year: 1975, note: 'Independence from Portugal' },
    'antigua and barbuda': { year: 1981, note: 'Independence from UK' },
    'argentina': { year: 1816, note: 'Independence from Spain' },
    'armenia': { year: 1991, note: 'Independence from Soviet Union' },
    'australia': { year: 1901, note: 'Federation' },
    'austria': { year: 1955, note: 'Independence from Allied occupation' },
    'azerbaijan': { year: 1991, note: 'Independence from Soviet Union' },
    'bahamas': { year: 1973, note: 'Independence from UK' },
    'bahrain': { year: 1971, note: 'Independence from UK' },
    'bangladesh': { year: 1971, note: 'Independence from Pakistan' },
    'barbados': { year: 1966, note: 'Independence from UK' },
    'belarus': { year: 1991, note: 'Independence from Soviet Union' },
    'belgium': { year: 1830, note: 'Independence from Netherlands' },
    'belize': { year: 1981, note: 'Independence from UK' },
    'benin': { year: 1960, note: 'Independence from France' },
    'bhutan': { year: 1907, note: 'Monarchy established' },
    'bolivia': { year: 1825, note: 'Independence from Spain' },
    'bosnia and herzegovina': { year: 1992, note: 'Independence from Yugoslavia' },
    'botswana': { year: 1966, note: 'Independence from UK' },
    'brazil': { year: 1822, note: 'Independence from Portugal' },
    'brunei': { year: 1984, note: 'Independence from UK' },
    'bulgaria': { year: 1908, note: 'Independence from Ottoman Empire' },
    'burkina faso': { year: 1960, note: 'Independence from France' },
    'burundi': { year: 1962, note: 'Independence from Belgium' },
    'cambodia': { year: 1953, note: 'Independence from France' },
    'cameroon': { year: 1960, note: 'Independence from France' },
    'canada': { year: 1867, note: 'Confederation' },
    'cape verde': { year: 1975, note: 'Independence from Portugal' },
    'central african republic': { year: 1960, note: 'Independence from France' },
    'chad': { year: 1960, note: 'Independence from France' },
    'chile': { year: 1810, note: 'First Government Junta' },
    'china': { year: 1949, note: 'Peoples Republic of China established' },
    'colombia': { year: 1810, note: 'Independence from Spain' },
    'comoros': { year: 1975, note: 'Independence from France' },
    'congo': { year: 1960, note: 'Independence from France' },
    'costa rica': { year: 1821, note: 'Independence from Spain' },
    'croatia': { year: 1991, note: 'Independence from Yugoslavia' },
    'cuba': { year: 1902, note: 'Independence from US administration' },
    'cyprus': { year: 1960, note: 'Independence from UK' },
    'czech republic': { year: 1993, note: 'Dissolution of Czechoslovakia' },
    'democratic republic of the congo': { year: 1960, note: 'Independence from Belgium' },
    'denmark': { year: 1849, note: 'Constitutional monarchy established' },
    'djibouti': { year: 1977, note: 'Independence from France' },
    'dominica': { year: 1978, note: 'Independence from UK' },
    'dominican republic': { year: 1844, note: 'Independence from Haiti' },
    'east timor': { year: 2002, note: 'Independence restored' },
    'ecuador': { year: 1830, note: 'Independence from Gran Colombia' },
    'egypt': { year: 1953, note: 'Republic declared' },
    'el salvador': { year: 1821, note: 'Independence from Spain' },
    'equatorial guinea': { year: 1968, note: 'Independence from Spain' },
    'eritrea': { year: 1993, note: 'Independence from Ethiopia' },
    'estonia': { year: 1991, note: 'Independence restored from Soviet Union' },
    'eswatini': { year: 1968, note: 'Independence from UK' },
    'ethiopia': { year: 1931, note: 'Modern constitution adopted' },
    'fiji': { year: 1970, note: 'Independence from UK' },
    'finland': { year: 1917, note: 'Independence from Russia' },
    'france': { year: 1958, note: 'Fifth Republic established' },
    'gabon': { year: 1960, note: 'Independence from France' },
    'gambia': { year: 1965, note: 'Independence from UK' },
    'georgia': { year: 1991, note: 'Independence from Soviet Union' },
    'germany': { year: 1949, note: 'Federal Republic established' },
    'ghana': { year: 1957, note: 'Independence from UK' },
    'greece': { year: 1974, note: 'Current republic established' },
    'grenada': { year: 1974, note: 'Independence from UK' },
    'guatemala': { year: 1821, note: 'Independence from Spain' },
    'guinea': { year: 1958, note: 'Independence from France' },
    'guinea-bissau': { year: 1974, note: 'Independence from Portugal' },
    'guyana': { year: 1966, note: 'Independence from UK' },
    'haiti': { year: 1804, note: 'Independence from France' },
    'honduras': { year: 1821, note: 'Independence from Spain' },
    'hungary': { year: 1989, note: 'Modern republic established' },
    'iceland': { year: 1944, note: 'Independence from Denmark' },
    'india': { year: 1947, note: 'Independence from UK' },
    'indonesia': { year: 1945, note: 'Independence declared' },
    'iran': { year: 1979, note: 'Islamic Republic established' },
    'iraq': { year: 1932, note: 'Independence from UK' },
    'ireland': { year: 1922, note: 'Independence from UK' },
    'israel': { year: 1948, note: 'State of Israel declared' },
    'italy': { year: 1946, note: 'Modern republic established' },
    'ivory coast': { year: 1960, note: 'Independence from France' },
    'jamaica': { year: 1962, note: 'Independence from UK' },
    'japan': { year: 1947, note: 'Current constitution' },
    'jordan': { year: 1946, note: 'Independence from UK' },
    'kazakhstan': { year: 1991, note: 'Independence from Soviet Union' },
    'kenya': { year: 1963, note: 'Independence from UK' },
    'kiribati': { year: 1979, note: 'Independence from UK' },
    'kuwait': { year: 1961, note: 'Independence from UK' },
    'kyrgyzstan': { year: 1991, note: 'Independence from Soviet Union' },
    'laos': { year: 1949, note: 'Independence from France' },
    'latvia': { year: 1991, note: 'Independence from Soviet Union' },
    'lebanon': { year: 1943, note: 'Independence from France' },
    'lesotho': { year: 1966, note: 'Independence from UK' },
    'liberia': { year: 1847, note: 'Independence declared' },
    'libya': { year: 1951, note: 'Independence from Italy' },
    'liechtenstein': { year: 1806, note: 'Sovereignty from Holy Roman Empire' },
    'lithuania': { year: 1991, note: 'Independence from Soviet Union' },
    'luxembourg': { year: 1867, note: 'Full independence' },
    'madagascar': { year: 1960, note: 'Independence from France' },
    'malawi': { year: 1964, note: 'Independence from UK' },
    'malaysia': { year: 1957, note: 'Independence from UK' },
    'maldives': { year: 1965, note: 'Independence from UK' },
    'mali': { year: 1960, note: 'Independence from France' },
    'malta': { year: 1964, note: 'Independence from UK' },
    'marshall islands': { year: 1986, note: 'Independence from US' },
    'mauritania': { year: 1960, note: 'Independence from France' },
    'mauritius': { year: 1968, note: 'Independence from UK' },
    'mexico': { year: 1917, note: 'Current constitution' },
    'micronesia': { year: 1986, note: 'Independence from US' },
    'moldova': { year: 1991, note: 'Independence from Soviet Union' },
    'monaco': { year: 1861, note: 'Sovereignty recognized' },
    'mongolia': { year: 1921, note: 'Independence declared' },
    'montenegro': { year: 2006, note: 'Independence from Serbia' },
    'morocco': { year: 1956, note: 'Independence from France' },
    'mozambique': { year: 1975, note: 'Independence from Portugal' },
    'myanmar': { year: 1948, note: 'Independence from UK' },
    'namibia': { year: 1990, note: 'Independence from South Africa' },
    'nauru': { year: 1968, note: 'Independence from UN trusteeship' },
    'nepal': { year: 2008, note: 'Republic established' },
    'netherlands': { year: 1815, note: 'Kingdom established' },
    'new zealand': { year: 1907, note: 'Dominion status' },
    'nicaragua': { year: 1821, note: 'Independence from Spain' },
    'niger': { year: 1960, note: 'Independence from France' },
    'nigeria': { year: 1960, note: 'Independence from UK' },
    'north korea': { year: 1948, note: 'DPRK established' },
    'north macedonia': { year: 1991, note: 'Independence from Yugoslavia' },
    'norway': { year: 1905, note: 'Independence from Sweden' },
    'oman': { year: 1970, note: 'Current state established' },
    'pakistan': { year: 1947, note: 'Independence from UK' },
    'palau': { year: 1994, note: 'Independence from US' },
    'panama': { year: 1903, note: 'Independence from Colombia' },
    'papua new guinea': { year: 1975, note: 'Independence from Australia' },
    'paraguay': { year: 1811, note: 'Independence from Spain' },
    'peru': { year: 1821, note: 'Independence declared' },
    'philippines': { year: 1946, note: 'Independence from US' },
    'poland': { year: 1918, note: 'Independence restored' },
    'portugal': { year: 1910, note: 'Republic established' },
    'qatar': { year: 1971, note: 'Independence from UK' },
    'romania': { year: 1947, note: 'Modern state established' },
    'russia': { year: 1991, note: 'Current federation established' },
    'rwanda': { year: 1962, note: 'Independence from Belgium' },
    'saint kitts and nevis': { year: 1983, note: 'Independence from UK' },
    'saint lucia': { year: 1979, note: 'Independence from UK' },
    'saint vincent and the grenadines': { year: 1979, note: 'Independence from UK' },
    'samoa': { year: 1962, note: 'Independence from New Zealand' },
    'san marino': { year: 1600, note: 'Current constitution' },
    'sao tome and principe': { year: 1975, note: 'Independence from Portugal' },
    'saudi arabia': { year: 1932, note: 'Modern kingdom established' },
    'senegal': { year: 1960, note: 'Independence from France' },
    'serbia': { year: 2006, note: 'Independence from Serbia and Montenegro' },
    'seychelles': { year: 1976, note: 'Independence from UK' },
    'sierra leone': { year: 1961, note: 'Independence from UK' },
    'singapore': { year: 1965, note: 'Independence from Malaysia' },
    'slovakia': { year: 1993, note: 'Independence from Czechoslovakia' },
    'slovenia': { year: 1991, note: 'Independence from Yugoslavia' },
    'solomon islands': { year: 1978, note: 'Independence from UK' },
    'somalia': { year: 1960, note: 'Independence and unification' },
    'south africa': { year: 1961, note: 'Republic declared' },
    'south korea': { year: 1948, note: 'Republic established' },
    'south sudan': { year: 2011, note: 'Independence from Sudan' },
    'spain': { year: 1978, note: 'Current constitution' },
    'sri lanka': { year: 1948, note: 'Independence from UK' },
    'sudan': { year: 1956, note: 'Independence from UK and Egypt' },
    'suriname': { year: 1975, note: 'Independence from Netherlands' },
    'sweden': { year: 1523, note: 'Modern state established' },
    'switzerland': { year: 1848, note: 'Federal state established' },
    'syria': { year: 1946, note: 'Independence from France' },
    'taiwan': { year: 1949, note: 'Republic of China relocated' },
    'tajikistan': { year: 1991, note: 'Independence from Soviet Union' },
    'tanzania': { year: 1961, note: 'Independence from UK' },
    'thailand': { year: 1932, note: 'Constitutional monarchy established' },
    'togo': { year: 1960, note: 'Independence from France' },
    'tonga': { year: 1970, note: 'Independence from UK protection' },
    'trinidad and tobago': { year: 1962, note: 'Independence from UK' },
    'tunisia': { year: 1956, note: 'Independence from France' },
    'turkey': { year: 1923, note: 'Republic declared' },
    'turkmenistan': { year: 1991, note: 'Independence from Soviet Union' },
    'tuvalu': { year: 1978, note: 'Independence from UK' },
    'uganda': { year: 1962, note: 'Independence from UK' },
    'ukraine': { year: 1991, note: 'Independence from Soviet Union' },
    'united arab emirates': { year: 1971, note: 'Independence from UK' },
    'united kingdom': { year: 1922, note: 'Modern state established' },
    'united states': { year: 1776, note: 'Independence declared' },
    'uruguay': { year: 1825, note: 'Independence from Brazil' },
    'uzbekistan': { year: 1991, note: 'Independence from Soviet Union' },
    'vanuatu': { year: 1980, note: 'Independence from UK and France' },
    'vatican city': { year: 1929, note: 'Lateran Treaty' },
    'venezuela': { year: 1811, note: 'Independence declared' },
    'vietnam': { year: 1945, note: 'Independence declared' },
    'yemen': { year: 1990, note: 'Unification' },
    'zambia': { year: 1964, note: 'Independence from UK' },
    'zimbabwe': { year: 1980, note: 'Independence from UK' }
  };

  // Get zodiac sign for each country
  const countryZodiacs = Object.entries(countryData).reduce((acc, [country, data]) => {
    const sign = getZodiacSign(Math.abs(data.year));
    if (!acc[sign]) acc[sign] = [];
    acc[sign].push(country);
    return acc;
  }, {});

  // All zodiac signs for the filter
  const zodiacSigns = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 
                      'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];

  // Filter countries based on search and selected zodiac
  const getFilteredCountries = () => {
    let filtered = Object.keys(countryData);
    
    if (search) {
      filtered = filtered.filter(country => 
        country.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (selectedZodiac) {
      filtered = countryZodiacs[selectedZodiac] || [];
    }
    
    return filtered;
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">
          country zodiac finder
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
            placeholder="Search for a country..."
            className="w-full p-2 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>

        {/* Results Display */}
        <div className="mt-4">
          {getFilteredCountries().map((country) => (
            <div key={country} className="p-2 border-b">
              <span className="capitalize">{country}</span>
              <span className="float-right text-gray-600">
                {getZodiacSign(countryData[country].year)}
                {' '}
                ({countryData[country].year})
              </span>
            </div>
          ))}
        </div>

        {/* Selected Zodiac Info */}
        {selectedZodiac && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">
              {selectedZodiac} Countries: {(countryZodiacs[selectedZodiac] || []).length}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountrySelector;
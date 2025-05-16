import React, { useState } from 'react';
import { Search } from 'lucide-react';

const ClothingBrandSelector = () => {
  const [search, setSearch] = useState('');
  const [selectedZodiac, setSelectedZodiac] = useState('');

  // Zodiac calculation helper
  const getZodiacSign = (year) => {
    const zodiacSigns = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
      'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
    return zodiacSigns[(year - 4) % 12];
  };

  // Clothing brand founding dates
  const clothingBrandData = {
    'abercrombie & fitch': { year: 1892, note: 'USA' },
    'adidas': { year: 1924, note: 'Germany' },
    'aeropostale': { year: 1987, note: 'USA' },
    'alexander mcqueen': { year: 1992, note: 'UK' },
    'american apparel': { year: 1989, note: 'USA' },
    'american eagle': { year: 1977, note: 'USA' },
    'armani': { year: 1975, note: 'Italy' },
    'asics': { year: 1949, note: 'Japan' },
    'balenciaga': { year: 1919, note: 'Spain' },
    'balmain': { year: 1945, note: 'France' },
    'banana republic': { year: 1978, note: 'USA' },
    'bape': { year: 1993, note: 'Japan' },
    'bare minerals': { year: 1976, note: 'USA' },
    'billabong': { year: 1973, note: 'Australia' },
    'bottega veneta': { year: 1966, note: 'Italy' },
    'brooks brothers': { year: 1818, note: 'USA' },
    'burberry': { year: 1856, note: 'UK' },
    'calvin klein': { year: 1968, note: 'USA' },
    'canada goose': { year: 1957, note: 'Canada' },
    'carhartt': { year: 1889, note: 'USA' },
    'cartier': { year: 1847, note: 'France' },
    'celine': { year: 1945, note: 'France' },
    'champion': { year: 1919, note: 'USA' },
    'chanel': { year: 1909, note: 'France' },
    'clarks': { year: 1825, note: 'UK' },
    'coach': { year: 1941, note: 'USA' },
    'columbia': { year: 1938, note: 'USA' },
    'converse': { year: 1908, note: 'USA' },
    'crocs': { year: 2002, note: 'USA' },
    'dc shoes': { year: 1994, note: 'USA' },
    'dickies': { year: 1922, note: 'USA' },
    'diesel': { year: 1978, note: 'Italy' },
    'dior': { year: 1946, note: 'France' },
    'dolce & gabbana': { year: 1985, note: 'Italy' },
    'dr. martens': { year: 1947, note: 'UK' },
    'ellesse': { year: 1959, note: 'Italy' },
    'fendi': { year: 1925, note: 'Italy' },
    'fila': { year: 1911, note: 'Italy' },
    'forever 21': { year: 1984, note: 'USA' },
    'fruit of the loom': { year: 1851, note: 'USA' },
    'gap': { year: 1969, note: 'USA' },
    'givenchy': { year: 1952, note: 'France' },
    'gucci': { year: 1921, note: 'Italy' },
    'guess': { year: 1981, note: 'USA' },
    'h&m': { year: 1947, note: 'Sweden' },
    'hanes': { year: 1901, note: 'USA' },
    'hermès': { year: 1837, note: 'France' },
    'hollister': { year: 2000, note: 'USA' },
    'hugo boss': { year: 1924, note: 'Germany' },
    'hurley': { year: 1979, note: 'USA' },
    'jordan': { year: 1984, note: 'USA' },
    'karl lagerfeld': { year: 1984, note: 'France' },
    'kate spade': { year: 1993, note: 'USA' },
    'kenzo': { year: 1970, note: 'France' },
    'lacoste': { year: 1933, note: 'France' },
    'levi strauss': { year: 1853, note: 'USA' },
    'liz claiborne': { year: 1976, note: 'USA' },
    'loewe': { year: 1846, note: 'Spain' },
    'louis vuitton': { year: 1854, note: 'France' },
    'lululemon': { year: 1998, note: 'Canada' },
    'mango': { year: 1984, note: 'Spain' },
    'michael kors': { year: 1981, note: 'USA' },
    'missoni': { year: 1953, note: 'Italy' },
    'miu miu': { year: 1993, note: 'Italy' },
    'moncler': { year: 1952, note: 'France' },
    'moschino': { year: 1983, note: 'Italy' },
    'nautica': { year: 1983, note: 'USA' },
    'new balance': { year: 1906, note: 'USA' },
    'nike': { year: 1964, note: 'USA' },
    'nine west': { year: 1983, note: 'USA' },
    'oakley': { year: 1975, note: 'USA' },
    'off-white': { year: 2012, note: 'Italy' },
    'old navy': { year: 1994, note: 'USA' },
    'omega': { year: 1848, note: 'Switzerland' },
    'patagonia': { year: 1973, note: 'USA' },
    'paul smith': { year: 1970, note: 'UK' },
    'prada': { year: 1913, note: 'Italy' },
    'primark': { year: 1969, note: 'Ireland' },
    'puma': { year: 1948, note: 'Germany' },
    'quiksilver': { year: 1969, note: 'Australia' },
    'ralph lauren': { year: 1967, note: 'USA' },
    'reebok': { year: 1958, note: 'UK' },
    'roxy': { year: 1990, note: 'USA' },
    'saint laurent': { year: 1961, note: 'France' },
    'salvatore ferragamo': { year: 1927, note: 'Italy' },
    'skechers': { year: 1992, note: 'USA' },
    'steve madden': { year: 1990, note: 'USA' },
    'stussy': { year: 1980, note: 'USA' },
    'supreme': { year: 1994, note: 'USA' },
    'teva': { year: 1984, note: 'USA' },
    'the north face': { year: 1966, note: 'USA' },
    'timberland': { year: 1952, note: 'USA' },
    'tommy hilfiger': { year: 1985, note: 'USA' },
    'topshop': { year: 1964, note: 'UK' },
    'under armour': { year: 1996, note: 'USA' },
    'uniqlo': { year: 1949, note: 'Japan' },
    'valentino': { year: 1960, note: 'Italy' },
    'vans': { year: 1966, note: 'USA' },
    'versace': { year: 1978, note: 'Italy' },
    'victoria\'s secret': { year: 1977, note: 'USA' },
    'volcom': { year: 1991, note: 'USA' },
    'wrangler': { year: 1904, note: 'USA' },
    'ysl': { year: 1961, note: 'France' },
    'zara': { year: 1975, note: 'Spain' },
    'zimmermann': { year: 1991, note: 'Australia' }
  };

  // Get zodiac sign for each brand
  const brandZodiacs = Object.entries(clothingBrandData).reduce((acc, [brand, data]) => {
    const sign = getZodiacSign(Math.abs(data.year));
    if (!acc[sign]) acc[sign] = [];
    acc[sign].push(brand);
    return acc;
  }, {});

  const zodiacSigns = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
    'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];

  const getFilteredBrands = () => {
    let filtered = Object.keys(clothingBrandData);
    if (search) {
      filtered = filtered.filter(brand => 
        brand.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (selectedZodiac) {
      filtered = brandZodiacs[selectedZodiac] || [];
    }
    return filtered;
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Clothing Brand Zodiac Finder
        </h2>

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
            placeholder="Search for a clothing brand..."
            className="w-full p-2 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>

        {/* Results Display */}
        <div className="mt-4">
          {getFilteredBrands().map((brand) => (
            <div key={brand} className="p-2 border-b border-gray-200 bg-white hover:bg-gray-50">
              <span className="capitalize text-gray-800">{brand}</span>
              <span className="float-right text-gray-600">
                {getZodiacSign(clothingBrandData[brand].year)}
                {' '}
                ({clothingBrandData[brand].year})
                <span className="text-xs ml-2 text-gray-400">
                  {clothingBrandData[brand].note}
                </span>
              </span>
            </div>
          ))}
        </div>

        {/* Selected Zodiac Info */}
        {selectedZodiac && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2 text-gray-800">
              {selectedZodiac} Brands: {(brandZodiacs[selectedZodiac] || []).length}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClothingBrandSelector;
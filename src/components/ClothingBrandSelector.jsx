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
    'abercrombie & fitch': { year: 1892, note: 'Founded in New York City, USA' },
    'adidas': { year: 1924, note: 'Founded in Herzogenaurach, Germany' },
    'aeropostale': { year: 1987, note: 'Founded in New York City, USA' },
    'alexander mcqueen': { year: 1992, note: 'Founded in London, UK' },
    'american apparel': { year: 1989, note: 'Founded in Los Angeles, USA' },
    'american eagle': { year: 1977, note: 'Founded in Pittsburgh, USA' },
    'armani': { year: 1975, note: 'Founded in Milan, Italy' },
    'asics': { year: 1949, note: 'Founded in Kobe, Japan' },
    'balenciaga': { year: 1919, note: 'Founded in San Sebastian, Spain' },
    'balmain': { year: 1945, note: 'Founded in Paris, France' },
    'banana republic': { year: 1978, note: 'Founded in San Francisco, USA' },
    'bape': { year: 1993, note: 'Founded in Tokyo, Japan' },
    'bare minerals': { year: 1976, note: 'Founded in San Francisco, USA' },
    'billabong': { year: 1973, note: 'Founded in Gold Coast, Australia' },
    'bottega veneta': { year: 1966, note: 'Founded in Vicenza, Italy' },
    'brooks brothers': { year: 1818, note: 'Founded in New York City, USA' },
    'burberry': { year: 1856, note: 'Founded in Basingstoke, UK' },
    'calvin klein': { year: 1968, note: 'Founded in New York City, USA' },
    'canada goose': { year: 1957, note: 'Founded in Toronto, Canada' },
    'carhartt': { year: 1889, note: 'Founded in Detroit, USA' },
    'cartier': { year: 1847, note: 'Founded in Paris, France' },
    'celine': { year: 1945, note: 'Founded in Paris, France' },
    'champion': { year: 1919, note: 'Founded in Rochester, USA' },
    'chanel': { year: 1909, note: 'Founded in Paris, France' },
    'clarks': { year: 1825, note: 'Founded in Street, UK' },
    'coach': { year: 1941, note: 'Founded in New York City, USA' },
    'columbia': { year: 1938, note: 'Founded in Portland, USA' },
    'converse': { year: 1908, note: 'Founded in Boston, USA' },
    'crocs': { year: 2002, note: 'Founded in Boulder, USA' },
    'dc shoes': { year: 1994, note: 'Founded in Vista, USA' },
    'dickies': { year: 1922, note: 'Founded in Fort Worth, USA' },
    'diesel': { year: 1978, note: 'Founded in Molvena, Italy' },
    'dior': { year: 1946, note: 'Founded in Paris, France' },
    'dolce & gabbana': { year: 1985, note: 'Founded in Milan, Italy' },
    'dr. martens': { year: 1947, note: 'Founded in Wollaston, UK' },
    'ellesse': { year: 1959, note: 'Founded in Perugia, Italy' },
    'fendi': { year: 1925, note: 'Founded in Rome, Italy' },
    'fila': { year: 1911, note: 'Founded in Biella, Italy' },
    'forever 21': { year: 1984, note: 'Founded in Los Angeles, USA' },
    'fruit of the loom': { year: 1851, note: 'Founded in Kentucky, USA' },
    'gap': { year: 1969, note: 'Founded in San Francisco, USA' },
    'givenchy': { year: 1952, note: 'Founded in Paris, France' },
    'gucci': { year: 1921, note: 'Founded in Florence, Italy' },
    'guess': { year: 1981, note: 'Founded in Los Angeles, USA' },
    'h&m': { year: 1947, note: 'Founded in Västerås, Sweden' },
    'hanes': { year: 1901, note: 'Founded in Winston-Salem, USA' },
    'hermès': { year: 1837, note: 'Founded in Paris, France' },
    'hollister': { year: 2000, note: 'Founded in Columbus, USA' },
    'hugo boss': { year: 1924, note: 'Founded in Metzingen, Germany' },
    'hurley': { year: 1979, note: 'Founded in Costa Mesa, USA' },
    'jordan': { year: 1984, note: 'Founded in Beaverton, USA' },
    'karl lagerfeld': { year: 1984, note: 'Founded in Paris, France' },
    'kate spade': { year: 1993, note: 'Founded in New York City, USA' },
    'kenzo': { year: 1970, note: 'Founded in Paris, France' },
    'lacoste': { year: 1933, note: 'Founded in Paris, France' },
    'levi strauss': { year: 1853, note: 'Founded in San Francisco, USA' },
    'liz claiborne': { year: 1976, note: 'Founded in New York City, USA' },
    'loewe': { year: 1846, note: 'Founded in Madrid, Spain' },
    'louis vuitton': { year: 1854, note: 'Founded in Paris, France' },
    'lululemon': { year: 1998, note: 'Founded in Vancouver, Canada' },
    'mango': { year: 1984, note: 'Founded in Barcelona, Spain' },
    'michael kors': { year: 1981, note: 'Founded in New York City, USA' },
    'missoni': { year: 1953, note: 'Founded in Varese, Italy' },
    'miu miu': { year: 1993, note: 'Founded in Milan, Italy' },
    'moncler': { year: 1952, note: 'Founded in Monestier-de-Clermont, France' },
    'moschino': { year: 1983, note: 'Founded in Milan, Italy' },
    'nautica': { year: 1983, note: 'Founded in New York City, USA' },
    'new balance': { year: 1906, note: 'Founded in Boston, USA' },
    'nike': { year: 1964, note: 'Founded in Eugene, USA' },
    'nine west': { year: 1983, note: 'Founded in New York City, USA' },
    'oakley': { year: 1975, note: 'Founded in Lake Forest, USA' },
    'off-white': { year: 2012, note: 'Founded in Milan, Italy' },
    'old navy': { year: 1994, note: 'Founded in San Francisco, USA' },
    'omega': { year: 1848, note: 'Founded in La Chaux-de-Fonds, Switzerland' },
    'patagonia': { year: 1973, note: 'Founded in Ventura, USA' },
    'paul smith': { year: 1970, note: 'Founded in Nottingham, UK' },
    'prada': { year: 1913, note: 'Founded in Milan, Italy' },
    'primark': { year: 1969, note: 'Founded in Dublin, Ireland' },
    'puma': { year: 1948, note: 'Founded in Herzogenaurach, Germany' },
    'quiksilver': { year: 1969, note: 'Founded in Torquay, Australia' },
    'ralph lauren': { year: 1967, note: 'Founded in New York City, USA' },
    'reebok': { year: 1958, note: 'Founded in Bolton, UK' },
    'roxy': { year: 1990, note: 'Founded in Huntington Beach, USA' },
    'saint laurent': { year: 1961, note: 'Founded in Paris, France' },
    'salvatore ferragamo': { year: 1927, note: 'Founded in Florence, Italy' },
    'skechers': { year: 1992, note: 'Founded in Manhattan Beach, USA' },
    'steve madden': { year: 1990, note: 'Founded in New York City, USA' },
    'stussy': { year: 1980, note: 'Founded in Laguna Beach, USA' },
    'supreme': { year: 1994, note: 'Founded in New York City, USA' },
    'teva': { year: 1984, note: 'Founded in Grand Canyon, USA' },
    'the north face': { year: 1966, note: 'Founded in San Francisco, USA' },
    'timberland': { year: 1952, note: 'Founded in Boston, USA' },
    'tommy hilfiger': { year: 1985, note: 'Founded in New York City, USA' },
    'topshop': { year: 1964, note: 'Founded in Sheffield, UK' },
    'under armour': { year: 1996, note: 'Founded in Washington D.C., USA' },
    'uniqlo': { year: 1949, note: 'Founded in Yamaguchi, Japan' },
    'valentino': { year: 1960, note: 'Founded in Rome, Italy' },
    'vans': { year: 1966, note: 'Founded in Anaheim, USA' },
    'versace': { year: 1978, note: 'Founded in Milan, Italy' },
    'victoria\'s secret': { year: 1977, note: 'Founded in Stanford, USA' },
    'volcom': { year: 1991, note: 'Founded in Newport Beach, USA' },
    'wrangler': { year: 1904, note: 'Founded in Greensboro, USA' },
    'ysl': { year: 1961, note: 'Founded in Paris, France' },
    'zara': { year: 1975, note: 'Founded in Arteixo, Spain' },
    'zimmermann': { year: 1991, note: 'Founded in Sydney, Australia' }
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
import React, { useState } from 'react';
import { Search } from 'lucide-react';

const CarBrandSelector = () => {
  const [search, setSearch] = useState('');
  const [selectedZodiac, setSelectedZodiac] = useState('');

  // Zodiac calculation helper
  const getZodiacSign = (year) => {
    const zodiacSigns = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 
                        'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
    return zodiacSigns[(year - 4) % 12];
  };

  // Car brand founding dates
  const carBrandData = {
      'alfa romeo': { year: 1910, note: 'Italy' },
      'aston martin': { year: 1913, note: 'UK' },
      'audi': { year: 1909, note: 'Germany' },
      'bentley': { year: 1919, note: 'UK' },
      'bmw': { year: 1916, note: 'Germany' },
      'bugatti': { year: 1909, note: 'France' },
      'buick': { year: 1903, note: 'USA' },
      'cadillac': { year: 1902, note: 'USA' },
      'chevrolet': { year: 1911, note: 'USA' },
      'chrysler': { year: 1925, note: 'USA' },
      'citroën': { year: 1919, note: 'France' },
      'dodge': { year: 1900, note: 'USA' },
      'ferrari': { year: 1939, note: 'Italy' },
      'fiat': { year: 1899, note: 'Italy' },
      'ford': { year: 1903, note: 'USA' },
      'honda': { year: 1948, note: 'Japan' },
      'hyundai': { year: 1967, note: 'South Korea' },
      'infiniti': { year: 1989, note: 'Japan' },
      'jaguar': { year: 1922, note: 'UK' },
      'jeep': { year: 1941, note: 'USA' },
      'kia': { year: 1944, note: 'South Korea' },
      'lamborghini': { year: 1963, note: 'Italy' },
      'land rover': { year: 1948, note: 'UK' },
      'lexus': { year: 1989, note: 'Japan' },
      'maserati': { year: 1914, note: 'Italy' },
      'mazda': { year: 1920, note: 'Japan' },
      'mercedes-benz': { year: 1926, note: 'Germany' },
      'mini': { year: 1959, note: 'UK' },
      'mitsubishi': { year: 1917, note: 'Japan' },
      'nissan': { year: 1933, note: 'Japan' },
      'opel': { year: 1862, note: 'Germany' },
      'peugeot': { year: 1896, note: 'France' },
      'porsche': { year: 1931, note: 'Germany' },
      'ram': { year: 2010, note: 'USA' },
      'renault': { year: 1899, note: 'France' },
      'rolls-royce': { year: 1904, note: 'UK' },
      'saab': { year: 1945, note: 'Sweden' },
      'subaru': { year: 1953, note: 'Japan' },
      'tesla': { year: 2003, note: 'USA' },
      'toyota': { year: 1937, note: 'Japan' },
      'volkswagen': { year: 1937, note: 'Germany' },
      'volvo': { year: 1927, note: 'Sweden' }
  };

  // Get zodiac sign for each brand
  const brandZodiacs = Object.entries(carBrandData).reduce((acc, [brand, data]) => {
    const sign = getZodiacSign(Math.abs(data.year));
    if (!acc[sign]) acc[sign] = [];
    acc[sign].push(brand);
    return acc;
  }, {});

  // All zodiac signs for the filter
  const zodiacSigns = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 
                      'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];

  // Filter brands based on search and selected zodiac
  const getFilteredBrands = () => {
    let filtered = Object.keys(carBrandData);
    
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
    <div className="w-full max-w-md mx-auto p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">
          car brand zodiac finder
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
            placeholder="Search for a car brand..."
            className="w-full p-2 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>

        {/* Results Display */}
        <div className="mt-4">
          {getFilteredBrands().map((brand) => (
            <div key={brand} className="p-2 border-b">
              <span className="capitalize">{brand}</span>
              <span className="float-right text-gray-600">
                {getZodiacSign(carBrandData[brand].year)}
                {' '}
                ({carBrandData[brand].year})
                <span className="text-xs ml-2 text-gray-400">
                  {carBrandData[brand].note}
                </span>
              </span>
            </div>
          ))}
        </div>

        {/* Selected Zodiac Info */}
        {selectedZodiac && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">
              {selectedZodiac} Brands: {(brandZodiacs[selectedZodiac] || []).length}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarBrandSelector;
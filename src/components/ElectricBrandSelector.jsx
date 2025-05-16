import React, { useState } from 'react';
import { Search } from 'lucide-react';

const ElectricBrandSelector = () => {
  const [search, setSearch] = useState('');
  const [selectedZodiac, setSelectedZodiac] = useState('');

  // Zodiac calculation helper
  const getZodiacSign = (year) => {
    const zodiacSigns = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
      'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
    return zodiacSigns[(year - 4) % 12];
  };

  // Combined electronics and appliance brands
  const electricalBrandData = {
    'nintendo': { year: 1889, note: 'Japan' },
    'playstation': { year: 1994, note: 'Japan' },
    'xbox': { year: 2001, note: 'USA' },
    'intel': { year: 1968, note: 'USA' },
    'amd': { year: 1969, note: 'USA' },
    'nvidia': { year: 1993, note: 'USA' },
    'western digital': { year: 1970, note: 'USA' },
    'seagate': { year: 1978, note: 'Ireland' },
    'corsair': { year: 1994, note: 'USA' },
    'gateway': { year: 1985, note: 'USA' },
    'logitech': { year: 1981, note: 'Switzerland' },
    'alienware': { year: 1996, note: 'USA' },
    'bose': { year: 1964, note: 'USA' },
    'jbl': { year: 1927, note: 'USA' },
    'sennheiser': { year: 1945, note: 'Germany' },
    'beats': { year: 2006, note: 'USA' },
    'harman kardon': { year: 1953, note: 'USA' },
    'audio-technica': { year: 1962, note: 'Japan' },
    'ultimate ears': { year: 1995, note: 'USA' },
    'yamaha': { year: 1887, note: 'Japan' },
    'canon': { year: 1937, note: 'Japan' },
    'nikon': { year: 1917, note: 'Japan' },
    'fujifilm': { year: 1934, note: 'Japan' },
    'leica': { year: 1914, note: 'Germany' },
    'olympus': { year: 1919, note: 'Japan' },
    'gopro': { year: 2002, note: 'USA' },
    'honeywell': { year: 1906, note: 'USA' },
    'carrier': { year: 1915, note: 'USA' },
    'york': { year: 1874, note: 'USA' },
    'daikin': { year: 1924, note: 'Japan' },
    'mitsubishi electric': { year: 1921, note: 'Japan' },
    'emerson': { year: 1890, note: 'USA' },

    'apple': { year: 1976, note: 'USA' },
    'dell': { year: 1984, note: 'USA' },
    'hp': { year: 1939, note: 'USA' },
    'lenovo': { year: 1984, note: 'China' },
    'acer': { year: 1976, note: 'Taiwan' },
    'asus': { year: 1989, note: 'Taiwan' },
    'msi': { year: 1986, note: 'Taiwan' },
    'razer': { year: 2005, note: 'USA' },
    'oppo': { year: 2004, note: 'China' },
    'vivo': { year: 2009, note: 'China' },
    'xiaomi': { year: 2010, note: 'China' },
    'oneplus': { year: 2013, note: 'China' },
    'realme': { year: 2018, note: 'China' },
    'huawei': { year: 1987, note: 'China' },
    'honor': { year: 2013, note: 'China' },
    'nothing': { year: 2020, note: 'UK' },
    'motorola': { year: 1928, note: 'USA' },
    'blackberry': { year: 1984, note: 'Canada' },
    'nokia': { year: 1865, note: 'Finland' },
    'htc': { year: 1997, note: 'Taiwan' },
    'whirlpool': { year: 1911, note: 'USA' },
    'ge appliances': { year: 1892, note: 'USA' },
    'bosch': { year: 1886, note: 'Germany' },
    'miele': { year: 1899, note: 'Germany' },
    'philips': { year: 1891, note: 'Netherlands' },
    'siemens': { year: 1847, note: 'Germany' },
    'samsung': { year: 1938, note: 'South Korea' },
    'lg electronics': { year: 1958, note: 'South Korea' },
    'electrolux': { year: 1919, note: 'Sweden' },
    'panasonic': { year: 1918, note: 'Japan' },
    'sony': { year: 1946, note: 'Japan' },
    'sharp': { year: 1912, note: 'Japan' },
    'toshiba': { year: 1875, note: 'Japan' },
    'hitachi': { year: 1910, note: 'Japan' },
    'kenwood': { year: 1946, note: 'UK' },
    'delonghi': { year: 1902, note: 'Italy' },
    'braun': { year: 1921, note: 'Germany' },
    'kitchenaid': { year: 1919, note: 'USA' },
    'maytag': { year: 1893, note: 'USA' },
    'frigidaire': { year: 1916, note: 'USA' },
    'haier': { year: 1984, note: 'China' },
    'midea': { year: 1968, note: 'China' },
    'gree': { year: 1991, note: 'China' },
    'hisense': { year: 1969, note: 'China' },
    'tcl': { year: 1981, note: 'China' },
    'beko': { year: 1967, note: 'Turkey' },
    'gorenje': { year: 1950, note: 'Slovenia' },
    'smeg': { year: 1948, note: 'Italy' },
    'aeg': { year: 1883, note: 'Germany' },
    'zanussi': { year: 1916, note: 'Italy' },
    'liebherr': { year: 1949, note: 'Germany' },
    'breville': { year: 1932, note: 'Australia' },
    'morphy richards': { year: 1936, note: 'UK' },
    'russell hobbs': { year: 1952, note: 'UK' },
    'bissell': { year: 1876, note: 'USA' },
    'dyson': { year: 1991, note: 'UK' },
    'shark ninja': { year: 1998, note: 'Canada' },
    'irobot': { year: 1990, note: 'USA' },

    'tesla': { year: 2003, note: 'USA' },
    'rivian': { year: 2009, note: 'USA' },
    'lucid motors': { year: 2007, note: 'USA' },
    'nio': { year: 2014, note: 'China' },
    'xpeng': { year: 2014, note: 'China' },
    'byd': { year: 1995, note: 'China' },
    'polestar': { year: 1996, note: 'Sweden' },
    'fisker': { year: 2016, note: 'USA' },
    'rimac': { year: 2009, note: 'Croatia' },
    'faraday future': { year: 2014, note: 'USA' },
    'canoo': { year: 2017, note: 'USA' },
    'lordstown': { year: 2018, note: 'USA' },
    'vinfast': { year: 2017, note: 'Vietnam' },
    'czinger': { year: 2019, note: 'USA' },
    'arrival': { year: 2015, note: 'UK' },
    'sono motors': { year: 2016, note: 'Germany' },
    'lightyear': { year: 2016, note: 'Netherlands' },
    'karma automotive': { year: 2014, note: 'USA' },
    'nikola': { year: 2014, note: 'USA' },
    'proterra': { year: 2004, note: 'USA' },
    'workhorse': { year: 2007, note: 'USA' },
    'lion electric': { year: 2008, note: 'Canada' },
    'byton': { year: 2016, note: 'China' },
    'mullen': { year: 2014, note: 'USA' },
    'bollinger motors': { year: 2015, note: 'USA' },
    'aptera': { year: 2005, note: 'USA' },
    'li auto': { year: 2015, note: 'China' },
    'avatr': { year: 2018, note: 'China' },
    'zeekr': { year: 2021, note: 'China' },
    'lotus technology': { year: 2021, note: 'China' },
    'smart': { year: 1994, note: 'Germany' },
    'mini electric': { year: 2019, note: 'UK' },
    'volvo electric': { year: 2019, note: 'Sweden' },
    'mercedes-eq': { year: 2019, note: 'Germany' },
    'bmw i': { year: 2011, note: 'Germany' },
    'audi e-tron': { year: 2018, note: 'Germany' },
    'porsche electric': { year: 2019, note: 'Germany' },
    'volkswagen id': { year: 2020, note: 'Germany' },
    'hyundai ioniq': { year: 2016, note: 'South Korea' },
    'kia ev': { year: 2018, note: 'South Korea' },
    'genesis electric': { year: 2021, note: 'South Korea' },
    'mazda electric': { year: 2020, note: 'Japan' },
    'honda e': { year: 2019, note: 'Japan' },
    'toyota bz': { year: 2022, note: 'Japan' },
    'subaru electric': { year: 2022, note: 'Japan' },
    'lexus electric': { year: 2019, note: 'Japan' },
    'infiniti electric': { year: 2021, note: 'Japan' },
    'acura electric': { year: 2022, note: 'Japan' },
    'ford electric': { year: 2020, note: 'USA' },
    'chevrolet electric': { year: 2016, note: 'USA' },
    'cadillac electric': { year: 2022, note: 'USA' },
    'gmc electric': { year: 2021, note: 'USA' }
  };

  // Get zodiac sign for each brand
  const brandZodiacs = Object.entries(electricalBrandData).reduce((acc, [brand, data]) => {
    const sign = getZodiacSign(Math.abs(data.year));
    if (!acc[sign]) acc[sign] = [];
    acc[sign].push(brand);
    return acc;
  }, {});

  const zodiacSigns = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
    'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];

  const getFilteredBrands = () => {
    let filtered = Object.keys(electricalBrandData);
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
            placeholder="Search for an electrical appliance brand..."
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
                {getZodiacSign(electricalBrandData[brand].year)}
                {' '}
                ({electricalBrandData[brand].year})
                <span className="text-xs ml-2 text-gray-400">
                  {electricalBrandData[brand].note}
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

export default ElectricBrandSelector;
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
    'nintendo': { year: 1889, note: 'Founded in Kyoto, Japan' },
    'playstation': { year: 1994, note: 'Founded in Tokyo, Japan' },
    'xbox': { year: 2001, note: 'Founded in Redmond, USA' },
    'intel': { year: 1968, note: 'Founded in Mountain View, USA' },
    'amd': { year: 1969, note: 'Founded in Sunnyvale, USA' },
    'nvidia': { year: 1993, note: 'Founded in Santa Clara, USA' },
    'western digital': { year: 1970, note: 'Founded in San Jose, USA' },
    'seagate': { year: 1978, note: 'Founded in Dublin, Ireland' },
    'corsair': { year: 1994, note: 'Founded in Fremont, USA' },
    'gateway': { year: 1985, note: 'Founded in Iowa, USA' },
    'logitech': { year: 1981, note: 'Founded in Lausanne, Switzerland' },
    'alienware': { year: 1996, note: 'Founded in Miami, USA' },
    'bose': { year: 1964, note: 'Founded in Massachusetts, USA' },
    'jbl': { year: 1927, note: 'Founded in Los Angeles, USA' },
    'sennheiser': { year: 1945, note: 'Founded in Wedemark, Germany' },
    'beats': { year: 2006, note: 'Founded in California, USA' },
    'harman kardon': { year: 1953, note: 'Founded in Stamford, USA' },
    'audio-technica': { year: 1962, note: 'Founded in Tokyo, Japan' },
    'ultimate ears': { year: 1995, note: 'Founded in Irvine, USA' },
    'yamaha': { year: 1887, note: 'Founded in Hamamatsu, Japan' },
    'canon': { year: 1937, note: 'Founded in Tokyo, Japan' },
    'nikon': { year: 1917, note: 'Founded in Tokyo, Japan' },
    'fujifilm': { year: 1934, note: 'Founded in Tokyo, Japan' },
    'leica': { year: 1914, note: 'Founded in Wetzlar, Germany' },
    'olympus': { year: 1919, note: 'Founded in Tokyo, Japan' },
    'gopro': { year: 2002, note: 'Founded in San Mateo, USA' },
    'honeywell': { year: 1906, note: 'Founded in Charlotte, USA' },
    'carrier': { year: 1915, note: 'Founded in Palm Beach, USA' },
    'york': { year: 1874, note: 'Founded in York, USA' },
    'daikin': { year: 1924, note: 'Founded in Osaka, Japan' },
    'mitsubishi electric': { year: 1921, note: 'Founded in Tokyo, Japan' },
    'emerson': { year: 1890, note: 'Founded in Ferguson, USA' },

    'apple': { year: 1976, note: 'Founded in Cupertino, USA' },
    'dell': { year: 1984, note: 'Founded in Austin, USA' },
    'hp': { year: 1939, note: 'Founded in Palo Alto, USA' },
    'lenovo': { year: 1984, note: 'Founded in Beijing, China' },
    'acer': { year: 1976, note: 'Founded in Taipei, Taiwan' },
    'asus': { year: 1989, note: 'Founded in Taipei, Taiwan' },
    'msi': { year: 1986, note: 'Founded in Taipei, Taiwan' },
    'razer': { year: 2005, note: 'Founded in San Diego, USA' },
    'oppo': { year: 2004, note: 'Founded in Dongguan, China' },
    'vivo': { year: 2009, note: 'Founded in Dongguan, China' },
    'xiaomi': { year: 2010, note: 'Founded in Beijing, China' },
    'oneplus': { year: 2013, note: 'Founded in Shenzhen, China' },
    'realme': { year: 2018, note: 'Founded in Shenzhen, China' },
    'huawei': { year: 1987, note: 'Founded in Shenzhen, China' },
    'honor': { year: 2013, note: 'Founded in Shenzhen, China' },
    'nothing': { year: 2020, note: 'Founded in London, UK' },
    'motorola': { year: 1928, note: 'Founded in Chicago, USA' },
    'blackberry': { year: 1984, note: 'Founded in Waterloo, Canada' },
    'nokia': { year: 1865, note: 'Founded in Tampere, Finland' },
    'htc': { year: 1997, note: 'Founded in New Taipei City, Taiwan' },
    'whirlpool': { year: 1911, note: 'Founded in Benton Harbor, USA' },
    'ge appliances': { year: 1892, note: 'Founded in Schenectady, USA' },
    'bosch': { year: 1886, note: 'Founded in Stuttgart, Germany' },
    'miele': { year: 1899, note: 'Founded in Herzebrock-Clarholz, Germany' },
    'philips': { year: 1891, note: 'Founded in Eindhoven, Netherlands' },
    'siemens': { year: 1847, note: 'Founded in Berlin, Germany' },
    'samsung': { year: 1938, note: 'Founded in Daegu, South Korea' },
    'lg electronics': { year: 1958, note: 'Founded in Seoul, South Korea' },
    'electrolux': { year: 1919, note: 'Founded in Stockholm, Sweden' },
    'panasonic': { year: 1918, note: 'Founded in Osaka, Japan' },
    'sony': { year: 1946, note: 'Founded in Tokyo, Japan' },
    'sharp': { year: 1912, note: 'Founded in Tokyo, Japan' },
    'toshiba': { year: 1875, note: 'Founded in Tokyo, Japan' },
    'hitachi': { year: 1910, note: 'Founded in Hitachi City, Japan' },
    'kenwood': { year: 1946, note: 'Founded in London, UK' },
    'delonghi': { year: 1902, note: 'Founded in Treviso, Italy' },
    'braun': { year: 1921, note: 'Founded in Frankfurt, Germany' },
    'kitchenaid': { year: 1919, note: 'Founded in Troy, USA' },
    'maytag': { year: 1893, note: 'Founded in Newton, USA' },
    'frigidaire': { year: 1916, note: 'Founded in Fort Wayne, USA' },
    'haier': { year: 1984, note: 'Founded in Qingdao, China' },
    'midea': { year: 1968, note: 'Founded in Guangdong, China' },
    'gree': { year: 1991, note: 'Founded in Zhuhai, China' },
    'hisense': { year: 1969, note: 'Founded in Qingdao, China' },
    'tcl': { year: 1981, note: 'Founded in Huizhou, China' },
    'beko': { year: 1967, note: 'Founded in Istanbul, Turkey' },
    'gorenje': { year: 1950, note: 'Founded in Velenje, Slovenia' },
    'smeg': { year: 1948, note: 'Founded in Guastalla, Italy' },
    'aeg': { year: 1883, note: 'Founded in Berlin, Germany' },
    'zanussi': { year: 1916, note: 'Founded in Pordenone, Italy' },
    'liebherr': { year: 1949, note: 'Founded in Kirchdorf an der Iller, Germany' },
    'breville': { year: 1932, note: 'Founded in Sydney, Australia' },
    'morphy richards': { year: 1936, note: 'Founded in London, UK' },
    'russell hobbs': { year: 1952, note: 'Founded in Failsworth, UK' },
    'bissell': { year: 1876, note: 'Founded in Grand Rapids, USA' },
    'dyson': { year: 1991, note: 'Founded in Chippenham, UK' },
    'shark ninja': { year: 1998, note: 'Founded in Montreal, Canada' },
    'irobot': { year: 1990, note: 'Founded in Bedford, USA' },

    'tesla': { year: 2003, note: 'Founded in San Carlos, USA' },
    'rivian': { year: 2009, note: 'Founded in Plymouth, USA' },
    'lucid motors': { year: 2007, note: 'Founded in Newark, USA' },
    'nio': { year: 2014, note: 'Founded in Shanghai, China' },
    'xpeng': { year: 2014, note: 'Founded in Guangzhou, China' },
    'byd': { year: 1995, note: 'Founded in Shenzhen, China' },
    'polestar': { year: 1996, note: 'Founded in Gothenburg, Sweden' },
    'fisker': { year: 2016, note: 'Founded in Los Angeles, USA' },
    'rimac': { year: 2009, note: 'Founded in Zagreb, Croatia' },
    'faraday future': { year: 2014, note: 'Founded in Los Angeles, USA' },
    'canoo': { year: 2017, note: 'Founded in Los Angeles, USA' },
    'lordstown': { year: 2018, note: 'Founded in Lordstown, USA' },
    'vinfast': { year: 2017, note: 'Founded in Hanoi, Vietnam' },
    'czinger': { year: 2019, note: 'Founded in Los Angeles, USA' },
    'arrival': { year: 2015, note: 'Founded in London, UK' },
    'sono motors': { year: 2016, note: 'Founded in Munich, Germany' },
    'lightyear': { year: 2016, note: 'Founded in Helmond, Netherlands' },
    'karma automotive': { year: 2014, note: 'Founded in Irvine, USA' },
    'nikola': { year: 2014, note: 'Founded in Phoenix, USA' },
    'proterra': { year: 2004, note: 'Founded in Burlingame, USA' },
    'workhorse': { year: 2007, note: 'Founded in Cincinnati, USA' },
    'lion electric': { year: 2008, note: 'Founded in Saint-Jérôme, Canada' },
    'byton': { year: 2016, note: 'Founded in Nanjing, China' },
    'mullen': { year: 2014, note: 'Founded in Brea, USA' },
    'bollinger motors': { year: 2015, note: 'Founded in Oak Park, USA' },
    'aptera': { year: 2005, note: 'Founded in San Diego, USA' },
    'li auto': { year: 2015, note: 'Founded in Beijing, China' },
    'avatr': { year: 2018, note: 'Founded in Chongqing, China' },
    'zeekr': { year: 2021, note: 'Founded in Hangzhou, China' },
    'lotus technology': { year: 2021, note: 'Founded in Wuhan, China' },
    'smart': { year: 1994, note: 'Founded in Böblingen, Germany' },
    'mini electric': { year: 2019, note: 'Founded in Oxford, UK' },
    'volvo electric': { year: 2019, note: 'Founded in Gothenburg, Sweden' },
    'mercedes-eq': { year: 2019, note: 'Founded in Stuttgart, Germany' },
    'bmw i': { year: 2011, note: 'Founded in Munich, Germany' },
    'audi e-tron': { year: 2018, note: 'Founded in Ingolstadt, Germany' },
    'porsche electric': { year: 2019, note: 'Founded in Stuttgart, Germany' },
    'volkswagen id': { year: 2020, note: 'Founded in Wolfsburg, Germany' },
    'hyundai ioniq': { year: 2016, note: 'Founded in Seoul, South Korea' },
    'kia ev': { year: 2018, note: 'Founded in Seoul, South Korea' },
    'genesis electric': { year: 2021, note: 'Founded in Seoul, South Korea' },
    'mazda electric': { year: 2020, note: 'Founded in Hiroshima, Japan' },
    'honda e': { year: 2019, note: 'Founded in Tokyo, Japan' },
    'toyota bz': { year: 2022, note: 'Founded in Toyota City, Japan' },
    'subaru electric': { year: 2022, note: 'Founded in Tokyo, Japan' },
    'lexus electric': { year: 2019, note: 'Founded in Nagoya, Japan' },
    'infiniti electric': { year: 2021, note: 'Founded in Yokohama, Japan' },
    'acura electric': { year: 2022, note: 'Founded in Tokyo, Japan' },
    'ford electric': { year: 2020, note: 'Founded in Dearborn, USA' },
    'chevrolet electric': { year: 2016, note: 'Founded in Detroit, USA' },
    'cadillac electric': { year: 2022, note: 'Founded in Detroit, USA' },
    'gmc electric': { year: 2021, note: 'Founded in Detroit, USA' }
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
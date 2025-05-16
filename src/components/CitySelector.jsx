import React, { useState } from 'react';
import { Search } from 'lucide-react';

const CitySelector = () => {
  const [search, setSearch] = useState('');
  const [selectedZodiac, setSelectedZodiac] = useState('');

  // Zodiac calculation helper
  const getZodiacSign = (year) => {
    // Basic handling for potential non-numeric or BC years
    const numYear = Number(year);
    if (isNaN(numYear)) return 'N/A';
    const adjustedYear = numYear > 0 ? numYear : 1; // Simple BC handling
    const zodiacSigns = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
      'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
    return zodiacSigns[(adjustedYear - 4) % 12];
  };

  // City founding dates - including capitals and major cities
  // **MODIFIED**: Removed the 'country' key from all entries
  const cityData = {
    // China major cities
    'beijing': { year: 1045, note: 'Capital of China, ancient city' },
    'shanghai': { year: 1291, note: 'Major financial hub' },
    'hong kong': { year: 1842, note: 'Special Administrative Region' },
    'guangzhou': { year: 214, note: 'Historical trading port' },
    'shenzhen': { year: 1979, note: 'Special Economic Zone' },

    // US State Capitals
    'montgomery': { year: 1819, note: 'Capital of Alabama' },
    'juneau': { year: 1881, note: 'Capital of Alaska' },
    'phoenix': { year: 1868, note: 'Capital of Arizona' },
    'little rock': { year: 1821, note: 'Capital of Arkansas' },
    'sacramento': { year: 1839, note: 'Capital of California' },
    'denver': { year: 1858, note: 'Capital of Colorado' },
    'hartford': { year: 1635, note: 'Capital of Connecticut' },
    'dover': { year: 1683, note: 'Capital of Delaware' },
    'tallahassee': { year: 1824, note: 'Capital of Florida' },
    'atlanta': { year: 1837, note: 'Capital of Georgia' },
    'honolulu': { year: 1795, note: 'Capital of Hawaii' },
    'boise': { year: 1863, note: 'Capital of Idaho' },
    'springfield': { year: 1821, note: 'Capital of Illinois' },
    'indianapolis': { year: 1821, note: 'Capital of Indiana' },
    'des moines': { year: 1843, note: 'Capital of Iowa' },
    'topeka': { year: 1854, note: 'Capital of Kansas' },
    'frankfort': { year: 1786, note: 'Capital of Kentucky' },
    'baton rouge': { year: 1721, note: 'Capital of Louisiana' },
    'augusta': { year: 1628, note: 'Capital of Maine' },
    'annapolis': { year: 1649, note: 'Capital of Maryland' },
    'boston': { year: 1630, note: 'Capital of Massachusetts' },
    'lansing': { year: 1847, note: 'Capital of Michigan' },
    'saint paul': { year: 1849, note: 'Capital of Minnesota' },
    'jackson': { year: 1821, note: 'Capital of Mississippi' },
    'jefferson city': { year: 1821, note: 'Capital of Missouri' },
    'helena': { year: 1864, note: 'Capital of Montana' },
    'lincoln': { year: 1856, note: 'Capital of Nebraska' },
    'carson city': { year: 1858, note: 'Capital of Nevada' },
    'concord': { year: 1725, note: 'Capital of New Hampshire' },
    'trenton': { year: 1679, note: 'Capital of New Jersey' },
    'santa fe': { year: 1610, note: 'Capital of New Mexico' },
    'albany': { year: 1614, note: 'Capital of New York' },
    'raleigh': { year: 1792, note: 'Capital of North Carolina' },
    'bismarck': { year: 1872, note: 'Capital of North Dakota' },
    'columbus': { year: 1812, note: 'Capital of Ohio' },
    'oklahoma city': { year: 1889, note: 'Capital of Oklahoma' },
    'salem': { year: 1842, note: 'Capital of Oregon' },
    'harrisburg': { year: 1791, note: 'Capital of Pennsylvania' },
    'providence': { year: 1636, note: 'Capital of Rhode Island' },
    'columbia': { year: 1786, note: 'Capital of South Carolina' },
    'pierre': { year: 1880, note: 'Capital of South Dakota' },
    'nashville': { year: 1779, note: 'Capital of Tennessee' },
    'austin': { year: 1839, note: 'Capital of Texas' },
    'salt lake city': { year: 1847, note: 'Capital of Utah' },
    'montpelier': { year: 1805, note: 'Capital of Vermont' },
    'richmond': { year: 1737, note: 'Capital of Virginia' },
    'olympia': { year: 1850, note: 'Capital of Washington' },
    'charleston': { year: 1788, note: 'Capital of West Virginia' },
    'madison': { year: 1836, note: 'Capital of Wisconsin' },
    'cheyenne': { year: 1867, note: 'Capital of Wyoming' },

    // Canadian Provincial Capitals
    'edmonton': { year: 1795, note: 'Capital of Alberta' },
    'winnipeg': { year: 1738, note: 'Capital of Manitoba' },
    'fredericton': { year: 1785, note: 'Capital of New Brunswick' },
    'st. johns': { year: 1583, note: 'Capital of Newfoundland and Labrador' },
    'halifax': { year: 1749, note: 'Capital of Nova Scotia' },
    'toronto': { year: 1793, note: 'Capital of Ontario' },
    'charlottetown': { year: 1764, note: 'Capital of Prince Edward Island' },
    'quebec city': { year: 1608, note: 'Capital of Quebec' },
    'regina': { year: 1882, note: 'Capital of Saskatchewan' },
    'yellowknife': { year: 1934, note: 'Capital of Northwest Territories' },
    'whitehorse': { year: 1898, note: 'Capital of Yukon' },
    'iqaluit': { year: 1942, note: 'Capital of Nunavut' },

    // Mexican State Capitals
    'mexicali': { year: 1903, note: 'Capital of Baja California' },
    'la paz': { year: 1535, note: 'Capital of Baja California Sur' },
    'campeche': { year: 1540, note: 'Capital of Campeche' },
    'tuxtla gutierrez': { year: 1892, note: 'Capital of Chiapas' },
    'chihuahua': { year: 1709, note: 'Capital of Chihuahua' },
    'saltillo': { year: 1577, note: 'Capital of Coahuila' },
    'colima': { year: 1527, note: 'Capital of Colima' },
    'durango': { year: 1563, note: 'Capital of Durango' },
    'guanajuato': { year: 1548, note: 'Capital of Guanajuato' },
    'chilpancingo': { year: 1591, note: 'Capital of Guerrero' },
    'pachuca': { year: 1534, note: 'Capital of Hidalgo' },
    'guadalajara': { year: 1542, note: 'Capital of Jalisco' },
    'toluca': { year: 1522, note: 'Capital of State of Mexico' },
    'morelia': { year: 1541, note: 'Capital of Michoacán' },
    'cuernavaca': { year: 1529, note: 'Capital of Morelos' },
    'tepic': { year: 1531, note: 'Capital of Nayarit' },
    'monterrey': { year: 1596, note: 'Capital of Nuevo León' },
    'oaxaca': { year: 1532, note: 'Capital of Oaxaca' },
    'puebla': { year: 1531, note: 'Capital of Puebla' },
    'querétaro': { year: 1531, note: 'Capital of Querétaro' },
    'chetumal': { year: 1898, note: 'Capital of Quintana Roo' },
    'san luis potosi': { year: 1592, note: 'Capital of San Luis Potosí' },
    'culiacan': { year: 1531, note: 'Capital of Sinaloa' },
    'hermosillo': { year: 1700, note: 'Capital of Sonora' },
    'villahermosa': { year: 1564, note: 'Capital of Tabasco' },
    'ciudad victoria': { year: 1750, note: 'Capital of Tamaulipas' },
    'tlaxcala': { year: 1525, note: 'Capital of Tlaxcala' },
    'xalapa': { year: 1313, note: 'Capital of Veracruz' },
    'merida': { year: 1542, note: 'Capital of Yucatán' },
    'zacatecas': { year: 1546, note: 'Capital of Zacatecas' },

    // UK major cities
    'london': { year: 47, note: 'Capital of UK, Roman foundation' },
    'edinburgh': { year: 638, note: 'Capital of Scotland' },
    'cardiff': { year: 75, note: 'Capital of Wales' },
    'belfast': { year: 1177, note: 'Capital of Northern Ireland' },
    'manchester': { year: 79, note: 'Major industrial city' },

    // Japan major cities
    'tokyo': { year: 1457, note: 'Capital of Japan, formerly Edo' },
    'osaka': { year: 645, note: 'Historical commercial center' },
    'kyoto': { year: 794, note: 'Former imperial capital' },
    'yokohama': { year: 1859, note: 'Major port city' },
    'sapporo': { year: 1868, note: 'Capital of Hokkaido' },

    // More world capitals and major cities
    'kabul': { year: 1776, note: 'Capital of Afghanistan' },
    'tirana': { year: 1920, note: 'Capital of Albania' },
    'algiers': { year: 1962, note: 'Capital of Algeria' },
    'andorra-la-vella': { year: 1278, note: 'Capital of Andorra' },
    'luanda': { year: 1975, note: 'Capital of Angola' },
    'saint-johns': { year: 1981, note: 'Capital of Antigua and Barbuda' },
    'buenos-aires': { year: 1776, note: 'Capital of Argentina' },
    'yerevan': { year: 1918, note: 'Capital of Armenia' },
    'canberra': { year: 1927, note: 'Capital of Australia' },
    'vienna': { year: 1276, note: 'Capital of Austria' },
    'baku': { year: 1918, note: 'Capital of Azerbaijan' },
    'nassau': { year: 1729, note: 'Capital of Bahamas' },
    'manama': { year: 1783, note: 'Capital of Bahrain' },
    'dhaka': { year: 1971, note: 'Capital of Bangladesh' },
    'bridgetown': { year: 1628, note: 'Capital of Barbados' },
    'minsk': { year: 1919, note: 'Capital of Belarus' },
    'brussels': { year: 1830, note: 'Capital of Belgium' },
    'belmopan': { year: 1970, note: 'Capital of Belize' },
    'porto-novo': { year: 1960, note: 'Capital of Benin' },
    'thimphu': { year: 1907, note: 'Capital of Bhutan' },
    'la-paz': { year: 1898, note: 'Administrative Capital of Bolivia' },
    'sucre': { year: 1825, note: 'Constitutional Capital of Bolivia' },
    'sarajevo': { year: 1992, note: 'Capital of Bosnia and Herzegovina' },
    'gaborone': { year: 1966, note: 'Capital of Botswana' },
    'brasilia': { year: 1960, note: 'Capital of Brazil' },
    'bandar-seri-begawan': { year: 1984, note: 'Capital of Brunei' },
    'sofia': { year: 1879, note: 'Capital of Bulgaria' },
    'ouagadougou': { year: 1960, note: 'Capital of Burkina Faso' },
    'gitega': { year: 2019, note: 'Capital of Burundi' },
    'phnom-penh': { year: 1865, note: 'Capital of Cambodia' },
    'yaounde': { year: 1960, note: 'Capital of Cameroon' },
    'ottawa': { year: 1857, note: 'Capital of Canada' },
    'praia': { year: 1975, note: 'Capital of Cape Verde' },
    'bangui': { year: 1960, note: 'Capital of Central African Republic' },
    'ndjamena': { year: 1960, note: 'Capital of Chad' },
    'santiago': { year: 1818, note: 'Capital of Chile' },
    'bogota': { year: 1819, note: 'Capital of Colombia' },
    'moroni': { year: 1975, note: 'Capital of Comoros' },
    'brazzaville': { year: 1960, note: 'Capital of Republic of the Congo' },
    'kinshasa': { year: 1960, note: 'Capital of Democratic Republic of the Congo' },
    'san-jose': { year: 1823, note: 'Capital of Costa Rica' },
    'yamoussoukro': { year: 1983, note: 'Capital of Ivory Coast' },
    'zagreb': { year: 1991, note: 'Capital of Croatia' },
    'havana': { year: 1902, note: 'Capital of Cuba' },
    'nicosia': { year: 1960, note: 'Capital of Cyprus' },
    'prague': { year: 1993, note: 'Capital of Czech Republic' },
    'copenhagen': { year: 1443, note: 'Capital of Denmark' },
    'djibouti': { year: 1977, note: 'Capital of Djibouti' },
    'roseau': { year: 1978, note: 'Capital of Dominica' },
    'santo-domingo': { year: 1844, note: 'Capital of Dominican Republic' },
    'dili': { year: 2002, note: 'Capital of East Timor' },
    'quito': { year: 1830, note: 'Capital of Ecuador' },
    'cairo': { year: 969, note: 'Capital of Egypt' },
    'san-salvador': { year: 1821, note: 'Capital of El Salvador' },
    'malabo': { year: 1968, note: 'Capital of Equatorial Guinea' },
    'asmara': { year: 1993, note: 'Capital of Eritrea' },
    'tallinn': { year: 1991, note: 'Capital of Estonia' },
    'mbabane': { year: 1902, note: 'Capital of Eswatini' },
    'addis-ababa': { year: 1889, note: 'Capital of Ethiopia' },
    'suva': { year: 1970, note: 'Capital of Fiji' },
    'helsinki': { year: 1917, note: 'Capital of Finland' },
    'paris': { year: 508, note: 'Capital of France' },
    'libreville': { year: 1960, note: 'Capital of Gabon' },
    'banjul': { year: 1965, note: 'Capital of The Gambia' },
    'tbilisi': { year: 1991, note: 'Capital of Georgia' },
    'berlin': { year: 1991, note: 'Capital of Germany' },
    'accra': { year: 1957, note: 'Capital of Ghana' },
    'athens': { year: 1834, note: 'Capital of Greece' },
    'saint-georges': { year: 1974, note: 'Capital of Grenada' },
    'guatemala-city': { year: 1776, note: 'Capital of Guatemala' },
    'conakry': { year: 1958, note: 'Capital of Guinea' },
    'bissau': { year: 1974, note: 'Capital of Guinea-Bissau' },
    'georgetown': { year: 1966, note: 'Capital of Guyana' },
    'port-au-prince': { year: 1804, note: 'Capital of Haiti' },
    'tegucigalpa': { year: 1880, note: 'Capital of Honduras' },
    'budapest': { year: 1873, note: 'Capital of Hungary' },
    'reykjavik': { year: 1944, note: 'Capital of Iceland' },
    'new-delhi': { year: 1931, note: 'Capital of India' },
    'jakarta': { year: 1949, note: 'Capital of Indonesia' },
    'tehran': { year: 1796, note: 'Capital of Iran' },
    'baghdad': { year: 762, note: 'Capital of Iraq' },
    'dublin': { year: 1922, note: 'Capital of Ireland' },
    'jerusalem': { year: 1950, note: 'Claimed Capital of Israel' },
    'rome': { year: 1871, note: 'Capital of Italy' },
    'kingston': { year: 1962, note: 'Capital of Jamaica' },
    'amman': { year: 1946, note: 'Capital of Jordan' },
    'nur-sultan': { year: 1997, note: 'Capital of Kazakhstan' },
    'nairobi': { year: 1963, note: 'Capital of Kenya' },
    'tarawa': { year: 1979, note: 'Capital of Kiribati' },
    'pristina': { year: 2008, note: 'Capital of Kosovo' },
    'kuwait-city': { year: 1961, note: 'Capital of Kuwait' },
    'bishkek': { year: 1991, note: 'Capital of Kyrgyzstan' },
    'vientiane': { year: 1953, note: 'Capital of Laos' },
    'riga': { year: 1991, note: 'Capital of Latvia' },
    'beirut': { year: 1943, note: 'Capital of Lebanon' },
    'maseru': { year: 1966, note: 'Capital of Lesotho' },
    'monrovia': { year: 1847, note: 'Capital of Liberia' },
    'tripoli': { year: 1951, note: 'Capital of Libya' },
    'vaduz': { year: 1719, note: 'Capital of Liechtenstein' },
    'vilnius': { year: 1991, note: 'Capital of Lithuania' },
    'luxembourg-city': { year: 1867, note: 'Capital of Luxembourg' },
    'antananarivo': { year: 1960, note: 'Capital of Madagascar' },
    'lilongwe': { year: 1975, note: 'Capital of Malawi' },
    'kuala-lumpur': { year: 1957, note: 'Capital of Malaysia' },
    'male': { year: 1965, note: 'Capital of Maldives' },
    'bamako': { year: 1960, note: 'Capital of Mali' },
    'valletta': { year: 1571, note: 'Capital of Malta' },
    'majuro': { year: 1979, note: 'Capital of Marshall Islands' },
    'nouakchott': { year: 1960, note: 'Capital of Mauritania' },
    'port-louis': { year: 1968, note: 'Capital of Mauritius' },
    'mexico-city': { year: 1821, note: 'Capital of Mexico' },
    'palikir': { year: 1989, note: 'Capital of Micronesia' },
    'chisinau': { year: 1991, note: 'Capital of Moldova' },
    'monaco': { year: 1297, note: 'Capital of Monaco' },
    'ulaanbaatar': { year: 1924, note: 'Capital of Mongolia' },
    'podgorica': { year: 2006, note: 'Capital of Montenegro' },
    'rabat': { year: 1912, note: 'Capital of Morocco' },
    'maputo': { year: 1975, note: 'Capital of Mozambique' },
    'naypyidaw': { year: 2006, note: 'Capital of Myanmar' },
    'windhoek': { year: 1990, note: 'Capital of Namibia' },
    'yaren': { year: 1968, note: 'Capital of Nauru' },
    'kathmandu': { year: 1768, note: 'Capital of Nepal' },
    'amsterdam': { year: 1814, note: 'Capital of Netherlands' },
    'wellington': { year: 1865, note: 'Capital of New Zealand' },
    'managua': { year: 1852, note: 'Capital of Nicaragua' },
    'niamey': { year: 1960, note: 'Capital of Niger' },
    'abuja': { year: 1991, note: 'Capital of Nigeria' },
    'pyongyang': { year: 1948, note: 'Capital of North Korea' },
    'skopje': { year: 1991, note: 'Capital of North Macedonia' },
    'oslo': { year: 1048, note: 'Capital of Norway' },
    'muscat': { year: 1507, note: 'Capital of Oman' },
    'islamabad': { year: 1960, note: 'Capital of Pakistan' },
    'ngerulmud': { year: 2006, note: 'Capital of Palau' },
    'panama city': { year: 1519, note: 'Capital of Panama' },
    'port moresby': { year: 1873, note: 'Capital of Papua New Guinea' },
    'asunción': { year: 1537, note: 'Capital of Paraguay' },
    'lima': { year: 1535, note: 'Capital of Peru' },
    'manila': { year: 1571, note: 'Capital of Philippines' },
    'warsaw': { year: 1300, note: 'Capital of Poland' },
    'lisbon': { year: 1256, note: 'Capital of Portugal' },
    'doha': { year: 1825, note: 'Capital of Qatar' },
    'bucharest': { year: 1459, note: 'Capital of Romania' },
    'moscow': { year: 1147, note: 'Capital of Russia' },
    'kigali': { year: 1907, note: 'Capital of Rwanda' },
    'basseterre': { year: 1627, note: 'Capital of Saint Kitts and Nevis' },
    'castries': { year: 1650, note: 'Capital of Saint Lucia' },
    'kingstown': { year: 1722, note: 'Capital of Saint Vincent and the Grenadines' },
    'apia': { year: 1850, note: 'Capital of Samoa' },
    'san marino': { year: 301, note: 'Capital of San Marino' },
    'são tomé': { year: 1485, note: 'Capital of São Tomé and Príncipe' },
    'riyadh': { year: 1737, note: 'Capital of Saudi Arabia' },
    'dakar': { year: 1857, note: 'Capital of Senegal' },
    'belgrade': { year: 279, note: 'Capital of Serbia' },
    'victoria': { year: 1778, note: 'Capital of Seychelles' },
    'freetown': { year: 1792, note: 'Capital of Sierra Leone' },
    'singapore': { year: 1819, note: 'Capital of Singapore' },
    'bratislava': { year: 907, note: 'Capital of Slovakia' },
    'ljubljana': { year: 1144, note: 'Capital of Slovenia' },
    'honiara': { year: 1952, note: 'Capital of Solomon Islands' },
    'mogadishu': { year: 900, note: 'Capital of Somalia' },
    'pretoria': { year: 1855, note: 'Capital of South Africa' },
    'juba': { year: 1922, note: 'Capital of South Sudan' },
    'madrid': { year: 865, note: 'Capital of Spain' },
    'colombo': { year: 1505, note: 'Capital of Sri Lanka' },
    'khartoum': { year: 1821, note: 'Capital of Sudan' },
    'paramaribo': { year: 1613, note: 'Capital of Suriname' },
    'stockholm': { year: 1252, note: 'Capital of Sweden' },
    'bern': { year: 1191, note: 'Capital of Switzerland' },
    'damascus': { year: -11000, note: 'Capital of Syria' },
    'dushanbe': { year: 1924, note: 'Capital of Tajikistan' },
    'dodoma': { year: 1907, note: 'Capital of Tanzania' },
    'bangkok': { year: 1782, note: 'Capital of Thailand' },
    'lomé': { year: 1897, note: 'Capital of Togo' },
    'nuku\'alofa': { year: 1875, note: 'Capital of Tonga' },
    'port of spain': { year: 1757, note: 'Capital of Trinidad and Tobago' },
    'tunis': { year: 698, note: 'Capital of Tunisia' },
    'ankara': { year: 1000, note: 'Capital of Turkey' },
    'ashgabat': { year: 1881, note: 'Capital of Turkmenistan' },
    'funafuti': { year: 1972, note: 'Capital of Tuvalu' },
    'kampala': { year: 1890, note: 'Capital of Uganda' },
    'kyiv': { year: 482, note: 'Capital of Ukraine' },
    'abu dhabi': { year: 1761, note: 'Capital of United Arab Emirates' },
    'montevideo': { year: 1724, note: 'Capital of Uruguay' },
    'tashkent': { year: 200, note: 'Capital of Uzbekistan' },
    'port vila': { year: 1906, note: 'Capital of Vanuatu' },
    'vatican city': { year: 1929, note: 'Capital of Vatican City' },
    'caracas': { year: 1567, note: 'Capital of Venezuela' },
    'hanoi': { year: 1010, note: 'Capital of Vietnam' },
    'sana\'a': { year: 600, note: 'Capital of Yemen' },
    'lusaka': { year: 1905, note: 'Capital of Zambia' },
    'harare': { year: 1890, note: 'Capital of Zimbabwe' }
  };


  // Get zodiac sign for each city
  const cityZodiacs = Object.entries(cityData).reduce((acc, [city, data]) => {
    // Ensure year is treated as a number for calculation
    const year = Number(data.year);
    // Check if year is valid before calculating sign
    if (!isNaN(year)) {
       const sign = getZodiacSign(year);
       if (!acc[sign]) acc[sign] = [];
       acc[sign].push(city);
    }
    return acc;
  }, {});

  // All zodiac signs for the filter
  const zodiacSigns = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
    'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];

  // Filter cities based on search and selected zodiac
  const getFilteredCities = () => {
    let filtered = Object.keys(cityData);

    // **MODIFIED**: Search logic now checks city name OR the 'note' field
    if (search) {
      filtered = filtered.filter(city => {
        const cityEntry = cityData[city];
        if (!cityEntry) return false; // Skip if data somehow missing

        const searchTerm = search.toLowerCase();
        const cityName = city.toLowerCase();
        // Check if note exists and is a string before searching
        const noteContent = typeof cityEntry.note === 'string' ? cityEntry.note.toLowerCase() : '';

        return cityName.includes(searchTerm) || noteContent.includes(searchTerm);
      });
    }

    // Apply zodiac filter to the potentially search-filtered list
    if (selectedZodiac) {
      const zodiacCities = cityZodiacs[selectedZodiac] || [];
      // Filter the current list to only include cities matching the selected zodiac
      filtered = filtered.filter(city => zodiacCities.includes(city));
    }

    return filtered.sort(); // Sort results alphabetically
  };

  const filteredCities = getFilteredCities(); // Calculate once

  return (
    // Using the original layout structure from your code
    <div className="w-full max-w-md mx-auto p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">
          city zodiac finder
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
            // **MODIFIED**: Placeholder text to reflect searching notes too
            placeholder="Search for city or description..."
            className="w-full p-2 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>

        {/* Results Display - Original Structure */}
        <div className="mt-4 max-h-[60vh] overflow-y-auto"> {/* Added scroll */}
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => {
              const data = cityData[city];
              if (!data) return null; // Safety check

              const year = Number(data.year);
              const zodiacSign = !isNaN(year) ? getZodiacSign(year) : 'N/A';
              const displayYear = !isNaN(year) ? year : 'N/A';

              return (
                <div key={city} className="p-2 border-b flex justify-between items-center">
                  {/* Left side: City Name */}
                  <span className="capitalize font-medium text-gray-800">{city}</span>

                  {/* Right side: Zodiac, Year, Note */}
                  <div className="text-right">
                    <span className="text-sm text-gray-600">
                      {zodiacSign}
                      {' '}
                      ({displayYear})
                    </span>
                    <br />
                    {/* **MODIFIED**: Display only the note */}
                    <span className="text-xs text-gray-400">
                      {data.note || ''} {/* Display note, fallback to empty */}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
             <div className="p-4 text-center text-gray-500">
               No cities match your criteria.
             </div>
          )}
        </div>

        {/* Selected Zodiac Info */}
        {selectedZodiac && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center">
            <h3 className="font-semibold mb-2">
              {selectedZodiac} Cities: {(cityZodiacs[selectedZodiac] || []).length} found
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default CitySelector;

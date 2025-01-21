import React, { useState } from 'react';
import { Search } from 'lucide-react';

const CitySelector = () => {
  const [search, setSearch] = useState('');
  const [selectedZodiac, setSelectedZodiac] = useState('');

  // Zodiac calculation helper
  const getZodiacSign = (year) => {
    const zodiacSigns = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
      'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
    return zodiacSigns[(year - 4) % 12];
  };

  // City founding dates - including capitals and major cities
  const cityData = {
    // China major cities
    'beijing': { year: 1045, note: 'Capital of China, ancient city', country: 'China' },
    'shanghai': { year: 1291, note: 'Major financial hub', country: 'China' },
    'hong kong': { year: 1842, note: 'Special Administrative Region', country: 'China' },
    'guangzhou': { year: 214, note: 'Historical trading port', country: 'China' },
    'shenzhen': { year: 1979, note: 'Special Economic Zone', country: 'China' },

    // US State Capitals
    'montgomery': { year: 1819, note: 'Capital of Alabama', country: 'USA' },
    'juneau': { year: 1881, note: 'Capital of Alaska', country: 'USA' },
    'phoenix': { year: 1868, note: 'Capital of Arizona', country: 'USA' },
    'little rock': { year: 1821, note: 'Capital of Arkansas', country: 'USA' },
    'sacramento': { year: 1839, note: 'Capital of California', country: 'USA' },
    'denver': { year: 1858, note: 'Capital of Colorado', country: 'USA' },
    'hartford': { year: 1635, note: 'Capital of Connecticut', country: 'USA' },
    'dover': { year: 1683, note: 'Capital of Delaware', country: 'USA' },
    'tallahassee': { year: 1824, note: 'Capital of Florida', country: 'USA' },
    'atlanta': { year: 1837, note: 'Capital of Georgia', country: 'USA' },
    'honolulu': { year: 1795, note: 'Capital of Hawaii', country: 'USA' },
    'boise': { year: 1863, note: 'Capital of Idaho', country: 'USA' },
    'springfield': { year: 1821, note: 'Capital of Illinois', country: 'USA' },
    'indianapolis': { year: 1821, note: 'Capital of Indiana', country: 'USA' },
    'des moines': { year: 1843, note: 'Capital of Iowa', country: 'USA' },
    'topeka': { year: 1854, note: 'Capital of Kansas', country: 'USA' },
    'frankfort': { year: 1786, note: 'Capital of Kentucky', country: 'USA' },
    'baton rouge': { year: 1721, note: 'Capital of Louisiana', country: 'USA' },
    'augusta': { year: 1628, note: 'Capital of Maine', country: 'USA' },
    'annapolis': { year: 1649, note: 'Capital of Maryland', country: 'USA' },
    'boston': { year: 1630, note: 'Capital of Massachusetts', country: 'USA' },
    'lansing': { year: 1847, note: 'Capital of Michigan', country: 'USA' },
    'saint paul': { year: 1849, note: 'Capital of Minnesota', country: 'USA' },
    'jackson': { year: 1821, note: 'Capital of Mississippi', country: 'USA' },
    'jefferson city': { year: 1821, note: 'Capital of Missouri', country: 'USA' },
    'helena': { year: 1864, note: 'Capital of Montana', country: 'USA' },
    'lincoln': { year: 1856, note: 'Capital of Nebraska', country: 'USA' },
    'carson city': { year: 1858, note: 'Capital of Nevada', country: 'USA' },
    'concord': { year: 1725, note: 'Capital of New Hampshire', country: 'USA' },
    'trenton': { year: 1679, note: 'Capital of New Jersey', country: 'USA' },
    'santa fe': { year: 1610, note: 'Capital of New Mexico', country: 'USA' },
    'albany': { year: 1614, note: 'Capital of New York', country: 'USA' },
    'raleigh': { year: 1792, note: 'Capital of North Carolina', country: 'USA' },
    'bismarck': { year: 1872, note: 'Capital of North Dakota', country: 'USA' },
    'columbus': { year: 1812, note: 'Capital of Ohio', country: 'USA' },
    'oklahoma city': { year: 1889, note: 'Capital of Oklahoma', country: 'USA' },
    'salem': { year: 1842, note: 'Capital of Oregon', country: 'USA' },
    'harrisburg': { year: 1791, note: 'Capital of Pennsylvania', country: 'USA' },
    'providence': { year: 1636, note: 'Capital of Rhode Island', country: 'USA' },
    'columbia': { year: 1786, note: 'Capital of South Carolina', country: 'USA' },
    'pierre': { year: 1880, note: 'Capital of South Dakota', country: 'USA' },
    'nashville': { year: 1779, note: 'Capital of Tennessee', country: 'USA' },
    'austin': { year: 1839, note: 'Capital of Texas', country: 'USA' },
    'salt lake city': { year: 1847, note: 'Capital of Utah', country: 'USA' },
    'montpelier': { year: 1805, note: 'Capital of Vermont', country: 'USA' },
    'richmond': { year: 1737, note: 'Capital of Virginia', country: 'USA' },
    'olympia': { year: 1850, note: 'Capital of Washington', country: 'USA' },
    'charleston': { year: 1788, note: 'Capital of West Virginia', country: 'USA' },
    'madison': { year: 1836, note: 'Capital of Wisconsin', country: 'USA' },
    'cheyenne': { year: 1867, note: 'Capital of Wyoming', country: 'USA' },

    // Canadian Provincial Capitals
    'edmonton': { year: 1795, note: 'Capital of Alberta', country: 'Canada' },
    'victoria': { year: 1843, note: 'Capital of British Columbia', country: 'Canada' },
    'winnipeg': { year: 1738, note: 'Capital of Manitoba', country: 'Canada' },
    'fredericton': { year: 1785, note: 'Capital of New Brunswick', country: 'Canada' },
    'st. johns': { year: 1583, note: 'Capital of Newfoundland and Labrador', country: 'Canada' },
    'halifax': { year: 1749, note: 'Capital of Nova Scotia', country: 'Canada' },
    'toronto': { year: 1793, note: 'Capital of Ontario', country: 'Canada' },
    'charlottetown': { year: 1764, note: 'Capital of Prince Edward Island', country: 'Canada' },
    'quebec city': { year: 1608, note: 'Capital of Quebec', country: 'Canada' },
    'regina': { year: 1882, note: 'Capital of Saskatchewan', country: 'Canada' },
    'yellowknife': { year: 1934, note: 'Capital of Northwest Territories', country: 'Canada' },
    'whitehorse': { year: 1898, note: 'Capital of Yukon', country: 'Canada' },
    'iqaluit': { year: 1942, note: 'Capital of Nunavut', country: 'Canada' },

    // Mexican State Capitals
    'mexicali': { year: 1903, note: 'Capital of Baja California', country: 'Mexico' },
    'la paz': { year: 1535, note: 'Capital of Baja California Sur', country: 'Mexico' },
    'campeche': { year: 1540, note: 'Capital of Campeche', country: 'Mexico' },
    'tuxtla gutierrez': { year: 1892, note: 'Capital of Chiapas', country: 'Mexico' },
    'chihuahua': { year: 1709, note: 'Capital of Chihuahua', country: 'Mexico' },
    'saltillo': { year: 1577, note: 'Capital of Coahuila', country: 'Mexico' },
    'colima': { year: 1527, note: 'Capital of Colima', country: 'Mexico' },
    'durango': { year: 1563, note: 'Capital of Durango', country: 'Mexico' },
    'guanajuato': { year: 1548, note: 'Capital of Guanajuato', country: 'Mexico' },
    'chilpancingo': { year: 1591, note: 'Capital of Guerrero', country: 'Mexico' },
    'pachuca': { year: 1534, note: 'Capital of Hidalgo', country: 'Mexico' },
    'guadalajara': { year: 1542, note: 'Capital of Jalisco', country: 'Mexico' },
    'toluca': { year: 1522, note: 'Capital of State of Mexico', country: 'Mexico' },
    'morelia': { year: 1541, note: 'Capital of Michoacán', country: 'Mexico' },
    'cuernavaca': { year: 1529, note: 'Capital of Morelos', country: 'Mexico' },
    'tepic': { year: 1531, note: 'Capital of Nayarit', country: 'Mexico' },
    'monterrey': { year: 1596, note: 'Capital of Nuevo León', country: 'Mexico' },
    'oaxaca': { year: 1532, note: 'Capital of Oaxaca', country: 'Mexico' },
    'puebla': { year: 1531, note: 'Capital of Puebla', country: 'Mexico' },
    'querétaro': { year: 1531, note: 'Capital of Querétaro', country: 'Mexico' },
    'chetumal': { year: 1898, note: 'Capital of Quintana Roo', country: 'Mexico' },
    'san luis potosi': { year: 1592, note: 'Capital of San Luis Potosí', country: 'Mexico' },
    'culiacan': { year: 1531, note: 'Capital of Sinaloa', country: 'Mexico' },
    'hermosillo': { year: 1700, note: 'Capital of Sonora', country: 'Mexico' },
    'villahermosa': { year: 1564, note: 'Capital of Tabasco', country: 'Mexico' },
    'ciudad victoria': { year: 1750, note: 'Capital of Tamaulipas', country: 'Mexico' },
    'tlaxcala': { year: 1525, note: 'Capital of Tlaxcala', country: 'Mexico' },
    'xalapa': { year: 1313, note: 'Capital of Veracruz', country: 'Mexico' },
    'merida': { year: 1542, note: 'Capital of Yucatán', country: 'Mexico' },
    'zacatecas': { year: 1546, note: 'Capital of Zacatecas', country: 'Mexico' },

    // UK major cities
    'london': { year: 47, note: 'Capital of UK, Roman foundation', country: 'UK' },
    'edinburgh': { year: 638, note: 'Capital of Scotland', country: 'UK' },
    'cardiff': { year: 75, note: 'Capital of Wales', country: 'UK' },
    'belfast': { year: 1177, note: 'Capital of Northern Ireland', country: 'UK' },
    'manchester': { year: 79, note: 'Major industrial city', country: 'UK' },

    // Japan major cities
    'tokyo': { year: 1457, note: 'Capital of Japan, formerly Edo', country: 'Japan' },
    'osaka': { year: 645, note: 'Historical commercial center', country: 'Japan' },
    'kyoto': { year: 794, note: 'Former imperial capital', country: 'Japan' },
    'yokohama': { year: 1859, note: 'Major port city', country: 'Japan' },
    'sapporo': { year: 1868, note: 'Capital of Hokkaido', country: 'Japan' },

    // More world capitals and major cities
    'kabul': { year: 1776, note: 'Capital of Afghanistan', country: 'Afghanistan' },
    'tirana': { year: 1920, note: 'Capital of Albania', country: 'Albania' },
    'algiers': { year: 1962, note: 'Capital of Algeria', country: 'Algeria' },
    'andorra-la-vella': { year: 1278, note: 'Capital of Andorra', country: 'Andorra' },
    'luanda': { year: 1975, note: 'Capital of Angola', country: 'Angola' },
    'saint-johns': { year: 1981, note: 'Capital of Antigua and Barbuda', country: 'Antigua and Barbuda' },
    'buenos-aires': { year: 1776, note: 'Capital of Argentina', country: 'Argentina' },
    'yerevan': { year: 1918, note: 'Capital of Armenia', country: 'Armenia' },
    'canberra': { year: 1927, note: 'Capital of Australia', country: 'Australia' },
    'vienna': { year: 1276, note: 'Capital of Austria', country: 'Austria' },
    'baku': { year: 1918, note: 'Capital of Azerbaijan', country: 'Azerbaijan' },
    'nassau': { year: 1729, note: 'Capital of Bahamas', country: 'Bahamas' },
    'manama': { year: 1783, note: 'Capital of Bahrain', country: 'Bahrain' },
    'dhaka': { year: 1971, note: 'Capital of Bangladesh', country: 'Bangladesh' },
    'bridgetown': { year: 1628, note: 'Capital of Barbados', country: 'Barbados' },
    'minsk': { year: 1919, note: 'Capital of Belarus', country: 'Belarus' },
    'brussels': { year: 1830, note: 'Capital of Belgium', country: 'Belgium' },
    'belmopan': { year: 1970, note: 'Capital of Belize', country: 'Belize' },
    'porto-novo': { year: 1960, note: 'Capital of Benin', country: 'Benin' },
    'thimphu': { year: 1907, note: 'Capital of Bhutan', country: 'Bhutan' },
    'la-paz': { year: 1898, note: 'Administrative Capital of Bolivia', country: 'Bolivia' },
    'sucre': { year: 1825, note: 'Constitutional Capital of Bolivia', country: 'Bolivia' },
    'sarajevo': { year: 1992, note: 'Capital of Bosnia and Herzegovina', country: 'Bosnia and Herzegovina' },
    'gaborone': { year: 1966, note: 'Capital of Botswana', country: 'Botswana' },
    'brasilia': { year: 1960, note: 'Capital of Brazil', country: 'Brazil' },
    'bandar-seri-begawan': { year: 1984, note: 'Capital of Brunei', country: 'Brunei' },
    'sofia': { year: 1879, note: 'Capital of Bulgaria', country: 'Bulgaria' },
    'ouagadougou': { year: 1960, note: 'Capital of Burkina Faso', country: 'Burkina Faso' },
    'gitega': { year: 2019, note: 'Capital of Burundi', country: 'Burundi' },
    'phnom-penh': { year: 1865, note: 'Capital of Cambodia', country: 'Cambodia' },
    'yaounde': { year: 1960, note: 'Capital of Cameroon', country: 'Cameroon' },
    'ottawa': { year: 1857, note: 'Capital of Canada', country: 'Canada' },
    'praia': { year: 1975, note: 'Capital of Cape Verde', country: 'Cape Verde' },
    'bangui': { year: 1960, note: 'Capital of Central African Republic', country: 'Central African Republic' },
    'ndjamena': { year: 1960, note: 'Capital of Chad', country: 'Chad' },
    'santiago': { year: 1818, note: 'Capital of Chile', country: 'Chile' },
    'beijing': { year: 1949, note: 'Capital of China', country: 'China' },
    'bogota': { year: 1819, note: 'Capital of Colombia', country: 'Colombia' },
    'moroni': { year: 1975, note: 'Capital of Comoros', country: 'Comoros' },
    'brazzaville': { year: 1960, note: 'Capital of Republic of the Congo', country: 'Republic of the Congo' },
    'kinshasa': { year: 1960, note: 'Capital of Democratic Republic of the Congo', country: 'Democratic Republic of the Congo' },
    'san-jose': { year: 1823, note: 'Capital of Costa Rica', country: 'Costa Rica' },
    'yamoussoukro': { year: 1983, note: 'Capital of Ivory Coast', country: 'Ivory Coast' },
    'zagreb': { year: 1991, note: 'Capital of Croatia', country: 'Croatia' },
    'havana': { year: 1902, note: 'Capital of Cuba', country: 'Cuba' },
    'nicosia': { year: 1960, note: 'Capital of Cyprus', country: 'Cyprus' },
    'prague': { year: 1993, note: 'Capital of Czech Republic', country: 'Czech Republic' },
    'copenhagen': { year: 1443, note: 'Capital of Denmark', country: 'Denmark' },
    'djibouti': { year: 1977, note: 'Capital of Djibouti', country: 'Djibouti' },
    'roseau': { year: 1978, note: 'Capital of Dominica', country: 'Dominica' },
    'santo-domingo': { year: 1844, note: 'Capital of Dominican Republic', country: 'Dominican Republic' },
    'dili': { year: 2002, note: 'Capital of East Timor', country: 'East Timor' },
    'quito': { year: 1830, note: 'Capital of Ecuador', country: 'Ecuador' },
    'cairo': { year: 969, note: 'Capital of Egypt', country: 'Egypt' },
    'san-salvador': { year: 1821, note: 'Capital of El Salvador', country: 'El Salvador' },
    'malabo': { year: 1968, note: 'Capital of Equatorial Guinea', country: 'Equatorial Guinea' },
    'asmara': { year: 1993, note: 'Capital of Eritrea', country: 'Eritrea' },
    'tallinn': { year: 1991, note: 'Capital of Estonia', country: 'Estonia' },
    'mbabane': { year: 1902, note: 'Capital of Eswatini', country: 'Eswatini' },
    'addis-ababa': { year: 1889, note: 'Capital of Ethiopia', country: 'Ethiopia' },
    'suva': { year: 1970, note: 'Capital of Fiji', country: 'Fiji' },
    'helsinki': { year: 1917, note: 'Capital of Finland', country: 'Finland' },
    'paris': { year: 508, note: 'Capital of France', country: 'France' },
    'libreville': { year: 1960, note: 'Capital of Gabon', country: 'Gabon' },
    'banjul': { year: 1965, note: 'Capital of The Gambia', country: 'The Gambia' },
    'tbilisi': { year: 1991, note: 'Capital of Georgia', country: 'Georgia' },
    'berlin': { year: 1991, note: 'Capital of Germany', country: 'Germany' },
    'accra': { year: 1957, note: 'Capital of Ghana', country: 'Ghana' },
    'athens': { year: 1834, note: 'Capital of Greece', country: 'Greece' },
    'saint-georges': { year: 1974, note: 'Capital of Grenada', country: 'Grenada' },
    'guatemala-city': { year: 1776, note: 'Capital of Guatemala', country: 'Guatemala' },
    'conakry': { year: 1958, note: 'Capital of Guinea', country: 'Guinea' },
    'bissau': { year: 1974, note: 'Capital of Guinea-Bissau', country: 'Guinea-Bissau' },
    'georgetown': { year: 1966, note: 'Capital of Guyana', country: 'Guyana' },
    'port-au-prince': { year: 1804, note: 'Capital of Haiti', country: 'Haiti' },
    'tegucigalpa': { year: 1880, note: 'Capital of Honduras', country: 'Honduras' },
    'budapest': { year: 1873, note: 'Capital of Hungary', country: 'Hungary' },
    'reykjavik': { year: 1944, note: 'Capital of Iceland', country: 'Iceland' },
    'new-delhi': { year: 1931, note: 'Capital of India', country: 'India' },
    'jakarta': { year: 1949, note: 'Capital of Indonesia', country: 'Indonesia' },
    'tehran': { year: 1796, note: 'Capital of Iran', country: 'Iran' },
    'baghdad': { year: 762, note: 'Capital of Iraq', country: 'Iraq' },
    'dublin': { year: 1922, note: 'Capital of Ireland', country: 'Ireland' },
    'jerusalem': { year: 1950, note: 'Claimed Capital of Israel', country: 'Israel' },
    'rome': { year: 1871, note: 'Capital of Italy', country: 'Italy' },
    'kingston': { year: 1962, note: 'Capital of Jamaica', country: 'Jamaica' },
    'tokyo': { year: 1868, note: 'Capital of Japan', country: 'Japan' },
    'amman': { year: 1946, note: 'Capital of Jordan', country: 'Jordan' },
    'nur-sultan': { year: 1997, note: 'Capital of Kazakhstan', country: 'Kazakhstan' },
    'nairobi': { year: 1963, note: 'Capital of Kenya', country: 'Kenya' },
    'tarawa': { year: 1979, note: 'Capital of Kiribati', country: 'Kiribati' },
    'pristina': { year: 2008, note: 'Capital of Kosovo', country: 'Kosovo' },
    'kuwait-city': { year: 1961, note: 'Capital of Kuwait', country: 'Kuwait' },
    'bishkek': { year: 1991, note: 'Capital of Kyrgyzstan', country: 'Kyrgyzstan' },
    'vientiane': { year: 1953, note: 'Capital of Laos', country: 'Laos' },
    'riga': { year: 1991, note: 'Capital of Latvia', country: 'Latvia' },
    'beirut': { year: 1943, note: 'Capital of Lebanon', country: 'Lebanon' },
    'maseru': { year: 1966, note: 'Capital of Lesotho', country: 'Lesotho' },
    'monrovia': { year: 1847, note: 'Capital of Liberia', country: 'Liberia' },
    'tripoli': { year: 1951, note: 'Capital of Libya', country: 'Libya' },
    'vaduz': { year: 1719, note: 'Capital of Liechtenstein', country: 'Liechtenstein' },
    'vilnius': { year: 1991, note: 'Capital of Lithuania', country: 'Lithuania' },
    'luxembourg-city': { year: 1867, note: 'Capital of Luxembourg', country: 'Luxembourg' },
    'antananarivo': { year: 1960, note: 'Capital of Madagascar', country: 'Madagascar' },
    'lilongwe': { year: 1975, note: 'Capital of Malawi', country: 'Malawi' },
    'kuala-lumpur': { year: 1957, note: 'Capital of Malaysia', country: 'Malaysia' },
    'male': { year: 1965, note: 'Capital of Maldives', country: 'Maldives' },
    'bamako': { year: 1960, note: 'Capital of Mali', country: 'Mali' },
    'valletta': { year: 1571, note: 'Capital of Malta', country: 'Malta' },
    'majuro': { year: 1979, note: 'Capital of Marshall Islands', country: 'Marshall Islands' },
    'nouakchott': { year: 1960, note: 'Capital of Mauritania', country: 'Mauritania' },
    'port-louis': { year: 1968, note: 'Capital of Mauritius', country: 'Mauritius' },
    'mexico-city': { year: 1821, note: 'Capital of Mexico', country: 'Mexico' },
    'palikir': { year: 1989, note: 'Capital of Micronesia', country: 'Micronesia' },
    'chisinau': { year: 1991, note: 'Capital of Moldova', country: 'Moldova' },
    'monaco': { year: 1297, note: 'Capital of Monaco', country: 'Monaco' },
    'ulaanbaatar': { year: 1924, note: 'Capital of Mongolia', country: 'Mongolia' },
    'podgorica': { year: 2006, note: 'Capital of Montenegro', country: 'Montenegro' },
    'rabat': { year: 1912, note: 'Capital of Morocco', country: 'Morocco' },
    'maputo': { year: 1975, note: 'Capital of Mozambique', country: 'Mozambique' },
    'naypyidaw': { year: 2006, note: 'Capital of Myanmar', country: 'Myanmar' },
    'windhoek': { year: 1990, note: 'Capital of Namibia', country: 'Namibia' },
    'yaren': { year: 1968, note: 'Capital of Nauru', country: 'Nauru' },
    'kathmandu': { year: 1768, note: 'Capital of Nepal', country: 'Nepal' },
    'amsterdam': { year: 1814, note: 'Capital of Netherlands', country: 'Netherlands' },
    'wellington': { year: 1865, note: 'Capital of New Zealand', country: 'New Zealand' },
    'managua': { year: 1852, note: 'Capital of Nicaragua', country: 'Nicaragua' },
    'niamey': { year: 1960, note: 'Capital of Niger', country: 'Niger' },
    'abuja': { year: 1991, note: 'Capital of Nigeria', country: 'Nigeria' },
    'pyongyang': { year: 1948, note: 'Capital of North Korea', country: 'North Korea' },
    'skopje': { year: 1991, note: 'Capital of North Macedonia', country: 'North Macedonia' },
    'oslo': { year: 1048, note: 'Capital of Norway', country: 'Norway' },
    'muscat': { year: 1507, note: 'Capital of Oman', country: 'Oman' },
    'islamabad': { year: 1960, note: 'Capital of Pakistan', country: 'Pakistan' },
    'ngerulmud': { year: 2006, note: 'Capital of Palau', country: 'Palau' },
    'panama city': { year: 1519, note: 'Capital of Panama', country: 'Panama' },
    'port moresby': { year: 1873, note: 'Capital of Papua New Guinea', country: 'Papua New Guinea' },
    'asunción': { year: 1537, note: 'Capital of Paraguay', country: 'Paraguay' },
    'lima': { year: 1535, note: 'Capital of Peru', country: 'Peru' },
    'manila': { year: 1571, note: 'Capital of Philippines', country: 'Philippines' },
    'warsaw': { year: 1300, note: 'Capital of Poland', country: 'Poland' },
    'lisbon': { year: 1256, note: 'Capital of Portugal', country: 'Portugal' },
    'doha': { year: 1825, note: 'Capital of Qatar', country: 'Qatar' },
    'bucharest': { year: 1459, note: 'Capital of Romania', country: 'Romania' },
    'moscow': { year: 1147, note: 'Capital of Russia', country: 'Russia' },
    'kigali': { year: 1907, note: 'Capital of Rwanda', country: 'Rwanda' },
    'basseterre': { year: 1627, note: 'Capital of Saint Kitts and Nevis', country: 'Saint Kitts and Nevis' },
    'castries': { year: 1650, note: 'Capital of Saint Lucia', country: 'Saint Lucia' },
    'kingstown': { year: 1722, note: 'Capital of Saint Vincent and the Grenadines', country: 'Saint Vincent and the Grenadines' },
    'apia': { year: 1850, note: 'Capital of Samoa', country: 'Samoa' },
    'san marino': { year: 301, note: 'Capital of San Marino', country: 'San Marino' },
    'são tomé': { year: 1485, note: 'Capital of São Tomé and Príncipe', country: 'São Tomé and Príncipe' },
    'riyadh': { year: 1737, note: 'Capital of Saudi Arabia', country: 'Saudi Arabia' },
    'dakar': { year: 1857, note: 'Capital of Senegal', country: 'Senegal' },
    'belgrade': { year: 279, note: 'Capital of Serbia', country: 'Serbia' },
    'victoria': { year: 1778, note: 'Capital of Seychelles', country: 'Seychelles' },
    'freetown': { year: 1792, note: 'Capital of Sierra Leone', country: 'Sierra Leone' },
    'singapore': { year: 1819, note: 'Capital of Singapore', country: 'Singapore' },
    'bratislava': { year: 907, note: 'Capital of Slovakia', country: 'Slovakia' },
    'ljubljana': { year: 1144, note: 'Capital of Slovenia', country: 'Slovenia' },
    'honiara': { year: 1952, note: 'Capital of Solomon Islands', country: 'Solomon Islands' },
    'mogadishu': { year: 900, note: 'Capital of Somalia', country: 'Somalia' },
    'pretoria': { year: 1855, note: 'Capital of South Africa', country: 'South Africa' },
    'juba': { year: 1922, note: 'Capital of South Sudan', country: 'South Sudan' },
    'madrid': { year: 865, note: 'Capital of Spain', country: 'Spain' },
    'colombo': { year: 1505, note: 'Capital of Sri Lanka', country: 'Sri Lanka' },
    'khartoum': { year: 1821, note: 'Capital of Sudan', country: 'Sudan' },
    'paramaribo': { year: 1613, note: 'Capital of Suriname', country: 'Suriname' },
    'stockholm': { year: 1252, note: 'Capital of Sweden', country: 'Sweden' },
    'bern': { year: 1191, note: 'Capital of Switzerland', country: 'Switzerland' },
    'damascus': { year: 11000, note: 'Capital of Syria', country: 'Syria' },
    'dushanbe': { year: 1924, note: 'Capital of Tajikistan', country: 'Tajikistan' },
    'dodoma': { year: 1907, note: 'Capital of Tanzania', country: 'Tanzania' },
    'bangkok': { year: 1782, note: 'Capital of Thailand', country: 'Thailand' },
    'dili': { year: 1769, note: 'Capital of Timor-Leste', country: 'Timor-Leste' },
    'lomé': { year: 1897, note: 'Capital of Togo', country: 'Togo' },
    'nuku\'alofa': { year: 1875, note: 'Capital of Tonga', country: 'Tonga' },
    'port of spain': { year: 1757, note: 'Capital of Trinidad and Tobago', country: 'Trinidad and Tobago' },
    'tunis': { year: 698, note: 'Capital of Tunisia', country: 'Tunisia' },
    'ankara': { year: 1000, note: 'Capital of Turkey', country: 'Turkey' },
    'ashgabat': { year: 1881, note: 'Capital of Turkmenistan', country: 'Turkmenistan' },
    'funafuti': { year: 1972, note: 'Capital of Tuvalu', country: 'Tuvalu' },
    'kampala': { year: 1890, note: 'Capital of Uganda', country: 'Uganda' },
    'kyiv': { year: 482, note: 'Capital of Ukraine', country: 'Ukraine' },
    'abu dhabi': { year: 1761, note: 'Capital of United Arab Emirates', country: 'United Arab Emirates' },
    'montevideo': { year: 1724, note: 'Capital of Uruguay', country: 'Uruguay' },
    'tashkent': { year: 200, note: 'Capital of Uzbekistan', country: 'Uzbekistan' },
    'port vila': { year: 1906, note: 'Capital of Vanuatu', country: 'Vanuatu' },
    'vatican city': { year: 1929, note: 'Capital of Vatican City', country: 'Vatican City' },
    'caracas': { year: 1567, note: 'Capital of Venezuela', country: 'Venezuela' },
    'hanoi': { year: 1010, note: 'Capital of Vietnam', country: 'Vietnam' },
    'sana\'a': { year: 600, note: 'Capital of Yemen', country: 'Yemen' },
    'lusaka': { year: 1905, note: 'Capital of Zambia', country: 'Zambia' },
    'harare': { year: 1890, note: 'Capital of Zimbabwe', country: 'Zimbabwe' }
  };

  // Get zodiac sign for each city
  const cityZodiacs = Object.entries(cityData).reduce((acc, [city, data]) => {
    const sign = getZodiacSign(Math.abs(data.year));
    if (!acc[sign]) acc[sign] = [];
    acc[sign].push(city);
    return acc;
  }, {});

  // All zodiac signs for the filter
  const zodiacSigns = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
    'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];

  // Filter cities based on search and selected zodiac
  const getFilteredCities = () => {
    let filtered = Object.keys(cityData);

    if (search) {
      filtered = filtered.filter(city =>
        city.toLowerCase().includes(search.toLowerCase()) ||
        cityData[city].country.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedZodiac) {
      filtered = cityZodiacs[selectedZodiac] || [];
    }

    return filtered;
  };

  return (
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
            placeholder="Search for a city or country..."
            className="w-full p-2 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>

        {/* Results Display */}
        <div className="mt-4">
          {getFilteredCities().map((city) => (
            <div key={city} className="p-2 border-b">
              <span className="capitalize">{city}</span>
              <div className="float-right text-right">
                <span className="text-gray-600">
                  {getZodiacSign(cityData[city].year)}
                  {' '}
                  ({cityData[city].year})
                </span>
                <br />
                <span className="text-xs text-gray-400">
                  {cityData[city].note} • {cityData[city].country}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Zodiac Info */}
        {selectedZodiac && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">
              {selectedZodiac} Cities: {(cityZodiacs[selectedZodiac] || []).length}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default CitySelector;
import React, { useState } from 'react';
import { Search } from 'lucide-react';

const ArtistSelector = () => {
    const [search, setSearch] = useState('');
    const [selectedZodiac, setSelectedZodiac] = useState('');

    // Zodiac calculation helper
    const getZodiacSign = (year) => {
        const zodiacSigns = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
            'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
        return zodiacSigns[(year - 4) % 12];
    };

    // Artist founding/birth dates
    const artistData = {
        'the beatles': { year: 1960, note: 'Formed in Liverpool, UK' },
        'led zeppelin': { year: 1968, note: 'Formed in London, UK' },
        'pink floyd': { year: 1965, note: 'Formed in London, UK' },
        'queen': { year: 1970, note: 'Formed in London, UK' },
        'michael jackson': { year: 1958, note: 'Born in Gary, USA' },
        'elvis presley': { year: 1935, note: 'Born in Tupelo, USA' },
        'madonna': { year: 1958, note: 'Born in Bay City, USA' },
        'david bowie': { year: 1947, note: 'Born in London, UK' },
        'the rolling stones': { year: 1962, note: 'Formed in London, UK' },
        'u2': { year: 1976, note: 'Formed in Dublin, Ireland' },
        'nirvana': { year: 1987, note: 'Formed in Aberdeen, USA' },
        'metallica': { year: 1981, note: 'Formed in Los Angeles, USA' },
        'radiohead': { year: 1985, note: 'Formed in Abingdon, UK' },
        'prince': { year: 1958, note: 'Born in Minneapolis, USA' },
        'bob dylan': { year: 1941, note: 'Born in Duluth, USA' },
        'bruce springsteen': { year: 1949, note: 'Born in Long Branch, USA' },
        'the who': { year: 1964, note: 'Formed in London, UK' },
        'acdc': { year: 1973, note: 'Formed in Sydney, Australia' },
        'guns n roses': { year: 1985, note: 'Formed in Los Angeles, USA' },
        'aerosmith': { year: 1970, note: 'Formed in Boston, USA' },
        'whitney houston': { year: 1963, note: 'Born in Newark, USA' },
        'mariah carey': { year: 1969, note: 'Born in Huntington, USA' },
        'the beach boys': { year: 1961, note: 'Formed in Hawthorne, USA' },
        'eagles': { year: 1971, note: 'Formed in Los Angeles, USA' },
        'fleetwood mac': { year: 1967, note: 'Formed in London, UK' },
        'bon jovi': { year: 1983, note: 'Formed in Sayreville, USA' },
        'coldplay': { year: 1996, note: 'Formed in London, UK' },
        'red hot chili peppers': { year: 1983, note: 'Formed in Los Angeles, USA' },
        'foo fighters': { year: 1994, note: 'Formed in Seattle, USA' },
        'the doors': { year: 1965, note: 'Formed in Los Angeles, USA' },
        'the police': { year: 1977, note: 'Formed in London, UK' },
        'black sabbath': { year: 1968, note: 'Formed in Birmingham, UK' },
        'stevie wonder': { year: 1950, note: 'Born in Saginaw, USA' },
        'beyonce': { year: 1981, note: 'Born in Houston, USA' },
        'jay z': { year: 1969, note: 'Born in New York City, USA' },
        'pearl jam': { year: 1990, note: 'Formed in Seattle, USA' },
        'green day': { year: 1987, note: 'Formed in Berkeley, USA' },
        'oasis': { year: 1991, note: 'Formed in Manchester, UK' },
        'the smiths': { year: 1982, note: 'Formed in Manchester, UK' },
        'bob marley': { year: 1945, note: 'Born in Nine Mile, Jamaica' },
        'the clash': { year: 1976, note: 'Formed in London, UK' },
        'ramones': { year: 1974, note: 'Formed in New York City, USA' },
        'sex pistols': { year: 1975, note: 'Formed in London, UK' },
        'talking heads': { year: 1975, note: 'Formed in New York City, USA' },
        'rem': { year: 1980, note: 'Formed in Athens, USA' },
        'depeche mode': { year: 1980, note: 'Formed in Basildon, UK' },
        'the cure': { year: 1976, note: 'Formed in Crawley, UK' },
        'joy division': { year: 1976, note: 'Formed in Manchester, UK' },
        'blondie': { year: 1974, note: 'Formed in New York City, USA' },
        'the velvet underground': { year: 1964, note: 'Formed in New York City, USA' },
        'pink': { year: 1979, note: 'Born in Doylestown, USA' },
        'lady gaga': { year: 1986, note: 'Born in New York City, USA' },
        'rihanna': { year: 1988, note: 'Born in Saint Michael, Barbados' },
        'adele': { year: 1988, note: 'Born in London, UK' },
        'taylor swift': { year: 1989, note: 'Born in Reading, USA' },
        'ed sheeran': { year: 1991, note: 'Born in Halifax, UK' },
        'arctic monkeys': { year: 2002, note: 'Formed in Sheffield, UK' },

        // Rap Artists
        'eminem': { year: 1972, note: 'Born in St. Joseph, USA' },
        'tupac shakur': { year: 1971, note: 'Born in New York City, USA' },
        'the notorious b.i.g.': { year: 1972, note: 'Born in New York City, USA' },
        'nas': { year: 1973, note: 'Born in New York City, USA' },
        'jay-z': { year: 1969, note: 'Born in New York City, USA' },
        'kendrick lamar': { year: 1987, note: 'Born in Compton, USA' },
        'drake': { year: 1986, note: 'Born in Toronto, Canada' },
        'kanye west': { year: 1977, note: 'Born in Atlanta, USA' },
        'lil wayne': { year: 1982, note: 'Born in New Orleans, USA' },
        'snoop dogg': { year: 1971, note: 'Born in Long Beach, USA' },
        'ice cube': { year: 1969, note: 'Born in Los Angeles, USA' },
        'dr. dre': { year: 1965, note: 'Born in Compton, USA' },
        '50 cent': { year: 1975, note: 'Born in Queens, USA' },
        'j. cole': { year: 1985, note: 'Born in Frankfurt, Germany' },
        'nicki minaj': { year: 1982, note: 'Born in Port of Spain, Trinidad' },
        'cardi b': { year: 1992, note: 'Born in New York City, USA' },
        'travis scott': { year: 1991, note: 'Born in Houston, USA' },
        'post malone': { year: 1995, note: 'Born in Syracuse, USA' },
        'tyler, the creator': { year: 1991, note: 'Born in Los Angeles, USA' },
        'megan thee stallion': { year: 1995, note: 'Born in Houston, USA' },
        'future': { year: 1983, note: 'Born in Atlanta, USA' },
        'lil uzi vert': { year: 1994, note: 'Born in Philadelphia, USA' },

        // Country Artists
        'johnny cash': { year: 1932, note: 'Born in Kingsland, USA' },
        'willie nelson': { year: 1933, note: 'Born in Abbott, USA' },
        'dolly parton': { year: 1946, note: 'Born in Sevier County, USA' },
        'garth brooks': { year: 1962, note: 'Born in Tulsa, USA' },
        'george strait': { year: 1952, note: 'Born in Poteet, USA' },
        'reba mcentire': { year: 1955, note: 'Born in McAlester, USA' },
        'kenny rogers': { year: 1938, note: 'Born in Houston, USA' },
        'tim mcgraw': { year: 1967, note: 'Born in Delhi, USA' },
        'faith hill': { year: 1967, note: 'Born in Ridgeland, USA' },
        'blake shelton': { year: 1976, note: 'Born in Ada, USA' },
        'carrie underwood': { year: 1983, note: 'Born in Muskogee, USA' },
        'keith urban': { year: 1967, note: 'Born in Whangarei, New Zealand' },
        'luke bryan': { year: 1976, note: 'Born in Leesburg, USA' },
        'miranda lambert': { year: 1983, note: 'Born in Longview, USA' },
        'kenny chesney': { year: 1968, note: 'Born in Knoxville, USA' },
        'brad paisley': { year: 1972, note: 'Born in Glen Dale, USA' },
        'chris stapleton': { year: 1978, note: 'Born in Lexington, USA' },
        'alan jackson': { year: 1958, note: 'Born in Newnan, USA' },
        'loretta lynn': { year: 1932, note: 'Born in Butcher Holler, USA' },
        'merle haggard': { year: 1937, note: 'Born in Oildale, USA' },
        'waylon jennings': { year: 1937, note: 'Born in Littlefield, USA' },
        'george jones': { year: 1931, note: 'Born in Saratoga, USA' },
        'shania twain': { year: 1965, note: 'Born in Windsor, Canada' },
        'eric church': { year: 1977, note: 'Born in Granite Falls, USA' },

        'pablo picasso': { year: 1881, note: 'Born in Málaga, Spain' },
        'salvador dalí': { year: 1904, note: 'Born in Figueres, Spain' },
        'vincent van gogh': { year: 1853, note: 'Born in Zundert, Netherlands' },
        'leonardo da vinci': { year: 1452, note: 'Born in Vinci, Italy' },
        'michelangelo': { year: 1475, note: 'Born in Caprese, Italy' },
        'claude monet': { year: 1840, note: 'Born in Paris, France' },
        'rembrandt': { year: 1606, note: 'Born in Leiden, Netherlands' },
        'frida kahlo': { year: 1907, note: 'Born in Coyoacán, Mexico' },
        'andy warhol': { year: 1928, note: 'Born in Pittsburgh, USA' },
        'georgia o\'keeffe': { year: 1887, note: 'Born in Sun Prairie, USA' },
        'édouard manet': { year: 1832, note: 'Born in Paris, France' },
        'jean-michel basquiat': { year: 1960, note: 'Born in New York City, USA' },
        'keith haring': { year: 1958, note: 'Born in Reading, USA' },
        'banksy': { year: 1974, note: 'Born in Bristol, UK (presumed)' },
        'ai weiwei': { year: 1957, note: 'Born in Beijing, China' },
        'yayoi kusama': { year: 1929, note: 'Born in Matsumoto, Japan' },
        'david hockney': { year: 1937, note: 'Born in Bradford, UK' },
        'raphael': { year: 1483, note: 'Born in Urbino, Italy' },
        'wassily kandinsky': { year: 1866, note: 'Born in Moscow, Russia' },
        'gustav klimt': { year: 1862, note: 'Born in Vienna, Austria' },
        'henri matisse': { year: 1869, note: 'Born in Le Cateau-Cambrésis, France' },
        'jackson pollock': { year: 1912, note: 'Born in Cody, USA' },
        'francis bacon': { year: 1909, note: 'Born in Dublin, Ireland' },
        'takashi murakami': { year: 1962, note: 'Born in Tokyo, Japan' },
        'jeff koons': { year: 1955, note: 'Born in York, USA' }

    };

    // Get zodiac sign for each artist
    const artistZodiacs = Object.entries(artistData).reduce((acc, [artist, data]) => {
        const sign = getZodiacSign(Math.abs(data.year));
        if (!acc[sign]) acc[sign] = [];
        acc[sign].push(artist);
        return acc;
    }, {});

    const zodiacSigns = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
        'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];

    const getFilteredArtists = () => {
        let filtered = Object.keys(artistData);
        if (search) {
            filtered = filtered.filter(artist =>
                artist.toLowerCase().includes(search.toLowerCase())
            );
        }
        if (selectedZodiac) {
            filtered = artistZodiacs[selectedZodiac] || [];
        }
        return filtered;
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div>
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                    Artist Zodiac Finder
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
                        placeholder="Search for an artist..."
                        className="w-full p-2 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                    />
                    <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                </div>

                {/* Results Display */}
                <div className="mt-4">
                    {getFilteredArtists().map((artist) => (
                        <div key={artist} className="p-2 border-b border-gray-200 bg-white hover:bg-gray-50">
                            <span className="capitalize text-gray-800">{artist}</span>
                            <span className="float-right text-gray-600">
                                {getZodiacSign(artistData[artist].year)}
                                {' '}
                                ({artistData[artist].year})
                                <span className="text-xs ml-2 text-gray-400">
                                    {artistData[artist].note}
                                </span>
                            </span>
                        </div>
                    ))}
                </div>

                {/* Selected Zodiac Info */}
                {selectedZodiac && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold mb-2 text-gray-800">
                            {selectedZodiac} Artists: {(artistZodiacs[selectedZodiac] || []).length}
                        </h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArtistSelector;
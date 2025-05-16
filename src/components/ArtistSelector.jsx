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
        'the beatles': { year: 1960, note: 'UK' },
        'led zeppelin': { year: 1968, note: 'UK' },
        'pink floyd': { year: 1965, note: 'UK' },
        'queen': { year: 1970, note: 'UK' },
        'michael jackson': { year: 1958, note: 'USA' },
        'elvis presley': { year: 1935, note: 'USA' },
        'madonna': { year: 1958, note: 'USA' },
        'david bowie': { year: 1947, note: 'UK' },
        'the rolling stones': { year: 1962, note: 'UK' },
        'u2': { year: 1976, note: 'Ireland' },
        'nirvana': { year: 1987, note: 'USA' },
        'metallica': { year: 1981, note: 'USA' },
        'radiohead': { year: 1985, note: 'UK' },
        'prince': { year: 1958, note: 'USA' },
        'bob dylan': { year: 1941, note: 'USA' },
        'bruce springsteen': { year: 1949, note: 'USA' },
        'the who': { year: 1964, note: 'UK' },
        'acdc': { year: 1973, note: 'Australia' },
        'guns n roses': { year: 1985, note: 'USA' },
        'aerosmith': { year: 1970, note: 'USA' },
        'whitney houston': { year: 1963, note: 'USA' },
        'mariah carey': { year: 1969, note: 'USA' },
        'the beach boys': { year: 1961, note: 'USA' },
        'eagles': { year: 1971, note: 'USA' },
        'fleetwood mac': { year: 1967, note: 'UK' },
        'bon jovi': { year: 1983, note: 'USA' },
        'coldplay': { year: 1996, note: 'UK' },
        'red hot chili peppers': { year: 1983, note: 'USA' },
        'foo fighters': { year: 1994, note: 'USA' },
        'the doors': { year: 1965, note: 'USA' },
        'the police': { year: 1977, note: 'UK' },
        'black sabbath': { year: 1968, note: 'UK' },
        'stevie wonder': { year: 1950, note: 'USA' },
        'beyonce': { year: 1981, note: 'USA' },
        'jay z': { year: 1969, note: 'USA' }, // Original 'jay z'
        'pearl jam': { year: 1990, note: 'USA' },
        'green day': { year: 1987, note: 'USA' },
        'oasis': { year: 1991, note: 'UK' },
        'the smiths': { year: 1982, note: 'UK' },
        'bob marley': { year: 1945, note: 'Jamaica' },
        'the clash': { year: 1976, note: 'UK' },
        'ramones': { year: 1974, note: 'USA' },
        'sex pistols': { year: 1975, note: 'UK' },
        'talking heads': { year: 1975, note: 'USA' },
        'rem': { year: 1980, note: 'USA' },
        'depeche mode': { year: 1980, note: 'UK' },
        'the cure': { year: 1976, note: 'UK' },
        'joy division': { year: 1976, note: 'UK' },
        'blondie': { year: 1974, note: 'USA' },
        'the velvet underground': { year: 1964, note: 'USA' },
        'pink': { year: 1979, note: 'USA' },
        'lady gaga': { year: 1986, note: 'USA' },
        'rihanna': { year: 1988, note: 'Barbados' },
        'adele': { year: 1988, note: 'UK' },
        'taylor swift': { year: 1989, note: 'USA' },
        'ed sheeran': { year: 1991, note: 'UK' },
        'arctic monkeys': { year: 2002, note: 'UK' },
      
        // Rap Artists
        'eminem': { year: 1972, note: 'USA' },
        'tupac shakur': { year: 1971, note: 'USA' },
        'the notorious b.i.g.': { year: 1972, note: 'USA' },
        'nas': { year: 1973, note: 'USA' },
        'jay-z': { year: 1969, note: 'USA' }, // Hyphenated 'jay-z', overwrites previous 'jay z' if keys normalize
        'kendrick lamar': { year: 1987, note: 'USA' },
        'drake': { year: 1986, note: 'Canada' },
        'kanye west': { year: 1977, note: 'USA' },
        'lil wayne': { year: 1982, note: 'USA' },
        'snoop dogg': { year: 1971, note: 'USA' },
        'ice cube': { year: 1969, note: 'USA' },
        'dr. dre': { year: 1965, note: 'USA' },
        '50 cent': { year: 1975, note: 'USA' },
        'j. cole': { year: 1985, note: 'Germany' },
        'nicki minaj': { year: 1982, note: 'Trinidad' }, // Assuming 'Trinidad' implies Trinidad and Tobago
        'cardi b': { year: 1992, note: 'USA' },
        'travis scott': { year: 1991, note: 'USA' },
        'post malone': { year: 1995, note: 'USA' },
        'tyler, the creator': { year: 1991, note: 'USA' },
        'megan thee stallion': { year: 1995, note: 'USA' },
        'future': { year: 1983, note: 'USA' },
        'lil uzi vert': { year: 1994, note: 'USA' },
      
        // Country Artists
        'johnny cash': { year: 1932, note: 'USA' },
        'willie nelson': { year: 1933, note: 'USA' },
        'dolly parton': { year: 1946, note: 'USA' },
        'garth brooks': { year: 1962, note: 'USA' },
        'george strait': { year: 1952, note: 'USA' },
        'reba mcentire': { year: 1955, note: 'USA' },
        'kenny rogers': { year: 1938, note: 'USA' },
        'tim mcgraw': { year: 1967, note: 'USA' },
        'faith hill': { year: 1967, note: 'USA' },
        'blake shelton': { year: 1976, note: 'USA' },
        'carrie underwood': { year: 1983, note: 'USA' },
        'keith urban': { year: 1967, note: 'New Zealand' },
        'luke bryan': { year: 1976, note: 'USA' },
        'miranda lambert': { year: 1983, note: 'USA' },
        'kenny chesney': { year: 1968, note: 'USA' },
        'brad paisley': { year: 1972, note: 'USA' },
        'chris stapleton': { year: 1978, note: 'USA' },
        'alan jackson': { year: 1958, note: 'USA' },
        'loretta lynn': { year: 1932, note: 'USA' },
        'merle haggard': { year: 1937, note: 'USA' },
        'waylon jennings': { year: 1937, note: 'USA' },
        'george jones': { year: 1931, note: 'USA' },
        'shania twain': { year: 1965, note: 'Canada' },
        'eric church': { year: 1977, note: 'USA' },
      
        // Artists
        'pablo picasso': { year: 1881, note: 'Spain' },
        'salvador dalí': { year: 1904, note: 'Spain' },
        'vincent van gogh': { year: 1853, note: 'Netherlands' },
        'leonardo da vinci': { year: 1452, note: 'Italy' },
        'michelangelo': { year: 1475, note: 'Italy' },
        'claude monet': { year: 1840, note: 'France' },
        'rembrandt': { year: 1606, note: 'Netherlands' },
        'frida kahlo': { year: 1907, note: 'Mexico' },
        'andy warhol': { year: 1928, note: 'USA' },
        'georgia o\'keeffe': { year: 1887, note: 'USA' },
        'édouard manet': { year: 1832, note: 'France' },
        'jean-michel basquiat': { year: 1960, note: 'USA' },
        'keith haring': { year: 1958, note: 'USA' },
        'banksy': { year: 1974, note: 'UK' }, // Extracted from 'Bristol, UK (presumed)'
        'ai weiwei': { year: 1957, note: 'China' },
        'yayoi kusama': { year: 1929, note: 'Japan' },
        'david hockney': { year: 1937, note: 'UK' },
        'raphael': { year: 1483, note: 'Italy' },
        'wassily kandinsky': { year: 1866, note: 'Russia' },
        'gustav klimt': { year: 1862, note: 'Austria' },
        'henri matisse': { year: 1869, note: 'France' },
        'jackson pollock': { year: 1912, note: 'USA' },
        'francis bacon': { year: 1909, note: 'Ireland' },
        'takashi murakami': { year: 1962, note: 'Japan' },
        'jeff koons': { year: 1955, note: 'USA' }

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
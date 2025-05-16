import React, { useState } from 'react';
import { Search } from 'lucide-react';

const AuthorSelector = () => {
  const [search, setSearch] = useState('');
  const [selectedZodiac, setSelectedZodiac] = useState('');

  // Zodiac calculation helper
  const getZodiacSign = (year) => {
    const zodiacSigns = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 
                        'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
    return zodiacSigns[(year - 4) % 12];
  };

  // Author data with their notable years (birth or major work publication)
  const authorData = {
      'william shakespeare': { year: 1564, note: 'Hamlet' },
      'fyodor dostoevsky': { year: 1821, note: 'CrimeAndPunishment' },
      'jane austen': { year: 1775, note: 'PrideAndPrejudice' },
      'leo tolstoy': { year: 1828, note: 'WarAndPeace' },
      'charles dickens': { year: 1812, note: 'GreatExpectations' },
      'mark twain': { year: 1835, note: 'HuckleberryFinn' },
      'ernest hemingway': { year: 1899, note: 'OldManAndTheSea' },
      'james joyce': { year: 1882, note: 'Ulysses' },
      'franz kafka': { year: 1883, note: 'Metamorphosis' },
      'emily bronte': { year: 1818, note: 'WutheringHeights' },
      'charlotte bronte': { year: 1816, note: 'JaneEyre' },
      'george orwell': { year: 1903, note: '1984' },
      'oscar wilde': { year: 1854, note: 'DorianGray' },
      'emily dickinson': { year: 1830, note: 'Poems' },
      'edgar allan poe': { year: 1809, note: 'Raven' },
      'victor hugo': { year: 1802, note: 'LesMiserables' },
      'marcel proust': { year: 1871, note: 'InSearchOfLostTime' }, // Kept longer as it's iconic
      'hermann hesse': { year: 1877, note: 'Siddhartha' },
      'gabriel garcia marquez': { year: 1927, note: 'Solitude' }, // Shortened from 100 Years...
      'jorge luis borges': { year: 1899, note: 'Ficciones' },
      'virginia woolf': { year: 1882, note: 'Lighthouse' }, // Shortened from To the Lighthouse
      'gustave flaubert': { year: 1821, note: 'MadameBovary' },
      'alexandre dumas': { year: 1802, note: 'ThreeMusketeers' },
      'walt whitman': { year: 1819, note: 'LeavesOfGrass' },
      'henry james': { year: 1843, note: 'PortraitOfALady' },
      'thomas mann': { year: 1875, note: 'MagicMountain' },
      'ralph waldo emerson': { year: 1803, note: 'Nature' },
      'h.g. wells': { year: 1866, note: 'TimeMachine' },
      'aldous huxley': { year: 1894, note: 'BraveNewWorld' },
      'joseph conrad': { year: 1857, note: 'HeartOfDarkness' },
      'miguel de cervantes': { year: 1547, note: 'DonQuixote' },
      'honore de balzac': { year: 1799, note: 'PereGoriot' },
      'john steinbeck': { year: 1902, note: 'GrapesOfWrath' },
      'f. scott fitzgerald': { year: 1896, note: 'GreatGatsby' },
      'william faulkner': { year: 1897, note: 'SoundAndFury' },
      'thomas hardy': { year: 1840, note: 'Tess' }, // Shortened
      'robert louis stevenson': { year: 1850, note: 'TreasureIsland' },
      'anton chekhov': { year: 1860, note: 'CherryOrchard' },
      'arthur conan doyle': { year: 1859, note: 'SherlockHolmes' },
      'roald dahl': { year: 1916, note: 'Charlie' }, // Shortened
      'dalai lama': { year: 1935, note: 'ArtOfHappiness' },
      'jack canfield': { year: 1944, note: 'ChickenSoup' }, // Shortened
      'brian tracy': { year: 1944, note: 'MaximumAchievement' },
      'dale carnegie': { year: 1888, note: 'WinFriends' }, // Shortened
      'george s. clason': { year: 1874, note: 'RichestMan' }, // Shortened
      'napoleon hill': { year: 1883, note: 'ThinkAndGrowRich' },
      'tony robbins': { year: 1960, note: 'UnlimitedPower' }, // Note: Also has Awaken... entry later
      'stephen king': { year: 1947, note: 'Shining' },
      'j.k. rowling': { year: 1965, note: 'HarryPotter' },
      'c.s. lewis': { year: 1898, note: 'Narnia' }, // Shortened
      'j.r.r. tolkien': { year: 1892, note: 'LordOfTheRings' },
      'paulo coelho': { year: 1947, note: 'Alchemist' },
      'robert kiyosaki': { year: 1947, note: 'RichDadPoorDad' },
      'eckhart tolle': { year: 1948, note: 'PowerOfNow' },
      'deepak chopra': { year: 1946, note: 'SevenSpiritualLaws' },
      'wayne dyer': { year: 1940, note: 'ErroneousZones' },
      'louise hay': { year: 1926, note: 'HealYourLife' },
      'malcolm gladwell': { year: 1963, note: 'TippingPoint' },
      'daniel goleman': { year: 1946, note: 'EmotionalIntelligence' },
      'stephen covey': { year: 1932, note: '7Habits' },
      'peter drucker': { year: 1909, note: 'Management' }, // Shortened
      'jim rohn': { year: 1930, note: 'Strategies' }, // Shortened
      'og mandino': { year: 1923, note: 'GreatestSalesman' },
      'norman vincent peale': { year: 1898, note: 'PositiveThinking' },
      'w. clement stone': { year: 1902, note: 'PositiveMentalAttitude' },
      'zig ziglar': { year: 1926, note: 'SeeYouAtTop' },
      'james allen': { year: 1864, note: 'AsAManThinketh' },
      'wallace d. wattles': { year: 1860, note: 'ScienceOfGettingRich' },
      'joseph murphy': { year: 1898, note: 'SubconsciousMind' }, // Shortened
      'florence scovel shinn': { year: 1871, note: 'GameOfLife' },
      'earl nightingale': { year: 1921, note: 'StrangestSecret' },
      'charles f. haanel': { year: 1866, note: 'MasterKeySystem' },
      'robert collier': { year: 1885, note: 'SecretOfTheAges' },
      'neville goddard': { year: 1905, note: 'PowerOfAwareness' },
      'rhonda byrne': { year: 1951, note: 'Secret' },
      'anthony robbins': { year: 1960, note: 'AwakenTheGiant' }, // Note: Overwrites previous Tony Robbins entry
      'david schwartz': { year: 1927, note: 'MagicOfThinkingBig' },
      'maxwell maltz': { year: 1899, note: 'PsychoCybernetics' },
      'robert greene': { year: 1959, note: '48LawsOfPower' },
      'sun tzu': { year: -544, note: 'ArtOfWar' },
      'lao tzu': { year: -601, note: 'TaoTeChing' },
      'marcus aurelius': { year: 121, note: 'Meditations' },
      'seneca': { year: -4, note: 'Stoic' }, // Shortened from Letters from a Stoic
      'epictetus': { year: 50, note: 'Discourses' },
      'alan watts': { year: 1915, note: 'WayOfZen' },
      'carl jung': { year: 1875, note: 'RedBook' },
      'joseph campbell': { year: 1904, note: 'HeroWithThousandFaces' },
      'ram dass': { year: 1931, note: 'BeHereNow' },
      'thich nhat hanh': { year: 1926, note: 'MiracleOfMindfulness' },
      'rumi': { year: 1207, note: 'Masnavi' }
    // Many more authors would continue here...
  };

  // Get zodiac sign for each author
  const authorZodiacs = Object.entries(authorData).reduce((acc, [author, data]) => {
    const sign = getZodiacSign(Math.abs(data.year));
    if (!acc[sign]) acc[sign] = [];
    acc[sign].push(author);
    return acc;
  }, {});

  // All zodiac signs for the filter
  const zodiacSigns = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 
                      'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];

  // Filter authors based on search and selected zodiac
  const getFilteredAuthors = () => {
    let filtered = Object.keys(authorData);
    
    if (search) {
      filtered = filtered.filter(author => 
        author.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (selectedZodiac) {
      filtered = authorZodiacs[selectedZodiac] || [];
    }
    
    return filtered;
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Author Zodiac Finder
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
            placeholder="Search for an author..."
            className="w-full p-2 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>

        {/* Results Display */}
        <div className="mt-4">
          {getFilteredAuthors().map((author) => (
            <div key={author} className="p-2 border-b">
              <span className="capitalize">{author}</span>
              <span className="float-right text-gray-600">
                {getZodiacSign(authorData[author].year)}
                {' '}
                ({authorData[author].year})
              </span>
              <div className="text-sm text-gray-500 mt-1">
                {authorData[author].note}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Zodiac Info */}
        {selectedZodiac && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">
              {selectedZodiac} Authors: {(authorZodiacs[selectedZodiac] || []).length}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorSelector;
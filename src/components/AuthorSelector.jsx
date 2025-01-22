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
    'william shakespeare': { year: 1564, note: 'Birth year - Hamlet published 1603' },
    'fyodor dostoevsky': { year: 1821, note: 'Birth year - Crime and Punishment 1866' },
    'jane austen': { year: 1775, note: 'Birth year - Pride and Prejudice 1813' },
    'leo tolstoy': { year: 1828, note: 'Birth year - War and Peace 1869' },
    'charles dickens': { year: 1812, note: 'Birth year - Great Expectations 1861' },
    'mark twain': { year: 1835, note: 'Birth year - Huckleberry Finn 1884' },
    'ernest hemingway': { year: 1899, note: 'Birth year - The Old Man and the Sea 1952' },
    'james joyce': { year: 1882, note: 'Birth year - Ulysses 1922' },
    'franz kafka': { year: 1883, note: 'Birth year - The Metamorphosis 1915' },
    'emily bronte': { year: 1818, note: 'Birth year - Wuthering Heights 1847' },
    'charlotte bronte': { year: 1816, note: 'Birth year - Jane Eyre 1847' },
    'george orwell': { year: 1903, note: 'Birth year - 1984 published 1949' },
    'oscar wilde': { year: 1854, note: 'Birth year - The Picture of Dorian Gray 1890' },
    'emily dickinson': { year: 1830, note: 'Birth year - Poems published 1890' },
    'edgar allan poe': { year: 1809, note: 'Birth year - The Raven 1845' },
    'victor hugo': { year: 1802, note: 'Birth year - Les Misérables 1862' },
    'marcel proust': { year: 1871, note: 'Birth year - In Search of Lost Time 1913-1927' },
    'hermann hesse': { year: 1877, note: 'Birth year - Siddhartha 1922' },
    'gabriel garcia marquez': { year: 1927, note: 'Birth year - 100 Years of Solitude 1967' },
    'jorge luis borges': { year: 1899, note: 'Birth year - Ficciones 1944' },
    'virginia woolf': { year: 1882, note: 'Birth year - To the Lighthouse 1927' },
    'gustave flaubert': { year: 1821, note: 'Birth year - Madame Bovary 1857' },
    'alexandre dumas': { year: 1802, note: 'Birth year - The Three Musketeers 1844' },
    'walt whitman': { year: 1819, note: 'Birth year - Leaves of Grass 1855' },
    'henry james': { year: 1843, note: 'Birth year - The Portrait of a Lady 1881' },
    'thomas mann': { year: 1875, note: 'Birth year - The Magic Mountain 1924' },
    'ralph waldo emerson': { year: 1803, note: 'Birth year - Nature 1836' },
    'h.g. wells': { year: 1866, note: 'Birth year - The Time Machine 1895' },
    'aldous huxley': { year: 1894, note: 'Birth year - Brave New World 1932' },
    'joseph conrad': { year: 1857, note: 'Birth year - Heart of Darkness 1899' },
    'miguel de cervantes': { year: 1547, note: 'Birth year - Don Quixote 1605' },
    'honore de balzac': { year: 1799, note: 'Birth year - Le Père Goriot 1835' },
    'john steinbeck': { year: 1902, note: 'Birth year - The Grapes of Wrath 1939' },
    'f. scott fitzgerald': { year: 1896, note: 'Birth year - The Great Gatsby 1925' },
    'william faulkner': { year: 1897, note: 'Birth year - The Sound and the Fury 1929' },
    'thomas hardy': { year: 1840, note: 'Birth year - Tess of the d\'Urbervilles 1891' },
    'robert louis stevenson': { year: 1850, note: 'Birth year - Treasure Island 1883' },
    'anton chekhov': { year: 1860, note: 'Birth year - The Cherry Orchard 1904' },
    'arthur conan doyle': { year: 1859, note: 'Birth year - Sherlock Holmes first appeared 1887' },
    'roald dahl': { year: 1916, note: 'Birth year - Charlie and the Chocolate Factory 1964' },
    'dalai lama': { year: 1935, note: 'Birth year - The Art of Happiness 1998' },
    'jack canfield': { year: 1944, note: 'Birth year - Chicken Soup for the Soul 1993' },
    'brian tracy': { year: 1944, note: 'Birth year - Maximum Achievement 1993' },
    'dale carnegie': { year: 1888, note: 'Birth year - How to Win Friends and Influence People 1936' },
    'george s. clason': { year: 1874, note: 'Birth year - The Richest Man in Babylon 1926' },
    'napoleon hill': { year: 1883, note: 'Birth year - Think and Grow Rich 1937' },
    'tony robbins': { year: 1960, note: 'Birth year - Unlimited Power 1986' },
    'stephen king': { year: 1947, note: 'Birth year - The Shining 1977' },
    'j.k. rowling': { year: 1965, note: 'Birth year - Harry Potter series 1997-2007' },
    'c.s. lewis': { year: 1898, note: 'Birth year - The Chronicles of Narnia 1950-1956' },
    'j.r.r. tolkien': { year: 1892, note: 'Birth year - The Lord of the Rings 1954' },
    'paulo coelho': { year: 1947, note: 'Birth year - The Alchemist 1988' },
    'robert kiyosaki': { year: 1947, note: 'Birth year - Rich Dad Poor Dad 1997' },
    'eckhart tolle': { year: 1948, note: 'Birth year - The Power of Now 1997' },
    'deepak chopra': { year: 1946, note: 'Birth year - The Seven Spiritual Laws of Success 1994' },
    'wayne dyer': { year: 1940, note: 'Birth year - Your Erroneous Zones 1976' },
    'louise hay': { year: 1926, note: 'Birth year - You Can Heal Your Life 1984' },
    'malcolm gladwell': { year: 1963, note: 'Birth year - The Tipping Point 2000' },
    'daniel goleman': { year: 1946, note: 'Birth year - Emotional Intelligence 1995' },
    'stephen covey': { year: 1932, note: 'Birth year - The 7 Habits of Highly Effective People 1989' },
    'peter drucker': { year: 1909, note: 'Birth year - The Practice of Management 1954' },
    'jim rohn': { year: 1930, note: 'Birth year - 7 Strategies for Wealth & Happiness 1985' },
    'og mandino': { year: 1923, note: 'Birth year - The Greatest Salesman in the World 1968' },
    'norman vincent peale': { year: 1898, note: 'Birth year - The Power of Positive Thinking 1952' },
    'w. clement stone': { year: 1902, note: 'Birth year - Success Through a Positive Mental Attitude 1960' },
    'zig ziglar': { year: 1926, note: 'Birth year - See You at the Top 1975' },
    'james allen': { year: 1864, note: 'Birth year - As a Man Thinketh 1903' },
    'wallace d. wattles': { year: 1860, note: 'Birth year - The Science of Getting Rich 1910' },
    'joseph murphy': { year: 1898, note: 'Birth year - The Power of Your Subconscious Mind 1963' },
    'florence scovel shinn': { year: 1871, note: 'Birth year - The Game of Life and How to Play It 1925' },
    'earl nightingale': { year: 1921, note: 'Birth year - The Strangest Secret 1956' },
    'charles f. haanel': { year: 1866, note: 'Birth year - The Master Key System 1912' },
    'robert collier': { year: 1885, note: 'Birth year - The Secret of the Ages 1926' },
    'neville goddard': { year: 1905, note: 'Birth year - The Power of Awareness 1952' },
    'rhonda byrne': { year: 1951, note: 'Birth year - The Secret 2006' },
    'anthony robbins': { year: 1960, note: 'Birth year - Awaken the Giant Within 1991' },
    'david schwartz': { year: 1927, note: 'Birth year - The Magic of Thinking Big 1959' },
    'maxwell maltz': { year: 1899, note: 'Birth year - Psycho-Cybernetics 1960' },
    'robert greene': { year: 1959, note: 'Birth year - The 48 Laws of Power 1998' },
    'sun tzu': { year: -544, note: 'Birth year - The Art of War 500 BC' },
    'lao tzu': { year: -601, note: 'Birth year - Tao Te Ching 6th century BC' },
    'marcus aurelius': { year: 121, note: 'Birth year - Meditations 170-180 AD' },
    'seneca': { year: -4, note: 'Birth year - Letters from a Stoic 65 AD' },
    'epictetus': { year: 50, note: 'Birth year - Discourses 108 AD' },
    'alan watts': { year: 1915, note: 'Birth year - The Way of Zen 1957' },
    'carl jung': { year: 1875, note: 'Birth year - The Red Book 2009' },
    'joseph campbell': { year: 1904, note: 'Birth year - The Hero with a Thousand Faces 1949' },
    'ram dass': { year: 1931, note: 'Birth year - Be Here Now 1971' },
    'thich nhat hanh': { year: 1926, note: 'Birth year - The Miracle of Mindfulness 1975' },
    'rumi': { year: 1207, note: 'Birth year - Masnavi 1258-1273' }
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
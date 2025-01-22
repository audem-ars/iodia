import React, { useState } from 'react';
import { Search } from 'lucide-react';

const ActorSelector = () => {
  const [search, setSearch] = useState('');
  const [selectedZodiac, setSelectedZodiac] = useState('');

  // Zodiac calculation helper
  const getZodiacSign = (year) => {
    const zodiacSigns = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 
                        'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
    return zodiacSigns[(year - 4) % 12];
  };

  // Actor data with birth years and notable works
  const actorData = {
    'marlon brando': { year: 1924, note: 'Birth year - The Godfather (1972)' },
    'robert de niro': { year: 1943, note: 'Birth year - Taxi Driver (1976)' },
    'al pacino': { year: 1940, note: 'Birth year - The Godfather (1972)' },
    'jack nicholson': { year: 1937, note: 'Birth year - One Flew Over the Cuckoo\'s Nest (1975)' },
    'morgan freeman': { year: 1937, note: 'Birth year - Driving Miss Daisy (1989)' },
    'tom hanks': { year: 1956, note: 'Birth year - Forrest Gump (1994)' },
    'anthony hopkins': { year: 1937, note: 'Birth year - The Silence of the Lambs (1991)' },
    'daniel day-lewis': { year: 1957, note: 'Birth year - My Left Foot (1989)' },
    'leonardo dicaprio': { year: 1974, note: 'Birth year - Titanic (1997)' },
    'brad pitt': { year: 1963, note: 'Birth year - Fight Club (1999)' },
    'denzel washington': { year: 1954, note: 'Birth year - Training Day (2001)' },
    'christian bale': { year: 1974, note: 'Birth year - American Psycho (2000)' },
    'heath ledger': { year: 1979, note: 'Birth year - The Dark Knight (2008)' },
    'gary oldman': { year: 1958, note: 'Birth year - Darkest Hour (2017)' },
    'russell crowe': { year: 1964, note: 'Birth year - Gladiator (2000)' },
    'edward norton': { year: 1969, note: 'Birth year - American History X (1998)' },
    'matthew mcconaughey': { year: 1969, note: 'Birth year - Dallas Buyers Club (2013)' },
    'tom cruise': { year: 1962, note: 'Birth year - Top Gun (1986)' },
    'johnny depp': { year: 1963, note: 'Birth year - Pirates of the Caribbean (2003)' },
    'samuel l. jackson': { year: 1948, note: 'Birth year - Pulp Fiction (1994)' },
    'harrison ford': { year: 1942, note: 'Birth year - Star Wars (1977)' },
    'sean connery': { year: 1930, note: 'Birth year - Dr. No (1962)' },
    'clint eastwood': { year: 1930, note: 'Birth year - The Good, the Bad and the Ugly (1966)' },
    'robert redford': { year: 1936, note: 'Birth year - Butch Cassidy and the Sundance Kid (1969)' },
    'paul newman': { year: 1925, note: 'Birth year - Cool Hand Luke (1967)' },
    'dustin hoffman': { year: 1937, note: 'Birth year - The Graduate (1967)' },
    'gene hackman': { year: 1930, note: 'Birth year - The French Connection (1971)' },
    'robin williams': { year: 1951, note: 'Birth year - Dead Poets Society (1989)' },
    'sylvester stallone': { year: 1946, note: 'Birth year - Rocky (1976)' },
    'arnold schwarzenegger': { year: 1947, note: 'Birth year - The Terminator (1984)' },
    'bruce willis': { year: 1955, note: 'Birth year - Die Hard (1988)' },
    'mel gibson': { year: 1956, note: 'Birth year - Mad Max (1979)' },
    'will smith': { year: 1968, note: 'Birth year - Men in Black (1997)' },
    'jim carrey': { year: 1962, note: 'Birth year - Ace Ventura (1994)' },
    'robert downey jr.': { year: 1965, note: 'Birth year - Iron Man (2008)' },
    'chris evans': { year: 1981, note: 'Birth year - Captain America (2011)' },
    'chris hemsworth': { year: 1983, note: 'Birth year - Thor (2011)' },
    'ryan gosling': { year: 1980, note: 'Birth year - La La Land (2016)' },
    'jake gyllenhaal': { year: 1980, note: 'Birth year - Donnie Darko (2001)' },
    'benedict cumberbatch': { year: 1976, note: 'Birth year - The Imitation Game (2014)' },
    'tom hardy': { year: 1977, note: 'Birth year - Mad Max: Fury Road (2015)' },
    'chadwick boseman': { year: 1976, note: 'Birth year - Black Panther (2018)' },
    'keanu reeves': { year: 1964, note: 'Birth year - The Matrix (1999)' },
    'willem dafoe': { year: 1955, note: 'Birth year - Platoon (1986)' },
    'christopher walken': { year: 1943, note: 'Birth year - The Deer Hunter (1978)' },
    'jeff bridges': { year: 1949, note: 'Birth year - The Big Lebowski (1998)' },
    'philip seymour hoffman': { year: 1967, note: 'Birth year - Capote (2005)' },
'javier bardem': { year: 1969, note: 'Birth year - No Country for Old Men (2007)' },
'audrey hepburn': { year: 1929, note: 'Birth year - Roman Holiday (1953)' },
'elizabeth taylor': { year: 1932, note: 'Birth year - Cleopatra (1963)' },
    'katherine hepburn': { year: 1907, note: 'Birth year - The African Queen (1951)' },
    'ingrid bergman': { year: 1915, note: 'Birth year - Casablanca (1942)' },
    'cate blanchett': { year: 1969, note: 'Birth year - Elizabeth (1998)' },
    'julia roberts': { year: 1967, note: 'Birth year - Pretty Woman (1990)' },
    'nicole kidman': { year: 1967, note: 'Birth year - Moulin Rouge! (2001)' },
    'charlize theron': { year: 1975, note: 'Birth year - Monster (2003)' },
    'viola davis': { year: 1965, note: 'Birth year - Fences (2016)' },
    'jodie foster': { year: 1962, note: 'Birth year - The Silence of the Lambs (1991)' },
    'sandra bullock': { year: 1964, note: 'Birth year - Gravity (2013)' },
    'emma thompson': { year: 1959, note: 'Birth year - Howards End (1992)' },
    'helen mirren': { year: 1945, note: 'Birth year - The Queen (2006)' },
    'judi dench': { year: 1934, note: 'Birth year - Shakespeare in Love (1998)' },
    'maggie smith': { year: 1934, note: 'Birth year - The Prime of Miss Jean Brodie (1969)' },
    'glenn close': { year: 1947, note: 'Birth year - Fatal Attraction (1987)' },
    'sigourney weaver': { year: 1949, note: 'Birth year - Alien (1979)' },
    'jessica lange': { year: 1949, note: 'Birth year - Tootsie (1982)' },
    'michelle pfeiffer': { year: 1958, note: 'Birth year - Scarface (1983)' },
    'emma stone': { year: 1988, note: 'Birth year - La La Land (2016)' },
    'jennifer lawrence': { year: 1990, note: 'Birth year - Silver Linings Playbook (2012)' },
    'natalie portman': { year: 1981, note: 'Birth year - Black Swan (2010)' },
    'julianne moore': { year: 1960, note: 'Birth year - Still Alice (2014)' },
    'frances mcdormand': { year: 1957, note: 'Birth year - Fargo (1996)' },
    'marion cotillard': { year: 1975, note: 'Birth year - La Vie en Rose (2007)' },
    'kate winslet': { year: 1975, note: 'Birth year - Eternal Sunshine of the Spotless Mind (2004)' },
    'olivia colman': { year: 1974, note: 'Birth year - The Favourite (2018)' },
    'bette davis': { year: 1908, note: 'Birth year - All About Eve (1950)' },
    'james cagney': { year: 1899, note: 'Birth year - White Heat (1949)' },
    'laurence olivier': { year: 1907, note: 'Birth year - Hamlet (1948)' },
    'peter o\'toole': { year: 1932, note: 'Birth year - Lawrence of Arabia (1962)' },
    'gregory peck': { year: 1916, note: 'Birth year - To Kill a Mockingbird (1962)' },
    'richard burton': { year: 1925, note: 'Birth year - Who\'s Afraid of Virginia Woolf? (1966)' },
    'kirk douglas': { year: 1916, note: 'Birth year - Spartacus (1960)' },
    'sidney poitier': { year: 1927, note: 'Birth year - In the Heat of the Night (1967)' },
    'henry fonda': { year: 1905, note: 'Birth year - 12 Angry Men (1957)' },
    'charles chaplin': { year: 1889, note: 'Birth year - Modern Times (1936)' },
    'buster keaton': { year: 1895, note: 'Birth year - The General (1926)' },
    'james dean': { year: 1931, note: 'Birth year - Rebel Without a Cause (1955)' },
    'christopher plummer': { year: 1929, note: 'Birth year - The Sound of Music (1965)' },
    'max von sydow': { year: 1929, note: 'Birth year - The Seventh Seal (1957)' },
    'omar sharif': { year: 1932, note: 'Birth year - Doctor Zhivago (1965)' },
    'alec guinness': { year: 1914, note: 'Birth year - The Bridge on the River Kwai (1957)' },
    'peter sellers': { year: 1925, note: 'Birth year - Dr. Strangelove (1964)' },
    'yul brynner': { year: 1920, note: 'Birth year - The King and I (1956)' },
    'steve mcqueen': { year: 1930, note: 'Birth year - The Great Escape (1963)' },
    'spencer tracy': { year: 1900, note: 'Birth year - Guess Who\'s Coming to Dinner (1967)' },
    'james stewart': { year: 1908, note: 'Birth year - It\'s a Wonderful Life (1946)' },
    'humphrey bogart': { year: 1899, note: 'Birth year - Casablanca (1942)' },
    'clark gable': { year: 1901, note: 'Birth year - Gone with the Wind (1939)' },
    'cary grant': { year: 1904, note: 'Birth year - North by Northwest (1959)' },
    'john wayne': { year: 1907, note: 'Birth year - The Searchers (1956)' },
    'jessica chastain': { year: 1977, note: 'Birth year - Zero Dark Thirty (2012)' },
    'scarlett johansson': { year: 1984, note: 'Birth year - Lost in Translation (2003)' },
    'anne hathaway': { year: 1982, note: 'Birth year - Les Misérables (2012)' },
    'amy adams': { year: 1974, note: 'Birth year - Arrival (2016)' },
    'michelle williams': { year: 1980, note: 'Birth year - Blue Valentine (2010)' },
    'margot robbie': { year: 1990, note: 'Birth year - I, Tonya (2017)' },
    'saoirse ronan': { year: 1994, note: 'Birth year - Lady Bird (2017)' },
    'joaquin phoenix': { year: 1974, note: 'Birth year - Walk the Line (2005)' },
    'steve buscemi': { year: 1957, note: 'Birth year - Fargo (1996)' },
    'benicio del toro': { year: 1967, note: 'Birth year - Traffic (2000)' },
    'christoph waltz': { year: 1956, note: 'Birth year - Inglourious Basterds (2009)' },
    'mahershala ali': { year: 1974, note: 'Birth year - Moonlight (2016)' },
    'forest whitaker': { year: 1961, note: 'Birth year - The Last King of Scotland (2006)' },
    'colin firth': { year: 1960, note: 'Birth year - The King\'s Speech (2010)' },
    'geoffrey rush': { year: 1951, note: 'Birth year - Shine (1996)' },
    'tim robbins': { year: 1958, note: 'Birth year - The Shawshank Redemption (1994)' },
    'michael fassbender': { year: 1977, note: 'Birth year - 12 Years a Slave (2013)' },
    'ralph fiennes': { year: 1962, note: 'Birth year - Schindler\'s List (1993)' },
    'jean dujardin': { year: 1972, note: 'Birth year - The Artist (2011)' },
    'adrian brody': { year: 1973, note: 'Birth year - The Pianist (2002)' },
    'christopher waltz': { year: 1956, note: 'Birth year - Django Unchained (2012)' },
    'viggo mortensen': { year: 1958, note: 'Birth year - Eastern Promises (2007)' },
    'jeremy irons': { year: 1948, note: 'Birth year - Reversal of Fortune (1990)' },
    'ian mckellen': { year: 1939, note: 'Birth year - The Lord of the Rings (2001)' },
    'michael caine': { year: 1933, note: 'Birth year - The Cider House Rules (1999)' },
    'alan rickman': { year: 1946, note: 'Birth year - Die Hard (1988)' },
    'kenneth branagh': { year: 1960, note: 'Birth year - Henry V (1989)' },
    'hugh jackman': { year: 1968, note: 'Birth year - Les Misérables (2012)' },
    'jean reno': { year: 1948, note: 'Birth year - Léon: The Professional (1994)' },
    'tony leung': { year: 1962, note: 'Birth year - In the Mood for Love (2000)' },
    'chow yun-fat': { year: 1955, note: 'Birth year - Crouching Tiger, Hidden Dragon (2000)' },
    'toshiro mifune': { year: 1920, note: 'Birth year - Seven Samurai (1954)' },
    'marcello mastroianni': { year: 1924, note: 'Birth year - La Dolce Vita (1960)' },
    'alain delon': { year: 1935, note: 'Birth year - Le Samouraï (1967)' },
    'gérard depardieu': { year: 1948, note: 'Birth year - Cyrano de Bergerac (1990)' },
    'sophia loren': { year: 1934, note: 'Birth year - Two Women (1960)' },
    'catherine deneuve': { year: 1943, note: 'Birth year - Belle de Jour (1967)' },
    'monica bellucci': { year: 1964, note: 'Birth year - Malèna (2000)' },
    'klaus kinski': { year: 1926, note: 'Birth year - Aguirre, the Wrath of God (1972)' },
    'bruno ganz': { year: 1941, note: 'Birth year - Downfall (2004)' },
'jean-paul belmondo': { year: 1933, note: 'Birth year - Breathless (1960)' },
'bruce lee': { year: 1940, note: 'Birth year - Enter the Dragon (1973)' },
'jackie chan': { year: 1954, note: 'Birth year - Rush Hour (1998)' },
'chris tucker': { year: 1971, note: 'Birth year - Rush Hour (1998)' },
'kevin hart': { year: 1979, note: 'Birth year - Ride Along (2014)' },
'dwayne johnson': { year: 1972, note: 'Birth year - The Scorpion King (2002)' },
'colin farrell': { year: 1976, note: 'Birth year - Phone Booth (2002)' },
'jet li': { year: 1963, note: 'Birth year - Hero (2002)' },
'donnie yen': { year: 1963, note: 'Birth year - Ip Man (2008)' },
'eddie murphy': { year: 1961, note: 'Birth year - Beverly Hills Cop (1984)' },
'chris rock': { year: 1965, note: 'Birth year - Madagascar (2005)' },
'dave chappelle': { year: 1973, note: 'Birth year - Half Baked (1998)' },
'wesley snipes': { year: 1962, note: 'Birth year - Blade (1998)' },
'jamie foxx': { year: 1967, note: 'Birth year - Ray (2004)' },
'ice cube': { year: 1969, note: 'Birth year - Boyz n the Hood (1991)' },
'martin lawrence': { year: 1965, note: 'Birth year - Bad Boys (1995)' },
'will ferrell': { year: 1967, note: 'Birth year - Anchorman (2004)' },
'ben stiller': { year: 1965, note: 'Birth year - Zoolander (2001)' },
'owen wilson': { year: 1968, note: 'Birth year - Wedding Crashers (2005)' },
'vince vaughn': { year: 1970, note: 'Birth year - Swingers (1996)' },
'jason statham': { year: 1967, note: 'Birth year - The Transporter (2002)' },
'jean-claude van damme': { year: 1960, note: 'Birth year - Bloodsport (1988)' },
'steven seagal': { year: 1952, note: 'Birth year - Above the Law (1988)' },
'michael jai white': { year: 1967, note: 'Birth year - Spawn (1997)' },
'tony jaa': { year: 1976, note: 'Birth year - Ong-Bak (2003)' },
'vin diesel': { year: 1967, note: 'Birth year - The Fast and the Furious (2001)' },
'paul walker': { year: 1973, note: 'Birth year - The Fast and the Furious (2001)' },
'idris elba': { year: 1972, note: 'Birth year - The Wire (2002)' },
'michael b. jordan': { year: 1987, note: 'Birth year - Creed (2015)' },
'daniel kaluuya': { year: 1989, note: 'Birth year - Get Out (2017)' },
'john boyega': { year: 1992, note: 'Birth year - Star Wars: The Force Awakens (2015)' },
'donald glover': { year: 1983, note: 'Birth year - Solo: A Star Wars Story (2018)' },
'jackie earle haley': { year: 1961, note: 'Birth year - Watchmen (2009)' },
'terry crews': { year: 1968, note: 'Birth year - White Chicks (2004)' },
'danny trejo': { year: 1944, note: 'Birth year - Machete (2010)' },
'ken jeong': { year: 1969, note: 'Birth year - The Hangover (2009)' },
'ken watanabe': { year: 1959, note: 'Birth year - The Last Samurai (2003)' },
'andy serkis': { year: 1964, note: 'Birth year - The Lord of the Rings (2001)' },
'adam sandler': { year: 1966, note: 'Birth year - Happy Gilmore (1996)' },
'chris pratt': { year: 1979, note: 'Birth year - Guardians of the Galaxy (2014)' },
'dave bautista': { year: 1969, note: 'Birth year - Guardians of the Galaxy (2014)' },
'john cena': { year: 1977, note: 'Birth year - The Marine (2006)' },
'ryan reynolds': { year: 1976, note: 'Birth year - Deadpool (2016)' },
'hugh laurie': { year: 1959, note: 'Birth year - House M.D. (2004)' },
'brendan fraser': { year: 1968, note: 'Birth year - The Mummy (1999)' },
'nathan fillion': { year: 1971, note: 'Birth year - Firefly (2002)' },
'hugo weaving': { year: 1960, note: 'Birth year - The Matrix (1999)' },
'karl urban': { year: 1972, note: 'Birth year - The Lord of the Rings (2001)' },
'simon pegg': { year: 1970, note: 'Birth year - Shaun of the Dead (2004)' },
'nick frost': { year: 1972, note: 'Birth year - Hot Fuzz (2007)' },
'bill murray': { year: 1950, note: 'Birth year - Ghostbusters (1984)' }
  };

  // Get zodiac sign for each actor
  const actorZodiacs = Object.entries(actorData).reduce((acc, [actor, data]) => {
    const sign = getZodiacSign(Math.abs(data.year));
    if (!acc[sign]) acc[sign] = [];
    acc[sign].push(actor);
    return acc;
  }, {});

  // All zodiac signs for the filter
  const zodiacSigns = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 
                      'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];

  // Filter actors based on search and selected zodiac
  const getFilteredActors = () => {
    let filtered = Object.keys(actorData);
    
    if (search) {
      filtered = filtered.filter(actor => 
        actor.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (selectedZodiac) {
      filtered = actorZodiacs[selectedZodiac] || [];
    }
    
    return filtered;
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Actor Zodiac Finder
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
            placeholder="Search for an actor..."
            className="w-full p-2 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>

        {/* Results Display */}
        <div className="mt-4">
          {getFilteredActors().map((actor) => (
            <div key={actor} className="p-2 border-b">
              <span className="capitalize">{actor}</span>
              <span className="float-right text-gray-600">
                {getZodiacSign(actorData[actor].year)}
                {' '}
                ({actorData[actor].year})
              </span>
              <div className="text-sm text-gray-500 mt-1">
                {actorData[actor].note}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Zodiac Info */}
        {selectedZodiac && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">
              {selectedZodiac} Actors: {(actorZodiacs[selectedZodiac] || []).length}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActorSelector;
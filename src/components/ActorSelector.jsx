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
      'marlon brando': { year: 1924, note: 'Godfather' },
      'robert de niro': { year: 1943, note: 'TaxiDriver' },
      'al pacino': { year: 1940, note: 'Godfather' }, // Note: Same movie as Brando
      'jack nicholson': { year: 1937, note: 'CuckoosNest' },
      'morgan freeman': { year: 1937, note: 'DrivingMissDaisy' },
      'tom hanks': { year: 1956, note: 'ForrestGump' },
      'anthony hopkins': { year: 1937, note: 'SilenceOfTheLambs' },
      'daniel day-lewis': { year: 1957, note: 'MyLeftFoot' },
      'leonardo dicaprio': { year: 1974, note: 'Titanic' },
      'brad pitt': { year: 1963, note: 'FightClub' },
      'denzel washington': { year: 1954, note: 'TrainingDay' },
      'christian bale': { year: 1974, note: 'AmericanPsycho' },
      'heath ledger': { year: 1979, note: 'DarkKnight' },
      'gary oldman': { year: 1958, note: 'DarkestHour' },
      'russell crowe': { year: 1964, note: 'Gladiator' },
      'edward norton': { year: 1969, note: 'AmericanHistoryX' },
      'matthew mcconaughey': { year: 1969, note: 'DallasBuyersClub' },
      'tom cruise': { year: 1962, note: 'TopGun' },
      'johnny depp': { year: 1963, note: 'Pirates' }, // Shortened for brevity
      'samuel l. jackson': { year: 1948, note: 'PulpFiction' },
      'harrison ford': { year: 1942, note: 'StarWars' },
      'sean connery': { year: 1930, note: 'DrNo' },
      'clint eastwood': { year: 1930, note: 'GoodBadUgly' }, // Shortened
      'robert redford': { year: 1936, note: 'ButchCassidy' }, // Shortened
      'paul newman': { year: 1925, note: 'CoolHandLuke' },
      'dustin hoffman': { year: 1937, note: 'Graduate' },
      'gene hackman': { year: 1930, note: 'FrenchConnection' },
      'robin williams': { year: 1951, note: 'DeadPoetsSociety' },
      'sylvester stallone': { year: 1946, note: 'Rocky' },
      'arnold schwarzenegger': { year: 1947, note: 'Terminator' },
      'bruce willis': { year: 1955, note: 'DieHard' },
      'mel gibson': { year: 1956, note: 'MadMax' },
      'will smith': { year: 1968, note: 'MenInBlack' },
      'jim carrey': { year: 1962, note: 'AceVentura' },
      'robert downey jr.': { year: 1965, note: 'IronMan' },
      'chris evans': { year: 1981, note: 'CaptainAmerica' },
      'chris hemsworth': { year: 1983, note: 'Thor' },
      'ryan gosling': { year: 1980, note: 'LaLaLand' },
      'jake gyllenhaal': { year: 1980, note: 'DonnieDarko' },
      'benedict cumberbatch': { year: 1976, note: 'ImitationGame' },
      'tom hardy': { year: 1977, note: 'FuryRoad' }, // From Mad Max: Fury Road
      'chadwick boseman': { year: 1976, note: 'BlackPanther' },
      'keanu reeves': { year: 1964, note: 'Matrix' },
      'willem dafoe': { year: 1955, note: 'Platoon' },
      'christopher walken': { year: 1943, note: 'DeerHunter' },
      'jeff bridges': { year: 1949, note: 'BigLebowski' },
      'philip seymour hoffman': { year: 1967, note: 'Capote' },
      'javier bardem': { year: 1969, note: 'NoCountry' }, // Shortened
      'audrey hepburn': { year: 1929, note: 'RomanHoliday' },
      'elizabeth taylor': { year: 1932, note: 'Cleopatra' },
      'katherine hepburn': { year: 1907, note: 'AfricanQueen' },
      'ingrid bergman': { year: 1915, note: 'Casablanca' },
      'cate blanchett': { year: 1969, note: 'Elizabeth' },
      'julia roberts': { year: 1967, note: 'PrettyWoman' },
      'nicole kidman': { year: 1967, note: 'MoulinRouge' },
      'charlize theron': { year: 1975, note: 'Monster' },
      'viola davis': { year: 1965, note: 'Fences' },
      'jodie foster': { year: 1962, note: 'SilenceOfTheLambs' }, // Note: Same movie as Hopkins
      'sandra bullock': { year: 1964, note: 'Gravity' },
      'emma thompson': { year: 1959, note: 'HowardsEnd' },
      'helen mirren': { year: 1945, note: 'Queen' },
      'judi dench': { year: 1934, note: 'ShakespeareInLove' },
      'maggie smith': { year: 1934, note: 'MissJeanBrodie' }, // Shortened
      'glenn close': { year: 1947, note: 'FatalAttraction' },
      'sigourney weaver': { year: 1949, note: 'Alien' },
      'jessica lange': { year: 1949, note: 'Tootsie' },
      'michelle pfeiffer': { year: 1958, note: 'Scarface' },
      'emma stone': { year: 1988, note: 'LaLaLand' }, // Note: Same movie as Gosling
      'jennifer lawrence': { year: 1990, note: 'SilverLiningsPlaybook' },
      'natalie portman': { year: 1981, note: 'BlackSwan' },
      'julianne moore': { year: 1960, note: 'StillAlice' },
      'frances mcdormand': { year: 1957, note: 'Fargo' },
      'marion cotillard': { year: 1975, note: 'LaVieEnRose' },
      'kate winslet': { year: 1975, note: 'EternalSunshine' }, // Shortened
      'olivia colman': { year: 1974, note: 'Favourite' },
      'bette davis': { year: 1908, note: 'AllAboutEve' },
      'james cagney': { year: 1899, note: 'WhiteHeat' },
      'laurence olivier': { year: 1907, note: 'Hamlet' },
      'peter o\'toole': { year: 1932, note: 'LawrenceOfArabia' },
      'gregory peck': { year: 1916, note: 'ToKillAMockingbird' },
      'richard burton': { year: 1925, note: 'VirginiaWoolf' }, // Shortened
      'kirk douglas': { year: 1916, note: 'Spartacus' },
      'sidney poitier': { year: 1927, note: 'InTheHeatOfTheNight' },
      'henry fonda': { year: 1905, note: '12AngryMen' },
      'charles chaplin': { year: 1889, note: 'ModernTimes' },
      'buster keaton': { year: 1895, note: 'General' },
      'james dean': { year: 1931, note: 'RebelWithoutCause' },
      'christopher plummer': { year: 1929, note: 'SoundOfMusic' },
      'max von sydow': { year: 1929, note: 'SeventhSeal' },
      'omar sharif': { year: 1932, note: 'DoctorZhivago' },
      'alec guinness': { year: 1914, note: 'RiverKwai' }, // Shortened
      'peter sellers': { year: 1925, note: 'DrStrangelove' },
      'yul brynner': { year: 1920, note: 'KingAndI' },
      'steve mcqueen': { year: 1930, note: 'GreatEscape' },
      'spencer tracy': { year: 1900, note: 'GuessWhosComing' }, // Shortened
      'james stewart': { year: 1908, note: 'WonderfulLife' }, // Shortened
      'humphrey bogart': { year: 1899, note: 'Casablanca' }, // Note: Same movie as Bergman
      'clark gable': { year: 1901, note: 'GoneWithTheWind' },
      'cary grant': { year: 1904, note: 'NorthByNorthwest' },
      'john wayne': { year: 1907, note: 'Searchers' },
      'jessica chastain': { year: 1977, note: 'ZeroDarkThirty' },
      'scarlett johansson': { year: 1984, note: 'LostInTranslation' },
      'anne hathaway': { year: 1982, note: 'LesMiserables' },
      'amy adams': { year: 1974, note: 'Arrival' },
      'michelle williams': { year: 1980, note: 'BlueValentine' },
      'margot robbie': { year: 1990, note: 'Tonya' }, // Shortened from I, Tonya
      'saoirse ronan': { year: 1994, note: 'LadyBird' },
      'joaquin phoenix': { year: 1974, note: 'WalkTheLine' },
      'steve buscemi': { year: 1957, note: 'Fargo' }, // Note: Same movie as McDormand
      'benicio del toro': { year: 1967, note: 'Traffic' },
      'christoph waltz': { year: 1956, note: 'InglouriousBasterds' }, // Note: Has another entry for Django
      'mahershala ali': { year: 1974, note: 'Moonlight' },
      'forest whitaker': { year: 1961, note: 'LastKingOfScotland' },
      'colin firth': { year: 1960, note: 'KingsSpeech' },
      'geoffrey rush': { year: 1951, note: 'Shine' },
      'tim robbins': { year: 1958, note: 'ShawshankRedemption' },
      'michael fassbender': { year: 1977, note: '12YearsASlave' },
      'ralph fiennes': { year: 1962, note: 'SchindlersList' },
      'jean dujardin': { year: 1972, note: 'Artist' },
      'adrian brody': { year: 1973, note: 'Pianist' },
      // 'christopher waltz': { year: 1956, note: 'DjangoUnchained' }, // Original data had duplicate Christoph Waltz, using first movie.
      'viggo mortensen': { year: 1958, note: 'EasternPromises' },
      'jeremy irons': { year: 1948, note: 'ReversalOfFortune' },
      'ian mckellen': { year: 1939, note: 'LordOfTheRings' },
      'michael caine': { year: 1933, note: 'CiderHouseRules' },
      'alan rickman': { year: 1946, note: 'DieHard' }, // Note: Same movie as Willis
      'kenneth branagh': { year: 1960, note: 'HenryV' },
      'hugh jackman': { year: 1968, note: 'LesMiserables' }, // Note: Same movie as Hathaway
      'jean reno': { year: 1948, note: 'LeonTheProfessional' },
      'tony leung': { year: 1962, note: 'InTheMoodForLove' },
      'chow yun-fat': { year: 1955, note: 'CrouchingTiger' }, // Shortened
      'toshiro mifune': { year: 1920, note: 'SevenSamurai' },
      'marcello mastroianni': { year: 1924, note: 'LaDolceVita' },
      'alain delon': { year: 1935, note: 'LeSamourai' },
      'gérard depardieu': { year: 1948, note: 'CyranoDeBergerac' },
      'sophia loren': { year: 1934, note: 'TwoWomen' },
      'catherine deneuve': { year: 1943, note: 'BelleDeJour' },
      'monica bellucci': { year: 1964, note: 'Malena' },
      'klaus kinski': { year: 1926, note: 'Aguirre' }, // Shortened
      'bruno ganz': { year: 1941, note: 'Downfall' },
      'jean-paul belmondo': { year: 1933, note: 'Breathless' },
      'bruce lee': { year: 1940, note: 'EnterTheDragon' },
      'jackie chan': { year: 1954, note: 'RushHour' },
      'chris tucker': { year: 1971, note: 'RushHour' }, // Note: Same movie as Chan
      'kevin hart': { year: 1979, note: 'RideAlong' },
      'dwayne johnson': { year: 1972, note: 'ScorpionKing' },
      'colin farrell': { year: 1976, note: 'PhoneBooth' },
      'jet li': { year: 1963, note: 'Hero' },
      'donnie yen': { year: 1963, note: 'IpMan' },
      'eddie murphy': { year: 1961, note: 'BeverlyHillsCop' },
      'chris rock': { year: 1965, note: 'Madagascar' },
      'dave chappelle': { year: 1973, note: 'HalfBaked' },
      'wesley snipes': { year: 1962, note: 'Blade' },
      'jamie foxx': { year: 1967, note: 'Ray' },
      'ice cube': { year: 1969, note: 'BoyzNTheHood' },
      'martin lawrence': { year: 1965, note: 'BadBoys' },
      'will ferrell': { year: 1967, note: 'Anchorman' },
      'ben stiller': { year: 1965, note: 'Zoolander' },
      'owen wilson': { year: 1968, note: 'WeddingCrashers' },
      'vince vaughn': { year: 1970, note: 'Swingers' },
      'jason statham': { year: 1967, note: 'Transporter' },
      'jean-claude van damme': { year: 1960, note: 'Bloodsport' },
      'steven seagal': { year: 1952, note: 'AboveTheLaw' },
      'michael jai white': { year: 1967, note: 'Spawn' },
      'tony jaa': { year: 1976, note: 'OngBak' },
      'vin diesel': { year: 1967, note: 'FastAndFurious' },
      'paul walker': { year: 1973, note: 'FastAndFurious' }, // Note: Same movie as Diesel
      'idris elba': { year: 1972, note: 'Wire' }, // TV Show
      'michael b. jordan': { year: 1987, note: 'Creed' },
      'daniel kaluuya': { year: 1989, note: 'GetOut' },
      'john boyega': { year: 1992, note: 'ForceAwakens' }, // Shortened
      'donald glover': { year: 1983, note: 'Solo' },
      'jackie earle haley': { year: 1961, note: 'Watchmen' },
      'terry crews': { year: 1968, note: 'WhiteChicks' },
      'danny trejo': { year: 1944, note: 'Machete' },
      'ken jeong': { year: 1969, note: 'Hangover' },
      'ken watanabe': { year: 1959, note: 'LastSamurai' },
      'andy serkis': { year: 1964, note: 'LordOfTheRings' }, // Note: Same movie as McKellen
      'adam sandler': { year: 1966, note: 'HappyGilmore' },
      'chris pratt': { year: 1979, note: 'GuardiansOfTheGalaxy' },
      'dave bautista': { year: 1969, note: 'GuardiansOfTheGalaxy' }, // Note: Same movie as Pratt
      'john cena': { year: 1977, note: 'Marine' },
      'ryan reynolds': { year: 1976, note: 'Deadpool' },
      'hugh laurie': { year: 1959, note: 'HouseMD' }, // TV Show
      'brendan fraser': { year: 1968, note: 'Mummy' },
      'nathan fillion': { year: 1971, note: 'Firefly' }, // TV Show
      'hugo weaving': { year: 1960, note: 'Matrix' }, // Note: Same movie as Reeves
      'karl urban': { year: 1972, note: 'LordOfTheRings' }, // Note: Same movie as McKellen, Serkis
      'simon pegg': { year: 1970, note: 'ShaunOfTheDead' },
      'nick frost': { year: 1972, note: 'HotFuzz' },
      'bill murray': { year: 1950, note: 'Ghostbusters' }
    
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
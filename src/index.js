import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import SecondApp from './components/numerologyCalculator/SecondApp';
import YourNumberPage from './components/YourNumberPage';
import CompatabilityPage from './components/CompatabilityPage'; // Note the 'a' spelling
import NumerologyReferenceApp from './components/NumerologyReferenceApp'; // Import the numerology reference component
import DateNumerologyCalculator from './components/DateNumerologyCalculator'; // Add this line
import PlanetaryNatureReference from './components/PlanetaryNatureReference';
import { register } from './ServiceWorker';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InteractiveSolarSystem from './components/InteractiveSolarSystem';

register();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/galaxy" element={<SecondApp />} />
        <Route path="/your-number" element={<YourNumberPage />} />
        <Route path="/compatibility" element={<CompatabilityPage />} />
        <Route path="/numerology-reference" element={<NumerologyReferenceApp />} />
        <Route path="/date-numerology" element={<DateNumerologyCalculator />} /> {/* Add this line */}
        <Route path="/planetary-nature" element={<PlanetaryNatureReference />} />
        <Route path="/solar-system" element={<InteractiveSolarSystem />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BackgroundSelector from './BackgroundSelector';
import StartPage from './StartPage';
import QuizApp from './QuizApp';
import FamilyFeud from './FamilyFeud'; // Import the Family Feud component

import { BackgroundProvider } from './BackgroundContext'; 

function NavigationMenu() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Select Background</Link>
        </li>
        <li>
          <Link to="/page">Start Page</Link>
        </li>
        <li>
          <Link to="/quiz">Quiz App</Link>
        </li>
        <li>
          <Link to="/family-feud">Family Feud</Link>
        </li>
      </ul>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <BackgroundProvider> 
        <div className="App">
          <Routes>
            <Route path="/" element={<BackgroundSelector />} />
            <Route
              path="/page"
              element={
                <div>
                  <NavigationMenu />
                  <StartPage />
                </div>
              }
            />
            <Route path="/quiz" element={<QuizApp />} />
            <Route path="/family-feud" element={<FamilyFeud />} />
          </Routes>
        </div>
      </BackgroundProvider>
    </Router>
  );
}

export default App;

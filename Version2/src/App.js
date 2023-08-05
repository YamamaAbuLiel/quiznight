import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BackgroundSelector from './BackgroundSelector';
import StartPage from './StartPage';
import QuizApp from './QuizApp';
import NavigationMenu from './Navigation';
import PaperGroup from './PaperGroup';

import ScorePage from './ScorePage';
import { BackgroundProvider } from './BackgroundContext'; 

function App() {
  return (
    <Router>
      <BackgroundProvider> 
        <div className="App">
          <Routes>
            {/* Set the NavigationMenu as the default route */}
            <Route path="/" element={<NavigationMenu />} />
            <Route path="/back" element={<BackgroundSelector />} />
            <Route path="/page" element={<StartPage />} />
            <Route path="/" element={<NavigationMenu />} />

            <Route path="/paper" element={<PaperGroup />} />
           
            
            <Route path="/quiz" element={<QuizApp />} />
            <Route path="/score" element={<ScorePage />} />

          </Routes>
        </div>
      </BackgroundProvider>
    </Router>
  );
}
export default App;

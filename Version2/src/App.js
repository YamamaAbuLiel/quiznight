import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BackgroundSelector from './BackgroundSelector';
import StartPage from './StartPage';
import QuizApp from "./QuizApp"
import { BackgroundProvider } from './BackgroundContext'; 

function App() {
  return (
    <Router>
      <BackgroundProvider> {}
        <div className="App">
          {}
          <Routes>
            <Route path="/" element={<BackgroundSelector />} />
            <Route path="/page" element={<StartPage />} />
            <Route path="/quiz" element={<QuizApp />} />
          </Routes>
        </div>
      </BackgroundProvider>
    </Router>
  );
}

export default App;

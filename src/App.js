import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BackgroundSelector from './BackgroundSelector';
import StartPage from './StartPage';


function App() {
  return (
    <Router>
      <div className="App">
        {/* Other components and content */}
        <Routes>
          {/* Route for the BackgroundSelector component */}
          <Route path="/" element={<BackgroundSelector />} />

          {/* Route for the PageComponent component */}
          <Route path="/page" element={<StartPage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;




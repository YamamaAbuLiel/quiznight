
import React from 'react';
import { useLocation } from 'react-router-dom';
import './StartPage.css'; 

function StartPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const title = queryParams.get('title') || 'Default Title';
  const selectedBackground = queryParams.get('background') || '';

  return (
    <div className="page-container" style={{ backgroundImage: `url(${selectedBackground})` }}>
      <div className="title-container">
        <h1 className="page-title">{title}</h1>
      </div>
      <button className="start-button">Start</button>
    </div>
  );
}

export default StartPage;


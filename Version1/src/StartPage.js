import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './StartPage.css';
import { useBackgroundContext } from './BackgroundContext';

function StartPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const title = queryParams.get('title') || 'صوت الريادة';

  const { selectedBackground } = useBackgroundContext();
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate('/quiz'); 
  };

  return (
    <div className="page-container" style={{ backgroundImage: `url(${selectedBackground})` }}> {/* Added backticks for template literal */}
      <div className="title-container">
        <h1 className="page-title">{title}</h1>
      </div>
      <button className="start-button" onClick={startQuiz}>
        ابدأ
      </button>
    </div>
  );
}

export default StartPage;

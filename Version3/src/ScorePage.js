import React from 'react';
import "./ScorePage.css"
import { useBackgroundContext } from './BackgroundContext';

const ScorePage = ({ score }) => {
  const { selectedBackground } = useBackgroundContext();

  return (
    <div className="score-page  page-container" style={{ backgroundImage: `url(${selectedBackground})` }}>
      <h1>Your Score: {score}</h1>
    </div>
  );
};

export default ScorePage;

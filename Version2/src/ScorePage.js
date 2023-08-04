import React from 'react';
import { useBackgroundContext } from './BackgroundContext';

const ScorePage = ({ score }) => {
  const { selectedBackground } = useBackgroundContext();

  return (
    <div className="score-page" style={{ backgroundImage: `url(${selectedBackground})` }}>
      <h1>Your Score: {score}</h1>
    </div>
  );
};

export default ScorePage;

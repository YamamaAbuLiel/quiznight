import React from 'react';
import { useBackgroundContext } from './BackgroundContext';

import "./ScorePage.css";

const ScorePage = ({ score }) => {
  const { selectedBackground } = useBackgroundContext();

 

  return (
    <div className=" page-container score-page" style={{ backgroundImage: `url(${selectedBackground})` }}>
      <h1>المجموع: {score}</h1>
    </div>
  );
};

export default ScorePage;

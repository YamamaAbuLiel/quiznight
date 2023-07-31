import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import background1 from './Backgrounds/Design1.png';
import background2 from './Backgrounds/Design2.png';
import './BackgroundSelector.css'; 

const BackgroundOption = ({ value, checked, onChange }) => (
  <div className={`background-option ${checked ? 'selected' : ''}`} onClick={() => onChange(value)}>
    <img className="background-image" src={value} alt={`Background ${value}`} />
  </div>
);

function BackgroundSelector() {
  const [selectedBackground, setSelectedBackground] = useState(background1);
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const handleBackgroundChange = (background) => {
    setSelectedBackground(background);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/page?title=${title}&background=${selectedBackground}`);
  };

  return (
    <div className="page-container">
    <div className="container">
      <h1>Welcome!</h1>
      <p>Please choose the theme you want:</p>

      <form onSubmit={handleSubmit}>
        <div className="background-radio">
          <BackgroundOption
            value={background1}
            checked={selectedBackground === background1}
            onChange={handleBackgroundChange}
          />
          <BackgroundOption
            value={background2}
            checked={selectedBackground === background2}
            onChange={handleBackgroundChange}
          />
        </div>
        <div className='title-block'>
          <label>
            Title:
            <input type="text" value={title} onChange={handleTitleChange} className="title-input" />
          </label>
        </div>
        <div className="button-container">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default BackgroundSelector;


import React, { useState } from 'react';
import { getFamilyFeudData } from './Questions';
import './FamilyFeud.css'; 

function QuestionBar({ onLeftScoreChange, onRightScoreChange }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const familyFeudData = getFamilyFeudData();
  const currentQuestion = familyFeudData[currentQuestionIndex].question;
  const answers = Object.values(familyFeudData[currentQuestionIndex]).slice(1, 9);

  const [revealedAnswers, setRevealedAnswers] = useState(Array(answers.length).fill(false));
  const [wrongAnswer, setWrongAnswer] = useState(false);

  const handleAnswerClick = (index) => {
    if (!revealedAnswers[index]) {
      setRevealedAnswers((prevState) => {
        const newState = [...prevState];
        newState[index] = true;

        const answerMark = answers[index].mark;
        if (index % 2 === 0) {
          onLeftScoreChange(answerMark);
        } else {
          onRightScoreChange(answerMark);
        }

        return newState;
      });
    }
  };

  const handleWrongAnswer = () => {
    setWrongAnswer(true);
    setTimeout(() => {
      setWrongAnswer(false);
    }, 2000);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % familyFeudData.length);
    setRevealedAnswers(Array(answers.length).fill(false));
  };

  return (
    <div className="question-bar">
      <h2>{currentQuestion}</h2>
      <div className="answer-box">
        {answers.map((answer, index) => (
          <div
            key={index}
            className={`answer ${revealedAnswers[index] ? 'revealed' : ''}`}
            onClick={() => handleAnswerClick(index)}
          >
            {revealedAnswers[index] ? answer.answer : 'اضغط لإظهار الجواب'}
          </div>
        ))}
        {wrongAnswer && <div className="answer wrong-answer">X</div>}
      </div>
      <button onClick={handleWrongAnswer} className="wrong-answer-button">
        جواب خاطئ
      </button>
      <button onClick={handleNextQuestion} className='next-button'>السؤال التالي</button>
    </div>
  );
}


function FamilyFeud() {
  const [leftScore, setLeftScore] = useState(0);
  const [rightScore, setRightScore] = useState(0);

  const handleLeftScoreChange = (value) => {
    setLeftScore(leftScore + value);
  };

  const handleRightScoreChange = (value) => {
    setRightScore(rightScore + value);
  };

  return (
    <div className="family-feud-container">
      <div className="scoreboard left-scoreboard">
        <h3>المجموعة الاولى</h3>
        <p>{leftScore}</p>
      </div>
      <div className="main-content">
        <QuestionBar
          onLeftScoreChange={handleLeftScoreChange}
          onRightScoreChange={handleRightScoreChange}
        />
      </div>
      <div className="scoreboard right-scoreboard">
        <h3>المجموعة الثانية</h3>
        <p>{rightScore}</p>
      </div>
    </div>
  );
}


export default FamilyFeud;

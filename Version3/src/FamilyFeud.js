import React, { useState } from 'react';
import { getFamilyFeudData } from './Questions';
import { useBackgroundContext } from './BackgroundContext';
import './FamilyFeud.css'; 

function QuestionBar({ onLeftScoreChange, onRightScoreChange }) {
  const { selectedBackground } = useBackgroundContext();
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

  const handleGivePointsToLeft = (index) => {
    if (revealedAnswers[index]) {
      const answerMark = answers[index].mark;
      onLeftScoreChange(answerMark);
    }
  };

  const handleGivePointsToRight = (index) => {
    if (revealedAnswers[index]) {
      const answerMark = answers[index].mark;
      onRightScoreChange(answerMark);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % familyFeudData.length);
    setRevealedAnswers(Array(answers.length).fill(false));
  };

  const isLastQuestion = currentQuestionIndex === familyFeudData.length - 1;

  return (
    <div className="page-container" style={{ backgroundImage: `url(${selectedBackground})` }}>
    <div className="question-bar">
      <h2 id="Questionh">{currentQuestion}</h2>
      <div className="answer-box">
        {answers.map((answer, index) => (
          <div
            key={index}
            className={`answer ${revealedAnswers[index] ? 'revealed' : ''}`}
            onClick={() => handleAnswerClick(index)}
          >
            {revealedAnswers[index] ? answer.answer : 'اضغط لإظهار الجواب'}
            <div className="score-buttons">
              <button onClick={() => handleGivePointsToLeft(index)} disabled={!revealedAnswers[index]}>
                إعطاء النقاط للفريق الأول
              </button>
              <button onClick={() => handleGivePointsToRight(index)} disabled={!revealedAnswers[index]}>
                إعطاء النقاط للفريق الثاني
              </button>
            </div>
          </div>
        ))}
        {wrongAnswer && <div className="answer wrong-answer">X</div>}
      </div>
      <button onClick={handleWrongAnswer} className="wrong-answer-button">
        جواب خاطئ
      </button>
      {isLastQuestion ? (
        <button className="next-button" >
          انتهت الأسئلة
        </button>
      ) : (
        <button onClick={handleNextQuestion} className="next-button">
          السؤال التالي
        </button>
      )}
    </div>
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

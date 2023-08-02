import React, { useState, useEffect } from 'react';
import { useBackgroundContext } from './BackgroundContext';
import categories from './QuizQuestions';
import "./QuizApp.css";

function QuizApp() {
  const { selectedBackground } = useBackgroundContext();
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);
  const [answers, setAnswers] = useState(Array(Object.keys(categories).length).fill(null));

  const handleAnswer = (answer) => {
    const correctAnswer = categories[Object.keys(categories)[currentCategoryIndex]].questions[currentQuestionIndex].correctAnswer;
    const isCorrect = answer === correctAnswer;
    const newAnswers = [...answers];
    newAnswers[currentCategoryIndex] = { answer, isCorrect };
    setAnswers(newAnswers);
  
    if (!isCorrect) {
      setShowAnswers(true);
    }
  };
  
  const handleNextQuestion = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex === categories[Object.keys(categories)[currentCategoryIndex]].questions.length) {
      if (currentCategoryIndex + 1 === Object.keys(categories).length) {
        setShowAnswers(true);
      } else {
        setCurrentCategoryIndex(currentCategoryIndex + 1);
        setCurrentQuestionIndex(0);
        setAnswers(Array(Object.keys(categories).length).fill(null)); 
        setShowAnswers(false);
      }
    } else {
      setCurrentQuestionIndex(nextQuestionIndex);
      setAnswers([...answers.slice(0, currentCategoryIndex), null, ...answers.slice(currentCategoryIndex + 1)]);
      setShowAnswers(false);
    }
  };
  

  // useEffect(() => {
  //   let timer;
  //   if (!showAnswers) {
  //     timer = setTimeout(() => {
  //       handleNextQuestion();
  //     }, 20000);
  //   }
  //   return () => clearTimeout(timer);
  // }, [currentQuestionIndex, showAnswers]);

  return (
    <div className="page-container" style={{ backgroundImage: `url(${selectedBackground})` }}>
      <div className="question-container">
        <h1>{categories[Object.keys(categories)[currentCategoryIndex]].categoryTitle}</h1>
        <h3>{categories[Object.keys(categories)[currentCategoryIndex]].questions[currentQuestionIndex].question}</h3>
        <ul className="choices-grid">
          {categories[Object.keys(categories)[currentCategoryIndex]].questions[currentQuestionIndex].choices.map((choice, index) => {
          const selectedAnswer = answers[currentCategoryIndex]?.answer;
            const isCorrect = choice === categories[Object.keys(categories)[currentCategoryIndex]].questions[currentQuestionIndex].correctAnswer;
            const isSelected = selectedAnswer === choice;
            const isWrong = isSelected && !isCorrect;
            const isCorrectAnswer = isCorrect && showAnswers;
            const shouldDisable = showAnswers || (isSelected && !showAnswers); 
            const className = isWrong ? "wrong-answer" : (isCorrectAnswer ? "correct-answer" : "");
            return (
              <li key={index}>
              <button
                className={className}
                onClick={() => handleAnswer(choice)}
                disabled={shouldDisable}
              >
              {choice}
              </button>
              </li>
            );
        })}
      </ul>
        <button onClick={handleNextQuestion}>السؤال التالي</button>
      </div>
    </div>
  );
}

export default QuizApp;

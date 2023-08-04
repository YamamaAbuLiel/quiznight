import React, { useState} from 'react';
import { useBackgroundContext } from './BackgroundContext';
import categories from './QuizQuestions';
import ScorePage from './ScorePage';
import "./QuizApp.css";

function QuizApp() {
  const { selectedBackground } = useBackgroundContext();
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [answers, setAnswers] = useState(Array(Object.keys(categories).length).fill(null));
  const [score, setScore] = useState(0);


  const handleAnswer = (answer) => {
    const correctAnswer = categories[Object.keys(categories)[currentCategoryIndex]].questions[currentQuestionIndex].correctAnswer;
    const isCorrect = answer === correctAnswer;
    const newAnswers = [...answers];
    newAnswers[currentCategoryIndex] = { answer, isCorrect };
    setAnswers(newAnswers);
  
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    
  
    if (!isCorrect) {
      setShowAnswers(true);
    } else {
      setButtonClicked(true);
    }
  };


  let buttonText;
  if (currentCategoryIndex === Object.keys(categories).length - 1 && currentQuestionIndex === categories[Object.keys(categories)[currentCategoryIndex]].questions.length - 1) {
    buttonText = 'النتيجة';
  } else {
    buttonText = 'السؤال التالي';
  }
  
  if (buttonClicked && currentCategoryIndex === Object.keys(categories).length - 1 && currentQuestionIndex === categories[Object.keys(categories)[currentCategoryIndex]].questions.length - 1) {
    return <ScorePage score={score} />;
  }
  
  const handleNextQuestion = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex === categories[Object.keys(categories)[currentCategoryIndex]].questions.length) {
      if (currentCategoryIndex + 1 === Object.keys(categories).length) {
        setShowAnswers(true);
        setButtonClicked(true);
      } else {
        setCurrentCategoryIndex(currentCategoryIndex + 1);
        setCurrentQuestionIndex(0);
        setAnswers(Array(Object.keys(categories).length).fill(null)); 
        setShowAnswers(false);
        setButtonClicked(false);
      }
    } else {
      setCurrentQuestionIndex(nextQuestionIndex);
      setAnswers([...answers.slice(0, currentCategoryIndex), null, ...answers.slice(currentCategoryIndex + 1)]);
      setShowAnswers(false);
      setButtonClicked(false);
    }
    
  };

  

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
            const correctAnswerSelected = isCorrect && isSelected;
            const shouldDisable = showAnswers || isCorrectAnswer || buttonClicked;
            const className = isWrong ? "wrong-answer" : (isCorrectAnswer ? "correct-answer" : (correctAnswerSelected?"correct-answer":""));
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
      <div id="foter">
      <h2>المجموع:{score}</h2>
        <button onClick={handleNextQuestion}>{buttonText}</button>
      </div>
      
      </div>
    </div>
  );
}


export default QuizApp;

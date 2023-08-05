import React, { useState,useEffect } from 'react';
import { useBackgroundContext } from './BackgroundContext';
import categories from './paper group QuizQuestions';
import "./paper group.css";




function PaperGroup() {
    const { selectedBackground } = useBackgroundContext();
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showAnswers, setShowAnswers] = useState(false);
    const [answers, setAnswers] = useState(Array(Object.keys(categories).length).fill(null));
  
   
  
    const handleNextQuestion = () => {
      if (currentQuestionIndex + 1 === categories[Object.keys(categories)[currentCategoryIndex]].questions.length) {
        if (currentCategoryIndex + 1 === Object.keys(categories).length) {
          setShowAnswers(true);
        } else {
          setCurrentCategoryIndex(currentCategoryIndex + 1);
          setCurrentQuestionIndex(0);
        }
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    };

    useEffect(() => {
        let timer;
        if (!showAnswers) {
          timer = setTimeout(() => {
            handleNextQuestion();
          }, 20000); 
        }
        return () => clearTimeout(timer);
      }, [currentQuestionIndex, showAnswers]);
  
    return (
        <div className="page-container" style={{ backgroundImage: `url(${selectedBackground})` }}>

        {!showAnswers ? (
              <div className="page-container" style={{ backgroundImage: `url(${selectedBackground})` }}>
              <div className="question-container">
                <h1>{categories[Object.keys(categories)[currentCategoryIndex]].categoryTitle}</h1>
                <h3>{categories[Object.keys(categories)[currentCategoryIndex]].questions[currentQuestionIndex].question}</h3>
                <ul className="choices-grid">
                  {categories[Object.keys(categories)[currentCategoryIndex]].questions[currentQuestionIndex].choices.map((choice, index) => (
                    <li key={index}>
                      <button >{choice}</button>
                    </li>
                  ))}
                </ul>
                <button onClick={handleNextQuestion}>السؤال التالي</button>
              </div>
            </div>
        ) 
        
        :
        
        (
          <div className='correct'>
            <h1>الاجابات الصحيحة</h1>
            {Object.keys(categories).map((categoryKey, index) => (
              <div key={index}>
                <h2>{categories[categoryKey].categoryTitle}</h2>
                <ul>
                  {categories[categoryKey].questions.map((question, qIndex) => (
                    <li key={qIndex}>
                      {question.question} - الاجابة الصحيحة: {question.correctAnswer}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  
  export default PaperGroup;
  

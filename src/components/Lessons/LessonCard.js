import React, { useState } from 'react';
import './LessonCard.css'; 
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';


function LessonCard({ imageSrc, title, description, questions, icon }) {
  const [expandedQuestions, setExpandedQuestions] = useState({});
  
  const toggleQuestion = (index) => {
    setExpandedQuestions({
      ...expandedQuestions, // Сохраняем предыдущее состояние
      [index]: !expandedQuestions[index], // Инвертируем состояние для конкретного вопроса
    });
  };

  const renderQuestion = (question) => {
    // Заменяем текст на HTML
    return { __html: `${question}` };
  };
  
  return (
    <div className="lesson-card">
      <div className="lesson-card-header">
        {icon && <span className="promoIcon">{icon}</span>}
        {/* <img src={imageSrc} alt={title} className="lesson-card-image" /> */}
        <h3 className="lesson-card-title">{title}</h3>
      </div>
      <h4 className="lesson-card-description">{description}</h4>
      <div className="lesson-card-faq">
        {questions && questions.map((qa, index) => (
          <div key={index} className="lesson-card-qa">
            <p className='question_arrow'>
                <p className="lesson-card-question" onClick={() => toggleQuestion(index)}>
                    
                {/* ✅  */}
                <span dangerouslySetInnerHTML={renderQuestion(qa.question)} />
                </p>
                {expandedQuestions[index] ? 
                    (
                        <MdKeyboardArrowUp className="lesson-card-arrow-icon" onClick={() => toggleQuestion(index)}/> // Стрелочка вверх, если раскрыто
                    ) 
                    : 
                    (
                        <MdKeyboardArrowDown className="lesson-card-arrow-icon" onClick={() => toggleQuestion(index)}/> // Стрелочка вниз, если скрыто
                    )}
                {expandedQuestions[index] && ( // Условный рендеринг ответа
                
                <p className="lesson-card-answer">— {qa.answer}</p>)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LessonCard;

import React from 'react';
import './FirstLessonRequirements.css'; // Создайте этот файл для стилей

function FirstLessonRequirements() {
  return (
    
    <section className="first-lesson-requirements">
        <h2>Взять на первое занятие</h2>
        <div className="card">
            <ul className="requirements-list">
                <li>Справка от врача (при необходимости)</li>
                <li>Купальник или плавки</li>
                <li>Принадлежности для душа (шампунь, гель для душа, мочалка)</li>
                <li>Тапочки или сланцы</li>
                <li>Полотенце</li>
            </ul>
        </div>
    </section>
   
  );
}

export default FirstLessonRequirements;


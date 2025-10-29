import React from 'react';
import './FirstLessonRequirements.css'; // Создайте этот файл для стилей

function FirstLessonRequirements() {
  return (
    
    <section className="first-lesson-requirements">
        <h2>Взять на первое занятие</h2>
        <div className="card">
            <ul className="requirements-list">
                <li><strong>Справка</strong> от врача:</li>
                  <ul className="requirements-list-second">
                    <li><strong>До года</strong> справка от педиатра</li>
                    <li><strong>После года</strong> справка от педиатра и анализ на энтеробиоз</li>
                    <li><strong>Для родителя</strong> при покупке <strong>семейного абонемента</strong>: анализ на энтеробиоз, справка дерматовенеролога</li>
                  </ul>
                <li>Купальник или плавки, для малышей акваподгузник</li>
                <li>Шапочка, очки при необходимости</li>
                <li>Принадлежности для душа (шампунь, гель для душа, мочалка)</li>
                <li>Тапочки или сланцы</li>
                <li>Полотенце</li>
            </ul>
        </div>
    </section>
   
  );
}

export default FirstLessonRequirements;


import React, { useState } from 'react'; // Импортируем useState
import './ActionNewYear.css'; // Создайте этот файл для стилей
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faVk,
} from '@fortawesome/free-brands-svg-icons';
import {
  faChevronDown, // Иконка стрелка вниз
  faChevronUp    // Иконка стрелка вверх
} from '@fortawesome/free-solid-svg-icons';

// Данные для FAQ (массив вопросов и ответов)
const faqItems = [
  {
    id: 'prizes',
    question: 'Как выиграть супер призы?',
    answer: (
      <ul>
        <li> — Подпишитесь на нашу группу ВК</li>
        <li> — Сделать репост на свою страницу ВК</li>
        <li> — Отмечайте друзей в комментариях (чем больше друзей вы позовете, тем больше шансов на победу)</li>
        <li> — Поставить лайк на пост</li>
      </ul>
    ),
  },
  {
    id: 'dates',
    question: 'Какие сроки проведения конкурса?',
    answer: (
      <ul>
        <li><strong>Начало розыгрыша: </strong>16 декабря</li>
        <li><strong>Конец розыгрыша: </strong>29 декабря</li>
        <li><strong>Итоги розыгрыша: </strong>30 декабря</li>
      </ul>
    ),
  },
  {
    id: 'rules',
    question: 'Как принять участие?',
    answer: (
      <ul>
        <li> — Профиль должен быть открыт на время проведения розыгрыша</li>
        <li> — Страницы, созданные специально для участия в розыгрышах не допускаются</li>
        <li> — 1 комментарий максимум 2 отметки друзей (количество комментариев не ограничено)</li>
      </ul>
    ),
  },
  {
    id: 'results',
    question: 'Как будут объявлены итоги розыгрыша?',
    answer: (
      <p>Итоги розыгрыша мы выложим в наших социальных сетях, победители будут выбраны случайно с помощью рандомайзера</p>
    ),
  },
  {
    id: 'exchange',
    question: 'Возможно ли обменять абонемент на деньги?',
    answer: (
      <p>Абонемент не подлежит обмену на денежный эквивалент</p>
    ),
  },
];

function ActionNewYear() {
  // Состояние для хранения ID открытого вопроса. null - ничего не открыто.
  // Это позволит открывать только один вопрос за раз (аккордеон).
  const [openItemId, setOpenItemId] = useState(null);

  // Функция для переключения состояния вопроса
  const toggleItem = (id) => {
    setOpenItemId(prevId => (prevId === id ? null : id)); // Если уже открыт, закрыть; иначе открыть этот
  };

  return (
    <section className="first-lesson-requirements">
      <h2>Конкурс посвященный Новому году</h2>
      
      <div className="card">
        <h3>Разыгрываем 3 места в честь <br></br>главного праздника года</h3>
        <ul className="requirements-list">
          <li>1 место — абонемент на 8 индивидуальных занятий</li>
          <li>2 место — абонемент на 4 индивидуальных занятий </li>
          <li>3 место — бесплатное занятие</li>
        </ul>

        {/* Раздел с динамически раскрывающимися/сворачивающимися вопросами */}
        <div className="faq-container">
          {faqItems.map(item => (
            <div key={item.id} className="faq-item">
              <div className="faq-question-header" onClick={() => toggleItem(item.id)}>
                <h3>{item.question}</h3>
                <FontAwesomeIcon icon={openItemId === item.id ? faChevronUp : faChevronDown} />
              </div>
              {openItemId === item.id && ( // Если текущий вопрос открыт, показываем ответ
                <div className="faq-answer">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <h3>Желаем всем удачи и поздравляем с наступающим Новым годом 🎄🎅</h3>
        <h4>Спасибо, что помогаете нам становиться лучше!</h4>
        <div className="social-links">
          <a href="https://vk.com/frogling_kzn" target="_blank" rel="noopener noreferrer" className="vk-link">
            <FontAwesomeIcon icon={faVk} />
            <span>VK</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default ActionNewYear;

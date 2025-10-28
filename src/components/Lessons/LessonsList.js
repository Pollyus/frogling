import React from 'react';
import LessonCard from './LessonCard';
import './LessonsList.css'; 
import { FaUsers, FaUser, FaUserFriends } from 'react-icons/fa';


import individualImage from './LessonsImages/Индивидуальное занятие.png';
import familyImage from './LessonsImages/Семейное плавание.png';
import groupImage from './LessonsImages/Групповое занятие.png';

function LessonsList() {
const lessonTypes = [
    {
      title: 'Индивидуальное занятие',
      imageSrc: individualImage,
      icon: <FaUser/>, 
      description: 'Персональный подход для достижения максимальных результатов.',
      questions: [
        { question: 'Помогают ли индивидуальные занятия справиться со<strong> страхом воды</strong>?', answer: 'Да, тренер создает доверительную и комфортную обстановку, для преодоления страха' },
        { question: 'Насколько быстро можно <strong>освоить навыки плавания</strong>?', answer: 'Зависит от индивидуальных особенностей ребенка, но персональный подход и внимание тренера позволит быстрее освоить базовые навыки' },
        { question: 'Подходят ли индивидуальные занятия для<strong> подготовки к групповым</strong>?', answer: 'Да, персональные занятия — это отличная подготовка к групповым занятиям' },
        { question: 'Можно ли адаптировать индивидуальные занятия для <strong>особенных детей</strong>?', answer: 'Да, персональные занятия позволяют разработать программу, адаптированную для детей с особенностями развития' },
      ],
    },
    {
      title: 'Семейное занятие',
      imageSrc: familyImage,
      icon: <FaUsers/>, 
      description: 'Занимайтесь плаванием всей семьей!',
      questions: [
        { question: 'Что такое <strong>семейное занятие</strong>?', answer: 'Есть два варианта занятий: мама, малыш под руководством тренера или мама занимается с ребенком, который уже держится на воде, а тренер с малышом' },
        { question: 'Эффективно ли участие <strong>двух детей</strong> на занятии?', answer: 'Да, родитель уделяет внимание малышу под руководством специалиста, а старший ребенок занимается с тренером' },
        { question: 'Что делать, если ребенок <strong>боится воды</strong>?', answer: 'Совместные занятия с родителем и тренером в безопасной обстановке помогут преодолеть страх, что повысит эффективность занятий' },
        { question: 'Как совместные занятия плаванием влияют на <strong>отношения родителя и малыша</strong>?', answer: ' Наш опыт показывает, что занятия создают атмосферу близости и доверия, кроме того физический контакт, положительные эмоции и поддержка укрепляют эмоциональную связь' },
        
    ],
    },

     {
      title: 'Групповое занятие',
      imageSrc: groupImage,
      icon: <FaUserFriends/>, 
      description: 'Веселое и эффективное обучение в группе.',
      questions: [
        { question: 'С какого <strong>возраста</strong> можно заниматься на групповых занятиях?', answer: 'С 3 лет' },
        { question: 'Нужны ли <strong>базовые навыки</strong> для групповых занятий?', answer: ' Да, для комфортных занятий детей, желательно обладать базовыми навыками' },
        { question: '<strong>Когда</strong> проводятся групповые занятия', answer: 'Проводятся каждый день в 12:00, 16:00 и 19:00' },
      ],
    },
  ];

   return (
    <div>
        <section id="subscriptions" className="subscriptions" >
           <div className="container">
                <h2>Виды занятий</h2>
                <div className="subscriptions-grid">
                {lessonTypes.map((lesson, index) => (
                    <LessonCard key={index} {...lesson} />
                ))}
                </div>
            </div> 
        </section>

        </div>
    );

}

export default LessonsList;
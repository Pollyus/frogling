// SubscriptionList.js
import React from 'react';
import SubscriptionCard from '../Products/ProductsCard';
import './SubscriptionList.css'; // CSS for the grid layout
import FirstTry from './ProductsImage/Пробное занятие.png'
import OneLesson from './ProductsImage/Разовое посещение.png'
import One4 from './ProductsImage/Индивид 4.png'
import One8 from './ProductsImage/Индивид 8.png'
import Groupe4 from './ProductsImage/Группа 4.png'
import Groupe8 from './ProductsImage/Группа 8.png'
import Groupe1 from './ProductsImage/Группа 1.png'
import Family1 from './ProductsImage/Семья 1.png'
import Family4 from './ProductsImage/Семья 4.png'
import Family8 from './ProductsImage/Семья 8.png'

function SubscriptionList() {
  const subscriptions = [
    {
      name: 'Пробное занятие',
      image: FirstTry,
      oldPrice: null,
      currentPrice: null,
      // oldPrice: 'Бесплатно!',
      comment: "Первое занятие бесплатно!"
    },
    {
      name: 'Разовое посещение',
      image: OneLesson,
      oldPrice: 1600,
      
    },
    {
      name: 'Индивидуальный абонемент',
      image: One4,
      number_of_classes: '(4 занятия)',
      oldPrice: 6000,
      currentPrice: 5400,
      comment: "При покупке абонемента после пробного занятия!"
    },
    {
      name: 'Индивидуальный абонемент',
      number_of_classes: '(8 занятий)',
      image: One8,
      oldPrice: 11500,
      currentPrice: 10350,
      comment: "При покупке абонемента после пробного занятия!"
    },
    {
      name: 'Групповое посещение',
      image: Groupe1,
      oldPrice: 1100,
    },
    {
      name: 'Групповой абонемент',
      image: Groupe4,
      number_of_classes: '(4 занятия)',
      oldPrice: 4100,
      currentPrice: 3690,
      comment: "При покупке абонемента после пробного занятия!"
    },
    {
      name: 'Групповой абонемент',
      image: Groupe8,
      number_of_classes: '(8 занятий)',
      oldPrice: 8000,
      currentPrice: 7200,
      comment: "При покупке абонемента после пробного занятия!"
    },
    {
      name: 'Семейное посещение',
      image: Family1,
      oldPrice: 2000,
    },
    {
      name: 'Семейный абонемент',
      image: Family4,
      number_of_classes: '(4 занятия)',
      oldPrice: 7400,
      currentPrice: 6660,
      comment: "При покупке абонемента после пробного занятия!"
    },
    {
      name: 'Семейный абонемент',
      image: Family8,
      number_of_classes: '(8 занятий)',
      oldPrice: 14000,
      currentPrice: 12600,
      comment: "При покупке абонемента после пробного занятия!"
    },
    
  ];

  return (
    <section id="subscriptions" className="subscriptions">
      <div className="container">
        <h2>Наши услуги</h2>
        <div className="subscriptions-grid">
          {subscriptions.map((subscription, index) => (
            <SubscriptionCard key={index} subscription={subscription} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SubscriptionList;

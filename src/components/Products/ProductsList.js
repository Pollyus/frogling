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
      description: 'Бесплатно!',
    },
    {
      name: 'Разовое посещение',
      image: OneLesson,
      description: '1 600 рублей',
    },
    {
      name: 'Индивидуальный' + 
      '(4 занятия)',
      image: One4,
      description: '6 000 рублей',
    },
    {
      name: 'Индивидуальный (8 занятий)',
      image: One8,
      description: '11 500 рублей',
    },
    {
      name: 'Групповой (Разовое)',
      image: Groupe1,
      description: '1 100 рублей',
    },
    {
      name: 'Групповой (4 занятия)',
      image: Groupe4,
      description: '4 100 рублей',
    },
    {
      name: 'Групповой (8 занятий)',
      image: Groupe8,
      description: '8 000 рублей',
    },
    {
      name: 'Семейный (Разовое)',
      image: Family1,
      description: '2 000 рублей',
    },
    {
      name: 'Семейный (4 занятия)',
      image: Family4,
      description: '7 400 рублей',
    },
    {
      name: 'Семейный (8 занятий)',
      image: Family8,
      description: '14 000 рублей',
    },
    
  ];

  return (
    <section id="subscriptions" className="subscriptions">
      <div className="container">
        <h2>Наши абонементы</h2>
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

// src/components/Garland.jsx (или где у вас хранятся компоненты)

import React, { useState, useEffect } from 'react';
import './Girland.css'; // Создайте этот файл для стилей гирлянды

const colors = ['#ff4d4d', '#4dff4d', '#4d4dff', '#ffff4d', '#ff4dff', '#4dffff']; // Цвета лампочек

const Garland = ({ numberOfLights = 25, animationSpeed = '2s' }) => {
  // Состояние для случайных задержек анимации, чтобы лампочки мерцали асинхронно
  const [delays, setDelays] = useState([]);

  useEffect(() => {
    const newDelays = Array.from({ length: numberOfLights }).map(() => (
      Math.random() * parseFloat(animationSpeed) + 's' // Случайная задержка до animationSpeed
    ));
    setDelays(newDelays);
  }, [numberOfLights, animationSpeed]);

  return (
    <div className="garland-container" aria-hidden="true"> {/* aria-hidden для декоративных элементов */}
      {Array.from({ length: numberOfLights }).map((_, index) => (
        <span
          key={index}
          className="garland-light"
          style={{
            backgroundColor: colors[index % colors.length], // Распределяем цвета по порядку
            animationDelay: delays[index], // Применяем случайную задержку
            animationDuration: animationSpeed, // Устанавливаем длительность анимации
          }}
        ></span>
      ))}
    </div>
  );
};

export default Garland;

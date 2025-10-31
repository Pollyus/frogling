import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';

// Импортируйте CSS-файлы Slick Carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Импортируйте ваш собственный CSS для кастомизации
import './PhotoSlider.css';
import photo1 from './images/1.jpg'
import photo2 from './images/2.jpg'
import photo3 from './images/3.jpg'
import photo4 from './images/4.jpg'
import photo5 from './images/5.jpg'
import photo6 from './images/6.jpg'
import photo7 from './images/7.jpg'
import photo8 from './images/8.jpg'
import photo9 from './images/9.jpg'

// Пример массива с фотографиями. ЗАМЕНИТЕ ЭТО СВОИМИ ФОТОГРАФИЯМИ!
// Важно: загрузите ваши реальные фотографии в папку public/images/ (или src/assets/)
// и укажите правильные пути к ним.
const images = [
  { id: 1, src: photo1, alt: 'Дети на занятии 1', orientation: 'vertical' },
  { id: 2, src: photo2, alt: 'Дети на занятии 2', orientation: 'horizontal' },
  { id: 3, src: photo3, alt: 'Дети на занятии 3', orientation: 'vertical' },
  { id: 4, src: photo4, alt: 'Дети на занятии 4', orientation: 'vertical' },
  { id: 5, src: photo5, alt: 'Дети на занятии 5', orientation: 'vertical' },
  { id: 6, src: photo6, alt: 'Дети на занятии 6', orientation: 'horizontal' },
  { id: 7, src: photo7, alt: 'Дети на занятии 7', orientation: 'vertical' },
  { id: 8, src: photo8, alt: 'Дети на занятии 8', orientation: 'horizontal' },
  { id: 9, src: photo9, alt: 'Дети на занятии 9', orientation: 'horizontal' },
  // Добавьте больше фотографий по аналогии
];

const PhotoSlider = () => {
  const [isMobile, setIsMobile] = useState(false);
  const mobileBreakpoint = 768; 

    useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= mobileBreakpoint);
    };

    // Проверяем при монтировании компонента
    checkIsMobile();

    // Добавляем слушателя события resize для обновления при изменении размера окна
    window.addEventListener('resize', checkIsMobile);

    // Очистка слушателя при размонтировании компонента
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []); // Пустой массив зависимостей означает, что эффект запустится один раз при монтировании и очистится при размонтировании

  // Фильтрация изображений в зависимости от isMobile
  const filteredImages = images.filter(image => {
    if (isMobile) {
      return image.orientation === 'vertical';
    } else {
      return image.orientation === 'horizontal';
    }
  });

  // Если после фильтрации нет изображений, не показываем слайдер
  if (filteredImages.length === 0) {
    return (
      <section className="photo-slider-section">
        <div className="container">
          <h2>Наши занятия в фотографиях</h2>
          <p>Пока нет фотографий для отображения на текущем устройстве.</p>
        </div>
      </section>
    );
  }

  const settings = {
    dots: true, // Показывать точки-индикаторы
    infinite: true, // Бесконечная прокрутка
    speed: 500, // Скорость анимации смены слайда (мс)
    slidesToShow: 1, // Сколько слайдов показывать одновременно
    slidesToScroll: 1, // Сколько слайдов прокручивать за раз
    autoplay: true, // Включить автовоспроизведение
    autoplaySpeed: 3000, // Интервал между сменой слайдов (3 секунды)
    cssEase: 'linear', // Тип анимации
    arrows: true, // Показывать стрелки навигации
    pauseOnHover: true, // Пауза при наведении мышкой
    responsive: [ // Адаптивные настройки
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className="photo-slider-section">
      <div className="container"> {/* Опционально, если у вас есть общий контейнер */}
        <h2>Наши занятия в фотографиях</h2>
        <div className="slider-wrapper">
          <Slider {...settings}>
            {filteredImages.map(image => ( // Используем отфильтрованные изображения
              <div key={image.id} className="slider-item">
                <img src={image.src} alt={image.alt} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default PhotoSlider;

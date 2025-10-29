
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import TrainerDescription from './TrainerDescription'; // Убедитесь, что этот компонент существует
import './TrainersCarousel.css'; // Создайте/обновите этот файл CSS
import trainer1Image from './TrainersPhoto/Vlad.png';
import trainer2Image from './TrainersPhoto/Lidia.png';
import trainer3Image from './TrainersPhoto/Lyubov.png';

// Данные о тренерах (оставляем как есть)
const trainers = [
  {
    id: 1,
    name: 'Владислав',
    photo: trainer1Image,
    schedule: [
      {label: 'Понедельник', value: '15:00-21:00'},
      {label: 'Среда', value: '09:00-14:30'},
      {label: 'Суббота', value: '09:00-14:30'},
      {label: 'Воскресение', value: '09:00-14:30'},
    ],
    description: [
              { label: 'Опыт', value: '3 года'},
              { label: 'Сертификат', value: 'Специалист грудничкового и малышкового плавания'},
              { label: 'Разряд', value: 'Кандидат мастера спорта по плаванию'},
              { label: 'Спортивная карьера', value: '12 лет спортивной карьеры, участник всероссийских соревнований'},
              { label: 'Образование', value: 'ПГУФКСиТ, специализация тренер по плаванию'}
       ]
  },
  {
    id: 2,
    name: 'Лидия',
    photo: trainer2Image,
    schedule:[
      {label: 'Понедельник', value: '09:00-14:30'},
      {label: 'Вторник', value: '09:00-14:30'},
      {label: 'Четверг', value: '09:00-14:30'},
      {label: 'Пятница', value: '09:00-14:30'},
    ],
    description: [
              { label: 'Опыт', value: '1,5 года'},
              { label: 'Сертификат', value: 'Специалист грудничкового и малышкового плавания. Детский массажист/Преподаватель детского массажа и моторного развития'},
              { label: 'Специализация', value: 'Физическая терапии детей и взрослых'},
              { label: 'Карьера', value: 'Специалист физической терапии детей и взрослых'},
              { label: 'Образование', value: 'КГМУ Сестринское дело'}
       ]
  },
  {
    id: 3,
    name: 'Любовь',
    photo: trainer3Image,
    schedule:[
      {label: 'Вторник', value: '15:00-21:00'},
      {label: 'Четверг', value: '15:00-21:00'},
      {label: 'Воскресенье', value: '15:00-21:00'},
    ],
    description: [
              { label: 'Опыт', value: '2 года'},
              { label: 'Сертификат', value: 'Специалист грудничкового и малышкового плавания. Массажист спортивного и детского массажа'},
              { label: 'Звание', value: 'Мастер спорта по плаванию'},
              { label: 'Карьера', value: '12 лет спортивной карьеры'},
              { label: 'Образование', value: 'ПГУФКСиТ, специализация тренер по плаванию'}
       ]
  },
];

function TrainersCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedTrainer, setSelectedTrainer] = useState(trainers[0] || null);
  const [isPaused, setIsPaused] = useState(false);
  const [zoomedTrainerId, setZoomedTrainerId] = useState(null);
  // const [isButtonClicked, setIsButtonClicked] = useState(false); // Этот стейт больше не нужен для этой логики

  // Новые стейты для мобильной логики
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileDetailedView, setIsMobileDetailedView] = useState(false); // true, если показан один тренер на мобильном

  const sliderRef = useRef(null);

  // --- Эффект для определения мобильного устройства ---
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const handleMediaQueryChange = (e) => {
      setIsMobile(e.matches);
      // Если перестало быть мобильным, сбрасываем детальный просмотр
      if (!e.matches && isMobileDetailedView) {
        handleBackButtonClick();
      }
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);
    setIsMobile(mediaQuery.matches); // Инициализация при загрузке

    return () => mediaQuery.removeEventListener('change', handleMediaQueryChange);
  }, [isMobileDetailedView]); // Добавляем isMobileDetailedView в зависимости, чтобы handleBackButtonClick был актуальным

  // --- Эффект для паузы/воспроизведения слайдера ---
  useEffect(() => {
    if (sliderRef.current) {
      if (isPaused || isMobileDetailedView) { // Пауза также при детальном просмотре на мобильном
        sliderRef.current.slickPause();
      } else {
        sliderRef.current.slickPlay();
      }
    }
  }, [isPaused, isMobileDetailedView]);

  // --- Обработчик смены слайда ---
  const handleBeforeChange = useCallback((oldIndex, newIndex) => {
    setCurrentSlide(newIndex);
    if (!isPaused && !isMobileDetailedView) { // Обновляем выбранного тренера только если не на паузе и не в детальном режиме
      setSelectedTrainer(trainers[newIndex] || null);
      setZoomedTrainerId(null);
    }
  }, [isPaused, isMobileDetailedView]);


  // --- Обработчик клика по тренеру ---
  const handleTrainerClick = useCallback((trainer) => {
    if (isMobile) {
      // Если уже в детальном режиме и кликнули по тому же тренеру, ничего не делаем
      if (isMobileDetailedView && zoomedTrainerId === trainer.id) {
        return;
      }
      setZoomedTrainerId(trainer.id);
      setSelectedTrainer(trainer);
      setIsMobileDetailedView(true); // Активируем детальный режим на мобильном
      setIsPaused(true); // Ставим слайдер на паузу
    } else {
      // Логика для десктопа (показываем детали, но не скрываем других)
      if (zoomedTrainerId !== trainer.id) {
        setZoomedTrainerId(trainer.id);
      } else {
        setZoomedTrainerId(null);
      }
      setSelectedTrainer(trainer);
      setIsPaused(true); // Пауза для показа деталей
      // Убираем setTimeout, так как теперь есть кнопка "Назад"
    }
  }, [isMobile, isMobileDetailedView, zoomedTrainerId]);

  // --- Обработчик кнопки "Вернуться ко всем тренерам" ---
  const handleBackButtonClick = useCallback(() => {
    setIsMobileDetailedView(false); // Выходим из детального режима
    setZoomedTrainerId(null);
    // Сбрасываем selectedTrainer на текущий слайд, если он есть
    setSelectedTrainer(trainers[currentSlide] || null);
    setIsPaused(false); // Возобновляем автопрокрутку
  }, [currentSlide]);


  // --- Настройки Slider ---
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: !isPaused && !isMobileDetailedView, // Автопрокрутка только если не на паузе и не в детальном режиме
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: '60px',
    beforeChange: handleBeforeChange,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          centerPadding: '40px',
        }
      },
      {
        breakpoint: 767, // Используем 767px, чтобы совпадало с mediaQuery
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '80px',
          autoplay: !isPaused && !isMobileDetailedView, // Важно: также учитывать детальный режим
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1, // На маленьких экранах лучше 1
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '60px',
          autoplay: !isPaused && !isMobileDetailedView,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '40px',
          autoplay: !isPaused && !isMobileDetailedView,
        }
      }
    ]
  };


  return (
    <section className="trainers-carousel">
      <h2 className="trainers-carousel__title">Наши Тренеры</h2>

      {isMobileDetailedView && selectedTrainer ? (
        // --- Мобильный детальный вид (один тренер) ---
        <div className="trainer-detail-view-mobile">
          <button className="back-button" onClick={handleBackButtonClick}>
            &larr; Вернуться ко всем тренерам
          </button>
          <div className="trainer-card-mobile-detail">
            <img
              src={selectedTrainer.photo}
              alt={selectedTrainer.name}
              className="trainer-card-mobile-detail__image"
            />
            <p className="trainer-card-mobile-detail__name">{selectedTrainer.name}</p>
            <div className="trainer-info-mobile-detail">
              <div className="trainer-info-mobile-detail__schedule">
                <h4>Расписание: </h4>
                <TrainerDescription description={selectedTrainer.schedule} />
              </div>
              <div className="trainer-info-mobile-detail__description">
                <h4>Информация:</h4>
                <TrainerDescription description={selectedTrainer.description} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        // --- Обычный вид (слайдер) ---
        <div className="trainers-carousel__slider-container">
          {/* <Slider {...settings} ref={sliderRef}> */}
            {trainers.map((trainer) => (
              <div
                key={trainer.id}
                className={`trainer-slide ${zoomedTrainerId === trainer.id ? 'zoomed' : ''}`}
                onClick={() => handleTrainerClick(trainer)}
              >
                <img
                  src={trainer.photo}
                  alt={trainer.name}
                  className="trainer-slide__image"
                />
                <p className="trainer-slide__name">{trainer.name}</p>
              </div>
            ))}
          {/* </Slider> */}
        </div>
      )}

      {/* Отображение информации о тренере (для десктопа или если не в мобильном детальном режиме) */}
      {selectedTrainer && !isMobileDetailedView && (
        <div className="trainer-info">
          <div className="trainer-info__container">
            <div className="trainer-info__schedule">
              <h4>Расписание: </h4>
              <TrainerDescription description={selectedTrainer.schedule} />
            </div>
            <div className="trainer-info__description">
              <h4>Информация:</h4>
              <TrainerDescription description={selectedTrainer.description} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default TrainersCarousel;

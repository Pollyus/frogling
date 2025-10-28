import React, { useState, useRef, useEffect } from 'react'; 
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import TrainerDescription from './TrainerDescription';
import './TrainersCarousel.css'; // Создайте файл TrainersCarousel.css
import trainer1Image from './TrainersPhoto/Vlad.png';
import trainer2Image from './TrainersPhoto/Lidia.png';
import trainer3Image from './TrainersPhoto/Lyubov.png';


const trainers = [
  {
    id: 1,
    name: 'Владислав',
    photo: trainer1Image, // Замените на реальные пути
    schedule: '\tПонедельник: 15:00-21:00\n\tСреда: 9:00-14:30\n\tПятница: 15:00-21:00\n\tСуббота: 9:00-14:30\nВоскресение: 9:00-14:30',
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
    schedule: '\tПонедельник: 9:00-14:30\n\tВторник: 9:00-14:30\n\tЧетверг: 9:00-14:30\n\tПятница: 15:00-21:00',
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
    schedule: '\tВторник: 15:00-21:00\n\tЧетверг: 15:00-21:00\n\tВоскресенье: 15:00-21:00',
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
  const [currentSlide, setCurrentSlide] = useState(0);  // Состояние для активного слайда
  const [selectedTrainer, setSelectedTrainer] = useState(trainers[0] || null); // Изначально выбран первый тренер
  const [isPaused, setIsPaused] = useState(false); // Добавлено состояние для паузы
  const [zoomedTrainerId, setZoomedTrainerId] = useState(null); // Добавлено состояние
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const sliderRef = useRef(null); // Добавлен useRef для доступа к слайдеру
  
  useEffect(() => {
      if (sliderRef.current) {
        if (isPaused) {
          sliderRef.current.slickPause();
        } else {
          sliderRef.current.slickPlay();
        }
      }
    }, [isPaused]);

  const handleBeforeChange = (oldIndex, newIndex) => {
        setCurrentSlide(newIndex);
        if (!isPaused) {
          setSelectedTrainer(trainers[newIndex] || null);
          setZoomedTrainerId(null); // Сбрасываем увеличение при смене слайда
          setIsButtonClicked(false); // Сбрасываем состояние кнопки
        }
          
      };

  const handleTrainerClick = (trainer) => {
    // Сначала сбрасываем увеличение со всех
    if (zoomedTrainerId !== trainer.id) {
      setZoomedTrainerId(trainer.id); // Устанавливаем ID для увеличения
      setIsButtonClicked(true);
      
    } else {
      setZoomedTrainerId(null); // Убираем увеличение, если кликнули повторно
      setIsButtonClicked(false);
    }
    setSelectedTrainer(trainer);
    setIsPaused(true);

    setTimeout(() => {
      setSelectedTrainer(trainers[0] || null);
      setIsPaused(false);
      setZoomedTrainerId(null);
      setIsButtonClicked(false);
    }, 120000);
  };


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Количество отображаемых слайдов
    slidesToScroll: 1,
    autoplay: !isPaused, // Автопрокрутка только если не на паузе
    autoplaySpeed: 3000, // Интервал между слайдами (мс)
    centerMode: true, // Активируем режим центрового слайда
    centerPadding: '60px', // Отступ для частичного отображения соседних слайдов (можно настроить)
    // Добавим стрелки навигации
    beforeChange: handleBeforeChange,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768, // Добавлен breakpoint для планшетов
        settings: {
          slidesToShow: 1, // На планшетах 1 слайд в центре
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '80px', // Увеличьте, если нужно больше отступа
          autoplay: true,
          autoplaySpeed: 3000,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
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
        <section className="trainers-carousel"> {/* Изменено на section для семантики */}
        <h2 className="trainers-carousel__title">Наши Тренеры</h2>
        <div className="trainers-carousel__slider-container"> {/* Добавлен контейнер для слайдера */}
            {/* <Slider {...settings} ref={sliderRef}> */}
            {trainers.map((trainer) => (
                
                <div key={trainer.id} className="trainer-slide" onClick={() => handleTrainerClick(trainer)}>
                <img
                  src={trainer.photo}
                  alt={trainer.name}
                  className={`trainer-slide__image ${zoomedTrainerId === trainer.id ? 'zoomed' : ''} ${isButtonClicked && zoomedTrainerId === trainer.id ? 'slick-center' : ''}`}
                />

                <p className="trainer-slide__name">{trainer.name}</p>
                </div>
            ))}
            {/* </Slider> */}
        </div>

         {/* Отображение информации о тренере */}
      {selectedTrainer && (
        <div className="trainer-info">
          {/* <h3>📌ТРЕНЕР: {selectedTrainer.name}</h3> */}
          
          <div className="trainer-info__container">
            <div className="trainer-info__schedule">
              <h4>Расписание: </h4>
              <p>
                {selectedTrainer.schedule.split('\n').map((item, key) => (
                  <React.Fragment key={key}>
                    {item}
                    <br />
                  </React.Fragment>
                ))}
              </p>
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
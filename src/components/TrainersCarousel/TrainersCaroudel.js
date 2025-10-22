import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './TrainersCarousel.css'; // Создайте файл TrainersCarousel.css

const trainers = [
  {
    id: 1,
    name: 'Имя Тренера 1',
    photo: 'C:/Users/Админ/Documents/frogling/my-app/src/components/TrainersCarousel/TrainersPhoto/Влад.png', // Замените на реальные пути
    description: 'Краткое описание тренера 1',
  },
  {
    id: 2,
    name: 'Имя Тренера 2',
    photo: '../TrainersCarousel/TrainersPhoto/Лидия.png',
    description: 'Краткое описание тренера 2',
  },
  {
    id: 3,
    name: 'Имя Тренера 3',
    photo: 'src/components/TrainersCarousel/TrainersPhoto/Люба.png',
    description: 'Краткое описание тренера 3',
  },
  // Добавьте больше тренеров
];

function TrainersCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Количество отображаемых слайдов
    slidesToScroll: 1,
    autoplay: true,      // Автоматическая прокрутка
    autoplaySpeed: 3000, // Интервал между слайдами (мс)
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
    <div className="trainers-carousel">
      <h2>Наши Тренеры</h2>
      <Slider {...settings}>
        {trainers.map((trainer) => (
          <div key={trainer.id} className="trainer-slide">
            <img src={trainer.photo} alt={trainer.name} />
            <p className="trainer-name">{trainer.name}</p>
            {/* <p className="trainer-description">{trainer.description}</p> */}
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default TrainersCarousel;
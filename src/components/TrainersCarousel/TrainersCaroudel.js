import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './TrainersCarousel.css'; // Создайте файл TrainersCarousel.css
import trainer1Image from './TrainersPhoto/Vlad.png';
import trainer2Image from './TrainersPhoto/Lidia.png';
import trainer3Image from './TrainersPhoto/Lyubov.png';
import { ReactComponent as NextArrowIcon } from '../../images/right_arrow.svg';
import { ReactComponent as PrevArrowIcon } from '../../images/left_arrow.svg';

const trainers = [
  {
    id: 1,
    name: 'Владислав',
    photo: trainer1Image, // Замените на реальные пути
    description: 'Краткое описание тренера 1',
  },
  {
    id: 2,
    name: 'Лидия',
    photo: trainer2Image,
    description: 'Краткое описание тренера 2',
  },
  {
    id: 3,
    name: 'Любовь',
    photo: trainer3Image,
    description: 'Краткое описание тренера 3',
  },

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
    centerMode: true, // Активируем режим центрового слайда
    centerPadding: '60px', // Отступ для частичного отображения соседних слайдов (можно настроить)
    // Добавим стрелки навигации
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
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


//   // Компоненты для пользовательских стрелок (для лучшего контроля над стилями)
//   function SampleNextArrow(props) {
//     const { className, style, onClick } = props;
//     return (
//       <div
//         className={className}
//         style={{ ...style, display: "block", background: "grey", borderRadius: "50%" }}
//         onClick={onClick}
//       />
//     );
//   }

//    function SamplePrevArrow(props) {
//     const { className, style, onClick } = props;
//     return (
//       <div
//         className={className}
//         style={{ ...style, display: "block", background: "grey", borderRadius: "50%" }}
//         onClick={onClick}
//       />
//     );
//   }

// Компоненты для пользовательских стрелок с использованием SVG
      function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block", background: "rgba(0, 0, 0, 0.5)", borderRadius: "50%" }}
            onClick={onClick}
          >
            <img src={NextArrowIcon} alt="Next" />
          </div>
        );
      }

      function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "block", background: "rgba(0, 0, 0, 0.5)", borderRadius: "50%" }}
            onClick={onClick}
          >
            <img src={PrevArrowIcon} alt="Previous" />
          </div>
        );
      }

      // ... (остальной код компонента) ...
    

//   return (
//     <div className="trainers-carousel">
//       <h2>Наши Тренеры</h2>
//       <Slider {...settings}>
//         {trainers.map((trainer) => (
//           <div key={trainer.id} className="trainer-slide">
//             <img src={trainer.photo} alt={trainer.name} />
//             <p className="trainer-name">{trainer.name}</p>
//             {/* <p className="trainer-description">{trainer.description}</p> */}
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
    return (
        <section className="trainers-carousel"> {/* Изменено на section для семантики */}
        <h2 className="trainers-carousel__title">Наши Тренеры</h2>
        <div className="trainers-carousel__slider-container"> {/* Добавлен контейнер для слайдера */}
            <Slider {...settings}>
            {trainers.map((trainer) => (
                <div key={trainer.id} className="trainer-slide">
                <img src={trainer.photo} alt={trainer.name} className="trainer-slide__image" />
                <p className="trainer-slide__name">{trainer.name}</p>
                </div>
            ))}
            </Slider>
        </div>
        </section>
    );
}

export default TrainersCarousel;
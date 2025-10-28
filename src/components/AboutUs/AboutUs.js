import React, { useEffect } from 'react';
import styles from './AboutUs.module.css';
import { FaBaby, FaSwimmer, FaUsers, FaHeart, FaCheckCircle, FaWater } from 'react-icons/fa';

const AboutUs = () => {
 
    return React.createElement('section', { className: styles.aboutUsSection },
        React.createElement('div', { className: styles.container },
            React.createElement('h2', null, 'Aквацентр "Лягушонок"'),
            React.createElement('p', { className: styles.mainDescription },
                'Аквацентр "Лягушонок" – это место, где рождается любовь к воде! Мы предлагаем обучение плаванию для детей от 3 месяцев до 8 лет, создавая безопасную и комфортную среду, укрепляя здоровье вашего ребенка. '
            ),

            React.createElement('div', { className: styles.featuresGrid },
                React.createElement('div', { className: styles.featureItem },
                    React.createElement(FaCheckCircle, { className: styles.featureIcon }),
                    React.createElement('h3', null, 'Первое занятие - бесплатно!'),
                    React.createElement('p', { className: styles.featureDescription },
                        'Познакомьтесь с нами и нашим подходом совершенно ',
                        React.createElement('span', { className: styles.highlight }, 'бесплатно'),
                        '! Убедитесь, что "Лягушонок" – это именно то, что нужно вашему ребенку.'
                    )
                ),

                React.createElement('div', { className: styles.featureItem },
                    React.createElement(FaBaby, { className: styles.featureIcon }),
                    React.createElement('h3', null, 'Плавание от 3 месяцев до 8 лет'),
                    React.createElement('p', { className: styles.featureDescription },
                        'Мы предлагаем программы для всех возрастов, от самых маленьких до школьников. ',
                        React.createElement('span', { className: styles.highlight }, 'Индивидуальный'),
                        ' подход к каждому ребенку гарантирует эффективное обучение.'
                    )
                ),
                
                    React.createElement('div', { className: styles.featureItem },
                        React.createElement(FaSwimmer, { className: styles.featureIcon }),
                        React.createElement('h3', null, 'Разные Форматы Занятий'),
                        React.createElement('p', { className: styles.featureDescription },
                            'Выберите ',
                            React.createElement('span', { className: styles.highlight }, 'подходящий'),
                            ' формат: индивидуальные занятия для максимального внимания, групповые для общения и игры, или семейные для совместного времяпровождения.'
                        
                    )
                ),
                React.createElement('div', { className: styles.featureItem },
                    React.createElement(FaWater, { className: styles.featureIcon }),
                    React.createElement('h3', null, 'Теплая вода и безопасность'),
                    React.createElement('p', { className: styles.featureDescription },
                        'Мы заботимся о комфорте и ',
                        React.createElement('span', { className: styles.highlight }, 'безопасности'),
                        ' каждого ребенка. В нашем бассейне поддерживается оптимальная температура воды и используются современные системы очистки.'
                    )
                ),

                React.createElement('div', { className: styles.featureItem },
                    React.createElement(FaUsers, { className: styles.featureIcon }),
                    React.createElement('h3', null, 'Квалифицированные тренеры'),
                    React.createElement('p', { className: styles.featureDescription },
                        'Наши тренеры – это ',
                        React.createElement('span', { className: styles.highlight }, 'опытные'),
                        ' специалисты, которые любят свою работу и умеют находить подход к каждому ребенку. Мы гарантируем профессиональное обучение и внимание к потребностям каждого.'
                    )
                ),

                React.createElement('div', { className: styles.featureItem },
                    React.createElement(FaHeart, { className: styles.featureIcon }),
                    React.createElement('h3', null, 'Любовь и Внимание к Каждому'),
                    React.createElement('p', { className: styles.featureDescription },
                        'Мы верим, что каждый ребенок ',
                        React.createElement('span', { className: styles.highlight }, 'уникален'),
                        '. Поэтому мы стремимся найти индивидуальный подход к каждому, чтобы обучение было не только эффективным, но и приносило радость и удовольствие.'
                    )
                )
            )
        )
    );
};





export default AboutUs;


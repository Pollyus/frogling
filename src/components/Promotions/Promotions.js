import React from 'react';
// Импортируем CSS-модуль. Имя файла будет Promotions.module.css
import styles from './Promotions.module.css';


// Импортируем иконки из React Icons. Установите их, если еще не сделали:
// npm install react-icons --save
// или
// yarn add react-icons
import { FaChild, FaUsers, FaStar, FaUserFriends, FaGift, FaInfoCircle, FaHeart, FaMap, FaSync} from 'react-icons/fa';

const Promotions = () => {
    // Вся JSX-разметка заменена вызовами React.createElement
    return React.createElement('section', { className: styles.promotionsSection },
        React.createElement('div', { className: styles.container },
            React.createElement('h2', null, ' Акции и выгодные предложения '),
            React.createElement('p', { className: styles.sectionDescription },
                'Приглашаем вас воспользоваться специальными бонусами, которые сделают занятия для ваших детей еще доступнее и интереснее!'
            ),
// 🎉
            React.createElement('div', { className: styles.promoGrid },
                // Акция 1: Скидка после пробного занятия
                React.createElement('div', { className: styles.promoItem },
                    React.createElement(FaChild, { className: styles.promoIcon }),
                    React.createElement('h3', null, 'Первые Шаги'),
                    React.createElement('p', null,
                        'Получите ',
                        React.createElement('span', { className: styles.highlight }, '10% скидки'),
                        ' на покупку любого абонемента сразу после успешного пробного занятия. Отличный старт для новых приключений!'
                    )
                ),

                // Акция 2: Скидка для второго ребёнка
                React.createElement('div', { className: styles.promoItem },
                    React.createElement(FaUsers, { className: styles.promoIcon }),
                    React.createElement('h3', null, 'Семейная Выгода'),
                    React.createElement('p', null,
                        'Если у вас двое и более детей, получите дополнительную ',
                        React.createElement('span', { className: styles.highlight }, 'скидку 10% '),
                        ' на абонемент для второго ребёнка!'
                    )
                ),

                // Акция 3: Бонус за отзыв
                React.createElement('div', { className: styles.promoItem },
                                    React.createElement(FaStar, { className: styles.promoIcon }),
                    React.createElement('h3', null, 'Бонус за Отзыв'),
                    React.createElement('p', null,
                        'Поделитесь своими впечатлениями о нас в любой социальной сети и получите ',
                        React.createElement('span', { className: styles.highlight }, '5% скидки'),
                        ' на следующий абонемент.'
                    )
                ),

                // Акция 4: Приведи друга
                React.createElement('div', { className: styles.promoItem },
                    React.createElement(FaUserFriends, { className: styles.promoIcon }),
                    React.createElement('h3', null, 'Двойная Выгода: Приведи Друга!'),
                    React.createElement('p', null,
                        'Пригласите друга в нашу студию, и после его первого оплаченного занятия вы получите ',
                        React.createElement('span', { className: styles.highlight }, 'одно занятие в подарок'),
                        '!'
                    )
                ),

                // Акция 5: День рождения малыша
                React.createElement('div', { className: styles.promoItem },
                    React.createElement(FaGift, { className: styles.promoIcon }),
                    React.createElement('h3', null, 'Подарок ко Дню Рождения Малыша'),
                    React.createElement('p', null,
                        'Мы дарим ',
                        React.createElement('span', { className: styles.highlight }, 'бесплатное занятие'),
                        ' вашему малышу в его День рождения, а также в течение двух дней после него! Празднуем вместе!'
                    )
                ),

                // Акция 6: Скидка для детей участников СВО
                React.createElement('div', { className: styles.promoItem },
                    React.createElement(FaHeart, { className: styles.promoIcon }),
                    React.createElement('h3', null, 'Поддержка Героев'),
                    React.createElement('p', null,
                        'Для детей участников СВО предоставляется ',
                        React.createElement('span', { className: styles.highlight }, '20% скидка'),
                        ' на любой вид абонементов. Мы ценим ваш вклад!'
                    )
                ),

                // Акция 7: Собери две карточки лабиринта
                React.createElement('div', { className: styles.promoItem },
                    React.createElement(FaMap, { className: styles.promoIcon }),
                    React.createElement('h3', null, 'Найди Сокровища: Карточки Лабиринта'),
                    React.createElement('p', null,
                        'Соберите ',
                        React.createElement('span', { className: styles.highlight }, 'две'),
                        ' карточки лабиринта и получите ',
                        React.createElement('span', { className: styles.highlight }, 'бесплатное занятие в подарок'),
                        '! Отслеживайте прогресс и не платите за дополнительное занятие!'
                    )
                ),

                // Акция 8: Верность - скидка за продление
                React.createElement('div', { className: styles.promoItem },
                    React.createElement(FaSync, { className: styles.promoIcon }),
                    React.createElement('h3', null, 'Верность: Скидка за Продление'),
                    React.createElement('p', null,
                        'Продлите свой абонемент сразу после окончания предыдущего и получите ',
                        React.createElement('span', { className: styles.highlight }, '10% скидку'),
                        ' на следующий абонемент! Ценим вашу лояльность!'
                    )
                )
            
            ),

            React.createElement('p', { className: styles.promoCta },
                '*Акции не суммируются*'
            ),

            // Примечание о суммировании скидок
            React.createElement('div', { className: styles.promoCombinedNote },
                React.createElement(FaInfoCircle, null),
                React.createElement('p', null,
                    React.createElement('strong', null, 'Важный Бонус:'),
                    ' Акция "Первые Шаги" или "Верность" могут суммироваться с акцией "Бонус за Отзыв", получите скидку 15% на абонемент!'
                )
            ),

            React.createElement('p', { className: styles.promoCta },
                'Подробности о каждой акции вы можете уточнить у администратора по номеру телефона' ,
                ' или в социальных сетях. Ждем вас!'
            )

            
        )
    );
};

export default Promotions;

// PriceDisplay.js
import React from 'react';
import styles from './PriceDisplay.module.css';

function PriceDisplay({ subscription }) {
  if (!subscription) {
    console.error("PriceDisplay received undefined subscription prop!");
    return null;
  }

  const { name, oldPrice, currentPrice, comment, isFree, number_of_classes } = subscription;

  const numericOldPrice = typeof oldPrice === 'number' ? oldPrice : null;
  const numericCurrentPrice = typeof currentPrice === 'number' ? currentPrice : null;

  const formatCurrency = (price) => {
    if (price === null || price === undefined || isNaN(price)) return '';
    if (price === 0) return 'Бесплатно!';

    // Опции для Intl.NumberFormat
    const options = {
      style: 'decimal', // Для чисел без валютного символа
      minimumFractionDigits: 0, // Не показывать дробную часть по умолчанию
      maximumFractionDigits: 2, // Максимум 2 знака после запятой, если они есть
    };

    // Проверяем, является ли число целым.
    // Если да, то minimumFractionDigits и maximumFractionDigits будут 0.
    // Если нет, то оставляем 2 знака после запятой (если они есть).
    if (Number.isInteger(price)) {
      options.minimumFractionDigits = 0;
      options.maximumFractionDigits = 0;
    } else {
      // Если у нас 123.50, хотим 123.50
      // Если у нас 123.00, хотим 123
      const fixedPrice = price.toFixed(2); // Всегда с двумя знаками
      if (fixedPrice.endsWith('.00')) {
        return `${new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price)} ₽`;
      }
      return `${new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price)} ₽`;
    }

    // Создаем форматер для русской локали (ru-RU)
    // Он автоматически добавит пробел для тысяч и учтет другие нюансы
    const formatter = new Intl.NumberFormat('ru-RU', options);
    return `${formatter.format(price)} ₽`;
  };

  const shouldStrikeThroughOldPrice = numericOldPrice !== null && numericCurrentPrice !== null && numericOldPrice > numericCurrentPrice;

  // --- Исправленная логика для "Цена недоступна" ---
  // Цена недоступна, только если:
  // 1. Занятие НЕ бесплатное (!isFree)
  // 2. Нет текущей цены (numericCurrentPrice === null)
  // 3. Нет старой цены (numericOldPrice === null)
  const isPriceUnavailable = !isFree && numericCurrentPrice === null && numericOldPrice === null;

  // --- Логика для отображения ---
  return (
    <div className={styles.priceContainer}>

      {/* --- Блок для старой цены --- */}
      {numericOldPrice !== null && (
        <div className={styles.priceLine}>
          <span className={`
            ${styles.oldPrice}
            ${shouldStrikeThroughOldPrice ? styles.strikethrough : ''}
            ${isFree ? styles.isFreeStrike : ''}
          `}>
            {formatCurrency(numericOldPrice)}
          </span>
        </div>
      )}

      {/* --- Блок для текущей цены --- */}
      {(numericCurrentPrice !== null || isFree) && (
        <div className={styles.priceLine}>
          <span className={`${styles.currentPrice} ${isFree ? styles.isFree : ''}`}>
            {isFree ? 'Бесплатно!' : formatCurrency(numericCurrentPrice)}
            {/* {number_of_classes && <span className={styles.numberOfClasses}>{number_of_classes}</span>} */}
          </span>
        </div>
      )}

      {/* --- Комментарий --- */}
      {(comment && (numericCurrentPrice !== null || isFree)) && (
        <p className={styles.priceComment}>{comment}</p>
      )}

      {/* --- Цена недоступна --- */}
      {/* Теперь это условие работает правильно */}
      {isPriceUnavailable && (
        <span className={styles.currentPrice}>Бесплатно!</span>
      )}
    </div>
  );
}

export default PriceDisplay;


import React, { useState } from 'react';
import './RegisterPage.css'; // Импортируем CSS для стилизации

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' или 'error'
  const [isLoading, setIsLoading] = useState(false); // Для состояния загрузки кнопки

  const handleSubmit = async (event) => {
    event.preventDefault(); // Предотвращаем стандартную отправку формы
    setIsLoading(true);
    setMessage(''); // Очищаем предыдущие сообщения

    // Простая валидация на клиенте
    if (!username || !email || !password) {
      setMessage('Пожалуйста, заполните все поля.');
      setMessageType('error');
      setIsLoading(false);
      return;
    }

    // Здесь будет ваш код для отправки данных на сервер
    // Имитация API-запроса с задержкой
    try {
      // Пример: отправка данных на ваш сервер
      // const response = await fetch('/api/register', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ username, email, password }),
      // });

      // const data = await response.json();

      // if (response.ok) { // Если запрос успешен (статус 2xx)
      //   setMessage('Регистрация прошла успешно!');
      //   setMessageType('success');
      //   setUsername('');
      //   setEmail('');
      //   setPassword('');
      // } else { // Если произошла ошибка на сервере
      //   setMessage(data.message || 'Ошибка регистрации.');
      //   setMessageType('error');
      // }

      // --- Вместо закомментированного fetch, пока имитируем: ---
      await new Promise(resolve => setTimeout(resolve, 1500)); // Имитация задержки 1.5 секунды
      const success = Math.random() > 0.3; // 70% шанс на успешную регистрацию для теста

      if (success) {
        setMessage('Регистрация прошла успешно! Добро пожаловать!');
        setMessageType('success');
        setUsername('');
        setEmail('');
        setPassword('');
      } else {
        setMessage('Ошибка регистрации. Возможно, пользователь уже существует.');
        setMessageType('error');
      }
      // --- Конец имитации ---

    } catch (error) {
              console.error('Ошибка при отправке данных:', error);
      setMessage('Произошла ошибка сети или сервера.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page-container">
      <h1>Регистрация</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Имя пользователя:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
      </form>
      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}
    </div>
  );
}

export default RegisterPage;


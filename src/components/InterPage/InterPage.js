import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import './InterPage.css'

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Хук для навигации

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Здесь должна быть ваша логика аутентификации (запрос к API, проверка данных)
    // Временно для примера
    if (email === 'test@example.com' && password === 'password') {
      // Успешная аутентификация
      onLogin(email); // Вызываем функцию onLogin, переданную из App.js
      navigate('/');   // Перенаправляем на главную страницу
    } else {
      // Ошибка аутентификации
      alert('Неверные учетные данные');
    }
  };

  return (
    <div className="login-container">
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Войти</button>
      </form>
      <p>
        Нет учетной записи? <Link to="/sign-up">Зарегистрироваться</Link>
      </p>
    </div>
  );
}

export default Login;

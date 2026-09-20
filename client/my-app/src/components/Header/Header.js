import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import './Header.css';
import logo from '../../Circle.png'; 

export default function Header() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [isAuth, setIsAuth] = useState(false);

  // Получаем имя вошедшего пользователя из localStorage
  useEffect(() => {
    const checkUser = () => {
      const token = localStorage.getItem('auth_token');
      const storedUser = localStorage.getItem('user');

      if (token && storedUser) {
        setIsAuth(true);
        try {
          const parsed = JSON.parse(storedUser);
          setUserName(parsed.fullName || 'Алексей');
        } catch (e) {
          setUserName(storedUser);
        }
      } else {
        setIsAuth(false);
        setUserName('');
      }
    };

    checkUser();
    // Слушаем изменения хранилища
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    setIsAuth(false);
    navigate('/login', { replace: true });
  };

  return (
    <header className="header-container">
      <div className="header-content">
        
        {/* Логотип с лягушонком */}
        <Link to="/" className="header-logo-group">
          <img src={logo} alt="Логотип FrogLing" className="header__logo-image" />
          <span className="header-logo-text">Лягушонок</span>
        </Link>

        {/* Навигационное меню */}
        <nav className="header-nav">
          <Link to="/about" className="nav-link">О нас</Link>
          <Link to="/classes" className="nav-link">Виды занятий</Link>
          <Link to="/trainers" className="nav-link">Тренеры</Link>
          <Link to="/gallery" className="nav-link">Фото занятий</Link>
          <Link to="/trial" className="nav-link">Первое занятие</Link>
          <Link to="/services" className="nav-link">Услуги</Link>
          <Link to="/promos" className="nav-link">Акции</Link>
          <Link to="/schedule" className="nav-link">Расписание</Link>

          {/* Блок пользователя вместо слова "Профиль" */}
          {isAuth ? (
            <div className="user-nav-container">
              <Link to="/profile" className="user-profile-badge" title="Перейти в личный кабинет">
                <div className="user-mini-avatar">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="user-mini-name">{userName}</span>
              </Link>

              {/* Кнопка "Выйти" в шапке */}
              <button 
                type="button"
                onClick={handleLogout} 
                className="header-logout-button"
                title="Выйти из аккаунта"
              >
                <LogOut className="w-4 h-4" />
                <span>Выйти</span>
              </button>
            </div>
          ) : (
            <Link to="/login" className="nav-link nav-link-login">
              Войти
            </Link>
          )}
        </nav>

      </div>
    </header>
  );
}
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, Shield } from 'lucide-react';
import './Header.css';
import logo from '../../Circle.png'; 

export default function Header() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Получаем имя вошедшего пользователя из localStorage
  useEffect(() => {
    const checkUser = () => {
      const token = localStorage.getItem('auth_token');
      const storedUser = localStorage.getItem('user');

      if (token && storedUser) {
        setIsAuth(true);
        try {
          const parsed = JSON.parse(storedUser);
          setUserName(parsed.fullName || 'Пользователь');
          const userRole = parsed.role || parsed.Role;
          setIsAdmin(userRole === 'Admin');
        } catch (e) {
          setUserName(storedUser);
          setIsAdmin(false);
        }
      } else {
        setIsAuth(false);
        setIsAdmin(false);
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
    setIsAdmin(false);
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
          <Link to="/lessons" className="nav-link">Виды занятий</Link>
          <Link to="/trainers" className="nav-link">Тренеры</Link>
          <Link to="/photo" className="nav-link">Фото занятий</Link>
          <Link to="/first" className="nav-link">Первое занятие</Link>
          <Link to="/services" className="nav-link">Услуги</Link>
          <Link to="/promotions" className="nav-link">Акции</Link>
          <Link to="/schedule" className="nav-link">Расписание</Link>

          {/* ВСПЛЫВАЕТ ТОЛЬКО ДЛЯ АДМИНИСТРАТОРА! */}
          {isAdmin && (
            <Link to="/admin" className="nav-link nav-link-admin flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" /> Админка
            </Link>
          )}

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
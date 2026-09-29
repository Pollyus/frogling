import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, LogOut, Shield, Briefcase } from 'lucide-react';
import './Header.css';
import logo from '../../Circle.png'; 

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTrainer, setIsTrainer] = useState(false);

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
          setIsTrainer(userRole === 'Trainer');
        } catch (e) {
          setIsAdmin(false);
          setIsTrainer(false);
        }
      } else {
        setIsAuth(false);
        setIsAdmin(false);
        setIsTrainer(false);
        setUserName('');
      }
    };

    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    setIsAuth(false);
    setIsAdmin(false);
    setIsTrainer(false);
    navigate('/login', { replace: true });
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header-container">
      <div className="header-content">
        {/* Логотип */}
        <Link to="/" className="header-logo-group">
          <img src={logo} alt="Логотип FrogLing" className="header__logo-image" />
          <span className="header-logo-text">Лягушонок</span>
        </Link>

        {/* Навигационное меню */}
        <nav className="header-nav">
          {isAdmin ? (
            /* 1. Меню для АДМИНИСТРАТОРА */
            <>
              <Link to="/promotions" className={`nav-link ${isActive('/promotions') ? 'active' : ''}`}>
                Акции
              </Link>
              <Link to="/schedule" className={`nav-link ${isActive('/schedule') ? 'active' : ''}`}>
                Расписание
              </Link>
              <Link to="/admin" className={`nav-link nav-link-admin ${isActive('/admin') ? 'active' : ''}`}>
                <Shield className="w-4 h-4" />
                <span>Админка</span>
              </Link>
            </>
          ) : isTrainer ? (
            /* 2. Меню для ТРЕНЕРА: Тренеры, Расписание, Услуги, Кабинет */
            <>
              <Link to="/trainers" className={`nav-link ${isActive('/trainers') ? 'active' : ''}`}>
                Тренеры
              </Link>
              <Link to="/schedule" className={`nav-link ${isActive('/schedule') ? 'active' : ''}`}>
                Расписание
              </Link>
              <Link to="/services" className={`nav-link ${isActive('/services') ? 'active' : ''}`}>
                Услуги
              </Link>
              <Link to="/trainer-cabinet" className={`nav-link ${isActive('/trainer-cabinet') ? 'active' : ''}`}>
                <Briefcase className="w-4 h-4" />
                <span>Кабинет тренера</span>
              </Link>
            </>
          ) : (
            /* 3. Меню для ОБЫЧНЫХ ПОЛЬЗОВАТЕЛЕЙ И ГОСТЕЙ */
            <>
              <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>
                О нас
              </Link>
              <Link to="/classes" className={`nav-link ${isActive('/classes') ? 'active' : ''}`}>
                Виды занятий
              </Link>
              <Link to="/trainers" className={`nav-link ${isActive('/trainers') ? 'active' : ''}`}>
                Тренеры
              </Link>
              <Link to="/gallery" className={`nav-link ${isActive('/gallery') ? 'active' : ''}`}>
                Фото занятий
              </Link>
              <Link to="/first-lesson" className={`nav-link ${isActive('/first-lesson') ? 'active' : ''}`}>
                Первое занятие
              </Link>
              <Link to="/services" className={`nav-link ${isActive('/services') ? 'active' : ''}`}>
                Услуги
              </Link>
              <Link to="/promotions" className={`nav-link ${isActive('/promotions') ? 'active' : ''}`}>
                Акции
              </Link>
              <Link to="/schedule" className={`nav-link ${isActive('/schedule') ? 'active' : ''}`}>
                Расписание
              </Link>
            </>
          )}

          {/* Правая панель пользователя / Вход */}
          {isAuth ? (
            <div className="user-nav-container">
              {/* Показываем профиль только обычным пользователям */}
              {!isAdmin && !isTrainer && (
                <Link to="/profile" className="user-profile-badge">
                  <div className="user-mini-avatar">
                    <User className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="user-mini-name">{userName}</span>
                </Link>
              )}

              {/* Показываем имя для тренера и админа без ссылки на профиль */}
              {(isAdmin || isTrainer) && (
                <div className="user-profile-badge role-badge">
                   <div className="user-mini-avatar role-avatar">
                    {isAdmin ? <Shield className="w-3.5 h-3.5 text-white" /> : <Briefcase className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <span className="user-mini-name">{userName}</span>
                </div>
              )}

              <button type="button" onClick={handleLogout} className="header-logout-button" title="Выйти из аккаунта">
                <LogOut className="w-4 h-4" />
                <span>Выйти</span>
              </button>
            </div>
          ) : (
            <Link to="/login" className="nav-link-login">
              Войти
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
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
  const [isTrainer, setIsTrainer] = useState(false);

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

          {/* Кнопка Админки */}
          {isAdmin && (
            <Link to="/admin" className="nav-link nav-link-admin flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" /> Админка
            </Link>
          )}
          

          {/* КНОПКА КАБИНЕТА ТРЕНЕРА */}
          {isTrainer && (
            <Link to="/trainer-cabinet" className="nav-link nav-link-trainer flex items-center gap-1" style={{ background: '#eef8ea', color: '#2d6a1b', border: '1px solid #b2db6b', borderRadius: '8px', padding: '4px 10px', fontWeight: '700' }}>
              <Briefcase className="w-3.5 h-3.5" /> Кабинет тренера
            </Link>
          )}

          {isAuth ? (
            <div className="user-nav-container">
              {/* Если это НЕ тренер, показываем ссылку на обычный профиль */}
              {!isTrainer && (
                <Link to="/profile" className="user-profile-badge">
                  <div className="user-mini-avatar"><User className="w-4 h-4 text-white" /></div>
                  <span className="user-mini-name">{userName}</span>
                </Link>
              )}

              {/* Если это тренер, выводим его имя без ссылки на чужой профиль ученика */}
              {isTrainer && (
                <span className="user-profile-badge" style={{ cursor: 'default' }}>
                  <div className="user-mini-avatar" style={{ background: '#2d6a1b' }}><Briefcase className="w-4 h-4 text-white" /></div>
                  <span className="user-mini-name">{userName}</span>
                </span>
              )}

              <button type="button" onClick={handleLogout} className="header-logout-button">
                <LogOut className="w-4 h-4" />
                <span>Выйти</span>
              </button>
            </div>
          ) : (
            <Link to="/login" className="nav-link nav-link-login">Войти</Link>
          )}
        </nav>

      </div>
    </header>
  );
}
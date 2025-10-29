import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../Circle.png'; 
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          Лягушонок
          <img src={logo} alt="Логотип FrogLing" className="header__logo-image" /> {/* Размещаем логотип под названием */}
        </Link>
        
        <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <Link to="/about">О нас</Link>
            </li>
            <li className="header__nav-item">
              <Link to="/lessons">Виды занятий</Link>
            </li>
            <li className="header__nav-item">
              <Link to="/trainers">Тренеры</Link>
            </li>
            <li className="header__nav-item">
              <Link to="/first">Первое занятие</Link>
            </li>
            <li className="header__nav-item">
              <Link to="/products">Услуги</Link>
            </li>
            <li className="header__nav-item">
              <Link to="/promotions">Акции</Link>
            </li>
          </ul>
        </nav>
        <button className="header__burger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;


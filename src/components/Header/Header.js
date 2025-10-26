import React from 'react';
import logo from '../../Circle.png';
import { Routes, Route, Link } from 'react-router-dom';
// import './Header.css';

function Header({ email, logOut }) {
    return (
        <header className='header'>
            <div className="header__left">
                <img src={logo} alt="Логотип" className='header__logo' />
            </div>
            <h1 class="centered-title">Лягушонок</h1>
            {/* <Routes>
                <Route
                    path="/sign-in"
                    element={
                        <Link className="header__link" to="/sign-up">
                            Регистрация
                        </Link>
                    }
                />
                <Route
                    path="/sign-up"
                    element={
                        <Link className="header__link" to="/sign-in">
                            Войти
                        </Link>
                    }
                />
                <Route
                    path="/"
                    element={
                        <div className="header__user-info">
                            <p className="header__user-email">{email}</p>
                            <button className="header__button" onClick={logOut}>
                                Выйти
                            </button>
                        </div>
                    }
                />
            </Routes> */}
            <div className="header__right"></div>
        </header>
    )
}

export default Header;
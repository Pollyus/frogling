import React from 'react';
import logo from 'C:/Users/Админ/Documents/frogling/my-app/src/Circle.png';
import { Routes, Route, Link } from 'react-router-dom';
// import Header from './Header';
// import Login from ;
// import Register from '../RegisterPage/RegisterPage';

function Header({ email, logOut }) {
    return (
        <header className='header'>
            <img src={logo} alt="Логотип" className='header__logo' />
            <h1>Лягушонок</h1>
            <Routes>
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
            </Routes>
        </header>
    )
}

export default Header;
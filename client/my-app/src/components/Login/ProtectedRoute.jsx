// src/components/ProtectedRoute.jsx
//компонент защиты маршрутов
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  // Проверяем, авторизован ли пользователь (например, по наличию токена)
  const token = localStorage.getItem('auth_token');

  // Если нет токена — перенаправляем на страницу логина
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Если авторизован — показываем дочерние компоненты (сам сайт)
  return <Outlet />;
}

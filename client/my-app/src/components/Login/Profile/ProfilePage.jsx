import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, LogOut, Shield, Calendar, Bell, Check, Key } from 'lucide-react';
import './ProfilePage.css';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ fullName: '', email: '' });
  const [isSaved, setIsSaved] = useState(false);

  // Получаем данные текущего пользователя из localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser({
          fullName: parsed.fullName || 'Пользователь Frogling',
          email: parsed.email || 'user@example.com'
        });
      } catch (e) {
        setUser({ fullName: 'Пользователь Frogling', email: storedUser });
      }
    } else {
      setUser({ fullName: 'Пользователь Frogling', email: 'user@example.com' });
    }
  }, []);

  // Функция выхода из аккаунта
  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  // Сохранение изменений профиля
  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify(user));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="profile-container">
      {/* Шапка сайта (Header) */}
      <header className="profile-header">
        <div className="header-content">
          <div className="brand-logo" onClick={() => navigate('/')}>
            <div className="logo-icon">
              🐸
            </div>
            <span className="brand-name">
              Frogling
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400 hidden sm:inline">{user.email}</span>
            <button
              type="button"
              onClick={handleLogout}
              className="logout-btn-header"
              title="Выйти из аккаунта"
            >
              <LogOut className="w-4 h-4" />
              <span>Выйти</span>
            </button>
          </div>
        </div>
      </header>

      {/* Основной контент профиля */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 my-6">
        
        {/* Карточка профиля */}
        <div className="profile-card">
          <div className="card-accent-bar"></div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            
            {/* Аватар */}
            <div className="avatar-container">
              👤
            </div>

            {/* Имя и статус */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <h1 className="text-2xl font-bold text-white">{user.fullName}</h1>
                <span className="status-badge w-max mx-auto sm:mx-0">
                  <Shield className="w-3.5 h-3.5" /> Учётная запись активна
                </span>
              </div>
              <p className="text-slate-400 text-sm mt-1">{user.email}</p>
              
              <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-emerald-400" /> Зарегистрирован: 2026
                </span>
                <span className="flex items-center gap-1.5">
                  <Bell className="w-4 h-4 text-emerald-400" /> Уведомления включены
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Форма редактирования личных данных */}
        <div className="profile-card">
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-400" /> Личная информация
          </h2>

          {isSaved && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-sm flex items-center gap-2">
              <Check className="w-5 h-5 text-emerald-400" /> Изменения успешно сохранены!
            </div>
          )}

          <form onSubmit={handleSave} className="profile-form space-y-5">
            <div className="form-group">
              <label className="form-label">Имя и Фамилия</label>
              <div className="input-wrapper">
                <User className="input-icon" />
                <input
                  type="text"
                  value={user.fullName}
                  onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                  className="form-input"
                  placeholder="Ваше имя"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Электронная почта</label>
              <div className="input-wrapper">
                <Mail className="input-icon" />
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="form-input"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row justify-between items-center gap-4">
              <button
                type="button"
                onClick={() => alert('Ссылка для смены пароля отправлена на почту')}
                className="text-xs text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1.5"
              >
                <Key className="w-3.5 h-3.5" /> Сменить пароль
              </button>

              <button
                type="submit"
                className="btn-save w-full sm:w-auto"
              >
                Сохранить изменения
              </button>
            </div>
          </form>

          {/* Опасная зона (Выход из профиля) */}
          <div className="danger-zone">
            <div>
              <h3 className="text-sm font-semibold text-white">Сессия авторизации</h3>
              <p className="text-xs text-slate-400">Завершите текущую сессию, чтобы выйти из системы на этом устройстве.</p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="danger-btn w-full sm:w-auto"
            >
              <LogOut className="w-4 h-4" /> Выйти из аккаунта
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ShieldCheck, AlertCircle } from 'lucide-react';
import './AuthPage.css';

export default function AuthPage() {
  const navigate = useNavigate();

  // Состояния формы и отображения
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // Данные формы
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
    agreeTerms: false
  });

  // Ошибки валидации
  const [errors, setErrors] = useState({});

  // Обработчик изменения полей
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  // Валидация полей формы
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Введите Email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Некорректный формат Email';
    }

    if (!formData.password) {
      newErrors.password = 'Введите пароль';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Минимум 6 символов';
    }

    if (!isLogin) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Введите имя';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Пароли не совпадают';
      }
      if (!formData.agreeTerms) {
        newErrors.agreeTerms = 'Необходимо согласие с условиями';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Обработчик отправки формы
  const API_BASE_URL = 'https://localhost:7026/api/auth'; // Укажите ваш актуальный порт API

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setNotification(null);

    const endpoint = isLogin ? `${API_BASE_URL}/login` : `${API_BASE_URL}/register`;

    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : { fullName: formData.fullName, email: formData.email, password: formData.password };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Произошла ошибка при авторизации.');
      }

      // Сохраняем полученный JWT токен и данные пользователя
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setNotification({
        type: 'success',
        message: isLogin ? 'Успешный вход! Перенаправление...' : 'Регистрация успешна! Добро пожаловать!'
      });

      // Проверяем роль и перенаправляем в нужный кабинет через 800 мс
      const userRole = data.user.role || data.user.Role;

      setTimeout(() => {
        if (userRole === 'Trainer') {
          navigate('/trainer-cabinet', { replace: true });
        } else if (userRole === 'Admin') {
          navigate('/admin', { replace: true });
        } else {
          navigate('/profile', { replace: true });
        }
      }, 800);

    } catch (err) {
      console.error('Ошибка сети/авторизации:', err);
      setNotification({
        type: 'error',
        message: err.message || 'Не удалось подключиться к серверу API'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Свечения на фоне */}
      <div className="auth-bg-glow-1 absolute top-0 -left-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="auth-bg-glow-2 absolute bottom-0 -right-40 w-96 h-96 bg-green-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Карточка формы */}
      <div className="auth-card w-full max-w-md bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative z-10">
        
        {/* Кнопки переключения режимов */}
        <div className="auth-tabs flex p-1 bg-slate-950 rounded-2xl border border-slate-800 mb-8">
          <button
            type="button"
            onClick={() => { setIsLogin(true); setErrors({}); setNotification(null); }}
            className={`auth-tab-btn flex-1 py-2 text-sm font-semibold rounded-xl transition ${
              isLogin ? 'active bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Вход
          </button>
          <button
            type="button"
            onClick={() => { setIsLogin(false); setErrors({}); setNotification(null); }}
            className={`auth-tab-btn flex-1 py-2 text-sm font-semibold rounded-xl transition ${
              !isLogin ? 'active bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Регистрация
          </button>
        </div>

        <h1 className="auth-title text-2xl font-bold mb-1">{isLogin ? 'С возвращением!' : 'Создать аккаунт'}</h1>
        <p className="auth-subtitle text-sm text-slate-400 mb-6">{isLogin ? 'Авторизуйтесь в системе Лягушонок' : 'Заполните форму ниже'}</p>

        {notification && (
          <div className={`mb-6 p-4 rounded-xl text-sm border ${
            notification.type === 'error' 
              ? 'bg-red-950/50 border-red-500/30 text-red-200' 
              : 'bg-emerald-950/50 border-emerald-500/30 text-emerald-200'
          }`}>
            {notification.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="form-group">
              <label className="form-label block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Имя</label>
              <div className="input-wrapper relative w-full">
                <User className="input-icon absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 pointer-events-none" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Иван Иванов"
                  className={`auth-input w-full pl-10 pr-10 py-3 bg-slate-950 border ${errors.fullName ? 'error border-red-500' : 'border-slate-800 focus:border-emerald-500'} rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition`}
                />
              </div>
              {errors.fullName && <p className="error-text text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.fullName}</p>}
            </div>
          )}

          <div className="form-group">
            <label className="form-label block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Логин / Email</label>
            <div className="input-wrapper relative w-full">
              <Mail className="input-icon absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 pointer-events-none" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                className={`auth-input w-full pl-10 pr-10 py-3 bg-slate-950 border ${errors.email ? 'error border-red-500' : 'border-slate-800 focus:border-emerald-500'} rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition`}
              />
            </div>
            {errors.email && <p className="error-text text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
          </div>

          <div className="form-group">
            <label className="form-label block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Пароль</label>
            <div className="input-wrapper relative w-full">
              <Lock className="input-icon absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className={`auth-input w-full pl-10 pr-10 py-3 bg-slate-950 border ${errors.password ? 'error border-red-500' : 'border-slate-800 focus:border-emerald-500'} rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition`}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="password-toggle-btn absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 bg-transparent border-0 p-0 m-0 cursor-pointer flex items-center justify-center"
                aria-label="Показать или скрыть пароль"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="error-text text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.password}</p>}
          </div>

          {!isLogin && (
            <div className="form-group">
              <label className="form-label block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Подтверждение пароля</label>
              <div className="input-wrapper relative w-full">
                <ShieldCheck className="input-icon absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 pointer-events-none" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className={`auth-input w-full pl-10 pr-10 py-3 bg-slate-950 border ${errors.confirmPassword ? 'error border-red-500' : 'border-slate-800 focus:border-emerald-500'} rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition`}
                />
                <button 
                  type="button" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                  className="password-toggle-btn absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 bg-transparent border-0 p-0 m-0 cursor-pointer flex items-center justify-center"
                  aria-label="Показать или скрыть подтверждение пароля"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="error-text text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.confirmPassword}</p>}
            </div>
          )}

          {isLogin ? (
            <label className="checkbox-label flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
              <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleInputChange} className="rounded bg-slate-950 border-slate-800 text-emerald-500 focus:ring-0" />
              <span>Запомнить меня</span>
            </label>
          ) : (
            <label className="checkbox-label flex items-start gap-2 text-xs text-slate-400 cursor-pointer">
              <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleInputChange} className="rounded bg-slate-950 border-slate-800 text-emerald-500 focus:ring-0 mt-0.5" />
              <span>Я принимаю Условия использования и Политику приватности</span>
            </label>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="submit-btn w-full py-3.5 bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white font-semibold rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 disabled:opacity-75"
          >
            {isLoading ? 'Загрузка...' : isLogin ? 'Войти' : 'Создать аккаунт'}
          </button>
        </form>
      </div>
    </div>
  );
}
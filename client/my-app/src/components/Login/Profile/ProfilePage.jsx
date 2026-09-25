import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, Phone, Calendar, Shield, Bell, Check, 
  Key, Award, Activity, Clock, FileText, CreditCard, 
  ShoppingBag, AlertCircle, Loader2, Droplet, MessageSquare
} from 'lucide-react';
import './ProfilePage.css';

const API_URL = 'https://localhost:7026/api';

export default function ProfilePage() {
  const navigate = useNavigate();
  
  // 1. Состояния профиля (ФИО, Email, Телефон, Родитель)
  const [user, setUser] = useState({ 
    fullName: '', 
    email: '', 
    phone: '',
    parentName: ''
  });
  
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // 2. Состояния абонементов
  const [subscriptions, setSubscriptions] = useState([]);
  const [loadingSubs, setLoadingSubs] = useState(true);

  // 3. Состояния бронирований/записей
  const [myBookings, setMyBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [bookingsError, setBookingsError] = useState(null);

  // 4. Активный таб
  const [activeTab, setActiveTab] = useState('info'); // info | subscription | bookings | history

  // Состояния для чата с тренером в личном кабинете
  const [trainers, setTrainers] = useState([]); // Список тренеров, с которыми можно вести диалог
  const [activeTrainer, setActiveTrainer] = useState(null); // Выбранный тренер для чата
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);

  // Загружаем список тренеров при монтировании (чтобы родитель знал, кому писать)
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const u = JSON.parse(userStr);
        setCurrentUserId(u.id || u.Id);
      } catch (e) {}
    }

    if (!token) return;

    // Получаем список всех тренеров (у них есть свойство userId для чата)
    fetch(`${API_URL}/trainers`, { // Или ваш эндпоинт со списком тренеров, либо жестко пропишем ниже
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) setTrainers(data);
    })
    .catch(() => {
      // Резервный список тренеров, если публичного эндпоинта нет
      setTrainers([
        { id: 1, name: 'Любовь', userId: '44444444-4444-4444-4444-444444444444', photoUrl: '👩‍🏫', specialization: 'Грудничковое плавание' },
        { id: 2, name: 'Владислав', userId: '22222222-2222-2222-2222-222222222222', photoUrl: '👨‍🏫', specialization: 'Раннее обучение' },
        { id: 3, name: 'Лидия', userId: '33333333-3333-3333-3333-333333333333', photoUrl: '🏊‍♀️', specialization: 'Аквааэробика и ЛФК' }
      ]);
    });
  }, []);

  // Опрос сообщений чата каждые 3 секунды, если выбран тренер
  useEffect(() => {
    if (!activeTrainer || !activeTrainer.userId) return;
    const token = localStorage.getItem('auth_token');

    const fetchMessages = () => {
      fetch(`${API_URL}/chat/history/${activeTrainer.userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setMessages(data);
      });
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [activeTrainer]);

  // Отправка сообщения тренеру
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeTrainer) return;
    const token = localStorage.getItem('auth_token');

    try {
      const res = await fetch(`${API_URL}/chat/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          receiverId: activeTrainer.userId,
          text: newMessage
        })
      });

      if (res.ok) {
        const msg = await res.json();
        setMessages(prev => [...prev, msg]);
        setNewMessage('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Загрузка всех данных при монтировании
  useEffect(() => {
    const fetchAllData = async () => {
      const token = localStorage.getItem('auth_token');
      const storedUser = localStorage.getItem('user');

      // Шаг A. Первичная загрузка пользователя из localStorage (чтобы UI не моргал)
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          setUser(prev => ({
            ...prev,
            fullName: parsed.fullName || '',
            email: parsed.email || '',
            phone: parsed.phone || '',
            parentName: parsed.parentName || ''
          }));
        } catch (e) {
          setUser(prev => ({ ...prev, email: storedUser }));
        }
      }

      if (!token) {
        setLoadingProfile(false);
        setLoadingSubs(false);
        setLoadingBookings(false);
        return;
      }

      // Шаг B. Загрузка профиля из базы данных (SQL Server)
      try {
        const profileRes = await fetch(`${API_URL}/profile`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setUser(profileData);
          localStorage.setItem('user', JSON.stringify(profileData));
        }
      } catch (err) {
        console.error('Ошибка загрузки профиля из БД:', err);
      } finally {
        setLoadingProfile(false);
      }

      // Шаг C. Загрузка абонементов
      try {
        const subsRes = await fetch(`${API_URL}/subscriptions`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (subsRes.ok) {
          const subsData = await subsRes.json();
          setSubscriptions(Array.isArray(subsData) ? subsData : []);
        }
      } catch (err) {
        console.error('Ошибка загрузки абонементов из БД:', err);
      } finally {
        setLoadingSubs(false);
      }

      // Шаг D. Загрузка записей на занятия
      try {
        const bookingsRes = await fetch(`${API_URL}/bookings`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (bookingsRes.ok) {
          const bookingsData = await bookingsRes.json();
          setMyBookings(Array.isArray(bookingsData) ? bookingsData : []);
        }
      } catch (err) {
        console.error('Ошибка загрузки записей из БД:', err);
        setBookingsError('Не удалось загрузить записи.');
      } finally {
        setLoadingBookings(false);
      }
    };

    fetchAllData();
  }, []);

  // Функция для сокращения дня недели
  const getShortDay = (dayStr) => {
    if (!dayStr) return '';
    const map = {
      'понедельник': 'Пн',
      'вторник': 'Вт',
      'среда': 'Ср',
      'четверг': 'Чт',
      'пятница': 'Пт',
      'суббота': 'Сб',
      'воскресенье': 'Вс'
    };
    const lower = dayStr.trim().toLowerCase();
    return map[lower] || dayStr; // Если не найдено, вернет исходный текст
  };


  // Вычисляем активный абонемент
  const activeSub = Array.isArray(subscriptions)
    ? subscriptions.find(s => s.isActive && new Date(s.expiryDate) > new Date())
    : null;

  // ВЫЧИСЛЯЕМ БЛИЖАЙШУЮ ТРЕНИРОВКУ:
  // Берем первую запись из списка (сервер сортирует их по дате)
  const nextBooking = Array.isArray(myBookings) && myBookings.length > 0 
    ? myBookings[0] 
    : null;

  // Форматируем текст для плашки (например, "Пн, 10:00" или "10.10 в 16:30")
  const nextBookingText = nextBooking 
    ? `${getShortDay(nextBooking.dayOfWeek) || ''} ${nextBooking.time ? nextBooking.time.split(' - ')[0] : ''}`.trim()
    : 'Записей нет';


  // Сохранение изменений в профиле (PUT запрос на бэкенд)
  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('auth_token');
    if (!token) {
      setProfileError('Нужно заново войти в аккаунт.');
      return;
    }

    setProfileError('');

    try {
      const response = await fetch(`${API_URL}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          fullName: user.fullName,
          email: user.email,
          phone: user.phone || '',
          parentName: user.parentName || ''
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Ошибка сохранения профиля');
      }

      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2500);
    } catch (error) {
      setProfileError(error.message || 'Не удалось сохранить изменения.');
    }
  };

  // Отмена записи
  const cancelBooking = async (bookingId) => {
    if (!window.confirm('Вы действительно хотите отменить эту запись на занятие?')) return;

    const token = localStorage.getItem('auth_token');
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const text = await res.text();
      let data = {};
      try { data = text ? JSON.parse(text) : {}; } catch {}

      if (!res.ok) {
        throw new Error(data.message || 'Ошибка при отмене записи');
      }

      alert(data.message || 'Запись успешно отменена!');

      // Удаляем из списка в UI
      setMyBookings(prev => prev.filter(b => b.id !== bookingId));

      // Если занятие было возвращено на абонемент, обновляем абонементы в UI
      if (data.lessonReturned) {
        setSubscriptions(prev => {
          return prev.map(sub => {
            // Если у абонемента есть место для возврата, пополняем
            if (sub.remainingLessons < sub.totalLessons) {
              return { ...sub, remainingLessons: sub.remainingLessons + 1 };
            }
            return sub;
          });
        });
      }

    } catch (err) {
      alert(err.message || 'Не удалось отменить запись.');
    }
  };

  return (
    <div className="profile-container-light">
      <div className="profile-wrapper">
        
        {/* Карточка пользователя */}
        <div className="user-hero-card">
          <div className="user-hero-avatar-wrap">
            <div className="user-hero-avatar">
              <User className="avatar-icon" />
            </div>
            <span className="user-status-pill">
              <Shield className="w-3.5 h-3.5" /> Ученик
            </span>
          </div>

          <div className="user-hero-info">
            <div className="user-hero-heading">
              <h1 className="user-hero-name">{user.fullName || 'Загрузка...'}</h1>
              <span className="user-level-tag">
                <Droplet className="w-3 h-3" /> Уровень: «Уверенный головастик»
              </span>
            </div>
            <p className="user-hero-email">{user.email}</p>

            <div className="user-hero-meta">
              <span><Calendar className="w-4 h-4 text-emerald-600" /> Зарегистрирован: 2026 г.</span>
              <span><Bell className="w-4 h-4 text-emerald-600" /> SMS-оповещения включены</span>
              <span><Award className="w-4 h-4 text-amber-500" /> Медосмотр: действителен</span>
            </div>
          </div>
        </div>

        {/* Быстрая статистика по абонементам */}
        <div className="stats-cards-grid">
          <div className="stat-card">
            <div className="stat-icon-wrap bg-emerald-100 text-emerald-700">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="stat-number">
                {activeSub ? activeSub.totalLessons - activeSub.remainingLessons : 0}
              </div>
              <div className="stat-label">Посещённых занятий</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap bg-blue-100 text-blue-700">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <div className="stat-number">
                {activeSub ? `${activeSub.remainingLessons} из ${activeSub.totalLessons}` : '0 из 0'}
              </div>
              <div className="stat-label">Остаток по абонементу</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap bg-purple-100 text-purple-700">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="stat-number" style={{ fontSize: nextBooking ? '17px' : '20px' }}>
                {nextBookingText}
              </div>
              <div className="stat-label">
                {nextBooking ? (nextBooking.groupName || 'Ближайшая тренировка') : 'Ближайшая тренировка'}
              </div>
            </div>
          </div>
        </div>

        {/* Навигационные табы */}
        <div className="profile-tabs-nav">
          <button 
            type="button"
            className={`profile-tab-btn ${activeTab === 'info' ? 'active' : ''}`}
            onClick={() => setActiveTab('info')}
          >
            Личная информация
          </button>
          <button 
            type="button"
            className={`profile-tab-btn ${activeTab === 'subscription' ? 'active' : ''}`}
            onClick={() => setActiveTab('subscription')}
          >
            Мой абонемент
          </button>
          <button 
            type="button"
            className={`profile-tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            Мои записи ({myBookings.length})
          </button>
          <button 
            type="button"
            className={`profile-tab-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            История покупок ({subscriptions.length})
          </button>
          <button 
            type="button"
            className={`profile-tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            Сообщения
          </button>
        </div>

        {/* Вкладка 1: Личные данные */}
        {activeTab === 'info' && (
          <div className="profile-main-card">
            <h2 className="profile-section-title">
              <User className="w-5 h-5 text-emerald-600" /> Данные ученика и родителя
            </h2>

            {isSaved && (
              <div className="alert-saved">
                <Check className="w-5 h-5" /> Изменения успешно сохранены!
              </div>
            )}

            {profileError && (
              <div className="alert-error flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg border border-red-200 text-sm mb-4">
                <AlertCircle className="w-4 h-4" /> {profileError}
              </div>
            )}

            <form onSubmit={handleSave} className="profile-form-grid">
              <div className="form-field">
                <label>ФИО ребёнка / ученика</label>
                <div className="field-input-wrap">
                  <User className="field-icon" />
                  <input
                    type="text"
                    value={user.fullName || ''}
                    onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                    placeholder="Имя Фамилия"
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <label>Электронная почта</label>
                <div className="field-input-wrap">
                  <Mail className="field-icon" />
                  <input
                    type="email"
                    value={user.email || ''}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <label>Контактный телефон</label>
                <div className="field-input-wrap">
                  <Phone className="field-icon" />
                  <input
                    type="tel"
                    value={user.phone || ''}
                    onChange={(e) => setUser({ ...user, phone: e.target.value })}
                    placeholder="+7 (999) 000-00-00"
                  />
                </div>
              </div>

              <div className="form-field">
                <label>ФИО родителя (представителя)</label>
                <div className="field-input-wrap">
                  <FileText className="field-icon" />
                  <input
                    type="text"
                    value={user.parentName || ''}
                    onChange={(e) => setUser({ ...user, parentName: e.target.value })}
                    placeholder="ФИО родителя"
                  />
                </div>
              </div>

              <div className="form-actions-row">
                <button
                  type="button"
                  onClick={() => alert('Ссылка для смены пароля отправлена на почту')}
                  className="btn-change-password"
                >
                  <Key className="w-4 h-4" /> Сменить пароль
                </button>

                <button type="submit" className="btn-save-primary">
                  Сохранить изменения
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Вкладка 2: Активный абонемент */}
        {activeTab === 'subscription' && (
          <div className="profile-main-card">
            <h2 className="profile-section-title">
              <CreditCard className="w-5 h-5 text-emerald-600" /> Текущий абонемент в бассейне
            </h2>

            {loadingSubs ? (
              <div className="flex items-center gap-2 text-slate-500 py-6 justify-center">
                <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
                <span>Загрузка данных из базы...</span>
              </div>
            ) : activeSub ? (
              <div className="subscription-box">
                <div className="sub-header">
                  <div>
                    <h3 className="sub-title">Абонемент «{activeSub.title}»</h3>
                    <p className="sub-dates">
                      Действует до {new Date(activeSub.expiryDate).toLocaleDateString('ru-RU')}
                    </p>
                  </div>
                  <span className="sub-badge active">Активен</span>
                </div>

                <div className="sub-progress-bar">
                  <div 
                    className="sub-progress-fill" 
                    style={{ width: `${(activeSub.remainingLessons / activeSub.totalLessons) * 100}%` }}
                  ></div>
                </div>

                <div className="sub-counter flex justify-between items-center text-sm">
                  <span>Осталось <strong>{activeSub.remainingLessons} занятий</strong> из {activeSub.totalLessons}</span>
                  <br/>
                  <span className="text-xs text-slate-400">
                    Дата покупки: {new Date(activeSub.purchaseDate).toLocaleDateString('ru-RU')}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-700 mb-1">У вас пока нет активного абонемента</h3>
                <p className="text-xs text-slate-500 mb-4">Приобретите подходящий тариф, чтобы начать посещать занятия</p>
                <button 
                  onClick={() => navigate('/services')} 
                  className="btn-save-primary"
                >
                  Купить абонемент
                </button>
              </div>
            )}
          </div>
        )}

        {/* Вкладка 3: Мои записи */}
        {activeTab === 'bookings' && (
          <div className="profile-main-card">
            <h2 className="profile-section-title">
              <Clock className="w-5 h-5 text-emerald-600" /> Записанные тренировки в расписании
            </h2>

            {loadingBookings ? (
              <div className="flex items-center gap-2 text-slate-500 py-6 justify-center">
                <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
                <span>Загрузка списка записей...</span>
              </div>
            ) : bookingsError ? (
              <div className="text-red-500 text-center py-6">{bookingsError}</div>
            ) : myBookings.length > 0 ? (
              <div className="visits-list">
                {myBookings.map((booking) => (
                  <div key={booking.id} className="visit-item flex justify-between items-center">
                    <div className="visit-info">
                      <span className="visit-date">{booking.groupName}</span>
                      <span className="visit-coach">
                        📅 {booking.dayOfWeek}, {booking.time} | Инструктор: {booking.trainerName}
                      </span>
                    </div>
                    <button 
                      type="button"
                      onClick={() => cancelBooking(booking.id)}
                      className="btn-cancel-booking"
                    >
                      Отменить запись
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500 text-sm">
                У вас пока нет активных записей на занятия. Вы можете записаться на странице «Расписание».
              </div>
            )}
          </div>
        )}

        {/* Вкладка 4: История покупок из БД SQL Server */}
        {activeTab === 'history' && (
          <div className="profile-main-card">
            <h2 className="profile-section-title">
              <ShoppingBag className="w-5 h-5 text-emerald-600" /> История всех приобретенных абонементов
            </h2>

            {loadingSubs ? (
              <div className="flex items-center gap-2 text-slate-500 py-6 justify-center">
                <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
                <span>Загрузка истории...</span>
              </div>
            ) : Array.isArray(subscriptions) && subscriptions.length > 0 ? (
              <div className="visits-list">
                {subscriptions.map((sub) => (
                  <div key={sub.id} className="visit-item">
                    <div className="visit-info">
                      <span className="visit-date">Абонемент «{sub.title}» — {sub.price} ₽</span>
                      <span className="visit-coach">
                        Куплено: {new Date(sub.purchaseDate).toLocaleDateString('ru-RU')} | Действует до: {new Date(sub.expiryDate).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                    <span className={`visit-status ${sub.isActive ? 'done' : 'expired'}`}>
                      {sub.isActive ? 'Активен' : 'Завершён'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500 text-sm">
                История покупок пуста.
              </div>
            )}
          </div>
        )}

        {/* Вкладка: Чат с тренерами */}
        {activeTab === 'chat' && (
          <div className="profile-main-card">
            <h2 className="profile-section-title">
              <MessageSquare className="w-5 h-5 text-emerald-600" /> Связь с тренерами
            </h2>

            <div className="client-chat-layout" style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '20px', minHeight: '400px', marginTop: '20px' }}>
              
              {/* Список тренеров слева */}
              <div className="trainers-list-sidebar" style={{ borderRight: '1px solid #e2e8f0', paddingRight: '16px' }}>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Выберите тренера:</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {trainers.map(t => (
                    <div
                      key={t.id}
                      onClick={() => setActiveTrainer(t)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px',
                        borderRadius: '14px',
                        cursor: 'pointer',
                        background: activeTrainer?.id === t.id ? '#eef8ea' : '#f8fafc',
                        border: activeTrainer?.id === t.id ? '1px solid #b2db6b' : '1px solid #e2e8f0',
                        transition: 'all 0.2s'
                      }}
                    >
                      <span style={{ fontSize: '24px' }}>{t.photoUrl || '🐸'}</span>
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '14px', color: '#0f172a' }}>{t.name}</div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>{t.specialization}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Область диалога справа */}
              <div className="chat-conversation-area" style={{ display: 'flex', flexDirection: 'column', height: '420px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                {activeTrainer ? (
                  <>
                    {/* Шапка чата */}
                    <div style={{ padding: '14px 18px', background: '#ffffff', borderBottom: '1px solid #e2e8f0', fontWeight: '700', fontSize: '14px', color: '#0f172a' }}>
                      Диалог с тренером: {activeTrainer.name}
                    </div>

                    {/* Сообщения */}
                    <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {messages.length > 0 ? (
                        messages.map(m => {
                          const isMy = m.senderId === currentUserId;
                          return (
                            <div key={m.id} style={{ display: 'flex', justifyContent: isMy ? 'flex-end' : 'flex-start' }}>
                              <div style={{
                                maxWidth: '75%',
                                padding: '10px 14px',
                                borderRadius: '14px',
                                background: isMy ? '#74b83b' : '#ffffff',
                                color: isMy ? '#ffffff' : '#0f172a',
                                border: isMy ? 'none' : '1px solid #e2e8f0',
                                fontSize: '13px'
                              }}>
                                <p style={{ margin: 0 }}>{m.text}</p>
                                <span style={{ fontSize: '10px', opacity: 0.7, display: 'block', textAlign: 'right', marginTop: '4px' }}>
                                  {new Date(m.sentAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </span>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div style={{ textAlign: 'center', color: '#94a3b8', margin: 'auto', fontSize: '13px' }}>
                          Нет сообщений. Напишите тренеру первым!
                        </div>
                      )}
                    </div>

                    {/* Инпут отправки */}
                    <form onSubmit={handleSendMessage} style={{ display: 'flex', padding: '12px', background: '#ffffff', borderTop: '1px solid #e2e8f0', gap: '8px' }}>
                      <input
                        type="text"
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                        placeholder="Введите сообщение..."
                        style={{ flex: 1, padding: '10px 14px', border: '1px solid #cbd5e1', borderRadius: '10px', fontSize: '13px', outline: 'none' }}
                        required
                      />
                      <button type="submit" style={{ background: '#74b83b', color: 'white', border: 'none', padding: '0 16px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}>
                        Отправить
                      </button>
                    </form>
                  </>
                ) : (
                  <div style={{ margin: 'auto', color: '#94a3b8', fontSize: '13px', textAlign: 'center', padding: '20px' }}>
                    👈 Выберите тренера из списка слева, чтобы начать диалог.
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

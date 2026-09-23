import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, Phone, Calendar, Shield, Bell, Check, 
  Key, Award, Activity, Clock, FileText, CreditCard, 
  ShoppingBag, AlertCircle, Loader2, Droplet
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

      </div>
    </div>
  );
}

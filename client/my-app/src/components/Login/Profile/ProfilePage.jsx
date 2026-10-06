import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, Phone, Calendar, Shield, Bell, Check, 
  Key, Award, Activity, Clock, FileText, CreditCard, 
  ShoppingBag, AlertCircle, Loader2, Droplet, MessageSquare
} from 'lucide-react';
import './ProfilePage.css';
import ChatSection from '../Chat/ChatSection'; // Импортируем отдельный компонент чата

const API_URL = 'https://localhost:7026/api';

export default function ProfilePage() {
  const navigate = useNavigate();
  
  const [user, setUser] = useState({ 
    fullName: '', 
    email: '', 
    phone: '',
    parentName: ''
  });
  
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const [subscriptions, setSubscriptions] = useState([]);
  const [loadingSubs, setLoadingSubs] = useState(true);

  // Разделение записей на предстоящие и завершённые
  const [bookings, setBookings] = useState({ upcoming: [], completed: [] });
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [bookingsError, setBookingsError] = useState(null);
  const [bookingTab, setBookingTab] = useState('upcoming'); // 'upcoming' | 'completed'

  const [activeTab, setActiveTab] = useState('info');

  const [trainers, setTrainers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

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

    fetch(`${API_URL}/trainer`, { // исправлен роут на /trainer
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) setTrainers(data);
    })
    .catch(() => {
      setTrainers([
        { id: 1, name: 'Любовь', userId: '44444444-4444-4444-4444-444444444444', photoUrl: '👩‍🏫', specialization: 'Грудничковое плавание' },
        { id: 2, name: 'Владислав', userId: '22222222-2222-2222-2222-222222222222', photoUrl: '👨‍🏫', specialization: 'Раннее обучение' },
        { id: 3, name: 'Лидия', userId: '33333333-3333-3333-3333-333333333333', photoUrl: '🏊‍♀️', specialization: 'Аквааэробика и ЛФК' }
      ]);
    });
  }, []);

  useEffect(() => {
    const fetchAllData = async () => {
      const token = localStorage.getItem('auth_token');
      const storedUser = localStorage.getItem('user');

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
        } catch (e) {}
      }

      if (!token) {
        setLoadingProfile(false);
        setLoadingSubs(false);
        setLoadingBookings(false);
        return;
      }

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
        console.error('Ошибка загрузки профиля:', err);
      } finally {
        setLoadingProfile(false);
      }

      try {
        const subsRes = await fetch(`${API_URL}/subscriptions`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (subsRes.ok) {
          const subsData = await subsRes.json();
          setSubscriptions(Array.isArray(subsData) ? subsData : []);
        }
      } catch (err) {
        console.error('Ошибка загрузки абонементов:', err);
      } finally {
        setLoadingSubs(false);
      }

      try {
        const bookingsRes = await fetch(`${API_URL}/bookings`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (bookingsRes.ok) {
          const data = await bookingsRes.json();
          setBookings({
            upcoming: data.upcoming || data.Upcoming || [],
            completed: data.completed || data.Completed || []
          });
        }
      } catch (err) {
        console.error('Ошибка загрузки записей:', err);
        setBookingsError('Не удалось загрузить записи.');
      } finally {
        setLoadingBookings(false);
      }
    };

    fetchAllData();
  }, []);

  const getShortDay = (dayStr) => {
    if (!dayStr) return '';
    const map = {
      'понедельник': 'Пн', 'вторник': 'Вт', 'среда': 'Ср',
      'четверг': 'Чт', 'пятница': 'Пт', 'суббота': 'Сб', 'воскресенье': 'Вс'
    };
    return map[dayStr.trim().toLowerCase()] || dayStr;
  };

  const activeSub = Array.isArray(subscriptions)
    ? subscriptions.find(s => s.isActive && new Date(s.expiryDate) > new Date())
    : null;

  const nextBooking = bookings.upcoming.length > 0 ? bookings.upcoming[0] : null;

  const nextBookingText = nextBooking 
    ? ` ${getShortDay(nextBooking.dayOfWeek || nextBooking.DayOfWeek) || ''} ${nextBooking.time ? nextBooking.time.split(' - ')[0] : nextBooking.Time?.split(' - ')[0] || ''}\n${nextBooking.date || ''}`.trim() 
    : 'Записей нет';

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
      if (!response.ok) throw new Error(data.message || 'Ошибка сохранения профиля');

      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2500);
    } catch (error) {
      setProfileError(error.message || 'Не удалось сохранить изменения.');
    }
  };

  const cancelBooking = async (bookingId) => {
    if (!window.confirm('Вы действительно хотите отменить эту запись на занятие?')) return;

    const token = localStorage.getItem('auth_token');
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const text = await res.text();
      let data = {};
      try { data = text ? JSON.parse(text) : {}; } catch {}

      if (!res.ok) throw new Error(data.message || 'Ошибка при отмене записи');

      alert(data.message || 'Запись успешно отменена!');

      setBookings(prev => ({
        ...prev,
        upcoming: prev.upcoming.filter(b => (b.id || b.Id) !== bookingId)
      }));

      if (data.lessonReturned) {
        setSubscriptions(prev => prev.map(sub => {
          if (sub.remainingLessons < sub.totalLessons) {
            return { ...sub, remainingLessons: sub.remainingLessons + 1 };
          }
          return sub;
        }));
      }
    } catch (err) {
      alert(err.message || 'Не удалось отменить запись.');
    }
  };

  const currentList = bookingTab === 'upcoming' ? bookings.upcoming : bookings.completed;
  const totalBookingsCount = bookings.upcoming.length + bookings.completed.length;

  // Находим ВСЕ активные абонементы, срок которых еще не истек
  const activeSubs = Array.isArray(subscriptions)
    ? subscriptions.filter(s => s.isActive && new Date(s.expiryDate) > new Date())
    : [];

// Подсчет общей статистики по всем действующим абонементам:
  const totalRemainingLessons = activeSubs.reduce((acc, s) => acc + (s.remainingLessons || 0), 0);
  const totalAllLessons = activeSubs.reduce((acc, s) => acc + (s.totalLessons || 0), 0);
  const totalAttendedLessons = totalAllLessons - totalRemainingLessons;

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

        {/* Статистика */}
        <div className="stats-cards-grid">
          {/* Карточка 1: Посещённых занятий */}
          <div className="stat-card">
            <div className="stat-icon-wrap bg-emerald-100 text-emerald-700">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="stat-number">
                {totalAttendedLessons > 0 ? totalAttendedLessons : 0}
              </div>
              <div className="stat-label">Посещённых занятий</div>
            </div>
          </div>

          {/* Карточка 2: Остаток по абонементу */}
          <div className="stat-card">
            <div className="stat-icon-wrap bg-blue-100 text-blue-700">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <div className="stat-number">
                {activeSubs.length > 0 ? `${totalRemainingLessons} из ${totalAllLessons}` : '0 из 0'}
              </div>
              <div className="stat-label">Остаток по абонементам</div>
            </div>
          </div>


          <div className="stat-card">
            <div className="stat-icon-wrap bg-purple-100 text-purple-700">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="stat-number" style={{whiteSpace: 'pre-line', fontSize: nextBooking ? '17px' : '20px' }}>
                {nextBookingText}
              </div>
              <div className="stat-label">
                {nextBooking ? (nextBooking.groupName || nextBooking.GroupName || 'Ближайшая тренировка') : 'Ближайшая тренировка'}
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
            Мои записи ({totalBookingsCount})
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

        {/* Вкладка 2: Активные абонементы */}
        {activeTab === 'subscription' && (
          <div className="profile-main-card">
            <h2 className="profile-section-title">
              <CreditCard className="w-5 h-5 text-emerald-600" /> Текущие абонементы в бассейне
            </h2>

            {loadingSubs ? (
              <div className="flex items-center gap-2 text-slate-500 py-6 justify-center">
                <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
                <span>Загрузка данных из базы...</span>
              </div>
            ) : activeSubs.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {activeSubs.map((sub) => {
                  const percentage = sub.totalLessons > 0 
                    ? Math.round((sub.remainingLessons / sub.totalLessons) * 100) 
                    : 100;

                  return (
                    <div className="subscription-box" key={sub.id}>
                      <div className="sub-header">
                        <div>
                          <h3 className="sub-title">Абонемент «{sub.title}»</h3>
                          <p className="sub-dates">
                            Действует до {new Date(sub.expiryDate).toLocaleDateString('ru-RU')}
                          </p>
                        </div>
                        <span className="sub-badge active">Активен</span>
                      </div>

                      <div className="sub-progress-bar">
                        <div 
                          className="sub-progress-fill" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>

                      <div className="sub-counter flex justify-between items-center text-sm" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Осталось <strong>{sub.remainingLessons} занятий</strong> из {sub.totalLessons}</span>
                        <span className="text-xs text-slate-400">
                          Дата покупки: {new Date(sub.purchaseDate).toLocaleDateString('ru-RU')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200" style={{ textAlign: 'center', padding: '32px' }}>
                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" style={{ margin: '0 auto 12px' }} />
                <h3 className="text-base font-bold text-slate-700 mb-1">У вас пока нет активных абонементов</h3>
                <p className="text-xs text-slate-500 mb-4" style={{ marginBottom: '16px', color: '#64748b', fontSize: '13px' }}>
                  Приобретите подходящий тариф, чтобы начать посещать занятия
                </p>
                <button onClick={() => navigate('/services')} className="btn-save-primary">
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
              <Clock className="w-5 h-5 text-emerald-600" /> Мои записи на тренировки
            </h2>

           <div className="profile-booking-tabs">
              <button
                type="button"
                className={bookingTab === 'upcoming' ? 'active' : ''}
                onClick={() => setBookingTab('upcoming')}
              >
                Записанные тренировки ({bookings.upcoming.length})
              </button>

              <button
                type="button"
                className={bookingTab === 'completed' ? 'active' : ''}
                onClick={() => setBookingTab('completed')}
              >
                Завершённые ({bookings.completed.length})
              </button>
            </div>

            {loadingBookings ? (
              <div className="flex items-center gap-2 text-slate-500 py-6 justify-center">
                <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
                <span>Загрузка списка записей...</span>
              </div>
            ) : bookingsError ? (
              <div className="text-red-500 text-center py-6">{bookingsError}</div>
            ) : currentList.length > 0 ? (
              <div className="visits-list">
                {currentList.map((booking) => {
                  const bId = booking.id || booking.Id;
                  const gName = booking.groupName || booking.GroupName;
                  const bDate = booking.date || booking.Date;
                  const bDay = booking.dayOfWeek || booking.DayOfWeek;
                  const bTime = booking.time || booking.Time;
                  const tName = booking.trainerName || booking.TrainerName;

                  return (
                    <div key={bId} className="visit-item flex justify-between items-center">
                      <div className="visit-info">
                        <span className="visit-date">{gName}</span>
                        <span className="visit-coach">
                          📅 {bDate}, {bDay}, {bTime} | Инструктор: {tName}
                        </span>
                      </div>

                      {bookingTab === 'upcoming' && (
                        <button 
                          type="button"
                          onClick={() => cancelBooking(bId)}
                          className="btn-cancel-booking"
                        >
                          Отменить запись
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500 text-sm">
                {bookingTab === 'upcoming' 
                  ? 'У вас пока нет активных записей на занятия. Вы можете записаться на странице «Расписание».'
                  : 'Завершённых тренировок пока нет.'}
              </div>
            )}
          </div>
        )}

        {/* Вкладка 4: История покупок */}
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

        {/* Вкладка 5: Отдельный выделенный чат */}
        {activeTab === 'chat' && (
          <ChatSection trainers={trainers} currentUserId={currentUserId} />
        )}

      </div>
    </div>
  );
}

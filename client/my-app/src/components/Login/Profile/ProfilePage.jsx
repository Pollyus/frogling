import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, Phone, Calendar, Shield, Bell, Check, 
  Key, Award, Activity, Clock, FileText, CreditCard, 
  Droplet, ShoppingBag, AlertCircle, Loader2
} from 'lucide-react';
import './ProfilePage.css';

const API_URL = 'https://localhost:7123/api';

export default function ProfilePage() {
  const navigate = useNavigate();
  
  // Данные профиля
  const [user, setUser] = useState({ 
    fullName: '', 
    email: '', 
    phone: '+7 (999) 000-00-00',
    parentName: 'Алексей Иванов'
  });
  
  // Состояния абонементов из базы данных
  const [subscriptions, setSubscriptions] = useState([]);
  const [loadingSubs, setLoadingSubs] = useState(true);
  const [activeTab, setActiveTab] = useState('info'); // info | subscription | history
  const [isSaved, setIsSaved] = useState(false);

  // Загрузка данных пользователя и его абонементов из SQL Server
  useEffect(() => {
    const fetchUserDataAndSubs = async () => {
      const token = localStorage.getItem('auth_token');
      const storedUser = localStorage.getItem('user');

      // 1. Извлекаем локальные данные пользователя
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          setUser(prev => ({
            ...prev,
            fullName: parsed.fullName || 'Алексей',
            email: parsed.email || 'user@example.com'
          }));
        } catch (e) {
          setUser(prev => ({ ...prev, email: storedUser }));
        }
      }

      // 2. Если пользователь не залогинен, не делаем запрос к API
      if (!token) {
        setSubscriptions([]);
        setLoadingSubs(false);
        return;
      }

      // 3. Запрос к бэкенду C# для получения покупок из таблицы Subscriptions
      try {
        const res = await fetch(`${API_URL}/subscriptions`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (res.ok) {
          const data = await res.json();
          // ВАЖНО: проверка на массив для исключения ошибки .find()
          if (Array.isArray(data)) {
            setSubscriptions(data);
          } else {
            setSubscriptions([]);
          }
        } else {
          console.warn('Сервер вернул статус:', res.status);
          setSubscriptions([]);
        }
      } catch (err) {
        console.error('Ошибка сети при загрузке абонементов:', err);
        setSubscriptions([]);
      } finally {
        setLoadingSubs(false);
      }
    };

    fetchUserDataAndSubs();
  }, []);

  // Безопасный поиск активного абонемента с проверкой на массив
  const activeSub = Array.isArray(subscriptions)
    ? subscriptions.find(s => s.isActive && new Date(s.expiryDate) > new Date())
    : null;

  // Сохранение изменений в профиле
  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify(user));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
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
              <h1 className="user-hero-name">{user.fullName}</h1>
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
              <div className="stat-number">
                {activeSub ? 'Ср, 16:30' : 'Занятий нет'}
              </div>
              <div className="stat-label">Ближайшая тренировка</div>
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
            className={`profile-tab-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            История покупок ({Array.isArray(subscriptions) ? subscriptions.length : 0})
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

            <form onSubmit={handleSave} className="profile-form-grid">
              <div className="form-field">
                <label>ФИО ребёнка / ученика</label>
                <div className="field-input-wrap">
                  <User className="field-icon" />
                  <input
                    type="text"
                    value={user.fullName}
                    onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                    placeholder="Имя Фамилия"
                  />
                </div>
              </div>

              <div className="form-field">
                <label>Электронная почта</label>
                <div className="field-input-wrap">
                  <Mail className="field-icon" />
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="form-field">
                <label>Контактный телефон</label>
                <div className="field-input-wrap">
                  <Phone className="field-icon" />
                  <input
                    type="text"
                    value={user.phone}
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
                    value={user.parentName}
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

        {/* Вкладка 3: История покупок из БД SQL Server */}
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

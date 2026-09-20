import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, Phone, Calendar, Shield, Bell, Check, 
  Key, Award, Activity, Clock, FileText, ChevronRight, 
  CreditCard, Droplet
} from 'lucide-react';
import './ProfilePage.css';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ 
    fullName: '', 
    email: '', 
    phone: '+7 (999) 000-00-00',
    birthDate: '2018-05-14',
    parentName: 'Алексей Иванов'
  });
  
  const [activeTab, setActiveTab] = useState('info'); // info | visits | subscription
  const [isSaved, setIsSaved] = useState(false);

  // Загружаем данные пользователя
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
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
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify(user));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="profile-container-light">
      <div className="profile-wrapper">
        
        {/* Верхняя карточка юзера */}
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

        {/* Быстрые карточки для бассейна "Лягушонок" */}
        <div className="stats-cards-grid">
          <div className="stat-card">
            <div className="stat-icon-wrap bg-emerald-100 text-emerald-700">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="stat-number">12</div>
              <div className="stat-label">Посещённых занятий</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap bg-blue-100 text-blue-700">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <div className="stat-number">4 из 8</div>
              <div className="stat-label">Остаток абонемента</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap bg-purple-100 text-purple-700">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="stat-number">Ср, 16:30</div>
              <div className="stat-label">Ближайшее занятие</div>
            </div>
          </div>
        </div>

        {/* Табы разделов */}
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
            className={`profile-tab-btn ${activeTab === 'visits' ? 'active' : ''}`}
            onClick={() => setActiveTab('visits')}
          >
            История посещений
          </button>
        </div>

        {/* Контент активного таба */}
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

        {activeTab === 'subscription' && (
          <div className="profile-main-card">
            <h2 className="profile-section-title">
              <CreditCard className="w-5 h-5 text-emerald-600" /> Текущий абонемент
            </h2>
            <div className="subscription-box">
              <div className="sub-header">
                <div>
                  <h3 className="sub-title">Абонемент «Юный пловец» (8 занятий)</h3>
                  <p className="sub-dates">Действует до 30 октября 2026</p>
                </div>
                <span className="sub-badge active">Активен</span>
              </div>
              <div className="sub-progress-bar">
                <div className="sub-progress-fill" style={{ width: '50%' }}></div>
              </div>
              <div className="sub-counter">
                Осталось <strong>4 занятия</strong> из 8
              </div>
            </div>
          </div>
        )}

        {activeTab === 'visits' && (
          <div className="profile-main-card">
            <h2 className="profile-section-title">
              <Clock className="w-5 h-5 text-emerald-600" /> Журнал тренировок
            </h2>
            <div className="visits-list">
              <div className="visit-item">
                <div className="visit-info">
                  <span className="visit-date">18 сентября 2026, 16:30</span>
                  <span className="visit-coach">Инструктор: Любовь</span>
                </div>
                <span className="visit-status done">Посещено</span>
              </div>
              <div className="visit-item">
                <div className="visit-info">
                  <span className="visit-date">15 сентября 2026, 16:30</span>
                  <span className="visit-coach">Инструктор: Любовь</span>
                </div>
                <span className="visit-status done">Посещено</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

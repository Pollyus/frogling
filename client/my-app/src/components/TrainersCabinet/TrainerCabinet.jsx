import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Users, MessageSquare, Send, X, Loader2, User, Award, BookOpen, Trophy, Save, Check } from 'lucide-react';
import './TrainerCabinet.css';

const API_URL = 'https://localhost:7026/api';

export default function TrainerCabinet() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('schedule'); // 'schedule' | 'profile'

  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  // Данные профиля тренера
  const [profile, setProfile] = useState({
    name: '',
    specialization: '',
    experience: '',
    education: '',
    certificates: '',
    sportsСareer: '',
    sportsСategory: '',
    photoUrl: '👩‍🏫'
  });
  const [savingProfile, setSavingProfile] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Состояния для чата
  const [activeChatUser, setActiveChatUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userStr = localStorage.getItem('user');

    if (!token || !userStr) {
      navigate('/login');
      return;
    }

    try {
      const u = JSON.parse(userStr);
      setCurrentUserId(u.id || u.Id);
      if (u.role !== 'Trainer' && u.Role !== 'Trainer') {
        alert('Доступ разрешен только тренерам.');
        navigate('/');
        return;
      }
    } catch (e) {
      navigate('/login');
      return;
    }

    // Загрузка расписания
    fetch(`${API_URL}/trainer/schedule`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setSchedule(data);
      })
      .catch(console.error);

    // Загрузка профиля тренера
    fetch(`${API_URL}/trainer/profile`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.name) setProfile(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [navigate]);

  // Загрузка сообщений чата
  useEffect(() => {
    if (!activeChatUser) return;
    const token = localStorage.getItem('auth_token');

    const fetchMessages = () => {
      fetch(`${API_URL}/chat/history/${activeChatUser.parentUserId}`, {
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
  }, [activeChatUser]);

  // Отправка сообщения
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChatUser) return;
    const token = localStorage.getItem('auth_token');

    try {
      const res = await fetch(`${API_URL}/chat/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          receiverId: activeChatUser.parentUserId,
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

  // Сохранение изменений профиля тренера
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    const token = localStorage.getItem('auth_token');

    try {
      const res = await fetch(`${API_URL}/trainer/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: profile.name,
          specialization: profile.specialization,
          experience: profile.experience,
          education: profile.education,
          certificates: profile.certificates,
          sportsCareer: profile.sportsСareer || profile.sportsCareer,
          sportsCategory: profile.sportsСategory || profile.sportsCategory,
          photoUrl: profile.photoUrl
        })
      });

      if (res.ok) {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2500);
      } else {
        alert('Ошибка при сохранении профиля');
      }
    } catch (err) {
      alert('Не удалось связаться с сервером');
    } finally {
      setSavingProfile(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="trainer-cabinet-container">
      <div className="cabinet-header">
        <h1>Кабинет инструктора «{profile.name || 'Тренер'}»</h1>
        <p>Управление расписанием группы, переписка с родителями и личная анкета</p>
      </div>

      {/* Навигационные табы */}
      <div className="trainer-tabs-nav">
        <button
          type="button"
          className={`trainer-tab-btn ${activeTab === 'schedule' ? 'active' : ''}`}
          onClick={() => setActiveTab('schedule')}
        >
          <Calendar className="w-4 h-4" /> Группы и ученики ({schedule.length})
        </button>

        <button
          type="button"
          className={`trainer-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <User className="w-4 h-4" /> Мой профиль / Резюме
        </button>
      </div>

      {/* Вкладка 1: Расписание групп и ученики */}
      {activeTab === 'schedule' && (
        <div className="trainer-schedule-grid">
          {schedule.length > 0 ? (
            schedule.map(group => {
              const date = new Date(group.startAt);
              const dateStr = date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', weekday: 'short' });
              const timeStr = `${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(group.endAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

              return (
                <div key={group.id} className="trainer-group-card">
                  <div className="group-card-top">
                    <span className="date-badge"><Calendar className="w-4 h-4" /> {dateStr}</span>
                    <span className="time-badge"><Clock className="w-4 h-4" /> {timeStr}</span>
                  </div>
                  <h2 className="group-title-text">{group.groupName}</h2>
                  <div className="slots-info-text"><Users className="w-4 h-4" /> Доступно мест: {group.availableSlots}</div>

                  <div className="students-list-container">
                    <h4>Записанные ученики ({group.students.length}):</h4>
                    {group.students.length > 0 ? (
                      <div className="students-scroll">
                        {group.students.map(st => (
                          <div key={st.bookingId} className="student-item-row">
                            <div>
                              <div className="student-name">{st.studentName}</div>
                              <div className="parent-meta">Родитель: {st.parentName || 'Не указан'} ({st.parentPhone || 'нет телефона'})</div>
                            </div>
                            <button
                              type="button"
                              onClick={() => setActiveChatUser(st)}
                              className="btn-chat-open"
                              title="Написать родителю"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="no-students">На это занятие пока никто не записался.</p>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-schedule-box">
              У вас пока нет запланированных групп в расписании.
            </div>
          )}
        </div>
      )}

      {/* Вкладка 2: Редактирование профиля тренера */}
      {activeTab === 'profile' && (
        <div className="trainer-profile-card">
          <h2 className="profile-section-title">
            <User className="w-5 h-5 text-emerald-600" /> Личные данные и профессиональное резюме
          </h2>

          {isSaved && (
            <div className="alert-saved">
              <Check className="w-5 h-5" /> Изменения анкеты успешно сохранены!
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="trainer-form-grid">
            <div className="form-field-trainer">
              <label>Имя и Отчество</label>

              <input
                type="text"
                value={profile.name || ''}
                onChange={e => setProfile({ ...profile, name: e.target.value })}
                placeholder="Имя Отчество"
                required
              />
            </div>

            <div className="form-field-trainer">
              <label>Иконка / Аватар (эмодзи)</label>
              <input
                type="text"
                value={profile.photoUrl || ''}
                onChange={e => setProfile({ ...profile, photoUrl: e.target.value })}
                placeholder="👩‍🏫 или 👨‍🏫"
              />
            </div>

            <div className="form-field-trainer">
              <label>Специализация</label>
              <input
                type="text"
                value={profile.specialization || ''}
                onChange={e => setProfile({ ...profile, specialization: e.target.value })}
                placeholder="Например: Специалист по грудничковому плаванию"
              />
            </div>

            <div className="form-field-trainer">
              <label>Опыт работы</label>
              <input
                type="text"
                value={profile.experience || ''}
                onChange={e => setProfile({ ...profile, experience: e.target.value })}
                placeholder="Например: 3 года"
              />
            </div>

            <div className="form-field-trainer full-width">
              <label>Образование</label>
              <input
                type="text"
                value={profile.education || ''}
                onChange={e => setProfile({ ...profile, education: e.target.value })}
                placeholder="ВУЗ, специальность"
              />
            </div>

            <div className="form-field-trainer full-width">
              <label>Спортивный разряд / Звание</label>
              <input
                type="text"
                value={profile.sportsСategory || profile.sportsCategory || ''}
                onChange={e => setProfile({ ...profile, sportsСategory: e.target.value })}
                placeholder="Например: Мастер спорта по плаванию"
              />
            </div>

            <div className="form-field-trainer full-width">
              <label>Спортивная карьера</label>
              <textarea
                rows="2"
                value={profile.sportsСareer || profile.sportsCareer || ''}
                onChange={e => setProfile({ ...profile, sportsСareer: e.target.value })}
                placeholder="Достижения, участие в соревнованиях"
              />
            </div>

            <div className="form-field-trainer full-width">
              <label>Сертификаты и дипломы</label>
              <textarea
                rows="2"
                value={profile.certificates || ''}
                onChange={e => setProfile({ ...profile, certificates: e.target.value })}
                placeholder="Курсы квалификации, сертификаты грудничкового плавания"
              />
            </div>

            <div className="form-actions-trainer">
              <button type="submit" className="btn-save-trainer" disabled={savingProfile}>
                <Save className="w-4 h-4" /> {savingProfile ? 'Сохранение...' : 'Сохранить анкету'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Модальное окно чата */}
      {activeChatUser && (
        <div className="modal-admin-overlay" onClick={() => setActiveChatUser(null)}>
          <div className="chat-modal-card" onClick={e => e.stopPropagation()}>
            <div className="chat-header">
              <div>
                <h3>Чат с родителем</h3>
                <p>{activeChatUser.parentName} (ученик: {activeChatUser.studentName})</p>
              </div>
              <button className="btn-close-chat" onClick={() => setActiveChatUser(null)}><X /></button>
            </div>

            <div className="chat-messages-area">
              {messages.map(m => {
                const isMy = m.senderId === currentUserId;
                return (
                  <div key={m.id} className={`chat-bubble-row ${isMy ? 'my' : 'other'}`}>
                    <div className="chat-bubble">
                      <p>{m.text}</p>
                      <span className="chat-time">{new Date(m.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <form onSubmit={handleSendMessage} className="chat-input-row">
              <input
                type="text"
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                placeholder="Напишите сообщение..."
                required
              />
              <button type="submit" className="btn-send-message"><Send className="w-4 h-4" /></button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
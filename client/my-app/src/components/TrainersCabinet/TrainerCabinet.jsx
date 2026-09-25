import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Users, MessageSquare, Send, X, Loader2 } from 'lucide-react';
import './TrainerCabinet.css';

const API_URL = 'https://localhost:7026/api';

export default function TrainerCabinet() {
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Состояния для чата
  const [activeChatUser, setActiveChatUser] = useState(null); // Родитель, с кем открыт чат
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

    // Загрузка расписания тренера
    fetch(`${API_URL}/trainer/schedule`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then(data => {
      setSchedule(data);
      setLoading(false);
    })
    .catch(() => {
      alert('Ошибка при загрузке кабинета тренера');
      navigate('/');
    });
  }, [navigate]);

  // Загрузка сообщений при открытии чата
  useEffect(() => {
    if (!activeChatUser) return;
    const token = localStorage.getItem('auth_token');

    const fetchMessages = () => {
      fetch(`${API_URL}/chat/history/${activeChatUser.parentUserId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => setMessages(data));
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 3000); // Опрос чата каждые 3 сек
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
        <h1>Кабинет инструктора</h1>
        <p>Ваше расписание занятий и списки групп учеников</p>
      </div>

      <div className="trainer-schedule-grid">
        {schedule.map(group => {
          const date = new Date(group.startAt);
          const dateStr = date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', weekday: 'short' });
          const timeStr = `${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - ${new Date(group.endAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;

          return (
            <div key={group.id} className="trainer-group-card">
              <div className="group-card-top">
                <span className="date-badge"><Calendar className="w-4 h-4" /> {dateStr}</span>
                <span className="time-badge"><Clock className="w-4 h-4" /> {timeStr}</span>
              </div>
              <h2 className="group-title-text">{group.groupName}</h2>
              <div className="slots-info-text"><Users className="w-4 h-4" /> Доступно мест: {group.availableSlots}</div>

              {/* Список записанных детей */}
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
        })}
      </div>

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
                      <span className="chat-time">{new Date(m.sentAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
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

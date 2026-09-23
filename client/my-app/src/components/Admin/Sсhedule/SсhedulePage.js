import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Users, MapPin, Loader2, CheckCircle } from 'lucide-react';
import './SchedulePage.css';

const DAYS = ['Все', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

export default function SchedulePage() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState('Все');
  const [bookedItem, setBookedItem] = useState(null);

  useEffect(() => {
    fetch('https://localhost:7026/api/schedule')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setSchedule(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Ошибка загрузки расписания:', err);
        setLoading(false);
      });
  }, []);

  const filteredSchedule = selectedDay === 'Все' 
    ? schedule 
    : schedule.filter(item => item.dayOfWeek === selectedDay);

  const handleBooking = async (item) => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      alert('Пожалуйста, войдите в систему, чтобы записаться на занятие.');
      navigate('/login');
      return;
    }
    try {
      const response = await fetch(`https://localhost:7026/api/bookings/${item.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Ошибка при записи');
      }

      alert(data.message);
       // Обновляем количество свободных мест в стейте без перезагрузки страницы
      setSchedule(prev => prev.map(s => 
        s.id === item.id ? { ...s, availableSlots: data.remainingSlots } : s
      ));

      } catch (err) {
        alert(err.message || 'Не удалось записаться на занятие.');
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
    <div className="schedule-container">
      <div className="schedule-header">
        <h1>Расписание занятий бассейна «Лягушонок»</h1>
        <p>Выберите удобный день и запишитесь на тренировку к нашим лучшим тренерам</p>
      </div>

      {/* Фильтры по дням недели */}
      <div className="days-filter-bar">
        {DAYS.map(day => (
          <button
            key={day}
            className={`day-btn ${selectedDay === day ? 'active' : ''}`}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Список занятий */}
      <div className="schedule-grid">
        {filteredSchedule.length > 0 ? (
          filteredSchedule.map(item => (
            <div key={item.id} className="schedule-card">
              <div className="schedule-card-top">
                <span className="day-pill"><Calendar className="w-3.5 h-3.5" /> 
                  {new Date(item.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })},
                   {item.dayOfWeek}</span>
                <span className="time-pill"><Clock className="w-3.5 h-3.5" /> {item.time}</span>
              </div>

              <h3 className="group-title">{item.groupName}</h3>

              <div className="trainer-row">
                <div className="trainer-avatar-mini">{item.trainerPhoto}</div>
                <div>
                  <div className="trainer-name-text">{item.trainerName}</div>
                  <div className="trainer-spec-text">{item.trainerSpecialization}</div>
                </div>
              </div>

              <div className="schedule-card-footer">
                <span className="slots-info">
                  <Users className="w-4 h-4 text-emerald-600" /> Свободно мест: <strong>{item.availableSlots}</strong>
                </span>
                <button 
                  onClick={() => handleBooking(item)}
                  className="btn-book-slot"
                >
                  Записаться
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-schedule">
            <p>В выбранный день занятий нет. Выберите другой день недели.</p>
          </div>
        )}
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Users, MapPin, Loader2, CheckCircle } from 'lucide-react';
import './SchedulePage.css';

const DAYS = [
  'Все',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье'
];

export default function SchedulePage() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState('Все');
  const [bookedItem, setBookedItem] = useState(null);
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState('');

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

  useEffect(() => {
    fetch('https://localhost:7026/api/trainer')
      .then(trainers => trainers.json())
      .then(t_info => {
        if (Array.isArray(t_info)) setTrainers(t_info);
        setLoading(false);
      })
      .catch(err => {
        console.error('Ошибка загрузки расписания:', err);
        setLoading(false);
      });
  }, []);

  // Обработчик изменения выбора
  const handleTrainerChange = (event) => {
    setSelectedTrainer(event.target.value); 
  };

  const filteredSchedule = schedule.filter(item => {
    const dayMatch =
      selectedDay === 'Все' ||
      item.dayOfWeek.toLowerCase() === selectedDay.toLowerCase();

    // selectedTrainer хранит имя тренера (значение <option>)
    const trainerMatch =
      !selectedTrainer || item.trainerName === selectedTrainer;

    return dayMatch && trainerMatch;
  });

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
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
         body: JSON.stringify({
          scheduledAt: item.startAt
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Ошибка при записи');
      }

      alert(data.message);
       // Обновляем количество свободных мест в стейте без перезагрузки страницы
      setSchedule(prev =>
        prev.map(scheduleItem =>
          scheduleItem.id === item.id
            ? {
                ...scheduleItem,
                availableSlots: data.remainingSlots
              }
            : scheduleItem
        )
      );

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
            type="button"
            className={`day-btn ${selectedDay === day ? 'active' : ''}`}
            onClick={() => setSelectedDay(day)}
          >
            {day === 'Все'
              ? 'Все дни'
              : day.charAt(0).toUpperCase() + day.slice(1)}
          </button>
        ))}
      </div>

      {/* Фильтры по тренерам */}
      <select className = "select-bar" value={selectedTrainer} onChange={handleTrainerChange}>
        <option value=''>Все тренеры</option>
        {trainers.map (t => (
          <option key={t.Id} value={t.name}>{t.photoUrl}{t.name}</option>
        ))}
          
      </select>

      {/* Список занятий */}
      <div className="schedule-grid">
        {filteredSchedule.length > 0 ? (
          filteredSchedule.map(item => (
            <div key={item.id} className="schedule-card">
              <div className="schedule-card-top">
                <span className="day-pill">
                  <Calendar className="w-3.5 h-3.5" /> 
                  {getShortDay(item.dayOfWeek)}, 
                  {new Date(item.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
                </span>
                <span className="time-pill">
                  <Clock className="w-3.5 h-3.5" />
                  {item.startTime} – {item.endTime}
                </span>
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
                  type="button"
                  onClick={() => handleBooking(item)}
                  disabled={item.availableSlots <= 0} // <--- Блокируем, если 0 или меньше
                  className={`btn-book-slot ${item.availableSlots <= 0 ? 'disabled' : ''}`}
                >
                  {item.availableSlots > 0 ? 'Записаться' : 'Мест нет'}
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
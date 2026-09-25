import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Users, MapPin, Loader2, CheckCircle, Edit, X } from 'lucide-react';
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
const API_URL = 'https://localhost:7026/api';

export default function SchedulePage() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState('Все');
  const [selectedDate, setSelectedDate] = useState('');
  const [bookedItem, setBookedItem] = useState(null);
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState('');

  // Состояние для редактирования занятия
  const [editingItem, setEditingItem] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Проверяем, админ ли текущий пользователь
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setIsAdmin(user.role === 'Admin' || user.Role === 'Admin');
      } catch (e) {}
    }
  }, []);

  const formatDateTimeForInput = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr.slice(0, 16);

  const pad = (n) => String(n).padStart(2, '0');
  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

  const handleDateChange = (e) => {
    const dateValue = e.target.value;
    setSelectedDate(dateValue);
    
    if (dateValue) {
      // Если выбрана дата, сбрасываем фильтр "Дни недели", 
      // так как календарь более специфичен
      setSelectedDay('');
      
      // Опционально: можно вычислить день недели из даты, 
      // если в твоем расписании только названия дней (Пн, Вт)
      /*
      const date = new Date(dateValue);
      const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
      setSelectedDay(days[date.getDay()]);
      */
    }
  };

  // Загрузка расписания и списка тренеров
  const fetchData = async () => {
    try {
      const resSchedule = await fetch(`${API_URL}/schedule`);
      const scheduleData = await resSchedule.json();
      if (Array.isArray(scheduleData)) setSchedule(scheduleData);

      // Загружаем список тренеров (если у вас есть такой эндпоинт, либо создадим список вручную)
      // Для примера зафиксируем список или подтянем с бэкенда:
      
      setTrainers([
        { id: 1, name: 'Любовь' },
        { id: 2, name: 'Владислав' },
        { id: 3, name: 'Лидия' }
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Сохранение изменений занятия (Админ)
  const handleSaveSchedule = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('auth_token');

    try {
      const res = await fetch(`${API_URL}/admin/schedule/${editingItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          groupName: editingItem.groupName,
          startAt: editingItem.startAt,
          durationMinutes: parseInt(editingItem.durationMinutes) || 45,
          trainerId: parseInt(editingItem.trainerId),
          availableSlots: parseInt(editingItem.availableSlots) || 6
        })
      });

      if (!res.ok) throw new Error('Не удалось обновить расписание');

      alert('Расписание успешно обновлено!');
      setEditingItem(null);
      fetchData(); // Перезагружаем расписание
    } catch (err) {
      alert(err.message);
    }
  };

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
    // 1. Фильтр по тренеру
    const matchesTrainer = !selectedTrainer || item.trainerName === selectedTrainer;

    // 2. Фильтр по времени (Дата или День недели)
    let matchesTime = true;

    if (selectedDate) {
      // Если выбрана дата в календаре (в формате YYYY-MM-DD), сравниваем по дате
      // Преобразуем item.date к формату YYYY-MM-DD для точного сравнения
      const itemDateOnly = item.date ? item.date.split('T')[0] : '';
      matchesTime = itemDateOnly === selectedDate;
    } else if (selectedDay && selectedDay !== 'Все') {
      // Если выбран конкретный день недели (и это не "Все")
      // Приводим к нижнему регистру для надежного сравнения (например, "понедельник" === "Понедельник")
      const itemDayLower = (item.dayOfWeek || item.day || '').trim().toLowerCase();
      const selectedDayLower = selectedDay.trim().toLowerCase();
      matchesTime = itemDayLower === selectedDayLower;
    }
    // Если selectedDay === 'Все' и нет selectedDate, matchesTime остается true (показывает всё)

    return matchesTrainer && matchesTime;
  });

  // 1. Сначала фильтруем расписание только по выбранному тренеру
  const scheduleForTrainer = schedule.filter(item => {
    return !selectedTrainer || item.trainerName === selectedTrainer;
  });

  // 2. Получаем список дней недели, в которые у этого тренера есть занятия
  const activeDaysWithClasses = scheduleForTrainer.map(item => 
    (item.dayOfWeek || item.day || '').trim().toLowerCase()
  );
  


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
      <div className="filters-container">
        {/* Верхняя строка: Календарь + Дни недели */}
        <div className="days-filter-bar">
          {/* Обертка для календаря и кнопки очистки */}
          {/* Календарный фильтр */}
          <div className="date-input-wrapper">
              <input 
                  type="date" 
                  className="calendar-input"
                  value={selectedDate}
                  onChange={handleDateChange}
              />
              {selectedDate && (
                  <button className="clear-date" onClick={() => setSelectedDate('')} title="Сбросить дату">✕</button>
              )}
          </div>

          {/* Фильтры по дням недели */}
          <div className="days-filter-bar">
            {DAYS.map(day => {
              
              const dayLower = day.toLowerCase();
              const hasClasses = day === 'Все' || activeDaysWithClasses.includes(dayLower);

              return (
                <button
                  key={day}
                  type="button"
                  className={`day-btn ${selectedDay === day ? 'active' : ''} ${!hasClasses && day !== 'Все' ? 'opacity-50' : ''}`}
                  onClick={() => { setSelectedDay(day); setSelectedDate(''); }}
                >
                  {day === 'Все' ? 'Все дни' : day}
                  {/* Зеленая точка-индикатор наличия занятий */}
                  {hasClasses && day !== 'Все' && <span className="class-indicator-dot"></span>}
                </button>
              );
            })}
          </div>

          {/* Фильтры по тренерам */}
          <select className = "select-bar" value={selectedTrainer} onChange={(e) => setSelectedTrainer(e.target.value)}>
            <option value=''>Все тренеры</option>
            {trainers.map (t => (
              <option key={t.Id} value={t.name}>{t.photoUrl}{t.name}</option>
            ))}
          
          </select>
        </div>
      </div>

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

                <div className="flex gap-2">
                  {/* Кнопка Редактировать для Админа */}
                  {isAdmin && (
                    <button 
                      type="button"
                      onClick={() => setEditingItem({
                        ...item,
                        startAt: formatDateTimeForInput(item.startAt || item.date)
                      })}
                      className="btn-edit-slot bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer border-0"
                    >
                      <Edit className="w-3.5 h-3.5" /> Изменить
                    </button>
                  )}
                
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
            </div>
          ))
        ) : (
          <div className="no-schedule">
            <p>В выбранный день занятий нет. Выберите другой день недели.</p>
          </div>
        )}
      </div>
      {/* Модальное окно редактирования расписания для Админа */}
        {editingItem && (
          <div className="modal-admin-overlay" onClick={() => setEditingItem(null)}>
            <div className="modal-admin-card" onClick={e => e.stopPropagation()}>
              <button className="absolute top-6 right-6 text-slate-400 bg-transparent border-0 cursor-pointer" onClick={() => setEditingItem(null)}>
                <X className="w-5 h-5" />
              </button>
              <h2>Редактирование занятия</h2>
              
              <form onSubmit={handleSaveSchedule}>
                <div className="form-group-admin">
                  <label>Название группы / занятия</label>
                  <input 
                    type="text" 
                    value={editingItem.groupName || ''} 
                    onChange={e => setEditingItem({ ...editingItem, groupName: e.target.value })}
                    required 
                  />
                </div>

                <div className="form-group-admin">
                  <label>Дата и время начала</label>
                  <input 
                    type="datetime-local" 
                    value={editingItem.startAt || ''} 
                    onChange={e => setEditingItem({ ...editingItem, startAt: e.target.value })}
                    required 
                  />
                </div>

                <div className="form-group-admin">
                  <label>Длительность (минут)</label>
                  <input 
                    type="number" 
                    value={editingItem.durationMinutes || 45} 
                    onChange={e => setEditingItem({ ...editingItem, durationMinutes: e.target.value })}
                    required 
                  />
                </div>

                <div className="form-group-admin">
                  <label>Тренер</label>
                  <select 
                    value={editingItem.trainerId || 1} 
                    onChange={e => setEditingItem({ ...editingItem, trainerId: e.target.value })}
                    className="w-full p-3 border border-slate-300 rounded-xl bg-white"
                  >
                    {trainers.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group-admin">
                  <label>Всего мест (свободных)</label>
                  <input 
                    type="number" 
                    value={editingItem.availableSlots || 6} 
                    onChange={e => setEditingItem({ ...editingItem, availableSlots: e.target.value })}
                    required 
                  />
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn-cancel-admin" onClick={() => setEditingItem(null)}>Отмена</button>
                  <button type="submit" className="btn-save-admin">Сохранить</button>
                </div>
              </form>
            </div>
          </div>
        )}

    </div>
  );
}
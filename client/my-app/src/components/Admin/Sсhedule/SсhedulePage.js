import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Users, MapPin, Loader2, CheckCircle, Edit, X, Trash2, Plus } from 'lucide-react';
import './SchedulePage.css';
import ScheduleDetailsModal from './ModalWindows/ScheduleDetailsModal';
import ScheduleEditModal from './ModalWindows/ScheduleEditModal';
import ScheduleAddModal from './ModalWindows/ScheduleAddModal';

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
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState('');
  const [viewingDetailsId, setViewingDetailsId] = useState(null);

  // Состояния для редактирования и создания занятия
  const [editingItem, setEditingItem] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newItem, setNewItem] = useState({
    groupName: '',
    startAt: '',
    durationMinutes: 45,
    trainerId: 1,
    availableSlots: 6
  });

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setIsAdmin(user.role === 'Admin' || user.Role === 'Admin');
      } catch (e) {}
    }
  }, []);

  // Загрузка расписания и тренеров
  const fetchData = async () => {
    try {
      const resSchedule = await fetch(`${API_URL}/schedule`);
      const scheduleData = await resSchedule.json();
      if (Array.isArray(scheduleData)) setSchedule(scheduleData);

      const resTrainers = await fetch(`${API_URL}/trainer`);
      const trainersData = await resTrainers.json();
      if (Array.isArray(trainersData)) {
        setTrainers(trainersData);
      } else {
        setTrainers([
          { id: 1, name: 'Любовь' },
          { id: 2, name: 'Владислав' },
          { id: 3, name: 'Лидия' }
        ]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDateTimeForInput = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr.slice(0, 16);

    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const handleDateChange = (e) => {
    const dateValue = e.target.value;
    setSelectedDate(dateValue);
    if (dateValue) setSelectedDay('');
  };

  // Удаление занятия (Админ)
  const handleDeleteSchedule = async (id) => {
    if (!window.confirm('Вы действительно хотите удалить это занятие из расписания?')) return;
    const token = localStorage.getItem('auth_token');

    try {
      const res = await fetch(`${API_URL}/admin/schedule/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || 'Не удалось удалить занятие');
      }

      alert(data.message || 'Занятие успешно удалено!');
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  // Сохранение изменений занятия
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
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  // Создание нового занятия
  const handleCreateSchedule = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('auth_token');

    try {
      const res = await fetch(`${API_URL}/admin/schedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          groupName: newItem.groupName,
          startAt: newItem.startAt,
          durationMinutes: parseInt(newItem.durationMinutes) || 45,
          trainerId: parseInt(newItem.trainerId) || 1,
          availableSlots: parseInt(newItem.availableSlots) || 6
        })
      });

      if (!res.ok) throw new Error('Не удалось создать занятие');

      alert('Занятие успешно создано!');
      setIsCreating(false);
      setNewItem({ groupName: '', startAt: '', durationMinutes: 45, trainerId: 1, availableSlots: 6 });
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleBooking = async (item) => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      alert('Пожалуйста, войдите в систему, чтобы записаться на занятие.');
      return;
    }
    try {
      const response = await fetch(`${API_URL}/bookings/${item.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ scheduledAt: item.startAt })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Ошибка при записи');

      alert(data.message);
      setSchedule(prev =>
        prev.map(scheduleItem =>
          scheduleItem.id === item.id ? { ...scheduleItem, availableSlots: data.remainingSlots } : scheduleItem
        )
      );
    } catch (err) {
      alert(err.message || 'Не удалось записаться на занятие.');
    }
  };

  const getShortDay = (dayStr) => {
    if (!dayStr) return '';
    const map = {
      'понедельник': 'Пн', 'вторник': 'Вт', 'среда': 'Ср',
      'четверг': 'Чт', 'пятница': 'Пт', 'суббота': 'Сб', 'воскресенье': 'Вс'
    };
    return map[dayStr.trim().toLowerCase()] || dayStr;
  };

  const filteredSchedule = schedule.filter(item => {
    const matchesTrainer = !selectedTrainer || item.trainerName === selectedTrainer;
    let matchesTime = true;

    if (selectedDate) {
      matchesTime = (item.date ? item.date.split('T')[0] : '') === selectedDate;
    } else if (selectedDay && selectedDay !== 'Все') {
      matchesTime = (item.dayOfWeek || item.day || '').trim().toLowerCase() === selectedDay.trim().toLowerCase();
    }
    return matchesTrainer && matchesTime;
  });

  const scheduleForTrainer = schedule.filter(item => !selectedTrainer || item.trainerName === selectedTrainer);
  const activeDaysWithClasses = scheduleForTrainer.map(item => (item.dayOfWeek || item.day || '').trim().toLowerCase());

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="schedule-container">
      <h1>Расписание занятий</h1>

      {/* Фильтры */}
      <div className="filters-container">
        <div className="days-filter-bar">
          <div className="date-input-wrapper">
            <input 
              type="date" 
              className="calendar-input"
              value={selectedDate}
              onChange={handleDateChange}
            />
            {selectedDate && (
              <button className="clear-date-btn" onClick={() => setSelectedDate('')} title="Сбросить дату">✕</button>
            )}
          </div>

          {DAYS.map(day => {
            const hasClasses = day === 'Все' || activeDaysWithClasses.includes(day.toLowerCase());
            return (
              <button
                key={day}
                type="button"
                className={`day-btn ${selectedDay === day ? 'active' : ''} ${!hasClasses && day !== 'Все' ? 'opacity-50' : ''}`}
                onClick={() => { setSelectedDay(day); setSelectedDate(''); }}
              >
                {day === 'Все' ? 'Все дни' : day}
                {hasClasses && day !== 'Все' && <span className="class-indicator-dot"></span>}
              </button>
            );
          })}

          <select className="select-bar" value={selectedTrainer} onChange={(e) => setSelectedTrainer(e.target.value)}>
            <option value=''>Все тренеры</option>
            {trainers.map(t => (
              <option key={t.id || t.Id} value={t.name}>{t.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Кнопка добавления занятия */}
      {isAdmin && (
        <div className="admin-add-section">
          <button
            type="button"
            onClick={() => setIsCreating(true)}
            className="btn-admin-add-big"
          >
            <Plus className="w-5 h-5" /> Добавить занятие
          </button>
        </div>
      )}

      {/* Список занятий */}
      <div className="schedule-grid">
        {filteredSchedule.length > 0 ? (
          filteredSchedule.map(item => {
            const totalSlots = item.totalSlots || 6;
            const freeSlots = item.availableSlots;

            return (
              <div key={item.id} className="schedule-card">
                <div>
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
                    <div className="trainer-avatar-mini">{item.trainerPhoto || '🐸'}</div>
                    <div>
                      <div className="trainer-name-text">{item.trainerName}</div>
                      <div className="trainer-spec-text">{item.trainerSpecialization}</div>
                    </div>
                  </div>
                </div>

                {/* Футер карточки с переносом кнопки вниз */}
                <div className="schedule-card-footer">
                  <div className="schedule-card-footer-top">
                    <span className="slots-info">
                      <Users className="w-4 h-4 text-emerald-600" /> 
                      Свободно <strong>{freeSlots}</strong> из <strong>{totalSlots}</strong> мест
                    </span>

                    {isAdmin && (
                      <div className="admin-action-buttons">
                        <button 
                          type="button"
                          onClick={() => setEditingItem({
                            ...item,
                            startAt: formatDateTimeForInput(item.startAt || item.date)
                          })}
                          className="btn-action-icon edit"
                          title="Редактировать занятие"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button 
                          type="button"
                          onClick={() => handleDeleteSchedule(item.id)}
                          className="btn-action-icon delete"
                          title="Удалить занятие"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <button 
                          type="button"
                          onClick={() => setViewingDetailsId(item.id)} // Открываем детали
                          className="btn-action-icon view"
                          title="Посмотреть записанных"
                        >
                          <Users className="w-4 h-4 text-emerald-600" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Кнопка Записаться */}
                  <button 
                    type="button"
                    onClick={() => handleBooking(item)}
                    disabled={freeSlots <= 0}
                    className={`btn-book-slot ${freeSlots <= 0 ? 'disabled' : ''}`}
                  >
                    {freeSlots > 0 ? 'Записаться' : 'Мест нет'}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-schedule">
            <p>В выбранный день занятий нет. Выберите другой день недели.</p>
          </div>
        )}
      </div>

      {/* Модальное окно редактирования */}
      {editingItem && (
        <ScheduleEditModal
          editingItem={editingItem}
          trainers={trainers}
          onClose={() => setEditingItem(null)}
          onSaveSuccess={() => {
            setEditingItem(null); // Закрываем модалку
            fetchData();          // Обновляем список расписания
          }}
        />
      )}


      {/* Модальное окно со списком участников занятия */}
      {viewingDetailsId && (
        <ScheduleDetailsModal 
          scheduleItemId={viewingDetailsId} 
          onClose={() => setViewingDetailsId(null)} 
          isAdmin={isAdmin}
        />
      )}

      {/* Модальное окно создания занятия */}
      {isCreating && (
        <ScheduleAddModal
          trainers={trainers}
          onClose={() => setIsCreating(false)}
          onSaveSuccess={() => {
            setIsCreating(false);
            fetchData();
          }}
        />
      )}
    
    </div>
  );
}
import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, Clock, Users, Loader2, Edit, Trash2, Plus, Search, ChevronUp, ChevronDown } from 'lucide-react';
import './SchedulePage.css';
import ScheduleDetailsModal from './ModalWindows/ScheduleDetailsModal';
import ScheduleEditModal from './ModalWindows/ScheduleEditModal';
import ScheduleAddModal from './ModalWindows/ScheduleAddModal';
import ScheduleArchive from './ScheduleArchive/ScheduleArchive';

const DAYS = ['Все', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
const API_URL = 'https://localhost:7026/api';

export default function SchedulePage() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState('Все');
  const [selectedDate, setSelectedDate] = useState('');
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState('');
  const [viewingDetailsId, setViewingDetailsId] = useState(null);
  const [activeView, setActiveView] = useState('current');
  const [archive, setArchive] = useState([]);
  const [archiveLoading, setArchiveLoading] = useState(false);

  // Состояния для редактирования и создания занятия
  const [editingItem, setEditingItem] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTrainer, setIsTrainer] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(true); // Сворачивание фильтров

  // Обновленная логика фильтрации
  const filteredSchedule = schedule.filter(item => {
    const matchesTrainer = !selectedTrainer || item.trainerName === selectedTrainer;
    const matchesSearch = item.groupName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.trainerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesTime = true;
    if (selectedDate) {
      matchesTime = (item.date ? item.date.split('T')[0] : '') === selectedDate;
    } else if (selectedDay && selectedDay !== 'Все') {
      matchesTime = (item.dayOfWeek || '').trim().toLowerCase() === selectedDay.trim().toLowerCase();
    }
    return matchesTrainer && matchesTime && matchesSearch;
  });

  // Проверка ролей
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        const role = user.role || user.Role;
        setIsAdmin(role === 'Admin');
        setIsTrainer(role === 'Trainer');
      } catch (e) { console.error("Ошибка парсинга роли", e); }
    }
  }, []);

  // Загрузка расписания и тренеров
  const fetchData = useCallback(async () => {
    try {
      const [resSchedule, resTrainers] = await Promise.all([
        fetch(`${API_URL}/schedule`),
        fetch(`${API_URL}/trainer`)
      ]);
      
      const scheduleData = await resSchedule.json();
      if (Array.isArray(scheduleData)) setSchedule(scheduleData);

      const trainersData = await resTrainers.json();
      if (Array.isArray(trainersData)) setTrainers(trainersData);
    } catch (err) {
      console.error("Ошибка загрузки:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchArchive = async () => {
    const token = localStorage.getItem('auth_token');
    setArchiveLoading(true);
    try {
      const response = await fetch(`${API_URL}/schedule/archive`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setArchive(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Ошибка загрузки архива:', error);
    } finally {
      setArchiveLoading(false);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    if (e.target.value) setSelectedDay('');
  };

  const handleDeleteSchedule = async (id) => {
    if (!window.confirm('Вы действительно хотите удалить это занятие из расписания?')) return;
    const token = localStorage.getItem('auth_token');
    try {
      const res = await fetch(`${API_URL}/admin/schedule/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        alert('Занятие успешно удалено!');
        fetchData();
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.message || 'Ошибка удаления');
      }
    } catch (err) { alert('Ошибка соединения с сервером'); }
  };

  const handleBooking = async (item) => {
    const token = localStorage.getItem('auth_token');
    if (!token) { alert('Пожалуйста, войдите в систему, чтобы записаться на занятие.'); return; }
    try {
      const response = await fetch(`${API_URL}/bookings/${item.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ scheduledAt: item.startAt })
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        fetchData();
      } else { throw new Error(data.message); }
    } catch (err) { alert(err.message || 'Не удалось записаться на занятие.'); }
  };

  const formatDateTimeForInput = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr.slice(0, 16);
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const getShortDay = (dayStr) => {
    if (!dayStr) return '';
    const map = {
      'понедельник': 'Пн', 'вторник': 'Вт', 'среда': 'Ср',
      'четверг': 'Чт', 'пятница': 'Пт', 'суббота': 'Сб', 'воскресенье': 'Вс'
    };
    return map[dayStr.trim().toLowerCase()] || dayStr;
  };

  // const filteredSchedule = schedule.filter(item => {
  //   const matchesTrainer = !selectedTrainer || item.trainerName === selectedTrainer;
  //   let matchesTime = true;
  //   if (selectedDate) {
  //     matchesTime = (item.date ? item.date.split('T')[0] : '') === selectedDate;
  //   } else if (selectedDay && selectedDay !== 'Все') {
  //     matchesTime = (item.dayOfWeek || '').trim().toLowerCase() === selectedDay.trim().toLowerCase();
  //   }
  //   return matchesTrainer && matchesTime;
  // });

  const scheduleForTrainer = schedule.filter(item => !selectedTrainer || item.trainerName === selectedTrainer);
  const activeDaysWithClasses = scheduleForTrainer.map(item => (item.dayOfWeek || '').trim().toLowerCase());

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  const canManageSchedule = isAdmin || isTrainer;

  return (
    <div className="schedule-container">
      {/* Вкладки переключения: Текущее расписание / Архив */}
      <div className="schedule-view-tabs">
        <button
          type="button"
          className={activeView === 'current' ? 'active' : ''}
          onClick={() => setActiveView('current')}
        >
          Текущее расписание
        </button>

        {canManageSchedule && (
          <button
            type="button"
            className={activeView === 'archive' ? 'active' : ''}
            onClick={() => {
              setActiveView('archive');
              fetchArchive();
            }}
          >
            Архив занятий
          </button>
        )}
      </div>

      {/* ТЕКУЩЕЕ РАСПИСАНИЕ */}
      {activeView === 'current' && (
              <div className="schedule-layout">
                <div className="schedule-header-row">
                  <h1>Расписание занятий</h1>
                  <div style={{ display: 'flex', gap: '10px' }}>
                     {/* ПОИСК */}
                     <div className="schedule-search-main">
                        <Search size={18} />
                        <input 
                          type="text" 
                          placeholder="Поиск занятия..." 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                     </div>
                  </div>
                </div>
      
                <div className="schedule-main-content">
                  <aside className="schedule-sidebar">
                    <div className="filter-card">
                      <div className="filter-card-header" onClick={() => setIsFiltersOpen(!isFiltersOpen)}>
                         <label className="filter-label" style={{ marginBottom: 0, marginTop: 20 }}>Фильтры</label>
                         {isFiltersOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>
      
                      {isFiltersOpen && (
                        <div className="filter-content-animate">
                          <div className="days-filter-bar">
                            <label className="filter-label">Выберите дату</label>
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
                            
                            <label className="filter-label">Дни недели</label>
                            <div className="days-list-vertical">
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
                            </div>
                            <select className="select-bar" value={selectedTrainer} onChange={(e) => setSelectedTrainer(e.target.value)}>
                              <option value=''>Все тренеры</option>
                              {trainers.map(t => (
                                <option key={t.id || t.Id} value={t.name}>{t.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )}
                    </div>
                  </aside>
                </div>

          {/* Кнопка добавления занятия для Админа/Тренера */}
          {canManageSchedule && (
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
                const totalSlots = item.totalSlots ?? 3;
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

                    <div className="schedule-card-footer">
                      <div className="schedule-card-footer-top">
                        <span className="slots-info">
                          <Users className="w-4 h-4 text-emerald-600" /> 
                          Свободно <strong>{freeSlots}</strong> из <strong>{totalSlots}</strong> мест
                        </span>

                        {canManageSchedule && (
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
                              onClick={() => setViewingDetailsId(item.id)}
                              className="btn-action-icon view"
                              title="Посмотреть записанных"
                            >
                              <Users className="w-4 h-4 text-emerald-600" />
                            </button>
                          </div>
                        )}
                      </div>

                      {!canManageSchedule && (
                        <button 
                          type="button"
                          onClick={() => handleBooking(item)}
                          disabled={freeSlots <= 0}
                          className={`btn-book-slot ${freeSlots <= 0 ? 'disabled' : ''}`}
                        >
                          {freeSlots > 0 ? 'Записаться' : 'Мест нет'}
                        </button>
                      )}
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
        </div>
      )}

      {/* АРХИВ ЗАНЯТИЙ (Вынесен в отдельный компонент) */}
      {activeView === 'archive' && (
        <ScheduleArchive 
          archive={archive} 
          archiveLoading={archiveLoading} 
        />
      )}

      {/* Модальное окно редактирования */}
      {editingItem && (
        <ScheduleEditModal
          editingItem={editingItem}
          trainers={trainers}
          onClose={() => setEditingItem(null)}
          onSaveSuccess={() => {
            setEditingItem(null);
            fetchData();
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
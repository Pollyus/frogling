import React, { useState } from 'react';
import { Calendar, Clock, User, Users, CheckCircle, Search, Filter } from 'lucide-react';
import './ScheduleArchive.css';

export default function ScheduleArchive({ archive, archiveLoading }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTrainer, setFilterTrainer] = useState('');
  const [filterDate, setFilterDate] = useState('');

  if (archiveLoading) {
    return (
      <div className="archive-empty">
        <div className="loading-pulse">Загрузка архива...</div>
      </div>
    );
  }

  // ФИЛЬТРАЦИЯ АРХИВА
  const filteredArchive = archive.filter(item => {
    const matchesSearch = item.groupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.participants?.some(p => p.studentName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesTrainer = !filterTrainer || item.trainerName === filterTrainer;
    
    const matchesDate = !filterDate || item.startAt.split('T')[0] === filterDate;

    return matchesSearch && matchesTrainer && matchesDate;
  });

  // Получаем список уникальных тренеров для фильтра
  const uniqueTrainers = [...new Set(archive.map(item => item.trainerName))];

  return (
    <div className="archive-section">
      {/* ПАНЕЛЬ ФИЛЬТРОВ АРХИВА */}
      <div className="archive-filters-bar">
        <div className="archive-search-box">
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            placeholder="Поиск по группе или ученику..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="archive-select-wrapper">
          <User size={16} className="select-icon" />
          <select value={filterTrainer} onChange={(e) => setFilterTrainer(e.target.value)}>
            <option value="">Все тренеры</option>
            {uniqueTrainers.map(name => <option key={name} value={name}>{name}</option>)}
          </select>
        </div>

        <div className="archive-date-wrapper">
          <Calendar size={16} className="select-icon" />
          <input 
            type="date" 
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>
      </div>

      {filteredArchive.length === 0 ? (
        <div className="archive-empty">
          Прошедших занятий по данным фильтрам не найдено.
        </div>
      ) : (
        <div className="archive-grid">
          {filteredArchive.map((item) => (
            <div className="archive-card-v2" key={item.id}>
              <div className="archive-card-inner">
                
                {/* Левая часть: Время и Группа */}
                <div className="archive-main-info">
                  <div className="archive-date-pill">
                    {new Date(item.startAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  <h3>{item.groupName}</h3>
                  <div className="archive-meta-row">
                    <span className="meta-item"><Clock size={14}/> {new Date(item.startAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })} – {new Date(item.endAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</span>
                    <span className="meta-item"><User size={14}/> Тренер: {item.trainerName}</span>
                  </div>
                </div>

                {/* Правая часть: Статус */}
                <div className="archive-status-badge">
                  <CheckCircle size={14} /> Завершено
                </div>
              </div>

              {/* Список участников */}
              <div className="archive-participants-section">
                <div className="participants-summary">
                  <Users size={16} />
                  <span>Посетили / записались: <strong>{item.participants?.length || 0}</strong></span>
                </div>

                {item.participants?.length > 0 ? (
                  <div className="archive-users-table">
                    {item.participants.map((p) => (
                      <div className="archive-user-row" key={p.id}>
                        <div className="user-primary">
                          <span className="student-name">{p.studentName}</span>
                          {p.parentName && <span className="parent-label">род. {p.parentName}</span>}
                        </div>
                        <div className="user-secondary">
                          <span className="user-phone">{p.phone}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-users-text">На занятие никто не пришел.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

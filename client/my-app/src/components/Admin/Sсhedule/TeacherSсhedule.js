import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import './Sсhedule.css';
import { 
  ChevronLeft, ChevronRight, MessageSquare, 
  Users, Search, Filter, Clock, LayoutGrid, Calendar as CalendarIcon,
  ChevronDown, MoreHorizontal, Bell, Plus
} from 'lucide-react';

dayjs.locale('ru');

const employees = [
  { id: 1, name: 'Владислав', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: 'Лидия', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: 'Любовь', avatar: 'https://i.pravatar.cc/150?u=3' },
];

function Teachersсhedule() {
{/* ОСНОВНОЙ КОНТЕНТ */}
      <div className="sсhedule-main-content">
        
        {/* ВЕРХНЯЯ ПАНЕЛЬ (COACH + TOOLS) */}
        <div className="top-toolbar">
          <div className="toolbar-left">
            <div className="menu-burger"><MoreHorizontal /></div>
            <button className="btn-today">Сегодня</button>
            <div className="coach-chip">
              <img src={selectedEmployee.avatar} alt="" />
              <span>{selectedEmployee.name}</span>
            </div>
          </div>
          
          <div className="toolbar-right">
             <div className="tool-group">
                <CalendarIcon size={18} />
                <ChevronDown size={14} />
             </div>
             <button className="btn-action">Продать <ChevronDown size={14}/></button>
             <div className="view-selector">
                <span className={viewMode === 'day' ? 'active' : ''}>День</span>
                <span className={viewMode === 'week' ? 'active' : ''}>Неделя</span>
             </div>
             <div className="employee-filter-chip">
                <span>{selectedEmployee.name}</span>
                <ChevronDown size={14} />
             </div>
             <Filter size={18} className="icon-btn" />
             <Search size={18} className="icon-btn" />
             <Clock size={18} className="icon-btn" />
             <LayoutGrid size={18} className="icon-btn" />
          </div>
        </div>

        {/* ЗАГОЛОВКИ ДНЕЙ НЕДЕЛИ */}
        <div className="week-header-grid">
          <div className="time-spacer">
             <ChevronLeft size={20} className="nav-arrow" />
          </div>
          {weekDays.map((day, i) => (
            <div key={i} className={`day-column-header ${day.isSame(dayjs(), 'day') ? 'is-today' : ''}`}>
              <div className="day-name">{day.format('dddd')}</div>
              <div className="day-date">{day.format('D MMM')}</div>
            </div>
          ))}
          <div className="time-spacer-right">
             <ChevronRight size={20} className="nav-arrow" />
          </div>
        </div>

        {/* СЕТКА РАСПИСАНИЯ */}
        <div className="sсhedule-grid-scroll-area">
          <div className="week-grid">
            {/* Колонка времени (слева) */}
            <div className="time-column">
              {[...Array(13)].map((_, i) => (
                <div key={i} className="time-label">{9 + i}:00 <span>30</span></div>
              ))}
            </div>

            {/* Колонки дней */}
            {weekDays.map((day, i) => (
              <div key={i} className="day-column">
                {/* Пример блока рабочего времени (серая заливка) */}
                <div className="work-hours-block" style={{ top: '0px', height: '600px' }}>
                   <div className="work-hours-label">09:00 — 21:00</div>
                </div>

                {/* Пример записи (зеленая плашка) */}
                {i === 5 && (
                  <div className="event-card green" style={{ top: '90px', height: '45px' }}>
                    <div className="event-time">10:00—10:30 <Clock size={10} /></div>
                    <div className="event-title">Миран 1</div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Линия текущего времени (только для "Сегодня") */}
            <div className="current-time-line" style={{ top: '450px' }}>
               <span className="time-badge">15:17</span>
            </div>
          </div>
        </div>
      </div>
}

export default Teachersсhedule;

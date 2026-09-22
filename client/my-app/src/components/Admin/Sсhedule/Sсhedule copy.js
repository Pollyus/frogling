// import React, { useState, useEffect } from 'react';
// import dayjs from 'dayjs';
// import 'dayjs/locale/ru'; // Импорт русской локализации
// import './Sсhedule.css';
// import trainer1Image from '..//..//TrainersCarousel/TrainersPhoto/Vlad.png';
// import trainer2Image from '..//..//TrainersCarousel/TrainersPhoto/Lidia.png';
// import trainer3Image from '..//..//TrainersCarousel/TrainersPhoto/Lyubov.png';
// import { Menu, ChevronLeft, ChevronRight, Star, User, MessageSquare, Users, Search, Filter, Clock, LayoutGrid, Calendar as CalendarIcon,
//   ChevronDown, MoreHorizontal, Bell, Plus } from 'lucide-react';
// import TeacherSсhedule from './TeacherSсhedule';

// // Устанавливаем русский язык глобально
// dayjs.locale('ru');

// const employees = [
//   { id: 1, name: 'Владислав', avatar: trainer1Image },
//   { id: 2, name: 'Лидия', avatar: trainer2Image },
//   { id: 3, name: 'Любовь', avatar: trainer3Image },
// ];

// function Sсhedule() {
//   const [viewType, setViewType] = useState('day'); // 'day' или 'coach-week'
//   // 1. Состояние для ВЫБРАННОЙ даты (на какой день смотрим расписание)
//   const [selectedDate, setSelectedDate] = useState(dayjs());

//   // 2. Состояние для ОТОБРАЖАЕМОГО месяца в мини-календаре (какой месяц листаем)
//   const [viewDate, setViewDate] = useState(dayjs().startOf('month'));

//   // 3. Состояние для текущей линии времени (обновляется каждую минуту)
//   const [now, setNow] = useState(dayjs());

//   const [selectedEmployee, setSelectedEmployee] = useState(employees[0]);

//   useEffect(() => {
//     const timer = setInterval(() => setNow(dayjs()), 60000);
//     return () => clearInterval(timer);
//   }, []);

//   // --- ЛОГИКА КАЛЕНДАРЯ ЧЕРЕЗ DAY.JS ---

//   const daysInMonth = viewDate.daysInMonth(); // Количество дней в месяце
//   const firstDayOfMonth = viewDate.startOf('month').day(); // День недели 1-го числа
  
//   // Корректировка для России 
//   const shift = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

//   // Расчет позиции линии времени
//   const calculateLineTop = () => {
//     const startHour = 9;
//     const hourHeight = 90;
//     const currentHour = now.hour();
//     const currentMinutes = now.minute();

//     if (currentHour < startHour || currentHour >= 21) return null;
//     return (currentHour - startHour) * hourHeight + (currentMinutes / 60) * hourHeight;
//   };

//   // Проверка: смотрим ли мы сегодня?
//   const isToday = selectedDate.isSame(dayjs(), 'day');

//   const startOfWeek = selectedDate.startOf('week');
//   const weekDays = [...Array(7)].map((_, i) => startOfWeek.add(i, 'day'));

//   // --- ОБРАБОТЧИКИ ---
//   const handleDateClick = (date) => {
//     setSelectedDate(date);
//     setViewType('day'); // Переключаем на дневной вид
//     setSelectedEmployee(null); // Сбрасываем фокус с тренера в шапке (опционально)
//   };

//   const handleEmployeeClick = (emp) => {
//     setSelectedEmployee(emp);
//     setViewType('coach-week'); // Переключаем на недельный вид тренера
//   };


//   return (
//     <div className="sсhedule-app-container">
//       <aside className="sсhedule-sidebar">
//         <div className="sсhedule-logo-section">
//           <div className="sсhedule-logo-icon">Л</div>
//           <span>Лягушонок</span>
//         </div>

//         {/* МИНИ-КАЛЕНДАРЬ */}
//         <div className="sсhedule-mini-calendar">
//           <div className="sсhedule-calendar-header">
//             {/* Форматируем: Январь 2026 */}
//             <span className="capitalize">{viewDate.format('MMMM YYYY')}</span>
//             <div className="flex gap-2">
//               <ChevronLeft size={16} className="pointer" onClick={() => setViewDate(viewDate.subtract(1, 'month'))} />
//               <ChevronRight size={16} className="pointer" onClick={() => setViewDate(viewDate.add(1, 'month'))} />
//             </div>
//           </div>

//           <div className="sсhedule-calendar-grid">
//             {['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'].map(d => (
//               <div key={d} className="sсhedule-calendar-weekday">{d}</div>
//             ))}
            
//             {/* Пустые ячейки */}
//             {[...Array(shift)].map((_, i) => <div key={i} className="sсhedule-calendar-empty" />)}

//             {/* Числа месяца */}
//             {[...Array(daysInMonth)].map((_, i) => {
//               const day = i + 1;
//               const dateObj = viewDate.date(day);
//               const isSelected = dateObj.isSame(selectedDate, 'day');
              
//               return (
//                 <div 
//                   key={day} 
//                   className={`sсhedule-calendar-day ${isSelected ? 'active' : ''}`}
//                   // onClick={() => setSelectedDate(dateObj)}
//                   onClick={() => handleDateClick(date)}
//                 >
//                   {day}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//         {/* ... меню ... */}

//          {/* БЛОК СОТРУДНИКИ */}
//         <div className="sidebar-section">
//           <div className="sidebar-section-header">
//             <div className="flex-center gap-2">
//               <Users size={16} />
//               <span>Сотрудники</span>
//             </div>
//             <ChevronDown size={14} />
//           </div>
//           <div className="employee-list">
//             {employees.map(emp => (
//               <div 
//                 key={emp.id} 
//                 className={`employee-item ${selectedEmployee.id === emp.id ? 'active' : ''}`}
//                 // onClick={() => setSelectedEmployee(emp)}
//                 onClick={() => handleEmployeeClick(emp)}
//               >
//                 <img src={emp.avatar} alt={emp.name} className="emp-avatar-small" />
//                 <span className="emp-name">{emp.name}</span>
//                 <CalendarIcon size={14} className="emp-cal-icon" />
//               </div>
//             ))}
//           </div>
//         </div>
//       </aside>

//       <main className="sсhedule-main-content">
//         {/* НОВАЯ ПЛАШКА С ТРЕНЕРОМ */}
//         <div className="coach-bar">
//             <div className="coach-content">
//                 <div className="coach-avatar-wrapper">
//                     {/* Замените на реальную ссылку к фото тренера */}
//                     <img src={trainer1Image} alt="Тренер" className="coach-avatar" />
//                     <span className="status-dot"></span>
//                 </div>
//                 <div className="coach-info">
//                     <span className="coach-label">Ваш тренер</span>
//                     <span className="coach-name">Владислав</span>
//                 </div>
//             </div>
//             <div className="coach-actions">
//                 <button className="btn-chat">
//                     <MessageSquare size={20} /> {/* Иконка чата из lucide-react */}
//                 </button>
//             </div>
//         </div>
//         <header className="sсhedule-header">
//           <div className="sсhedule-header-left">
//             <Menu className="pointer" />
//             <button className="sсhedule-btn-today" onClick={() => {
//               setSelectedDate(dayjs());
//               setViewDate(dayjs().startOf('month'));
//             }}>
//               Сегодня
//             </button>
//             <ChevronLeft className="pointer" onClick={() => setSelectedDate(selectedDate.subtract(1, 'day'))} />
//             <ChevronRight className="pointer" onClick={() => setSelectedDate(selectedDate.add(1, 'day'))} />
            
//             {/* Автоматически: 20 января 2026, вторник */}
//             <span className="sсhedule-current-date">
//               {selectedDate.format('D MMMM YYYY, dddd')}
//             </span>
//           </div>
//         </header>

//         <section className="sсhedule-schedule-container">
//           <div className="sсhedule-grid-body">
//             {/* Линия времени */}
//             {isToday && calculateLineTop() !== null && (
//               <div className="sсhedule-current-time-line" style={{ top: `${calculateLineTop()}px` }}>
//                 <span className="sсhedule-time-tag">{now.format('HH:mm')}</span>
//               </div>
//             )}

//             {/* Левая колонка с часами */}
//             <div className="sсhedule-time-column">
//                 {[9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(h => (
//                 <div key={h} className="sсhedule-time-slot">
//                     <span>{h}:00</span>
//                     <span style={{ borderBottom: '40px solid #e5e7eb', fontSize: '10px' }}>30</span>
//                 </div>
//                 ))}
//             </div>

//             <div className="sсhedule-staff-grid-columns">
  
//                 {/* КОЛОНКА 1: Лидия */}
//                 <div className="sсhedule-column-divider" style={{ borderRight: '1px solid #e5e7eb', position: 'relative' }}>
                    
//                 </div>

//                 {/* КОЛОНКА 2: Любовь */}
//                 <div className="sсhedule-column-divider" style={{ position: 'relative' }}>
                    

//                 </div>


//             {/* Сетка времени и колонки... */}
//             {/* (Ваш код фильтрации записей будет использовать app.date === selectedDate.format('YYYY-MM-DD')) */}
//              </div>
//              </div>
//         </section>
//       </main>
//     </div>
//   );
// }

// export default Sсhedule;

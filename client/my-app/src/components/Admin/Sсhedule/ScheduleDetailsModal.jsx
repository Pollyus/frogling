import React, { useState, useEffect } from 'react';
import { X, Users, Phone, Mail, UserCheck, Trash2, Loader2, Calendar } from 'lucide-react';

const API_URL = 'https://localhost:7026/api';

export default function ScheduleDetailsModal({ scheduleItemId, onClose, isAdmin }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDetails = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      // Запрашиваем детали занятия (список записанных клиентов)
      const res = await fetch(`${API_URL}/schedule/${scheduleItemId}/attendees`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!res.ok) {
        throw new Error('Не удалось загрузить список записанных участников.');
      }

      const data = await res.json();
      setDetails(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [scheduleItemId]);

  // Удаление записи клиента (если админ/тренер хочет отменить бронь участника)
  const handleRemoveAttendee = async (bookingId) => {
    if (!window.confirm('Вы действительно хотите отменить запись этого участника?')) return;
    
    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch(`${API_URL}/admin/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!res.ok) throw new Error('Не удалось удалить запись.');

      alert('Запись успешно отменена.');
      fetchDetails(); // Перезагружаем список
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="modal-admin-overlay" onClick={onClose}>
      <div className="modal-admin-card schedule-details-card" onClick={e => e.stopPropagation()}>
        <button className="absolute top-6 right-6 text-slate-400 bg-transparent border-0 cursor-pointer" onClick={onClose}>
          <X className="w-5 h-5" />
        </button>

        <h2>Список записанных участников</h2>

        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          </div>
        ) : error ? (
          <p className="text-red-500 py-4">{error}</p>
        ) : details ? (
          <div>
            <div className="schedule-info-preview mb-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <p className="font-bold text-slate-800 text-base">{details.groupName}</p>
              <p className="text-sm text-slate-600 flex items-center gap-2 mt-1">
                <Calendar className="w-4 h-4 text-emerald-600" /> {details.date} ({details.startTime} - {details.endTime})
              </p>
            </div>

            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-600" /> Участники ({details.attendees.length})
            </h3>

            {details.attendees.length === 0 ? (
              <p className="text-slate-500 text-center py-6 bg-slate-50 rounded-xl">На это занятие еще никто не записался.</p>
            ) : (
              <div className="attendees-list">
                {details.attendees.map(attendee => (
                  <div key={attendee.bookingId} className="attendee-card">
                    <div className="attendee-main-info">
                      <div className="attendee-name font-bold text-slate-800 text-sm flex items-center gap-1.5">
                        <UserCheck className="w-4 h-4 text-emerald-600" /> {attendee.fullName}
                      </div>
                      {attendee.parentName && (
                        <div className="attendee-parent text-xs text-slate-500 mt-0.5">
                          Родитель: <strong>{attendee.parentName}</strong>
                        </div>
                      )}
                      
                      <div className="attendee-contacts flex flex-wrap gap-3 mt-2 text-xs">
                        {attendee.phone && (
                          <a href={`tel:${attendee.phone}`} className="contact-pill phone flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5 text-emerald-600" /> {attendee.phone}
                          </a>
                        )}
                        {attendee.email && (
                          <a href={`mailto:${attendee.email}`} className="contact-pill email flex items-center gap-1">
                            <Mail className="w-3.5 h-3.5 text-blue-600" /> {attendee.email}
                          </a>
                        )}
                      </div>
                    </div>

                    {isAdmin && (
                      <button 
                        onClick={() => handleRemoveAttendee(attendee.bookingId)}
                        className="btn-remove-attendee"
                        title="Отменить запись участника"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : null}

        <div className="modal-actions mt-6">
          <button type="button" className="btn-cancel-admin w-full" onClick={onClose}>Закрыть</button>
        </div>
      </div>
    </div>
  );
}

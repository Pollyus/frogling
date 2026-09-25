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
      const res = await fetch(`${API_URL}/schedule/${scheduleItemId}/attendees`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!res.ok) {
        throw new Error('Не удалось загрузить список участников.');
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
      fetchDetails();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="modal-admin-overlay" onClick={onClose}>
      <div className="modal-admin-card schedule-details-card" onClick={e => e.stopPropagation()}>
        {/* Круглый крестик строго в правом верхнем углу */}
        <button className="modal-close-btn" onClick={onClose} title="Закрыть">
          <X className="w-5 h-5" />
        </button>

        <h2 className="modal-title-custom">Записанные участники</h2>

        {loading ? (
          <div className="loading-spinner-wrapper">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          </div>
        ) : error ? (
          <p className="error-text-custom">{error}</p>
        ) : details ? (
          <div>
            {/* Плашка с шапкой занятия */}
            <div className="schedule-info-preview">
              <div className="group-name-badge">{details.groupName}</div>
              <div className="group-time-pill">
                <Calendar className="w-4 h-4 text-emerald-600" /> 
                {details.date} ({details.startTime} – {details.endTime})
              </div>
            </div>

            <div className="attendees-header-count">
              <Users className="w-4 h-4 text-emerald-600" /> Участники ({details.attendees.length})
            </div>

            {details.attendees.length === 0 ? (
              <div className="no-attendees-box">
                На это занятие еще никто не записался.
              </div>
            ) : (
              <div className="attendees-list">
                {details.attendees.map(attendee => (
                  <div key={attendee.bookingId} className="attendee-card">
                    <div className="attendee-main-info">
                      <div className="attendee-name font-bold">
                        <UserCheck className="w-4 h-4 text-emerald-600" /> {attendee.fullName}
                      </div>

                      {attendee.parentName && (
                        <div className="attendee-parent">
                          Родитель: <strong>{attendee.parentName}</strong>
                        </div>
                      )}
                      
                      <div className="attendee-contacts">
                        {attendee.phone && (
                          <a href={`tel:${attendee.phone}`} className="contact-pill phone">
                            <Phone className="w-3.5 h-3.5 text-emerald-600" /> {attendee.phone}
                          </a>
                        )}
                        {attendee.email && (
                          <a href={`mailto:${attendee.email}`} className="contact-pill email">
                            <Mail className="w-3.5 h-3.5 text-blue-600" /> {attendee.email}
                          </a>
                        )}
                      </div>
                    </div>

                    {isAdmin && (
                      <button 
                        type="button"
                        onClick={() => handleRemoveAttendee(attendee.bookingId)}
                        className="btn-remove-attendee"
                        title="Отменить запись"
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
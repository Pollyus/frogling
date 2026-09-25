import React, { useState } from 'react';
import { X } from 'lucide-react';

const API_URL = 'https://localhost:7026/api';

export default function ScheduleAddModal({ trainers, onClose, onSaveSuccess }) {
  const [formData, setFormData] = useState({
    groupName: '',
    startAt: '',
    durationMinutes: 45,
    trainerId: trainers.length > 0 ? trainers[0].id || trainers[0].Id : 1,
    availableSlots: 6
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('auth_token');

    try {
      const res = await fetch(`${API_URL}/admin/schedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          groupName: formData.groupName,
          startAt: formData.startAt,
          durationMinutes: parseInt(formData.durationMinutes) || 45,
          trainerId: parseInt(formData.trainerId),
          availableSlots: parseInt(formData.availableSlots) || 6
        })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Не удалось создать занятие');
      }

      alert('Занятие успешно добавлено в расписание!');
      onSaveSuccess(); // Закрываем и обновляем список
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-admin-overlay" onClick={onClose}>
      <div className="modal-admin-card schedule-details-card" onClick={e => e.stopPropagation()}>
        {/* Круглая кнопка-крестик */}
        <button className="modal-close-btn" onClick={onClose} title="Закрыть">
          <X className="w-5 h-5" />
        </button>

        <h2 className="modal-title-custom">Новое занятие</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group-admin">
            <label>Название группы / занятия</label>
            <input 
              type="text" 
              placeholder="Например: Грудничковое плавание"
              value={formData.groupName} 
              onChange={e => setFormData({ ...formData, groupName: e.target.value })}
              required 
            />
          </div>

          <div className="form-group-admin">
            <label>Дата и время начала</label>
            <input 
              type="datetime-local" 
              value={formData.startAt} 
              onChange={e => setFormData({ ...formData, startAt: e.target.value })}
              required 
            />
          </div>

          <div className="form-group-admin">
            <label>Длительность (минут)</label>
            <input 
              type="number" 
              value={formData.durationMinutes} 
              onChange={e => setFormData({ ...formData, durationMinutes: e.target.value })}
              required 
            />
          </div>

          <div className="form-group-admin">
            <label>Инструктор / Тренер</label>
            <select 
              value={formData.trainerId} 
              onChange={e => setFormData({ ...formData, trainerId: e.target.value })}
              className="select-admin-custom"
            >
              {trainers.map(t => (
                <option key={t.id || t.Id} value={t.id || t.Id}>{t.name} ({t.specialization || 'Инструктор'})</option>
              ))}
            </select>
          </div>

          <div className="form-group-admin">
            <label>Всего свободных мест</label>
            <input 
              type="number" 
              value={formData.availableSlots} 
              onChange={e => setFormData({ ...formData, availableSlots: e.target.value })}
              required 
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel-admin" onClick={onClose} disabled={loading}>
              Отмена
            </button>
            <button type="submit" className="btn-save-admin" disabled={loading}>
              {loading ? 'Создание...' : 'Создать занятие'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
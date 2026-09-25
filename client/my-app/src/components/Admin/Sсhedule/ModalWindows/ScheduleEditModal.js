import React, { useState } from 'react';
import { X } from 'lucide-react';

const API_URL = 'https://localhost:7026/api';

export default function ScheduleEditModal({ editingItem, trainers, onClose, onSaveSuccess }) {
  const [formData, setFormData] = useState({
    groupName: editingItem?.groupName || '',
    startAt: editingItem?.startAt || '',
    durationMinutes: editingItem?.durationMinutes || 45,
    trainerId: editingItem?.trainerId || 1,
    availableSlots: editingItem?.availableSlots || 6
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('auth_token');

    try {
      const res = await fetch(`${API_URL}/admin/schedule/${editingItem.id}`, {
        method: 'PUT',
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
        throw new Error(data.message || 'Не удалось обновить расписание');
      }

      alert('Расписание успешно обновлено!');
      onSaveSuccess(); // Вызываем перезагрузку списка и закрытие
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

        <h2 className="modal-title-custom">Редактирование занятия</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group-admin">
            <label>Название группы / занятия</label>
            <input 
              type="text" 
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
                <option key={t.id || t.Id} value={t.id || t.Id}>{t.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group-admin">
            <label>Количество свободных мест</label>
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
              {loading ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

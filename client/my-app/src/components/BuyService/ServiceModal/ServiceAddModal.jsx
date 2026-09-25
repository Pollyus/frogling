import React, { useState } from 'react';
import { X } from 'lucide-react';

const API_URL = 'https://localhost:7026/api';

export default function ServiceAddModal({ onClose, onSaveSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 1500,
    totalLessons: 4,
    durationDays: 30,
    isTrial: false
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('auth_token');

    try {
      const res = await fetch(`${API_URL}/admin/services`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Не удалось создать услугу');
      }

      alert('Услуга успешно создана!');
      onSaveSuccess();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-admin-overlay" onClick={onClose}>
      <div className="modal-admin-card schedule-details-card" onClick={e => e.stopPropagation()}>
        {/* Круглый крестик */}
        <button className="modal-close-btn" onClick={onClose} title="Закрыть">
          <X className="w-5 h-5" />
        </button>

        <h2 className="modal-title-custom">Добавить новую услугу</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group-admin">
            <label>Название услуги / Абонемента</label>
            <input 
              type="text" 
              placeholder="Например: Абонемент на 8 занятий"
              value={formData.name} 
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required 
            />
          </div>

          <div className="form-group-admin">
            <label>Описание</label>
            <input 
              type="text" 
              placeholder="Короткое описание условий"
              value={formData.description} 
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="form-group-admin">
            <label>Цена (₽)</label>
            <input 
              type="number" 
              value={formData.price} 
              onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
              required 
            />
          </div>

          <div className="form-group-admin">
            <label>Количество занятий</label>
            <input 
              type="number" 
              value={formData.totalLessons} 
              onChange={e => setFormData({ ...formData, totalLessons: parseInt(e.target.value) || 1 })}
              required 
            />
          </div>

          <div className="form-group-admin">
            <label>Срок действия (дней)</label>
            <input 
              type="number" 
              value={formData.durationDays} 
              onChange={e => setFormData({ ...formData, durationDays: parseInt(e.target.value) || 30 })}
              required 
            />
          </div>

          {/* Чекбокс Пробного занятия */}
          <div className="form-group-admin checkbox-group">
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={formData.isTrial} 
                onChange={e => setFormData({ ...formData, isTrial: e.target.checked })}
              />
              <span>Это пробное занятие (покупка доступна 1 раз)</span>
            </label>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel-admin" onClick={onClose} disabled={loading}>
              Отмена
            </button>
            <button type="submit" className="btn-save-admin" disabled={loading}>
              {loading ? 'Создание...' : 'Создать услугу'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
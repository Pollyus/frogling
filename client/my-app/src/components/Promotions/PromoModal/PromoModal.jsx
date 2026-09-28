import React from 'react';
import { X } from 'lucide-react';

export default function PromoModal({
  isOpen,
  onClose,
  editingPromo,
  formData,
  setFormData,
  users,
  handleSave
}) {
  if (!isOpen) return null;

  const handleUserToggle = (userId) => {
    const current = formData.targetUserIds || [];
    if (current.includes(userId)) {
      setFormData({
        ...formData,
        targetUserIds: current.filter((id) => id !== userId)
      });
    } else {
      setFormData({
        ...formData,
        targetUserIds: [...current, userId]
      });
    }
  };

  const handleSelectAll = () => {
    setFormData({ ...formData, targetUserIds: [] });
  };

  const selectedCount = formData.targetUserIds ? formData.targetUserIds.length : 0;

  return (
    <div className="modal-admin-overlay" onClick={onClose}>
      <div className="modal-admin-card" onClick={(e) => e.stopPropagation()}>
        {/* Кнопка закрытия как в расписании (абсолютно спозиционирована в правом верхнем углу) */}
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          title="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>

        <h2>{editingPromo ? 'Редактирование акции' : 'Новая акция'}</h2>

        <form onSubmit={handleSave}>
          <div className="form-group-admin">
            <label>Название акции</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Например: Скидка на день рождения"
              required
            />
          </div>

          <div className="form-group-admin">
            <label>Описание</label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Условия акции"
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group-admin">
              <label>Скидка в ₽</label>
              <input
                type="number"
                value={formData.discountAmount}
                onChange={(e) => setFormData({ ...formData, discountAmount: e.target.value })}
                placeholder="Например: 500"
              />
            </div>
            <div className="form-group-admin">
              <label>Скидка в %</label>
              <input
                type="number"
                value={formData.discountPercentage}
                onChange={(e) => setFormData({ ...formData, discountPercentage: e.target.value })}
                placeholder="Например: 15"
              />
            </div>
          </div>

          {/* Множественный выбор пользователей */}
          <div className="form-group-admin">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ margin: 0 }}>Видимость акции</label>
              <button
                type="button"
                onClick={handleSelectAll}
                style={{
                  background: 'none',
                  border: 'none',
                  color: selectedCount === 0 ? '#16a34a' : '#64748b',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                {selectedCount === 0 ? '✓ Для всех пользователей' : 'Сбросить (сделать для всех)'}
              </button>
            </div>

            <div className="users-multiselect-container">
              {users.length > 0 ? (
                users.map((u) => {
                  const isChecked = formData.targetUserIds?.includes(u.id);
                  return (
                    <label key={u.id} className={`user-checkbox-row ${isChecked ? 'selected' : ''}`}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleUserToggle(u.id)}
                      />
                      <div className="user-checkbox-info">
                        <span className="user-name">{u.fullName}</span>
                        <span className="user-email">{u.email}</span>
                      </div>
                    </label>
                  );
                })
              ) : (
                <div style={{ padding: '12px', color: '#94a3b8', fontSize: '12px', textAlign: 'center' }}>
                  Нет зарегистрированных пользователей
                </div>
              )}
            </div>
            <span style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', display: 'block' }}>
              {selectedCount === 0
                ? 'Акция будет видна абсолютно всем пользователям.'
                : `Выбрано персонально клиентов: ${selectedCount}`}
            </span>
          </div>

          <div className="form-group-admin">
            <label>Цветовая тема карточки</label>
            <select
              value={formData.colorTheme}
              onChange={(e) => setFormData({ ...formData, colorTheme: e.target.value })}
            >
              <option value="emerald">Изумрудная</option>
              <option value="blue">Синяя</option>
              <option value="amber">Янтарная</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel-admin" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="btn-save-admin">
              Сохранить акцию
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

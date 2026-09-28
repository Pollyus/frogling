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

  return (
    <div className="modal-admin-overlay" onClick={onClose}>
      <div className="modal-admin-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 bg-transparent border-0 cursor-pointer"
          onClick={onClose}
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

          <div className="form-group-admin">
            <label>Персональный клиент (кому видна акция)</label>
            <select
              value={formData.targetUserId}
              onChange={(e) => setFormData({ ...formData, targetUserId: e.target.value })}
            >
              <option value="">Для всех пользователей (публичная)</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.fullName} ({u.email})
                </option>
              ))}
            </select>
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

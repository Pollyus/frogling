import React from 'react';
import { X } from 'lucide-react';

export default function ServiceEditModal({ editingPlan, setEditingPlan, handleSavePlan }) {
  if (!editingPlan) return null;

  return (
    <div className="modal-admin-overlay" onClick={() => setEditingPlan(null)}>
      <div className="modal-admin-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 bg-transparent border-0 cursor-pointer"
          onClick={() => setEditingPlan(null)}
        >
          <X className="w-5 h-5" />
        </button>
        <h2>Редактирование услуги</h2>

        <form onSubmit={handleSavePlan}>
          <div className="form-group-admin">
            <label>Название тарифа / услуги</label>
            <input
              type="text"
              value={editingPlan.title || ''}
              onChange={(e) => setEditingPlan({ ...editingPlan, title: e.target.value })}
              required
            />
          </div>

          <div className="form-group-admin">
            <label>Стоимость (₽)</label>
            <input
              type="number"
              value={editingPlan.price ?? 0}
              onChange={(e) => setEditingPlan({ ...editingPlan, price: e.target.value })}
              required
            />
          </div>

          <div className="form-group-admin">
            <label>Количество занятий</label>
            <input
              type="number"
              value={editingPlan.lessonsCount ?? 1}
              onChange={(e) => setEditingPlan({ ...editingPlan, lessonsCount: e.target.value })}
              required
            />
          </div>

          <div className="form-group-admin">
            <label>Срок действия (в днях)</label>
            <input
              type="number"
              value={editingPlan.durationDays ?? 30}
              onChange={(e) => setEditingPlan({ ...editingPlan, durationDays: e.target.value })}
              required
            />
          </div>

          <div className="form-group-admin">
            <label>Категория</label>
            <select
              value={editingPlan.category || 'Разовые'}
              onChange={(e) => setEditingPlan({ ...editingPlan, category: e.target.value })}
              className="w-full p-3 border border-slate-300 rounded-xl bg-white"
            >
              <option value="Разовые">Разовые</option>
              <option value="Абонементы">Абонементы</option>
              <option value="Персональные">Персональные</option>
            </select>
          </div>

          <div className="form-group-admin">
            <label>Описание</label>
            <textarea
              rows="3"
              value={editingPlan.description || ''}
              onChange={(e) => setEditingPlan({ ...editingPlan, description: e.target.value })}
              placeholder="Краткое описание условий услуги"
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel-admin" onClick={() => setEditingPlan(null)}>
              Отмена
            </button>
            <button type="submit" className="btn-save-admin">
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

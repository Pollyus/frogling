import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import './PromosPage.css';

export default function PromoModal({
  isOpen,
  onClose,
  editingPromo,
  formData,
  setFormData,
  users,
  handleSave
}) {
  const [userSearch, setUserSearch] = useState('');
  const [isForEveryone, setIsForEveryone] = useState(true);

  // При открытии новой/редактируемой акции устанавливаем режим по сохранённым получателям
  useEffect(() => {
    if (!isOpen) return;

    const ids = formData.targetUserIds || [];
    setIsForEveryone(ids.length === 0);
    setUserSearch('');
  }, [isOpen, editingPromo?.id]);

  if (!isOpen) return null;

  const handleVisibilityChange = (e) => {
    const checked = e.target.checked;
    setIsForEveryone(checked);

    if (checked) {
      // Общая акция — очищаем список получателей
      setFormData(prev => ({ ...prev, targetUserIds: [] }));
    }
  };

  const toggleUserSelection = (userId) => {
    const id = String(userId);
    setFormData(prev => {
      const currentIds = (prev.targetUserIds || []).map(String);
      const nextIds = currentIds.includes(id)
        ? currentIds.filter(x => x !== id)
        : [...currentIds, id];

      return { ...prev, targetUserIds: nextIds };
    });
  };

  const query = userSearch.trim().toLowerCase();

  // Переключение режима "Для всех пользователей"
  const handleForEveryoneToggle = (e) => {
    if (e.target.checked) {
      setFormData({ ...formData, targetUserIds: [] });
    }
  };

  // Живая фильтрация пользователей по имени или email
  const filteredUsers = users.filter(u => {
    const q = userSearch.toLowerCase().trim();
    if (!q) return true;
    return (
      (u.fullName && u.fullName.toLowerCase().includes(q)) ||
      (u.email && u.email.toLowerCase().includes(q))
    );
  });

  const selectedCount = formData.targetUserIds ? formData.targetUserIds.length : 0;

  return (
    <div className="modal-admin-overlay" onClick={onClose}>
      <div className="modal-admin-card" onClick={(e) => e.stopPropagation()}>
        {/* Кнопка закрытия */}
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

          {/* Видимость акции и выбор пользователей */}
          <div className="form-group-admin">
            <div className="flex justify-between items-center mb-2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ margin: 0 }}>Видимость акции</label>
              <label className="checkbox-label" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input 
                  type="checkbox" 
                  checked={isForEveryone} 
                  onChange={handleVisibilityChange} 
                />
                <span className="text-emerald-700 font-bold text-xs" style={{ color: '#2d6a1b', fontWeight: 'bold', fontSize: '12px' }}>
                  Для всех пользователей
                </span>
              </label>
            </div>

            {/* Блок поиска и списка пользователей (показывается только если НЕ для всех) */}
            {!isForEveryone && (
              <div>
                <input
                  type="search"
                  placeholder="Поиск по имени или email..."
                  value={userSearch}
                  onChange={e => setUserSearch(e.target.value)}
                  className="user-search-input"
                />

                <div className="users-select-container">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => {
                      const isSelected = (formData.targetUserIds || []).map(String).includes(String(user.id));
                      
                      return (
                        <div
                          key={user.id}
                          className={`user-select-row ${isSelected ? 'selected' : ''}`}
                          onClick={() => toggleUserSelection(user.id)}
                        >
                          {/* Левая колонка: Имя и почта в одну строку (или имя сверху, почта снизу) */}
                          <div className="user-text-col">
                            <span className="user-name-label">{user.fullName || 'Без имени'}</span>
                            <span className="user-email-label">{user.email}</span>
                          </div>

                          {/* Правая колонка: Чекбокс строго справа */}
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleUserSelection(user.id)}
                            onClick={e => e.stopPropagation()}
                            className="user-checkbox-fixed"
                          />
                        </div>
                      );
                    })
                  ) : (
                    <div style={{ padding: '16px', color: '#94a3b8', fontSize: '13px', textAlign: 'center' }}>
                      Пользователи не найдены
                    </div>
                  )}
                </div>
              </div>
            )}


            <span style={{ fontSize: '11px', color: '#64748b', marginTop: '6px', display: 'block' }}>
              {isForEveryone
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
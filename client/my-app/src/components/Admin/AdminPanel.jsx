import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, CheckCircle, XCircle, Edit, X } from 'lucide-react';
import './AdminPanel.css';

const API_URL = 'https://localhost:7026/api';

export default function AdminPanel() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);

  // 1. Загрузка списка всех клиентов
  const fetchUsers = () => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetch(`${API_URL}/admin/users`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => {
      if (!res.ok) throw new Error('Ошибка доступа');
      return res.json();
    })
    .then(data => {
      setUsers(Array.isArray(data) ? data : []);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      alert('Доступ запрещен. Войдите с правами Администратора.');
      navigate('/');
    });
  };

  useEffect(() => {
    fetchUsers();
  }, [navigate]);

  // 2. Функция сохранения изменений клиента
  const handleSaveUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('auth_token');

    try {
      let formattedDate = null;
      if (editingUser.medicalCheckDate) {
        // Добавляем время, чтобы бэкенд точно понял UTC полночь
        formattedDate = new Date(editingUser.medicalCheckDate).toISOString();
      }
      const response = await fetch(`${API_URL}/admin/users/${editingUser.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
          fullName: editingUser.fullName || '',
          phone: editingUser.phone || '',
          parentName: editingUser.parentName || '',
          medicalCheckDate: editingUser.medicalCheckDate ? new Date(editingUser.medicalCheckDate).toISOString() : null
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Ошибка сохранения');
      }

      alert('Данные клиента успешно сохранены!');
      setEditingUser(null);
      fetchUsers(); // Перезагружаем список
    } catch (err) {
      console.error(err);
      alert(err.message || 'Не удалось сохранить изменения.');
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Загрузка данных админ-панели...</div>;

  const formatDateForInput = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '';
    return d.toISOString().split('T')[0];
  };

  // Вычисляет статус и дату окончания (+6 месяцев)
  const getMedicalInfo = (dateStr) => {
    if (!dateStr) return { isValid: false, expiryText: '' };
    
    const checkDate = new Date(dateStr);
    if (isNaN(checkDate.getTime())) return { isValid: false, expiryText: '' };

    // Добавляем 6 месяцев к дате выдачи
    const expiryDate = new Date(checkDate);
    expiryDate.setMonth(expiryDate.getMonth() + 6);

    const isValid = expiryDate > new Date();
    const expiryText = expiryDate.toLocaleDateString('ru-RU');

    return { isValid, expiryText };
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 className="admin-title">
          <Shield className="w-7 h-7 text-emerald-600" /> Управление клиентами
        </h1>
        <span className="admin-badge">
          Панель Администратора
        </span>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          Зарегистрированные клиенты ({users.length})
        </div>
        
        <div className="divide-y divide-slate-100">
          {users.map(u => {
            const { isValid, expiryText } = getMedicalInfo(u.medicalCheckDate);

            return (
              <div key={u.id} className="admin-user-row">
                {/* Информация о клиенте строго по левому краю */}
                <div className="user-info-block">
                  <h3>{u.fullName}</h3>
                  <p>📧 Email: {u.email}</p>
                  <p>📞 Телефон: {u.phone || 'Не указан'}</p>
                  <p>👤 Родитель: {u.parentName || 'Не указан'}</p>
                  <p className="text-emerald-700 font-semibold mt-1">🏊‍♂️ Абонемент: {u.activeSubscription || 'Нет активных'}</p>
                </div>

                {/* Статус медосмотра и кнопка действий */}
                <div className="admin-actions-block">
                  {/* Зелёный или красный статус медосмотра */}
                  <div className={`medical-status-badge ${isValid ? 'valid' : 'expired'}`}>
                    {isValid ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    <div>
                      <span>Медосмотр: {isValid ? 'Действителен' : 'Истек'}</span>
                      {expiryText && <small className="block text-[10px] opacity-80"><br/>до {expiryText}</small>}
                    </div>
                  </div>

                  <button 
                    type="button"
                    onClick={() => setEditingUser(u)}
                    className="btn-edit-admin"
                  >
                    <Edit className="w-4 h-4" /> Редактировать
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Модальное окно редактирования */}
      {editingUser && (
        <div className="modal-admin-overlay" onClick={() => setEditingUser(null)}>
          <div className="modal-admin-card" onClick={e => e.stopPropagation()}>
            <button 
              type="button" 
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 bg-transparent border-0 cursor-pointer" 
              onClick={() => setEditingUser(null)}
            >
              <X className="w-5 h-5" />
            </button>
            
            <h2>Редактирование клиента</h2>
            
            <form onSubmit={handleSaveUser}>
              <div className="form-group-admin">
                <label>ФИО ученика</label>
                <input 
                  type="text" 
                  value={editingUser.fullName || ''} 
                  onChange={e => setEditingUser({ ...editingUser, fullName: e.target.value })}
                  required 
                />
              </div>

              <div className="form-group-admin">
                <label>Телефон</label>
                <input 
                  type="text" 
                  value={editingUser.phone || ''} 
                  onChange={e => setEditingUser({ ...editingUser, phone: e.target.value })} 
                />
              </div>

              <div className="form-group-admin">
                <label>ФИО родителя</label>
                <input 
                  type="text" 
                  value={editingUser.parentName || ''} 
                  onChange={e => setEditingUser({ ...editingUser, parentName: e.target.value })} 
                />
              </div>

              <div className="form-group-admin">
                <label>Дата выдачи медосмотра (действует 6 месяцев)</label>
                <input 
                  type="date" 
                  value={formatDateForInput(editingUser.medicalCheckDate)} 
                  onChange={e => setEditingUser({ ...editingUser, medicalCheckDate: e.target.value })} 
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel-admin" onClick={() => setEditingUser(null)}>Отмена</button>
                <button type="submit" className="btn-save-admin">Сохранить</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
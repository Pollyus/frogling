import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, CheckCircle, XCircle, Edit, Calendar, User, Phone, X } from 'lucide-react';
import './AdminPanel.css';

const API_URL = 'https://localhost:7026/api';

export default function AdminPanel() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null); // Клиент, которого сейчас редактируют

  // Загрузка клиентов
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
      if (!res.ok) throw new Error('Нет доступа');
      return res.json();
    })
    .then(data => {
      setUsers(data);
      setLoading(false);
    })
    .catch(err => {
      alert('Доступ запрещен.');
      navigate('/');
    });
  };

  useEffect(() => {
    fetchUsers();
  }, [navigate]);

  // Сохранение отредактированного клиента
  const handleSaveUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('auth_token');
    try {
    const response = await fetch(`${API_URL}/admin/users/${editingUser.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
          fullName: editingUser.fullName,
          phone: editingUser.phone || '',
          parentName: editingUser.parentName || '',
          // Если дата выбрана, отправляем её, иначе null
          medicalCheckDate: editingUser.medicalCheckDate ? new Date(editingUser.medicalCheckDate).toISOString() : null
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Ошибка при сохранении');
      }
      alert('Данные клиента успешно обновлены!');
      setEditingUser(null);
      fetchUsers(); // Перезагружаем список в таблице
      } catch (err) {
        console.error(err);
        alert(err.message || 'Не удалось сохранить изменения.');
      }
  };

  if (loading) return <div className="p-8 text-center">Загрузка панели администратора...</div>;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 className="admin-title">
          <Shield className="w-7 h-7 text-emerald-600" /> Управление клиентами
        </h1>
        <span className="admin-badge">
          Режим Администратора
        </span>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          Список зарегистрированных учеников ({users.length})
        </div>
        
        <div className="divide-y divide-slate-100">
          {users.map(u => {
            // Расчет окончания медосмотра (+6 месяцев)
            const checkDate = u.medicalCheckDate ? new Date(u.medicalCheckDate) : null;
            const expiryDate = checkDate ? new Date(new Date(checkDate).setMonth(checkDate.getMonth() + 6)) : null;
            const isValid = expiryDate ? expiryDate > new Date() : false;

            return (
              <div key={u.id} className="admin-user-row">
                <div className="user-info-block">
                  <h3>{u.fullName}</h3>
                  <p>📧 {u.email} | 📞 {u.phone || 'Телефон не указан'}</p>
                  <p>👤 Родитель: {u.parentName || 'Не указан'}</p>
                  <p className="text-emerald-700 font-semibold mt-1">🏊‍♂️ Абонемент: {u.activeSubscription || 'Нет активных'}</p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {/* Статус медосмотра (Автоматический расчет) */}
                  <div className={`medical-status-badge ${isValid ? 'valid' : 'expired'}`}>
                    {isValid ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    <span>
                      Медосмотр: {isValid ? 'Действителен' : 'Истек'} 
                      {expiryDate && <small className="block text-[10px] opacity-80">до {expiryDate.toLocaleDateString('ru-RU')}</small>}
                    </span>
                  </div>

                  {/* Кнопка ручного редактирования */}
                  <button 
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

      {/* Модальное окно редактирования клиента */}
      {editingUser && (
        <div className="modal-admin-overlay" onClick={() => setEditingUser(null)}>
          <div className="modal-admin-card" onClick={e => e.stopPropagation()}>
            <button className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 bg-transparent border-0 cursor-pointer" onClick={() => setEditingUser(null)}>
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
                <label>Дата выдачи медосмотра (срок: 6 месяцев)</label>
                <input 
                  type="date" 
                  value={editingUser.medicalCheckDate ? editingUser.medicalCheckDate.split('T')[0] : ''} 
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
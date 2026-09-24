import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Shield, Calendar, CheckCircle, XCircle, Edit, Trash2 } from 'lucide-react';

const API_URL = 'https://localhost:7026/api';

export default function AdminPanel() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Проверка прав администратора при загрузке
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userStr = localStorage.getItem('user');
    
    // Здесь можно дополнительно проверить роль из localStorage или декодировать JWT
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
      alert('Доступ запрещен. Вы не администратор.');
      navigate('/');
    });
  }, [navigate]);

  // Функция изменения статуса медосмотра
  const toggleMedicalCheck = async (userId, currentStatus) => {
    const token = localStorage.getItem('auth_token');
    const targetUser = users.find(u => u.id === userId);
    
    const updated = {
      fullName: targetUser.fullName,
      phone: targetUser.phone || '',
      parentName: targetUser.parentName || '',
      isMedicalCheckValid: !currentStatus
    };

    const res = await fetch(`${API_URL}/admin/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(updated)
    });

    if (res.ok) {
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, isMedicalCheckValid: !currentStatus } : u));
    }
  };

  if (loading) return <div className="p-8 text-center">Загрузка панели администратора...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Shield className="text-emerald-600" /> Панель администратора бассейном
        </h1>
        <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full">
          Администратор
        </span>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-sm text-slate-700">
          Управление учетными записями клиентов ({users.length})
        </div>
        
        <div className="divide-y divide-slate-100">
          {users.map(u => (
            <div key={u.id} className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-slate-50/50">
              <div>
                <h3 className="font-bold text-slate-900">{u.fullName}</h3>
                <p className="text-xs text-slate-500">{u.email} | Телефон: {u.phone || 'Не указан'}</p>
                <p className="text-xs text-emerald-600 font-medium mt-1">Абонемент: {u.activeSubscription || 'Нет активных'}</p>
              </div>

              <div className="flex items-center gap-4">
                {/* Статус медосмотра */}
                <button 
                  onClick={() => toggleMedicalCheck(u.id, u.isMedicalCheckValid)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1 ${
                    u.isMedicalCheckValid ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  {u.isMedicalCheckValid ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                  Медосмотр: {u.isMedicalCheckValid ? 'Действителен' : 'Просрочен'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
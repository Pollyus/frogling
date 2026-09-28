import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Tag, Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import '../BuyService/ServicesPage.css';
import PromoModal from './PromoModal/PromoModal';

const API_URL = 'https://localhost:7026/api';

export default function PromosPage() {
  const navigate = useNavigate();
  const [promos, setPromos] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    discountAmount: '',
    discountPercentage: '',
    targetUserIds: [], // Массив ID пользователей
    colorTheme: 'emerald',
    isActive: true
  });

  const fetchPromos = useCallback(async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const endpoint = isAdmin ? `${API_URL}/admin/promotions` : `${API_URL}/promotions`;
      const res = await fetch(endpoint, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setPromos(data);
      }
    } catch (err) {
      console.error('Ошибка загрузки акций:', err);
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);
  
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setIsAdmin(user.role === 'Admin' || user.Role === 'Admin');
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    fetchPromos();
    if (isAdmin) {
      const token = localStorage.getItem('auth_token');
      fetch(`${API_URL}/admin/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setUsers(data); })
      .catch(() => {});
    }
  }, [fetchPromos, isAdmin]);

  const handleOpenCreate = () => {
    setEditingPromo(null);
    setFormData({
      title: '',
      description: '',
      discountAmount: '',
      discountPercentage: '',
      targetUserIds: [],
      colorTheme: 'emerald',
      isActive: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (promo) => {
    setEditingPromo(promo);
    // Преобразуем строку из базы ("id1,id2") в массив строк
    let idsArray = [];
    if (promo.targetUserIds) {
      idsArray = promo.targetUserIds.split(',').map(id => id.trim()).filter(Boolean);
    }

    setFormData({
      title: promo.title || '',
      description: promo.description || '',
      discountAmount: promo.discountAmount ?? '',
      discountPercentage: promo.discountPercentage ?? '',
      targetUserIds: idsArray,
      colorTheme: promo.colorTheme || 'emerald',
      isActive: promo.isActive ?? true
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('auth_token');

    if (!token) {
      alert('Сессия истекла. Войдите заново.');
      return;
    }

    const method = editingPromo ? 'PUT' : 'POST';
    const url = editingPromo ? `${API_URL}/admin/promotions/${editingPromo.id}` : `${API_URL}/admin/promotions`;

    const payload = {
      title: formData.title.trim(),
      description: formData.description ? formData.description.trim() : '',
      discountAmount: formData.discountAmount !== '' && !isNaN(formData.discountAmount) ? parseFloat(formData.discountAmount) : null,
      discountPercentage: formData.discountPercentage !== '' && !isNaN(formData.discountPercentage) ? parseFloat(formData.discountPercentage) : null,
      targetUserIds: formData.targetUserIds || [],
      colorTheme: formData.colorTheme || 'emerald',
      isActive: Boolean(formData.isActive)
    };

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const responseData = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(responseData.message || 'Ошибка сохранения акции');
      }

      alert(editingPromo ? 'Акция успешно обновлена!' : 'Акция успешно создана!');
      setIsModalOpen(false);
      fetchPromos();
    } catch (err) {
      alert(`Не удалось сохранить акцию:\n${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Вы действительно хотите удалить эту акцию?')) return;
    const token = localStorage.getItem('auth_token');
    try {
      const res = await fetch(`${API_URL}/admin/promotions/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        alert('Акция удалена!');
        fetchPromos();
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.message || 'Ошибка при удалении акции');
      }
    } catch (err) {
      alert('Ошибка соединения с сервером');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="services-page-container">
      <div className="services-hero-header">
        <h1>Специальные предложения и акции</h1>
        <p>Скидки на абонементы и персональные предложения для клиентов бассейна</p>
      </div>

      {isAdmin && (
        <div className="admin-add-section" style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <button
            type="button"
            onClick={handleOpenCreate}
            className="btn-admin-add-big"
          >
            <Plus className="w-5 h-5" /> Добавить новую акцию
          </button>
        </div>
      )}

      <div className="services-grid-layout">
        {promos.length > 0 ? (
          promos.map((promo) => {
            const isBlue = promo.colorTheme === 'blue';
            const isAmber = promo.colorTheme === 'amber';
            let iconBg = 'icon-bg-emerald';
            let borderTheme = 'border-emerald';

            if (isBlue) { iconBg = 'icon-bg-blue'; borderTheme = 'border-blue'; }
            else if (isAmber) { iconBg = 'icon-bg-amber'; borderTheme = 'border-amber'; }

            // Проверяем, персональная ли акция
            const hasTargets = promo.targetUserIds && promo.targetUserIds.trim().length > 0;

            return (
              <div key={promo.id} className={`service-plan-card ${borderTheme}`}>
                <div className="service-card-body">
                  <div className="service-card-top-row">
                    <div className={`service-plan-icon ${iconBg}`}>
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>

                    {/* Разделенные кнопки редактирования и удаления без наложения */}
                    {isAdmin && (
                      <div className="promo-card-actions">
                        <button type="button" onClick={() => handleOpenEdit(promo)} aria-label="Редактировать">
                          <Edit size={18} />
                        </button>
                        <button type="button" onClick={() => handleDelete(promo.id)} aria-label="Удалить">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    )}
                  </div>

                  <h3 className="service-plan-title">{promo.title}</h3>

                  <div className="service-plan-price" style={{ color: '#d97706' }}>
                    {promo.discountAmount ? `-${promo.discountAmount} ₽` : promo.discountPercentage ? `-${promo.discountPercentage}%` : 'Спецпредложение'}
                  </div>

                  <p className="service-plan-description">{promo.description}</p>
                </div>

                <div className="service-card-footer">
                  <div className="service-lessons-badge">
                    <Tag className="w-4 h-4 text-amber-600" />
                    <span>{hasTargets ? 'Персональная акция' : 'Общая акция'}</span>
                  </div>
                  {!isAdmin && (
                    <button
                        type="button"
                        onClick={() => navigate('/services')}
                        className="btn-plan-action btn-plan-select"
                    >
                        К услугам
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-schedule" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#64748b' }}>
            Активных акций в данный момент нет.
          </div>
        )}
      </div>

      <PromoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingPromo={editingPromo}
        formData={formData}
        setFormData={setFormData}
        users={users}
        handleSave={handleSave}
      />
    </div>
  );
}

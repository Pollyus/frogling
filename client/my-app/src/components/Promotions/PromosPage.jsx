import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Tag, Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import '../BuyService/ServicesPage.css'
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
    targetUserId: '',
    colorTheme: 'emerald',
    isActive: true
  });

  const fetchPromos = useCallback(async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const endpoint = isAdmin ? `${API_URL}/promotions/admin` : `${API_URL}/promotions`;
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
      targetUserId: '',
      colorTheme: 'emerald',
      isActive: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (promo) => {
    setEditingPromo(promo);
    setFormData({
      title: promo.title || '',
      description: promo.description || '',
      discountAmount: promo.discountAmount ?? '',
      discountPercentage: promo.discountPercentage ?? '',
      targetUserId: promo.targetUserId || '',
      colorTheme: promo.colorTheme || 'emerald',
      isActive: promo.isActive ?? true
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('auth_token');

    if (!token) {
      alert('Ошибка авторизации. Пожалуйста, войдите снова.');
      return;
    }

    const method = editingPromo ? 'PUT' : 'POST';
    const url = editingPromo ? `${API_URL}/promotions/${editingPromo.id}` : `${API_URL}/promotions`;

    const cleanTargetUserId = formData.targetUserId && formData.targetUserId.trim() !== ''
      ? formData.targetUserId.trim()
      : null;

    const payload = {
      title: formData.title.trim(),
      description: formData.description ? formData.description.trim() : '',
      discountAmount: formData.discountAmount !== '' && !isNaN(formData.discountAmount) ? parseFloat(formData.discountAmount) : null,
      discountPercentage: formData.discountPercentage !== '' && !isNaN(formData.discountPercentage) ? parseFloat(formData.discountPercentage) : null,
      targetUserId: cleanTargetUserId,
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
        let errorMsg = responseData.message || 'Ошибка сохранения акции';
        if (responseData.errors) {
          const validationDetails = Object.values(responseData.errors).flat().join('\n');
          errorMsg += `:\n${validationDetails}`;
        }
        throw new Error(errorMsg);
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
      const res = await fetch(`${API_URL}/promotions/${id}`, {
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

            return (
              <div key={promo.id} className={`service-plan-card ${borderTheme}`}>
                <div className="service-card-body">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div className={`service-plan-icon ${iconBg}`}>
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>

                    {isAdmin && (
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(promo)}
                          className="btn-plan-action btn-plan-edit"
                          style={{ padding: '8px' }}
                          title="Редактировать"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(promo.id)}
                          className="btn-delete-service"
                          title="Удалить"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  <h3 className="service-plan-title">{promo.title}</h3>

                  <div className="service-plan-price" style={{ color: '#d97706' }}>
                    {promo.discountAmount ? `-${promo.discountAmount} ₽` : promo.discountPercentage ? `-${promo.discountPercentage}%` : 'Спецпредложение'}
                  </div>

                  <p className="service-plan-description">{promo.description}</p>

                  {isAdmin && promo.targetUser && (
                    <div style={{ fontSize: '11px', background: '#f1f5f9', padding: '6px 10px', borderRadius: '8px', color: '#475569', marginTop: '8px' }}>
                      👤 Персонально для: <strong>{promo.targetUser.fullName}</strong>
                    </div>
                  )}
                </div>

                <div className="service-card-footer">
                  <div className="service-lessons-badge">
                    <Tag className="w-4 h-4 text-amber-600" />
                    <span>{promo.targetUser ? 'Персональная акция' : 'Общая акция'}</span>
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

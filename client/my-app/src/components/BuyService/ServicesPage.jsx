import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, CreditCard, Droplet, Users, Star, X, Loader2, Plus, Trash2, Edit } from 'lucide-react';
import './ServicesPage.css';
import ServiceAddModal from './ServiceModal/ServiceAddModal';
import ServiceEditModal from './ServiceModal/ServiceEditModal';

const API_URL = 'https://localhost:7026/api';

const getServiceIcon = (theme) => {
  switch (theme) {
    case 'blue': return <Users className="w-6 h-6 text-white" />;
    case 'amber': return <Star className="w-6 h-6 text-white" />;
    default: return <Droplet className="w-6 h-6 text-white" />;
  }
};

export default function ServicesPage() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSub, setSelectedSub] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCreatingService, setIsCreatingService] = useState(false);
  const [promotions, setPromotions] = useState([]);
  const [selectedPromoId, setSelectedPromoId] = useState('');
  const [editingPlan, setEditingPlan] = useState(null);

  const fetchServices = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/services`);
      if (!response.ok) throw new Error('Ошибка загрузки услуг');
      const data = await response.json();
      if (Array.isArray(data)) setPlans(data);
    } catch (err) {
      console.error('Ошибка:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

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
    fetch(`${API_URL}/promotions`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setPromotions(data);
      })
      .catch(err => console.error('Ошибка загрузки акций:', err));
  }, []);

  const handleSavePlan = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('auth_token');

    try {
      const res = await fetch(`${API_URL}/admin/services/${editingPlan.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: editingPlan.title,
          price: parseFloat(editingPlan.price) || 0,
          lessonsCount: parseInt(editingPlan.lessonsCount) || 1,
          durationDays: parseInt(editingPlan.durationDays) || 30,
          description: editingPlan.description || '',
          category: editingPlan.category || 'Разовые',
          colorTheme: editingPlan.colorTheme || 'emerald'
        })
      });

      if (!res.ok) throw new Error('Не удалось обновить услугу');

      alert('Услуга успешно обновлена!');
      setEditingPlan(null);
      fetchServices();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteService = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm('Вы действительно хотите удалить эту услугу?')) return;

    const token = localStorage.getItem('auth_token');
    try {
      const res = await fetch(`${API_URL}/admin/services/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        alert('Услуга успешно удалена!');
        fetchServices();
      } else {
        alert('Ошибка при удалении на сервере');
      }
    } catch (err) {
      alert('Ошибка соединения с сервером');
    }
  };

  const handleSelectPlan = (plan) => {
    setSelectedSub(plan);
  };

  const handlePurchase = async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      alert('Для покупки абонемента необходимо войти в систему.');
      navigate('/login');
      return;
    }

    setIsProcessing(true);
    try {
      const response = await fetch(`${API_URL}/subscriptions/buy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          servicePlanId: selectedSub.id,
          promotionId: selectedPromoId ? parseInt(selectedPromoId) : null
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Не удалось оформить покупку');

      alert(data.message || 'Абонемент успешно активирован!');
      setSelectedSub(null);
      setSelectedPromoId('');
      navigate('/profile');
    } catch (err) {
      alert(err.message || 'Ошибка при оплате.');
    } finally {
      setIsProcessing(false);
    }
  };

  const calculateFinalPrice = () => {
    if (!selectedSub) return 0;
    let price = selectedSub.price;

    if (selectedPromoId) {
      const promo = promotions.find(p => p.id === parseInt(selectedPromoId));
      if (promo) {
        if (promo.discountAmount) {
          price = Math.max(0, price - promo.discountAmount);
        } else if (promo.discountPercentage) {
          price = Math.max(0, price - (price * promo.discountPercentage / 100));
        }
      }
    }
    return price;
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
        <h1>Услуги и абонементы</h1>
        <p>Выберите подходящий формат занятий в бассейне «Лягушонок»</p>
      </div>

      {isAdmin && (
        <div className="admin-add-section" style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <button
            type="button"
            onClick={() => setIsCreatingService(true)}
            className="btn-admin-add-big"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: '#74b83b', color: 'white', borderRadius: '14px', fontWeight: '700', border: 'none', cursor: 'pointer' }}
          >
            <Plus className="w-5 h-5" /> Добавить новую услугу
          </button>
        </div>
      )}

      <div className="services-grid-layout">
        {plans.map((plan) => {
          const isFamily = plan.colorTheme === 'blue' || plan.title.toLowerCase().includes('семей');
          const isAmber = plan.colorTheme === 'amber';

          let iconBg = 'icon-bg-emerald';
          let borderTheme = 'border-emerald';

          if (isFamily) {
            iconBg = 'icon-bg-blue';
            borderTheme = 'border-blue';
          } else if (isAmber) {
            iconBg = 'icon-bg-amber';
            borderTheme = 'border-amber';
          }

          return (
            <div key={plan.id} className={`service-plan-card ${borderTheme}`}>
              <div className="service-card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div className={`service-plan-icon ${iconBg}`}>
                    {getServiceIcon(plan.colorTheme)}
                  </div>

                  {isAdmin && (
                    <button
                      type="button"
                      onClick={(e) => handleDeleteService(e, plan.id)}
                      style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', padding: '8px', borderRadius: '10px', cursor: 'pointer' }}
                      title="Удалить услугу"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <h3 className="service-plan-title">{plan.title}</h3>

                <div className="service-plan-price">
                  {plan.price > 0 ? (
                    <>
                      <span>{plan.price.toLocaleString('ru-RU')}</span> ₽
                    </>
                  ) : (
                    <span className="text-free">Бесплатно</span>
                  )}
                </div>

                <p className="service-plan-description">{plan.description}</p>
              </div>

              <div className="service-card-footer">
                <div className="service-lessons-badge">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>
                    {plan.lessonsCount} {plan.lessonsCount === 1 ? 'занятие' : plan.lessonsCount < 5 ? 'занятия' : 'занятий'}
                  </span>
                </div>

                {isAdmin ? (
                  <button
                    type="button"
                    onClick={() => setEditingPlan(plan)}
                    className="btn-plan-action btn-plan-edit"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Редактировать</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSelectPlan(plan)}
                    className="btn-plan-action btn-plan-select"
                  >
                    Выбрать
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {isCreatingService && (
        <ServiceAddModal
          onClose={() => setIsCreatingService(false)}
          onSaveSuccess={() => {
            setIsCreatingService(false);
            fetchServices();
          }}
        />
      )}

      {/* Вынесенная модалка редактирования */}
      <ServiceEditModal
        editingPlan={editingPlan}
        setEditingPlan={setEditingPlan}
        handleSavePlan={handleSavePlan}
      />

      {/* Модальное окно покупки (оформления) абонемента в едином стиле */}
      {selectedSub && (
        <div className="modal-admin-overlay" onClick={() => !isProcessing && setSelectedSub(null)}>
          <div className="modal-admin-card" onClick={(e) => e.stopPropagation()}>
            <button 
              type="button"
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 bg-transparent border-0 cursor-pointer" 
              onClick={() => setSelectedSub(null)}
              disabled={isProcessing}
            >
              <X className="w-5 h-5" />
            </button>
            
            <h2>Оформление абонемента</h2>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '16px' }}>
              Вы выбрали: <strong>«{selectedSub.title}»</strong>
            </p>
            <p style={{ color: '#334155', fontSize: '14px', marginBottom: '16px' }}>
              Базовая цена: <strong>{selectedSub.price} ₽</strong>
            </p>

            {promotions.length > 0 && (
              <div className="form-group-admin">
                <label>Применить акцию</label>
                <select
                  value={selectedPromoId}
                  onChange={(e) => setSelectedPromoId(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-xl bg-white"
                >
                  <option value="">Без акции (полная стоимость)</option>
                  {promotions.map(promo => (
                    <option key={promo.id} value={promo.id}>
                      {promo.title} ({promo.discountAmount ? `-${promo.discountAmount}₽` : `-${promo.discountPercentage}%`})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div style={{ fontSize: '20px', fontWeight: '800', color: '#74b83b', margin: '20px 0' }}>
              Итого к оплате: {calculateFinalPrice()} ₽
            </div>

            <div className="modal-actions">
              <button 
                type="button" 
                className="btn-cancel-admin" 
                onClick={() => setSelectedSub(null)}
                disabled={isProcessing}
              >
                Отмена
              </button>
              <button 
                type="button" 
                className="btn-save-admin"
                onClick={handlePurchase}
                disabled={isProcessing}
              >
                {isProcessing ? 'Оплата...' : 'Оплатить'}
              </button>
            </div>
            
            <p className="secure-text" style={{ textAlign: 'center', fontSize: '11px', color: '#94a3b8', marginTop: '16px' }}>
              Безопасная оплата через шлюз Frogling
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

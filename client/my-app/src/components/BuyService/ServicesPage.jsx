import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, CreditCard, Droplet, Users, Star, X, Loader2, Plus, Trash2 } from 'lucide-react';
import './ServicesPage.css';
import ServiceAddModal from './ServiceModal/ServiceAddModal';

const API_URL = 'https://localhost:7026/api';

const getServiceIcon = (theme) => {
  switch (theme) {
    case 'blue': return <Users className="w-6 h-6" />;
    case 'amber': return <Star className="w-6 h-6" />;
    default: return <Droplet className="w-6 h-6" />;
  }
};

export default function ServicesPage() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSub, setSelectedSub] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCreatingService, setIsCreatingService] = useState(false);
  const [promotions, setPromotions] = useState([]);
  const [selectedPromoId, setSelectedPromoId] = useState('');

  // ВЫНОСИМ ФУНКЦИЮ НАРУЖУ, чтобы она была доступна везде
  const fetchServices = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/services`);
      if (!response.ok) throw new Error('Ошибка загрузки услуг');
      const data = await response.json();
      setServices(data);
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

  // Загрузка акций
  useEffect(() => {
    fetch(`${API_URL}/promotions`) // Замени на твой эндпоинт промоакций
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setPromotions(data);
      })
      .catch(err => console.error('Ошибка загрузки акций:', err));
  }, []);

  const handleDeleteService = async (e, id) => {
    e.stopPropagation(); // ВАЖНО: предотвращаем открытие модалки оплаты при нажатии на корзину
    if (!window.confirm('Вы действительно хотите удалить эту услугу?')) return;
    
    const token = localStorage.getItem('auth_token');
    try {
      const res = await fetch(`${API_URL}/admin/services/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        alert('Услуга удалена!');
        fetchServices(); // Теперь функция доступна
      } else {
        alert('Ошибка при удалении на сервере');
      }
    } catch (err) {
      alert('Ошибка соединения с сервером');
    }
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
          title: selectedSub.title || selectedSub.name,
          price: selectedSub.price,
          totalLessons: selectedSub.lessonsCount || selectedSub.totalLessons,
          daysValid: selectedSub.durationDays || 30,
          promotionId: selectedPromoId ? parseInt(selectedPromoId) : null // Передаем ID акции
        }),
      });

      if (!response.ok) throw new Error('Не удалось оформить покупку');

      alert(`Абонемент успешно оплачен!`);
      setSelectedSub(null);
      setSelectedPromoId('');
      navigate('/profile');
    } catch (err) {
      alert('Ошибка при оплате. Попробуйте еще раз.');
    } finally {
      setIsProcessing(false);
    }
  };


  if (loading) {
    return (
      <div className="services-loading">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
        <p>Загрузка каталога услуг...</p>
      </div>
    );
  } 

  // Функция расчета цены с учетом выбранной акции
  const calculateFinalPrice = () => {
    if (!selectedSub) return 0;
    let price = selectedSub.price;

    if (selectedPromoId) {
      const promo = promotions.find(p => p.id === parseInt(selectedPromoId));
      if (promo) {
        // Если скидка в рублях (promo.discountAmount) или процентах (promo.discountPercentage)
        if (promo.discountAmount) {
          price = Math.max(0, price - promo.discountAmount);
        } else if (promo.discountPercentage) {
          price = Math.max(0, price - (price * promo.discountPercentage / 100));
        }
      }
    }
    return price;
  };



  return (
    <div className="services-container">
      <div className="services-header">
        <h1>Услуги и абонементы бассейна</h1>
        <p>Выберите программу плавания для вашего ребенка</p>
      </div>

      <div className="services-page">
        {isAdmin && (
          <div className="admin-add-section">
            <button
              type="button"
              onClick={() => setIsCreatingService(true)}
              className="btn-admin-add-big"
            >
              <Plus className="w-5 h-5" /> Добавить новую услугу
            </button>
          </div>
        )}

        <div className="subs-grid">
          {services.map((sub) => (
            <div 
              key={sub.id} 
              className={`sub-card border-${sub.colorTheme || 'emerald'}`}
              onClick={() => setSelectedSub(sub)}
            >
              {/* Кнопка удаления для админа (с e.stopPropagation) */}
              {isAdmin && (
                <button 
                  onClick={(e) => handleDeleteService(e, sub.id)}
                  className="btn-delete-service"
                  title="Удалить услугу"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}

              <div className={`sub-card-icon bg-${sub.colorTheme || 'emerald'}`}>
                {getServiceIcon(sub.colorTheme)}
              </div>
              
              <h3 className="sub-card-title">{sub.title || sub.name}</h3>
              <div className="sub-card-price">{sub.price.toLocaleString('ru-RU')} ₽</div>
              <p className="sub-card-text">{sub.description}</p>
              
              <div className="sub-card-footer">
                <span>
                  <Check className="w-4 h-4" /> 
                  {(sub.lessonsCount || sub.totalLessons)} 
                  { (sub.lessonsCount || sub.totalLessons) === 1 ? ' занятие' : ' занятий'}
                </span>
                <button type="button" className="btn-buy-small">Выбрать</button>
              </div>
            </div>
          ))}
        </div>

        {/* Модалка создания */}
        {isCreatingService && (
          <ServiceAddModal
            onClose={() => setIsCreatingService(false)}
            onSaveSuccess={() => {
              setIsCreatingService(false);
              fetchServices(); // Теперь работает
            }}
          />
        )}

        {/* Модалка покупки (обновленная) */}
                {selectedSub && (
          <div className="modal-overlay" onClick={() => !isProcessing && setSelectedSub(null)}>
            <div className="purchase-modal" onClick={(e) => e.stopPropagation()}>
              <button className="close-modal" onClick={() => setSelectedSub(null)} disabled={isProcessing}>
                <X />
              </button>
              <div className="modal-content">
                <CreditCard className="w-12 h-12 text-emerald-600 mb-4 mx-auto" />
                <h2>Оформление абонемента</h2>
                <p>Вы выбрали: <strong>«{selectedSub.title || selectedSub.name}»</strong></p>
                <p className="modal-sub-details">
                   Базовая цена: <strong>{selectedSub.price} ₽</strong>
                </p>

                {/* ВЫБОР АКЦИИ / ПРОМОКОДА */}
                {promotions.length > 0 && (
                  <div className="form-group-admin" style={{ margin: '16px 0', textAlign: 'left' }}>
                    <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b' }}>Применить акцию:</label>
                    <select 
                      className="select-bar" 
                      style={{ width: '100%', marginTop: '6px' }}
                      value={selectedPromoId}
                      onChange={(e) => setSelectedPromoId(e.target.value)}
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

                {/* Итоговая цена */}
                <div className="price-total" style={{ fontSize: '24px', fontWeight: 'bold', color: '#74b83b', margin: '15px 0' }}>
                  Итого к оплате: {calculateFinalPrice()} ₽
                </div>
                
                <button 
                  className="btn-confirm-purchase" 
                  onClick={handlePurchase}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Проведение оплаты...' : `Оплатить ${calculateFinalPrice()} ₽`}
                </button>
                <p className="secure-text">Безопасная оплата через шлюз Frogling</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
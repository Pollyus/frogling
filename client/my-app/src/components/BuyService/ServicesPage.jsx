import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, CreditCard, Droplet, Users, Star, X, Loader2 } from 'lucide-react';
import './ServicesPage.css';

const API_URL = 'https://localhost:7026/api'; // Укажите ваш порт

// Хелпер подбора иконки по названию или теме
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

  // 1. Загружаем каталог услуг из базы данных
  useEffect(() => {
    const fetchServices = async () => {
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
    };

    fetchServices();
  }, []);

  // 2. Покупка выбранного абонемента с сохранением в БД
  const handlePurchase = async () => {
    const token = localStorage.getItem('auth_token');
    
    // Если пользователь не залогинен — отправляем на вход
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
          title: selectedSub.title,
          price: selectedSub.price,
          totalLessons: selectedSub.lessonsCount,
          daysValid: selectedSub.durationDays || 30
        }),
      });

      if (!response.ok) {
        throw new Error('Не удалось оформить покупку');
      }

      const result = await response.json();
      alert(`Абонемент "${selectedSub.title}" успешно оплачен и добавлен в личный кабинет!`);
      setSelectedSub(null);
      navigate('/profile'); // Переходим в профиль для просмотра

    } catch (err) {
      console.error(err);
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

  return (
    <div className="services-container">
      <div className="services-header">
        <h1>Услуги и абонементы бассейна</h1>
        <p>Выберите программу плавания для вашего ребенка</p>
      </div>

      {/* Динамическая сетка карточек из SQL Server */}
      <div className="subs-grid">
        {services.map((sub) => (
          <div 
            key={sub.id} 
            className={`sub-card border-${sub.colorTheme || 'emerald'}`}
            onClick={() => setSelectedSub(sub)}
          >
            <div className={`sub-card-icon bg-${sub.colorTheme || 'emerald'}`}>
              {getServiceIcon(sub.colorTheme)}
            </div>
            
            <h3 className="sub-card-title">{sub.title}</h3>
            <div className="sub-card-price">{sub.price.toLocaleString('ru-RU')} ₽</div>
            <p className="sub-card-text">{sub.description}</p>
            
            <div className="sub-card-footer">
              <span><Check className="w-4 h-4" /> {sub.lessonsCount} {sub.lessonsCount === 1 ? 'занятие' : 'занятий'}</span>
              <button type="button" className="btn-buy-small">Выбрать</button>
            </div>
          </div>
        ))}
      </div>

      {/* Модальное окно покупки */}
      {selectedSub && (
        <div className="modal-overlay" onClick={() => !isProcessing && setSelectedSub(null)}>
          <div className="purchase-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedSub(null)} disabled={isProcessing}>
              <X />
            </button>
            <div className="modal-content">
              <CreditCard className="w-12 h-12 text-emerald-600 mb-4 mx-auto" />
              <h2>Оформление абонемента</h2>
              <p>Вы выбрали: <strong>«{selectedSub.title}»</strong></p>
              <p className="modal-sub-details">Количество занятий: <strong>{selectedSub.lessonsCount}</strong></p>
              <div className="price-total">{selectedSub.price.toLocaleString('ru-RU')} ₽</div>
              
              <button 
                className="btn-confirm-purchase" 
                onClick={handlePurchase}
                disabled={isProcessing}
              >
                {isProcessing ? 'Проведение оплаты...' : 'Оплатить картой'}
              </button>
              <p className="secure-text">Безопасная оплата через шлюз Frogling</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
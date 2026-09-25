import React, { useState } from 'react';
import { X, CheckCircle2, CreditCard } from 'lucide-react';

export default function ServicePaymentModal({ service, onClose, onConfirmPayment }) {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [loading, setLoading] = useState(false);

  if (!service) return null;

  const handlePayClick = async () => {
    setLoading(true);
    // Имитация запроса на оплату / покупку абонемента
    await new Promise(resolve => setTimeout(resolve, 800));
    setLoading(false);
    onConfirmPayment(service, selectedMethod);
  };

  return (
    <div className="modal-admin-overlay" onClick={onClose}>
      <div className="payment-modal-card" onClick={e => e.stopPropagation()}>
        {/* Круглый крестик в углу */}
        <button className="modal-close-btn" onClick={onClose} title="Закрыть">
          <X className="w-5 h-5" />
        </button>

        <h2 className="payment-title">Оплата услуги</h2>

        <div className="schedule-info-preview mb-4">
          <div className="group-name-badge">{service.name}</div>
          <p className="text-sm text-slate-600 mt-1">{service.description}</p>
          <div className="text-emerald-700 font-extrabold text-lg mt-3">
            {service.price} ₽
          </div>
        </div>

        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Выберите способ оплаты:
        </p>

        <div className="payment-methods">
          <label className={`payment-method-option ${selectedMethod === 'card' ? 'selected' : ''}`}>
            <input 
              type="radio" 
              name="paymentMethod" 
              checked={selectedMethod === 'card'} 
              onChange={() => setSelectedMethod('card')} 
            />
            <CreditCard className="w-5 h-5 text-emerald-600" />
            <span className="payment-method-text">Банковская карта онлайн</span>
          </label>

          <label className={`payment-method-option ${selectedMethod === 'sbp' ? 'selected' : ''}`}>
            <input 
              type="radio" 
              name="paymentMethod" 
              checked={selectedMethod === 'sbp'} 
              onChange={() => setSelectedMethod('sbp')} 
            />
            <span className="text-lg">📱</span>
            <span className="payment-method-text">Система быстрых платежей (СБП)</span>
          </label>
        </div>

        {/* Красивая кнопка "Выбрать" / "Оплатить" в фирменном стиле */}
        <button 
          type="button" 
          onClick={handlePayClick} 
          disabled={loading}
          className="btn-payment-select"
        >
          <CheckCircle2 className="w-5 h-5" />
          {loading ? 'Обработка...' : `Оплатить ${service.price} ₽`}
        </button>
      </div>
    </div>
  );
}

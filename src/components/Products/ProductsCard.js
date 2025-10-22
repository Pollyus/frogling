// SubscriptionCard.js
import React from 'react';
import './SubscriptionCard.css'; // Optional: Create a SubscriptionCard.css for card-specific styles

function SubscriptionCard({ subscription }) {
  return (
    <div className="subscription-card">
      <img src={subscription.image} alt={subscription.name} />
      <h3>{subscription.name}</h3>
      <p>{subscription.description}</p>
    </div>
  );
}

export default SubscriptionCard;

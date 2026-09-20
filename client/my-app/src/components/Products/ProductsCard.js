// SubscriptionCard.js
import React from 'react';
import './SubscriptionCard.css'; // Optional: Create a SubscriptionCard.css for card-specific styles
import PriceDisplay from './PriceDiasplay';

function SubscriptionCard({ subscription }) {
  return (
    <div className="subscription-card">
      <img src={subscription.image} alt={subscription.name} />
      <h3>{subscription.name}</h3>
      <h4>{subscription.number_of_classes}</h4>
      {/* <p>{subscription.oldPrice}</p> */}
       <PriceDisplay subscription={subscription} /> 
    </div>
  );
}

export default SubscriptionCard;

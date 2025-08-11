import React, { useState } from 'react';
import { buyers as initialBuyers } from '../../mockData';
import BuyerCard from './BuyerCard';
import './SellerDashboard.css';

/**
 * The main dashboard for a seller, displaying potential buyer profiles.
 */
const SellerDashboard = () => {
  const [buyers, setBuyers] = useState(initialBuyers);

  const handleDecision = (buyerId) => {
    // In a real app, this would be an API call. Here, we just filter the list.
    setBuyers(currentBuyers => currentBuyers.filter(b => b.id !== buyerId));
  };

  if (buyers.length === 0) {
    return (
      <div className="seller-dashboard">
        <h1>Potential Buyers</h1>
        <div className="no-buyers-card">
          <h2>All Done!</h2>
          <p>You've reviewed all potential buyers for now. We'll notify you when new buyers match your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="seller-dashboard">
      <h1>Potential Buyers</h1>
      <p className="dashboard-subtitle">Review these verified buyers who are interested in businesses like yours.</p>
      <div className="buyer-cards-container">
        {buyers.map(buyer => (
          <BuyerCard key={buyer.id} buyer={buyer} onDecision={handleDecision} />
        ))}
      </div>
    </div>
  );
};

export default SellerDashboard;


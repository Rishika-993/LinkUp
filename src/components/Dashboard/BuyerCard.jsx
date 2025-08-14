import React from "react";
import { useNavigate } from "react-router-dom";
import "./BuyerCard.css";

/**
 * A card representing a potential buyer for a seller to review.
 * @param {object} props
 * @param {object} props.buyer - The buyer data object.
 * @param {(id: number) => void} props.onDecision - Callback for accepting or rejecting.
 */
const BuyerCard = ({ buyer, onDecision }) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/buyer/${buyer.id}`);
  };

  const handleActionClick = (e, action) => {
    e.stopPropagation(); // Prevent navigation when clicking a button
    action(buyer.id);
  };

  return (
    <div className="buyer-card" onClick={handleViewProfile}>
      <div className="buyer-card-header">
        <img src={buyer.imageUrl} alt={buyer.name} className="buyer-avatar" />
        <div className="buyer-info">
          <h3 className="buyer-name">
            {buyer.name}{" "}
            {buyer.isVerified && (
              <span className="verified-badge" title="Verified Buyer">
                ✔
              </span>
            )}
          </h3>
          <p className="buyer-headline">{buyer.headline}</p>
        </div>
      </div>
      <div className="buyer-card-body">
        <div className="buyer-metric">
          <span className="metric-label">Investment Range</span>
          <span className="metric-value">{buyer.investmentRange}</span>
        </div>
        <div className="buyer-metric">
          <span className="metric-label">Industries</span>
          <div className="industry-tags">
            {buyer.industries.slice(0, 3).map((industry) => (
              <span key={industry} className="tag">
                {industry}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="buyer-card-actions">
        <button
          onClick={(e) => handleActionClick(e, onDecision)}
          className="btn-reject"
        >
          Reject
        </button>
        <button
          onClick={(e) => handleActionClick(e, onDecision)}
          className="btn-accept"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default BuyerCard;

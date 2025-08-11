import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { buyers } from '../../mockData';
import './BuyerProfile.css';

/**
 * Displays the full, detailed profile of a single buyer.
 */
const BuyerProfile = () => {
  const { id } = useParams();
  const buyer = buyers.find(b => b.id === parseInt(id));

  if (!buyer) {
    return (
      <div className="profile-container not-found">
        <h2>Buyer not found</h2>
        <p>The buyer you are looking for does not exist or has been removed.</p>
        <Link to="/dashboard" className="btn-primary">Back to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={buyer.imageUrl} alt={buyer.name} className="profile-avatar" />
        <div className="profile-header-info">
          <h1 className="profile-name">
            {buyer.name} {buyer.isVerified && <span className="verified-badge" title="Verified Buyer">✔</span>}
          </h1>
          <p className="profile-headline">{buyer.headline}</p>
          <div className="profile-key-metrics">
            <span><strong>Range:</strong> {buyer.investmentRange}</span>
            <span><strong>Industries:</strong> {buyer.industries.join(', ')}</span>
          </div>
        </div>
      </div>

      <div className="profile-body">
        <div className="profile-section">
          <h3>About</h3>
          <p>{buyer.bio}</p>
        </div>

        <div className="profile-section">
          <h3>Investment Thesis</h3>
          <p>{buyer.investmentThesis}</p>
        </div>

        <div className="profile-section">
          <h3>Professional Experience</h3>
          <ul className="experience-list">
            {buyer.experience.map((exp, index) => (
              <li key={index} className="experience-item">
                <strong>{exp.role}</strong>
                {exp.company && <span> at {exp.company}</span>}
                {exp.years && <span className="experience-years">{exp.years}</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BuyerProfile;


import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { buyers } from '../../mockData';
import './BuyerProfile.css';

/**
 * Displays the full, detailed profile of a single buyer.
 */
const BuyerProfile = () => {
  const { id } = useParams();
  const buyer = buyers.find(b => b.id === parseInt(id));
  const [activeTab, setActiveTab] = useState('overview');

  if (!buyer) {
    return (
      <div className="profile-container not-found">
        <h2>Buyer not found</h2>
        <p>The buyer you are looking for does not exist or has been removed.</p>
        <Link to="/dashboard" className="btn-primary">Back to Dashboard</Link>
      </div>
    );
  }

  const renderOverviewTab = () => (
    <div className="profile-overview">
      <div className="profile-section">
        <h3>About</h3>
        <p className="section-content">{buyer.bio}</p>
      </div>

      <div className="profile-metrics">
        <div className="metric-card">
          <span className="metric-label">Investment Range</span>
          <span className="metric-value">{buyer.investmentRange}</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Verification Status</span>
          <span className="metric-value status">
            {buyer.isVerified ? '✅ Verified' : '⏳ Pending'}
          </span>
        </div>
      </div>

      <div className="profile-section">
        <h3>Investment Focus</h3>
        <div className="industries-grid">
          {buyer.industries.map((industry, index) => (
            <span key={index} className="industry-tag">{industry}</span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderExperienceTab = () => (
    <div className="profile-experience">
      <div className="timeline">
        {buyer.experience.map((exp, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <h4>{exp.role}</h4>
              {exp.company && (
                <p className="company">
                  <span className="company-name">{exp.company}</span>
                  {exp.years && <span className="years">{exp.years}</span>}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderThesisTab = () => (
    <div className="profile-thesis">
      <div className="thesis-card">
        <h3>Investment Philosophy</h3>
        <p>{buyer.investmentThesis}</p>
      </div>
    </div>
  );

  return (
    <div className="profile-container">
      <nav className="profile-nav">
        <Link to="/dashboard" className="back-button">
          ← Back to Dashboard
        </Link>
      </nav>

      <div className="profile-header">
        <div className="profile-banner">
          <img src={buyer.imageUrl} alt={buyer.name} className="profile-avatar" />
          <div className="profile-header-info">
            <h1 className="profile-name">
              {buyer.name}
              {buyer.isVerified && (
                <span className="verified-badge" title="Verified Buyer">✓</span>
              )}
            </h1>
            <p className="profile-headline">{buyer.headline}</p>
          </div>
        </div>

        <div className="profile-tabs">
          <button 
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab-button ${activeTab === 'experience' ? 'active' : ''}`}
            onClick={() => setActiveTab('experience')}
          >
            Experience
          </button>
          <button 
            className={`tab-button ${activeTab === 'thesis' ? 'active' : ''}`}
            onClick={() => setActiveTab('thesis')}
          >
            Investment Thesis
          </button>
        </div>
      </div>

      <div className="profile-content">
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'experience' && renderExperienceTab()}
        {activeTab === 'thesis' && renderThesisTab()}
      </div>
    </div>
  );
};

export default BuyerProfile;


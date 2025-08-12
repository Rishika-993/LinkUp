import React from 'react';
import DealStageTracker from './DealStageTracker';
import './DealRoom.css';

/**
 * The central hub for a matched buyer and seller to complete the acquisition process.
 */
const DealRoom = () => {
  return (
    <div className="deal-room-container">
      <div className="deal-room-header">
        <h1>Deal Room: Acquisition of "SaaSQuatch"</h1>
        <p>A secure, streamlined workspace to guide you from match to close.</p>
      </div>

      <DealStageTracker />

      <div className="deal-room-widgets">
        <div className="widget">
          <h3>Secure Document Vault</h3>
          <p>Upload and share sensitive documents like financials and contracts. All files are encrypted and access is logged.</p>
          <button className="btn-secondary">Go to Vault</button>
        </div>

        <div className="widget ai-widget">
          <div className="ai-widget-header">
            <h3>AI Financial Analyzer</h3>
            <span className="ai-badge">BETA</span>
          </div>
          <p>Our AI can analyze uploaded financial statements (P&L, Balance Sheet) to summarize key metrics, identify trends, and flag potential risks, saving you hours of manual work.</p>
          <button className="btn-primary">Analyze Documents</button>
        </div>

        <div className="widget">
          <h3>Secure Messaging</h3>
          <p>Keep all deal-related communication in one place. Your conversation history serves as a single source of truth.</p>
          <button className="btn-secondary">Open Chat</button>
        </div>
      </div>
    </div>
  );
};

export default DealRoom;


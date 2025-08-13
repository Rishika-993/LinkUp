import React, { useState } from 'react';
import { dealStages as stages } from '../../mockData';
import './DealStageTracker.css';

/**
 * A component to visually track the stages of an acquisition deal.
 */
function DealStageTracker() {
  // In a real app, this state would come from props or a state manager like Redux.
  const [dealStages] = useState(stages);

  const getStatusClass = (status) => {
    if (status === 'completed') return 'stage-completed';
    if (status === 'active') return 'stage-active';
    return 'stage-pending';
  };

  return (
    <div className="deal-stage-tracker">
      <h2>Deal Progress</h2>
      <div className="stages-container">
        {dealStages.map((stage, index) => (
          <React.Fragment key={stage.id}>
            <div
              className={`stage ${getStatusClass(stage.status)}`}
              title={`${stage.name}: ${stage.status.charAt(0).toUpperCase() + stage.status.slice(1)}`}
            >
              <div className="stage-icon">
                {stage.status === 'completed' ? (
                  <span className="checkmark">✓</span>
                ) : (
                  <span className="stage-number">{index + 1}</span>
                )}
              </div>
              <div className="stage-name">
                <span className="stage-label">{stage.name}</span>
                {stage.date && <span className="stage-date">{stage.date}</span>}
              </div>
            </div>
            {index < dealStages.length - 1 && (
              <div className={`connector ${getStatusClass(stage.status)}`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default DealStageTracker;
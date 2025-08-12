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
            <div className={`stage ${getStatusClass(stage.status)}`}>
              <div className="stage-icon"></div>
              <div className="stage-name">{stage.name}</div>
            </div>
            {index < dealStages.length - 1 && (
              <div
                className={`connector ${getStatusClass(stage.status)}`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default DealStageTracker;
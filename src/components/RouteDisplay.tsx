import React from 'react';
import { RouteData } from '../services/api';

interface RouteDisplayProps {
  routeData: RouteData | null;
}

const RouteDisplay: React.FC<RouteDisplayProps> = ({ routeData }) => {
  if (!routeData) {
    return null;
  }

  return (
    <div className="route-display-container">
      <h2>Route Details</h2>
      <div className="route-summary">
        <div>
          <strong>From:</strong> {routeData.origin}
        </div>
        <div>
          <strong>To:</strong> {routeData.destination}
        </div>
        {routeData.distance !== undefined && (
          <div>
            <strong>Distance:</strong> {routeData.distance.toFixed(2)} km
          </div>
        )}
        {routeData.duration !== undefined && (
          <div>
            <strong>Estimated Duration:</strong> {Math.floor(routeData.duration / 60)} mins
          </div>
        )}
        {routeData.safetyScore !== undefined && (
          <div>
            <strong>Safety Score:</strong> {routeData.safetyScore.toFixed(1)} / 10
          </div>
        )}
      </div>

      {routeData.steps && routeData.steps.length > 0 && (
        <div className="route-steps">
          <h3>Directions</h3>
          <ol>
            {routeData.steps.map((step, index) => (
              <li key={index}>
                <div>{step.instruction}</div>
                {step.distance && <small>{step.distance.toFixed(2)} km</small>}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default RouteDisplay;

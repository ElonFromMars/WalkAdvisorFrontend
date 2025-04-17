import React, { useState } from 'react';
import { fetchRoute, RouteData } from '../services/api';

interface RouteFormProps {
  onSubmit: (routeData: RouteData) => void;
}

const RouteForm: React.FC<RouteFormProps> = ({ onSubmit }) => {
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (origin && destination) {
      setIsLoading(true);
      setError(null);
      
      try {
        const routeData = await fetchRoute(origin, destination);
        onSubmit(routeData);
      } catch (err) {
        setError('Failed to fetch route. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const clearInput = (setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter('');
  };

  return (
    <div className="route-form-container">
      <h2>Plan Your Route</h2>
      <form onSubmit={handleSubmit} className="route-form">
        <div className="form-group">
          <label htmlFor="origin">Starting Point:</label>
          <input
            type="text"
            id="origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="Enter origin"
            required
            disabled={isLoading}
          />
          {origin && (
            <button 
              type="button" 
              className="clear-input-btn" 
              onClick={() => clearInput(setOrigin)}
              aria-label="Clear origin"
              tabIndex={0}
            >
              ×
            </button>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="destination">Destination:</label>
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter destination"
            required
            disabled={isLoading}
          />
          {destination && (
            <button 
              type="button" 
              className="clear-input-btn" 
              onClick={() => clearInput(setDestination)}
              aria-label="Clear destination"
              tabIndex={0}
            >
              ×
            </button>
          )}
        </div>
        
        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? 'Getting Route...' : 'Get Route'}
        </button>
        
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default RouteForm;

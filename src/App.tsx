import React from 'react';
import './App.css';
import RouteForm from './components/RouteForm';
import RouteDisplay from './components/RouteDisplay';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchRouteData } from './features/route/routeSlice';
import { RouteData } from './services/api';

function App() {
  const dispatch = useAppDispatch();
  const { routeData, status, error } = useAppSelector((state) => state.route);

  const handleRouteSubmit = (routeData: RouteData) => {
    dispatch(fetchRouteData({ 
      origin: routeData.origin, 
      destination: routeData.destination 
    }));
  };

  return (
    <div className="app">
      <header className="header">
        <h1>WalkAdvisor</h1>
      </header>
      <main className="main">
        <p>Welcome to WalkAdvisor</p>
        <RouteForm onSubmit={handleRouteSubmit} />
        
        {status === 'loading' && <div className="loading">Loading route data...</div>}
        {status === 'failed' && <div className="error-message">{error}</div>}
        {status === 'succeeded' && <RouteDisplay routeData={routeData} />}
      </main>
    </div>
  );
}

export default App;

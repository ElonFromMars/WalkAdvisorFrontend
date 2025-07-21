import React from 'react';
import './App.css';
import RouteForm from './components/RouteForm';
import RouteDisplay from './components/RouteDisplay';
import { useAppSelector } from './app/hooks';


function App() {
  const { routeData, status, error } = useAppSelector((state) => state.route);

  return (
    <div className="app">
      <header className="header">
        <h1>WalkAdvisor</h1>
      </header>
      <main className="main">
        <p>Welcome to WalkAdvisor</p>
        <RouteForm/>
        
        {status === 'loading' && <div className="loading">Loading route data...</div>}
        {status === 'failed' && <div className="error-message">{error}</div>}
        {status === 'succeeded' && <RouteDisplay routeData={routeData} />}
      </main>
    </div>
  );
}

export default App;

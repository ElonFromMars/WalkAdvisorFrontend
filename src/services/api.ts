// Define the shape of route data received from the backend
export interface RouteData {
  id?: number;
  origin: string;
  destination: string;
  distance?: number;
  duration?: number;
  safetyScore?: number;
  steps?: RouteStep[];
}

export interface RouteStep {
  instruction: string;
  distance?: number;
  duration?: number;
}

// API base URL - adjust this to match your backend endpoint
const API_BASE_URL = 'http://localhost:8080/api';

// Function to fetch route data from the backend
export const fetchRoute = async (origin: string, destination: string): Promise<RouteData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/routes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ origin, destination }),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch route data:', error);
    throw error;
  }
};

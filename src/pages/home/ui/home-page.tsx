import { useEffect, useState } from 'react';

import { apiClient } from '@/shared/api/client';

function HomePage() {
  const [healthStatus, setHealthStatus] = useState('checking');

  useEffect(() => {
    apiClient
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/actuator/health`)
      .then((response) => {
        console.log('Health check successful:', response.data);
        setHealthStatus(response.data.status || 'successful');
      })
      .catch((error) => {
        console.error('Health check failed:', error);
        setHealthStatus('failed');
      });
  }, []);

  return (
    <div>
      <h1>home입니다.</h1>
      <p>Health Check Status: {healthStatus}</p>
    </div>
  );
}

export default HomePage;

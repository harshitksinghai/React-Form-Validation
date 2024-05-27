import React from 'react';
import { useLocation } from 'react-router-dom';

function Home() {
  const location = useLocation();
  const formData = location.state;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Form Submitted Successfully!</h1>
      <pre className="bg-gray-100 p-4 rounded-md">{JSON.stringify(formData, null, 2)}</pre>
    </div>
  );
} 

export default Home;

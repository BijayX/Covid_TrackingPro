import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to Covid Tracker</h1>
        <p className="text-lg text-gray-600 mb-6">Track Covid-19 statistics, symptoms, and prevention tips.</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600 transition duration-300"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Home;

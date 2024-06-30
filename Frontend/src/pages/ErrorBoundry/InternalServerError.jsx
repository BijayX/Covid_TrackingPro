import React from 'react';

const InternalServerError = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-red-600 mb-4">500 Internal Server Error</h1>
        <p className="text-lg text-gray-700 mb-6">Sorry, something went wrong on our end. Please try again later.</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
}

export default InternalServerError;

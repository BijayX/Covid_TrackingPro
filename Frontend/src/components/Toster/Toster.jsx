import React, { useState } from 'react';
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineExclamationCircle } from 'react-icons/ai';

const Toaster = () => {
  const [toasts, setToasts] = useState([
    { id: 1, type: 'success', message: 'Item moved successfully.' },
    { id: 2, type: 'danger', message: 'Item has been deleted.' },
    { id: 3, type: 'warning', message: 'Improve password difficulty.' }
  ]);

  const handleClose = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  const getIconComponent = (type) => {
    switch (type) {
      case 'success':
        return <AiOutlineCheckCircle className="w-5 h-5 text-green-500" />;
      case 'danger':
        return <AiOutlineCloseCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AiOutlineExclamationCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="absolute top-4 right-4 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          id={`toast-${toast.type}`}
          className={`flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow ${toast.type === 'danger' ? 'dark:text-gray-400 dark:bg-gray-800' : 'dark:text-gray-400 dark:bg-gray-800'}`}
          role="alert"
        >
          <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${toast.type === 'success' ? 'text-green-500 bg-green-100' : toast.type === 'danger' ? 'text-red-500 bg-red-100' : 'text-yellow-500 bg-yellow-100'} rounded-lg dark:bg-${toast.type === 'success' ? 'green' : toast.type === 'danger' ? 'red' : 'yellow'}-800 dark:text-${toast.type === 'success' ? 'green' : toast.type === 'danger' ? 'red' : 'yellow'}-200`}>
            {getIconComponent(toast.type)}
          </div>
          <div className="ms-3 text-sm font-normal">{toast.message}</div>
          <button
            type="button"
            onClick={() => handleClose(toast.id)}
            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toaster;

import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const Input = ({ label, id, type, placeholder, onChange , name }) => {
  const [showPassword, setShowPassword] = useState(false);
  let icon;

  switch (label) {
    case 'Full Name':
      icon = <FaUser />;
      break;
    case 'Email':
      icon = <FaEnvelope />;
      break;
    case 'New Password':
    case 'Password':
    case 'Confirm Password':
      icon = <FaLock />;
      break;
    default:
      icon = null;
  }

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="mb-4 w-full md:w-11/12">
      <div className="relative">
        <span className="absolute inset-y-0 left-1 flex items-center pl-2">
          {icon}
        </span>
        <input
          className="shadow appearance-none border rounded w-full h-12 pl-10 pr-4 px-4 py-5 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline"
          id={id}
          name = {name}
          type={showPassword ? 'text' : type}
          placeholder={placeholder}
          onChange={onChange} 
        />
        {type === 'password' && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <FaRegEyeSlash className="text-gray-600" />
            ) : (
              <FaRegEye className="text-gray-600" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;

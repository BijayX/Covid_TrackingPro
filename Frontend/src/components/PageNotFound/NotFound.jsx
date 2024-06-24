import React from "react";
import { useNavigate } from "react-router-dom";
// import notFoundImage from "../../assets/notfound.png"; // Make sure you have a relevant image

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r ">
      <div className="flex flex-col items-center bg-white p-10   max-w-lg ">
        {/* <img src={notFoundImage} alt="Page Not Found" className="w-72 h-72 mb-8" /> */}
        <h1 className="text-4xl font-extrabold mb-4 text-red-600">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-8 text-center text-lg">
          Oops! The page you are looking for doesn't exist. It might have been moved or deleted.
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-blue-400 text-white rounded-lg text-xl font-bold transform transition-all duration-300 hover:scale-105"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;

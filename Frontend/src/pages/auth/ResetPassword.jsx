import React, { useState } from "react";
import loginimage from "../../assets/loginimge.png";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";
import Toaster from "../../components/Toster/Toster";
import { resetPassword } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { STATUSES } from "../../global/misc/statuses";
import { toast, Toaster as ToastContainer } from 'react-hot-toast'; // Import ToastContainer

const ResetPassword = () => {
  const navigate = useNavigate();
  const { forgotPasswordData } = useSelector((state) => state.auth);
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const email = forgotPasswordData.email;

  // Log to check email value
  console.log("Email: ", email);

  const data = {
    newPassword,
    confirmPassword,
    email,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(resetPassword(data));
    if (response?.error) {
      toast.error(response.error); // Display error toast
    } else {
      toast.success('Password reset successfully!'); // Display success toast
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden w-full max-w-8xl">
        <div className="md:w-1/2 bg-gray-200 p-6 md:p-10 flex items-center justify-center">
          <img
            src={loginimage}
            alt="Illustration"
            className="max-w-2xl h-auto"
          />
        </div>
        <div className="w-full md:w-1/2 p-8 bg-gray-200 max-h-screen overflow-y-auto">
          <div className="bg-white p-8 w-full mt-9 max-w-xl rounded-lg shadow-lg">
            <h1 className="text-3xl text-left font-medium mb-2">Welcome to</h1>
            <h2 className="text-3xl font-black mb-6 text-left text-red-600">
              Covid Tracker
            </h2>
            <h3 className="text-2xl font-semibold  mb-4 text-center">
              Enter your new password below.
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
              <Input
                label="New Password"
                id="newPassword"
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Input
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="flex items-center justify-center w-full md:w-11/12 mb-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 w-full md:w-full rounded focus:outline-none focus:shadow-outline"
                   type="submit"
                >
                  Reset Password
                </button>
              </div>
              {errorMessage && (
                <p className="text-red-500 text-center mt-4">{errorMessage}</p>
              )}
            </form>
            <p className="text-center text-base font-medium mt-6">
              Remembered your password?{" "}
              <a
                className="text-blue-500 hover:text-blue-700"
                onClick={() => navigate("/login")}
              >
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer /> {/* Add ToastContainer component for displaying toasts */}
    </div>
  );
};

export default ResetPassword;

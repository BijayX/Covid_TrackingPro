import React, { useState } from "react";
import loginimage from "../../assets/loginimge.png";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";
import { forgotPassword, verifyotp } from "../../store/authSlice"; // Import the verifyotp action
import { useDispatch, useSelector } from "react-redux";
import { STATUSES } from "../../global/misc/statuses";
import Loader from "../../components/Loader/Loader";
import { toast, Toaster } from 'react-hot-toast';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false); 

  const [errorMessage, setErrorMessage] = useState(null); // State to hold error message
  const [otpErrorMessage, setOtpErrorMessage] = useState(null);
  const { status, data } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show spinner on submit
    const response = await dispatch(forgotPassword({ email }));
    setIsLoading(false); // Hide spinner after response

    if (response?.error) {
      toast.error(response.error); // Display error toast
    } else {
      setIsModalOpen(true); // Open modal when OTP is sent successfully
    }
  };
  
  const handleOtpSubmit = async () => {
    try {
      const response = await dispatch(verifyotp({ email, otp }));
      if (response.error) {
        toast.error(response.error); // Display error toast
      } else {
        toast.success('OTP verified successfully!'); // Display success toast
        setIsModalOpen(false); 
        navigate("/reset-password");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Failed to verify OTP. Please try again.");
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden w-full max-w-8xl">
        <div className="md:w-1/2 bg-gray-200 p-6 md:p-10 flex items-center justify-center">
          <img src={loginimage} alt="Illustration" className="max-w-2xl h-auto" />
        </div>
        <div className="w-full md:w-1/2 p-8 bg-gray-200 max-h-screen overflow-y-auto">
          <div className="bg-white p-8 w-full mt-9 max-w-xl rounded-lg shadow-lg">
            <h1 className="text-3xl text-left font-medium mb-2">Welcome to</h1>
            <h2 className="text-3xl font-black mb-6 text-left text-red-600">Covid Tracker</h2>
            <p className=" mb-4 text-center">
              Enter the email address associated with your account and we will send OTP to your account
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
              <Input
                label="Email"
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <div className="flex items-center justify-center w-full md:w-11/12 mb-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 w-full md:w-full rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
                  type="submit"
                  disabled={isLoading} 
                >
                   {isLoading ? <Loader/> : "Continue"}{" "}
                </button>
              </div>
              {errorMessage && (
                <p className="text-red-500 text-center mt-4">{errorMessage}</p>
              )}
            </form>
            <p className="text-center text-base font-medium mt-6">
              Don't have an account?{" "}
              <a className="text-blue-500 hover:text-blue-700" onClick={() => navigate("/register")}>
                Create account
              </a>
            </p>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-medium mb-4">Enter OTP</h2>
            <p className="mb-4">
              We have sent an OTP to your email. Please enter it below to proceed.
            </p>
            <Input
              label="OTP"
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
            />
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleOtpSubmit}
              >
                Submit
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                type="button"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
            {otpErrorMessage && (
              <p className="text-red-500 text-center mt-4">{otpErrorMessage}</p>
            )}
          </div>
        </div>
      )}
      
      <Toaster /> {/* Add Toaster component for displaying toasts */}
    </div>
  );
};

export default ForgotPassword;

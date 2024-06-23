import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import loginimage from "../../assets/loginimge.png";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import { registerUser, verifyEmail } from "../../store/authSlice";
import { STATUSES } from "../../global/misc/statuses";
import Loader from "../../components/Loader/Loader";
import { toast, Toaster } from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false); 
  const { status } = useSelector((state) => state.auth);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [verifyOtp, setVerifyOtp] = useState(""); // Add state for OTP
  const [otpErrorMessage, setOtpErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show spinner on submit
    const response = await dispatch(registerUser(formData));
    setIsLoading(false); // Hide spinner after response
    if (response?.error) {
      toast.error(response.error); // Display error toast
    } else if (status === STATUSES.SUCCESS) {
      setIsModalOpen(true);
    }
  };

  const handleOtpSubmit = async () => {
    const response = await dispatch(
      verifyEmail({ email: formData.email, verifyOtp })
    );
    if (response?.error) {
      toast.error(response.error); // Display error toast
    } else {
      toast.success("OTP verified successfully!"); // Display success toast
      setIsModalOpen(false);
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

        <div className="w-full md:w-1/2 p-6 bg-gray-200 max-h-screen overflow-y-auto">
          <div className="bg-white p-8 w-full max-w-xl rounded-lg shadow-lg">
            <h1 className="text-3xl text-left font-medium mb-2">Welcome to</h1>
            <h2 className="text-3xl font-black mb-6 text-left text-red-600">
              Covid Tracker
            </h2>
            <h3 className="text-3xl font-black mb-6 text-center text-blue-700">
              Register Now
            </h3>
            <form
              className="flex flex-col items-center"
              onSubmit={handleSubmit}
            >
              <Input
                label="Full Name"
                id="fullName"
                name="fullName"
                type="text"
                onChange={handleChange}
                placeholder="Full Name"
              />
              <Input
                label="Email"
                id="email"
                name="email"
                type="email"
                onChange={handleChange}
                placeholder="Email"
              />
              <Input
                label="Password"
                id="password"
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Password"
              />
              <Input
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                placeholder="Confirm Password"
              />
              <div className="mb-4 flex items-center w-full md:w-11/12">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="form-checkbox bg-gray-200 text-indigo-600"
                />
                <label htmlFor="rememberMe" className="ml-2 text-gray-700">
                  Remember me
                </label>
              </div>
              <div className="flex items-center justify-center w-full md:w-11/12">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 w-full md:w-full rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
                  type="submit"
                  disabled={isLoading} 
                >
                  {isLoading ? <Loader/> : "Register"}{" "}
                </button>
              </div>
            </form>
            <p className="text-center text-base font-medium mt-6">
              Already have an account?{" "}
              <a
                className="text-blue-500 hover:text-blue-700 cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleOtpSubmit}
        verifyotp={verifyOtp}
        setVerifyOtp={setVerifyOtp}
        otpErrorMessage={otpErrorMessage}
      />

      <Toaster /> {/* Add Toaster component for displaying toasts */}
    </div>
  );
};

export default Register;

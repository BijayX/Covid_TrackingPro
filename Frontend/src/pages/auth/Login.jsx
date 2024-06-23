import React, { useState } from "react";
import loginimage from "../../assets/loginimge.png";
import Input from "../../components/Input";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/authSlice";
import { STATUSES } from "../../global/misc/statuses";
import Loader from "../../components/Loader/Loader";
import { toast, Toaster } from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false); 
  const { data, token, status } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
    const response = await dispatch(loginUser(formData));
    setIsLoading(false); // Hide spinner after response
    if (response?.error) {
      toast.error(response.error); // Display error toast
    } else if (status === STATUSES.SUCCESS) {
      navigate("/dashboard");
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
            <h3 className="text-3xl font-black mb-4 text-center text-blue-700">
              Login Now
            </h3>

            <div className="flex flex-col items-center py-3 px-4 mb-3">
              <button
                className="bg-white hover:bg-gray-100 text-gray-700 font-normal py-3 px-4 w-full md:w-full rounded flex items-center justify-center focus:outline-none focus:shadow-outline shadow-lg"
                type="button"
              >
                <FcGoogle className="mr-2 text-3xl" />
                Login with Google
              </button>
            </div>

            <div className="flex items-center justify-center py-1 px-3 mb-6">
              <hr className="w-full border-gray-300" />
              <span className="mx-4 text-black-400 font-medium">OR</span>
              <hr className="w-full border-gray-300" />
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center"
            >
              <Input
                label="Email"
                name="email"
                id="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
              />
              <Input
                name="password"
                label="Password"
                id="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
              />
              <div className="mb-4 flex items-center justify-between w-full md:w-11/12">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    className="form-checkbox bg-gray-200 text-indigo-600"
                  />
                  <label htmlFor="rememberMe" className="ml-2 text-gray-700">
                    Remember me
                  </label>
                </div>
                <a
                  onClick={() => navigate("/forgot-Password")}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="flex items-center justify-center w-full md:w-11/12 mb-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 w-full md:w-full rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? <Loader /> : "Login"}{" "}
                </button>
              </div>
            </form>
            <p className="text-center text-base font-medium mt-6">
              Don't have an account?{" "}
              <a
                className="text-blue-500 hover:text-blue-700"
                onClick={() => navigate("/register")}
              >
                Create account
              </a>
            </p>
          </div>
        </div>
      </div>

      <Toaster /> 
    </div>
  );
};

export default Login;

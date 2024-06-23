import React from "react";
import PropTypes from "prop-types";
import Input from "../../components/Input";

const Modal = ({ isOpen, onClose, onSubmit, verifyotp, setVerifyOtp, otpErrorMessage, otpSuccessMessage }) => {
  if (!isOpen) return null;

  return (
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
          placeholder="Enter OTP"
          value={verifyotp}
          onChange={(e) => setVerifyOtp(e.target.value)}
        />
        {otpErrorMessage && (
          <p className="text-red-500 text-center mt-4">{otpErrorMessage}</p>
        )}
        {otpSuccessMessage && (
          <p className="text-green-500 text-center mt-4">{otpSuccessMessage}</p>
        )}
        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={onSubmit}
          >
            Submit
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  verifyotp: PropTypes.string.isRequired,
  setVerifyOtp: PropTypes.func.isRequired,
  otpErrorMessage: PropTypes.string,
  otpSuccessMessage: PropTypes.string,
};

export default Modal;

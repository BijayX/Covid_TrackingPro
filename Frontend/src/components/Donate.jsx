import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initiateKhaltiPayment } from "../store/donationSlice";
import khaltiimg from "../assets/khalti.png";
import Gpayimg from "../assets/G.png";
import UPIimg from "../assets/UPI-Logo.png";
import donateImage from "../assets/covidImage.jpg";
import { STATUSES } from "../global/misc/statuses";

const Donate = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { paymentUrl, error, status } = useSelector((state) => state.donations);

  const [step, setStep] = useState(1);
  const [donationAmount, setDonationAmount] = useState(null);
  const [isMonthly, setIsMonthly] = useState(true);

  useEffect(() => {
    if (status === STATUSES.SUCCESS && paymentUrl) {
      window.location.href = paymentUrl;
    }
  }, [paymentUrl, status]);

  const handleNextStep = () => {
    if (donationAmount) {
      setStep(2);
    } else {
      alert("Please enter a donation amount.");
    }
  };

  const handlekhalti = async () => {
    const donationData = {
      donationAmount,
      donationday: isMonthly ? "Monthly" : "Once",
    };
    const response = await dispatch(initiateKhaltiPayment(donationData));
    if (response.error) {
      alert("Failed to initiate payment. Please try again.");
    }
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleDonationAmountChange = (e) => {
    const value = e.target.value;
    setDonationAmount(value === "" ? null : parseInt(value));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-9 rounded-lg shadow-lg w-96  relative">
        <button
          className="absolute top-0 right-3 text-gray-500 text-4xl "
          onClick={onClose}
        >
          &times;
        </button>
        {step === 1 && (
          <>
            <div className="flex flex-col items-center">
              <img
                src={donateImage}
                alt="Donate"
                className="mb-4 w-full rounded-lg"
              />
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
              <div className="flex justify-between mb-4">
                <button
                  className={`px-4 py-2 rounded-full ${
                    isMonthly ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                  onClick={() => setIsMonthly(true)}
                >
                  Monthly
                </button>
                <button
                  className={`px-4 py-2 rounded-full ${
                    !isMonthly ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                  onClick={() => setIsMonthly(false)}
                >
                  Once
                </button>
              </div>
              <div className="flex flex-wrap justify-between mb-4">
                {[750, 1500, 2000, 3500, 9000, 20000].map((amount) => (
                  <button
                    key={amount}
                    className={`w-1/3 p-2 m-1 rounded-lg ${
                      donationAmount === amount
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => setDonationAmount(amount)}
                  >
                    Rs {amount}
                  </button>
                ))}
              </div>
              <input
                type="number"
                className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                placeholder="Enter amount"
                value={donationAmount === null ? "" : donationAmount}
                onChange={handleDonationAmountChange}
              />

              <div className="flex items-center mb-4">
                <input type="checkbox" id="dedicate" className="mr-2" />
                <label htmlFor="dedicate">Dedicate this donation</label>
              </div>
              <button
                className="w-full bg-blue-500 text-white py-2 rounded-lg"
                onClick={handleNextStep}
                disabled={!donationAmount}
              >
                {isMonthly ? "Donate monthly" : "Donate once"}
              </button>
              {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-xl font-normal mb-4">You donate</h2>
              <hr className="border-b border-gray-200 w-full my-4" />
              <p className="text-2xl font-bold mb-4">
                Rs {donationAmount} {isMonthly ? "NPR/month" : "NPR/once"}
              </p>
            </div>

            <div className="p-9 space-y-4">
              <button
                className="w-full border border-gray-400 text-white py-2 rounded-lg flex justify-center items-center"
                onClick={handlekhalti}
              >
                <img src={khaltiimg} alt="Khalti" className="h-7 mr-2" />
              </button>
              <button className="w-full border border-gray-400 text-white py-2 rounded-lg flex justify-center items-center">
                <img src={UPIimg} alt="UPI" className="h-7 mr-2" />
              </button>
              <button className="w-full bg-black text-white py-2 rounded-lg flex justify-center items-center">
                <img src={Gpayimg} alt="GPay" className="h-7 mr-2" />
                Pay
              </button>
            </div>
          </>
        )}

        {step > 1 && (
          <button
            className="absolute top-2 left-2 text-3xl text-gray-500"
            onClick={handlePreviousStep}
          >
            &larr;
          </button>
        )}
      </div>
    </div>
  );
};

export default Donate;

import React, { useState } from "react";
import khaltiimg from "../assets/khalti.png";
import Gpayimg from "../assets/G.png";
import UPIimg from "../assets/UPI-Logo.png";

const Donate = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [donationAmount, setDonationAmount] = useState("");
  const [isMonthly, setIsMonthly] = useState(true);
  const [personalDetails, setPersonalDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  if (!isOpen) return null;

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalDetails({ ...personalDetails, [name]: value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button
          className="absolute top-0 right-2 text-gray-500 text-3xl p-2"
          onClick={onClose}
        >
          &times;
        </button>

        {step === 1 && (
          <>
            <div className="flex flex-col items-center">
              {/* <img
                className="p-4 mb-4"
              /> */}
              <h2 className="text-3xl font-black mb-3 text-left text-red-600">
                Covid Tracker
              </h2>
              <p className="text-gray-700 text-center mb-4">
                “The idea that some lives matter less is the root of all that is
                wrong with the world.” -
                <span className="font-bold text-blue-500">Dr. Paul Farmer</span>
                , PIH co-founder
              </p>

              <p className="text-gray-700 text-center mb-4">
                Make a donation that builds health systems through solidarity,
                not charity.
              </p>
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
                    className="w-1/3 p-2 m-1 bg-gray-200 rounded-lg"
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
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
              />
              <div className="flex items-center mb-4">
                <input type="checkbox" id="dedicate" className="mr-2" />
                <label htmlFor="dedicate">Dedicate this donation</label>
              </div>
              <button
                className="w-full bg-blue-500 text-white py-2 rounded-lg"
                onClick={handleNextStep}
              >
                {isMonthly ? "Donate monthly" : "Donate once"}
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="p-4">
              <h2 className="text-xl text-center font-normal mb-4">
                Enter your details
              </h2>
              <hr className="border-b border-gray-200 w-full my-4" />

              <div className="mb-4">
                <input
                  type="text"
                  name="firstName"
                  className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
                  placeholder="First Name"
                  value={personalDetails.firstName}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="lastName"
                  className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
                  placeholder="Last Name"
                  value={personalDetails.lastName}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="email"
                  className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
                  placeholder="Email"
                  value={personalDetails.email}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="phone"
                  className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
                  placeholder="Phone (optional)"
                  value={personalDetails.phone}
                  onChange={handleChange}
                />
                <div className="flex items-center mb-4">
                  <input type="checkbox" id="donateAsOrg" className="mr-2" />
                  <label htmlFor="donateAsOrg">Donate as an organization</label>
                </div>
                <button
                  className="w-full bg-blue-500 text-white py-2 rounded-lg"
                  onClick={handleNextStep}
                >
                  Continue
                </button>
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-xl font-normal mb-4">You donate</h2>
              <hr className="border-b border-gray-200 w-full my-4" />
              <p className="text-2xl font-bold mb-4">
                Rs {donationAmount} {isMonthly ? "NPR/month" : "NPR/once"}
              </p>
              <div className="flex items-center mb-4">
                <input type="checkbox" id="coverCosts" className="mr-2" />
                <label htmlFor="coverCosts">Cover transaction costs</label>
              </div>
            </div>

            <div className="p-9 space-y-4">
              <button className="w-full border border-gray-400 text-white py-2 rounded-lg flex justify-center items-center">
                <img src={khaltiimg} alt="Khalti" className="h-7 mr-2 " />
              </button>
              <button className="w-full border border-gray-400 text-white py-2 rounded-lg flex justify-center items-center">
                <img src={UPIimg} alt="PayPal" className="h-7 mr-2" />
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

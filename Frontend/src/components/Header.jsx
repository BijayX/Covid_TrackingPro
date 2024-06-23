import React, { useState, useRef, useEffect } from "react";
import {
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBell,
  FaChevronDown,
  FaHeadSideCough,
  FaFlask
} from "react-icons/fa";
import {
  MdInsertChart,
  MdAttachMoney,
  MdMessage,
} from "react-icons/md";
import { LiaDonateSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProfile, logOut } from "../store/authSlice";
import Donate from "./Donate";

const Header = () => {
  const { data: user } = useSelector((state) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    dispatch(fetchProfile());
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openDonationModal = () => {
    setIsDonationModalOpen(true);
  };

  const closeDonationModal = () => {
    setIsDonationModalOpen(false);
  };

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <div className="flex items-center">
        <div className="flex items-center">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-red-500 text-white font-bold text-xl">
            C
          </div>
          <h1 className="text-2xl font-bold ml-2 text-red-600">
            <a onClick={() => navigate("/dashboard")}>Covid Tracker</a>
          </h1>
        </div>
        <nav className="ml-10 space-x-8 flex items-center">
          <a
            onClick={() => navigate("/dashboard")}
            className="flex items-center text-lg font-semibold text-gray-500 hover:bg-blue-100 p-2 rounded"
          >
            <MdInsertChart className="mr-2" />
            Dashboard
          </a>
          <a
            onClick={()=>navigate("/symptoms")}
            className="flex items-center text-lg font-medium text-gray-500 hover:bg-blue-100 p-2 rounded"
          >
            <FaHeadSideCough className="mr-2" />
            Symptoms
          </a>
          <a
            onClick={openDonationModal}
            className="flex items-center text-lg font-medium text-gray-500 hover:bg-blue-100 p-2 rounded"
          >
            <LiaDonateSolid className="mr-2" />
            Donate
          </a>
          <a
            onClick={()=>navigate("/stay-safe")}
            className="flex items-center text-lg font-medium text-gray-500 hover:bg-blue-100 p-2 rounded"
          >
            <FaFlask className="mr-2" />
            Prevention
          </a>
        </nav>
      </div>
      <div className="relative flex items-center">
        <button
          className="p-2 rounded-full w-40 bg-gray-200 flex items-center justify-center ml-2"
          onClick={toggleDropdown}
        >
          <span className="mr-2 text-center text-gray-700">
            {user?.fullName}
          </span>
          <FaChevronDown className="text-center text-gray-700" />
        </button>

        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-2 mt-4 transform translate-y-2/3 bg-white rounded-md shadow-lg z-10 border border-gray-200"
          >
            <ul className="py-1">
              <li>
                <a
                  href="#"
                  className="px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
                >
                  <FaCog className="mr-2" /> Settings
                </a>
              </li>
              <li>
                <a
                  onClick={handleLogOut}
                  className="px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </a>
              </li>
            </ul>
          </div>
        )}
        <button className="p-2 ml-4 rounded-full bg-gray-200 relative">
          <FaBell className="text-gray-700" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
      </div>
      <Donate isOpen={isDonationModalOpen} onClose={closeDonationModal} />
    </header>
  );
};

export default Header;

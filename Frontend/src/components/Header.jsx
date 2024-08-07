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
import { useNavigate, useLocation } from "react-router-dom";
import { fetchProfile, logOut } from "../store/authSlice";
import Donate from "./Donate";

const Header = () => {
  const { data: user } = useSelector((state) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const [activeLink, setActiveLink] = useState(""); 
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation(); 
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

  const openDonationModal = () => {
    setIsDonationModalOpen(true);
  };

  const closeDonationModal = () => {
    setIsDonationModalOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    dispatch(fetchProfile());
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setActiveLink("dashboard");
    } else if (location.pathname === "/symptoms") {
      setActiveLink("symptoms");
    } else if (location.pathname === "/stay-safe") {
      setActiveLink("prevention");
    } else {
      setActiveLink(""); // Reset active link if none matches
    }
  }, [location.pathname]);

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

        {/* Mobile menu toggle button */}
        <button
          onClick={toggleMobileMenu}
          className="block sm:hidden ml-auto focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden sm:flex ml-10 space-x-8 items-center">
          <a
            onClick={() => {
              navigate("/dashboard");
              setActiveLink("dashboard");
            }}
            className={`flex items-center text-lg font-semibold ${activeLink === "dashboard" ? "bg-blue-300" : ""} text-gray-500 p-2 rounded`}
          >
            <MdInsertChart className="mr-2" />
            Dashboard
          </a>
          <a
            onClick={() => {
              navigate("/symptoms");
              setActiveLink("symptoms");
            }}
            className={`flex items-center text-lg font-medium ${activeLink === "symptoms" ? "bg-blue-300" : ""} text-gray-500 p-2 rounded`}
          >
            <FaHeadSideCough className="mr-2" />
            Symptoms
          </a>
          <a
            onClick={() => {
              openDonationModal();
              setActiveLink("donate");
            }}
            className={`flex items-center text-lg font-medium ${activeLink === "donate" ? "bg-blue-300" : ""} text-gray-500 p-2 rounded`}
          >
            <LiaDonateSolid className="mr-2" />
            Donate
          </a>
          <a
            onClick={() => {
              navigate("/stay-safe");
              setActiveLink("prevention");
            }}
            className={`flex items-center text-lg font-medium ${activeLink === "prevention" ? "bg-blue-300" : ""} text-gray-500 p-2 rounded`}
          >
            <FaFlask className="mr-2" />
            Prevention
          </a>
        </nav>
      </div>

      {isMobileMenuOpen && (
        <div className="sm:hidden absolute top-16 left-0 w-full bg-white shadow-md z-10">
          <div className="flex flex-col items-center space-y-4 py-4">
            <a
              onClick={() => {
                navigate("/dashboard");
                closeMobileMenu();
              }}
              className={`text-lg font-semibold ${activeLink === "dashboard" ? "bg-blue-100" : ""} text-gray-500 p-2 rounded w-full flex items-center justify-center`}
            >
              <MdInsertChart className="mr-2" />
              Dashboard
            </a>
            <a
              onClick={() => {
                navigate("/symptoms");
                closeMobileMenu();
              }}
              className={`text-lg font-medium ${activeLink === "symptoms" ? "bg-blue-100" : ""} text-gray-500 p-2 rounded w-full flex items-center justify-center`}
            >
              <FaHeadSideCough className="mr-2" />
              Symptoms
            </a>
            <a
              onClick={() => {
                openDonationModal();
                closeMobileMenu();
              }}
              className={`text-lg font-medium ${activeLink === "donate" ? "bg-blue-100" : ""} text-gray-500 p-2 rounded w-full flex items-center justify-center`}
            >
              <LiaDonateSolid className="mr-2" />
              Donate
            </a>
            <a
              onClick={() => {
                navigate("/stay-safe");
                closeMobileMenu();
              }}
              className={`text-lg font-medium ${activeLink === "prevention" ? "bg-blue-100" : ""} text-gray-500 p-2 rounded w-full flex items-center justify-center`}
            >
              <FaFlask className="mr-2" />
              Prevention
            </a>
          </div>
        </div>
      )}

      <div className="relative flex items-center">
        <button
          className={`p-2 rounded-full w-56 bg-gray-200 flex items-center justify-center ml-2 ${activeLink ? "bg-blue-100" : ""}`}
          onClick={() => toggleDropdown()}
        >
          <span className="mr-2 text-center text-gray-700">{user?.fullName}</span>
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
                  onClick={() => handleLogOut()}
                  className="px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </a>
              </li>
            </ul>
          </div>
        )}

      </div>

      <Donate isOpen={isDonationModalOpen} onClose={closeDonationModal} />
    </header>
  );
};

export default Header;

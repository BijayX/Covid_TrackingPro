import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Siderbar";
import BarGraph from "./BarGraph";
import DNALoader from "../../components/Loader/DNALoader";
import { toast, Toaster } from 'react-hot-toast';

const Dashboard = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    },1000); // 4 seconds delay

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (location.state?.success) {
      toast.success('Logged in successfully!');
    }
  }, [location.state]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <DNALoader />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="flex flex-wrap">
        <div className="w-full sm:w-1/4">
          <Sidebar />
        </div>
        <div className="w-full sm:w-4/6 ml-12  p-2">
          <BarGraph />
        </div>
      </div>
      <Toaster /> 
    </>
  );

};

export default Dashboard;

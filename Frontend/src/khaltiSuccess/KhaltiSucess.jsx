import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { APIAuthenticated } from '../http';
import Loader from '../components/Loader/Loader'; 

const KhaltiSuccess = () => {
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const pidx = queryParams.get("pidx");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const verifyPidx = async () => {
    try {
      const response = await APIAuthenticated.post("/user/verifyPidx", { pidx });
      if (response.status === 200) {
        setLoading(false);
        await Swal.fire({
          title: "Payment Successful!",
          // text: response.data.message,
          text:"Thank you for your donation",
          icon: "success",
          timer: 9000,
          timerProgressBar: true,
        });
        navigate("/dashboard"); 
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    verifyPidx();
  }, []); 

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size={24} className="text-blue-500" /> 
      </div>
    );
  } else {
    return null; 
  }
};

export default KhaltiSuccess;

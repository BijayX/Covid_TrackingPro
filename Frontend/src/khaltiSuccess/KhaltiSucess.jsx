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
        Swal.fire({
          title: "Payment Successful!",
          text: response.data.message,
          icon: "success",
          timer: 3000,
          timerProgressBar: true,
          onClose: () => {
            navigate("/dasboard");
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    verifyPidx();
  }, []);

  if (loading) {
    return <Loader />;
  } else {
    return null; 
  }
};

export default KhaltiSuccess;

import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../global/misc/statuses";
import { API, APIAuthenticated } from "../http";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: [],
    status: STATUSES.SUCCESS,
    token: "",
    forgotPasswordData: {
      email: null,
      status: STATUSES.LOADING,
    },
    
  },
  reducers: {
    setUser(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    logOut(state, action) {
      state.data = [];
      state.token = null;
      state.state = STATUSES.SUCCESS;
    },
    setEmail(state, action) {
      state.forgotPasswordData.email = action.payload;
    },
    setForgotPasswordDataStatus(state, action) {
      state.forgotPasswordData.status = action.payload;
    },
    setEmailVerificationStatus(state, action) {
      state.emailVerificationStatus = action.payload;
    },
    setResetPasswordStatus(state, action) {
        state.resetPasswordStatus = action.payload;
    }
  },
});

export const {
  setUser,
  setStatus,
  setToken,
  logOut,
  setEmail,
  setForgotPasswordDataStatus,
  setEmailVerificationStatus,
  setResetPasswordStatus
} = authSlice.actions;

export default authSlice.reducer;

// export function registerUser(data) {
//   return async function registerUserThunk(dispatch) {
//     dispatch(setStatus(STATUSES.LOADING));
//     try {
//       const response = await API.post("/auth/register", data);
//       dispatch(setStatus(STATUSES.SUCCESS));
//     } catch (error) {
//       console.log(error);
//       dispatch(setStatus(STATUSES.ERROR));
//     }
//   };
// }

export function registerUser(data) {
  return async function registerUserThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await API.post("/auth/register", data);
      dispatch(setStatus(STATUSES.SUCCESS));
      return response.data; // Return response data to be used in the component
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
      return { error: error.response.data.message }; // Return error message
    }
  };
}


export function loginUser(data) {
  return async function loginUserThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await API.post("/auth/login", data);
      dispatch(setUser(response.data.data));
      dispatch(setToken(response.data.token));
      dispatch(setStatus(STATUSES.SUCCESS));
      if (response.status === 200 && response.data.token) {
        localStorage.setItem("token", response.data.token);
        window.location.href = "/dashboard";
      }
      return response.data
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
      return {error : error.response.data.message};
    }
  };
}

// export function fetchProfile() {
//   return async function fetchProfileThunk(dispatch) {
//     dispatch(setStatus(STATUSES.LOADING));
//     try {
//       const response = await APIAuthenticated.get("/user/profile");
//       dispatch(setUser(response.data.data));

//       dispatch(setStatus(STATUSES.SUCCESS));
//       return response.data
      
//     } catch (error) {
//       console.log(error);
//       dispatch(setStatus(STATUSES.ERROR));
//       return {error : error.response.data.message};
//     }
//   };
// }
export function fetchProfile() {
  return async function fetchProfileThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.get("/user/profile");
      dispatch(setUser(response.data.data));
      dispatch(setStatus(STATUSES.SUCCESS));
      return response.data;
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        dispatch(logOut()); 
        window.location.href = "/login"; 
      } else {
        dispatch(setStatus(STATUSES.ERROR));
        return { error: error.response.data.message };
      }
    }
  };
}


export function forgotPassword(data) {
  return async function forgotPasswordThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.post(
        "auth/forgotPassword/",
        data
      );
      // dispatch(setEmail(response.data.data));
      dispatch(setEmail(response.data.data.email));

      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
      return { error: error.response.data.message }; // Return error message

    }
  };
}


export function verifyotp(data) {
  return async function verifyotpThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.post("/auth/verifyOtp/", data);
      dispatch(setEmail(data.email));
      dispatch(setForgotPasswordDataStatus(STATUSES.SUCCESS));
      return response.data; // Return response data to be used in the component
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
      return { error: error.response.data.message }; // Return error message
    }
  };
}

// export function verifyEmail(data) {
//   return async function verifyEmailThunk(dispatch) {
//     dispatch(setEmailVerificationStatus(STATUSES.LOADING));
//     try {
//       const response = await APIAuthenticated.post("auth/verifyEmail/", data);
//       dispatch(setEmailVerificationStatus(STATUSES.SUCCESS));
//       // Optionally, you can dispatch additional actions based on response data
//       // Example: dispatch(setUser(response.data.data));
//     } catch (error) {
//       console.error(error);
//       dispatch(setEmailVerificationStatus(STATUSES.ERROR));
//     }
//   };
// }

export function verifyEmail(data) {
  return async function verifyEmailThunk(dispatch) {
    dispatch(setEmailVerificationStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.post("/auth/verify-email", data);
      dispatch(setEmailVerificationStatus(STATUSES.SUCCESS));
      return response.data; // Return response data to be used in the component
    } catch (error) {
      console.error(error);
      dispatch(setEmailVerificationStatus(STATUSES.ERROR));
      return { error: error.response.data.message }; // Return error message
    }
  };
}

export function resetPassword(data) {
    return async function resetPasswordThunk(dispatch) {
        dispatch(setResetPasswordStatus(STATUSES.LOADING));
        try {
            const response = await APIAuthenticated.post("auth/resetPassword/", data);
            dispatch(setResetPasswordStatus(STATUSES.SUCCESS));
            return response.data;
        } catch (error) {
            console.error(error);
            dispatch(setResetPasswordStatus(STATUSES.ERROR));
            return {error : error.response.data.message}
        }
    };
}


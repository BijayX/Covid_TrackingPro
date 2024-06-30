import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../global/misc/statuses";
import { API, APIAuthenticated } from "../http";

const donationSlice = createSlice({
  name: "donations",
  initialState: {
    donation: null,
    paymentUrl: null,
    status: STATUSES.IDLE,
    error: null,
  },
  reducers: {
    setDonation(state, action) {
      state.donation = action.payload;
    },
    setPaymentUrl(state, action) {
      state.paymentUrl = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setDonation, setPaymentUrl, setStatus, setError } =
  donationSlice.actions;

export default donationSlice.reducer;

// Thunks for initiating and verifying payments

export const initiateKhaltiPayment = (data) => async (dispatch) => {
  dispatch(setStatus(STATUSES.LOADING));
  try {
    const response = await APIAuthenticated.post("/user/payment", data);
    dispatch(setDonation(response.data.donation));
    dispatch(setPaymentUrl(response.data.paymentUrl));
    dispatch(setStatus(STATUSES.SUCCESS));
    return response.data;
  } catch (error) {
    dispatch(setStatus(STATUSES.ERROR));
    dispatch(setError(error.response.data.message));
    return { error: error.response.data.message };
  }
};

export const verifyPidx = (pidx) => async (dispatch) => {
  dispatch(setStatus(STATUSES.LOADING));
  try {
    const response = await APIAuthenticated.post("/user/verifyPidx", {
      pidx,
    });
    dispatch(setStatus(STATUSES.SUCCESS));
  } catch (error) {
    dispatch(setStatus(STATUSES.ERROR));
    dispatch(setError(error.response.data.message));
  }
};

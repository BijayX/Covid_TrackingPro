import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import donationSlice from "./donationSlice";

const store = configureStore({
    reducer : {
        auth : authSlice,
        donations : donationSlice,
        
    }
})

export default store
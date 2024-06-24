import express from "express";
import authRoute from "./authRoutes.js";
import profileRoute from "./profileRoutes.js"
import donationRoute from "./donationRoutes.js"
import paymentRoute from "./paymentRoutes.js"

const router = express.Router();

const path = "/api-v2/";

router.use(`${path}auth`, authRoute); // /api-v2/auth/
router.use(`${path}user`,profileRoute)
router.use(`${path}user`,donationRoute)
router.use(`${path}user`,paymentRoute)


export default router;

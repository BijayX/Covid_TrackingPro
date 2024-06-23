import express from "express";
import authRoute from "./authRoutes.js";
import profileRoute from "./profileRoutes.js"

const router = express.Router();

const path = "/api-v2/";

router.use(`${path}auth`, authRoute); // /api-v2/auth/
router.use(`${path}user`,profileRoute)

export default router;

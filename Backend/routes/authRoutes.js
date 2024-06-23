import express from 'express';
import { rateLimit } from 'express-rate-limit';
import { signIn, register, forgotPassword, verifyOtp, resetPassword, verifyEmail } from '../controller/auth/authController.js'
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the 'X-RateLimit-*' headers
});

const router = express.Router();

router.post('/register', limiter, register);
router.post('/login',  signIn);
router.post('/forgotPassword',forgotPassword)
router.post('/verifyOtp', verifyOtp)
router.post('/resetPassword', resetPassword)
router.post('/verify-email', verifyEmail )


export default router;

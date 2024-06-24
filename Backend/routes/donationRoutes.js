import express from 'express';
import { rateLimit } from 'express-rate-limit';
import { createDonation, getAllDonations } from '../controller/Donation/DonationController.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the 'X-RateLimit-*' headers
});

const router = express.Router();

router.post('/donation', limiter,isAuthenticated, createDonation);
router.get('/getAllDonations', isAuthenticated ,getAllDonations);



export default router;

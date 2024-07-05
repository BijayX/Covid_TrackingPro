import axios from "axios";
import { createDonationSchema } from "../../validation/validationSchemas.js";
import Users from "../../model/UserModel.js";
import Donation from "../../model/DonationModel.js";

export const initiateKhaltiPayment = async (req, res) => {
  const { error } = createDonationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { donationAmount, donationday } = req.body;
  const userId = req.user.id;

  try {
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newDonation = new Donation({
      donationAmount,
      donationday,
      user: userId,
    });

    await newDonation.save();

    const data = {
      return_url: "http://192.168.18.8:5173/success",
      purchase_order_id: newDonation._id,
      amount: donationAmount * 100,
      website_url: "http://localhost:3003/",
      purchase_order_name: "orderName_" + newDonation._id,
      customer_info: {
        name: user.fullName,
        email: user.email,
      },
    };

    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      data,
      {
        headers: {
          Authorization: "key 28d0324746e74eca9cfc7967a70ec71e",
        },
      }
    );

    newDonation.paymentDetails = { pidx: response.data.pidx };

    await newDonation.save();

    res.status(201).json({
      message: "Donation created and payment initiated successfully",
      donation: newDonation,
      paymentUrl: response.data.payment_url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// export const verifyPidx = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { pidx } = req.body;
//     console.log(pidx)

//     const response = await axios.post(
//       "https://a.khalti.com/api/v2/epayment/lookup/",
//       { pidx },
//       {
//         headers: {
//           Authorization: "key 28d0324746e74eca9cfc7967a70ec71e",
//         },
//       }
//     );

//     const user = await Users.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const donation = await Donation.findOne({
//       "paymentDetails.pidx": pidx,
//       user: userId,
//     });

//     if (!donation) {
//       return res.status(404).json({ message: "Donation not found" });
//     }

//     donation.paymentDetails = {
//       ...donation.paymentDetails,
//       status: response.data.status,
//       amount: response.data.amount,
//     };

//     await donation.save();

//     res.status(200).json({ message: "Payment verified successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

export const verifyPidx = async (req, res) => {
  const userId = req.user.id;
  const pidx = req.body.pidx;
  
  try {
    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/lookup/",
      { pidx },
      {
        headers: {
          Authorization: "key 28d0324746e74eca9cfc7967a70ec71e",
        },
      }
    );
    
    if (response.data.status === "Completed") {
      // Find the donation with the specified pidx
      let donation = await Donation.findOne({ "paymentDetails.pidx": pidx });

      if (donation) {
        // Update payment details
        donation.paymentDetails.method = "khalti";
        donation.paymentDetails.status = "paid";
        
        // Save the updated donation
        await donation.save();

        res.status(200).json({
          message: "Payment Verified Successfully!",
        });
      } else {
        res.status(404).json({
          message: "Donation not found for the given pidx.",
        });
      }
    } else {
      res.status(400).json({
        message: "Payment status not completed.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error.",
    });
  }
};


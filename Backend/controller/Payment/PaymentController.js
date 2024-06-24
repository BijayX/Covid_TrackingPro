import axios from "axios";
import Donation from "../../model/DonationModel.js";
import Users from "../../model/UserModel.js";

export const initiateKhaltiPayment = async (req, res) => {
  const { donationId } = req.body;
  if (!donationId) {
    return res.status(400).json({
      message: "Please provide donationId,amount",
    });
  }
  let donation = await Donation.findById(donationId);
  if (!donation) {
    return res.status(404).json({
      message: "donation not Found with that id",
    });
  }
  const amount = donation.donationAmount;

  // check the coming amount is the totalAmount of order
  if (donation.donationAmount !== amount) {
    return res.status(400).json({
      message: "Amount must be equal to totalAmount",
    });
  }
  const data = {
    return_url: "http://localhost:3003/success",
    purchase_order_id: donationId,
    amount: amount * 100,
    website_url: "https://digitalfoodbackend.onrender.com/",
    purchase_order_name: "orderName_" + donationId,
    customer_info: {
      name: "Ram Bahadur",
      email: "test@khalti.com",
      phone: "9800000001",
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

  donation.paymentDetails.pidx = response.data.pidx;

  await donation.save();
  res.status(200).json({
    message: "Payment successful",
    paymentUrl: response.data.payment_url,
  });
};

export const verifyPidx = async (req, res) => {
  try {
    const userId = req.user.id;
    const pidx = req.body.pidx;
    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/lookup/",
      { pidx },
      {
        headers: {
          Authorization: "key 28d0324746e74eca9cfc7967a70ec71e",
        },
      }
    );
    // console.log(response.data.status);
    if (response.data.status == "Completed") {
      let donation = await Donation.find({ "paymentDetails.pidx": pidx });

      donation[0].paymentDetails.method = "khalti";
      donation[0].paymentDetails.status = "paid";
      await donation[0].save();
      const user = await Users.findById(userId);
      await user.save();

      res.status(200).json({
        message: "Payment Verified Successfully!",
      });
    }
  } catch(err) {
    console.log(err)
    res.status(400).json({
      message: "Payment Verification failed",
    });
  }
};

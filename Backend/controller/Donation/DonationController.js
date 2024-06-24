import Donation from "../../model/DonationModel.js";
import Users from "../../model/UserModel.js";
import { createDonationSchema } from "../../validation/validationSchemas.js";

export const createDonation = async (req, res) => {
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
    res.status(201).json(newDonation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find().populate("user", "fullName email");
    res.status(200).json({ donations }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

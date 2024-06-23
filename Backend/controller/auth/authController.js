import Users from "../../model/UserModel.js";
import sendEmail from "../../services/sendEmail.js";
import {
  registerSchema,
  signInSchema,
  emailSchema,
  otpSchema,
  resetPasswordSchema,
  verifyotpSchema,
} from "../../validation/validationSchemas.js";

export const register = async (req, res) => {
  const { error } = registerSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { fullName, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const userExist = await Users.findOne({ email });

    if (userExist) {
      return res.status(409).json({ message: "Email Address already exists" });
    }

    const verifyOtp = Math.floor(100000 + Math.random() * 900000);

    const user = await Users.create({
      fullName,
      email,
      password,
      verifyOtp,
    });

    await sendEmail({
      email,
      subject: "Verify Your Email Address",
      message: `Your OTP for email verification is ${verifyOtp}.`,
    });

    res.status(201).json({
      success: true,
      message:
        "Account created successfully. Please check your email for the OTP.",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const signIn = async (req, res) => {
  const { error } = signInSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!user.isEmailVerified) {
      return res
        .status(401)
        .json({ message: "Please verify your email before logging in" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    user.password = undefined;

    const token = await user.createJWT();

    res.status(200).json({
      success: true,
      message: "Login successfully",
      data: user,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  const { error } = emailSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email } = req.body;

  try {
    const userExist = await Users.findOne({ email });

    if (!userExist) {
      return res.status(404).json({ message: "Email is not registered" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000);
    userExist.otp = otp;
    await userExist.save();

    await sendEmail({
      email,
      subject: "Your OTP for TopNepal forgot password",
      message: `Your OTP is ${otp}. Don't share it with anyone.`,
    });

    res.status(200).json({
      message: "OTP sent successfully",
      data: email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyOtp = async (req, res) => {
  const { error } = otpSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, otp } = req.body;

  try {
    const user = await Users.findOne({ email }).select("+otp +isOtpVerified");

    if (!user) {
      return res.status(404).json({ message: "Email is not registered" });
    }
   
    const userInputOtp = parseInt(otp, 10);
    if (user.otp !== userInputOtp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.otp = undefined;
    user.isOtpVerified = true;
    await user.save();

    res.status(200).json({ message: "OTP is correct" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const resetPassword = async (req, res) => {
  const { error } = resetPasswordSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, newPassword, confirmPassword } = req.body;

  try {
    const user = await Users.findOne({ email }).select("+isOtpVerified");

    if (!user) {
      return res.status(404).json({ message: "User email not registered" });
    }

    if (!user.isOtpVerified) {
      return res
        .status(403)
        .json({ message: "You cannot perform this action" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    user.password = newPassword;
    user.isOtpVerified = true;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An unexpected error occurred while resetting password",
    });
  }
};

// export const verifyEmail = async (req, res) => {
//   const { error } = verifyotpSchema.validate(req.body);

//   if (error) {
//     return res.status(400).json({ message: error.details[0].message });
//   }

//   const { email, verifyOtp } = req.body;

//   try {
//     const user = await Users.findOne({ email }).select("+verifyOtp +isEmailVerified");

//     if (!user) {
//       return res.status(404).json({ message: "Email is not registered" });
//     }

//     if (user.verifyOtp !== verifyOtp) {
//       return res.status(400).json({ message: "Invalid OTP" });
//     }

//     user.verifyOtp = undefined;
//     user.isEmailVerified = true;
//     await user.save();

//     res.status(200).json({ message: "Email verified successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

export const verifyEmail = async (req, res) => {
  const { error } = verifyotpSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, verifyOtp } = req.body;

  try {
    const user = await Users.findOne({ email }).select("+verifyOtp +isEmailVerified");

    if (!user) {
      return res.status(404).json({ message: "Email is not registered" });
    }

    console.log(`Stored OTP: ${user.verifyOtp}, Input OTP: ${verifyOtp}`);

    const userInputOtp = parseInt(verifyOtp, 10);
    if (user.verifyOtp !== userInputOtp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.verifyOtp = undefined;
    user.isEmailVerified = true;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

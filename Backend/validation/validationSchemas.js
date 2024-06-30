import Joi from 'joi';

export const registerSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match'
  }),
});

export const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const emailSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const otpSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.number().required(),
});

export const verifyotpSchema = Joi.object({
  email: Joi.string().email().required(),
  verifyOtp: Joi.number().required(),
});

export const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  newPassword: Joi.string().min(6).required(),
  confirmPassword: Joi.any().valid(Joi.ref('newPassword')).required().messages({
    'any.only': 'Passwords do not match'
  }),
});

export const createDonationSchema = Joi.object({
  donationAmount: Joi.number().required().messages({
    'number.base': 'Donation amount should be a number',
    'any.required': 'Donation amount is required',
  }),
  donationday: Joi.string().valid("Monthly", "Once").required().messages({
    'any.required':'Donation Day'
}),
 
});


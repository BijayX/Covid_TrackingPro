import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import Users from '../model/UserModel.js';

export const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({
      message: "Please login"
    });
  }

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);
    const doesUserExist = await Users.findById(decoded.userId);

    if (!doesUserExist) {
      return res.status(404).json({
        message: "User doesn't exist with that token/id"
      });
    }

    req.user = doesUserExist;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        message: "Token expired. Please login again."
      });
    }

    // Handle other JWT verification errors
    return res.status(500).json({
      message: error.message
    });
  }
};

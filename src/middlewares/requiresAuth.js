import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import createHttpError from "http-errors";

export const requiresAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw createHttpError(401, "Token Required!");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      throw createHttpError(400, "Invalid token!");
    }

    req.user = await User.findById(decoded.id).exec();

    next();
  } catch (error) {
    next(error);
  }
};

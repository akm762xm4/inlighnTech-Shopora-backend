import User from "../models/User.js";
import bcrypt from "bcryptjs";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

//Generate token for user
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// @desc Signup user
export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      throw createHttpError(400, "Please fill all fields!");
    }

    const existingUser = await User.findOne({ name }).exec();
    const existingEmail = await User.findOne({ email }).exec();

    if (existingUser || existingEmail) {
      throw createHttpError(409, "Username or email already taken");
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id.toString()),
    });
  } catch (error) {
    next(error);
  }
};

// @desc Login user
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw createHttpError(400, "Please fill all fields!");
    }

    const user = await User.findOne({ email })
      .select("+email +password")
      .exec();

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id.toString()),
        });
      } else {
        throw createHttpError(401, "invalid password");
      }
    } else {
      throw createHttpError(400, "User Not Found!");
    }
  } catch (error) {
    next(error);
  }
};

import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export const generateToken = (id) => {
  return jwt.sign({ id }, SECRET, { expiresIn: "1h" });
};

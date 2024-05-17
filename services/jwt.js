import jwt from "jsonwebtoken";
import "dotenv/config";

const { JWT_SECRETKEY, TOKEN_EXPIRATION_TIME } = process.env;

export const createToken = (payload) => {
  return jwt.sign(payload, JWT_SECRETKEY, { expiresIn: TOKEN_EXPIRATION_TIME });
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRETKEY);
};

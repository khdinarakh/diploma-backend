import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const user = await new User(req.body).save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

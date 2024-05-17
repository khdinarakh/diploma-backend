import User from "../models/User.js";
import { hashPassword, isValidPassword } from "../services/bcrypt.js";
import { createToken } from "../services/jwt.js";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
      return res.status(409).json({ message: "Email is already in use" });
    }

    const hashedPassword = await hashPassword(password);
    const user = await new User({
      firstName,
      lastName,
      email,
      password: hashedPassword
    }).save();

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Incorrect email or password" });
    }

    const passwordIsValid = await isValidPassword(password, user.password);
    if (!passwordIsValid) {
      res.status(404).json({ message: "Incorrect email or password" });
    }

    const payload = { id: user._id, role: user.role };
    const token = await createToken(payload);

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import User from "../models/User.js";
import { hashPassword, isValidPassword } from "../services/bcrypt.js";
import { createToken } from "../services/jwt.js";
import { sendActivationCode } from "../services/nodemailer.js";

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

    await sendActivationCode(user.activationCode, user.email);

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

    const payload = { id: user._id, role: user.role, isActivated: user.isActivated };
    const token = createToken(payload);

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const activate = async (req, res) => {
  try {
    const { code } = req.body;
    const user = await User.findOne({ activationCode: code });
    if (!user) {
      res.status(400).json({ message: "Activation code is not correct" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $set: { isActivated: true }, $unset: { activationCode: 1 } },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

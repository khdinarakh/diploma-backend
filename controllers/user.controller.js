import User from "../models/User.js";

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ message: "Users not found" });
    }

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const fillUserDetails = async (req, res) => {
  try {
    const { universityName, year, dateOfBirth, location } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { $set: { universityName, year, dateOfBirth, location } },
      { new: true }
    );

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMyAccount = async (req, res) => {
  try {
    const { firstName, lastName, email, universityName, year, dateOfBirth, location } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        $set: { firstName, lastName, email, universityName, year, dateOfBirth, location }
      },
      { new: true }
    );

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMyAccount = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

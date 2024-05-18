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

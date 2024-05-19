import Dorm from "../models/Dorm.js";
import Review from "../models/Review.js";

export const createReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment, rate } = req.body;

    const review = await new Review({ userId: req.userId, comment, rate }).save();
    await Dorm.findByIdAndUpdate(id, { $addToSet: { reviews: review._id } });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment, rate } = req.body;

    const review = await Review.findByIdAndUpdate(id, { comment, rate }, { new: true });

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    await Dorm.updateOne({ reviews: id }, { $pull: { reviews: id } });

    res.json({ message: "Review successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

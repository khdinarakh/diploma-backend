import Dorm from "../models/Dorm.js";
import { uploadFile, uploadFiles } from "../services/google-file-storage.js";
import { ensureBoolean } from "../utils/utils.js";

export const createDorm = async (req, res) => {
  try {
    const {
      slug,
      name,
      workEmail,
      phoneNumber,
      description,
      price,
      size,
      capacity,
      location,
      extras,
      hasWiFi,
      hasMeal
    } = req.body;
    const previewImageUrl = await uploadFile(req.files.preview[0], "dorms");
    const imageUrls = await uploadFiles(req.files.images, "dorms");

    const dorm = await new Dorm({
      slug,
      name,
      workEmail,
      phoneNumber,
      description,
      price: +price,
      size: +size,
      capacity: +capacity,
      extras: extras.split(";"),
      location,
      hasWiFi: ensureBoolean(hasWiFi),
      hasMeal: ensureBoolean(hasMeal),
      previewImageUrl,
      imageUrls
    }).save();

    res.status(201).json(dorm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDorm = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      slug,
      name,
      workEmail,
      phoneNumber,
      description,
      price,
      size,
      capacity,
      location,
      extras,
      hasWiFi,
      hasMeal
    } = req.body;

    const dorm = await Dorm.findByIdAndUpdate(
      id,
      {
        slug,
        name,
        workEmail,
        phoneNumber,
        description,
        price: +price,
        size: +size,
        capacity: +capacity,
        extras: typeof extras === "string" ? extras.split(";") : extras,
        location,
        hasWiFi: ensureBoolean(hasWiFi),
        hasMeal: ensureBoolean(hasMeal)
      },
      { new: true }
    );
    if (!dorm) {
      return res.status(404).json({ message: "Dorm not found" });
    }

    res.json(dorm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteDorm = async (req, res) => {
  try {
    const { id } = req.params;
    const dorm = await Dorm.findByIdAndDelete(id);
    if (!dorm) {
      return res.status(404).json({ message: "Dorm not found" });
    }

    res.json({ message: "Dorm successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllDorms = async (req, res) => {
  try {
    const dorms = await Dorm.aggregate([
      {
        $lookup: {
          from: "reviews",
          localField: "reviews",
          foreignField: "_id",
          as: "reviews"
        }
      },
      {
        $addFields: {
          overallRate: {
            $cond: {
              if: { $gt: [{ $size: "$reviews" }, 0] },
              then: {
                $avg: {
                  $map: {
                    input: "$reviews",
                    as: "review",
                    in: {
                      $avg: [
                        "$$review.rate.room",
                        "$$review.rate.location",
                        "$$review.rate.building",
                        "$$review.rate.bathroom"
                      ]
                    }
                  }
                }
              },
              else: null
            }
          }
        }
      },
      {
        $project: {
          name: 1,
          slug: 1,
          workEmail: 1,
          phoneNumber: 1,
          description: 1,
          price: 1,
          size: 1,
          capacity: 1,
          location: 1,
          extras: 1,
          hasWiFi: 1,
          hasMeal: 1,
          previewImageUrl: 1,
          imageUrls: 1,
          overallRate: 1
        }
      }
    ]);
    if (!dorms) {
      return res.status(404).json({ message: "Dorms not found" });
    }

    res.json(dorms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDormBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const dorm = await Dorm.findOne({ slug }).populate({
      path: "reviews",
      populate: { path: "userId" }
    });
    if (!dorm) {
      return res.status(404).json({ message: "Dorm not found" });
    }

    const overallRate = {
      overall: 0,
      room: 0,
      location: 0,
      building: 0,
      bathroom: 0
    };

    if (dorm.reviews.length > 0) {
      const totalReviews = dorm.reviews.length;

      overallRate.room =
        dorm.reviews.reduce((acc, review) => acc + review.rate.room, 0) / totalReviews;
      overallRate.location =
        dorm.reviews.reduce((acc, review) => acc + review.rate.location, 0) / totalReviews;
      overallRate.building =
        dorm.reviews.reduce((acc, review) => acc + review.rate.building, 0) / totalReviews;
      overallRate.bathroom =
        dorm.reviews.reduce((acc, review) => acc + review.rate.bathroom, 0) / totalReviews;
      overallRate.overall =
        (overallRate.room + overallRate.location + overallRate.building + overallRate.bathroom) / 4;
    }

    res.json({ ...dorm.toObject(), overallRate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getComparedDorms = async (req, res) => {
  try {
    const { dormsIds } = req.body;
    const dorms = await Dorm.find({ _id: { $in: dormsIds } });
    if (!dorms) {
      return res.status(404).json({ message: "Dorm not found" });
    }

    res.json(dorms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

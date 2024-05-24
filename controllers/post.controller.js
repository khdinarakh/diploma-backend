import Post from "../models/Post.js";
import { uploadFile } from "../services/google-file-storage.js";

export const createNewPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const imageUrl = await uploadFile(req.file, "blog");
    const post = await new Post({ title, content, imageUrl, userId: req.userId }).save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("userId");
    if (!posts) {
      return res.status(404).json({ message: "Posts not found" });
    }

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate("userId");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error(err));

// Post schema
const postSchema = new mongoose.Schema({
  title: String,
  date: { type: Date, default: Date.now },
  category: String,
  content: String,
});
const Post = mongoose.model("Post", postSchema);

// Routes
app.get("/posts", async (req, res) => {
  const posts = await Post.find().sort({ date: -1 });
  res.json(posts);
});

app.post("/posts", async (req, res) => {
  const newPost = new Post(req.body);
  await newPost.save();
  res.json(newPost);
});

// Auth routes
app.use("/auth", authRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

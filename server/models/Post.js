import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  date: { type: Date, default: Date.now },
  category: String,
  content: String,
});

export default mongoose.model("Post", postSchema);

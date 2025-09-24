// src/components/NewPostModal.jsx
import React, { useState } from "react";

export default function NewPostModal({ isOpen, onClose, addPost }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Life Lessons");
  const [content, setContent] = useState("");

  // Preset categories
  const categories = [
    "Life Lessons",
    "Productivity",
    "Communication",
    "Lifestyle",
    "Tech & Life",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;

    const newPost = {
      id: Date.now(),
      title,
      date: new Date().toISOString().split("T")[0],
      category,
      content,
    };

    addPost(newPost);

    // Reset form
    setTitle("");
    setContent("");
    setCategory(categories[0]);

    // Close modal
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">New Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />

          {/* Category Dropdown */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
            className="w-full p-2 border rounded"
          />

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

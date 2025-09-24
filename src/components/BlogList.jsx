// src/components/BlogList.jsx
import React from "react";
import { Link } from "react-router-dom";

function BlogList({ posts }) {
  if (!posts || posts.length === 0) {
    return <p className="text-center text-gray-500">No posts found.</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <div
          key={post._id} // ✅ use MongoDB _id
          className="p-6 border rounded-lg shadow hover:shadow-lg transition duration-300 bg-white"
        >
          <h2 className="text-xl font-bold mb-2">{post.title}</h2>

          {/* Format date properly */}
          <p className="text-sm text-gray-500 mb-4">
            {new Date(post.date).toLocaleDateString()}
          </p>

          <p className="text-gray-700 mb-4 line-clamp-3">
            {post.content.substring(0, 120)}...
          </p>

          {/* ✅ Use _id for link */}
          <Link
            to={`/post/${post._id}`}
            className="text-blue-600 hover:underline font-medium"
          >
            Read More
          </Link>
        </div>
      ))}
    </div>
  );
}

export default BlogList;

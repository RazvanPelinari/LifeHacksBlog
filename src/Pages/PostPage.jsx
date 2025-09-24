// src/pages/PostPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading post...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
        <p className="text-gray-500 text-lg mb-4">Post not found.</p>
        <Link
          to="/"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-6">
        {new Date(post.date).toLocaleDateString()}
      </p>

      {/* Markdown Content */}
      <div className="prose prose-lg max-w-full">
        <ReactMarkdown
          components={{
            h2: ({ node, ...props }) => (
              <h2 className="text-2xl font-semibold mt-6 mb-4" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="text-xl font-semibold mt-4 mb-3" {...props} />
            ),
            p: ({ node, ...props }) => <p className="mb-4" {...props} />,
            a: ({ node, ...props }) => (
              <a className="text-blue-600 hover:underline" {...props} />
            ),
            li: ({ node, ...props }) => (
              <li className="ml-6 list-disc mb-2" {...props} />
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      {/* Back Link */}
      <Link
        to="/"
        className="inline-block mt-8 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        ← Back to Home
      </Link>
    </div>
  );
}

export default PostPage;

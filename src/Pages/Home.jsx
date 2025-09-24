import { useEffect, useState } from "react";
import BlogList from "../components/BlogList";
import NewPostModal from "../components/NewPostModal";

function Home() {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const addPost = async (newPost) => {
    const res = await fetch("http://localhost:5000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    });
    const savedPost = await res.json();
    setPosts([savedPost, ...posts]);
  };

  const categories = ["All", ...new Set(posts.map((p) => p.category))];
  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 relative">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-24 text-center shadow-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-lg">
          Life Hacks from Unexpected Places
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90 leading-relaxed">
          Discover surprising lessons and actionable tips inspired by everyday
          things, movies, history, and more.
        </p>
      </section>

      {/* Categories */}
      <section className="py-12 text-center">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Filter by Category
        </h2>
        <div className="flex justify-center gap-3 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full font-medium shadow-sm transition transform hover:scale-105 ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-blue-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Blog List */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <BlogList posts={filteredPosts} />
      </section>

      {/* Floating + Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300 animate-bounce"
      >
        +
      </button>

      {/* New Post Modal */}
      <NewPostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        addPost={addPost}
      />
    </div>
  );
}

export default Home;

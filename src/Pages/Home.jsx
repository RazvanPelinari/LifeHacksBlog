import { useEffect, useState } from "react";
import BlogList from "../components/BlogList";
import NewPostModal from "../components/NewPostModal";

function Home() {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch posts from Railway backend
  useEffect(() => {
    fetch(`$https://lifehacksblog-production.up.railway.app/posts`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Failed to fetch posts:", err));
  }, []);

  const addPost = async (newPost) => {
    try {
      const res = await fetch(`$https://lifehacksblog-production.up.railway.app/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
      const savedPost = await res.json();
      setPosts([savedPost, ...posts]);
    } catch (err) {
      console.error("Failed to add post:", err);
    }
  };

  const categories = ["All", ...new Set(posts.map((p) => p.category))];
  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to Life Hacks from Unexpected Places
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Discover surprising lessons and actionable tips inspired by everyday
          things, movies, history, and more.
        </p>
      </section>

      {/* Categories */}
      <section className="py-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Filter by Category</h2>
        <div className="flex justify-center gap-4 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full border transition ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Blog List */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <BlogList posts={filteredPosts} />
      </section>

      {/* Floating + Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-lg hover:bg-blue-700 transition z-50"
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

import React, { useState, useEffect } from "react";
import SignupModal from "../components/SignupModal";
import LoginModal from "../components/LoginModal";

const backendURL = "https://lifehacksblog-production.up.railway.app";

function Navbar({ user, setUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Fetch current user if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user) {
      fetch(`${backendURL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setUser(data.user))
        .catch(() => setUser(null));
    }
  }, [user, setUser]);

  const links = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsProfileOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50">
      <div className="backdrop-blur-md bg-white/30 border-b border-white/20 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-6">
              <div className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LifeHacksBlog
              </div>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-6 items-center">
              {links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.path}
                  className="text-gray-800 hover:text-blue-600 transition font-medium"
                >
                  {link.name}
                </a>
              ))}

              {!user ? (
                <>
                  <button
                    onClick={() => setIsSignupOpen(true)}
                    className="px-4 py-1 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition font-medium"
                  >
                    Sign Up
                  </button>
                  <button
                    onClick={() => setIsLoginOpen(true)}
                    className="px-4 py-1 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-100 transition font-medium"
                  >
                    Login
                  </button>
                </>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold"
                    title={user.username || user.email}
                  >
                    {user.username ? user.username[0].toUpperCase() : "U"}
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg py-2 text-gray-800 z-50">
                      <a
                        href="/settings"
                        className="block px-4 py-2 hover:bg-gray-100 transition"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Settings
                      </a>
                      <a
                        href="/preferences"
                        className="block px-4 py-2 hover:bg-gray-100 transition"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Preferences
                      </a>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu omitted for brevity */}
          </div>
        </div>
      </div>

      {/* Modals */}
      {isSignupOpen && (
        <SignupModal onClose={() => setIsSignupOpen(false)} setUser={setUser} />
      )}
      {isLoginOpen && (
        <LoginModal onClose={() => setIsLoginOpen(false)} setUser={setUser} />
      )}
    </nav>
  );
}

export default Navbar;

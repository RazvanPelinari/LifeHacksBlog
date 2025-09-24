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
      {/* Top nav */}
      <div className="backdrop-blur-md bg-white/30 border-b border-white/20 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
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

                  {/* Profile Dropdown */}
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

            {/* Mobile Hamburger */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-800 hover:text-blue-600 focus:outline-none"
              >
                {isOpen ? (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden backdrop-blur-md bg-white/40 border-t border-white/20 px-2 pt-2 pb-4 space-y-1 shadow-lg">
          {links.map((link, idx) => (
            <a
              key={idx}
              href={link.path}
              className="block px-3 py-2 rounded-md text-gray-800 hover:bg-white/30 hover:text-blue-600 transition"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}

          {!user ? (
            <>
              <button
                onClick={() => {
                  setIsSignupOpen(true);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition font-medium"
              >
                Sign Up
              </button>
              <button
                onClick={() => {
                  setIsLoginOpen(true);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-100 transition font-medium"
              >
                Login
              </button>
            </>
          ) : (
            <div className="block w-full text-left px-3 py-2 rounded-md border border-gray-300 text-gray-800 hover:bg-gray-100 transition">
              {user.username || user.email}
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      {isSignupOpen && (
        <SignupModal
          onClose={() => setIsSignupOpen(false)}
          setUser={setUser}
          switchToLogin={() => {
            setIsSignupOpen(false);
            setIsLoginOpen(true);
          }}
        />
      )}

      {isLoginOpen && (
        <LoginModal
          onClose={() => setIsLoginOpen(false)}
          setUser={setUser}
          switchToSignup={() => {
            setIsLoginOpen(false);
            setIsSignupOpen(true);
          }}
        />
      )}
    </nav>
  );
}

export default Navbar;

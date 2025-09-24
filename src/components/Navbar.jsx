// src/components/Navbar.jsx
import React, { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

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

              {/* Sign Up / Login Buttons */}
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
            </div>

            {/* Mobile Menu Button */}
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

          {/* Mobile Sign Up / Login Buttons */}
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
        </div>
      )}

      {/* Sign Up Modal */}
      {isSignupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-xl p-8 max-w-md w-full relative shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-white">Sign Up</h2>
            <form className="space-y-4 text-white">
              <input
                className="w-full border border-white/40 rounded p-2 bg-white/10 text-white placeholder-white/70"
                placeholder="Username"
              />
              <input
                className="w-full border border-white/40 rounded p-2 bg-white/10 text-white placeholder-white/70"
                placeholder="Email"
                type="email"
              />
              <input
                className="w-full border border-white/40 rounded p-2 bg-white/10 text-white placeholder-white/70"
                placeholder="Password"
                type="password"
              />
              <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-medium">
                Create Account
              </button>
            </form>
            <p className="mt-4 text-center text-white/80">
              Already have an account?{" "}
              <span
                onClick={() => {
                  setIsSignupOpen(false);
                  setIsLoginOpen(true);
                }}
                className="text-blue-400 hover:underline cursor-pointer"
              >
                Login
              </span>
            </p>
            <button
              onClick={() => setIsSignupOpen(false)}
              className="absolute top-2 right-2 text-white/80 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-xl p-8 max-w-md w-full relative shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-white">Login</h2>
            <form className="space-y-4 text-white">
              <input
                className="w-full border border-white/40 rounded p-2 bg-white/10 text-white placeholder-white/70"
                placeholder="Email"
                type="email"
              />
              <input
                className="w-full border border-white/40 rounded p-2 bg-white/10 text-white placeholder-white/70"
                placeholder="Password"
                type="password"
              />
              <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-medium">
                Login
              </button>
            </form>
            <p className="mt-4 text-center text-white/80">
              New here?{" "}
              <span
                onClick={() => {
                  setIsLoginOpen(false);
                  setIsSignupOpen(true);
                }}
                className="text-blue-400 hover:underline cursor-pointer"
              >
                Create an account
              </span>
            </p>
            <button
              onClick={() => setIsLoginOpen(false)}
              className="absolute top-2 right-2 text-white/80 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

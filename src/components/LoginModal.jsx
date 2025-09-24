import React, { useState } from "react";
import SignupModal from "./SignupModal"; // make sure you have this

function LoginModal({ setIsOpen, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignup, setShowSignup] = useState(false);

  const backendURL = "https://lifehacksblog-production.up.railway.app";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${backendURL}/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        setUser({ username: data.user.username, email: data.user.email });
        setIsOpen(false);
      } else {
        alert(data.message || "Login failed. Check your credentials.");
      }
    } catch (err) {
      console.error(err);
      alert("Login error. Please try again later.");
    }
  };

  return (
    <>
      {/* Login Modal */}
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-xl p-8 max-w-md w-full relative shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-white">Login</h2>
          <form className="space-y-4 text-white" onSubmit={handleLogin}>
            <input
              className="w-full border border-white/40 rounded p-2 bg-white/10 text-white placeholder-white/70"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="w-full border border-white/40 rounded p-2 bg-white/10 text-white placeholder-white/70"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-medium"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-white/80">
            New here?{" "}
            <span
              onClick={() => {
                setIsOpen(false);
                setShowSignup(true);
              }}
              className="text-blue-400 hover:underline cursor-pointer"
            >
              Create an account
            </span>
          </p>

          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-white/80 hover:text-white"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Show Signup Modal if clicked */}
      {showSignup && <SignupModal setIsOpen={setShowSignup} setUser={setUser} />}
    </>
  );
}

export default LoginModal;

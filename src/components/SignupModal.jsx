import React, { useState } from "react";

const backendURL = "https://lifehacksblog-production.up.railway.app";

export default function SignupModal({ onClose, setUser, switchToLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${backendURL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        localStorage.setItem("token", data.token);
        onClose();
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      alert("Signup error");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="relative bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-8 max-w-md w-full shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white hover:text-gray-200 text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6 text-white text-center">
          Sign Up
        </h2>

        <form className="space-y-4" onSubmit={handleSignup}>
          <input
            className="w-full p-2 rounded bg-white/10 text-white placeholder-white/70 border border-white/40"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="w-full p-2 rounded bg-white/10 text-white placeholder-white/70 border border-white/40"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full p-2 rounded bg-white/10 text-white placeholder-white/70 border border-white/40"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 transition text-white rounded font-medium"
          >
            Create Account
          </button>
        </form>

        <p className="mt-4 text-center text-white/80">
          Already have an account?{" "}
          <span
            onClick={switchToLogin}
            className="text-blue-400 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

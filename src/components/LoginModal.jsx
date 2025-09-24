import React, { useState } from "react";

function LoginModal({ setIsOpen, setUser, openSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const backendURL = "https://lifehacksblog-production.up.railway.app";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${backendURL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        localStorage.setItem("token", data.token);
        setIsOpen(false);
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Login error");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-xl p-8 max-w-md w-full relative shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-white">Login</h2>
        <form className="space-y-4 text-white" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-white/40 rounded p-2 bg-white/10 text-white placeholder-white/70"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-white/40 rounded p-2 bg-white/10 text-white placeholder-white/70"
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
              openSignup();
            }}
            className="text-blue-400 hover:underline cursor-pointer"
          >
            Create an account
          </span>
        </p>
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-white/80 hover:text-white text-xl font-bold"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default LoginModal;

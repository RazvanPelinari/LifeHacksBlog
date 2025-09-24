import React, { useState } from "react";

const backendURL = "https://lifehacksblog-production.up.railway.app";

function LoginModal({ onClose, setUser, openSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${backendURL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        localStorage.setItem("token", data.token);
        onClose();
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Login error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-xl p-8 max-w-md w-full relative shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-white">Login</h2>
        <form className="space-y-4 text-white" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-white/40 rounded p-2 bg-white/10 text-white placeholder-white/70"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-white/40 rounded p-2 bg-white/10 text-white placeholder-white/70"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-medium"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* New here link */}
        <p className="mt-4 text-center text-white/80">
          New here?{" "}
          <span
            onClick={() => {
              onClose();
              openSignup();
            }}
            className="text-blue-400 hover:underline cursor-pointer"
          >
            Create an account
          </span>
        </p>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white/80 hover:text-white text-xl font-bold"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default LoginModal;

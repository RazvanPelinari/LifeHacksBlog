import React, { useState } from "react";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

export default function AuthModalManager({ setUser }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const openLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  const openSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const closeAll = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  return (
    <>
      <button
        onClick={openLogin}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Login
      </button>
      <button
        onClick={openSignup}
        className="px-4 py-2 bg-gray-600 text-white rounded ml-2"
      >
        Sign Up
      </button>

      {showLogin && (
        <LoginModal
          onClose={closeAll}
          setUser={setUser}
          switchToSignup={openSignup}
        />
      )}
      {showSignup && (
        <SignupModal
          onClose={closeAll}
          setUser={setUser}
          switchToLogin={openLogin}
        />
      )}
    </>
  );
}

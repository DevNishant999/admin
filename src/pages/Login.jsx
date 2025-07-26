import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user)); // ✅ store full user object
        localStorage.setItem("loggedIn", true);
        navigate("/");
        console.log(data)
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="flex items-center flex-col justify-center min-h-screen bg-[#f0f6f2]">
      <img
        src="https://qhtclinic.com/wp-content/uploads/2024/04/qht-logo-final.png"
        className="mb-10 invert w-[200px]"
        alt=""
      />
      <div className="bg-white p-8 rounded shadow-sm w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Sign in <span className="text-[#586548]">QHT Clinic</span> Admin
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#586548] text-white px-4 py-2 rounded hover:bg-[#586548] cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

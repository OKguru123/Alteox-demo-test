"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/services/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import { log } from "console";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/login", { email, password });

      localStorage.setItem("accessToken", response?.data?.token);
      toast.success("Login successfully");

      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data.error || "Something went wrong");
      console.error("Error logging in:", error.response?.data || error.message);
    } finally {
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/auth/register");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/bgimage1.jpg')] bg-cover bg-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
        <img src="/pokemonlogo.png" alt="Top Image" className="mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-200"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-200"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-00 transition"
          >
            Login
          </button>
          <button
            type="submit"
            onClick={handleRegister}
            className="w-full bg-orange-400 text-white py-2 rounded hover:bg-yellow-600 transition"
          >
            Register
          </button>
          <div className="text-red-400">{error}</div>
        </form>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axiosInstance from "@/app/services/axiosInstance";

// Define Organization Type
interface Organization {
  id: string;
  name: string;
}

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [allOrganizations, setAllOrganizations] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Selected Organization:", organization); // Debugging log

      await axiosInstance.post("/register-user", {
        email,
        password,
        organizationId: organization?.id, // Send only ID
      });

      toast.success("User registered successfully!");
      router.push("/auth/login");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Something went wrong");
      console.error("Error registering user:", error.response);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await axiosInstance.get("/organizations");

        setAllOrganizations(response.data.organizations);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    };

    fetchOrganizations();
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-start bg-cover bg-center"
      style={{ backgroundImage: "url('/bgimage3.jpg')" }}
    >
      <div className="max-w-md w-full m-20 bg-white p-8 rounded-lg shadow-lg text-left min-h-[600px]">
        <img src="/pokemonlogo.png" alt="Top Image" className="mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-6 items-center">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Organization Selection */}
          <div>
            <label htmlFor="organization" className="block text-gray-700">
              Select your organization
            </label>
            <select
              id="organization"
              value={organization?.id || ""}
              onChange={(e) => {
                const selectedOrg = allOrganizations.find(
                  (org: any) => org.id === parseInt(e.target.value)
                );
                setOrganization(selectedOrg || null);
              }}
              className="mt-1 w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-orange-600-400"
            >
              <option value="">Select an organization</option>
              {allOrganizations.map((org: any) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
          </div>

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

          {/* Password Input */}
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-orange-400 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

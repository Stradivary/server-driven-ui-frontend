"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Dashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<{ username: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/auth");
      return;
    }

    axios
      .get("http://localhost:3001/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProfile(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        router.push("/auth");
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setProfile(null);
    router.push("/auth");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="p-6 bg-white shadow-lg rounded-lg w-80 text-center">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        {profile ? (
          <>
            <p className="text-lg">Welcome, {profile.username}!</p>
            <button
              onClick={handleLogout}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

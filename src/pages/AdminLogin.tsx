import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {  
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // SIMPLE ADMIN PASSWORD
    if (password === "@Gabtech123") {
      localStorage.setItem("adminAuth", "true");
      navigate("/admin");
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-4">
      
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8">

        <h1 className="text-3xl font-bold text-cyan-400 mb-6 text-center">
          Admin Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="block text-gray-300 mb-2">
              Admin Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 rounded-lg bg-[#0b1120] border border-white/10 text-white outline-none focus:border-cyan-500"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-semibold transition"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
} 
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Feedback {
  id: number;
  name: string;
  email: string;
  phone: string;
  rating: string;
  message: string;
  created_at: string;
  status?: string;
}

type FilterType = "all" | "pending" | "approved" | "rejected";

export default function AdminDashboard() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [visibleDetails, setVisibleDetails] = useState<number | null>(null);

  const navigate = useNavigate();

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin-login");
  };

  // FETCH FEEDBACKS
  const fetchFeedbacks = async () => {
    try {
      const response = await fetch("http://localhost:5000/feedback");
      const data = await response.json();
      setFeedbacks(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();

    // LIVE REFRESH every 10 seconds
    const interval = setInterval(fetchFeedbacks, 10000);
    return () => clearInterval(interval);
  }, []);

  // DELETE
  const deleteFeedback = async (id: number) => {
    await fetch(`http://localhost:5000/feedback/${id}`, {
      method: "DELETE",
    });
    fetchFeedbacks();
  };

  // APPROVE
  const approveFeedback = async (id: number) => {
    await fetch(`http://localhost:5000/feedback/${id}/approve`, {
      method: "PUT",
    });
    fetchFeedbacks();
  };

  // REJECT
  const rejectFeedback = async (id: number) => {
    await fetch(`http://localhost:5000/feedback/${id}/reject`, {
      method: "PUT",
    });
    fetchFeedbacks();
  };

  // FILTER LOGIC
  const filteredFeedbacks = feedbacks.filter((item) => {
    if (filter === "all") return true;
    return item.status === filter;
  });

  return (
    <div className="min-h-screen bg-[#050816] text-white p-6 md:p-10">

      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-cyan-400">
          Admin Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* FILTERS */}
      <div className="flex gap-3 mb-8 flex-wrap">
        {["all", "pending", "approved", "rejected"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as FilterType)}
            className={`px-4 py-2 rounded-lg text-sm border transition ${
              filter === f
                ? "bg-cyan-500 text-black"
                : "border-white/20 hover:bg-white/10"
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* FEEDBACK LIST */}
      <div className="space-y-6">

        {filteredFeedbacks.length === 0 ? (
          <p className="text-gray-400">No feedback found.</p>
        ) : (
          filteredFeedbacks.map((item) => (
            <div
              key={item.id}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >

              {/* HEADER */}
              <div className="flex justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-cyan-300">
                    {item.name}
                  </h2>

                  <p className="text-sm text-gray-400">
                    ⭐ {item.rating}/5
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {item.status || "pending"}
                  </p>
                </div>

                <button
                  onClick={() =>
                    setVisibleDetails(
                      visibleDetails === item.id ? null : item.id
                    )
                  }
                  className="text-sm text-cyan-400 underline"
                >
                  {visibleDetails === item.id ? "Hide" : "View"}
                </button>
              </div>

              {/* MESSAGE */}
              <p className="text-gray-300 mt-4">{item.message}</p>

              {/* PRIVATE DETAILS (HIDDEN BY DEFAULT) */}
              {visibleDetails === item.id && (
                <div className="mt-4 text-sm text-gray-400 border-t border-white/10 pt-4 space-y-1">
                  <p>Email: {item.email || "N/A"}</p>
                  <p>Phone: {item.phone}</p>
                </div>
              )}

              {/* ACTIONS */}
              <div className="flex gap-3 mt-5 flex-wrap">

                <button
                  onClick={() => approveFeedback(item.id)}
                  className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg text-sm"
                >
                  Approve
                </button>

                <button
                  onClick={() => rejectFeedback(item.id)}
                  className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded-lg text-sm"
                >
                  Reject
                </button>

                <button
                  onClick={() => deleteFeedback(item.id)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg text-sm"
                >
                  Delete
                </button>

              </div>

              {/* TIME */}
              <p className="text-xs text-gray-500 mt-4">
                {new Date(item.created_at).toLocaleString()}
              </p>

            </div>
          ))
        )}

      </div>
    </div>
  );
}
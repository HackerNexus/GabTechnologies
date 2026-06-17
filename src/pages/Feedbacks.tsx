import { useEffect, useState } from "react";

interface FeedbackItem {

  id: number;
  name: string;
  email: string;
  phone: string;
  rating: string;
  message: string;
}

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/public-feedbacks")
      .then((res) => res.json())
      .then((data) => setFeedbacks(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-[#050816] text-white p-10">
      
      <h1 className="text-4xl font-bold text-cyan-400 mb-8">
        Customer Feedbacks
      </h1>

      <div className="space-y-6">
        {feedbacks.map((item) => (
          <div
            key={item.id}
            className="border border-white/10 rounded-xl p-6 bg-white/5"
          >
            <h2 className="text-xl font-semibold text-cyan-300">
  {item.name}
</h2>

<p className="text-gray-400 text-sm mt-1">
  📧 {item.email}
</p>

<p className="text-gray-400 text-sm">
  📞 {item.phone}
</p>

<p className="text-yellow-400 text-sm">
  ⭐ Rating: {item.rating}/5
</p>

<p className="text-gray-300 mt-2">
  {item.message}
</p>
          </div>
        ))}
      </div>

    </div>
  );
}
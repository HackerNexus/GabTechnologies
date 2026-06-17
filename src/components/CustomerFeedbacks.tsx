import React from "react";
import { Link } from "react-router-dom";

export default function CustomerFeedbacks() {
  return (
    <section className="py-20 bg-[#050816] text-white">

      <div className="max-w-5xl mx-auto px-4 text-center">

        <div className="bg-white/5 border border-white/10 rounded-2xl p-10 backdrop-blur-xl">

          <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-6">
            What Our Customers Say
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
            Hear directly from clients who trust Gab Technologies
            for CCTV installations, Starlink setups, smart security,
            networking solutions and professional tech support.
          </p>

          <Link
            to="/feedback"
            className="inline-flex items-center justify-center
            px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-600
            transition-all duration-300 text-white font-semibold
            shadow-lg shadow-cyan-500/20"
          >
            View Customer Feedbacks
          </Link>

        </div>

      </div>

    </section>
  );
}
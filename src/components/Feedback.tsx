"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, Send } from "lucide-react";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

interface FeedbackFormData {
  name: string;
  email: string;
  phone: string;
  rating: string;
  message: string;
}

function FeedbackFormContent() {
  const { ref, isVisible } = useRevealOnScroll({ threshold: 0.2 });

  const ratingLabels = [
    "Very Bad",
    "Bad",
    "Okay",
    "Good",
    "Excellent",
  ];

  const [form, setForm] = useState<FeedbackFormData>({
    name: "",
    email: "",
    phone: "",
    rating: "",
    message: "",
  });

  const [hoverRating, setHoverRating] = useState(0);
  const [errors, setErrors] = useState<Partial<FeedbackFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // ── Validation ──
  const validate = (): boolean => {
    const newErrors: Partial<FeedbackFormData> = {};

    if (!form.name || form.name.length < 2)
      newErrors.name = "Name must be at least 2 characters";
    if (form.name.length > 50)
      newErrors.name = "Name must not exceed 50 characters";

    if (
      form.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!/^7\d{8}$/.test(form.phone))
      newErrors.phone = "Enter a valid Safaricom/Airtel number";

    if (!form.rating)
      newErrors.rating = "Please select a rating";

    if (!form.message || form.message.length < 10)
      newErrors.message = "Message must be at least 10 characters";
    if (form.message.length > 500)
      newErrors.message = "Message must not exceed 500 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // ── Submit ──
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("http://localhost:5000/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Failed");

      setIsSubmitted(true);
    } catch {
      setSubmitError("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm({ name: "", email: "", phone: "", rating: "", message: "" });
    setErrors({});
    setIsSubmitted(false);
    setSubmitError("");
  };

  const inputClass = (field: keyof FeedbackFormData) =>
    `w-full bg-white/5 border rounded-lg px-4 py-3 text-white placeholder:text-gray-500 outline-none transition-all duration-200 focus:ring-2 ${
      errors[field]
        ? "border-red-500 focus:ring-red-500/30"
        : "border-white/10 focus:border-blue-500 focus:ring-blue-500/20"
    }`;
  
  // ── SUCCESS SCREEN ──
  if (isSubmitted && !submitError) {
    return (
      <div className="p-8 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
        <div className="text-4xl mb-4">✅</div>

        <p className="text-white font-semibold text-lg mb-2">
          Thank you for your feedback!
        </p>

        <p className="text-gray-400 mb-6">
          We appreciate your input.
        </p>

        <motion.button
          onClick={resetForm}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-all"
        >
          Submit Another Feedback
        </motion.button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>

      {/* NAME */}
      <div ref={ref}>
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Full Name *
        </label>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className={inputClass("name")}
        />

        {errors.name && (
          <p className="text-red-400 text-xs">{errors.name}</p>
        )}
      </div>

      {/* EMAIL */}
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Email <span className="text-gray-500 text-xs">(Optional)</span>
        </label>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className={inputClass("email")}
        />

        {errors.email && (
          <p className="text-red-400 text-xs">{errors.email}</p>
        )}
      </div>

      {/* PHONE */}
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Phone *
        </label>

        <div className="flex items-center bg-white/5 border border-white/10 rounded-lg overflow-hidden focus-within:border-blue-500">
          <span className="px-4 text-gray-400">+254</span>

          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 9) {
                setForm((prev) => ({ ...prev, phone: value }));
                setErrors((prev) => ({ ...prev, phone: "" }));
              }
            }}
            placeholder="7XXXXXXXX or 1XXXXXXXX"
            className="w-full bg-transparent px-4 py-3 text-white outline-none"
          />
        </div>

        {errors.phone && (
          <p className="text-red-400 text-xs">{errors.phone}</p>
        )}
      </div>

      {/* RATING */}
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Rating *
        </label>

        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((i) => {
            const selected =
              (hoverRating || Number(form.rating)) >= i;

            return (
              <button
                key={i}
                type="button"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    rating: String(i),
                  }))
                }
                onMouseEnter={() => setHoverRating(i)}
                onMouseLeave={() => setHoverRating(0)}
                className="transition-all duration-300 hover:scale-110"
              >
                <Star
                  className={`w-10 h-10 ${
                    selected
                      ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.9)]"
                      : "text-gray-600"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <p className="text-sm text-gray-400 mt-2">
          {form.rating
            ? ratingLabels[Number(form.rating) - 1]
            : "Select rating"}
        </p>

        {errors.rating && (
          <p className="text-red-400 text-xs">{errors.rating}</p>
        )}
      </div>

      {/* MESSAGE */}
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Message *
        </label>

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          className={inputClass("message")}
        />

        {errors.message && (
          <p className="text-red-400 text-xs">{errors.message}</p>
        )}
      </div>

      {/* ERROR */}
      {submitError && (
        <p className="text-red-400 text-sm">{submitError}</p>
      )}

      {/* SUBMIT BUTTON */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg shadow-lg disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Submit Feedback
          </>
        )}
      </motion.button>
    </form>
  );
}

// ── MAIN COMPONENT ──
export default function CustomerFeedbackForm() {
  return (
    <section className="py-16 bg-[#050816] text-white">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">
          Share Your Feedback
        </h2>

        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <FeedbackFormContent />
        </div>
      </div>
    </section>
  );
}
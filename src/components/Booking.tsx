"use client";

import React, { useState } from "react";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

const SERVICES = [
  "CCTV Installation",
  "WiFi & Networking",
  "Starlink Setup",
  "Smart Security System",
  "Electric Fence Installation",
  "Access Control",
  "IT Support",
  "Network Cabling",
  "Other / Custom",
];

interface BookingFormData {
  name: string;
  phone: string;
  location: string;
  service: string;
}

interface BookingErrors {
  name?: string;
  phone?: string;
  location?: string;
  service?: string;
}

export default function Booking() {
  const { ref, isVisible } = useRevealOnScroll({ threshold: 0.1 });

  const [form, setForm] = useState<BookingFormData>({
    name: "",
    phone: "",
    location: "",
    service: "",
  });

  const [errors, setErrors]             = useState<BookingErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted]   = useState(false);
  const [submitError, setSubmitError]   = useState("");

  // ── Validation ──
  const validate = (): boolean => {
    const newErrors: BookingErrors = {};

    if (!form.name.trim() || form.name.trim().length < 2)
      newErrors.name = "Please enter your full name (at least 2 characters)";

    if (!form.phone.trim() || !/^\+?[0-9]{9,15}$/.test(form.phone.replace(/\s/g, "")))
      newErrors.phone = "Please enter a valid phone number";

    if (!form.location.trim() || form.location.trim().length < 3)
      newErrors.location = "Please enter your location or area";

    if (!form.service)
      newErrors.service = "Please select the service you need";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      // ── Replace this with your actual API / EmailJS / Formspree call ──
      await new Promise(r => setTimeout(r, 1800));
      setIsSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm({ name: "", phone: "", location: "", service: "" });
    setErrors({});
    setIsSubmitted(false);
    setSubmitError("");
  };

  // WhatsApp fallback
  const waMessage = `Hello Gab Technologies! My name is ${form.name || "[Name]"} and I would like to book *${form.service || "[Service]"}* at *${form.location || "[Location]"}*. My phone: ${form.phone || "[Phone]"}.`;
  const waLink = `https://wa.me/254721258620?text=${encodeURIComponent(waMessage)}`;

  // Input class helper
  const inputClass = (field: keyof BookingErrors) =>
    `w-full px-4 py-3 rounded-xl text-white placeholder:text-gray-500 outline-none transition-all duration-200 focus:ring-2 ${
      errors[field]
        ? "bg-red-500/10 border border-red-500/50 focus:ring-red-500/20"
        : "bg-white/5 border border-white/10 focus:border-blue-500/60 focus:ring-blue-500/20"
    }`;

  return (
    <section
      id="booking"
      style={{ background: "var(--bg2)" }}
      className="relative w-full py-20 md:py-28 overflow-hidden"
    >
      {/* Background orbs */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "-10%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "rgba(37,99,235,0.12)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          left: "-8%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(6,182,212,0.1)",
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div ref={ref} className="text-center mb-16">
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--font-h)",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#06b6d4",
                marginBottom: 16,
              }}
            >
              <span style={{ width: 24, height: 2, background: "#06b6d4", display: "inline-block" }} />
              Book A Service
            </span>

            <h2
              style={{
                fontFamily: "var(--font-h)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: 16,
              }}
            >
              Schedule Your{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Installation
              </span>
            </h2>

            <p style={{ color: "var(--text2)", fontSize: "1.05rem", maxWidth: 520, margin: "0 auto" }}>
              Fill in your details below and our team will contact you within
              2 hours to confirm your booking.
            </p>
          </div>
        </div>

        {/* ── Two columns ── */}
        <div
          className="booking-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.6fr",
            gap: 40,
            alignItems: "start",
          }}
        >
          {/* Left — info cards */}
          <div
            className={`transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            {/* Why book */}
            <div
              style={{
                background: "rgba(37,99,235,0.06)",
                border: "1px solid rgba(37,99,235,0.15)",
                borderRadius: 20,
                padding: 28,
                marginBottom: 20,
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-h)",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "#3b82f6",
                  marginBottom: 16,
                }}
              >
                Why Book With Us?
              </h3>
              {[
                { icon: "⚡", text: "Same-day response guaranteed" },
                { icon: "🛡️", text: "Certified & insured technicians" },
                { icon: "💰", text: "Free site survey & quotation" },              
                { icon: "📍", text: "We come to your location" },
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    fontSize: "0.88rem",
                    color: "var(--text2)",
                  }}
                >
                  <span style={{ fontSize: "1.1rem" }}>{icon}</span>
                  {text}
                </div>
              ))}
            </div>

            {/* Contact info */}
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 20,
                padding: 28,
                marginBottom: 20,
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-h)",
                  fontWeight: 700,
                  fontSize: "1rem",
                  marginBottom: 16,
                  color: "#f1f5f9",
                }}
              >
                Prefer to Call?
              </h3>
              {[
                { icon: "📞", label: "Phone", value: "+254 721 258 620" },
                { icon: "🕐", label: "Hours", value: "Mon–Sat: 7AM – 6PM" },
                { icon: "🚨", label: "Emergency", value: "24/7 Available" },
              ].map(({ icon, label, value }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    gap: 12,
                    marginBottom: 14,
                    alignItems: "flex-start",
                  }}
                >
                  <span style={{ fontSize: "1.1rem" }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text3)", fontFamily: "var(--font-h)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
                    <div style={{ fontSize: "0.9rem", color: "#f1f5f9", fontWeight: 600 }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp shortcut */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "16px 20px",
                borderRadius: 16,
                background: "rgba(37,211,102,0.08)",
                border: "1px solid rgba(37,211,102,0.2)",
                textDecoration: "none",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "rgba(37,211,102,0.15)";
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "rgba(37,211,102,0.08)";
                el.style.transform = "translateY(0)";
              }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.86L.057 23.886l6.188-1.623A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.96 0-3.792-.507-5.389-1.394l-.385-.228-4.01 1.051 1.07-3.907-.252-.4A9.962 9.962 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              <div>
                <div style={{ color: "#25D366", fontFamily: "var(--font-h)", fontWeight: 700, fontSize: "0.9rem" }}>
                  Book via WhatsApp
                </div>
                <div style={{ color: "#94a3b8", fontSize: "0.78rem", marginTop: 2 }}>
                  Instant confirmation
                </div>
              </div>
            </a>
          </div>

          {/* Right — form */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 24,
              padding: "40px 36px",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Success state */}
            {isSubmitted && !submitError ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: "3.5rem", marginBottom: 16 }}>🎉</div>
                <h3
                  style={{
                    fontFamily: "var(--font-h)",
                    fontWeight: 800,
                    fontSize: "1.4rem",
                    marginBottom: 12,
                    color: "#f1f5f9",
                  }}
                >
                  Booking Request Sent!
                </h3>
                <p style={{ color: "var(--text2)", marginBottom: 8, lineHeight: 1.7 }}>
                  Thank you, <strong style={{ color: "#3b82f6" }}>{form.name}</strong>!
                  Our team will call you at{" "}
                  <strong style={{ color: "#3b82f6" }}>{form.phone}</strong> within
                  2 hours to confirm your{" "}
                  <strong style={{ color: "#3b82f6" }}>{form.service}</strong> booking.
                </p>
                <p style={{ color: "var(--text3)", fontSize: "0.85rem", marginBottom: 32 }}>
                  Check your WhatsApp for a confirmation message.
                </p>
                <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                  <button
                    onClick={resetForm}
                    style={{
                      padding: "12px 24px",
                      borderRadius: 12,
                      border: "1px solid rgba(255,255,255,0.1)",
                      background: "transparent",
                      color: "#f1f5f9",
                      fontFamily: "var(--font-h)",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Book Another
                  </button>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: "12px 24px",
                      borderRadius: 12,
                      background: "#25D366",
                      color: "#fff",
                      fontFamily: "var(--font-h)",
                      fontWeight: 600,
                      textDecoration: "none",
                      fontSize: "0.9rem",
                    }}
                  >
                    Follow Up on WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3
                  style={{
                    fontFamily: "var(--font-h)",
                    fontWeight: 700,
                    fontSize: "1.25rem",
                    marginBottom: 6,
                    color: "#f1f5f9",
                  }}
                >
                  Book a Service
                </h3>
                <p style={{ color: "var(--text3)", fontSize: "0.85rem", marginBottom: 28 }}>
                  All fields are required. We&apos;ll reach out for directives.
                </p>

                {/* ── Full Name ── */}
                <div style={{ marginBottom: 20 }}>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-h)",
                      fontWeight: 600,
                      fontSize: "0.82rem",
                      color: "#94a3b8",
                      marginBottom: 8,
                      letterSpacing: "0.04em",
                    }}
                  >
                    Full Name <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. John Kamau"
                    className={inputClass("name")}
                  />
                  {errors.name && (
                    <p style={{ color: "#f87171", fontSize: "0.78rem", marginTop: 6 }}>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* ── Phone Number ── */}
                <div style={{ marginBottom: 20 }}>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-h)",
                      fontWeight: 600,
                      fontSize: "0.82rem",
                      color: "#94a3b8",
                      marginBottom: 8,
                      letterSpacing: "0.04em",
                    }}
                  >
                    Phone Number <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="e.g. +254 712 345 678"
                    className={inputClass("phone")}
                  />
                  {errors.phone && (
                    <p style={{ color: "#f87171", fontSize: "0.78rem", marginTop: 6 }}>
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* ── Location ── */}
                <div style={{ marginBottom: 20 }}>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-h)",
                      fontWeight: 600,
                      fontSize: "0.82rem",
                      color: "#94a3b8",
                      marginBottom: 8,
                      letterSpacing: "0.04em",
                    }}
                  >
                    Your Location / Area <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Westlands, Nairobi"
                    className={inputClass("location")}
                  />
                  {errors.location && (
                    <p style={{ color: "#f87171", fontSize: "0.78rem", marginTop: 6 }}>
                      {errors.location}
                    </p>
                  )}
                </div>

                {/* ── Service Type ── */}
                <div style={{ marginBottom: 28 }}>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-h)",
                      fontWeight: 600,
                      fontSize: "0.82rem",
                      color: "#94a3b8",
                      marginBottom: 8,
                      letterSpacing: "0.04em",
                    }}
                  >
                    Service Required <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className={inputClass("service")}
                    style={{ cursor: "pointer" }}
                  >
                    <option value="" disabled style={{ background: "#04040f" }}>
                      Select a service...
                    </option>
                    {SERVICES.map(s => (
                      <option key={s} value={s} style={{ background: "#04040f" }}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p style={{ color: "#f87171", fontSize: "0.78rem", marginTop: 6 }}>
                      {errors.service}
                    </p>
                  )}
                </div>

                {/* ── Submit error ── */}
                {submitError && (
                  <div
                    style={{
                      padding: "12px 16px",
                      background: "rgba(239,68,68,0.1)",
                      border: "1px solid rgba(239,68,68,0.25)",
                      borderRadius: 10,
                      marginBottom: 20,
                    }}
                  >
                    <p style={{ color: "#f87171", fontSize: "0.85rem" }}>{submitError}</p>
                  </div>
                )}

                {/* ── Buttons ── */}
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      flex: 1,
                      minWidth: 140,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      height: 50,
                      borderRadius: 12,
                      background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                      border: "none",
                      color: "#fff",
                      fontFamily: "var(--font-h)",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                      opacity: isSubmitting ? 0.7 : 1,
                      boxShadow: "0 0 24px rgba(37,99,235,0.35)",
                      transition: "all 0.25s ease",
                    }}
                    onMouseEnter={e => {
                      if (!isSubmitting) {
                        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 40px rgba(37,99,235,0.5)";
                      }
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 24px rgba(37,99,235,0.35)";
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <div
                          style={{
                            width: 16,
                            height: 16,
                            border: "2px solid rgba(255,255,255,0.3)",
                            borderTopColor: "#fff",
                            borderRadius: "50%",
                            animation: "spin 0.7s linear infinite",
                          }}
                        />
                        Booking...
                      </>
                    ) : (
                      "Confirm Booking →"
                    )}
                  </button>

                  {/* WhatsApp */}
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1,
                      minWidth: 140,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      height: 50,
                      borderRadius: 12,
                      background: "rgba(37,211,102,0.08)",
                      border: "1px solid rgba(37,211,102,0.2)",
                      color: "#25D366",
                      fontFamily: "var(--font-h)",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      textDecoration: "none",
                      transition: "all 0.25s ease",
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.background = "rgba(37,211,102,0.15)";
                      el.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.background = "rgba(37,211,102,0.08)";
                      el.style.transform = "translateY(0)";
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.86L.057 23.886l6.188-1.623A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.96 0-3.792-.507-5.389-1.394l-.385-.228-4.01 1.051 1.07-3.907-.252-.4A9.962 9.962 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                    </svg>
                    WhatsApp
                  </a>
                </div>

                <p style={{ color: "var(--text3)", fontSize: "0.78rem", marginTop: 16, textAlign: "center" }}>
                  🔒 Your information is private and will only be used to process your booking.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 900px) {
          .booking-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .booking-grid > div:last-child { padding: 28px 20px !important; }
        }
      `}</style>
    </section>
  );
}

import React from "react";

export default function FollowUs() {
  const baseCard =
    "flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 border backdrop-blur-md";

  return (
    <section className="py-24 bg-[#050816] text-white relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 text-center relative z-10">

        <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4">
          Follow Us
        </h2>

        <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
          Stay connected with Gab Technologies for updates on installations,
          security systems, Starlink projects, and smart tech solutions.
        </p>

        <div className="flex flex-wrap justify-center gap-6">

          {/* FACEBOOK */}
          <a
            href="https://facebook.com/gabtechnologies"
            target="_blank"
            rel="noreferrer"
            className={`${baseCard}
              border-blue-500/30 bg-blue-500/10 text-blue-400
              hover:scale-105 hover:-translate-y-1
              hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]`}
          >
            <img
              src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg"
              className="w-6 h-6 invert"
              alt="Facebook"
            />
            <span className="font-medium">Facebook</span>
          </a>

          {/* INSTAGRAM */}
          <a
            href="https://instagram.com/gabtechnologies"
            target="_blank"
            rel="noreferrer"
            className={`${baseCard}
              border-pink-500/30 bg-pink-500/10 text-pink-400
              hover:scale-105 hover:-translate-y-1
              hover:shadow-[0_0_25px_rgba(236,72,153,0.4)]`}
          >
            <img
              src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg"
              className="w-6 h-6 invert"
              alt="Instagram"
            />
            <span className="font-medium">Instagram</span>
          </a>

          {/* LINKEDIN */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className={`${baseCard}
              border-blue-600/30 bg-blue-600/10 text-blue-300
              hover:scale-105 hover:-translate-y-1
              hover:shadow-[0_0_25px_rgba(37,99,235,0.4)]`}
          >
            <img
              src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg"
              className="w-6 h-6 invert"
              alt="LinkedIn"
            />
            <span className="font-medium">LinkedIn</span>
          </a>

          {/* X (TWITTER) */}
          <a
            href="https://x.com"
            target="_blank"
            rel="noreferrer"
            className={`${baseCard}
              border-white/10 bg-white/5 text-white
              hover:scale-105 hover:-translate-y-1
              hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]`}
          >
            <img
              src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg"
              className="w-6 h-6 invert"
              alt="X"
            />
            <span className="font-medium">X (Twitter)</span>
          </a>

          {/* WHATSAPP */}
          <a
            href="https://whatsapp.com/channel/yourchannel"
            target="_blank"
            rel="noreferrer"
            className={`${baseCard}
              border-green-500/30 bg-green-500/10 text-green-400
              hover:scale-105 hover:-translate-y-1
              hover:shadow-[0_0_25px_rgba(34,197,94,0.4)]`}
          >
            <img
              src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg"
              className="w-6 h-6 invert"
              alt="WhatsApp"
            />
            <span className="font-medium">WhatsApp</span>
          </a>

        </div>
      </div>
    </section>
  );
}
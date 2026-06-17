"use client";

import React, { useEffect, useState } from "react";
import { Menu, Info, X } from "lucide-react";
import { cn } from "../lib/utils";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* HEADER */}
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-500",
          isScrolled
            ? "bg-[#050816]/90 backdrop-blur-md border-b border-white/10 shadow-xl"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

          {/* LOGO AREA */}
<a
  href="#home"
  className="flex items-center gap-4 text-3xl font-bold text-cyan-400 group"
  onClick={(e) => {
    e.preventDefault();
    setShowLogo(true);
  }}
>
  <img
    src="/images/GabTech1.png"
    alt="Gab Technologies Logo"
    className="h-16 md:h-20 w-auto object-contain transition-opacity duration-300 group-hover:opacity-80 cursor-pointer"
  />

  <span className="hidden sm:block">
    Gab Technologies
  </span>
</a>
{/* LOGO PREVIEW MODAL */}
{showLogo && (
  <div
    className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
    onClick={() => setShowLogo(false)}
  >
    {/* Close Button */}
    <button
      onClick={() => setShowLogo(false)}
      className="absolute top-6 right-6 bg-red-600 hover:bg-red-700 p-3 rounded-full transition"
    >
      <X size={24} className="text-white" />
    </button>

    {/* Logo Image */}
    <img
      src="/images/GabTech1.png"
      alt="Gab Technologies Logo"
      className="max-w-[90vw] max-h-[90vh] object-contain"
      onClick={(e) => e.stopPropagation()}
    />
  </div>
)}

            {/* DESKTOP ACTIONS (ONLY ABOUT US) */}
            <div className="hidden md:flex items-center gap-4">

              <button
                onClick={() => setShowAbout(true)}
                className="flex items-center gap-2 px-5 py-3 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/10 transition text-white font-semibold"
              >
                <Info className="w-4 h-4" />
                About Us
              </button>

            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMobileMenu(true)}
              className="md:hidden text-white"
            >
              <Menu className="w-7 h-7" />
            </button>

          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm">
          <div className="fixed right-0 top-0 h-full w-[300px] bg-[#050816] border-l border-white/10 p-6">

            <div className="flex items-center justify-between mb-10">
              <h2 className="text-xl font-bold text-cyan-400">Menu</h2>

              <button
                onClick={() => setMobileMenu(false)}
                className="text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* ONLY ABOUT US OPTION */}
            <button
              onClick={() => {
                setShowAbout(true);
                setMobileMenu(false);
              }}
              className="w-full px-5 py-3 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/10 transition text-white font-semibold flex items-center gap-2"
            >
              <Info className="w-4 h-4" />
              About Us
            </button>

          </div>
        </div>
      )}

      {/* ABOUT MODAL */}
      {showAbout && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">

          <div className="bg-[#0b1120] border border-white/10 rounded-2xl max-w-2xl w-full p-8 relative">

            <button
              onClick={() => setShowAbout(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-3xl font-bold text-cyan-400 mb-6">
              About Gab Technologies
            </h2>

            <p className="text-gray-300 leading-relaxed">
              Gab Technologies is a premier Kenyan tech company and security firm specializing in high-end CCTV installation, WiFi/network setups, Starlink integration, and smart security systems. <br />
              <br /> Our mission is to provide futuristic, military-grade security and professional IT support solutions. <br />
              <br /> We serve schools, offices, restaurants, hotels, apartments, malls, supermarkets, institutions, organizations, homes, shops, and businesses across Kenya.
            </p>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setShowAbout(false)}
                className="px-5 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 transition text-white font-semibold"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
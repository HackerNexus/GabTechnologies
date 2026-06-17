import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export default function Footer() {
  const hours = [
    {
      day: "Monday - Saturday",
      time: "07:00 AM - 06:00 PM",
    },
    {
      day: "Emergency Support",
      time: "24/7 Available",
    },
  ];

  const contactInfo = [
    {
      icon: MapPin,
      text: "Ukunda-Diani, Kenya",
      color: "text-red-500",
    },
    {
      icon: Phone,
      text: "+254 721 258 620",
      color: "text-green-500",
    },
    {
      icon: Mail,
      text: "gabtechnologies@gmail.com",
      color: "text-gray-400",
    },
  ];

  return (
    <footer className="bg-[#050816] text-white pt-20 pb-10 px-4 sm:px-6 lg:px-8 border-t border-white/10">

      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">

          {/* LOGO + DESCRIPTION */}
          <div className="flex flex-col items-start">
            <h2 className="text-3xl font-bold text-cyan-400 mb-6">
              Gab Technologies
            </h2>

            <p className="text-gray-400 leading-relaxed text-base">
              Gab Technologies provides premium security and networking
              solutions. From AI-powered CCTV to Starlink installations,
              we secure your digital and physical world.
            </p>
          </div>

          {/* SERVICE HOURS */}
<div>
  <h3 className="text-2xl font-bold mb-6">
    Service Hours
  </h3>

  <div className="overflow-hidden rounded-xl border border-white/20">
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-cyan-500/10">
          <th className="border border-white/20 px-4 py-3 text-left text-cyan-400">
            Service
          </th>
          <th className="border border-white/20 px-4 py-3 text-left text-cyan-400">
            Availability
          </th>
        </tr>
      </thead>

      <tbody>
        {hours.map((item, i) => (
          <tr
            key={i}
            className="hover:bg-white/5 transition-colors"
          >
            <td className="border border-white/20 px-4 py-4">
              {item.day}
            </td>

            <td className="border border-white/20 px-4 py-4 text-gray-400">
              {item.time}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

          {/* CONTACT INFO */}
          <div>
            <h3 className="text-2xl font-bold mb-6">
              Get In Touch
            </h3>

            <ul className="space-y-6">
              {contactInfo.map((item, i) => {
                const Icon = item.icon;
                const isEmail = item.text.includes("@");

                return (
                  <li
                    key={i}
                    className="flex items-start gap-4"
                  >
                    <Icon
                      className={`w-6 h-6 shrink-0 mt-0.5 ${item.color}`}
                    />

                    {isEmail ? (
                      <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${item.text}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-400 text-lg hover:text-cyan-400 transition-colors"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <span className="text-gray-400 text-lg">
                        {item.text}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="my-12 border-t border-white/10" />

        {/* BOTTOM FOOTER */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-400">

            <span>
              © {new Date().getFullYear()} Gab Technologies.
              All rights reserved.
            </span>

            <span className="hidden md:inline text-white/20">
              |
            </span>

            <Link
              to="/privacy-policy"
              className="text-cyan-400 transition-colors underline-offset-4 hover:underline"
            >
              Privacy Policy
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}
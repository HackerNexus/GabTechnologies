import { useState } from "react";
import { motion, AnimatePresence ,} from "framer-motion";

const services = [
  {
    title: "CCTV Installation",
    image: "/images/gab5.jpeg",
    shortDescription:
      "Professional surveillance solutions for homes, offices, schools, and businesses.",

    fullDescription:
      "Our CCTV installation services provide advanced surveillance systems for residential, commercial, and institutional environments. We install high-definition cameras, night vision systems, remote monitoring solutions, and AI-powered security cameras that allow you to monitor your premises from anywhere in the world.",

    features: [
      "HD & 4K CCTV Cameras",
      "Night Vision Surveillance",
      "Remote Mobile Monitoring",
      "Motion Detection Alerts",
      "AI Smart Analytics",
      "Cloud & Local Storage",
    ],
  },

  {
    title: "WiFi & Networking",
    image: "/images/gab12.5.jpeg",
    shortDescription:
      "Reliable WiFi coverage, networking, Starlink setup, and internet optimization.",

    fullDescription:
      "We design and deploy reliable networking solutions for homes, offices, schools, hotels, and institutions. Our services include Starlink installation, structured cabling, router configuration, access point deployment, and network optimization for maximum performance.",

    features: [
      "Starlink Installation",
      "Office Network Setup",
      "Home WiFi Coverage",
      "Router Configuration",
      "Structured Cabling",
      "Network Troubleshooting",
    ],
  },

  {
    title: "Smart Security Systems",
    image: "/images/gab65.jpg",
    shortDescription:
      "Modern access control, alarms, smart locks, and integrated security solutions.",

    fullDescription:
      "Protect your property with intelligent security systems. We install biometric access control, smart locks, alarm systems, visitor management solutions, and integrated smart security platforms designed to improve safety and convenience.",

    features: [
      "Biometric Access Control",
      "Smart Door Locks",
      "Intruder Alarm Systems",
      "Visitor Management",
      "Integrated Security Solutions",
      "Real-Time Alerts",
    ],
  },

  {
    title: "IT Support",
    image: "/images/gab68.jpg",
    shortDescription:
      "Technical support, troubleshooting, maintenance, and IT consultancy services.",

    fullDescription:
      "Our IT support team helps businesses and individuals maintain efficient and secure technology systems. We provide hardware support, software installation, virus removal, maintenance, troubleshooting, and technology consulting services.",

    features: [
      "Computer Repairs",
      "Software Installation",
      "Virus Removal",
      "System Maintenance",
      "Network Support",
      "IT Consultancy",
    ],
  },
];

export default function Services() {
  const [activeService, setActiveService] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative">

      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-cyan-400"
        >
          Our Services
        </motion.h2>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="
                rounded-2xl
                overflow-hidden
                bg-white/[0.04]
                border border-white/10
                backdrop-blur-xl
                hover:border-cyan-400/50
                transition-all
                duration-300
                shadow-lg
              "
            >
              {/* Image */}
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-4 text-white">
                  {service.title}
                </h3>

                <p className="text-gray-400 leading-relaxed mb-6">
                  {service.shortDescription}
                </p>

                <button
                  onClick={() =>
                    setActiveService(
                      activeService === index ? null : index
                    )
                  }
                  className="
                    w-full
                    bg-cyan-500
                    hover:bg-cyan-600
                    text-black
                    font-semibold
                    py-3
                    rounded-lg
                    transition
                  "
                >
                  {activeService === index
                    ? "Close Details"
                    : "Read More"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expanded Service Section */}
        <AnimatePresence>

          {activeService !== null && (
            <motion.div
              key={activeService}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="
                mt-16
                bg-white/[0.04]
                border border-cyan-500/20
                rounded-2xl
                overflow-hidden
              "
            >
              <img
                src={services[activeService].image}
                alt={services[activeService].title}
                className="w-full h-[400px] object-cover"
              />

              <div className="p-8 md:p-10">

                <h3 className="text-4xl font-bold text-cyan-400 mb-6">
                  {services[activeService].title}
                </h3>

                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  {services[activeService].fullDescription}
                </p>

                <h4 className="text-2xl font-semibold text-white mb-5">
                  What We Offer
                </h4>

                <div className="grid md:grid-cols-2 gap-4">

                  {services[activeService].features.map(
                    (feature, idx) => (
                      <div
                        key={idx}
                        className="
                          bg-cyan-500/10
                          border border-cyan-500/20
                          rounded-lg
                          px-4
                          py-3
                          text-gray-200
                        "
                      >
                        ✓ {feature}
                      </div>
                    )
                  )}

                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </section>
  );
}
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center text-center px-6 relative overflow-hidden">
      
      {/* background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent" />

      {/* animated content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 text-white">
          Smart Security &{" "}
          <span className="text-cyan-400">Network Solutions</span>
        </h1>

        <p className="max-w-2xl mx-auto text-gray-300 text-lg mb-8">
          Premium CCTV, Starlink, WiFi installation, smart security systems,
          and IT support across Kenya.
        </p>

       
      </motion.div>

    </section>
  );
}
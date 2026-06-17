import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
interface Project {
  id: number;
  category: string;
  images: string[];
  title: string;
}
const projects: Project[] = [

  {
    id: 1,
    category: "cctv",
    images: [
      "/images/gab37.jpg",
      "/images/gab16.jpg",
      "/images/gab17.jpg",
      "/images/gab19.jpg",
    ],
    title: "CCTV Installation",
  },
  {
    id: 2,
    category: "security",
    images: [
      "/images/gab35.jpg",
      "/images/gab36.jpg",
    ],
    title: "Business Surveillance",
  },
  {
    id: 3,
    category: "wifi",
    images: [
      "/images/gab64.jpg",
    ],
    title: "Starlink Installation",
  },
  {
    id: 4,
    category: "wifi",
    images: [
      "/images/gab61.jpg",
      "/images/gab60.png",
    ],
    title: "Office Networking",
  },
  {
    id: 5,
    category: "security",
    images: [
      "/images/gab26.jpg",
      "/images/gab22.jpg",
      "/images/gab25.jpg",
      "/images/gab27.jpg",
    ],
    title: "Clear Night Vision",
  },
  {
    id: 6,
    category: "it",
    images: [
      "/images/gab48.jpg",
      "/images/gab47.jpg",
    ],
    title: "Computer Repair",
  },
  {
    id: 7,
    category: "it",
    images: [
      "/images/gab43.jpg",
      "/images/gab47.jpg",
    ],
    title: "Computer Maintenance & Software Update",
  },
  {
    id: 8,
    category: "it",
    images: [
      "/images/gab18.jpg",
      "/images/gab15.jpg",
      "/images/gab40.jpg",
      "/images/gab42.jpg",

    ],
    title: "System Troubleshooting",
  },
  {
    id: 9,
    category: "cctv",
    images:[ 
      "/images/gab4.jpeg",
    ],
    title: "Two-Way Routing"  
  },
  {
    id: 10,
    category: "cctv",
    images:[ 
      "/images/gab1.jpeg",
    ],
    title: "Solar CCTV cameras for areas with no electricity"  
  },
  {
    id: 11,
    category: "cctv",
    images:[ 
      "/images/gab2.jpeg",
    ],
    title: "wireless (standalone) 2mp outdoor camera"  
  },
   {
    id: 12,
    category: "wifi",
    images:[ 
      "/images/gab49.jpg",
      "/images/gab53.jpg",
      "/images/gab54.jpg",
      "/images/gab55.jpg",
      "/images/gab56.jpg",
      "/images/gab57.jpg",
    ],
    title: "High-end wifi installation"  
  },
  {
    id: 13,
    category: "cctv",
    images:[ 
      "/images/gab21.jpg",
      "/images/gab9.jpeg",
    ],
    title: "After Installtion"  
  },
  {
    id: 14,
    category: "wifi",
    images:[ 
      "/images/gab10.jpeg",
      "/images/gab11.jpg",
    ],
    title: "Starlink App"  
  },
   {
    id: 15,
    category: "wifi",
    images:[ 
      "/images/gab12.jpeg",
      "/images/gab59.jpg",
    ],
    title: "Superfast Internet Speeds"  
  },
   {
    id: 16,
    category: "security",
    images:[ 
      "/images/gab34.jpg",
    ],
    title: "Site survey"  
  },
];

const filters = [
  { id: "all",      label: "All Projects" },
  { id: "cctv",     label: "CCTV" },
  { id: "wifi",     label: "WiFi & Networking" },
  { id: "security", label: "Smart Security" },
  { id: "it",       label: "IT Support" },
];

type Projects = (typeof projects)[0];

export default function Gallery() {
  const [activeFilter, setActiveFilter]         = useState("all");
  const [selectedProject, setSelectedProject]   = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Touch swipe refs
  const touchStartX = useRef<number>(0);
  const touchEndX   = useRef<number>(0);

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  // ── Open modal ──
  const openModal = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  // ── Close modal ──
  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  // ── Navigate images ──
  const goNext = useCallback(() => {
    if (!selectedProject) return;
    setCurrentImageIndex((i) =>
      i === selectedProject.images.length - 1 ? 0 : i + 1
    );
  }, [selectedProject]);

  const goPrev = useCallback(() => {
    if (!selectedProject) return;
    setCurrentImageIndex((i) =>
      i === 0 ? selectedProject.images.length - 1 : i - 1
    );
  }, [selectedProject]);

  // ── Touch swipe handlers ──
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goNext() : goPrev();
    }
  };

  // ── Keyboard navigation ──
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft")  goPrev();
      if (e.key === "Escape")     closeModal();
    },
    [goNext, goPrev]
  );

  return (
    <section
      id="gallery"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#050816]"
    >
      <div className="max-w-7xl mx-auto">

        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4">
            Our Project Gallery
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Explore our completed projects in CCTV installations,
            networking, Starlink deployments, smart security systems
            and IT support services.
          </p>
        </motion.div>

        {/* FILTER BUTTONS */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-5 py-3 rounded-full transition-all duration-300 font-medium ${
                activeFilter === filter.id
                  ? "bg-cyan-500 text-black"
                  : "bg-white/5 text-gray-300 hover:bg-cyan-500/20"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* GALLERY GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.03 }}
              className="group bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/40 transition-all duration-300 cursor-pointer"
              onClick={() => openModal(project)}
            >
              {/* Image */}
              <div className="relative w-full h-64 overflow-hidden">
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Brown tint on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(120,72,20,0.4), rgba(80,40,10,0.25))",
                    mixBlendMode: "multiply",
                  }}
                />

                {/* Maximize icon */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-black/50 backdrop-blur-sm p-2 rounded-lg border border-white/20">
                    <Maximize2 className="w-4 h-4 text-cyan-400" />
                  </div>
                </div>

                {/* Image count badge */}
                {project.images.length > 1 && (
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md border border-white/10">
                    <span className="text-xs text-cyan-400 font-semibold">
                      +{project.images.length} photos
                    </span>
                  </div>
                )}
              </div>

              {/* Title */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-white">
                  {project.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Click to view all photos
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.92)" }}
            onClick={closeModal}
            onKeyDown={onKeyDown}
            tabIndex={0}
          >
            {/* Modal box */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1,    opacity: 1 }}
              exit={{   scale: 0.92,  opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl bg-[#0b1120] border border-white/10 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-black/80 backdrop-blur-sm p-2 rounded-full border border-white/10 text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image area */}
              <div className="relative w-full bg-black overflow-hidden"
                style={{ height: "65vh" }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={selectedProject.images[currentImageIndex]}
                    alt={`${selectedProject.title} — photo ${currentImageIndex + 1}`}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{   opacity: 0, x: -40 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-contain"
                  />
                </AnimatePresence>

                {/* Left arrow */}
                {selectedProject.images.length > 1 && (
                  <button
                    onClick={goPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-cyan-500/80 backdrop-blur-sm p-3 rounded-full border border-white/10 text-white transition-all duration-200"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                )}

                {/* Right arrow */}
                {selectedProject.images.length > 1 && (
                  <button
                    onClick={goNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-cyan-500/80 backdrop-blur-sm p-3 rounded-full border border-white/10 text-white transition-all duration-200"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                )}
              </div>

              {/* Bottom bar */}
              <div className="px-6 py-5 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {selectedProject.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Photo {currentImageIndex + 1} of{" "}
                    {selectedProject.images.length}
                  </p>
                </div>

                {/* Dot indicators */}
                {selectedProject.images.length > 1 && (
                  <div className="flex gap-2">
                    {selectedProject.images.map((_, i) => (
                      <button 
                        key={i}
                        onClick={() => setCurrentImageIndex(i)}
                        className="transition-all duration-300 rounded-full"
                        style={{
                          width:  i === currentImageIndex ? 24 : 8,
                          height: 8,
                          background:
                            i === currentImageIndex
                              ? "#06b6d4"
                              : "rgba(255,255,255,0.2)",
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Thumbnail strip */}
              {selectedProject.images.length > 1 && (
                <div className="px-6 pb-5 flex gap-3 overflow-x-auto">
                  {selectedProject.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImageIndex(i)}
                      className="flex-shrink-0 transition-all duration-200"
                      style={{
                        width:  72,
                        height: 52,
                        borderRadius: 8,
                        overflow: "hidden",
                        border: `2px solid ${
                          i === currentImageIndex
                            ? "#06b6d4"
                            : "rgba(255,255,255,0.1)"
                        }`,
                        opacity: i === currentImageIndex ? 1 : 0.5,
                      }}
                    >
                      <img
                        src={img}
                        alt={`thumb-${i}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
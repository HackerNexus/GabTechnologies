"use client";

import React, { useState } from "react";
import { Maximize2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

const projects = [
  {
    id: "proj-1",
    category: "security",
    image: "/images/gab3.jpeg",
    title: "Friendly Disclaimer",
  },
  {
    id: "proj-2",
    category: "network",
    image: "/images/gab13.jpeg",
    title: "Remote Connectivity Setup",
  },
  {
    id: "proj-3",
    category: "it-support",
    image: "/images/work1.jpg",
    title: "Data Center Optimization",
  },
  {
    id: "proj-5",
    category: "network",
    image: "/images/gab14.jpeg",
    title: "Home WiFi Setup",
  },
  {
    id: "proj-6",
    category: "security",
    image: "/images/gab38.jpg",
    title: "CCTV Installation",
  },
  {
    id: "proj-7",
    category: "it-support",
    image: "/images/work2.jpg",
    title: "Structured Cabling Overhaul",
  },
  {
    id: "proj-8",
    category: "network",
    image: "/images/gabu.png",
    title: "Portable Connection Integration",
  },
  {
    id: "proj-9",
    category: "security",
    image: "/images/gab8.jpeg",
    title: "Amid Installation",
  },
];

export default function ProjectGallery() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] =
    useState<(typeof projects)[0] | null>(null);

  const filteredProjects = projects.filter(
    (project) =>
      activeFilter === "all" || project.category === activeFilter
  );

  return (
    <section
      id="our-installation-gallery"
      className="bg-[#050816] text-white py-24 px-4 md:px-8 lg:px-12 min-h-screen"
    >
      <div className="max-w-7xl mx-auto">

        {/* HEADING */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Our Works
          </h2>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Explore our portfolio of high-fidelity security and networking
            deployments across Kenya.
          </p>
        </div>

        {/* FILTER BUTTONS */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { label: "All Systems", value: "all" },
            { label: "Smart Security", value: "security" },
            { label: "Connectivity", value: "network" },
            { label: "IT Infrastructure", value: "it-support" },
          ].map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setActiveFilter(value)}
              className={`px-6 py-3 rounded-lg border transition ${
                activeFilter === value
                  ? "bg-blue-600 border-blue-600"
                  : "border-white/10 hover:border-blue-500"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* PROJECT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="
                relative
                group
                overflow-hidden
                rounded-xl
                cursor-pointer
                bg-[#0b1120]
                border
                border-white/10
                shadow-lg
                transition-all
                duration-500
                hover:border-blue-500
              "
              onClick={() => setSelectedProject(project)}
            >
              {/* FIXED IMAGE SIZE */}
              <div className="w-full h-[300px] overflow-hidden bg-black">
                <img
                  src={project.image}
                  alt={project.title}
                  className="
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-1000
                    group-hover:scale-105
                  "
                  loading="lazy"
                />
              </div>

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                <div className="absolute top-4 right-4 bg-blue-600/20 p-2 rounded-lg border border-blue-500/30">
                  <Maximize2 className="w-5 h-5 text-blue-400" />
                </div>

                <div>
                  <span className="text-xs uppercase tracking-widest text-blue-400 mb-2 block">
                    View Project
                  </span>

                  <h3 className="text-2xl font-bold">
                    {project.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-24 text-gray-400">
            <p>No installations found in this category.</p>
          </div>
        )}
      </div>

      {/* MODAL */}
      <Dialog
        open={!!selectedProject}
        onOpenChange={(open) => {
          if (!open) setSelectedProject(null);
        }}
      >
        <DialogContent className="max-w-4xl w-[95vw] p-0 overflow-hidden bg-[#0b1120] border border-white/10 text-white rounded-xl">
          {selectedProject && (
            <div className="flex flex-col">

              {/* IMAGE */}
              <div className="w-full bg-black/60 flex items-center justify-center h-[50vh] md:h-[60vh] overflow-hidden p-2">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-inner"
                />
              </div>

              {/* CONTENT */}
              <div className="p-8">
                <DialogHeader>

                  <div className="inline-block px-3 py-1 bg-blue-600/20 text-blue-400 text-xs uppercase tracking-widest rounded-lg mb-4 border border-blue-500/30 w-fit">
                    {selectedProject.category}
                  </div>

                  <DialogTitle className="text-2xl font-bold leading-tight">
                    {selectedProject.title}
                  </DialogTitle>

                </DialogHeader>
              </div>

            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
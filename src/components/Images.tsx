"use client";

import React, { useState } from "react";
import { Maximize2, ChevronRight, ChevronLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

// UNIFIED DATA: Every single entity now uses the "images" array format
const Projects = [
  {
    id: 1,
    images: [
      "/images/gab31.jpg",
      "/images/gab30.jpg",
      "/images/gab32.jpg"
    ],
    title: "Installing high-definition CCTV camera",
  },
  {
    id: 2,
    images: ["/images/gab62.jpg",
             "/images/gab13.jpeg",
    ],
    title: "Professional Starlink satellite dish installation on rooftop",
  },
  {
    id: 3,
    images: ["/images/gab41.jpg",
      "/images/work3.jpg",
      "/images/gab39.jpg",
      "/images/work4.jpg",
      "/images/gab46.jpg",
      "/images/gab39.jpg",
    ],
    title: "Clean server rack cable management",
  },
  {
    id: 4,
    images: ["/images/gab65.jpg"],
    title: "Integration of smart security system control panel",
  },
  {
    id: 5,
    images: ["/images/gab66.jpg"],
    title: "Fibre optic splicing",
  },
  {
    id: 6,
    images: ["/images/gab58.jpg"],
    title: "Enterprise WiFi access point installation",
  },
  {
    id: 7,
    images: ["/images/gab60.jpg",
      "/images/gab19.jpg"
    ],
    title: "Installation & network setup",
  },
  {
    id: 8,
    images: ["/images/gab51.jpg"],
    title: "providing onsite IT infrastructure support",
  },
];

function GalleryItem({
  project,
  index,
  onClick,
}: {
  project: (typeof Projects)[0];
  index: number;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-[#0b1120] shadow-lg transition-all duration-500 hover:border-blue-500 hover:shadow-blue-500/20"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* IMAGE BOX CONTAINER - Grabs the first image [0] as the cover preview */}
      <div className="relative aspect-[4/3] overflow-hidden bg-black/40">
        <img
          src={project.images[0]}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />

        {/* Counter indicator badge on grid thumbnail */}
        {project.images.length > 1 && (
          <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-blue-400 border border-white/5 z-20">
            +{project.images.length - 1} angles
          </div>
        )}
      </div>

      {/* OVERLAY WITH ICON & TITLE */}
      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5 z-10">
        <div className="absolute top-4 right-4 bg-blue-600/20 p-2 rounded-lg border border-blue-500/30">
          <Maximize2 className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <span className="text-xs uppercase tracking-widest text-blue-400 mb-1 block">
            View Gallery
          </span>
          <h3 className="text-base font-bold line-clamp-2 text-white">
            {project.title}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default function ImageGallery() {
  const [selectedProject, setSelectedProject] =
    useState<(typeof Projects)[0] | null>(null);

  return (
    <section

      id="expertsatworkgallery"
      className="bg-[#050816] text-white py-16 md:py-24 px-4 md:px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* HEADING */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Experts at Work
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400 text-lg">
            Witness our elite technical team in action, delivering
            precision security and networking solutions across Kenya.
          </p>
        </div>

        {/* GALLERY GRID */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Projects.map((project, i) => (
            <GalleryItem
              key={project.id}
              project={project}
              index={i}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* IMAGE MODAL */}
      <Dialog
        open={!!selectedProject}
        onOpenChange={(open) => {
          if (!open) setSelectedProject(null);
        }}
      >
        <DialogContent className="max-w-4xl w-[95vw] p-0 overflow-hidden bg-[#0b1120] border border-white/10 text-white rounded-xl">
          {selectedProject && (
            <div className="flex flex-col">
              
              {/* SLIDER BOX - Horizontal slider housing logic */}
              <div className="relative w-full bg-black/60 h-[50vh] md:h-[60vh] overflow-hidden group/slider">
                
                {/* Horizontal Track Scroll Container */}
                <div className="w-full h-full flex overflow-x-auto snap-x snap-mandatory scrollbar-none scroll-smooth">
                  {selectedProject.images.map((imgUrl, index) => (
                    <div
                      key={index}
                      className="w-full h-full flex-shrink-0 snap-center flex items-center justify-center p-4 relative"
                    >
                      <img
                        src={imgUrl}
                        alt={`${selectedProject.title} - Step ${index + 1}`}
                        className="max-w-full max-h-full object-contain rounded-lg shadow-inner"
                      />

                      {/* Photo Index Track Counter */}
                      <div className="absolute top-4 left-4 bg-black/60 px-3 py-1 rounded-full text-xs text-gray-300 tracking-wider">
                        {index + 1} / {selectedProject.images.length}
                      </div>
                    </div>
                  ))}
                </div>

                
                
              </div>

              {/* CONTENT DETAILS */}
              <div className="p-6 md:p-8 bg-[#050816] border-t border-white/5">
                <DialogHeader>
                  <DialogTitle className="text-lg md:text-xl font-medium leading-relaxed text-gray-200">
                    {selectedProject.title}
                  </DialogTitle>
                </DialogHeader>
                {selectedProject.images.length > 1 && (
                  <p className="text-xs text-blue-400 mt-2 tracking-wide">
                    ← Swipe or use arrows to view different project views →
                  </p>
                )}
              </div>

            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
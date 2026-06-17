import * as React from "react";

const teamMembers = [
  {
    id: 1,
    name: "Gabriel Mutuku",
    role: "Chief Executive Officer",
    image: "/images/CEO3.png",
  },
  {
    id: 2,
    name: "Januaris Kasesi",
    role: "Technical & Operations Director",
    image: "/images/CEO4.png",
  },
  {
    id: 3,
    name: "Emmanuel Muthusi",
    role: "Head of Security Systems & IT Support",
    image: "/images/CEO6.jpg",
  },
];

export default function OurProfessionalTeam() {
  return (
    <section
      id="leadershipgallery"
      className="relative w-full bg-[#050816] text-white py-24 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute bottom-0 left-0 w-full max-w-2xl h-full max-h-[60%] bg-blue-500/5 rounded-tr-full -z-10 opacity-30 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl">

        {/* HEADER */}
        <div className="text-center mb-16">
          <span className="text-sm font-bold tracking-widest text-blue-500 uppercase mb-4 block">
            Expert Leadership
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            The Minds Behind Gab Technologies
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Our leadership team combines skills and experience in network
            infrastructure and advanced security systems to deliver Kenyan
            businesses world-class tech solutions.
          </p>
        </div>

        {/* TEAM GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, i) => (
            <div
              key={member.id}
              data-index={i}
              className="group flex flex-col rounded-xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all duration-300"
            >

              {/* IMAGE — full width, zoom + brown on hover */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ display: "block" }}
                />

                {/* Brown tint overlay on hover */}
                <div
                  className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(120,72,20,0.45), rgba(80,40,10,0.3))",
                    mixBlendMode: "multiply",
                  }}
                />

                {/* Bottom fade into card */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#080818] to-transparent" />
              </div>

              {/* TEXT — fills remaining space */}
              <div className="flex flex-col flex-1 items-center justify-center text-center px-6 py-6">

                {/* Name */}
                <h3 className="text-xl font-bold text-white mb-2 leading-snug">
                  {member.name}
                </h3>

                {/* Divider */}
                <div className="w-10 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mb-3" />

                {/* Role */}
                <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest leading-relaxed">
                  {member.role}
                </p>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
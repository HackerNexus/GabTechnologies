const images = [
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
  'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931',
  'https://images.unsplash.com/photo-1558002038-1055907df827',
]

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-cyan-400">
          Our Projects
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {images.map((image, i) => (
            <img
              key={i}
              src={image}
              className="rounded-2xl h-80 w-full object-cover hover:scale-105 transition duration-500"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
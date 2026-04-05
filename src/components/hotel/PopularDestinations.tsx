import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { useState } from "react";

const destinations = [
  { name: "Paris, France", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop", hotels: 120, tagline: "City of Lights" },
  { name: "Bali, Indonesia", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop", hotels: 85, tagline: "Island Paradise" },
  { name: "Tokyo, Japan", img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=800&auto=format&fit=crop", hotels: 200, tagline: "Modern Tradition" },
  { name: "New York, USA", img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=800&auto=format&fit=crop", hotels: 340, tagline: "The Big Apple" },
  { name: "Santorini, Greece", img: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=800&auto=format&fit=crop", hotels: 65, tagline: "Aegean Dream" },
  { name: "Dubai, UAE", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop", hotels: 150, tagline: "Luxury Redefined" },
];

export default function PopularDestinations() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="destinations" className="py-24 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">Explore the World</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
          Popular Destinations
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((dest, i) => (
          <motion.div
            key={dest.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-[4/3]"
          >
            <img
              src={dest.img}
              alt={dest.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-xs text-primary-foreground/70 uppercase tracking-wider mb-1">{dest.tagline}</p>
              <h3 className="font-display text-xl font-semibold text-primary-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                {dest.name}
              </h3>
              <p className="text-sm text-primary-foreground/60 mt-1">{dest.hotels} properties</p>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={hoveredIdx === i ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                className="mt-3 flex items-center gap-1 text-primary text-sm font-medium"
              >
                Explore <ArrowRight className="w-4 h-4" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

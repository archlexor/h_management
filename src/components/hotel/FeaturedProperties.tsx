import { motion } from "framer-motion";
import { Star, Heart, MapPin, Wifi, Car, Coffee } from "lucide-react";
import { useState } from "react";

const properties = [
  { name: "Grand Plaza Resort", loc: "Bali, Indonesia", price: 350, rating: 4.9, reviews: 234, img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop", amenities: ["wifi", "parking", "breakfast"] },
  { name: "The Alpine Lodge", loc: "Swiss Alps", price: 520, rating: 4.8, reviews: 189, img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop", amenities: ["wifi", "breakfast"] },
  { name: "Urban Boutique Hotel", loc: "New York, USA", price: 280, rating: 4.7, reviews: 312, img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=800&auto=format&fit=crop", amenities: ["wifi", "parking"] },
  { name: "Seaside Paradise Villa", loc: "Maldives", price: 890, rating: 5.0, reviews: 98, img: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=800&auto=format&fit=crop", amenities: ["wifi", "parking", "breakfast"] },
  { name: "Royal Heritage Palace", loc: "Jaipur, India", price: 420, rating: 4.6, reviews: 156, img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop", amenities: ["wifi", "breakfast"] },
  { name: "Skyline Penthouse", loc: "Dubai, UAE", price: 750, rating: 4.9, reviews: 201, img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800&auto=format&fit=crop", amenities: ["wifi", "parking", "breakfast"] },
];

const amenityIcons: Record<string, typeof Wifi> = {
  wifi: Wifi,
  parking: Car,
  breakfast: Coffee,
};

export default function FeaturedProperties() {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const toggleFavorite = (idx: number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <section id="properties" className="py-24 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">Handpicked for You</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
          Featured Properties
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((prop, i) => (
          <motion.div
            key={prop.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group bg-card rounded-2xl overflow-hidden border border-border shadow-warm hover:shadow-elevated transition-shadow duration-300"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={prop.img}
                alt={prop.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <button
                onClick={() => toggleFavorite(i)}
                className="absolute top-4 right-4 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${favorites.has(i) ? "fill-primary text-primary" : "text-foreground"}`}
                />
              </button>
              <div className="absolute top-4 left-4 flex items-center gap-1 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full">
                <Star className="w-4 h-4 fill-gold text-gold" />
                <span className="text-sm font-semibold text-foreground">{prop.rating}</span>
                <span className="text-xs text-muted-foreground">({prop.reviews})</span>
              </div>
            </div>

            <div className="p-5">
              <h3 className="font-display text-lg font-semibold text-card-foreground">{prop.name}</h3>
              <p className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <MapPin className="w-3.5 h-3.5" />
                {prop.loc}
              </p>

              <div className="flex items-center gap-2 mt-3">
                {prop.amenities.map((a) => {
                  const Icon = amenityIcons[a];
                  return (
                    <div key={a} className="p-1.5 rounded-md bg-secondary" title={a}>
                      <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <div>
                  <span className="text-xl font-bold text-foreground">${prop.price}</span>
                  <span className="text-sm text-muted-foreground"> / night</span>
                </div>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                  Book Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

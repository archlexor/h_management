import { motion } from "framer-motion";
import { useState } from "react";
import ProductCard from "./ProductCard";

const properties = [
  { name: "Grand Plaza Resort", loc: "Bali, Indonesia", price: 350, rating: 4.9, reviews: 234, img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop", amenities: ["wifi", "parking", "breakfast"] },
  { name: "The Alpine Lodge", loc: "Swiss Alps", price: 520, rating: 4.8, reviews: 189, img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop", amenities: ["wifi", "breakfast"] },
  { name: "Urban Boutique Hotel", loc: "New York, USA", price: 280, rating: 4.7, reviews: 312, img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=800&auto=format&fit=crop", amenities: ["wifi", "parking"] },
  { name: "Seaside Paradise Villa", loc: "Maldives", price: 890, rating: 5.0, reviews: 98, img: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=800&auto=format&fit=crop", amenities: ["wifi", "parking", "breakfast"] },
  { name: "Royal Heritage Palace", loc: "Jaipur, India", price: 420, rating: 4.6, reviews: 156, img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop", amenities: ["wifi", "breakfast"] },
  { name: "Skyline Penthouse", loc: "Dubai, UAE", price: 750, rating: 4.9, reviews: 201, img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800&auto=format&fit=crop", amenities: ["wifi", "parking", "breakfast"] },
];

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
          >
            <ProductCard
              amenities={prop.amenities as Array<"wifi" | "parking" | "breakfast">}
              img={prop.img}
              isFavorite={favorites.has(i)}
              loc={prop.loc}
              name={prop.name}
              onToggleFavorite={() => toggleFavorite(i)}
              price={prop.price}
              rating={prop.rating}
              reviews={prop.reviews}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const testimonials = [
  { name: "Sarah Mitchell", role: "Travel Blogger", text: "LuxeStays transformed our honeymoon into an unforgettable experience. The Maldives villa was beyond anything we imagined — pristine beaches, world-class dining, and impeccable service.", rating: 5, avatar: "SM" },
  { name: "James Rodriguez", role: "Business Executive", text: "As someone who travels 200+ days a year, I'm extremely particular about hotels. LuxeStays consistently delivers top-tier properties with seamless booking. Absolutely my go-to platform.", rating: 5, avatar: "JR" },
  { name: "Aiko Tanaka", role: "Food Critic", text: "The Alpine Lodge in Switzerland was a culinary dream. From Michelin-starred restaurants to cozy fondue nights, every meal was an experience. LuxeStays curates the best.", rating: 5, avatar: "AT" },
  { name: "Michael Chen", role: "Photographer", text: "I've stayed at some of the most photogenic hotels through LuxeStays. The Santorini property had views that made my Instagram followers lose their minds!", rating: 4, avatar: "MC" },
  { name: "Emma Williams", role: "Wellness Coach", text: "The spa packages at LuxeStays properties are unmatched. I book through them exclusively for wellness retreats. My clients always come back refreshed and renewed.", rating: 5, avatar: "EW" },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];

  return (
    <section id="reviews" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">Guest Stories</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">What Our Guests Say</h2>
        </motion.div>

        <motion.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-card border border-border rounded-3xl p-8 md:p-12 text-center shadow-warm relative"
        >
          <Quote className="w-10 h-10 text-primary/20 mx-auto mb-6" />

          <p className="text-lg md:text-xl text-card-foreground leading-relaxed font-body italic">
            "{t.text}"
          </p>

          <div className="flex items-center justify-center gap-1 mt-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i < t.rating ? "fill-gold text-gold" : "text-border"}`}
              />
            ))}
          </div>

          <div className="mt-6 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center text-primary-foreground font-bold text-sm">
              {t.avatar}
            </div>
            <h4 className="font-display font-semibold text-card-foreground mt-3">{t.name}</h4>
            <p className="text-sm text-muted-foreground">{t.role}</p>
          </div>
        </motion.div>

        <div className="flex items-center justify-center gap-4 mt-8">
          <button onClick={prev} className="p-2 rounded-full border border-border hover:bg-secondary transition-colors">
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? "bg-primary" : "bg-border"}`}
              />
            ))}
          </div>
          <button onClick={next} className="p-2 rounded-full border border-border hover:bg-secondary transition-colors">
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
}

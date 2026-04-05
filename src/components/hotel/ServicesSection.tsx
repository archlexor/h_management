import { motion } from "framer-motion";
import { Utensils, Dumbbell, Waves, Plane, ShieldCheck, Headphones } from "lucide-react";

const services = [
  { icon: Utensils, title: "Fine Dining", description: "Michelin-starred restaurants and curated culinary experiences at every property." },
  { icon: Waves, title: "Spa & Wellness", description: "Rejuvenating spa treatments, meditation rooms, and thermal pools." },
  { icon: Dumbbell, title: "Fitness Centers", description: "State-of-the-art gyms with personal trainers available on request." },
  { icon: Plane, title: "Airport Transfer", description: "Complimentary luxury car service from airport to hotel doorstep." },
  { icon: ShieldCheck, title: "Best Price Guarantee", description: "Found it cheaper? We'll match the price and add 10% discount." },
  { icon: Headphones, title: "24/7 Concierge", description: "Dedicated concierge service for restaurant bookings, tours, and more." },
];

export default function ServicesSection() {
  return (
    <section className="py-24 px-4 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">Why Choose Us</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            World-Class Services
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-card border border-border rounded-2xl p-8 text-center group hover:shadow-warm transition-shadow"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                <service.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold text-card-foreground mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

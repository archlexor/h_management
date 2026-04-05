import { motion } from "framer-motion";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { useState } from "react";
import heroImage from "@/assets/hero-hotel.jpg";

export default function HeroSection() {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    setTimeout(() => setSearched(false), 3000);
  };

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury resort"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-0 bg-foreground/30" />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/40 via-black/15 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-display text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight"
        >
          Your Perfect
          <br />
          <span className="text-gradient-gold">Luxury Escape</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-primary-foreground/80 mb-12 max-w-2xl mx-auto font-body"
        >
          Discover handpicked hotels & resorts at the world's most breathtaking destinations
        </motion.p>

        {/* Search Form */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-background/95 backdrop-blur-md rounded-2xl p-3 shadow-elevated max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-secondary">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <input
                type="text"
                placeholder="Where to?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-sm focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-secondary">
              <Calendar className="w-5 h-5 text-primary shrink-0" />
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-transparent text-foreground text-sm focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-secondary">
              <Calendar className="w-5 h-5 text-primary shrink-0" />
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-transparent text-foreground text-sm focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-gradient-gold text-primary-foreground px-6 py-3 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
            >
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>
          {searched && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-primary mt-3 font-medium"
            >
              ✓ Searching for {location || "all destinations"}...
            </motion.p>
          )}
        </motion.form>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-8 md:gap-16 mt-10"
        >
          {[
            { value: "500+", label: "Properties" },
            { value: "50+", label: "Countries" },
            { value: "100K+", label: "Happy Guests" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-display font-bold text-primary-foreground">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-primary-foreground/60">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

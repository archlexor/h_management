'use client';

import { useState, useEffect, ReactNode } from 'react';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';
import { Search, MapPin, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MediaContent = ({ children }: { children?: ReactNode }) => {
  const [location, setLocation] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    setTimeout(() => setSearched(false), 3000);
  };

  return (
    <div className='max-w-5xl mx-auto'>
      <motion.form 
        onSubmit={handleSearch}
        className='bg-background/95 backdrop-blur-md rounded-2xl p-6 shadow-elevated border border-border mb-12 relative overflow-hidden group'
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-secondary focus-within:ring-2 ring-primary/20 transition-all">
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
              className="w-full bg-transparent text-foreground text-sm focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-secondary">
            <Calendar className="w-5 h-5 text-primary shrink-0" />
            <input
              type="date"
              className="w-full bg-transparent text-foreground text-sm focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-gradient-gold text-primary-foreground px-6 py-4 rounded-xl font-medium text-sm hover:opacity-90 transition-all font-display shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            <Search className="w-4 h-4" />
            Search Luxury
          </button>
        </div>
        <AnimatePresence>
          {searched && (
            <motion.p
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="text-sm text-primary mt-4 font-medium text-center"
            >
              ✓ Searching for pristine destinations in {location || "Paris"}...
            </motion.p>
          )}
        </AnimatePresence>
      </motion.form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 px-4">
        {[ 
          { value: "500+", label: "Elite Properties", desc: "Hand-picked for excellence" },
          { value: "50+", label: "Destinations", desc: "Across the most beautiful cities" },
          { value: "100K+", label: "VVIP Guests", desc: "Satisfied with our service" },
        ].map((stat, i) => (
          <motion.div 
            key={stat.label} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="text-center p-6 rounded-2xl border border-border shadow-soft bg-card/10 backdrop-blur-md hover:bg-card/20 transition-colors group cursor-default"
          >
            <div className="text-3xl font-display font-bold text-gradient-gold mb-1 group-hover:scale-110 transition-transform">
              {stat.value}
            </div>
            <div className="text-sm font-semibold text-foreground mb-1">{stat.label}</div>
            <div className="text-xs text-muted-foreground">{stat.desc}</div>
          </motion.div>
        ))}
      </div>

      <div className="mb-16">
        <h3 className="font-display text-2xl font-bold mb-8 text-center text-gradient-gold">Curated Collections</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Safari Escapes", img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=400" },
            { title: "Private Islands", img: "https://images.unsplash.com/photo-1544431731-b41f69752079?q=80&w=400" },
            { title: "Alpine Lofts", img: "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?q=80&w=400" },
            { title: "Metropolis Chic", img: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=400" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10 }}
              transition={{ delay: i * 0.05 }}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer group shadow-lg"
            >
              <img src={item.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white font-display text-lg font-semibold transform group-hover:translate-x-2 transition-transform">{item.title}</p>
                <div className="w-12 h-0.5 bg-gold mt-2 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {children}
    </div>
  );
};


export const HeroExpansion = ({ children }: { children?: ReactNode }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='min-h-screen'>
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYuZ5R8ahEEZ4aQK56LizRdfBSqeDMsmUIrJN1"
        bgImageSrc='https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1920&auto=format&fit=crop'
        title='LuxeStays Luxury Escapes'
        date='Curated by Experts'
        scrollToExpand='Scroll Down to Expand'
        textBlend
      >
        <MediaContent>
            {children}
        </MediaContent>
      </ScrollExpandMedia>
    </div>
  );
};

export default HeroExpansion;

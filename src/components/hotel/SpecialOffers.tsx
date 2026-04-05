import { motion } from "framer-motion";
import { Clock, Tag, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const offers = [
  {
    title: "Early Bird Summer Deal",
    description: "Book 60 days in advance and save up to 40% on selected resorts in Bali and Maldives.",
    discount: "40%",
    code: "EARLY40",
    deadline: "2026-06-30",
    img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Weekend Getaway",
    description: "Enjoy 2 nights for the price of 1 at boutique hotels across Europe.",
    discount: "50%",
    code: "WEEKEND50",
    deadline: "2026-05-15",
    img: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Honeymoon Package",
    description: "Complimentary spa, dinner & room upgrade for newlyweds at luxury resorts.",
    discount: "Free Upgrade",
    code: "LOVE2026",
    deadline: "2026-12-31",
    img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop",
  },
];

function CountdownTimer({ deadline }: { deadline: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = new Date(deadline).getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, mins: 0 };
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / (1000 * 60)) % 60),
      };
    };
    setTimeLeft(calc());
    const id = setInterval(() => setTimeLeft(calc()), 60000);
    return () => clearInterval(id);
  }, [deadline]);

  return (
    <div className="flex items-center gap-1 text-xs text-muted-foreground">
      <Clock className="w-3.5 h-3.5" />
      {timeLeft.days}d {timeLeft.hours}h {timeLeft.mins}m left
    </div>
  );
}

export default function SpecialOffers() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section id="offers" className="py-24 px-4 bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">Limited Time</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Special Offers</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {offers.map((offer, i) => (
            <motion.div
              key={offer.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-card rounded-2xl overflow-hidden border border-border shadow-warm group"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={offer.img}
                  alt={offer.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-gradient-gold text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
                  {offer.discount} OFF
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-card-foreground">{offer.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{offer.description}</p>

                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={() => copyCode(offer.code)}
                    className="flex items-center gap-1.5 bg-secondary px-3 py-1.5 rounded-lg text-sm font-mono text-foreground hover:bg-border transition-colors"
                  >
                    <Tag className="w-3.5 h-3.5 text-primary" />
                    {copiedCode === offer.code ? "Copied!" : offer.code}
                  </button>
                  <CountdownTimer deadline={offer.deadline} />
                </div>

                <button className="w-full mt-4 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
                  Claim Offer <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="py-24 px-4 bg-deep-brown relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, hsl(28 80% 52% / 0.3), transparent 50%), radial-gradient(circle at 80% 50%, hsl(43 85% 58% / 0.2), transparent 50%)" }} />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Mail className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Get Exclusive Deals
          </h2>
          <p className="text-primary-foreground/60 mb-8 max-w-lg mx-auto">
            Subscribe to our newsletter and be the first to know about secret sales, new properties, and luxury travel tips.
          </p>

          {subscribed ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-primary/20 border border-primary/30 rounded-2xl p-6 inline-block"
            >
              <p className="text-primary-foreground font-medium text-lg">🎉 Welcome aboard!</p>
              <p className="text-primary-foreground/60 text-sm mt-1">Check your inbox for a 15% welcome discount.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-5 py-3 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 text-sm focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-gradient-gold text-primary-foreground px-6 py-3 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
              >
                <Send className="w-4 h-4" />
                Subscribe
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

import { useState, useEffect } from "react";
import { Menu, X, Bell, User, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AuthModal from "./AuthModal";

const notifications = [
  { id: 1, text: "Booking confirmed for Grand Plaza!", time: "2h ago", unread: true },
  { id: 2, text: "Special offer: 30% off Bali resorts", time: "1d ago", unread: true },
  { id: 3, text: "Review request: How was your stay?", time: "3d ago", unread: false },
];

const navLinks = [
  { label: "Destinations", href: "#destinations" },
  { label: "Properties", href: "#properties" },
  { label: "Offers", href: "#offers" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [notifs, setNotifs] = useState(notifications);
  const [scrolled, setScrolled] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"signin" | "signup">("signin");

  const unreadCount = notifs.filter((n) => n.unread).length;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const markAllRead = () => {
    setNotifs(notifs.map((n) => ({ ...n, unread: false })));
  };

  const openAuth = (tab: "signin" | "signup") => {
    setAuthTab(tab);
    setAuthOpen(true);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? "bg-background/90 backdrop-blur-xl border-b border-border py-2 shadow-sm" 
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="font-display text-2xl font-bold transition-transform hover:scale-105 active:scale-95">
              <span className="text-gradient-gold">LuxeStays</span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[13px] uppercase tracking-[0.1em] font-medium text-foreground/70 hover:text-primary transition-all relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-gold transition-all group-hover:w-full" />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotif(!showNotif)}
                  className="relative p-2.5 rounded-full hover:bg-secondary/80 transition-all active:scale-95 group"
                >
                  <Bell className="w-5 h-5 text-foreground group-hover:text-primary" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-background animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <AnimatePresence>
                  {showNotif && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      className="absolute right-0 mt-4 w-80 bg-card/95 backdrop-blur-2xl border border-border/50 rounded-2xl shadow-elevated overflow-hidden z-[60]"
                    >
                      <div className="flex items-center justify-between p-5 border-b border-border/50">
                        <span className="font-display font-semibold text-lg text-card-foreground">Notifications</span>
                        <button onClick={markAllRead} className="text-xs text-primary hover:underline font-bold">
                          Clear all
                        </button>
                      </div>
                      <div className="max-h-[350px] overflow-y-auto">
                        {notifs.map((n) => (
                          <div
                            key={n.id}
                            className={`p-5 border-b border-border/30 last:border-0 hover:bg-secondary/30 transition-colors cursor-pointer ${n.unread ? "bg-primary/5" : ""}`}
                          >
                            <p className="text-sm font-medium text-card-foreground mb-1">{n.text}</p>
                            <span className="text-xs text-muted-foreground font-body">{n.time}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openAuth("signin")}
                className="hidden md:flex items-center gap-2 bg-gradient-gold text-primary-foreground px-5 py-2.5 rounded-full text-[13px] font-bold uppercase tracking-wider shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-all border border-gold/20"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </motion.button>

              {/* Mobile menu */}
              <button 
                className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors" 
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="w-6 h-6 text-primary" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "100vh", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-background/98 backdrop-blur-3xl border-t border-border overflow-hidden fixed top-[72px] inset-x-0 z-[40]"
            >
              <div className="px-6 py-8 flex flex-col items-center justify-center space-y-6 h-full">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-2xl font-display font-medium text-foreground py-2 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-8 w-full max-w-xs space-y-4">
                  <Button 
                    onClick={() => { setMobileOpen(false); openAuth("signin"); }}
                    className="w-full bg-gradient-gold text-primary-foreground py-6 rounded-2xl text-base font-bold shadow-xl"
                  >
                    Sign In
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => { setMobileOpen(false); openAuth("signup"); }}
                    className="w-full py-6 rounded-2xl text-base font-bold border-gold/20 text-gold"
                  >
                    Create Account
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AuthModal 
        isOpen={authOpen} 
        onClose={() => setAuthOpen(false)} 
        defaultTab={authTab}
      />
    </>
  );
}

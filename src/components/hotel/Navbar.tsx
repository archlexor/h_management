import { useState, useEffect } from "react";
import { Menu, X, Bell, LogIn } from "lucide-react";
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
        className={`fixed top-4 left-1/2 z-50 w-[calc(100%-1.5rem)] max-w-6xl -translate-x-1/2 rounded-2xl border transition-all duration-500 ${
          scrolled
            ? "bg-[rgba(255,248,235,0.14)] backdrop-blur-[15px] border-[rgba(255,248,235,0.28)] shadow-[0_14px_36px_rgba(0,0,0,0.18)]"
            : "bg-[rgba(255,248,235,0.14)] backdrop-blur-[15px] border-[rgba(255,248,235,0.28)] shadow-[0_10px_28px_rgba(0,0,0,0.12)]"
        }`}
      >
        <div className="px-10">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="font-serif text-xl font-medium tracking-[0.02em] bg-[#C5A059] text-white px-5 py-2.5 rounded-full border border-[#C5A059] transition-all duration-300 hover:bg-[#d3b172] hover:border-[#d3b172] hover:scale-105 active:scale-95"
            >
              <span>LuxeStays</span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-sans text-[12px] tracking-[0.02em] font-medium bg-[#C5A059] text-white px-4 py-2 rounded-full border border-[#C5A059] transition-all duration-300 hover:bg-[#d3b172] hover:border-[#d3b172]"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotif(!showNotif)}
                  className="relative p-2.5 rounded-full hover:bg-white/20 transition-all duration-300 active:scale-95 group"
                >
                  <Bell className="w-5 h-5 text-white/90 group-hover:text-[#C5A059] transition-colors duration-300" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-[#C5A059] text-slate-950 text-[9px] font-semibold rounded-full flex items-center justify-center border border-white/50 animate-pulse">
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
                className="hidden md:flex items-center gap-2 bg-[#C5A059] text-slate-950 px-5 py-2.5 rounded-full text-[12px] tracking-[0.02em] font-medium border border-[#C5A059] hover:bg-[#d3b172] hover:border-[#d3b172] transition-all duration-300"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </motion.button>

              {/* Mobile menu */}
              <button 
                className="md:hidden p-2 rounded-full hover:bg-white/20 transition-colors duration-300" 
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="w-6 h-6 text-[#C5A059]" /> : <Menu className="w-6 h-6 text-white" />}
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
              className="md:hidden bg-white/30 backdrop-blur-2xl border-t border-white/45 overflow-hidden fixed top-[90px] left-3 right-3 rounded-2xl z-[40]"
            >
              <div className="px-6 py-8 flex flex-col items-center justify-center space-y-6 h-full">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-base font-sans font-medium tracking-[0.02em] text-white py-2 px-5 rounded-full bg-[#C5A059] border border-[#C5A059] hover:bg-[#d3b172] hover:border-[#d3b172] transition-all duration-300"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-8 w-full max-w-xs space-y-4">
                  <Button 
                    onClick={() => { setMobileOpen(false); openAuth("signin"); }}
                    className="w-full bg-[#C5A059] border border-[#C5A059] text-slate-950 py-6 rounded-2xl text-sm font-medium tracking-[0.02em] hover:bg-[#d3b172] hover:border-[#d3b172] transition-all duration-300"
                  >
                    Sign In
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => { setMobileOpen(false); openAuth("signup"); }}
                    className="w-full py-6 rounded-2xl text-sm font-medium tracking-[0.02em] border-white/55 text-white hover:border-[#C5A059] hover:text-[#C5A059] transition-all duration-300"
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

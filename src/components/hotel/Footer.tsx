import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const footerLinks = {
  Company: ["About Us", "Careers", "Press", "Blog"],
  Support: ["Help Center", "Safety", "Cancellation", "COVID-19"],
  Destinations: ["Europe", "Asia Pacific", "Americas", "Middle East"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Sitemap"],
};

export default function Footer() {
  return (
    <footer id="contact" className="bg-card border-t border-border py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-display text-2xl font-bold text-gradient-gold mb-4">LuxeStays</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Premium hotel booking for discerning travelers worldwide.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Stockholm, Sweden</p>
              <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> +1 (888) 555-0199</p>
              <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> hello@luxestays.com</p>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-foreground mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Project Docs</h4>
            <p className="text-sm text-muted-foreground mb-3">Explore architecture and interaction UML diagrams.</p>
            <Button asChild size="sm" className="rounded-full">
              <Link to="/uml-diagram">Open UML Diagram Page</Link>
            </Button>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© 2026 LuxeStays. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((social) => (
              <a key={social} href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

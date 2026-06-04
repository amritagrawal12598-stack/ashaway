import { Link } from "@tanstack/react-router";
import { Instagram, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-card/40 mt-24">
      <div className="mx-auto max-w-7xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <img src={logo} alt="Ashaway" className="h-9 w-9 rounded-md object-cover" />
              <span className="text-lg font-extrabold tracking-tight">
                ASH<span className="text-primary">AWAY</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Smoke freely. Leave nothing behind. Premium disposable pocket ashtrays
              for travelers, drivers, and urban smokers.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Shop</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/shop" className="hover:text-primary">All products</Link></li>
              <li><Link to="/shop" className="hover:text-primary">Travel pack</Link></li>
              <li><Link to="/shop" className="hover:text-primary">Bulk box</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Company</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-primary">About</Link></li>
              <li><Link to="/faq" className="hover:text-primary">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
              <li><Link to="/shipping" className="hover:text-primary">Shipping</Link></li>
              <li><Link to="/privacy" className="hover:text-primary">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-primary">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <p>© {new Date().getFullYear()} Ashaway. All rights reserved.</p>
            <p className="hidden sm:block">Made for smokers who care.</p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com/ashaway_co"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="social-icon social-instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=ashaway3001@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email"
              className="social-icon social-mail"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
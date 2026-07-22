import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { whatsappLink } from "@/lib/constants";
import logo from "@/assets/logo.jpeg";

// "Pricing" is intentionally left out of the nav (kept at /pricing for later re-enabling).
const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "FAQs", href: "/faqs" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-md shadow-md border-b border-border/70"
          : "bg-background/60 backdrop-blur-sm border-b border-transparent"
      )}
    >
      <nav className="container-wide mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="ECOclean Cymru" className="h-12 md:h-14 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center">
          {navigation.map((item, index) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "text-xs font-semibold uppercase tracking-widest transition-colors hover:text-primary pl-6 first:pl-0",
                index > 0 && "border-l border-border",
                location.pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <Button variant="pillOutline" size="sm" asChild>
            <Link to="/contact">Get a Quote</Link>
          </Button>
          <Button variant="whatsapp" size="sm" className="rounded-full uppercase text-xs tracking-wider" asChild>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              <Phone className="w-4 h-4" />
              WhatsApp Us
            </a>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden p-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container-wide mx-auto px-4 py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-3 py-2 rounded-md text-xs font-semibold uppercase tracking-widest transition-colors",
                  location.pathname === item.href
                    ? "text-primary bg-muted"
                    : "text-muted-foreground hover:text-primary hover:bg-muted"
                )}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              <Button variant="pillOutline" className="w-full" asChild>
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Get a Quote</Link>
              </Button>
              <Button variant="whatsapp" className="w-full rounded-full uppercase text-xs tracking-wider" asChild>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                  <Phone className="w-4 h-4" />
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

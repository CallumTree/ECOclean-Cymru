import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/pricing" },
  { name: "FAQs", href: "/faqs" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <nav className="container-wide mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-heading font-bold text-lg">E</span>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-semibold text-lg text-foreground leading-tight">ECOclean</span>
            <span className="text-xs text-muted-foreground leading-tight">Cymru</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
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
          <Button variant="outline" size="sm" asChild>
            <Link to="/contact">Get a Quote</Link>
          </Button>
          <Button variant="whatsapp" size="sm" asChild>
            <a href="https://wa.me/447432670535" target="_blank" rel="noopener noreferrer">
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
                  "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                  location.pathname === item.href
                    ? "text-primary bg-muted"
                    : "text-muted-foreground hover:text-primary hover:bg-muted"
                )}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              <Button variant="outline" className="w-full" asChild>
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Get a Quote</Link>
              </Button>
              <Button variant="whatsapp" className="w-full" asChild>
                <a href="https://wa.me/447432670535" target="_blank" rel="noopener noreferrer">
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

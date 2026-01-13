import { Link } from "react-router-dom";
import { Phone, Mail, Clock, MapPin, Shield, Leaf, BadgeCheck } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/pricing" },
  { name: "FAQs", href: "/faqs" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const trustSignals = [
  { icon: Shield, text: "Fully Insured" },
  { icon: Leaf, text: "Eco-Friendly" },
  { icon: BadgeCheck, text: "CSCS Card Holders" },
];

export function Footer() {
  return (
    <footer className="bg-eco-dark text-white">
      <div className="container-wide mx-auto section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img src={logo} alt="ECOclean Cymru" className="h-16 w-auto bg-white rounded-lg p-1" />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed">
              Professional cleaning services across Pembrokeshire, Wales. Reliable, eco-friendly, and committed to excellence.
            </p>
            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              <a
                href="https://www.tiktok.com/@ecocleancymru"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/ecocleancymru"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-eco-gold shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">Pembrokeshire, Wales</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-eco-gold shrink-0 mt-0.5" />
                <a href="tel:07432670535" className="text-white/70 hover:text-white transition-colors text-sm">
                  07432 670535
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-eco-gold shrink-0 mt-0.5" />
                <a href="mailto:Leanne@ecocleancymru.com" className="text-white/70 hover:text-white transition-colors text-sm">
                  Leanne@ecocleancymru.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-eco-gold shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">Mon–Fri, 8:00am–4:30pm</span>
              </li>
            </ul>
          </div>

          {/* Trust Signals */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Why Choose Us</h3>
            <ul className="space-y-3">
              {trustSignals.map((signal) => (
                <li key={signal.text} className="flex items-center gap-3">
                  <signal.icon className="w-5 h-5 text-eco-gold" />
                  <span className="text-white/70 text-sm">{signal.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} ECOclean Cymru LTD. All rights reserved.
            </p>
            <p className="text-white/50 text-sm">
              Serving Pembrokeshire, Wales
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

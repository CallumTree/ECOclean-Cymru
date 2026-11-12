import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <section className="bg-eco-charcoal py-24 md:py-32">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-eco-gold text-xs tracking-[0.3em] uppercase">404</span>
          <h1 className="font-display text-5xl md:text-6xl font-light text-white mt-4 mb-6 leading-[0.95]">
            Page not found.
          </h1>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
            That page doesn't exist or may have moved. Let's get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="pill" asChild>
              <Link to="/">
                Return Home
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="pillOutline" className="!border-white/40 !text-white hover:!bg-white hover:!text-eco-charcoal" asChild>
              <Link to="/contact">
                Get a Quote
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;

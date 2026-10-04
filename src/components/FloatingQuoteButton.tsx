import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useHideNearFooter } from "@/hooks/useHideNearFooter";

export function FloatingQuoteButton() {
  const visible = useHideNearFooter();

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <Button variant="pill" size="lg" className="shadow-lg hover:shadow-xl" asChild>
        <Link to="/contact">
          Get a Quote
          <ChevronRight className="w-4 h-4" />
        </Link>
      </Button>
    </div>
  );
}

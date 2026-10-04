import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function FloatingQuoteButton() {
  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Button variant="pill" size="lg" className="shadow-lg hover:shadow-xl" asChild>
        <Link to="/contact">
          Get a Quote
          <ChevronRight className="w-4 h-4" />
        </Link>
      </Button>
    </div>
  );
}

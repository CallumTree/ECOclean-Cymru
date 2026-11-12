import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useHideNearFooter } from "@/hooks/useHideNearFooter";

export function FloatingQuoteButton() {
  const visible = useHideNearFooter();
  const { pathname } = useLocation();

  // Pointless (and on smaller screens, overlapping) to float a "Get a
  // Quote" button on the page that already is the quote form.
  if (pathname === "/contact") return null;

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 16 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Button variant="pill" size="lg" className="shadow-lg hover:shadow-xl" asChild>
              <Link to="/contact">
                Get a Quote
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

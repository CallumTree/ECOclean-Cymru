import { Phone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/constants";
import { useHideNearFooter } from "@/hooks/useHideNearFooter";

export function WhatsAppButton() {
  const visible = useHideNearFooter();

  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 16 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Button
              variant="whatsapp"
              size="lg"
              className="rounded-full shadow-lg hover:shadow-xl w-14 h-14 p-0"
              asChild
            >
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact us on WhatsApp"
              >
                <Phone className="w-6 h-6" />
              </a>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

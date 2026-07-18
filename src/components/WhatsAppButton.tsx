import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/constants";

export function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
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
    </div>
  );
}

import { motion } from "framer-motion";
import { MessageSquare, Mail, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExitScreenProps {
  title: string;
  message: string;
  showEmail?: boolean;
}

export function ExitScreen({ title, message, showEmail = false }: ExitScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-8"
    >
      <div className="w-16 h-16 rounded-full bg-eco-gold/20 flex items-center justify-center mx-auto mb-6">
        <AlertCircle className="w-8 h-8 text-eco-gold-muted" />
      </div>

      <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
        {title}
      </h2>
      <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
        {message}
      </p>

      <div className="space-y-3 max-w-sm mx-auto">
        <Button
          variant="whatsapp"
          size="lg"
          className="w-full"
          asChild
        >
          <a
            href="https://wa.me/447432670535"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageSquare className="w-5 h-5" />
            WhatsApp us
          </a>
        </Button>

        {showEmail && (
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            asChild
          >
            <a href="mailto:Leanne@ecocleancymru.com">
              <Mail className="w-5 h-5" />
              Email us
            </a>
          </Button>
        )}
      </div>
    </motion.div>
  );
}

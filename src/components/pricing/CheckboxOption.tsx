import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxOptionProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function CheckboxOption({ label, checked, onChange }: CheckboxOptionProps) {
  return (
    <motion.button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        checked
          ? "border-primary bg-primary/5"
          : "border-border bg-card hover:border-primary/50"
      )}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div
        className={cn(
          "flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors",
          checked ? "border-primary bg-primary" : "border-border"
        )}
      >
        {checked && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <Check className="w-4 h-4 text-primary-foreground" />
          </motion.div>
        )}
      </div>
      <span
        className={cn(
          "font-medium text-left",
          checked ? "text-primary" : "text-foreground"
        )}
      >
        {label}
      </span>
    </motion.button>
  );
}

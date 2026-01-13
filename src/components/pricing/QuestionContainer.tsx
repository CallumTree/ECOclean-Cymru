import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "./ProgressBar";

interface QuestionContainerProps {
  currentStep: number;
  totalSteps: number;
  question: string;
  helperText?: string;
  children: React.ReactNode;
  onBack?: () => void;
  showBack?: boolean;
}

export function QuestionContainer({
  currentStep,
  totalSteps,
  question,
  helperText,
  children,
  onBack,
  showBack = true,
}: QuestionContainerProps) {
  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col">
      <div className="mb-8">
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      </div>

      {showBack && onBack && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="self-start mb-4 -ml-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={question}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-1"
        >
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">
            {question}
          </h2>
          {helperText && (
            <p className="text-muted-foreground mb-8">{helperText}</p>
          )}
          {!helperText && <div className="mb-8" />}

          <div className="space-y-3">{children}</div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

import { useState } from "react";
import { ChevronsLeftRight } from "lucide-react";

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
}

export function BeforeAfterSlider({ before, after, beforeAlt, afterAlt }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);

  return (
    <div className="relative aspect-[16/9] overflow-hidden select-none">
      <img
        src={after}
        alt={afterAlt}
        loading="lazy"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img
          src={before}
          alt={beforeAlt}
          loading="lazy"
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Divider + drag handle */}
      <div
        className="absolute inset-y-0 w-0.5 bg-white pointer-events-none"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
          <ChevronsLeftRight className="w-5 h-5 text-eco-charcoal" strokeWidth={2} />
        </div>
      </div>

      <span className="absolute top-3 left-3 bg-black/60 text-white text-[10px] tracking-widest uppercase px-2 py-1 pointer-events-none">
        Before
      </span>
      <span className="absolute top-3 right-3 bg-eco-gold text-eco-charcoal text-[10px] tracking-widest uppercase px-2 py-1 font-semibold pointer-events-none">
        After
      </span>

      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        aria-label={`Drag to compare ${beforeAlt} and ${afterAlt}`}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize touch-none"
      />
    </div>
  );
}

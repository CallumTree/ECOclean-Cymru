/**
 * Before/After gallery configuration.
 *
 * Each entry represents ONE space photographed from the same angle before
 * and after an ECOclean Cymru job. When more real job photos become
 * available, drop the new files into `src/assets/real-photos/` and update
 * the imports below — no component changes required.
 *
 * Rules for a valid pair:
 *  - Same room, same angle, same framing.
 *  - The `label` must match the service shown (kitchen pair → kitchen label).
 *  - Keep aspect ratios consistent between the before and after shot.
 *
 * These are genuine ECOclean Cymru job photos, cropped from PicCollage
 * before/after composites (with PicCollage's own text/watermark cropped out).
 */

import ovenBefore from "@/assets/real-photos/oven-before.jpg";
import ovenAfter from "@/assets/real-photos/oven-after.jpg";
import toiletBefore from "@/assets/real-photos/toilet-before.jpg";
import toiletAfter from "@/assets/real-photos/toilet-after.jpg";

export type BeforeAfterPair = {
  id: string;
  label: string;
  before: string;
  after: string;
  /** True until swapped for a real completed-job photo. */
  isPlaceholder: boolean;
};

export const beforeAfterPairs: BeforeAfterPair[] = [
  {
    id: "oven-deep-clean",
    label: "Oven Deep Clean",
    before: ovenBefore,
    after: ovenAfter,
    isPlaceholder: false,
  },
  {
    id: "bathroom-reset",
    label: "Bathroom Reset",
    before: toiletBefore,
    after: toiletAfter,
    isPlaceholder: false,
  },
];

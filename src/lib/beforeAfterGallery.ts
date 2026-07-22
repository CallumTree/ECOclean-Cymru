/**
 * Before/After gallery configuration.
 *
 * Each entry represents ONE space photographed from the same angle before
 * and after an ECOclean Cymru job. When real job photos become available,
 * drop the new files into `src/assets/` and update the imports below —
 * no component changes required.
 *
 * Rules for a valid pair:
 *  - Same room, same angle, same framing.
 *  - The `label` must match the service shown (kitchen pair → kitchen label).
 *  - Keep aspect ratios consistent between the before and after shot.
 *
 * NOTE: The current images are AI-generated placeholders staged to look
 * like a genuine transformation of a single space. Replace with real
 * customer job photos when available.
 */

import beforeKitchen from "@/assets/before-kitchen.jpg";
import afterKitchen from "@/assets/after-kitchen.jpg";
import beforeBathroom from "@/assets/before-bathroom.jpg";
import afterBathroom from "@/assets/after-bathroom.jpg";

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
    id: "kitchen-deep-clean",
    label: "Kitchen Deep Clean",
    before: beforeKitchen,
    after: afterKitchen,
    isPlaceholder: true,
  },
  {
    id: "bathroom-reset",
    label: "Bathroom Reset",
    before: beforeBathroom,
    after: afterBathroom,
    isPlaceholder: true,
  },
];

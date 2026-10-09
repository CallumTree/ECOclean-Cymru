---
name: ECOclean Cymru
description: Pembrokeshire's eco-friendly cleaning specialists, with fresh linen, deep green and a touch of harvest gold.
colors:
  preseli-green: "hsl(155 45% 18%)"
  preseli-green-light: "hsl(152 40% 32%)"
  preseli-deep: "hsl(155 100% 10%)"
  harvest-gold: "hsl(42 45% 60%)"
  harvest-gold-deep: "hsl(42 50% 50%)"
  harvest-straw: "hsl(42 40% 70%)"
  charcoal-moss: "hsl(155 20% 8%)"
  ink-moss: "hsl(155 25% 10%)"
  lichen-grey: "hsl(155 20% 40%)"
  linen-white: "hsl(0 0% 100%)"
  warm-linen: "hsl(42 20% 96%)"
  linen-mint: "hsl(152 35% 95%)"
  linen-border: "hsl(42 20% 90%)"
  whatsapp-green: "#25D366"
typography:
  display:
    fontFamily: "Fraunces, Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(2.75rem, 7vw, 5.75rem)"
    fontWeight: 300
    lineHeight: 0.95
    letterSpacing: "-0.025em"
    fontFeature: "\"ss01\", \"ss02\""
  headline:
    fontFamily: "Fraunces, Cormorant Garamond, Georgia, serif"
    fontSize: "3.75rem"
    fontWeight: 300
    lineHeight: 1.05
    fontFeature: "\"ss01\", \"ss02\""
  title:
    fontFamily: "Outfit, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.2
  title-sm:
    fontFamily: "Outfit, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  body-lead:
    fontFamily: "Inter, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 300
    lineHeight: 1.625
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.1em"
  eyebrow:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.3em"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  full: "9999px"
spacing:
  gutter-sm: "16px"
  gutter-md: "24px"
  gutter-lg: "32px"
  section-y-sm: "64px"
  section-y-md: "96px"
  container-narrow: "1024px"
  container-wide: "1280px"
components:
  button-pill:
    backgroundColor: "{colors.preseli-green}"
    textColor: "{colors.linen-white}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    height: "48px"
    padding: "0 32px"
  button-pill-hover:
    backgroundColor: "{colors.preseli-green-light}"
  button-pill-outline:
    backgroundColor: "transparent"
    textColor: "{colors.preseli-green}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    height: "36px"
    padding: "0 16px"
  button-pill-outline-hover:
    backgroundColor: "{colors.preseli-green}"
    textColor: "{colors.linen-white}"
  button-whatsapp:
    backgroundColor: "{colors.whatsapp-green}"
    textColor: "{colors.linen-white}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    height: "48px"
    padding: "0 32px"
  button-gold:
    backgroundColor: "{colors.harvest-gold}"
    textColor: "{colors.ink-moss}"
    rounded: "{rounded.md}"
    height: "40px"
    padding: "0 20px"
  card:
    backgroundColor: "{colors.linen-white}"
    textColor: "{colors.ink-moss}"
    rounded: "{rounded.xl}"
  input:
    backgroundColor: "{colors.linen-white}"
    textColor: "{colors.ink-moss}"
    rounded: "{rounded.md}"
    height: "40px"
    padding: "8px 12px"
  nav-link:
    textColor: "{colors.lichen-grey}"
    typography: "{typography.label}"
  nav-link-active:
    textColor: "{colors.preseli-green}"
---

# Design System: ECOclean Cymru

## Overview

**Creative North Star: "The Fresh Linen Room"**

The site should feel like walking into a room that has just been cleaned
properly: bright, airy and calm, with nothing out of place. Most of the
space is light linen. Preseli Green gives it weight and trust, and Harvest
Gold is used sparingly, like a sprig of gorse on a freshly made bed. The
finished result comes first. Real photographs of clean work carry the
emotion, and the interface frames them without competing.

Pages are generous rather than dense, with tall sections, wide margins and
short paragraphs. Type does the expressive work. A light, high-contrast
Fraunces serif gives an editorial voice in large sizes, with gold italics
for emphasis, while Outfit and Inter keep everything else plain and
legible. Dark green bands (Preseli Deep) are the counterpoint: they hold
the hero overlay, trust strips and closing calls to action, so the light
sections feel fresh by contrast.

The system rules out the category's clichés. That means no bright-blue
"sparkle" look (bubbles, shine stars, mascots), no posed stock photos of
grinning cleaners, no loud sales banners or countdowns, and no techy
purple or blue gradients or glowing glass.

**Key Characteristics:**
- Light linen surfaces, with deep green bands for punctuation.
- A light Fraunces display face with gold italic emphasis words.
- Small, widely tracked uppercase labels and eyebrows, often led by a thin
  gold rule.
- Rounded pill buttons for every main call to action.
- Soft, ambient shadows tinted green, never grey.
- Restrained, once-only fade-up motion.

## Colors

A green and gold palette on warm white. The neutrals lean slightly gold,
never cold grey.

### Primary
- **Preseli Green** (`preseli-green`): the brand's anchor. Used for primary
  buttons, active nav, links, focus rings and the "clean" in the wordmark.
  It reads as trustworthy and grounded rather than "eco-bright".
- **Preseli Green Light** (`preseli-green-light`): the hover state for
  primary buttons and secondary fills. Also used as the second stop in rare
  text gradients.
- **Preseli Deep** (`preseli-deep`): near-black green for full-width bands
  (trust strip, hero overlay base, CTA blocks) and as the background in dark
  mode.

### Secondary
- **Harvest Gold** (`harvest-gold`): the accent. Used for italic emphasis
  words in display headings, eyebrows, hairline rules, the active state on
  testimonial dots, and the gold button.
- **Harvest Gold Deep** (`harvest-gold-deep`): the hover state for gold
  fills.
- **Harvest Straw** (`harvest-straw`): a pale gold for quiet tints and
  dividers on dark bands.

### Neutral
- **Linen White** (`linen-white`): the default page and card surface.
- **Warm Linen** (`warm-linen`): muted section backgrounds, ghost-button
  hover and active mobile-nav rows.
- **Linen Mint** (`linen-mint`): a soft green-tinted section background
  used to vary rhythm between light sections.
- **Linen Border** (`linen-border`): all borders, input strokes and
  dividers.
- **Ink Moss** (`ink-moss`): body text and headings. It is green-black, not
  pure black.
- **Lichen Grey** (`lichen-grey`): secondary text, inactive nav and
  captions.
- **Charcoal Moss** (`charcoal-moss`): the deepest surface, used for the
  footer and dark testimonial panels.

### Named Rules
**The Sprig of Gorse Rule.** Harvest Gold is an accent, never a field.
Keep it to emphasis words, eyebrows, hairlines and the occasional button,
at roughly 5% of any screen or less. Its rarity is what makes it special.

**The Gold-on-Dark Rule.** Harvest Gold text only appears on Preseli Deep,
Charcoal Moss or photo overlays, where it reaches 6.3:1 or more. On white
it falls to 2.2:1, which fails WCAG, so on light surfaces gold is limited
to hairlines, fills with Ink Moss text, or display type at 48px or larger,
and even then only as a single decorative word.

**The No Cold Grey Rule.** Every neutral is tinted green or gold. Never
introduce slate, zinc or pure #000 or #808080.

## Typography

**Display Font:** Fraunces (with Cormorant Garamond, Georgia, serif)
**Heading Font:** Outfit (with sans-serif)
**Body Font:** Inter (with sans-serif)

**Character:** Fraunces brings a soft, editorial voice in light weights;
its stylistic sets 01 and 02 are switched on. Outfit is a clean geometric
sans for structural headings. Inter keeps body copy and labels neutral and
legible.

### Hierarchy
- **Display** (Fraunces, light, fluid up to 92px, very tight leading): hero
  headlines and the wordmark banner. One per page. A single emphasis word
  is set in italic Harvest Gold.
- **Headline** (Fraunces, light, 36–60px, leading 1.05): section openers
  such as "How it works" or "Our services".
- **Title** (Outfit, semibold, 24–36px): card group headings, CTA band
  headings and page sub-sections.
- **Title Small** (Outfit, semibold, 18–20px): card titles, service names
  and FAQ questions.
- **Body** (Inter, regular, 16px, relaxed leading): all running copy, with
  lines kept to 65–75 characters (`max-w-xl` / `max-w-2xl`).
- **Body Lead** (Inter, light, 18–20px): hero and section intros, usually
  in white at 80% opacity over imagery.
- **Label** (Inter, semibold, 12px, uppercase, 0.1em tracking): buttons,
  nav links and the trust strip.
- **Eyebrow** (Inter, medium, 12px, uppercase, 0.3em tracking): the small
  line above a headline, often led by a 32px gold hairline.

### Named Rules
**The Light Serif Rule.** Fraunces is only ever set light (300) or regular
(400). Bold serif headlines break the linen calm.

**The One Italic Rule.** At most one word or short phrase per display
heading is set in gold italic. Two makes it decoration.

## Layout

- **Containers:** wide (1280px) for most sections and narrow (1024px) for
  text-led pages. Side gutters are 16, 24 and 32px across small, medium and
  large breakpoints.
- **Section rhythm:** 64px vertical padding on mobile and 96px from the
  `md` breakpoint (the `.section-padding` class). Light sections alternate
  with Warm Linen or Linen Mint tints and with dark Preseli Deep bands.
- **Hero:** full-bleed photograph at 90% of the viewport height, with a
  left-weighted green gradient overlay and copy constrained to about 768px
  on the left.
- **Grids:** service pillars use three columns on desktop, stacking to one.
  "Why choose us" uses four columns on desktop, two on tablet and one on
  mobile.
- **Header:** sticky, 64px on mobile and 80px on desktop. Desktop nav
  appears at the `lg` breakpoint (1024px); below that, a disclosure menu
  holds full-width pill buttons.
- **Persistent actions:** floating quote and WhatsApp buttons sit in the
  bottom corners and must never cover form fields or the footer's contact
  details.

## Elevation & Depth

Soft and ambient. Surfaces rest with barely visible, green-tinted shadows
(alpha 0.03–0.08, based on Preseli Deep, never grey). Elevation rises
slightly on hover for interactive cards, and when the header scrolls (it
gains a medium shadow and a 12px backdrop blur). The dark bands and photo
overlays carry most of the sense of depth; shadows only soften edges.

### Shadow Vocabulary
- **Rest** (`--shadow-sm`): FAQ items, inputs and static cards.
- **Raised** (`--shadow-md`): the scrolled header and button hover.
- **Lifted** (`--shadow-lg`): service and pillar cards on hover, and
  floating action buttons.
- **Card** (`--shadow-card`): a two-layer soft shadow for feature cards
  that must stand off a tinted section.

### Named Rules
**The Tinted Shadow Rule.** Shadow colour is always Preseli Deep at low
alpha. A neutral or black shadow muddies the linen.

**The Gentle Lift Rule.** Hover adds at most one step of shadow, plus a
border shift to Preseli Green at 40% opacity. No translate or scale bounce.

## Shapes

Gently softened, never sharp and never bubbly. Inputs and default buttons
use small radii (6px). Cards and accordions use 8–12px. Every main call to
action is a full pill. Borders are a hairline of Linen Border, and images
are clipped by their card's radius. The only recurring decorative shapes
are the thin gold hairline (32px by 1px) before eyebrows and the subtle
3px dot-grain texture on dark bands.

## Components

### Buttons
Refined and restrained: small tracked capitals, and only the main action
is filled.
- **Shape:** full pill (`rounded.full`) for calls to action. Utility
  buttons use 6px.
- **Primary (pill):** a Preseli Green fill with white uppercase label text
  and 32px horizontal padding at the 48px large size. On hover it shifts to
  Preseli Green Light over 200ms.
- **Outline (pill outline):** a 2px Preseli Green stroke and green label on
  a transparent background, filling green with white text on hover. Used
  for the header's "Get a Quote".
- **WhatsApp:** WhatsApp brand green (#25D366) with a phone icon. This is
  the only sanctioned off-palette colour.
- **Gold:** a Harvest Gold fill with Ink Moss text, for the occasional
  secondary emphasis on dark bands.
- **Focus:** a 2px Preseli Green ring with a 2px offset on every variant.

### Cards / Containers
- **Corner style:** 12px for service and pillar cards, 8px for FAQ
  accordions and info panels.
- **Background:** Linen White, sitting on Warm Linen or Linen Mint
  sections.
- **Shadow strategy:** Rest by default and Lifted on hover (see Elevation &
  Depth).
- **Border:** a 1px Linen Border at 60% opacity. On hover it shifts to
  Preseli Green at 40% opacity.
- **Internal padding:** 24px, or 32–48px for feature panels. Images sit
  flush at the top.

### Inputs / Fields
- **Style:** a 1px Linen Border stroke, white background, 6px radius and
  40px height, with 14px Inter text.
- **Focus:** a 2px Preseli Green ring with an offset. No glow.
- **Error / disabled:** the destructive red ring and helper text, and 50%
  opacity when disabled.

### Navigation
- **Desktop:** uppercase 12px semibold labels with wide tracking, separated
  by hairline dividers. Inactive links are Lichen Grey and the active link
  is Preseli Green. Hover changes colour only.
- **Mobile:** a full-width disclosure panel with 8px-padded rows. The
  active row gets a Warm Linen background, and full-width pill CTAs are
  stacked below.

### Before and After Gallery (signature)
Real job photos shown in pairs, the site's main proof. They are always
presented as genuine work, never mixed with stock, and labelled plainly as
before and after.

### Trust Strip (signature)
A single line on a Preseli Deep band: uppercase 12–14px labels at 70%
white, separated by bullets. Plain text only, with no icons or badges.

## Do's and Don'ts

### Do:
- **Do** keep most of every page on Linen White, Warm Linen or Linen Mint,
  with Preseli Deep bands as deliberate punctuation.
- **Do** set display headlines in light Fraunces with at most one gold
  italic word.
- **Do** use pill buttons for every main call to action, keeping "Get a
  Quote" and "WhatsApp Us" one tap away on mobile.
- **Do** tint every shadow and neutral green or gold.
- **Do** use real job photography first. Credit any stock image in a code
  comment.
- **Do** keep motion to a single 0.6s ease-out fade-up, once per element,
  and honour `prefers-reduced-motion`.

### Don't:
- **Don't** use the bright-blue "sparkle" cleaning look: bubbles, shine
  stars, cartoon mascots or clip-art leaves.
- **Don't** use posed stock photos of over-smiling cleaners.
- **Don't** add loud sales banners, countdown timers, red discount badges
  or "LOWEST PRICE" stickers.
- **Don't** use purple or blue gradients, glassmorphism or neon glows.
- **Don't** set Harvest Gold body text on light surfaces (2.2:1 fails
  WCAG).
- **Don't** add new white-on-#25D366 text. The current WhatsApp button
  label is only 2.0:1, a known gap. Fix it with Ink Moss label text or
  WhatsApp's darker teal (#075E54) rather than copying the pattern.
- **Don't** use bold or black Fraunces, or bounce, elastic or scale-pop
  motion.

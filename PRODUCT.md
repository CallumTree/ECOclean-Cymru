# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Three customer groups, weighted equally:

- **Domestic and letting customers in Pembrokeshire.** Homeowners who want a
  regular weekly or fortnightly cleaner. Holiday-let owners and letting
  agents who need changeovers timed around guest check-in and check-out.
  Landlords and tenants who need a deposit-standard end-of-tenancy clean.
  Households with damp who need mould treatment. Their job is to find a
  trustworthy local cleaner, get a price, and book with little effort.
- **Local businesses.** Offices, retail units, pubs, restaurants, childcare
  and education settings, and community venues that need recurring contract
  cleaning, often out of hours and with keyholding.
- **Builders and property developers.** They need scheduled cleaning of
  site cabins, canteens and welfare units, plus multi-stage post-construction
  cleans and sparkle finishes for client handover.

## Product Purpose

A marketing and enquiry site for ECOclean Cymru LTD, a cleaning company
based in Pembrokeshire, West Wales. It explains the services, gives
domestic customers an instant estimate, and turns visits into enquiries.
Success is a qualified enquiry through the contact form, WhatsApp, a
callback request, or a completed pricing questionnaire.

## Positioning

ECOclean Cymru is an owner-led Pembrokeshire business with close links to
the local construction trade. It offers domestic, holiday-let, mould,
commercial and construction-site cleaning under one roof, and uses
eco-friendly products as standard. Because of its construction links it
understands site standards, programmes and handovers, which a general
domestic cleaner or a franchise cannot honestly claim.

## Operating Context

- Most visitors are local and many browse on a phone. WhatsApp
  (07432 670535) is a primary contact channel alongside the contact form
  (Web3Forms, to leanne@ecocleancymru.com).
- Holiday-let work follows guest changeover windows. End-of-tenancy work
  follows letting-agent inventory checklists. Construction work follows site
  programmes and client handover dates.
- Commercial cleaning often happens early in the morning, in the evening or
  at weekends, with keyholder options.

## Capabilities and Constraints

- Routes: `/` (home), `/services`, `/pricing`, `/faqs`, `/about`,
  `/contact`.
- `/pricing` is a step-by-step questionnaire for deep clean,
  end-of-tenancy, holiday-let and post-construction work. Calculations stay
  internal (`src/lib/pricingLogic.ts`); customers see only a final price and
  an approximate duration. A callback dialog is available.
- Floating quote and WhatsApp buttons appear site-wide.
- Each service lists what is and isn't included. For example, mould
  treatment excludes structural damp-proofing, and end-of-tenancy excludes
  garden clearance. Keep these exclusions.
- Stack: Vite, React, TypeScript, Tailwind and shadcn/ui, originally built
  in Lovable. Single-page app with client-side routing.
- English only. Welsh-language content has not been decided.

## Brand Commitments

- Name and styling: **ECOclean Cymru**, with "ECO" in capitals and "Cymru"
  kept. Legal entity: ECOclean Cymru LTD. Logo files are in `src/assets/`.
- Voice: plain-spoken, local and confident ("done properly"; "based here,
  serving here — not a franchise or a call centre miles away").
- Eco-friendly is the starting point but not an absolute. The site openly
  says that tough stains sometimes need stronger products. Never overstate
  the green claims.

## Evidence on Hand

- **Verified claims:** public liability insurance is in place, and every
  team member is DBS checked.
- **CSCS: not held.** Do not say "CSCS qualified" or "CSCS card holders".
  The meta and OG descriptions in `index.html` currently do, and need
  correcting. Use "working towards" wording only if the owner confirms it.
- **Real photos:** before and after shots of an oven and a toilet, a
  finished bathroom, and a pub bar (`src/assets/real-photos/`, paired in
  `src/lib/beforeAfterGallery.ts`). Other service images are stock and are
  credited in code comments.
- **Missing:** no customer reviews, testimonials, case studies, client
  logos or accreditation badges yet. The home page uses "Why choose us"
  instead of reviews on purpose. Never invent any of these.

## Product Principles

1. **Honest proof only.** Every claim must be one the business can back up
   today. Show trust through real photos, verified checks and plain
   inclusions and exclusions, not borrowed badges.
2. **Three pillars, one company.** Domestic, commercial and construction
   carry equal weight. No service line should make the others feel like an
   afterthought.
3. **Local and owner-led.** The site should feel like a Pembrokeshire
   business you can message directly, not an agency.
4. **Shortest path to an enquiry.** A quote, a WhatsApp message or a
   callback should be one obvious step from anywhere, especially on mobile.
5. **Construction-grade reliability.** Turning up on schedule and
   finishing to handover standard is part of the promise to every customer,
   not just to builders.

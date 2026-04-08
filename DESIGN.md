# Design Brief

## Direction

FEM (Future Expense Manager) — Mobile-first financial advisor platform for middle-class Indian families seeking trust-first interface for lead generation and financial education.

## Tone

Refined professional trust — disciplined, clear, intentional color hierarchy. Not trendy, focused on clarity and confidence for financial decisions.

## Differentiation

Consistent blue (#0066CC) for all primary CTAs and active states signals financial trust; green (#00AA33) for success metrics and growth messaging creates cognitive association with positive financial outcomes.

## Color Palette

| Token      | OKLCH           | Role                      |
| ---------- | --------------- | ------------------------- |
| background | 0.98 0.006 230  | Main content area         |
| foreground | 0.16 0.01 240   | Primary text              |
| card       | 1.0 0.0 0       | Card backgrounds          |
| primary    | 0.45 0.19 265   | Headers, CTAs, active tab |
| accent     | 0.60 0.18 145   | Success, growth states    |
| muted      | 0.93 0.01 230   | Sections, dividers        |

## Typography

- Display: Figtree — section headings, hero text, form labels
- Body: General Sans — body copy, UI labels, card content
- Scale: hero `text-4xl md:text-5xl font-bold`, h2 `text-2xl font-bold`, label `text-sm font-semibold uppercase`, body `text-base`

## Elevation & Depth

Card-based surfaces with subtle shadows (shadow-sm 0 2px 4px) create depth hierarchy; header elevated with primary blue background and white text; bottom navigation anchored at base.

## Structural Zones

| Zone          | Background       | Border     | Notes                                          |
| ------------- | ---------------- | ---------- | ---------------------------------------------- |
| Header        | bg-primary       | none       | FEM logo left, language toggle (EN/HI) right   |
| Content       | bg-background    | —          | Alternates with muted sections every 2 cards   |
| Cards         | bg-card          | subtle     | shadow-sm, rounded-lg (8px)                    |
| Tab Nav       | bg-card          | border-t   | 5 tabs (Home, Services, Calculator, Education, Contact), active: green accent |
| Form inputs   | bg-input         | subtle     | 44px+ min height, touch-friendly               |

## Spacing & Rhythm

16px base spacing unit: sections gap 24px, card internal padding 16px, form fields 12px vertical gap. Mobile-first 320px–768px, spacious layout with 16px side margins.

## Component Patterns

- Buttons: 44px+ height, rounded 8px, primary blue with white text (hover: opacity-90), green accent for success
- Cards: 8px radius, white background, subtle shadow, 16px padding
- Badges: rounded full, 8px padding, muted background with accent text for highlights
- Inputs: 44px height, gray border, blue focus ring, 12px padding

## Motion

- Entrance: Fade-in 300ms on page load (cards stagger 50ms between)
- Hover: Opacity shift 0.9→1.0 on buttons, shadow-sm lift on cards (300ms cubic-bezier)
- Decorative: None—focus on responsiveness and clarity for financial content

## Constraints

- Light mode only (MVP)—financial trust requires clarity
- No gradients, no animations beyond smooth transitions—focus on content
- Touch-friendly minimum 44px targets across all interactive elements
- Bilingual support: placeholders for Hindi/English toggle in header

## Signature Detail

Blue-to-green visual language ties trust (blue primary, CTAs) with growth messaging (green success states), creating subconscious financial confidence association without explicit visual decoration.

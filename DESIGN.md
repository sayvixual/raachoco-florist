DESIGN.md — Raachoco Florist

0. Design Intent

Raachoco Florist is not a generic Link-in-bio page and not a full e-commerce dashboard.

The visual target is a compact, editorial florist storefront inspired by the supplied references:

soft pastel backgrounds with a floral/premium mood;

large, high-quality flower photography as the visual hero;

rounded mobile-card proportions and generous whitespace;

layered cards with subtle depth;

clean, minimal typography;

floating/overlapping UI elements;

horizontally scrollable product/content rails;

small but expressive micro-interactions;

strong CTA visibility without looking like an aggressive sales page.

The page should feel like a combination of digital flower catalog + social profile + mini storefront.

Core rule: photography creates emotion; typography creates hierarchy; UI stays quiet.

1. Visual Language

Mood

Primary mood: Youthful luxury, romantic, aesthetic, warm, elegant botanical atelier.
A fusion of modern Korean minimalist floral wrapping style with timeless European boutique elegance.

Key brand traits:
- Fresh & Youthful: light, welcoming, uncluttered, breathing space.
- Luxury & Elegance: rich pine green (`#005043`), warm gold metallic accents (`#d9a856`), and creamy peach warmth (`#fae1c9`).
- Editorial Clarity: intentional typography with strong hierarchy, delicate borders, zero visual noise.

Avoid:
- Generic SaaS blue/purple dashboards;
- Heavy drop shadows and harsh pure blacks;
- Aggressive neon colors or clashing gradients;
- Childish cartoons or noisy cliparts;
- Cheap "link tree" column stacks without editorial flow;
- Overly slow or distracting entrance animations.

Shape Language

Use soft, organic geometry:
- card radius: 16–24px (crisp, contemporary, proportionate)
- buttons: 999px pill or 12–16px smooth curve
- image containers: 16–20px with subtle inner glow/border
- floating badges: 999px pill with delicate gold or emerald border
- avoid sharp unstyled boxes and overly bulbous bubbly containers.

Depth

Depth should come from tactile layering and tonal warmth, not heavy shadows:
- Layer 1 (Canvas): Soft Warm Linen `#FAF7F2`
- Layer 2 (Cards & Surfaces): Pure Pristine White `#FFFFFF`
- Layer 3 (Accents & Highlights): Warm Cream `#FAE1C9` & Champagne Gold `#D9A856`
- Layer 4 (Hero & High-Impact Blocks): Deep Pine `#005043`
- Shadows: Ultra-diffuse `0 8px 30px rgba(0, 80, 67, 0.05)` or `0 2px 10px rgba(0, 0, 0, 0.03)`.

2. Color System & Palette

Client Signature Palette:
- Deep Pine / Emerald:   #005043 (Brand Primary, prestige, grounded botanical luxury)
- Warm Cream / Peach:     #FAE1C9 (Brand Secondary, youthful softness, petals, warm silk)
- Pure White:             #FFFFFF (Surface Crisp, contrast, pristine readability)
- Champagne Gold:         #D9A856 (Brand Accent, jewelry-grade elegance, badges, highlights)

Complementary Refined Palette:
- Canvas Warm Base:       #FAF7F2 (Editorial background, gentle on eyes)
- Surface Off-White:      #F5EFEB (Subtle card alternate)
- Text Primary (Off-Dark):#122622 (Deep Pine Slate, rich contrast without harsh #000)
- Text Secondary (Muted): #5C6F69 (Subtle herbal slate for captions and meta)
- Text Light:             #FFFFFF (On deep pine backgrounds)
- Border Light:           rgba(0, 80, 67, 0.08) / #EAE3D9
- Gold Foil Tint:         rgba(217, 168, 86, 0.15)
- Fresh Leaf Tint:        #EDF4F1 (Live status pill, subtle tags)

Semantic
- Open / Active:          #2A7C64
- Special / Featured:     #D9A856
- Subtle Alert:           #C86A58

Brand Logos & Assets
- Logo Green (`assets/images/logo-green.png`): Primary mark on light, cream, and white surfaces. Digunakan sebagai logo mandiri (standalone) di header tanpa duplikasi teks samping.
- Logo Gold (`assets/images/logo-gold.png`): Luxury mark on Deep Pine `#005043` surfaces, dark banners, and evening treatments.
- Monogram: "Rf" with rose emblem inside oval frame, "EST 2020", "RAACHOCO FLORIST", "Elegance in Every Bloom".

3. Typography

Pairing high-contrast editorial elegance with ultra-crisp modern legibility.

- Editorial Display & Headers:
  `Playfair Display` / `Cormorant Garamond`
  Roles: Hero titles, brand tagline, section headlines, product peek names.
  Style: Generous character, optical sizing, tracking: -0.015em.

- Modern Geometric UI & Body:
  `Plus Jakarta Sans` / `Outfit`
  Roles: Navigation, product descriptions, pricing, buttons, trust metrics, footer.
  Style: Clean, open counters, youthful, supremely legible at small sizes.

- Script Accent:
  `Playfair Display` (Italic) / `Italiana`
  Roles: Signature phrase "Elegance in Every Bloom", artisanal quotes.

Hierarchy & Responsive Typography Scale

Strict Scale Rule: **Desktop (> 1024px) > Tablet (641px – 1024px) > Mobile (<= 640px)**

| Level | Role / Elements | Desktop | Tablet | Mobile | Line Height |
|---|---|---|---|---|---|
| **Display** | Hero Title (`h1.hero-title`) | **52px** | **40px** | **29px** | 1.15 |
| **H1** | Primary Page Headers | **42px** | **34px** | **25px** | 1.18 |
| **H2** | Section Headlines (`.section-title`) | **36px** | **29px** | **22.5px** | 1.25 |
| **H3** | Subsections, Bento Titles, Modal Title | **22px** | **19.5px** | **17.5px** | 1.30 |
| **H4** | Product Titles, Map Titles, Footer Headlines | **18px** | **16.5px** | **15px** | 1.35 |
| **Stat** | Trust Numbers, Impact Metrics (`.trust-num`) | **34px** | **28px** | **24px** | 1.10 |
| **Price** | Card Price (`.price-val`) | **18px** | **16.5px** | **15px** | 1.20 |
| **Price Lg** | Modal Detail Price (`.peek-price`) | **24px** | **21px** | **18.5px** | 1.20 |
| **Lead** | Hero Description, Section Subtitles (`.section-desc`) | **16.5px** | **15px** | **14px** | 1.60 |
| **Body** | Base Reading Text, Review Quotes | **15.5px** | **14.5px** | **13.5px** | 1.65 |
| **UI** | Buttons, Nav Links, Input Fields | **14.5px** | **13.5px** | **13px** | 1.40 |
| **Small** | Secondary Meta, Card Stems, Schedule Rows | **13px** | **12.5px** | **11.5px** | 1.50 |
| **Tag** | Category Badges, Eyebrows, Filter Chips | **12px** | **11px** | **10.5px** | 1.20 |
| **Caption** | Microcopy, Badges, Legal Copyrights | **11px** | **10px** | **9.5px** | 1.30 |

Typography prioritizes large numbers, clear editorial contrast, and short expressive statements over dense text blocks.

4. Page Composition

Overall Layout

Desktop:

┌────────────────────────────────────────────────────────┐
│                Soft floral background                  │
│                                                        │
│        ┌──────────── Main content ─────────────┐       │
│        │  Header / brand                      │       │
│        │  Hero + primary CTA                  │       │
│        │  Trust metrics                       │       │
│        │  Featured products                   │       │
│        │  Categories                          │       │
│        │  Testimonials                        │       │
│        │  Gallery                              │       │
│        │  Location / Map                       │       │
│        │  Footer                               │       │
│        └───────────────────────────────────────┘       │
│                                      floating CTA →    │
└────────────────────────────────────────────────────────┘

Mobile:

┌─────────────────────────┐
│ Brand / social          │
│                         │
│ Hero photography        │
│ Brand statement         │
│ [ Order on WhatsApp ]   │
│                         │
│ Trust strip →           │
│                         │
│ Featured flowers →      │
│ [ cards swipe ]         │
│                         │
│ Categories →            │
│                         │
│ Testimonials →          │
│                         │
│ Gallery                 │
│                         │
│ Location + Map          │
│                         │
│ Floating/sticky CTA     │
└─────────────────────────┘

Container

Desktop max width:
1120–1200px

Mobile:
100% with 16–20px horizontal padding.

Avoid the narrow “phone mockup” composition shown in some references for the actual website. The website should use the reference visual language, but remain a real responsive page with proper desktop width.

5. Hero Design

The hero is the main emotional moment.

Recommended composition

Desktop:

left: brand statement + CTA;

right: oversized bouquet/product image;

small floating badge containing rating or availability;

background includes very subtle organic botanical shapes.

Mobile:

brand identity first;

large bouquet image;

concise statement;

CTA immediately below;

social icons in a compact row.

Hero copy structure

RAACHOCO FLORIST

Flowers made to be remembered.

Handcrafted bouquets and
beautiful floral gifts for every moment.

[ Order via WhatsApp ]

Do not use a large generic “Welcome to our store” heading.

Image behavior

Hero image should:

be high resolution;

use transparent PNG/WebP when possible for cut-out bouquet shots;

slightly overlap its container;

have subtle hover/parallax motion on desktop;

remain static enough on mobile for performance.

6. Trust Section

Instead of a conventional “statistics card,” use an elegant horizontal trust ribbon.

Example:

★ 5.0/5 (Google Maps)  2.5K+          6+ Years
Customer Rating        Happy Buyers   Creating Flowers

Visual treatment:

almost no border;

soft surface;

large numeric values;

small labels;

rating star as accent.

On mobile, allow horizontal swipe if needed rather than compressing into tiny text.

7. Product Catalog

This is the core interaction.

Product Card

Each card should contain:

┌──────────────────────┐
│                      │
│      Product Image   │
│                      │
├──────────────────────┤
│ Enchanted Bouquet    │
│ Soft white + lilac   │
│                      │
│ From Rp 150K   →     │
└──────────────────────┘

The image should occupy most of the card.

Card behavior

Desktop:

hover → card rises 2–4px;

image gently scales 1.02–1.04;

CTA/arrow becomes more visible.

Mobile:

tap → Product Peek sheet;

swipe through product rails.

Product Peek

Use a bottom sheet on mobile and centered modal/dialog on desktop.

Content:

large image;

product name;

short description;

price;

availability;

optional category;

Order via WhatsApp.

The modal should feel like an editorial product preview, not an admin dialog.

8. Category Navigation

Use horizontally scrollable pill chips.

Example:

All   Bouquet   Flower Box   Wedding   Gift   Custom

Active category should have:

brand fill;

high contrast text;

subtle transition.

Inactive categories remain quiet.

Do not create a large sidebar or filter panel.

9. Testimonials

Testimonials should feel human and lightweight.

Recommended layout:

Desktop:

one large featured testimonial;

two smaller surrounding cards.

Mobile:

swipeable cards.

Each card:

“Bunganya cantik banget,
persis seperti yang aku bayangkan.”

★★★★★

— Customer Name

Use actual customer content only.

Optional source badge:
Google Review, Instagram, or WhatsApp.

10. Gallery

Use an editorial image mosaic rather than a plain 3-column grid.

Suggested desktop composition:

┌───────────────┬───────┬───────┐
│               │  img  │  img  │
│     large     ├───────┴───────┤
│      img      │     medium    │
│               │      img      │
└───────────────┴───────────────┘

Mobile becomes a 2-column compact mosaic.

Interaction:

hover image → subtle zoom;

tap → fullscreen/lightbox;

Instagram CTA beneath gallery.

11. Location / Maps

Map should not dominate the page.

Use a split composition:

┌───────────────────────────┬──────────────────┐
│ Address                   │                  │
│ Opening hours             │      MAP         │
│ Phone                     │                  │
│ [ Get Directions ]        │                  │
└───────────────────────────┴──────────────────┘

Mobile stacks content above map.

The map container should use the same radius and surface language as other sections.

12. CTA System

Primary CTA:

Order via WhatsApp

Style:

rounded pill;

medium-large height;

strong brand accent;

icon + text.

Secondary:

Instagram

TikTok

Call

Get Directions

Sticky CTA

Mobile fixed bottom:

┌────────────────────────────────────┐
│     [ WhatsApp ]   [ Call ]        │
└────────────────────────────────────┘

Use safe-area padding on iOS.

Never let the sticky CTA hide the last content section.

13. Motion & Interaction

Motion should communicate touch, depth, and continuity, not decoration.

Entry

Use staggered fade/translate:

opacity 0 → 1
translateY 12px → 0

Duration:
400–650ms

Hover

cards: translateY(-3px)

image: scale(1.03)

buttons: small elevation + icon movement.

Scroll

Use restrained reveal-on-scroll for sections.

Do not animate every paragraph.

Product Peek

Use:

scale + opacity on desktop;

slide-up spring on mobile.

CTA

On hover/tap:

icon moves 2–4px;

background transition;

no exaggerated bounce.

Reduced Motion

Respect:

prefers-reduced-motion: reduce

Disable parallax, large transforms, and unnecessary stagger.

14. Responsive Rules

Mobile 320–767px

Primary priority.

single column;

touch targets ≥44px;

horizontal content rails;

sticky CTA;

compact top header;

product images large enough to create visual impact;

avoid tiny metadata.

Tablet 768–1023px

2-column product grid where appropriate;

preserve swipeable sections when they create better browsing;

no awkward desktop compression.

Desktop 1024px+

max content width 1120–1200px;

larger hero;

asymmetric editorial layouts;

3–4 product columns;

floating CTA;

hover interactions enabled.

Wide desktop

Do not simply stretch the content. Keep a controlled reading width and allow the background/decorative elements to breathe.

15. Component System

Suggested component hierarchy:

LandingPage
├── BrandHeader
├── HeroSection
│   ├── HeroCopy
│   ├── HeroProduct
│   └── AvailabilityBadge
├── TrustStrip
├── CategoryRail
├── FeaturedProducts
│   ├── ProductCard
│   └── ProductPeek
├── Testimonials
├── GalleryMosaic
├── LocationSection
│   ├── ContactInfo
│   └── Map
├── SocialLinks
├── StickyOrderBar
└── Footer

Keep components reusable and content-driven. Avoid page-specific one-off components when a pattern is likely to recur.

16. Accessibility

Required:

semantic headings in logical order;

keyboard-accessible buttons/cards;

visible focus states;

alt text for meaningful flower images;

decorative imagery marked appropriately;

sufficient text contrast;

aria-label for icon-only social buttons;

dialog focus management;

no interaction dependent on hover alone;

reduced-motion support.

17. Performance

Target:

fast first render;

minimal JavaScript;

optimized WebP/AVIF images;

responsive image sizes;

lazy-load below-fold gallery/product images;

reserve image dimensions to avoid CLS;

avoid loading a heavy map until the section is close to viewport;

avoid unnecessary carousel libraries when CSS scroll-snap is enough.

Prefer native CSS scroll snapping for simple horizontal rails.

18. Implementation Rules

DO

prioritize photography;

use whitespace deliberately;

create visual rhythm through alternating section densities;

keep interactions obvious;

use real content;

design mobile first;

use reusable tokens/components;

make product ordering one or two taps away.

DON'T

turn the page into a dashboard;

use excessive gradients;

use 10 different card styles;

create fake 3D effects;

put every piece of information above the fold;

use oversized text that pushes products below the fold;

create long forms;

auto-play audio/video;

use animation simply because it is possible.

19. Reference Translation

The supplied references establish several useful patterns:

Reference 1: strong pastel background + rounded cards + large product imagery → use for overall mood and product hierarchy.

Reference 2: botanical editorial composition + muted background + soft depth → use for premium florist atmosphere.

Reference 3: minimal plant catalog + oversized product image → use for product-detail composition and whitespace.

Reference 4: polished mobile commerce UI + clear CTA → use for information hierarchy and ordering interactions.

Reference 5: editorial floral product presentation → use for product preview and gallery treatment.

Reference 6: soft pink/pastel marketplace UI → use for social / playful micro-interaction cues, but simplify heavily.

The final design should combine the strongest visual principles from all references without copying any single screen.

20. Design Quality Bar

Before shipping, the page should pass these checks:

Does it immediately look like a florist brand rather than a SaaS template?

Is the first viewport visually memorable?

Can a customer reach WhatsApp within one obvious interaction?

Do products feel desirable before reading their text?

Does every section have a distinct visual rhythm?

Does mobile feel intentionally designed rather than a collapsed desktop page?

Are animations smooth and restrained?

Does the page remain elegant when real content is longer/shorter than the mockup?

Is the map useful without becoming visually dominant?

North star: a visitor should experience Raachoco as a beautiful digital flower shop, not as a collection of links.
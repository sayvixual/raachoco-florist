PRD — Raachoco Florist Landing Page

Feature: Public Catalog / Link-in-Bio Landing Page
User: Customer
Goal: Build a one-page digital storefront inspired by Lynk-style pages, but more visual, interactive, trustworthy, and conversion-focused.

1. Problem Statement

A basic link page only aggregates links. Customers still need to jump between WhatsApp, social media, product photos, reviews, and location details before deciding to order.

Raachoco Florist needs one destination where customers can discover products, validate trust, find the store, and start an order immediately.

Visual direction from the references: pastel floral palette, large product photography, rounded cards, soft shadows/glass effects, clean typography, horizontal product rails, subtle motion, and mobile-first composition. The result should feel like a mini interactive florist catalog, not a dashboard or full e-commerce app.

2. Product Principles

Simple: one scrolling page; no signup, cart, or checkout.

Visual-first: flowers and photography dominate the experience.

Interactive: swipe rails, product peek modal, hover/tap states, micro-animations.

Fast: mostly server-rendered/static; lazy-load non-critical imagery.

Trust-first: rating, reviews, testimonials, social proof, and location.

Conversion-first: WhatsApp remains continuously accessible.

3. V1 Scope — What Ships

Hero / Brand Header

Brand name, short value proposition, profile image, Order via WhatsApp CTA, social buttons, and a live Open / Closed / Opens at... status derived from business hours.

Trust Strip

Configurable rating, review count, customers/orders served, and business milestone. Clicking the proof area scrolls to testimonials.

Product Catalog

Featured products + category chips such as Bouquet, Flower Box, Custom, Wedding, and Gift.

Each product shows:

image

name

short description

price / starting price

availability

Order this CTA

On mobile: horizontal swipe rail. On desktop: responsive grid. Tapping a product opens a lightweight Product Peek sheet/modal. Ordering opens wa.me with a prefilled product message.

Testimonials / Social Proof

3–6 curated testimonials, optional customer avatar, optional rating, swipeable on mobile, plus a compact review/trust statement.

Gallery + Social CTA

3–6 curated florist images in an editorial mosaic with Instagram/TikTok CTA. No social-feed API in V1.

Location

Address, opening hours, phone, Google Maps embed or external Maps link, and Get Directions CTA.

Sticky Conversion CTA

Mobile: fixed WhatsApp Order + optional Call button.
Desktop: compact floating CTA.

Footer

Brand, contact, address, social links, and copyright.

4. Success Metrics

Primary:

WhatsApp CTA CTR

Product → WhatsApp clicks

Map/directions clicks

Social profile clicks

Secondary:

scroll depth

product peek opens

testimonial views

engagement rate

Core Web Vitals

Initial targets after traffic baseline:

WhatsApp CTA CTR ≥ 8%

Product-to-WhatsApp CTR ≥ 12%

Map CTR ≥ 3%

≥70% of visitors reach the product section

5. User Stories + Acceptance Criteria

US-01 — Discover brand
Customer understands the offering quickly.
AC: hero/value proposition above fold; WhatsApp CTA visible; no signup required.

US-02 — Browse products
Customer browses products without leaving the page.
AC: category filtering works; unavailable products are labelled; product peek opens/closes smoothly; responsive from 320px+.

US-03 — Order product
Customer starts a WhatsApp order from a product.
AC: valid wa.me URL; message contains product name; no WhatsApp API/Baileys dependency.

US-04 — Validate trust
Customer can verify rating and testimonials.
AC: rating/review count visible; testimonials swipe on mobile; no fabricated reviews.

US-05 — Find store
Customer can check hours and location.
AC: address + hours visible; Maps/directions works; open/closed status respects configured timezone.

US-06 — Cross-device UX
Customer gets a polished layout everywhere.
AC: no horizontal overflow; touch targets ≥44px; sticky CTA never hides content.

6. Recommended Stack

Frontend: Next.js + TypeScript
UI: Tailwind CSS + shadcn/ui
Motion: Motion (Framer Motion)
Database: Supabase PostgreSQL
Images: Supabase Storage or Cloudinary
Hosting: Vercel
Integrations: WhatsApp wa.me, Instagram/TikTok outbound links, Google Maps
Analytics: Vercel Analytics or privacy-friendly event analytics

Keep the architecture lightweight: server-render/static content by default; client components only for filters, modal/peek, carousel, and motion.

7. Data Model Changes

site_config
- brand_name, tagline, description, avatar_url
- phone, whatsapp_number, address
- latitude, longitude
- opening_hours_json, timezone
- rating, review_count, trust_stats_json

products
- name, slug, category, description
- price_from, image_urls[]
- is_featured, is_available, sort_order
- whatsapp_message_template

categories
- name, slug, sort_order

testimonials
- customer_name, avatar_url, quote
- rating, source_label
- is_featured, sort_order

social_links
- platform, label, url
- sort_order, is_visible

Security: Supabase RLS enabled; public read-only data; no public write endpoints; secrets never exposed to the client.

8. Edge Cases + Failure States

Product unavailable → show unavailable state and disable order CTA.

Missing/invalid WhatsApp → disable order CTA and show alternative contact.

Maps unavailable → show address + external Maps link.

Broken image → branded image fallback.

Missing rating/reviews → hide metric instead of showing zero.

Closed → show next opening time; ordering can remain enabled.

Long text → clamp without layout shift.

Slow network → lazy-load gallery/catalog imagery.

Missing social link → hide that icon.

Zero products → show custom-order WhatsApp CTA.

9. Out of Scope — V1

Full checkout/payment, cart, customer accounts, real-time inventory, WhatsApp Business API/Baileys, social-feed synchronization, public review submission, full CMS/admin, delivery-fee calculator, multi-branch support, AI features.

10. Open Questions

Will content be edited through an admin panel or directly in Supabase for V1?

What are the exact WhatsApp number, address, hours/timezone, social URLs, rating/review count, categories, and first 6–12 products?

Exact price or “starting from” price?

Generic WhatsApp message or product-specific templates?

Visual palette: lavender/purple, soft pink/cream, or a hybrid Raachoco palette?
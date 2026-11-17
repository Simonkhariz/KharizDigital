"use client";

import { ReactLenis } from "lenis/react";
import SiteBackgroundSlot from "@/demos/components/providers/SiteBackgroundSlot";
import StyleProvider from "@/demos/components/providers/StyleProvider";
import BlogSimpleCards from "@/demos/components/sections/blog/BlogSimpleCards";
import ContactSplitForm from "@/demos/components/sections/contact/ContactSplitForm";
import FaqSplitMedia from "@/demos/components/sections/faq/FaqSplitMedia";
import FeaturesAlternatingSplit from "@/demos/components/sections/features/FeaturesAlternatingSplit";
import FeaturesMediaCards from "@/demos/components/sections/features/FeaturesMediaCards";
import FooterBrand from "@/demos/components/sections/footer/FooterBrand";
import HeroBillboardTiltedCarousel from "@/demos/components/sections/hero/HeroBillboardTiltedCarousel";
import NavbarDropdown from "@/demos/components/sections/navbar/NavbarDropdown";
import ProductVariantCards from "@/demos/components/sections/product/ProductVariantCards";
import "./theme.css";

export default function PerfumeBrandTemplate() {
  return (
    <ReactLenis root>
      <StyleProvider
        siteBackground="cornerGlow"
        heroBackground="lightRaysCorner"
        buttonVariant="elastic"
      >
        <SiteBackgroundSlot />
        <NavbarDropdown
          logo="UMBRA"
          navItems={[
            {
              name: "Collection",
              href: "#products",
            },
            {
              name: "Craft",
              href: "#features",
            },
            {
              name: "Journal",
              href: "#blog",
            },
            {
              name: "Contact",
              href: "#contact",
            },
          ]}
          ctaButton={{
            text: "Shop Now",
            href: "#products",
          }}
        />
        <div id="hero" data-section="hero">
          <HeroBillboardTiltedCarousel
            textAnimation="fade"
            tag="Luxury Fragrance"
            title="A Fragrance That Lingers Long After You Leave"
            description="Discover our award-winning perfumes crafted with rare botanicals and master perfumery. Find your signature scent — the one they never forget."
            primaryButton={{
              text: "Explore Collection",
              href: "#products",
            }}
            secondaryButton={{
              text: "Our Craft",
              href: "#features",
            }}
            items={[
              {
                imageSrc: "/images/perfume-brand/hero-1.webp",
              },
              {
                imageSrc: "/images/perfume-brand/hero-2.webp",
              },
              {
                imageSrc: "/images/perfume-brand/hero-3.webp",
              },
              {
                imageSrc: "/images/perfume-brand/hero-4.webp",
              },
              {
                imageSrc: "/images/perfume-brand/hero-5.webp",
              },
              {
                imageSrc: "/images/perfume-brand/hero-6.webp",
              },
            ]}
          />
        </div>
        <div id="products" data-section="products">
          <ProductVariantCards
            textAnimation="fade"
            tag="Best Sellers"
            title="Featured Collection"
            description="Discover our bestselling fragrances composed with rare essences and the finest ingredients from around the world."
            products={[
              {
                name: "Solum Eau de Parfum",
                variant: "50ml • Earthy & Warm",
                price: "$185",
                imageSrc: "/images/perfume-brand/product-1.webp",
              },
              {
                name: "Aura Eau de Parfum",
                variant: "50ml • Floral & Soft",
                price: "$165",
                imageSrc: "/images/perfume-brand/product-2.webp",
              },
              {
                name: "Velour Body Mist",
                variant: "100ml • Light & Fresh",
                price: "$125",
                imageSrc: "/images/perfume-brand/product-3.webp",
              },
              {
                name: "Noir Absolu Parfum",
                variant: "30ml • Rich & Intense",
                price: "$195",
                imageSrc: "/images/perfume-brand/product-4.webp",
              },
            ]}
          />
        </div>
        <div id="features" data-section="features">
          <FeaturesAlternatingSplit
            textAnimation="fade"
            tag="Perfumery Craft"
            title="The Art Behind Our Fragrances"
            description="Each perfume is meticulously composed with rare essences and noble raw materials to create scents that captivate and endure."
            items={[
              {
                title: "Rare Ingredient Sourcing",
                description:
                  "We source precious essences from sustainable fields worldwide — Grasse rose, Madagascan vanilla, and Italian bergamot at their peak.",
                imageSrc: "/images/perfume-brand/feature-1.webp",
              },
              {
                title: "Master Perfumers",
                description:
                  "Every composition is crafted by world-renowned noses who balance top, heart, and base notes into unforgettable olfactory journeys.",
                imageSrc: "/images/perfume-brand/feature-2.webp",
              },
              {
                title: "Lasting Sillage",
                description:
                  "Our concentrated formulas are designed for exceptional longevity — a single application carries you beautifully from dawn to dusk.",
                imageSrc: "/images/perfume-brand/feature-3.webp",
              },
            ]}
          />
        </div>
        <div id="influencers" data-section="influencers">
          <FeaturesMediaCards
            textAnimation="fade"
            tag="Community"
            title="Worn By Those Who Set The Standard"
            description="The women shaping culture choose UMBRA as their signature."
            items={[
              {
                title: "Amara Osei",
                description: " ",
                videoSrc: "/images/shared/influencer-amara.mp4",
              },
              {
                title: "Chloe Marchand",
                description: " ",
                videoSrc: "/images/shared/influencer-chloe.mp4",
              },
              {
                title: "Elena Vasquez",
                description: " ",
                videoSrc: "/images/shared/influencer-elena.mp4",
              },
              {
                title: "Isla Montgomery",
                description: " ",
                videoSrc: "/images/shared/influencer-isla.mp4",
              },
              {
                title: "Zara Kimani",
                description: " ",
                videoSrc: "/images/shared/influencer-zara.mp4",
              },
              {
                title: "Nadia Petrova",
                description: " ",
                videoSrc: "/images/shared/influencer-nadia.mp4",
              },
            ]}
          />
        </div>
        <div id="blog" data-section="blog">
          <BlogSimpleCards
            textAnimation="fade"
            tag="Journal"
            title="The UMBRA Journal"
            description="Stories of scent, craft, and the women who inspire us. Explore the world behind our fragrances."
            items={[
              {
                category: "Fragrance Notes",
                title: "The Art of Layering Scents for Every Season",
                excerpt:
                  "Discover how to combine UMBRA fragrances for a signature scent that evolves with you throughout the day.",
                imageSrc: "/images/perfume-brand/blog-1.webp",
                authorName: "Camille Laurent",
                authorImageSrc: "/images/perfume-brand/author-1.webp",
                date: "Feb 2026",
              },
              {
                category: "Behind the Bottle",
                title: "From Grasse to Your Vanity: Sourcing Rose Absolute",
                excerpt:
                  "A journey through the fields of Provence where our master perfumers hand-select the rarest rose petals.",
                imageSrc: "/images/perfume-brand/blog-2.webp",
                authorName: "Elena Vasquez",
                authorImageSrc: "/images/perfume-brand/author-2.webp",
                date: "Jan 2026",
              },
              {
                category: "Women of UMBRA",
                title: "How Amara Osei Found Her Signature Scent",
                excerpt:
                  "The model and entrepreneur shares why Noir Absolu became the fragrance she never leaves the house without.",
                imageSrc: "/images/perfume-brand/blog-3.webp",
                authorName: "Nadia Petrova",
                authorImageSrc: "/images/perfume-brand/author-3.webp",
                date: "Jan 2026",
              },
            ]}
          />
        </div>
        <div id="faq" data-section="faq">
          <FaqSplitMedia
            textAnimation="fade"
            tag="Support"
            title="Frequently Asked Questions"
            description="Everything you need to know about our luxury fragrances, ingredients, and satisfaction guarantee."
            items={[
              {
                question: "What makes UMBRA fragrances different from other luxury brands?",
                answer:
                  "UMBRA combines rare natural essences with master perfumery techniques. Every composition is developed over months of refinement to deliver extraordinary depth and longevity.",
              },
              {
                question: "How long does the fragrance last on skin?",
                answer:
                  "Most of our Eau de Parfums last 8-12 hours on skin. Our Parfum concentrations can last up to 16 hours. For best results, apply to pulse points.",
              },
              {
                question: "Are your fragrances suitable for sensitive skin?",
                answer:
                  "Our perfumes are formulated with high-quality, dermatologically considered ingredients. They are free from common irritants and suitable for most skin types.",
              },
              {
                question: "Do you offer a satisfaction guarantee?",
                answer:
                  "We're confident in our compositions. If a fragrance doesn't feel right within 14 days of purchase, we offer a full refund—no questions asked.",
              },
              {
                question: "Are your ingredients natural or synthetic?",
                answer:
                  "We blend premium natural essences — oud, jasmine, rose — with refined aroma molecules for stability and projection.",
              },
              {
                question: "How do I choose the right fragrance for me?",
                answer:
                  "Start with our Discovery Set to explore all four scents. Wear each for a full day to find your match.",
              },
            ]}
            imageSrc="/images/perfume-brand/faq-image.webp"
          />
        </div>
        <div id="contact" data-section="contact">
          <ContactSplitForm
            textAnimation="fade"
            tag="Contact"
            title="Get in Touch"
            description="Have a question or looking for your signature scent? We'd love to hear from you."
            inputs={[
              {
                name: "name",
                type: "text",
                placeholder: "Your name",
                required: true,
              },
              {
                name: "email",
                type: "email",
                placeholder: "your@email.com",
                required: true,
              },
              {
                name: "phone",
                type: "tel",
                placeholder: "+1 (555) 000-0000",
              },
              {
                name: "subject",
                type: "text",
                placeholder: "How can we help?",
                required: true,
              },
            ]}
            textarea={{
              name: "message",
              placeholder: "Tell us about your fragrance preferences...",
              required: true,
            }}
            buttonText="Send Message"
            imageSrc="/images/perfume-brand/contact.webp"
          />
        </div>
        <FooterBrand
          brand="UMBRA"
          columns={[
            {
              items: [
                {
                  label: "Shop",
                  href: "#products",
                },
                {
                  label: "Our Craft",
                  href: "#features",
                },
                {
                  label: "Why UMBRA",
                  href: "#metrics",
                },
              ],
            },
            {
              items: [
                {
                  label: "Our Story",
                  href: "#",
                },
                {
                  label: "Sustainability",
                  href: "#",
                },
                {
                  label: "Community",
                  href: "#influencers",
                },
              ],
            },
            {
              items: [
                {
                  label: "Customer Care",
                  href: "#",
                },
                {
                  label: "Contact",
                  href: "#contact",
                },
                {
                  label: "FAQ",
                  href: "#faq",
                },
              ],
            },
            {
              items: [
                {
                  label: "Privacy Policy",
                  href: "#",
                },
                {
                  label: "Terms & Conditions",
                  href: "#",
                },
                {
                  label: "Return Policy",
                  href: "#",
                },
              ],
            },
          ]}
        />
      </StyleProvider>
    </ReactLenis>
  );
}

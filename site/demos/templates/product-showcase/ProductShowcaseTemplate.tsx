"use client";

import { ReactLenis } from "lenis/react";
import StyleProvider from "@/demos/components/providers/StyleProvider";
import FooterSimpleReveal from "@/demos/components/sections/footer/FooterSimpleReveal";
import HeroOverlayParallax from "@/demos/components/sections/hero/HeroOverlayParallax";
import AboutSection from "./components/AboutSection";
import FaqSection from "./components/FaqSection";
import Navbar from "./components/Navbar";
import ProductsSection from "./components/ProductsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import "./theme.css";

/** Product showcase landing page for the Monoblock chair. */
export default function ProductShowcaseTemplate() {
  return (
    <ReactLenis root>
      <StyleProvider siteBackground="none" heroBackground="none" buttonVariant="default">
        <Navbar
          logo="Monoblock"
          navItems={[
            {
              name: "About",
              href: "#about",
            },
            {
              name: "Collection",
              href: "#collection",
            },
            {
              name: "Reviews",
              href: "#testimonials",
            },
            {
              name: "FAQ",
              href: "#faq",
            },
          ]}
          ctaButton={{
            text: "Shop Now",
            href: "#collection",
          }}
        />
        <div id="hero" data-section="hero">
          <HeroOverlayParallax
            imageSrc="/images/product-showcase/hero.webp"
            avatarsLabel="The most iconic chair ever made."
            avatarsSrc={[
              "/images/product-showcase/avatar-1.webp",
              "/images/product-showcase/avatar-2.webp",
              "/images/product-showcase/avatar-3.webp",
            ]}
            title="The chair that sits"
            titleHighlight="everywhere."
            primaryButton={{
              text: "Get started",
              href: "#collection",
            }}
            secondaryButton={{
              text: "Learn more",
              href: "#about",
            }}
          />
        </div>
        <div id="about" data-section="about">
          <AboutSection
            textAnimation="slide-up"
            tag="About"
            title="The chair that sits"
            titleHighlight="everywhere."
            description="The monoblock chair is the most manufactured object in history. One mold, one material, one purpose — to give everyone a place to sit. We celebrate its humble genius and the stories it holds."
            primaryButton={{
              text: "Our Story",
              href: "#story",
            }}
            secondaryButton={{
              text: "Learn More",
              href: "#collection",
            }}
            backImageSrc="/images/product-showcase/about.webp"
            frontImageSrc="/images/product-showcase/about-front.webp"
          />
        </div>
        <div id="collection" data-section="collection">
          <ProductsSection
            textAnimation="slide-up"
            tag="Collection"
            title="Explore Our Timeless"
            titleHighlight="Collection"
            description="From backyards to boulevards — explore the monoblock in all its forms, colors, and character."
            primaryButton={{
              text: "Shop All",
              href: "#shop",
            }}
            secondaryButton={{
              text: "Learn More",
              href: "#about",
            }}
            products={[
              {
                name: "Classic White",
                variant: "Stackable • Matte",
                price: "$12",
                imageSrc: "/images/product-showcase/classic-white.webp",
              },
              {
                name: "Beach Beige",
                variant: "Stackable • Matte",
                price: "$14",
                imageSrc: "/images/product-showcase/beach-beige.webp",
              },
              {
                name: "Ocean Blue",
                variant: "Stackable • Gloss",
                price: "$14",
                imageSrc: "/images/product-showcase/ocean-blue.webp",
              },
              {
                name: "Sunset Red",
                variant: "Stackable • Matte",
                price: "$14",
                imageSrc: "/images/product-showcase/sunset-red.webp",
              },
            ]}
          />
        </div>
        <div id="testimonials" data-section="testimonials">
          <TestimonialsSection
            textAnimation="slide-up"
            tag="Reviews"
            title="What People Are"
            titleHighlight="Saying"
            description="From cafés to courtyards, hear why the monoblock is everyone's favorite seat."
            testimonials={[
              {
                title: "The perfect patio companion",
                quote:
                  "We bought a dozen for our café terrace. They're light, stackable, and our customers love them. Rain or shine, they hold up beautifully.",
                name: "Jorge Santos",
                role: "Café Owner, Lisbon",
                imageSrc: "/images/product-showcase/jorge.webp",
              },
              {
                title: "Simple, honest design",
                quote:
                  "There's something poetic about the monoblock. One mold, one material, one purpose. It's democratic design at its finest.",
                name: "Erik Lindgren",
                role: "Industrial Designer, Stockholm",
                imageSrc: "/images/product-showcase/about-front.webp",
              },
              {
                title: "Built for real life",
                quote:
                  "We use these for every family gathering. They stack in the garage, come out for birthdays, holidays, barbecues — they just work.",
                name: "James Okoro",
                role: "Homeowner, Lagos",
                imageSrc: "/images/product-showcase/conversations.webp",
              },
            ]}
          />
        </div>
        <div id="faq" data-section="faq">
          <FaqSection
            textAnimation="slide-up"
            tag="FAQ"
            title="Frequently Asked"
            titleHighlight="Questions"
            description="Everything you need to know about the world's most universal chair."
            items={[
              {
                question: "What is a monoblock chair?",
                answer:
                  "A monoblock chair is a single-piece plastic chair made from one mold. It's the most manufactured piece of furniture in history, found in every corner of the world.",
              },
              {
                question: "Are monoblock chairs stackable?",
                answer:
                  "Yes. One of the defining features of the monoblock is its stackability — they nest neatly on top of each other for easy storage and transport.",
              },
              {
                question: "How durable are they?",
                answer:
                  "Extremely durable. Made from polypropylene, monoblock chairs are weather-resistant, UV-stable, and built to handle years of daily use indoors and outdoors.",
              },
              {
                question: "Can I use them outdoors?",
                answer:
                  "Absolutely. Monoblock chairs are designed for outdoor use — they resist rain, sun, and humidity without rusting, rotting, or fading.",
              },
              {
                question: "Do you offer bulk orders?",
                answer:
                  "Yes, we offer bulk pricing for events, cafés, restaurants, and commercial spaces. Get in touch with us for a custom quote.",
              },
            ]}
          />
        </div>
        <FooterSimpleReveal
          brand="Monoblock"
          columns={[
            {
              title: "Shop",
              items: [
                {
                  label: "All Chairs",
                  href: "#collection",
                },
                {
                  label: "New Arrivals",
                  href: "#",
                },
                {
                  label: "Best Sellers",
                  href: "#",
                },
                {
                  label: "Bulk Orders",
                  href: "#",
                },
              ],
            },
            {
              title: "Company",
              items: [
                {
                  label: "About",
                  href: "#about",
                },
                {
                  label: "Our Story",
                  href: "#story",
                },
                {
                  label: "Careers",
                  href: "#",
                },
                {
                  label: "Contact",
                  href: "#",
                },
              ],
            },
            {
              title: "Support",
              items: [
                {
                  label: "FAQ",
                  href: "#faq",
                },
                {
                  label: "Shipping",
                  href: "#",
                },
                {
                  label: "Returns",
                  href: "#",
                },
                {
                  label: "Warranty",
                  href: "#",
                },
              ],
            },
          ]}
          copyright="© 2026 Monoblock. All rights reserved."
          links={[
            {
              label: "Privacy Policy",
              href: "#",
            },
            {
              label: "Terms of Service",
              href: "#",
            },
          ]}
        />
      </StyleProvider>
    </ReactLenis>
  );
}

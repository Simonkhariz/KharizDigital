"use client";

import { ReactLenis } from "lenis/react";
import SiteBackgroundSlot from "@/demos/components/providers/SiteBackgroundSlot";
import StyleProvider from "@/demos/components/providers/StyleProvider";
import FooterBasic from "@/demos/components/sections/footer/FooterBasic";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import FeaturesSection from "./components/FeaturesSection";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import "./theme.css";

/** Luxury real estate landing page: scroll-scrubbed video hero, statement, villas and contact. */
export default function LuxuryRealEstateTemplate() {
  return (
    <ReactLenis root>
      <StyleProvider siteBackground="none" heroBackground="none" buttonVariant="stagger">
        <SiteBackgroundSlot />
        <Navbar
          logo="Le Cercle"
          navItems={[
            {
              name: "Properties",
              href: "#properties",
            },
            {
              name: "About",
              href: "#about",
            },
            {
              name: "Contact",
              href: "#contact",
            },
          ]}
          ctaButton={{
            text: "Book a Tour",
            href: "#contact",
          }}
        />
        <div id="hero" data-section="hero">
          <HeroSection
            textAnimation="fade"
            videoSrc="/images/luxury-real-estate/hero.mp4"
            tag="Le Cercle Premium Real Estate"
            title="Live Where the Sun Meets the Sea"
            description="Exclusive beachfront villas and luxury apartments on the Costa del Sol. Your Mediterranean dream, delivered turnkey."
            primaryButton={{
              text: "View Properties",
              href: "#properties",
            }}
            secondaryButton={{
              text: "Book a Tour",
              href: "#contact",
            }}
            bottomText="A premium real estate brand designed for those seeking a refined way of living on the Costa del Sol"
          />
        </div>
        <div id="about" data-section="about">
          <AboutSection
            textAnimation="fade"
            title="For those who travel like it's an art form."
            imageSrc="/images/luxury-real-estate/statement.webp"
          />
        </div>
        <div id="properties" data-section="properties">
          <FeaturesSection
            textAnimation="fade"
            tag="Properties"
            title="Our Villas"
            description="Handpicked residences in Marbella's most coveted locations, each designed for effortless Mediterranean living."
            items={[
              {
                title: "Villa Serena",
                description:
                  "A sunlit 5-bedroom retreat with infinity pool, panoramic sea views, and private garden terraces.",
                imageSrc: "/images/luxury-real-estate/villa-1.webp",
              },
              {
                title: "Casa del Sol",
                description:
                  "Contemporary beachfront living with floor-to-ceiling glass, rooftop lounge, and direct beach access.",
                imageSrc: "/images/luxury-real-estate/villa-2.webp",
              },
              {
                title: "Villa Andalucía",
                description:
                  "Traditional charm meets modern luxury — courtyard, olive grove, and a heated outdoor pool.",
                imageSrc: "/images/luxury-real-estate/villa-3.webp",
              },
              {
                title: "The Meridian",
                description:
                  "Sleek 4-bedroom penthouse villa with smart home technology and sweeping coastal views.",
                imageSrc: "/images/luxury-real-estate/villa-4.webp",
              },
              {
                title: "Villa Blanca",
                description:
                  "Minimalist white-washed estate with private cinema, spa suite, and landscaped Mediterranean gardens.",
                imageSrc: "/images/luxury-real-estate/villa-5.webp",
              },
              {
                title: "Casa Dorada",
                description:
                  "Golden-hour perfection — west-facing terraces, wine cellar, and an open-plan chef's kitchen.",
                imageSrc: "/images/luxury-real-estate/villa-6.webp",
              },
            ]}
          />
        </div>
        <div id="contact" data-section="contact">
          <ContactSection
            title="Get In Touch"
            imageSrc="/images/luxury-real-estate/cta-bg.webp"
            inputs={[
              {
                name: "name",
                type: "text",
                placeholder: "Your name",
              },
              {
                name: "email",
                type: "email",
                placeholder: "Your email",
              },
            ]}
            textarea={{
              name: "message",
              placeholder: "Tell us about your dream property...",
              rows: 4,
            }}
            buttonText="Send Message"
            footerText="Prefer to talk? Book a private tour."
            footerLink={{
              text: "Email Us",
              href: "mailto:hello@lecercle.com",
              imageSrc: "/images/luxury-real-estate/avatar.webp",
            }}
          />
        </div>
        <FooterBasic
          columns={[
            {
              title: "Properties",
              items: [
                {
                  label: "Villas",
                  href: "#properties",
                },
                {
                  label: "Apartments",
                  href: "#",
                },
                {
                  label: "Penthouses",
                  href: "#",
                },
                {
                  label: "New Developments",
                  href: "#",
                },
              ],
            },
            {
              title: "Services",
              items: [
                {
                  label: "Property Search",
                  href: "#",
                },
                {
                  label: "Legal Assistance",
                  href: "#",
                },
                {
                  label: "Interior Design",
                  href: "#",
                },
                {
                  label: "Property Management",
                  href: "#",
                },
              ],
            },
            {
              title: "Locations",
              items: [
                {
                  label: "Golden Mile",
                  href: "#",
                },
                {
                  label: "Puerto Banús",
                  href: "#",
                },
                {
                  label: "Sierra Blanca",
                  href: "#",
                },
                {
                  label: "La Zagaleta",
                  href: "#",
                },
              ],
            },
            {
              title: "Company",
              items: [
                {
                  label: "About Us",
                  href: "#",
                },
                {
                  label: "Contact",
                  href: "#contact",
                },
                {
                  label: "Privacy Policy",
                  href: "#",
                },
                {
                  label: "Terms of Service",
                  href: "#",
                },
              ],
            },
          ]}
          leftText="© 2026 Le Cercle. All rights reserved."
          rightText="Marbella, Costa del Sol"
        />
      </StyleProvider>
    </ReactLenis>
  );
}

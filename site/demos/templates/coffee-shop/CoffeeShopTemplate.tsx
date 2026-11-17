"use client";

import { ReactLenis } from "lenis/react";
import { Mail, MessageCircle, Phone } from "lucide-react";
import SiteBackgroundSlot from "@/demos/components/providers/SiteBackgroundSlot";
import StyleProvider from "@/demos/components/providers/StyleProvider";
import FooterBrand from "@/demos/components/sections/footer/FooterBrand";
import NavbarFullscreen from "@/demos/components/sections/navbar/NavbarFullscreen";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import EventsSection from "./components/EventsSection";
import HeroSection from "./components/HeroSection";
import IntroStrokeOverlay from "./components/IntroStrokeOverlay";
import MenuSection from "./components/MenuSection";
import "./theme.css";

/** Coffee shop landing page: hero, cursor image trail, filterable menu, events and contact. */
export default function CoffeeShopTemplate() {
  return (
    <ReactLenis root>
      <StyleProvider siteBackground="aurora" heroBackground="none" buttonVariant="bounce">
        <SiteBackgroundSlot />
        <IntroStrokeOverlay />
        <NavbarFullscreen
          logo="Joe's Coffee"
          navItems={[
            {
              name: "Menu",
              href: "#menu",
            },
            {
              name: "Find Us",
              href: "#locations",
            },
          ]}
          ctaButton={{
            text: "Order Now",
            href: "#order",
          }}
        />
        <div id="hero" data-section="hero">
          <HeroSection
            textAnimation="fade-blur"
            brand="Joe's Coffee"
            description="Handcrafted espresso drinks and freshly baked pastries in a warm, welcoming atmosphere. From our first roast to your morning cup, every sip tells a story."
            primaryButton={{
              text: "Order Now",
              href: "#order",
            }}
            secondaryButton={{
              text: "View Menu",
              href: "#menu",
            }}
            videoSrc="/images/coffee-shop/hero.mp4"
            floatingCards={[
              {
                imageSrc: "/images/coffee-shop/iced-coffee.webp",
                name: "Americano",
              },
              {
                imageSrc: "/images/coffee-shop/latte.webp",
                name: "Latte",
              },
            ]}
          />
        </div>
        <div id="about" data-section="about">
          <AboutSection
            textAnimation="fade-blur"
            tag="Move your cursor!"
            mobileTag="Keep scrolling!"
            title="What are you in the mood for?"
            media={[
              {
                imageSrc: "/images/coffee-shop/trail-1.webp",
              },
              {
                imageSrc: "/images/coffee-shop/trail-2.webp",
              },
              {
                imageSrc: "/images/coffee-shop/trail-3.webp",
              },
              {
                imageSrc: "/images/coffee-shop/trail-4.webp",
              },
              {
                imageSrc: "/images/coffee-shop/trail-5.webp",
              },
              {
                imageSrc: "/images/coffee-shop/trail-6.webp",
              },
              {
                imageSrc: "/images/coffee-shop/trail-7.webp",
              },
              {
                imageSrc: "/images/coffee-shop/trail-8.webp",
              },
            ]}
            primaryButton={{
              text: "See the Menu",
              href: "#menu",
            }}
            secondaryButton={{
              text: "Find Us",
              href: "#locations",
            }}
          />
        </div>
        <div id="menu" data-section="menu">
          <MenuSection
            textAnimation="fade-blur"
            tag="What We Serve"
            title="Explore What's on Our Menu"
            description="From handcrafted espresso drinks to freshly baked pastries, every item is made with care."
            categories={["Hot Drinks", "Cold Drinks", "Pastries"]}
            items={[
              {
                name: "Espresso",
                category: "Hot Drinks",
                imageSrc: "/images/coffee-shop/espresso.webp",
              },
              {
                name: "Latte",
                category: "Hot Drinks",
                imageSrc: "/images/coffee-shop/latte-menu.webp",
              },
              {
                name: "Iced Latte",
                category: "Cold Drinks",
                imageSrc: "/images/coffee-shop/trail-2.webp",
              },
              {
                name: "Cappuccino",
                category: "Hot Drinks",
                imageSrc: "/images/coffee-shop/cappuccino.webp",
              },
              {
                name: "Iced Americano",
                category: "Cold Drinks",
                imageSrc: "/images/coffee-shop/iced-coffee.webp",
              },
              {
                name: "Mocha",
                category: "Hot Drinks",
                imageSrc: "/images/coffee-shop/mocha.webp",
              },
              {
                name: "Iced Mocha",
                category: "Cold Drinks",
                imageSrc: "/images/coffee-shop/trail-6.webp",
              },
              {
                name: "Flat White",
                category: "Hot Drinks",
                imageSrc: "/images/coffee-shop/trail-7.webp",
              },
              {
                name: "Iced Flat White",
                category: "Cold Drinks",
                imageSrc: "/images/coffee-shop/iced-flat-white.webp",
              },
              {
                name: "Chai Latte",
                category: "Hot Drinks",
                imageSrc: "/images/coffee-shop/chai-latte.webp",
              },
              {
                name: "Croissant",
                category: "Pastries",
                imageSrc: "/images/coffee-shop/trail-3.webp",
              },
              {
                name: "Chocolate Chip Cookie",
                category: "Pastries",
                imageSrc: "/images/coffee-shop/chocolate-chip-cookie.webp",
              },
            ]}
          />
        </div>
        <div id="features" data-section="features">
          <EventsSection
            textAnimation="fade-blur"
            tag="Beyond the Cup"
            title="Host Your Next Event at Joe's"
            description="From intimate gatherings to full-scale catering, we bring the warmth of Joe's wherever you need it."
            topItems={[
              {
                title: "Private Events",
                description:
                  "Book our space for birthdays, meetings, or just a good excuse to get together. Great coffee and good vibes included.",
                imageSrc: "/images/coffee-shop/private-events.webp",
              },
              {
                title: "Catering",
                description:
                  "Let us handle the coffee and pastries for your next event. We'll set up, pour, and make sure nobody runs on empty.",
                imageSrc: "/images/coffee-shop/catering.webp",
              },
            ]}
            bottomItem={{
              title: "Custom Menus",
              description:
                "Work with our team to build a tailored menu for your event — from espresso bars to pastry platters, we've got you covered.",
              imageSrc: "/images/coffee-shop/custom-menus.webp",
              primaryButton: {
                text: "Get in Touch",
                href: "#contact",
              },
            }}
          />
        </div>
        <div id="contact" data-section="contact">
          <ContactSection
            textAnimation="fade-blur"
            tag="Get in Touch"
            title={"Speak with one\nof our experts"}
            options={[
              {
                icon: MessageCircle,
                label: "Whatsapp",
                href: "https://wa.me/1234567890",
              },
              {
                icon: Mail,
                label: "Email",
                href: "mailto:hello@joescoffee.com",
              },
              {
                icon: Phone,
                label: "Number",
                href: "tel:+1234567890",
              },
            ]}
          />
        </div>
        <FooterBrand
          brand="Joe's Coffee"
          columns={[
            {
              items: [
                {
                  label: "Menu",
                  href: "#menu",
                },
                {
                  label: "Hot Drinks",
                  href: "#menu",
                },
                {
                  label: "Pastries",
                  href: "#menu",
                },
              ],
            },
            {
              items: [
                {
                  label: "Find Us",
                  href: "#locations",
                },
                {
                  label: "Hours",
                  href: "#locations",
                },
                {
                  label: "About",
                  href: "#about",
                },
              ],
            },
            {
              items: [
                {
                  label: "Contact",
                  href: "#contact",
                },
                {
                  label: "Careers",
                  href: "#careers",
                },
                {
                  label: "Gift Cards",
                  href: "#gift-cards",
                },
              ],
            },
          ]}
        />
      </StyleProvider>
    </ReactLenis>
  );
}

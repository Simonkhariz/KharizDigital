"use client";

import { ReactLenis } from "lenis/react";
import { motion } from "motion/react";
import SiteBackgroundSlot from "@/demos/components/providers/SiteBackgroundSlot";
import StyleProvider from "@/demos/components/providers/StyleProvider";
import AboutParallax from "@/demos/components/sections/about/AboutParallax";
import ContactSplitForm from "@/demos/components/sections/contact/ContactSplitForm";
import FeaturesAttributeCards from "@/demos/components/sections/features/FeaturesAttributeCards";
import FeaturesMediaGrid from "@/demos/components/sections/features/FeaturesMediaGrid";
import FeaturesRevealCardsBento from "@/demos/components/sections/features/FeaturesRevealCardsBento";
import FooterBrand from "@/demos/components/sections/footer/FooterBrand";
import HeroExpand from "@/demos/components/sections/hero/HeroExpand";
import NavbarFullscreen from "@/demos/components/sections/navbar/NavbarFullscreen";
import "./theme.css";

/** Boutique hotel landing page: expanding video hero, about, rooms, experiences and contact. */
export default function BoutiqueHotelTemplate() {
  return (
    <ReactLenis root>
      <StyleProvider siteBackground="none" heroBackground="none" buttonVariant="default">
        <SiteBackgroundSlot />
        <motion.div
          initial={{
            y: -100,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.6,
            delay: 1.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-110"
        >
          <NavbarFullscreen
            logo="Aurion"
            navItems={[
              {
                name: "Rooms",
                href: "#rooms",
              },
              {
                name: "Experience",
                href: "#experience",
              },
              {
                name: "Dining",
                href: "#dining",
              },
              {
                name: "Contact",
                href: "#contact",
              },
            ]}
            ctaButton={{
              text: "Book Now",
              href: "#contact",
            }}
          />
        </motion.div>
        <div id="hero" data-section="hero">
          <HeroExpand
            title="Aurion"
            videoSrc="/images/boutique-hotel/hero.mp4"
            primaryButton={{
              text: "Browse rooms",
              href: "#rooms",
            }}
            secondaryButton={{
              text: "Watch tour",
              href: "#tour",
            }}
          />
        </div>
        <div id="about" data-section="about">
          <AboutParallax
            textAnimation="slide-up"
            tag="About"
            title="A Sanctuary for Wellness & Rejuvenation"
            description="From private fitness studios to guided meditation sessions, our amenities are designed to enhance your well-being and foster a sense of harmony."
            frontImageSrc="/images/boutique-hotel/magnific_recreate-this-in-higher-q_te7wx9evnr.webp"
            backImageSrc="/images/boutique-hotel/pool.jpg"
            badge="Est. 1844"
          />
        </div>
        <div id="rooms" data-section="rooms">
          <FeaturesAttributeCards
            textAnimation="slide-up"
            tag="Rooms & Suites"
            title="Featured Rooms"
            description="Each room is a sanctuary of refined comfort, designed with meticulous attention to detail."
            items={[
              {
                title: "The Grand Suite",
                tags: "Panoramic, Terrace, Italian",
                badge: "Guest Favourite",
                details: [
                  {
                    icon: "Bed",
                    label: "Beds",
                    value: 2,
                  },
                  {
                    icon: "Bath",
                    label: "Baths",
                    value: 2,
                  },
                  {
                    icon: "Maximize2",
                    label: "Sqft",
                    value: 1450,
                  },
                ],
                imageSrc: "/images/boutique-hotel/grandsuite.webp",
              },
              {
                title: "Ocean Pavilion",
                tags: "Oceanfront, Serene, Bright",
                badge: null,
                details: [
                  {
                    icon: "Bed",
                    label: "Beds",
                    value: 1,
                  },
                  {
                    icon: "Bath",
                    label: "Baths",
                    value: 1,
                  },
                  {
                    icon: "Maximize2",
                    label: "Sqft",
                    value: 980,
                  },
                ],
                imageSrc: "/images/boutique-hotel/oceanpavillion.webp",
              },
              {
                title: "Garden Villa",
                tags: "Garden, Pool, Outdoor Living",
                badge: "Most Popular",
                details: [
                  {
                    icon: "Bed",
                    label: "Beds",
                    value: 3,
                  },
                  {
                    icon: "Bath",
                    label: "Baths",
                    value: 2,
                  },
                  {
                    icon: "Maximize2",
                    label: "Sqft",
                    value: 2200,
                  },
                ],
                imageSrc: "/images/boutique-hotel/gardenvilla.webp",
              },
              {
                title: "Presidential Suite",
                tags: "Expansive, Chef Kitchen, Butler",
                badge: "Guest Favourite",
                details: [
                  {
                    icon: "Bed",
                    label: "Beds",
                    value: 3,
                  },
                  {
                    icon: "Bath",
                    label: "Baths",
                    value: 3,
                  },
                  {
                    icon: "Maximize2",
                    label: "Sqft",
                    value: 3400,
                  },
                ],
                imageSrc: "/images/boutique-hotel/presidential-suite.webp",
              },
              {
                title: "Heritage Room",
                tags: "Classic, Restored, Elegant",
                badge: null,
                details: [
                  {
                    icon: "Bed",
                    label: "Beds",
                    value: 1,
                  },
                  {
                    icon: "Bath",
                    label: "Baths",
                    value: 1,
                  },
                  {
                    icon: "Maximize2",
                    label: "Sqft",
                    value: 850,
                  },
                ],
                imageSrc: "/images/boutique-hotel/heritage-room.webp",
              },
              {
                title: "Spa Retreat",
                tags: "Sauna, Soaking Tub, Wellness",
                badge: null,
                details: [
                  {
                    icon: "Bed",
                    label: "Beds",
                    value: 2,
                  },
                  {
                    icon: "Bath",
                    label: "Baths",
                    value: 2,
                  },
                  {
                    icon: "Maximize2",
                    label: "Sqft",
                    value: 1600,
                  },
                ],
                imageSrc: "/images/boutique-hotel/sparetreat.jpg",
              },
            ]}
          />
        </div>
        <div id="experience" data-section="amenities">
          <FeaturesMediaGrid
            textAnimation="slide-up"
            tag="Amenities"
            title="World-Class Experiences"
            description="Every detail has been considered to create moments of extraordinary comfort and indulgence."
            items={[
              {
                title: "Infinity Pool",
                description: "Heated oceanfront pool with panoramic sunset views",
                imageSrc: "/images/boutique-hotel/pool.jpg",
              },
              {
                title: "Private Spa",
                description: "Full-service wellness centre with bespoke treatments",
                imageSrc: "/images/boutique-hotel/spa.webp",
              },
              {
                title: "Fine Dining",
                description: "Michelin-starred cuisine with locally sourced ingredients",
                imageSrc: "/images/boutique-hotel/finedining.jpg",
              },
              {
                title: "Fitness Studio",
                description: "State-of-the-art equipment and personal training",
                imageSrc: "/images/boutique-hotel/fitnessstudio.webp",
              },
              {
                title: "Concierge",
                description: "24-hour dedicated service for every request",
                imageSrc: "/images/boutique-hotel/concierge.jpg",
              },
            ]}
          />
        </div>
        <div id="journeys" data-section="journeys">
          <FeaturesRevealCardsBento
            textAnimation="slide-up"
            tag="Journeys"
            title="The Journeys"
            description="Exclusive experiences curated for Aurion guests — from cloud forests to volcanic coastlines across Costa Rica's most breathtaking landscapes."
            items={[
              {
                title: "Cloud Forest Expedition",
                description:
                  "A private guided trek through Monteverde's misty canopy — hanging bridges, rare wildlife encounters, and a chef-prepared dinner in a hidden clearing.",
                href: "#",
                imageSrc: "/images/boutique-hotel/cloudforestexpedition.jpg",
              },
              {
                title: "Volcanic Hot Springs",
                description:
                  "Exclusive access to secluded thermal pools fed by Arenal Volcano, paired with a volcanic mud ritual and open-air massage.",
                href: "#",
                imageSrc: "/images/boutique-hotel/volcanichotsprings.webp",
              },
              {
                title: "Pacific Coast Sailing",
                description:
                  "A full-day private catamaran journey along the Guanacaste coastline — snorkeling, whale watching, and sunset cocktails aboard.",
                href: "#",
                imageSrc: "/images/boutique-hotel/sailing.webp",
              },
              {
                title: "Rainforest Immersion",
                description:
                  "Descend into Osa Peninsula's pristine jungle for a two-day wildlife retreat with naturalist guides and a treehouse overnight stay.",
                href: "#",
                imageSrc: "/images/boutique-hotel/rainforestimmersion.webp",
              },
              {
                title: "Coffee Origin Trail",
                description:
                  "Travel to the highlands of the Central Valley for an intimate single-origin coffee experience — from harvest to private tasting.",
                href: "#",
                imageSrc: "/images/boutique-hotel/coffeetrail.webp",
              },
              {
                title: "Sunset Safari",
                description:
                  "An exclusive evening wildlife drive through private reserves, ending with a starlit dinner in the savanna.",
                href: "#",
                imageSrc: "/images/boutique-hotel/safari.webp",
              },
              {
                title: "Marine Sanctuary",
                description:
                  "Dive into crystal-clear waters for a guided snorkeling experience among vibrant coral reefs and sea turtles.",
                href: "#",
                imageSrc: "/images/boutique-hotel/marinesacntuary.webp",
              },
            ]}
          />
        </div>
        <div id="contact" data-section="contact">
          <ContactSplitForm
            textAnimation="slide-up"
            tag="Contact"
            title="Book Your Stay"
            description="Let us help you plan the perfect getaway. Our concierge team is available to assist with reservations and special requests."
            inputs={[
              {
                name: "name",
                type: "text",
                placeholder: "Full Name",
                required: true,
              },
              {
                name: "email",
                type: "email",
                placeholder: "Email Address",
                required: true,
              },
              {
                name: "phone",
                type: "tel",
                placeholder: "Phone Number",
              },
              {
                name: "dates",
                type: "text",
                placeholder: "Preferred Dates",
              },
            ]}
            textarea={{
              name: "message",
              placeholder: "Special Requests or Questions",
              rows: 4,
            }}
            buttonText="Send Inquiry"
            imageSrc="/images/boutique-hotel/bookyourstay.webp"
          />
        </div>
        <FooterBrand
          brand="Aurion"
          columns={[
            {
              items: [
                {
                  label: "Rooms & Suites",
                  href: "#rooms",
                },
                {
                  label: "Dining",
                  href: "#dining",
                },
                {
                  label: "Amenities",
                  href: "#experience",
                },
              ],
            },
            {
              items: [
                {
                  label: "Journeys",
                  href: "#journeys",
                },
                {
                  label: "Spa & Wellness",
                  href: "#spa",
                },
                {
                  label: "Events",
                  href: "#events",
                },
              ],
            },
            {
              items: [
                {
                  label: "Book Now",
                  href: "#contact",
                },
                {
                  label: "Location",
                  href: "#location",
                },
                {
                  label: "Contact Us",
                  href: "#contact",
                },
              ],
            },
          ]}
        />
      </StyleProvider>
    </ReactLenis>
  );
}

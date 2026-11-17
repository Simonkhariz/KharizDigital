"use client";

import { ReactLenis } from "lenis/react";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import StyleProvider from "@/demos/components/providers/StyleProvider";
import AboutText from "@/demos/components/sections/about/AboutText";
import ContactSplitForm from "@/demos/components/sections/contact/ContactSplitForm";
import FeaturesDetailedSteps from "@/demos/components/sections/features/FeaturesDetailedSteps";
import FeaturesMediaCards from "@/demos/components/sections/features/FeaturesMediaCards";
import FeaturesTaggedCards from "@/demos/components/sections/features/FeaturesTaggedCards";
import FooterMinimal from "@/demos/components/sections/footer/FooterMinimal";
import HeroBrandCarousel from "@/demos/components/sections/hero/HeroBrandCarousel";
import NavbarInline from "@/demos/components/sections/navbar/NavbarInline";
import TestimonialSplitCards from "@/demos/components/sections/testimonial/TestimonialSplitCards";
import "./theme.css";

export default function TravelAgencyTemplate() {
  return (
    <ReactLenis root>
      <StyleProvider heroBackground="cornerGlow" buttonVariant="arrow">
        <NavbarInline
          logo="Luxuria"
          navItems={[
            {
              name: "About",
              href: "#about",
            },
            {
              name: "Services",
              href: "#services",
            },
            {
              name: "Destinations",
              href: "#destinations",
            },
            {
              name: "Reviews",
              href: "#reviews",
            },
            {
              name: "Contact",
              href: "#contact",
            },
          ]}
          ctaButton={{
            text: "Plan Your Trip",
            href: "#contact",
          }}
        />
        <div id="hero" data-section="hero">
          <HeroBrandCarousel
            textAnimation="fade"
            brand="Luxuria"
            description="Experience the world's most extraordinary destinations with our bespoke luxury travel experiences curated just for you."
            primaryButton={{
              text: "Plan Trip",
              href: "#contact",
            }}
            secondaryButton={{
              text: "Explore",
              href: "#destinations",
            }}
            items={[
              {
                imageSrc: "/images/travel-agency/hero1.webp",
              },
              {
                imageSrc: "/images/travel-agency/hero2.webp",
              },
              {
                imageSrc: "/images/travel-agency/hero3.jpg",
              },
              {
                imageSrc: "/images/travel-agency/hero4.jpg",
              },
            ]}
          />
        </div>
        <div id="about" data-section="about">
          <AboutText
            textAnimation="fade"
            title="We craft unforgettable journeys to the world's most exclusive destinations, where every detail is curated to perfection."
            primaryButton={{
              text: "Our Story",
              href: "#",
            }}
            secondaryButton={{
              text: "View Destinations",
              href: "#destinations",
            }}
          />
        </div>
        <div id="services" data-section="services">
          <FeaturesMediaCards
            textAnimation="fade"
            tag="Services"
            title="Tailored Travel Experiences"
            description="From private jets to secluded villas, we handle every detail of your journey."
            items={[
              {
                title: "Private Aviation",
                description:
                  "Charter flights and private jet services to any destination worldwide.",
                imageSrc: "/images/travel-agency/service5.webp",
              },
              {
                title: "Luxury Accommodations",
                description: "Handpicked five-star hotels, villas, and exclusive resorts.",
                imageSrc: "/images/travel-agency/service1.webp",
              },
              {
                title: "Curated Experiences",
                description: "Unique adventures and cultural immersions designed just for you.",
                imageSrc: "/images/travel-agency/service4.webp",
              },
              {
                title: "Fine Dining",
                description:
                  "Reservations at Michelin-starred restaurants and private chef services.",
                imageSrc: "/images/travel-agency/service3.webp",
              },
            ]}
          />
        </div>
        <div id="how-it-works" data-section="how-it-works">
          <FeaturesDetailedSteps
            textAnimation="fade"
            tag="How It Works"
            title="Your Journey Begins Here"
            description="From initial consultation to your return home, we manage every detail."
            steps={[
              {
                tag: "Step 01",
                title: "Share",
                subtitle: "Tell us about your dream destination",
                description:
                  "Share your travel preferences, desired experiences, and any special requirements. Our expert advisors will listen carefully to understand your vision.",
                imageSrc: "/images/travel-agency/phone5.webp",
              },
              {
                tag: "Step 02",
                title: "Plan",
                subtitle: "Receive a bespoke travel itinerary",
                description:
                  "Our team crafts a personalized journey featuring handpicked accommodations, exclusive experiences, and seamless logistics tailored to your preferences.",
                imageSrc: "/images/travel-agency/phone3.webp",
              },
              {
                tag: "Step 03",
                title: "Travel",
                subtitle: "Enjoy your seamless journey",
                description:
                  "Relax and enjoy every moment while we handle all the details behind the scenes. Our 24/7 concierge service ensures everything runs perfectly.",
                imageSrc: "/images/travel-agency/phone1.webp",
              },
            ]}
          />
        </div>
        <div id="destinations" data-section="destinations">
          <FeaturesTaggedCards
            textAnimation="fade"
            tag="Destinations"
            title="Extraordinary Destinations"
            description="Explore handpicked locations that define luxury travel."
            items={[
              {
                tag: "Asia",
                title: "Maldives Private Island",
                description:
                  "Exclusive overwater villas with direct lagoon access and private butler service.",
                primaryButton: {
                  text: "Explore",
                  href: "#",
                },
                imageSrc: "/images/travel-agency/destination6.webp",
              },
              {
                tag: "Europe",
                title: "Swiss Alpine Retreat",
                description:
                  "Secluded mountain chalets with panoramic views and world-class skiing.",
                primaryButton: {
                  text: "Explore",
                  href: "#",
                },
                imageSrc: "/images/travel-agency/destination5.webp",
              },
              {
                tag: "Africa",
                title: "African Safari Lodge",
                description: "Intimate wildlife encounters in the heart of the Serengeti.",
                primaryButton: {
                  text: "Explore",
                  href: "#",
                },
                imageSrc: "/images/travel-agency/destination1.webp",
              },
              {
                tag: "Europe",
                title: "Amalfi Coast Villa",
                description: "Clifftop estates with Mediterranean views and private beach access.",
                primaryButton: {
                  text: "Explore",
                  href: "#",
                },
                imageSrc: "/images/travel-agency/destination4.webp",
              },
              {
                tag: "Asia",
                title: "Kyoto Ryokan",
                description: "Traditional Japanese inns with zen gardens and kaiseki dining.",
                primaryButton: {
                  text: "Explore",
                  href: "#",
                },
                imageSrc: "/images/travel-agency/destination3.webp",
              },
              {
                tag: "South America",
                title: "Patagonia Eco Lodge",
                description:
                  "Remote wilderness retreats surrounded by glaciers and pristine nature.",
                primaryButton: {
                  text: "Explore",
                  href: "#",
                },
                imageSrc: "/images/travel-agency/destination2.webp",
              },
            ]}
          />
        </div>
        <div id="reviews" data-section="reviews">
          <TestimonialSplitCards
            textAnimation="fade"
            tag="Reviews"
            title="What Our Travelers Say"
            description="Hear from guests who've experienced extraordinary journeys."
            testimonials={[
              {
                tag: "Maldives",
                title: "An absolutely flawless experience from start to finish",
                quote:
                  "Luxuria transformed our anniversary trip into something truly magical. Every detail was perfect, from the private transfers to the surprise sunset dinner on the beach.",
                name: "Victoria Sterling",
                date: "December 2024",
                avatarImageSrc: "/images/shared/testimonial1.webp",
                imageSrc: "/images/shared/testimonial1.webp",
              },
              {
                tag: "Tanzania",
                title: "Beyond our wildest expectations",
                quote:
                  "Our safari honeymoon was nothing short of extraordinary. The lodges were spectacular, the wildlife encounters unforgettable, and the attention to detail was impeccable.",
                name: "James & Elizabeth Moore",
                date: "November 2024",
                avatarImageSrc: "/images/shared/testimonial2.webp",
                imageSrc: "/images/shared/testimonial2.webp",
              },
              {
                tag: "France",
                title: "The definition of luxury travel",
                quote:
                  "From the private jet charter to the exclusive vineyard tours, Luxuria curated an experience that exceeded all my expectations. Their network of contacts opened doors I never knew existed.",
                name: "Roberta Chen",
                date: "October 2024",
                avatarImageSrc: "/images/shared/testimonial3.webp",
                imageSrc: "/images/shared/testimonial3.webp",
              },
            ]}
          />
        </div>
        <div id="contact" data-section="contact">
          <ContactSplitForm
            textAnimation="fade"
            tag="Contact"
            title="Plan Your Journey"
            description="Let us create your perfect luxury travel experience."
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
                name: "destination",
                type: "text",
                placeholder: "Dream Destination",
              },
            ]}
            textarea={{
              name: "message",
              placeholder: "Tell us about your ideal travel experience...",
              rows: 4,
            }}
            buttonText="Start Planning"
            imageSrc="/images/travel-agency/contact1.webp"
          />
        </div>
        <FooterMinimal
          brand="Luxuria"
          copyright="© 2025 Luxuria Travel | Luxury Journeys Worldwide"
          socialLinks={[
            {
              icon: Instagram,
              href: "#",
            },
            {
              icon: Facebook,
              href: "#",
            },
            {
              icon: Linkedin,
              href: "#",
            },
          ]}
        />
      </StyleProvider>
    </ReactLenis>
  );
}

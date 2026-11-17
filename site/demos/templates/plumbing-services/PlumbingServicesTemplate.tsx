"use client";

import { ReactLenis } from "lenis/react";
import { Droplets, ShieldCheck, Wrench } from "lucide-react";
import SiteBackgroundSlot from "@/demos/components/providers/SiteBackgroundSlot";
import StyleProvider from "@/demos/components/providers/StyleProvider";
import ContactSplitForm from "@/demos/components/sections/contact/ContactSplitForm";
import FaqSimple from "@/demos/components/sections/faq/FaqSimple";
import FeaturesBorderGlow from "@/demos/components/sections/features/FeaturesBorderGlow";
import FeaturesMediaCards from "@/demos/components/sections/features/FeaturesMediaCards";
import FooterSimpleCard from "@/demos/components/sections/footer/FooterSimpleCard";
import HeroCenteredLogos from "@/demos/components/sections/hero/HeroCenteredLogos";
import NavbarInline from "@/demos/components/sections/navbar/NavbarInline";
import TestimonialRatingCards from "@/demos/components/sections/testimonial/TestimonialRatingCards";
import "./theme.css";

export default function PlumbingServicesTemplate() {
  return (
    <ReactLenis root>
      <StyleProvider siteBackground="floatingGradient" buttonVariant="expand">
        <SiteBackgroundSlot />
        <NavbarInline
          logo="FlowRight"
          navItems={[
            {
              name: "Services",
              href: "#services",
            },
            {
              name: "Reviews",
              href: "#reviews",
            },
            {
              name: "FAQ",
              href: "#faq",
            },
            {
              name: "Contact",
              href: "#contact",
            },
          ]}
          ctaButton={{
            text: "Get Quote",
            href: "#contact",
          }}
        />
        <div id="hero" data-section="hero">
          <HeroCenteredLogos
            textAnimation="slide-up"
            avatarsSrc={[
              "/images/plumbing-services/team-1.webp",
              "/images/plumbing-services/team-2.webp",
              "/images/plumbing-services/team-3.webp",
            ]}
            avatarText="Trusted by 1,200+ homeowners"
            title="Expert Plumbing You Can Trust"
            description="From leaky faucets to full remodels, our licensed plumbers deliver fast, reliable service — backed by a satisfaction guarantee."
            primaryButton={{
              text: "Schedule Service",
              href: "#contact",
            }}
            secondaryButton={{
              text: "(555) 472-8100",
              href: "tel:5554728100",
            }}
            names={[
              "Licensed & Insured",
              "24/7 Emergency Service",
              "15+ Years Experience",
              "100% Satisfaction Guarantee",
              "Free Estimates",
              "1,200+ Jobs Completed",
            ]}
            imageSrc="/images/plumbing-services/hero.webp"
          />
        </div>
        <div id="services" data-section="services">
          <FeaturesMediaCards
            textAnimation="slide-up"
            tag="Our Services"
            title="What We Fix"
            description="Residential and commercial plumbing services — done right the first time."
            items={[
              {
                title: "Leak Detection & Repair",
                description:
                  "Advanced leak detection technology to find and fix hidden leaks before they cause major damage to your property.",
                imageSrc: "/images/plumbing-services/service1.webp",
              },
              {
                title: "Drain Cleaning",
                description:
                  "Professional drain clearing using hydro jetting and snaking to restore full flow and prevent future clogs.",
                imageSrc: "/images/plumbing-services/service2.webp",
              },
              {
                title: "Water Heater Installation",
                description:
                  "Tank and tankless water heater installs with energy-efficient options to lower your utility bills.",
                imageSrc: "/images/plumbing-services/service3.webp",
              },
              {
                title: "Bathroom Remodeling",
                description:
                  "Complete bathroom plumbing for renovations — fixture upgrades, pipe rerouting, and code-compliant installs.",
                imageSrc: "/images/plumbing-services/service4.webp",
              },
              {
                title: "Sewer Line Repair",
                description:
                  "Trenchless sewer repair and replacement that fixes the problem without tearing up your yard.",
                imageSrc: "/images/plumbing-services/service5.webp",
              },
              {
                title: "Emergency Plumbing",
                description:
                  "24/7 emergency response for burst pipes, overflows, and gas leaks — we're there when you need us most.",
                imageSrc: "/images/plumbing-services/service6.webp",
              },
            ]}
          />
        </div>
        <div id="reviews" data-section="reviews">
          <TestimonialRatingCards
            textAnimation="slide-up"
            tag="Testimonials"
            title="What Our Customers Say"
            description="Real reviews from homeowners who trust FlowRight with their plumbing."
            testimonials={[
              {
                name: "Sarah K.",
                role: "Homeowner, Denver CO",
                quote:
                  "They found a hidden leak behind our kitchen wall in minutes. Fixed it the same day and patched the drywall too. Absolutely top-notch service from start to finish.",
                rating: 5,
                imageSrc: "/images/plumbing-services/team-1.webp",
              },
              {
                name: "Mike T.",
                role: "Homeowner, Boulder CO",
                quote:
                  "Our water heater died on a Sunday morning. FlowRight had a new tankless unit installed by the afternoon. Fair pricing and zero pressure to upsell. Will use them again.",
                rating: 5,
                imageSrc: "/images/plumbing-services/team-2.webp",
              },
              {
                name: "Jessica L.",
                role: "Property Manager, Aurora CO",
                quote:
                  "We manage 40+ rental units and FlowRight handles all our plumbing. Always responsive, always professional. They've saved us a fortune in emergency repairs.",
                rating: 5,
                imageSrc: "/images/plumbing-services/team-3.webp",
              },
            ]}
          />
        </div>
        <div id="why-us" data-section="why-us">
          <FeaturesBorderGlow
            textAnimation="slide-up"
            tag="Our Promise"
            title="Why Choose FlowRight"
            description="Numbers and values that speak for themselves."
            features={[
              {
                icon: Wrench,
                title: "15+ Years of Experience",
                description:
                  "Over a decade and a half of solving plumbing problems for homes and businesses across Denver.",
              },
              {
                icon: Droplets,
                title: "1,200+ Jobs Completed",
                description:
                  "From quick fixes to full remodels, we've successfully completed thousands of plumbing projects.",
              },
              {
                icon: ShieldCheck,
                title: "Licensed & Certified",
                description:
                  "Every plumber on our team is fully licensed, bonded, and insured for your peace of mind.",
              },
            ]}
          />
        </div>
        <div id="faq" data-section="faq">
          <FaqSimple
            textAnimation="slide-up"
            tag="FAQ"
            title="Frequently Asked Questions"
            description="Everything you need to know before booking a plumber."
            items={[
              {
                question: "Do you offer 24/7 emergency service?",
                answer:
                  "Yes. We have licensed plumbers on call around the clock, including weekends and holidays. If you have a burst pipe, gas leak, or major overflow, call us and we'll dispatch someone immediately.",
              },
              {
                question: "Are your plumbers licensed and insured?",
                answer:
                  "Every plumber on our team is fully licensed, bonded, and insured. We carry general liability and workers' compensation coverage so you're protected from start to finish.",
              },
              {
                question: "How much does a typical service call cost?",
                answer:
                  "We provide free estimates for most jobs. Our service call fee covers the initial inspection, and we always quote the full price before any work begins — no surprises on the bill.",
              },
              {
                question: "Do you offer warranties on your work?",
                answer:
                  "All of our repairs and installations come with a 1-year labor warranty. Many of the parts and fixtures we install also carry manufacturer warranties of up to 10 years.",
              },
              {
                question: "Can you help with bathroom or kitchen remodels?",
                answer:
                  "Absolutely. We handle all plumbing aspects of remodels — from rerouting supply and drain lines to installing new fixtures, showers, tubs, and dishwashers.",
              },
            ]}
          />
        </div>
        <div id="contact" data-section="contact">
          <ContactSplitForm
            textAnimation="slide-up"
            tag="Contact Us"
            title="Request a Free Estimate"
            description="Tell us about your plumbing issue and we'll get back to you within a few hours."
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
            ]}
            textarea={{
              name: "message",
              placeholder: "Describe your plumbing issue...",
              rows: 4,
              required: true,
            }}
            buttonText="Send Request"
            imageSrc="/images/plumbing-services/contact.webp"
          />
        </div>
        <FooterSimpleCard
          brand="FlowRight Plumbing"
          columns={[
            {
              title: "Services",
              items: [
                {
                  label: "Leak Detection",
                  href: "#services",
                },
                {
                  label: "Drain Cleaning",
                  href: "#services",
                },
                {
                  label: "Water Heaters",
                  href: "#services",
                },
                {
                  label: "Bathroom Remodels",
                  href: "#services",
                },
                {
                  label: "Sewer Repair",
                  href: "#services",
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
                  label: "Testimonials",
                  href: "#reviews",
                },
                {
                  label: "FAQ",
                  href: "#faq",
                },
                {
                  label: "Careers",
                  href: "#",
                },
              ],
            },
            {
              title: "Contact",
              items: [
                {
                  label: "(555) 472-8100",
                  href: "tel:5554728100",
                },
                {
                  label: "info@flowrightplumbing.com",
                  href: "mailto:info@flowrightplumbing.com",
                },
                {
                  label: "Denver, CO",
                },
              ],
            },
          ]}
          copyright="© 2026 FlowRight Plumbing. All rights reserved."
          links={[
            {
              label: "Privacy Policy",
            },
            {
              label: "Terms of Service",
            },
          ]}
        />
      </StyleProvider>
    </ReactLenis>
  );
}

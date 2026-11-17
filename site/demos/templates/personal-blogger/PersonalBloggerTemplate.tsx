"use client";

import { ReactLenis } from "lenis/react";
import SiteBackgroundSlot from "@/demos/components/providers/SiteBackgroundSlot";
import StyleProvider from "@/demos/components/providers/StyleProvider";
import FeaturesBentoGridCta from "@/demos/components/sections/features/FeaturesBentoGridCta";
import FooterBasic from "@/demos/components/sections/footer/FooterBasic";
import CursorTrail from "./components/CursorTrail";
import FeaturesCarouselSection from "./components/FeaturesCarouselSection";
import HeroSection from "./components/HeroSection";
import ParallaxShowcaseSection from "./components/ParallaxShowcaseSection";
import "./theme.css";

/** Personal blogger landing page: hero, about, milestones carousel, parallax showcase and footer. */
export default function PersonalBloggerTemplate() {
  return (
    <ReactLenis root>
      <StyleProvider siteBackground="none" heroBackground="none" buttonVariant="bounce">
        <SiteBackgroundSlot />
        <CursorTrail
          color={{
            r: 76,
            g: 175,
            b: 80,
          }}
        />
        <div id="hero" data-section="hero">
          <HeroSection
            title="Hey, I'm Anya"
            description="Blogger & Traveler"
            imageSrc="/images/personal-blogger/hero.webp"
            backTextSegments={[
              {
                type: "text",
                content: "I'm currently ",
              },
              {
                type: "photo",
                src: "/images/personal-blogger/inline-photo.webp",
              },
              {
                type: "highlight",
                content: " traveling all over the world ",
              },
              {
                type: "text",
                content: "capturing moments, ",
              },
              {
                type: "highlight",
                content: "writing stories ",
              },
              {
                type: "text",
                content: "and sharing the ",
              },
              {
                type: "highlight",
                content: "places I love",
              },
            ]}
            clickBadgeText="Click me!"
            stickerImageSrcs={[
              "/images/personal-blogger/mixtape.webp",
              "/images/personal-blogger/flowers.webp",
              "/images/personal-blogger/toast.webp",
              "/images/personal-blogger/passport.webp",
              "/images/personal-blogger/cd.webp",
              "/images/personal-blogger/reading.webp",
              "/images/personal-blogger/watercolors.webp",
              "/images/personal-blogger/orange.webp",
            ]}
            socialLinks={[
              {
                iconSrc: "/images/personal-blogger/instagram.svg",
                href: "#",
                label: "Instagram",
              },
              {
                iconSrc: "/images/personal-blogger/tiktok.svg",
                href: "#",
                label: "TikTok",
              },
              {
                iconSrc: "/images/personal-blogger/twitter.svg",
                href: "#",
                label: "Twitter",
              },
            ]}
          />
        </div>
        <div id="about" data-section="about">
          <FeaturesBentoGridCta
            textAnimation="fade"
            tag="A Little About Me"
            title="The Things That Make Me, Me"
            description="Family, adventures, and a camera that goes everywhere I do."
            features={[
              {
                title: "Family First",
                description: "The people who shaped who I am and who I carry with me everywhere.",
                imageSrc: "/images/personal-blogger/family.webp",
              },
              {
                title: "Wanderlust",
                description:
                  "New cities, unfamiliar streets, and the feeling of being wonderfully lost.",
                imageSrc: "/images/personal-blogger/wanderlust.webp",
              },
              {
                title: "Through My Lens",
                description: "Photography isn't just a hobby — it's how I remember everything.",
                imageSrc: "/images/personal-blogger/lens.webp",
              },
              {
                title: "Good Food, Good Mood",
                description: "Every place has a dish that tells you more than any guidebook could.",
                imageSrc: "/images/personal-blogger/food.webp",
              },
            ]}
            ctaButton={{
              text: "Let's connect!",
              href: "#contact",
              avatarSrc: "/images/personal-blogger/hero.webp",
              avatarLabel: "You",
            }}
          />
        </div>
        <div id="milestones" data-section="milestones">
          <FeaturesCarouselSection
            textAnimation="fade"
            tag="Life in Frames"
            title="Moments I'll Never Forget"
            description="Big milestones, quiet sunsets, and everything worth remembering in between."
            primaryButton={{
              text: "See the full gallery",
              href: "#gallery",
            }}
            secondaryButton={{
              text: "Follow my journey",
              href: "#follow",
            }}
            items={[
              {
                imageSrc: "/images/personal-blogger/graduation.webp",
                label: "Graduation Day",
              },
              {
                imageSrc: "/images/personal-blogger/unsplash-swiss.jpg",
                label: "Swiss Alps",
              },
              {
                imageSrc: "/images/personal-blogger/solo-trip.webp",
                label: "First Solo Trip",
              },
              {
                imageSrc: "/images/personal-blogger/golden-hour.webp",
                label: "Golden Hour",
              },
              {
                imageSrc: "/images/personal-blogger/turning-25.webp",
                label: "Turning 25",
              },
              {
                imageSrc: "/images/personal-blogger/island-life.webp",
                label: "Island Life",
              },
            ]}
          />
        </div>
        <div id="showcase" data-section="showcase">
          <ParallaxShowcaseSection
            title="Say Cheeeese! 📸"
            backgroundSrc="/images/personal-blogger/parallax-bg.webp"
            leftImageSrc="/images/personal-blogger/hibiscus.webp"
            rightImageSrc="/images/personal-blogger/coconut.webp"
          />
        </div>
        <FooterBasic
          columns={[
            {
              title: "Follow",
              items: [
                {
                  label: "Instagram",
                  href: "#",
                },
                {
                  label: "TikTok",
                  href: "#",
                },
                {
                  label: "Twitter",
                  href: "#",
                },
              ],
            },
            {
              title: "Explore",
              items: [
                {
                  label: "Blog",
                  href: "#",
                },
                {
                  label: "Gallery",
                  href: "#gallery",
                },
                {
                  label: "About",
                  href: "#about",
                },
              ],
            },
            {
              title: "Connect",
              items: [
                {
                  label: "Contact",
                  href: "#contact",
                },
                {
                  label: "Collaborate",
                  href: "#",
                },
              ],
            },
          ]}
          leftText="© 2025 Anya. All rights reserved."
          rightText="Made with love"
        />
      </StyleProvider>
    </ReactLenis>
  );
}

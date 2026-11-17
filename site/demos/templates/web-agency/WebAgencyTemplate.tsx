"use client";

import { ReactLenis } from "lenis/react";
import {
  ArrowUpRight,
  Code,
  Layers,
  Monitor,
  Palette,
  PenTool,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import HeroBackgroundSlot from "@/demos/components/providers/HeroBackgroundSlot";
import SiteBackgroundSlot from "@/demos/components/providers/SiteBackgroundSlot";
import StyleProvider from "@/demos/components/providers/StyleProvider";
import ContactCenter from "@/demos/components/sections/contact/ContactCenter";
import FaqSimple from "@/demos/components/sections/faq/FaqSimple";
import FeaturesBento from "@/demos/components/sections/features/FeaturesBento";
import FeaturesBorderGlow from "@/demos/components/sections/features/FeaturesBorderGlow";
import FeaturesMediaCarousel from "@/demos/components/sections/features/FeaturesMediaCarousel";
import FooterSimpleReveal from "@/demos/components/sections/footer/FooterSimpleReveal";
import MetricsFeatureCards from "@/demos/components/sections/metrics/MetricsFeatureCards";
import NavbarDropdown from "@/demos/components/sections/navbar/NavbarDropdown";
import TeamStackedCards from "@/demos/components/sections/team/TeamStackedCards";
import TestimonialTrustCard from "@/demos/components/sections/testimonial/TestimonialTrustCard";
import Button from "@/demos/components/ui/buttons/Button";
import ImageOrVideo from "@/demos/components/ui/ImageOrVideo";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import type { ButtonLink, TextAnimationVariant } from "@/demos/lib/types";
import "./theme.css";

interface HeroMediaItem {
  imageSrc?: string;
  videoSrc?: string;
}

interface HeroSectionProps {
  tag: string;
  title: string;
  description: string;
  primaryButton: ButtonLink;
  secondaryButton: ButtonLink;
  /** Media for the column that scrolls upwards. */
  leftItems: HeroMediaItem[];
  /** Media for the column that scrolls downwards. */
  rightItems: HeroMediaItem[];
  textAnimation: TextAnimationVariant;
}

/** Split hero: heading and buttons next to two endlessly scrolling columns of media cards. */
function HeroSection({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  leftItems,
  rightItems,
  textAnimation,
}: HeroSectionProps) {
  const leftMarqueeItems = [...leftItems, ...leftItems, ...leftItems, ...leftItems];
  const rightMarqueeItems = [...rightItems, ...rightItems, ...rightItems, ...rightItems];

  return (
    <section
      aria-label="Hero section"
      className="relative flex items-center h-fit md:h-svh pt-25 pb-20 md:py-0"
    >
      <HeroBackgroundSlot />
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20 w-content-width mx-auto">
        <div className="w-full md:w-1/2">
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="px-3 py-1 mb-1 text-sm card rounded w-fit">
              <p>{tag}</p>
            </div>
            <TextAnimation
              text={title}
              variant={textAnimation}
              gradientText
              tag="h1"
              className="text-7xl 2xl:text-8xl leading-[1.15] font-semibold text-center md:text-left text-balance"
            />
            <TextAnimation
              text={description}
              variant={textAnimation}
              gradientText={false}
              tag="p"
              className="md:max-w-8/10 text-lg md:text-xl leading-snug text-center md:text-left text-balance"
            />
            <div className="flex flex-wrap max-md:justify-center gap-3 mt-2 md:mt-3">
              <Button text={primaryButton.text} href={primaryButton.href} variant="primary" />
              <Button
                text={secondaryButton.text}
                href={secondaryButton.href}
                variant="secondary"
                animationDelay={0.1}
              />
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-100 md:h-[75vh] flex gap-2 xl:gap-3 2xl:gap-4 overflow-hidden">
          <div className="flex-1 overflow-hidden mask-fade-y-medium">
            <div className="flex flex-col gap-2 xl:gap-3 2xl:gap-4 animate-marquee-vertical">
              {leftMarqueeItems.map((item, index) => (
                <div
                  key={index}
                  className="shrink-0 aspect-4/5 p-1 xl:p-2 2xl:p-3 card rounded overflow-hidden"
                >
                  <ImageOrVideo imageSrc={item.imageSrc} videoSrc={item.videoSrc} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-hidden mask-fade-y-medium">
            <div className="flex flex-col gap-2 xl:gap-3 2xl:gap-4 animate-marquee-vertical-reverse">
              {rightMarqueeItems.map((item, index) => (
                <div
                  key={index}
                  className="shrink-0 aspect-4/5 p-1 xl:p-2 2xl:p-3 card rounded overflow-hidden"
                >
                  <ImageOrVideo imageSrc={item.imageSrc} videoSrc={item.videoSrc} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Web agency landing page: marquee hero, services, work, team, testimonials, FAQ and contact. */
export default function WebAgencyTemplate() {
  return (
    <ReactLenis root>
      <StyleProvider
        siteBackground="aurora"
        heroBackground="lightRaysCorner"
        buttonVariant="stagger"
      >
        <SiteBackgroundSlot />
        <NavbarDropdown
          logo="Northbound"
          navItems={[
            {
              name: "Services",
              href: "#services",
            },
            {
              name: "Work",
              href: "#work",
            },
            {
              name: "Team",
              href: "#team",
            },
            {
              name: "Contact",
              href: "#contact",
            },
          ]}
          ctaButton={{
            text: "Start Project",
            href: "#contact",
          }}
        />
        <div id="hero" data-section="hero">
          <HeroSection
            textAnimation="fade-blur"
            tag="Award-Winning Agency"
            title="We Build Digital Experiences"
            description="Transform your brand with cutting-edge web design and development. We craft stunning websites that convert visitors into customers."
            primaryButton={{
              text: "Start Project",
              href: "#contact",
            }}
            secondaryButton={{
              text: "View Work",
              href: "#work",
            }}
            leftItems={[
              {
                imageSrc: "/images/web-agency/shot-1.webp",
              },
              {
                imageSrc: "/images/web-agency/shot-4.webp",
              },
              {
                imageSrc: "/images/web-agency/shot-6.webp",
              },
              {
                imageSrc: "/images/web-agency/shot-7.webp",
              },
            ]}
            rightItems={[
              {
                imageSrc: "/images/web-agency/shot-2.webp",
              },
              {
                imageSrc: "/images/web-agency/shot-5.webp",
              },
              {
                imageSrc: "/images/web-agency/shot-3.webp",
              },
              {
                imageSrc: "/images/web-agency/shot-8.webp",
              },
            ]}
          />
        </div>
        <div id="services" data-section="services">
          <FeaturesBento
            textAnimation="fade-blur"
            tag="Services"
            title="Services That Drive Results"
            description="We offer a full suite of digital services to help your brand stand out online."
            features={[
              {
                title: "Web Development",
                description:
                  "Custom-built websites that are fast, responsive, and designed to convert.",
                bentoComponent: "checklist-timeline",
                heading: "Project Timeline",
                subheading: "Week 1-2",
                checklistItems: [
                  {
                    label: "Discovery & Strategy",
                    detail: "Day 1-3",
                  },
                  {
                    label: "Design & Prototype",
                    detail: "Day 4-7",
                  },
                  {
                    label: "Development & Launch",
                    detail: "Day 8-14",
                  },
                ],
                completedLabel: "Live",
              },
              {
                title: "SEO Optimization",
                description:
                  "We optimize your website to rank higher on search engines and drive organic traffic.",
                bentoComponent: "animated-bar-chart",
              },
              {
                title: "Branding",
                description: "Build a memorable brand identity that resonates with your audience.",
                bentoComponent: "orbiting-icons",
                centerIcon: Sparkles,
                orbitIcons: [Palette, Layers, PenTool, Code],
              },
            ]}
          />
        </div>
        <div id="work" data-section="work">
          <FeaturesMediaCarousel
            textAnimation="fade-blur"
            tag="Our Work"
            title="Work We're Proud Of"
            description="A selection of projects we've crafted for clients across industries."
            items={[
              {
                title: "Vitality Wellness",
                description: "Health & wellbeing platform",
                imageSrc: "/images/web-agency/projectnew1.webp",
                buttonIcon: ArrowUpRight,
                buttonHref: "#",
              },
              {
                title: "Mailflow AI",
                description: "AI-powered email marketing platform",
                imageSrc: "/images/web-agency/projectnew2.webp",
                buttonIcon: ArrowUpRight,
                buttonHref: "#",
              },
              {
                title: "Kinetic Studios",
                description: "Motion graphics & visual effects",
                imageSrc: "/images/web-agency/projectnew3.webp",
                buttonIcon: ArrowUpRight,
                buttonHref: "#",
              },
            ]}
          />
        </div>
        <div id="promise" data-section="promise">
          <FeaturesBorderGlow
            textAnimation="fade-blur"
            tag="Our Promise"
            title="Why Brands Choose Northbound"
            description="We deliver results that speak for themselves."
            features={[
              {
                icon: Monitor,
                title: "Responsive Design",
                description:
                  "Pixel-perfect websites that look stunning on every screen size and device.",
              },
              {
                icon: Zap,
                title: "Fast Turnaround",
                description: "From concept to launch in record time without sacrificing quality.",
              },
              {
                icon: Shield,
                title: "Secure Hosting",
                description: "Enterprise-grade security and 99.9% uptime for your website.",
              },
            ]}
          />
        </div>
        <div id="testimonials" data-section="testimonials">
          <TestimonialTrustCard
            textAnimation="fade-blur"
            quote="Northbound completely transformed our online presence. The team delivered a stunning website that exceeded our expectations and doubled our conversion rate."
            rating={5}
            author="— Maria Santos, CEO at Luxuria Travel"
            avatars={[
              {
                name: "Maria Santos",
                imageSrc: "/images/web-agency/team-1.webp",
              },
              {
                name: "James Chen",
                imageSrc: "/images/web-agency/team-2.webp",
              },
              {
                name: "Sofia Reyes",
                imageSrc: "/images/web-agency/team-3.webp",
              },
              {
                name: "David Kim",
                imageSrc: "/images/shared/32.jpg",
              },
              {
                name: "Emma Wilson",
                imageSrc: "/images/shared/44.jpg",
              },
              {
                name: "Alex Thompson",
                imageSrc: "/images/shared/67.jpg",
              },
            ]}
          />
        </div>
        <div id="metrics" data-section="metrics">
          <MetricsFeatureCards
            textAnimation="fade-blur"
            tag="Results"
            title="Trusted by Industry Leaders"
            description="Years of experience building digital products that drive real results."
            metrics={[
              {
                value: "100+",
                title: "Projects Delivered",
                features: [
                  "E-commerce platforms",
                  "Corporate websites",
                  "SaaS applications",
                  "Mobile-first designs",
                ],
              },
              {
                value: "99%",
                title: "Client Satisfaction",
                features: [
                  "On-time delivery",
                  "Clear communication",
                  "Post-launch support",
                  "Ongoing partnerships",
                ],
              },
              {
                value: "8+",
                title: "Years Experience",
                features: [
                  "Industry expertise",
                  "Award-winning work",
                  "Global clientele",
                  "Proven methodology",
                ],
              },
            ]}
          />
        </div>
        <div id="team" data-section="team">
          <TeamStackedCards
            textAnimation="fade-blur"
            tag="Team"
            title="The Team Behind the Work"
            description="The creative minds behind your next project."
            members={[
              {
                name: "Sarah Miller",
                role: "Lead Developer",
                imageSrc: "/images/web-agency/team-1.webp",
              },
              {
                name: "Valentina Reyes",
                role: "Creative Director",
                imageSrc: "/images/web-agency/team-2.webp",
              },
              {
                name: "Carlos Mendoza",
                role: "UX Designer",
                imageSrc: "/images/web-agency/team-3.webp",
              },
            ]}
          />
        </div>
        <div id="faq" data-section="faq">
          <FaqSimple
            textAnimation="fade-blur"
            tag="FAQ"
            title="Frequently Asked Questions"
            description="Everything you need to know about working with us."
            items={[
              {
                question: "How long does a typical project take?",
                answer:
                  "Most projects are completed within 2-4 weeks depending on scope and complexity. We'll provide a detailed timeline during our initial consultation.",
              },
              {
                question: "What is your pricing structure?",
                answer:
                  "We offer project-based pricing tailored to your needs. Every project includes design, development, SEO optimization, and post-launch support.",
              },
              {
                question: "Do you offer ongoing maintenance?",
                answer:
                  "Yes! We provide ongoing support and maintenance packages to keep your website updated, secure, and performing at its best.",
              },
              {
                question: "Can you redesign my existing website?",
                answer:
                  "Absolutely. We specialize in website redesigns that modernize your brand while preserving your existing content and SEO rankings.",
              },
              {
                question: "What technologies do you use?",
                answer:
                  "We build with modern technologies including Next.js, React, and Tailwind CSS to ensure fast, scalable, and maintainable websites.",
              },
            ]}
          />
        </div>
        <div id="contact" data-section="contact">
          <ContactCenter
            textAnimation="fade-blur"
            tag="Get in Touch"
            title="Ready to Transform Your Digital Presence?"
            description="Let's build something extraordinary together. Get in touch and let's discuss your next project."
            inputPlaceholder="Enter your email"
            buttonText="Start Your Project"
          />
        </div>
        <FooterSimpleReveal
          brand="Northbound"
          columns={[
            {
              title: "Company",
              items: [
                {
                  label: "About",
                  href: "#",
                },
                {
                  label: "Services",
                  href: "#services",
                },
                {
                  label: "Work",
                  href: "#work",
                },
                {
                  label: "Contact",
                  href: "#contact",
                },
              ],
            },
            {
              title: "Services",
              items: [
                {
                  label: "Web Development",
                  href: "#",
                },
                {
                  label: "SEO",
                  href: "#",
                },
                {
                  label: "Branding",
                  href: "#",
                },
                {
                  label: "UI/UX Design",
                  href: "#",
                },
              ],
            },
            {
              title: "Connect",
              items: [
                {
                  label: "Twitter",
                  href: "#",
                },
                {
                  label: "LinkedIn",
                  href: "#",
                },
                {
                  label: "Instagram",
                  href: "#",
                },
                {
                  label: "Dribbble",
                  href: "#",
                },
              ],
            },
          ]}
          copyright="© 2026 Northbound. All rights reserved."
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

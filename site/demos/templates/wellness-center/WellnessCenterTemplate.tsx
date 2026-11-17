"use client";

import { ReactLenis } from "lenis/react";
import HeroBackgroundSlot from "@/demos/components/providers/HeroBackgroundSlot";
import SiteBackgroundSlot from "@/demos/components/providers/SiteBackgroundSlot";
import StyleProvider from "@/demos/components/providers/StyleProvider";
import BlogMediaCards from "@/demos/components/sections/blog/BlogMediaCards";
import FaqSimple from "@/demos/components/sections/faq/FaqSimple";
import FeaturesAlternatingSplit from "@/demos/components/sections/features/FeaturesAlternatingSplit";
import FooterSimpleMedia from "@/demos/components/sections/footer/FooterSimpleMedia";
import NavbarFloating from "@/demos/components/sections/navbar/NavbarFloating";
import PricingHighlightedCards from "@/demos/components/sections/pricing/PricingHighlightedCards";
import AvatarGroup from "@/demos/components/ui/AvatarGroup";
import Button from "@/demos/components/ui/buttons/Button";
import GridOrCarousel from "@/demos/components/ui/GridOrCarousel";
import ImageOrVideo from "@/demos/components/ui/ImageOrVideo";
import ScrollReveal from "@/demos/components/ui/ScrollReveal";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import type { ButtonLink, TextAnimationVariant } from "@/demos/lib/types";
import "./theme.css";

interface HeroStatistic {
  title: string;
  subtitle: string;
}

interface HeroSectionProps {
  title: string;
  description: string;
  primaryButton: ButtonLink;
  secondaryButton: ButtonLink;
  imageSrc?: string;
  videoSrc?: string;
  avatarsSrc?: string[];
  avatarsLabel?: string;
  /** Shown in a glass card at the bottom of the hero. */
  statistics?: HeroStatistic[];
  textAnimation: TextAnimationVariant;
}

interface FeatureItem {
  title: string;
  description: string;
  imageSrc?: string;
  videoSrc?: string;
}

interface FeaturesSectionProps {
  tag: string;
  title: string;
  description: string;
  primaryButton?: ButtonLink;
  secondaryButton?: ButtonLink;
  items: FeatureItem[];
  textAnimation: TextAnimationVariant;
}

/** Full-screen hero: background media, text on the left and a statistics card at the bottom. */
function HeroSection({
  title,
  description,
  primaryButton,
  secondaryButton,
  imageSrc,
  videoSrc,
  avatarsSrc,
  avatarsLabel,
  statistics,
  textAnimation,
}: HeroSectionProps) {
  return (
    <section
      aria-label="Hero section"
      className="relative w-full h-svh overflow-hidden flex flex-col justify-start mb-20"
    >
      <HeroBackgroundSlot />
      <ImageOrVideo
        imageSrc={imageSrc}
        videoSrc={videoSrc}
        className="absolute inset-0 w-full h-full object-cover rounded-none"
      />
      <div
        className="absolute z-10 w-[150vw] h-[150vw] left-0 top-0 -translate-x-1/2 -translate-y-1/2 backdrop-blur mask-[radial-gradient(circle,black_20%,transparent_70%)]"
        aria-hidden="true"
      />
      <div className="relative z-10 w-content-width mx-auto pt-35">
        <div className="flex flex-col gap-3 w-full md:w-6/10 lg:w-1/2 xl:w-45/100 2xl:w-4/10">
          {avatarsSrc && avatarsSrc.length > 0 && (
            <div className="w-fit mb-1 p-2 pr-4 backdrop-blur-xl bg-background/8 border border-background/15 rounded-full">
              <AvatarGroup
                avatarsSrc={avatarsSrc}
                size="sm"
                label={avatarsLabel}
                labelClassName="text-background"
              />
            </div>
          )}
          <TextAnimation
            text={title}
            variant={textAnimation}
            gradientText
            tag="h1"
            className="text-7xl 2xl:text-8xl leading-[1.15] font-semibold text-white text-balance"
          />
          <TextAnimation
            text={description}
            variant={textAnimation}
            gradientText={false}
            tag="p"
            className="text-lg md:text-xl text-white leading-snug text-balance"
          />
          <div className="flex flex-wrap gap-3 mt-2 md:mt-3">
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
      {statistics && statistics.length > 0 && (
        <div className="absolute z-10 left-4 right-4 bottom-4 md:left-auto md:right-5 md:bottom-5 2xl:right-6 2xl:bottom-6 p-4 xl:p-5 2xl:p-6 backdrop-blur-xl bg-background/8 border border-background/15 rounded flex gap-3 xl:gap-4 2xl:gap-5">
          {statistics.map((statistic, index) => (
            <div key={statistic.title} className="flex items-center gap-5">
              {index > 0 && <div className="w-px self-stretch bg-background/15" />}
              <div className="flex flex-col">
                <h3 className="text-lg font-medium leading-snug text-background">
                  {statistic.title}
                </h3>
                <p className="text-base leading-snug text-background/60">{statistic.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/** Feature cards in a grid or carousel, each with media above a title and description. */
function FeaturesSection({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  items,
  textAnimation,
}: FeaturesSectionProps) {
  return (
    <section aria-label="Features section" className="py-20">
      <div className="flex flex-col gap-8 md:gap-10">
        <div className="flex flex-col items-center w-content-width mx-auto gap-2">
          <div className="px-3 py-1 mb-1 text-sm card rounded w-fit">
            <p>{tag}</p>
          </div>
          <TextAnimation
            text={title}
            variant={textAnimation}
            gradientText
            tag="h2"
            className="md:max-w-8/10 text-6xl 2xl:text-7xl leading-[1.15] font-semibold text-center text-balance"
          />
          <TextAnimation
            text={description}
            variant={textAnimation}
            gradientText={false}
            tag="p"
            className="md:max-w-7/10 text-lg md:text-xl leading-snug text-center text-balance"
          />
          {(primaryButton || secondaryButton) && (
            <div className="flex flex-wrap justify-center gap-3 mt-2 md:mt-3">
              {primaryButton && (
                <Button text={primaryButton.text} href={primaryButton.href} variant="primary" />
              )}
              {secondaryButton && (
                <Button
                  text={secondaryButton.text}
                  href={secondaryButton.href}
                  variant="secondary"
                  animationDelay={0.1}
                />
              )}
            </div>
          )}
        </div>
        <ScrollReveal variant="slide-up">
          <GridOrCarousel>
            {items.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-3 xl:gap-3.5 2xl:gap-4 p-3 xl:p-3.5 2xl:p-4 h-full card rounded"
              >
                <div className="aspect-6/7 rounded overflow-hidden button-secondary shadow shadow-foreground/5">
                  <ImageOrVideo
                    imageSrc={item.imageSrc}
                    videoSrc={item.videoSrc}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 xl:p-3.5 2xl:p-4">
                  <p className="text-2xl leading-tight">
                    <span className="font-semibold text-foreground">
                      {item.title}
                      {". "}
                    </span>
                    <span className="text-foreground/50">{item.description}</span>
                  </p>
                </div>
              </div>
            ))}
          </GridOrCarousel>
        </ScrollReveal>
      </div>
    </section>
  );
}

/** Wellness center landing page for the SuperHealth clinic. */
export default function WellnessCenterTemplate() {
  return (
    <ReactLenis root>
      <StyleProvider siteBackground="none" heroBackground="none" buttonVariant="magnetic">
        <SiteBackgroundSlot />
        <NavbarFloating
          logo="SuperHealth"
          navItems={[
            {
              name: "Services",
              href: "#services",
            },
            {
              name: "How It Works",
              href: "#how-it-works",
            },
            {
              name: "Pricing",
              href: "#pricing",
            },
            {
              name: "Journal",
              href: "#blog",
            },
            {
              name: "FAQ",
              href: "#faq",
            },
          ]}
          ctaButton={{
            text: "Apply Now",
            href: "#contact",
          }}
        />
        <div id="hero" data-section="hero">
          <HeroSection
            textAnimation="slide-up"
            title="Your Body Keeps a Score. We Read It."
            description="Bloodwork. Biomarkers. Breakthroughs. We turn raw data into your unfair advantage — so aging becomes optional and peak performance becomes the baseline."
            primaryButton={{
              text: "Apply Now",
              href: "#contact",
            }}
            secondaryButton={{
              text: "See Our Protocols",
              href: "#services",
            }}
            imageSrc="/images/wellness-center/hero.webp"
            avatarsSrc={[
              "/images/shared/44.jpg",
              "/images/shared/32.jpg",
              "/images/wellness-center/68.jpg",
            ]}
            avatarsLabel="Trusted by 2,400+ clients"
            statistics={[
              {
                title: "80+ Biomarkers",
                subtitle: "Full diagnostic panel",
              },
              {
                title: "Data-Driven",
                subtitle: "Personalized protocols",
              },
              {
                title: "2,400+ Clients",
                subtitle: "Optimized & thriving",
              },
            ]}
          />
        </div>
        <div id="services" data-section="services">
          <FeaturesSection
            textAnimation="slide-up"
            tag="Our Protocols"
            title="Built Around Your Biology"
            description="Every protocol starts with data — your bloodwork, your genetics, your goals. No guesswork. No generic plans. Just precision medicine that moves the needle."
            items={[
              {
                title: "Seamless Diagnostics",
                description:
                  "Book lab appointments in seconds and get comprehensive bloodwork done at top-tier facilities.",
                imageSrc: "/images/wellness-center/feature-1.webp",
              },
              {
                title: "Real-Time Insights",
                description:
                  "Track every biomarker that matters from your phone. Watch your vitals trend upward in real time.",
                imageSrc: "/images/wellness-center/feature-2.webp",
              },
              {
                title: "Personalized Protocols",
                description:
                  "Your data becomes your playbook — from nutrition timing to targeted supplementation.",
                imageSrc: "/images/wellness-center/feature-3.webp",
              },
            ]}
          />
        </div>
        <div id="how-it-works" data-section="how-it-works">
          <FeaturesAlternatingSplit
            textAnimation="slide-up"
            tag="How It Works"
            title="From Data to Dominance in 3 Steps"
            description="Most clinics treat symptoms. We reverse-engineer your biology — then build the protocol that rewrites it."
            items={[
              {
                title: "We Map Your Biology",
                description:
                  "It starts with the most comprehensive diagnostic panel in the industry. Over 80 biomarkers, genetic predispositions, and lifestyle factors — analyzed by our clinical team to find what's actually holding you back.",
                imageSrc: "/images/wellness-center/split-1.webp",
              },
              {
                title: "We Build Your Protocol",
                description:
                  "No templates. No generic advice. Your data feeds a personalized optimization plan — covering hormones, nutrition, supplementation, sleep, and recovery — all calibrated to your unique biology.",
                imageSrc: "/images/wellness-center/split-2.webp",
              },
              {
                title: "We Track & Adapt",
                description:
                  "Your body changes. Your protocol should too. We monitor your biomarkers in real time, adjusting interventions as you progress — so you never plateau and results keep compounding.",
                imageSrc: "/images/wellness-center/split-3.webp",
              },
            ]}
          />
        </div>
        <div id="pricing" data-section="pricing">
          <PricingHighlightedCards
            textAnimation="slide-up"
            tag="Pricing"
            title="Invest in the Only Body You've Got"
            description="No hidden fees. No insurance games. Just transparent pricing for people serious about their health."
            plans={[
              {
                tag: "Baseline",
                price: "$497",
                description: "One-time diagnostic deep dive",
                features: [
                  "80+ biomarker blood panel",
                  "Body composition analysis",
                  "1-on-1 physician review",
                  "Personalized report & action plan",
                  "Follow-up Q&A session",
                ],
                primaryButton: {
                  text: "Get Started",
                  href: "#contact",
                },
              },
              {
                tag: "Performance",
                price: "$297/mo",
                description: "Ongoing optimization protocol",
                highlight: "Most Popular",
                features: [
                  "Everything in Baseline",
                  "Quarterly biomarker re-testing",
                  "Custom supplement protocol",
                  "Hormone optimization program",
                  "Priority physician access",
                  "Real-time progress dashboard",
                ],
                primaryButton: {
                  text: "Start Optimizing",
                  href: "#contact",
                },
              },
              {
                tag: "Elite",
                price: "$597/mo",
                description: "Full-spectrum longevity program",
                features: [
                  "Everything in Performance",
                  "Monthly IV therapy sessions",
                  "Peptide & NAD+ protocols",
                  "Genetic analysis & epigenetic tracking",
                  "Dedicated health concierge",
                  "Same-day physician access",
                ],
                primaryButton: {
                  text: "Contact Us",
                  href: "#contact",
                },
              },
            ]}
          />
        </div>
        <div id="blog" data-section="blog">
          <BlogMediaCards
            textAnimation="slide-up"
            tag="Journal"
            title="The Science Behind the Protocol"
            description="Deep dives into the research, methods, and breakthroughs driving modern health optimization."
            items={[
              {
                category: "Longevity",
                title: "Why Your Biological Age Matters More Than Your Birthday",
                excerpt:
                  "Chronological age is a number. Biological age is a verdict. Here's how we measure — and reverse — the difference.",
                authorName: "Dr. Sarah Chen",
                authorImageSrc: "/images/shared/44.jpg",
                date: "May 12, 2026",
                imageSrc: "/images/wellness-center/feature-1.webp",
                href: "#",
              },
              {
                category: "Hormones",
                title: "The Cortisol Trap: Why High Performers Burn Out",
                excerpt:
                  "Your stress response was designed for survival, not quarterly targets. We break down the hormone loop that's stealing your edge.",
                authorName: "Dr. James Okafor",
                authorImageSrc: "/images/shared/32.jpg",
                date: "May 5, 2026",
                imageSrc: "/images/wellness-center/feature-2.webp",
                href: "#",
              },
              {
                category: "Nutrition",
                title: "Metabolic Flexibility: The Biomarker Nobody Talks About",
                excerpt:
                  "The ability to switch between fuel sources is the single best predictor of metabolic health. Most people have lost it. Here's how to get it back.",
                authorName: "Dr. Mia Torres",
                authorImageSrc: "/images/wellness-center/68.jpg",
                date: "Apr 28, 2026",
                imageSrc: "/images/wellness-center/feature-3.webp",
                href: "#",
              },
            ]}
          />
        </div>
        <div id="faq" data-section="faq">
          <FaqSimple
            textAnimation="slide-up"
            tag="FAQ"
            title="Questions We Get Asked a Lot"
            description="Straight answers. No medical jargon. No runaround."
            items={[
              {
                question: "How is this different from my regular doctor?",
                answer:
                  "Your doctor treats disease. We optimize health. We test 5x more biomarkers, spend 10x more time with you, and build protocols designed to push you toward peak performance — not just keep you out of the hospital.",
              },
              {
                question: "Do I need to be sick to benefit from this?",
                answer:
                  "Not at all. Most of our clients feel 'fine' when they walk in. The bloodwork tells a different story. We catch what standard checkups miss — declining hormones, nutrient gaps, inflammatory markers — before they become problems.",
              },
              {
                question: "How quickly will I see results?",
                answer:
                  "Most clients report noticeable improvements in energy, sleep, and mental clarity within 4–6 weeks. Biomarker-level changes typically show up at your first quarterly retest. The longer you stay on protocol, the more the results compound.",
              },
              {
                question: "Is this covered by insurance?",
                answer:
                  "We operate outside the insurance model intentionally. Insurance incentivizes sick care, not optimization. Our pricing is transparent and all-inclusive — no surprise bills, no prior authorizations, no waiting for approvals.",
              },
              {
                question: "What happens during my first visit?",
                answer:
                  "We draw a comprehensive blood panel (80+ biomarkers), perform a body composition analysis, and sit down for a 1-on-1 deep dive into your health history, goals, and lifestyle. You leave with a full report and an actionable protocol within 7 days.",
              },
              {
                question: "Can I do this remotely?",
                answer:
                  "Yes. We partner with labs nationwide for blood draws, and all physician consultations can be done via video. Your dashboard and protocols are fully digital. Geography shouldn't be a barrier to optimization.",
              },
            ]}
          />
        </div>
        <FooterSimpleMedia
          imageSrc="/images/wellness-center/hero.webp"
          brand="SuperHealth"
          columns={[
            {
              title: "Company",
              items: [
                {
                  label: "About",
                  href: "#",
                },
                {
                  label: "Careers",
                  href: "#",
                },
                {
                  label: "Press",
                  href: "#",
                },
              ],
            },
            {
              title: "Services",
              items: [
                {
                  label: "Diagnostics",
                  href: "#services",
                },
                {
                  label: "Protocols",
                  href: "#how-it-works",
                },
                {
                  label: "Pricing",
                  href: "#pricing",
                },
              ],
            },
            {
              title: "Resources",
              items: [
                {
                  label: "Journal",
                  href: "#blog",
                },
                {
                  label: "FAQ",
                  href: "#faq",
                },
                {
                  label: "Contact",
                  href: "#contact",
                },
              ],
            },
          ]}
          copyright="© 2026 SuperHealth. All rights reserved."
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

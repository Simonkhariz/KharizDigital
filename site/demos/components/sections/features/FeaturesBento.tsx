"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useInView } from "motion/react";
import { Check, Loader, Send } from "lucide-react";
import Button from "@/demos/components/ui/buttons/Button";
import DynamicIcon from "@/demos/components/ui/DynamicIcon";
import GridOrCarousel from "@/demos/components/ui/GridOrCarousel";
import ImageOrVideo from "@/demos/components/ui/ImageOrVideo";
import ScrollReveal from "@/demos/components/ui/ScrollReveal";
import TextAnimation from "@/demos/components/ui/TextAnimation";
import type { IconInput } from "@/demos/lib/resolve-icon";
import type { ButtonLink, TextAnimationVariant } from "@/demos/lib/types";
import { cn } from "@/demos/lib/utils";

interface InfoCard {
  icon: IconInput;
  label: string;
  value: string;
}

interface InfoCardMarqueeProps {
  items: InfoCard[];
}

/** Renders a vertically scrolling list of icon / label / value rows. */
function InfoCardMarquee({ items }: InfoCardMarqueeProps) {
  return (
    <div className="h-full overflow-hidden mask-fade-y">
      <div className="flex flex-col animate-marquee-vertical">
        {[...items, ...items, ...items, ...items].map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4 p-3 mb-4 card rounded"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-10 secondary-button rounded">
                <DynamicIcon
                  icon={item.icon}
                  className="size-4 text-secondary-cta-text"
                  strokeWidth={1.5}
                />
              </div>
              <p className="text-base truncate">{item.label}</p>
            </div>
            <p className="text-base">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Offset (and hover offset) of each card in the tilted stack, front to back. */
const STACK_CARD_OFFSET_CLASSES = [
  "-translate-y-14 hover:-translate-y-20",
  "translate-x-16 hover:-translate-y-4",
  "translate-x-32 translate-y-16 hover:translate-y-10",
];

interface StackCard {
  icon: IconInput;
  title: string;
  subtitle: string;
  detail: string;
}

interface TiltedStackCardsProps {
  items: StackCard[];
}

/** Renders up to three skewed cards fanned out on top of each other. */
function TiltedStackCards({ items }: TiltedStackCardsProps) {
  return (
    <div
      className="h-full grid place-items-center [grid-template-areas:'stack']"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent), linear-gradient(to right, black, black 80%, transparent)",
        maskComposite: "intersect",
      }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "flex flex-col justify-between gap-2 p-6 w-80 h-36 card rounded transition-all duration-500 -skew-y-[8deg] [grid-area:stack] 2xl:w-90",
            STACK_CARD_OFFSET_CLASSES[index],
          )}
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center size-5 rounded primary-button">
              <DynamicIcon
                icon={item.icon}
                className="size-3 text-primary-cta-text"
                strokeWidth={1.5}
              />
            </div>
            <p className="text-base">{item.title}</p>
          </div>
          <p className="text-lg whitespace-nowrap">{item.subtitle}</p>
          <p className="text-base">{item.detail}</p>
        </div>
      ))}
    </div>
  );
}

/** Height of each chart bar in percent, at rest and while the chart is hovered. */
const CHART_BARS = [
  {
    height: 100,
    hoverHeight: 40,
  },
  {
    height: 84,
    hoverHeight: 100,
  },
  {
    height: 62,
    hoverHeight: 75,
  },
  {
    height: 90,
    hoverHeight: 50,
  },
  {
    height: 70,
    hoverHeight: 90,
  },
  {
    height: 50,
    hoverHeight: 60,
  },
  {
    height: 75,
    hoverHeight: 85,
  },
  {
    height: 80,
    hoverHeight: 70,
  },
];

/** Renders a bar chart whose highlighted bar cycles and whose bars resize on hover. */
function AnimatedBarChart() {
  const [activeBarIndex, setActiveBarIndex] = useState(2);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(
      () => setActiveBarIndex((previous) => (previous + 1) % CHART_BARS.length),
      3e3,
    );
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="h-full w-full"
      style={{
        maskImage: "linear-gradient(to bottom, black 40%, transparent)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-end gap-2 md:gap-4 h-full w-full">
        {CHART_BARS.map((bar, index) => (
          <div
            key={index}
            className="relative w-full rounded bg-background-accent transition-all duration-500"
            style={{
              height: `${isHovered ? bar.hoverHeight : bar.height}%`,
            }}
          >
            <div
              className={cn(
                "absolute inset-0 rounded primary-button transition-opacity duration-500",
                activeBarIndex === index ? "opacity-100" : "opacity-0",
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

interface OrbitingIconsProps {
  centerIcon: IconInput;
  items: IconInput[];
}

/** Renders a central icon inside tilted concentric rings with smaller icons orbiting it. */
function OrbitingIcons({ centerIcon, items }: OrbitingIconsProps) {
  return (
    <div
      className="relative flex items-center justify-center h-full overflow-hidden"
      style={{
        perspective: "2000px",
        maskImage:
          "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent), linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        maskComposite: "intersect",
      }}
    >
      <div
        className="flex items-center justify-center w-full h-full"
        style={{
          transform: "rotateY(20deg) rotateX(20deg) rotateZ(-20deg)",
        }}
      >
        <div className="absolute size-60 opacity-85 border border-background-accent shadow rounded-full" />
        <div className="absolute size-80 opacity-75 border border-background-accent shadow rounded-full" />
        <div className="absolute size-100 opacity-65 border border-background-accent shadow rounded-full" />
        <div className="absolute flex items-center justify-center size-40 border border-background-accent shadow rounded-full">
          <div className="flex items-center justify-center size-20 primary-button rounded-full">
            <DynamicIcon
              icon={centerIcon}
              className="size-10 text-primary-cta-text"
              strokeWidth={1.25}
            />
          </div>
          {items.map((icon, index) => {
            return (
              <div
                key={index}
                className="absolute flex items-center justify-center size-10 rounded shadow card -ml-5 -mt-5"
                style={
                  {
                    top: "50%",
                    left: "50%",
                    animation: "orbit 12s linear infinite",
                    "--initial-position": `${(360 / items.length) * index}deg`,
                    "--translate-position": "160px",
                  } as CSSProperties
                }
              >
                <DynamicIcon icon={icon} className="size-4" strokeWidth={1.5} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface IconTextMarqueeProps {
  centerIcon: IconInput;
  texts: string[];
}

/** Renders rows of text chips scrolling in alternating directions behind a central icon. */
function IconTextMarquee({ centerIcon, texts }: IconTextMarqueeProps) {
  const repeatedTexts = [...texts, ...texts];

  return (
    <div
      className="relative flex flex-col h-full w-full overflow-hidden"
      style={{
        maskImage: "radial-gradient(ellipse at center, black 0%, black 30%, transparent 70%)",
      }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 w-full opacity-60">
        {Array.from({
          length: 10,
        }).map((_row, rowIndex) => (
          <div
            key={rowIndex}
            className={cn(
              "flex gap-2",
              rowIndex % 2 == 0
                ? "animate-marquee-horizontal"
                : "animate-marquee-horizontal-reverse",
            )}
          >
            {repeatedTexts.map((text, textIndex) => (
              <div
                key={textIndex}
                className="flex items-center justify-center px-4 py-2 card rounded"
              >
                <p className="text-sm leading-snug">{text}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center size-16 primary-button backdrop-blur-sm rounded">
        <DynamicIcon icon={centerIcon} className="size-6 text-primary-cta-text" strokeWidth={1.5} />
      </div>
    </div>
  );
}

interface ChatExchange {
  userMessage: string;
  aiResponse: string;
}

interface ChatMarqueeProps {
  aiIcon: IconInput;
  userIcon: IconInput;
  exchanges: ChatExchange[];
  placeholder: string;
}

/** Renders a scrolling chat transcript above a mock message input. */
function ChatMarquee({ aiIcon, userIcon, exchanges, placeholder }: ChatMarqueeProps) {
  const messages = exchanges.flatMap((exchange) => [
    {
      content: exchange.userMessage,
      isUser: true,
    },
    {
      content: exchange.aiResponse,
      isUser: false,
    },
  ]);

  return (
    <div className="relative flex flex-col h-full w-full overflow-hidden">
      <div className="flex-1 overflow-hidden mask-fade-y">
        <div className="flex flex-col px-4 animate-marquee-vertical">
          {[...messages, ...messages].map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex items-end gap-2 mb-4 shrink-0",
                message.isUser ? "flex-row-reverse" : "flex-row",
              )}
            >
              {message.isUser ? (
                <div className="flex items-center justify-center size-8 primary-button rounded shrink-0">
                  <DynamicIcon icon={userIcon} className="size-3 text-primary-cta-text" />
                </div>
              ) : (
                <div className="flex items-center justify-center size-8 card rounded shrink-0">
                  <DynamicIcon icon={aiIcon} className="size-3" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-3/4 px-4 py-3 text-sm leading-snug",
                  message.isUser
                    ? "primary-button rounded-2xl rounded-br-none text-primary-cta-text"
                    : "card rounded-2xl rounded-bl-none",
                )}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 p-2 pl-4 card rounded">
        <p className="flex-1 text-sm text-foreground/75 truncate">{placeholder}</p>
        <div className="flex items-center justify-center size-7 primary-button rounded">
          <Send className="size-3 text-primary-cta-text" strokeWidth={1.75} />
        </div>
      </div>
    </div>
  );
}

/** Hover transition delays per checklist row: [check mark, label, detail]. */
const CHECKLIST_ROW_DELAY_CLASSES = [
  ["delay-150", "delay-200", "delay-[250ms]"],
  ["delay-[350ms]", "delay-[400ms]", "delay-[450ms]"],
  ["delay-[550ms]", "delay-[600ms]", "delay-[650ms]"],
];

interface ChecklistItem {
  label: string;
  detail: string;
}

interface ChecklistTimelineProps {
  heading: string;
  subheading: string;
  items: ChecklistItem[];
  completedLabel: string;
}

/**
 * Renders a checklist whose rows tick off one after another while the card is hovered, or,
 * on touch screens, once the card has scrolled into view.
 */
function ChecklistTimeline({ heading, subheading, items, completedLabel }: ChecklistTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.6 });
  const [isHovered, setIsHovered] = useState(false);
  const [canHover, setCanHover] = useState(true);

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover)").matches);
  }, []);

  const isActive = canHover ? isHovered : isInView;

  return (
    <div
      ref={containerRef}
      data-active={isActive || undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex items-center justify-center h-full w-full overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {[1, 0.8, 0.6].map((ringScale) => (
          <div
            key={ringScale}
            className="absolute h-full aspect-square rounded-full border border-background-accent/30"
            style={{
              transform: `scale(${ringScale})`,
            }}
          />
        ))}
      </div>
      <div className="relative flex flex-col gap-3 p-4 max-w-full w-95/100 mask-fade-y">
        <div className="flex items-center gap-2 p-3 card shadow rounded">
          <Loader
            className="size-4 text-primary transition-transform duration-1000 group-data-active:rotate-360"
            strokeWidth={1.5}
          />
          <p className="text-xs truncate">{heading}</p>
          <p className="text-xs text-foreground/75 ml-auto whitespace-nowrap">{subheading}</p>
        </div>
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2 px-3 py-2 card shadow rounded">
            <div className="relative flex items-center justify-center size-6 card shadow rounded">
              <div className="absolute size-2 primary-button rounded transition-opacity duration-300 group-data-active:opacity-0" />
              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center primary-button rounded opacity-0 scale-75 transition-all duration-300 group-data-active:opacity-100 group-data-active:scale-100",
                  CHECKLIST_ROW_DELAY_CLASSES[index][0],
                )}
              >
                <Check className="size-3 text-primary-cta-text" strokeWidth={2} />
              </div>
            </div>
            <div className="flex-1 flex items-center justify-between gap-4 min-w-0">
              <p
                className={cn(
                  "text-xs truncate opacity-0 transition-opacity duration-300 group-data-active:opacity-100",
                  CHECKLIST_ROW_DELAY_CLASSES[index][1],
                )}
              >
                {item.label}
              </p>
              <p
                className={cn(
                  "text-xs text-foreground/75 whitespace-nowrap opacity-0 translate-y-1 transition-all duration-300 group-data-active:opacity-100 group-data-active:translate-y-0",
                  CHECKLIST_ROW_DELAY_CLASSES[index][2],
                )}
              >
                {item.detail}
              </p>
            </div>
          </div>
        ))}
        <div className="relative flex items-center justify-center p-3 primary-button rounded">
          <div className="absolute flex gap-2 transition-opacity duration-500 delay-900 group-data-active:opacity-0">
            {[0, 1, 2].map((dot) => (
              <div key={dot} className="size-2 rounded bg-primary-cta-text" />
            ))}
          </div>
          <p className="text-xs text-primary-cta-text truncate opacity-0 transition-opacity duration-500 delay-900 group-data-active:opacity-100">
            {completedLabel}
          </p>
        </div>
      </div>
    </div>
  );
}

interface StackMediaItem {
  imageSrc?: string;
  videoSrc?: string;
}

interface MediaStackProps {
  /** Exactly three items: front, back-left and back-right. */
  items: [StackMediaItem, StackMediaItem, StackMediaItem];
}

/** Renders three overlapping images or videos that fan out on hover. */
function MediaStack({ items }: MediaStackProps) {
  return (
    <div className="group/stack relative flex items-center justify-center h-full w-full rounded select-none card">
      <div
        className={cn(
          "absolute z-1 overflow-hidden p-1 w-3/5 aspect-4/3 rounded primary-button",
          "translate-x-[12%] -translate-y-[8%] rotate-8 transition-all duration-500",
          "group-hover/stack:translate-x-[22%] group-hover/stack:-translate-y-[14%] group-hover/stack:rotate-12",
        )}
      >
        <ImageOrVideo
          imageSrc={items[2].imageSrc}
          videoSrc={items[2].videoSrc}
          className="h-full rounded"
        />
      </div>
      <div
        className={cn(
          "absolute z-2 overflow-hidden p-1 w-3/5 aspect-4/3 rounded primary-button",
          "-translate-x-[12%] -translate-y-[8%] -rotate-8 transition-all duration-500",
          "group-hover/stack:-translate-x-[22%] group-hover/stack:-translate-y-[14%] group-hover/stack:-rotate-12",
        )}
      >
        <ImageOrVideo
          imageSrc={items[1].imageSrc}
          videoSrc={items[1].videoSrc}
          className="h-full rounded"
        />
      </div>
      <div
        className={cn(
          "absolute z-30 overflow-hidden p-1 w-3/5 aspect-4/3 rounded primary-button",
          "translate-y-[10%] transition-all duration-500",
          "group-hover/stack:translate-y-[20%]",
        )}
      >
        <ImageOrVideo
          imageSrc={items[0].imageSrc}
          videoSrc={items[0].videoSrc}
          className="h-full rounded"
        />
      </div>
    </div>
  );
}

/** The visual shown in a bento card; `bentoComponent` selects it and decides which fields apply. */
type BentoVisual =
  | { bentoComponent: "info-card-marquee"; infoCards: InfoCard[] }
  | { bentoComponent: "tilted-stack-cards"; stackCards: StackCard[] }
  | { bentoComponent: "animated-bar-chart" }
  | { bentoComponent: "orbiting-icons"; centerIcon: IconInput; orbitIcons: IconInput[] }
  | { bentoComponent: "icon-text-marquee"; centerIcon: IconInput; marqueeTexts: string[] }
  | {
      bentoComponent: "chat-marquee";
      aiIcon: IconInput;
      userIcon: IconInput;
      exchanges: ChatExchange[];
      placeholder: string;
    }
  | {
      bentoComponent: "checklist-timeline";
      heading: string;
      subheading: string;
      checklistItems: ChecklistItem[];
      completedLabel: string;
    }
  | {
      bentoComponent: "media-stack";
      mediaItems: [StackMediaItem, StackMediaItem, StackMediaItem];
    };

type BentoFeature = BentoVisual & {
  title: string;
  description: string;
};

/** Picks the bento visual that matches the feature's `bentoComponent`. */
const renderBentoVisual = (feature: BentoVisual) => {
  switch (feature.bentoComponent) {
    case "info-card-marquee":
      return <InfoCardMarquee items={feature.infoCards} />;
    case "tilted-stack-cards":
      return <TiltedStackCards items={feature.stackCards} />;
    case "animated-bar-chart":
      return <AnimatedBarChart />;
    case "orbiting-icons":
      return <OrbitingIcons centerIcon={feature.centerIcon} items={feature.orbitIcons} />;
    case "icon-text-marquee":
      return <IconTextMarquee centerIcon={feature.centerIcon} texts={feature.marqueeTexts} />;
    case "chat-marquee":
      return (
        <ChatMarquee
          aiIcon={feature.aiIcon}
          userIcon={feature.userIcon}
          exchanges={feature.exchanges}
          placeholder={feature.placeholder}
        />
      );
    case "checklist-timeline":
      return (
        <ChecklistTimeline
          heading={feature.heading}
          subheading={feature.subheading}
          items={feature.checklistItems}
          completedLabel={feature.completedLabel}
        />
      );
    case "media-stack":
      return <MediaStack items={feature.mediaItems} />;
  }
};

interface FeaturesBentoProps {
  tag: string;
  title: string;
  description: string;
  primaryButton?: ButtonLink;
  secondaryButton?: ButtonLink;
  features: BentoFeature[];
  textAnimation: TextAnimationVariant;
}

/** Renders a features section of cards, each topped by an animated bento visual. */
export default function FeaturesBento({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  features,
  textAnimation,
}: FeaturesBentoProps) {
  return (
    <section aria-label="Features bento section" className="py-20">
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
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col gap-3 xl:gap-3.5 2xl:gap-4 p-3 xl:p-3.5 2xl:p-4 card rounded h-full"
              >
                <div className="relative h-72 overflow-hidden rounded p-3 xl:p-3.5 2xl:p-4 bg-foreground/5 shadow shadow-foreground/5">
                  {renderBentoVisual(feature)}
                </div>
                <div className="flex flex-col gap-1 p-3 xl:p-3.5 2xl:p-4">
                  <h3 className="text-2xl font-semibold leading-snug">{feature.title}</h3>
                  <p className="text-base leading-snug">{feature.description}</p>
                </div>
              </div>
            ))}
          </GridOrCarousel>
        </ScrollReveal>
      </div>
    </section>
  );
}

import { Activity, ArrowRight, Calendar, ChevronLeft, FileText, Heart, PersonStanding, Shield, Upload, Zap, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { categories, markers, result, trend } from "../data/content";

const categoryIcons: Record<(typeof categories)[number]["id"], LucideIcon> = { metabolism: Activity, energy: Zap, immunity: Shield };

/** The top of a phone: bezel, status bar and whatever is on screen. Cards crop it at the bottom. */
export function Phone({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <div className="vd-phone" data-dark={dark ?? false}>
      <div className="vd-phone-status" aria-hidden="true">
        <span>9:41</span>
        <i />
        <span className="vd-phone-signal">
          <b />
          <b />
          <b />
        </span>
      </div>
      {children}
    </div>
  );
}

export function Ring({ score, color, Icon }: { score: number; color: string; Icon: LucideIcon }) {
  const circumference = 2 * Math.PI * 15;
  return (
    <span className="vd-ring">
      <svg viewBox="0 0 36 36" aria-hidden="true">
        <circle cx="18" cy="18" r="15" fill="none" stroke="#eceef1" strokeWidth="3" />
        <circle cx="18" cy="18" r="15" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeDasharray={`${(score / 100) * circumference} ${circumference}`} transform="rotate(-90 18 18)" />
      </svg>
      <Icon size={13} color={color} aria-hidden="true" />
    </span>
  );
}

export function CategoryScores({ glass }: { glass?: boolean }) {
  return (
    <dl className={glass ? "vd-scores vd-scores-glass" : "vd-scores"}>
      {categories.map((category) => (
        <div key={category.id}>
          <Ring score={category.score} color={glass ? "#ffffff" : category.color} Icon={categoryIcons[category.id]} />
          <dt>{category.label}</dt>
          <dd>
            {category.score}
            {!glass && <small> / 100</small>}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Step 2: the result screen. */
export function ResultPhone() {
  return (
    <Phone dark>
      <div className="vd-result">
        <span className="vd-result-share" aria-hidden="true">
          <Upload size={11} />
        </span>
        <strong>Your result is ready</strong>
        <p>This is based on your responses and blood test.</p>
        <dl>
          <div>
            <dt>Biological Age</dt>
            <dd>
              <PersonStanding size={15} color="#2f9bd6" aria-hidden="true" />
              {result.biologicalAge} yrs
            </dd>
            <small>{result.actualAge - result.biologicalAge} yrs younger</small>
          </div>
          <div>
            <dt>Health Score</dt>
            <dd>
              <Heart size={14} color="#e5484d" fill="#e5484d" aria-hidden="true" />
              {result.healthScore}
            </dd>
            <small>Out of 100</small>
          </div>
        </dl>
      </div>
    </Phone>
  );
}

/** Bento card 1: "My health" with the three category scores lifted out of the screen. */
export function CategoryPhone() {
  return (
    <div className="vd-mock">
      <Phone dark>
        <p className="vd-phone-title">My health</p>
        <div className="vd-phone-body">
          <div className="vd-timeline">
            <span>
              <Calendar size={12} aria-hidden="true" />
            </span>
            <em>
              Compare tests <ArrowRight size={11} aria-hidden="true" />
            </em>
            <strong>Test timelines</strong>
            <p>Your health picture across all your tests.</p>
            <div>
              <FileText size={16} aria-hidden="true" />
              <b>Blood test</b>
              <small>02 Feb 2026</small>
            </div>
          </div>
        </div>
      </Phone>
      <div className="vd-mock-float vd-mock-float-scores">
        <CategoryScores />
      </div>
    </div>
  );
}

function TrendChart() {
  const values = trend.map((point) => point.value);
  const min = Math.min(...values) - 4;
  const max = Math.max(...values) + 4;
  const points = trend.map((point, index) => [8 + index * 38, 46 - ((point.value - min) / (max - min)) * 38] as const);
  const line = points.map(([x, y], index) => `${index === 0 ? "M" : "L"}${x} ${y}`).join(" ");
  const [lastX, lastY] = points[points.length - 1];
  return (
    <svg viewBox="0 0 130 52" role="img" aria-label={`Health score trend, latest ${trend[trend.length - 1].value}`}>
      <path d={`${line} L${lastX} 52 L8 52Z`} fill="#fde7c7" opacity="0.7" />
      <path d={line} fill="none" stroke="#f0962e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={lastX} cy={lastY} r="3.5" fill="#fff" stroke="#f0962e" strokeWidth="2" />
    </svg>
  );
}

/** Bento card 2: biological age, with the trend card lifted out. */
export function AgePhone() {
  const latest = trend[trend.length - 1];
  return (
    <div className="vd-mock">
      <Phone dark>
        <div className="vd-phone-body vd-phone-body-warm">
          <span className="vd-phone-back" aria-hidden="true">
            <ChevronLeft size={13} />
          </span>
          <div className="vd-age">
            <span>Biological Age</span>
            <strong>{result.biologicalAge} yrs</strong>
            <i aria-hidden="true">
              <PersonStanding size={15} />
            </i>
            <p>Your biological age reflects your body&rsquo;s true age, based on various health markers rather than calendar years.</p>
            <p>
              <b>{result.actualAge - result.biologicalAge} years younger</b> than your age
            </p>
          </div>
        </div>
      </Phone>
      <div className="vd-mock-float vd-mock-float-trend">
        <header>
          <strong>Trend</strong>
          <span>
            {latest.date} <b>{latest.value}</b>
          </span>
        </header>
        <TrendChart />
        <footer aria-hidden="true">
          {trend.slice(0, 3).map((point) => (
            <span key={point.date}>{point.date}</span>
          ))}
        </footer>
      </div>
    </div>
  );
}

/** Bento card 3: three marker notes. */
export function PlainNotes() {
  return (
    <ul className="vd-notes">
      {markers.slice(0, 3).map((marker) => (
        <li key={marker.id} data-status={marker.status}>
          <header>
            <strong>{marker.name}</strong>
            <span>{marker.status}</span>
          </header>
          <p>{marker.plain.split(". ")[0]}.</p>
        </li>
      ))}
    </ul>
  );
}

/** Bento card 4: the overall score as a half dial. */
export function ScoreDial() {
  const arc = Math.PI * 70;
  return (
    <div className="vd-dial">
      <svg viewBox="0 0 180 104" role="img" aria-label={`Health score ${result.healthScore} out of 100`}>
        <path d="M20 94a70 70 0 0 1 140 0" fill="none" stroke="#e6e8ec" strokeWidth="14" strokeLinecap="round" />
        <path d="M20 94a70 70 0 0 1 140 0" fill="none" stroke="#9bcf1c" strokeWidth="14" strokeLinecap="round" strokeDasharray={`${(result.healthScore / 100) * arc} ${arc}`} />
      </svg>
      <strong>{result.healthScore}</strong>
      <span>Out of 100 · up 4.1 since June</span>
    </div>
  );
}

import type { BottleKind } from "../data/products";

/**
 * Bottle illustrations. Each bottle is drawn standing on y = 0 and centred on x = 0,
 * so scenes can place them with a single translate.
 */
export function BottleDefs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-white`} x1="0" x2="1">
        <stop offset="0" stopColor="#c9d9ea" />
        <stop offset=".18" stopColor="#f5f9fd" />
        <stop offset=".42" stopColor="#ffffff" />
        <stop offset=".72" stopColor="#e6eef7" />
        <stop offset="1" stopColor="#b3c8de" />
      </linearGradient>
      <linearGradient id={`${id}-metal`} x1="0" x2="1">
        <stop offset="0" stopColor="#4d6f9c" />
        <stop offset=".22" stopColor="#dbe8f6" />
        <stop offset=".45" stopColor="#8fabcc" />
        <stop offset=".7" stopColor="#e9f1fa" />
        <stop offset="1" stopColor="#2f4f7c" />
      </linearGradient>
      <linearGradient id={`${id}-blue`} x1="0" x2="1">
        <stop offset="0" stopColor="#2a74bd" />
        <stop offset=".3" stopColor="#8cc8f2" />
        <stop offset=".6" stopColor="#4d9bdb" />
        <stop offset="1" stopColor="#1c5aa0" />
      </linearGradient>
      <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#f4fbff" />
        <stop offset=".45" stopColor="#bfe3f6" />
        <stop offset="1" stopColor="#3f9bd6" />
      </linearGradient>
      <linearGradient id={`${id}-glass`} x1="0" x2="1">
        <stop offset="0" stopColor="#d5ecf8" stopOpacity=".9" />
        <stop offset=".3" stopColor="#ffffff" stopOpacity=".75" />
        <stop offset=".7" stopColor="#cfe6f4" stopOpacity=".6" />
        <stop offset="1" stopColor="#a9cfe6" stopOpacity=".9" />
      </linearGradient>
      <linearGradient id={`${id}-gold`} x1="0" x2="1">
        <stop offset="0" stopColor="#b98f6a" />
        <stop offset=".4" stopColor="#f3dcc4" />
        <stop offset="1" stopColor="#a67b57" />
      </linearGradient>
    </defs>
  );
}

function Label({ y, tone = "#3b84c6" }: { y: number; tone?: string }) {
  return (
    <g fill={tone}>
      <rect x="-11" y={y} width="22" height="2.200" rx="1" />
      <rect x="-8" y={y + 5} width="16" height="1.200" rx=".6" opacity=".7" />
    </g>
  );
}

function SideMark({ x, y, tone = "#3b84c6" }: { x: number; y: number; tone?: string }) {
  return <rect x={x} y={y} width="2.400" height="26" rx="1.200" fill={tone} opacity=".8" />;
}

type BottleProps = { id: string };

function Pump({ id }: BottleProps) {
  return (
    <g>
      <path d="M-2-225h-22a3 3 0 0 0 0 5h18v8h8v-9a4 4 0 0 0-4-4Z" fill={`url(#${id}-metal)`} />
      <rect x="-5" y="-214" width="10" height="18" fill={`url(#${id}-metal)`} />
      <rect x="-12" y="-198" width="24" height="24" rx="2" fill={`url(#${id}-metal)`} />
      <path d="M-33-166a8 8 0 0 1 8-8h50a8 8 0 0 1 8 8V-4a4 4 0 0 1-4 4h-58a4 4 0 0 1-4-4Z" fill={`url(#${id}-white)`} />
      <SideMark x={3} y={-150} />
      <Label y={-28} />
    </g>
  );
}

function Cap({ id }: BottleProps) {
  return (
    <g>
      <rect x="-17" y="-232" width="34" height="56" rx="4" fill={`url(#${id}-metal)`} />
      <path d="M-34-166a8 8 0 0 1 8-8h52a8 8 0 0 1 8 8V-4a4 4 0 0 1-4 4h-60a4 4 0 0 1-4-4Z" fill={`url(#${id}-white)`} />
      <SideMark x={2} y={-150} />
      <Label y={-28} />
    </g>
  );
}

function Serum({ id }: BottleProps) {
  return (
    <g>
      <rect x="-10" y="-165" width="20" height="26" rx="4" fill="#f4f8fc" />
      <rect x="-18" y="-142" width="36" height="28" rx="3" fill={`url(#${id}-metal)`} />
      <path d="M-22-110a5 5 0 0 1 5-5h34a5 5 0 0 1 5 5V-4a4 4 0 0 1-4 4h-36a4 4 0 0 1-4-4Z" fill={`url(#${id}-blue)`} />
      <rect x="-14" y="-108" width="5" height="96" rx="2.500" fill="#fff" opacity=".28" />
      <Label y={-18} tone="#dff1fd" />
    </g>
  );
}

function Dropper({ id }: BottleProps) {
  return (
    <g>
      <path d="M-6-150a6 8 0 0 1 12 0v22h-12Z" fill="#f6f9fc" />
      <rect x="-9" y="-130" width="18" height="20" rx="2" fill={`url(#${id}-gold)`} />
      <rect x="-14" y="-112" width="28" height="8" rx="2" fill={`url(#${id}-gold)`} />
      <rect x="-26" y="-104" width="52" height="104" rx="7" fill={`url(#${id}-glass)`} stroke="#fff" strokeOpacity=".7" />
      <path d="M-22-58h44v50a4 4 0 0 1-4 4h-36a4 4 0 0 1-4-4Z" fill="#9fd0ee" opacity=".55" />
      <rect x="-1.500" y="-104" width="3" height="70" fill="#fff" opacity=".7" />
      <Label y={-24} tone="#2f7cc0" />
    </g>
  );
}

function Jar({ id }: BottleProps) {
  return (
    <g>
      <path d="M-56-58h112v42a16 16 0 0 1-16 16h-80a16 16 0 0 1-16-16Z" fill={`url(#${id}-white)`} />
      <rect x="-60" y="-92" width="120" height="38" rx="6" fill={`url(#${id}-metal)`} />
      <rect x="-60" y="-92" width="120" height="6" rx="3" fill="#fff" opacity=".5" />
      <Label y={-30} />
    </g>
  );
}

function Mist({ id }: BottleProps) {
  return (
    <g>
      <rect x="-15" y="-212" width="30" height="50" rx="4" fill={`url(#${id}-metal)`} />
      <path d="M-26-156a6 6 0 0 1 6-6h40a6 6 0 0 1 6 6V-6a6 6 0 0 1-6 6h-40a6 6 0 0 1-6-6Z" fill={`url(#${id}-fade)`} />
      <rect x="-18" y="-150" width="6" height="138" rx="3" fill="#fff" opacity=".35" />
      <Label y={-26} tone="#f2faff" />
    </g>
  );
}

const bottles: Record<BottleKind, (props: BottleProps) => React.JSX.Element> = {
  pump: Pump,
  cap: Cap,
  serum: Serum,
  dropper: Dropper,
  jar: Jar,
  mist: Mist,
};

export function Bottle({ kind, id, x, y, scale = 1, rotate = 0 }: { kind: BottleKind; id: string; x: number; y: number; scale?: number; rotate?: number }) {
  const Shape = bottles[kind];
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <Shape id={id} />
    </g>
  );
}

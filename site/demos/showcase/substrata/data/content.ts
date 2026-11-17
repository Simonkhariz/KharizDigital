export const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Changelog", href: "#changelog" },
  { label: "Blog", href: "#blog" },
] as const;

export const machineId = "m-7f3a2c";

export interface TermLine {
  kind: "cmd" | "ok" | "url" | "out";
  /** Columns of a result line: label, value, detail. Command lines use only `value`. */
  label?: string;
  value: string;
  detail?: string;
}

export const bootCommand = "substrata up --image ubuntu-24.04 --persist --region iad";

export const bootLines: TermLine[] = [
  { kind: "ok", label: "machine", value: machineId, detail: "booted in 412ms" },
  { kind: "ok", label: "disk", value: "/workspace", detail: "mounted · persistent · 40 GB" },
  { kind: "ok", label: "agent", value: "worker-01", detail: "attached over SSH" },
  { kind: "ok", label: "snapshot", value: "nightly", detail: "scheduled 02:00 UTC" },
  { kind: "url", value: `https://${machineId}.substrata.run`, detail: "ready" },
];

/** Canned replies for the commands the demo terminal understands. */
export const commands: Record<string, TermLine[]> = {
  help: [
    { kind: "out", value: "substrata ls          list machines" },
    { kind: "out", value: "substrata snapshot    save the machine state" },
    { kind: "out", value: "substrata fork        copy this machine" },
    { kind: "out", value: "substrata sleep       pause and stop billing compute" },
    { kind: "out", value: "clear                 clear the screen" },
  ],
  "substrata ls": [
    { kind: "out", value: "ID         IMAGE          REGION  STATE    DISK" },
    { kind: "out", value: `${machineId}   ubuntu-24.04   iad     running  40 GB` },
    { kind: "out", value: "m-19c0e4   ubuntu-24.04   fra     asleep   20 GB" },
  ],
  "substrata snapshot": [{ kind: "ok", label: "snapshot", value: "s-0041", detail: "saved in 1.8s · 3.2 GB changed" }],
  "substrata fork": [
    { kind: "ok", label: "machine", value: "m-b21d07", detail: "forked from s-0041 in 630ms" },
    { kind: "url", value: "https://m-b21d07.substrata.run", detail: "ready" },
  ],
  "substrata sleep": [{ kind: "ok", label: "machine", value: machineId, detail: "asleep · wakes on the next request" }],
};

export const logos = ["Northgrid", "Halcyon", "Brightwell", "Quillon", "Verdant", "Tessera", "Okapi Labs", "Fathom", "Arcline"] as const;

export const autonomy = [
  {
    id: "persist",
    title: "A disk that remembers",
    text: "Files, packages and running services survive every restart. An agent picks up on Tuesday exactly where it stopped on Monday.",
    stat: "40 GB",
    statLabel: "persistent volume by default",
  },
  {
    id: "fork",
    title: "Break it, then roll it back",
    text: "Snapshot before a risky step and fork a copy to try three approaches at once. A bad run is one command to undo.",
    stat: "630 ms",
    statLabel: "median time to fork a machine",
  },
] as const;

export const features = [
  { id: "boot", title: "Boots in half a second", text: "Machines start from a memory snapshot, so a cold start feels like a function call.", figure: "412 ms", figureLabel: "median boot" },
  { id: "sleep", title: "Sleeps when idle", text: "After five idle minutes a machine pauses. You pay for disk only, and it wakes on the next request.", figure: "$0", figureLabel: "compute while asleep" },
  { id: "isolate", title: "Isolated by hardware", text: "Every machine is its own microVM with its own kernel. One agent cannot see another, or you.", figure: "1:1", figureLabel: "kernel per machine" },
  { id: "net", title: "Private by default", text: "No inbound ports until you open one. Outbound traffic follows an allow-list you set per machine.", figure: "0", figureLabel: "open ports at boot" },
  { id: "api", title: "One API, any runtime", text: "Create, exec, snapshot and fork over HTTPS or the CLI. If it runs on Linux, it runs here.", figure: "6", figureLabel: "regions" },
  { id: "logs", title: "Everything is recorded", text: "Each command, file change and network call is written to a log you can replay or export.", figure: "90 d", figureLabel: "log retention" },
] as const;

export const sizes = [
  { id: "s", label: "1 vCPU · 2 GB", vcpu: 1, gb: 2 },
  { id: "m", label: "2 vCPU · 4 GB", vcpu: 2, gb: 4 },
  { id: "l", label: "4 vCPU · 8 GB", vcpu: 4, gb: 8 },
] as const;

/** Demonstration prices, in US dollars. */
export const rates = { vcpuHour: 0.018, gbHour: 0.006, diskGbMonth: 0.08, freeCredit: 5 } as const;

export const plans = [
  { name: "Hobby", price: "$0", note: "$5 of usage included each month", points: ["Up to 3 machines", "Community support"], open: "start" },
  { name: "Team", price: "Usage", note: "Pay for what runs, billed monthly", points: ["Unlimited machines", "Private networking", "Shared snapshots"], open: "start" },
  { name: "Enterprise", price: "Custom", note: "Committed use and your own region", points: ["Dedicated hosts", "SSO and audit export", "Named support engineer"], open: "sales" },
] as const;

export const changelog = [
  { version: "0.19", date: "Nov 4, 2026", title: "Fork from any snapshot", text: "Fork a machine from a snapshot up to 30 days old, not only from the latest one." },
  { version: "0.18", date: "Oct 14, 2026", title: "Frankfurt and Singapore", text: "Two new regions, fra and sin, bring the total to six." },
  { version: "0.17", date: "Sep 23, 2026", title: "Outbound allow-lists", text: "Restrict where a machine can connect, per machine or per project." },
  { version: "0.16", date: "Sep 2, 2026", title: "Faster wake", text: "Machines now wake from sleep in a median of 180 ms, down from 410 ms." },
] as const;

export const posts = [
  {
    title: "Why agents need a computer, not a container",
    date: "Oct 28, 2026",
    minutes: 7,
    text: "Containers assume the work ends when the process does. An agent that plans over days needs state that outlives any one process: installed tools, half-finished branches, a browser profile.",
  },
  {
    title: "How we boot a machine in 412 milliseconds",
    date: "Oct 2, 2026",
    minutes: 11,
    text: "We snapshot memory after the kernel and init have settled, then restore pages lazily as they are touched. Most of the boot is spent before the first page fault, so we moved that work to build time.",
  },
  {
    title: "Snapshots as an undo button",
    date: "Sep 9, 2026",
    minutes: 5,
    text: "Copy-on-write disks make a snapshot nearly free. That changes how you let software act: take one before every risky step and treat rollback as routine.",
  },
] as const;

export const faqs = [
  { q: "What is a persistent machine?", a: "A small virtual machine with its own disk that keeps its state between runs. It can sleep when idle and wake in well under a second." },
  { q: "How is this different from a sandbox?", a: "Sandboxes are thrown away after each task. A Substrata machine keeps files, packages and services, so long-running work can continue across sessions." },
  { q: "What happens when a machine is idle?", a: "After five minutes without activity it goes to sleep. You stop paying for compute and keep paying for disk. The next request wakes it." },
  { q: "Can agents reach my internal systems?", a: "Only if you allow it. Machines start with no inbound ports and an empty outbound allow-list, and you add destinations per machine or per project." },
  { q: "Which images can I run?", a: "Ubuntu and Debian images are provided, and you can bring any OCI image. It is converted to a bootable disk on first use." },
] as const;

export type TokenKind = "kw" | "fn" | "str" | "type" | "com" | "plain" | "prop";
export type Token = [kind: TokenKind, text: string];
export type CodeLine = Token[];

const p = (text: string): Token => ["plain", text];

const importLine: CodeLine = [["kw", "import"], p(" { AuthResponse } "), ["kw", "from"], p(" "), ["str", "'@verdance/types'"], p(";")];
const signature: CodeLine = [
  ["kw", "async function"],
  p(" "),
  ["fn", "validateSession"],
  p("(token: "),
  ["type", "string"],
  p("): "),
  ["type", "Promise<boolean>"],
  p(" {"),
];

export const manualVerify: CodeLine[] = [
  [p("    "), ["kw", "const"], p(" decoded = "), ["kw", "await"], p(" jwt."), ["fn", "verify"], p("(token, process.env.SECRET);")],
];

export const refactoredVerify: CodeLine[] = [
  [p("    "), ["kw", "const"], p(" { user: decoded, error } = "), ["kw", "await"], p(" AuthManager."), ["fn", "verify"], p("(token);")],
  [p("    "), ["kw", "if"], p(" (error) "), ["kw", "return"], p(" "), ["fn", "handleAuthError"], p("(error);")],
];

export const beforeVerify: CodeLine[] = [importLine, [], signature, [p("  "), ["kw", "try"], p(" {")]];

/** The line being typed: prefix is fixed, the completion is chosen from the menu. */
export const typingPrefix: CodeLine = [p("    "), ["kw", "const"], p(" user = "), ["kw", "await"], p(" db.users."), ["fn", "fin"]];

export const completions = [
  { name: "findUnique", insert: "dUnique({ where: { id: decoded.sub } });", suggested: true },
  { name: "findFirst", insert: "dFirst({ where: { id: decoded.sub } });", suggested: false },
  { name: "findMany", insert: "dMany({ where: { id: decoded.sub } });", suggested: false },
];

export const afterTyping: CodeLine[] = [
  [p("    "), ["kw", "return"], p(" user.active;")],
  [p("  } "), ["kw", "catch"], p(" (err) {")],
  [p("    "), ["com", "// Handle invalid session"]],
  [p("    "), ["kw", "return false"], p(";")],
  [p("  }")],
  [p("}")],
];

export const firstLineNumber = 38;

export const dataLayer: CodeLine[] = [
  [["kw", "import"], p(" { createClient } "), ["kw", "from"], p(" "), ["str", "'@verdance/data'"], p(";")],
  [],
  [["kw", "export const"], p(" db = "), ["fn", "createClient"], p("({")],
  [p("  url: process.env.DATABASE_URL,")],
  [p("  pool: { max: "), ["type", "12"], p(", idleTimeout: "), ["type", "30_000"], p(" },")],
  [p("  region: "), ["str", "'fra1'"], p(",")],
  [p("});")],
  [],
  [["kw", "export type"], p(" "), ["type", "User"], p(" = {")],
  [p("  id: "), ["type", "string"], p(";")],
  [p("  active: "), ["type", "boolean"], p(";")],
  [p("};")],
];

export const files = ["auth-service.ts", "data-layer.ts"] as const;
export type FileName = (typeof files)[number];

export type PanelId = "terminal" | "console" | "debug" | "output";

export const panels: { id: PanelId; label: string }[] = [
  { id: "terminal", label: "Terminal" },
  { id: "console", label: "Console" },
  { id: "debug", label: "Debug Console" },
  { id: "output", label: "Output" },
];

export type PanelLine = { tone: "ok" | "warn" | "plain" | "prompt"; text: string; tag?: string };

export const panelLines: Record<PanelId, PanelLine[]> = {
  terminal: [
    { tone: "ok", tag: "[Build]", text: "Compiling project..." },
    { tone: "ok", tag: "[Build]", text: "Project built successfully." },
    { tone: "plain", text: "Success in 452ms" },
    { tone: "prompt", text: "_" },
  ],
  console: [
    { tone: "warn", tag: "[auth]", text: "jwt.verify called directly in validateSession (auth-service.ts:42)" },
    { tone: "plain", text: "Use AuthManager.verify so failures are logged." },
  ],
  debug: [
    { tone: "plain", text: "Debugger attached to verdance dev on port 9229." },
    { tone: "plain", text: "No breakpoints set." },
  ],
  output: [
    { tone: "ok", tag: "[Deploy]", text: "Preview pr-218 is live." },
    { tone: "plain", text: "3 routes, 41 functions, cold start 180ms." },
  ],
};

export const consoleResolved: PanelLine[] = [{ tone: "ok", tag: "[auth]", text: "No warnings. Session checks go through AuthManager." }];

export const assistant = {
  name: "Verdance AI",
  status: "Active assistant",
  message: ["I've noticed you're manually verifying tokens. We should implement the new centralized ", " middleware to handle error logging and session expiration consistently."],
  messageCode: "AuthManager",
  suggestionFile: "auth-service.ts : L42",
  removed: ["const decoded = await", "jwt.verify(token);"],
  added: ["const { user, error } = await", "AuthManager.verify(token);", "if (error) return", "handleAuthError(error);"],
  placeholder: "Ask Verdance to write tests or refactor...",
  reply: "This is a demo, so the assistant is scripted. In the product, Verdance would read the open files and answer here.",
};

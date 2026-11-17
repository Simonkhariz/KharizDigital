export type EditorFile = {
  id: string;
  name: string;
  folder: "services" | "root";
  icon: "file" | "settings";
  firstLine: number;
  lines: string[];
};

export const files: EditorFile[] = [
  {
    id: "auth",
    name: "auth-service.ts",
    folder: "services",
    icon: "file",
    firstLine: 38,
    lines: [
      "",
      "import { AuthResponse } from",
      "'@helmdeck/types';",
      "",
      "",
      "async function validateSession(token:",
      "string): Promise<boolean> {",
      "",
      "  try  {",
      "",
      " const decoded = await",
      " jwt.verify(token,",
      " process.env.SECRET);",
    ],
  },
  {
    id: "data",
    name: "data-layer.ts",
    folder: "services",
    icon: "file",
    firstLine: 12,
    lines: [
      "import { Pool } from '@helmdeck/db';",
      "",
      "const pool = new Pool({ max: 20 });",
      "",
      "export async function findUser(id:",
      "string): Promise<User | null> {",
      "  const rows = await pool.query(",
      "    'select * from users where id = $1',",
      "    [id],",
      "  );",
      "  return rows[0] ?? null;",
      "}",
      "",
    ],
  },
  {
    id: "config",
    name: "config.json",
    folder: "root",
    icon: "settings",
    firstLine: 1,
    lines: [
      "{",
      "  'name': 'helm-platform',",
      "  'region': 'eu-central',",
      "  'replicas': 3,",
      "  'session': {",
      "    'ttlMinutes': 45,",
      "    'rotateKeys': true",
      "  },",
      "  'telemetry': false",
      "}",
      "",
      "",
      "",
    ],
  },
];

/** The refactored body shown in auth-service.ts after "Apply Changes". */
export const refactoredAuthLines = [
  "",
  "import { AuthResponse } from",
  "'@helmdeck/types';",
  "",
  "",
  "async function validateSession(token:",
  "string): Promise<boolean> {",
  "",
  "  try  {",
  "",
  " const { user, error } = await",
  " AuthManager.verify(token);",
  " if (error) return handleAuthError(error);",
];

export const folders = ["api", "components"] as const;

export const completions = ["findUnique", "findFirst", "findMany"] as const;

export const panelTabs = [
  {
    id: "terminal",
    label: "Terminal",
    lines: ["[Build] Compiling project...", "[Build] Project built successfully.", "✓ Success in 452ms"],
  },
  {
    id: "console",
    label: "Console",
    badge: 1,
    lines: ["warn  session token verified manually (auth-service.ts:48)", "info  14 modules loaded"],
  },
  {
    id: "debug",
    label: "Debug Console",
    lines: ["Debugger attached on port 9229.", "Breakpoint set: auth-service.ts:48"],
  },
  {
    id: "output",
    label: "Output",
    lines: ["[helm] workspace indexed: 214 files", "[helm] assistant context ready"],
  },
] as const;

export const sidebarViews = {
  search: ["validateSession · auth-service.ts:43", "jwt.verify · auth-service.ts:49", "findUser · data-layer.ts:16"],
  source: ["M  services/auth-service.ts", "M  services/data-layer.ts", "A  styles/tokens.css"],
  extensions: ["Helm AI · built in", "Schema Lens · enabled", "Pipeline Tabs · enabled"],
} as const;

export const assistantAnswers = [
  "I can write tests for validateSession. I would cover an expired token, a bad signature and a missing secret.",
  "The refactor touches one file. No other caller verifies tokens directly, so it is safe to apply.",
  "Done. I drafted the change as a suggestion so you can review it before anything is written.",
] as const;

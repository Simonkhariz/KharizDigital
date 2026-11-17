/**
 * This app's bundler configuration treats every stylesheet as a plain global
 * file, so CSS Modules are not available. Each stylesheet in this folder
 * prefixes its class names instead, and this helper builds the matching names.
 */
export function classes(prefix: string): Record<string, string> {
  return new Proxy<Record<string, string>>(
    {},
    { get: (_target, key) => `${prefix}-${String(key)}` },
  );
}

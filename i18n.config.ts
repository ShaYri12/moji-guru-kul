export const locales = ["en", "te"] as const;
export type Locale = (typeof locales)[number];
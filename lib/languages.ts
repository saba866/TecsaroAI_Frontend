// src/lib/languages.ts

export type LanguageOption = {
  value: string;
  label: string;
};

const countryLanguageMap: Record<string, LanguageOption[]> = {
  IN: [
    { value: "en", label: "English" },
    { value: "hi", label: "Hindi" },
  ],
  US: [{ value: "en", label: "English" }],
  GB: [{ value: "en", label: "English" }],
  AE: [
    { value: "ar", label: "Arabic" },
    { value: "en", label: "English" },
  ],
  FR: [{ value: "fr", label: "French" }],
  DE: [{ value: "de", label: "German" }],
  ES: [{ value: "es", label: "Spanish" }],
  IT: [{ value: "it", label: "Italian" }],
  JP: [{ value: "ja", label: "Japanese" }],
  CN: [{ value: "zh", label: "Chinese" }],
  RU: [{ value: "ru", label: "Russian" }],
};

export function getLanguagesByCountry(countryCode: string): LanguageOption[] {
  if (!countryCode) return [{ value: "en", label: "English" }];
  return countryLanguageMap[countryCode] || [{ value: "en", label: "English" }];
}
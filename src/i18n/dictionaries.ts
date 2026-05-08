import 'server-only';
import type { Locale } from './config';

const dictionaries = {
  pt: () => import('./locales/pt.json').then((module) => module.default),
  en: () => import('./locales/en.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale] ? dictionaries[locale]() : dictionaries.pt();

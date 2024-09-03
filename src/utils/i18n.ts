import en from '../i18n/en.json';
import es from '../i18n/es.json';
import type { Locale } from '@services/routing';

type TranslationValue = string | string[] | Translations;

type Translations = {
  [key: string]: TranslationValue;
}

const translations: Record<Exclude<Locale, undefined>, Translations> = {
  en, es
};

export const getTranslationValue = (locale: Exclude<Locale, undefined>, key: string): string => {
  const keys = key.split('.');
  let result: TranslationValue = translations[locale];

  // iterate through object till finding string or array
  for (const k of keys) {
    if (typeof result === 'string') {
      return result;
    }

    if ( Array.isArray(result) ) {
      throw new Error(`Translation key is returning an array: ${key} into locale "${locale}. Use getTranslationArray instead"`);
    }

    result = result[k];
  }

  // find index number in key to return array element
  const indexArray = keys.find(k => {
    return typeof parseInt(k) === 'number';
  });

  if (indexArray && Array.isArray(result)) {
    return result[parseInt(indexArray)];
  }

  // return string or array
  if (typeof result === 'string') {
    return result;
  }

  throw new Error(`Translation key not found: ${key} into locale "${locale}"`);
}

export const getTranslationArray = (locale: Exclude<Locale, undefined>, key: string): string[] => {
  const keys = key.split('.');
  let result: TranslationValue = translations[locale];

  // iterate through object till finding string or array
  for (const k of keys) {
    if (Array.isArray(result)) {
      return result;
    }

    if ( typeof result === 'string' ) {
      throw new Error(`Translation key is returning an string: ${key} into locale "${locale}. Use getTranslationValue instead"`);
    }

    result = result[k];
  }

  if ( Array.isArray(result) ) {
    return result;
  }

  throw new Error(`Translation key not found: ${key} into locale "${locale}"`);
}
import i18n from 'sveltekit-i18n';
import lang from './lang.json';

export const defaultLocale = 'en';

/** @type {import('sveltekit-i18n').Config} */
const config = ({
    fallbackLocale: 'en',
    translations: {
        en: { lang },
        de: { lang },
    },
    loaders: [
        {
            locale: 'en',
            key: 'common',
            loader: async () => (
                await import('./en/common.json')
            ).default,
        },
        {
            locale: 'en',
            key: 'ftr',
            loader: async () => (
                await import('./en/ftr.json')
            ).default,
        },
        {
            locale: 'en',
            key: 'about',
            loader: async () => (
                await import('./en/about.json')
            ).default,
        },
        {
            locale: 'en',
            key: 'theIsle',
            loader: async () => (
                await import('./en/theIsle.json')
            ).default,
        },
        {
            locale: 'de',
            key: 'common',
            loader: async () => (
                await import('./de/common.json')
            ).default,
        },
        {
            locale: 'de',
            key: 'ftr',
            loader: async () => (
                await import('./de/ftr.json')
            ).default,
        },
        {
            locale: 'de',
            key: 'about',
            loader: async () => (
                await import('./de/about.json')
            ).default,
        },
        {
            locale: 'de',
            key: 'theIsle',
            loader: async () => (
                await import('./de/theIsle.json')
            ).default,
        },
    ],
});

export const { t, locale, locales, translations, loading, loadTranslations, addTranslations, setLocale, setRoute } = new i18n(config);

loading.subscribe(($loading) => $loading && console.log('Loading translations...'));
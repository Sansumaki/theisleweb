// @ts-ignore
import {locales, loadTranslations, translations, defaultLocale, t} from '$lib/translations';
import type {Cookies} from "@sveltejs/kit";

/** @type {import('@sveltejs/kit').ServerLoad} */
export const load = async ({url, cookies, request}: { url: URL; cookies: Cookies; request: Request }) => {
    const {pathname} = url;

    // Try to get the locale from cookie
    let locale = (cookies.get('lang') || '').toLowerCase();

    // Get user preferred locale
    if (!locale) {
        locale = `${`${request.headers.get('accept-language')}`.match(/[a-zA-Z]+?(?=-|_|,|;)/)}`.toLowerCase();
    }

    // Get defined locales
    const supportedLocales = locales.get().map((l:any) => l.toLowerCase());

    // Use default locale if current locale is not supported
    if (!supportedLocales.includes(locale)) {
        locale = defaultLocale;
    }

    await loadTranslations(locale, pathname); // keep this just before the `return`

    let menuItemsLeft = [
        {name: 'ftr.menu', link: '/'},
        {name: 'about.menu', link: '/about'}
    ];
    let menuItemsRight = [
        {name: 'theIsle.menu', link: '/the-isle'},
        {name: 'theIsle.maps.menu', link: '/the-isle/map'},
        {name: 'theIsle.dino.menu', link: '/the-isle/dino'}
    ];
    let menuItemsFull = [
        {
            name: "common.name", items: [
                {name: 'common.home', link: '/'},
                {name: 'ftr.menu', link: '/'},
                {name: 'about.menu', link: '/about'}
            ]
        }, {
            name: "theIsle.menu", items: [
                {name: 'theIsle.menu', link: '/the-isle'},
                {name: 'theIsle.dino.menu', link: '/the-isle/dino'},
                {name: 'theIsle.maps.menu', link: '/the-isle/map'}
            ]
        }, {
            name: "common.legal", items: [
                {name: 'common.privacy.policy', link: '/about'},
                {name: 'common.licensing', link: '/about'},
                {name: 'common.term.conditions', link: '/about'}
            ]
        }, {
            name: "common.support", items: [
                {name: 'common.discord.server', link: 'https://discord.gg/ftr', target: '_blank'},
                {name: 'common.contactus', link: '/'}
            ]
        }
    ];
    
    return {
        i18n: {locale, route: pathname},
        translations: translations.get(), // `translations` on server contain all translations loaded by different clients
        menu: {
            left: menuItemsLeft,
            right: menuItemsRight,
            full: menuItemsFull
        }
    };
};
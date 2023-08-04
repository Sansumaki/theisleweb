import { dev } from '$app/environment';

// we don't need any JS on this page, though we'll load
// it in dev so that we get hot module replacement
export const csr = dev;

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

import type {PageLoad} from "./$types";
import background from '$lib/images/FTR_Pro.gif';

export const load = (() => {
    return {
        page:{
            title: "About",
            content: "About the creator of this page",
            image: background
        }
    }
}) satisfies PageLoad;
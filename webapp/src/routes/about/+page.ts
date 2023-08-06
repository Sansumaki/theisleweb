import { dev } from '$app/environment';
import type {PageLoad} from "./$types.js";
import background from '$lib/images/FTR_Pro.gif';

export const csr = dev;
export const prerender = true;

export const load = (() => {
    return {
        page:{
            title: "About",
            content: "About the creator of this page",
            image: background
        }
    }
}) satisfies PageLoad;
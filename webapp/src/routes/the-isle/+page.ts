import background from '$lib/images/Hintergrundstartseite.gif';
import type {PageLoad} from "./$types.js";

export const prerender = true;
export const load = (() => {
    return {
        page: {
            title: "The Isle",
            content: "Infos about the game the isle",
            image: background
        }
    }
}) satisfies PageLoad;
// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
import type {PageLoad} from "./$types";
import background from '$lib/images/Hintergrundstartseite.gif';

export const prerender = true;
export const load = (() => {
    return {
        page:{
            title: "The Isle",
            content: "Infos about the game the isle",
            image: background
        }
    }
}) satisfies PageLoad;
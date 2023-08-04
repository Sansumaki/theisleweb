// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
import type {PageLoad} from "./$types";
import background from '$lib/images/CarniSur.jpg';

export const prerender = true;
export const load = (() => {
    return {
        page:{
            title: "Dinosaur",
            content: "Infos about all the isle dinosaur",
            image: background
        }
    }
}) satisfies PageLoad;
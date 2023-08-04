// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
import type {PageLoad} from "./$types";
import smallMap from '$lib/images/legacy-map-v3-small.jpg';

export const prerender = true;

export const load = (() => {
return {
    page:{
        title: "Map",
        content: "A map for the isle legacy v3 map.",
        image: smallMap
    }
}
}) satisfies PageLoad;
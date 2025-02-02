import type {PageLoad} from "./$types.ts";
import smallMap from '$lib/images/legacy-map-v3-small.jpg';

export const load = (({data }) => {
return {...{
    page:{
        title: "Map",
        content: "A v3 for the isle legacy v3 v3.",
        image: smallMap
    }
}, ...data}
}) satisfies PageLoad;
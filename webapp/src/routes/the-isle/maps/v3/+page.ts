import type {PageLoad} from "./$types.ts";

export const load = (({data }) => {
return {...{
    page:{
        title: "Map",
        content: "A v3 for the isle legacy v3 v3.",
        hideHeading: true
    }
}, ...data}
}) satisfies PageLoad;
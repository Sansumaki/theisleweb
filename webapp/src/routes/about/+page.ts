import type {PageLoad} from "./$types.js";

export const load = (() => {
    return {
        page:{
            title: 'about.title',
            content: "about.description"
        }
    }
}) satisfies PageLoad;

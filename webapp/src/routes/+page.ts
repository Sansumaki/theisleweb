import type {PageLoad} from "./$types.js";

export const load = (() => {
    return {
        page:{
            title: 'ftr.title',
            content: "ftr.description"
        }
    }
}) satisfies PageLoad;

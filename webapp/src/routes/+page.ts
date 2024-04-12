import type {PageLoad} from "./$types.js";

export const load = (() => {
    return {
        page:{
            title: 'common.name'
        }
    }
}) satisfies PageLoad;

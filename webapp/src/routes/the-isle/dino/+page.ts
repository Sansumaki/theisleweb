// @ts-ignore
import type {PageLoad} from "./$types";

export const load = (() => {
    return {
        page:{
            title: 'theIsle.dino.title',
            content: "theIsle.dino.description"
        }
    }
}) satisfies PageLoad;
// @ts-ignore
import type {PageLoad} from "./$types";

export const load = (() => {
    return {
        page: {
            title: 'theIsle.title',
            content: "theIsle.description"
        }
    }
}) satisfies PageLoad;
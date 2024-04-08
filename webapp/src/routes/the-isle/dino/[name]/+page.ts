import type {PageLoad} from "./$types.js";

export const load = (({data}) => {
    return {...{
            page: {
                title: 'theIsle.dino.title',
                content: "theIsle.dino.description"
            }
        }, ...data}
}) satisfies PageLoad;
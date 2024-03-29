import type {PageLoad} from "./$types.js";

export const load = (({data}) => {
    return {...{
            page: {
                title: 'theIsle.dino.title '+ data.dinoData?.name,
                content: "theIsle.dino.description" + data.dinoData?.name
            }
        }, ...data}
}) satisfies PageLoad;
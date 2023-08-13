import type {PageLoad} from "../../../../.svelte-kit/types/src/routes";

export const load = (() => {
    return {
        page:{
            title: "Dinosaur",
            content: "Infos about all the isle dinosaur"
        }
    }
}) satisfies PageLoad;
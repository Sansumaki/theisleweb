import background from "$lib/images/FTR_Pro.gif";
import type {PageLoad} from "./$types.js";

export const load = (() => {
    return {
        page:{
            title: "Fuck the Revolution",
            content: "FTR die the Isle Community",
            image: background
        }
    }
}) satisfies PageLoad;
// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
import background from "$lib/images/FTR_Pro.gif";
import type {PageLoad} from "./$types";

export const prerender = true;
export const load = (() => {
    return {
        page:{
            title: "Fuck the Revolution",
            content: "FTR die the Isle Community",
            image: background
        }
    }
}) satisfies PageLoad;
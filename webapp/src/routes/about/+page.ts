import type {PageLoad} from "./$types.js";
import {i} from "@inlang/sdk-js";

export const load = (() => {
    return {
        page:{
            title: i('about.title'),
            content: i("about.description")
        }
    }
}) satisfies PageLoad;
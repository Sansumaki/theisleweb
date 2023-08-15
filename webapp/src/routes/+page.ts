import type {PageLoad} from "./$types.js";
import {i } from "@inlang/sdk-js";

export const load = (() => {
    return {
        page:{
            title: i('ftr.title'),
            content: i("ftr.description")
        }
    }
}) satisfies PageLoad;
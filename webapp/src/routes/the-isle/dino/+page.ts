// @ts-ignore
import type {PageLoad} from "./$types";
import {i} from "@inlang/sdk-js";

export const load = (() => {
    return {
        page:{
            title: i('theIsle.dino.title'),
            content: i("theIsle.dino.description")
        }
    }
}) satisfies PageLoad;
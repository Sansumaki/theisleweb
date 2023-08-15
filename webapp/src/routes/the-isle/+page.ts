// @ts-ignore
import type {PageLoad} from "./$types";
import {i} from "@inlang/sdk-js";

export const load = (() => {
    return {
        page: {
            title: i('theIsle.title'),
            content: i("theIsle.description")
        }
    }
}) satisfies PageLoad;
import type {PageLoad} from "./$types.ts";
import {i} from "@inlang/sdk-js";

export const load = (({data }) => {
return {...{
    page:{
        title: i('theIsle.maps.title'),
        content: i('theIsle.maps.description'),
        hideHeading: true
    }
}, ...data}
}) satisfies PageLoad;
import type {PageLoad} from "./$types.ts";

export const ssr = false;

export const load = (({data }) => {
return {...{
    page:{
        title: 'theIsle.maps.title',
        content: 'theIsle.maps.description',
        hideHeading: true
    }
}, ...data}
}) satisfies PageLoad;
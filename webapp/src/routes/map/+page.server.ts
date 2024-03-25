import type {PageServerLoad} from './$types.js';
import type {Actions} from "@sveltejs/kit";

const showTeleportPath = 'pandasia.isleMap.showTeleports';
const showPoiPath = 'pandasia.isleMap.showPoi';
const selectedMapPath = 'pandasia.isleMap.selectedMap';

export const prerender = false;

export const load = (async ({cookies}) => {
    try {

        const showTeleport = cookies.get(showTeleportPath) === 'true';
        const showPoi = cookies.get(showPoiPath) === 'true';
        const selectedMap = cookies.get(selectedMapPath);

        return {
            showTeleport,
            showPoi,
            selectedMap
        };
    } catch (exception) {
        console.log(exception)
    }
}) satisfies PageServerLoad;

function addYears(date: Date, years: number) {
    const dateCopy = new Date(date);
    dateCopy.setFullYear(dateCopy.getFullYear() + years);
    return dateCopy;
}

export const actions = {
    saveShowFlags: async ({cookies, request}) => {
        const data = await request.formData();
        const showTeleport = data.get('showTeleport') === 'on';
        const showPoi = data.get('showPoi') === 'on';
        const expireDate: Date = addYears(new Date(), 10);
        cookies.set(showTeleportPath, String(showTeleport), {path: '/', expires: expireDate});
        cookies.set(showPoiPath, String(showPoi), {path: '/', expires: expireDate});

        return {success: true};
    }
} satisfies Actions;
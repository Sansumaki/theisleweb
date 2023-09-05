import type { PageServerLoad } from "./$types.js";
import type {Actions} from "@sveltejs/kit";
import {find} from "$lib/database.js";
import {db} from "$lib/server/prisma.js";

const showTeleportPath = 'ftr.v3.showTeleports';
const showPoiPath = 'ftr.v3.showPoi';

export const load = (async ({cookies}) => {
    const mapPoints = await db.mapPoints.findMany();
    console.log(mapPoints)

    //const mapPoints = await find("map_points", { "map": "legacy_v3" }, {"_id": 0, "map": 0});

    const showTeleport = cookies.get(showTeleportPath) === 'true';
    const showPoi = cookies.get(showPoiPath) === 'true';

    return {
        showTeleport,
        showPoi,
        points: JSON.parse(JSON.stringify(mapPoints))
    };
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

        return { success: true };
    }
} satisfies Actions;
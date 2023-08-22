import type { PageServerLoad } from "./$types.js";
//import type {_Point} from "./MapPoints.ts";
//import {_PointType} from "./MapPoints.ts";
import type {Actions} from "@sveltejs/kit";
import {getDatabase} from "$lib/mongodb-client.js";

const showTeleportPath = 'ftr.v3.showTeleports';
const showPoiPath = 'ftr.v3.showPoi';

// let points: _Point[] = [
//     {map:"legacy_v3",type: _PointType.POI, name: "Center", lat: 0, long: 0},
//     {map:"legacy_v3",type: _PointType.POI, name: "Aviary", lat: -25, long: 280},
//     {map:"legacy_v3",type: _PointType.Teleport, name: "Great Falls", lat: -234, long: 527},
//     {map:"legacy_v3",type: _PointType.Teleport, name: "North Twins", lat: -468, long: -232},
//     {map:"legacy_v3",type: _PointType.Teleport, name: "South Twins", lat: -489, long: -137},
//     {map:"legacy_v3",type: _PointType.Teleport, name: "Ports", lat: 446, long: 204},
//     {map:"legacy_v3",type: _PointType.Teleport, name: "Hidden", lat: 393, long: 55},
//     {map:"legacy_v3",type: _PointType.Teleport, name: "Murky Pond", lat: 319, long: -111},
//     {map:"legacy_v3",type: _PointType.Teleport, name: "Hot Springs", lat: 131, long: -353},
//     {map:"legacy_v3",type: _PointType.Teleport, name: "Ocean Falls", lat: 23, long: -485},
//     {map:"legacy_v3",type: _PointType.Teleport, name: "Northernmost", lat: -134, long: -463},
//     {map:"legacy_v3",type: _PointType.Teleport, name: "The Damn", lat: 26, long: -158},
//     {map:"legacy_v3",type: _PointType.Teleport, name: "Dump/Ravine", lat: -286, long: -252},
//     {map:"legacy_v3",type: _PointType.Teleport, name: "Cargo Pond", lat: -507, long: -48},
//     {map:"legacy_v3",type: _PointType.Teleport, name: "Gulf Pond", lat: -493, long: 208},
//     {map:"legacy_v3",type: _PointType.Teleport, name: "Western Pond", lat: -694, long: 249},
//     {map:"legacy_v3",type: _PointType.Teleport, name: "Puddle Pond", lat: -457, long: 387},
//     {map:"legacy_v3",type: _PointType.Teleport, name: "The Wash", lat: -359, long: 328},
//     {map:"legacy_v3",type: _PointType.Teleport, name: "Sewer Pond", lat: -261, long: 299},
//     {map:"legacy_v3",type: _PointType.Teleport, name: "Lazy River", lat: -151, long: 470},
//     {map:"legacy_v3",type: _PointType.Teleport, name: "East Swamp", lat: 178, long: 66},
//     {map:"legacy_v3",type: _PointType.Teleport, name: "Middle Swamp", lat: -16, long: 76},
//     {map:"legacy_v3",type: _PointType.Teleport, name: "West Swamp", lat: -113, long: 39},
//     {map:"legacy_v3",type: _PointType.Teleport, name: "Canyon Pond", lat: -40, long: 165},
//     {map:"legacy_v3",type: _PointType.Player, name: "Player", lat: -204, long: 118},
// ]

export const load = (async ({cookies}) => {


    const db = await getDatabase();
    const collection = db.collection("map_points");
    const points = await collection.find().toArray();

    const showTeleport = cookies.get(showTeleportPath) === 'true';
    const showPoi = cookies.get(showPoiPath) === 'true';

    return {
        showTeleport,
        showPoi,
        points: JSON.parse(JSON.stringify(points))
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
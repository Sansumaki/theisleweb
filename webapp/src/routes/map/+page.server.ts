import type {PageServerLoad, Actions} from './$types.js';
import type {_Point} from "./MapPoints.ts";
import {_PointType} from "./MapPoints.ts";

const showTeleportPath = 'ftr.map.showTeleports';
const showPoiPath = 'ftr.map.showPoi';

let points: _Point[] = [
    {type: _PointType.POI, name: "Center", lat: 0, long: 0},
    {type: _PointType.POI, name: "Aviary", lat: -25, long: 280},
    {type: _PointType.Teleport, name: "Great Falls", lat: -234, long: 527},
    {type: _PointType.Teleport, name: "North Twins", lat: -468, long: -232},
    {type: _PointType.Teleport, name: "South Twins", lat: -489, long: -137},
    {type: _PointType.Teleport, name: "Ports", lat: 446, long: 204},
    {type: _PointType.Teleport, name: "Hidden", lat: 393, long: 55},
    {type: _PointType.Teleport, name: "Murky Pond", lat: 319, long: -111},
    {type: _PointType.Teleport, name: "Hot Springs", lat: 131, long: -353},
    {type: _PointType.Teleport, name: "Ocean Falls", lat: 23, long: -485},
    {type: _PointType.Teleport, name: "Northernmost", lat: -134, long: -463},
    {type: _PointType.Teleport, name: "The Damn", lat: 26, long: -158},
    {type: _PointType.Teleport, name: "Dump/Ravine", lat: -286, long: -252},
    {type: _PointType.Teleport, name: "Cargo Pond", lat: -507, long: -48},
    {type: _PointType.Teleport, name: "Gulf Pond", lat: -493, long: 208},
    {type: _PointType.Teleport, name: "Western Pond", lat: -694, long: 249},
    {type: _PointType.Teleport, name: "Puddle Pond", lat: -457, long: 387},
    {type: _PointType.Teleport, name: "The Wash", lat: -359, long: 328},
    {type: _PointType.Teleport, name: "Sewer Pond", lat: -261, long: 299},
    {type: _PointType.Teleport, name: "Lazy River", lat: -151, long: 470},
    {type: _PointType.Teleport, name: "East Swamp", lat: 178, long: 66},
    {type: _PointType.Teleport, name: "Middle Swamp", lat: -16, long: 76},
    {type: _PointType.Teleport, name: "West Swamp", lat: -113, long: 39},
    {type: _PointType.Teleport, name: "Canyon Pond", lat: -40, long: 165},
    {type: _PointType.Player, name: "Player", lat: -204, long: 118},
]

export const load = (async ({cookies}) => {
    const showTeleport = cookies.get(showTeleportPath) === 'true';
    const showPoi = cookies.get(showPoiPath) === 'true';

    return {
        showTeleport,
        showPoi,
        points
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
import type { PageServerLoad } from "./$types.js";
import type {Actions} from "@sveltejs/kit";

const showTeleportPath = 'ftr.v3.showTeleports';
const showPoiPath = 'ftr.v3.showPoi';

const apiKey = "x1apTAWeCiF1NNDeU4UGSyRmlIKI9MfynwwhxoIkFS46F4m4yI0BxqqTf4mQwXBF";

export const load = (async ({cookies}) => {
    const pointResponse = await fetch("https://eu-central-1.aws.data.mongodb-api.com/app/application-ftr-jllam/endpoint/ftr/points", {
        method:'GET',
        headers: {
            'Content-Type':'application/json',
            ApiKey:apiKey
        }
    });

    const showTeleport = cookies.get(showTeleportPath) === 'true';
    const showPoi = cookies.get(showPoiPath) === 'true';

    return {
        showTeleport,
        showPoi,
        points: JSON.parse(JSON.stringify( await pointResponse.json()))
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
import type { PageServerLoad } from './$types.js';
import type { Actions } from '@sveltejs/kit';
import PandasiaDatabase from '$lib/server/prisma.js';

const showTeleportPath = 'pandasia.isleMap.showTeleports';
const showPoiPath = 'pandasia.isleMap.showPoi';
const selectedMapKeyPath = 'pandasia.isleMap.selectedMapKey';

export const prerender = false;

export const load = (async ({ cookies, platform }) => {
	try {
		const showTeleport = cookies.get(showTeleportPath) === 'true';
		const showPoi = cookies.get(showPoiPath) === 'true';
		const selectedMapKey = cookies.get(selectedMapKeyPath);

		console.log(platform)
		console.log(platform?.env)
		if (platform?.env == undefined) {
			 throw ("platform.env is not defined!")
		}
		const pandasiaDB = new PandasiaDatabase(platform.env.DB);

		const mapList = await pandasiaDB.getMapList();
		const mapData = await pandasiaDB.getMapData(selectedMapKey);

		return {
			showTeleport,
			showPoi,
			mapList,
			mapData
		};
	} catch (exception) {
		console.log(exception);
	}
}) satisfies PageServerLoad;

function addYears(date: Date, years: number) {
	const dateCopy = new Date(date);
	dateCopy.setFullYear(dateCopy.getFullYear() + years);
	return dateCopy;
}

export const actions = {
	saveShowFlags: async ({ cookies, request }) => {
		const data = await request.formData();
		const showTeleport = data.get('showTeleport') === 'on';
		const showPoi = data.get('showPoi') === 'on';
		const expireDate: Date = addYears(new Date(), 10);
		cookies.set(showTeleportPath, String(showTeleport), { path: '/', expires: expireDate });
		cookies.set(showPoiPath, String(showPoi), { path: '/', expires: expireDate });

		return { success: true };
	}
} satisfies Actions;
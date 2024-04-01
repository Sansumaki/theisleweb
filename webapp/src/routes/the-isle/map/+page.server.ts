import type { PageServerLoad } from './$types.js';
import PandasiaDatabase from '$lib/server/prisma.js';

export const prerender = false;

export const load = (async ({ platform}) => {
	try {
		if (platform?.env == undefined) {
			 return {error: "platform is not defined!" }
		}
		const pandasiaDB = new PandasiaDatabase(platform.env.DB);

		const mapList = await pandasiaDB.getMapList();

		return {
			mapList
		};
	} catch (exception) {
		return { exception: exception };
	}
}) satisfies PageServerLoad;
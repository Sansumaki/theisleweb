import type { PageServerLoad } from './$types.js';
import PandasiaDatabase from '$lib/server/prisma.js';

export const prerender = false;

export const load = (async ({ params, platform }) => {
	if (platform?.env == undefined) {
		return {error: "platform is not defined!" }
	}

	const pandasiaDB = new PandasiaDatabase(platform.env.DB)

	if (platform?.env == undefined) {
		return {error: "platform is not defined!" }
	}

	const dinoList = await pandasiaDB.getDinoFullList();

	return {
		dinoList
	}
}) satisfies PageServerLoad;
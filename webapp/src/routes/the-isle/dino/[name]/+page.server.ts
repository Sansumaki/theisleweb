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

	const dinoList = await pandasiaDB.getDinoList();

	const dinoName: string | undefined = params.name;
	let dinoData;
	if (dinoName != undefined) {
		dinoData = await pandasiaDB.getDinoData(dinoName);
	}

	return {
		dinoList,
		dinoData
	}
}) satisfies PageServerLoad;
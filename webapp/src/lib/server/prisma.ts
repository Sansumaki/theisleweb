import { PrismaClient } from '@prisma/client';
import type { D1Database } from '@cloudflare/workers-types';
import { PrismaD1 } from '@prisma/adapter-d1';

export default class PandasiaDatabase extends PrismaClient {

	constructor(database: D1Database) {
		const adapter = new PrismaD1(database);
		super({ adapter });
	}

	async getMapList() {
				return this.isleServers.findMany({
			select: {
				key: true,
				name: true,
				map_key: true
			}
		});
	}

	async getMapData(mapKey: string | undefined) {
		if (mapKey == undefined || mapKey === "") {
			mapKey = (await this.isleServers.findFirst({ where: { is_default: true } }))?.key ?? '';
		}

		const mapData = await this.isleServers.findUnique({
			where: { key: mapKey },
			select: {
				key: true,
				name: true,
				map_key: true,
				teleport_locations: {
					select: {
						name: true,
						location_x: true,
						location_y: true,
						location_z: true,
						rotation_p: true,
						rotation_y: true,
						rotation_r: true
					}
				},
				poi_locations: {
					select: {
						name: true,
						description: true,
						location_x: true,
						location_y: true,
						location_z: true,
						server_id: true
					}
				}
			}
		});

		if (mapData == undefined) return undefined;

		if (mapData.teleport_locations.length == 0 || mapData.poi_locations.length == 0) {
			const defaultServer = await this.isleServers.findFirst({
				where: {
					is_default: true,
					map_key: mapData.map_key
				},
				select: {
					id: true
				}
			});

			if (defaultServer != undefined && mapData.teleport_locations.length == 0) {
				mapData.teleport_locations = await this.teleportLocations.findMany({
					where: {
						server_id: defaultServer.id
					},
					select: {
						name: true,
						location_x: true,
						location_y: true,
						location_z: true,
						rotation_p: true,
						rotation_y: true,
						rotation_r: true
					}
				});
			}


			if (defaultServer != undefined && mapData.poi_locations.length == 0) {
				mapData.poi_locations = await this.poiLocations.findMany({
					where: {
						server_id: defaultServer.id
					},
					select: {
						name: true,
						description: true,
						location_x: true,
						location_y: true,
						location_z: true,
						server_id: true
					}
				});
			}

		}
		return mapData;
	}

	async getDinoList() {
		return this.dinos.findMany({
			select: {
				id: true,
				name: true,
				diet: true,
				is_sandbox: true
			}
		})
	}

	async getDinoFullList() {
		return this.dinos.findMany({
			select: {
				name: true,
				diet: true,
				is_sandbox: true,
				base_damage: true,
				alt_damage: true,
				health: true,
				weight: true,
				speed: true,
				ambush: true,
				sprint_seconds: true,
				base_bleed: true,
				growth_minutes_adult: true,
				growth_minutes_sub: true,
				growth_minutes_juv: true,
				growth_minutes_hatch: true
			}
		});
	}

	async getDinoData(name: string) {
		return this.dinos.findUnique({
			where: {
				name: name
			}
		});
	}
}

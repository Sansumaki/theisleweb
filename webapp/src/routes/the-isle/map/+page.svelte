<script lang="ts">
	import isle_v3_map from '$lib/images/maps/Isle_V3.jpg';
	import thenyaw_map from '$lib/images/maps/Thenyaw.jpg';

	export let data;
	let _mapList = data.mapList ?? [];

</script>

<div class="grid grid-cols-2 gap-6">
	{#each _mapList as map}
		<a href="/the-isle/map/{map.key}" title="{map.name}">
			<div style="background-image: url('{map.map_key === 'Isle_V3' ? isle_v3_map : thenyaw_map}')" class="relative aspect-video bg-center flex items-end justify-center overflow-hidden">
				<div class="absolute top-[14px] right-[-78px] lg:top-[24px] lg:right-[-68px] bg-red-800 p-1 px-20 rotate-45 text-xs md:text-sm lg:text-lg">{map.map_key}</div>
				<div class="bg-[#ffffffd0] flex justify-center w-full">
					<div class="m-3 font-bold text-xs md:text-sm lg:text-xl text-black overflow-ellipsis overflow-hidden text-nowrap">{map.name}</div>
				</div>
			</div>
		</a>
	{/each}
</div>
<script>
	import { Heading, P, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
	import { t } from '$lib/translations';

	export let data;

	console.log(data);
</script>

<Heading tag="h4">{$t('theIsle.dino.title')}</Heading>
<P class="my-4" justify>{$t('theIsle.dino.description')}</P>

<Heading tag="h4">Dino List</Heading>
<Table hoverable={true}>
	<TableHead>
		<TableHeadCell>Name</TableHeadCell>
		<TableHeadCell>Diet</TableHeadCell>
		<TableHeadCell>is_sandbox          </TableHeadCell>
		<TableHeadCell>base_damage         </TableHeadCell>
		<TableHeadCell>alt_damage          </TableHeadCell>
		<TableHeadCell>health              </TableHeadCell>
		<TableHeadCell>weight              </TableHeadCell>
		<TableHeadCell>speed               </TableHeadCell>
		<TableHeadCell>ambush              </TableHeadCell>
		<TableHeadCell>sprint_seconds      </TableHeadCell>
		<TableHeadCell>base_bleed          </TableHeadCell>
		<TableHeadCell>growth_minutes_adult</TableHeadCell>
		<TableHeadCell>growth_minutes_sub  </TableHeadCell>
		<TableHeadCell>growth_minutes_juv  </TableHeadCell>
		<TableHeadCell>growth_minutes_hatch</TableHeadCell>
	</TableHead>

	<TableBody>
		{#if data.dinoList !== undefined}
			{#each data.dinoList as dino}
				<TableBodyRow>
					<TableBodyCell>{dino.name}</TableBodyCell>
					<TableBodyCell>{dino.diet === 0 ? "Herbivore" : "Carnivore"}</TableBodyCell>
					<TableBodyCell>{dino.is_sandbox}</TableBodyCell>
					<TableBodyCell>{dino.base_damage}</TableBodyCell>
					<TableBodyCell>{dino.alt_damage}</TableBodyCell>
					<TableBodyCell>{dino.health}</TableBodyCell>
					<TableBodyCell>{dino.weight}</TableBodyCell>
					<TableBodyCell>{dino.speed}</TableBodyCell>
					<TableBodyCell>{dino.ambush}</TableBodyCell>
					<TableBodyCell>{dino.sprint_seconds}</TableBodyCell>
					<TableBodyCell>{dino.base_bleed}</TableBodyCell>
					<TableBodyCell>{dino.growth_minutes_adult}</TableBodyCell>
					<TableBodyCell>{dino.growth_minutes_sub}</TableBodyCell>
					<TableBodyCell>{dino.growth_minutes_juv}</TableBodyCell>
					<TableBodyCell>{dino.growth_minutes_hatch}</TableBodyCell>
				</TableBodyRow>
			{/each}
		{/if}
	</TableBody>
</Table>
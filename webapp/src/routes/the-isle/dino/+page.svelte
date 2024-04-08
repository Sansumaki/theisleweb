<script lang="ts">
    import {
        Heading,
        P,
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell
    } from 'flowbite-svelte';
    import {t} from '$lib/translations';
    import {writable} from "svelte/store";
    import NotAvailableBodyCell from "./NotAvailableBodyCell.svelte";

    export let data;

    const calculateGrowthTime = function (dino: {
        growth_minutes_adult: number | null,
        growth_minutes_sub: number | null,
        growth_minutes_juv: number | null
    }) {
        const time = (dino.growth_minutes_adult ?? 0) + (dino.growth_minutes_sub ?? 0) + (dino.growth_minutes_juv ?? 0)
        return time <= 0 ? undefined : time;
    }

    const sortKey = writable('id'); // default sort key
    const sortDirection = writable(1); // default sort direction (ascending)
    const sortItems = writable(data.dinoList?.map(dino => ({...{total_growth_time: calculateGrowthTime(dino)}, ...dino})).slice()); // make a copy of the items array

    // Define a function to sort the items
    const sortTable = (key) => {
        // If the same key is clicked, reverse the sort direction
        if ($sortKey === key) {
            sortDirection.update((val) => -val);
        } else {
            sortKey.set(key);
            sortDirection.set(1);
        }
    };

    $: {
        const key = $sortKey;
        const direction = $sortDirection;
        const sorted = [...$sortItems].sort((a, b) => {
            const aVal = a[key];
            const bVal = b[key];
            if (aVal < bVal || bVal == undefined) {
                return -direction;
            } else if (aVal > bVal) {
                return direction;
            }
            return 0;
        });
        sortItems.set(sorted);
    }

    const calculateTime = function (time: number | null | undefined) {
        if (time == null || time == undefined) return undefined;

        const bigTime = Math.floor(time / 60);
        const smallTime = ("0" + time % 60).slice(-2)
        return bigTime + ":" + smallTime;
    }
</script>

<h2>{$t('theIsle.dino.title')}</h2>
<p>{$t('theIsle.dino.description')}</p>

<h2>Dino List</h2>
<Table hoverable={true}>
    <TableHead>
        <TableHeadCell on:click={() => sortTable('name')}>Name</TableHeadCell>
        <TableHeadCell on:click={() => sortTable('diet')}>Diet</TableHeadCell>
        <TableHeadCell on:click={() => sortTable('is_sandbox')}>Sandbox</TableHeadCell>
        <TableHeadCell on:click={() => sortTable('base_damage')}>Base Damage [N]</TableHeadCell>
        <TableHeadCell on:click={() => sortTable('alt_damage')}>Alternative damage [N]</TableHeadCell>
        <TableHeadCell on:click={() => sortTable('health')}>Health</TableHeadCell>
        <TableHeadCell on:click={() => sortTable('weight')}>Weight [kg]</TableHeadCell>
        <TableHeadCell on:click={() => sortTable('speed')}>Speed [km/h]</TableHeadCell>
        <TableHeadCell on:click={() => sortTable('ambush')}>Ambush [km/h]</TableHeadCell>
        <TableHeadCell on:click={() => sortTable('spring_duration')}>Sprint duration [min:s]</TableHeadCell>
        <TableHeadCell on:click={() => sortTable('base_bleed')}>Base Bleed</TableHeadCell>
        <TableHeadCell on:click={() => sortTable('total_growth_time')}>Growth time [h:min]</TableHeadCell>
    </TableHead>

    <TableBody>
        {#if $sortItems !== undefined}
            {#each $sortItems as dino}
                <TableBodyRow>
                    <TableBodyCell><a href="/the-isle/dino/{dino.name}">{dino.name}</a></TableBodyCell>
                    <TableBodyCell>
                        {#if dino.diet === 0}
                            <svg width="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 114.86">
                                <defs>
                                    <style>.cls-3 {
                                        fill: #01a437;
                                    }
                                    </style>
                                </defs>
                                <title>Herbivore</title>
                                <path class="cls-3"
                                      d="M59.07,110.77C110.92,105,139.6,71.12,112.44,0c-21.29,14.9-50.39,24.6-65,44.55C57,52.94,64.89,62.23,67.08,74.37c13.19-16.08,27.63-30.72,35.23-47-7.79,39.07-20,53.84-38.78,73.81a93.64,93.64,0,0,1-4.46,9.62Zm-14.9,4C4,105-15.18,76.09,14.27,24.75c23.8,22.92,65.79,37.48,38.39,85.86a27.08,27.08,0,0,1-1.83,2.93C45.9,89.62,26.21,70.69,20.43,50.61,21.77,83.42,31.23,93,45.88,114.86c-.57,0-1.14-.06-1.71-.13Z"/>
                            </svg>
                        {:else }
                            <svg width="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 122.79">
                                <defs>
                                    <style>.cls-1 {
                                        fill: #d9cbcb;
                                    }

                                    .cls-1, .cls-2 {
                                        fill-rule: evenodd;
                                    }

                                    .cls-2 {
                                        fill: #ea4536;
                                    }
                                    </style>
                                </defs>
                                <title>Carnivore</title>
                                <path class="cls-1"
                                      d="M14.56,3A10.09,10.09,0,0,1,28.83,17.23c-.21.21-.43.41-.65.6L42.42,31.91a13.33,13.33,0,0,1,2.19-1.8c5.57-3.76,10.28-1.3,14.72,1l1.17.61c1,.49,1.82.93,2.45,1.29s1.57.93,2.41,1.49c1.35.89,1.87,1.25,2.37,1.59a54.16,54.16,0,0,0,11.86,6.61c1.4.52,2.73,1,4,1.4s2.53.79,4.05,1.22c10.41,3,19.15,5.6,25.54,11,6.79,5.76,10.39,14,9.57,27.78a42.64,42.64,0,0,1-.52,4.65,35.81,35.81,0,0,1-1,4.36,40.4,40.4,0,0,1-4,9.07,48,48,0,0,1-6.3,8.3l-.11.12-.33.32a47.73,47.73,0,0,1-8.22,6.21,40,40,0,0,1-9.07,4,35.19,35.19,0,0,1-4.35,1,45.26,45.26,0,0,1-4.65.52c-13.76.82-22-2.79-27.78-9.58-5.42-6.39-8-15.12-11-25.54-.43-1.52-.84-2.89-1.22-4s-.88-2.61-1.4-4A54.57,54.57,0,0,0,36.2,67.64c-.34-.5-.66-1-1.59-2.36-.56-.85-1.06-1.65-1.5-2.42s-.79-1.46-1.29-2.44l-.6-1.18c-2.32-4.43-4.77-9.13-1-14.7a10.16,10.16,0,0,1,2-2.19L17.91,28.08c-.22.26-.44.51-.68.75a10.09,10.09,0,1,1-5.49-17.09A10.07,10.07,0,0,1,14.56,3Z"/>
                                <path class="cls-2"
                                      d="M47.31,34.12c3.62-2.43,7.48.15,11,1.93a44,44,0,0,1,4.35,2.5c5.19,3.45,9,6.35,15.2,8.7,2.84,1.07,5.64,2,8.43,2.75,19.74,5.64,33,9.88,31.61,33.84a35.49,35.49,0,0,1-1.32,7.91,38.84,38.84,0,0,1-9.2,15.47l-.08,0,0,.08a38.86,38.86,0,0,1-15.47,9.2,35.48,35.48,0,0,1-7.91,1.33C60,119.27,55.73,106,50.09,86.23c-.79-2.78-1.68-5.59-2.76-8.43-2.34-6.24-5.24-10-8.69-15.2a40.19,40.19,0,0,1-2.5-4.34c-1.78-3.55-4.36-7.41-1.93-11,1-1.55,2.76-2.33,4.77-3.11,4.2-1.61,5.13-3.58,5.54-5.39s.7-3.19,2.79-4.61ZM103.45,97a2.26,2.26,0,0,1,3.2,3.2,40.18,40.18,0,0,1-7.7,5.92,39.4,39.4,0,0,1-8.83,4,32.41,32.41,0,0,1-4,.93,42.83,42.83,0,0,1-4.38.48c-1.58.1-3.1.13-4.58.1s-2.88-.12-4.15-.27a2.26,2.26,0,0,1,.51-4.49c1.21.14,2.46.22,3.73.25s2.71,0,4.23-.09a37.49,37.49,0,0,0,3.9-.44,29.28,29.28,0,0,0,3.49-.8,34.74,34.74,0,0,0,7.8-3.49A35.67,35.67,0,0,0,103.45,97Z"/>
                            </svg>
                        {/if}
                    </TableBodyCell>
                    <TableBodyCell>
                        {#if dino.is_sandbox}
                            <svg xmlns="http://www.w3.org/2000/svg" width="30px" viewBox="0 0 96 96"
                                 enable-background="new 0 0 96 96" xml:space="preserve">
                                <path fill-rule="evenodd" clip-rule="evenodd" fill="#6BBE66"
                                      d="M48,0c26.51,0,48,21.49,48,48S74.51,96,48,96S0,74.51,0,48 S21.49,0,48,0L48,0z M26.764,49.277c0.644-3.734,4.906-5.813,8.269-3.79c0.305,0.182,0.596,0.398,0.867,0.646l0.026,0.025 c1.509,1.446,3.2,2.951,4.876,4.443l1.438,1.291l17.063-17.898c1.019-1.067,1.764-1.757,3.293-2.101 c5.235-1.155,8.916,5.244,5.206,9.155L46.536,63.366c-2.003,2.137-5.583,2.332-7.736,0.291c-1.234-1.146-2.576-2.312-3.933-3.489 c-2.35-2.042-4.747-4.125-6.701-6.187C26.993,52.809,26.487,50.89,26.764,49.277L26.764,49.277z"/>
                        </svg>
                        {/if}
                    </TableBodyCell>
                    <NotAvailableBodyCell class="text-center" value={dino.base_damage}/>
                    <NotAvailableBodyCell class="text-center" value={dino.alt_damage}/>
                    <NotAvailableBodyCell class="text-center" value={dino.health}/>
                    <NotAvailableBodyCell class="text-center" value={dino.weight}/>
                    <NotAvailableBodyCell class="text-center" value={dino.speed}/>
                    <NotAvailableBodyCell class="text-center" value={dino.ambush}/>
                    <NotAvailableBodyCell class="text-center" value={calculateTime(dino.sprint_seconds)}/>
                    <NotAvailableBodyCell class="text-center" value={dino.base_bleed}/>
                    <NotAvailableBodyCell id="growth-{dino.name}" class="text-center" value={calculateTime(dino.total_growth_time)}>
                        {#if dino.growth_minutes_adult != null}adult: {calculateTime(dino.growth_minutes_adult)}
                            <br>{/if}
                        {#if dino.growth_minutes_sub != null}sub: {calculateTime(dino.growth_minutes_sub)}<br>{/if}
                        {#if dino.growth_minutes_juv != null}juv: {calculateTime(dino.growth_minutes_juv)}<br>{/if}
                        {#if dino.growth_minutes_hatch != null}hatch: {calculateTime(dino.growth_minutes_hatch)}
                            <br>{/if}
                    </NotAvailableBodyCell>
                </TableBodyRow>
            {/each}
        {/if}
    </TableBody>
</Table>
<script lang="ts">
    import {TableBodyCell, Tooltip} from "flowbite-svelte";

    export let value: string | number | undefined | null = undefined;
    export let id: string|undefined = undefined;
    let className = '';
    export { className as class };
</script>

<TableBodyCell id={id} class="{className}" >
    {#if value !== undefined && value != null}
        {value}

        <Tooltip triggeredBy="#{id}" placement="left" type="custom" defaultClass="" class="p-4 text-lg font-medium bg-purple-500 text-gray-100">
            <slot />
        </Tooltip>
    {:else}
        <span class="text-gray-600 text-xs">N/A</span>
    {/if}
</TableBodyCell>
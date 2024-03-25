<script lang="ts">
    import {onMount, onDestroy, setContext, createEventDispatcher, tick} from 'svelte';
    import L from 'leaflet';
    import 'leaflet/dist/leaflet.css';
    import bigMap from "$lib/images/legacy-map-v3.jpg";

    export let bounds: L.LatLngBoundsExpression | undefined = undefined;
    export let view: L.LatLngExpression | undefined = undefined;
    export let zoom: number | undefined = undefined;

    const dispatch = createEventDispatcher();

    let map: L.Map | undefined;
    let mapElement: HTMLElement;

    onMount(() => {
        if (!bounds && (!view || !zoom)) {
            throw new Error('Must set either bounds, or view and zoom.');
        }

        const mapLayer = L.imageOverlay(bigMap, bounds);

        map = L.map(mapElement, {
            referCanvas: true,
            crs: L.CRS.Simple,
            minZoom: -1,
            maxZoom: 2,
            layers: [ mapLayer ]
        })
            // example to expose map events to parent components:
            .on('zoom', (e) => dispatch('zoom', e))
            .on('popupopen', async (e) => {
                await tick();
                e.popup.update();
            });
        map.fitBounds(bounds);

    });

    onDestroy(() => {
        map?.remove();
        map = undefined;
    });

    setContext('map', {
        getMap: () => map
    });

    $: if (map) {
        if (bounds) {
            map.fitBounds(bounds);
        } else if (view && zoom) {
            map.setView(view, zoom);
        }
    }
</script>

<div class="w-full h-full" bind:this={mapElement}>
    {#if map}
        <slot />
    {/if}
</div>
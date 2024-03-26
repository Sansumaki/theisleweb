<script lang="ts">
    import {onMount, onDestroy, setContext, createEventDispatcher, tick} from 'svelte';
    import L from 'leaflet';
    import 'leaflet/dist/leaflet.css';
    import bigMap from "$lib/images/legacy-map-v3.jpg";
    import portMap from "$lib/images/port.png";

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
        const portLayer = L.imageOverlay(portMap, [[-10,350],[-130,480]]);

        map = L.map(mapElement, {
            referCanvas: true,
            crs: L.CRS.Simple,
            minZoom: -2,
            maxZoom: 5,
            zoomSnap: 0,
            zoomDelta: 0.5,
            maxBounds: bounds,
            layers: [mapLayer, portLayer]
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

<div class="absolute w-full h-full backgroundDiv">.</div>
<div class="absolute w-full h-full mapDiv" bind:this={mapElement}>
    {#if map}
        <slot/>
    {/if}
</div>

<style lang="scss">
  $headerHeight: 80px;
  .backgroundDiv {
    background-image: url('$lib/images/water-background.png');
    margin-top: $headerHeight;
    height: calc(100% - $headerHeight);
  }

  .mapDiv {
    background: rgba(74, 117, 124, 0.9);
    margin-top: $headerHeight;
    height: calc(100% - $headerHeight);
  }
</style>
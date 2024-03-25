<script lang="ts">
    import { onMount, onDestroy, getContext, setContext } from 'svelte';
    import L from 'leaflet';

    export let width: number;
    export let height: number;
    export let latLng: L.LatLngExpression;

    let marker: L.Marker | undefined;
    let markerElement: HTMLElement;

    const { getMap }: { getMap: () => L.Map | undefined } = getContext('map');
    const map = getMap();

    setContext('layer', {
        // L.Marker inherits from L.Layer
        getLayer: () => marker
    });

    onMount(() => {
        if (map) {
            let icon = L.divIcon({
                html: markerElement,
                className: 'map-marker',
                iconSize: L.point(width, height)
            });
            marker = L.marker(xy(latLng), { icon }).addTo(map);
        }
    });

    onDestroy(() => {
        marker?.remove();
        marker = undefined;
    });

    function xy(latLng: L.LatLngExpression) {
        return latLng;
        return L.latLng(873-([0]-(-724)), latLng[1])
    }
</script>

<div bind:this={markerElement}>
    {#if marker}
        <slot />
    {/if}
</div>
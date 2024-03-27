<script lang="ts">
    import {onMount, onDestroy, getContext, setContext} from 'svelte';
    import L, {LatLng} from 'leaflet';

    export let width: number;
    export let height: number;
    export let latLng: LatLng;
    export let isTeleport = false;
    export let isPoi = false;

    let marker: L.Marker | undefined;
    let markerElement: HTMLElement;

    const {getMap}: { getMap: () => L.Map | undefined } = getContext('map');
    const map = getMap();
    const {getTeleportLayer}: { getTeleportLayer: () => L.LayerGroup | undefined } = getContext('teleportLayer');
    const teleportLayer = getTeleportLayer();
    const {getPoiLayer}: { getPoiLayer: () => L.LayerGroup | undefined } = getContext('poiLayer');
    const poiLayer = getPoiLayer();

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
            marker = L.marker(latLng, {icon})
            if (isTeleport) {
                marker.addTo(teleportLayer);
            }
            else if (isPoi) {
                marker.addTo(poiLayer);
            }
            else {
                marker.addTo(map);
            }
        }
    });

    onDestroy(() => {
        marker?.remove();
        marker = undefined;
    });

</script>

<div bind:this={markerElement}>
    {#if marker}
        <slot/>
    {/if}
</div>
<script lang="ts">
    import teleport_pin from '$lib/images/teleport-pin.png';
    import poi_pin from '$lib/images/poi-pin.png';
    import player_pin from '$lib/images/paw-pin.png';
    import bigMap from '$lib/images/legacy-map-v3.jpg';

    import L from 'leaflet';
    import {_PointType} from "./MapPoints.js";

    export let points;
    export let showTeleports;
    export let showPointOfInterest;

    const bounds = [[ -724, -844], [873, 753]];
    let map, teleports, pois, player;

    const LeafIcon = L.Icon.extend({
        options: {
            iconSize:     [31, 46],
            iconAnchor:   [15, 39],
            popupAnchor:  [-0, -39]
        }
    });

    const teleportIcon = new LeafIcon({ iconUrl: teleport_pin }),
        poiIcon = new LeafIcon({ iconUrl: poi_pin }),
        playerIcon = new LeafIcon({ iconUrl: player_pin });

    const xy = function(x, y) {
        if (L.Util.isArray(x)) {    // When doing xy([x, y]);
            return L.latLng(x[1], 873-x[0]-(-724));
        }
        return L.latLng(873-(y-(-724)), x);  // When doing xy(x, y);
    };

    function createMap(container) {
        const mapLayer = L.imageOverlay(bigMap, bounds);

        let m = L.map(container, {
            referCanvas: true,
            crs: L.CRS.Simple,
            minZoom: -1,
            maxZoom: 2,
            layers: [ mapLayer ]
        });
        m.fitBounds(bounds);
        return m;
    }

    function createMarkerLayer(points: _PointType[], icon:any) {
        return  L.layerGroup(points.map(p => {
            return L.marker(xy(p.lat, p.long), {icon: icon}).bindPopup("<center><b>" + p.name + "</b><br><h3>" + _PointType[p.type] + "</h3><br><i>lat: " + p.lat + ", long: " + p.long + "</i></center>");
        }));
    }

    // let eye = true;
    // let lines = true;

    let toolbar = L.control({ position: 'topright' });
    // let toolbarComponent;
    toolbar.onAdd = (map) => {
         let div = L.DomUtil.create('div');
         div.innerHTML = "<button>Test</button>";
    //     toolbarComponent = new MapToolbar({
    //         target: div,
    //         props: {}
    //     });
    //
    //     toolbarComponent.$on('click-eye', ({ detail }) => eye = detail);
    //     toolbarComponent.$on('click-lines', ({ detail }) => lines = detail);
    //     toolbarComponent.$on('click-reset', () => {
    //         v3.setView(initialView, 5, { animate: true })
    //     })
    //
         return div;
    };
    //
    toolbar.onRemove = () => {
    //     if(toolbarComponent) {
    //         toolbarComponent.$destroy();
    //         toolbarComponent = null;
    //     }
    };



    function mapAction(container) {
        map = createMap(container);
        teleports = createMarkerLayer(points.filter(p => p.type == _PointType.Teleport), teleportIcon);
        pois = createMarkerLayer(points.filter(p => p.type == _PointType.POI), poiIcon);

        toolbar.addTo(map);
        map.fitBounds(bounds);

        //teleports.addTo(v3);
        //pois.addTo(v3);

        return {
            destroy: () => {
                map.remove();
                map = null;
            }
        };
    }

    // We could do these in the toolbar's click handler but this is an example
    // of modifying the v3 with reactive syntax.
    $: if(teleports && map) {
        if(showTeleports) {
            teleports.addTo(map);
        } else {
            teleports.remove();
        }
    }

    $: if(pois && map) {
        if(showPointOfInterest) {
            pois.addTo(map);
        } else {
            pois.remove();
        }
    }

    function resizeMap() {
        if(map) {
            map.invalidateSize();
            map.fitBounds(bounds);
        }
    }

    let mapWidth;
</script>

<svelte:window on:resize={resizeMap} />

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
      integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
      crossorigin=""/>
<div id="map" bind:clientWidth={mapWidth} on:resize={resizeMap} style="height:{mapWidth}px;width:100%" use:mapAction />


<style>
    .map :global(.marker-text) {
        width:100%;
        text-align:center;
        font-weight:600;
        background-color:#444;
        color:#EEE;
        border-radius:0.5rem;
    }

    .map :global(.map-marker) {
        width:30px;
        transform:translateX(-50%) translateY(-25%);
    }
</style>
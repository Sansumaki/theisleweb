<script lang="ts">
    import {onMount, onDestroy, setContext, createEventDispatcher, tick} from 'svelte';
    import L from 'leaflet';
    import 'leaflet/dist/leaflet.css';
    import bigMap from "$lib/images/legacy-map-v3.jpg";
    import portMap from "$lib/images/port.png";

    export let bounds: L.LatLngBoundsExpression | undefined = undefined;
    export let view: L.LatLngExpression | undefined = undefined;
    export let zoom: number | undefined = undefined;
    export let showTeleports: boolean | undefined = undefined;
    export let showPointOfInterest: boolean | undefined = undefined;

    const dispatch = createEventDispatcher();

    let map: L.Map | undefined;
    let teleportLayer: L.LayerGroup | undefined;
    let poiLayer: L.LayerGroup | undefined;
    let mapElement: HTMLElement;
    let menuElement: HTMLElement;

    onMount(() => {
        if (!bounds && (!view || !zoom)) {
            throw new Error('Must set either bounds, or view and zoom.');
        }

        const mapLayer = L.imageOverlay(bigMap, bounds);
        const portLayer = L.imageOverlay(portMap, [[-10, 350], [-130, 480]]);

        teleportLayer = L.layerGroup();
        poiLayer = L.layerGroup();

        map = L.map(mapElement, {
            preferCanvas: true,
            crs: L.CRS.Simple,
            minZoom: -2,
            maxZoom: 5,
            zoomSnap: 0,
            zoomDelta: 0.5,
            maxBounds: bounds,
            attributionControl: false,
            zoomControl: false,
            layers: [mapLayer, portLayer]
        })
            // example to expose map events to parent components:
            .on('zoom', (e) => dispatch('zoom', e))
            .on('popupopen', async (e) => {
                await tick();
                e.popup.update();
            });
        map.fitBounds(bounds);

        let Position = L.Control.extend({
            options: {
                position: 'bottomright'
            },

            onAdd: function (map) {
                var latlng = L.DomUtil.create('div', 'mouseposition rounded p-1 px-2');
                this._latlng = latlng;
                return latlng;
            },

            updateHTML: function (lat, lng) {
                this._latlng.innerHTML = "Latitude: " + Math.round(lng) + "   Longitiude: " + Math.round(149 - lat); // converted to isle coordinates
            }
        });

        let Menu = L.Control.extend({
            options: {
                position: 'topleft'
            },

            onAdd: function (map) {
                return menuElement;
            },
        });

        let position = new Position();
        map.addControl(position);

        map.addEventListener('mousemove', (event) => {
            let lat = Math.round(event.latlng.lat * 100000) / 100000;
            let lng = Math.round(event.latlng.lng * 100000) / 100000;
            position.updateHTML(lat, lng);
        });

        map.addControl(new Menu())
        map.addControl(new L.control.zoom())
        map.addControl(new L.control.scale())

        ajustLayers()
    });

    onDestroy(() => {
        map?.remove();
        map = undefined;
    });

    setContext('map', {
        getMap: () => map
    });
    setContext('teleportLayer', {
        getTeleportLayer: () => teleportLayer
    });
    setContext('poiLayer', {
        getPoiLayer: () => poiLayer
    });

    $: if (map) {
        if (bounds) {
            map.fitBounds(bounds);
        } else if (view && zoom) {
            map.setView(view, zoom);
        }
    }

    function ajustLayers() {
        showLayers(showTeleports, teleportLayer)
        showLayers(showPointOfInterest, poiLayer)
    }

    function showLayers(show: boolean, layer: L.LayerGroup) {
        if (show) {
            if (!map.hasLayer(layer)) {
                map.addLayer(layer)
            }
        } else {
            if (map.hasLayer(layer)) {
                map.removeLayer(layer)
            }
        }
    }

    function toggleTele() {
        showTeleports = !showTeleports;
        ajustLayers()
    }

    function togglePoi() {
        showPointOfInterest = !showPointOfInterest;
        ajustLayers()
    }

</script>

<div class="leaflet-bar leaflet-control" bind:this={menuElement}>
    <a on:click={toggleTele } role="button" title="Telepsort Locations">
        <svg width="30px" viewBox="0 0 512 512">
            {#if showTeleports}
                <path fill="#000"
                      d="M 292.812 71.113 C 217.777 71.113 144.76 155.17 129.722 258.858 C 124.376 295.715 127.082 330.088 136.153 359.09 C 133.068 353.944 130.169 348.577 127.488 342.999 C 115.007 317.027 108.878 290.485 108.597 265.67 C 99.726 294.791 102.489 331.912 119.541 367.395 C 140.472 410.951 181.172 441.243 225.232 445.71 C 229.509 446.294 233.882 446.601 238.353 446.601 C 313.387 446.601 386.407 362.545 401.444 258.856 C 408.456 210.505 401.617 166.427 384.72 133.145 C 401.06 150.71 412.345 169.922 418.434 188.967 C 418.905 164.542 407.807 136.142 385.028 112.013 C 359.549 85.026 326.671 71.12 298.131 71.27 C 296.371 71.176 294.601 71.112 292.812 71.112 L 292.812 71.113 Z M 288.58 100.316 C 318.974 100.316 344.233 116.656 360.897 143.316 C 372.924 177.764 370.35 230.318 361.638 262.082 C 349.532 306.213 330.96 339.219 301.36 363.373 C 269.782 389.144 226.969 382.964 213.799 358.717 C 212.769 356.818 211.921 354.835 211.246 352.784 C 220.106 364.078 240.103 364.788 257.958 353.83 C 277.211 342.013 286.675 321.115 279.092 307.155 C 271.508 293.191 249.752 291.454 230.497 303.268 C 223.07 307.829 217.11 313.741 213.012 320.084 C 213.396 319.044 213.8 318.003 214.24 316.968 C 200.121 336.638 195.681 358.838 204.533 375.134 C 233.779 412.022 278.638 395.621 310.887 369.973 C 339.563 347.168 365.535 310.897 378.409 263.956 C 379.364 260.47 380.234 256.987 381.029 253.508 C 380.812 255.29 380.582 257.076 380.323 258.872 C 367.622 346.44 305.957 417.427 242.591 417.427 C 215.656 417.427 192.751 404.595 176.29 383.122 C 156.27 344.247 164.208 268.995 179.822 234.402 C 200.031 189.629 229.795 135.79 281.323 140.582 C 316.104 143.817 329.003 187.681 310.89 233.933 C 304.384 250.548 294.876 265.512 283.527 277.559 C 302.351 264.226 318.831 243.72 328.543 218.924 C 346.655 172.671 333.787 127.819 298.976 125.103 C 234.189 120.045 194.969 172.131 164.816 228.306 C 157.858 244.289 152.589 260.716 148.964 277.067 C 149.338 271.096 149.957 265.026 150.849 258.872 C 163.546 171.304 225.212 100.316 288.58 100.316 Z"
                      style="" transform="matrix(1, 0, 0, 1, 0, -1.4210854715202004e-14)"></path>
            {:else}
                <path fill="#000"
                      d="M 293.481 73.588 C 295.27 73.588 297.04 73.652 298.8 73.746 C 327.34 73.596 360.218 87.502 385.697 114.489 C 408.476 138.618 419.574 167.018 419.103 191.443 C 413.014 172.398 401.729 153.186 385.389 135.621 C 402.286 168.903 409.125 212.981 402.113 261.332 C 397.906 290.343 389.16 317.817 377.101 342.343 L 361.365 326.657 C 370.777 306.741 377.615 284.631 380.992 261.348 C 381.251 259.552 381.481 257.766 381.698 255.984 C 380.903 259.463 380.033 262.946 379.078 266.432 C 373.506 286.747 365.482 305.064 355.846 321.155 L 345.249 310.591 C 352.06 296.8 357.66 281.499 362.307 264.558 C 371.019 232.794 373.593 180.24 361.566 145.792 C 344.902 119.132 319.643 102.792 289.249 102.792 C 254.056 102.792 219.387 124.688 193.341 159.16 L 177.594 143.462 C 208.68 100.845 250.753 73.589 293.481 73.589 L 293.481 73.588 Z M 239.022 449.077 C 234.551 449.077 230.178 448.77 225.901 448.186 C 181.841 443.719 141.141 413.427 120.21 369.871 C 103.158 334.388 100.395 297.267 109.266 268.146 C 109.547 292.961 115.676 319.503 128.157 345.475 C 130.838 351.053 133.737 356.42 136.822 361.566 C 127.751 332.564 125.045 298.191 130.391 261.334 C 135.372 226.991 146.713 194.802 162.381 167.107 L 177.927 182.848 C 165.009 205.993 155.659 232.789 151.518 261.348 C 150.626 267.502 150.007 273.572 149.633 279.543 C 153.258 263.192 158.527 246.765 165.485 230.782 C 172.459 217.789 179.918 205.015 188.067 193.116 L 197.578 202.747 C 191.162 213.988 185.53 225.715 180.491 236.878 C 164.877 271.471 156.939 346.723 176.959 385.598 C 193.42 407.071 216.325 419.903 243.26 419.903 C 281.792 419.903 319.696 393.654 346.342 353.389 L 361.875 369.117 C 330.283 417.473 285.031 449.077 239.022 449.077 Z M 299.645 127.579 C 334.456 130.295 347.324 175.147 329.212 221.4 C 322.443 238.683 312.385 253.882 300.538 266.02 L 297.628 263.119 C 303.112 254.918 307.829 245.935 311.559 236.409 C 329.672 190.157 316.773 146.293 281.992 143.058 C 252.836 140.347 230.648 156.406 213.217 178.973 L 205.135 170.917 C 229.503 143.047 259.719 124.462 299.645 127.579 Z M 311.556 372.449 C 279.307 398.097 234.448 414.498 205.202 377.61 C 196.35 361.314 200.79 339.114 214.909 319.444 C 214.469 320.479 214.065 321.52 213.681 322.56 C 217.779 316.217 223.739 310.305 231.166 305.744 C 250.421 293.93 272.177 295.667 279.761 309.631 C 287.344 323.591 277.88 344.489 258.627 356.306 C 240.772 367.264 220.775 366.554 211.915 355.26 C 212.59 357.311 213.438 359.294 214.468 361.193 C 227.638 385.44 270.451 391.62 302.029 365.849 C 312.584 357.236 321.737 347.498 329.694 336.53 L 338.659 345.609 C 330.167 355.952 321.008 364.932 311.556 372.449 Z"
                      style="" transform="matrix(1, 0, 0, 1, 0, -1.4210854715202004e-14)"></path>
                <line style="fill: rgb(216, 216, 216); stroke: rgb(0, 0, 0); stroke-width: 24px; stroke-linecap: round; transform-origin: 253.693px 271.447px;"
                      x1="110.252" y1="124.533" x2="397.135" y2="418.361"
                      transform="matrix(-1, 0, 0, -1, 0.000061035156, 0)"></line>
            {/if}
        </svg>
    </a>
    <a on:click={togglePoi} role="button" title="Points of Interest">
        <svg viewBox="0 0 100 100">
            {#if showPointOfInterest}
                <path fill="#000"
                      d="M 49.265 11.728 C 37.535 11.728 27.921 21.313 27.921 33.012 C 27.921 37.544 29.368 41.757 31.819 45.219 L 46.661 70.878 C 48.739 73.593 50.121 73.077 51.849 70.734 L 68.219 42.876 C 68.55 42.278 68.81 41.64 69.036 40.99 C 70.075 38.459 70.609 35.748 70.609 33.012 C 70.609 21.313 60.998 11.728 49.265 11.728 Z M 49.265 21.7 C 55.583 21.7 60.607 26.713 60.607 33.012 C 60.607 39.31 55.583 44.32 49.265 44.32 C 42.948 44.32 37.923 39.311 37.923 33.012 C 37.923 26.713 42.948 21.701 49.265 21.701 L 49.265 21.7 Z"
                      style=""></path>
                <path fill="#000"
                      d="M 37.79 61.273 C 27.655 62.705 20.567 66.13 20.567 71.173 C 20.567 77.966 32.411 83.473 49.264 83.473 C 66.119 83.473 77.963 77.966 77.963 71.173 C 77.963 66.13 70.875 62.705 60.741 61.273 L 59.337 63.663 C 66.975 64.723 72.223 66.95 72.223 69.534 C 72.223 73.157 61.945 76.094 49.264 76.094 C 36.585 76.094 26.307 73.157 26.307 69.534 C 26.306 66.958 31.52 64.733 39.181 63.67 C 38.718 62.87 38.252 62.073 37.789 61.273 L 37.79 61.273 Z"
                      style=""></path>
            {:else}
                <path fill="#000"
                      d="M 70.524 32.957 C 70.524 35.693 69.99 38.404 68.951 40.935 C 68.725 41.585 68.465 42.223 68.134 42.821 L 59.954 56.741 L 44.189 43.135 C 45.691 43.86 47.383 44.265 49.18 44.265 C 55.498 44.265 60.522 39.255 60.522 32.957 C 60.522 26.658 55.498 21.645 49.18 21.645 L 49.18 21.646 C 42.863 21.646 37.838 26.658 37.838 32.957 C 37.838 35.33 38.551 37.52 39.778 39.328 L 28.155 29.297 C 29.91 19.323 38.7 11.673 49.18 11.673 C 60.913 11.673 70.524 21.258 70.524 32.957 Z M 51.764 70.679 C 50.036 73.022 48.654 73.538 46.576 70.823 L 31.734 45.164 C 29.674 42.255 28.324 38.815 27.945 35.101 L 57.451 61.001 Z"
                      style=""></path>
                <path fill="#000"
                      d="M 37.705 61.218 C 37.705 61.218 37.704 61.218 37.704 61.218 C 37.704 61.218 37.704 61.218 37.704 61.218 Z M 37.704 61.218 C 38.167 62.018 38.633 62.815 39.096 63.615 C 31.435 64.678 26.221 66.903 26.222 69.479 C 26.222 73.102 36.5 76.039 49.179 76.039 C 58.552 76.039 66.612 74.434 70.18 72.134 L 75.16 76.506 C 70.734 80.599 61.239 83.418 49.179 83.418 C 32.326 83.418 20.482 77.911 20.482 71.118 C 20.482 66.075 27.57 62.65 37.704 61.218 Z M 59.252 63.608 L 59.665 62.905 L 60.72 63.831 C 60.241 63.752 59.752 63.677 59.252 63.608 Z M 77.878 71.118 C 77.878 71.448 77.85 71.776 77.795 72.099 L 66.505 62.356 C 73.413 64.132 77.878 67.116 77.878 71.118 Z"
                      style=""></path>
                <line style="fill: rgb(216, 216, 216); stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-width: 6px;"
                      x1="15.537" y1="26.174" x2="79.458" y2="81.847"></line>
            {/if}
        </svg>
    </a>
</div>

<div class="absolute w-full h-full backgroundDiv"></div>
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

  :global(.mouseposition),
  :global(.leaflet-control-scale-line):not(:first-child),
  :global(.leaflet-control-scale-line) {
    background: #749053;
    color: #000000;
    text-shadow: none;
    border: 1px solid black;
  }

  :global(.leaflet-bar) :global(a) {
    background-color: #749053;
    color: #000000;
    border-bottom: 1px solid black;
  }
  :global(.leaflet-bar) :global(a):hover,
  :global(.leaflet-bar) :global(a):focus {
    background-color: #aad07b;
  }

</style>
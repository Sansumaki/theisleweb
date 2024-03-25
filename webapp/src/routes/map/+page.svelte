<script lang="ts">
    import type {LatLngExpression} from 'leaflet';
    import Leaflet from '$lib/leaflet/Leaflet.svelte';
    import Marker from '$lib/leaflet/Marker.svelte';
    import Popup from '$lib/leaflet/Popup.svelte';
    import pandasiaStore, {type IsleMap, type PoiLocation, type TeleportLocation} from "$lib/stores/pandasia.store.js";
    import {onMount} from "svelte";

    let _mapBounds = [[-724, -844], [873, 753]]
    let _teleportLocations: TeleportLocation[] = [];
    let _poiLocations: PoiLocation[] = [];
    let _mapList: IsleMap[];

    export let data;
    let showTeleports = data.showTeleport;
    let showPointOfInterest = data.showPoi;
    let selectedMap = data.selectedMap;

    onMount(() => {
        pandasiaStore.subscribeMapData(mapData => {
           _teleportLocations = mapData?.teleportPoints ?? [];
           _poiLocations = mapData?.POI ?? [];
        });
        pandasiaStore.subscribeMapList(maps => {
            _mapList = maps;
            if (selectedMap == undefined && _mapList.length > 0) {
                selectedMap = _mapList[0].Key;
                pandasiaStore.requestMapData(selectedMap)
            }
        });

        pandasiaStore.requestMapList()
        if (selectedMap != undefined) {
            pandasiaStore.requestMapData(selectedMap)
        }
    });

    function LocationToLatLng(location: TeleportLocation): LatLngExpression {
        return [Math.round(location.Location_X / 1000), Math.round(location.Location_Y / 1000)];
    }

    function CorrectedLatLng(location: TeleportLocation): LatLngExpression {
        let latLng = LocationToLatLng(location);
        return [873 - (latLng[1] + 724), latLng[0]];
    }

</script>

<div class="w-full h-screen absolute left-0 top-0">
    <Leaflet bounds={_mapBounds}>
        {#if _teleportLocations.length > 0 && showTeleports}
            {#each _teleportLocations as location, index}
                <Marker latLng={CorrectedLatLng(location)} width={40} height={40}>
                    <svg width="40px" viewBox="0 0 512 512">
                        <ellipse style="fill: rgb(44,118,255); stroke: rgb(255,242,0);" fill-opacity="0.5" cx="250" cy="250" rx="250" ry="250" transform="matrix(1, 0, 0, 1, -5.551115123125783e-17, -7.105427357601002e-15)"></ellipse>
                        <path fill="#FFF200" d="M 293.812 68.113 C 218.777 68.113 145.76 152.17 130.722 255.858 C 125.376 292.715 128.082 327.088 137.153 356.09 C 134.068 350.944 131.169 345.577 128.488 339.999 C 116.007 314.027 109.878 287.485 109.597 262.67 C 100.726 291.791 103.489 328.912 120.541 364.395 C 141.472 407.951 182.172 438.243 226.232 442.71 C 230.509 443.294 234.882 443.601 239.353 443.601 C 314.387 443.601 387.407 359.545 402.444 255.856 C 409.456 207.505 402.617 163.427 385.72 130.145 C 402.06 147.71 413.345 166.922 419.434 185.967 C 419.905 161.542 408.807 133.142 386.028 109.013 C 360.549 82.026 327.671 68.12 299.131 68.27 C 297.371 68.176 295.601 68.112 293.812 68.112 L 293.812 68.113 Z M 289.58 97.316 C 319.974 97.316 345.233 113.656 361.897 140.316 C 373.924 174.764 371.35 227.318 362.638 259.082 C 350.532 303.213 331.96 336.219 302.36 360.373 C 270.782 386.144 227.969 379.964 214.799 355.717 C 213.769 353.818 212.921 351.835 212.246 349.784 C 221.106 361.078 241.103 361.788 258.958 350.83 C 278.211 339.013 287.675 318.115 280.092 304.155 C 272.508 290.191 250.752 288.454 231.497 300.268 C 224.07 304.829 218.11 310.741 214.012 317.084 C 214.396 316.044 214.8 315.003 215.24 313.968 C 201.121 333.638 196.681 355.838 205.533 372.134 C 234.779 409.022 279.638 392.621 311.887 366.973 C 340.563 344.168 366.535 307.897 379.409 260.956 C 380.364 257.47 381.234 253.987 382.029 250.508 C 381.812 252.29 381.582 254.076 381.323 255.872 C 368.622 343.44 306.957 414.427 243.591 414.427 C 216.656 414.427 193.751 401.595 177.29 380.122 C 157.27 341.247 165.208 265.995 180.822 231.402 C 201.031 186.629 230.795 132.79 282.323 137.582 C 317.104 140.817 330.003 184.681 311.89 230.933 C 305.384 247.548 295.876 262.512 284.527 274.559 C 303.351 261.226 319.831 240.72 329.543 215.924 C 347.655 169.671 334.787 124.819 299.976 122.103 C 235.189 117.045 195.969 169.131 165.816 225.306 C 158.858 241.289 153.589 257.716 149.964 274.067 C 150.338 268.096 150.957 262.026 151.849 255.872 C 164.546 168.304 226.212 97.316 289.58 97.316 Z" style="" transform="matrix(1, 0, 0, 1, -5.551115123125783e-17, -7.105427357601002e-15)"></path>
                    </svg>
                    <Popup>
                        <b class="text-lg">{location.Name}</b><br>
                        <i class="text-xs">Teleport Location</i><br>
                        <span>lat: {LocationToLatLng(location)[0]}, long: {LocationToLatLng(location)[1]}</span>
                    </Popup>
                </Marker>
            {/each}
        {/if}
        {#if _poiLocations.length > 0 && showPointOfInterest}
            {#each _poiLocations as location, index}
                <Marker latLng={CorrectedLatLng(location)} width={40} height={40}>
                    <svg width="40px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--gis" preserveAspectRatio="xMidYMid meet">
                        <path fill="#ff0000" d="M50.001 0C33.65 0 20.25 13.36 20.25 29.666c0 6.318 2.018 12.19 5.433 17.016L46.37 82.445c2.897 3.785 4.823 3.066 7.232-.2l22.818-38.83c.46-.834.822-1.722 1.137-2.629a29.28 29.28 0 0 0 2.192-11.12C79.75 13.36 66.354 0 50.001 0zm0 13.9c8.806 0 15.808 6.986 15.808 15.766c0 8.78-7.002 15.763-15.808 15.763c-8.805 0-15.81-6.982-15.81-15.763c0-8.78 7.005-15.765 15.81-15.765z"></path>
                        <path fill="#990000" d="M68.913 48.908l-.048.126c.015-.038.027-.077.042-.115l.006-.011z"></path>
                        <path fill="#aa0000" d="M34.006 69.057C19.88 71.053 10 75.828 10 82.857C10 92.325 26.508 100 50 100s40-7.675 40-17.143c0-7.029-9.879-11.804-24.004-13.8l-1.957 3.332C74.685 73.866 82 76.97 82 80.572c0 5.05-14.327 9.143-32 9.143c-17.673 0-32-4.093-32-9.143c-.001-3.59 7.266-6.691 17.945-8.174c-.645-1.114-1.294-2.226-1.94-3.341z"></path>
                    </svg>
                    <Popup>
                        <b class="text-lg">{location.Name}</b><br>
                        <i class="text-xs">{location.Description}</i><br>
                        <i>lat: {LocationToLatLng(location)[0]}, long: {LocationToLatLng(location)[1]}</i>
                    </Popup>
                </Marker>
            {/each}
        {/if}
    </Leaflet>
</div>
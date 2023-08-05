<script lang="ts">
    import bigMap from '$lib/images/legacy-map-v3.jpg';
    import smallMap from '$lib/images/legacy-map-v3-small.jpg';
    import {page} from '$app/stores';
    import {afterNavigate, goto} from '$app/navigation';
    import type {_Point} from "./MapPoints";
    import {_PointType} from "./MapPoints";
    import {enhance} from '$app/forms';

    export let data;
    let showTeleports = data.showTeleport;
    let showPointOfInterest = data.showPoi;
    const {points} = data;

    const borders = {latMin: -844, latMax: 753, longMin: -724, longMax: 873}
    const borderSize = {
        width: Math.abs(borders.latMin - borders.latMax),
        height: Math.abs(borders.longMin - borders.longMax)
    }
    const locale = "de-DE";

    afterNavigate(() => {
        if ($page.url.searchParams.has('lat') && $page.url.searchParams.has('long')) {
            let lat = Number($page.url.searchParams.get('lat'));
            let long = Number($page.url.searchParams.get('long'));
            player = {type: _PointType.Player, name: "Player", lat, long};
            input = {lat, long};
        } else {
            player = null;
            input = {lat: null, long: null};
        }
    })

    let map = {width: 0, height: 0};
    let mouse: { x: number; y: number } | null = null;
    let currentPOI: _Point | null = null;

    let player: _Point | null = null;
    let input: { lat: number | null, long: number | null } = {lat: null, long: null};
    $: setPossible = (player?.lat != input.lat || player?.long != input.long) && input.lat != null && input.long != null;
    $: sharePossible = !setPossible && input.lat != null && input.long != null;

    $: filteredPoints = points.filter(x => x.type == _PointType.Teleport && showTeleports || x.type == _PointType.POI && showPointOfInterest);

    $: mouseCoordinates = {
        lat: ((mouse?.x ?? 20) / map.width * borderSize.width + borders.latMin).toLocaleString(locale, {
            maximumFractionDigits: 0,
            minimumFractionDigits: 0
        }),
        long: ((mouse?.y ?? 20) / map.height * borderSize.height + borders.longMin).toLocaleString(locale, {
            maximumFractionDigits: 0,
            minimumFractionDigits: 0
        })
    }

    function LatToX(lat: number, mapWidth: number): number {
        return mapWidth * (lat - borders.latMin) / borderSize.width;
    }

    function LongToY(long: number, mapHeight: number): number {
        return mapHeight * (long - borders.longMin) / borderSize.height;
    }

    function enterInput(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            gotoMap(null);
        }
    }

    function gotoMap(_: any) {
        if (input.lat != null && input.long != null) {
            goto("./map?lat=" + input.lat + "&long=" + input.long, {noScroll: true, keepFocus: true});
        }
    }

    function clearMap(_: any) {
        goto("./map", {noScroll: true});
    }

    function copyMapUrlToClipboard(_: any) {
        navigator.clipboard.writeText($page.url.href);
    }

    function showForm() {
        let formData = new FormData();
        formData.append('showTeleport', showTeleports ? 'on' : 'off');
        formData.append('showPoi', showPointOfInterest ? 'on' : 'off');
        fetch('?/saveShowFlags', {method: 'POST', body: formData});
    }

</script>

<div class="box">
    <div class="toggle-buttons">
        <div>
            <label for="lat">Lat:</label>
            <input type="number" id="lat" name="lat" placeholder="-21" bind:value="{input.lat}" on:keydown={enterInput}
                   required>
        </div>
        <div>
            <label for="long">Long:</label>
            <input type="number" id="long" name="long" placeholder="134" bind:value="{input.long}"
                   on:keydown={enterInput} required>
        </div>
        <div>
            <button type="reset" on:click={clearMap}>Clear</button>
        </div>
        <div>
            <button type="submit" style:display="{setPossible ? 'block' : 'none'}" on:click={gotoMap}>Set the Point
            </button>
            <button type="button" style:display="{sharePossible ? 'block' : 'none'}" on:click={copyMapUrlToClipboard}>
                Share
            </button>
        </div>
        <div>
            <button>Ctrl + V</button>
        </div>
    </div>
</div>

<div class="toggle-buttons box">
    <div>
        <input type="checkbox" id="showTeleport" name="showTeleport" class="toggle"
               bind:checked={showTeleports}
               on:change={() => showForm()}/>
        <label for="showTeleport">Show Teleports</label>
    </div>

    <div>
        <input type="checkbox" id="showPoi" name="showPoi" class="toggle"
               bind:checked={showPointOfInterest}
               on:change={() => showForm()}/>
        <label for="showPoi">Show Point of Interest</label>
    </div>
</div>
<div role="img" class="map box"
     bind:clientWidth={map.width} bind:clientHeight={map.height}>
        <span class="cursor-position"
              style:top="{mouse?.y}px"
              style:left="{mouse?.x}px"
              style:display="{mouse!= null ? 'block' : 'none'}">
            lat: {mouseCoordinates.lat}, long: {mouseCoordinates.long}
        </span>
    <div class="poi"
         style:display="{currentPOI!=null?'block':'none'}"
         style:left="{LatToX(currentPOI?.lat ?? 0, map.width)}px"
         style:top="{LongToY(currentPOI?.long ?? 0, map.height)}px"
         style:background="{currentPOI?.type === _PointType.POI ? 'rgba(255,241,211,0.8)' : currentPOI?.type === _PointType.Teleport ? 'rgba(227,185,185,0.8)' : 'rgba(172,191,224,0.8)'}"
    >
        <h2>{currentPOI?.name}</h2>
        <h3>{_PointType[currentPOI?.type ?? _PointType.POI]}</h3>
        <i>lat: {currentPOI?.lat}, long: {currentPOI?.long}</i>
    </div>
    <picture data-map-name="v3" role="img"
             on:mousemove={(e) => mouse = { x: e.offsetX, y: e.offsetY } }
             on:mouseleave={() => mouse = null}>
        <source media="(min-width:1200px)" srcset={bigMap}>
        <img src={smallMap} alt="map-v3">
    </picture>
    {#if map.height > 0 && map.width > 0}
        <ul class="map_markers">
            {#each filteredPoints as point}
                <li class="map_marker"
                    on:mouseenter={() => currentPOI = point }
                    on:mouseleave={() => currentPOI = null }
                    style:left="{LatToX(point.lat, map.width)}px"
                    style:top="{LongToY(point.long, map.height)}px"
                    style:color="{point.type === _PointType.POI ? '#ffc802' : point.type === _PointType.Teleport ? '#e74646' : '#2e84ea'}">
                    <i class="mi-location"></i>
                </li>
            {/each}
            {#if player != null}
                <li class="map_marker"
                    on:mouseenter={() => currentPOI = player }
                    on:mouseleave={() => currentPOI = null }
                    style:left="{LatToX(player.lat, map.width)}px"
                    style:top="{LongToY(player.long, map.height)}px"
                    style:color="{player.type === _PointType.POI ? '#ffc802' : player.type === _PointType.Teleport ? '#e74646' : '#2e84ea'}">
                    <i class="mi-location"></i>
                </li>
            {/if}
        </ul>
    {/if}
</div>

<style>

    .map {
        position: relative;
        display: block;
        z-index: 1;
        padding: 0;

        & .poi, .cursor-position {
            position: absolute;
            padding: 0 5px;
            border-radius: 15px;
            background-color: rgba(255, 255, 255, 0.8);
            color: #212121;
            white-space: nowrap;
            font-size: 12px;
            text-align: center;
        }

        & .poi {
            z-index: 10000;
            min-width: 200px;
            min-height: 50px;
            margin-left: -100px;
            padding: 5px;
        }

        & .cursor-position {
            z-index: 1000;
            pointer-events: none;
            margin-top: 10px;
            white-space: nowrap;
            font-size: 12px;
            text-align: center;
            min-width: 115px;
            margin-left: -58px;
        }

        & .cursor-position:after {
            content: '';
            position: absolute;
            bottom: 100%;
            left: 50%;
            margin-left: -10px;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 0 5px 6px 5px;
            border-color: transparent transparent rgba(255, 255, 255, 0.8) transparent;
        }

        & picture {
            position: relative;
            width: 100%;

            & img, & source {
                width: 100%;
            }
        }

        & ul, & li {
            margin: 0;
            padding: 0;
        }

        & .map_markers {
            list-style: none;
        }

        & .map_marker {
            position: absolute;
            cursor: pointer;
            background: red;
        }

        & .map_marker > i {
            position: absolute;
            text-shadow: #000 1px 0 10px;
            bottom: 100%;
            left: 50%;
            font-size: 2.5em;
            width: 1em;
            height: 1em;
            margin-left: -0.5em;
        }
    }

    @media (max-width: 600px) {
        .box {
            border-left: 0;
            border-right: 0;
        }

        .map_marker > i {
            font-size: 1.5em !important;
        }
    }

    .toggle-buttons {
        display: flex;
        flex-direction: row;

        & div {
            margin: 0.25em 1em 0.25em 0;
        }

        & div:last-of-type {
            margin-right: 0;
        }
    }

    @media (max-width: 600px) {
        .toggle-buttons {
            flex-direction: column;
        }
    }
</style>
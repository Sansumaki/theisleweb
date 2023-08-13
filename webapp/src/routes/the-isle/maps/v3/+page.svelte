<script lang="ts">
    import bigMap from '$lib/images/legacy-map-v3.jpg';
    import smallMap from '$lib/images/legacy-map-v3-small.jpg';
    import {page} from '$app/stores';
    import {afterNavigate, goto} from '$app/navigation';
    import type {_Point} from "./MapPoints.js";
    import {_PointType} from "./MapPoints.js";
    import {Button, FloatingLabelInput, Heading, Hr, Popover, Toggle} from "flowbite-svelte";
    import {Icon} from "flowbite-svelte-icons";

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

    let player: _Point | null = null;
    let input: { lat: number | null, long: number | null } = {lat: null, long: null};
    $: setPossible = (player?.lat != input.lat || player?.long != input.long) && input.lat != null && input.long != null;
    $: sharePossible = !setPossible;

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

    function gotoMap(_: any) {
        if (input.lat != null && input.long != null) {
            goto($page.url.pathname + "?lat=" + input.lat + "&long=" + input.long, {noScroll: true, keepFocus: true});
        }
    }

    function clearMap(_: any) {
        goto($page.url.pathname, {noScroll: true});
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

    function pasteCoordinates() {
        navigator.clipboard.readText().then((value: string) => {
            let match = value.match('Lat: ([\-0-9]+)\..+Long: ([\-0-9]+)\.');
            if (match?.length === 3) {
                input = {
                    lat: Number(match[1]),
                    long: Number(match[2])
                };
                gotoMap(null);
            } else {
                console.log("no coordinates found to paste");
            }
        });
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.ctrlKey && event.key === "v" || event.key === "V") {
            pasteCoordinates();
        }
    }

    let mapWidth = 100;

</script>

<svelte:window on:keydown={handleKeydown}/>

<Heading tag="h4" class="mb-4">The Isle V3 Map</Heading>

<form action="{$page.url.pathname}" method="get" class="grid gap-4 items-end md:grid-cols-8" data-sveltekit-noscroll
      data-sveltekit-keepfocus>
    <Button color="green" class="col-span-2" on:click={pasteCoordinates}>
        <Icon name="map-pin-outline"/>
        <p class="pl-2 text-xs">Ctrl + V</p>
    </Button>
    <div class="col-span-2 text-left">
        <FloatingLabelInput id="lat" name="lat" type="number" label="Lat" required min="{borders.latMin}"
                            max="{borders.latMax}" bind:value={input.lat}/>
    </div>
    <div class="col-span-2 text-left">
        <FloatingLabelInput id="long" name="long" type="number" label="Long" required min="{borders.longMin}"
                            max="{borders.longMax}" bind:value={input.long}/>
    </div>

    <Button color="primary" class="{!setPossible ? 'hidden' :''}" type="submit">
        <Icon name="map-pin-outline"/>
        <p class="pl-2 text-xs">Show</p>
    </Button>
    <Button color="primary" class="{!sharePossible ? 'hidden' :''}" on:click={copyMapUrlToClipboard}>
        <Icon name="share-nodes-outline"/>
        <p class="pl-2 text-xs">Share</p>
    </Button>

    <Button outline color="red" on:click={clearMap}>
        <Icon name="close-solid"/>
        <p class="pl-2 text-xs">Clear</p>
    </Button>
</form>
<Hr divClass="my-4 md:my-4"></Hr>
<div class="grid gap-4 items-end mb-6 md:grid-cols-2">
    <Toggle bind:checked={showTeleports} on:change={() => showForm()}>Show Teleports</Toggle>
    <Toggle bind:checked={showPointOfInterest} on:change={() => showForm()}>Show Point of Interest</Toggle>
</div>

<div role="img" class="m-auto p-0 block" id="map_area"
     style:width="{mapWidth}%"
     bind:clientWidth={map.width} bind:clientHeight={map.height}>
    <div class:hidden={mouse == null}
         class="bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-lg border border-gray-200
                 divide-gray-200 dark:divide-gray-700 pointer-events-none
                 shadow-md dark:!border-gray-600 w-32 -ml-16 mt-[5px] font-light z-20 text-xs absolute"
         style:top="{mouse?.y}px"
         style:left="{mouse?.x}px">
        <div class="py-2 px-3">lat: {mouseCoordinates.lat}, long: {mouseCoordinates.long}</div>
        <div class="absolute pointer-events-none block w-[10px] h-[10px] rotate-45 bg-inherit border-inherit border-t border-l left-16 -ml-[5px]"
             style=" top: -6px;"></div>
    </div>
    <picture data-map-name="v3" role="img" class="relative w-full"
             on:mousemove={(e) => mouse = { x: e.offsetX, y: e.offsetY } }
             on:mouseleave={() => mouse = null}>
        <source class="w-full" media="(min-width:1200px)" srcset={bigMap}>
        <img class="w-full" src={smallMap} alt="map-v3">
    </picture>
    {#if map?.height > 0 && map?.width > 0}
        {#each filteredPoints as point, index}
            <button id="marker_{index}" class="-ml-3 -mt-6 absolute" size="lg"
                    style:left="{LatToX(point.lat, map.width)}px"
                    style:top="{LongToY(point.long, map.height)}px"
                    style:color="{point.type === _PointType.POI ? '#ffc802' : point.type === _PointType.Teleport ? '#e74646' : '#2e84ea'}">
                <Icon name="map-pin-solid" class="marker_img !outline-none" size="lg" tabindex="-1"/>
            </button>
            <Popover class="w-64 text-sm font-light z-20" triggeredBy="#marker_{index}" title="{point.name}"
                     placement="bottom">
                <h3>{_PointType[point.type]}</h3>
                <i>lat: {point.lat}, long: {point.long}</i>
            </Popover>
        {/each}
        {#if player != null}
            <button id="marker_p" class="-ml-4 -mt-8 absolute" size="lg"
                    style:left="{LatToX(player.lat, map.width)}px"
                    style:top="{LongToY(player.long, map.height)}px"
                    style:color="{'#2e84ea'}">
                <Icon name="map-pin-outline" class="marker_img !outline-none" size="xl" tabindex="-1"/>
            </button>
            <Popover class="w-64 text-sm font-light z-20" triggeredBy="#marker_p" title="Player" placement="bottom">
                <i>lat: {player.lat}, long: {player.long}</i>
            </Popover>
        {/if}
    {/if}
</div>

<style lang="scss">
  :global(.marker_img) {
    filter: drop-shadow(5px 2px 10px rgb(0 0 0 / 1)) drop-shadow(0px -5px 5px rgb(0 0 0/ 0.5));
  }
</style>
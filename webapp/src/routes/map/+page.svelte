<script lang="ts">
    import bigMap from '$lib/images/legacy-map-v3.jpg';
    import smallMap from '$lib/images/legacy-map-v3-small.jpg';
    import {page} from '$app/stores';
    import {afterNavigate, goto} from '$app/navigation';
    import type {_Point} from "./MapPoints";
    import {_PointType} from "./MapPoints";
    import Text from "$lib/components/Text.svelte";
    import {Button, Card, FloatingLabelInput, Heading, Hr, Kbd, Label, Range, Toggle} from "flowbite-svelte";
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

    function pasteCoordinates(event: mouseEvent) {
        navigator.clipboard.readText().then((value: string) => {
            let match = value.match('Lat: ([\-0-9]+)\..+Long: ([\-0-9]+)\.');
            if (match?.length === 3) {
                input = {lat: match[1], long: match[2]};
                gotoMap(null);
            } else {
                console.log("no coordinates found to paste");
            }
        });
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.ctrlKey && event.key === "v" || event.key === "V") {
            pasteCoordinates(null);
        }
    }

    function mapMouseWheel(event: WheelEvent){
        if (event.deltaY > 0 && mapWidth > 20)
        {
            mapWidth = Math.max(mapWidth - 5, 20);
            event.preventDefault();
        }
        if (event.deltaY < 0 && mapWidth < 100)
        {
            mapWidth = Math.min(mapWidth + 5, 100);
            event.preventDefault();
        }
    }

    let form;
    let mapWidth = 100;

</script>

<svelte:window on:keydown={handleKeydown}/>

<Card class="text-center" size="xl">
    <Heading>The Isle V3 Map</Heading>
    <Text elementName="h1">The Isle V3 Map</Text>

    <form action="./map" method="get" class="grid gap-4 items-end md:grid-cols-12" data-sveltekit-noscroll
          data-sveltekit-keepfocus>
        <Button color="primary" class="p-1.5" on:click={pasteCoordinates}>
            <Kbd class='px-2 py-1.5'>ctrl</Kbd> + <Kbd class='px-2 py-1.5'>V</Kbd>
        </Button>
        <div class="col-span-4 text-left">
            <FloatingLabelInput id="lat" name="lat" type="number" label="Lat" required min="{borders.latMin}"
                                max="{borders.latMax}" bind:value={input.lat}/>
        </div>
        <div class="col-span-4 text-left">
            <FloatingLabelInput id="long" name="long" type="number" label="Long" required min="{borders.longMin}"
                                max="{borders.longMax}" bind:value={input.long}/>
        </div>

        <Button color="primary" type="submit">Show</Button>
        <Button color="primary" on:click={copyMapUrlToClipboard}>Share</Button>

        <Button outline color="red" on:click={clearMap}>
            <Icon name="close-solid"/>
        </Button>
    </form>
    <Hr divClass="my-4 md:my-4"></Hr>
    <form action="./map" method="post" bind:this={form} class="grid gap-4 items-end mb-6 md:grid-cols-2"
          data-sveltekit-noscroll
          data-sveltekit-keepfocus>
        <Toggle bind:checked={showTeleports} on:change={() => showForm()}>Show Teleports</Toggle>
        <Toggle bind:checked={showPointOfInterest} on:change={() => showForm()}>Show Point of Interest</Toggle>
    </form>
    <Label>Map Size {mapWidth}%</Label>
    <Range id="range1" bind:value={mapWidth} min="20" max="100" />
</Card>

<Card class="text-center" size="xl">
<div role="img" class="map box" style:width="{mapWidth}%" on:mousewheel={mapMouseWheel}
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
</Card>

<style lang="scss">

  .map {

    position: relative;
    margin: auto;
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

    @media (max-width: 600px) {
      .map_marker > i {
        font-size: 1.5em !important;
      }
    }
  }

</style>
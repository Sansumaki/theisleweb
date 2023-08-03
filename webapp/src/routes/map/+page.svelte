<script lang="ts">
    import bigMap from '$lib/images/legacy-map-v3.jpg';
    import smallMap from '$lib/images/legacy-map-v3-small.jpg';

    interface Point {
        type: PointType;
        name: string;
        lat: number;
        long: number;
    }

    enum PointType {
        POI,
        Teleport,
        Player
    }

    const borders = {latMin: -844, latMax: 753, longMin: -724, longMax: 873}
    const borderSize = {
        width: Math.abs(borders.latMin - borders.latMax),
        height: Math.abs(borders.longMin - borders.longMax)
    }
    const locale = "de-DE";

    let showTeleports: boolean = true;
    let showPointOfInterest: boolean = true;

    let map = {width: 0, height: 0};
    let mouse: { x: number; y: number } | null = null;
    let currentPOI: Point | null = null;

    let points: Point[] = [
        {type: PointType.POI, name: "Center", lat: 0, long: 0},
        {type: PointType.POI, name: "Aviary", lat: -25, long: 280},
        {type: PointType.Teleport, name: "Great Falls", lat: -234, long: 527},
        {type: PointType.Teleport, name: "North Twins", lat: -468, long: -232},
        {type: PointType.Teleport, name: "South Twins", lat: -489, long: -137},
        {type: PointType.Teleport, name: "Ports", lat: 446, long: 204},
        {type: PointType.Teleport, name: "Hidden", lat: 393, long: 55},
        {type: PointType.Teleport, name: "Murky Pond", lat: 319, long: -111},
        {type: PointType.Teleport, name: "Hot Springs", lat: 131, long: -353},
        {type: PointType.Teleport, name: "Ocean Falls", lat: 23, long: -485},
        {type: PointType.Teleport, name: "Northernmost", lat: -134, long: -463},
        {type: PointType.Teleport, name: "The Damn", lat: 26, long: -158},
        {type: PointType.Teleport, name: "Dump/Ravine", lat: -286, long: -252},
        {type: PointType.Teleport, name: "Cargo Pond", lat: -507, long: -48},
        {type: PointType.Teleport, name: "Gulf Pond", lat: -493, long: 208},
        {type: PointType.Teleport, name: "Western Pond", lat: -694, long: 249},
        {type: PointType.Teleport, name: "Puddle Pond", lat: -457, long: 387},
        {type: PointType.Teleport, name: "The Wash", lat: -359, long: 328},
        {type: PointType.Teleport, name: "Sewer Pond", lat: -261, long: 299},
        {type: PointType.Teleport, name: "Lazy River", lat: -151, long: 470},
        {type: PointType.Teleport, name: "East Swamp", lat: 178, long: 66},
        {type: PointType.Teleport, name: "Middle Swamp", lat: -16, long: 76},
        {type: PointType.Teleport, name: "West Swamp", lat: -113, long: 39},
        {type: PointType.Teleport, name: "Canyon Pond", lat: -40, long: 165},
        {type: PointType.Player, name: "Player", lat: -204, long: 118},
    ]

    $: filteredPoints = points.filter(x => x.type == PointType.Teleport && showTeleports || x.type == PointType.POI && showPointOfInterest);

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
</script>

<section>
    <h1>Map</h1>
    <div class="toggle-buttons box">
        <div>
            <input type="checkbox" class="toggle" bind:checked={showTeleports} id="showTeleports"/>
            <label for="showTeleports">Show Teleports</label>
        </div>

        <div>
            <input type="checkbox" class="toggle" bind:checked={showPointOfInterest} id="showPointOfInterest"/>
            <label for="showPointOfInterest">Show Point of Interest</label>
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
             style:background="{currentPOI?.type === PointType.POI ? 'rgba(255,241,211,0.8)' : currentPOI?.type === PointType.Teleport ? 'rgba(227,185,185,0.8)' : 'rgba(172,191,224,0.8)'}"
        >
            <h2>{currentPOI?.name}</h2>
            <h3>{PointType[currentPOI?.type ?? PointType.POI]}</h3>
            <i>lat: {currentPOI?.lat}, long: {currentPOI?.long}</i>
        </div>
        <picture data-map-name="v3" role="img"
                 on:mousemove={(e) => mouse = { x: e.offsetX, y: e.offsetY } }
                 on:mouseleave={() => mouse = null}>
            <source media="(min-width:1200px)" srcset={bigMap}>
            <img src={smallMap} alt="map-v3">
        </picture>
        <ul class="map_markers">
            {#each filteredPoints as point}
                <li class="map_marker"
                    on:mouseenter={() => currentPOI = point }
                    on:mouseleave={() => currentPOI = null }
                    style:left="{LatToX(point.lat, map.width)}px"
                    style:top="{LongToY(point.long, map.height)}px"
                    style:color="{point.type === PointType.POI ? '#ffc802' : point.type === PointType.Teleport ? '#e74646' : '#2e84ea'}">
                    <i class="mi-location"></i>
                </li>
            {/each}
        </ul>
    </div>
</section>

<style>
    section {
        width: 100%;
    }

    .box {
        box-sizing: border-box;
        border-color: var(--color-bg-1);
        border-width: 0 1em 0.5em 1em;
        border-style: solid;
        padding: 0.75em;
        background: var(--color-bg-2);
        width: 100%;
        margin: 0;
    }

    .box:first-of-type {
        border-top-width: 1em;
        border-radius: 1em 1em 0 0;
    }


    .box:last-of-type {
        border-bottom-width: 1em;
        border-radius: 0 0 1em 1em;
    }

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
            margin:  0.25em 1em  0.25em 0;
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
<svelte:head>
    <link rel="stylesheet" href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css">
</svelte:head>

<script>
    import bigMap from '$lib/images/legacy-map-v3.jpg';
    import smallMap from '$lib/images/legacy-map-v3-small.jpg';

    let showPosition = false;
    let m = {x: 0, y: 0};
    let map = {w: 0, h: 0};

    $: ma = {x: 100 / map.w * m.x, y: 100 / map.h * m.y}
    $: displayPosition = showPosition ? 'block' : 'none';
</script>

<section>
    <h1>Map</h1>
    <div role="img" class="map">
        <span class="cursor-position"
              style:top="{m.y}px"
              style:left="{m.x}px"
              style:display="{displayPosition}"
        >lat: 732, long: -265</span>
        <picture data-map-name="v3" role="img"
                 bind:clientWidth={map.w} bind:clientHeight={map.h}
                 on:mousemove={(e) => {
             (m = { x: e.offsetX, y: e.offsetY });
             showPosition = true;}}
                 on:mouseleave={(e) => showPosition = false}>
            <source media="(min-width:1200px)" srcset={bigMap}>
            <img src={smallMap} alt="map-v3">
        </picture>
        <ul class="map_markers">
            <li class="map_marker" style="top: 62.5%; left: 51.9%">
                <i class="mi-location"></i>
            </li>
            <li class="map_marker" style="top: 50%; left: 50%">
                <i class="mi-pin"></i>
            </li>
        </ul>
    </div>
    <div class="sample">
        The mouse position is {m.x} x {m.y}<br>
        The Area size is {map.w} x {map.h}<br>
        The mouse position is {ma.x}% x {ma.y}%
    </div>
</section>

<style>
    .sample {
        background: #ff3e00;
    }

    section {
        width: 100%;
    }

    .map {
        position: relative;
        box-sizing: border-box;
        display: block;
        z-index: 1;
        width: 100%;
        margin: 0;
        border: 1em solid #28282a;
        border-radius: 1.5em;

        & .cursor-position {
            position: absolute;
            z-index: 1000;
            pointer-events: none;
            margin-top: 10px;
            padding: 0 5px;
            border-radius: 15px;
            background-color: rgba(255, 255, 255, 0.8);
            color: #212121;
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
            color: #ffc802;
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
        .map {
            border-left: 0;
            border-right: 0;

        }

        .map_marker > i {
            font-size: 1.5em !important;
        }
    }
</style>

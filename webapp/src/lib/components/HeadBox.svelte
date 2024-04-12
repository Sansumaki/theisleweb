<script lang="ts">
    import {Carousel} from 'flowbite-svelte';
    import image from '$lib/images/Hintergrundstartseite.gif'
    import mapImage from '$lib/images/maps/Isle_V3.jpg'

    export let title = "Fuck the Revolution"

    let images = [
        {
            id: 0,
            name: "The Isle Dinos",
            imgurl: image,
            attribution: "The Isle Dinos",
        },
        {
            id: 0,
            name: "The Isle V3 Map",
            imgurl: mapImage,
            attribution: "The Isle V3 Map",
        },
    ];
</script>

<h1 class="self-center text-center">{title}</h1>
<div class="hidden sm:block">
    <Carousel {images} loop showCaptions={false} showThumbs={false} showIndicators={false} slideControls={false}
              slideClass="h-full [&>img]:w-full [&>img]:h-full [&>img]:object-cover [&>img]:object-center [&>img]:saturate-50 [&>img]:brightness-150 [&>img]:dark:brightness-100"
              divClass="overflow-hidden relative h-32 hidden sm:block xl:h-48 2xl:h-64"
              duration="3000"/>
</div>
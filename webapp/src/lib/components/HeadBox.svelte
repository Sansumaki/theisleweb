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

<div class="text-center sm:bg-primary-secondary">
    <h1 class="self-center sm:text-white sm:mt-0 sm:py-1 sm:mb-0">{title}</h1>
</div>
<div class="hidden sm:block">
    <Carousel {images} loop showCaptions={false} showThumbs={false} showIndicators={false} slideControls={false}
              slideClass="h-full [&>img]:w-full [&>img]:h-full [&>img]:object-cover [&>img]:object-center [&>img]:saturate-50 [&>img]:brightness-150 [&>img]:dark:brightness-100"
              divClass="overflow-hidden relative h-32 hidden sm:block xl:h-48 2xl:h-64"
              duration="3000"/>
</div>
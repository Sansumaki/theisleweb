<script lang="ts">
    import {Card, Carousel, Heading} from 'flowbite-svelte';
    import image from '$lib/images/Hintergrundstartseite.gif'
    import mapImage from '$lib/images/legacy-map-v3-small.jpg'

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

<Card size="2xl" class="text-center sm:hidden">
    <Heading tag="h1" class="self-center">{title}</Heading>
</Card>
<div class="hidden sm:block">
    <Carousel {images} loop showCaptions={false} showThumbs={false} showIndicators={false} slideControls={false}
              slideClass="h-full [&>img]:w-full [&>img]:h-full [&>img]:object-cover [&>img]:object-center [&>img]:saturate-50 [&>img]:blur-[3px] [&>img]:brightness-150 [&>img]:dark:brightness-100"
              divClass="overflow-hidden relative h-32 hidden sm:block rounded-lg xl:h-48 2xl:h-64"
              duration="3000"/>
</div>
<div class="sm:h-32 sm:-mt-32 pb-4 xl:h-48 xl:-mt-48 2xl:h-64 2xl:-mt-64 w-full relative justify-center items-center hidden sm:flex">
    <Heading tag="h1" class="w-auto drop-shadow-lg text-white dark:text-white xl:text-7xl 2xl:text-8xl">{title}</Heading>
</div>
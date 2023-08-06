<script lang="ts">
    import { Carousel } from 'flowbite-svelte';

    const images = [
        {
            id: 0,
            name: "The Isle Dinos",
            imgurl: "/images/CarniSur.jpg",
            attribution: "The Isle Dinos",
        },
        {
            id: 0,
            name: "The Isle V3 Map",
            imgurl: "/images/legacy-map-v3-small.jpg",
            attribution: "The Isle V3 Map",
        }
    ];

    let showThumbs=false
    let showCaptions=false
</script>

<Carousel {images} loop {showCaptions} {showThumbs} slideClass="slider" class="class" duration="3000"/>

<style lang="scss">
    :global(.slider) {
      height: 100%;
      :global(img) {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: 50% 50%;
      }
    }
</style>
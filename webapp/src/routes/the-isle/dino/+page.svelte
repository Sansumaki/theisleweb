<script>
    import {Heading, P} from "flowbite-svelte";
    import {t} from "$lib/translations";
</script>

<Heading tag="h4">{$t('theIsle.dino.title')}</Heading>
<P class="my-4" justify>{$t('theIsle.dino.description')}</P>
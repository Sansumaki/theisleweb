<script>
    import {Heading, P} from "flowbite-svelte";
    import DiscordLink from "$lib/components/DiscordLink.svelte";
    import {t} from "$lib/translations";
</script>

<Heading tag="h4">{$t('about.content.heading')}</Heading>

{#each ["about.content.content1", "about.content.content2", "about.content.content3", "about.content.content4"] as item}
    <P class="my-4 sm:text-xl text-gray-500 dark:text-gray-400" justify>{$t(item)}</P>
{/each}

<div class="text-center w-full">
    <DiscordLink/>
</div>
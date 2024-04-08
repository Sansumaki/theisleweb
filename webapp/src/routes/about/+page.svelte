<script>
    import DiscordLink from "$lib/components/DiscordLink.svelte";
    import {t} from "$lib/translations";
</script>

<h2>{$t('about.content.heading')}</h2>

{#each ["about.content.content1", "about.content.content2", "about.content.content3", "about.content.content4"] as item}
    <p>{$t(item)}</p>
{/each}

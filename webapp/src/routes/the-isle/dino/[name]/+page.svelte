<script>
    import {t} from "$lib/translations";

    export let data;
</script>

{#if data?.dinoData === undefined}
    <h2>404: Dino not found</h2>
{:else}
    <a href="/the-isle/dino">{$t('common.back')}</a>
    <h2>{data.dinoData.name}</h2>
    <p>{$t('theIsle.dino.name')}: {data.dinoData.name}</p>
    <p>{$t('theIsle.dino.diet')}: {data.dinoData.diet === 0 ? $t('theIsle.dino.herbivore') : $t('theIsle.dino.carnivore')}</p>
{/if}
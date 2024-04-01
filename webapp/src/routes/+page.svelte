<script>
    import { t } from '$lib/translations';
    import {Badge, Heading, P} from "flowbite-svelte";
    import DiscordLink from "$lib/components/DiscordLink.svelte";
    import {Icon} from "flowbite-svelte-icons";

    const siteContent = [
        {
            icon: "map-pin-outline",
            title: "ftr.sitecontent.items.0.title",
            text: "ftr.sitecontent.items.0.description"
        },
        {
            icon: "bug-outline",
            title: "ftr.sitecontent.items.1.title",
            text: "ftr.sitecontent.items.1.description",
            comingSoon: true
        }
    ]
</script>

<h4>{$t('ftr.content.heading')}</h4>
{#each [0,1,2,3] as item}
    <p class="my-4 sm:text-xl" justify>{$t("ftr.content.contents."+item+".value")}</p>
{/each}

<div class="text-center w-full">
    <DiscordLink/>
</div>

<div class="py-4 mx-auto max-w-screen-xl">
    <Heading tag="h4">{$t('ftr.sitecontent.title')}</Heading>
    <p class="sm:text-xl" justify>{$t('ftr.sitecontent.description')}</p>
</div>
<div class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:space-y-0 mb-12">
    {#each siteContent as item}
        <div>
            <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <Icon name="{item.icon}"
                      class="text-primary-600 dark:text-primary-300"/>
            </div>
            <h5 class="mb-2">{$t(item.title)}</h5>
            <p class="sm:text-xl">{$t(item.text)}</p>
            {#if item.comingSoon}
                <Badge color="yellow">Coming soon</Badge>
            {/if}
        </div>
    {/each}
</div>

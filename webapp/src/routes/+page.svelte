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

<Heading tag="h4">{$t('ftr.content.heading')}</Heading>
{#each [0,1,2,3] as item}
    <P class="my-4 sm:text-xl text-gray-500 dark:text-gray-400" justify>{$t("ftr.content.contents."+item+".value")}</P>
{/each}

<div class="text-center w-full">
    <DiscordLink/>
</div>

<div class="py-4 mx-auto max-w-screen-xl">
    <Heading tag="h4">{$t('ftr.sitecontent.title')}</Heading>
    <P class="sm:text-xl text-gray-500 dark:text-gray-400" justify>{$t('ftr.sitecontent.description')}</P>
</div>
<div class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:space-y-0 mb-12">
    {#each siteContent as item}
        <div>
            <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <Icon name="{item.icon}"
                      class="text-primary-600 dark:text-primary-300"/>
            </div>
            <Heading tag="h5" class="mb-2">{$t(item.title)}</Heading>
            <P class="sm:text-xl text-gray-500 dark:text-gray-400">{$t(item.text)}</P>
            {#if item.comingSoon}
                <Badge color="yellow">Coming soon</Badge>
            {/if}
        </div>
    {/each}
</div>

<div class="text-center w-full">
    <iframe src="https://discord.com/widget?id=720714005529755769&theme=dark" width="400" height="400" class="mx-auto"
            allowtransparency="true"
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
</div>
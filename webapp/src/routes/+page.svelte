<script>
    import {i} from '@inlang/sdk-js'
    import {Badge, Heading, P} from "flowbite-svelte";
    import DiscordLink from "$lib/components/DiscordLink.svelte";
    import {Icon} from "flowbite-svelte-icons";

    const siteContent = [
        {
            icon: "map-pin-outline",
            title: i("ftr.content.map.title"),
            text: i("ftr.content.map.description")
        },
        {
            icon: "bug-outline",
            title: i("ftr.content.dino.title"),
            text: i("ftr.content.dino.description"),
            comingSoon: true
        }
    ]
</script>

<Heading tag="h4">{i('ftr.content.heading')}</Heading>
{#each ["ftr.content.content1", "ftr.content.content2", "ftr.content.content3", "ftr.content.content4"] as item}
    <P class="my-4 sm:text-xl text-gray-500 dark:text-gray-400" justify>{i(item)}</P>
{/each}

<div class="text-center w-full">
    <DiscordLink/>
</div>

<div class="py-4 mx-auto max-w-screen-xl">
    <Heading tag="h4">{i('ftr.content.sitecontent')}</Heading>
    <P class="sm:text-xl text-gray-500 dark:text-gray-400" justify>{i('ftr.content.sitecontentdescription')}</P>
</div>
<div class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:space-y-0 mb-12">
    {#each siteContent as item}
        <div>
            <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <Icon name="{item.icon}"
                      class="text-primary-600 dark:text-primary-300"/>
            </div>
            <Heading tag="h5" class="mb-2">{item.title}</Heading>
            <P class="sm:text-xl text-gray-500 dark:text-gray-400">{item.text}</P>
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
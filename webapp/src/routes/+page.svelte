<script>
    import { i } from '@inlang/sdk-js'
    import {Badge, Heading, P} from "flowbite-svelte";
    import DiscordLink from "$lib/components/DiscordLink.svelte";
    import {Icon} from "flowbite-svelte-icons";

    const content = [
        {
            title: "Willkommen auf der offiziellen Webseite von [FTR] Fuck The Revolution!",
            paragraphs: [
                "Sei ein Teil unserer leidenschaftlichen Community und erlebe das ultimative Survival-Abenteuer im The Isle Game. Trete unserem Discord-Server bei und werde Teil einer Gemeinschaft, die sich auf das Überleben in einer Welt voller Dinosaurier spezialisiert hat.",
                "Auf dieser Webseite findest du alle Informationen, die du brauchst, um dich in unsere Welt einzutauchen. Erfahre mehr über unsere Serverregeln, lerne die verschiedenen Spielmodi kennen und bleibe auf dem neuesten Stand der Updates und Events.",
                "Komm zu uns und finde eine freundliche Gruppe von Spielern, die bereit sind, ihr Wissen und ihre Erfahrung mit dir zu teilen. Zusammen können wir unsere Überlebensfähigkeiten verbessern und spannende Abenteuer erleben.",
                "Also zögere nicht, mach mit und zeig, dass du bereit bist, die Revolution der Dinosaurier zu überleben!"
            ]
        }]

    const siteContent = [
        {
            icon: "map-pin-outline",
            title: "The Isle Maps",
            text: "Here you find interactive maps from the Isle game. Currently we serve the legacy v3 map."
        },
        {
            icon: "bug-outline",
            title: "Dinosaur",
            text: "Here you find a lot of information about all the isle dinosaur.",
            comingSoon: true
        }
    ]
</script>

    <Heading tag="h1">{i('welcome')}ee</Heading>
{#each content as item}
    <Heading tag="h4">{item.title}</Heading>

    {#each item.paragraphs as paragraph}
        <P class="my-4 sm:text-xl text-gray-500 dark:text-gray-400" justify>{paragraph}</P>
    {/each}
{/each}

<div class="text-center w-full">
    <DiscordLink/>
</div>

<div class="py-4 mx-auto max-w-screen-xl">
    <Heading tag="h4">Site Content</Heading>
    <P class="sm:text-xl text-gray-500 dark:text-gray-400" justify>Here you see an overview what you can find on this
        site.</P>
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
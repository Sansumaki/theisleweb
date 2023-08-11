<script>
    import {A, Card, Heading, P} from "flowbite-svelte";
    import {Icon} from "flowbite-svelte-icons";
</script>

<Card size="2xl" padding="xl">
    <Heading tag="h4">Willkommen auf der offiziellen Webseite von [FTR] Fuck The Revolution!</Heading>

    <P class="my-4" justify>Sei ein Teil unserer leidenschaftlichen Community und erlebe das ultimative
        Survival-Abenteuer im The Isle Game.
        Trete unserem Discord-Server bei und werde Teil einer Gemeinschaft, die sich auf das Überleben in einer Welt
        voller Dinosaurier spezialisiert hat.</P>

    <P class="my-4" justify>Auf dieser Webseite findest du alle Informationen, die du brauchst, um dich in unsere Welt
        einzutauchen. Erfahre
        mehr über unsere Serverregeln, lerne die verschiedenen Spielmodi kennen und bleibe auf dem neuesten Stand der
        Updates und Events.</P>

    <P class="my-4" justify>Komm zu uns und finde eine freundliche Gruppe von Spielern, die bereit sind, ihr Wissen und
        ihre Erfahrung mit
        dir zu teilen. Zusammen können wir unsere Überlebensfähigkeiten verbessern und spannende Abenteuer erleben.</P>

    <P class="my-4" justify>Also zögere nicht, mach mit und zeig, dass du bereit bist, die Revolution der Dinosaurier zu
        überleben!</P>

    <div class="text-center w-full">
        <A href="https://discord.gg/theisleftr" target="_blank"
           aClass="inline-flex justify-center items-center p-5 mb-4 text-base font-medium rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
           color="text-gray-500 dark:text-gray-400 dark:hover:text-white">
            <span class="w-full ml-3">Join our Discord</span>
            <Icon name="arrow-right-outline" class="w-4 h-4 ml-2"/>
        </A>
        <iframe src="https://discord.com/widget?id=720714005529755769&theme=dark" width="300" height="400" class="mx-auto"
                allowtransparency="true" frameborder="0"
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
    </div>
</Card>
<script>
    import {A, Card, Heading, P} from "flowbite-svelte";
    import {Icon} from "flowbite-svelte-icons";
</script>

<Card size="2xl" padding="xl">
    <Heading tag="h4">About this site and [FTR] Fuck The Revolution</Heading>

    <P class="my-4" justify>Wir haben uns zusammengetan, um eine Spielgemeinschaft zu gründen, in der wir den Alltag hinter uns lassen und voll und ganz in eine fantastische Spielwelt eintauchen können. Unser Community-Server bietet dir die Möglichkeit, mit Gleichgesinnten zu interagieren, gemeinsam Abenteuer zu erleben und Erinnerungen zu schaffen.</P>

    <P class="my-4" justify>Egal, ob du ein erfahrener Spieler bist oder gerade erst in die Welt der Videospiele eintauchst, bei uns findest du eine freundliche und unterstützende Gemeinschaft. Wir sind ständig auf der Suche nach neuen Spielerperspektiven und freuen uns über jeden, der unsere Ränge verstärkt.</P>

    <P class="my-4" justify>Unsere Serverumgebung ist darauf ausgerichtet, ein ausgewogenes Spielerlebnis zu bieten. Wir legen Wert auf Fairness und Respekt und haben klare Regeln, die sicherstellen, dass alle Mitglieder eine angenehme Erfahrung machen können. Unsere Moderatoren sind aktiv und stehen jederzeit zur Verfügung, um für die Einhaltung der Regeln zu sorgen und bei Fragen oder Problemen zu helfen.</P>

    <P class="my-4" justify>Diese Seite wurde erstellt und wird unterhalten vom FTR Community Team. Bei Anliegen jeglicher Art, wendet euch ans Team in Discord.</P>
    <div class="text-center w-full">
        <A href="https://discord.gg/theisleftr" target="_blank"
           aClass="inline-flex justify-center items-center p-5 text-base font-medium rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
           color="text-gray-500 dark:text-gray-400 dark:hover:text-white">
            <span class="w-full ml-3">Join our Discord</span>
            <Icon name="arrow-right-outline" class="w-4 h-4 ml-2"/>
        </A>
    </div>
</Card>
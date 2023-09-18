<script>
    import {A} from "flowbite-svelte";
    import {Icon} from "flowbite-svelte-icons";
    import {t} from "$lib/translations";
</script>

<A href="https://discord.gg/ftr" target="_blank"
   aClass="inline-flex justify-center items-center p-5 mb-4 text-base font-medium rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600">
    <span class="w-full ml-3">{$t("common.joinDiscord")}</span>
    <Icon name="arrow-right-outline" class="w-4 h-4 ml-2"/>
</A>
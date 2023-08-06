<script lang="ts">
    export let elementName: string;
    const h1Style = "mb-4 text-3xl font-bold text-gray-900 dark:text-white";
    const h2Style = "mb-2 text-2xl font-bold text-gray-600 dark:text-gray-400";
    const h3Style = "mb-2 text-xl font-bold";
    const textStyle = "mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400"
</script>

<p class="{elementName === 'h1' ? h1Style : elementName === 'h2' ? h2Style : elementName === 'h3' ? h3Style : textStyle}"><slot>Title</slot></p>
<script lang="ts">
    import {Section, Page404} from 'flowbite-svelte-blocks';
    import {Button} from 'flowbite-svelte';
    import {page} from '$app/stores';
    import {t} from '$lib/translations';
</script>

<Section name="page404">
    <Page404>
        <svelte:fragment slot="h1">{$page.status}</svelte:fragment>
        <svelte:fragment slot="paragraph">
            <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                {$page.error?.message}
            </p>
            {#if $page.status === 404}
                <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">{$t('common.error404')}</p>
            {/if}
            {#if $page.status === 500}
                <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">{$t('common.error500')}</p>
            {/if}
            <Button href="/" size="lg" color="red">{$t('common.backToHome')}</Button>
        </svelte:fragment>
    </Page404>
</Section>
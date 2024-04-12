<script lang="ts">
    import '../app.postcss';
    import {page} from '$app/stores';
    import HeadBox from '$lib/components/HeadBox.svelte';
    import {t} from '$lib/translations';
    import favicon from '$lib/images/favicon.ico'
    import {setContext} from 'svelte';
    import {writable} from 'svelte/store';
    import Header from "$lib/components/Header.svelte";
    import Footer from "$lib/components/Footer.svelte";

    export let data;

    $: pageRawTitle = $page.data.page?.title;
    $: pageTitle = (pageRawTitle == undefined ? $t('common.name') : $t(pageRawTitle));
    $: title = $t('common.title', {page: (pageRawTitle == undefined ? '' : $t(pageRawTitle) + " | ")});
    $: description = $t('common.description', {detail: $t($page.data.page?.content)});
    $: hideHeading = $page.data.page?.hideHeading ?? false;

    let menuItemsLeft = data.menu.left;
    let menuItemsRight = data.menu.right;
    let menuItemsFull = data.menu.full;

    const headerHeight = writable<number>();
    const smallSpace = writable<boolean>();

    setContext("layout", {
        headerHeightStore: headerHeight,
        smallSpaceStore: smallSpace
    })

    $: pathname = $page.url.pathname;
    $: smallHeader = pathname.startsWith("/the-isle/map/");

</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description"
          content="{description}"/>
    <meta name="kaywords" content="{$t('common.keywords')}"/>
    <meta name="author" content="santasia.dev">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta property="og:title" content="{title}"/>
    <meta property="og:description" content="{description}"/>
    <meta property="og:type" content="website"/>
    <meta property="og:url" content="{$page.url.href}"/>
    <meta property="og:image" content="{favicon }"/>
</svelte:head>

<Header MenuItemsLeft={menuItemsLeft} MenuItemsRight={menuItemsRight} MenuItemsFull={menuItemsFull}
        HeaderHeight={headerHeight}
        SmallHeader={smallHeader} SmallSpace={smallSpace}/>

{#if !hideHeading}
    <HeadBox title={pageTitle}></HeadBox>
{/if}

<div class="px-4 mx-auto w-full">
    <main class="container mx-auto">
        <slot/>
    </main>
</div>

<Footer MenuItemsFull={menuItemsFull}/>
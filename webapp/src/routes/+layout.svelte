<script lang="ts">
    import '../app.postcss';
    import {page} from '$app/stores';
    import HeadBox from '$lib/components/HeadBox.svelte';
    import {t, locale, locales} from '$lib/translations';
    import headerImage from '$lib/images/FTR_EX.gif';
    import {setContext} from 'svelte';
    import {writable} from 'svelte/store';
    import Header from "$lib/components/Header.svelte";
    import Footer from "$lib/components/Footer.svelte";

    const handleChange = ({currentTarget}: { currentTarget: any }) => {
        const {value} = currentTarget;

        document.cookie = `lang=${value} ;`;
    };

    $: title = t.get($page.data.page?.title) ?? 'FTR The Isle';
    $: description = t.get($page.data.page?.content) ?? 'FTR The Isle Website';
    $: hideHeading = $page.data.page?.hideHeading ?? false;

    let menuItemsLeft = [
        {name: 'ftr.menu', link: '/'},
        {name: 'about.menu', link: '/about'}
    ];
    let menuItemsRight = [
        {name: 'theIsle.menu', link: '/the-isle'},
        {name: 'theIsle.maps.menu', link: '/the-isle/map'},
        {name: 'theIsle.dino.menu', link: '/the-isle/dino'}
    ];
    let menuItemsFull = [
        {
            name: "FTR", items: [
                {name: 'ftr.menu', link: '/'},
                {name: 'about.menu', link: '/about'}
            ]
        }, {
            name: "The Isle", items: [
                {name: 'theIsle.menu', link: '/the-isle'},
                {name: 'theIsle.dino.menu', link: '/the-isle/dino'},
                {name: 'theIsle.maps.menu', link: '/the-isle/map'}
            ]
        }, {
            name: "Legal", items: [
                {name: 'Privacy Policy', link: '/about'},
                {name: 'Licensing', link: '/about'},
                {name: 'Terms & Conditions', link: '/about'}
            ]
        }, {
            name: "Support", items: [
                {name: 'Discord Server', link: 'https://discord.gg/ftr', target: '_blank'},
                {name: 'Contact Us', link: '/'}
            ]
        }
    ];

    console.log(menuItemsFull)

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
    <title>{title} | FTR; The Isle Info</title>
    <meta name="description"
          content="{description}, A webpage about the game community FTR mainly focused on the isle."/>
    <meta name="kaywords" content="FTR, Fuck the revolution, the isle, isle, dino, dinosaur, game, map, santasia"/>
    <meta name="author" content="Santasia, FTR">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta property="og:title" content="{title} | FTR; The Isle Info"/>
    <meta property="og:description"
          content="{description}, A webpage about the game community FTR mainly focused on the isle."/>
    <meta property="og:type" content="website"/>
    <meta property="og:url" content="{$page.url.href}"/>
    <meta property="og:image" content="{headerImage}"/>
</svelte:head>

<Header MenuItemsLeft={menuItemsLeft} MenuItemsRight={menuItemsRight}, MenuItemsFull={menuItemsFull}
        HeaderHeight={headerHeight}
        SmallHeader={smallHeader} SmallSpace={smallSpace}/>

<div class="px-4 mx-auto w-full">
    <main class="container my-5 mx-auto">
        {#if !hideHeading}
            <div class="mb-3">
                <HeadBox title={title}></HeadBox>
            </div>
        {/if}
        <slot/>
    </main>
</div>

<Footer MenuItemsFull={menuItemsFull} />
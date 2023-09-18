<script lang="ts">
    import '../app.postcss';
    import {page} from '$app/stores';
    import HeadBox from '$lib/components/HeadBox.svelte';
    // @ts-ignore
    import {t, locale, locales} from '$lib/translations';
    import headerImage from '$lib/images/FTR_EX.gif';
    import {drawerEnabled, showDrawer} from '$lib/stores/nav-store.ts';
    import {
        DarkMode,
        Footer,
        FooterCopyright,
        FooterIcon,
        FooterLink,
        FooterLinkGroup, Navbar,
        NavBrand,
        NavHamburger, NavLi, NavUl,
    } from "flowbite-svelte";
    import {Icon} from "flowbite-svelte-icons";
    import ftr_logo from '$lib/images/FTR_EX.gif';
    import {toggleDrawer} from '$lib/stores/nav-store.ts';

    const handleChange = ({currentTarget}: { currentTarget: any }) => {
        const {value} = currentTarget;

        document.cookie = `lang=${value} ;`;
    };

    $: title = t.get($page.data.page?.title) ?? 'FTR The Isle';
    $: description = t.get($page.data.page?.content) ?? 'FTR The Isle Website';
    $: hideHeading = $page.data.page?.hideHeading ?? false;
    $: drawerWidth = $showDrawer ? 256 : 0;

    let menuItems = [
        {name: 'ftr.menu', link: "/", group: true},
        {name: 'theIsle.menu', link: "/the-isle", group: true},
        {name: 'about.menu', link: "/about", group: true},
    ];

    let width: number;

    $: pathname = $page.url.pathname;

    const toggleDrawerUi = () => {
        toggleDrawer.update(i => !i);
    };

    let divClass = 'w-full ml-auto lg:block lg:w-auto order-1 lg:order-none';
    let ulClass =
        'flex flex-col py-3 my-4 lg:flex-row lg:my-0 text-sm font-medium gap-4 lg:bg-transparent lg:border-0';
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

<header class="sticky z-50 top-0 left-0 flex-none w-full mx-auto">
    <Navbar navClass="px-2 sm:px-4 py-2.5 w-full bg-slate-200 dark:bg-slate-950" let:hidden let:toggle color="primary">
        <NavHamburger
                on:click={toggleDrawerUi}
                btnClass="focus:outline-none whitespace-normal rounded-lg focus:ring-2 p-1.5 focus:ring-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 m-0 mr-3 lg:hidden {!$drawerEnabled ? 'hidden':''}"
        />
        <NavBrand href="/" class="lg:fixed lg:left-5">
            <img
                    src="{ftr_logo}"
                    class="mr-3 h-6 sm:h-9 rounded-2xl"
                    alt="FTR Logo"
            />
            <span class="self-center whitespace-nowrap text-xl font-semibold text-gray-700 dark:text-white">{$t('common.title')}</span>
        </NavBrand>

        <NavUl
                {hidden}
                {divClass}
                {ulClass}
                nonActiveClass="md:!pl-3 md:!py-2 lg:!pl-0 text-gray-700 hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 dark:text-white lg:dark:hover:text-primary-700 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                activeClass="md:!pl-3 md:!py-2 lg:!pl-0 lg:text-primary-700 text-white dark:text-white dark:lg:text-primary-500 bg-primary-700 lg:bg-transparent dark:bg-primary-600 lg:dark:bg-transparent cursor-default"
        >
            {#each menuItems as item}
                <NavLi class="lg:px-2 lg:mb-0"
                       href="{item.link}"
                       active={pathname === item.link}>
                    {$t(item.name)}
                </NavLi>
            {/each}
        </NavUl>

        <div class="flex items-center ml-auto">
            <DarkMode class="inline-block dark:hover:text-white hover:text-gray-900"/>
        </div>
        <NavHamburger on:click={toggle} btnClass="lg:hidden"/>
    </Navbar>
</header>

<div class="px-4 mx-auto w-full">
    <main class="container my-5 mx-auto" style="padding-left: {drawerWidth}px">
        {#if !hideHeading}
            <div class="mb-3">
                <HeadBox title={title}></HeadBox>
            </div>
        {/if}
        <slot/>
    </main>
</div>

<footer>
    <Footer footerType="sitemap" style="padding-left: {drawerWidth}px">
        <div class="grid grid-cols-2 gap-8 py-8 px-6 md:grid-cols-4 bg-slate-100 dark:bg-slate-800">
            <div>
                <h2 class="mb-6 text-sm font-semibold uppercase text-primary-600 dark:text-primary-200">FTR</h2>
                <FooterLinkGroup ulClass="text-gray-900 dark:text-gray-300">
                    <FooterLink liClass="mb-4" href="/about">{$t('ftr.menu')}</FooterLink>
                    <FooterLink liClass="mb-4" href="/about">{$t('about.menu')}</FooterLink>
                </FooterLinkGroup>
            </div>
            <div>
                <h2 class="mb-6 text-sm font-semibold uppercase text-primary-600 dark:text-primary-200">The Isle</h2>
                <FooterLinkGroup ulClass="text-gray-900 dark:text-gray-300">
                    <FooterLink liClass="mb-4" href="/the-isle">{$t('theIsle.menu')}</FooterLink>
                    <FooterLink liClass="mb-4" href="/the-isle/dino">{$t('theIsle.dino.menu')}</FooterLink>
                    <FooterLink liClass="mb-4" href="/map">{$t('theIsle.maps.menu')}</FooterLink>
                </FooterLinkGroup>
            </div>
            <div>
                <h2 class="mb-6 text-sm font-semibold uppercase text-primary-600 dark:text-primary-200">Legal</h2>
                <FooterLinkGroup ulClass="text-gray-900 dark:text-gray-300">
                    <FooterLink liClass="mb-4" href="/about">Privacy Policy</FooterLink>
                    <FooterLink liClass="mb-4" href="/about">Licensing</FooterLink>
                    <FooterLink liClass="mb-4" href="/about">Terms & Conditions</FooterLink>
                </FooterLinkGroup>
            </div>
            <div>
                <h2 class="mb-6 text-sm font-semibold uppercase text-primary-600 dark:text-primary-200">Download</h2>
                <FooterLinkGroup ulClass="text-gray-900 dark:text-gray-300">
                    <FooterLink liClass="mb-4" target="_blank" href="https://discord.gg/ftr">Discord Server</FooterLink>
                    <FooterLink liClass="mb-4" href="/">Contact Us</FooterLink>
                </FooterLinkGroup>
            </div>
        </div>

        <div class="py-6 px-4 md:flex md:items-center md:justify-between bg-slate-200 dark:bg-slate-700">
            <FooterCopyright spanClass="text-sm text-gray-900 dark:text-gray-300 sm:text-center" href="/" by="Santasia™"
                             year={2023}/>
            <div class="flex mt-4 space-x-6 sm:justify-center md:mt-0 items-center">
                <select bind:value="{$locale}" on:change={handleChange}>
                    {#each $locales as value}
                        <option value="{value}">{$t(`lang.${value}`)}</option>
                    {/each}
                </select>
                <FooterIcon target="_blank" href="https://discord.gg/ftr">
                    <Icon name="discord-solid"
                          class="w-4 h-4 text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white"/>
                </FooterIcon>
            </div>
        </div>
    </Footer>
</footer>
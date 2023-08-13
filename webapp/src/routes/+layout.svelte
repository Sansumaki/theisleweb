<script lang="ts">
    import '../app.postcss';
    import {page} from '$app/stores';
    import Header from '$lib/components/Header.svelte';
    import HeadBox from '$lib/components/HeadBox.svelte';
    import {showDrawer} from '$lib/stores/nav-store.ts'


    $: title = $page.data.page?.title ?? 'FTR The Isle';
    $: description = $page.data.page?.content ?? 'FTR The Isle Website';
    $: hideHeading = $page.data.page?.hideHeading ?? false;
    $: drawerWidth = $showDrawer ? 256 : 0;

    import {Footer, FooterCopyright, FooterIcon, FooterLink, FooterLinkGroup} from "flowbite-svelte";
    import {Icon} from "flowbite-svelte-icons";
</script>

<svelte:head>
    <title>{title} | The Isle Info</title>
    <meta name="description" content={description}/>
</svelte:head>

<Header/>

<div class="px-4 mx-auto w-full">
    <main class="container my-5 mx-auto" style="padding-left: {drawerWidth}px">
        {#if !hideHeading}
            <div class="mb-3">
                <HeadBox></HeadBox>
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
                    <FooterLink liClass="mb-4" href="/about">FTR</FooterLink>
                    <FooterLink liClass="mb-4" href="/about">About</FooterLink>
                </FooterLinkGroup>
            </div>
            <div>
                <h2 class="mb-6 text-sm font-semibold uppercase text-primary-600 dark:text-primary-200">The Isle</h2>
                <FooterLinkGroup ulClass="text-gray-900 dark:text-gray-300">
                    <FooterLink liClass="mb-4" href="/the-isle">The Isle</FooterLink>
                    <FooterLink liClass="mb-4" href="/the-isle/dino">Dinosaur</FooterLink>
                    <FooterLink liClass="mb-4" href="/map">Maps</FooterLink>
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
            <div class="flex mt-4 space-x-6 sm:justify-center md:mt-0">
                <FooterIcon target="_blank" href="https://discord.gg/ftr">
                    <Icon name="discord-solid"
                          class="w-4 h-4 text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white"/>
                </FooterIcon>
            </div>
        </div>
    </Footer>
</footer>
<script lang="ts">
    import '../app.postcss';
    import {page} from '$app/stores';
    import Header from '$lib/components/Header.svelte';
    import HeadBox from '$lib/components/HeadBox.svelte';
    import { showDrawer } from '$lib/stores/nav-store.ts'


    $: title = $page.data.page?.title ?? 'FTR The Isle';
    $: description = $page.data.page?.content ?? 'FTR The Isle Website';

    import {Footer, FooterCopyright, FooterLink, FooterLinkGroup} from "flowbite-svelte";
</script>

<svelte:head>
    <title>{title} | The Isle Info</title>
    <meta name="description" content={description}/>
</svelte:head>

<Header/>

<div class="px-4 mx-auto w-full">
    <main class="container my-5 mx-auto {$showDrawer ? 'lg:pl-72':''}"> <!-- lg:ml-72 for drawer -->
        <div class="mb-3">
            <HeadBox {title}></HeadBox>
        </div>
        <slot/>
    </main>

    <footer class="container my-5 mx-auto drop-shadow-2 {$showDrawer ? 'lg:pl--72':''}">
        <Footer>
            <FooterCopyright href="/" by="Santasia™" year={2023}/>
            <FooterLinkGroup
                    ulClass="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                <FooterLink href="/about">About</FooterLink>
                <!--			<FooterLink href="/">Privacy Policy</FooterLink>-->
                <!--			<FooterLink href="/">Licensing</FooterLink>-->
                <!--			<FooterLink href="/">Contact</FooterLink>-->
            </FooterLinkGroup>
        </Footer>
    </footer>
</div>
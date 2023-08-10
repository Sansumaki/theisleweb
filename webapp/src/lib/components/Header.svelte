<script lang="ts">
    import {page} from '$app/stores';
    import ftr_logo from '$lib/images/FTR_EX.gif';
    import { onMount } from 'svelte';
    import {
        DarkMode,
        Navbar,
        NavBrand,
        NavHamburger,
        NavLi,
        NavUl
    } from "flowbite-svelte";
    import { sineIn } from 'svelte/easing';

    let menuItems = [
        {name: "FTR", link: "/"},
        {name: "The Isle", link: "/the-isle"},
        {name: "Dinosaur", link: "/dino"},
        {name: "Map", link: "/map"},
        {name: "Map2", link: "/map2"},
        { name: "About", link: "/about" },
    ];

    let breakPoint: number = 1024;
    let width: number;
    let transitionParams = {
        x: -320,
        duration: 200,
        easing: sineIn
    };
    let activateClickOutside = true;
    let backdrop: boolean = false;
    let drawerHidden: boolean = false;

    $: activeUrl = $page.url.pathname;

    $: if (width >= breakPoint) {
        drawerHidden = false;
        activateClickOutside = false;
    } else {
        drawerHidden = true;
        activateClickOutside = true;
    }
    onMount(() => {
        if (width >= breakPoint) {
            drawerHidden = false;
            activateClickOutside = false;
        } else {
            drawerHidden = true;
            activateClickOutside = true;
        }
    });
    const toggleSide = () => {
        if (width < breakPoint) {
            drawerHidden = !drawerHidden;
        }
    };
    const toggleDrawer = () => {
        drawerHidden = false;
    };

    let spanClass = 'pl-2 self-center text-md text-gray-900 whitespace-nowrap dark:text-white';
    let divClass = 'w-full ml-auto lg:block lg:w-auto order-1 lg:order-none';
    let ulClass =
        'flex flex-col py-3 my-4 lg:flex-row lg:my-0 text-sm font-medium gap-4 lg:bg-transparent lg:border-0';
</script>

<svelte:window bind:innerWidth={width} />
<header class="sticky z-50 top-0 left-0 flex-none w-full mx-auto bg-white dark:bg-slate-950 drop-shadow-2xl">
    <Navbar let:hidden let:toggle color="primary">
        <NavHamburger
                on:click={toggleDrawer}
                btnClass="focus:outline-none whitespace-normal rounded-lg focus:ring-2 p-1.5 focus:ring-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 m-0 mr-3 lg:hidden"
        />
        <NavBrand href="/">
            <img
                    src="{ftr_logo}"
                    class="mr-3 h-6 sm:h-9 rounded-2xl"
                    alt="FTR Logo"
            />
            <span class="self-center whitespace-nowrap text-xl font-semibold text-gray-700 dark:text-white">The Isle Info</span>
        </NavBrand>
        <NavUl
                {hidden}
                {divClass}
                {ulClass}
                nonActiveClass="md:!pl-3 md:!py-2 lg:!pl-0 text-gray-700 hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 dark:text-white lg:dark:hover:text-primary-700 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                activeClass="md:!pl-3 md:!py-2 lg:!pl-0 lg:text-primary-700 text-white dark:text-white dark:lg:text-primary-500 bg-primary-700 lg:bg-transparent dark:bg-primary-600 lg:dark:bg-transparent cursor-default"
        >
            {#each menuItems as item}
                <NavLi class="lg:px-2 lg:mb-0" href="{item.link}" active={activeUrl === item.link}>{item.name}</NavLi>
            {/each}
        </NavUl>
        <div class="flex items-center ml-auto">
            <DarkMode class="inline-block dark:hover:text-white hover:text-gray-900"/>
        </div>
        <NavHamburger on:click={toggle} btnClass="lg:hidden"/>
    </Navbar>
</header>

<!--<Drawer-->
<!--        transitionType="fly"-->
<!--        {backdrop}-->
<!--        {transitionParams}-->
<!--        bind:hidden={drawerHidden}-->
<!--        bind:activateClickOutside-->
<!--        width="w-64"-->
<!--        class="overflow-scroll pb-32"-->
<!--        id="sidebar"-->
<!--&gt;-->
<!--    <div class="flex items-center">-->
<!--        <CloseButton on:click={() => (drawerHidden = true)} class="mb-4 dark:text-white lg:hidden" />-->
<!--    </div>-->
<!--    <Sidebar asideClass="w-54">-->
<!--        <SidebarWrapper divClass="overflow-y-auto py-4 px-3 rounded dark:bg-gray-800">-->
<!--            <SidebarGroup>-->
<!--                <SidebarItem label="Home" href="/" on:click={toggleSide} active={activeUrl === `/`} />-->

<!--                {#each menuItems as item}-->
<!--                        <SidebarItem-->
<!--                                label={item.navigator}-->
<!--                                href={item.link}-->
<!--                                {spanClass}-->
<!--                                activeClass="flex items-center p-2 text-base font-normal text-gray-900 bg-primary-200 dark:bg-primary-700 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-primary-700"-->
<!--                                on:click={toggleSide}-->
<!--                                active={activeUrl === item.link}-->
<!--                        />-->
<!--                {/each}-->
<!--                &lt;!&ndash;{#each data.pages as { meta, path }}&ndash;&gt;-->
<!--                &lt;!&ndash;    <SidebarItem&ndash;&gt;-->
<!--                &lt;!&ndash;            label={meta.title}&ndash;&gt;-->
<!--                &lt;!&ndash;            href={`/pages/${path}`}&ndash;&gt;-->
<!--                &lt;!&ndash;            {spanClass}&ndash;&gt;-->
<!--                &lt;!&ndash;            activeClass="flex items-center p-2 text-base font-normal text-gray-900 bg-primary-200 dark:bg-primary-700 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-primary-700"&ndash;&gt;-->
<!--                &lt;!&ndash;            on:click={toggleSide}&ndash;&gt;-->
<!--                &lt;!&ndash;            active={activeUrl === `/pages/${path}`}&ndash;&gt;-->
<!--                &lt;!&ndash;    />&ndash;&gt;-->
<!--                &lt;!&ndash;{/each}&ndash;&gt;-->
<!--                &lt;!&ndash;<SidebarDropdownWrapper label="Articles">&ndash;&gt;-->
<!--                &lt;!&ndash;    {#each data.articles as { meta, path }}&ndash;&gt;-->
<!--                &lt;!&ndash;        <SidebarItem&ndash;&gt;-->
<!--                &lt;!&ndash;                label={meta.title}&ndash;&gt;-->
<!--                &lt;!&ndash;                href={`/blog/${path}`}&ndash;&gt;-->
<!--                &lt;!&ndash;                {spanClass}&ndash;&gt;-->
<!--                &lt;!&ndash;                activeClass="flex items-center p-2 text-base font-normal text-gray-900 bg-primary-200 dark:bg-primary-700 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-primary-700"&ndash;&gt;-->
<!--                &lt;!&ndash;                on:click={toggleSide}&ndash;&gt;-->
<!--                &lt;!&ndash;                active={activeUrl === `/blog/${path}`}&ndash;&gt;-->
<!--                &lt;!&ndash;        />&ndash;&gt;-->
<!--                &lt;!&ndash;    {/each}&ndash;&gt;-->
<!--&lt;!&ndash;                </SidebarDropdownWrapper>&ndash;&gt;-->
<!--            </SidebarGroup>-->
<!--        </SidebarWrapper>-->
<!--    </Sidebar>-->
<!--</Drawer>-->
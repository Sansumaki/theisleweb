<script lang="ts">
    import {i} from "@inlang/sdk-js"
    import {page} from '$app/stores';
    import ftr_logo from '$lib/images/FTR_EX.gif';
    import {
        DarkMode,
        Navbar,
        NavBrand,
        NavHamburger,
        NavLi,
        NavUl
    } from "flowbite-svelte";
    import {drawerEnabled, toggleDrawer} from '$lib/stores/nav-store.ts'

    let menuItems = [
        {name: i('ftr.menu'), link: "/", group: true},
        {name: i('theIsle.menu'), link: "/the-isle", group: true},
        {name: i('about.menu'), link: "/about", group: true},
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

<svelte:window bind:innerWidth={width}/>
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
            <span class="self-center whitespace-nowrap text-xl font-semibold text-gray-700 dark:text-white">{i('main.title')}</span>
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
                    {item.name}
                </NavLi>
            {/each}
        </NavUl>

        <div class="flex items-center ml-auto">
            <DarkMode class="inline-block dark:hover:text-white hover:text-gray-900"/>
        </div>
        <NavHamburger on:click={toggle} btnClass="lg:hidden"/>
    </Navbar>
</header>
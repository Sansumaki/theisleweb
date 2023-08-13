<script lang="ts">
    import {
        CloseButton,
        Sidebar,
        SidebarGroup,
        SidebarItem,
        SidebarWrapper,
        Drawer,
        SidebarDropdownWrapper
    } from "flowbite-svelte";
    import {sineIn} from "svelte/easing";
    import {page} from "$app/stores";
    import {onDestroy, onMount} from "svelte";
    import {showDrawer, toggleDrawer, drawerEnabled} from '$lib/stores/nav-store.ts'

    let drawerHidden: boolean = false;
    let activateClickOutside = true;

    let breakPoint: number = 1024;
    let width: number;
    $: if (drawerHidden) {
        showDrawer.set(false);
    } else {
        showDrawer.set(true);
    }

    $: if (width >= breakPoint) {
        drawerHidden = false;
        activateClickOutside = false;
    } else {
        drawerHidden = true;
        activateClickOutside = true;
    }
    onMount(() => {
        drawerEnabled.set(true);
        if (width >= breakPoint) {
            drawerHidden = false;
            activateClickOutside = false;
        } else {
            drawerHidden = true;
            activateClickOutside = true;
        }
    });
    onDestroy(() => {
        drawerEnabled.set(false);
        showDrawer.set(false);
    })

    let currentpathname;
    $: currdentpathname = $page.url.pathname;
//const currdentpathname = "a";
    //page.subscribe(i => {
        //currentpathname = i.route.id;
        //let a = i;
        //currentpathname = i.url.pathname;
    //})

    toggleDrawer.subscribe(i => {
        drawerHidden = false;
    });

    let transitionParams = {
        x: -320,
        duration: 200,
        easing: sineIn
    };
    const toggleSide = () => {
        if (width < breakPoint) {
            drawerHidden = !drawerHidden;
        }
    };

    let data = {
        pages: [
            {meta: "hallo page", path: "/the-isle"}
        ],
        articles: [
            {meta: "hallo art", path: "/the-isle"}
        ]
    };

    let spanClass = 'pl-2 self-center text-md text-gray-900 whitespace-nowrap dark:text-white';
</script>


<svelte:window bind:innerWidth={width}/>

<Drawer
        leftOffset="top-[{width >= breakPoint ? '59': '79'}px] h-screen left-0"
        transitionType="fly"
        backdrop={false}
        {transitionParams}
        bind:hidden={drawerHidden}
        bind:activateClickOutside
        width="w-64"
        style="top:{width >= breakPoint ? '79': '59'}px"
        id="sidebar"
>
    <div class="flex items-center">
        <CloseButton on:click={() => (drawerHidden = true)} class="mb-4 dark:text-white lg:hidden"/>
    </div>
    <Sidebar asideClass="w-54">
        <SidebarWrapper divClass="overflow-y-auto py-4 px-3 rounded dark:bg-gray-800">
            <SidebarGroup>
                <SidebarItem label="Home" href="/the-isle" on:click={toggleSide} active={currentpathname === `/the-isle`}/>
                <SidebarItem label="Dinosaur" href="/the-isle/dino" on:click={toggleSide} active={currentpathname === `/the-isle/dino`}/>
                {#each data.pages as {meta, path}}
                    <SidebarItem
                            label={meta.title}
                            href={`/pages/${path}`}
                            {spanClass}
                            activeClass="flex items-center p-2 text-base font-normal text-gray-900 bg-primary-200 dark:bg-primary-700 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-primary-700"
                            on:click={toggleSide}
                            active={currentpathname === `/pages/${path}`}
                    />
                {/each}
                <SidebarDropdownWrapper label="Articles">
                    {#each data.articles as {meta, path}}
                        <SidebarItem
                                label={meta.title}
                                href={`/blog/${path}`}
                                {spanClass}
                                activeClass="flex items-center p-2 text-base font-normal text-gray-900 bg-primary-200 dark:bg-primary-700 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-primary-700"
                                on:click={toggleSide}
                                active={currentpathname === `/blog/${path}`}
                        />
                    {/each}
                </SidebarDropdownWrapper>
            </SidebarGroup>
        </SidebarWrapper>
    </Sidebar>
</Drawer>

<slot></slot>
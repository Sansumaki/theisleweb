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
    import {i} from "@inlang/sdk-js";

    let drawerHidden: boolean = false;
    let activateClickOutside = true;

    let breakPoint: number = 1024;
    let width: number;
    let height: number;
    $: topMargin = width >= breakPoint ? 80 : 60;
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

    $: currentpathname = $page.url.pathname;

    toggleDrawer.subscribe(i => {
        drawerHidden = false;
    });

    const toggleSide = () => {
        if (width < breakPoint) {
            drawerHidden = !drawerHidden;
        }
    };
</script>


<svelte:window bind:innerWidth={width} bind:innerHeight={height}/>

<Drawer
        leftOffset="top-0 h-screen left-0"
        transitionType="fly"
        backdrop={false}
        transitionParams={{x: -320, duration: 200, easing: sineIn}}
        bind:hidden={drawerHidden}
        bind:activateClickOutside
        width="w-64"
        style="top:{topMargin}px; height: {height - topMargin}px"
        id="sidebar"
        class=" bg-slate-100 dark:bg-slate-800"
>
    <div class="flex items-center">
        <CloseButton on:click={() => (drawerHidden = true)} class="mb-4 dark:text-white lg:hidden"/>
    </div>
    <Sidebar asideClass="w-54">
        <SidebarWrapper divClass="overflow-y-auto py-4 px-3 rounded">
            <SidebarGroup>
                <SidebarItem label="{i('theIsle.menu')}" href="/the-isle" on:click={toggleSide}
                             active={currentpathname === `/the-isle`}/>
                <SidebarItem label="{i('theIsle.dino.menu')}" href="/the-isle/dino" on:click={toggleSide}
                             active={currentpathname === `/the-isle/dino`}/>
                <SidebarDropdownWrapper label="{i('theIsle.maps.menu')}">
                    <SidebarItem label="Legacy V3" href="/the-isle/maps/v3" on:click={toggleSide}
                                 active={currentpathname === `/the-isle/maps/v3`}/>
                </SidebarDropdownWrapper>
            </SidebarGroup>
        </SidebarWrapper>
    </Sidebar>
</Drawer>

<div>
    <slot/>
</div>
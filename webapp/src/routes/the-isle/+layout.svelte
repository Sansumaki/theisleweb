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
    import {afterUpdate, onDestroy, onMount} from "svelte";
    import {showDrawer, toggleDrawer, drawerEnabled} from '$lib/stores/nav-store.ts'
    import {t} from '$lib/translations';

    const breakPoint: number = 1024;
    let drawerHidden: boolean = false;
    let activateClickOutside = true;

    let width: number;
    let height: number;
    $: topMargin = width >= breakPoint ? 80 : 60;
    $: breakPointReached = width < breakPoint;
    $: if (!drawerHidden && !breakPointReached && drawerEnabled) {
        showDrawer.set(true)
    } else {
        showDrawer.set(false)
    }
    $: if (breakPointReached) {
        drawerHidden = true;
        activateClickOutside = true;
    } else {
        drawerHidden = false;
        activateClickOutside = false;
    }

    function checkBreakPoint() {
        if (breakPointReached) {
            drawerHidden = true;
            activateClickOutside = true;
        } else {
            drawerHidden = false;
            activateClickOutside = false;
        }
    }

    onMount(() => {
        $drawerEnabled = true;
        checkBreakPoint();
    });

    afterUpdate(() => {
        $drawerEnabled = true;
        showDrawer.set(!drawerHidden && !breakPointReached && drawerEnabled);
        //checkBreakPoint();
    })

    onDestroy(() => {
        console.log("onDestroy")
        $drawerEnabled = false;
        $showDrawer = false;
    })

    $: currentpathname = $page.url.pathname;

    toggleDrawer.subscribe(_ => {
        console.log(drawerHidden)
        drawerHidden = !drawerHidden;
    });

    const toggleSide = () => {
        if (breakPointReached) {
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
                <SidebarItem label="{$t('theIsle.menu')}" href="/the-isle" on:click={toggleSide}
                             active={currentpathname === `/the-isle`}/>
                <SidebarItem label="{$t('theIsle.dino.menu')}" href="/the-isle/dino" on:click={toggleSide}
                             active={currentpathname === `/the-isle/dino`}/>
                <SidebarDropdownWrapper label="{$t('theIsle.maps.menu')}">
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
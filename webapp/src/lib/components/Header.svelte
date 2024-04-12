<script lang="ts">
    import {clickOutside} from "$lib/ClickOutside.js";
    import {t} from "$lib/translations/index.js";
    import {page} from "$app/stores";
    import Footer from "$lib/components/Footer.svelte";
    import {afterNavigate} from "$app/navigation";

    export let MenuItemsLeft: { name: string, link: string }[] = undefined
    export let MenuItemsRight: { name: string, link: string }[] = undefined
    export let MenuItemsFull: { name: string, items: { name: string, link: string, target: string }[] }[] = undefined
    export let HeaderHeight: writable<number> = undefined;
    export let SmallSpace: writable<boolean> = undefined;
    export let SmallHeader: boolean = false;

    let windowWidth: number, windowHeight: number, scrollY: number, svgHeight: number, headerHeightCalculated: number,
        short: boolean,
        isScrolled: boolean, menuOverlay: boolean;

    $: headerHeightCalculated = Math.round((windowWidth - 20) / 360 * 30)

    $: svgHeight = short ? 22 : headerHeightCalculated;

    $: if (scrollY > headerHeightCalculated + 10) {
        isScrolled = true;
    } else if (scrollY < 5) {
        isScrolled = false;
    }

    $: pathname = $page.url.pathname;
    $: short = windowHeight < 650 || isScrolled || SmallHeader;
    $: $SmallSpace = short;

    afterNavigate(() => {
        menuOverlay = false;
    });

    let toggle = function () {
        menuOverlay = !menuOverlay;
    }
</script>

<svelte:window bind:innerHeight={windowHeight} bind:innerWidth={windowWidth} bind:scrollY={scrollY}/>

<header bind:clientHeight={$HeaderHeight} use:clickOutside on:click_outside={() => menuOverlay = false}
        class="sticky z-50 top-0 left-0 flex-none w-full mx-auto px-4 bg-neutral border-b border-b-accent">
    <div style={windowWidth > 1280 ? 'height: ' + (short? 0 : svgHeight) + 'px' : undefined}
         class="justify-center flex transition-height duration-500">
        <a href="/"
           class="absolute transition-height duration-500 max-xl:mt-[0px] max-md:top-[16px] md:max-xl:top-[24px] {short ? 'mt-[0px] h-[22px] top-[33px]' : 'mt-[25px]'} max-xl:h-[17px] mx-[10px]">
            <svg height={svgHeight} class="transition-height duration-500 md:max-xl:h-[22px] max-md:h-[17px]"
                 viewBox="0 0 360 30" xmlns="http://www.w3.org/2000/svg" xml:space="preserve"
                 style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g transform="matrix(3.21932,0,0,2.88447,-124.953,-11.5454)">
        <g transform="matrix(12,0,0,12,96.6355,13.6074)">
        </g>
        <text x="39.296px" y="13.607px" class="fill-primary"
              style="font-family:'Arial-BoldMT', 'Arial', sans-serif;font-weight:700;font-size:12px">THE ISLE</text>
    </g>
                <g transform="matrix(0.768454,0,0,0.768454,46.5009,3.2886)">
        <g transform="matrix(34.6136,0,0,34.6136,404.676,24.8742)">
        </g>
                    <text x="170.663px" y="24.874px" class="fill-secondary"
                          style="font-family:'ArialMT', 'Arial', sans-serif;font-size:34.614px">SERVER INFO</text>
    </g>
                <g transform="matrix(0.503268,0,0,0.503268,202.141,14.5073)">
        <g transform="matrix(7.14769,0,0,7.14769,306.105,26.2171)">
        </g>
                    <text x="269.947px" y="26.217px" class="fill-accent"
                          style="font-family:'ArialMT', 'Arial', sans-serif;font-size:7.148px">by santasia</text>
    </g>
</svg>
        </a>
    </div>
    <div class="items-center flex h-[49px] md:h-[70px] justify-between container my-0 mx-auto xl:hidden">
        <button on:click={toggle} class="justify-end flex" aria-label="Open main menu">
            <svg xmlns="http://www.w3.org/2000/svg" role="button" tabindex="0" width="24" height="24"
                 class="h-6 w-6 shrink-0" aria-label="bars 3" fill="none" viewBox="0 0 24 24" stroke-width="2">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
        </button>
    </div>
    <div class="items-center flex h-[90px] justify-between container my-0 mx-auto max-xl:hidden">
        <ul class="justify-start flex">
            {#if MenuItemsLeft !== undefined}
                {#each MenuItemsLeft as item}
                    <li class="mr-[1.55vw]">
                        <a class="menu-item"
                                href="{item.link}" aria-current={pathname === item.link}>
                            {$t(item.name)}
                        </a>
                    </li>
                {/each}
            {/if}
        </ul>
        <ul class="justify-end flex">
            {#if MenuItemsRight !== undefined}
                {#each MenuItemsRight as item}
                    <li class="mr-[1.55vw]">
                        <a class="menu-item"
                                href="{item.link}" aria-current={pathname === item.link}>
                            {$t(item.name)}
                        </a>
                    </li>
                {/each}
            {/if}
            <li class="mr-[1.55vw]">
                <button on:click={toggle} class="menu-item" aria-label="Open main menu">
                    <svg xmlns="http://www.w3.org/2000/svg" role="button" tabindex="0" width="24" height="24"
                         class="h-6 w-6 shrink-0" aria-label="bars 3" fill="none" viewBox="0 0 24 24" stroke-width="2">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                              d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </li>
        </ul>
    </div>

    {#if menuOverlay}
        <Footer MenuItemsFull={MenuItemsFull} />
    {/if}
</header>


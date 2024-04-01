<script lang="ts">
	import '../app.postcss';
	import { page } from '$app/stores';
	import HeadBox from '$lib/components/HeadBox.svelte';
	import { t, locale, locales } from '$lib/translations';
	import headerImage from '$lib/images/FTR_EX.gif';
	import {
		Button,
		DarkMode,
		Footer,
		FooterCopyright,
		FooterIcon,
		FooterLink,
		FooterLinkGroup, Navbar,
		NavBrand,
		NavHamburger, NavLi, NavUl
	} from 'flowbite-svelte';
	import { Icon } from 'flowbite-svelte-icons';
	import ftr_logo from '$lib/images/FTR_EX.gif';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	let windowWidth: number, windowHeight: number, scrollY: number, svgHeight: number, headerHeightCalculated: number, short: boolean,
		isScrolled: boolean;

	const handleChange = ({ currentTarget }: { currentTarget: any }) => {
		const { value } = currentTarget;

		document.cookie = `lang=${value} ;`;
	};

	$: title = t.get($page.data.page?.title) ?? 'FTR The Isle';
	$: description = t.get($page.data.page?.content) ?? 'FTR The Isle Website';
	$: hideHeading = $page.data.page?.hideHeading ?? false;

	let menuItemsLeft = [
		{ name: 'ftr.menu', link: '/', group: true },
		{ name: 'about.menu', link: '/about', group: true }
	];
	let menuItemsRight = [
		{ name: 'theIsle.menu', link: '/the-isle', group: true },
		{ name: 'theIsle.maps.menu', link: '/the-isle/map', group: true },
		{ name: 'theIsle.dino.menu', link: '/the-isle/dino', group: true }
	];

	const headerHeight = writable<number>();

	$: headerHeightCalculated = Math.round((windowWidth - 20) / 360 * 30)

	$: svgHeight = short ? 22 : headerHeightCalculated;

	$: if (scrollY > headerHeightCalculated+10) {
		isScrolled = true;
	} else if (scrollY < 5) {
		isScrolled = false;
	}

	$: pathname = $page.url.pathname;
	$: short = windowHeight < 650 || isScrolled || pathname === "/the-isle/map";

	setContext("layout", {
		headerHeightStore: headerHeight
	})

	let toggle = function() {

	}
</script>

<svelte:head>
	<title>{title} | FTR; The Isle Info</title>
	<meta name="description"
				content="{description}, A webpage about the game community FTR mainly focused on the isle." />
	<meta name="kaywords" content="FTR, Fuck the revolution, the isle, isle, dino, dinosaur, game, map, santasia" />
	<meta name="author" content="Santasia, FTR">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta property="og:title" content="{title} | FTR; The Isle Info" />
	<meta property="og:description"
				content="{description}, A webpage about the game community FTR mainly focused on the isle." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="{$page.url.href}" />
	<meta property="og:image" content="{headerImage}" />
</svelte:head>

<svelte:window bind:innerHeight={windowHeight} bind:innerWidth={windowWidth} bind:scrollY={scrollY} />

<header bind:clientHeight={$headerHeight}
	class="sticky z-50 top-0 left-0 flex-none w-full mx-auto bg-[#000] text-[#fff] px-4 bg-gradient-to-b from-[#000009] via-[#001] via-15% to-[#242]">
	<!--<div style={windowWidth > 1280 ? 'height: ' + (short? 0 : svgHeight) + 'px' : windowWidth > 768 ? 'height: ' + 70+'px' : 'height: ' + 49+'px'}-->
	<div style={windowWidth > 1280 ? 'height: ' + (short? 0 : svgHeight) + 'px' : undefined}
			 class="justify-center flex transition-height duration-500">
		<!--class="transition-all duration-1000 max-md:h-[49px] max-xl:h-[70px] {short ? 'h-[49px] md:h-[70px]' : ''} max-xl:w-full items-center justify-center flex">-->
		<a href="/"
			 class="absolute transition-height duration-500 max-xl:mt-[0px] max-md:top-[16px] md:max-xl:top-[24px] {short ? 'mt-[0px] h-[22px] top-[33px]' : 'mt-[25px]'} max-xl:h-[17px] mx-[10px]">
			<!--class="absolute transition-height duration-1000 w-full max-xl:mt-[0px] {short ? 'mt-[0px] h-[17px]' : ''} max-xl:h-[17px] mt-[25px] mx-[10px]">-->
			<svg height={svgHeight} class="transition-height duration-500 md:max-xl:h-[22px] max-md:h-[17px]"
					 viewBox="0 0 360 30" xmlns="http://www.w3.org/2000/svg" xml:space="preserve"
					 style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g transform="matrix(3.21932,0,0,2.88447,-124.953,-11.5454)">
        <g transform="matrix(12,0,0,12,96.6355,13.6074)">
        </g>
			<text x="39.296px" y="13.607px"
						style="font-family:'Arial-BoldMT', 'Arial', sans-serif;font-weight:700;font-size:12px;fill:#89ffd5;">THE ISLE</text>
    </g>
				<g transform="matrix(0.768454,0,0,0.768454,46.5009,3.2886)">
        <g transform="matrix(34.6136,0,0,34.6136,404.676,24.8742)">
        </g>
					<text x="170.663px" y="24.874px"
								style="font-family:'ArialMT', 'Arial', sans-serif;font-size:34.614px;fill:#567939;">SERVER INFO</text>
    </g>
				<g transform="matrix(0.503268,0,0,0.503268,202.141,14.5073)">
        <g transform="matrix(7.14769,0,0,7.14769,306.105,26.2171)">
        </g>
					<text x="269.947px" y="26.217px"
								style="font-family:'ArialMT', 'Arial', sans-serif;font-size:7.148px;fill:#fff;">by santasia</text>
    </g>
</svg>
		</a>
	</div>
	<div class="items-center flex h-[49px] md:h-[70px] justify-between container my-0 mx-auto xl:hidden">
		<div></div>
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
			{#each menuItemsLeft as item}
				<li class="mr-[1.55vw] text-[#e2f8ff]">
					<a href="{item.link}" class="{pathname === item.link ? ' text-[#bfc9ff]' : ''}">
						{$t(item.name)}
					</a>
				</li>
			{/each}
		</ul>
		<ul class="justify-end flex">
			{#each menuItemsRight as item}
				<li class="mr-[1.55vw] text-[#e2f8ff]">
					<a href="{item.link}" class="{pathname === item.link ? ' text-[#bfc9ff]' : ''}">
						{$t(item.name)}
					</a>
				</li>
			{/each}
			<li class="mr-[1.55vw]">
				<button on:click={toggle} class="" aria-label="Open main menu">
					<svg xmlns="http://www.w3.org/2000/svg" role="button" tabindex="0" width="24" height="24"
							 class="h-6 w-6 shrink-0" aria-label="bars 3" fill="none" viewBox="0 0 24 24" stroke-width="2">
						<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
									d="M4 6h16M4 12h16M4 18h16"></path>
					</svg>
				</button>
			</li>
		</ul>
	</div>
</header>

<div class="px-4 mx-auto w-full">
	<main class="container my-5 mx-auto">
		{#if !hideHeading}
			<div class="mb-3">
				<HeadBox title={title}></HeadBox>
			</div>
		{/if}
		<slot />
	</main>
</div>

<footer>
	<Footer footerType="sitemap">
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
											 year={2023} />
			<div class="flex mt-4 space-x-6 sm:justify-center md:mt-0 items-center">
				<select bind:value="{$locale}" on:change={handleChange}>
					{#each $locales as value}
						<option value="{value}">{$t(`lang.${value}`)}</option>
					{/each}
				</select>
				<FooterIcon target="_blank" href="https://discord.gg/ftr">
					<Icon name="discord-solid"
								class="w-4 h-4 text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white" />
				</FooterIcon>
			</div>
		</div>
	</Footer>
</footer>
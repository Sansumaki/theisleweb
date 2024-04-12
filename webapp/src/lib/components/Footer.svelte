<script lang="ts">
    import {clickOutside} from "$lib/ClickOutside.js";
    import {t, locale, locales} from '$lib/translations';
    import {page} from "$app/stores";
    import ThemeSwitcher from "$lib/components/ThemeSwitcher.svelte";
    import {onMount} from "svelte";
    import {themes} from "$lib/themes/index.js";

    export let MenuItemsFull: { name: string, items: { name: string, link: string, target: string }[] }[] = undefined
    let className: string = '';
    let dropdown, currentLang;
    // noinspection ReservedWordAsName
    export {className as class};

    $: pathname = $page.url.pathname;

    onMount(() => {
        currentLang = $locale;
    })


    function closeDropdown() {
        dropdown?.removeAttribute("open");
    }

    $: if (currentLang) {
        $locale = currentLang;
        document.cookie = `lang=${currentLang} ;`;
        closeDropdown()
    }

    $: if ($locale != undefined) {
        console.log($locale)
        closeDropdown()
    }
</script>

<footer class={className}>
    <hr>
    <div class="w-full mx-auto px-4 bg-primary-background border-b border-b-primary-accent-secondary">
        {#if MenuItemsFull !== undefined}
            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 px-6 py-8">
                {#each MenuItemsFull as menu}
                    <div>
                        <h2 class="mb-6">{$t(menu.name)}</h2>
                        <ul class="">
                            {#each menu.items as item}
                                <li class="mb-4">
                                    <a
                                            class="menu-item"
                                            href="{item.link}" target="{item.target !== undefined ? item.target : '_self'}"
                                       aria-current={pathname === item.link}>
                                        {$t(item.name)}
                                    </a>
                                </li>
                            {/each}
                        </ul>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
    <div class="flex justify-between items-center container mx-auto my-2">
        <div class="justify-start text-xs">
            © 2024 <a href="/">Santasia™</a> All Rights Reserved.
        </div>
        <div class="justify-end text-sm">

            <ThemeSwitcher />

            <details class="dropdown dropdown-top" bind:this={dropdown} use:clickOutside on:click_outside={() => closeDropdown()}>
                <summary class="m-1 btn">Language
                    <svg
                            width="12px"
                            height="12px"
                            class="h-2 w-2 fill-current opacity-60 inline-block"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 2048 2048"
                    >
                        <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"/>
                    </svg>
                </summary>
                <ul
                        class="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52 flex flex-col gap-y-2"
                >
                    <!-- Theme Options -->
                    {#each $locales as value}
                        <li>
                            <!-- Radio Button for Each Theme -->
                            <input
                                    type="radio"
                                    name="theme-dropdown"
                                    bind:group={currentLang}
                                    class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                                    aria-label={$t(`lang.${value}`)}
                                    value={value}
                            />
                        </li>
                    {/each}
                </ul>
            </details>
        </div>
    </div>
</footer>
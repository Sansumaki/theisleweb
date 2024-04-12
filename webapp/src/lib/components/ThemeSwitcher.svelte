<script lang="ts">
    import {clickOutside} from "$lib/ClickOutside.js";
    import {themes} from '$lib/themes'
    import {onMount} from "svelte";

    let current_theme = ''
    let dropdown;

    onMount(() => {
        if (typeof window !== 'undefined') {
            const theme = window.localStorage.getItem('theme')
            if (theme && themes.includes(theme)) {
                document.documentElement.setAttribute('data-theme', theme)
                current_theme = theme
            }
        }
    })

    function set_theme(theme: string) {
        if (themes.includes(theme)) {
            const one_year = 60 * 60 * 24 * 365
            window.localStorage.setItem('theme', theme)
            document.cookie = `theme=${theme}; max-age=${one_year}; path=/;`
            document.documentElement.setAttribute('data-theme', theme)
        }
    }

    function closeDropdown() {
        dropdown.removeAttribute("open");
    }

    $: if (current_theme) {
        set_theme(current_theme)
        closeDropdown()
    }
</script>

<details class="dropdown dropdown-top" bind:this={dropdown} use:clickOutside on:click_outside={() => closeDropdown()}>
    <summary class="m-1 btn">Theme
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
        {#each themes as theme}
            <li>
                <!-- Radio Button for Each Theme -->
                <input
                        type="radio"
                        name="theme-dropdown"
                        bind:group={current_theme}
                        class="theme-controller btn btn-sm btn-block btn-ghost justify-start capitalize"
                        aria-label={theme}
                        value={theme}
                />
            </li>
        {/each}
    </ul>
</details>

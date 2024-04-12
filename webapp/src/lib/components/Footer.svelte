<script lang="ts">
    import {t, locale, locales} from '$lib/translations';
    import {page} from "$app/stores";

    export let MenuItemsFull: { name: string, items: { name: string, link: string, target: string }[] }[] = undefined
    let className: string = '';
    // noinspection ReservedWordAsName
    export {className as class};

    $: pathname = $page.url.pathname;

    const handleChange = ({currentTarget}: { currentTarget: any }) => {
        const {value} = currentTarget;

        document.cookie = `lang=${value} ;`;
    };
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
                                    <a href="{item.link}" target="{item.target !== undefined ? item.target : '_self'}" class="aria-current:text-primary-secondary"
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
            <select bind:value="{$locale}" on:change={handleChange} class="text-sm p-1 bg-transparent">
                {#each $locales as value}
                    <option value="{value}">{$t(`lang.${value}`)}</option>
                {/each}
            </select>
        </div>
    </div>
</footer>
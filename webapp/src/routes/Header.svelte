<script>
    import {page} from '$app/stores';
    import logo from '$lib/images/svelte-logo.svg';
    import github from '$lib/images/github.svg';
</script>

<header>
    <div class="corner">
        <a href="https://kit.svelte.dev">
            <img src={logo} alt="SvelteKit"/>
        </a>
    </div>

    <nav>
        <svg viewBox="0 0 2 3" aria-hidden="true">
            <path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z"/>
        </svg>
        <ul>
            <li>
                <i class="mi-menu"></i>
            </li>
        </ul>
        <ul>
            <li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
                <a href="/">The Isle</a>
            </li>
            <li aria-current={$page.url.pathname === '/dino' ? 'page' : undefined}>
                <a href="/dino">Dinosaur</a>
            </li>
            <li aria-current={$page.url.pathname === '/map' ? 'page' : undefined}>
                <a href="/map">Map</a>
            </li>
            <li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
                <a href="/about">About</a>
            </li>
            <li aria-current={$page.url.pathname.startsWith('/sverdle') ? 'page' : undefined}>
                <a href="/sverdle">Sverdle</a>
            </li>
        </ul>
        <svg viewBox="0 0 2 3" aria-hidden="true">
            <path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z"/>
        </svg>
    </nav>

    <div class="corner">
        <a href="https://github.com/Sansumaki/theisleweb">
            <img src={github} alt="GitHub"/>
        </a>
    </div>
</header>

<style>
    header {
        position: sticky;
        top: 0;
        z-index: 999;
        display: flex;
        justify-content: space-between;
    }

    .corner {
        width: 3em;
        height: 3em;
    }

    .corner a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    .corner img {
        width: 2em;
        height: 2em;
        object-fit: contain;
    }

    nav {
        display: flex;
        justify-content: center;
        --background: rgb(0, 255, 255);
        --color-text: #0a0a0a;
    }

    svg {
        width: 2em;
        height: 3em;
        display: block;
    }

    path {
        fill: var(--background);
    }

    ul {
        position: relative;
        padding: 0;
        margin: 0 -1px 0 -1px;
        height: 3em;
        display: flex;
        justify-content: center;
        align-items: center;
        list-style: none;
        background: var(--background);
        background-size: contain;
    }

    ul:first-of-type {
        display: none;
    }

    @media (max-width: 600px) {
        ul:first-of-type {
            display: block;
        }

        ul:last-of-type {
            display: none;
        }
    }

    li {
        position: relative;
        height: 100%;
    }

    li[aria-current='page']::before {
        --size: 6px;
        content: '';
        width: 0;
        height: 0;
        position: absolute;
        top: 0;
        left: calc(50% - var(--size));
        border: var(--size) solid transparent;
        border-top: var(--size) solid var(--color-theme-1);
    }

    nav a, i {
        display: flex;
        height: 100%;
        align-items: center;
        padding: 0 0.5rem;
        color: var(--color-text);
        font-weight: 700;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        text-decoration: none;
        transition: color 0.2s linear;
    }

    nav i {
        font-size: 2em;
    }

    a:hover {
        color: var(--color-theme-1);
    }
</style>

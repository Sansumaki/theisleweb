<script lang="ts">
    import {page} from '$app/stores';
    import discord from '$lib/images/discord.ico';
    import github from '$lib/images/github.svg';
    import {Anchor, Button, ActionIcon, Group, Tooltip, Flex, colorScheme} from "@svelteuidev/core";
    import {Sun, Moon} from 'radix-icons-svelte';

    let showMenu = false;

    let menuItems = [
        {name: "FTR", link: "/"},
        {name: "The Isle", link: "/the-isle"},
        {name: "Dinosaur", link: "/dino"},
        {name: "Map", link: "/map"},
        //{ name: "About", link: "/about" },
    ];

    function toggleTheme() {
        colorScheme.update((v) => (v === 'light' ? 'dark' : 'light'));
    }

    var currentScheme;
    colorScheme.subscribe((value) => currentScheme = value);
</script>

<Flex justify="space-between">
    <Anchor href="./"></Anchor>

    <Tooltip label="Toggle Theme" align="right">
        <ActionIcon variant="outline" color="gray" on:click={toggleTheme}>
            {#if currentScheme === 'dark'}
                <Sun></Sun>
            {:else }
                <Moon></Moon>
            {/if}
        </ActionIcon>
    </Tooltip>
</Flex>

<!--<header>-->
<!--    <div class="menu">-->
<!--        <div class="corner">-->
<!--            <a href="https://discord.gg/theisleftr">-->
<!--                <img src={discord} alt="Fuck the revolution Discord"/>-->
<!--            </a>-->
<!--        </div>-->

<!--        <nav class:showMenu>-->
<!--            <svg viewBox="0 0 2 3" aria-hidden="true">-->
<!--                <path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z"/>-->
<!--            </svg>-->
<!--            <ul class:showMenu class="item">-->
<!--                {#each menuItems as item}-->
<!--                    <li aria-current={$page.url.pathname === item.link ? 'page' : undefined}-->
<!--                        on:click={() => showMenu = false}>-->
<!--                        <a href="{item.link}">{item.name}</a>-->
<!--                    </li>-->
<!--                {/each}-->
<!--            </ul>-->
<!--            <svg viewBox="0 0 2 3" aria-hidden="true">-->
<!--                <path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z"/>-->
<!--            </svg>-->
<!--        </nav>-->

<!--        <div class="corner">-->
<!--            <a href="https://github.com/Sansumaki/theisleweb">-->
<!--                <img src={github} alt="GitHub"/>-->
<!--            </a>-->
<!--        </div>-->
<!--    </div>-->
<!--    <div class="selector" class:showMenu>-->
<!--        <div class="corner" class:showMenu>-->
<!--            <a href="https://discord.gg/theisleftr">-->
<!--                <img src={discord} alt="Fuck the revolution Discord"/>-->
<!--            </a>-->
<!--        </div>-->
<!--        <div class="button">-->
<!--            <svg viewBox="0 0 2 3" aria-hidden="true">-->
<!--                <path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z"/>-->
<!--            </svg>-->
<!--            <div class="item">-->
<!--                <a on:click={() => showMenu = !showMenu}>-->
<!--                    <i class="mi-menu"></i>-->
<!--                </a>-->
<!--            </div>-->
<!--            <svg viewBox="0 0 2 3" aria-hidden="true">-->
<!--                <path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z"/>-->
<!--            </svg>-->
<!--        </div>-->
<!--        <div class="corner">-->
<!--            <a href="https://github.com/Sansumaki/theisleweb">-->
<!--                <img src={github} alt="GitHub"/>-->
<!--            </a>-->
<!--        </div>-->
<!--    </div>-->
<!--</header>-->

<style lang="scss">
  header {
    --background: var(--color-theme-2);
    --text-color: #0a0a0a;

    position: sticky;
    top: 0;
    z-index: 999;
    display: flex;
    flex-direction: column;

    svg {
      width: 2em;
      height: 3em;
      display: block;

      path {
        fill: var(--background);
      }
    }

    .item {
      padding: 0;
      margin: 0 -1px 0 -1px;
      height: 3em;
      display: flex;
      list-style: none;
      background: var(--background);
      background-size: contain;
    }

    .corner {
      width: 3em;
      height: 3em;

      a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      }

      img {
        width: 2em;
        height: 2em;
        object-fit: contain;
        z-index: 10;
      }
    }

    .menu {
      display: flex;
      justify-content: space-between;

      nav {
        display: flex;
        justify-content: center;

        ul.menu-selector {
          display: none;
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

        a, i {
          display: flex;
          height: 100%;
          align-items: center;
          padding: 0 0.5rem;
          color: var(--text-color);
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
      }
    }

    @media (max-width: $small-width) {
      .menu ul, .menu svg, .menu .corner {
        display: none;
      }

      .menu {
        nav.showMenu {
          width: 100%;
          margin: 0;
        }

        ul.showMenu {
          display: flex;
          flex-direction: column;
          height: auto;
          width: 100%;
          margin: 0 auto;
        }

        li {
          padding: 0.5em 0;
          border-top: 1px solid black;

          a {
            margin: auto;
          }
        }
      }
    }

    .selector {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border-top: 1px solid black;

      .button {
        display: flex;

        a {
          display: flex;
          height: 100%;
          align-items: center;
          padding: 0.1em 0.1rem 0;
          color: var(--text-color);
          font-weight: 700;
          text-decoration: none;
          font-size: 2rem;
        }
      }
    }

    @media (min-width: $small-width) {
      .selector {
        display: none;
      }
    }
  }

</style>

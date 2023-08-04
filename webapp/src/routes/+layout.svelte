<script>
    import icon from '$lib/images/ftr.ico'
    import Header from './Header.svelte';
    import './styles.scss'
    import { page } from '$app/stores';
    import HeadBox from "$lib/components/HeadBox.svelte";
    import defaultBackground from '$lib/images/FTR_Pro.gif';

    $:title = $page.data.page?.title ?? "FTR The Isle";
    $:description = $page.data.page?.content ?? 'FTR The Isle Website';
    $:background = $page.data.page?.image ?? defaultBackground;
</script>

<svelte:head>
    <link rel="icon" type="image/svg" href={icon}/>
    <title>{title}</title>
    <meta name="description" content="{description}" />
</svelte:head>

<div class="app">
    <Header/>

    <main>
        <HeadBox background="{background}">{title}</HeadBox>
        <slot/>
    </main>

    <footer>
        <p>the isle info powered by &copy;FTR</p>
    </footer>
</div>

<style lang="scss">
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    max-width: 64rem;
    margin: 0 auto;
    box-sizing: border-box;
  }

  @media (max-width: $small-width) {
    main {
      padding-left: 0;
      padding-right: 0;
    }
  }

  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
    font-size: 0.7em;
    font-style: italic;
  }

  footer a {
    font-weight: bold;
  }

  @media (min-width: $small-width) {
    footer {
      padding: 12px 0;
    }
  }
</style>

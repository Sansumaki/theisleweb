<script>
    import HeaderBox from '$lib/components/HeaderBox.svelte';
    import './styles.scss'
    import {page} from '$app/stores';
    import defaultBackground from '$lib/images/FTR_Pro.gif';
    import {
        colorScheme,
        AppShell,
        Navbar,
        SvelteUIProvider,
        Header,
        Switch,
        Seo,
        Container,
        Card,
        Image,
        Group,
        BackgroundImage,
        Title,
        Text,
        Space, ShellSection, Footer, Grid
    } from "@svelteuidev/core";
    import FooterBox from "$lib/components/FooterBox.svelte";

    $:title = $page.data.page?.title ?? "FTR The Isle";
    $:description = $page.data.page?.content ?? 'FTR The Isle Website';
    $:background = $page.data.page?.image ?? defaultBackground;
</script>

<Seo title='{title}' titleTemplate="%t% | FTR The Isle" description="{description}"/>

<SvelteUIProvider withGlobalStyles themeObserver={$colorScheme}>
    <AppShell>
        <Header slot="header" fixed>
            <HeaderBox></HeaderBox>
        </Header>
        <ShellSection grow>
            <Container>
                <Card shadow="lg">
                    <Card.Section first padding='lg'>
                        <BackgroundImage src={background} height={300}>
                            <Space h="lg"/>
                            <Title color='#fff' order={1} align="center" transform='uppercase'>{title}</Title>
                            <Space h="lg"/>
                        </BackgroundImage>
                    </Card.Section>

                    <slot/>
                </Card>
            </Container>

        </ShellSection>

        <Footer slot="footer">
            <FooterBox></FooterBox>
        </Footer>
    </AppShell>
</SvelteUIProvider>

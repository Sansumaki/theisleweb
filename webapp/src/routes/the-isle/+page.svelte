<script lang="ts">
    import {Heading, Hr, P} from "flowbite-svelte";
    import {t} from '$lib/translations';
</script>

<Heading tag="h4">{$t('theIsle.content.heading')}</Heading>
<P class="my-4" justify>{$t('theIsle.content.content')}</P>
<Heading tag="h4">{$t('theIsle.content.heading2')}</Heading>
<P class="my-4" justify>{$t('theIsle.content.content2')}</P>

<Heading tag="h4">{$t('theIsle.content.buyHeading')}</Heading>
<P class="my-4" justify>{$t('theIsle.content.buyContent')}</P>

<a target="_blank" href="https://store.steampowered.com/app/376210/The_Isle/">
    <img src="https://cdn.akamai.steamstatic.com/steam/apps/376210/header.jpg?t=1653237914" height="90" alt="logo"/>
    <P class="my-4" justify>{$t('theIsle.content.buyLink')}</P>
</a>

<Hr/>

<Heading tag="h4">{$t('theIsle.faq.title')}</Heading>
<Heading tag="h5">{$t('theIsle.faq.heading1')}</Heading>
<P class="my-4" justify>{$t('theIsle.faq.content1')}</P>
<Heading tag="h5">{$t('theIsle.faq.heading2')}</Heading>
<P class="my-4" justify>{$t('theIsle.faq.content2')}</P>
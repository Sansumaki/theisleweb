<script lang="ts">
    import {Heading, Hr, P} from "flowbite-svelte";
    import {i} from "@inlang/sdk-js";
</script>

<Heading tag="h4">{i('theIsle.content.heading')}</Heading>
<P class="my-4" justify>{i('theIsle.content.content')}</P>
<Heading tag="h4">{i('theIsle.content.heading2')}</Heading>
<P class="my-4" justify>{i('theIsle.content.content2')}</P>

<Heading tag="h4">{i('theIsle.content.buyHeading')}</Heading>
<P class="my-4" justify>{i('theIsle.content.buyContent')}</P>

<a target="_blank" href="https://store.steampowered.com/app/376210/The_Isle/">
    <img src="https://cdn.akamai.steamstatic.com/steam/apps/376210/header.jpg?t=1653237914" height="90" alt="logo"/>
    <P class="my-4" justify>{i('theIsle.content.buyLink')}</P>
</a>

<Hr/>

<Heading tag="h4">{i('theIsle.faq.title')}</Heading>
<Heading tag="h5">{i('theIsle.faq.heading1')}</Heading>
<P class="my-4" justify>{i('theIsle.faq.content1')}</P>
<Heading tag="h5">{i('theIsle.faq.heading2')}</Heading>
<P class="my-4" justify>{i('theIsle.faq.content2')}</P>
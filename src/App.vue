<script setup>
import {RouterLink, RouterView} from 'vue-router';
import { watch, ref } from "vue";
import { useRoute } from 'vue-router';

const DEFAULT_TITLE = 'The Isle'

const route = useRoute();
const subTitle = ref("");
const headerClass = ref('');

watch(route, () => {
  subTitle.value = route.meta.subTitle || route.name;
  headerClass.value = route.name;
  document.title = DEFAULT_TITLE + ' - ' + route.meta.title;
})

</script>

<template>
  <header :class="headerClass">
    <h1>THE ISLE</h1>
    <p>{{subTitle.toUpperCase()}}</p>

    <div class="wrapper">

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/carnivores">Carnivours</RouterLink>
        <RouterLink to="/herbivores">Herbivoiurs</RouterLink>
        <RouterLink to="/maps">Map</RouterLink>
        <RouterLink to="/damage">Damage</RouterLink>
        <RouterLink to="/ftr">FTR</RouterLink>
        <RouterLink to="/opendinos">OpenDinos</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView/>

  <footer>
    <h2></h2>
    <div>
      <RouterLink to="/about">Quellen</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </div>
  </footer>
</template>

<style scoped>
header {
  font-family: Verdana,sans-serif;
  padding: 30px;
  text-align: center;
  line-height: 1.5;
  max-height: 100vh;
  background-image: url('assets/Hintergrundstartseite.gif');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;
}

.carnivores {
  background-image: url('assets/Carnivores.jpg');
}
.herbivores {
  background-image: url('assets/Herbivores.jpg');
}
.maps {
  background-image: url('assets/maps.jpg');
}

header h1 {
  font-size: 3rem;
  color: var(--isle-blue);
  text-shadow: 2px 2px #000;
}
header p {
  font-size: 1.5rem;
  color: var(--isle-blue);
  text-shadow: 2px 2px #000;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  text-shadow: 2px 2px #000;
}

nav a.router-link-exact-active {
  color: #55AAAA;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

footer {
  padding: 20px;
  background: #333;
  margin-top: 20px;
}
</style>

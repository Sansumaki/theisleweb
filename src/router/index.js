import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { nextTick } from 'vue';
import CarnivoresView from "@/views/CarnivoresView.vue";
import HerbivoresView from "@/views/HerbivoresView.vue";
import MapsView from "@/views/MapsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Home', subTitle: 'hunt. grow. survive!' }
    },
    {
      path: '/carnivores',
      name: 'carnivores',
      component: CarnivoresView,
      meta: { title: 'Carnivores' }
    },
    {
      path: '/herbivores',
      name: 'herbivores',
      component: HerbivoresView,
      meta: { title: 'Herbivores' }
    },
    {
      path: '/maps',
      name: 'maps',
      component: MapsView,
      meta: { title: 'Maps' }
    },
    {
      path: '/damage',
      name: 'damage',
      component: MapsView,
      meta: { title: 'Damage' }
    },
    {
      path: '/ftr',
      name: 'ftr',
      component: MapsView,
      meta: { title: 'FTR' }
    },
    {
      path: '/opendinos',
      name: 'opendinos',
      component: MapsView,
      meta: { title: 'Open Dinos' }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { title: 'About', header: 'about.png' }
    }
  ]
})

const DEFAULT_TITLE = "The Isle"
router.afterEach((to, from) => {
  nextTick(() => {
    //document.title = DEFAULT_TITLE + ' - ' + to.meta.title;
  }).then(() => {})
});

export default router

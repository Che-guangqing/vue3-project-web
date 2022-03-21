import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import Article from '../views/Article.vue'
import Hero from '../views/Hero.vue'
import HeroeSkins from '../views/HeroSkins.vue'
import AllHeroes from '../views/AllHeroes.vue'
import AllNews from '../views/AllNews.vue'
import Introduction from '../views/Introduction.vue'


const routes = [
  {
    path: '/',
    component: Main,
    children: [
      { path: '/', name: 'home', component: Home },
      { path: '/articles/:id', name: 'article', component: Article, props: true },
      { path: '/articles/:id', name: 'article', component: Article, props: true },
      { path: '/introduction', name: 'introduction', component: Introduction,}
    ]
  },
  {path: '/heroes/:id', name: 'hero', component: Hero, props: true},
  {path: '/heroeSkins', name: 'heroeSkins', component: HeroeSkins, props: true},
  {path: '/allHeroes', name: 'allHeroes', component: AllHeroes, props: true},
  {path: '/allNews', name: 'allNews', component: AllNews, props: true},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/iconfont/iconfont.css'
import './assets/scss/style.scss'


import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';

import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

import Card from './components/Card.vue'
import ListCard from './components/ListCard.vue'

createApp(App)
  .use(store)
  .use(router)
  .component('Swiper', Swiper)
  .component('SwiperSlide', SwiperSlide)
  .component('MyCard', Card)
  .component('MyListCard', ListCard)
  .mount('#app')

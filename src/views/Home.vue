<template>
  <div class="home-warp">

    <!-- swiper -->
    <swiper 
      :autoplay="swiperOption.autoplay" 
      :loop="swiperOption.loop" 
      :speed="swiperOption.speed" 
      :pagination="swiperOption.pagination"
    >
      <swiper-slide v-for="item in adList.items" :key="item._id">
        <img class="w-100" :src="item.image" alt />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-1" slot="pagination"></div>
    </swiper>

    <!-- nav icons -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <div
          class="nav-item mb-3"
          v-for="(item, index) in navItem"
          :key="index"
        >
          <!-- 图标 精灵图片-->
          <i class="sprite" :class="item.icon"></i>
          <div class="py-2">{{ item.name }}</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>

    <!-- news -->
    <my-list-card
      icon="menu1"
      title="新闻资讯"
      :categories="newsCats"
    >
      <template #items="{ category }">
        <router-link
          tag="div"
          :to="`/articles/${news._id}`"
          class="py-2 fs-lg d-flex"
          v-for="(news, i) in category.newsList"
          :key="i"
        >
          <span class="text-info" :class="setClass(news.categoryName)">[{{ news.categoryName }}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{ news.title }}</span>
          <span class="text-grey-1 fs-sm">{{ formatDate(news.createdAt, '/') }}</span>
        </router-link>
      </template>
    </my-list-card>

    <!-- heroes -->
    <my-list-card
      icon="card-hero"
      title="英雄列表"
      :categories="heroCats"
    > 
      <!-- banner -->
      <swiper
        class="hero-swiper"
        :autoplay="swiperOption.autoplay" 
        :loop="swiperOption.loop" 
        :speed="swiperOption.speed" 
        :pagination="swiperOption.pagination"
      >
        <swiper-slide v-for="item in heroBanner.items" :key="item._id">
          <img class="w-100" :src="item.image" alt />
        </swiper-slide>
        <div class="swiper-pagination pagination-home text-right px-3 pb-1" slot="pagination"></div>
      </swiper>

      <!-- heroes -->
      <template #items="{ category }">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem">
          <router-link
            tag="div"
            :to="`/heroes/${hero._id}`"
            class="p-2 text-center"
            style="width: 20%"
            v-for="(hero, i) in category.heroList"
            :key="i"
          >
            <img :src="hero.avatar" class="w-100" />
            <div>{{ hero.name }}</div>
          </router-link>
        </div>
      </template>
    </my-list-card>
  </div>

</template>

<script>
import dayjs from "dayjs";
import { reactive, toRefs, onMounted } from 'vue'
import { getAdList, getBannerList, getNewsList, getHeroesList } from '../api/apis'
export default {
  name: 'Home',
  setup() {

    const swiperOption = {
      pagination: {
        el: ".pagination-home",
      },
      autoplay:{
        delay:3000,
        disableOnInteraction: false
      },
      loop:true,
      speed:500,
    }

    const state = reactive({
      adList: {}, 
      navItem: [
        { name: "爆料站", icon: "sprite-news" },
        { name: "故事站", icon: "sprite-story" },
        { name: "周边商城", icon: "sprite-shop" },
        { name: "体验服", icon: "sprite-tiyan" },
        { name: "新人专区", icon: "sprite-newpeople" },
        { name: "荣耀传承", icon: "sprite-inherit" },
        { name: "王者营地", icon: "sprite-camp" },
        { name: "公众号", icon: "sprite-public" },
        { name: "版本介绍", icon: "sprite-edition" },
        { name: "对局环境", icon: "sprite-duiju" },
        { name: "无限王者团", icon: "sprite-wangzhetuan" },
        { name: "创意互动营", icon: "sprite-interaction" },
      ],
      newsCats: [],
      heroBanner: {},
      heroCats: []
    })

    onMounted(() => {
      fetchAds()
      fetchNews()
      fetchBanner()
      fetchHeroes()
    })

    // 首页轮播
    const fetchAds = async () => {
      const res = await getAdList();
      const { statusText, data } = res
      if( statusText === 'OK' ) {
        state.adList = data
      }
    }

    // 新闻列表
    const fetchNews = async () => {
      const res = await getNewsList();
      const { statusText, data } = res
      if( statusText === 'OK' ) {
        state.newsCats = data
      }
    }

    // Banner列表
    const fetchBanner = async () => {
      const res = await getBannerList();
      const { statusText, data } = res
      if( statusText === 'OK' ) {
        state.heroBanner = data
      }
    }

    // 英雄列表
    const fetchHeroes = async () => {
      const res = await getHeroesList();
      const { statusText, data } = res
      console.log(res);
      if( statusText === 'OK' ) {
        state.heroCats = data
      }
    }

    const formatDate = (date, type) => {
      let data 
      if(type === '/') {
        data = dayjs(date).format("MM/DD");
      } else if(type === '-') {
        data = dayjs(date).format("MM-DD");
      }
      return data
    }

    const setClass = (category) => {
      let className = ''
      switch (category) {
        case '热门':
          className = 'red'
          break;
        case '新闻':
          className = 'green'
          break;
        case '公告':
          className = 'orange'
          break;
        case '活动':
          className = 'red'
          break;
        case '赛事':
          className = 'blue'
          break;
        default:
          break;
      }
      return className
    }

    return {
      swiperOption,
      ...toRefs(state),
      formatDate,
      setClass
    }
  }
}
</script>
<style lang="scss" >
@import "../assets/scss/variables";
.home-warp {
  .pagination-home {
    .swiper-pagination-bullet {
      opacity: 1;
      border-radius: 0.1538rem;
      background: map-get($colors, "white");
      &.swiper-pagination-bullet-active {
        background: map-get($colors, "info");
      }
    }
  }
  .nav-icons {
    border-top: 1px solid $border-color;
    border-bottom: 1px solid $border-color;
    .nav-item {
      width: 25%;
      border-right: 1px solid $border-color;
      &:nth-child(4n) {
        border-right: none;
      }
    }
  }
  .hero-banner {
    transform: translateY(-13px);
  }
  // 修改精彩视频nav样式
  .video-warp {
    .card-body {
      .nav {
          display: flex;
          justify-content: start;
          .nav-item {
              margin-right: 3.125rem;
          }
      }
    }
    .video-img {
      height: 100px;
    }
  }
  .hero-swiper{
    margin-bottom: 10px;
  }

  .text-info{
    &.red{
      color: #ff3636;
      border-color: #ff3636;
    }
    &.green{
      color: #1e96ab;
      border-color: #1e96ab;
    }
    &.orange{
      color: #f09a37;
      border-color: #f09a37;
    }
    &.blue{
      color: #4d9cff;
      border-color: #4d9cff;

    }
  }
}
</style>

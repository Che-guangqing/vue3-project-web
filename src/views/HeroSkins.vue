<template>
    <div class="page-skins">
        <div class="topbar bg-black py-2 px-3 d-flex ai-center text-white">
            <img src="../assets/logo.png" height="30" />
            <div class="px-2">
                <div class="text-white">王者荣耀</div>
                <div class="text-grey-1 fs-xxs mt-1">团队成就更多</div>
            </div>
        </div>
        <div class="mt-1 pl-1 pr-1">
          <swiper 
            :loop="swiperOption.loop" 
            :speed="swiperOption.speed" 
            :pagination="swiperOption.pagination"
          >
            <swiper-slide v-for="item in skin" :key="item._id">
              <img class="w-100" :src="item.img" alt />
              <div class="skin-name">{{item.name}}</div>
            </swiper-slide>
            <div class="swiper-pagination pagination-home text-right px-3 pb-1" slot="pagination"></div>
          </swiper>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue'
import { useRoute } from "vue-router"

export default {
  setup() {
    const swiperOption = {
      pagination: {
        el: ".pagination-home",
      },
      loop:true,
      speed:500,
    }

    const skin  = ref([])

    const route = useRoute();

    skin.value = JSON.parse(route.query.data)
    console.log(skin.value);

    return {
      swiperOption,
      skin
    }
  }
}
</script>
<style lang="scss">
@import "../assets/scss/variables";
.page-skins{
    width: 100vw;
    height: 100vh;
    background-color: map-get($colors, "white");
    .skin-name{
        text-align: center;
    }
    .my-swiper-warp{
        height:46.25rem;
    }
    .pagination-home {
      .swiper-pagination-bullet {
        opacity: 1;
        width: 0.75rem;
        height: 0.3125rem;
        border-radius: 0.1538rem;
        background: map-get($colors, "grey");
        &.swiper-pagination-bullet-active {
            width: 1.0625rem;
            background: map-get($colors, "dark-1");
        }
      }
    }
}

</style>
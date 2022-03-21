<template>
  <div class="mt-4 pl-3 pr-3">
    <div class="nav jc-between">
      <div
        class="nav-item"
        :class="{ active: active === i }"
        v-for="(category, i) in categories"
        :key="i"
        @click="changNav(i)"
      >
        <div class="nav-link">{{ category.name }}</div>
      </div>
    </div>
    <div class="pt-3">
      <swiper
        ref="list"
        :options="{ autoHeight: true }"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <swiper-slide v-for="(category, i) in categories" :key="i">
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
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script>
import { getHeroesList } from '../api/apis'
import { computed, reactive, toRefs, onMounted } from 'vue'
export default {

  setup() {
    const state = reactive({
      categories:[],
      active: 0,
      swiperEl: {}
    })

    const onSwiper = (swiper) => {
      state.swiperEl = swiper
    };
    const changNav = (i) => {
      state.swiperEl.slideTo(i)
    };
    const onSlideChange = () => {
      // 滑动
      state.active = state.swiperEl.realIndex
    };

    const fetchHeros = async () => {
      const res = await getHeroesList();
      const { statusText, data } = res
      if( statusText === 'OK' ) {
        let resData = data.splice(1,6);
        let all = []
        for (let i = 0; i < resData.length; i++) {
            let hero = resData[i].heroList
            for (let j = 0; j < hero.length; j++) {
              all.push(hero[j])
            }
        }
        resData.unshift( { name: '全部', heroList: all })
        state.categories = resData
        console.log(resData, "英雄列表");
      }

    }

    fetchHeros()

    return {
      ...toRefs(state),
      onSwiper,
      changNav,
      onSlideChange
    }
  }

};
</script>

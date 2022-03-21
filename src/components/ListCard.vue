<template>
  <my-card :icon="icon" :title="title">
    <slot></slot>

    <!-- nav -->
    <div class="nav jc-between">
      <div 
       class="nav-item" 
       :class="{active: active === i}"
       v-for="(category,i) in categories" 
       :key="i"
       @click="changNav(i)"
      >
        <div class="nav-link">{{category.name}}</div>
      </div>
    </div>

    <div class="pt-3">
      <swiper
        @swiper="onSwiper"
        @slideChange="onSlideChange"
       :options="{ autoHeight: true }"
       >
        <swiper-slide v-for="(category, i) in categories" :key="i">
          <slot name="items" :category="category"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </my-card>
</template>

<script>
import { reactive, ref } from 'vue';
export default {
  props: {
    icon: { type: String, required: false },
    title: { type: String, required: false },
    categories: { type: Array, required: false },
  },
  setup() {
    const active = ref(0)
    let swiperEl = reactive({})

    const onSwiper = (swiper) => {
      swiperEl = swiper
    };
    const changNav = (i) => {
      swiperEl.slideTo(i)
    };
    const onSlideChange = () => {
      // 滑动
      active.value = swiperEl.realIndex
    };
    return {
      active,
      changNav,
      onSwiper,
      onSlideChange
    }
  }

};
</script>

<style>
</style>

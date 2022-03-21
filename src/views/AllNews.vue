<template>

  <swiper :autoplay="swiper_options.autoplay" :loop="swiper_options.loop" :speed="swiper_options.speed" :pagination="swiper_options.pagination">
      <swiper-slide>1</swiper-slide>
      <swiper-slide>2</swiper-slide>
  </swiper>
</template>

<script>



import {reactive,ref} from 'vue';
export default {
  name:'Home',

  setup() {
    // swiper相关配置属性放在swiper_options这个变量里
    let swiper_options = reactive({
      autoplay:{
        delay:3000,
        disableOnInteraction: false
      },
      loop:true,
      speed:500,
      pagination:{
        clickable: true
      }
    })
    // 将swiper_options返回给模板中的swiper组件使用
    return {swiper_options};
  }
}
</script>

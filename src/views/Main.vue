<template>
  <div>
    <div class="topbar bg-black py-2 px-3 d-flex ai-center">
      <img src="../assets/logo.png" height="30">
      <div class="px-2 flex-1">
        <div class="text-white">王者荣耀</div>
        <div class="text-grey-1 fs-xxs">团队成就更多</div>
      </div>
      <button type="button" class="btn bg-primary">立即下载</button>
    </div>
    <div class="bg-primary pt-3 pb-2">
      <div class="nav nav-inverse pb-1 jc-around">

        <!-- tag无效 -->
        <!-- <div class="nav-item active" v-for="(nav,i ) in navData" :key="i">
          <router-link class="nav-link" tag="li" :to="nav.link">{{nav.name}}</router-link>
        </div> -->
        
        <div :class="{'nav-item':true, active: curIndex === i }" v-for="(nav,i ) in navData" :key="i" @click="changeIndex(i)">
          <router-link  :to="nav.link"  custom v-slot="{ navigate }" >
            <div @click="navigate" @keypress.enter="navigate" >{{nav.name}}</div>
          </router-link>
        </div>

      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const navData = [
      { name: '首页', link: '/' },
      { name: '攻略中心', link: '/introduction' },
      { name: '赛事中心', link: '/' },
      { name: 'IP新游', link: '/' },
    ]

    const curIndex = ref(0)
    const changeIndex = (i) => {
      curIndex.value = i
    }

    return {
      curIndex,
      navData,
      changeIndex
    }
  },
}
</script>
<style lang="scss">
.topbar {
  position: sticky;
  top: 0;
  z-index: 999;
}

</style>
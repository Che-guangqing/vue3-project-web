<template>
  <div class="card bg-white p-3 mt-3">
    <div 
     class="card-header d-flex ai-center" 
     :class="{'border-bottom': !plain, 'pb-3': !plain}"
    >
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <div class="fs-xl flex-1 px-2">
        <strong>{{title}}</strong>
      </div>
      <router-link  to="/"  custom v-slot="{ navigate }" >
        <i class="iconfont icon-menu" v-if="!plain" @click="navigate" @keypress.enter="navigate"></i>
      </router-link>
      <!-- <router-link tag="div"  to="/"> 
        <i class="iconfont icon-menu" v-if="!plain"></i> 
      </router-link> -->
    </div>
    <div class="card-body pt-3">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: false },
    icon: { type: String, required: false },
    plain: { type: Boolean },
  }
};
</script>

<style lang="scss">
@import "../assets/scss/variables";
.card {
  border-bottom: 1px solid $border-color;
}
</style>

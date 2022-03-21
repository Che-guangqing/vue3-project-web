<template>
  <div class="page-hero" v-if="model">

    <!-- 顶部 -->
    <div class="topbar bg-black py-2 px-3 d-flex ai-center text-white">
      <img src="../assets/logo.png" height="30" />
      <div class="px-2 flex-1">
        <span class="text-white">王者荣耀</span>
        <span class="ml-2">攻略站</span>
      </div>
      <!-- <router-link to="/allHeroes" tag="div">更多英雄 &gt;</router-link> -->
      <router-link  to="/allHeroes" custom v-slot="{ navigate }" >
        <div @click="navigate" @keypress.enter="navigate" >更多英雄 &gt;</div>
      </router-link>
    </div>

    <!-- 信息 -->
    <div class="top" :style="{'background-image': `url(${model.banner})`}">
      <div class="info text-white p-3 h-100 d-flex flex-column jc-end">
        <div class="fs-sm">{{model.title}}</div>
        <h2 class="my-2">{{model.name}}</h2>
        <div class="fs-sm">{{model.categories.map(v => v.name).join('/')}}</div>
        <div class="d-flex jc-between pt-2">
          <div class="scores d-flex ai-center" v-if="model.scores">
            <span>难度</span>
            <span class="badge bg-primary">{{model.scores.difficult}}</span>
            <span>技能</span>
            <span class="badge bg-blue-1">{{model.scores.skills}}</span>
            <span>攻击</span>
            <span class="badge bg-danger">{{model.scores.attack}}</span>
            <span>生存</span>
            <span class="badge bg-dark">{{model.scores.survive}}</span>
          </div>

          <span class="text-grey fs-lg" @click="toHeroeSkins(model.skin)">皮肤: {{model.skin && model.skin.length}} &gt;</span>
          <!-- <router-link :to="{name: 'heroeSkins', params:{data:model.skin}}" tag="span" ></router-link> -->
        </div>
      </div>
    </div>

    <div>
      <div class="bg-white px-3">
        <div class="nav d-flex jc-around pt-3 pb-2 border-bottom">
          <div class="nav-item active">
            <div class="nav-link">英雄初识</div>
          </div>
          <div class="nav-item">
            <div class="nav-link">进阶攻略</div>
          </div>
        </div>
      </div>
      <swiper>
        <swiper-slide>
          <div>
            <div class="p-3 bg-white border-bottom">
              <div class="d-flex">
                <router-link tag="button" to="/" class="btn btn-lg flex-1">
                  <i class="iconfont icon-menu1"></i>
                  英雄介绍视频
                </router-link>
                <router-link tag="button" to="/" class="btn btn-lg flex-1 ml-2">
                  <i class="iconfont icon-menu1"></i>
                  英雄介绍视频
                </router-link>
              </div>

              <!-- skills -->
              <div class="skills bg-white mt-4">
                <div class="d-flex jc-around">
                  <img
                    class="icon"
                    @click="currentSkillIndex = i"
                    :class="{active: currentSkillIndex === i}"
                    :src="item.icon"
                    v-for="(item, i) in model.skills"
                    :key="item.name"
                  />
                </div>
                <div v-if="currentSkill">
                  <div class="d-flex pt-4 pb-3">
                    <h3 class="m-0">{{currentSkill.name}}</h3>
                    <span class="text-grey-1 ml-4">
                      (冷却值: {{currentSkill.delay}}
                      消耗: {{currentSkill.cost}})
                    </span>
                  </div>
                  <p>{{currentSkill.description}}</p>
                  <div class="border-bottom"></div>
                  <p class="text-grey-1">小提示: {{currentSkill.tips}}</p>
                </div>
              </div>
            </div>
            <my-card plain icon="menu1" title="加点建议" v-if="suggest.major && suggest.minor && suggest.skill">
                <div class="d-flex jc-between" >
                    <div style="width: 25%" class="text-center">
                        <div class="fs-lg mb-3">主升</div>
                        <img :src="suggest.major.icon" class="sug-icon">
                        <div class="fs-xs mt-1">{{suggest.major.name}}</div>
                    </div>
                    <div style="width: 25%" class="text-center">
                        <div class="fs-lg mb-3">次升</div>
                        <img :src="suggest.minor.icon" class="sug-icon">
                        <div class="fs-xs mt-1">{{suggest.minor.name}}</div>
                    </div>
                    <div style="width: 38%">
                        <div class="fs-lg mb-3 text-center">召唤师技能</div>
                        <div class="d-flex jc-between">
                            <div class="" v-for="item in suggest.skill" :key="item._id">
                                <img :src="item.icon" class="sug-icon">
                                <div class="fs-xs mt-1 text-center">{{item.name}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </my-card>
            <my-card plain icon="menu1" title="出装推荐" class="hero-items">
              <div class="fs-xl">顺风出装</div>
              <div class="d-flex jc-around text-center mt-3">
                <div v-for="item in model.items1" :key="item.name">
                  <img :src="item.icon" class="icon">
                  <div class="fs-xs mt-1">{{item.name}}</div>
                </div>
              </div>
              <div class="border-bottom mt-3"></div>
              <div class="fs-xl mt-3">逆风出装</div>
              <div class="d-flex jc-around text-center mt-3">
                <div v-for="item in model.items2" :key="item.name">
                  <img :src="item.icon" class="icon">
                  <div class="fs-xs mt-1">{{item.name}}</div>
                </div>
              </div>
            </my-card>
            <my-card plain icon="menu1" title="使用技巧">
              <p class="m-0">{{model.usegeTips}}</p>
            </my-card>
            <my-card plain icon="menu1" title="对抗技巧">
              <p class="m-0">{{model.battleTips}}</p>
            </my-card>
            <my-card plain icon="menu1" title="团战思路">
              <p class="m-0">{{model.teamTips}}</p>
            </my-card>
            <my-card plain icon="menu1" title="英雄关系">
              <div class="fs-xl">最佳搭档</div>
              <div v-for="item in model.partners" :key="item.name" class="d-flex pt-3">
                <img :src="item.hero.avatar" alt="" height="50" >
                <p class="flex-1 m-0 ml-3">
                  {{item.description}}
                </p>
              </div>
              <div class="border-bottom mt-3 mb-3"></div>
              <div class="fs-xl">被谁克制</div>
              <div v-for="item in model.byWhoControl" :key="item.name" class="d-flex pt-3">
                <img :src="item.hero.avatar" alt="" height="50" >
                <p class="flex-1 m-0 ml-3">
                  {{item.description}}
                </p>
              </div>
              <div class="border-bottom mt-3 mb-3"></div>
              <div class="fs-xl">克制谁</div>
              <div v-for="item in model.controlWho" :key="item.name" class="d-flex pt-3">
                <img :src="item.hero.avatar" alt="" height="50" >
                <p class="flex-1 m-0 ml-3">
                  {{item.description}}
                </p>
              </div>
            </my-card>
            
          </div>
        </swiper-slide>
        <swiper-slide></swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>

import { getHeroesDetail } from '../api/apis'
import { computed, reactive, toRefs,  } from 'vue'
import { useRouter, useRoute  } from "vue-router"

export default {
  name: 'Home',
  props: {
    id: { required: true }
  },
  setup(props) {

    const state = reactive({
      model: {
        banner: '',
        avatar: '',
        battleTips: '',
        byWhoControl: [],
        callSkills: [],
        categories: [],
        controlWho: [],
        items1: [],
        items2: [],
        name: '',
        partners: [],
        scores: {},
        skills: [],
        skin: [],
        teamTips: '',
        usegeTips: ''
      }, 
      currentSkillIndex: 0,
      suggest: {},
    })


    const fetchHeroesDetail = async () => {
      const res = await getHeroesDetail(props.id);
      const { statusText, data } = res
      if( statusText === 'OK' ) {
        state.model = data
        state.suggest.major = data.skills.filter(item => item.isMajor && item.isMajor === 1).pop()
        state.suggest.minor = data.skills.filter(item => item.isMajor && item.isMajor === 2).pop()
        state.suggest.skill = data.callSkills
        console.log(data);
      }
    }

    const router = useRouter()
    const toHeroeSkins = (data) => {
      console.log(data);
      router.push({
        name: 'heroeSkins',
        query: {
          data: JSON.stringify(data)
        }
      })
    }

    fetchHeroesDetail()

    const currentSkill = computed(() => {
      return state.model.skills && state.model.skills[state.currentSkillIndex];
    })

    return {
      currentSkill,
      ...toRefs(state),
      toHeroeSkins
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

.page-hero {
  .top {
    height: 50vw;
    background: #fff no-repeat top center;
    background-size: auto 100%;
  }
  .info {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    .scores {
      .badge {
        margin: 0 0.25rem;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        line-height: 0.9rem;
        text-align: center;
        border-radius: 50%;
        font-size: 0.6rem;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
    }
  }
  .skills {
    img.icon {
      width: 70px;
      height: 70px;
      border: 3px solid map-get($colors, 'white');
      &.active {
        border-color:map-get($colors, 'primary');
      }
      border-radius: 50%;
    }
  }
  .sug-icon{
      width: 60px;
      height: 60px;
      border-radius: 50%;
  }
  .hero-items {
      &.card{
          margin-top: -2px;
      }
    img.icon{
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
  }
}
</style>
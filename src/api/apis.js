import request from './http'

// 首页轮播
export function getAdList() {
  return request({
    url: '/ads/list/首页轮播',
    method: 'get',
  })
}

// 新闻列表
export function getNewsList() {
  return request({
    url: 'news/list',
    method: 'get',
  })
}

// 新闻detail
export function getNewsDetail(id) {
  return request({
    url: `articles/${id}`,
    method: 'get',
  })
}

// banner
export function getBannerList() {
  return request({
    url: '/ads/list/HeroBanner',
    method: 'get',
  })
}


// 英雄列表
export function getHeroesList() {
  return request({
    url: '/heroes/list',
    method: 'get',
  })
}

// 英雄detail
export function getHeroesDetail(id) {
  return request({
    url: `heroes/${id}`,
    method: 'get',
  })
}


// 视频列表
export function getnVideoList() {
  return request({
    url: 'video/list',
    method: 'get',
  })
}


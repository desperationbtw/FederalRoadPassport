import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: require('@/components/HomePage').default
    },
    {
      path: '/map',
      name: 'map-page',
      component: require('@/components/MapPage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

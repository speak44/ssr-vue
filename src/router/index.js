import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)


  //作为一个工厂函数，每次用户请求返回一个新的router实例


  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]




// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })

// export default router

//作为一个工厂函数，每次用户请求返回一个新的router实例
export default function createRouter(){
  return new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })
}

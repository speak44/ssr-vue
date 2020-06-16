import Vue from 'vue'
import App from './App.vue'
import createRouter from './router'
import {createStore} from './store'

Vue.config.productionTip = false

// 添加全局混入 mixin
// 混入到 beforeMount钩子中
// 服务端中不会被触发beforeMount，因为对服务端来说直接渲染页面，不存在Dom挂在，所以不会触发这个钩子
// 所以只会在客户端执行 beforMount
Vue.mixin({
  beforeMount() { // 这个钩子执行的时候vue实例已经存在了，在前端已经挂载过了。所以可以从this中去获取sotre
    const {asyncData} =this.$options
    if(asyncData){
      //存在就调用
      asyncData(
        {
          store: this.$store, // this 指的是vue实例
          route: this.$route
        }
      )//这里需要传参数
    }
  },
})


// 每个请求获取一个单独的vue实例
// 调用者是entry-server(首屏渲染) 会传递参数是上下文对象
export function createApp(context){
  const router = createRouter()
  const store = createStore()
  const app =new Vue({
    router,
     // 利用context可以拿到一些参数
    context,
    store, // 挂载
    render: h => h(App)
  }).$mount('#app')
  // 导出app实例以及router实例
  return {app, router, store}
}

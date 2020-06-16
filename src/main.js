import Vue from 'vue'
import App from './App.vue'
import createRouter from './router'

Vue.config.productionTip = false

// 每个请求获取一个单独的vue实例
// 调用者是entry-server(首屏渲染) 会传递参数是上下文对象
export function createApp(context){
  const router = createRouter()
  const app =new Vue({
    router,
    context, // 利用context可以拿到一些参数
    render: h => h(App)
  }).$mount('#app')
  // 导出app实例以及router实例
  return {app, router}
}

// 客户端激活 就是用户端的交互 比如click等
//在浏览器执行的代码
import {createApp} from './main'
// 创建vue实例
const {app, router, store}  =createApp()

if(window.__INITIAL_STATE__){
  console.log(window.__INITIAL_STATE__, 'window.__INITIAL_STATE__');
  // 恢复state
  store.replaceState(window.__INITIAL_STATE__)
}

//等待router就绪
router.onReady(()=>{
  //挂载激活
  app.$mount('#app')
})

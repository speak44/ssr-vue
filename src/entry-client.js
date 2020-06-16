// 客户端激活 就是用户端的交互 比如click等
//在浏览器执行的代码
import {createApp} from './main'
// 创建vue实例
const {app, router}  =createApp()

//等待router就绪
router.onReady(()=>{
  //挂载激活
  app.$mount('#app')
})

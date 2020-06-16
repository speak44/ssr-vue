// 首屏渲染
//在服务端执行的代码
import {createApp} from './main'

//创建vue的实例
// 调用者是renderer
export default conetxt =>{
  // 为了让renderer 可以等待处理最后的结果，return的应该是一个promiss
  return new Promise((resolve, reject)=>{
    // 创建vue实例和路由实例
    const {app, router} =createApp

    // 需要渲染首屏 就要拿到当前的url 渲染器会拿到当前的url
    // 跳转首屏。
    // url的来源。是从请求中可以拿到。传递给renderer
    router.push(conetxt.url) // 考虑到当前页面会存在ajax请求等异步任务处理。要等异步任务处理完在跳转页面

    // 监听路由器的ready，确异步任务都完成
    router.onReady(()=>{
      //该方法把一个回调排队，在路由完成初始导航时调用，这意味着它可以解析所有的异步进入钩子和路由初始化相关联的异步组件。
      //这可以有效确保服务端渲染时服务端和客户端输出的一致。
      resolve(app)
    }, reject) // 作为onReady事件的失败函数处理
  })
}
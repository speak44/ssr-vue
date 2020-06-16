// 首屏渲染
//在服务端执行的代码
import {createApp} from './main'

//创建vue的实例
// 调用者是renderer
export default context =>{
  // 为了让renderer 可以等待处理最后的结果，return的应该是一个promiss
  return new Promise((resolve, reject)=>{
    // 创建vue实例和路由实例
    const {app, router,store} =createApp(context)

    // 需要渲染首屏 就要拿到当前的url 渲染器会拿到当前的url
    // 跳转首屏。
    // url的来源。是从请求中可以拿到。传递给renderer
    router.push(context.url) // 考虑到当前页面会存在ajax请求等异步任务处理。要等异步任务处理完在跳转页面
    // 监听路由器的ready，确异步任务都完成
    router.onReady(()=>{
      //该方法把一个回调排队，在路由完成初始导航时调用，这意味着它可以解析所有的异步进入钩子和路由初始化相关联的异步组件。
      //这可以有效确保服务端渲染时服务端和客户端输出的一致。

      // 首先处理异步的数据，之后在存放到渲染中
      // 所以需要匹配组建中是否存在asyncData选项
      const matchedComponents =router.getMatchedComponents() // 获取url匹配 到所有匹配的组建数组

      //用户是瞎输入的地址，可能会导致matchedComponents获取错误 404
      if(!matchedComponents.length){
        return reject({code:404})
      }

      //需要遍历一下数组 看组建是否有匹配asyncData
      Promise.all(
        matchedComponents.map(comp =>{
          // 看组建是否有匹配到asyncData
          if(comp.asyncData){  
            //  传 store 为了找到dispatch 对应的 actions
            // 传 router 是为了如果url后面带参数 &wd=vue
            return comp.asyncData({store,route:router.currentRoute})// 异步调用 所以返回的是一个promise,每次都return，就会返回一个promise数组
          }
        })).then(()=>{
          // 数据放在store 前端不知道这一步，所以需要通知前端
          //接下来做一个约定
          // 所有的预取数据resolve之后
          //  store已进填充了当前数据状态
          //数据需要同步到前端
          // 序列化操作，转化成字符串 前端使用window.__INITIAL_STATE__获取
          // 赋值给 context.state; 是一个约定，
          context.state = store.state
          resolve(app)
        }).catch(reject) // 捕获异常
    }, reject) // 作为onReady事件的失败函数处理
  })
}
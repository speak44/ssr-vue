 // 创建vue实例
   const Vue = require ('vue')
   const app = new Vue({
      template:'<div>Hello</div>'
   })

 // 获取渲染器实例
   const {createRenderer} = require('vue-server-renderer') // 获取到工厂函数
   const renderer =createRenderer() // 就可以得到一个渲染器

 // 用渲染器来渲染vue实例
  // 返回的是promise，需要.then
 renderer.renderToString(app)
 .then((html)=>{
  console.log(html)
 })
 .catch((err)=>{
  console.log(err);
  
})
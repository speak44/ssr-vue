// nodejs 代码
const express = require('express')

const server = express()
// 创建vue实例
const Vue = require ('vue')
// 获取渲染器实例
const {createRenderer} = require('vue-server-renderer') // 获取到工厂函数
// 用渲染器来渲染vue实例
const renderer =createRenderer() // 就可以得到一个渲染器
server.get('*', (req,res)=>{
  // 每次用户刷新 都渲染出一个全新的vue出来
  const app = new Vue({
    template:'<div @click="onClick">{{context}}</div>',
    data(){
      return {
        context:'vue-ssr'
      }
    },
    methods: {
      onClick(){
        console.log('可以点击吗')
      }
    }
  })
  // 返回的是promise，需要.then
  renderer.renderToString(app)
  .then((html)=>{
    // 直接把结果返回给浏览器
    res.send(html)
  })
  .catch(()=>{
    // 错误时 返回状态吗500
    res.status(500)
    res.send('Internal Server Error, 500')
  })
})
// 监听端口
server.listen(3000, ()=>{
  console.log('执行了')
})
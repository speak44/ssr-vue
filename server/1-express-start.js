// nodejs 代码
const express = require('express')

// 这里是获取express的实例，
// 可以从源码中看到：
//源码路径：/node_modules/@types/express/index.d.ts
// declare function e(): core.Express; 最后导出了 export = e;  所有执行这个函数就可以得到实例
const server = express()

// 需要做路由处理，否则打开http://localhost:3000/ 端口会报错。
// 编写路由做不同的url处理
// req 请求
// res 响应
server.get('/', (req,res)=>{
  res.send('3000') //浏览器会认为返回的是 html
})
// 监听端口
server.listen(3000, ()=>{
  console.log('执行了')
})
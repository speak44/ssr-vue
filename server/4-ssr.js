const express = require('express')
const app = express()

// 静态资源服务
// 把这个路径打开（../dist/client），让用户可以下载文件
const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)
// 相对路径不可靠（../dist/client），需要用绝对路径
app.use(express.static(resolve('../dist/client'),{index: false}))//指定根目录，将根目录开发给用户看
//{index: false} 设置的目的是，因为在client 里面有index.html; 所以就不会走下面的代码，就会直接返回client里面的index.html

// 渲染器： bundleRenderer, 它可以获取前面生成的两个json文件
const { createBundleRenderer } = require('vue-server-renderer')
//指向绝对路径
const bundle = resolve('../dist/server/vue-ssr-server-bundle.json')
//得到渲染器可以直接渲染 vue实例
const renderer = createBundleRenderer(bundle, {
  // 选项
  runInNewContext: false, // https://ssr.vuejs.org/zh/api/#runinnewcontext 文档地址
  // 宿主文件
  template: require('fs').readFileSync(resolve("../public/index.html"), "utf-8"), // 宿主文件  utf-8的方式转化成字符串
  clientManifest: require(resolve("../dist/client/vue-ssr-client-manifest.json")) // 客户端清单   优化内容
})

app.get('*',async(req,res)=>{
   const context = {
     url: req.url
    }
  try{
    // 渲染获取html
    // 创建vue实例 创建首屏 渲染出来 现在是个静态的不能交互
    const html = await renderer.renderToString(context)
    res.send(html)//发送到 前端交互  entry-client 一挂在就可以渲染出来
  }catch(error){
    res.status(500).send('Internal Server Error')
  }
})

app.listen(3001)
const express =require('express')
const app = express()

// 静态资源服务
// 把这个路径打开（../dist/client），让用户可以下载文件
const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)
// 相对路径不可靠（../dist/client），需要用绝对路径
app.use(express.static(resolve('../dist/client'),{index: false}))//指定根目录，将根目录开发给用户看
//{index: false} 设置的目的是，因为在client 里面有index.html; 所以就不会走下面的代码，就会直接返回client里面的index.html

// 渲染器： bundleRenderer, 它可以获取前面生成的两个json文件
const {createBundleRenderer} =require('vue-server-renderer')
//指向绝对路径
const bundle = resolve('../dist/server/vue-ssr-server-bundle.json')
//得到渲染器可以直接渲染 vue实例
const renderer =createBundleRenderer(bundle)
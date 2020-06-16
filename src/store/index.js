import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore(){
  return new Vuex.Store({
    state: {
      count:100
    },
    mutations: {
      add(state){
        state.count+=1
      },
      // 加初始化数据
      init(state,count){
        console.log(count)
        state.count = count
      }
    },
    actions: {
      // 一个异步请求数据 触发init 模仿一个借口
      getCount({commit}){
        return new Promise((reslove)=>{
          setTimeout(() => {
            commit('init', Math.random()*100)
            reslove()
          }, 1000);
        })
      }
    },
    modules: {
    }
  })
}

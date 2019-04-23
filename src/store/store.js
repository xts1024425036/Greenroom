import vue from 'vue'
import Vuex from 'vuex'
vue.use(Vuex);

var state={
    conut:1
}
const mutations={
    incrment(state){
        state.conut++
    }
}
const actions={
    incrment:({commit})=>{
        commit('incrment')
    }
}
const getters={
    alld(state){
        return state.conut
    }
}
export default new Vuex.Store({
    actions,
    state,
    getters,
    mutations
})
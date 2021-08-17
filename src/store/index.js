import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        comrooms: [],
        schoolId: null,
    },
    mutations: {
        setComrooms(state, comrooms) {
            state.comrooms = comrooms
        }
    }
})
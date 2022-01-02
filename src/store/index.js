import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        comrooms: [],
        schoolId: null,
        deleteModalOpen: false,
    },
    mutations: {
        setComrooms(state, comrooms) {
            state.comrooms = comrooms
        },
        toggleDeleteModal(state) {
            state.deleteModalOpen = !state.deleteModalOpen
        }
    }
})
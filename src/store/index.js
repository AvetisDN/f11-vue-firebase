import { createStore } from "vuex";

const store = createStore({
    state: {
        user: null,
    },
    mutations: {
        SET_USER(state, payload) {
            state.user = payload
        }
    },
    actions: {
        setUser({commit}, payload) {
            commit('SET_USER', payload)
        }
    },
})

export default store
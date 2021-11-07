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
    getters: {
        displayName(state) {
            const {user} = state
            if(user) {
                return user.displayName ? user.displayName : user.reloadUserInfo.screenName
            }
            return '' 
        },
        photoURL(state) {
            return state.user.photoURL
        },
        uid(state) {
            return state.user.uid
        },
    }
})

export default store
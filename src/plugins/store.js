import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        identify: { name: 'identify' },
        navigation: { path: '/home' }
    },
    plugins: [new VuexPersistence().plugin]
})

export default store
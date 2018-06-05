import Vue from 'vue'
import Vuex from 'vuex'
import phone from './modules/phone'
import courses from './modules/courses'
import editStatus from './modules/editStatus'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    phone,
    courses,
    editStatus
  },
  strict: debug
})

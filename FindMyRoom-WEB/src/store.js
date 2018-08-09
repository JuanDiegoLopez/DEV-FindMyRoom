import Vue from 'vue'
import Vuex from 'vuex'

import 'babel-polyfill'

import roomService from '@/services/room'
import universityService from '@/services/university'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    room: null,
    universities: []
  },
  mutations: {
    setRoom (state, room) {
      state.room = room
    },
    setUniversities (state, universities) {
      state.universities = universities
    }
  },
  actions: {
    async getRoomById (context, id) {
      const response = await roomService.searchById(id)
      context.commit('setRoom', response.data.room)
      return response.data.room
    },
    async getUniversities (context) {
      const response = await universityService.search()
      context.commit('setUniversities', response.data.universities)
      return response.data.universities
    }
  }
})

export default store

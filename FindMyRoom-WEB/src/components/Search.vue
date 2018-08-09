<template lang="pug">
  div
    fm-loader(v-show='!universities.length')
    .container.center-align(v-show='universities.length')
      h1 ¿Dónde estudias? 
      .row
        .input-field.col.l8.m12.s12.offset-l1
          select(v-model='searchQuery', @keyup.enter='search')
            option(value='', selected, disable) Selecciona una Universidad
            option(v-for="u in universities", :value='u._id') {{ u.name }} 
        .col.l3.m12.s12
            button(type="buttton", @click='searchRooms').btn.waves-effect.waves-light.btn-large Buscar
      fm-loader(v-show='isLoading')
      div(v-show='!isLoading')
        transition(name='fade')
          fm-notification(v-show='showNotification', :results="rooms.length")
        .row(v-show='showFilters')
          .col.m3.offset-m3.s6
            button(type="button", @click='sortByPrice').btn.waves-effect.waves-light.green.darken-1.filter Ordenar por precio
          .col.m3.s6
            button(type="button", @click='sortByCalification').btn.waves-effect.waves-light.green.darken-1.filter Ordenar por calificación
        .row
          .col.l4.m6.s12(v-for="r in rooms")
            fm-room(:room='r')
</template>
<script>
import 'babel-polyfill'

import roomService from '@/services/room'
import universityService from '@/services/university'

import FmRoom from '@/components/room/room'
import FmNotification from '@/components/notification'
import FmLoader from '@/components/loader'

import { mapState, mapActions } from 'vuex'

export default {
  components: { FmRoom, FmNotification, FmLoader },
  created () {
    if (!this.universities.length) {
      this.getUniversities()
    }
  },
  mounted(){
    this.initSelect()
  },
  updated () {
    this.initSelect()
  },
  data(){
    return {
      rooms: [],
      searchQuery: '',
      showNotification : false,
      isLoading: false
    }
  },
  computed: {
    ...mapState(['universities']),
    showFilters () {
      if (this.rooms.length > 0) return true
      return false
    }
  },
  watch: {
    showNotification () {
      if (this.showNotification) {
        setTimeout(() => {
          this.showNotification = false
        }, 2000)
      }
    }
  },
  methods: {
    ...mapActions(['getUniversities']),
    async searchRooms () {
      if (!this.searchQuery) return
      this.isLoading = true
      const response = await roomService.searchByUniversity(this.searchQuery)
      this.rooms = response.data.rooms
      this.showNotification = true
      this.isLoading= false
    },
    sortByPrice () {
      this.rooms = this.rooms.sort( (r1, r2) => {
        if (r1.price < r2.price) return -1
        return 1
      })
    },
    sortByCalification() {
      this.rooms = this.rooms.sort( (r1, r2) => {
        if (r1.calification < r2.calification) return 1
        return -1
      })
    },
    initSelect() {
      const elems = document.querySelectorAll('select')
      M.FormSelect.init(elems)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~styles/settings';
  button{
    margin: 10px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  @media (max-width: $phone-screen) {
    h1 {
      font-size: 30pt;
    }
    .filter{
      margin: 0;
      height: 50px;
      line-height: 1.4;
    }
  }
</style>


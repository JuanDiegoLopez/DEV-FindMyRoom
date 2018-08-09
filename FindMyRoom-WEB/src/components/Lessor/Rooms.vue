<template lang="pug">
  .container
    fm-modal(:id='selectedRoomId', @roomDeleted='getRooms()')
    header.center
      h3.teal-text Mis Cupos
      router-link.waves-effect.waves-light.btn.btn-small.green.darken-1(to="/lessor/room/new")
        i.material-icons.left add
        | Nuevo cupo
    fm-loader(v-show='isLoading')
    table.responsive-table.highlight.centered(v-show='!isLoading')
      thead
        tr
          th Nombre
          th Dirección
          th Precio
          th Calificación
          th Editar
          th Eliminar
      tbody
        tr(v-for='room in rooms')
          td {{ room.title }}
          td {{ room.direction }}
          td ${{ room.price | toLocaleString }}
          td {{ room.calification }}
          td
            button(type='button', @click='selectRoom(room)').btn-floating.yellow.darken-2
              i.material-icons edit
          td
            button(type='button', data-target='modal1', @click='deleteRoom(room._id)').btn-floating.red.darken-1.modal-trigger
              i.material-icons delete
</template>

<script>
import roomService from '@/services/room'
import FmModal from '@/components/lessor/modal'
import FmLoader from '@/components/loader'

export default {
  components: { FmModal, FmLoader },
  created () {
    this.getRooms()
  },
  data () {
    return {
      rooms: [],
      selectedRoomId: '',
      isLoading: false
    }
  },
  methods: {
    async getRooms () {
      this.isLoading = true
      const response = await roomService.search()
      this.rooms = response.data.rooms
      this.isLoading = false
    },
    selectRoom (room) {
      this.$store.commit('setRoom', room)
      this.$router.push({name: 'lessorRoom', params: { id: room._id }})
    },
    deleteRoom (id) {
      this.selectedRoomId = id
    }
  },
  filters: {
    toLocaleString(value) {
      return value.toLocaleString()
    }
  }
}
</script>

<style lang="scss" scoped>
  .container{
    min-height: 65vh;
  }
</style>

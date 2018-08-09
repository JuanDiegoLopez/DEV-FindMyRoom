<template lang="pug">
  #modal1.modal
    .modal-header.center.red.lighten-1.white-text
      span.material-icons warning
    .modal-content.center
      h5 ¿Seguro desea eliminar el cupo?
    .modal-footer
      a.modal-close.waves-effect.waves-grey.btn.grey cancelar
      a.modal-close.waves-effect.waves-red.btn.red.lighten-1(@click='deleteRoom()') Eliminar
</template>
<script>
import roomService from '@/services/room'

export default {
  props: {
    id: {
      required: true
    }
  },
  mounted () {
    this.initModal()
  },
  methods: {
    initModal() {
      const modal = document.querySelectorAll('.modal')
      M.Modal.init(modal)
    },
    async deleteRoom() {
      await roomService.deleteRoom(this.id)
      this.$emit('roomDeleted')
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-header{
  padding: 10px 0px;
}
.modal-header span{
  font-size: 40pt;
}
.modal-footer a{
  margin-right: 15px !important;
}
</style>

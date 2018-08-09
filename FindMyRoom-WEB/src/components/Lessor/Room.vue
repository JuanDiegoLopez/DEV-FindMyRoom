<template lang="pug">
  .container(v-if='room')
    h4.center.teal-text(v-if='newRoom') Nuevo Cupo
    h4.center.teal-text(v-else) Editar Cupo
    fm-loader(v-show='isLoading')
    .contianer(v-show='!isLoading')
      .row
        .input-field.col.m6.s12
          input#name.validate(type='text', v-model='room.title')
          label(for='name').active Nombre
        .input-field.col.m6.s12
          input#price.validate(type='number', v-model='room.price')
          label(for='price').active Precio
      .row  
        .input-field.col.m6.s12
          input#direction.validate(type='text', v-model='room.direction')
          label(for='direction').active Dirección
        .input-field.col.m6.s12
          input#calification.validate(type='number', v-model='room.calification', disabled)
          label(for='calification').active Calificación
      .row
        .input-field.col.s12
          textarea#description.materialize-textarea.validate(v-model='room.description')
          label(for='description').active Descripción
      .row
        .col.s12 
          label Servicios
          br
          label.service(v-for='service in services')
            div(v-if='searchService(service.id)')
              input.filled-in(type='checkbox', checked="checked", @change='onServicesChange', :value='service.id')
              span {{ service.name }}
            div(v-else)
              input.filled-in(type='checkbox', @change='onServicesChange', :value='service.id')
              span {{ service.name }}
      .row 
        .input-field.col.s12 
          select(multiple, @change='onUniversitiesChange')
            option(v-for='u in universities', v-if='universityInRoom(u)', :value='u._id', selected) {{ u.name }}
            option(v-else, :value='u._id') {{ u.name }}
          label Universidades
      .center
        router-link(to='/lessor/rooms').btn.amber.darken-1 Cancelar
        button(type='button', @click='saveRoom').btn Guardar cambios
</template>
<script>
import { mapState, mapActions } from 'vuex'
import roomService from '@/services/room'
import FmLoader from '@/components/loader'

export default {
  components: { FmLoader },
  created () {
    this.isLoading = true
    if (!this.universities.length){
      this.getUniversities()
    }
    const id = this.$route.params.id
    if (id != 'new') {
      if (!this.room) this.getRoomById(id)
    } else {
      const newRoom = {
        title: '',
        directions: '',
        description: '',
        calification: 0,
        lessorId: 1,
        services: [],
        universities: [],
      }
      this.$store.commit('setRoom', newRoom)
      this.newRoom = true
    }
    this.isLoading = false
  },
  mounted () {
    this.initSelect()
  },
  updated () {
    this.initSelect()
  },
  data (){
    return {
      newRoom: false,
      isLoading: false,
      services: [
        {id: '1', icon: 'wifi', name: 'Internet'},
        {id: '2', icon: 'tv', name: 'TV'},
        {id: '3', icon: 'wc', name: 'Baño privado'},
        {id: '4', icon: 'free_breakfast', name: 'Desayuno'},
        {id: '5', icon: 'restaurant', name: 'Almuerzo'},
        {id: '6', icon: 'local_dining', name: 'Cena'},
        {id: '7', icon: 'directions_car', name: 'Garaje'}
      ]
    }
  },
  computed: {
    ...mapState(['room', 'universities'])
  },
  methods: {
    ...mapActions(['getUniversities', 'getRoomById']),
    searchService(id) {
      let isIn = false
      let ids = []
      this.room.services.forEach(i => {
        if (i.id == id) isIn = true
      })
      return isIn
    },
    universityInRoom(university) {
      let isIn = false
      this.room.universities.forEach(i => {
        if (i === university._id) isIn = true
      })
      return isIn
    },
    initSelect() {
      const select = document.querySelectorAll('select')
      M.FormSelect.init(select)
    },
    onServicesChange() {
      let services = []
      const checkboxs = document.querySelectorAll(".service input[type='checkbox']")
      checkboxs.forEach(i => {
          if (i.checked) {
            const serviceToAdd = this.services.find(service => {return service.id == i.value})
            services.push(serviceToAdd)
          }
      })
      this.room.services = services
    },
    onUniversitiesChange() {
      const select = document.querySelector('select')
      const instance = M.FormSelect.getInstance(select)
      this.room.universities = instance.getSelectedValues()
    },
    async saveRoom() {
      const id = this.$route.params.id
      this.isLoading = true
      if (this.newRoom) await roomService.saveRoom(this.room)
      else await roomService.updateRoom(id, this.room)
      this.isLoading = false
      this.$router.push({name: 'lessorRooms'})
    }
  }
}
</script>

<style lang="scss" scoped>
  .service{
    display: inline-block;
    margin-right: 10px;
  }
  .btn{
    margin: 0px 5px;
  }
  textarea{
    height: 80px;
  }
</style>

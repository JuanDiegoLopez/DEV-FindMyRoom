<template lang="pug">
  div.center-align
    h5.center-align.teal-text Deja tu opinión
    .row
      .input-field.col.m3.s12
        select(v-model='newOpinion.calification')
          option(value='', selected, disabled) Tu selección
          option(value='1') 1
          option(value='2') 2
          option(value='3') 3
          option(value='4') 4
          option(value='5') 5
        label Calificación
      .input-field.col.m9.s12
        textarea#text.materialize-textarea.validate(v-model='newOpinion.text')
        label(for='text') Tu opinion
    .row
      .input-field.col.m3.s12
        input#name.validate(type='text', v-model='newOpinion.name')
        label(for='name') Nombre
      .input-field.col.m3.s12
        input#lastname.validate(type='text', v-model='newOpinion.lastname')
        label(for='lastname') Apellido
      .input-field.col.m6.s12
        input#email.validate(type='email', v-model='newOpinion.email')
        label(for='email') Correo
    transition(name='fade')
      div.right-align(v-show='writing')
        a(@click='cleanData').btn 
          |Cancelar
        a(@click='addComment').btn
          i.material-icons.right send
          |Enviar
</template>

<script>
import roomService from '@/services/room'

export default {
  mounted() {
    const elems = document.querySelectorAll('select')
    M.FormSelect.init(elems)
  },
  updated(){
    const elems = document.querySelectorAll('select')
    const instances = M.FormSelect.init(elems)
  },
  data() {
    return {
      newOpinion: {
        calification: '',
        text: '',
        name: '',
        lastname: '',
        email: '',
      }
    }
  },
  computed: {
    writing () {
      if (this.newOpinion.text || this.newOpinion.calification || this.newOpinion.name || this.newOpinion.lastname || this.newOpinion.email) {
        return true
      }
      return false
    }
  },
  methods: {
    async addComment () {
      if (!this.newOpinion.calification || !this.newOpinion.name || !this.newOpinion.lastname || !this.newOpinion.email || !this.newOpinion.text) return
      
      const id = this.$route.params.id
      await roomService.addComment(id, this.newOpinion)
      this.cleanData()
      this.$emit('newComment')
    },
    cleanData () {
      this.newOpinion = {
        calification: '',
        text: '',
        name: '',
        lastname: '',
        email: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .btn{
    margin-right: 10px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>

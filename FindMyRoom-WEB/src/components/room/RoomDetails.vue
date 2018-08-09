<template lang="pug">
  .container(v-if='room')
    h4.center-align {{ room.title }} - ${{ room.price | localeMoney }}
    .row
      .col.m6.s12.center-align
        img.responsive-img.z-depth-3(:src='room.image')
      .col.m6.s12
        h5 Descripción:
        p {{ room.description }}
        h5 Servicios:
        .chip(v-for='service in room.services')
          i.material-icons {{ service.icon }}
          span &nbsp {{ service.name }}
    .row.center-align
      .col.m6.s12
        h5(v-if='room.calification > 0') Calificacíon: {{ room.calification }}
        h5(v-else) Sin calificación
      .col.m6.s12
        h5 Dirección: {{ room.direction }} 
    h4.center-align.teal-text Opiniones
    .row(v-for='opinion in room.opinions').opinion
      .col.m3.offset-m1.s4.center-align
        img(:src='opinion.image', alt='Foto de perfil', width='100').responsive-img
        h6.center-align {{ opinion.name }}
      .col.m6.s8
        label Calificación: {{ opinion.calification }}
        label.date {{ opinion.date | localeDate }}
        p.justify-align {{ opinion.text }}
    fm-loader(v-show='isLoading')
    fm-opinion(@newComment='getRoomById(room._id)', v-show='!isLoading')
</template>

<script>
import roomService from '@/services/room'
import FmOpinion from '@/components/room/opinion'
import FmLoader from '@/components/loader'

export default {
  components: { FmOpinion, FmLoader },
  created () {
    const id = this.$route.params.id
    this.getRoomById(id)
  },
  data () {
    return {
      room: {},
      isLoading: false
    }
  },
  methods: {
    async getRoomById (id) {
      this.isLoading = true
      const response = await roomService.searchById(id)
      this.room = response.data.room
      this.isLoading = false
    }
  },
  filters: {
    capitalize (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    uppercase (value) {
      if (!value) return ''
      value = value.toString()
      return value.toUpperCase()
    },
    localeDate (value) {
      if (!value) return ''
      let date = new Date(value)
      return date.toLocaleDateString()
    },
    localeMoney (value) {
      if (!value) return ''
      return value.toLocaleString()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~styles/settings';
  p {
    text-align: justify;
  }
  .container {
    padding-bottom: 30px;
  }
  .date{
    float: right;
  }
  .chip span{
    vertical-align: super;
  }
  .opinion{
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }
  @media (max-width: $phone-screen) {
    h4 {
      font-size: 20pt;
    }
    h6 {
      font-size: 10pt;
    }
    .responsive-img {
      width: 80%;
    }
  }
</style>



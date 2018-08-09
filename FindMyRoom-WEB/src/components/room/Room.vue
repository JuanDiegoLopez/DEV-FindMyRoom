<template lang="pug">
  .card.hoverable(v-if='room', @click='goToRoom(room._id)')
    .card-image
      img(:src="room.image")
    .card-content
      span.card-title {{room.title}}
      h6 Precio: {{ room.price }}
      h6(v-if="room.calification > 0 ") Calificación: {{ room.calification }}
      h6(v-else) Sin calificación
    .card-action
      a.teal-text
        | ver más
        i(class='material-icons left') add
</template>

<script>
export default {
  props: {
    room: {
      type: Object,
      required:true
    }
  },
  methods: {
    goToRoom (id) {
      this.$router.push({ name: 'room', params: { id } })
    }
  }
}
</script>

<style lang="scss" scoped>
  .card{
    cursor: pointer;
  }
  .card .card-content{
    padding: 10px;
  }
  .card-image img{
    height: 150px; 
  }
  .card-action a{
    cursor:pointer;
  }
</style>



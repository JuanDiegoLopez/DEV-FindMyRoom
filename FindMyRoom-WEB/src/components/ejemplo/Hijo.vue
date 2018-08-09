<template>
  <div>
    <input type="text" v-model="message" @keyup="nuevoMensaje">
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: ''
    }
  },
  methods: {
    nuevoMensaje () {
      this.$emit('nuevoMensaje', this.message)
    }
  }
}
</script>


<template>
  <div>
    <h1>{{ message }}</h1>
    <hijo @nuevoMensaje="cambiarMensaje"></hijo>  
  </div>  
</template>

<script>
import Hijo from '@/components/ejemplo/hijo'
export default {
  components: {
    Hijo
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    cambiarMensaje (message) {
      this.message = message
    }
  }
}
</script>

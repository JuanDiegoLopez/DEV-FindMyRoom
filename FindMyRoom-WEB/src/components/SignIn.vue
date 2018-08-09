<template lang="pug">
  .container
    .row
      .col.s12.l6.offset-l3
        .card
          .card-content.teal.lighten-1
            span.card-title.center-align.white-text
              h5 Iniciar Sesión
          .card-action.center-align
            input(type='text', v-model='username', placeholder='Nombre de usuario')
            input(type='password', v-model='password', placeholder='Contraseña')
            button(type='buttton', class='btn btn-large', @click='signIn').waves-light Ingresar
            br
            h6.red-text {{ msg }}
            p No tienes una cuenta?&nbsp
            router-link(to='/signup') Registrate
</template>

<script>
const user = {
  username: 'admin',
  password: 'admin'
}

export default {
  data () {
    return {
      msg: '',
      username: '',
      password: ''
    }
  },
  methods: {
    signIn () {
      if (user.username === this.username & user.password === this.password) {
        this.$router.push({name: 'lessorRooms'})
      } else {
        this.msg = 'Datos incorrectos'
      }
    }
  }
}
</script>


<style lang="scss" scoped>
  button {
    display: block;
    margin: 0 auto;
  }
  p{
    display: inline-block;
  }
</style>

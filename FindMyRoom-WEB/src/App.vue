<template lang="pug">
  #app
    fr-navbar
    
    main
      router-view
    
    fr-footer
</template>

<script>
import FrNavbar from './components/layout/Navbar'
import FrFooter from './components/layout/Footer'

export default {
  name: 'app',
  components: { FrNavbar, FrFooter },
  created () {
    this.$router.push({name: 'search'})
  }
}
</script>

<style lang="scss">
  #app {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }
  main {
    padding-top: 20px;
    padding-bottom: 50px;
    flex: 1 0 auto;
  }
</style>

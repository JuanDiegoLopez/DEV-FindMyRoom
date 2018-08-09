<template lang="pug">
  div
    div.navbar-fixed
      nav
        .nav-wrapper
          router-link.brand-logo(href='#', to='/search')
            img(width='40px', src='@/assets/img/logo.png')
            |{{ msg }}
          a(href="#",data-target="mobile-demo",class="sidenav-trigger")
            i(class="material-icons") menu
          ul#nav-mobile.right.hide-on-med-and-down
            li
              router-link(to='/search')
                i(class='material-icons left') search
                | Buscar un cupo
            li
              router-link(to='/ejemplo') 
                i(class="material-icons left") info
                | Ejemplo
            li
              router-link(to='/about') 
                i(class="material-icons left") info
                | Nosotros
            li
              router-link(to='/signin') 
                i(class="material-icons left") person
                | Iniciar Sesión
    ul#mobile-demo.sidenav
      li(@click='closeSideNavbar')
        router-link(to='/search')
          i(class='material-icons left') search
          | Buscar un cupo
      li(@click='closeSideNavbar')
        router-link(to='/about') 
          i(class="material-icons left") info
          | Nosotros
      li(@click='closeSideNavbar')
        router-link(to='/signin') 
          i(class="material-icons left") person
          | Iniciar Sesión
</template>

<script>
export default {
  data() {
    return {
      msg: "Find My Room"
    }
  },
  mounted() {
    const sideNavbar = document.querySelector('.sidenav')
    const instance = M.Sidenav.init(sideNavbar)
  },
  methods: {
    closeSideNavbar() {
      const sideNavbar = document.querySelector('.sidenav')
      const instance = M.Sidenav.getInstance(sideNavbar)
      instance.close()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~styles/settings';
  
  nav {
    background-color: $first-color;
  }
  nav img{
    vertical-align: middle;
    margin: 5px;
  }
  .brand-logo{
    font-family: 'Lobster', cursive;
  }
  .brand-logo:hover{
    color: rgb(0, 0, 0);
  }
  @media (max-width: $phone-screen) {
    nav img {
      width: 15%;
    }
    .brand-logo{
      font-size: 18pt;
    }

  }
</style>


<template lang="pug">
  .container
    .row
      .col.s12.l6.offset-l3
        .card
          .card-content.teal.lighten-1
            span.card-title.center-align.white-text
              h5 Registrarse
          .card-action.center-align
            .row
              .col.m6.s12
                input(type='text', placeholder='Nombre')
              .col.m6.s12
                input(type='text', placeholder='Apellido')
            input(type='email', placeholder='Correo')
            input(type='password', placeholder='Contraseña')
            input(type='password', placeholder='Repite contraseña')
            .row
              .col.m6
                 label
                  input(name="group1" type="radio")
                  span Estudiante
              .col.m6
                 label
                  input(name="group1" type="radio")
                  span Arrendatario
            button(type='buttton', class='btn btn-large').waves-light Registrarse
</template>
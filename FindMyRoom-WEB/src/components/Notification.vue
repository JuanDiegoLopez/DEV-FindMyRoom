<template lang="pug">
  div.center-align
    h4(v-if="results") Resultados econtrados: {{ results }}
    h4(v-else) No se  encontraron resultados
</template>

<script>
export default {
  props: { 
    results:{
      required: true
    } }
}
</script>

<style lang="scss" scoped>
@import '~styles/settings';

@media (max-width: $phone-screen) {
  h4 {
    font-size: 15pt;
  }
}
</style>



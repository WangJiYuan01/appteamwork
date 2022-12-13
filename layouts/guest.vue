<template>
  <v-app dark>
      <Nuxt/>
  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () { return "ok"}
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>

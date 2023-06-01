<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "HomeView",
  props: {
      userLogin: {
        type: Object,
        default: null,
      }
  }
})
</script>

<template>
  <div>Hello, {{userLogin}}</div>
</template>

<style scoped>

</style>
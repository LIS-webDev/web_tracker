<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "HomeView",
})
</script>

<template>
  <div class="home">
    HELLO, {{$parent.userLogin}}
  </div>
</template>

<style scoped>

</style>
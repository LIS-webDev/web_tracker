
<template>
  <div v-cloak v-if="isAuth" class="home">
    HELLO, {{this.$store.state.userLogin}}
  </div>
  <div v-else>Please, authorize!</div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "HomeView",
  data() {
    return {
    }
  },
  created() {

  },
  methods: {
  },
  computed: {
    isAuth() {
      return this.$store.state.userId && this.$store.state.userLogin;
    }
  }
})
</script>

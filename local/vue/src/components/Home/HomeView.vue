
<template>
  <div v-cloak v-if="isAuth" class="home">
    <div class="stat-today">
      <div class="stat-today__wrapper">
        <h1 class="stat-today__title title">Ваша статистика за сегодняшний день</h1>
      </div>
    </div>
  </div>
  <div class="main-banner" v-else>
      <img src="/local/templates/main/img/main-banner.svg" alt="BitBalance">
  </div>
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

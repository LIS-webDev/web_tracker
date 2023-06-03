<template>
  <div></div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "LogoutUser",
  data() {
    return {
    }
  },
  methods: {
    logout() {
      fetch('/api/user/logout/')
          .then(response => response.json())
          .then(result => {
            if (result.data) {
              this.$store.state.userId = 0;
              this.$store.state.userLogin = "";
              this.$router.push({name: 'HomeView'});
            }
            console.log(result);
          });
    }
  },
  created() {
    this.logout();
  }
});
</script>
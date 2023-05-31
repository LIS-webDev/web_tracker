<template>
      <ul class="aside__menu-list">
        <li class="aside__menu-item">
          <RouterLink to="/auth/">Войти</RouterLink>
        </li>
        <li class="aside__menu-item">
          <RouterLink to="/register/">Регистрация</RouterLink>
        </li>
      </ul>
</template>

<script>
export default {
  name: 'AsideMenu',
  props: {
  },
  methods: {
    auth() {
      console.log('click');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

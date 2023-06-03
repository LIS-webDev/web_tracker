<template>
      <ul class="aside__menu-list">
        <li v-if="!isAuth" class="aside__menu-item">
          <RouterLink to="/auth/">Войти</RouterLink>
        </li>
        <li v-if="!isAuth" class="aside__menu-item">
          <RouterLink to="/register/">Регистрация</RouterLink>
        </li>
        <li v-if="isAuth" class="aside__menu-item">
          <RouterLink to="/profile/">Профиль</RouterLink>
        </li>
        <li v-if="isAuth" class="aside__menu-item">
          <RouterLink to="/add_product/">Добавить продукт</RouterLink>
        </li>
        <li v-if="isAuth" class="aside__menu-item">
          <RouterLink to="/add_water/">Вода</RouterLink>
        </li>
        <li v-if="isAuth" class="aside__menu-item">
          <RouterLink to="/burn_calories/">Активность</RouterLink>
        </li>
        <li v-if="isAuth" class="aside__menu-item">
          <RouterLink to="/statistic/">Статистика</RouterLink>
        </li>
        <li v-if="isAuth" class="aside__menu-item">
          <RouterLink to="/logout/">Выйти</RouterLink>
        </li>
      </ul>
</template>

<script>
export default {
  name: 'AsideMenu',
  data() {
    return {

    }
  },
  methods: {
    
  },
  computed: {
    isAuth() {
      return this.$store.state.userLogin && this.$store.state.userId;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

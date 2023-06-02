<template>
  <div class="register">
    <div class="register__wrapper">
      <h2 class="register__title title">Регистрация</h2>
      <div class="register__form">
        <form id="register" class="default-form" action="" @submit.prevent="register">
          <div class="register__input-row">
            <label class="default-label" for="user-login">Логин:</label>
            <input v-model.trim="login" class="default-input" id="user-login" type="text" name="login">
          </div>
          <div class="register__input-row">
            <label class="default-label" for="user-email">Email:</label>
            <input v-model.trim="email" class="default-input" id="user-email" type="email" name="email">
          </div>
          <div class="register__input-row">
            <label class="default-label" for="user-pass">Пароль:</label>
            <input v-model.trim="password" class="default-input" id="user-pass" type="password" name="pass">
          </div>
          <button class="register__submit-btn default-submit-btn">Зарегистрироваться</button>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "EditRegisterProfile",
  data() {
    return {
      login: "",
      password: "",
      email: ""
    }
  },
  methods: {
    register() {
      fetch('/api/user/register/', {
        method: 'POST',
        body: JSON.stringify({
          login: this.login,
          pass: this.password,
          email: this.email
        })
      })
          .then(response => response.json())
          .then(result => {
            console.log(result);
            if (!result.ERROR) {
              this.$parent.userLogin = this.login;
            }
            this.$router.push({name: 'HomeView'});
          });
    }
  }
})
</script>

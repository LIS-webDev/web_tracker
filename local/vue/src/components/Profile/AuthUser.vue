<template>
  <div class="register">
    <div class="register__wrapper">
      <h2 class="register__title title">Авторизация</h2>
      <div class="register__form">
        <form id="auth" class="default-form" action="" @submit.prevent="sendForm">
          <div class="register__input-row">
            <label class="default-label" for="user-auth-login">Логин:</label>
            <input v-model.trim="login" class="default-input" id="user-auth-login" type="text" name="login">
          </div>
          <div class="register__input-row">
            <label class="default-label" for="user-auth-pass">Пароль:</label>
            <input v-model.trim="password" class="default-input" id="user-auth-pass" type="password" name="pass">
          </div>
          <button class="register__submit-btn default-submit-btn" >Войти</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "AuthUser",
  data() {
    return {
      login: "",
      password: "",
    }
  },
  methods: {
     sendForm() {
       fetch('/api/user/auth/', {
         method: "POST",
         body: JSON.stringify({
           login: this.login,
           pass: this.password,
         })
       })
      .then(response => response.json())
      .then(result => {
        // if (typeof result)
        console.log(result.data);
        // this.$router.push({name: 'HomeView'});
      });
    }
  }
})
</script>
